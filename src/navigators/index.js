import React from "react";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from "../components/Home";
import Settings from "../components/Settings";
import HomeContainer from "../containers/HomeContainer";
import SettingsContainer from "../containers/SettingsContainer";

const BaseNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeContainer,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (<Icon name="rocket" size={24} color={tintColor} />)
        })
    },
    Settings: {
        screen: SettingsContainer,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (<Icon name="gear" size={24} color={tintColor} />)
        })
    }
}, {
    tabBarOptions: {
        showLabel: false
    }
});

const BaseStackNavigator = createStackNavigator({
    Home: HomeContainer,
    Settings: SettingsContainer
}, {
    initialRouteName: 'Settings',
    headerMode: 'none'
});

// export default BaseNavigator;
export default BaseNavigator;