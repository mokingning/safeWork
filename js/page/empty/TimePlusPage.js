/* eslint-disable prettier/prettier */
import React, {useRef, useState, useEffect} from 'react';
import {
  VStack,
  NativeBaseProvider,
  FormControl,
  Input,
  TextArea,
  ScrollView,
  Button,
  IconButton,
  WarningOutlineIcon,
} from 'native-base';
import {KeyboardAvoidingView, ToastAndroid} from 'react-native';
import flowDao from '../../expand/dao/flowDao';
import dayjs from 'dayjs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getYMD} from '../../util/MathUtil';
import {connect} from 'react-redux';
import LoadingTag from '../../Component/LoadingTag';
import NavigationUtil from '../../navigator/NavigationUtil';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../../util/ViewUtil';
function TimePlusPage(props) {
  // 用于组件中date的显示
  const [isDateShow, setIsDateShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const [datetText, setText] = useState('');
  const [formData, setData] = useState({
    leaderId: '04d903524bdc4ed89962c56a6c9bcc97',
    userId: props.info.id,
  });
  const [isOpenModal, setOpenModal] = useState(false);

  const dateChange = (event, selectDate) => {
    setIsDateShow(false);
    if (event.type !== 'set') {
      return;
    }
    console.log(selectDate);
    setDateTime(selectDate);
    setData({
      ...formData,
      workDate: dayjs(selectDate).format('YYYY-MM-DD HH:mm:ss'),
    });
    setText(getYMD(dateTime));
  };
  useEffect(() => {
    console.log('刷新');
    console.log(dateTime);
  }, [dateTime]);

  const validate = () => {
    var status = true;
    if (formData.workDuration === undefined || formData.workDuration === '') {
      setErrors({...errors, duration: 'workDuration null'});
      status = false;
    }
    return status;
  };
  const submit = () => {
    setOpenModal(true);
    validate()
      ? flowDao
          .getInstance()
          .flowWorkTime(formData)
          .then(res => {
            setOpenModal(false);
            console.log(`请假返回的结果为:${res}`);
            NavigationUtil.goBack(props.navigation);
            ToastAndroid.show('提交成功!', ToastAndroid.SHORT);
          })
          .catch(e => {
            setOpenModal(false);
            ToastAndroid.show('系统繁忙，请稍后再试!', ToastAndroid.SHORT);
            const {code, data = {}, msg} = e;
            console.log(msg);
          })
      : setOpenModal(false);
  };
  let navigationBar = (
    <NavigationBar
      title={'工时补充'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  return (
    <NativeBaseProvider>
      {navigationBar}
      <LoadingTag isOpen={isOpenModal} />
      <ScrollView>
        <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={10}>
          <VStack space={5} alignItems={'center'} marginTop={15}>
            <FormControl isReadOnly w="75%">
              <FormControl.Label>姓名</FormControl.Label>
              <Input value={props.info.username} />
              <FormControl.Label>手机号</FormControl.Label>
              <Input value={props.info.phoneNum} />
            </FormControl>
            <FormControl isRequired w="75%" isInvalid={'duration' in errors}>
              <FormControl.Label>请选择时间</FormControl.Label>
              <VStack space={4}>
                <IconButton
                  colorScheme="indigo"
                  variant="solid"
                  onPress={() => {
                    setIsDateShow(true);
                  }}
                  _icon={{
                    as: AntDesign,
                    name: 'calendar',
                  }}
                />
                {/* <Text>选择了:{dateTime.toLocaleString()}</Text> */}
                {isDateShow && (
                  <DateTimePicker value={dateTime} onChange={dateChange} />
                )}
                <Input
                  placeholder="请选择您要补充的当日工时"
                  value={datetText}
                  isReadOnly
                />
              </VStack>
              <FormControl.Label>申请工时</FormControl.Label>
              {'duration' in errors ? (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  请输入数字！
                </FormControl.ErrorMessage>
              ) : null}
              <Input
                placeholder="请输入您要申请的工时数"
                keyboardType={'numeric'}
                onChangeText={val => {
                  const text = Number.isNaN(Number(val));
                  if (text) {
                  } else {
                    setData({...formData, workDuration: parseFloat(val)});
                  }
                }}
              />
              <FormControl.Label>具体描述</FormControl.Label>
              <TextArea
                onChangeText={text => {
                  setData({...formData, reason: text});
                }}
              />
            </FormControl>
            <Button w="75%" bgColor={'#2196f3'} onPress={() => submit()}>
              提交申请
            </Button>
          </VStack>
        </KeyboardAvoidingView>
      </ScrollView>
    </NativeBaseProvider>
  );
}
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});

export default connect(mapStateProps)(TimePlusPage);
