import React, { Component } from 'react';
import {  StyleSheet,  Button,  View,  SafeAreaView,  Text,  Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class UserScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };

    constructor(props) {
        super(props);
        this.state = {
          email   : '',
          islogged : false,
          token : '',
        }
      }

     render() {
      const {navigate} = this.props.navigation;
      const islog = this.props.navigation.getParam('islogged');
      const usermal = this.props.navigation.getParam('usermail');
      const token = this.props.navigation.getParam('token');

      if (islog != false && usermal) {
        () => this.setState({ email: usermal });
        () => this.setState({ islogged: islog });
        Alert.alert("gg " + usermal + " " + islog + " token  ==  " + token);
      }

      const logged = <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text></Text>
          <Button
            title="Go to Your Profile"
            onPress={() => this.props.navigation.navigate('Profile')}
          /> 
          </View>
        </SafeAreaView>;
      return (
          <>
        <Button
          title="You are in your profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      { this.state.islogged ? logged : null }
      </>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 2,
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  
export default UserScreen;
