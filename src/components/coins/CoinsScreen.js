import React, {useEffect, useState} from 'react';
import {api} from 'cryptoTracker/src/libs/api';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';

import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';
import {Colors} from '../../res/Colors';

const CoinsScreen = props => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCoins, setAllCoins] = useState([]);

  useEffect(() => {
    getApiData().catch(console.error);
  }, []);

  const getApiData = async () => {
    setLoading(true);
    const apiCoins = await api.get('https://api.coinlore.net/api/tickers/');
    setCoins(apiCoins.data);
    setAllCoins(apiCoins.data);
    setLoading(false);
  };

  const handlePress = coin => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  const handleSearch = query => {
    const coinsFiltered = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCoins(coinsFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />

      {loading && (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      )}

      <FlatList
        data={coins}
        renderItem={({item}) => (
          <CoinsItem item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});
export default CoinsScreen;
