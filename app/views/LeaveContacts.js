import firestore from '@react-native-firebase/firestore';
/* eslint-disable react-native/no-raw-text */
import React, { Component } from 'react';
import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import fontFamily from './../constants/fonts';
import languages from './../locales/languages';
import NavigationBarWrapper from '../components/NavigationBarWrapper';
import Colors from '../constants/colors';

class LeaveContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      name: '',
    };
  }

  backToMain = () => {
    this.props.navigation.goBack();
  };

  handleBackPress = () => {
    this.backToMain();
    return true;
  };

  handleInput = (name, value) => this.setState({ [name]: value });

  componentDidMount() {
    const userDocument = firestore()
      .collection('test')
      .get();
    console.log(userDocument);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  sendData = () => {
    console.log(this.state);
  };

  render() {
    const { phone, name } = this.state;
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
            onChange={v => this.handleInput('phone', v)}
          />
          <View style={styles.spacer} />
          <TextInput
            style={styles.input}
            placeholder={languages.t('label.name')}
            value={name}
            onChange={v => this.handleInput('name', v)}
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

export default LeaveContacts;
