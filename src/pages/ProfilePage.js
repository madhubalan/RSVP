import * as React from 'react';
import { View, Text } from 'react-native';

export default class ProfilePage extends React.Component {
      render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
          </View>
        );
      }
    }