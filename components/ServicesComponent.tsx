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
import { useLaundry } from '../store/store';

const ServicesComponent = () => {
  const servicesSelected = useLaundry((state) => state.servicesSelected);
  const setServicesSelected = useLaundry((state) => state.setServicesSelected);
  const findService = (service: string) => {
    return servicesSelected.includes(service);
  };

  const services = [
    {
      id: '1',
      image: 'https://cdn-icons-png.flaticon.com/512/2173/2173860.png',
      alt: 'flaticon',
      title: 'Washing'
    },
    {
      id: '2',
      image: 'https://cdn-icons-png.flaticon.com/512/4178/4178046.png',
      alt: 'flaticon',
      title: 'Drying'
    },
    {
      id: '3',
      image: 'https://cdn-icons-png.flaticon.com/512/8948/8948888.png',
      alt: 'flaticon',
      title: 'Ironing'
    },
    {
      id: '4',
      image: 'https://cdn-icons-png.flaticon.com/512/8115/8115292.png',
      alt: 'flaticon',
      title: 'Folding'
    }
  ];
  return (
    <View>
      <Text style={{ color: 'white' }}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service) => (
          <Pressable
            style={[
              styles.serviceCard,
              findService(service.title) && { backgroundColor: colors.action }
            ]}
            key={service.id}
            onPress={() => setServicesSelected(service.title)}
          >
            <Image
              source={{ uri: service.image }}
              style={{ width: 70, height: 70, resizeMode: 'contain' }}
            />
            <Text
              style={[
                styles.text,
                findService(service.title) && { color: colors.accent }
              ]}
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

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: colors.cards,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: colors.action,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 5
  }
});
