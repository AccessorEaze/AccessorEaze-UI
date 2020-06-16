/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Navi from './Screens/ScreenNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navi);

