import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { COLORS } from '../Config'
import { isEmpty } from 'lodash'
import MeetupHeader from '../components/MeetupHeader'
import NumericInput from 'react-native-numeric-input'
import ReactNativePickerModule from 'react-native-picker-module'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";


const FORM_FIELD = {
  HEADER: 'Header',
  SECTION_HEADER: 'Sectoin header',
  NAME: 'Name',
  DOB: 'Date of birth',
  LOCALITY: 'Locality',
  NO_OF_GUESTS: 'No of guests',
  ADDRESS: 'Address',
}

const PICKER_SOURCE = {
  LOCALITY: ['Chennai', 'Bangalore', 'Hydrabad', 'Mumbai', 'Delhi'],
}
const { width, height } = Dimensions.get("window")
export default class RegistrationPage extends React.Component {

  static navigationOptions = {
    title: 'Registration',
  };
  
  /* 1. LIFECYCLE ********************************************************************************************/

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      selectedLocality: "",
      currentPickerField: null,
      isDateTimePickerVisible: false,
      selectedDate: null,
      name: "",
      address: "",
      noOfGuests: 0

    }
  }

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

  render() {

    if (this.state.isLoading) {
      return this.showLoadingScreen()
    }
    else {
      return (
        <View style={styles.container}>
          {this._showPicker()}
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          {!isEmpty(this.state.data) && <View style={this.state.keyboardHeight > 0 ? { height: height - 64 - this.state.keyboardHeight } : { flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
              bounces={true}
              style={{ flex: 1 }}
              keyExtractor={this._keyExtractor}
              data={this.state.data}
              extraData={this.state}
              renderItem={this._renderItem}
            />
          </View>
          }
          <TouchableOpacity
            style={this.isAllTheFieldsFilled() ? styles.buttonContainer : styles.disableButtonContainer}
            onPress={() => {
              if (this.isAllTheFieldsFilled()) {
                this.showLoader()
                setTimeout(() => {
                  this.props.navigation.navigate('SearchPage')
                  this.hideLoader()
                  this.resetStates()
                }, 500)
              }
            }}
          >
            <Text style={styles.buttonText}>Join</Text>
          </TouchableOpacity>

        </View>)
    }

  }

  /* 2. UTILS ********************************************************************************************/

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
      case FORM_FIELD.HEADER:
        return <MeetupHeader name={'Js'} company={'Google'} date={'9 Feb 2020'} location={'Chennai'} />

      case FORM_FIELD.SECTION_HEADER:
        return <Text style={styles.sectionHeader}>Attendee details</Text>

      case FORM_FIELD.NAME:
        return (<TextInput style={styles.inputWithBorder} placeholder={item.key} placeholderTextColor={'#828282'} paddingLeft={12} underlineColorAndroid='transparent'
          onChangeText={text => this.setState({ name: text })}
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
              <Text style={!isEmpty(this.state.selectedLocality) ? styles.fillText : styles.placeHolder}>{!isEmpty(this.state.selectedLocality) ? this.state.selectedLocality : item.key}</Text>
            </View>
          </TouchableWithoutFeedback>
        )

      case FORM_FIELD.NO_OF_GUESTS:
        return (<View style={[styles.inputWithBorder, { justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }]}>
          <Text style={styles.placeHolder}>{item.key}</Text>
          <NumericInput minValue={0} maxValue={2} totalHeight={50} leftButtonBackgroundColor="#6599ED" rightButtonBackgroundColor="#6599ED" borderColor="transparent" onChange={value => this.setState({ noOfGuests: value })} />
        </View>)

      case FORM_FIELD.ADDRESS:
        return (<TextInput maxLength = {50} paddingLeft={12} style={[styles.inputWithBorder, { height: 87 }]} placeholder={item.key} placeholderTextColor={'#828282'} multiline={true} underlineColorAndroid='transparent'
          onChangeText={text => this.setState({ address: text })}
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
        return PICKER_SOURCE.LOCALITY.indexOf(this.state.selectedLocality)
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

  isAllTheFieldsFilled() {
    return !isEmpty(this.state.name) && !isEmpty(this.state.selectedDate) && !isEmpty(this.state.selectedLocality) && !isEmpty(this.state.address)
  }

  showLoadingScreen() {
    return <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  }

  showLoader = () => this.setState({ isLoading: true })

  hideLoader = () => this.setState({ isLoading: false })

  resetStates() {
    this.setState({
      name: '',
      selectedDate: null,
      selectedLocality: '',
      noOfGuests: 0,
      address: ''
    })

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  header: {
    marginLeft: 0,
    marginRight: 0,
    height: 64,
    flexDirection: "row",
    justifyContent: "flex-start",
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
    marginTop: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#C2CBD3',
    borderRadius: 4,
    fontSize: 16

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
  placeHolder: { marginLeft: 12, textAlign: "left", color: '#828282', fontSize: 16 },
  fillText: { marginLeft: 12, textAlign: "left", color: '#000000', fontSize: 16 },
  doneIcon: {
    width: 40,
    height: 40,
    marginTop: 12,
    marginRight: 20

  },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  buttonContainer: {
    height: 51, backgroundColor: '#6599ED', alignItems: 'center',
    justifyContent: 'center'
  },
  disableButtonContainer: {
    height: 51, backgroundColor: '#D6E4FA', alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeader: { marginTop: 20, fontSize: 16, fontWeight: 'bold' }
})