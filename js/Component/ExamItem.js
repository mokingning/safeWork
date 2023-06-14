/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */

import {Divider} from 'native-base';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
function ExamItem(props) {
  const Point = () => {
    return (
      <View
        style={{
          backgroundColor:
            props.type === 'allPage'
              ? props.status === 1
                ? '#4ade80'
                : props.status === 0
                ? 'gray'
                : 'red'
              : props.res === 0
              ? 'red'
              : '#4ade80',
          width: 5,
          height: 5,
          borderRadius: 10,
          marginRight: 5,
        }}
      />
    );
  };

  return (
    <View style={styles.cellContainer}>
      {props.type === 'allPage' ? (
        <TouchableOpacity
          flex={1}
          style={styles.touchPart}
          onPress={props.goDetail}>
          <View style={styles.leftPart}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.time}>发布人:{props.creator}</Text>
            <View style={[styles.Row]}>
              <Point />
              <Text
                style={props.status === 1 ? styles.statusOk : styles.statusNo}>
                {props.status === 1
                  ? '已发布'
                  : props.status === 0
                  ? '未发布'
                  : '已失效'}
              </Text>
            </View>
          </View>
          <Divider orientation="vertical" mx="3" />
          <View style={styles.rightPart}>
            <Text style={styles.time}>
              发布日期:{`${props.startTime}`.split(' ')[0]}
            </Text>
            <Text style={styles.time}>
              截止日期:{`${props.endTime}`.split(' ')[0]}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.goDetail} style={styles.touchPart}>
          <View style={styles.leftPart}>
            <Text style={styles.title}>{props.examInfo.title}</Text>
            <Text style={styles.time}>
              考试时间:{`${props.endTime}`.split(' ')[0]}
            </Text>
            <View style={[styles.Row]}>
              <Point />
              <Text style={props.res === 1 ? styles.statusOk : styles.statusNo}>
                {props.res === 1 ? '合格' : '不合格'}
              </Text>
            </View>
          </View>
          <Divider orientation="vertical" mx="3" />
          <View style={styles.rightPart}>
            <Text style={styles.score}>{props.grades}分</Text>
            <Text style={styles.time}>总分:{props.examScore}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
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
    marginLeft: 10,
    marginRight: 10,
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
  touchPart: {flexDirection: 'row'},
  leftPart: {justifyContent: 'center', flex: 1},
  rightPart: {justifyContent: 'center', alignItems: 'center', flex: 1},
  Row: {flexDirection: 'row', alignItems: 'center'},
  line: {
    height: height / 10,
    backgroundColor: '#e5e5e5',
    width: 0.5,
    alignItems: 'center',
  },
  time: {color: '#a3a3a3', marginBottom: 5},
  score: {color: '#0ea5e9', marginBottom: 3, fontSize: 20},
  statusNo: {color: '#d4d4d4'},
  statusOk: {color: '#4ade80'},
  title: {fontSize: 18, color: 'black', marginBottom: 5},
});
export default ExamItem;
