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
import { USER_IS_VERIFIED, USER_PHONE } from '../constants/storage';
import { SetStoreData } from '../helpers/General';

const mapStateToProps = state => ({
  phone: state.application.phone,
  isVerified: state.application.isVerified,
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
      const { phone, pin } = this.state;
      const cldFn = functions().httpsCallable('validatePin');
      this.setState({ phone: '', pin: '' });
      cldFn({ phone, pin })
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'accept') {
            // TO DO add localization
            Alert.alert('Verification passed', 'Success', [{ text: 'OK' }]);
            this.props.dispatch(applicationActions.setPhone(phone));
            this.props.dispatch(applicationActions.setVerification(true));
            SetStoreData(USER_PHONE, phone);
            SetStoreData(USER_IS_VERIFIED, true);
          } else {
            // TO DO add localization
            Alert.alert('Oops', 'Verification failed', [{ text: 'OK' }]);
          }
        })
        .catch(console.log);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { phone, pin } = this.state;
    const sendBtnDisabled = phone === '' || pin.length !== 5;
    return (
      <View>
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
  spacer: {
    marginVertical: '2%',
  },
});
