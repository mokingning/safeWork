/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {
  VStack,
  HStack,
  Text,
  Heading,
  NativeBaseProvider,
  Center,
  Image,
  ScrollView,
} from 'native-base';
import {Dimensions, TouchableOpacity} from 'react-native';
import {getYMD} from '../../util/MathUtil';
import NavigationUtil from '../../navigator/NavigationUtil';
import ViewUtil from '../../util/ViewUtil';
import NavigationBar from 'react-native-navbar-plus';
import GetViewer from '../Test/GetViwer';
import {useState} from 'react';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function UnsafeDetail({route, navigation}) {
  const {title, laborId, safer, createTime, content, imgUrl, labor} =
    route.params;
  const time = String(createTime).split(' ');
  const ymd = time[0].split('-');
  const urls = String(imgUrl).split(';');
  const nowDay = getYMD(new Date());
  const [showImage, setShow] = useState(false);
  let navigationBar = (
    <NavigationBar
      title={'安全监管公告'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        NavigationUtil.goBack(navigation);
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );
  return (
    <NativeBaseProvider>
      {navigationBar}
      <VStack bgColor={'white'}>
        <ScrollView fillViewport="true">
          <Center mb={5}>
            <Text fontSize={'sm'} color={'muted.400'}>
              {`${nowDay}`}
            </Text>
          </Center>
          <VStack marginX={5} space={7} marginBottom={10}>
            <Center>
              <Heading>{title}</Heading>
            </Center>
            <Text color={'muted.400'}>来源: 实名制管理系统（移动平台）</Text>
            <Text fontSize={'lg'}>安全员{`${ymd[1]}月${ymd[2]}日发`}</Text>
            <Text fontSize={'md'}>{content}</Text>
            {/* {Object.entries(urls).map(item => {
            return (
              <Image
                key={`${item[0]}`}
                size="xl"
                alt={`${item[0]}`}
                source={{
                  uri: `${item[1]}`,
                }}
              />
            );
          })} */}
            <VStack space={5} alignItems={'center'} pb={5}>
              <Image
                size="2xl"
                alt={'图片'}
                source={{
                  uri: 'https://img.zcool.cn/community/018e4d5a59b979a8012113c7eec68d.jpg@1280w_1l_2o_100sh.jpg',
                }}
              />
              <Image
                size="2xl"
                alt={'图片'}
                source={{
                  uri: 'https://ts1.cn.mm.bing.net/th/id/R-C.e59aa3b2703bd18a7b4496d83869956e?rik=GPIw7u8bXt4K0A&riu=http%3a%2f%2fcn.melyy.com%2ffile%2fupload%2f201103%2f24%2f14-31-03-99-190.jpg&ehk=KbY4hPUpBhTxtcic0olOE%2bl5fRpfqpNIcIxqYY6gOMI%3d&risl=&pid=ImgRaw&r=0',
                }}
              />
              <Text>{}</Text>
              {Object.entries(urls).map(item => {
                console.log(JSON.stringify(item));
                return (
                  <TouchableOpacity
                    key={item[0] + Math.random()}
                    onPress={() => {
                      setShow(true);
                    }}>
                    <Image size="2xl" alt={'图片'} source={{uri: item[1]}} />
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                onPress={() => {
                  setShow(true);
                }}>
                <Image size="2xl" alt={'图片'} source={{uri: urls[0]}} />
              </TouchableOpacity> */}
              {showImage ? (
                <GetViewer
                  data={urls}
                  type={'safe'}
                  Close={() => setShow(false)}
                />
              ) : null}
            </VStack>
            <VStack mb={10}>
              <VStack
                w={width * 0.95}
                borderWidth={1}
                borderRadius={10}
                borderColor={'muted.300'}
                px={5}
                py={2}
                my={1}
                bgColor={'white'}
                alignSelf={'center'}>
                <Text fontSize={'md'}>用工不安全典型人员:</Text>
                <Text fonSize={'md'}>工号:{labor.id}</Text>
              </VStack>

              <Text color={'muted.400'}>上传人: {safer.username}</Text>
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </NativeBaseProvider>
  );
}
