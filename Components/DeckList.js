import React, { Component } from 'react'
import { Text, View,StyleSheet,Button } from 'react-native'
import {getDecks,saveDeckTitle,getDeck} from '../helpers/api'
export default class DeckList extends Component {


    constructor(props) {
        super(props)
            this.state={

                decks:[]
            
            }
        }

    componentDidMount(){

        getDecks().then(result => {
            console.log(JSON.stringify(result));
            this.setState(() => ({
                decks: result
            }));
          });
   
      
    }


    render() {


        const {decks } = this.state
        return (
            <View>
                    <Text>List of all decks </Text>
        
          { Object.keys(decks).map((deck,index)=>{
                <View>


                <Text>{deck.title}</Text>
                <Text>{JSON.stringify(deck[index])}</Text>

                </View>

          })



          }





            
            </View>
        )
    }
}



const styles = StyleSheet.create({
    
})