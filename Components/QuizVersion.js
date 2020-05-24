import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList,ScrollView, Dimensions,TouchableOpacity } from 'react-native';
import { gray, green, red, textGray, darkGray, white } from '../helpers/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};
const SCREEN_WIDTH = Dimensions.get('window').width;

class QuizVersion extends Component {
 
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  scrollEvent = () => {
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
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          // this.viewPager.setPage(this.state.page + 1);
          this.scrollView.scrollTo({ x: (page + 1) * SCREEN_WIDTH });
          // console.log('(page + 1) * SCREEN_WIDTH', (page + 1) * SCREEN_WIDTH);
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
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
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
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.correctAnswer : styles.wrongAnswer;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount} correct
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
              style={[styles.submitBtn,{backgroundColor:darkGray}]}
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
      <ScrollView
        style={styles.container}
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollBegin={this.scrollEvent}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
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
                style={{ color: red,marginTop:20,marginBottom:0 }}
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
            <View>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
    justifyContent: 'space-around',
    width: SCREEN_WIDTH
  },
  block: {
    marginBottom: 20
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: '600',



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
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20
  },
  correctAnswer: {
    color: green,
    fontSize: 46,
    textAlign: 'center'
  },
  wrongAnswer: {
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
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(QuizVersion));