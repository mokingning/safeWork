/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {
  VStack,
  NativeBaseProvider,
  FormControl,
  Input,
  TextArea,
  ScrollView,
  Button,
  WarningOutlineIcon,
} from 'native-base';
import ViewUtil from '../util/ViewUtil';
import NavigationBar from 'react-native-navbar-plus';
import {KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import NavigationUtil from '../navigator/NavigationUtil';
import MyDateTime from '../Component/DateTest';
import {getHM, caculateTime} from '../util/MathUtil';
import flowDao from '../expand/dao/flowDao';
import LoadingTag from '../Component/LoadingTag';
import {AlerTag} from '../Component/AlertTag';

function WorkRequestPage(props) {
  const {username, phoneNum} = props.info;
  const [errors, setErrors] = useState({});
  const [seconds, setSeconds] = useState(3);
  const [isOpenModal, setOpenModal] = useState(false);
  const [showGreenAlert, setGreenAlert] = useState(false);
  const [showRedAlert, setRedAlert] = useState(false);
  const latestCount = useRef(seconds);
  const startCount = useRef(false);
  const [formData, setData] = useState({
    leaderId: '04d903524bdc4ed89962c56a6c9bcc97',
    userId: props.info.id,
  });
  const flagRef = useRef({});
  const [beginTime, setbeginTime] = useState(new Date());
  const [endTime, setendTime] = useState(new Date());
  let navigationBar = (
    <NavigationBar
      title={'加班申请'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  const getTimes = (begin, end, flag) => {
    console.log('设置Time');
    if (flag === 1) {
      console.log('设置startTime');
      setbeginTime(begin);
      const time = dayjs(begin).format('YYYY-MM-DD HH:mm:ss');
      setData({
        ...formData,
        startTime: time,
      });
      flagRef.current = {...flagRef.current, flag1: true};
    } else if (flag === 2) {
      const time = dayjs(end).format('YYYY-MM-DD HH:mm:ss');
      console.log('设置endTime');
      setendTime(end);
      setData({...formData, endTime: time});
      flagRef.current = {...flagRef.current, flag2: true};
    }
    if (flagRef.current.flag1 && flagRef.current.flag2) {
      flagRef.current = {
        ...flagRef.current,
        hour: `${caculateTime(beginTime, endTime)}`,
      };
    }
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
  const validate = () => {
    var status = true;
    // console.log(hourRef.current.getNativeRef.value);
    if (flagRef.current.hour === undefined) {
      setErrors({...errors, hour: 'hours null'});
      status = false;
    }
    if (formData.reason === undefined) {
      setErrors({...errors, reason: 'day null'});
      status = false;
    }
    if (status === true) {
      setErrors({});
    }
    return status;
  };
  const submit = () => {
    console.log('dianji ');
    validate() ? FullText() : NullText();
  };

  const FullText = () => {
    setOpenModal(true);
    flowDao
      .getInstance()
      .flowOverTime(formData)
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
      });
  };
  const NullText = () => {
    console.log('拒绝111');
    setOpenModal(false);
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
      <ScrollView>
        <VStack space={5} alignItems={'center'} marginTop={15}>
          <FormControl isReadOnly w="75%">
            <FormControl.Label>姓名</FormControl.Label>
            <Input placeholder={username} />
            <FormControl.Label>手机号</FormControl.Label>
            <Input placeholder={phoneNum} />
          </FormControl>
          <FormControl
            isRequired
            isInvalid={'reason' in errors || 'hour' in errors}
            w="75%">
            <FormControl.Label>请选择时间</FormControl.Label>
            <MyDateTime status={1} sendDays={getTimes.bind(this)} />
            {'hour' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                请选择加班时间！
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
            <FormControl.Label>加班开始时间</FormControl.Label>
            <Input isReadOnly={true} value={`${getHM(beginTime)}`} />
            <FormControl.Label>加班结束时间</FormControl.Label>
            <Input isReadOnly={true} value={`${getHM(endTime)}`} />
            <FormControl.Label>加班时长</FormControl.Label>
            <Input
              placeholder="0时0分"
              isReadOnly={true}
              value={`${caculateTime(beginTime, endTime)}`}
            />
            <FormControl.Label>具体描述</FormControl.Label>
            <TextArea
              onChangeText={text => setData({...formData, reason: text})}
            />
            {'reason' in errors ? (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                请输入加班原因！
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
          <Button w="75%" bgColor={'#2196f3'} onPress={() => submit()}>
            提交申请
          </Button>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
export default connect(mapStateProps)(WorkRequestPage);
