import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header} from '@rneui/base';
import normalize from 'react-native-normalize';

const DetailPage = ({navigation, route}) => {
  const {
    employee_number,
    employee_name,
    claim_date,
    description,
    amount,
    status,
  } = route.params;

  const formatRupiah = angka => {
    let rupiah = '';
    const angkaString = angka.toString();
    const pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(angkaString)) {
      angkaString = angkaString.replace(pattern, '$1.$2');
    }

    // Menambahkan awalan Rp dan desimal jika ada
    if (angkaString.includes(',')) {
      rupiah = `Rp ${angkaString}`;
    } else {
      rupiah = `Rp ${angkaString},00`;
    }

    return rupiah;
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={{
          backgroundColor: '#AA6FA4',
        }}
        statusBarProps={{
          backgroundColor: '#AA6FA4',
        }}
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          iconStyle: {color: '#fff'},
          size: normalize(32),
          onPress: () => {
            // console.log('haha');
            navigation.goBack();
          },
        }}
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Employee Number:</Text>
          <Text style={styles.value}>{employee_number}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Employee Name:</Text>
          <Text style={styles.value}>{employee_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Claim Date:</Text>
          <Text style={styles.value}>{claim_date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Reimbursement Amount:</Text>
          <Text style={styles.value}>Rp {amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text>
            {status == 0 ? 'New' : status == 1 ? 'Approve' : 'Rejected'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#008080',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: 150,
  },
  value: {
    flex: 1,
  },
  approved: {
    color: 'green',
  },
  rejected: {
    color: 'red',
  },
});

export default DetailPage;
