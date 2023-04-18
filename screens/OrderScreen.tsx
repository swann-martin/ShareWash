import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  Button
} from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { clothesState, useLaundry } from '../store/store';
import { colors } from '../config/constant';

const OrderScreen = () => {
  const navigation = useNavigation();
  const washerSelected = useLaundry((state) => state.washerSelected);
  const cart = useLaundry((state) => state.cart);
  const servicesSelected = useLaundry((state) => state.servicesSelected);
  const [total, setTotal] = React.useState(0);
  const addToCart = useLaundry((state) => state.addToCart);
  const removeFromCart = useLaundry((state) => state.removeFromCart);

  React.useEffect(() => {
    !!cart.length &&
      setTotal(
        cart
          ?.reduce(
            (acc, clothe: clothesState) => acc + clothe.price * clothe.count,
            0
          )
          .toFixed(2)
      );
  }, [cart]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(afterTomorrow.getDate() + 1);

  const [date, setDate] = useState(today);
  const [time, setTime] = useState('18h00');

  const ButtonDate = ({ dateDisplayed }) => {
    return (
      <Pressable
        onPress={() => {
          setDate(dateDisplayed);
          console.log(dateDisplayed);
          console.log(date);
        }}
        style={[
          styles.buttonTime,
          date?.toLocaleDateString('fr-FR') ===
          dateDisplayed.toLocaleDateString('fr-FR')
            ? { backgroundColor: colors.action }
            : {}
        ]}
      >
        <Text style={styles.text}>
          {dateDisplayed.toLocaleDateString('fr-FR')}
        </Text>
      </Pressable>
    );
  };

  const ButtonTime = ({ timeDisplayed }) => {
    return (
      <Pressable
        onPress={() => {
          setTime(timeDisplayed);
        }}
        style={[
          styles.buttonTime,
          time === timeDisplayed ? { backgroundColor: colors.action } : {}
        ]}
      >
        <Text style={styles.text}>{timeDisplayed}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* washer  */}
        <View>
          <Text style={styles.title}>Washer Selected:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: washerSelected?.image }}
              style={styles.image}
            />
            <View style={{ paddingStart: 10 }}>
              <Text style={styles.text}>{washerSelected?.title}</Text>
              <Text style={styles.text}>{washerSelected?.adress} km</Text>
            </View>
          </View>
        </View>
        {/* services  */}
        <View>
          <Text style={styles.title}>Services selected :</Text>
          {servicesSelected?.map((service: string) => (
            <Text style={styles.text} key={service}>
              {service}
            </Text>
          ))}
        </View>
      </View>

      {/* clothes recap */}
      <Text style={styles.title}>Clothes to wash :</Text>
      {cart?.map((clothe: clothesState) => (
        <View
          key={clothe.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 60,
                alignItems: 'center'
              }}
            >
              <Image source={{ uri: clothe.image }} style={styles.thumbnail} />
              <Text style={styles.text}>{clothe.title}</Text>
            </View>
            {/* price tag  */}

            <View
              style={{
                backgroundColor: colors.red,
                padding: 5,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10
              }}
            >
              <Text style={{ fontSize: 12, color: colors.accent }}>
                {clothe.price}€
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: 'row', width: 100, alignItems: 'center' }}
          >
            <Pressable
              onPress={() => removeFromCart(clothe)}
              style={styles.buttonRound}
            >
              <MaterialIcons name="remove" size={16} color="#246E89" />
            </Pressable>
            <Text
              style={{
                color: colors.action,
                fontSize: 24,
                fontWeight: 'bold',
                marginHorizontal: 10
              }}
            >
              {clothe.count}
            </Text>
            <Pressable
              onPress={() => addToCart(clothe)}
              style={styles.buttonRound}
            >
              <MaterialIcons name="add" size={16} color="#246E89" />
            </Pressable>
          </View>
          <View
            style={{
              width: 60,
              alignItems: 'center'
            }}
          >
            <Text style={[styles.text, { justifyContent: 'flex-end' }]}>
              {clothe.price * clothe.count}€
            </Text>
          </View>
        </View>
      ))}

      <Text style={styles.title}>Total : {total} €</Text>

      <View>
        <Text style={styles.title}>Select Drop Date</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <ButtonDate dateDisplayed={today} />
          <ButtonDate dateDisplayed={tomorrow} />
          <ButtonDate dateDisplayed={afterTomorrow} />
        </View>
      </View>
      <Text style={styles.title}>Select Drop Time</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <ButtonTime timeDisplayed={'18h00'} />
        <ButtonTime timeDisplayed={'18h30'} />
        <ButtonTime timeDisplayed={'19h00'} />
        <ButtonTime timeDisplayed={'19h30'} />
      </View>

      <Pressable
        onPress={() => {
          const order = {
            washer: washerSelected,
            services: servicesSelected,
            clothes: cart,
            date: date,
            time: time,
            total: total
          };
          console.log(order);
        }}
        style={(pressed) => [
          {
            marginTop: 40,
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
            : {
                backgroundColor: colors.red
              }
        ]}
      >
        <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>
          Confirm Order
        </Text>
      </Pressable>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    color: colors.white,
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.white
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'contain'
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  text: {
    color: colors.white
  },
  buttonRound: {
    width: 26,
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.action,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
    backgroundColor: colors.cards
  },
  buttonTime: {
    borderRadius: 10,
    borderColor: colors.white,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10
  }
});
