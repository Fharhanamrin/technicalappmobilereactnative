import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const {height, width} = useWindowDimensions();
  const [LoadingButton, setLoadingButton] = useState(false);

  const [no_hp, setno_hp] = useState('');
  const [password, setpassword] = useState('');

  const submitLogin = async () => {
    setLoadingButton(true);

    let data_login = {
      no_hp: '085795590948',
      password: '12345678',
      name: 'Fharhan Amrin',
    };

    setLoadingButton(true);

    if (data_login.no_hp === no_hp && data_login.password === password) {
      await AsyncStorage.setItem('no_hp', `${data_login.no_hp}`);
      await AsyncStorage.setItem('name', `${data_login.name}`);
      await AsyncStorage.setItem('status_user', '1');
      navigation.navigate('Home');
      setLoadingButton(false);
    } else {
      setLoadingButton(false);

      if (data_login.no_hp != no_hp && data_login.password != password) {
        if (data_login.no_hp != no_hp) {
          Alert.alert(
            'Informasi',
            `Harap Ingat Nomor Handphone dan password yang anda daftarkan`,
            [
              {
                text: 'Tutup',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          );
        }
      } else {
        if (data_login.no_hp != no_hp) {
          Alert.alert('Informasi', `Sepertinya Anda Salah Memasukkan No Hp`, [
            {
              text: 'Tutup',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }

        if (data_login.password !== password) {
          Alert.alert(
            'Informasi',
            `Sepertinya Anda Salah Memasukkan Password`,
            [
              {
                text: 'Tutup',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
          );
        }
      }
    }
  };

  const butuhbantuan = async () => {
    await Linking.openURL('https://wa.me/6281385589009');
  };

  return (
    <LinearGradient
      colors={['#AA6FA4', '#9491AD', '#82ACB5']}
      style={styles.container}>
      <View
        style={{
          padding: normalize(40),
        }}
      />

      <View
        style={{
          width: width * 0.7,
          height: width * 0.4,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: normalize(40),
            fontFamily: 'Poppins-Regular',
            fontWeight: 'bold',
          }}>
          Technical Test
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: normalize(16),
          justifyContent: 'space-between',
          flex: 1,
          paddingBottom: normalize(48),
        }}>
        <View>
          <Text style={styles.label}>Masukan No Handpone : </Text>
          <View style={[styles.form_control, {height: height * 0.07}]}>
            <TextInput
              style={styles.input}
              onChangeText={setno_hp}
              placeholder={'Masukan No Handpone'}
              placeholderTextColor="#EEEAEA"
            />
          </View>
          <View paddingBottom={normalize(16)} />
          <Text style={styles.label}>Masukan Password : </Text>
          <View style={[styles.form_control, {height: height * 0.07}]}>
            <TextInput
              style={styles.input}
              onChangeText={setpassword}
              placeholder={'Password'}
              placeholderTextColor="#EEEAEA"
              secureTextEntry={true}
            />
          </View>

          <View paddingBottom={normalize(40)} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              submitLogin();
            }}>
            {!LoadingButton ? (
              <Text style={styles.label_button}>Masuk</Text>
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#fffff',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontStyle: 'italic',
    lineHeight: normalize(36),
    fontSize: normalize(15),
    color: '#FFFFFF',
  },
  form_control: {
    backgroundColor: '#7FB0B6',
    borderRadius: normalize(10),
    justifyContent: 'center',
    paddingTop: normalize(Platform.OS === 'ios' ? 4 : 6),
    paddingBottom: normalize(Platform.OS === 'ios' ? 6 : 12),
    paddingHorizontal: normalize(14),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalize(6),
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    borderBottomWidth: normalize(Platform.OS === 'ios' ? 1 : 3),
    borderBottomColor: '#FFFFFF',
    fontSize: normalize(15),
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'italic',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#AA6FA4',
    borderRadius: normalize(10),
    padding: normalize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: normalize(6),
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingVertical: normalize(12),
  },
  label_button: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    fontSize: normalize(18),
  },
});
