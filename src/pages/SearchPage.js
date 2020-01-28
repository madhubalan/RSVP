import * as React from 'react';
import { StyleSheet, View, TextInput, Image, FlatList, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import {getMembersList} from '../API/APIClient'
import ListItem from '../components/MemberListItem'
import {filter} from "lodash"

const { width, height } = Dimensions.get("window")
export default class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Members',
  };


  /* 1. LIFECYCLE ********************************************************************************************/

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      displayableDataSource : null
    }
  }
  
  componentDidMount() {
    getMembersList().then(responseJson =>{
      this.dataSource = responseJson,
      this.setState({
        isLoading: false,
        displayableDataSource : responseJson
      })
  })

  this.keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    this._keyboardDidShow
  );
  this.keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
    this._keyboardDidHide
  );

  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({ keyboardHeight: e.endCoordinates.height })
  }

  _keyboardDidHide = () => {

    this.setState({ keyboardHeight: 0 })
  }

  _renderItem = ({ item }) => {
    return <ListItem item = {item} itemOnClick = {this.itemOnClick} />
  }

  itemOnClick =(item)=>{
    console.log(item)
  }

  _keyExtractor = (item, index) => index.toString();


  render() {

    if(this.state.isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <Image source={require("../images/ico_search.png")} style={styles.icon} />
          <TextInput inlineImageLeft='search_icon' 
          placeholder={'Search member'} 
          placeholderTextColor={'#828282'} 
          style={styles.searchBox}
          onChangeText={text => {
           const filteredArray =  this.dataSource.filter(
              item => item.name.toUpperCase().includes(text.toUpperCase()) || item.locality.toUpperCase().includes(text.toUpperCase())
            )
            this.setState({
              displayableDataSource : filteredArray
            })
          }}
          />
        </View>
        <View style={this.state.keyboardHeight > 0 ? { height: height - 144 - this.state.keyboardHeight } : { flex: 1 }}>
        <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
              style={styles.list}
              keyExtractor={this._keyExtractor}
              data={this.state.displayableDataSource}
              extraData={this.state}
              renderItem={this._renderItem}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, backgroundColor: '#FFFFFF' 
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    width: 14,
    height: 14
  },
  loader:{
    flex: 1, justifyContent: 'center'
  },
  searchBox: { 
  flex: 1, marginLeft: 5, marginRight: 5, fontWeight: '600' },
  searchBoxContainer: { flexDirection: 'row', 
  alignItems: 'center', 
  marginTop: 22, 
  marginLeft: 20, 
  marginRight: 20, 
  height: 42, 
  borderWidth: 1, 
  borderColor: '#C2CBD3', 
  borderRadius: 4,
},

  list: { 
    flex: 1
  }
})