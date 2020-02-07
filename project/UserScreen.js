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
          access_token : '',
        }
      }

      componentDidMount() {
        const stock = this.props.navigation.getParam('json_data');
        this.setState({ islogged: this.props.navigation.state.params.islogged});
        this.setState({ json_data: this.props.navigation.getParam('json_data')});
        //this.props.navigation.state.params
        //this.props.navigation.state.params
        console.log("dmu " + JSON.stringify(stock['refresh_token']));
        var access_token = "";
        var formdata = new FormData();
        formdata.append("refresh_token", stock['refresh_token']);
        formdata.append("client_id", "be8f8a010e925e2");
        formdata.append("client_secret", "e454e32d2acccc394d9bfda2cf0fa558fcf1acb3");
        formdata.append("grant_type", "refresh_token");
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        fetch("https://api.imgur.com/oauth2/token", requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result + "acc result" + this.props.access_token); this.setState({access_token: result});})
          .catch(error => console.log('error', error));
          console.log("access === " + this.state.access_token)
      }


      render() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.state.access_token['access_token']);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("https://api.imgur.com/3/account/me/images", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));        

        //Alert.alert('a ' + JSON.stringify(this.state));
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
