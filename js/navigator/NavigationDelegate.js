/* eslint-disable prettier/prettier */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function tabNav({Component, keys, theme, extra} = {}) {
  //   debugger;
  console.log('已经在tabNav内部执行');
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarItemStyle: styles.tabStyle,
        tabBarScrollEnabled: false, //是否支持 选项卡滚动，默认false
        tabBarInactiveTintColor: 'white', //激活状态和非激活状态下的颜色
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: theme.themeColor, //TabBar 的背景颜色
        },
        tabBarIndicatorStyle: styles.indicatorStyle, //标签指示器的样式（也就是下边的小横线）
        tabBarLabelStyle: styles.labelStyle, //文字的样式
      }}>
      {/* {console.log('开始组装单个组件')} */}
      {Object.entries(_genTabs({Component, keys, theme, extra})).map(item => {
        return (
          <Tab.Screen
            name={item[0]}
            key={item[0]}
            component={item[1].Screens}
            options={item[1].navigationOptions}
          />
        );
      })}
    </Tab.Navigator>
  );
}

/**
 * 初始化单个Tab的信息
 * @param {*} param0
 * @returns
 */
function _genTabs({Component, keys, theme, extra = {}} = {}) {
  // console.log('_genTabs内部');
  const tabs = {};
  // debugger;
  keys.forEach((item, index) => {
    // console.log(JSON.stringify(item));
    if (item.checked) {
      tabs[`tab${index}`] = {
        //fix Got a component with the name 'screen' for the screen
        Screens: props => {
          // console.log(
          //   '------------------------------->>>>>>>' + JSON.stringify(props),
          // );
          return (
            <Component
              {...props}
              {...extra}
              tabLabel={item.name}
              theme={theme}
            />
          );
        }, //初始化Component时携带默认参数 @https://github.com/react-navigation/react-navigation/issues/2392
        navigationOptions: {
          title: item.name,
        },
      };
    }
  });
  // console.log('_genTabs返回');
  return tabs;
}

const styles = StyleSheet.create({
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    fontSize: 15,
    margin: 0,
    textTransform: 'none', //取消大写
  },
});
