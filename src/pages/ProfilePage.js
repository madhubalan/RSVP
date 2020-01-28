import * as React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const DETAILS_FIELD = {
  NAME: {lable : 'Name', imageName : 'ico_person_small.png'},
  DOB: 'Date of birth',
  LOCALITY: 'Locality',
  NO_OF_GUESTS: 'No of guests',
  ADDRESS: 'Address'
}
export default class ProfilePage extends React.Component {


  componentDidMount() {
    const list = [
      { key: FORM_FIELD.HEADER },
      { key: FORM_FIELD.SECTION_HEADER },
      { key: FORM_FIELD.NAME },
      { key: FORM_FIELD.DOB },
      { key: FORM_FIELD.LOCALITY },
      { key: FORM_FIELD.NO_OF_GUESTS },
      { key: FORM_FIELD.ADDRESS }
    ]
    this.setState({ data: list })
  }

  getDetailListItem =(path, lable, value)=>{
  
    return <View style = {styles.listItem}>
      <Image source={require(path)} style={styles.icon}/>
      <Text>{lable}</Text>
      <Text>{value}</Text> 
    </View>
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Image source={require("../images/ico_white.png")} style={styles.profile} />
        <View style = {styles.list}>

        </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FFFFFF'
  },
  profile:{
    width : 82,
    height : 82
  },
  icon:{
    width : 15,
    height : 15
  },
  list:{
    marginLeft : 20,
    marginRight : 20
  },
  listItem:{
    flexDirection: 'row'
  }
})