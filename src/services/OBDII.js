import net from 'react-native-tcp';
import {EventRegister} from 'react-native-event-listeners';
import {
    CONNECTED, DATA_RECEIVED, DISCONNECTED, ERROR_RECEIVED, INITIALIZATION_REQUEST,
    INITIALIZATION_SUCCESS, SCAN_DATA_RECEIVED
} from "../utils/OBDIIEvents";
import ATCommands from "../utils/ATCommands";
import OBDIICommands from '../utils/OBDIICommands';
import {commandResponseToObject} from "../utils/OBDIIConverter";

let initializationAttempts = 5;
let client = null;
let commandsQueue = [];

let waitingForResponse = null;
let obdiiResponse = [];

let timerID;

/**
 *
 */
function initialCommands() {
    EventRegister.emit(INITIALIZATION_REQUEST);

    sendCommand(ATCommands.RESET);
    sendCommand(ATCommands.ECHO_OFF);
    // sendCommand(ATCommands.EXTRA_LINES_OFF);
    sendCommand(ATCommands.HEADERS_OFF);
    // sendCommand(ATCommands.ADAPTIVE_TIMING_2);
    // sendCommand(ATCommands.SET_TIMING_10);
    sendCommand(ATCommands.SET_PROTOCOL_ISO14230_4_KWP_FI);
    // sendCommand(ATCommands.IGNITION);
    sendCommand(ATCommands.FAST_INIT);
    // sendATCommand('KW');
    // sendATCommand(ATCommands.SLOW_INIT);
    // setTimeout(refreshData, 3000);
}

let timeout1sec = 0;
let timeout5sec = 0;

/**
 *
 */
function refreshData() {
    // Read Voltage
    // sendATCommand(ATCommands.READ_VOLTAGE);

    // sendCommand(OBDIICommands.MODE01.RPM);
    // sendCommand(OBDIICommands.MODE01.SPEED);

    const timeout = new Date().getTime();

    if (timeout - timeout1sec >= 1000) {
        timeout1sec = timeout;
        // sendCommand(OBDIICommands.MODE21.AGM);
    }

    if (timeout - timeout5sec >= 5000) {
        timeout5sec = timeout;
        // sendCommand(OBDIICommands.MODE01.ECT);
    }

    // const base = 22;
    //
    // for (let i = base; i < base + 1; i++) {
    // // for (let i = 16; i < 32; i++) {
    // // for (let i = 32; i < 48; i++) {
    // // for (let i = 48; i < 64; i++) {
    // // for (let i = 64; i < 80; i++) {
    // // for (let i = 80; i < 96; i++) {
    // // for (let i = 96; i < 112; i++) {
    // // for (let i = 112; i < 128; i++) {
    //     let code = i.toString(16);
    //
        sendCommand(`21 01`);
    // }
}

/////////////////////////////
////////// 7F 01 12 !!! ERROR
/////////////////////////////

/**
 *
 */
export function startMonitoring() {
    timerID = setInterval(refreshData, 100);
}

/**
 * Try connect to OBDII device.
 *
 * @param host {String} host address.
 * @param port {Number} host port.
 */
export function tryConnectOBDII(host = '192.168.0.10', port = 35000) {
    client = net.createConnection({host, port}, () => {
        EventRegister.emit(CONNECTED);

        client.on('data', collectReceivedData);
        client.on('error', (error) => EventRegister.emit(ERROR_RECEIVED, error));
        client.on('timeout', disconnect);
        client.on('close', (hasError) => EventRegister.emit(DISCONNECTED, hasError));

        initialCommands();
    });
}

/**
 * Send command to OBDII.
 *
 * @param command {String} command which will send to the OBDII.
 */
export function sendCommand(command) {
    if (client) {
        if (waitingForResponse) {
            commandsQueue.push(command);
            return;
        }

        waitingForResponse = command;
        client.write(new Buffer(command + '\r'));
        return;
    }

    waitingForResponse = "";
    commandsQueue = [];
}

/**
 *
 */
function initializationSuccess() {
    EventRegister.emit(INITIALIZATION_SUCCESS);

    // START MONITORING AFTER INITIALIZATION
    setTimeout(startMonitoring, 1000);
}

/**
 *
 */
function initializationFailure() {
    initializationAttempts -= 1;

    disconnect(true);

    if (initializationAttempts) {
        setTimeout(() => tryConnectOBDII(), 3000);
    }
}

/**
 *
 * @param data
 */
function collectReceivedData(data) {
    const rawData = data.toString();
    console.log('+', rawData);
    const trimData = rawData.replace(/\r/g, '').trim();

    // IF IT'S END OF RESPONSE
    if (trimData.indexOf('>') >= 0) {
        if (trimData.length > 1) {
            obdiiResponse.push(trimData.replace('>', '').trim());
        }
        // console.log('LOGGG', waitingForResponse, obdiiResponse);
        const responses = commandResponseToObject(waitingForResponse, obdiiResponse);

        if (responses.scan) {
            EventRegister.emit(SCAN_DATA_RECEIVED, responses);
        } else if (responses.length) {
            if (waitingForResponse === ATCommands.FAST_INIT) {
                if (responses[0].initialized) {
                    initializationSuccess();
                } else {
                    initializationFailure();
                }
            } else {
                responses.forEach((object) => {
                    if (object) {
                        if (object.scan) {
                            EventRegister.emit(SCAN_DATA_RECEIVED, object);
                        } else {
                            EventRegister.emit(DATA_RECEIVED, object);
                        }
                    }
                });
            }
        }

        waitingForResponse = "";
        obdiiResponse = [];
    } else {
        obdiiResponse.push(trimData);
    }

    // PUSH NEXT COMMAND
    if (!waitingForResponse && commandsQueue.length) {
        sendCommand(commandsQueue.shift());
    }
}

/**
 *
 */
export function disconnect(withoutReset = false) {
    if (timerID) {
        clearInterval(timerID);
    }

    if (client) {
        client.end();
        client.destroy();
        client = null;
    }

    if (!withoutReset) {
        initializationAttempts = 3;
    }

    waitingForResponse = null;
    obdiiResponse = [];
    commandsQueue = [];
}