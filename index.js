import {AppRegistry} from 'react-native';
import BaseNavigator from "./src/navigators/index";

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

AppRegistry.registerComponent('obdiitether', () => BaseNavigator);
