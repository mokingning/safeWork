/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Skeleton,
  VStack,
  HStack,
  Text,
  Divider,
  NativeBaseProvider,
  Box,
  Image,
  Heading,
  ScrollView,
  Badge,
} from 'native-base';
import flowDao from '../../expand/dao/flowDao';
import NavigationUtil from '../../navigator/NavigationUtil';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../../util/ViewUtil';

const width = Dimensions.get('window').width;
const type = ['事假', '出差', '病假', '婚假', '孕假'];

export default function AppliDetail({route, navigation}) {
  const {id, applicationType, leader} = route.params;
  const [data, setdata] = useState({isLoading: true});
  let navigationBar = (
    <NavigationBar
      title={'申请详情'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  useEffect(() => {
    flowDao
      .getInstance()
      .flowDetail({id: id, applicationType: applicationType})
      .then(res => {
        console.log(JSON.stringify(res));
        setdata({...data, ...res, isLoading: false});
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }, []);
  return (
    <NativeBaseProvider>
      {navigationBar}
      {data.isLoading ? (
        <VStack space={6} my={6} mx={5}>
          <HStack space={1}>
            <Box flex={1}>
              <Skeleton size={100} rounded="3xl" />
            </Box>
            <VStack space={5} my={2} flex={2} justifyContent={'center'}>
              <Skeleton.Text />
            </VStack>
          </HStack>
          <VStack space={5}>
            <Skeleton h={6} w={width * 0.3} rounded={'full'} />
            <Skeleton h={40} rounded={'xl'} />
            <Skeleton h={6} w={width * 0.3} rounded={'full'} />
            <Skeleton h={40} rounded={'xl'} />
            <Skeleton rounded="md" startColor="primary.100" />
          </VStack>
        </VStack>
      ) : (
        <ScrollView>
          <VStack space={5} h="10%" my={1} alignItems={'center'}>
            <HStack
              w={width * 0.95}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              bgColor={'white'}
              space={3}
              px={5}
              shadow={5}>
              <Box borderRadius={10} overflow="hidden">
                <Image
                  size="md"
                  h={'100%'}
                  source={{uri: data.Info.proposer.avatar}}
                  alt="img"
                />
              </Box>
              <VStack space={2} mx="6" py="5">
                <Heading size="sm" color={'muted.600'}>
                  {data.Info.proposer.username}
                </Heading>
                <Text color="muted.400">部门: {data.Info.proposer.deptId}</Text>
                <Text color="muted.400">
                  联系方式: {data.Info.proposer.phoneNum}
                </Text>
              </VStack>
            </HStack>

            <VStack
              w={width * 0.95}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              bgColor={'white'}
              shadow={5}
              space={1}
              px={5}
              py={2}>
              <Heading size={'md'}>审批详情</Heading>

              <Text italic>审批人:</Text>
              <Text color="muted.400">{leader.username}</Text>

              <Text italic>审批意见:</Text>
              <Text color="muted.400">{data.approvalDetail.reason}</Text>

              <Text italic>审批时间:</Text>
              <Text color="muted.400">{data.approvalDetail.updateTime}</Text>

              <Text italic>审批结果:</Text>
              <Badge
                colorScheme={
                  data.approvalDetail.approvalResult === 0
                    ? 'success'
                    : data.approvalDetail.approvalResult === 1
                    ? 'danger'
                    : 'coolGray'
                }
                size={'md'}>
                {data.approvalDetail.approvalResult === 0
                  ? '申请通过'
                  : data.approvalDetail.approvalResult === 1
                  ? '申请驳回'
                  : '待审批'}
              </Badge>

              <Text italic>申诉电话:</Text>
              <Text color="muted.400">{leader.phoneNum}</Text>
            </VStack>
            <VStack
              w={width * 0.95}
              borderWidth={1}
              borderRadius={10}
              borderColor={'muted.300'}
              bgColor={'white'}
              space={1}
              px={5}
              py={2}
              shadow={5}>
              <Heading size={'md'}>申请详情</Heading>
              <Text italic>申请类型:</Text>
              <Text color="muted.400">
                {route.params.applicationType === 'leave'
                  ? type[data.Info.leaveType]
                  : route.params.applicationType}
              </Text>
              <Text italic>申请原因:</Text>
              <Text color="muted.400">{data.Info.reason}</Text>
              <Text italic>申请时间:</Text>
              <Text color="muted.400">{data.Info.createTime}</Text>
            </VStack>
          </VStack>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  leftPart: {},
});
