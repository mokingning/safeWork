/* eslint-disable prettier/prettier */
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Badge} from 'native-base';
const type = ['出勤', '缺勤', '迟到', '早退', '时长短', '请假'];
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
function CheckItem(props) {
  return (
    <TouchableOpacity style={styles.cellContainer} onPress={props.goDetail}>
      <View style={styles.leftPart}>
        <Text style={styles.title}>{`${props.createTime}`.split(' ')[0]}</Text>
        <Text style={styles.time}>
          原因:{props.des === null ? '今日记录暂不查看' : props.des}
        </Text>
      </View>
      <View style={styles.line} />
      <View style={styles.rightPart}>
        {props.status != 5 ? (
          props.status === 0 ? (
            <Badge
              colorScheme={'success'}
              height={33}
              width={60}
              variant={'solid'}
              borderRadius={10}>
              出勤
            </Badge>
          ) : (
            <Badge
              colorScheme={'danger'}
              height={33}
              width={60}
              variant={'solid'}
              borderRadius={10}>
              异常
            </Badge>
          )
        ) : (
          <Badge
            colorScheme={'coolGray'}
            height={33}
            width={60}
            variant={'solid'}
            borderRadius={10}>
            请假
          </Badge>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    height: height / 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginVertical: 5,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  leftPart: {justifyContent: 'center', width: width * 0.4},
  rightPart: {justifyContent: 'center', alignItems: 'center'},
  line: {
    height: height / 10,
    backgroundColor: '#e5e5e5',
    width: 0.5,
    alignItems: 'center',
  },
  time: {color: '#a3a3a3'},
  No: {color: '#ef4444', marginBottom: 3, fontSize: 20},
  Pass: {color: '#4ade80', marginBottom: 3, fontSize: 20},
  Wait: {color: '#38bdf8', marginBottom: 3, fontSize: 20},
  statusNo: {color: '#ef4444'},
  statusOk: {color: '#4ade80'},
  statusWait: {color: '#d4d4d4'},
  title: {fontSize: 18, color: 'black', marginBottom: 5},
});
export default CheckItem;
