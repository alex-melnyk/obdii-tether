import * as OBDIIActions from "../actions/OBDIIActions";

const initialState = {
    rpm: 600,
    speed: 98,
    voltage: 12.7,
    temperature: 97,
    fuel: 80,
    gear: 'D'
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