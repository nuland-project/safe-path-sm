import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { applicationActions } from './actions';
import {
  COVID_STATUS,
  USER_CUSTOM_TOKEN,
  USER_PHONE,
  USER_UUID,
} from './constants/storage';
import { GetStoreData } from './helpers/General';
import { convertWebStatusIntoAppStatus } from './utils/general';
import AboutScreen from './views/About';
import ChooseProviderScreen from './views/ChooseProvider';
import { ExportScreen } from './views/Export';
import ExposureHistoryScreen from './views/ExposureHistory/ExposureHistory';
import ImportScreen from './views/Import';
import LeaveContacts from './views/LeaveContacts';
import LicencesScreen from './views/Licenses';
import LocationTracking from './views/LocationTracking';
import NewsScreen from './views/News';
import Onboarding1 from './views/onboarding/Onboarding1';
import Onboarding2 from './views/onboarding/Onboarding2';
import Onboarding3 from './views/onboarding/Onboarding3';
import Onboarding4 from './views/onboarding/Onboarding4';
import Onboarding5 from './views/onboarding/Onboarding5';
import { SettingsScreen } from './views/Settings';

const Stack = createStackNavigator();

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName: '',
    };
  }

  componentDidMount = async () => {
    GetStoreData('ONBOARDING_DONE')
      .then(onboardingDone => {
        console.log(onboardingDone);
        this.setState({
          initialRouteName: onboardingDone,
        });
      })
      .catch(error => console.log(error));

    // Check desease status and set if it's known
    try {
      GetStoreData(COVID_STATUS, true).then(status => {
        if (status !== null)
          this.props.dispatch(applicationActions.setStatus(status));
      });
    } catch (err) {
      console.log(err);
    }
    // Check token and uuid
    try {
      GetStoreData(USER_CUSTOM_TOKEN, true).then(customToken => {
        if (customToken) {
          this.props.dispatch(applicationActions.setToken(customToken));

          // Try to Authenticate the user with Firebase
          firebase
            .auth()
            .signInWithCustomToken(customToken)
            .then(res => {
              console.log('Sign in successfull: ', res);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    } catch (err) {
      console.log(err);
    }

    try {
      GetStoreData(USER_UUID, true).then(uuid => {
        if (uuid) {
          this.props.dispatch(applicationActions.setUuid(uuid));

          // Check status from firestore and subscribe on document changes
          firestore()
            .collection('patients')
            .doc(uuid)
            .onSnapshot(doc => {
              let { status } = doc.data();
              status = convertWebStatusIntoAppStatus(status);
              this.props.dispatch(applicationActions.setStatus(status));
            });
        }
      });
    } catch (err) {
      console.log(err);
    }

    // Check phone number
    try {
      GetStoreData(USER_PHONE, true).then(phone => {
        if (phone) this.props.dispatch(applicationActions.setPhone(phone));
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='InitialScreen'
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            cardStyle: {
              backgroundColor: 'transparent', // prevent white flash on Android
            },
          }}>
          {this.state.initialRouteName === 'true' ? (
            <Stack.Screen
              name='InitialScreen'
              component={LocationTracking}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name='InitialScreen'
              component={Onboarding1}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name='Onboarding1'
            component={Onboarding1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding2'
            component={Onboarding2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding3'
            component={Onboarding3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding4'
            component={Onboarding4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Onboarding5'
            component={Onboarding5}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LocationTrackingScreen'
            component={LocationTracking}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='NewsScreen'
            component={NewsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ExportScreen'
            component={ExportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ImportScreen'
            component={ImportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SettingsScreen'
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChooseProviderScreen'
            component={ChooseProviderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LicensesScreen'
            component={LicencesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ExposureHistoryScreen'
            component={ExposureHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='LeaveContacts'
            component={LeaveContacts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AboutScreen'
            component={AboutScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(() => ({}))(Entry);
