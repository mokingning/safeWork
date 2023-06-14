/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {useRef, useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  VStack,
  Heading,
  Text,
  Center,
  ScrollView,
  Skeleton,
  HStack,
} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import {getHundred} from '../../util/MathUtil';
const {width, height} = Dimensions.get('window');
import {MySvgChart} from '../../util/GraphUtil';
import {pieOptionStudy, barOptionStudy} from '../../util/GraphOptions';
import StudyDao from '../../expand/dao/StudyDao';
import {connect} from 'react-redux';
import NavigationUtil from '../../navigator/NavigationUtil';
import ViewUtil from '../../util/ViewUtil';
import NavigationBar from 'react-native-navbar-plus';
function StudyDataPage(props) {
  const pieChart = useRef();
  const barChart = useRef();
  const [statisticInfo, setInfo] = useState({isLoading: true});
  useEffect(() => {
    StudyDao.getInstance()
      .statistic({userId: props.info.id})
      .then(res => {
        setInfo({...res, isLoading: false});
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }, []);
  let navigationBar = (
    <NavigationBar
      title={'学习统计'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  return (
    <NativeBaseProvider>
      {navigationBar}
      {statisticInfo.isLoading ? (
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
        <ScrollView>
          <Center>
            <VStack
              w={width * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              px={5}
              py={2}
              my={1}
              bgColor={'white'}>
              <VStack mx={2} space={1}>
                <Center>
                  <Heading size="md">学习情况</Heading>
                </Center>
                <VStack space={2}>
                  <Text fontSize={15}>
                    学习覆盖率：
                    {getHundred(
                      statisticInfo.userCount / statisticInfo.allCount,
                    )}
                  </Text>
                  <Text fontSize={15}>最近学习的资料：</Text>
                  {Object.entries(statisticInfo.recent).map(item => {
                    return (
                      <TouchableOpacity
                        key={item[0]}
                        onPress={() => {
                          NavigationUtil.goPage({...item[1]}, 'StudyDetail');
                        }}>
                        <Text fontSize={15}>
                          {`\t\t\t\t\t${parseInt(item[0]) + 1}.${
                            item[1].title
                          }`}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}

                  <Text fontSize={15}>待考试数量：{props.info.size} 张</Text>
                  <Text fontSize={15}>
                    考试通过率：
                    {getHundred(
                      (statisticInfo.examJoin - statisticInfo.examFail) /
                        statisticInfo.examJoin,
                    )}
                  </Text>
                </VStack>
              </VStack>
            </VStack>
            <VStack
              w={width * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              px={5}
              py={2}
              my={1}
              bgColor={'white'}
              alignItems={'center'}>
              <Center>
                <MySvgChart
                  option={pieOptionStudy}
                  onInit={chart => {
                    pieChart.current = chart;
                    chart.setOption({
                      series: {
                        name: '学习资料种类',
                        type: 'pie',
                        radius: ['30%', '60%'], // 饼图大小控制
                        avoidLabelOverlap: false,
                        labelLine: {
                          show: true,
                        },
                        label: {
                          show: true,
                          formatter: '{b}:{c}\n({d}%)', //自定义显示格式(b:name, c:value, d:百分比)
                        },
                        data: [
                          {
                            value: statisticInfo.typeCount.videoNum,
                            name: '视频',
                          },
                          {value: statisticInfo.typeCount.pdfnum, name: 'PDF'},
                          {
                            value: statisticInfo.typeCount.textNum,
                            name: '文章',
                          },
                        ],
                      },
                    });
                  }}
                />
              </Center>
            </VStack>
            <VStack
              w={width * 0.9}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              px={5}
              bgColor={'white'}
              alignItems={'center'}>
              <MySvgChart
                option={barOptionStudy}
                onInit={chart => {
                  barChart.current = chart;
                  console.log('study!!!');
                  chart.setOption({
                    series: [
                      {
                        name: '文章学习',
                        type: 'bar',
                        tooltip: {
                          valueFormatter: function (value) {
                            return value + ' 个';
                          },
                        },
                        data: [
                          statisticInfo.weekStudy[0].textNum,
                          statisticInfo.weekStudy[1].textNum,
                          statisticInfo.weekStudy[2].textNum,
                          statisticInfo.weekStudy[3].textNum,
                          statisticInfo.weekStudy[4].textNum,
                          statisticInfo.weekStudy[5].textNum,
                          statisticInfo.weekStudy[6].textNum,
                        ],
                      },
                      {
                        name: '视频学习',
                        type: 'bar',
                        tooltip: {
                          valueFormatter: function (value) {
                            return value + ' 个';
                          },
                        },
                        data: [
                          statisticInfo.weekStudy[0].videoNum,
                          statisticInfo.weekStudy[1].videoNum,
                          statisticInfo.weekStudy[2].videoNum,
                          statisticInfo.weekStudy[3].videoNum,
                          statisticInfo.weekStudy[4].videoNum,
                          statisticInfo.weekStudy[5].videoNum,
                          statisticInfo.weekStudy[6].videoNum,
                        ],
                      },
                      {
                        name: 'PDF学习',
                        type: 'bar',
                        tooltip: {
                          valueFormatter: function (value) {
                            return value + ' 个';
                          },
                        },
                        data: [
                          statisticInfo.weekStudy[0].pdfnum,
                          statisticInfo.weekStudy[1].pdfnum,
                          statisticInfo.weekStudy[2].pdfnum,
                          statisticInfo.weekStudy[3].pdfnum,
                          statisticInfo.weekStudy[4].pdfnum,
                          statisticInfo.weekStudy[5].pdfnum,
                          statisticInfo.weekStudy[6].pdfnum,
                        ],
                      },
                      {
                        name: '学习总量',
                        type: 'line',
                        yAxisIndex: 1,
                        tooltip: {
                          valueFormatter: function (value) {
                            return value + ' 个';
                          },
                        },
                        data: [
                          statisticInfo.weekStudy[0].allNum,
                          statisticInfo.weekStudy[1].allNum,
                          statisticInfo.weekStudy[2].allNum,
                          statisticInfo.weekStudy[3].allNum,
                          statisticInfo.weekStudy[4].allNum,
                          statisticInfo.weekStudy[5].allNum,
                          statisticInfo.weekStudy[6].allNum,
                        ],
                      },
                    ],
                  });
                }}
              />
            </VStack>
          </Center>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
}
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
export default connect(mapStateProps)(StudyDataPage);
