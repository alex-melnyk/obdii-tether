import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

const DigitalCounter = ({label, value, suffix, backdropShow, backdropDigits, digitsSize}) => {
    const bdDigits = [...new Array(backdropDigits)].reduce((acc) => acc + '0', '');

    return (
        <View style={Styles.container}>
            <Text style={[Styles.label, {
                fontSize: digitsSize
            }]}>{label}</Text>
            <View>
                {
                    backdropShow &&
                    <Text style={[Styles.digitsBackdrop, {
                        fontSize: digitsSize
                    }]}>{bdDigits}</Text>
                }
                <Text style={[Styles.digits, {
                    marginTop: digitsSize * -1,
                    fontSize: digitsSize
                }]}>{value}</Text>
            </View>
            <Text style={[Styles.suffix, {
                fontSize: digitsSize / 2
            }]}>{suffix}</Text>
        </View>
    );
};

const Styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%'
    },
    label: {
        fontFamily: 'Digital Counter 7',
        fontSize: 50,
        color: '#333333',
        marginRight: 20
    },
    digits: {
        fontFamily: 'Digital Counter 7',
        fontSize: 50,
        color: '#333333',
        textAlign: 'right'
    },
    digitsBackdrop: {
        fontFamily: 'Digital Counter 7',
        fontSize: 50,
        color: '#EEEEEE'
    },
    suffix: {
        fontFamily: 'Digital Counter 7',
        fontSize: 25,
        color: '#333333',
        marginLeft: 10
    }
};

DigitalCounter.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    backdrop: PropTypes.bool,
    digits: PropTypes.number,
    digitsSize: PropTypes.number,
};
DigitalCounter.defaultProps = {
    label: 'VAL',
    value: 0,
    backdrop: false,
    digits: 3,
    digitsSize: 30,
};

export {DigitalCounter};