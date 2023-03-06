import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {url} from '../../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
import Carousel from 'react-native-reanimated-carousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomStatusBar = ({
  backgroundColor,
  barStyle = 'dark-content',
  //add more props StatusBar
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{height: insets.top, backgroundColor}}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={barStyle}
      />
    </View>
  );
};

export default function Beranda({navigation}) {
  const {height, width} = useWindowDimensions();

  const [refresh_halaman, setrefresh_halaman] = useState(1111);
  //0 = new, 1=approve, 2 = reject
  let data_dummy = [
    {
      id: 1,
      employee_number: 'E001',
      employee_name: 'John Doe',
      claim_date: '2022-01-15',
      description: 'Consultation fee for general checkup',
      category: 'medical',
      amount: 500000,
      status: 0,
    },
    {
      id: 2,
      employee_number: 'E002',
      employee_name: 'Jane Smith',
      claim_date: '2022-02-02',
      description: 'Taxi fare for business meeting',
      category: 'transport',
      amount: 150000,
      status: 0,
    },
    {
      id: 3,
      employee_number: 'E003',
      employee_name: 'Mike Johnson',
      claim_date: '2022-02-25',
      description: 'Prescription glasses',
      category: 'optical',
      amount: 750000,
      status: 0,
    },
    {
      id: 4,
      employee_number: 'E004',
      employee_name: 'Sarah Lee',
      claim_date: '2022-03-10',
      description: 'Tooth extraction',
      category: 'dental',
      amount: 1000000,
      status: 0,
    },
    {
      id: 5,
      employee_number: 'E001',
      employee_name: 'John Doe',
      claim_date: '2022-04-01',
      description: 'Medication for flu',
      category: 'medical',
      amount: 200000,
      status: 0,
    },
    {
      id: 6,
      employee_number: 'E002',
      employee_name: 'Jane Smith',
      claim_date: '2022-05-20',
      description: 'Contact lenses',
      category: 'optical',
      amount: 500000,
      status: 0,
    },
    {
      id: 7,
      employee_number: 'E003',
      employee_name: 'Mike Johnson',
      claim_date: '2022-06-10',
      description: 'Flight ticket for business trip',
      category: 'transport',
      amount: 2000000,
      status: 0,
    },
    {
      id: 8,
      employee_number: 'E004',
      employee_name: 'Sarah Lee',
      claim_date: '2022-07-01',
      description: 'Routine dental cleaning',
      category: 'dental',
      amount: 500000,
      status: 0,
    },
    {
      id: 9,
      employee_number: 'E001',
      employee_name: 'John Doe',
      claim_date: '2022-08-15',
      description: 'X-ray for broken arm',
      category: 'medical',
      amount: 1000000,
      status: 0,
    },
    {
      id: 10,
      employee_number: 'E002',
      employee_name: 'Jane Smith',
      claim_date: '2022-09-02',
      description: 'Gasoline for company car',
      amount: 2000000,
      status: 0,
    },
  ];

  useEffect(() => {
    const unsubscribe_page = navigation.addListener('focus', async () => {
      getDataReimbursement();
    });
    return unsubscribe_page;
  }, [navigation]);

  const [DataList, setDataList] = useState([]);

  const getDataReimbursement = () => {
    setDataList(data_dummy);
  };

  const submitApprove = id => {
    let data = DataList.findIndex(x => x.id == id);
    DataList[data].status = '1';
    setrefresh_halaman(moment().unix());
  };

  const submitReject = id => {
    let data = DataList.findIndex(x => x.id == id);
    DataList[data].status = '2';
    setrefresh_halaman(moment().unix());
  };

  const submitViewDetail = id => {
    let data = DataList.findIndex(x => x.id == id);
    console.log(data);
    if (data > -1) {
      navigation.navigate('Detail', {
        employee_number: DataList[data].employee_number,
        employee_name: DataList[data].employee_name,
        claim_date: DataList[data].claim_date,
        description: DataList[data].description,
        amount: DataList[data].amount,
        status: DataList[data].status,
      });
    }
  };

  const Item = ({item}) => (
    <View
      style={{
        width: width * 0.9,
        height: height * 0.16,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: normalize(16),
        borderRadius: normalize(8),
        padding: normalize(16),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontWeight: '900',
              fontSize: normalize(14),
            }}>
            {item.employee_number}{' '}
          </Text>
          <Text>{item.employee_name}</Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: '900',
            }}>
            #
            {item.status == 0
              ? 'New'
              : item.status == 1
              ? 'Approve'
              : 'Rejected'}
          </Text>
        </View>
      </View>
      <View paddingBottom={normalize(10)} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            submitApprove(item.id);
          }}
          style={{
            width: width * 0.26,
            paddingVertical: normalize(10),
            backgroundColor: 'green',
            borderRadius: normalize(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Approve
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            submitReject(item.id);
          }}
          style={{
            width: width * 0.26,
            paddingVertical: normalize(10),
            backgroundColor: 'red',
            borderRadius: normalize(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Reject
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            submitViewDetail(item.id);
          }}
          style={{
            width: width * 0.26,
            paddingVertical: normalize(10),
            backgroundColor: 'blue',
            borderRadius: normalize(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Detail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#7FB0B6', '#AA6FA4']}
      style={{
        width: width,
        height: height,
      }}>
      <View
        style={{
          width: width,
          height: height * 0.93,
          paddingTop: normalize(40),
          paddingBottom: normalize(10),
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={DataList}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: width,
    // height: height,
    backgroundColor: 'red',
  },
  card_menu: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(1),
    borderColor: 'black',
  },
});
