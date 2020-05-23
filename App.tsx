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
import AddDeck from './Components/AddDeck'

import Navigation from './Components/Navigation'
/*🔥store Creation with reducers and Middleware🔥 */
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

function MainStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default function App() {
  return (

    <Provider store={store}>

        
        <MainStatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />

  
         
      
        <Navigation />
    </Provider>

    
  );
}

const styles = StyleSheet.create({

});
