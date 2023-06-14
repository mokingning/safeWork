/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {useRef, useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {NativeBaseProvider, VStack, Image} from 'native-base';
import Pdf from 'react-native-pdf';
import VideoPlayer from 'react-native-video-controls';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
export default function StudyDetail(props) {
  const webView = useRef(null);
  const [webState, setState] = useState({});
  const url = props.route.params.fileUrl;
  let navigationBar = (
    <NavigationBar
      title={'学习'}
      leftButton={ViewUtil.getLeftBackButton(() => {
        onBack();
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );

  function onNavigationStateChange(navState) {
    setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
  }

  const onBack = () => {
    if (webState.canGoBack) {
      webView.current.goBack();
    } else {
      NavigationUtil.goBack(props.navigation);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {navigationBar}
        <Text style={styles.title}>{props.route.params.title}</Text>
        {props.route.params.type === 0 ? (
          <Pdf
            source={{
              uri: `${url}`,
              cache: true,
            }}
            trustAllCerts={false}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        ) : props.route.params.type === 1 ? (
          <VideoPlayer
            disableBack={true}
            paused={true}
            source={{
              uri: url,
            }}
          />
        ) : (
          <View>
            <Text style={styles.content}>{props.route.params.content}</Text>
            <View style={styles.imageView}>
              <Image
                alt="图片"
                style={styles.image}
                size={'lg'}
                source={{
                  uri: `${url}`,
                }}
              />
            </View>
          </View>
        )}
        {/* <Pdf
        source={{
          uri: `${props.route.params.fileUrl}`,
          cache: true,
        }}
        trustAllCerts={false}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      /> */}
        {/* <VideoPlayer
        source={{
          uri: 'https://laboradmin.oss-cn-beijing.aliyuncs.com/file/2023/05/08f839783484f1409998af3536b87995f6file_1683478317853.mp4',
        }}
      /> */}
        <View style={styles.footer}>
          <Text style={styles.desc}>
            编辑人:{props.route.params.creator.username}
          </Text>
          <Text style={styles.desc}>
            编辑时间:{`${props.route.params.createTime}`.split(' ')[0]}
          </Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    width: deviceWidth,
    height: deviceHeight,
  },
  imageView: {
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingLeft: 10,
    color: '#171717',
    fontSize: 16,
  },
  title: {
    color: '#171717',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  desc: {fontSize: 12, color: '#737373'},
  footer: {
    marginTop: 15,
    marginHorizontal: 10,
    paddingLeft: 10,
    borderTopColor: '#737373',
    borderTopWidth: 1,
  },
});
