import React, {Component} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import net from 'react-native-tcp';
import { EventRegister } from 'react-native-event-listeners';

class Home extends Component {
    queue = [];
    waitForResponse = false;

    state = {
        connected: false,
        command: '',
        responses: [],
        rpm: 0,
    };

    sendCommand = (command) => {
        if (this.waitForResponse) {
            this.queue.push(command);
        }

        this.waitForResponse = true;
        this.client.write(new Buffer(command + '\r'));
    };

    connect = () => {
        if (this.state.connected) {
            this.client.end();
            this.client.destroy();
            this.client = null;
            this.setState({connected: false});
            return;
        }

        console.log('Connect...');

        this.client = net.createConnection({
            port: 35000,
            host: '192.168.0.10'
        }, () => {
            this.client.on('data', (data) => {
                const response = data.toString('utf8');

                if (response.indexOf('>') >= 0) {
                    this.waitForResponse = false;
                }

                // console.log('message was received', data);
                console.log('message was received', data);
                // const response = String.fromCharCode.apply(null, data);
                this.setState({responses: [response, ...this.state.responses]});

                if (!this.waitForResponse && this.queue.length) {
                    console.log('before', this.queue);
                    this.sendCommand(this.queue.pop());
                    console.log('after', this.queue);
                }
            });

            this.client.on('error', (error) => {
                console.log('ERROR:', error);
            });

            this.sendCommand('AT Z');
            this.sendCommand('AT E0');
            this.sendCommand('AT L0');
            this.sendCommand('AT H0');
            this.sendCommand('AT AT2');
            this.sendCommand('AT ST0A');
            this.sendCommand('AT SP56');

            this.setState({connected: true});

            // setInterval(() => {
            //     this.sendCommand('01 0C')
            // }, 3000);
        });

        //C1 33 F1 81 66
        //01 0C

        // -> [3F,0D,0D,3E]
    };

    sendClicked = () => {
        this.sendCommand(this.state.command);

        this.setState({command: ''});

        //
        // self.write('ATZ');
        //Turns off echo.
        // self.write('ATE0');
        //Turns off extra line feed and carriage return
        // self.write('ATL0');
        //This disables spaces in in output, which is faster!
        // self.write('ATS0');
        //Turns off headers and checksum to be sent.
        // self.write('ATH0');
        //Turn adaptive timing to 2. This is an aggressive learn curve for adjusting the timeout. Will make huge difference on slow systems.
        // self.write('ATAT2');
        //Set timeout to 10 * 4 = 40msec, allows +20 queries per second. This is the maximum wait-time. ATAT will decide if it should wait shorter or not.
        // self.write('ATST0A');
        //Set the protocol to automatic.
        // self.write('ATSP0');
    };

    componentDidMount() {
        EventRegister.addEventListener('receive', (data) => {

        });
    }

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={this.connect}
                >
                    <Icon name="plug" size={16}/>
                    <Text>
                        {this.state.connected ? 'disconnect' : 'connect'}
                    </Text>
                </TouchableOpacity>
                <ActivityIndicator animating={this.state.connected}/>

                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={{width: 200, backgroundColor: '#EEEEEE'}}
                        value={this.state.command}
                        onChangeText={(command) => this.setState({command})}
                    />
                    <TouchableOpacity onPress={this.sendClicked}>
                        <Text>SEND</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>RPM:</Text>
                    <Text>${this.state.rpm}</Text>
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