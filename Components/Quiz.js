import React, { Component } from 'react'
import { Text, View } from 'react-native'
import QuizVersion from './QuizVersion'
import PropTypes from 'prop-types';

import Constants from 'expo-constants';

export default class Quiz extends Component {
  

    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('title', '');
        return {
          title: `${title} Quiz`
        };
      };



    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', '');
     
              
                
    
                        return <QuizVersion  title={title}/>
                        

              
                       
                   
           

                
           
    }
}
