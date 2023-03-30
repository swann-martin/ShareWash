import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useLaundry } from '../store/store';

const HeaderComponent = ({ title = '' }: { title?: string }) => {
  const totalClothes = useLaundry((state) => state.totalClothes);
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 10,
          width: '100%'
        }
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <MaterialIcons name="shopping-basket" size={24} color="white" />
          <Text style={{ color: 'white', marginLeft: 2.5, fontSize: 14 }}>
            {totalClothes}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;

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
