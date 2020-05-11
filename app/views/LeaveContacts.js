import firebase from '@react-native-firebase/app';
import functions from '@react-native-firebase/functions';
/* eslint-disable react-native/no-raw-text */
import React, { Component } from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import fontFamily from './../constants/fonts';
import languages from './../locales/languages';
import { applicationActions } from '../actions';
import NavigationBarWrapper from '../components/NavigationBarWrapper';
import Colors from '../constants/colors';
import { USER_CUSTOM_TOKEN, USER_PHONE, USER_UUID } from '../constants/storage';
import { SetStoreData } from '../helpers/General';

const mapStateToProps = state => ({
  phone: state.application.phone,
});

class LeaveContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      name: '',
      surname: '',
    };
  }

  backToMain = () => {
    this.props.navigation.goBack();
  };

  handleBackPress = () => {
    this.backToMain();
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  sendData = async () => {
    try {
      const { name, surname, phone } = this.state;
      const status = 'suspected';
      if (name === '' || phone === '') return;

      // Get cloud function
      const cldFn = await firebase
        .app()
        .functions('europe-west1')
        .httpsCallable('addPatientToList');

      // Reset text inputs
      this.setState({ phone: '', name: '', surname: '' });

      // Call cloud function
      cldFn({ name, surname, phone, status })
        .then(({ data }) => {
          if (data.status === 'denied') {
            Alert.alert(
              languages.t('label.failure_title'),
              languages.t('label.leave_contacts_alert_failure_text'),
              [{ text: 'OK' }],
            );
            return;
          }
          Alert.alert(
            languages.t('label.leave_contacts_alert_success_title'),
            languages.t('label.success'),
            [{ text: 'OK' }],
          );

          // Update store if it's needed
          const oldPhone = this.props.phone;
          if (phone !== oldPhone) {
            this.props.dispatch(applicationActions.setPhone(phone));
            this.props.dispatch(applicationActions.setToken(''));
            this.props.dispatch(applicationActions.setUuid(''));
            SetStoreData(USER_PHONE, phone);
            SetStoreData(USER_CUSTOM_TOKEN, '');
            SetStoreData(USER_UUID, '');
          }
        })
        .catch(console.log);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { phone, name, surname } = this.state;
    return (
      <NavigationBarWrapper
        title={languages.t('label.leave_contacts_title')}
        onBackPress={this.backToMain}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.spacer} />
          <View style={styles.spacer} />

          {/* CONTACTS FORM */}
          <TextInput
            style={styles.input}
            placeholder={languages.t('label.phone')}
            keyboardType={'number-pad'}
            value={phone}
            onChangeText={v => this.setState({ phone: v })}
          />
          <View style={styles.spacer} />
          <TextInput
            style={styles.input}
            placeholder={languages.t('label.name')}
            value={name}
            onChangeText={v => this.setState({ name: v })}
          />
          <View style={styles.spacer} />
          <TextInput
            style={styles.input}
            placeholder={languages.t('label.surname')}
            value={surname}
            onChangeText={v => this.setState({ surname: v })}
          />

          {/* SEND DATA BUTTON */}
          <TouchableOpacity style={styles.sendBtn} onPress={this.sendData}>
            <Text style={styles.textBtn}>{languages.t('label.send_data')}</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
          <View style={styles.spacer} />
        </ScrollView>
      </NavigationBarWrapper>
    );
  }
}

export default connect(mapStateToProps)(LeaveContacts);

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.INTRO_WHITE_BG,
    paddingHorizontal: 26,
    paddingBottom: 42,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.VIOLET,
    fontSize: 18,
    fontFamily: fontFamily.primaryRegular,
    paddingHorizontal: 10,
  },
  sendBtn: {
    height: 50,
    marginVertical: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.VIOLET,
  },
  textBtn: {
    fontSize: 18,
    fontFamily: fontFamily.primaryRegular,
    color: 'white',
  },
  spacer: {
    marginVertical: '2%',
  },
});
