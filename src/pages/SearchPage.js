import * as React from 'react';
import { StyleSheet, View, Text, TextInput, Image, FlatList } from 'react-native';

export default class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Members',
  };

  componentDidMount() {
    // get response from api
    // load it in list
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={styles.searchBoxContainer}>
          <Image source={require("../images/ico_search.png")} style={styles.icon} />
          <TextInput inlineImageLeft='search_icon' placeholder={'Search member'} placeholderTextColor={'#828282'} style={styles.searchBox}></TextInput>
        </View>
        <FlatList contentContainerStyle={{ padding: 20 }} style={styles.list}>

        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    width: 14,
    height: 14
  },
  searchBox: { flex: 1, marginLeft: 5, marginRight: 5, fontWeight: '600' },
  searchBoxContainer: { flexDirection: 'row', 
  alignItems: 'center', 
  marginTop: 22, 
  marginLeft: 20, 
  marginRight: 20, 
  height: 42, 
  borderWidth: 1, 
  borderColor: '#C2CBD3', 
  borderRadius: 4 },
  list: { flex: 1, backgroundColor: 'gray' }
})