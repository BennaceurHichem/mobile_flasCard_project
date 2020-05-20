import React, { Component } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {connect} from 'react-redux'
 class Deck extends Component {


    
    render() {

        const {deck} = this.props
        return (
            <View>
              <View>
                        <Text >{deck.title}</Text>
                    
                    <View>
                        <Text >{deck.questions.length} cards</Text>
                    </View>
                    </View>

                
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
})



//this id is apssed fromt he parent 
const mapStateToProps = (state,{id})=>{

    return {
        deck: id ? state[id]: state[1]
    }
}


export default connect(mapStateToProps)(Deck);