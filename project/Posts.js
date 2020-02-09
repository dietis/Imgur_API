import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  SafeAreaView,
  Image,
  Alert,
  Linking,
  ScrollView,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-community/cookies';
import { Container, Header, Content, Card, CardItem, Left, Thumbnail, Text, Body } from "native-base";
import AutoHeightImage from 'react-native-auto-height-image';

class Post extends Component {
    static navigationOptions = {
	title: 'Post',
	header: null
    };

    constructor(props) {
      super(props);
      this.state = {
        post_id : '',
        all_post: [],
        reload: false,
      }
    }

  componentDidMount() {
    this.setState({ post_id: this.props.navigation.getParam('post_id'), all_post: this.props.navigation.getParam('all_post')});
  }

  
  _onNavigationStateChange = (event) => {
    alert("gg");
  };

  reload = () => 
  {
    //RELOAD COMPONENT
    this.componentDidMount();
    this.setState({reload: true});
  };

    onClickListener = (viewId) => {
    }

    render() {
      var screenWidth = Dimensions.get('window').width;
      {this.state.reload == false ? this.reload() : null }
      const {navigate} = this.props.navigation;
      const { all_post } = this.state;
      console.log({all_post});
      return (
      <>
      <Text> </Text>
      <ScrollView >
      {all_post.map(item => (
         item.id == this.state.post_id ? <>
         <Card style={{ flex: 1 }}>
         <CardItem>
           <Left>
             <Thumbnail source={item.link} />
             <Body>
               <Text>{item.name}</Text>
               <Text note>{item.datetime}</Text>
             </Body>
           </Left>
         </CardItem>
         <CardItem>
           <Body>
             <AutoHeightImage
               width={Dimensions.get('window').width - 35}
               source={{ uri: item.link }}
             />
             <Text style={{ marginTop: 10 }}>{ item.description }</Text>
           </Body>
         </CardItem>
       </Card>
 </> : null
    ))}
          </ScrollView>
            <Text></Text>
      </>
      );
    }
}

export default Post;
