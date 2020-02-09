import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';
import Islogged from './Islogged';
import The_Post from './Posts';

import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';

const setToken = async (token) => {
  await SecureStore.setItemAsync('secure_token', token);
};

const getToken = async () => {
  return await SecureStore.getItemAsync('secure_token');
};

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: UserScreen},
  Logged: {screen: Islogged},
  Post_page: {screen: The_Post},
});

const Mypages = createAppContainer(MainNavigator);

export default Mypages;
