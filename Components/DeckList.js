import React, { Component } from 'react'
import { Text, View,StyleSheet,Button } from 'react-native'
import {getDecks,saveDeckTitle,getDeck} from '../helpers/api'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/index';
import Deck from './Deck'
 class DeckList extends Component {


    constructor(props) {
        super(props)
            this.state={

                decks:[]
            
            }
        }

        componentDidMount() {
          handleInitialData()  
          }



    render() {
            const {decks } = this.props


        return (
            <View>
                    <Text>List of all  </Text>
   
          { Object.values(this.props.decks).map((deck)=>{


               return <Deck id={deck.title? deck.title:"title"}/>
          })



          }





            
            </View>
        )
    }
}



const styles = StyleSheet.create({
    
})
const mapStateToProps = state=>(
    {
        
        decks:state
    
    
    });

export default connect(mapStateToProps, { handleInitialData })(DeckList) 




