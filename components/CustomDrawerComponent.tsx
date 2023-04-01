import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { Pressable, Image, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../store/store';

function CustomDrawerComponent(props) {
  const user = useUser((state) => state.user);
  return (
    <DrawerContentScrollView {...props}>
      <Pressable
        onPress={() => console.log('pressed')}
        style={{ marginLeft: 5 }}
      >
        <Image
          source={{
            uri:
              user?.image ?? 'https://randomuser.me/api/portraits/women/67.jpg'
          }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>
          {user?.name ? user.name : 'Joanna Falsename'}
        </Text>
        <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>
          {user?.email ? user.email : 'email@example.com'}
        </Text>
      </Pressable>
      <View style={{ flexDirection: 'row', marginVertical: 10, marginLeft: 5 }}>
        <MaterialIcons name="location-on" size={30} color="white" />
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
            Location :
          </Text>
          <Text style={styles.text}>{user?.location ?? 'no location'}</Text>
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
