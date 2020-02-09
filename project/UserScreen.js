import React, { Component } from 'react';
import {  StyleSheet,  View,  SafeAreaView,  Text,  Alert, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { Left } from 'native-base';

class UserScreen extends React.Component {
    static navigationOptions = {
	title: 'Welcome',
	header: null
    };

    constructor(props) {
        super(props);
        this.state = {
          islogged : false,
          json_data : [],
          access_token : [],
          img_data : [],
          is_img_data : false,
        }
      }

      componentDidMount() {
        this.setState({ islogged: this.props.navigation.state.params.islogged, is_access_token: true, json_data: this.props.navigation.getParam('json_data') });
        //this.props.navigation.state.params
        //this.props.navigation.state.params
        console.log("rftken " + this.props.navigation.getParam('json_data')['refresh_token']);

        var formdata = new FormData();
        formdata.append("refresh_token", this.props.navigation.getParam('json_data')['refresh_token']);
        formdata.append("client_id", "be8f8a010e925e2");
        formdata.append("client_secret", "e454e32d2acccc394d9bfda2cf0fa558fcf1acb3");
        formdata.append("grant_type", "refresh_token");
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
 
        //Access token
        fetch("https://api.imgur.com/oauth2/token", requestOptions)
          .then(res => res.json())
          .then(
            (result) => {//Alert.alert("good val " + JSON.stringify(result));
              this.setState({
                is_access_token: true,
                access_token: result.access_token
              });
                        //get images
          var myHeaders = new Headers();
          //Alert.alert(JSON.stringify("there " + this.state.access_token['access_token']));
          myHeaders.append("Authorization", "Bearer " + this.state.access_token);
          var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
          };
          fetch("https://api.imgur.com/3/account/me/images", requestOptions)
          .then(res => res.json())
          .then(
            (result) => {console.log("good val " + JSON.stringify(result['data']));
              this.setState({
                is_img_data: true,
                img_data: result.data
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
              this.setState({
                is_img_data: false,
                error
              });console.log("error get image " , error);
            }
          )
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
              this.setState({
                is_access_token: false,
                error
              });console.log("error get acctoken " , error);
            }
          );
          //this.setState({ islogged: true });
        }



        handleClick(event) {
          const { param } = e.target.dataset;
          console.log(param);
          //do what you want to do with the parameter
        }
      
      render() {
        const { error, is_access_token, access_token, json_data, img_data } = this.state;
        if ({json_data} != [] && this.state.is_img_data == true) {
          //console.log('rftk rend_ ' + JSON.stringify({json_data}['json_data']['refresh_token']) + ' acce_token = ' + JSON.stringify({ access_token }));
        }
        const logged =<>
  <ScrollView contentContainerStyle={styles.contentContainer}>
      {img_data.map(item => (
        <>
            <Card title={item.name} key={item.id}
              image={{uri: item.link}}
              imageStyle={{
              }}>
             <Text style={{marginBottom: 10}}>
             { item.description }
           </Text>
           <Button key={item.id}
            icon={<Icon raised
            name='eject'
            type='font-awesome'
            color='#f50' 
            key={item.id} />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            
            onPress={() => this.props.navigation.navigate('Post_page', {post_id : item.id, all_post: img_data})}

            title='VIEW NOW' />
             </Card>
      </>
      ))}
	  
        <View style={styles.fixToText}>
          <Button title="Disconnect ?"
            buttonStyle={{borderRadius: 0, marginLeft: 50, marginRight: 0, marginTop:20}}
            onPress={() => this.props.navigation.navigate('Home', {islogged: false, disconnect: true})}
          /> 
          <Button
            title="Imgur HomePage"
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 50, marginTop:20}}
	              onPress={() => this.props.navigation.navigate('Site_Post', {json_data : this.state.json_data, access_token: this.state.access_token } )}
//            onPress={() => this.props.navigation.navigate('Site_Post', {islogged: false, disconnect: true})}
          /> 
          </View>
          <Button
            title="Create a Post ;)"
            buttonStyle={{marginTop:20}}
            onPress={() => this.props.navigation.navigate('Create_post', {json_data : this.state.json_data, access_token: this.state.access_token } )}
          />
          </ScrollView>
          </>;
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
    contentContainer: {
	paddingVertical: 20,
	backgroundColor: '#F5E4AB',
    },  
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
