import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

/*function ListItem({navigation}) {
    return (
        <TouchableOpacity onPress={navigation.navigate('Product Details', {})}/>
    )
}*/

class Listing {
  constructor(productId, id, title, price, URL, vendor, smlImage) {
    this.productId = productId;
    //Tostring operation on id allows data to be stored as numbers on data/dummy.js, and converted to string when the required list view is called.
    //This is what caused the visualization error. hopefully the data in the future will be stored as a string to prevent this from being an issue.
    this.id = id.toString();
    this.title = title;
    this.price = price;
    this.URL = URL;
    this.vendor = vendor;
    // this.bigImage = bigImage;
    this.smlImage = smlImage;
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#CCC',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default Listing;
