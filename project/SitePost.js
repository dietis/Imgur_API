import React, { Component, Fragment } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  Image,
  Alert,
  Linking,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-community/cookies';
import { Container, Header, Content, Card, CardItem, Left, Thumbnail, Text, Body } from "native-base";
import AutoHeightImage from 'react-native-auto-height-image';
import ImagePicker from 'react-native-image-picker';
import { Button, Icon } from 'react-native-elements'
import RadioGroup from 'react-native-radio-buttons-group';

class Site_Post extends Component {
    static navigationOptions = {
	title: 'Imgur Homepage',
	header: null
    };

    constructor(props) {
      super(props);
      this.state = {
          posted: false,
          access_token : '',
          firstload: true,
          array_img: [],
          data: [
            {
              label: 'Hot',
            },
            {
              label: 'Top',
              value: "Top",
            },
          ],
        }
    }

  componentDidMount() {
    this.setState({ json_data: this.props.navigation.getParam('json_data'), access_token: this.props.navigation.getParam('access_token') });
  }

    onPress = data => {this.setState({ data });
    this.setState({ firstload: false });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.props.navigation.getParam('access_token'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    var section;
    if (data == 'Hot') {
      section = 'hot';
    } else { section = 'top'}
    fetch("https://api.imgur.com/3/gallery/"+section+"/viral/day/0?showViral=true&mature=false&album_previews=false", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result); 
        this.setState({
          array_img: result.data
        });
        })
      .catch(error => console.log('error', error));
      console.log("gg");
    };

    render() {
      if (this.state.firstload == true) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.navigation.getParam('access_token'));

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("https://api.imgur.com/3/gallery/hot/viral/day/0?showViral=true&mature=false&album_previews=false", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result);
            this.setState({
              array_img: result.data
            });
          })
          .catch(error => console.log('error', error));
          this.setState({ firstload : false });
        }
      return (
      <>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
        <RadioGroup radioButtons={this.state.data} onPress={this.onPress} style={{display: 'flex', width:'auto', marginHorizontal: -32}}/>
        <ScrollView contentContainerStyle={styles.contentContainer}>
      {this.state.array_img.map(item => (
        <>
            <Card title={item.name} key={item.id}
              image={{url: item.link}}
              imageStyle={{ height : 40
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
            onPress={() => this.props.navigation.navigate('Post_page', {post_id : item.id, all_post: this.state.array_img})}
            title='VIEW NOW' />
             </Card>
      </>
      ))}
          </ScrollView>
          </View>
        </SafeAreaView>
      </Fragment>

      <Text>{this.state.post_id}</Text>
      </>
      );
    }
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: '#778899',
    },
    body: {
      backgroundColor: '#F5E4AB',
      justifyContent: "flex-start",
      borderColor: 'black',
      height: Dimensions.get('screen').height,
    },
    ImageSections: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 8,
      justifyContent: 'center'
    },
    images: {
      width: 150,
      height: 150,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 3
    },
    btnParentSection: {
      alignItems: 'center',
      marginTop:10
    },
    btnSection: {
      width: 225,
      height: 50,
      backgroundColor: '#ABBCF5',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom:10
    },
    btnText: {
      textAlign: 'center',
      color: '#181A22',
      fontSize: 14,
      fontWeight:'bold'
    }
  });
 
export default Site_Post;
