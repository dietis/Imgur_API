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
          islogged : false,
          json_data : '',
        }
      }

      componentDidMount(){
        this.setState({ islogged: this.props.navigation.state.params.islogged});
        this.setState({ json_data: this.props.navigation.getParam('json_data')});
        //this.props.navigation.state.params
        //this.props.navigation.state.params
      }

      render() {
        //Alert.alert('a ' + this.state.json_data['account_username']);
        const logged = <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text></Text>
          <Button
            title="Disconnect ?"
            onPress={() => this.props.navigation.navigate('Home', {islogged: false, disconnect: true})}
          /> 
          </View>
        </SafeAreaView>;
      return (
          <>
        <Button
          title="You are in your profile"
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
