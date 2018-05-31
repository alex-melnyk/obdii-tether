import React, {Component} from 'react';
import {Dimentions, SafeAreaView, Text, View} from 'react-native';
import {DisplayDigit} from "./common/DisplayDigit";
import {DisplayGearBox} from "./common/DisplayGearBox";
import {DisplayRPM} from "./common/DisplayRPM";
import {GraphicalRPM} from "./common/GraphicalRPM";
import {DisplaySpeed} from "./common/DisplaySpeed";

class Home extends Component {
    state = {
        connected: false,
        command: '',
        responses: [],
        rpm: 0,
        speed: 0
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
        // setInterval(() => {
        //     this.setState({
        //         curRPM: 600 + Math.random() * 100
        //     });
        // }, 250);

        // setInterval(() => {
        //     this.setState({
        //         speed: this.state.speed <= 50 ? this.state.speed + 10 : 0
        //     });
        // }, 1000);
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
            temperature,
            gear
        } = this.props;

        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#0F110C'
            }}>

                {/*<TouchableOpacity onPress={this.connectionClicked}>*/}
                {/*<View style={{*/}
                {/*flexDirection: 'row',*/}
                {/*alignItems: 'center',*/}
                {/*justifyContent: 'flex-end',*/}
                {/*height: 50,*/}
                {/*width: '100%',*/}
                {/*paddingHorizontal: 20,*/}
                {/*}}>{*/}
                {/*connecting ? (*/}
                {/*<ActivityIndicator/>*/}
                {/*) : (*/}
                {/*<Icon*/}
                {/*name={`toggle-${connected ? 'on' : 'off'}`}*/}
                {/*size={16}*/}
                {/*/>*/}
                {/*)*/}
                {/*}</View>*/}
                {/*</TouchableOpacity>*/}

                <View style={{
                    paddingHorizontal: 50,
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <DisplayDigit
                        label="VOLTAGE"
                        size={20}
                        value={voltage}
                    />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GraphicalRPM value={this.props.rpm}/>
                        <View style={{
                            position: 'absolute'
                        }}>
                            <DisplayGearBox
                                style={{top: -30}}
                                value={gear}
                            />
                            {
                                speed !== null &&
                                <DisplaySpeed value={speed}/>
                            }
                            <DisplayRPM
                                style={{top: 50}}
                                label="RPM"
                                size={20}
                                value={Math.round(rpm)}
                            />
                        </View>
                    </View>
                    <DisplayDigit
                        label="˚C"
                        size={20}
                        value={temperature}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Home;