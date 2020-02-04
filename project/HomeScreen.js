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
  Alert
} from 'react-native';

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
      }
    }

    ComponentWillMount = () => {
      const islog = this.props.navigation.getParam('islogged');
      const usermal = this.props.navigation.getParam('usermail');
      if (islog && usermal) {
        this.setState({ email: usermal });
        this.setState({ islogged: islog});
      }
   }

     onClickListener = (viewId) => { 
      if (viewId == "login") {
          //Alert.alert("Mail = " + this.state.email);
          //Alert.alert("Password = " + this.state.password);
        //const navigateAction = this.props.navigation.navigate({routeName: 'Profile', params: { usermail: this.state.email }});
        var formdata = new FormData();
        formdata.append("refresh_token", "70f36f1cf24197f436af391a58f27eacd1792249");
        formdata.append("client_id", "80f2eef039cf016");
        formdata.append("client_secret", "9b6d23aca6f45266abede590efc5337b02a01da1");
        formdata.append("grant_type", "refresh_token");
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        var errorit;
      fetch("https://api.imgur.com/oauth2/token", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result.substring(10, 15)); if (result.substring(10, 15) == "error") { this.setState({error:true});}else {this.setState({islogged:true})} })
        .catch(error => { console.log('error', error)});
        if (this.state.error === true)
          Alert.alert("Bad creditentiel");
        console.log("first " + this.state.logged);
        this.props.navigation.navigate('Profile', {email: this.state.email, islogged: this.state.logged, token: this.state.token});
      }
      if (viewId == "profile") {
        this.props.navigation.navigate('Profile', {email: this.state.email, islogged: this.state.logged, token: this.state.token});
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
      if (this.state.islogged) {
        Alert.alert("Logged as " + this.props.email);
      }
      return (
      <>
        { this.state.islogged ? logged : notlogged }
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
