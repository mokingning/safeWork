/* eslint-disable prettier/prettier */
/**
 * 全局跳转工具类
 */
import {StackActions} from '@react-navigation/native';
export default class NavigationUtil {
  /**
   * 跳转到指定页面
   * @param params 要传递的参数
   * @param page 要跳转的页面名
   **/
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation || (params || {}).navigation;
    console.log({params});
    console.log(JSON.stringify(navigation));
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null123');
      return;
    }
    navigation.navigate(page, {
      ...params,
      navigation: undefined, //fix Non-serializable values were found in the navigation state. Check:
    });
  }

  /**
   * 返回上一页
   * @param navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }

  /**
   * 重置到首页
   * @param navigation
   */
  static resetToHomPage(params) {
    const {navigation} = params;

    navigation.dispatch(StackActions.replace('HomePage', {}));
  }

  /**
   * 重置到登录
   * @param params
   */
  static login(params = {}) {
    let {navigation} = params;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }

    navigation.dispatch(StackActions.replace('LoginPage', {}));
  }

  static registration(params = {}) {
    let {navigation} = params;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }

    navigation.dispatch(StackActions.replace('RegistrationPage', {}));
  }
}
