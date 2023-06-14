/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import _, {random} from 'lodash';
import GetViewer from '../page/Test/GetViwer';

interface Props {
  cleanPostData: any;
  callBackVideo: any;
  style: any;
}

const PickImage = forwardRef((props: Props, ref: any) => {
  const [isShowColumn, setIsShowColumn] = useState(true);
  const [videoList, setVideoList] = useState([{path: 'first'}]);
  const [videoListShow, setVideoListShow] = useState([]);
  const [isShowImageView, setIsShowImageView] = useState(false);
  const deletePath = useRef('');
  const loadData: any = [];

  const clean = () => {
    setVideoList([{path: 'first'}]);
    setVideoListShow([]);
  };

  useEffect(() => {
    console.log(JSON.stringify(videoList));
    console.log(JSON.stringify(videoListShow));
  }, [videoList, videoListShow]);

  useImperativeHandle(ref, () => {
    return {
      deletePath,
      clean,
      reset,
    };
  });
  const reset = (res: any) => {
    console.log('reset');
    let vL = [...videoList, ...res];
    // console.log(`----------videoList:${JSON.stringify(videoList)}-------`);

    // console.log(`----------res:${JSON.stringify(res)}-------`);

    // console.log(`----------VL:${JSON.stringify(vL)}-------`);
    //删除元素 https://www.cnblogs.com/yanggb/p/11464821.html
    _.remove(vL, function (n) {
      return n.path == 'first';
    });
    // console.log(`删除元素后的vL${JSON.stringify(vL)}`);
    //不知道为什么只能这样过滤
    const backList = vL.filter(item => {
      return item.path != 'first';
    });
    props.callBackVideo([...res]);

    vL.push({path: 'first'});
    // console.log(`push vL []${JSON.stringify(vL)}`);

    setVideoList(vL as []);
    // console.log(`vL as []${JSON.stringify(videoList)}`)
    setIsShowColumn(false);
  };
  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true, //允许多选，在模拟器中无法多选
      mediaType: 'photo', //仅选择照片
      includeBase64: true,
    })
      .then(res => {
        // console.log(`=========>照片数据:${JSON.stringify(res[0].data)}`);
        reset(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    //处理成方便页面渲染的数据结构
    // console.log(`vL as${JSON.stringify(videoList)}`);
    const tempArr = _.chunk(videoList, 3);
    setVideoListShow(tempArr as []);
    // console.log(`useEffect${JSON.stringify(tempArr)}`);
  }, [videoList]);

  const pickView = (index: number) => {
    return (
      <TouchableOpacity
        style={{
          borderColor: '#a3a3a3',
          width: 96,
          height: 96,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 7,
        }}
        key={index + '' + Math.random()}
        onPress={pickImage}>
        <Icon name="plus" size={30} color="#E8E8E8" />
      </TouchableOpacity>
    );
  };

  /**
   * 缩略图展示
   * @returns
   */
  const itemDetailView = (path: string, index: number) => {
    return (
      <TouchableOpacity
        key={index + '' + Math.random()}
        onPress={() => {
          setIsShowImageView(true);
        }}>
        <View
          style={{
            alignItems: 'center',
            marginRight: 15,
          }}>
          <Image
            style={{
              width: 96,
              height: 96,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#a3a3a3',
            }}
            source={{
              uri: path,
            }}
          />
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
              position: 'absolute',
              top: -10,
              left: 86,
              borderWidth: 1,
              borderColor: 'white',
              borderRadius: 40,
              backgroundColor: '#d4d4d4',
            }}
            onPress={() => {
              let tempList = videoList;
              //删除元素
              _.remove(tempList, function (n) {
                return n.path == path;
              });
              // deletePath.current = path;
              props.cleanPostData(path);
              setVideoList(tempList);
              //处理成方便页面渲染的数据结构
              const tempArr = _.chunk(tempList, 3);
              setVideoListShow(tempArr as []);
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <AntDesign name="close" color={'white'} />
            </View>
          </TouchableOpacity>
        </View>
        {isShowImageView ? (
          <GetViewer
            data={videoList.filter(item => {
              return item.path != 'first';
            })}
            Close={() => setIsShowImageView(false)}
          />
        ) : (
          ''
        )}
      </TouchableOpacity>
    );
  };

  interface itemValue {
    path: string;
  }
  function itemView(item: [], index: number): JSX.Element {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          marginBottom: 15,
        }}
        key={index + '' + Math.random()}>
        {item.map((itemValue: itemValue, index2: number) => {
          if (itemValue.path == 'first') {
            return pickView(index2);
          } else {
            loadData.push(itemValue);
            // if (index2 === 2) {
            //   console.log(
            //     `loadData${JSON.stringify(loadData)}+++${loadData.length}`,
            //   );
            // }
            return itemDetailView(itemValue.path, index2);
          }
        })}
      </View>
    );
  }

  /**
   * 被选中的照片缩略
   * @returns
   */
  const videoLIstView = () => {
    return videoListShow.map((item: [], index) => {
      return itemView(item, index);
    });
  };

  return <View style={[props.style]}>{videoLIstView()}</View>;
});
PickImage.defaultProps = {
  callBackVideo: () => {},
  style: {},
};
export default PickImage;
