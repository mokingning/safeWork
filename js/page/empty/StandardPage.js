/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  NativeBaseProvider,
  VStack,
  Skeleton,
  HStack,
  Heading,
  Button,
  Modal,
} from 'native-base';
import CheckDao from '../../expand/dao/CheckDao';
import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  ToastAndroid,
  Platform,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import {AMapSdk, MapView, MapType, Marker, Polygon} from 'react-native-amap3d';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../../util/ViewUtil';
import Geo from '../../position/geolation';
const {width, height} = Dimensions.get('window');
function StandardPage(props) {
  const [info, setInfo] = useState({isLoading: true});
  let navigationBar = (
    <NavigationBar
      title={'打卡标准'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  useEffect(() => {
    AMapSdk.init(
      Platform.select({
        android: '139303a23b1a3bfa637a40c53a1fe49b',
      }),
    );
    CheckDao.getInstance()
      .getStandard({userId: props.info.id})
      .then(res => {
        setInfo({...res, isLoading: false, isShowMap: false});
      })
      .catch(error => {
        ToastAndroid.show('系统繁忙，请稍后再试'), ToastAndroid.SHORT;
      });
  }, []);
  return (
    <NativeBaseProvider>
      {navigationBar}
      {info.isLoading ? (
        <VStack mx={5} my={5} space={3}>
          <Skeleton h={10} rounded={'lg'} />
          <VStack space={5}>
            <Skeleton h={5} w={width * 0.5} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton
              h={5}
              w={width * 0.5}
              rounded={'lg'}
              startColor={'indigo.200'}
            />
            <HStack alignItems={'center'} space={2}>
              <Skeleton size="3" rounded="full" />
              <Skeleton h={3} rounded={'lg'} startColor="indigo.200" />
            </HStack>
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton h={5} w={width * 0.5} rounded={'lg'} />
            <HStack alignItems={'center'} space={2}>
              <Skeleton size="3" rounded="full" startColor="amber.300" />
              <Skeleton h={3} rounded={'lg'} />
            </HStack>
            <Skeleton h={3} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton h={5} w={width * 0.5} rounded={'lg'} />
            <Skeleton.Text lines={4} />
            <Skeleton
              h={10}
              px={width * 0.1}
              rounded={'full'}
              startColor="indigo.200"
            />
          </VStack>
        </VStack>
      ) : (
        <VStack alignItems={'center'}>
          <VStack
            w={width * 0.9}
            h={height}
            borderWidth={1}
            borderRadius={10}
            borderColor={'muted.300'}
            px={2}
            py={2}
            my={1}
            bgColor={'white'}>
            <HStack>
              <VStack w={width * 0.25} space={2}>
                <Heading size="sm">开始时间：</Heading>
                <Heading size="sm">结束时间：</Heading>
                <Heading size="sm">{'\t\t\t\t\t'}范围：</Heading>
                <Heading size="sm">中心位置：</Heading>
              </VStack>
              <VStack space={2}>
                <Text style={{fontSize: 16, color: 'black'}}>
                  {info.earliestTime + 'AM'}
                </Text>
                <Text style={{fontSize: 16, color: 'black'}}>
                  {info.latestTime + 'PM'}
                </Text>
                <Text style={{fontSize: 16, color: 'black'}}>
                  {info.radius + 'KM'}
                </Text>
              </VStack>
            </HStack>
            <VStack width={300} height={300} mb={3}>
              <MapView
                mapType={MapType.Standard}
                initialCameraPosition={{
                  target: {
                    latitude: info.lat,
                    longitude: info.lon,
                  },
                  myLocationEnabled: true,
                  zoom: 12,
                }}>
                <Marker
                  position={{latitude: info.lat, longitude: info.lon}}
                  onPress={() => {
                    alert(`打卡中心点`);
                  }}>
                  <View style={style.infoWindow}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      打卡中心
                    </Text>
                    <Image
                      source={require('../../../static/images/point.png')}
                    />
                  </View>
                </Marker>
              </MapView>
            </VStack>
            <Text style={{fontSize: 16, color: 'black'}}>
              注意：{'\n'}
              每天每次打卡两次，打卡时间最早不得早于开始时间前半小时，最晚不得超过结束时间，且定位须在以打卡中心为圆心,半径为
              {info.radius}KM
              的范围内才可打卡，当天的打卡信息在在第二天可以查看状态
            </Text>
          </VStack>
        </VStack>
      )}
    </NativeBaseProvider>
  );
}
const style = StyleSheet.create({
  infoWindow: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
});
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
export default connect(mapStateProps)(StandardPage);
