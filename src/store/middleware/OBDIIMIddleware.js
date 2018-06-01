import * as OBDIIActions from "../actions/OBDIIActions";
import * as OBDII from "../../services/OBDII";

export default ({dispatch, getState}) => (next) => (action) => {
    switch (action.type) {
        case OBDIIActions.OBDII_CONNECT_ACTION:
            dispatch(OBDIIActions.obdiiConnecting());

            OBDII.tryConnectOBDII();
            break;
        case OBDIIActions.OBDII_DISCONNECT_ACTION:
            dispatch(OBDIIActions.obdiiDisconnected());
            OBDII.disconnect();
            break;
    }

    next(action);
};