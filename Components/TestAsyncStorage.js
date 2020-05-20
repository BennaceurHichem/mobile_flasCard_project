import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
  clearDecks
} from '../helpers/api.js';

export default class TestAsyncStorage extends React.Component {
  state = {
    data: ''
  };
  componentDidMount() {
    this.getAllDecks();
  }
  getAllDecks = () => {
    getDecks().then(result => {
      console.log(JSON.stringify(result));
      this.setState(() => ({
        data: result
      }));
    });
  };
  getDeck = () => {
    getDeck('Next.js').then(result => {
      console.log(JSON.stringify(result));
      this.setState({
        data: result
      });
    });
  };
  handleSaveDeck = () => {
    saveDeckTitle('Next.js');
  };
  handleAddCard = () => {
    addCardToDeck('Next.js', {
      question: 'server-sider-endering?',
      answer: 'client side rendering'
    });
  };
  ResetDecks = () => {
    clearDecks();
  };
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.getAllDecks}>
            <Text style={styles.btnText}>Get Decks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.ResetDecks}>
            <Text style={styles.btnText}>Reset Decks</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={this.getDeck}>
            <Text style={styles.btnText}>Get Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.handleSaveDeck}>
            <Text style={styles.btnText}>Add Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.handleAddCard}>
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginLeft: 10 }}>{JSON.stringify(data)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  btnContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
 alignItems: 'center',
    // width: '100%',
    marginBottom: 20
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});