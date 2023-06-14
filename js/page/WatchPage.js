/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, ToastAndroid} from 'react-native';
import PickImage from '../Component/PickImage';
import ImagePicker from 'react-native-image-crop-picker';
import {
  TextArea,
  Center,
  Button,
  Input,
  FormControl,
  VStack,
} from 'native-base';
import NavigationBar from 'react-native-navbar-plus';
import {connect} from 'react-redux';
import Canvas, {
  Image as CanvasImage,
  Path2D,
  ImageData,
} from 'react-native-canvas';
import _ from 'lodash';
import UnsafeDao from '../expand/dao/UnsafeDao';
import LoadingTag from '../Component/LoadingTag';
import ViewUtil from '../util/ViewUtil';
const width = Dimensions.get('window').width;

function WatchPage(props) {
  const imageList = useRef([]);
  const imageCompo = useRef(null);
  const phoneNumRef = useRef(null);
  const descRef = useRef(null);
  const [postData, setPostData] = useState([]);
  const [allText, setText] = useState({});
  const ref = useRef(null); //Canvas的ref
  const [isOpenModal, setOpenModal] = useState(false);

  const handleChange = (newText, id) => {
    if (id === 0) {
      setText({...allText, phoneNum: newText});
    } else {
      setText({...allText, content: newText});
    }
  };
  const clear = () => {
    console.log('执行清空');
    setText({content: '', phoneNum: ''});
    setPostData([]);
    imageCompo.current.clean();
  };
  const cleanPostData = path => {
    _.remove(postData, function (n) {
      return n.path == path;
    });
  }; //用于清除子组件中的数据,x号运行

  const pickVideo = videoList => {
    // imageList.current = [...videoList];
    // console.log(imageList);
    if (videoList.length !== 0) {
      videoList.forEach(element => {
        // console.log(element);
        if (element.size / 1048576 >= 5) {
          console.log('开始遍历压缩');
          ref.current.width = element.width / 10;
          ref.current.height = element.height / 10;
          const ctx = ref.current.getContext('2d');
          const image = new CanvasImage(ref.current);
          image.src = `data:${element.mime};base64,${element.data}`;
          ctx.drawImage(image, 0, 0, ref.current.width, ref.current.height);
          ref.current
            .toDataURL('image/jpeg', 0.3)
            .then(res => {
              setPostData([...postData, {data: res}]);
              imageList.current = [...imageList.current, {data: res}];
              // console.log(`ref中的值${imageList.current} `);
              // console.log(`state中的值${postData}`);
              // console.log(`压缩后的值${res}`);
            })
            .catch(e => {
              console.loe(e);
            });
          // });
        } else {
          // setPostData([...postData, element.data]);
          setPostData([
            ...postData,
            {
              data: `data:${element.mime};base64,${element.data}`, //path是为了删除而增加，上传时会删除
              path: element.path,
            },
          ]);
          imageList.current = [
            ...postData,
            {
              data: `data:${element.mime};base64,${element.data}`,
              path: element.path,
            },
          ];
          console.log(imageList.current);
        }
      });
    }
  };

  let statusBar = {
    backgroundColor: 'black',
    barStyle: 'light-content',
  };
  let navigationBar = (
    <NavigationBar
      title={'安全上传'}
      statusBar={statusBar}
      rightButton={ViewUtil.getCameraButton(() => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          includeBase64: true,
        }).then(image => {
          console.log(image);
          imageCompo.current.reset([image]);
        });
      })}
      style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
    />
  );

  const submmit = () => {
    setOpenModal(true);
    UnsafeDao.getInstance()
      .uploadInfo({
        ...allText,
        datas: [...postData],
        safetyId: props.info.id,
      })
      .then(res => {
        setOpenModal(false);
        clear();
        console.log(JSON.stringify(res));
        ToastAndroid.show('提交成功', ToastAndroid.SHORT);
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
  };

  useEffect(() => {
    console.log('我确实进去了一下');
  });

  return (
    <View style={styles.root}>
      {navigationBar}
      <LoadingTag isOpen={isOpenModal} />
      <VStack alignItems="center" marginX={5}>
        <FormControl isRequired>
          <FormControl.Label>手机号</FormControl.Label>
          <Input
            ref={phoneNumRef}
            placeholder="手机号"
            value={allText.phoneNum}
            onChangeText={newText => handleChange(newText, 0)}
          />
          <FormControl.Label>具体描述</FormControl.Label>
          <TextArea
            ref={descRef}
            placeholder="你发现了哪些安全隐患呢"
            h={150}
            value={allText.content}
            onChangeText={newText => handleChange(newText, 1)}
          />
        </FormControl>
      </VStack>
      <PickImage
        callBackVideo={pickVideo}
        cleanPostData={cleanPostData}
        style={{marginTop: 20, marginLeft: 15, marginRight: 15}}
        ref={imageCompo}
      />
      <Center>
        <Button
          bgColor="#2196f3"
          _text={{fontSize: 15}}
          width={width * 0.9}
          height={10}
          style={{marginBottom: 20}}
          onPress={() => {
            submmit();
          }}>
          提交
        </Button>
        <Button
          bgColor="#2196f3"
          _text={{fontSize: 15}}
          width={width * 0.9}
          height={10}
          style={{marginBottom: 20}}
          onPress={() => {
            clear();
          }}>
          清空
        </Button>
      </Center>
      <Canvas style={styles.hidden} ref={ref} />
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    fontSize: 15,
    color: 'black',
  },
  hidden: {
    display: 'none',
  },
});

const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
export default connect(mapStateProps)(WatchPage);
