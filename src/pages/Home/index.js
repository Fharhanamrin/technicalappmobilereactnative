import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import normalize from 'react-native-normalize';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Beranda from './Beranda';
import Account from '../Account';
export default function Home({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Approval') {
            return focused ? (
              <Icon name="home" size={normalize(24)} color="#AA70A4" />
            ) : (
              <Icon name="home" size={normalize(24)} color="#AA70A4" />
            );
          } else if (route.name === 'Account') {
            return focused ? (
              <Icon name="user" size={normalize(24)} color="#AA70A4" />
            ) : (
              <Icon name="user" size={normalize(24)} color="#AA70A4" />
            );
          }
        },
        // activeTintColor: '#4AB363',
        // inactiveTintColor: 'gray',
        tabBarActiveTintColor: '#AA70A4',
        tabBarInactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 1,
          fontFamily: 'Poppins-Medium',
        },
      })}>
      <Tab.Screen
        options={{
          title: 'Approval',
        }}
        name="Approval"
        component={Beranda}
      />

      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
