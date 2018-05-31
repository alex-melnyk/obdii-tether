import React, {Component} from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import PropTypes from 'prop-types';

class DisplaySpeed extends Component {
    animatedValue = new Animated.Value(0);

    componentDidMount() {
        this.animatedValue.addListener(() => this.forceUpdate());
    }

    componentWillReceiveProps(nextProps) {
        Animated.timing(this.animatedValue, {
            toValue: nextProps.value / 240,
            duration: 100,
            easing: Easing.linear
        }).start();
    }

    render() {
        const {
            size,
            color,
            label,
            style
        } = this.props;

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 240]
        });

        return (
            <View style={[{
                alignItems: 'center',
                justifyContent: 'center',
                width: 100
            }, style]}>
                <Text style={{
                    textAlign: 'center',
                    color: color,
                    fontSize: size,
                    fontFamily: '1GTA SA',
                    // backgroundColor: 'red'
                }}>{Math.round(animatedProgress.__getValue())}</Text>
                {
                    label &&
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 5,
                        fontFamily: '1GTA SA',
                        fontSize: size / 2,
                        color: '#ED1C24'
                    }}>kMh</Text>
                }
            </View>
        );
    }
}

DisplaySpeed.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
};

DisplaySpeed.defaultProps = {
    size: 40,
    color: '#FFFCE8'
};

const Style = {
    backdrop: {
        fontFamily: 'Digital Counter 7',
        opacity: 0.25,
    }
};

export {DisplaySpeed};