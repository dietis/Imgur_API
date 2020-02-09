import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Image,
  TextInput,
  TouchableHighlight,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Loggin extends React.Component {
    static navigationOptions = {
	title: 'Loggin',
	header: null
    };
    constructor(props) {
        super(props);
        state = {
          email   : '',
          password: '',
          token: '',
          islogged: false,
        }
      }

      onClickListener = (viewId) => { 
        if (viewId == "login") {
            //Alert.alert("Mail = " + this.state.email);
            //Alert.alert("Password = " + this.state.password);
              const navigateAction = this.props.navigation.navigate({
        routeName: 'Profile',
        params: { usermail: this.state.email }
      });
      //this.props.navigation.dispatch(navigateAction);
      /*var formdataauth = new FormData();
      formdataauth.append("response_type", "308635ba784b8b416168464c6ac2136928330a06");
      formdataauth.append("client_id", "aafe330f0f405b4")
      var requestOptions1 = {
        method: 'POST',
        body: formdataauth,
        redirect: 'follow'
    };
      fetch("https://api.imgur.com/oauth2/authorize", requestOptions1)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));*/
        }
        else
          Alert.alert("Alert", "Button pressed "+viewId);
      }
      handleChangemail = (event = {}) => { //ici je vais enregistrer les modifs du field mail input pour le login
        //const mail = event.target && event.target.mail;
        //const value = event.target && event.target.value;
        //Alert.alert({value});
        //this.setState({ email : mail});
    }
    render() {
      //this.props.navigation.navigate('Protected','Profile')
      const {navigate} = this.props.navigation;
      return (
        <>
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/mailbox-closed-flag-down.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              //onChangeText={(email) => this.setState({ email })}
              onChangeText={(email) => this.setState({email})}
              //onChange={handleChangemail} 
              />
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <Button style={styles.loginButton} onPress={() => this.onClickListener('login')}
          title="Login"
        >
        <View>
          <Text style={styles.loginText}>Login  <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/enter-2.png'}}/>{"\n"}</Text>
        </View>
        </Button>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>
        <Text style={{color: 'blue'}}
        onPress={() => Linking.openURL('https://icons8.com/icons/set/email-sign')}>
        Google
        </Text>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
      </>
      );
    }
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
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
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: 'rgb(0,181,236)',
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginText: {
      color: 'white',
    }
  });

export default Loggin;
