import React from 'react';
import { StyleSheet, Text, View,AsyncStorge } from 'react-native';
import Deck from './Components/Deck'
import DeckView from './Components/DeckView'
import DeckList from './Components/DeckList'
import APITest from './Components/APITest'


import TestAsyncStorage from './Components/TestAsyncStorage'

import Reactotron from 'reactotron-react-native'
export default function App() {
  return (


    <View style={styles.container}>
    
  
  
      <TestAsyncStorage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
