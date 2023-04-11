import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React from 'react';

const WashersNearByComponent = () => {
  const washersNearby = [
    {
      id: 1,
      image: 'https://randomuser.me/api/portraits/men/40.jpg',
      alt: 'random user',
      title: 'John',
      adress: '0.5'
    },
    {
      id: 2,
      image: 'https://randomuser.me/api/portraits/women/74.jpg',
      alt: 'random user',
      title: 'Fiona',
      adress: '1.4'
    },
    {
      id: 3,
      image: 'https://randomuser.me/api/portraits/men/91.jpg',
      alt: 'random user',
      title: 'Ivan',
      adress: '1.7'
    },
    {
      id: 4,
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      alt: 'random user',
      title: 'Hanna',
      adress: '3.1'
    }
  ];
  return (
    <View>
      <Text style={{ color: 'white' }}>Peers Available in your area</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {washersNearby.map((person) => (
          <Pressable
            style={{
              backgroundColor: '#BAE7E0',
              padding: 10,
              borderRadius: 10,
              margin: 10,
              flexDirection: 'column',
              alignItems: 'center'
            }}
            key={person.id}
          >
            <Image
              source={{ uri: person.image }}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                resizeMode: 'contain'
              }}
            />
            <Text
              style={{
                color: '#246E89',
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginTop: 5
              }}
            >
              {person.title}
            </Text>
            <Text
              style={{
                color: '#246E89',
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginTop: 5
              }}
            >
              {person?.adress} km
            </Text>
          </Pressable>
        ))}
        <Pressable
          style={{
            backgroundColor: '#BAE7E0',
            padding: 10,
            borderRadius: 10,
            margin: 10,
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/lego/4.jpg' }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              resizeMode: 'contain'
            }}
          />
          <Text
            style={{
              color: '#246E89',
              fontWeight: 'bold',
              fontStyle: 'italic',
              marginTop: 5
            }}
          >
            find more
          </Text>
          <Text
            style={{
              color: '#246E89',
              fontWeight: 'bold',
              fontStyle: 'italic',
              marginTop: 5
            }}
          >
            +
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default WashersNearByComponent;

const styles = StyleSheet.create({});
