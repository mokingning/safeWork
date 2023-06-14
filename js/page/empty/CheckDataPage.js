/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  VStack,
  Heading,
  NativeBaseProvider,
  Center,
  HStack,
  Text,
  ScrollView,
  Button,
  Skeleton,
} from 'native-base';
import {Dimensions, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
const {width: w, height: h} = Dimensions.get('window');
import {MySvgChart} from '../../util/GraphUtil';
import {pieOptionCheck, barOptionCheck} from '../../util/GraphOptions';
import NavigationUtil from '../../navigator/NavigationUtil';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../../util/ViewUtil';
import LoadingTag from '../../Component/LoadingTag';
import CheckDao from '../../expand/dao/CheckDao';
import {connect} from 'react-redux';

const ItemView = ({title, onPress, isActive}) => (
  <TouchableOpacity onPress={onPress} style={[styles.pressAble]}>
    <View style={[styles.item, isActive ? styles.activeItem : null]}>
      <Text style={[styles.itemTitle, isActive ? styles.activeTitle : null]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

function CheckDataPage(props) {
  const chartRef = useRef(null);
  const barChart = useRef(null);
  const [active, setActive] = useState('month');
  const clickType = useRef('month');
  const [info, setInfo] = useState({isLoading: true});
  useEffect(() => {
    loadData('month');
  }, []);
  let navigationBar = (
    <NavigationBar
      title={'考勤统计'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  function loadData(type) {
    CheckDao.getInstance()
      .getStatistic({
        id: props.info.id,
        deptId: props.info.deptId,
        timeScale: type,
      })
      .then(res => {
        var workTime = 0,
          overTime = 0,
          addTime = 0,
          workDay = 0,
          overDay = 0,
          leaveDay = 0;
        var workArr = [],
          overArr = [],
          leaveArr = [];
        for (var i = 0; i < res.datas.length; i++) {
          workTime += res.datas[i].workTime;
          overTime += res.datas[i].overTime;
          addTime += res.datas[i].addTime;
          workDay += res.datas[i].workDay;
          leaveDay += res.datas[i].leaveDay;
          overDay += res.datas[i].overDay;
          workArr.push(res.datas[i].workDay);
          leaveArr.push(res.datas[i].leaveDay);
          overArr.push(res.datas[i].overDay);
        }
        setInfo({
          ...res,
          isLoading: false,
          workTime: workTime,
          overTime: overTime,
          addTime: addTime,
          workDay: workDay,
          leaveDay: leaveDay,
          overDay: overDay,
          leaveArr: leaveArr,
          overArr: overArr,
          workArr: workArr,
        });
      })
      .catch(error => {
        console.log('error!!');
      });
  }

  const InitChart = chart => {
    chartRef.current = chart;
    chart.setOption({
      series: [
        {
          type: 'pie',
          data: [
            {
              value: info.workTime,
              name: '通勤',
            },
            {
              value: info.overTime,
              name: '加班',
            },
            {
              value: info.addTime,
              name: '补充',
            },
          ],
        },
      ],
    });
    console.log(JSON.stringify(info));
  };
  const typeClick = type => {
    setActive(type);
    clickType.current = type;
    setInfo({...info, isLoading: true});
    loadData(type);
    // if (!info.isLoading) {
    //   var data, xData, barDataNormal, leave, over;
    //   if (type === 'month') {
    //     xData = ['上旬', '中旬', '下旬'];
    //     barDataNormal = [8, 8, 9];
    //     leave = [1, 1, 1];
    //     over = [1, 1, 2];
    //     data = [
    //       {
    //         value: info.workTime,
    //         name: '通勤',
    //       },
    //       {
    //         value: info.overTime,
    //         name: '加班',
    //       },
    //       {
    //         value: info.addTime,
    //         name: '补充',
    //       },
    //     ];
    //   } else if (type === 'year') {
    //     xData = ['一季度', '二季度', '三季度', '四季度'];
    //     barDataNormal = [80, 70, 80, 85];
    //     leave = [1, 3, 2, 4];
    //     over = [10, 5, 5, 10];
    //     data = [
    //       {value: 325, name: '正常通勤'},
    //       {value: 10, name: '请假'},
    //       {value: 30, name: '加班'},
    //     ];
    //   } else if (type === 'week') {
    //     xData = ['周一', '周二', '周三', '周四', '周五'];
    //     barDataNormal = [1, 1, 1, 1, 0];
    //     leave = [0, 0, 0, 0, 1];
    //     over = [1, 0, 1, 0, 0];
    //     data = [
    //       {value: 4, name: '正常通勤'},
    //       {value: 1, name: '请假'},
    //       {value: 2, name: '加班'},
    //     ];
    //   }
    //   console.log('--------->' + xData);
    //   chartRef.current.setOption({
    //     series: [
    //       {
    //         type: 'pie',
    //         data: data,
    //       },
    //     ],
    //   });
    //   barChart.current.setOption({
    //     xAxis: [
    //       {
    //         type: 'category',
    //         data: xData,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: '正常通勤',
    //         type: 'bar',

    //         emphasis: {
    //           focus: 'series',
    //         },
    //         data: barDataNormal,
    //       },
    //       {
    //         name: '加班',
    //         type: 'bar',

    //         emphasis: {
    //           focus: 'series',
    //         },
    //         data: over,
    //       },
    //       {
    //         name: '请假',
    //         type: 'bar',

    //         emphasis: {
    //           focus: 'series',
    //         },
    //         data: leave,
    //       },
    //     ],
    //   });
    // }
  };
  const isActive = tab => active === tab;
  return (
    <NativeBaseProvider>
      {navigationBar}
      {/* <LoadingTag isOpen={loading} /> */}
      {info.isLoading ? (
        <VStack mx={5} my={5} space={3}>
          <Skeleton h={10} rounded={'lg'} />
          <VStack space={5}>
            <Skeleton h={5} w={w * 0.5} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton
              h={5}
              w={w * 0.5}
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
            <Skeleton h={5} w={w * 0.5} rounded={'lg'} />
            <HStack alignItems={'center'} space={2}>
              <Skeleton size="3" rounded="full" startColor="amber.300" />
              <Skeleton h={3} rounded={'lg'} />
            </HStack>
            <Skeleton h={3} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton h={5} w={w * 0.5} rounded={'lg'} />
            <Skeleton.Text lines={4} />
            <Skeleton
              h={10}
              px={w * 0.1}
              rounded={'full'}
              startColor="indigo.200"
            />
          </VStack>
        </VStack>
      ) : (
        <ScrollView>
          <Center>
            <VStack
              w={w * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              px={5}
              py={2}
              my={1}
              bgColor={'white'}>
              <Heading size={'sm'}>你的总工时排名为:</Heading>
              <VStack alignItems={'center'} my={5}>
                <Text fontWeight={'bold'} fontSize={20}>
                  第{info.index}名
                </Text>
                <Text></Text>
                <Button
                  bgColor="info.500"
                  size="sm"
                  onPress={() => {
                    NavigationUtil.goPage({}, '历史考勤信息');
                  }}>
                  查看考勤记录
                </Button>
              </VStack>
            </VStack>
            <VStack
              w={w * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              px={5}
              py={2}
              my={1}
              bgColor={'white'}>
              <Heading size={'sm'}>考勤分布图</Heading>
              <HStack justifyContent="center" mt={2}>
                <ItemView
                  title="近一周"
                  onPress={() => typeClick('week')}
                  isActive={isActive('week')}
                />
                <ItemView
                  title="近一月"
                  onPress={() => typeClick('month')}
                  isActive={isActive('month')}
                />
                <ItemView
                  title="近一年"
                  onPress={() => typeClick('year')}
                  isActive={isActive('year')}
                />
              </HStack>
              <Center>
                <MySvgChart
                  option={pieOptionCheck}
                  onInit={chart => {
                    InitChart(chart);
                    // console.log(JSON.stringify(info));
                  }}
                />
              </Center>
            </VStack>
            <VStack
              w={w * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              space={2}
              px={5}
              py={2}
              my={1}
              bgColor={'white'}>
              <Heading size="sm">具体情况</Heading>
              <VStack justifyContent={'center'} alignItems={'center'}>
                <Text color={'#a3a3a3'} Italic bold fontSize={15}>
                  正常通勤：
                </Text>
                <Text color={'black'}>{info.workDay}</Text>

                <Text color={'#a3a3a3'} Italic bold fontSize={15}>
                  加班：
                </Text>
                <Text color={'black'}>{info.overDay}</Text>

                <Text color={'#a3a3a3'} Italic bold fontSize={15}>
                  请假：
                </Text>
                <Text color={'black'}>{info.leaveDay}</Text>
              </VStack>
            </VStack>
            <VStack
              w={w * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              space={2}
              px={5}
              py={2}
              my={1}
              bgColor={'white'}>
              <Center>
                <MySvgChart
                  option={barOptionCheck}
                  onInit={chart => {
                    barChart.current = chart;
                    chart.setOption({
                      xAxis: [
                        {
                          type: 'category',
                          data:
                            clickType.current === 'week'
                              ? [
                                  '周一',
                                  '周二',
                                  '周三',
                                  '周四',
                                  '周五',
                                  '周六',
                                  '周日',
                                ]
                              : clickType.current === 'month'
                              ? ['上旬', '中旬', '下旬']
                              : ['一季度', '二季度', '三季度', '四季度'],
                        },
                      ],
                      series: [
                        {
                          name: '正常通勤',
                          type: 'bar',
                          emphasis: {
                            focus: 'series',
                          },
                          data: info.workArr,
                        },
                        {
                          name: '加班',
                          type: 'bar',
                          emphasis: {
                            focus: 'series',
                          },
                          data: info.overArr,
                        },
                        {
                          name: '请假',
                          type: 'bar',
                          emphasis: {
                            focus: 'series',
                          },
                          data: info.leaveArr,
                        },
                      ],
                    });
                  }}
                />
              </Center>
            </VStack>
          </Center>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  pressAble: {
    height: 30,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a3a3a3',
    borderRadius: 5,
  },
  activeItem: {
    backgroundColor: '#1E90FF',
  },
  activeTitle: {
    color: 'white',
  },
  itemTitle: {
    color: 'black',
    fontWeight: '300',
    fontSize: 16,
  },
});
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});

export default connect(mapStateProps)(CheckDataPage);
