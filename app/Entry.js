import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { Component } from 'react';
import { Alert, AppState } from 'react-native';
import { connect } from 'react-redux';

import { applicationActions } from './actions';
import { StateEnum } from './constants/enums';
import {
  ANNOUNCEMENTS,
  COVID_STATUS,
  LOCATION_DATA,
  USER_CUSTOM_TOKEN,
  USER_PHONE,
  USER_UUID,
} from './constants/storage';
import { GetStoreData, SetStoreData } from './helpers/General';
import { convertWebStatusIntoAppStatus } from './utils/general';
import AboutScreen from './views/About';
import Anamnesis from './views/Anamnesis';
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
import Symptoms from './views/Symptoms';

const Stack = createStackNavigator();

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRouteName: '',
    };
  }

  componentDidMount = async () => {
    // OnBoarding process
    GetStoreData('ONBOARDING_DONE')
      .then(onboardingDone => {
        console.log(onboardingDone);
        this.setState({
          initialRouteName: onboardingDone,
        });
      })
      .catch(error => console.log(error));

    // Check disease status and set if it's known
    try {
      const status = await GetStoreData(COVID_STATUS, true);
      if (status !== null) {
        this.props.dispatch(applicationActions.setStatus(status));
      }
    } catch (err) {
      console.log(err);
    }

    // Check user uuid
    try {
      const uuid = await GetStoreData(USER_UUID, true);
      if (uuid) {
        this.props.dispatch(applicationActions.setUuid(uuid));

        // Check status from firestore and subscribe on document changes
        this.subscriberPatients = firestore()
          .collection('patients')
          .doc(uuid)
          .onSnapshot(async doc => {
            let { status } = doc.data();
            status = convertWebStatusIntoAppStatus(status);
            this.props.dispatch(applicationActions.setStatus(status));

            // If status of patients was changed from not green to green then reset locationArray
            const oldStatus = await GetStoreData(COVID_STATUS, true);
            if (
              oldStatus !== StateEnum.NO_CONTACT &&
              status === StateEnum.NO_CONTACT
            ) {
              await SetStoreData(LOCATION_DATA, []);
            }
            await SetStoreData(COVID_STATUS, status);
          });
      }
    } catch (err) {
      console.log(err);
    }

    // Check token
    try {
      const customToken = await GetStoreData(USER_CUSTOM_TOKEN, true);
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
    } catch (err) {
      console.log(err);
    }

    // Check phone number
    try {
      const phone = await GetStoreData(USER_PHONE, true);
      if (phone) {
        this.props.dispatch(applicationActions.setPhone(phone));
      }
    } catch (err) {
      console.log(err);
    }

    // Subscribe to announcements collection
    try {
      // Fetch last announcement from firestore and subscribe on collection changes
      this.subscriberAnnouncements = firestore()
        .collection('announcements')
        .orderBy('timestamp', 'desc')
        .limit(1)
        .onSnapshot(
          async announcements => {
            const announcement = announcements.docs[0];

            // Load announcements which were already shown and get last one
            let announcementsShown = await GetStoreData(ANNOUNCEMENTS, false);
            if (!announcementsShown) announcementsShown = [];
            const lastAnnouncement = announcementsShown.length
              ? announcementsShown.slice(-1)[0]
              : '';

            // Show last news if it wasn't shown before and if announcementsShown is not empty
            if (announcementsShown.length == 0) {
              // Save announcement ID in AsyncStorage and return
              await SetStoreData(ANNOUNCEMENTS, [announcement.id]);
              return;
            }
            if (announcement.id === lastAnnouncement) return;

            // Show alert with announcement if appState is active
            if (AppState.currentState === 'active') {
              const { title, message } = announcement.data().message;
              Alert.alert(title, message, [{ text: 'OK' }]);
              // Save announcement ID in AsyncStorage
              await SetStoreData(ANNOUNCEMENTS, [
                ...announcementsShown,
                announcement.id,
              ]);
            }
          },
          err => console.log(err),
        );
    } catch (err) {
      console.log(err);
    }
  };

  componentWillUnmount() {
    if (this.subscriberPatients != undefined) this.subscriberPatients();
    if (this.subscriberAnnouncements != undefined)
      this.subscriberAnnouncements();
  }

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
          <Stack.Screen
            name='Symptoms'
            component={Symptoms}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Anamnesis'
            component={Anamnesis}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(() => ({}))(Entry);
