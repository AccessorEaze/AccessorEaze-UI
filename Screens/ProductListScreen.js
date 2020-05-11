import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity,Image, Button} from 'react-native';
import {DUMMYLIST} from '../data/dummy';

//const ProductListScreen = props => {
function ProductListScreen({route, navigation}) {

//Creates an array called retrievedListing and then concats it with another array. May need to change this logic at some point.
  //productID is the ID passed through as a parameter when navigating to this screen from the MainScreen.
    const {categoryID} = route.params;
    var retrievedListing = [];
    retrievedListing = retrievedListing.concat(DUMMYLIST);

   /* function FilterPrice() {
        return(


        )
    }*/
  //Returns a FlatList view which uses the data from retrievedListing array. At present it only prints out the productID that is passed through,
  //the title of the listing and the price.
    return (
        <View style={styles.screen}>

            <View style={styles.options}>
                <Button title="Filter" onPress ={() => navigation.navigate('Product List', {
                    filterID: 'priceLow',
                })}/>
            </View>


            <FlatList
                data={retrievedListing}
                KeyExtractor={item => item.id}
                renderItem={({item}) => (

                    <TouchableOpacity onPress={() => navigation.navigate('Product Details', {
                        itemDetails: item,
                    })}>
                        <View style={styles.listItem}>
                            <View style={styles.listItemImage}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'https://www.pbtech.co.nz/thumbs/M/P/MPPSGP00716.jpg.large.jpg?h=1005678348'}}
                                    resizeMode={"cover"}
                                />
                            </View>
                            <View style={styles.listItemName }>
                                <Text > {item.title} :
                                    PRICE: {item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                )}/>
        </View>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    options: {
        padding: 5,
      height: '10%',
      width: '100%',
        backgroundColor: 'white'
    },
    listItem: {
       flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
 //       backGround: '#ccc',
        borderColor: 'black',
        borderWidth: 1
    },
    listItemImage: {
        width: '20%',
       overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        marginHorizontal: 1
    },
    listItemName: {
        width:'80%',
        height:'50%',
        overflow:'hidden'
    }
});

export default ProductListScreen;
