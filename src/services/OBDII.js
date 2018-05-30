import net from 'react-native-tcp';
import {EventRegister} from 'react-native-event-listeners';
import {CONNECTED, DATA_RECEIVED, DISCONNECTED, ERROR_RECEIVED} from "../utils/OBDIIEvents";
import ATCommands from "../utils/ATCommands";
import OBDIICommands from '../utils/OBDIICommands';
import {commandResponseToObject} from "../utils/OBDIIConverter";

let client = null;
let commandsQueue = [];

let waitingForResponse = null;
let obdiiResponse = [];

let timerID;

function initialCommands() {
    sendATCommand(ATCommands.RESET);
    sendATCommand(ATCommands.ECHO_OFF);
    sendATCommand(ATCommands.EXTRA_LINES_OFF);
    sendATCommand(ATCommands.HEADERS_OFF);
    sendATCommand(ATCommands.ADAPTIVE_TIMING_2);
    // sendATCommand(ATCommands.SET_TIMING_40);
    sendATCommand(ATCommands.SET_PROTOCOL_ISO14230_4_KWP_FI);
    sendATCommand(ATCommands.FAST_INIT);
    // sendATCommand(ATCommands.IGNITION);
    // sendATCommand('KW');
    // sendATCommand(ATCommands.SLOW_INIT);
    // setTimeout(refreshData, 3000);
}

function refreshData() {
    // Read Voltage
    sendATCommand(ATCommands.READ_VOLTAGE);
    sendCommand(OBDIICommands.MODE01.RPM);
    sendCommand(OBDIICommands.MODE01.ECT);
    sendCommand(OBDIICommands.MODE01.SPEED);
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

export function startMonitoring() {
    timerID = setInterval(refreshData, 10000);
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

        setTimeout(startMonitoring, 100);
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
 * @param data
 */
function collectReceivedData(data) {
    const trimData = data.toString().replace(/\r/g, '').trim();
    // console.log('LOGGG', data, trimData);

    // IF IT'S END OF RESPONSE
    if (trimData.indexOf('>') >= 0) {
        if (trimData.length > 1) {
            obdiiResponse.push(trimData.replace('>', '').trim());
        }

        // console.log(waitingForResponse, obdiiResponse);

        const responses = commandResponseToObject(waitingForResponse, obdiiResponse);

        if (responses.length) {
            EventRegister.emit(DATA_RECEIVED, {responses});
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
 * Short-hand function for send command with prefix AT.
 *
 * @param command {String} command which will send to the OBDII.
 */
export function sendATCommand(command) {
    sendCommand(`AT ${command}`);
}

export function disconnect() {
    client.end();
    client.destroy();
    client = null;
}