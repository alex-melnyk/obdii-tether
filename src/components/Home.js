import React, {Component} from 'react';
import {Dimentions, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DisplayGearBox} from "./common/DisplayGearBox";
import {DisplayRPM} from "./common/DisplayRPM";
import {GraphicalRPM} from "./common/GraphicalRPM";
import {DisplaySpeed} from "./common/DisplaySpeed";
import {GraphicalFuel} from "./common/GraphicalFuel";
import {GraphicalTemperature} from "./common/GraphicalTemperature";
import Colors from "../utils/Colors";

class Home extends Component {
    state = {
        connected: false,
        command: '',
        responses: [],
        rpm: 0,
        speed: 0,
        voltage: 12.6,
        temperature: 101,
        gear: 'D',
        fuel: 65
    };

    connectionClicked = () => {
        const {
            connecting,
            connected,
            obdiiConnect,
            obdiiDisconnect
        } = this.props;

        if (!connecting && !connected) {
            obdiiConnect();
        } else if (connecting || connected) {
            obdiiDisconnect();
        }
    };

    componentDidMount() {
        // setInterval(() => {
        //     this.setState({
        //         rpm: 600 + Math.random() * 7400
        //     });
        // }, 500);
        //
        // setInterval(() => {
        //     this.setState({
        //         speed: this.state.speed <= 160 ? this.state.speed + 10 : 0
        //     });
        // }, 200);
    }

    render() {
        const {
            connecting,
            connected,
        } = this.props;

        // const connecting = true;
        // const connected = false;

        const {
            rpm,
            speed,
            temperature,
            gear,
            fuel,
        } = this.props;

        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#0F110C'
            }}>
                <View style={{
                    // position: 'absolute',
                    padding: 5,
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity onPress={this.connectionClicked}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 26,
                            height: 26,
                            // borderRadius: 13,
                            // backgroundColor: Colors.COSMIC_LATTE
                        }}>
                            <Icon
                                style={{top: 2}}
                                name={'ios-flash'}
                                size={20}
                                color={connecting
                                    ? Colors.STIL_DE_GRAIN_YELLOW
                                    : connected ? Colors.PASTEL_GREEN : Colors.CRIMSON
                                }
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <GraphicalFuel value={fuel}/>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GraphicalRPM value={rpm}/>
                        <View style={{
                            position: 'absolute'
                        }}>
                            <DisplayGearBox value={gear}/>
                            <DisplaySpeed value={speed}/>
                            <DisplayRPM value={Math.round(rpm)}/>
                        </View>
                    </View>
                    <GraphicalTemperature value={temperature}/>
                </View>
            </SafeAreaView>
        );
    }
}

export default Home;