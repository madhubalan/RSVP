import * as React from 'react';
import { Button, View, Text } from 'react-native';
export default class RegistrationPage extends React.Component {
      render() {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
              title="Go to Details"
              onPress={() => this.props.navigation.navigate('SearchPage')}
            />
          </View>
        );
      }
    }