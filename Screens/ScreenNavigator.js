import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//import * as details from './Results';
import * as home from './MainScreen';
import ProductListScreen from './ProductListScreen';
import ProductDetailsScreen from './ProductDetails';


//This is where we can hide the screen header in the app. This setting applies globally.
//https://aboutreact.com/react-native-hide-navigation-bar-and-make-screen-full-screen/

const Stack = createStackNavigator();

function Navi() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode={'none'}>
        <Stack.Screen name={'Main'} component= {home.MainScreen} />
        <Stack.Screen name="Product List" component={ProductListScreen} />
        <Stack.Screen name={'Product Details'} component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navi;
