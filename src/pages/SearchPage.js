import * as React from 'react';
import { View, Text } from 'react-native';

export default class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Members',
  };
      render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
          </View>
        );
      }
    }