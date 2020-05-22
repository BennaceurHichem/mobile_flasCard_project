import React from 'react';
import { StyleSheet, Text, View,AsyncStorage,StatusBar  } from 'react-native';
import Deck from './Components/Deck'
import DeckView from './Components/DeckView'
import DeckList from './Components/DeckList'
import DeckDetail from './Components/DeckDetail'

import APITest from './Components/APITest'
import TestAsyncStorage from './Components/TestAsyncStorage'
//REDUX IMPORTS 
import reducer from './reducers/index'
import actions from './actions'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native'
import Constants from 'expo-constants';


import Navigation from './Components/Navigation'
/*🔥store Creation with reducers and Middleware🔥 */
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default function App() {
  return (

    <Provider store={store}>

        <View style={styles.container}>
        <FlashcardStatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />


          <Navigation />
        </View>

    </Provider>
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
