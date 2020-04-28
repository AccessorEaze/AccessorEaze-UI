// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getModel} from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SectionGrid} from 'react-native-super-grid';
import DetailsScreen from './Results';
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

//This is where we can hide the screen header in the app. This setting applies globally.
//https://aboutreact.com/react-native-hide-navigation-bar-and-make-screen-full-screen/
const Stack = createStackNavigator();

//This functions as the control room for the app. this also hooks up the navigation container to the displays, which allows them to switch screens. In this example, the stack screen call is the one that puts the data onto the stack, which we can then click to allow the data to be passed through the system.\
//Following this, it means that we have to put all of the programs information into this class, in order to switch screens.
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{title: 'Bepsis'}}
        />
        <Stack.Screen name={'Main'} component={MainScreen} />
        <Stack.Screen name={'Details'} component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({navigation}) {
  let PhoneModel = getModel();
  let item = Objects;
  return (
    // the StatusBar hidden hides the status bar of the system when running, creating a fullscreen application.
    // I have also used scrollview so that if more tiles are added, they can be scrolled forward. The SafeAreaView is used for iOS touch? This is all i can remember off the top of my head.
    // I also changed the screen rotation. The screen does not rotate anymore.
    //Touchable opacity was a pain in the ass to fix
    //The background color sets the color for this page only. There is a bug where it doesnt cover the entire back, leaving the bottom exposed.
    <View style={{backgroundColor: '#666666'}}>
      <StatusBar hidden />
      <SafeAreaView>
        <SectionGrid
          renderSectionHeader={({section}) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          sections={[
            {
              title: <Text>Your phone model is {PhoneModel}</Text>,
              data: item,
            },
          ]}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={[styles.itemContainer, {backgroundColor: item.Color}]}
                onPress={() => navigation.navigate('Details')}>
                <Icon
                  style={[styles.iconPos]}
                  name={item.iconName}
                  size={(Dimensions.get('window').width - 70) / 2}
                  color="#666666"
                />
                <Text style={styles.itemTitle}>{item.Title}</Text>
              </TouchableOpacity>
            </View>
          )}
          //This is so the main screen doesnt have scroll capability. This is a design choice as there is only 4 options, so scrolling is not necessary.
          //scrollEnabled={false}
        />
      </SafeAreaView>
    </View>
  );
}

const Objects = [
  {Title: 'Cases', Color: '#fc223b', iconName: 'glassdoor'},
  {
    Title: 'Screen Protectors',
    Color: '#3894df',
    iconName: 'cellphone-screenshot',
  },
  {Title: 'Headphones', Color: '#ffb508', iconName: 'headphones'},
  {Title: 'Other Accessories', Color: '#56b12e', iconName: 'star-face'},
];

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    //This adjusts the physical length / height of the tiles that are displayed.
    height: (Dimensions.get('window').height - 60) / 2,
  },
  itemTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 3,
  },
  //This puts the icons at the top of the container.
  iconPos: {
    flex: 1,
  },
});

export default App;
