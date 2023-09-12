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
import { useNavigation } from '@react-navigation/native';
import { useLaundry, useUser, washerSelectedState } from '../store/store';

const WashersNearByComponent = () => {
  const navigation = useNavigation();

  const washerSelected = useLaundry((state) => state.washerSelected);
  const setWasherSelected = useLaundry((state) => state.setWasherSelected);
  const search = useUser((state) => state.search);

  const washersNearby = [
    {
      id: '1',
      image: 'https://randomuser.me/api/portraits/men/40.jpg',
      alt: 'random user',
      title: 'John',
      adress: '0.5'
    },
    {
      id: '2',
      image: 'https://randomuser.me/api/portraits/women/74.jpg',
      alt: 'random user',
      title: 'Fiona',
      adress: '1.4'
    },
    {
      id: '3',
      image: 'https://randomuser.me/api/portraits/men/91.jpg',
      alt: 'random user',
      title: 'Ivan',
      adress: '1.7'
    },
    {
      id: '4',
      image: 'https://randomuser.me/api/portraits/women/29.jpg',
      alt: 'random user',
      title: 'Hanna',
      adress: '3.1'
    }
  ];

  const filteredWashers = washersNearby.filter((washer) =>
    search.length > 3 ? washer.title.includes(search) : washer
  );

  const selectWasher = (person: washerSelectedState) => {
    !!washerSelected && washerSelected?.id === person.id
      ? setWasherSelected(null)
      : setWasherSelected(person);
  };

  const WasherCard = ({ person, action }) => (
    <Pressable
      style={[
        styles.cardContainer,
        person.id === washerSelected?.id
          ? { backgroundColor: colors.action }
          : {}
      ]}
      key={person.id}
      onPress={action}
    >
      <Image source={{ uri: person.image }} style={styles.image} />
      <Text
        style={[
          styles.text,
          person.id === washerSelected?.id ? { color: colors.accent } : {}
        ]}
      >
        {person.title}
      </Text>
      <Text
        style={[
          styles.text,
          person.id === washerSelected?.id ? { color: colors.accent } : {}
        ]}
      >
        {person?.adress} {person.adress === '+' ? '' : 'km'}
      </Text>
    </Pressable>
  );

  return (
    <View>
      <Text style={{ color: 'white' }}>Peers Available in your area</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredWashers.map((person) => (
          <WasherCard
            key={person.id}
            person={person}
            action={() => selectWasher(person)}
          />
        ))}

        <WasherCard
          person={{
            id: '5',
            image: 'https://randomuser.me/api/portraits/lego/4.jpg',
            alt: 'random users',
            title: 'more washers',
            adress: '+'
          }}
          action={() => navigation.navigate('About' as never)}
        />
      </ScrollView>
    </View>
  );
};

export default WashersNearByComponent;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.cards
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  text: {
    color: colors.action,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginTop: 5
  }
});
