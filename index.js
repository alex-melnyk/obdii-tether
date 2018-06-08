import React, {Component} from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import {Provider} from "react-redux";
import {EventRegister} from 'react-native-event-listeners'

import Store from './src/store';
import BaseNavigator from "./src/navigators/index";
import * as OBDIIActions from './src/store/actions/OBDIIActions';
import {
    CONNECTED, DATA_RECEIVED, DISCONNECTED, INITIALIZATION_REQUEST,
    INITIALIZATION_SUCCESS, SCAN_DATA_RECEIVED
} from "./src/utils/OBDIIEvents";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class App extends Component {
    componentDidMount() {
        const {dispatch} = Store;

        EventRegister.on(INITIALIZATION_REQUEST, () => {
            dispatch(OBDIIActions.obdiiConnecting());
        });

        EventRegister.on(INITIALIZATION_SUCCESS, () => {
            dispatch(OBDIIActions.obdiiConnected());
        });

        EventRegister.on(SCAN_DATA_RECEIVED, (data) => {
            // console.log(data.responses);
            // const freshData = data.responses.reduce((acc, value) => ({
            //     ...acc,
            //     ...value
            // }), {});

            // console.log('DATA', data);

            dispatch(OBDIIActions.obdiiScanDataReceived(data.scan));
        });

        EventRegister.on(DATA_RECEIVED, (data) => {
            // console.log(data.responses);
            // const freshData = data.responses.reduce((acc, value) => ({
            //     ...acc,
            //     ...value
            // }), {});

            dispatch(OBDIIActions.obdiiDataReceived(data));
        });

        EventRegister.on(DISCONNECTED, () => {
            dispatch(OBDIIActions.obdiiDisconnected());
        });
    }

    componentWillUnmount() {
        EventRegister.rmAll();
    }

    render() {
        return (
            <Provider store={Store}>
                <BaseNavigator/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('obdiitether', () => App);
