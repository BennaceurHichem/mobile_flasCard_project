import React, { Component } from 'react'
import { Text, View,StyleSheet,Button,ScrollView,TouchableOpacity } from 'react-native'
import {getDecks,saveDeckTitle,getDeck} from '../helpers/api'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/index';
import Deck from './Deck'
//import { withNavigation } from 'react-navigation'
//import { useNavigation } from '@react-navigation/native';
 class DeckList extends Component {


    constructor(props) {
        super(props)
            this.state={

                decks:[]
            
            }
        }

        componentDidMount() {
        
          this.props.handleInitialData()  
          }



    render() {
            const {decks,navigation  } = this.props

        return (
<>
<Text style={styles.bigTitle} >List of all Decks </Text>
<ScrollView style={styles.container} >
                   
    
                   { Object.values(this.props.decks).map((deck)=>{
         
         
                        return  <TouchableOpacity
              key={deck.title}
              onPress={() =>
                this.props.navigation.navigate('DeckDetail', { title: deck.title })
              }
            >
         <Deck id={deck.title? deck.title:"React"}/>
            </TouchableOpacity>
                   })
        
         
                   }
         
                     </ScrollView>
</>

         
        )
    }
}



const styles = StyleSheet.create({

    bigTitle:{
        textAlign: 'center',
        fontSize:40,
        marginTop:40,
        color: 'orange',
        padding: 30,
        fontStyle:"italic",


    
      

},
})
const mapStateToProps = (state)=>(
    {
        
        decks:state
    
    
    });

export default connect(mapStateToProps, { handleInitialData })(DeckList)




