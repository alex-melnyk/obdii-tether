import net from 'react-native-tcp';
import { EventRegister } from 'react-native-event-listeners';

const commandsQueue = [];

let client = null;
let waitingForResponse = false;

function initialCommands() {
    this.sendATCommand('Z');
    this.sendATCommand('E0');
    this.sendATCommand('L0');
    this.sendATCommand('H0');
    this.sendATCommand('AT2');
    this.sendATCommand('ST0A');
    this.sendATCommand('SP5');
}

function dataReceived(data) {
    const response = data.toString();

    if (response.indexOf('>') >= 0) {
        waitingForResponse = false;
    }

    EventRegister.emit('receive', data);

    if (!waitingForResponse && commandsQueue.length) {
        sendCommand(commandsQueue.pop());
    }
}

/**
 * Try connect to OBDII device.
 *
 * @param host {String} host address.
 * @param port {Number} host port.
 */
export function connect(host = '192.168.0.10', port = 35000) {
    this.client = net.createConnection({host, port}, () => {
        client.on('data', dataReceived);

        client.on('error', (error) => {
            console.log('ERROR:', error);
        });

        initialCommands();

        EventRegister.emit('receive', data);
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
        }

        waitingForResponse = true;
        client.write(new Buffer(command + '\r'));
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