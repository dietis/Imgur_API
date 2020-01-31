import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: UserScreen},
});

const Mypages = createAppContainer(MainNavigator);

export default Mypages;
