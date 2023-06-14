/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../page/LoginPage';
import HomePage from '../page/HomePage';
import VicationPage from '../page/VicationPage';
import UnvicationPage from '../page/UnvicationPage';
import ExamDetailPage from '../page/Test/ExamDetailPage';
import WorkRequestPage from '../page/WorkRequestPage';
import PersonPage from '../page/PersonPage';
import TimePlusPage from '../page/empty/TimePlusPage';
import ApplicationPage from '../page/empty/ApplicationPage';
import StudyDataPage from '../page/empty/StudyDataPage';
import CheckDataPage from '../page/empty/CheckDataPage';
import AppliDetail from '../page/empty/ApplicationDetail';
import UnSafeDetail from '../page/empty/UnSafeDetail';
import NoticeDetail from '../Component/NoticeDetail';
import StudyDetail from '../page/StudyDetail';
import ExamResultPage from '../page/empty/ExamResultPage';
import StandardPage from '../page/empty/StandardPage';
import CheckListPage from '../page/empty/CheckListPage';
const Stack = createNativeStackNavigator();

export default function AppNavigators() {
  return (
    <NavigationContainer>
      {/* <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{headerShown: false}}
      /> */}
      <Stack.Navigator initialRouteName="loginPage">
        {/* <Stack.Screen
                name="loginTestPage"
                component={LoginTestPage}
                options={{ headerShown: false }}
            />
                        <Stack.Screen
                name="DemoPage"
                component={FetchDemoPage}
                options={{ headerShown: false }}
            /> */}
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VicationPage"
          component={VicationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnVicationPage"
          component={UnvicationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExamDetailPage"
          component={ExamDetailPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WorkRequestPage"
          component={WorkRequestPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TimePlusPage"
          component={TimePlusPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ApplicationPage"
          component={ApplicationPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudyDataPage"
          component={StudyDataPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CheckDataPage"
          component={CheckDataPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppliDetail"
          component={AppliDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnSafeDetail"
          component={UnSafeDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoticeDetail"
          component={NoticeDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="StudyDetail"
          component={StudyDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExamResult"
          component={ExamResultPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StandardPage"
          component={StandardPage}
          options={{headerShown: false}}
        />

        <Stack.Screen name="personPage" component={PersonPage} options={{}} />
        <Stack.Screen
          name="历史考勤信息"
          component={CheckListPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
