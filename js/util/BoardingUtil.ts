/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
// const KEY_PHONE = 'phone';
const KEY_Authorization = 'Authorization';
// const KEY_NAME='userName';

//保存token
export async function getToken() {
  return await AsyncStorage.getItem(KEY_Authorization);
}

export async function saveToken(data: string) {
  return await AsyncStorage.setItem(KEY_Authorization, data);
}
//保存name
// export async function getName() {
//   return await AsyncStorage.getItem(KEY_NAME);
// }

// export async function saveName(data: string) {
//   return await AsyncStorage.setItem(KEY_NAME, data);
// }

//保存手机号
// export async function getPhone() {
//   return await AsyncStorage.getItem(KEY_PHONE);
// }

// export async function savePhone(data: string) {
//   return await AsyncStorage.setItem(KEY_PHONE, data);
// }
