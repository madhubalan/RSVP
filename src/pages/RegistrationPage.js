import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, FlatList, Dimensions, Keyboard } from 'react-native';
import { COLORS } from '../Config'
import { isEmpty } from 'lodash'
import ReactNativePickerModule from 'react-native-picker-module'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";


export const FORM_FIELD = {
  NAME: 'Name',
  DOB: 'Date of birth',
  LOCALITY: 'Locality',
  NO_OF_GUESTS: 'No of guests',
  ADDRESS: 'Address',
}

export const PICKER_SOURCE = {
  LOCALITY: ['Chennai', 'Bangalore', 'Hydrabad', 'Mumbai', 'Delhi'],
}
const { width, height } = Dimensions.get("window")
export default class RegistrationPage extends React.Component {

  static navigationOptions = {
    title: 'Registration',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedLocality: "",
      currentPickerField: null,
      isDateTimePickerVisible: false,
      selectedDate: null
    }
  }

  componentDidMount() {
    const list = [
      { key: FORM_FIELD.NAME },
      { key: FORM_FIELD.DOB },
      { key: FORM_FIELD.LOCALITY },
      { key: FORM_FIELD.NO_OF_GUESTS},
      { key: FORM_FIELD.ADDRESS }
    ]
    this.setState({ data: list })


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

  _keyExtractor = (item, index) => index.toString();

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const dt = moment(date).format("DD/MM/YYYY")
    this.setState({ selectedDate: dt })
    this._hideDateTimePicker();
  };


  _renderItem = ({ item }) => {
    switch (item.key) {
      case FORM_FIELD.NAME:
        return (<TextInput style={styles.inputWithBorder} placeholder={item.key} placeholderTextColor={'#828282'}  paddingLeft={12} underlineColorAndroid='transparent'
        />)
      case FORM_FIELD.DOB:
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this._showDateTimePicker()
            }}
          >
            <View style={[styles.inputWithBorder, { justifyContent: 'center' }]}>
              <Text style={this.state.selectedDate ? styles.fillText : styles.placeHolder}>{this.state.selectedDate ? this.state.selectedDate : item.key}</Text>
            </View>
          </TouchableWithoutFeedback>
        )


      case FORM_FIELD.LOCALITY:
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ currentPickerField: FORM_FIELD.LOCALITY })
              setTimeout(() => {
                this.pickerRef.show()
              }, 500)

            }}
          >
            <View style={[styles.inputWithBorder, { justifyContent: 'center' }]}>
              <Text style={ !isEmpty(this.state.selectedLocality) ? styles.fillText : styles.placeHolder}>{!isEmpty(this.state.selectedLocality) ? this.state.selectedLocality : item.key}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      case FORM_FIELD.NO_OF_GUESTS:
        return (<TextInput paddingLeft={12} style={styles.inputWithBorder} keyboardType={'phone-pad'} placeholder={item.key} placeholderTextColor={'#828282'} underlineColorAndroid='transparent'
        />)

      case FORM_FIELD.ADDRESS:
        return (<TextInput paddingLeft={12} style={styles.inputWithBorder} placeholder={item.key} placeholderTextColor={'#828282'} multiline={true} underlineColorAndroid='transparent'
        />)

      default:
        return <View />
    }
  }


  _getPickerItems() {
    if (!isEmpty(this.state.currentPickerField)) {
      switch (this.state.currentPickerField) {
        case FORM_FIELD.LOCALITY:
          return PICKER_SOURCE.LOCALITY
        case FORM_FIELD.CLASS:
          return PICKER_SOURCE.CLASS
        case FORM_FIELD.SECTION:
          return PICKER_SOURCE.SECTION
        default:
          return []

      }
    }
    else {
      return []
    }

  }

  selectedValue() {
    switch (this.state.currentPickerField) {
      case FORM_FIELD.LOCALITY:
        return  PICKER_SOURCE.LOCALITY.indexOf(this.state.selectedLocality) 
      case FORM_FIELD.CLASS:
        return this.state.selectedClass
      case FORM_FIELD.SECTION:
        return this.state.selectedSection
      default:
        return 0
    }
  }

  _showPicker() {

    return (<ReactNativePickerModule
      pickerRef={e => this.pickerRef = e}
      value={this.selectedValue()}
      title={"Select a item"}
      items={this._getPickerItems()}
      onValueChange={(index) => {
        switch (this.state.currentPickerField) {
          case FORM_FIELD.LOCALITY:
            this.setState({ selectedLocality: index })
            break
          case FORM_FIELD.CLASS:
            this.setState({ selectedClass: index })
            break
          case FORM_FIELD.SECTION:
            this.setState({ selectedSection: index })
            break
        }
      }} />)
  }

  render() {
    return (
      <View style={styles.container}>
        {this._showPicker()}
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      
        {!isEmpty(this.state.data) && <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={[styles.list, this.state.keyboardHeight > 0 ? { height: (height - 260 - this.state.keyboardHeight) } : {}]}
          keyExtractor={this._keyExtractor}
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem}
        />
        }
      </View>)
  }
}




const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: COLORS.MESSAGE_PAGE.BACKGROUND_COLOR
  },

  header: {
        marginLeft: 0,
        marginRight: 0,
        height: 64,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: COLORS.PRIMARY_COLOR
  },
  textContainer: {
        flexGrow: 1,
        marginTop: 12,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
  },
  title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.ACCENT_COLOR,
        textAlign: "center",
  },
  list: { "flex": 1, marginLeft: 20, marginRight: 20 },
  profileContainer: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
  },
  profile: {
        height: 80,
        width: 80
  },
  inputWithBorder: {
        backgroundColor : 'red',
        marginTop : 10,
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#C2CBD3',
        fontSize: 14

  },
  pickerFullContainer: {
        'zIndex': 22,
        position: 'absolute',
        marginTop: 64,
        height: (height - 120),
        width: width,
        marginLeft: 0,
        marginRight: 0,
        backgroundColor: "rgba(130, 130, 130, 0.9)"
  },
  pickerContainer: {
        flex: 1,
        justifyContent: "center",
        margin: 30
  },
  pickerCloseText: {
        height: 22,
        marginTop: 11,
        marginRight: 20,
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.PRIMARY_COLOR
  },
  placeHolder: { marginLeft : 12, textAlign: "left", color: '#828282', fontSize: 14 },
  fillText: { marginLeft : 12, textAlign: "left", color: '#000000', fontSize: 14 },
  doneIcon:{
              width: 40,
               height: 40,
               marginTop : 12,
              marginRight: 20 
        
  }

})