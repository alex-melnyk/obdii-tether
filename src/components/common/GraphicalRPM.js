import React, {Component} from 'react';
import {Animated, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {makeArc} from "../../utils/Graphic";
import {Svg, Path} from "react-native-svg";

class GraphicalRPM extends Component {
    animatedValue = new Animated.Value(0);

    componentDidMount() {
        this.animatedValue.addListener(() => this.forceUpdate());
    }

    componentWillReceiveProps(nextProps) {
        Animated.timing(this.animatedValue, {
            toValue: nextProps.value / this.props.maximum,
            duration: 100
        }).start();
    }

    render() {
        const {
            angleFrom,
            angleTill,
            maximum,
            value
        } = this.props;

        const angleDiff = Math.abs(angleFrom - angleTill);
        const angleProgress = angleDiff / maximum * value - angleDiff / 2;

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [angleFrom, angleTill]
        });

        return (
            <Svg width={400} height={400}>
                <Path
                    d={makeArc(200, 200, 150, angleFrom, angleTill)}
                    fill="none"
                    stroke="#FFFCE8"
                    strokeWidth={20}
                    strokeLinecap="round"
                />
                <Path
                    d={makeArc(200, 200, 150, angleFrom, animatedProgress.__getValue())}
                    fill="none"
                    stroke="#DB162F"
                    strokeWidth={20}
                    strokeLinecap="round"
                />
            </Svg>
        );
    }
}

GraphicalRPM.propTypes = {
    angleFrom: PropTypes.number,
    angleTill: PropTypes.number,
    maximum: PropTypes.number,
    value: PropTypes.number
};

GraphicalRPM.defaultProps = {
    angleFrom: -135,
    angleTill: 135,
    maximum: 8000,
    value: 0
};

const Style = {
    backdrop: {
        fontFamily: 'Digital Counter 7',
        opacity: 0.25,
    }
};

export {GraphicalRPM};