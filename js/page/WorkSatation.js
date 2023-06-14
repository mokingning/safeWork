/* eslint-disable prettier/prettier */
import {
  HStack,
  NativeBaseProvider,
  Box,
  Image,
  AspectRatio,
  Heading,
  Center,
} from 'native-base';
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import NavigationBar from 'react-native-navbar-plus';
import WorkItem from './Test/WorkItem';

const Works = {
  vacation: {
    name: 'paper-plane',
    backColor: 'cyan.300',
    title: '请假',
    page: 'VicationPage',
  },
  unVacaion: {
    name: 'calendar',
    backColor: 'warning.400',
    title: '销假',
    page: 'UnVicationPage',
  },
  workMore: {
    name: 'clapperboard',
    backColor: 'purple.600',
    title: '加班申请',
    page: 'WorkRequestPage',
  },
  timePlus: {
    name: 'plus',
    backColor: 'tertiary.400',
    title: '工时补偿',
    page: 'TimePlusPage',
  },
};
const Nums = {
  studySituation: {
    name: 'text-document',
    backColor: 'info.500',
    title: '学习情况',
    page: 'StudyDataPage',
  },
  workSituation: {
    name: 'bar-graph',
    backColor: 'fuchsia.300',
    title: '考勤统计',
    page: 'CheckDataPage',
  },
  myApllication: {
    name: 'flag',
    backColor: 'yellow.300',
    title: '我的申请',
    page: 'ApplicationPage',
  },
};
let statusBar = {
  backgroundColor: 'black',
  barStyle: 'light-content',
};
let navigationBar = (
  <NavigationBar
    title={'工作台'}
    statusBar={statusBar}
    style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
  />
);
function WorkSatation(props) {
  return (
    <NativeBaseProvider>
      {navigationBar}
      <Box
        overflow={'hidden'}
        rounded="lg"
        mt={2}
        w={Dimensions.get('window').width}
        h={Dimensions.get('window').height}
        bg={'white'}>
        <Center>
          <AspectRatio
            ratio={{
              base: 8 / 4,
            }}
            w="90%">
            <Image
              alt="安全工地"
              borderRadius={9}
              source={{
                uri: 'https://img-qn.51miz.com/preview/element/00/01/12/27/E-1122748-52A7F55E.jpg',
              }}
            />
          </AspectRatio>
        </Center>
        <Heading size="md" ml="3" style={styles.header}>
          考勤沟通
        </Heading>
        <HStack space={2} justifyContent="flex-start">
          <Box />
          {Object.entries(Works).map(item => {
            // console.log(JSON.stringify(item));
            return (
              <WorkItem
                key={item[0]}
                name={item[1].name}
                backColor={item[1].backColor}
                title={item[1].title}
                page={item[1].page}
              />
            );
          })}
          <Box />
        </HStack>
        <Heading size="md" ml="3" style={styles.header}>
          数据统计
        </Heading>
        <HStack space={2} justifyContent="flex-start">
          <Box />
          {Object.entries(Nums).map(item => {
            // console.log(JSON.stringify(item));
            return (
              <WorkItem
                key={item[0]}
                name={item[1].name}
                backColor={item[1].backColor}
                page={item[1].page}
                title={item[1].title}
              />
            );
          })}
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  header: {
    marginTop: 15,
    marginBottom: 15,
  },
  content: {
    fontSize: 15,
    color: 'black',
  },
});
export default WorkSatation;
