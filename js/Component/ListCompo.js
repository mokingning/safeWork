/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StudyDao from '../expand/dao/StudyDao';
const height = Dimensions.get('window').height;
function ListCompo(props) {
  const {title, content, createTime, creator, goDetail} = props;
  const goPage = () => {
    goDetail();
    // StudyDao.getInstance()
    //   .addStudyUser({
    //     studyId: props.id,
    //     userId: props.userId,
    //   })
    //   .then(res => console.log('增加记录成功'))
    //   .catch(e => {
    //     console.log(JSON.stringify(e));
    //   });
  };
  return (
    <TouchableOpacity onPress={goPage}>
      <View style={styles.container}>
        <View style={styles.word}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>发起人:{creator.username}</Text>
          <Text style={styles.time}>{createTime}</Text>
          <Text></Text>
          {/* time title  creator*/}
        </View>
        <View style={styles.right}>
          {/* <Image
            style={styles.image}
            source={{
              uri: 'https://img-qn.51miz.com/preview/element/00/01/12/27/E-1122748-52A7F55E.jpg',
            }}
          /> */}
          <Text style={styles.desc}>点击查看详情</Text>
          <AntDesign name="right" size={20} color={'#a3a3a3'} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height / 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  word: {justifyContent: 'space-around', height: height / 8},
  title: {fontSize: 20, color: '#262626'},
  desc: {fontSize: 12, color: '#737373'},
  time: {fontSize: 10, color: '#a3a3a3'},
  right: {flexDirection: 'row', alignItems: 'center'},
});

export default ListCompo;
