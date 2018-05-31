import React, {Component} from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import PropTypes from 'prop-types';

class DisplaySpeed extends Component {
    animatedValue = new Animated.Value(0);

    animateToValue = (value) => {
        Animated.timing(this.animatedValue, {
            toValue: value / this.props.maximum,
            duration: 100,
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
            size,
            color,
            maximum,
            style
        } = this.props;

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, maximum]
        });

        return (
            <View style={[{
                alignItems: 'center',
                justifyContent: 'center',
                width: 120
            }, style]}>
                <Text style={{
                    textAlign: 'center',
                    color: color,
                    fontSize: size,
                    fontFamily: '1GTA SA',
                    // backgroundColor: 'red'
                }}>{Math.round(animatedProgress.__getValue())}</Text>
                <Text style={{
                    textAlign: 'center',
                    marginTop: 5,
                    fontFamily: '1GTA SA',
                    fontSize: size / 2,
                    color: '#ED1C24'
                }}>kMh</Text>
            </View>
        );
    }
}

DisplaySpeed.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    maximum: PropTypes.number,
    value: PropTypes.number,
};

DisplaySpeed.defaultProps = {
    size: 40,
    color: '#FFFCE8',
    maximum: 240
};

const Style = {
    backdrop: {
        fontFamily: 'Digital Counter 7',
        opacity: 0.25,
    }
};

export {DisplaySpeed};