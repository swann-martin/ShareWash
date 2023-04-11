import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import HeaderComponent from '../components/HeaderComponent';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CustomDrawerComponent from './CustomDrawerComponent';
import { RouteProp } from '@react-navigation/native';
import { Image } from 'react-native';
import { colors } from '../config/constant';

const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      initialRouteName="Login"
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.bg
        },
        drawerLabelStyle: {
          color: 'white'
        }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => {
            return <HeaderComponent />;
          },

          headerStyle: {
            backgroundColor: colors.bg,
            height: 80
          },
          headerTintColor: colors.white,
          drawerIcon: ({ color, size }) => (
            <Image
              source={require('../assets/logos/logoWashWhite.png')}
              style={{
                width: size,
                height: size,
                resizeMode: 'contain'
              }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.bg,
            height: 80
          },
          headerTintColor: colors.white
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.bg,
            height: 80
          },
          headerTintColor: colors.white
        }}
      />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerComponent;
