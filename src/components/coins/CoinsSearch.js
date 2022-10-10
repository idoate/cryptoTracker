import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';

import {Colors} from '../../res/Colors';

const CoinsSearch = props => {
  const [query, setQuery] = useState('');

  const handleText = myQuery => {
    setQuery(myQuery);
    if (props.onChange) {
      props.onChange(myQuery);
    }
  };
  return (
    <View>
      <TextInput
        style={[
          styles.TextInput,
          Platform.OS === 'ios' ? styles.textINputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textINputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinsSearch;
