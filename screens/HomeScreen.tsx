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
import WashersNearByComponent from '../components/WashersNearByComponent';
import { colors } from '../config/constant';
import { useNavigation } from '@react-navigation/native';

const logo = require('../assets/logos/logoWashWhite.png');

const HomeScreen = () => {
  const setSearch = useUser((state) => state.setSearch);
  const search = useUser((state) => state.search);
  const navigation = useNavigation();
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
            placeholderTextColor="#C4C4C4"
            style={{
              color: 'white'
            }}
            onChangeText={(text) => setSearch(text)}
            value={search}
          />
          <Feather name="search" size={24} color="#C4C4C4" />
        </View>

        {/* Quick Order */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 18,
              fontWeight: 'bold',

              marginBottom: 10
            }}
          >
            Quick Order
          </Text>
          {/* Washers Nearby  */}

          <WashersNearByComponent />

          {/* Services  */}

          <ServicesComponent />

          {/* DressItem  */}
          <DressItemComponent />
          <Pressable
            onPress={() => navigation.navigate('Order' as never)}
            style={(pressed) => [
              {
                marginTop: 10,
                backgroundColor: colors.action,
                marginBottom: 80,
                height: 50,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              },
              pressed
                ? {
                    backgroundColor: colors.action
                  }
                : {}
            ]}
          >
            <Text
              style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}
            >
              Quick Order
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg
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
