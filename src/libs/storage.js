import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  store: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);

      return true;
    } catch (err) {
      console.log('storage stor err', err);

      return false;
    }
  },
  get: async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.log('http method pos err', err);
      throw Error(err);
    }
  },
  multiGet: async keys => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (err) {
      console.log('Storage multiGet err', err);
      return false;
    }
  },
  getAllKeys: async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (err) {
      console.log('Storage getAllKeys err', err);
      throw Error(err);
    }
  },
  remove: async key => {
    try {
      AsyncStorage.removeItem(key);

      return true;
    } catch (err) {
      console.log('storage stor err', err);

      return false;
    }
  },
};
