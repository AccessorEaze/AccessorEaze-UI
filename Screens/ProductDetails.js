import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//const ProductDetailsScreen = props => {
function ProductDetailsScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <Text> Product Detials</Text>
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
