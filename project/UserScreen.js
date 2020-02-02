import React, { Component } from 'react';
import {  StyleSheet,  Button,  View,  SafeAreaView,  Text,  Alert } from 'react-native';

class UserScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };

    constructor(props) {
        super(props);
        state = {
          email   : '',
        }
      }

    ComponentWillMount = () => {
        const emailvar = this.props.navigation.getParam('usermail');
        this.setState({ email: emailvar });
        alert("gg");
     }

    render() {
      const {navigate} = this.props.navigation;

  //    {alert(this.props.email)}
//  <Text>Hello Mister { /*this.props.email*/ } How are you? </Text>

      return (
          <>
        <Button
          title="You are in your profile"
          onPress={() => navigate('Profile', {name: 'Jane'})}
        />
      </>
      );
    }
  }

export default UserScreen;
