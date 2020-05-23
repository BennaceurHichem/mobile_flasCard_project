import Ionicons from 'react-native-vector-icons/Ionicons';

import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import * as Icon from '@expo/vector-icons';
import { Platform } from 'react-native';
//different Views
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import DeckDetail from './DeckDetail';
import AddCardToDeck from './AddCardToDeck';
import Quiz from './Quiz';

import { darkGray, white, green, lightGreen } from '../helpers/colors';
import { createAppContainer } from 'react-navigation';

const isAndroid = Platform.OS === 'android' ? true : false;

const globalConfig = {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Icon.Ionicons
            name={isAndroid ? 'md-bookmarks':'ios-bookmarks'}
            size={30}
            color={tintColor}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Icon.FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    },
  
  };

const tabConfig = {
    navigationOptions: {
      header: null
    },
    defaultNavigationOptions: {
      bounces: true
    },
    tabBarOptions: {
      activeTintColor: green,
      style: {
        height: 60,
        backgroundColor: white,
        shadowColor: 'rgba(0,0,0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
        borderTopWidth: 1,
        borderTopColor: darkGray
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
      },
      tabStyle: {
        marginTop: 5,
        marginBottom: 3
      },
      showIcon: true
    }
  };










const Tabs = createBottomTabNavigator(globalConfig, tabConfig);

const Navigation = createStackNavigator(
    {
      Home: {
        screen: Tabs
      },
      DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
          headerTintColor: green,
          headerStyle: {
            backgroundColor: lightGreen
          },
          title: 'Deck Details'
        }
      },
      AddCardToDeck: {
        screen: AddCardToDeck,
        navigationOptions: {
          headerTintColor: green,
          headerStyle: {
            backgroundColor: lightGreen
          },
          headerTitleStyle: {
            justifyContent: 'center',
            textAlign: 'center'
          },
          title: 'Add Card To Deck'
        }
      },
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          headerTintColor: green ,
          headerStyle: {
            backgroundColor: lightGreen
          }
     
        }
      }
    },
    { headerTileAlign: 'center',

    },
  
  );
  
  export default createAppContainer(Navigation);