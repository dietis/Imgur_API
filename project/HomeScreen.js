import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  SafeAreaView,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-community/cookies';

class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Homescreen',
    };

    constructor(props) {
      super(props);
      this.state = {
        email   : '',
        islogged : false,
        error : false,
        refresh_token : '',
        json_data : '',
        disconnect: false,
        redirect: false,
        redirect_json_data : '',
      }
    }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ islogged: this.props.navigation.getParam('islogged')});
    this.setState({ json_data: this.props.navigation.getParam('json_data')});
    this.setState({ disconnect: this.props.navigation.getParam('disconnect')});
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ islogged: false });
    });
    //this.props.navigation.state.params
  }

  _onNavigationStateChange = (event) => {
    console.log("url = " + event.url);
    console.log("there " + JSON.stringify(event));
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while (match = regex.exec(event.url)) {
      params[match[1]] = match[2];
    }
    console.log("param = " + JSON.stringify(params));
    if (params['token_type'] == "bearer" && params['refresh_token']) {
      CookieManager.clearAll();
      this.setState({redirect: false});
      this.setState({islogged: true});
      this.setState({redirect_json_data: params});
    }
    alert(params['token_type']);
  };

    onClickListener = (viewId) => {
      if (viewId == "login") {
        var testdata = new FormData();
        testdata.append("response_type", "code");
        testdata.append("client_id", "ae785bebe045504");
        //be8f8a010e925e2 client id 
        //e454e32d2acccc394d9bfda2cf0fa558fcf1acb3 secret client
        var requestOptions = {
          method: 'POST',
          //body: testdata,
          redirect: 'follow'
        };
        //https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=token.
        //Linking.openURL("https://api.imgur.com/oauth2/authorize?client_id="+ '80f2eef039cf016' +"&response_type=token");
        const url = "https://api.imgur.com/oauth2/authorize?client_id="+ '80f2eef039cf016' +"&response_type=token";
        this.setState({redirect: true});
        this.setState({islogged: false});

        /*var formdata = new FormData();
        formdata.append("refresh_token", "70f36f1cf24197f436af391a58f27eacd1792249");
        formdata.append("client_id", "80f2eef039cf016");
        formdata.append("client_secret", "9b6d23aca6f45266abede590efc5337b02a01da1");
        formdata.append("grant_type", "refresh_token");
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        var errorit;*/
      /*fetch("https://api.imgur.com/oauth2/token", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result); if (result.substring(10, 15) == "error") { this.setState({error:true});}else {this.setState({islogged:true, json_data:JSON.parse(result)})} })
        .catch(error => { console.log('error', error)});
        if (this.state.error === true)
          Alert.alert("Bad creditentiel");
          Alert.alert("z " + this.state.islogged);
        if (this.state.islogged === true) {
          this.props.navigation.navigate('Profile', {email: this.state.email, islogged: this.state.logged, token: this.state.token});
        /*var myHeaders = new Headers();
        myHeaders.append("Authorization", "Client-ID 80f2eef039cf016");
        var formdata = new FormData();
        var requestOptions = {
          method: 'GET',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        fetch("https://api.imgur.com/3/account/{{username}}", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        */
      //}
        //recup des infos du compte
        /*function Car(make, model, year) {
          this.make = make;
          this.model = model;
          this.year = year;
        }
        var car1 = new Car('Eagle', 'Talon TSi', 1993);*/ // example de création d'objet ~
      }
      if (viewId == "profile") {
        //alert("profile var => " + JSON.stringify(this.state.redirect_json_data));
        this.props.navigation.navigate('Profile', {json_data: this.state.redirect_json_data, islogged: this.state.islogged});
      }
    }
    

    render() {
      //this.props.navigation.navigate('Profile')
      const {navigate} = this.props.navigation;
      const notlogged = <SafeAreaView style={styles.container}>
      <Separator />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text></Text>
        <Button
          title="Login "
          onPress={() => this.onClickListener('login')}
        />
        </View>
      </SafeAreaView>;
      const logged = <SafeAreaView style={styles.container}>
        <Separator />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text></Text>
          <Button
            title="Go to Your Profile"
            onPress={() => this.onClickListener('profile')}
          /> 
          </View>
        </SafeAreaView>;
      if (this.state.islogged === true ) {
        //Alert.alert(JSON.stringify(this.state.json_data));
        console.log("logged check json = " + JSON.stringify(this.state.json_data));
        //alert(this.state.json_data['account_username']); //récupère le pseudo ici
        //Alert.alert("Logged as " + this.props.email);
      }
      const redirect_div = <WebView source={{uri: "https://api.imgur.com/oauth2/authorize?client_id="+ 'be8f8a010e925e2' +"&response_type=token"}}
      onNavigationStateChange={this._onNavigationStateChange}
      style={{marginTop: 20}} 
      />;

      return (
      <>
      <Text> debug </Text>
        { this.state.redirect == true ? redirect_div : (this.state.islogged == true ? logged : notlogged) } 
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

export default HomeScreen;
