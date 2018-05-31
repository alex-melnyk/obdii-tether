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
        curRPM: 680,
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
        setInterval(() => {
            this.setState({
                curRPM: 600 + Math.random() * 100
            });
        }, 250);

        setInterval(() => {
            this.setState({
                speed: this.state.speed <= 50 ? this.state.speed + 10 : 0
            });
        }, 1000);
    }

    render() {
        const {
            connecting,
            connected,
        } = this.props;

        const {curRPM} = this.state;

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
                        value="12.4V"
                    />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <GraphicalRPM value={curRPM}/>
                        <View style={{
                            position: 'absolute'
                        }}>
                            {
                                this.props.gear &&
                                <DisplayGearBox value={this.props.gear}/>
                            }
                            {
                                this.state.speed !== null &&
                                <DisplaySpeed value={this.state.speed} />
                            }
                            <DisplayRPM
                                style={{
                                    top: 50
                                }}
                                label="rpm"
                                size={20}
                                value={Math.round(curRPM)}
                            />
                        </View>
                    </View>
                    <DisplayDigit
                        label="˚C"
                        size={20}
                        value={107}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default Home;