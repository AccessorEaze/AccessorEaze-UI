import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

function ProductDetailsScreen({route}) {
  const {itemDetails} = route.params;

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View>
          <Image style={styles.image} source={{uri: itemDetails.imageBig}} />
        </View>
        {/*<Text> {itemDetails.product}</Text> This is commented out so the discription is the only thing on the screen instead of a random number which doesnt mean anything for an end user.*/}
        <View>{<Text> {itemDetails.type}</Text>}</View>
        {/*The https is added so dummy data isnt affected and can actually open links.*/}
        <Button
          title={'Go'}
          onPress={() =>
            Linking.openURL('https://' + itemDetails.URL).catch(() =>
              alert('Could not open link.'),
            )
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#666666',
    flex: 1,
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
  },
});

export default ProductDetailsScreen;
