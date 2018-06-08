import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Colors from "../../utils/Colors";

class DisplayClock extends Component {
    state = {
        time: new Date(),
        dots: true
    };

    componentDidMount() {
        this.timerID = setInterval(() => this.setState({
            time: new Date(),
            dots: !this.state.dots
        }), 500);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const hours = this.state.time.getHours();
        const minutes = this.state.time.getMinutes();
        // const dots = this.state.time.getSeconds() % 2 === 0 ? 1 : 0;
        const dots = this.state.dots ? 1 : 0;

        return (
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 1,
                paddingTop: 3,
                borderRadius: 10,
                backgroundColor: Colors.SMOKY_BLACK
            }}>
                <Text style={{
                    color: Colors.TIMBERWOLF,
                    fontFamily: '1GTA SA'
                }}>{hours < 10 ? `0${hours}` : hours}</Text>
                <Text style={{
                    opacity: dots,
                    color: Colors.TIMBERWOLF,
                    fontFamily: '1GTA SA',
                }}>:</Text>
                <Text style={{
                    color: Colors.TIMBERWOLF,
                    fontFamily: '1GTA SA'
                }}>{minutes < 10 ? `0${minutes}` : minutes}</Text>
            </View>
        );
    }
}

export {DisplayClock};