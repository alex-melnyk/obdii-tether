import net from 'react-native-tcp';
import {EventRegister} from 'react-native-event-listeners';
import {CONNECTED, DATA_RECEIVED, DISCONNECTED, ERROR_RECEIVED, INITIALIZATION_SUCCESS} from "../utils/OBDIIEvents";
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
    sendCommand(ATCommands.RESET);
    sendCommand(ATCommands.ECHO_OFF);
    sendCommand(ATCommands.EXTRA_LINES_OFF);
    sendCommand(ATCommands.HEADERS_OFF);
    sendCommand(ATCommands.ADAPTIVE_TIMING_2);
    sendCommand(ATCommands.SET_TIMING_10);
    sendCommand(ATCommands.SET_PROTOCOL_ISO14230_4_KWP_FI);
    sendCommand(ATCommands.FAST_INIT);
    // sendATCommand(ATCommands.IGNITION);
    // sendATCommand('KW');
    // sendATCommand(ATCommands.SLOW_INIT);
    // setTimeout(refreshData, 3000);
}

/**
 *
 */
function refreshData() {
    // Read Voltage
    // sendATCommand(ATCommands.READ_VOLTAGE);

    sendCommand(OBDIICommands.MODE01.RPM);
    sendCommand(OBDIICommands.MODE01.SPEED);
    sendCommand(OBDIICommands.MODE01.ECT);
    sendCommand(OBDIICommands.MODE01.FUEL_LEVEL);
    sendCommand(OBDIICommands.MODE21.AGM);

    // for (let i = 1; i < 2; i++) {
    //     let code = i.toString(16);
    //
    //     sendCommand(`21 ${code.length === 1 ? '0' + code : code}`);
    // }
}

/////////////////////////////
////////// 7F 01 12 !!! ERROR
/////////////////////////////

/**
 *
 */
export function startMonitoring() {
    timerID = setInterval(refreshData, 10);
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
    setTimeout(startMonitoring, 500);
}

/**
 *
 */
function initializationFailure() {
    initializationAttempts -= 1;

    if (initializationAttempts) {
        setTimeout(() => sendCommand(ATCommands.FAST_INIT), 1000);
    } else {
        disconnect();
    }
}

/**
 *
 * @param data
 */
function collectReceivedData(data) {
    const trimData = data.toString().replace(/\r/g, '').trim();
    console.log('LOGGG', waitingForResponse, trimData);

    // IF IT'S END OF RESPONSE
    if (trimData.indexOf('>') >= 0) {
        if (trimData.length > 1) {
            obdiiResponse.push(trimData.replace('>', '').trim());
        }
        const responses = commandResponseToObject(waitingForResponse, obdiiResponse);

        if (responses.length) {
            console.log("responses1", waitingForResponse, responses);
            if (waitingForResponse === ATCommands.FAST_INIT) {
                console.log("responses2", responses);
                if (responses[0].initialized) {
                    initializationSuccess();
                } else {
                    initializationFailure();
                }
            } else {
                EventRegister.emit(DATA_RECEIVED, {responses});
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
export function disconnect() {
    if (timerID) {
        clearInterval(timerID);
    }

    if (client) {
        client.end();
        client.destroy();
        client = null;
    }

    initializationAttempts = 5;

    waitingForResponse = null;
    obdiiResponse = [];
    commandsQueue = [];
}