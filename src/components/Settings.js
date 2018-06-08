import React, {Component} from 'react';
import {FlatList, ListView, SafeAreaView, Text, View} from 'react-native';
import Colors from "../utils/Colors";

class Settings extends Component {
    changed = [];

    state = {
        prevValue: [],
        nextValue: []
    };

    componentWillReceiveProps(props) {
        const newValues = props.scan['01'].split(/[\s\n]/g);

        this.setState({
            prevValue: !this.state.nextValue.length ? newValues : this.state.nextValue,
            nextValue: newValues
        });
    }

    render() {
        return (
            <SafeAreaView style={{
                paddingHorizontal: 250,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    this.state.nextValue.map((value, index) => {
                        let changed = false;
                        let highter = false;

                        if (value !== this.state.prevValue[index]) {
                            changed = true;
                            if (!this.changed.includes(value)) {
                                this.changed.push(value);
                            }

                            if (parseInt(this.state.prevValue[index], 16) > parseInt(value, 16)) {
                                highter = true;
                            }
                        }

                        const permanent = !this.changed.includes(value);

                        return (
                            <Text style={{
                                width: 22,
                                textAlign: 'center',
                                color: permanent ? 'black': 'gray',
                                backgroundColor: changed
                                    ? highter ? Colors.PASTEL_GREEN : Colors.CRIMSON
                                    : 'transparent'
                            }}>{value}</Text>
                        );
                    })
                }
            </SafeAreaView>
        );
    }
}

export default Settings;