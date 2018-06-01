import React, {Component} from 'react';
import {Animated, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Path, Svg} from "react-native-svg";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {makeArc} from "../../utils/Graphic";
import Colors, {hexToRgb} from "../../utils/Colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

class GraphicalTemperature extends Component {
    animatedValue = new Animated.Value(0);

    animateToValue = (value) => {
        const total = this.props.maximum - this.props.minimum;

        Animated.timing(this.animatedValue, {
            toValue: value / total - this.props.minimum / total,
            duration: 100
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
            angleFrom,
            angleTill,
            working,
            minimum,
            maximum
        } = this.props;

        const width = 74;
        const height = 300;
        const cx = -136;
        const cy = height / 2;

        const radius = 200;
        const angleDiff = Math.abs(angleFrom - angleTill);

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [angleTill, angleFrom]
        });
        const total = this.props.maximum - this.props.minimum;

        const animatedColor = this.animatedValue.interpolate({
            inputRange: [0, working / total - this.props.minimum / total, 1],
            outputRange: [
                hexToRgb(Colors.CELESTIAL_BLUE.replace('#', '')),
                hexToRgb(Colors.COSMIC_LATTE.replace('#', '')),
                hexToRgb(Colors.TRACTOR_RED.replace('#', ''))
            ]
        });

        // -40/215 - -40/215

        // const overdrive = overload / maximum * angleDiff - angleTill;
        const strokeDots = Math.PI * radius * angleDiff / 180 / 20 - 1;
        const strokeDash = Math.PI * radius * angleDiff / 180 / 2 - 7;

        return (
            <View style={[{
                height: '100%',
                justifyContent: 'center'
            }, style]}>
                <View>
                    <Svg {...{width, height}}>
                        {/*<Path*/}
                        {/*d={makeArc(cx, cy, radius, overdrive, angleTill)}*/}
                        {/*fill="none"*/}
                        {/*stroke={Colors.CRIMSON}*/}
                        {/*strokeWidth={16}*/}
                        {/*strokeLinecap="round"*/}
                        {/*/>*/}
                        <AnimatedPath
                            d={makeArc(cx, cy, radius, animatedProgress.__getValue(), angleTill)}
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
                </View>
                <View style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: 20,
                        backgroundColor: Colors.TIMBERWOLF
                    }}>
                        <Icon
                            style={{top: 2}}
                            name="oil-temperature"
                            color={Colors.SMOKY_BLACK}
                            size={22}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

//#DB162F
GraphicalTemperature.propTypes = {
    angleFrom: PropTypes.number,
    angleTill: PropTypes.number,
    value: PropTypes.number,
    working: PropTypes.number,
    minimum: PropTypes.number,
    maximum: PropTypes.number,
};

GraphicalTemperature.defaultProps = {
    angleFrom: 45,
    angleTill: 135,
    value: 0,
    working: 97,
    minimum: -40,
    maximum: 215,
};

export {GraphicalTemperature};