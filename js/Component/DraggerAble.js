/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-lone-blocks */

import React from 'react';
import {PanResponder, Animated, StyleSheet, ToastAndroid} from 'react-native';
import {IconButton, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geo from '../position/geolation';
import CheckDao from '../expand/dao/CheckDao';
import {connect} from 'react-redux';
class Draggle extends React.Component {
  constructor(props) {
    super(props);
  }
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      //解决PanResponder中的onPress无作用
      //当大于5时才进入移动事件，有的情况下需要将onStartShouldSetPanResponderCapture设为false
      if (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5) {
        return true;
      } else if (
        Math.abs(gestureState.dx) <= 5 ||
        Math.abs(gestureState.dy) <= 5
      ) {
        return false;
      }
    },
    onPanResponderGrant: () => {
      //开始手势操作(单击)
      //是Animated的方法
      console.log('onPanResponderGrant==>' + '单击手势申请成功,开始处理手势');
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value,
      });
    },
    onPanResponderMove: Animated.event(
      [null, {dx: this.pan.x, dy: this.pan.y}],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      console.log('onPanResponderRelease==>' + '放开了触摸,手势结束');
      this.pan.flattenOffset();
    },
  });
  render() {
    return (
      <Animated.View
        style={[
          styles.btnQuestion,
          {
            transform: [{translateX: this.pan.x}, {translateY: this.pan.y}],
          },
        ]}
        {...this.panResponder.panHandlers}>
        <IconButton
          w={60}
          h={60}
          onPress={() => {
            ToastAndroid.show('定位获取中', ToastAndroid.LONG);
            Geo.getCurrentPosition()
              .then(res => {
                console.log(JSON.stringify(res));
                this.props.getPosition(
                  res.coords.latitude,
                  res.coords.longitude,
                );
                CheckDao.getInstance()
                  .check({
                    userId: this.props.info.id,
                    lat: res.coords.latitude,
                    // lat: 12.0007,
                    lon: res.coords.longitude,
                    // lon: 12.0008,
                  })
                  .then(res1 => {
                    this.props.getMap();
                    ToastAndroid.show(JSON.stringify(res1), ToastAndroid.LONG);
                    console.log('签到成功');
                  })
                  .catch(error => {
                    ToastAndroid.show(
                      JSON.stringify(error.msg),
                      ToastAndroid.LONG,
                    );
                  });
              })
              .catch(error => {
                {
                  console.log(`错误：${JSON.stringify(error)}`);
                  this.props.getError();
                }
              });
          }}
          bg={'#0ea5e9'}
          icon={<Icon as={Ionicons} name={'ios-location-outline'} size={27} />}
          borderRadius="full"
          _icon={{
            color: 'white',
          }}
          _pressed={{
            bg: '#7dd3fc',
          }}
        />
      </Animated.View>
    );
  }
}
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
const DraggleWithProp = connect(mapStateProps)(Draggle);
export default DraggleWithProp;
let styles = StyleSheet.create({
  btnQuestion: {
    // width: 65,
    // height: 65,
    borderRadius: 50,
    backgroundColor: '#e3d0d7',

    position: 'absolute',
    zIndex: 1,
    right: 10,
    bottom: 40,
  },
  btnText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 13,
  },
});
