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
  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }
    static navigationOptions = {
      title: 'Homescreen',
    };
    render() {
      //this.props.navigation.navigate('Profile')
      const {navigate} = this.props.navigation;
      return (
        <>
    <SafeAreaView style={styles.container}>
      <Separator />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text></Text>
        <Button
          title="Go to Your Profile"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
        <Button
          title="Login "
          onPress={() => this.props.navigation.navigate('Logged')}
        />
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
