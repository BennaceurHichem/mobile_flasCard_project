import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'
 class Deck extends Component {


    
    render() {

        const {deck} = this.props
        return (
            <View>
              <View style={styles.container}>
                        <Text style={styles.titleDeck}>{deck.title}</Text>
                    
                    <View>
                        <Text style={styles.numberDecks}>{deck.questions.length} cards🃏</Text>
                    </View>
                    </View>

                
            </View>
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



//this id is apssed fromt he parent 
const mapStateToProps = (state,{id})=>{

    return {
        deck: id ? state[id]: state[1]
    }
}


export default connect(mapStateToProps)(Deck);