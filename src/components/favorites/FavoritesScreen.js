import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import CoinsItem from '../coins/CoinsItem';
import FavoritesEmptyState from './FavoritesEmptyState';

import {Colors} from '../../res/Colors';
import {Storage} from '../../libs/storage';
import {FlatList} from 'react-native-gesture-handler';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  // useEffect(() => {
  //   navigation.addListener("focus",getFavorites())
  //   return () => {
  //     navigation.removeEventListener('focus', getFavorites())
  //   }
  // }, []) // Esta es otra manera de hacerlo pero es peor

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, []),
  );

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.getAllKeys();

      const keys = allKeys.filter(key => key.includes('favorite-'));

      const favs = await Storage.multiGet(keys);

      const myFavorites = favs.map(fav => JSON.parse(fav[1]));

      console.log('FAV:', myFavorites);

      setFavorites(myFavorites);
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  const handlePress = coin => {
    navigation.navigate('CoinDetail', {coin});
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <FavoritesEmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
