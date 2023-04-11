import {
  StyleSheet,
  Pressable,
  Image,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../config/constant';
import { auth } from '../firebase';
import { useUser } from '../store/store';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const setUser = useUser((state) => state.setUser);
  const logo = require('../assets/logos/logoWashWhite.png');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user);
        navigation.navigate('Home' as never);
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    if (email === '' || password === '') {
      Alert.alert('All fields are required', 'Please fill in the fields', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]);
      return;
    }
    signInWithEmailAndPassword(auth, email.trim(), password).then(
      (userCredential: UserCredential) => {
        console.log('userCredential : ', userCredential);
        const user = userCredential.user;
        setUser(user);
        console.log('user details : ', user);
        const myUserUid = auth.currentUser.uid;
        console.log('user details : ', user);
        navigation.navigate('Home' as never);
      }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        {/* logo  */}
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
          <Text style={styles.imageText}>sharewash</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            Log in
          </Text>

          <Text style={{ color: 'white', fontWeight: '600' }}>
            Log into your account
          </Text>
        </View>

        {/* form start */}
        <View style={{ maxWidth: '90%', marginTop: 50 }}>
          {/* input email */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <MaterialCommunityIcons
              style={{ width: '10%' }}
              name="email"
              size={24}
              color="white"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'white'}
              style={{
                marginLeft: '2.5%',
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                width: '85%'
              }}
            />
          </View>

          {/* input password */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <Ionicons
              name="key"
              style={{ width: '10%' }}
              size={24}
              color="white"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={showPassword}
              placeholder="Password min 8 characters"
              placeholderTextColor={'white'}
              style={{
                marginLeft: '2.5%',
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                width: '85%'
              }}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: 20
              }}
            >
              {!showPassword ? (
                <MaterialCommunityIcons
                  style={{}}
                  name="eye-off"
                  size={24}
                  color="white"
                />
              ) : (
                <MaterialCommunityIcons
                  style={{}}
                  name="eye"
                  size={24}
                  color="white"
                />
              )}
            </Pressable>
          </View>

          <Pressable
            style={{
              width: 200,
              minWidth: 200,
              padding: 10,
              borderRadius: 8,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: colors.action
            }}
            onPress={login}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: colors.white
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Register' as never);
          }}
          style={{
            marginVertical: 10
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              color: 'white',
              fontWeight: 'bold',
              fontStyle: 'italic'
            }}
          >
            You don't have an account? Register Here
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center'
  },
  imageText: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  text: {
    color: 'white'
  }
});
