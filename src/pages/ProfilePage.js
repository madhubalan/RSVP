import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash'


const DETAILS_FIELD = {
  NAME: 'Name',
  DOB: 'Date of birth',
  LOCALITY: 'Locality',
  NO_OF_GUESTS: 'No of guests',
  ADDRESS: 'Address'
}
export default class ProfilePage extends React.Component {


  componentWillMount() {

    // For requre can not pass the variable
    this.list = [
      { key: DETAILS_FIELD.NAME, image: require('../images/ico_person_small.png') },
      { key: DETAILS_FIELD.DOB, image: require('../images/ico_date_light.png') },
      { key: DETAILS_FIELD.LOCALITY, image: require('../images/ico_location_light.png') },
      { key: DETAILS_FIELD.NO_OF_GUESTS, image: require('../images/ico_person_small.png') },
      { key: DETAILS_FIELD.ADDRESS, image: require('../images/ico_address.png') }
    ]

  }

  getDetailListItem = (index, item, value) => {

    return (<View key={index} style={styles.listItem}>
      <Image source={item.image} style={styles.icon} />
      <Text style={styles.lblText}>{item.key}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>)
  }
  renderItem = (subItem, index) => {
    const { name, dob, locality, no_of_guests, Address } = this.props.navigation.state.params.item
    switch (subItem.key) {
      case DETAILS_FIELD.NAME:
        return this.getDetailListItem(index, subItem, name)
      case DETAILS_FIELD.DOB:
        return this.getDetailListItem(index, subItem, dob)
      case DETAILS_FIELD.LOCALITY:
        return this.getDetailListItem(index, subItem, locality)
      case DETAILS_FIELD.NO_OF_GUESTS:
        return this.getDetailListItem(index, subItem, no_of_guests)
      case DETAILS_FIELD.ADDRESS:
        return this.getDetailListItem(index, subItem, Address)
      default:
        return <View />

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("../images/ico_member_white.png")} style={styles.profile} />
          </View>

          <View style={styles.list}>
            {!isEmpty(this.list) ? this.list.map(this.renderItem) : <View />}
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FFFFFF',
  },
  profile: {
    marginTop : 50,
    width: 82,
    height: 82
  },
  icon: {
    width: 16,
    height: 16
  },
  list: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#F9F9F9'
  },
  listItem: {
    flexDirection: 'row',
    marginTop : 10,
    marginBottom : 10,
    alignItems: 'center',
  },
  lblText: {
    marginLeft : 10,
    color: '#9897B8',
    fontSize: 16,
    fontWeight: '600'
  },
  valueText: {
    marginLeft : 20,
    color: '#383675',
    fontSize: 16,
    fontWeight: '600'
  }
})