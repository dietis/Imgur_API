import React, { Component } from 'react';
import {  StyleSheet,  Button,  View,  SafeAreaView,  Text,  Alert } from 'react-native';

class UserScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <Button
          title="You are in your profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      );
    }
  }

export default UserScreen;
