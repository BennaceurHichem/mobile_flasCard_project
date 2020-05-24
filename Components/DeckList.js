import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/index';
import Deck from './Deck';
import PropTypes from 'prop-types';

 class DeckList extends Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        handleInitialData: PropTypes.func.isRequired,
        decks: PropTypes.object.isRequired
      };

      
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
         <Deck id={deck.title? deck.title:" Title nt found"}/>
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
        marginTop:10,
        color: 'black',
        padding: 30,
        fontStyle:"italic",
        fontWeight:"bold"


    
      

},
})
const mapStateToProps = (state)=>(
    {
        
        decks:state
    
    
    });

export default connect(mapStateToProps, { handleInitialData })(DeckList)




