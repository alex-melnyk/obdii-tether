import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

class DisplayGearBox extends Component {
    render() {
        const {
            size,
            value,
        } = this.props;

        let color = '#FFFCE8';

        switch (value) {
            case 'P':
            case 'R':
                color = '#ED1C24';
                break;
        }

        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
            }}>
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
    size: 40
};

export {DisplayGearBox};