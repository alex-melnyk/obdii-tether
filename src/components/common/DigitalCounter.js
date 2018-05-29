import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

const DigitalCounter = ({label, value, suffix, backdropShow, backdropDigits}) => {

    const bdDigits = [...new Array(backdropDigits)].reduce((acc) => acc + '0', '');

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            width: '100%'
        }}>
            <Text style={{
                fontFamily: 'Digital Counter 7',
                fontSize: 50,
                color: '#333333',
                marginRight: 20
            }}>{label}</Text>
            <View>
                {
                    backdropShow &&
                    <Text style={{
                        fontFamily: 'Digital Counter 7',
                        fontSize: 50,
                        color: '#EEEEEE'
                    }}>{bdDigits}</Text>
                }
                <Text style={{
                    marginTop: -50,
                    fontFamily: 'Digital Counter 7',
                    fontSize: 50,
                    color: '#333333',
                    textAlign: 'right'
                }}>{value}</Text>
            </View>
            <Text style={{
                fontFamily: 'Digital Counter 7',
                fontSize: 25,
                color: '#333333',
                marginLeft: 10
            }}>{suffix}</Text>
        </View>
    );
};

DigitalCounter.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    backdrop: PropTypes.bool,
    digits: PropTypes.number,
};
DigitalCounter.defaultProps = {
    label: 'VAL',
    value: 0,
    backdrop: false,
    digits: 3
};

export {DigitalCounter};