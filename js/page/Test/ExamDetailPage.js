/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
import {useEffect} from 'react';
import {
  NativeBaseProvider,
  ScrollView,
  Text,
  Box,
  Button,
  Center,
  VStack,
  Skeleton,
  HStack,
} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import QuetionItem from '../../Component/QuetionItem';
import React, {useState, useRef} from 'react';
import ExamDao from '../../expand/dao/ExamDao';
import {connect} from 'react-redux';
import {Props} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import NavigationUtil from '../../navigator/NavigationUtil';
const width = Dimensions.get('window').width;
const choose_data = [
  {
    title_num: '1',
    id: 1,
    key: '1',
    title: '请选择您心目中的“职业形象达 人”',
    title_type: 1,
    choose_list: [
      {
        id: 1,
        key: '1-1',
        letter: 'A',
        content: '安全部-特勤-张XX',
      },
      {
        id: 2,
        key: '1-2',
        letter: 'B',
        content: '安全部-特勤-赵XX',
      },
    ],
  },
  {
    title_num: '2',
    id: 2,
    key: '2',
    title: '有安全意识的是',
    title_type: 1,
    choose_list: [
      {
        id: 1,
        key: '1-1',
        letter: 'A',
        content: '我是选择一',
      },
      {
        id: 2,
        key: '1-2',
        letter: 'B',
        content: '我是选择2',
      },
    ],
  },
  {
    title_num: '3',
    id: 3,
    title: '您的性别',
    choose_list: [
      {
        id: 1,
        content: '男',
      },
      {
        id: 2,
        content: '女',
      },
    ],
  },
  {
    title_num: '4',
    id: 4,
    title: '爱好4',
    choose_list: [
      {
        id: 1,
        content: '男',
      },
      {
        id: 2,
        content: '女',
      },
    ],
  },
  {
    title_num: '5',
    id: 5,
    title: '专业5',
    choose_list: [
      {
        id: 1,
        content: '男',
      },
      {
        id: 2,
        content: '女',
      },
    ],
  },
  {
    title_num: '6',
    id: 6,
    title: '恋人6',
    choose_list: [
      {
        id: 1,
        content: '男',
      },
      {
        id: 2,
        content: '女',
      },
    ],
  },
  {
    title_num: '7',
    id: 7,
    title: '朋友7',
    choose_list: [
      {
        id: 1,
        content: '男',
      },
      {
        id: 2,
        content: '女',
      },
    ],
  },
];
//   answer: [], //存储选择的答案（以数组包裹对象的方式来存储）

function ExamDetailPage(props) {
  const [answer, setAnswer] = useState([]);
  const [examInfo, setInfo] = useState({isLoading: true});
  const real = useRef([]);
  const {route} = props;
  useEffect(() => {
    ExamDao.getInstance()
      .getExamInfo(route.params.examId)
      .then(res => {
        console.log(JSON.stringify(res));
        setInfo({...res, isLoading: false});
        // console.log(JSON.stringify(res));
      });
  }, []);
  function vlueSet(title_id, oneAnswer) {
    // console.log(`触发获取函数`);
    // debugger;
    const newAn = {examQuestionId: title_id, userAnswer: oneAnswer};
    var nowAn = real.current;
    if (nowAn.length !== 0) {
      nowAn.map(item => {
        // console.log('开始遍历');
        console.log(item);
        if (item.id === title_id) {
          nowAn.splice(nowAn.indexOf(item), 1);
          // console.log(`删除了${item.id}`);
          // nowAn.solice(nowAn.indexof(item),0,newAn);
        }
      });
    }
    nowAn = nowAn.concat(newAn);
    real.current = nowAn;
    console.log(real.current);
    setAnswer(nowAn);
  }

  function submit() {
    ExamDao.getInstance()
      .submitExam({
        userAnswerList: real.current,
        examId: route.params.examId,
        userId: props.info.id,
      })
      .then(res => {
        console.log(JSON.stringify(res));
        NavigationUtil.goPage(
          {
            data: res,
          },
          'ExamResult',
        );
      })
      .catch(error => {});
  }

  return (
    <NativeBaseProvider>
      {examInfo.isLoading ? (
        <VStack mx={5} my={5} space={3}>
          <Skeleton h={10} rounded={'lg'} />
          <VStack space={5}>
            <Skeleton h={5} w={width * 0.5} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton
              h={5}
              w={width * 0.5}
              rounded={'lg'}
              startColor={'indigo.200'}
            />
            <HStack alignItems={'center'} space={2}>
              <Skeleton size="3" rounded="full" />
              <Skeleton h={3} rounded={'lg'} startColor="indigo.200" />
            </HStack>
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton h={5} w={width * 0.5} rounded={'lg'} />
            <HStack alignItems={'center'} space={2}>
              <Skeleton size="3" rounded="full" startColor="amber.300" />
              <Skeleton h={3} rounded={'lg'} />
            </HStack>
            <Skeleton h={3} rounded={'lg'} />
            <Skeleton h={3} rounded={'lg'} />
          </VStack>
          <VStack space={5}>
            <Skeleton h={5} w={width * 0.5} rounded={'lg'} />
            <Skeleton.Text lines={4} />
            <Skeleton
              h={10}
              px={width * 0.1}
              rounded={'full'}
              startColor="indigo.200"
            />
          </VStack>
        </VStack>
      ) : (
        <ScrollView>
          <Box backgroundColor={'white'}>
            <Box style={styles.questionTitle}>
              <Text fontSize="2xl" color={'info.500'}>
                {examInfo.title}
              </Text>
            </Box>
            <VStack>
              {Object.entries(examInfo.questions).map(item => {
                // console.log(`--${JSON.stringify(item)}--`);
                //   console.log(`++${JSON.stringify(item[1])}++`);
                // console.log(item[1].sysQuestionItemList);
                return (
                  <QuetionItem
                    {...item[1]}
                    title_num={parseInt(item[0]) + 1}
                    key={item[0]}
                    getValue={vlueSet.bind(this)}
                  />
                );
              })}
            </VStack>
            <Center>
              <Button
                colorScheme="lightBlue"
                _text={{fontSize: 15}}
                width={width * 0.9}
                height={10}
                style={{marginBottom: 20}}
                onPress={() => {
                  submit();
                }}>
                提交
              </Button>
            </Center>

            {/* <Text stylr={styles.font}>{JSON.stringify(real.current)}hello</Text>*/}
          </Box>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  questionTitle: {
    alignItems: 'center',
    marginVertical: 35,
  },
});
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
export default connect(mapStateProps)(ExamDetailPage);
