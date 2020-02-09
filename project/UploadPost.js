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

class Post_upload extends Component {
    static navigationOptions = {
      title: 'Post',
    };

    constructor(props) {
      super(props);
      this.state = {
          posted: false,
          access_token : '',
          json_data: [],
          filepath: {
            data: '',
            uri: ''
          },
          fileData: '',
          fileUri: ''
        }
    }

  componentDidMount() {
    this.setState({ json_data: this.props.navigation.getParam('json_data'), access_token: this.props.navigation.getParam('access_token') });
  }
  
  reload = () => 
  {
    //RELOAD COMPONENT
    this.componentDidMount();
    this.setState({reload: true});
  };

    onClickListener = (viewId) => {
    }




    chooseImage = () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          //console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
    
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            // alert(JSON.stringify(response));s
            //console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
      }

      launchCamera = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
          //console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            //console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
      }
    
      push_img = () => { //le click button est ici pour push sur imgur
        if (this.state.fileUri == '') {
          Alert.alert("Empty file, please select an image or take a picture ");
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Client-ID 80f2eef039cf016");

            var formData = new FormData();
            formData.append('upload', {
                      image: this.state.fileData,
                type: 'base64'
            });
        
            var requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Client-ID ' + 'ae785bebe045504',
                        Accept: 'application/json',
                      },
                    body: formData,
                    redirect: 'follow'
            };
        

                var myHeaders = new Headers();
                Alert.alert("test " + this.state.access_token);
                myHeaders.append("Authorization", "Bearer "+ this.state.access_token);
                var formdata = new FormData();
                formdata.append("image", this.state.fileData);
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
                };

                fetch("https://api.imgur.com/3/image", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    };

      launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          //console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            //console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
      }
    
      renderFileData() {
        if (this.state.fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
            style={styles.images}
          />
        } else {
          return <Image source={require('./Duck.png')}
            style={styles.images}
          />
        }
      }
    
      renderFileUri() {
        if (this.state.fileUri) {
          return <Image
            source={{ uri: this.state.fileUri }}
            style={styles.images}
          />
        } else {
          return <Image
            source={require('./Duck.png')}
            style={styles.images}
          />
        }
      }


    render() {
      return (
      <>
      <Text> debug </Text>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
              <Button 
            icon={<Icon raised
            name='send'
            type='font-awesome'
            color='#f01' 
            />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0,  backgroundColor: 'lightgrey' }}
            onPress={this.push_img}
            title='Push image ?'
             />

            </View>
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
      backgroundColor: 'rgb(255,127,80)',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      height: Dimensions.get('screen').height - 20,
      width: Dimensions.get('screen').width
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
      backgroundColor: '#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom:10
    },
    btnText: {
      textAlign: 'center',
      color: 'gray',
      fontSize: 14,
      fontWeight:'bold'
    }
  });
 
export default Post_upload;
