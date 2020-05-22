//UseState is not used, so it is commented out
//import React, {useState} from 'react';
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import Listing from '../models/listing';

function ProductListScreen({route, navigation, Component}) {

  //productID is the ID passed through as a parameter when navigating to this screen from the MainScreen.
  //Creates an array called retrievedListing and then concats it with another array. May need to change this logic at some point.
  const {category} = route.params;
  const {getListings} = route.params;
  const {deviceName} = route.params;
  let [retrievedListing, setListing] = useState([]);
  let [pulledListing, setPulled] = useState([Listing]);

  //The below useEffect function fetches the JSON data from the API and stores it into the pulledListing array. It is set to only fetch the data
  // once per screen render so that the array can be filtered without being reverted back to the original state.
  // It also has a special Samsung check to see if the device name begins with samsung, if it does then it will remove the first 8 characters from the string.
  useEffect(() => {
    let accessoryURL = '';
    let samsungCheck = deviceName.toLowerCase();
    let name = deviceName;
    if (samsungCheck.substr(0, samsungCheck.indexOf(" ")) === 'samsung')
    {
      name = samsungCheck.slice(8);
    }
    if (category.id === 1 || category.id === 2)
      {
        accessoryURL = getListings + name;
      }
    else if (category.id === 3 || category.id ==4)
     {
       accessoryURL = getListings;
     }
    fetch(accessoryURL)
        .then(response => response.json())
        .then(json => setPulled(json));
  }, [category.id, getListings, deviceName]);

  //The listFilterHandler is used to filter the order of the product listings.
  function listFilterHandler(listingsArray) {
    //setListing(listingsArray.sort((a, b) => a.price < b.price))
    listingsArray.sort((a, b) => a.price < b.price)
  }
  /*function filterAlphabetical(pulledArray) {
    setPulled(pulledArray.sort((a, b) => a.releaseYear < b.releaseYear))
  }*/

  //This changes the header label. change this to hi to see what is updated.
  navigation.setOptions({title: category.Title});
  //The FilterPrice function sorts the array by price ( low to high).
  function FilterPrice(listingsArray) {
    setListing(listingsArray.sort((a, b) => a.price > b.price));
    }

  //Returns a FlatList view which uses the data from retrievedListing array. At present it only prints out the productID that is passed through,
  //the title of the listing and the price.
  return (

    <View style={styles.screen}>

      <View style={styles.options}>
        <Button
          title={'Filter ' + category.Title}
          onPress={() => FilterPrice(pulledListing)}

        />
      </View>
      <FlatList
        data={pulledListing}
        KeyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product Details', {
                itemDetails: item,
              })
            }>
            <View style={styles.listItem}>
              <View style={styles.listItemImage}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.imageSmall,
                  }}
                  resizeMode={'cover'}
                />
              </View>
              <View style={styles.listItemName}>
                <Text>
                  {' '}
                  {item.product} : PRICE: {item.price}
                </Text>
              </View>
              <View style={styles.listPrice}>
                <Text>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  options: {
    padding: 5,
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    //       backGround: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
  listItemImage: {
    width: '20%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 1,
  },
  listItemName: {
    width: '80%',
    height: '50%',
    overflow: 'hidden',
  },
  listPrice: {
    position: 'absolute',
    //This aligns the block to the right. can also be used for padding
    right: 0,
    //So it doesnt touch the boarder
    alignSelf: 'flex-end',
    //https://stackoverflow.com/questions/29541971/absolute-and-flexbox-in-react-native
    padding: 3,
  },

});

export default ProductListScreen;
