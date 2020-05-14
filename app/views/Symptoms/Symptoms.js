import firestore from '@react-native-firebase/firestore';
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import checkmarkIcon from '../../assets/svgs/checkmarkIcon';
import xmarkIcon from '../../assets/svgs/xmarkIcon';
import NavigationBarWrapper from '../../components/NavigationBarWrapper';
import Colors from '../../constants/colors';
import { USER_UUID } from '../../constants/storage';
import { GetStoreData } from '../../helpers/General';
import { SettingsItem as Item } from '../Settings/SettingsItem';

class Symptoms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breath: false,
      cough: false,
      smell: false,
      nose: false,
      headache: false,
      muscle: false,
      throat: false,
      chest: false,
      nausea: false,
      confused: false,
      exhaustion: false,
      diarrhoea: false,
      sneezing: false,
      rash: false,
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
    this.setState({ ...this.state, [symptom]: !this.state[symptom] });
  };

  sendSymptoms = () => {
    GetStoreData(USER_UUID)
      .then(id => {
        firestore()
          .collection('patients')
          .doc(id)
          .collection('symptomps')
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) {
              console.log('empty symptomps');
              firestore()
                .collection('patients')
                .doc(id)
                .collection('symptomps')
                .add(this.state);

              return;
            }
            querySnapshot.forEach(queryDocumentSnapshot => {
              this.setState({ symptomps: queryDocumentSnapshot.data() });
              firestore()
                .collection('patients')
                .doc(id)
                .collection('symptomps')
                .doc(queryDocumentSnapshot.id)
                .update(this.state);
            });
          });
        Alert.alert('Symptomps added');
      })
      .catch(() => Alert.alert('You are not verified'));
  };

  render() {
    return (
      <NavigationBarWrapper
        title={'Sintomi'}
        onBackPress={() => this.props.navigation.goBack()}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Item
            label={'Fiato Corto (quando cammini, ti eserciti, in generale)'}
            icon={this.state.breath ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('breath')}
          />
          <Item
            label={'Tosse'}
            icon={this.state.cough ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('cough')}
          />
          <Item
            label={'Mancanza di olfatto'}
            icon={this.state.smell ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('smell')}
          />
          <Item
            label={'Naso che cola'}
            icon={this.state.nose ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('nose')}
          />
          <Item
            label={'Mal di testa'}
            icon={this.state.headache ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('headache')}
          />
          <Item
            label={'Dolori muscolari'}
            icon={this.state.muscle ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('muscle')}
          />
          <Item
            label={'Mal di gola'}
            icon={this.state.throat ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('throat')}
          />
          <Item
            label={'Dolore al petto'}
            icon={this.state.chest ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('chest')}
          />
          <Item
            label={'Nausea/Vomito'}
            icon={this.state.nausea ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('nausea')}
          />
          <Item
            label={'Ti senti- ti hanno detto che sembri confuso'}
            icon={this.state.confused ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('confused')}
          />
          <Item
            label={'Senza energia'}
            icon={this.state.exhaustion ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('exhaustion')}
          />
          <Item
            label={'Diarrea'}
            icon={this.state.diarrhoea ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('diarrhoea')}
          />
          <Item
            label={'Sfoghi cutanei'}
            icon={this.state.rash ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('rash')}
          />
          <Item
            label={'Starnutisci'}
            icon={this.state.sneezing ? checkmarkIcon : xmarkIcon}
            onPress={() => this.handleChange('sneezing')}
          />
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
            onPress={this.sendSymptoms}>
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

export default Symptoms;
