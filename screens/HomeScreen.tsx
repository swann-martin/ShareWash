import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ServicesComponent from '../components/ServicesComponent';
import DressItem from '../components/DressItemComponent';
import DressItemComponent from '../components/DressItemComponent';

const logo = require('../assets/logos/logoWashWhite.png');
const user = { image: 'https://randomuser.me/api/portraits/women/60.jpg' };
const HomeScreen = () => {
  const [displayCurrentAdress, setDisplayCurrentAdress] = useState<string>(
    'No location loaded yet'
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

  return (
    <ScrollView style={{ padding: 10 }}>
      <StatusBar style="auto" />
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <MaterialIcons name="location-on" size={30} color="white" />
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
            Home
          </Text>
          <Text style={styles.text}>{displayCurrentAdress}</Text>
        </View>

        <Pressable
          onPress={() => console.log('pressed')}
          style={{ marginLeft: 'auto' }}
        >
          <Image
            source={{ uri: user.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </Pressable>
      </View>

      {/* logo  */}
      <Pressable
        onPress={() => console.log('pressed')}
        style={styles.imageContainer}
      >
        <Image source={logo} style={styles.image} />
        <Text style={styles.imageText}>sharewash</Text>
      </Pressable>

      {/* SearchBar */}

      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.8,
          borderColor: '#C4C4C4',
          borderRadius: 8
        }}
      >
        <TextInput
          placeholder="Search for washers in your area"
          placeholderTextColor="#fff"
        />
        <Feather name="search" size={24} color="#C4C4C4" />
      </View>

      {/* Services  */}

      <ServicesComponent />

      {/* DressItem  */}
      <DressItemComponent />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#55AFC0'
  },
  text: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  },
  imageContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  imageText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  }
});
