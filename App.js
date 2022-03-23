
import React from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Routes from './src/routes';

import firebase from './src/services/firebaseConnection';


export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#131313' barStyle='light-content'/>
      <Routes />
    </NavigationContainer>
  );
}