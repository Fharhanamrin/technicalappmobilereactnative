import {StyleSheet, Text, Image, View, useWindowDimensions} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {url} from '../../config/api';
import normalize from 'react-native-normalize';

export default function SplashScreen({navigation}) {
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('LobyPage');
    // }, 3000);
    checkSession();
    return () => {};
  }, []);

  const checkSession = async () => {
    // navigation.replace('Home');

    let data = await AsyncStorage.getItem('status_user');
    console.log(data);
    if (data != null && data != '') {
      if (data == 1) {
        // setTimeout(() => {
        navigation.replace('Home');
        // }, 100);
      }
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <LinearGradient
      colors={['#A676A6', '#988EAD', '#87A9B5']}
      style={styles.container}>
      <View
        style={{
          width: width * 0.6,
          height: width * 0.6,
        }}>
        <Text
          style={{
            fontSize: normalize(20),
            color: 'white',
            textAlign: 'center',
          }}>
          Technical Test
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A080A9',
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
