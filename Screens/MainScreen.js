// In App.js in a new project

import * as React from 'react';
import {getModel} from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SectionGrid} from 'react-native-super-grid';
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

export function HomeScreen({navigation}) {
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

export function MainScreen({navigation}) {
  let PhoneModel = getModel();
  let item = Objects;
  //const selectedProduct = item.find(product => product.id ===)

  //This allows the model name to be shown at the top of the title screen where "main" used to be.
  navigation.setOptions({title: PhoneModel});

  //The following is the original code / package that was used to create the initial application user interface
  //https://github.com/saleel/react-native-super-grid

  return (
    // the StatusBar hidden hides the status bar of the system when running, creating a fullscreen application.
    // I have also used scrollview so that if more tiles are added, they can be scrolled forward. The SafeAreaView is used for iOS touch? This is all i can remember off the top of my head.
    // I also changed the screen rotation. The screen does not rotate anymore.
    //Touchable opacity was a pain in the ass to fix
    //The background color sets the color for this page only. There is a bug where it doesnt cover the entire back, leaving the bottom exposed.
    <View style={{backgroundColor: '#666666'}}>
      <StatusBar hidden={true} />
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
                //onPress={() => navigation.navigate('Product List')}>
                /*onPress={() =>
                  navigation.navigate({
                    routeName: 'Product List',
                    params: {productID: item.id},
                  })
                }>*/
                onPress={() =>
                  navigation.navigate(
                    'Product List',
                    {
                      category: item,
                    },
                    navigation.setParams({Title: 'Hi'}),
                  )
                }>
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

export const Objects = [
  {Title: 'Cases', Color: '#fc223b', iconName: 'glassdoor', id: 1},
  {
    Title: 'Screen Protectors',
    Color: '#3894df',
    iconName: 'cellphone-screenshot',
    id: 2,
  },
  {Title: 'Headphones', Color: '#ffb508', iconName: 'headphones', id: 4},
  {Title: 'Other Accessories', Color: '#56b12e', iconName: 'star-face', id: 4},
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
