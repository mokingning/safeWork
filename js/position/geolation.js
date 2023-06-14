/* eslint-disable prettier/prettier */
import {PermissionsAndroid, Platform} from 'react-native';
import {init, Geolocation, setNeedAddress} from 'react-native-amap-geolocation';

class Geo {
  async initGeo() {
    if (Platform.OS === 'android') {
      const grantd = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      //这里也可以再加点判断啥的给用户提示，grantd 值为 granted 时，是获取成功。
      console.log('权限获取的咋样了？？？', grantd);
    }

    //初始化高德地图
    await init({
      //来自高德地图中的 安卓 应用的Key
      android: '139303a23b1a3bfa637a40c53a1fe49b',
    });

    return Promise.resolve();
  }

  async getCurrentPosition() {
    await this.initGeo();
    setNeedAddress(true);

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(location => {
        resolve(location);
      }, reject);
    });
  }

  // async getCityByLocation() {
  //   await this.initGeo();

  //   const {
  //     location,
  //     coords: {longitude, latitude},
  //   } = await this.getCurrentPosition();           里面是包含了地理位置的
  //   console.log(JSON.stringify(location));
  //   const res = await fetch('https://restapi.amap.com/v3/geocode/regeo', {
  //     //这里的key是高德地图的 web 的Key
  //     params: {
  //       location: `${longitude}, ${latitude}`,
  //       key: 'ba57d358bbb6eab84f9bd07f0037d62b',
  //     },
  //   });
  //   console.log(longitude, latitude);
  //   // console.log(`citTest${JSON.stringify(res)}`);
  //   return Promise.resolve(res.data || res);
  // }
}

// 这里是new一个对象导出使用，要注意。
export default new Geo();
