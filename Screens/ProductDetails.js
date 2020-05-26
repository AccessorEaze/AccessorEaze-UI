import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Image,
  Dimensions,
} from 'react-native';

//const ProductDetailsScreen = props => {
function ProductDetailsScreen({route, navigation}) {
  const {itemDetails} = route.params;
  return (
    <View style={styles.screen}>
      <View>
        <Image style={styles.image} source={{uri: itemDetails.imageBig}} />
      </View>
      <Text> {itemDetails.product}</Text>
      <View>{/* <Text> {itemDetails.id}</Text>*/}</View>
      <Button title={'Go'} onPress={() => Linking.openURL(itemDetails.url)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: Dimensions.get('window').width,
    // The below assumption is wrong, because i want to display a square image when it is called. Since the application will always remain in portrait mode, using width as height will work fine for a square image.
    height: Dimensions.get('window').width,
    borderColor: 'black',
    borderWidth: 1,
    //This is to round out edges of the container.
    borderRadius: 5,
    //resizeMode: 'stretch',
  },
});

export default ProductDetailsScreen;
