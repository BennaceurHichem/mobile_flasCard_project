import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import Deck from './Deck';

import { gray, textGray, green, white, red } from '../helpers/colors';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeckAsync } from '../helpers/api';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

 class DeckDetail extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired,
    deck: PropTypes.object
  };

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');

   
    return {
      title: `${title} deck`
    };
  };




    handleDelete = id => {
        const { removeDeck, navigation } = this.props;
    
        removeDeck(id);
        removeDeckAsync(id);
    
        navigation.goBack();
      };
      shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
      }

    render() {
        const { deck } = this.props;
        const { navigation } = this.props;



        return (
            <View style={styles.container}>
            <View style= {{marginTop:40}}>
            <Deck id={deck ? deck.title:"UNDEFINED"} />

            </View>
            <View style={styles.box}>
              <TouchableOpacity
                 style={[styles.buttonStyle,{backgroundColor:"#0e1318"}]}
                onPress={() =>
                  this.props.navigation.navigate('AddCardToDeck', { title: deck ? deck.title:"React" })
                }
              

              >
                 <Text    style={[styles.textStyle]}>Add Card</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={[styles.buttonStyle,{backgroundColor:"#0e1318"}]}
             
                onPress={() =>
                  this.props.navigation.navigate('Quiz', { title: deck.title ? deck.title:"NOT FOUND" })
                }
                
              >
             <Text  style={styles.textStyle}>Start Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style={[styles.buttonStyle,{backgroundColor:"#ff3516"}]}
              onPress={() => this.handleDelete(deck ? deck.title:"React")}              
            >
                <Text    style={styles.textStyle}>Delete Deck</Text>
            </TouchableOpacity>


            </View>
          
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      backgroundColor: gray
    },
    box:{

        marginTop:260,
        justifyContent:"center",
        alignItems:"center"
    },
    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
   
      },
      buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#336633',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 10,
        width: 300,
        
      }
  });
  
  const mapStateToProps = (state, { navigation }) => {
    const title = navigation? navigation.getParam('title', 'undefined'):"defaultTitle";
    const deck = state[title];
  
    return {
      deck
    };
  };
  
  export default connect(
    mapStateToProps,
    { removeDeck }
  )(DeckDetail);