/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import action from '../action';
import {
  ScrollView,
  Pressable,
  Avatar,
  HStack,
  Box,
  NativeBaseProvider,
  Text,
  VStack,
  Icon,
  Spacer,
  theme,
  Button,
  TextArea,
  Input,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from '../navigator/NavigationUtil';
const height = Dimensions.get('window').height;
function MyPage(props) {
  const {
    theme,
    info: {avatar},
  } = props;
  return (
    <NativeBaseProvider>
      <VStack flex={1} bg={'muted.200'} space={3}>
        <Pressable
          h={'20%'}
          bg={'white'}
          onPress={() => {
            NavigationUtil.goPage({}, 'personPage');
          }}>
          {({isHovered, isFocused, isPressed}) => {
            return (
              <HStack
                w="100%"
                h="100%"
                space={2}
                alignItems={'center'}
                justifyContent={'space-between'}
                bg={
                  isPressed ? 'muted.300' : isHovered ? 'muted.300' : 'white'
                }>
                <HStack space={3} marginLeft={'10%'}>
                  <Avatar
                    source={{
                      uri: avatar,
                    }}
                    size={'lg'}
                  />
                  <VStack space={3}>
                    <Text fontSize={18} bold>
                      {props.info.username}
                    </Text>
                    <Text fontSize={12} color={'gray.400'}>
                      手机号: {props.info.phoneNum}
                    </Text>
                  </VStack>
                </HStack>
                <Box marginRight={'5%'}>
                  <Icon
                    as={FontAwesome}
                    name="angle-right"
                    size={5}
                    color={'muted.400'}
                  />
                </Box>
              </HStack>
            );
          }}
        </Pressable>
        <Pressable h="10%" bg="white" onPress={() => console.log('2')}>
          {({isHovered, isFocused, isPressed}) => {
            return (
              <HStack
                alignItems={'center'}
                h="100%"
                justifyContent={'space-between'}
                bg={
                  isPressed ? 'muted.300' : isHovered ? 'muted.300' : 'white'
                }>
                <HStack space={3} marginLeft={7} alignItems={'center'}>
                  <Icon
                    as={FontAwesome}
                    name="sign-out"
                    size={5}
                    color={'success.500'}></Icon>
                  <Text fontSize={16}>登出</Text>
                </HStack>

                <Box marginRight={'5%'}>
                  <Icon
                    as={FontAwesome}
                    name="angle-right"
                    size={5}
                    color={'muted.400'}
                  />
                </Box>
              </HStack>
            );
          }}
        </Pressable>
        <VStack bg={theme}>
          <Pressable
            h={height * 0.1}
            bg="white"
            onPress={() => NavigationUtil.goPage({}, 'StandardPage')}>
            {({isHovered, isFocused, isPressed}) => {
              return (
                <HStack
                  alignItems={'center'}
                  h="100%"
                  justifyContent={'space-between'}
                  bg={
                    isPressed ? 'muted.300' : isHovered ? 'muted.300' : 'white'
                  }>
                  <HStack space={3} marginLeft={7} alignItems={'center'}>
                    <Icon
                      as={FontAwesome}
                      name="map-marker"
                      size={5}
                      color={'warning.500'}></Icon>
                    <Text fontSize={16}>打卡标准</Text>
                  </HStack>

                  <Box marginRight={'5%'}>
                    <Icon
                      as={FontAwesome}
                      name="angle-right"
                      size={5}
                      color={'muted.400'}
                    />
                  </Box>
                </HStack>
              );
            }}
          </Pressable>
          <Box bg="muted.100" h={0.5} w={'90%'} alignSelf={'flex-end'} />
          <Pressable
            h={height * 0.1}
            bg="white"
            onPress={() => console.log('4')}>
            {({isHovered, isFocused, isPressed}) => {
              return (
                <HStack
                  alignItems={'center'}
                  h="100%"
                  justifyContent={'space-between'}
                  bg={
                    isPressed ? 'muted.300' : isHovered ? 'muted.300' : 'white'
                  }>
                  <HStack space={3} marginLeft={7} alignItems={'center'}>
                    <Icon
                      as={FontAwesome}
                      name="gear"
                      size={5}
                      color={'info.500'}></Icon>
                    <Text fontSize={16}>设置</Text>
                  </HStack>

                  <Box marginRight={'5%'}>
                    <Icon
                      as={FontAwesome}
                      name="angle-right"
                      size={5}
                      color={'muted.400'}
                    />
                  </Box>
                </HStack>
              );
            }}
          </Pressable>
        </VStack>
      </VStack>
      <Input />
      <Button onPress={() => props.onThemeChange('primary.400')}>
        改变主题
      </Button>
    </NativeBaseProvider>
  );
}
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(action.onThemeChange(theme)),
});
export default connect(mapStateProps, mapDispatchToProps)(MyPage);

function onClick(menu) {
  // ToastAndroid.show(`${menu.name}`, ToastAndroid.LONG);
}
