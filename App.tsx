import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';

import { useEffect, useState } from 'react';

import { useUser } from './store/store';
import DrawerComponent from './components/DrawerComponent';
export default function App() {
  const setDisplayCurrentAdress = useUser(
    (state) => state.setDisplayCurrentAdress
  );

  const [locationServicesEnabled, setLocationServicesEnabled] = useState<
    string | boolean
  >('Location services are not enabled');

  useEffect(() => {
    checkIfLocationIsEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationIsEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      const createTwoButtonAlert = () =>
        Alert.alert(
          'Location services are not enabled',
          'Please enable the location services',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ]
        );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    if (status.granted === false) {
      Alert.alert(
        'Permission not granted',
        'Please allow the app to use the location services',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      for (let item of response) {
        let address = `${item.name} ${item.postalCode} ${item.city}`;
        setDisplayCurrentAdress(address);
      }
    }
  };

  const onPressFunction = () => {
    console.log('Pressed');
  };

  return (
    <NavigationContainer>
      <DrawerComponent />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55AFC0'
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  },
  imageContainer: {
    borderRadius: 150,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});
