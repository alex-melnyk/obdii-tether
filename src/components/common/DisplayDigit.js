import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

class DisplayDigit extends Component {
    render() {
        const {
            size,
            color,
            label,
            value,
            style
        } = this.props;

        return (
            <View style={[{
                alignItems: 'center',
                justifyContent: 'center',
            }, style]}>
                <Text style={{
                    textAlign: 'center',
                    color: color,
                    fontSize: size,
                    fontFamily: '1GTA SA',
                    // backgroundColor: 'red'
                }}>{value}</Text>
                {
                    label &&
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 5,
                        fontFamily: '1GTA SA',
                        fontSize: size / 2,
                        color: '#ED1C24'
                    }}>{label}</Text>
                }
            </View>
        );
    }
}

DisplayDigit.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
};

DisplayDigit.defaultProps = {
    size: 60,
    color: '#FFFCE8'
};

const Style = {
    backdrop: {
        fontFamily: 'Digital Counter 7',
        opacity: 0.25,
    }
};

export {DisplayDigit};