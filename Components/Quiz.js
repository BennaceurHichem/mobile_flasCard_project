import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AndroidQuizVersion from './AndroidQuizVersion'
import Constants from 'expo-constants';

export default class Quiz extends Component {
    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', '');
     
              
                
                    if(Constants.platform.android) {
                         return <AndroidQuizVersion  title={title}/>

                    }

                
           
    }
}
