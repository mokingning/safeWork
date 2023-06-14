/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import {
  HStack,
  VStack,
  Text,
  NativeBaseProvider,
  Alert,
  Heading,
  Box,
  Button,
} from 'native-base';
import {Dimensions} from 'react-native';
import NavigationUtil from '../../navigator/NavigationUtil';
import {connect} from 'react-redux';
import action from '../../action';
const {width, height} = Dimensions.get('window');
function Result(props) {
  return (
    <NativeBaseProvider>
      <HStack justifyContent={'center'} w={width} h={height}>
        <Alert w="90%" status="success" variant={'outline-light'}>
          <VStack space={1} flexShrink={1} w="100%" alignItems="center">
            <VStack alignItems="center" mt={10}>
              <Alert.Icon size="5xl" />
              <Heading size="md">提交成功</Heading>
            </VStack>
            <VStack mt={height * 0.1}>
              <Heading size="sm">得分情况</Heading>
              <HStack>
                <Text fontSize={'2xl'}>
                  {props.route.params.data.grades}/
                  {props.route.params.data.examScore}
                </Text>
              </HStack>
            </VStack>
            <VStack mt={height * 0.1} mb={height * 0.3}>
              <Heading size="sm">考试结果</Heading>
              <HStack>
                <Text fontSize={'2xl'}>{props.route.params.data.des}</Text>
              </HStack>
            </VStack>
            <Button
              bgColor={'muted.200'}
              _text={{color: 'green.600'}}
              variant={'outline'}
              width={width * 0.5}
              onPress={
                // () => props.navigation.goBack(`${props.route.params.key}`)
                () => {
                  props.getEmptyExam({phoneNumber: props.info.phoneNum});
                  NavigationUtil.goPage({}, 'ExamPage');
                }
              }>
              完成
            </Button>
          </VStack>
        </Alert>
      </HStack>
    </NativeBaseProvider>
  );
}
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
const mapDispatch = dispatch => ({
  getEmptyExam: userId => dispatch(action.getEmptyExam(userId)),
});
export default connect(mapStateProps, mapDispatch)(Result);
