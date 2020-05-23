import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AndroidQuizVersion from './AndroidQuizVersion'
import iosQuizVersion from './iosQuizVersion'

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
     
              
                
                    if(Constants.platform.android) {
                         return <AndroidQuizVersion  title={title}/>

                    }else{
                        return <iosQuizVersion  title={title}/>

                    }

                
           
    }
}
