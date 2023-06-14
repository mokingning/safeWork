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
  Select,
  Text,
} from 'native-base';
import {connect} from 'react-redux';
import flowDao from '../expand/dao/flowDao';
import LoadingTag from '../Component/LoadingTag';
import {AlerTag} from '../Component/AlertTag';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../util/ViewUtil';

function UnvicationPage(props) {
  // const [beginTime, setbeginTime] = useState(new Date());
  // const [endTime, setendTime] = useState(new Date());
  const [seconds, setSeconds] = useState(3);
  const [isOpenModal, setOpenModal] = useState(false);
  const [showGreenAlert, setGreenAlert] = useState(false);
  const [showRedAlert, setRedAlert] = useState(false);
  const latestCount = useRef(seconds);
  const startCount = useRef(false);
  const [formData, setData] = useState({
    userId: props.info.id,
    leaderId: '04d903524bdc4ed89962c56a6c9bcc97',
    reason: '按时销假',
  });
  const [selectInfo, setSelect] = useState([]);
  const {username, phoneNum} = props.info;
  // const dateChange = (event, selectedDate) => {
  //   if (event.type !== 'set') {
  //     return;
  //   }
  //   console.log(selectedDate);
  //   const currentDate = selectedDate || dateTime;
  //   console.log(currentDate);
  //   setDateTime(currentDate);
  // };
  // const getTimes = (begin, end, flag) => {
  //   if (flag === 1) {
  //     setbeginTime(begin);
  //   } else if (flag === 2) {
  //     setendTime(end);
  //   }
  // };
  // const validate = () => {
  //   submit();
  // };
  let navigationBar = (
    <NavigationBar
      title={'销假'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(props.navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
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
        setSeconds(seconds => seconds - 1);
      }
    }, 1000);
    //组件销毁时，去掉计时器
    return () => {
      startCount.current = false;
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    flowDao
      .getInstance()
      .getVicationForCancel({userId: props.info.id})
      .then(res => {
        setSelect([...res.records]);
        console.log(res);
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  }, []);
  const submit = () => {
    setOpenModal(true);
    flowDao
      .getInstance()
      .flowCancel(formData)
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
          <FormControl isRequired w="75%">
            <FormControl.Label>销假对象</FormControl.Label>
            <Select
              placeholder="请假类型"
              isReadOnly
              // isInvalid={'reason' in errors.current}
              _selectedItem={{
                bg: 'teal.600',
              }}
              mt="1"
              onValueChange={info => {
                setData({...formData, leaveId: info});
              }}>
              {selectInfo.map(item => {
                return (
                  <Select.Item
                    key={Math.random()}
                    label={`${String(item.startTime).split(' ')[0]}到${
                      String(item.endTime).split(' ')[0]
                    }`}
                    value={item.id}
                  />
                );
              })}
            </Select>
            <FormControl.Label>具体描述</FormControl.Label>
            <TextArea
              placeholder="按时销假（若无其余补充可直接提交）"
              onChangeText={text => {
                setData({...formData, reason: text});
              }}
            />
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
export default connect(mapStateProps)(UnvicationPage);
