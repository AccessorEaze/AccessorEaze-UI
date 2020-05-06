/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
//import MainScreen from './Screens/MainScreen';
//TODO: Change the default export for this class from mainscreen to another. The one I have below is proof of concept.
import Navi from './Screens/ScreenNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navi);
