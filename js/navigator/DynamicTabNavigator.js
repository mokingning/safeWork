/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WorkStation from '../page/WorkSatation';
import MyPage from '../page/MyPage';
import StudyPage from '../page/StudyPage';
import ExamPage from '../page/ExamPage';
import WatchPage from '../page/WatchPage';
import {View, Text} from 'react-native';
const Tab = createBottomTabNavigator();

const TABS = {
  //在这里配置页面的路由
  StudyPage: {
    screen: StudyPage,
    navigationOptions: {
      tabBarLabel: '学习',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <Feather name={'book-open'} size={26} style={{color: color}} />
      ),
    },
  },
  ExamPage: {
    screen: ExamPage,
    navigationOptions: {
      tabBarLabel: '考试',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <Entypo name={'news'} size={26} style={{color: color}} />
      ),
    },
  },
  WorkStation: {
    screen: WorkStation,
    navigationOptions: {
      tabBarLabel: '工作台',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <Entypo name={'grid'} size={26} style={{color: color}} />
      ),
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <AntDesign name={'user'} size={26} style={{color: color}} />
      ),
    },
  },
  WatchPage: {
    screen: WatchPage,
    navigationOptions: {
      tabBarLabel: '安全上传',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <AntDesign name={'Safety'} size={26} style={{color: color}} />
      ),
    },
  },
};

class DynamicTabNavigator extends Component {
  /**
   * 从navigationState解析导航跳转
   * @param {*} navigationState
   */

  _tabNavigator() {
    const {StudyPage, WatchPage, ExamPage, WorkStation, MyPage} = TABS;
    const tabs = {StudyPage, WatchPage, ExamPage, WorkStation, MyPage}; //根据需要定制显示的tab
    // PopularPage.navigationOptions.tabBarLabel = '最热'; //动态配置Tab属性
    // const themeColor = this.props.theme.themeColor || this.props.theme;
    if (this.props.size !== 0) {
      ExamPage.navigationOptions.tabBarIcon = ({color, focused}) => (
        <View>
          <View
            style={{
              width: 12,
              height: 12,
              justifyContent: 'center',
              position: 'absolute',
              zIndex: 9,
              backgroundColor: '#FB3768',
              borderRadius: 6,
              right: -5,
              top: -2,
            }}>
            <Text style={[{fontSize: 10, color: '#fff', textAlign: 'center'}]}>
              {this.props.size}
            </Text>
          </View>
          <Entypo name={'news'} size={26} style={{color: color}} />
        </View>
      );
    }
    return (
      // <Tab.Navigator
      //   tabBar={(props) => {
      //     this.fireEvent(props.state);
      //     return <BottomTabBar {...props} />;
      //   }}>
      <Tab.Navigator>
        {/* {console.log(Object.entries(tabs))} */}
        {Object.entries(tabs).map(item => {
          return (
            <Tab.Screen
              key={item[0]} //循环生成组件，需要Key值
              name={item[0]}
              component={item[1].screen}
              options={{...item[1].navigationOptions}}
              // options={{ ...(item[1].navigationOptions), tabBarActiveTintColor: themeColor }}
            />
          );
        })}
      </Tab.Navigator>
    );
  }

  render() {
    const Tab = this._tabNavigator();
    return Tab;
  }
}

export default DynamicTabNavigator;
