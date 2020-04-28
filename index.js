/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import MainScreen from './Screens/MainScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => MainScreen);
