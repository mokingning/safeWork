/* eslint-disable prettier/prettier */
import {useRef, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  NativeBaseProvider,
  VStack,
  HStack,
  Center,
  Text,
  Heading,
} from 'native-base';
import Pdf from 'react-native-pdf';
import VideoPlayer from 'react-native-video-controls';
import NavigationBar from 'react-native-navbar-plus';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');
export default function NoticeDetail(props) {
  const webView = useRef(null);
  const [webState, setState] = useState({});

  let navigationBar = (
    <NavigationBar
      title={'公告'}
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
    <View style={styles.container}>
      {navigationBar}
      <WebView
        ref={webView}
        bounces={false}
        scalesPageToFit={true}
        startInLoadingState={true}
        onNavigationStateChange={e => onNavigationStateChange(e)}
        // source={{uri: 'https://shq5785.blog.csdn.net/'}}
        source={{html: `${props.route.params.content}`}}
        style={{width: deviceWidth, height: deviceHeight}}></WebView>
      {/* <Pdf
        source={{
          uri: 'https://laboradmin.oss-cn-beijing.aliyuncs.com/file/2023/05/08fb17de1d076a47b99a41053d8b88312bfile_1683514772915.pdf',
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
    </View>
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
});
