import * as React from 'react';
import { View, Text, Image } from 'react-native';

export default class MeetupHeader extends React.Component {
      render() {
        return (
          <View style={styles.container}>
                <View style = {}>

                </View>
                <View style = {{flexDirection : 'column'}}>
                  <Text></Text>
                  <Text></Text>
                  <View style = {{flexDirection : 'row'}}></View>
                        <View>
                              <Image>
                              </Image>
                              <Text>
                              </Text>
                        </View>
                        <View>
                              <Image>
                              </Image>
                              <Text>
                              </Text>
                        </View>
                </View>
           
          </View>
        );
      }
    }


    const styles = StyleSheet.create({
      container: {
            flexDirection : 'row', 
            height : 116, 
            marginLeft:12, 
            marginRight:12
      }
})