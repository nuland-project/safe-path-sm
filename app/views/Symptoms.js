import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import checkmarkIcon from '../assets/svgs/checkmarkIcon';
import xmarkIcon from '../assets/svgs/xmarkIcon';
import NavigationBarWrapper from '../components/NavigationBarWrapper';
import Colors from '../constants/colors';
import { USER_UUID } from '../constants/storage';
import { GetStoreData } from '../helpers/General';
import languages from '../locales/languages';
import { SettingsItem as Item } from './Settings/SettingsItem';

class Symptoms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      pressureH: 0,
      pressureL: 0,
      oxygen: 0,
      breath: {
        checked: false,
        label: languages.t('health.short_of_breath'),
      },
      cough: {
        checked: false,
        label: languages.t('health.cough'),
      },
      smell: {
        checked: false,
        label: languages.t('health.ability_to_smell'),
      },
      nose: {
        checked: false,
        label: languages.t('health.runny_nose'),
      },
      headache: {
        checked: false,
        label: languages.t('health.headache'),
      },
      muscle: {
        checked: false,
        label: languages.t('health.muscle_aches_and_pains'),
      },
      throat: {
        checked: false,
        label: languages.t('health.sore_throat'),
      },
      chest: {
        checked: false,
        label: languages.t('health.chest_pain'),
      },
      nausea: {
        checked: false,
        label: languages.t('health.nausea'),
      },
      confused: {
        checked: false,
        label: languages.t('health.confused'),
      },
      exhaustion: {
        checked: false,
        label: languages.t('health.exhaustion'),
      },
      diarrhoea: {
        checked: false,
        label: languages.t('health.diarrhea'),
      },
      rash: {
        checked: false,
        label: languages.t('health.skin_rash'),
      },
      sneezing: {
        checked: false,
        label: languages.t('health.sneezing'),
      },
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

  handleChange = symptom => {
    this.setState({
      ...this.state,
      [symptom]: {
        checked: !this.state[symptom].checked,
        label: this.state[symptom].label,
      },
    });
  };

  sendSymptoms = async () => {
    const uuid = await GetStoreData(USER_UUID);
    const cldFn = await firebase
      .app()
      .functions('europe-west1')
      .httpsCallable('addPatientSymptoms');

    let symptoms = {};
    for (let key in this.state) {
      if (
        key !== 'temperature' &&
        key !== 'pressureH' &&
        key !== 'pressureL' &&
        key !== 'oxygen'
      ) {
        symptoms[key] = this.state[key].checked;
      }
    }
    symptoms.temperature = this.state.temperature;
    symptoms.pressureH = this.state.pressureH;
    symptoms.pressureL = this.state.pressureL;
    symptoms.oxygen = this.state.oxygen;
    cldFn({ uuid, symptoms });

    Alert.alert(
      'Risposta inviata',
      'Grazie',
      [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
      { cancelable: false },
    );
  };

  render() {
    let symptoms = [];
    for (let key in this.state) {
      if (
        key !== 'temperature' &&
        key !== 'pressureH' &&
        key !== 'pressureL' &&
        key !== 'oxygen'
      ) {
        symptoms.push(key);
      }
    }
    return (
      <NavigationBarWrapper
        title={languages.t('health.symptoms_title')}
        onBackPress={() => this.props.navigation.goBack()}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <TextInput
            style={{
              height: 40,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.VIOLET,
              lineHeight: 19,
              fontSize: 15,
              color: '#000',
              letterSpacing: 0,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            placeholder={languages.t('health.temperature')}
            placeholderTextColor='#555555'
            keyboardType={'number-pad'}
            value={this.state.temperature}
            onChangeText={v => this.setState({ temperature: v })}
          />

          <TextInput
            style={{
              height: 40,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.VIOLET,
              lineHeight: 19,
              fontSize: 15,
              color: '#000',
              letterSpacing: 0,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            placeholder={languages.t('health.oxygen_level')}
            placeholderTextColor='#555555'
            keyboardType={'number-pad'}
            value={this.state.oxygen}
            onChangeText={v => this.setState({ oxygen: v })}
          />

          <TextInput
            style={{
              height: 40,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.VIOLET,
              lineHeight: 19,
              fontSize: 15,
              color: '#000',
              letterSpacing: 0,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            placeholder={languages.t('health.blood_pressureH')}
            placeholderTextColor='#555555'
            keyboardType={'number-pad'}
            value={this.state.pressureH}
            onChangeText={v => this.setState({ pressureH: v })}
          />

          <TextInput
            style={{
              height: 40,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.VIOLET,
              lineHeight: 19,
              fontSize: 15,
              color: '#000',
              letterSpacing: 0,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            placeholder={languages.t('health.blood_pressureL')}
            placeholderTextColor='#555555'
            keyboardType={'number-pad'}
            value={this.state.pressureL}
            onChangeText={v => this.setState({ pressureL: v })}
          />

          {symptoms.map((symptom, ind) => (
            <Item
              key={ind}
              label={this.state[symptom].label}
              icon={this.state[symptom].checked ? checkmarkIcon : xmarkIcon}
              onPress={() => this.handleChange(symptom)}
            />
          ))}

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
            onPress={this.sendSymptoms}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
              }}>
              {languages.t('health.send')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </NavigationBarWrapper>
    );
  }
}

export default Symptoms;
