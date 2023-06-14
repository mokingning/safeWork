/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  NativeBaseProvider,
  Input,
  VStack,
  Button,
  FormControl,
  TextArea,
  Flex,
  Select,
  WarningOutlineIcon,
  ScrollView,
  Alert,
  HStack,
  Text,
} from 'native-base';
import {TextInput, KeyboardAvoidingView} from 'react-native';
import MyDateTime from '../Component/DateTest';
import flowDao from '../expand/dao/flowDao';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import NavigationUtil from '../navigator/NavigationUtil';
import LoadingTag from '../Component/LoadingTag';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../util/ViewUtil';
import {AlerTag} from '../Component/AlertTag';
function FlowLeave(props) {
  console.log('刷新');
  // let navigationBar=<NavigationBar leftButton={ViewUtil.getLeftBackButton()}
  // title={'请假'} />

  let navigationBar = (
    <NavigationBar
      title={'请假'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  const [days, setDays] = useState(0);
  const [formData, setData] = useState({
    leaderId: '04d903524bdc4ed89962c56a6c9bcc97',
    userId: props.info.id,
  });
  const [seconds, setSeconds] = useState(3);
  const latestCount = useRef(seconds);
  const startCount = useRef(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showGreenAlert, setGreenAlert] = useState(false);
  const [showRedAlert, setRedAlert] = useState(false);
  function getDays(begin, end, day) {
    // console.log('执行顶层GetDays');
    console.log(`顶层的day=${day}`);
    const beginDay = dayjs(begin).format('YYYY-MM-DD HH:mm:ss');
    const endDay = dayjs(end).format('YYYY-MM-DD HH:mm:ss');
    setData({...formData, startTime: beginDay, endTime: endDay});
    setDays(day);
  }
  const validate = () => {
    var status = true;
    if (formData.leaveType === undefined) {
      setErrors({...errors, desc: 'leaveType null'});
      status = false;
    }

    if (formData.reason === undefined) {
      setErrors({...errors, reason: 'reason null'});
      status = false;
    }
    if (formData.days === undefined && days === 0) {
      setErrors({...errors, day: 'day null'});
      status = false;
    }
    return status;
  };
  React.useEffect(() => {
    latestCount.current = seconds; // 更新
  });
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (latestCount.current === 0) {
        // 此处判断latestCount.current，而不是count
        clearInterval(timer);
        NavigationUtil.goBack(props.navigation);
        return;
      }
      if (startCount.current === true) {
        setSeconds(c => c - 1);
      }
    }, 1000);
    //组件销毁时，去掉计时器
    return () => {
      startCount.current = false;
      clearInterval(timer);
    };
  }, []);

  const submit = () => {
    setOpenModal(true);
    validate()
      ? flowDao
          .getInstance()
          .flowLeave(formData)
          .then(res => {
            setOpenModal(false);
            console.log(`请假返回的结果为:${res}`);
            setGreenAlert(true);
            startCount.current = true;
          })
          .catch(e => {
            setOpenModal(false);
            setRedAlert(true);
            setTimeout(() => {
              setRedAlert(false);
            }, 3000);

            const {code, data = {}, msg} = e;
            console.log(msg);
          })
      : setOpenModal(false);
    console.log(JSON.stringify(errors));
  };
  return (
    <NativeBaseProvider>
      {navigationBar}
      <LoadingTag isOpen={isOpenModal} />
      {showGreenAlert ? <AlerTag status="success" seconds={seconds} /> : ''}
      {showRedAlert ? (
        <AlerTag status="error" title={`系统繁忙，请稍微再试`} />
      ) : (
        ''
      )}
      <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={10}>
        <VStack
          space={1}
          alignItems="center"
          // bg={'primary.800'}
          safeArea
          style={{marginTop: 15}}>
          <FormControl isReadOnly w="75%">
            <FormControl.Label>姓名</FormControl.Label>
            <Input placeholder="Title" value={props.info.username} />
            <FormControl.Label>手机号</FormControl.Label>
            <Input placeholder="" value={props.info.phoneNum} />
          </FormControl>
          <Flex direction="row" h="50">
            <FormControl w="75%" isRequired>
              <FormControl.Label>选择请假起止日期</FormControl.Label>
              <MyDateTime sendDays={getDays.bind(this)} status={0} />
            </FormControl>
          </Flex>
          <FormControl
            isRequired
            isInvalid={
              'reason' in errors || 'desc' in errors || 'day' in errors
            }
            w="75%"
            marginTop={'5'}>
            <FormControl.Label>请假时长</FormControl.Label>
            <Input placeholder={`${days}`} isReadOnly />
            {'day' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                请选择日期！
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
            <FormControl.Label>请假原因</FormControl.Label>
            <Select
              placeholder="请假类型"
              isReadOnly
              // isInvalid={'reason' in errors.current}
              _selectedItem={{
                bg: 'teal.600',
              }}
              mt="1"
              onValueChange={info => {
                setData({...formData, leaveType: info});
              }}>
              <Select.Item label="事假" value={1} />
              <Select.Item label="出差" value={2} />
              <Select.Item label="病假" value={3} />
              <Select.Item label="婚假" value={4} />
              <Select.Item label="孕假" value={5} />
            </Select>
            {'reason' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                请选择类型
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
            <FormControl.Label>具体描述</FormControl.Label>

            <TextArea
              h={20}
              placeholder="具体描述"
              w="100%"
              maxW="300"
              isInvalid={'desc' in errors}
              onChangeText={text => {
                setData({...formData, reason: text});
              }}
            />
            {'desc' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                请填写信息
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
          <Button w="75%" bgColor={'#2196f3'} onPress={() => submit()}>
            提交申请
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});

export default connect(mapStateProps)(FlowLeave);
