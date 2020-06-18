// In App.js in a new project
//Check this out please will need to change the entire thing due to functions being unable to have states.
//https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
//https://www.freecodecamp.org/news/functional-vs-class-components-react-native/
import React, {useState, useEffect} from 'react';
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
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';

class varmodel {
  constructor(id, name, model, error) {
    this.id = id;
    this.name = name;
    this.error = error;
    this.model = model;
  }
}
//Variable list declaration.
//let PhoneModel = 'VOG-L09';
//let [phoneDetails, setPhoneDetails] = useState([varmodel]);

let var2 = null;

//go to the following link and test the code out
//https://reactjs.org/docs/hooks-effect.html
export function MainScreen({navigation}) {
  const [phoneDetails, setPhoneDetails] = useState([]);
  let PhoneModel = 'VOG-L09';
  let saveJSON = null;
  const [Showlogin, SetShowlogin] = useState(false);
  const LoginToggle = () => {
    SetShowlogin(!Showlogin);
  };

  /*
  useEffect(() => {
    fetchData().then(alert(JSON.stringify(saveJSON)));
  }, [PhoneModel, fetchData, saveJSON]);
*/

  /*  const fetchData = async () => {
    const response = await fetch(
      'http://au.minescape.me:3000/phones/model/search/VOG-L09',
    );
    console.log('Hi');
    console.log(response);
    const json = await response.json();
    console.log(json);
    saveJSON = json;
    console.log(saveJSON);
    setPhoneDetails(json);
  };*/

  //Change this///////////////////////////////////////////////////////////////////////
  //let item = Objects;
  //let PhoneModel = getModel();

  //The UseEffect below appends the phone model to the API URL so that it can retrieve the name of the phone and store it in the

  //The UseEffect below appends the phone model to the API URL so that it can retrieve the name of the phone and store it in the
  /*  useEffect(() => {
    /!*    fetch('http://au.minescape.me:3000/phones/model/search/VOG-L09')
      //Changed fetch so that it searches the correct phone model.
      //fetch('http://au.minescape.me:3000/phones/model/search/' + PhoneModel)
      .then((response) => response.json())
      .then((json) => setPhoneDetails(json))
      .then(alert(JSON.stringify(setPhoneDetails)));*!/
  }, [PhoneModel]);*/

  //let testModel = getName(PhoneModel, setPhoneDetails);

  //This allows the model name to be shown at the top of the title screen where "main" used to be.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // The following may be enabled as necessary
  //navigation.setOptions({title: 'Your phone is a ' + PhoneModel});

  //The following is the original code / package that was used to create the initial application user interface
  //https://github.com/saleel/react-native-super-grid

  return (
    // the StatusBar hidden hides the status bar of the system when running, creating a fullscreen application.
    // I have also used scrollview so that if more tiles are added, they can be scrolled forward. The SafeAreaView is used for iOS touch? This is all i can remember off the top of my head.
    // I also changed the screen rotation. The screen does not rotate anymore.
    //Touchable opacity was a pain to fix
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
              title: <Text>Your phone model is {PhoneModel} </Text>,
              //data: item,
              data: Objects,
            },
          ]}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  {backgroundColor: item.Color},
                  {height: item.height},
                ]}
                onPress={() => {
                  LoginToggle();
                  /*                  navigation.navigate('Product List', {
                    //Use this in AndroidManifest.xml in main to prevent errors.
                    //android:usesCleartextTraffic="true" in AndroidManifest.xml
                    category: item,
                    getListings: item.URL,
                    //WARNING THIS CAUSES RUNTIME EXITS WHEN RUN IN RELEASE ON HARDWARE OR EMULATION.
                    deviceName: phoneDetails[0].name,
                  });*/
                }}>
                <Icon
                  style={[styles.iconPos]}
                  name={item.iconName}
                  size={item.iconSize}
                  color="#666666"
                />
                <Text style={styles.itemTitle}>{item.Title}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Modal
          isVisible={Showlogin}
          //remove this so accidental clicks do not close it
          onBackdropPress={() => SetShowlogin(false)}
          onBackButtonPress={() => SetShowlogin(false)}
          useNativeDriver={true}>
          <View style={styles.modalViewStyle}>
            <Button title="Hide modal1" onPress={LoginToggle} />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
    //This is so the main screen doesnt have scroll capability. This is a design choice as there is only 4 options, so scrolling is not necessary.
    //scrollEnabled={false}
  );
}

export const Objects = [
  {
    //Spelling mistake or error?
    //Title: 'Cases for',
    Title: 'Cases',
    Color: '#fc223b',
    iconName: 'glassdoor',
    iconSize: (Dimensions.get('window').width - 70) / 2,
    id: 1,
    URL: 'http://au.minescape.me:3000/accessories/search/phone_case/',
    height: (Dimensions.get('window').height - 55) / 2,
  },
  {
    Title: 'Screen Protectors',
    Color: '#3894df',
    iconName: 'cellphone-screenshot',
    iconSize: (Dimensions.get('window').width - 70) / 2,
    id: 2,
    URL: 'http://au.minescape.me:3000/accessories/search/screen_protector/',
    height: (Dimensions.get('window').height - 55) / 2,
  },
  {
    Title: 'Headphones',
    Color: '#ffb508',
    iconName: 'headphones',
    iconSize: (Dimensions.get('window').width - 70) / 2,
    id: 4,
    URL: 'http://au.minescape.me:3000/accessories/search/headphones',
    height: (Dimensions.get('window').height - 55) / 2,
  },
  /*  {
    Title: 'Other Accessories',
    Color: '#56b12e',
    iconName: 'star-face',
    id: 4,
    URL: 'http://au.minescape.me:3000/accessories/search/headphones',
  },*/
  {
    Title: 'Favorites',
    Color: '#56b12e',
    iconName: 'star-face',
    id: 5,
    URL: 'http://au.minescape.me:3000/accessories/search/headphones',
    height: (Dimensions.get('window').height - 55) / 4,
  },
  {
    Title: 'Login',
    Color: '#56b12e',
    iconName: 'star-face',
    id: 6,
    URL: 'http://au.minescape.me:3000/accessories/search/headphones',
    height: (Dimensions.get('window').height - 55) / 4,
  },
];

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    //This adjusts the physical length / height of the tiles that are displayed.
    //height: (Dimensions.get('window').height - 55) / 2,
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
  loadIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  //Style view for modal
  modalViewStyle: {
    flex: 0.4,
    justifyContent: 'space-between',
  },
});
