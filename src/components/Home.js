import React, {Component} from 'react';
import {Dimentions, SafeAreaView, Text, View} from 'react-native';
import {DisplayGearBox} from "./common/DisplayGearBox";
import {DisplayRPM} from "./common/DisplayRPM";
import {GraphicalRPM} from "./common/GraphicalRPM";
import {DisplaySpeed} from "./common/DisplaySpeed";
import {GraphicalFuel} from "./common/GraphicalFuel";
import {GraphicalTemperature} from "./common/GraphicalTemperature";

class Home extends Component {
    state = {
        connected: false,
        command: '',
        responses: [],
        rpm: 0,
        speed: 0,
        voltage: 12.6,
        temperature: 97,
        gear: 'D',
        fuel: 80
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
        } else if (!connecting && connected) {
            obdiiDisconnect();
        }
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({
                rpm: 600 + Math.random() * 7400
            });
        }, 500);

        setInterval(() => {
            this.setState({
                speed: this.state.speed <= 160 ? this.state.speed + 10 : 0
            });
        }, 200);
    }

    render() {
        const {
            connecting,
            connected,
        } = this.props;

        const {
            rpm,
            speed,
            voltage,
            fuel,
            temperature,
            gear
        } = this.state;

        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#0F110C'
            }}>
                <View style={{
                    paddingHorizontal: 20,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <GraphicalFuel
                        value={fuel}
                        maximum={100}
                    />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GraphicalRPM value={rpm}/>
                        <View style={{
                            position: 'absolute'
                        }}>
                            <DisplayGearBox
                                value={gear}
                            />
                            <DisplaySpeed value={speed}/>
                            <DisplayRPM value={Math.round(rpm)} />
                        </View>
                    </View>
                    <GraphicalTemperature value={temperature}/>
                </View>
            </SafeAreaView>
        );
    }
}

export default Home;