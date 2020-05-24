import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { gray, green, lightBlue, white } from '../helpers/colors';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions/index';
import { addCardToDeckAsync } from '../helpers/api';

 class AddCardToDeck extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    addCardToDeck: PropTypes.func.isRequired
  };
    state = {
        question: '',
        answer: ''
      };


      handleQuestionChange = question => {
        this.setState({ question });
      };
      handleAnswerChange = answer => {
        this.setState({ answer });
      };
      handleSubmit = () => {
        const { addCardToDeck, title, navigation } = this.props;
        const card = {
          question: this.state.question,
          answer: this.state.answer
        };
    
        addCardToDeck(title, card);
        addCardToDeckAsync(title, card);
    
        this.setState({ question: '', answer: '' });
        navigation.goBack();
      };
    render() {

      const { navigation } = this.props;


        return (
            <View style={styles.container}>
            <View>
              <View style={styles.block}>
                <Text style={styles.title}>Add a question</Text>
              </View>
              <View style={[styles.block]}>
                <TextInput
                  style={styles.input}
                  value={this.state.question}
                  onChangeText={this.handleQuestionChange}
                  placeholder="Question"
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => this.answerTextInput.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View style={[styles.block]}>
                <TextInput
                  style={styles.input}
                  value={this.state.answer}
                  onChangeText={this.handleAnswerChange}
                  placeholder="Answer"
                  ref={input => {
                    this.answerTextInput = input;
                  }}
                  returnKeyType="done"
                  onSubmitEditing={this.handleSubmit}
                />
              </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={this.handleSubmit}
                disabled={this.state.question === '' || this.state.answer === ''}
              >
                <Text style={styles.submitTxt}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: '30%' }} />
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      backgroundColor: gray,
      justifyContent: 'space-around'
    },
    block: {
      marginBottom: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 32
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      backgroundColor: '#fff',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 40
    },
    submitBtn:{
     backgroundColor: "black", borderColor: 'black',borderRadius:5,color:white, paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    width:300,alignSelf:"center"
  },


  submitTxt:{
    fontSize:30,
    alignSelf:"center",
    borderColor:"black",
    color:white
  }
  });
  
  const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
  
    return {
      title
    };
  };
  
  export default connect(mapStateToProps,{ addCardToDeck })(AddCardToDeck);