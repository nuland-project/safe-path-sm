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
import { SettingsItem as Item } from './Settings/SettingsItem';

class Anemnesis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: {
        checked: false,
        label: 'Cardiopatia',
      },
      copd: {
        checked: false,
        label: 'Broncopneumopatia cronica ostruttiva',
      },
      asthma: {
        checked: false,
        label: 'Asma',
      },
      diabetes: {
        checked: false,
        label: 'Diabete',
      },
      hiv: {
        checked: false,
        label: 'HIV/AIDS',
      },
      transplant: {
        checked: false,
        label: `Trapianto d'organo`,
      },
      overwheight: {
        checked: false,
        label: 'Sovrappeso',
      },
      immunocompromisedest: {
        checked: false,
        label: 'Immunocompromesso',
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
        title={'Anamnesi'}
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
              {'Invia'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </NavigationBarWrapper>
    );
  }
}

export default Anemnesis;
