import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  SafeAreaView
} from 'react-native';

import HomeScreen from './screens/HomeScreen';

export default function App() {
  const onPressFunction = () => {
    console.log('Pressed');
  };

  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55AFC0'
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  },
  imageContainer: {
    borderRadius: 150,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});
