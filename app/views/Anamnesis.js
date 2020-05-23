import firebase from '@react-native-firebase/app';
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
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

class Anemnesis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: {
        checked: false,
        label: languages.t('health.heart_disease'),
      },
      copd: {
        checked: false,
        label: languages.t('health.copd_disease'),
      },
      asthma: {
        checked: false,
        label: languages.t('health.asthma_disease'),
      },
      diabetes: {
        checked: false,
        label: languages.t('health.diabetes_disease'),
      },
      hiv: {
        checked: false,
        label: languages.t('health.hiv_disease'),
      },
      transplant: {
        checked: false,
        label: languages.t('health.transplant_disease'),
      },
      overwheight: {
        checked: false,
        label: languages.t('health.overwheight_disease'),
      },
      immunocompromisedest: {
        checked: false,
        label: languages.t('health.immunocompromised_disease'),
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

  handleChange = disease => {
    this.setState({
      ...this.state,
      [disease]: {
        checked: !this.state[disease].checked,
        label: this.state[disease].label,
      },
    });
  };

  sendAnamnesis = async () => {
    const uuid = await GetStoreData(USER_UUID);
    const cldFn = await firebase
      .app()
      .functions('europe-west1')
      .httpsCallable('addPatientAnamnesis');

    let anamnesis = {};
    for (let key in this.state) {
      anamnesis[key] = this.state[key].checked;
    }
    cldFn({ uuid, anamnesis });

    Alert.alert('Anamnesis added');
  };

  render() {
    let anamnesis = [];
    for (let key in this.state) {
      anamnesis.push(key);
    }
    return (
      <NavigationBarWrapper
        title={languages.t('health.medical_history_title')}
        onBackPress={() => this.props.navigation.goBack()}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          {anamnesis.map((disease, ind) => (
            <Item
              key={ind}
              label={this.state[disease].label}
              icon={this.state[disease].checked ? checkmarkIcon : xmarkIcon}
              onPress={() => this.handleChange(disease)}
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
            onPress={this.sendAnamnesis}>
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

export default Anemnesis;
