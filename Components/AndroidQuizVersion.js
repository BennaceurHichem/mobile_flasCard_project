import React, { Component } from 'react';

import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import ViewPager from '@react-native-community/viewpager'
import { gray, white,green, red, textGray, darkGray } from '../helpers/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

/*
The use of ViewPager for android and make the difference between these two platfrom in ViewPager
is reccomended so I opt for it 

*/
export class AndroidQuizVersion extends Component {

  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    counter: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  handlePageChange = evt => {
    this.setState({
      show: screen.QUESTION
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
      }),
      () => {
        // console.log('this.state.answered', this.state.answered);
        const { correct, incorrect, counter } = this.state;

        if (counter === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          // console.log('this.state.page', this.state.page);
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            show: screen.QUESTION
          }));
        }
      }
    );
  };
  reset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.counter).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.mainBox}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const { correct, counter } = this.state;
      const percent = ((correct / counter) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.correctAnswerStyle : styles.wrongAnswerStyle;

      return (
        <View style={styles.mainBox}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {correct} / {counter} correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Percentage correct
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.submitBtn,{backgroundColor:"black"}]}
              onPress={this.reset}
            >
              <Text style={styles.submitTxt}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitBtn,{backgroundColor:darkGray}]}
            
              onPress={() => {
                this.reset();
                this.props.navigation.goBack();
              }}
            >
              <Text style={styles.submitTxt}>Back To Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitBtn,{backgroundColor:gray}]}
              onPress={() => {
                this.reset();
                this.props.navigation.navigate('Home');
              }}
            >
              <Text style={styles.submitTxt}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <ViewPager
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {questions.map((question, idx) => (
          <View style={styles.mainBox} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TouchableOpacity
                style={{ color: red }}
                onPress={() => this.setState({ show: screen.ANSWER })}
              >
                <Text style={[styles.textStyle,{color:"black"}]}>Show Answer</Text>
             </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ color: red }}
                onPress={() => this.setState({ show: screen.QUESTION })}
              >
                <Text  style={[styles.textStyle,{color:"black"}]}>Show Question</Text>
              </TouchableOpacity>
            )}
            <View style={styles.box}>
              <TouchableOpacity
              style={[styles.submitBtn,{backgroundColor:"green"}]}
                onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                <Text style={styles.submitTxt}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={[styles.submitBtn,{marginTop:25,backgroundColor:"red"}]}
                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                <Text style={[styles.submitTxt,{color:white}]}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainBox: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    justifyContent: 'space-around'
  },
  block: {
    marginBottom: 20
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color:"black"
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: darkGray,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    color:"black"
  },

  btnWrapper:{
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    },
    box:{

        marginTop:60,
        marginBottom:20,
        justifyContent:"center",
        alignItems:"center"
    },

    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
   
      },
      buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#336633',
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 25,
        paddingLeft: 25,
        marginTop: 10,
        width: 300,
        
      },

  correctAnswerStyle: {
    color: green,
    fontSize: 46,
    textAlign: 'center'
  },
  wrongAnswerStyle: {
    color: red,
    fontSize: 46,
    textAlign: 'center'
  },
      submitBtn:{
     backgroundColor: "black", 
     borderColor: 'black',
     borderRadius:5,
     color:white, 
     paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    width:300,
    height:50,
    marginTop:20,
    marginBottom:20,
    alignSelf:"center"
  },


  submitTxt:{
    fontSize:30,
    alignSelf:"center",
    color:"white"
  }
});

const mapStateToProps = (state, { title }) => {


  return {
    deck:state[title]
  };
};

export default withNavigation(connect(mapStateToProps)(AndroidQuizVersion));