import React, {Component} from 'react';
import {Animated, Text, View, Easing} from 'react-native';
import PropTypes from 'prop-types';
import Colors, {hexToRgb} from "../../utils/Colors";

class DisplayRPM extends Component {
    animatedValue = new Animated.Value(0);

    animateToValue = (value) => {
        Animated.timing(this.animatedValue, {
            toValue: value / this.props.maximum,
            duration: 500,
            easing: Easing.linear
        }).start();
    };

    componentDidMount() {
        this.animatedValue.addListener(() => this.forceUpdate());

        this.animateToValue(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        this.animateToValue(nextProps.value);
    }

    render() {
        const {
            style,
            size,
            working,
            overload,
            maximum,
        } = this.props;

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, maximum]
        });

        const value = Math.round(animatedProgress.__getValue());

        const animatedColor = this.animatedValue.interpolate({
            inputRange: [0, working / maximum, 1],
            outputRange: [
                hexToRgb(Colors.COSMIC_LATTE.replace('#', '')),
                hexToRgb(Colors.COSMIC_LATTE.replace('#', '')),
                hexToRgb(Colors.CRIMSON.replace('#', ''))
            ]
        });

        return (
            <View style={[{
                top: 50,
                alignItems: 'center',
                justifyContent: 'center',
                width: 120
            }, style]}>
                <Animated.Text style={{
                    textAlign: 'center',
                    color: animatedColor,
                    fontSize: size,
                    fontFamily: '1GTA SA',
                    // backgroundColor: 'red'
                }}>{value}</Animated.Text>
                <Text style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontFamily: '1GTA SA',
                    fontSize: size / 2,
                    color: '#ED1C24'
                }}>RPM</Text>
            </View>
        );
    }
}

DisplayRPM.propTypes = {
    size: PropTypes.number,
    value: PropTypes.any,
    overload: PropTypes.number,
    maximum: PropTypes.number,
};

DisplayRPM.defaultProps = {
    size: 20,
    color: '#FFFCE8',
    overload: 6500,
    maximum: 8000,
    working: 3000,
};

export {DisplayRPM};