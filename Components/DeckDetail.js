import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,ButtonToolbar,Button } from 'react-native'
import Deck from './Deck'
 class DeckDetail extends Component {
    render() {
        return (
            <Deck id="React" />
        )
    }
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection : 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius:20,
      borderColor:'black',
      marginTop:10,
      marginBottom:10,
      borderWidth: 1,
      borderColor: '#428947',
      paddingLeft:80,
      paddingRight: 80,
 
   

    },
    titleDeck:{
            fontSize:40,
            color:'black',


    },
    numberDecks:{
        fontSize:20,
        
        color:'black',
    }
})



export default DeckDetail;