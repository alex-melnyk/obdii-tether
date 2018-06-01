import * as OBDIIActions from "../actions/OBDIIActions";

const initialState = {
    connecting: false,
    connected: false
};

export default (state= initialState, action) => {
    switch (action.type) {
        case OBDIIActions.OBDII_CONNECTING_ACTION:
            return {
                connecting: true,
                connected: false,
            };
        case OBDIIActions.OBDII_CONNECTED_ACTION:
            return {
                connecting: false,
                connected: true,
            };
        case OBDIIActions.OBDII_DISCONNECTED_ACTION:
            return {
                connecting: false,
                connected: false,
            };
        default:
            return state;
    }
};