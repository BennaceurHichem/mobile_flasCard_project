import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import { gray, green, white, textGray } from '../helpers/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeckTitle } from '../helpers/api';
import { StackActions, NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export class AddDeck extends Component {
 
  state = {
    deckTitle: ''
  };
  handleChange = deckTitle => {
      
    this.setState({  deckTitle });
  };
  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
   
        addDeck(this.state.deckTitle);
        saveDeckTitle(this.state.deckTitle);
    
    

 const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { title: this.state.deckTitle }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ deckTitle: '' }));
  };
  render() {
    return (
      <View style={styles.container}>
       
                        <View style={styles.block}>
                        <Text style={styles.title}>Deck Title please 😄</Text>
                        </View>
                        <View style={[styles.block]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.deckTitle}
                            placeholder="Deck title"
                            autoFocus={true}
                            returnKeyType="done"
                            onChangeText={this.handleChange}     
                            onSubmitEditing={this.handleSubmit}
                        />
                        <Button
                        style={{ backgroundColor: green, borderColor: white }}
                        onPress={this.handleSubmit}
                        disabled={this.state.deckTitle===''}
                        icon={
                                <Icon
                                name="arrow-right"
                                size={15}
                                color="white"
                                />
                            }
                            title="Create new Deck" >
                      
                        </Button>
                        </View>
                        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignContent:"center",
    height:200,
    marginTop: 100,
    marginBottom:100
        

  },
 
  title: {
     marginBottom:100,
    textAlign: 'center',
    fontSize: 32,
    fontWeight:"bold",

  },
  input: {
    borderWidth: 2,
    borderColor: textGray,
    backgroundColor: white,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 3,
    fontSize: 20,
    height: 40,
    marginBottom: 20
  }
});

export default connect(
  null,
  { addDeck }
)(AddDeck);