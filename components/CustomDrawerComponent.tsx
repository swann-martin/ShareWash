import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { Pressable, Image, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useUser } from '../store/store';
import { useEffect } from 'react';

function CustomDrawerComponent(props) {
  const user = useUser((state) => state.user);
  const location = useUser((state) => state.displayCurrentAdress);

  useEffect(() => {
    console.log('user in custom drawer : ', user);
  }, [user]);
  return (
    <DrawerContentScrollView {...props}>
      <Pressable
        onPress={() => console.log('pressed')}
        style={{ marginLeft: 5 }}
      >
        <Image
          source={{
            uri:
              user?.photoURL ?? 'https://randomuser.me/api/portraits/lego/6.jpg'
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          {user?.displayName
            ? user.displayName
            : user?.email
            ? user.email.split('@')[0]
            : 'username'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <MaterialIcons name="email" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>
            {user?.email ? user.email : 'email@example.com'}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
          marginLeft: 5
        }}
      >
        <MaterialIcons name="location-on" size={30} color="white" />
        <View>
          <Text style={{ color: 'white', fontWeight: '600' }}>
            {location ?? 'no location'}
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Notifications"
        inactiveTintColor="white"
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  }
});

export default CustomDrawerComponent;
