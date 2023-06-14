/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {
  AlertDialog,
  Button,
  NativeBaseProvider,
  Modal,
  VStack,
} from 'native-base';
import DraggleWithProp from '../Component/DraggerAble';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import {connect} from 'react-redux';
import {MapView, Marker, Polyline, MapType} from 'react-native-amap3d';
function HomePage(props) {
  NavigationUtil.navigation = props.navigation;
  const [show, setShow] = useState(false);
  const [showMap, setMap] = useState({isShow: false});
  // const info=useRef
  function sholudShow() {
    setShow(true);
  }
  function closeShow() {
    setShow(false);
  }
  function position(lat, lon) {
    setMap({...showMap, lat: lat, lon: lon});
  }
  function canShowMap() {
    setMap({...showMap, isShow: true});
  }
  function closeMap() {
    setMap({...showMap, isShow: false});
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.root}>
        <DynamicTabNavigator size={props.info.size} />
        <DraggleWithProp
          getError={sholudShow.bind(this)}
          getPosition={position.bind(this)}
          getMap={canShowMap.bind(this)}
        />
        <Modal isOpen={showMap.isShow} onClose={() => closeMap()}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>本次打卡位置</Modal.Header>
            <Modal.Body>
              <VStack width={250} height={300}>
                <MapView
                  mapType={MapType.Standard}
                  initialCameraPosition={{
                    target: {
                      latitude: props.info?.standard?.lat || 30.604777,
                      longitude: props.info?.standard?.lon || 114.357588,
                    },
                    myLocationEnabled: true,
                    zoom: 15,
                  }}>
                  <Marker
                    position={{
                      latitude: props.info?.standard?.lat,
                      longitude: props.info?.standard?.lon,
                    }}
                    onPress={() => {
                      alert(`打卡中心点`);
                    }}
                    icon={require('../../static/images/flag.png')}></Marker>
                  <Marker
                    position={{latitude: showMap.lat, longitude: showMap.lon}}
                    onPress={() => {
                      alert(`你`);
                    }}
                    icon={require('../../static/images/point.png')}></Marker>
                  <Polyline
                    width={5}
                    points={[
                      {
                        latitude: props.info.standard?.lat,
                        longitude: props.info.standard?.lon,
                      },
                      {latitude: showMap.lat, longitude: showMap.lon},
                    ]}
                    color="rgba(255, 0, 0, 0.5)"
                    gradient
                  />
                </MapView>
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <AlertDialog
          isOpen={show}
          onClose={() => {
            closeShow();
          }}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>定位获取失败</AlertDialog.Header>
            <AlertDialog.Body>可能原因：请开启定位后再尝试！</AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => {
                    closeShow();
                  }}>
                  取消
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    closeShow();
                  }}>
                  好的
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoWindow: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
  },
});
const mapStateToProps = state => ({
  info: state.info,
});

const NHomePage = connect(mapStateToProps)(HomePage);
export default NHomePage;
