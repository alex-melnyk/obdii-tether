import React from "react";
import {createBottomTabNavigator} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from "../components/Home";
import Settings from "../components/Settings";
import HomeContainer from "../containers/HomeContainer";

const BaseNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeContainer,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (<Icon name="rocket" size={24} color={tintColor} />)
        })
    },
    Settings: {
        screen: Settings,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (<Icon name="gear" size={24} color={tintColor} />)
        })
    }
}, {
    tabBarOptions: {
        showLabel: false,
    }
});

export default BaseNavigator;