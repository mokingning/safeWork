/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import DateTimePicker from '@react-native-community/datetimepicker';
import React, {Component, useState} from 'react';
import {View, Button, Text, IconButton} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Datep(props) {
  const [isDateShow, setIsDateShow] = useState(false);
  // 用于组件中date的显示
  const [dateTime, setDateTime] = useState(new Date());
  /**
   * 日期选择后的回调函数
   * @param {object} event 点击事件 确定/取消
   * @param selectedDate 选择后的日期
   */
  const dateChange = (event, selectedDate) => {
    setIsDateShow(false);

    if (event.type !== 'set') {
      return;
    }
    console.log(selectedDate);
    const currentDate = selectedDate || dateTime;
    if (props.status != 1) {
      const currentDateText = getYMD(currentDate);
      props.sendTo(currentDateText, props.id);
    } else {
      props.sendTo(currentDate, props.id);
    }
    setDateTime(currentDate);
  };
  // 渲染方式
  return (
    <View>
      <IconButton
        colorScheme="indigo"
        variant="solid"
        onPress={() => {
          setIsDateShow(true);
          console.log(props.id);
        }}
        _icon={{
          as: AntDesign,
          name: 'calendar',
        }}
      />
      {/* <Text>选择了:{dateTime.toLocaleString()}</Text> */}
      {isDateShow && (
        <DateTimePicker
          mode={props.status == 1 ? 'time' : 'date'}
          value={dateTime}
          onChange={dateChange}
          testID={props.id}
        />
      )}
    </View>
  );
}
// 工具函数
/**
 * 格式化日期：'YYYY-MM-DD'
 * @param {Date} date 日期对象
 */
function getYMD(date) {
  let year = date.getFullYear();
  console.log(year);
  let month = date.getMonth() + 1;
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  let day = date.getDate();
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
}
