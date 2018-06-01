export const OBDII_CONNECT_ACTION = 'OBDII_CONNECT_ACTION';
export const OBDII_CONNECTED_ACTION = 'OBDII_CONNECTED_ACTION';
export const OBDII_CONNECTING_ACTION = 'OBDII_CONNECTING_ACTION';
export const OBDII_DISCONNECT_ACTION = 'OBDII_DISCONNECT_ACTION';
export const OBDII_DISCONNECTED_ACTION = 'OBDII_DISCONNECTED_ACTION';
export const OBDII_DATA_RECEIVED_ACTION = 'OBDII_DATA_RECEIVED_ACTION';

export function obdiiConnect() {
    return {type: OBDII_CONNECT_ACTION};
}

export function obdiiConnecting() {
    return {type: OBDII_CONNECTING_ACTION};
}

export function obdiiConnected() {
    return {type: OBDII_CONNECTED_ACTION};
}

export function obdiiDisconnect() {
    return {type: OBDII_DISCONNECT_ACTION};
}

export function obdiiDisconnected() {
    return {type: OBDII_DISCONNECTED_ACTION};
}

/**
 * DATA RECEIVED
 *
 * @param data.
 */
export function obdiiDataReceived(data) {
    return {
        type: OBDII_DATA_RECEIVED_ACTION,
        payload: data
    };
}