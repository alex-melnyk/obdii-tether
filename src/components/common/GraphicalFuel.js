import React, {Component} from 'react';
import {Animated, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Path, Svg} from "react-native-svg";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {makeArc} from "../../utils/Graphic";
import Colors from "../../utils/Colors";

class GraphicalFuel extends Component {
    animatedValue = new Animated.Value(0);

    animateToValue = (value) => {
        Animated.timing(this.animatedValue, {
            toValue: value / this.props.maximum,
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
            overload,
            maximum
        } = this.props;

        const width = 74;
        const height = 300;
        const cx = 210;
        const cy = height / 2;

        const radius = 200;
        const angleDiff = Math.abs(angleFrom - angleTill);

        const animatedProgress = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [angleFrom, angleTill]
        });

        const overdrive = overload / maximum * angleDiff - angleTill;
        const strokeDots = Math.PI * radius * angleDiff / 180 / 20 - 1;
        const strokeDash = Math.PI * radius * angleDiff / 180 / 2 - 7;

        return (
            <View style={[{
                height: '100%',
                justifyContent: 'center'
            }, style]}>
                <View style={{}}>
                    <Svg {...{width, height}}>
                        {/*<Path*/}
                        {/*d={makeArc(cx, cy, radius, overdrive, angleTill)}*/}
                        {/*fill="none"*/}
                        {/*stroke={Colors.CRIMSON}*/}
                        {/*strokeWidth={16}*/}
                        {/*strokeLinecap="round"*/}
                        {/*/>*/}
                        <Path
                            d={makeArc(cx, cy, radius, angleFrom, animatedProgress.__getValue())}
                            fill="none"
                            stroke={Colors.COSMIC_LATTE}
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
                    alignItems: 'flex-end'
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
                            name="fuel"
                            color={Colors.SMOKY_BLACK}
                            size={26}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

//#DB162F
GraphicalFuel.propTypes = {
    angleFrom: PropTypes.number,
    angleTill: PropTypes.number,
    value: PropTypes.number,
    underload: PropTypes.number,
    overload: PropTypes.number,
    maximum: PropTypes.number,
};

GraphicalFuel.defaultProps = {
    angleFrom: -135,
    angleTill: -45,
    value: 0,
    overload: 6500,
    maximum: 8000,
};

export {GraphicalFuel};