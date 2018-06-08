import React, {Component} from 'react';
import {Animated, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {makeArc} from "../../utils/Graphic";
import {Path, Svg} from "react-native-svg";
import Colors, {hexToRgb} from "../../utils/Colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

class GraphicalRPM extends Component {
    animatedValue = new Animated.Value(0);

    animateToValue = (value) => {
        Animated.timing(this.animatedValue, {
            toValue: value / this.props.maximum,
            duration: 500
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
            angleFrom,
            angleTill,
            overload,
            maximum,
            working
        } = this.props;

        const width = 400;
        const height = 400;
        const cx = width / 2;
        const cy = height / 2;

        const radius = 150;
        const angleDiff = Math.abs(angleFrom - angleTill);

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [angleFrom, angleTill]
        });

        const animatedColor = this.animatedValue.interpolate({
            inputRange: [0, working / maximum, 1],
            outputRange: [
                hexToRgb(Colors.COSMIC_LATTE.replace('#', '')),
                hexToRgb(Colors.COSMIC_LATTE.replace('#', '')),
                hexToRgb(Colors.CRIMSON.replace('#', ''))
            ]
        });

        const overdrive = overload / maximum * angleDiff - angleTill;
        const strokeDots = Math.PI * radius * angleDiff / 180 / 48 - 1;
        const strokeDash = Math.PI * radius * angleDiff / 180 / 8 - 5.5;

        return (
            <Svg {...{width, height}}>
                <Path
                    d={makeArc(cx, cy, radius, overdrive, angleTill)}
                    fill="none"
                    stroke={Colors.CRIMSON}
                    strokeWidth={16}
                    strokeLinecap="round"
                />
                <AnimatedPath
                    d={makeArc(cx, cy, radius, angleFrom, animatedProgress.__getValue())}
                    fill="none"
                    stroke={animatedColor.__getValue()}
                    strokeWidth={10}
                    strokeLinecap="round"
                />
                <Path
                    d={makeArc(cx, cy, radius, angleFrom, angleTill)}
                    fill="none"
                    stroke={Colors.TIMBERWOLF}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeDasharray={`1,${strokeDots}`}
                />
                <Path
                    d={makeArc(cx, cy, radius, angleFrom, angleTill)}
                    fill="none"
                    stroke={Colors.TIMBERWOLF}
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeDasharray={`5,${strokeDash}`}
                />
            </Svg>
        );
    }
}

GraphicalRPM.propTypes = {
    angleFrom: PropTypes.number,
    angleTill: PropTypes.number,
    value: PropTypes.number,
    overload: PropTypes.number,
    maximum: PropTypes.number,
    working: PropTypes.number,
};

GraphicalRPM.defaultProps = {
    angleFrom: -135,
    angleTill: 135,
    value: 0,
    overload: 6500,
    maximum: 8000,
    working: 3000,
};

export {GraphicalRPM};