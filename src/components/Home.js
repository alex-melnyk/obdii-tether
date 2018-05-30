import React, {Component} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

import {DigitalCounter} from "./common/DigitalCounter";

class Home extends Component {
    state = {
        connected: false,
        command: '',
        responses: []
    };

    //C1 33 F1 81 66
    //01 0C

    // -> [3F,0D,0D,3E]

    connectionClicked = () => {
        const {
            connecting,
            connected,
            obdiiConnect,
            obdiiDisconnect
        } = this.props;

        if (!connecting && !connected) {
            obdiiConnect();
        } else if (!connecting && connected) {
            obdiiDisconnect();
        }
    };

    render() {
        const {
            connecting,
            connected,
        } = this.props;

        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center'
            }}>

                <TouchableOpacity onPress={this.connectionClicked}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: 50,
                        width: '100%',
                        paddingHorizontal: 20,
                    }}>{
                        connecting ? (
                            <ActivityIndicator/>
                        ) : (
                            <Icon
                                name={`toggle-${connected ? 'on' : 'off'}`}
                                size={16}
                            />
                        )
                    }</View>
                </TouchableOpacity>

                <View style={{paddingHorizontal: 50}}>
                    <DigitalCounter
                        label="RPM"
                        value={this.props.rpm}
                        suffix="rpm"
                        backdropShow={true}
                        backdropDigits={4}
                    />

                    <DigitalCounter
                        label="SPD"
                        value={this.props.speed}
                        suffix="km/h"
                        backdropShow={true}
                        backdropDigits={3}
                    />

                    <DigitalCounter
                        label="TMP"
                        value={this.props.temperature}
                        suffix="˚C"
                        backdropShow={true}
                        backdropDigits={3}
                    />

                    <DigitalCounter
                        label="VOL"
                        value={this.props.voltage}
                        suffix="V"
                    />

                    <DigitalCounter
                        label="AGM"
                        value={this.props.gear}
                        backdropShow={true}
                        backdropDigits={1}
                    />
                </View>

                <ScrollView reverse={true}>
                    {this.state.responses.map((text, index) => (
                        <Text key={`response_${index}`}>{text}</Text>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default Home;