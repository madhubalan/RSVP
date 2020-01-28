import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import RegistrationPage from './src/pages/RegistrationPage';
import SearchPage from './src/pages/SearchPage';
import ProfilePage from './src/pages/ProfilePage'


const RootStack = createStackNavigator(
  {
    Home: RegistrationPage,
    SearchPage: SearchPage,
    ProfilePage: ProfilePage
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
