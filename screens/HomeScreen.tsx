import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Feather } from '@expo/vector-icons';
import ServicesComponent from '../components/ServicesComponent';
import DressItemComponent from '../components/DressItemComponent';
import { useUser } from '../store/store';

const logo = require('../assets/logos/logoWashWhite.png');

const HomeScreen = () => {
  const setUser = useUser((state) => state.setUser);
  const user = useUser((state) => state.user);
  // useEffect(() => {
  //   setUser({
  //     ...user,
  //     name: 'Joan Doe',
  //     email: 'useremail@example.com',
  //     image: 'https://randomuser.me/api/portraits/women/60.jpg'
  //   });
  // }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 10 }}>
        <StatusBar style="auto" />

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
    </SafeAreaView>
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
