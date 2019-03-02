import './config/Reactotron';
import { Log } from './commons/debug';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class App extends Component {
   render() {
      return (
         <View style={styles.container}>
            <TouchableHighlight onPress={() => Log('BOMBO')}>
               <Text>CHALLENGE 02</Text>
            </TouchableHighlight>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      backgroundColor: 'red',
   },
});
