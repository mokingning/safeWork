/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import GEO from './js/position/geolation';
// import {MapView} from 'react-native-amap3d/lib/src';
import LoginPage from './js/page/LoginPage';
import TestPage from './js/page/VicationPage';
import DateTimePage from './js/Component/DateTimeCompo';
import DateTest from './js/Component/DateTest';
import AppNavigators from './js/navigator/AppNavigators';
import Draggle from './js/Component/DraggerAble';
import Test_FlatList from './js/page/Test/Test_FlatList';
import WorkItem from './js/page/Test/WorkItem';
import WorkSatation from './js/page/WorkSatation';
import MyPage from './js/page/MyPage';
import ExamDetailPage from './js/page/Test/ExamDetailPage';
import ExamItem from './js/Component/ExamItem';
import WorkRequestPage from './js/page/WorkRequestPage';
import {Provider} from 'react-redux';
import store from './js/store';
import CountScreen from './js/page/Time';
import GetViewer from './js/page/Test/GetViwer';
function App(): JSX.Element {
  const app = <AppNavigators />;
  return <Provider store={store}>{app}</Provider>;
  // return <CountScreen></CountScreen>;
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   }
// });

export default App;
