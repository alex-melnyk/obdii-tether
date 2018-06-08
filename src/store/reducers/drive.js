import * as OBDIIActions from "../actions/OBDIIActions";

const initialState = {
    rpm: 0,
    speed: 0,
    voltage: 12.7,
    temperature: -40,
    fuel: 0,
    gear: '',
    scan: {
        // key1: 'value1'
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OBDIIActions.OBDII_DATA_RECEIVED_ACTION:
            return {
                ...state,
                ...action.payload
            };
        case OBDIIActions.OBDII_SCAN_DATA_RECEIVED_ACTION:
            console.log('STATE', state.scan, action.payload);

            return {
                ...state,
                scan: {
                    ...state.scan,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};