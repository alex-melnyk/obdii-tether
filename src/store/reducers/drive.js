import * as OBDIIActions from "../actions/OBDIIActions";

const initialState = {
    rpm: 0,
    speed: 0,
    voltage: 0,
    temperature: 0,
    gear: '0'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OBDIIActions.OBDII_DATA_RECEIVED_ACTION:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};