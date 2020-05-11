import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import languages from './../locales/languages';
import { applicationActions } from '../actions';
import Colors from '../constants/colors';
import fontFamily from '../constants/fonts';
import { USER_CUSTOM_TOKEN, USER_PHONE, USER_UUID } from '../constants/storage';
import { SetStoreData } from '../helpers/General';
import { convertWebStatusIntoAppStatus } from '../utils/general';

const mapStateToProps = state => ({
  phone: state.application.phone,
  isVerified: state.application.token !== '',
});

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      pin: '',
    };
  }

  verifyAccount = async () => {
    try {
      const { pin } = this.state;
      const phone =
        this.props.phone !== '' ? this.props.phone : this.state.phone;

      // Get cloud function
      const cldFn = await firebase
        .app()
        .functions('europe-west1')
        .httpsCallable('validatePin');

      // Reset text inputs
      this.setState({ phone: '', pin: '' });

      // Call cloud function
      cldFn({ phone, pin })
        .then(({ data }) => {
          console.log(data);
          if ('customToken' in data) {
            const { customToken, uuid } = data;

            Alert.alert(
              languages.t('label.verification_alert_success'),
              languages.t('label.success'),
              [{ text: 'OK' }],
            );
            // Set global state in redux and async storage
            this.props.dispatch(applicationActions.setPhone(phone));
            this.props.dispatch(applicationActions.setToken(customToken));
            this.props.dispatch(applicationActions.setUuid(uuid));
            SetStoreData(USER_PHONE, phone);
            SetStoreData(USER_CUSTOM_TOKEN, customToken);
            SetStoreData(USER_UUID, uuid);

            // Subscribe on document changes
            firestore()
              .collection('patients')
              .doc(uuid)
              .onSnapshot(doc => {
                let { status } = doc.data();
                status = convertWebStatusIntoAppStatus(status);
                this.props.dispatch(applicationActions.setStatus(status));
              });

            // Authenticate with Firebase
            firebase
              .auth()
              .signInWithCustomToken(customToken)
              .then(res => {
                console.log('Sign in successfull: ', res);
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            Alert.alert(
              languages.t('label.failure_title'),
              languages.t('label.verification_alert_failure'),
              [{ text: 'OK' }],
            );
          }
        })
        .catch(console.log);
    } catch (err) {
      console.log(err);
    }
  };

  getVerificationBox = () => {
    const { pin } = this.state;
    const disablePhone = this.props.phone !== '';
    const phone = disablePhone ? this.props.phone : this.state.phone;

    const sendBtnDisabled = phone === '' || pin.length !== 5;
    return (
      <View>
        <View style={styles.spacer} />

        {/* CONTACTS FORM */}
        <TextInput
          editable={!disablePhone}
          style={styles.input}
          placeholder={languages.t('label.phone')}
          keyboardType={'number-pad'}
          value={phone}
          onChangeText={v => this.setState({ phone: v })}
        />
        <View style={styles.spacer} />
        <TextInput
          style={styles.input}
          placeholder={languages.t('label.pin_code')}
          keyboardType={'number-pad'}
          maxLength={5}
          value={pin}
          onChangeText={v => this.setState({ pin: v })}
        />
        <View style={styles.spacer} />
        {/* SEND DATA BUTTON */}
        <TouchableOpacity
          disabled={sendBtnDisabled}
          style={[
            styles.sendBtn,
            sendBtnDisabled && { backgroundColor: 'gray' },
          ]}
          onPress={this.verifyAccount}>
          <Text style={styles.textBtn}>{languages.t('label.send_data')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { isVerified } = this.props;
    return (
      <>
        {isVerified ? (
          <Text style={styles.verificationDisclaymer}>
            {languages.t('label.verification_completed')}
          </Text>
        ) : (
          this.getVerificationBox()
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(Verification);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.VIOLET,
    lineHeight: 19,
    fontSize: 15,
    letterSpacing: 0,
    fontFamily: fontFamily.primaryRegular,
    paddingHorizontal: 10,
  },
  sendBtn: {
    height: 50,
    marginBottom: 20,
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
  verificationDisclaymer: {
    color: '#29944e',
    fontSize: 18,
    fontFamily: fontFamily.primarySemiBold,
    marginTop: 5,
    marginBottom: 12,
  },
  spacer: {
    marginVertical: '2%',
  },
});
