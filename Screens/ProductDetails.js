import React from 'react';
import {View, Text, StyleSheet, Button, Linking} from 'react-native';

//const ProductDetailsScreen = props => {
function ProductDetailsScreen({route, navigation}) {
  const {itemDetails} = route.params;
  return (
    <View style={styles.screen}>
      <Text> Product Detials</Text>
      <Text> {itemDetails.id}</Text>
      <Button title={'Go'} onPress={() => Linking.openURL(itemDetails.url)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
