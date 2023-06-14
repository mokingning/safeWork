/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {
  Alert,
  Box,
  VStack,
  Center,
  NativeBaseProvider,
  Button,
  HStack,
  Heading,
  Divider,
} from 'native-base';
import FlowItem from '../../Component/FlowItem';
import NavigationBar from 'react-native-navbar-plus';
import NavigationUtil from '../../navigator/NavigationUtil';
import flowDao from '../../expand/dao/flowDao';
import {connect} from 'react-redux';
import ViewUtil from '../../util/ViewUtil';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
class ApplicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      isLoading: false,
      isLoadingMore: false,
      page: 0,
      total: 0,
      type: 'leave',
    };
  }
  componentDidMount() {
    this.loadData(true);
  }
  _renderItem(data) {
    return (
      <FlowItem
        {...data.item}
        goDetail={() => {
          NavigationUtil.goPage(
            {...data.item, applicationType: `${this.state.type}`},
            'AppliDetail',
          );
        }}
      />
    );
  }

  loadData(refresh) {
    if (this.state.total != 0 && this.state.total <= this.state.page) {
      return;
    }
    var datas = {userId: this.props.info.id};
    if (refresh) {
      this.setState({
        isLoading: true,
      });
    }
    datas = {...datas, current: this.state.page + 1};
    flowDao
      .getInstance()
      .flowLeaveList(datas, this.state.type)
      .then(res => {
        console.log(JSON.stringify(res));
        this.setState({
          isLoading: false,
          isLoadingMore: false,
          dataArray: this.state.dataArray.concat(res.records),
          page: res.current,
          total: res.pages,
        });
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
    // setTimeout(() => {
    //   let dataArray = [];
    //   if (refresh) {
    //     for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
    //       dataArray.push(this.state.dataArray[i]);
    //     }
    //     this.setState({
    //       dataArray: dataArray,
    //       isLoading: false,
    //     });
    //   } else {
    //     dataArray = this.state.dataArray.concat(NewData);
    //     console.log('加载更多这里，没有loading这种标识');
    //     this.setState({
    //       dataArray: dataArray,
    //     });
    //   }
    // }, 2000);
  }

  genIndicator() {
    return this.state.isLoadingMore ? (
      this.state.page >= this.state.total ? (
        ToastAndroid.show('没有更多了', ToastAndroid.SHORT)
      ) : (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            style={styles.indicator}
            size="large"
            animating={true}
          />
          <Text>正在加载更多</Text>
        </View>
      )
    ) : null;
  }

  emptyCompo() {
    return (
      <Center height={h * 0.8}>
        <Alert w="90%" status="success">
          <VStack space={1} flexShrink={1} w="100%" alignItems="center">
            <Alert.Icon size="lg" />
            <Heading size="md">查询已完成</Heading>
            <Box
              _text={{
                textAlign: 'center',
              }}
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}>
              没有你的相关申请哦，若有疑问，请及时咨询管理员，以免造成不必要的问题！
            </Box>
          </VStack>
        </Alert>
      </Center>
    );
  }

  render() {
    let statusBar = {
      backgroundColor: 'black',
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'我的申请'}
        statusBar={statusBar}
        leftButton={ViewUtil.getLeftBackButton(() => {
          NavigationUtil.goBack(this.props.navigation);
        })}
        style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
      />
    );
    return (
      <NativeBaseProvider>
        {navigationBar}
        <View style={styles.container}>
          {/* {navigationBar} */}
          <HStack justifyContent={'space-around'}>
            <Button
              variant="sutble"
              borderTopWidth={1}
              borderColor={'white'}
              width={w / 4}
              backgroundColor={'#2196f3'}
              _text={{fontSize: 16, color: 'white'}}
              onPress={() => {
                this.setState(
                  {...this.state, page: 0, type: 'leave', dataArray: []},
                  () => {
                    this.loadData(true);
                  },
                );
              }}>
              请假申请
            </Button>
            <Divider orientation="vertical" mx="3" />
            <Button
              variant="sutble"
              borderTopWidth={1}
              borderColor={'white'}
              width={w / 4}
              backgroundColor={'#2196f3'}
              _text={{fontSize: 16, color: 'white'}}
              onPress={() => {
                this.setState(
                  {...this.state, page: 0, type: 'cancel', dataArray: []},
                  () => {
                    this.loadData(true);
                  },
                );
              }}>
              销假申请
            </Button>
            <Divider orientation="vertical" mx="3" />
            <Button
              variant="sutble"
              borderTopWidth={1}
              borderColor={'white'}
              backgroundColor={'#2196f3'}
              _text={{fontSize: 16, color: 'white'}}
              width={w / 4}
              onPress={() => {
                this.setState(
                  {...this.state, page: 0, type: 'over', dataArray: []},
                  () => {
                    this.loadData(true);
                  },
                );
              }}>
              加班申请
            </Button>
            <Divider orientation="vertical" mx="3" />
            <Button
              variant="sutble"
              borderTopWidth={1}
              borderColor={'white'}
              backgroundColor={'#2196f3'}
              _text={{fontSize: 16, color: 'white'}}
              width={w / 4}
              onPress={() => {
                this.setState(
                  {...this.state, page: 0, type: 'work', dataArray: []},
                  () => {
                    this.loadData(true);
                  },
                );
              }}>
              工时申请
            </Button>
          </HStack>

          <FlatList
            data={this.state.dataArray}
            renderItem={data => this._renderItem(data)}
            refreshControl={
              <RefreshControl
                title="Loading..."
                colors={['green']}
                refreshing={this.state.isLoading}
                onRefresh={() => this.loadData(true)}
              />
            }
            ListEmptyComponent={this.emptyCompo}
            ListFooterComponent={() => this.genIndicator()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log('---onEndReached----');
              setTimeout(() => {
                if (this.canLoadMore) {
                  //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                  console.log('end');
                  this.setState({isLoadingMore: true});
                  this.loadData();
                  this.canLoadMore = false;
                }
              }, 1000);
            }}
            onMomentumScrollBegin={() => {
              this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
              console.log('---onMomentumScrollBegin-----');
            }}
          />
        </View>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
export default connect(mapStateProps)(ApplicationPage);
