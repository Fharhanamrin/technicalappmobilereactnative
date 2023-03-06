import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '@rneui/base';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {url} from '../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
export default function Account({navigation}) {
  const {height, width} = useWindowDimensions();
  const [name, setname] = useState('');
  const [no_hp, setno_hp] = useState('');
  const [first, setfirst] = useState('M');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe_page = navigation.addListener('focus', async () => {
      GetAllSession();
    });
    return unsubscribe_page;
  }, [navigation]);

  const GetAllSession = async () => {
    let name = await AsyncStorage.getItem('name');
    let no_hp = await AsyncStorage.getItem('no_hp');

    if (name != null && name != '') {
      setname(name);
      setfirst(name.substring(0, 1).toUpperCase());
    }
    if (no_hp != null && no_hp != '') {
      setno_hp(no_hp);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate('Home');
  };

  const SubmitKeluar = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (e) {
      // clear error
    }

    console.log('Done.');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#E9EBF3',
      }}>
      <Header
        centerComponent={{
          text: 'Account',
          style: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontWeight: '700',
            fontSize: normalize(20),
          },
        }}
        containerStyle={{
          backgroundColor: '#AA6FA4',
        }}
        statusBarProps={{
          backgroundColor: '#AA6FA4',
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={['#A676A6', '#988EAD', '#87A9B5']}
          style={{
            width: width * 0.4,
            height: width * 0.4,
            backgroundColor: 'orange',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: normalize((width * 0.4) / 2),
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '500',
              fontSize: normalize(50),
              color: 'white',
            }}>
            {first}
          </Text>
        </LinearGradient>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: normalize(20),
          //   backgroundColor: 'red',
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '400',
              fontSize: normalize(14),
            }}>
            Nama
          </Text>
          <View padding={normalize(2)} />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '600',
              fontSize: normalize(16),
            }}>
            {name}
          </Text>
        </View>
        <View padding={normalize(4)} />
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '400',
              fontSize: normalize(14),
            }}>
            No whatsApp
          </Text>
          <View padding={normalize(2)} />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '600',
              fontSize: normalize(16),
            }}>
            {no_hp}
          </Text>
        </View>
        <View padding={normalize(4)} />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: height * 0.2,
        }}>
        <Text
          onPress={SubmitKeluar}
          style={{
            fontFamily: 'Poppins-Regular',
            fontWeight: 'bold',
            fontSize: normalize(20),
          }}>
          <Icon name="sign-out" size={normalize(24)} color="#900" /> Logout
        </Text>
        <View padding={normalize(6)} />
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontWeight: '500',
            fontSize: normalize(14),
          }}>
          v1.0.1
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
