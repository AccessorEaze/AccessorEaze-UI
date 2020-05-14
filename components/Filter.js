import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Button,
} from 'react-native';

function Filter ({route, navigation})
{
    const {filterID} = route.params;
    const {category} = route.params;
    const {productList} = route.params;

    if(filterID === 'priceLow')
    {
        var List = productList;

        for(let i = 0; i < productList.legnth; ++i)
        {
            for(let k = 0; k < productList.legnth; ++k)
            {
                if(productList[k] < List[i])
                {
                    List[i] = productList[k];
                }

            }
        }

        navigation.navigate('Filtered List Screen', {
            filterID: filterID,
            category: category,
            List : List,
        })
    }

}

export default Filter;
