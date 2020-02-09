import React, { Component, useState, useEffect } from 'react';
import {
    Easing,
    Animated,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-community/cookies';

class Accueil extends Component {
    static navigationOptions = {
	title: 'Accueil',
	header: null
    };

    render() {

      const {navigate} = this.props.navigation;
   
	    return (
		    <>

		
		    <View style={{ backgroundColor: '#b3e5fc', flex: 1, alignItems: 'center', justifyContent: 'center' }} >

		    <TouchableOpacity onPress={() => this.props.navigation.navigate('First')}>
      <Image
        style={styles.button}
        source={require('./img/page0.png')}
      />
    </TouchableOpacity>
	      </View>
   
    </>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
//      marginTop: 2,
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
    button: {
	height: 300,
    },
  });

export default Accueil;
