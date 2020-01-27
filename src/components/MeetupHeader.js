import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
export default class MeetupHeader extends React.Component {
      render() {
            return (
                  <View style={styles.container}>
                        <View style={styles.iconContainer}>
                              <Text style = {styles.iconText}>{this.props.name}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                              <Text style = {styles.name}>{this.props.name + " meetup"}</Text>
                              <Text style = {styles.company}>{this.props.company}</Text>
                              <View style={styles.venueContainer}>
                              <View style={styles.date}>
                                    <Image
                                          source={require("../images/ico_date.png")}
                                          style={styles.icon}
                                    />
                                    <Text style ={styles.venueText}>{this.props.date}
                                    </Text>
                              </View>
                              <View style={styles.location}>
                                    <Image
                                          source={require("../images/ico_location.png")}
                                          style={styles.icon}
                                    />
                                    <Text style = {styles.venueText}> {this.props.location}
                                    </Text>
                              </View>
                              </View>
                        </View>

                  </View>
            );
      }
}


const styles = StyleSheet.create({
      container: {
            backgroundColor : '#F9F9F9',
            flexDirection: 'row',
            height: 116,
            borderRadius : 8,
            alignItems: 'center'
            
      },
      iconContainer:{
            backgroundColor : '#4943EF',
            alignItems: 'center',
            justifyContent: 'center', 
            marginLeft :  12,
            width : 92,
            height : 92,
            borderRadius : 7
      },
      iconText:{
            fontSize : 28,
            fontWeight : 'bold',
            color : 'white'
      },
      detailsContainer:{ flexDirection: 'column', marginLeft : 20 },
      name:{fontSize : 17, fontWeight: '600', color : '#030050'},
      company:{ marginTop: 5, fontSize : 10, fontWeight: '600', color : '#8D8CAF'},
      icon:{width : 14, height: 14},
      venueContainer:{ flexDirection: 'row', marginTop : 8},
      date:{ flexDirection: 'row', alignItems: 'center'},
      location : {marginLeft : 5, flexDirection: 'row', alignItems: 'center'},
      venueText: {fontSize : 10, fontWeight: '600', color : '#030050'}
})