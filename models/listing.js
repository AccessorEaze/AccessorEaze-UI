import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


/*function ListItem({navigation}) {
    return (
        <TouchableOpacity onPress={navigation.navigate('Product Details', {})}/>
    )
}*/

class Listing {
    constructor(productId, id, title, price, URL, vendor)
    {
        this.productId = productId;
        this.id = id;
        this.title = title;
        this.price = price;
        this. URL = URL;
        this.vendor = vendor;
       // this.bigImage = bigImage;
       // this.smlImage = smlImage;
    }
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#CCC',
        borderColor: 'black',
        borderWidth: 1
    },
});

export default Listing;
