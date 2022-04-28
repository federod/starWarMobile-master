import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CharactersScreen} from '../../features/characters/screens/characters.screen';
import {CharacterDetail} from '../../features/characters/screens/character-detail.screen';

const Stack = createNativeStackNavigator();
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={CharactersScreen} />
        <Stack.Screen name="detail" component={CharacterDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
