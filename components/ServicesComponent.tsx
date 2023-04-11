import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import React from 'react';
import { colors } from '../config/constant';

const ServicesComponent = () => {
  const services = [
    {
      id: 1,
      // image: '../ assets/images/la-lessive.png',
      image: 'https://cdn-icons-png.flaticon.com/512/2173/2173860.png',
      alt: 'flaticon',
      title: 'Washing'
    },
    {
      id: 2,
      image: 'https://cdn-icons-png.flaticon.com/512/8948/8948888.png',
      alt: 'flaticon',
      title: 'Ironing'
    },
    {
      id: 3,
      image: 'https://cdn-icons-png.flaticon.com/512/8115/8115292.png',
      alt: 'flaticon',
      title: 'Folding'
    },
    {
      id: 4,
      image: 'https://cdn-icons-png.flaticon.com/512/4917/4917849.png',
      alt: 'flaticon',
      title: 'Hand Washing'
    }
  ];
  return (
    <View>
      <Text style={{ color: 'white' }}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <Pressable
            style={{
              backgroundColor: colors.cards,
              padding: 10,
              borderRadius: 10,
              margin: 10,
              flexDirection: 'column',
              alignItems: 'center'
            }}
            key={service.id}
          >
            <Image
              source={{ uri: service.image }}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
            <Text
              style={{
                color: colors.action,
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginTop: 5
              }}
            >
              {service.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServicesComponent;

const styles = StyleSheet.create({});
