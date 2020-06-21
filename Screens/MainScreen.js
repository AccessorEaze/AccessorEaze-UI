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
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';

export function MainScreen({navigation}) {
  let PhoneModel = 'VOG-L09';
  const [phoneDetails, setPhoneDetails] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState({});
  const [isLogin, setLogin] = useState(false);

  const loginToggle = () => {
    setShowLogin(!showLogin);
  };
  const registerToggle = () => {
    setShowRegister(!showRegister);
  };

  function userNameInputHandler(enteredText) {
    setUserName(enteredText);
  }
  function userEmailInputHandler(enteredText) {
    setUserEmail(enteredText);
  }
  function userPasswordInputHandler(enteredText) {
    setUserPassword(enteredText);
  }

  //Account Registration
  function registerHandler(username, email, password) {
    fetch(
      'http://au.minescape.me:3000/account/signup/' +
        userName +
        '/' +
        userEmail +
        '/' +
        userPassword,
    ).then((response) =>
      response.json().then((json) => setLoginResponse(json)),
    );
    if (loginResponse.hasOwnProperty('success')) {
      alert('Your account has been created');
    } else if (loginResponse.hasOwnProperty('error')) {
      alert(loginResponse.error);
    }
  }

  //Account Login
  //function loginHandler(username, password) {
  function loginHandler(userName, userPassword) {
    /*    fetch(
      'http://au.minescape.me:3000/account/login/' +
        userName +
        '/' +
        userPassword,
    )*/
    fetch(
      'http://au.minescape.me:3000/account/login/' +
        userName +
        '/' +
        userPassword,
    )
      .then((response) => response.json())
      .then((json) => setLoginResponse(json))
      /*      .then(() => {
        if (loginResponse.error == null) {
          alert('Login Successful');
          Objects[3].Title = 'Favourites';
          Objects[3].iconName = 'star-face';
          setLogin(true);
        } else if (loginResponse.success == null) {
          alert('Incorrect username or password.');
        }
      })*/
      .catch(() => {
        //this is for when the username and password are empty, causes a 404 on the server.
        alert('Please enter a username and password.');
      });
    if (loginResponse.success == true) {
      alert('Login Successful');
      Objects[3].Title = 'Favourites';
      Objects[3].iconName = 'star-face';
      setLogin(true);
    } else if (loginResponse.error == true) {
      alert('Incorrect username or password.');
    }
  }

  //This allows the model name to be shown at the top of the title screen where "main" used to be.
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // The following may be enabled as necessary
  //navigation.setOptions({title: 'Your phone is a ' + PhoneModel});

  //The following is the original code / package that was used to create the initial application user interface
  //https://github.com/saleel/react-native-super-grid

  function goto(navigation, item, phoneDetails) {
    if (item.id == 4) {
      if (!isLogin) {
        loginToggle();
      }
    } else {
      if (phoneDetails.error == null) {
        navigation.navigate('Product List', {
          category: item,
          getListings: item.URL,
          deviceName: phoneDetails[0].name,
        });
      } else {
        alert(
          'Cannot find your phone model on our servers. Your phone may be too new, not an official model supported by google, or you may be offline. Items shown may not fit your phone.',
        );
        navigation.navigate('Product List', {
          category: item,
          getListings: item.URL,
          error: true,
        });
      }
    }
  }

  //The UseEffect below appends the phone model to the API URL so that it can retrieve the name of the phone and store it in the
  useEffect(() => {
    fetch('http://au.minescape.me:3000/phones/model/search/' + PhoneModel)
      //Changed fetch so that it searches the correct phone model.
      //fetch('http://au.minescape.me:3000/phones/model/search/' + PhoneModel)
      .then((response) => response.json())
      .then((json) => setPhoneDetails(json));
    //.then(alert(JSON.stringify(phoneDetails)));
  }, [PhoneModel]);

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
                style={[styles.itemContainer, {backgroundColor: item.Color}]}
                onPress={() => {
                  {
                    goto(navigation, item, phoneDetails);
                  }
                }}>
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
        />

        <Modal
          isVisible={showRegister}
          //remove this so accidental clicks do not close it
          onBackdropPress={() => registerToggle(false)}
          onBackButtonPress={() => registerToggle(false)}
          useNativeDriver={true}>
          <View style={styles.modalViewStyle}>
            <TextInput
              style={{borderBottomColor: 'black', borderBottomWidth: 1}}
              id="username"
              label="User Name"
              placeholder="User Name"
              autoCapitalize="none"
              onChangeText={userNameInputHandler}
              //  onValueChange={() => {}}
              initialValue=""
            />
            <TextInput
              style={{borderBottomColor: 'black', borderBottomWidth: 1}}
              id="email"
              label="Email Address"
              placeholder="Email Address"
              autoCapitalize="none"
              //keyboardType = 'email-address'
              onChangeText={userEmailInputHandler}
              // onValueChange={() => {}}
              initialValue=""
            />
            <TextInput
              style={{borderBottomColor: 'black', borderBottomWidth: 1}}
              id="password"
              label="Password"
              placeholder="Password"
              minLength={7}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={userPasswordInputHandler}
              //onValueChange={() => {}}
              initialValue=""
            />
            <Button
              title="Register"
              onPress={() => {
                registerToggle();
                registerHandler(userName, userEmail, userPassword);
              }}
            />
          </View>
        </Modal>

        <Modal
          isVisible={showLogin}
          //remove this so accidental clicks do not close it
          onBackdropPress={() => loginToggle(false)}
          onBackButtonPress={() => loginToggle(false)}
          useNativeDriver={true}>
          <View style={styles.modalViewStyle}>
            <TextInput
              style={{borderBottomColor: 'black', borderBottomWidth: 1}}
              id="username"
              label="User Name"
              placeholder="User Name"
              autoCapitalize="none"
              onChangeText={userNameInputHandler}
              //  onValueChange={() => {}}
              initialValue=""
            />
            <TextInput
              style={{borderBottomColor: 'black', borderBottomWidth: 1}}
              id="password"
              label="Password"
              placeholder="Password"
              minLength={7}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={userPasswordInputHandler}
              //onValueChange={() => {}}
              initialValue=""
            />
            <Button
              title="Login"
              onPress={() => {
                loginToggle();
                loginHandler(userName, userPassword);
              }}
            />

            <Button
              title="Create Account"
              onPress={() => {
                loginToggle();
                registerToggle();
              }}
            />
          </View>
        </Modal>
      </SafeAreaView>
    </View>
    //This is so the main screen doesnt have scroll capability. This is a design choice as there is only 4 options, so scrolling is not necessary.
    //scrollEnabled={false}
  );
}

export var Objects = [
  {
    Title: 'Cases',
    Color: '#fc223b',
    iconName: 'glassdoor',
    id: 1,
    URL: 'http://au.minescape.me:3000/accessories/search/phone_case/',
  },
  {
    Title: 'Screen Protectors',
    Color: '#3894df',
    iconName: 'cellphone-screenshot',
    id: 2,
    URL: 'http://au.minescape.me:3000/accessories/search/screen_protector/',
  },
  {
    Title: 'Headphones',
    Color: '#ffb508',
    iconName: 'headphones',
    iconSize: (Dimensions.get('window').width - 70) / 2,
    id: 3,
    URL: 'http://au.minescape.me:3000/accessories/search/headphones',
  },
  {
    Title: 'Login',
    Color: '#56b12e',
    iconName: 'login',
    id: 4,
    URL: 'http://au.minescape.me:3000/accessories/search/headphones',
  },
];

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 5,
    padding: 10,
    //This adjusts the physical length / height of the tiles that are displayed.
    height: (Dimensions.get('window').height - 56) / 2,
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
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#666666',
  },
});
