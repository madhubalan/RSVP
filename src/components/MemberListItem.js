import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';

export default class MemberListItem extends React.Component {

      render() {
            const { item, itemOnClick } = this.props
            return (
                  <TouchableWithoutFeedback
                              onPress={() => {
                                    itemOnClick(item)
                              }}
                        >
                  <View style={styles.container}>
                        
                              <Image
                                    source={require("../images/ico_member_gray.png")}
                                    style={styles.icon}
                              />
                              <View style={styles.details}>
                                    <Text style = {styles.name}>{item.name}</Text>
                                    <Text style = {styles.locality}>{item.locality}</Text>
                              </View>
                              <Image
                                    source={require("../images/ico_disclosure.png")}
                                    style={styles.diclosureIcon} 
                              />
                  </View>
                  </TouchableWithoutFeedback>
            )
      }
}


const styles = StyleSheet.create({

      container: {
            flex : 1, 
            height : 92,
            marginTop : 20,
            borderWidth: 1, 
            borderColor: '#F6F6F6', 
            borderRadius: 4,
            borderRadius : 8,
            alignItems: 'center',
            flexDirection : 'row'
      },
      icon : {
            marginLeft : 20, 
            height : 57, 
            width:57
      },
      diclosureIcon :{
            height : 28, 
            width:28,
            justifyContent: 'flex-end',
            marginRight : 20
      },
      details: { flexDirection : 'column', flex : 1 },
      name : { marginLeft : 20, fontSize : 15, fontWeight : '600', color : '#030050'},
      locality : { marginLeft : 20, marginTop : 10, fontSize : 10, fontWeight : '600', color : '#9190B3'}

})
