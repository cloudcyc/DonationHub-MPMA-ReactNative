import React from 'react';
import { StyleSheet, View } from 'react-native';

import Maincontainer from './Navigation/Maincontainer';
import { NavigationContainer } from '@react-navigation/native';


export default function App({navigation}) {
  return (
    <NavigationContainer>
    <Maincontainer/>
    </NavigationContainer>
  );
}
