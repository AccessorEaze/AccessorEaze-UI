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
import Modal from 'react-native-modal';
import {DUMMYLIST} from '../data/dummy';

export function filterVendor(listingsArray, vendorName) {
  let sorted = listingsArray.filter(function(obj) {
    return obj.vendor === vendorName;
  });

  return sorted;
}

function ProductListScreen({route, navigation, Component}) {
  //productID is the ID passed through as a parameter when navigating to this screen from the MainScreen.
  //Creates an array called retrievedListing and then concats it with another array. May need to change this logic at some point.
  const {category} = route.params;
  const {getListings} = route.params;
  const {deviceName} = route.params;
  let retrievedListing = DUMMYLIST;
  let [pulledListing, setPulled] = useState([Listing]);
  let [dummylist, setIt] = useState(DUMMYLIST);

  //The below useEffect function fetches the JSON data from the API and stores it into the pulledListing array. It is set to only fetch the data
  // once per screen render so that the array can be filtered without being reverted back to the original state.
  // It also has a special Samsung check to see if the device name begins with Samsung, if it does then it will remove the first 8 characters from the string.
  useEffect(() => {
    let accessoryURL = '';
    let samsungCheck = deviceName.toLowerCase();
    let name = deviceName.replace(/\s+/g, '');
    if (samsungCheck.substr(0, samsungCheck.indexOf(' ')) === 'samsung') {
      name = samsungCheck.slice(8);
    }
    if (category.id === 1 || category.id === 2) {
      accessoryURL = getListings + name;
    } else if (category.id === 3 || category.id == 4) {
      accessoryURL = getListings;
    }
    fetch(accessoryURL)
      .then(response => response.json())
      .then(json => setPulled(json));
  }, [category.id, getListings, deviceName]);

  //The listFilterHandler is used to filter the order of the product listings.
  function listFilterHandler(listingsArray) {
    //setListing(listingsArray.sort((a, b) => a.price < b.price))
    listingsArray.sort((a, b) => a.price < b.price);
  }


  //This changes the header label. change this to hi to see what is updated.
  navigation.setOptions({title: category.Title});
  //The FilterPrice function sorts the array by price (low to high).
  function FilterPrice(listingsArray) {
    setPulled(listingsArray.sort((a, b) => a.price > b.price));
  }

  function filterVendor(listingsArray, vendorName) {
    let sorted = listingsArray.filter(function(obj) {
      return obj.vendor === vendorName;
    });

    setIt(sorted);
  }

  function filterRatings(listingsArray) {
    setPulled(listingsArray.sort((a, b) => a.ratings < b.ratings));
  }

  //This allows the modal view.
  const [ModalVisible, setModalVisible] = useState(false);

  const toggle = () => {
    setModalVisible(!ModalVisible);
  };

  //Returns a FlatList view which uses the data from retrievedListing array. At present it only prints out the productID that is passed through,
  //the title of the listing and the price.
  return (
    <View style={styles.screen}>
      <View style={styles.options}>
        <Button
          title={'Filter ' + category.Title + ' by:'}
          onPress={() => toggle()}
        />
      </View>
      <FlatList
        data={dummylist}
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
                  {item.product} + {item.ratings} + {item.vendor}
                </Text>
              </View>
              <View style={styles.listPrice}>
                <Text>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        isVisible={ModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        useNativeDriver={true}>
        <View style={styles.modalViewStyle}>
          <Button
            title="Price: Low-High"
            onPress={() => {
              toggle();
              FilterPrice(dummylist);
            }}
          />
          <Button
              title="Rating"
              onPress={() => {
                toggle();
                filterRatings(dummylist);
              }} />
          <Button
              title="Vendor: PB Tech"
              onPress={() => {
                toggle();
                filterVendor(dummylist,'PBtech');
              }} />
          <Button title="Vendor: JB Hi-Fi" onPress={toggle} />
          <Button title="Clear Filters"
                  onPress={() => {
                  toggle();
                  setIt(retrievedListing);
                  }}/>
        </View>
      </Modal>
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
    //Odd look with the box only being white
    //backgroundColor: 'white',
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    //       backGround: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    //This is to round out edges of the container.
    borderRadius: 5,
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
  //Style view for modal
  modalViewStyle: {
    flex: 0.4,
    justifyContent: 'space-between',
  },
});

export default ProductListScreen;
