import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

class Settings extends Component {
    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text>Settings</Text>
            </SafeAreaView>
        );
    }
}

export default Settings;