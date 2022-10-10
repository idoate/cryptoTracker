import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
  Alert,
} from 'react-native';

import CoinMarketItem from './CoinMarketItem';

import {api} from '../../libs/api';
import {Storage} from '../../libs/storage';

import {Colors} from '../../res/Colors';

const CoinDetailScreen = ({navigation, route}) => {
  const coin = route.params.coin;
  const key = `favorite-${coin.id}`;
  const [markets, setMarkets] = useState([]);
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    const getMarkets = async () => {
      if (coin.id) {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coin.id}`;
        const myMarkets = await api.get(url);
        setMarkets(myMarkets);
      }
    };

    navigation.setOptions({
      title: coin.symbol,
    });
    getMarkets();
  }, [navigation, coin]);

  useEffect(() => {
    const getFavorite = async () => {
      try {
        const favStr = await Storage.get(key);

        if (favStr != null) {
          setFavorite(true);
        }
      } catch (err) {
        console.log('Get favorite err', err);
      }
    };

    getFavorite();
  }, [key]);

  const getCoinIcon = () => {
    if (coin.name) {
      const name = coin.name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${name}.png`;
    }
  };

  const toogleFavorite = () => {
    if (favorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const stringCoin = JSON.stringify(coin);

    const stored = await Storage.store(key, stringCoin);

    if (stored) {
      setFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const removed = await Storage.remove(key);

          if (removed) {
            setFavorite(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const getSections = () => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image style={styles.iconImg} source={{uri: getCoinIcon()}} />
          <Text style={styles.titeText}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            favorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {favorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontsize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
