import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'




 class Deck extends Component {


    
    render() {

        const {deck} = this.props
        return (
            <View>
              <View style={styles.container}>
                        <Text style={styles.titleDeck}>{deck?deck.title:"title not found"}</Text>
                    
                    <View>
                        <Text style={styles.numberDecks}>{deck?deck.questions.length:"0"} cards🃏</Text>
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
      justifyContent:"flex-start",
      alignItems:"center",
      borderRadius:20,
      borderColor:'black',
      marginTop:10,
      marginBottom:10,
      borderWidth: 1,
      paddingLeft:20,
      paddingRight: 20,
 
   

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