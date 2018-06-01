import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import Colors from "../../utils/Colors";

class DisplayGearBox extends Component {
    visible = true;

    componentDidMount() {
        this.timerID = setInterval(() => this.visible = !this.visible, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {
            style,
            size,
            value,
        } = this.props;

        let color = Colors.COSMIC_LATTE;

        switch (value) {
            case 'P':
            case 'R':
                color = Colors.TRACTOR_RED;
                break;
        }

        return (
            <View style={[{
                top: -30,
                alignItems: 'center',
                justifyContent: 'center'
            }, style]}>
                <Text style={{
                    textAlign: 'center',
                    color: color,
                    fontSize: size,
                    fontFamily: '1GTA SA'
                }}>{value}</Text>
            </View>
        );
    }
}

DisplayGearBox.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
};

DisplayGearBox.defaultProps = {
    size: 30
};

export {DisplayGearBox};