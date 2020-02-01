import React, { Component } from 'react';
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

class Loggin extends React.Component {
    static navigationOptions = {
      title: 'Loggin',
    };
    constructor(props) {
        super(props);
        state = {
          email   : '',
          password: '',
        }
      }

      onClickListener = (viewId) => {
        if (viewId == "login") {
            Alert.alert("Mail = " + this.state.email);
            Alert.alert("Password = " + this.state.password);
        }
        else 
        Alert.alert("Alert", "Button pressed "+viewId);
      }

      handleChangemail = (event = {}) => { //ici je vais enregistrer les modifs du field mail input pour le login
        const mail = event.target && event.target.mail;
        const value = event.target && event.target.value;
        
        this.setState({ email : value});
    }


    render() {
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
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
        <View>
          <Text style={styles.loginText}>Login  <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/40/000000/enter-2.png'}}/>{"\n"}</Text>
        </View>
        </TouchableHighlight>
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
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
  });

export default Loggin;
