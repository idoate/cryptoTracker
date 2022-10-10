import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen';
import {Colors} from '../../res/Colors';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          // shadowOpacity:0,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
