import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {} from '@expo/vector-icons';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors } from '../config/constant';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const logo = require('../assets/logos/logoWashWhite.png');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const title = 'Register';
  const subtitle = 'Create your account';
  const action = 'Register';
  const goto = 'You already have an account? Log In Here';
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
            {title}
          </Text>

          <Text style={{ color: 'white', fontWeight: '600' }}>{subtitle}</Text>
        </View>

        {/* form start */}
        <View style={{ maxWidth: 300, marginTop: 50 }}>
          {/* input email */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <MaterialCommunityIcons name="email" size={24} color="white" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'white'}
              style={{
                marginLeft: 10,
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                width: '100%'
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
            <Ionicons name="key" size={24} color="white" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password min 8 characters"
              placeholderTextColor={'white'}
              style={{
                marginLeft: 10,
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                width: '100%'
              }}
            />
          </View>

          {/* input phone */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <Feather name="phone" size={24} color="white" />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={'white'}
              placeholder="Phone Number ex : 1234567890"
              style={{
                marginLeft: 10,
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                width: '100%'
              }}
            />
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
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: colors.white
              }}
            >
              {action}
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Login' as never);
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
            {goto}
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55AFC0',
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
