import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

//This is going to be the default app.
function FlatListBasics() {
  return (
    <View style={styles.container}>
      <FlatList
        data={ItemData}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

function ItemSeparator() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: '#000',
      }}
    />
  );
}

//THis is the data that will be displayed in the list.
const ItemData = [
  {key: 'Android'},
  {key: 'iOS'},
  {key: 'Java'},
  {key: 'Swift'},
  {key: 'Php'},
  {key: 'Hadoop'},
  {key: 'Sap'},
  {key: 'Python'},
  {key: 'Ajax'},
  {key: 'C++'},
  {key: 'Ruby'},
  {key: 'Rails'},
  {key: '.Net'},
  {key: 'Perl'},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
export default FlatListBasics;
