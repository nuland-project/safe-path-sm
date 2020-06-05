import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  Alert,
  BackHandler,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import NavigationBarWrapper from '../components/NavigationBarWrapper';
import Colors from '../constants/colors';
import { USER_UUID } from '../constants/storage';
import { GetStoreData } from '../helpers/General';
import languages from '../locales/languages';

class Surveys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  sendSurvey = async () => {
    if (this.state.text === '') {
      Alert.alert('Per favore, inserisci il testo');
      return;
    }
    const uuid = await GetStoreData(USER_UUID);
    const cldFn = await firebase
      .app()
      .functions('europe-west1')
      .httpsCallable('addPatientSurvey');
    cldFn({
      uuid,
      survey: {
        date: this.props.route.params.date.format('ll'),
        text: this.state.text,
      },
    });
    Alert.alert(
      'Risposta inviata',
      'Grazie',
      [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
      { cancelable: false },
    );
  };

  handleText = e => this.setState({ text: e });

  render() {
    return (
      <NavigationBarWrapper
        title={languages.t('health.surveys_title')}
        onBackPress={() => this.props.navigation.goBack()}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20 }}>
            {languages.t('health.surveys_subtitle')}
          </Text>
          <TextInput
            multiline
            style={{
              height: 200,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.VIOLET,
              textAlignVertical: 'top',
              lineHeight: 19,
              fontSize: 15,
              color: '#000',
              letterSpacing: 0,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            value={this.state.text}
            onChangeText={this.handleText}
          />
          <TouchableOpacity
            style={{
              height: 50,
              marginBottom: 20,
              marginTop: 20,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: Colors.VIOLET,
            }}
            onPress={this.sendSurvey}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
              }}>
              {languages.t('health.send')}
            </Text>
          </TouchableOpacity>
        </View>
      </NavigationBarWrapper>
    );
  }
}

export default Surveys;
