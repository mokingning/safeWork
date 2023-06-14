/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import StudyDao from '../expand/dao/StudyDao';
const height = Dimensions.get('window').height;
function UnSafeCompo(props) {
  const desc = String(props.content).slice(0, 7) + '......';
  var {imgUrl, goDetail, type} = props;
  if (props.coverUrl !== undefined) {
    imgUrl = props.coverUrl;
  }
  const image = String(imgUrl).split(';');
  const goPage = () => {
    goDetail();
    if (type === 'study') {
      StudyDao.getInstance()
        .addStudyUser({
          studyId: props.id,
          userId: props.userId,
        })
        .then(res => console.log('增加记录成功'))
        .catch(e => {
          console.log(JSON.stringify(e));
        });
    }
  };
  return (
    <TouchableOpacity onPress={goPage}>
      <View style={styles.container}>
        <View style={styles.word}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.desc}>{desc}</Text>
          <Text style={styles.time}>{`${props.createTime}`.split(' ')[0]}</Text>
          <Text></Text>
          {/* time title  creator*/}
        </View>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: image[0],
            }}
          />
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
  image: {borderRadius: 2, height: 70, width: 100},
});

export default UnSafeCompo;
