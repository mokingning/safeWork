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
  TouchableOpacity,
} from 'react-native';
import {
  Alert,
  Box,
  VStack,
  Center,
  NativeBaseProvider,
  Heading,
  HStack,
} from 'native-base';
import action from '../action';
import {connect} from 'react-redux';
import ExamItem from '../Component/ExamItem';
import NavigationBar from 'react-native-navbar-plus';
import NavigationUtil from '../navigator/NavigationUtil';
import ExamDao from '../expand/dao/ExamDao';
import ViewUtil from '../util/ViewUtil';

const ExamData = [
  {title: '大学生恋爱观调查1', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查2', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查3', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查4', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查5', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查6', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查7', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查8', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查9', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查10', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查11', date: '2023-11-2', score: '0', status: 0},
];
const NewData = [
  {title: '大学生恋爱观调查12', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查13', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查14', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查15', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查16', date: '2023-11-2', score: '0', status: 0},
  {title: '大学生恋爱观调查17', date: '2023-11-2', score: '90', status: 1},
  {title: '大学生恋爱观调查18', date: '2023-11-2', score: '80', status: 1},
  {title: '大学生恋爱观调查19', date: '2023-11-2', score: '0', status: 0},
];
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const ItemView = ({title, onPress, isActive}) => {
  console.log(title + isActive);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.pressAble]}>
      <View style={[styles.item, isActive ? styles.activeItem : null]}>
        <Text style={[styles.itemTitle, isActive ? styles.activeTitle : null]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
class ExamPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      isLoading: false,
      isLoadingMore: false,
      page: 0,
      total: 0,
      active: 'allPage',
    };
  }

  componentDidMount() {
    this.loadData(true, 'allPage');
  }

  _renderItem(data) {
    console.log(JSON.stringify({...data}));
    // 会自动在对象数据外再加一层item:{data}
    return (
      <ExamItem
        {...data.item}
        type={this.state.active}
        goDetail={() => {
          if (parseInt(data.item.status) !== 1) {
            ToastAndroid.show('非规定考试时间！', ToastAndroid.SHORT);
          } else {
            NavigationUtil.goPage({examId: data.item.id}, 'ExamDetailPage');
          }
        }}
      />
    );
  }

  loadData(refresh, type) {
    console.log('刷新');
    var datas;
    if (
      !refresh &&
      this.state.total != 0 &&
      this.state.total <= this.state.page
    ) {
      console.log('被返回');
      return;
    }
    if (refresh) {
      this.setState({
        isLoading: true,
      });
      datas = {current: 1};
    } else {
      datas = {current: this.state.page + 1};
    }
    if (type === 'records') {
      datas = {...datas, userId: this.props.info.id};
    }
    ExamDao.getInstance()
      .listExam(datas, type)
      .then(res => {
        console.log(JSON.stringify(res));
        this.setState({
          isLoading: false,
          isLoadingMore: false,
          dataArray: refresh
            ? res.records
            : this.state.dataArray.concat(res.records),
          page: res.current,
          total: res.pages,
        });
      })
      .catch(e => {
        console.log(JSON.stringify(e));
      });
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
              请稍后，若等待时间太长，请退出
            </Box>
          </VStack>
        </Alert>
      </Center>
    );
  }

  typeClick(type) {
    console.log(type);
    this.setState({
      dataArray: [],
      isLoading: false,
      isLoadingMore: false,
      page: 0,
      total: 0,
      active: type,
    });
    this.loadData(true, type);
  }
  render() {
    const onBack = () => {
      NavigationUtil.goBack(this.props.navigation);
    };
    let statusBar = {
      backgroundColor: 'black',
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'试卷列表'}
        statusBar={statusBar}
        style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
      />
    );
    const isActive = tab => this.state.active === tab;
    return (
      <View style={styles.container}>
        {navigationBar}
        <NativeBaseProvider>
          <HStack justifyContent="center" mt={2}>
            <ItemView
              title="考试列表"
              onPress={() => this.typeClick('allPage')}
              isActive={isActive('allPage')}
            />
            <ItemView
              title="历史考试"
              onPress={() => this.typeClick('records')}
              isActive={isActive('records')}
            />
          </HStack>
          <FlatList
            data={this.state.dataArray}
            renderItem={data => this._renderItem(data)}
            refreshControl={
              <RefreshControl
                title="Loading..."
                colors={['green']}
                refreshing={this.state.isLoading}
                onRefresh={() => this.loadData(true, this.state.active)}
              />
            }
            ListEmptyComponent={this.emptyCompo}
            ListFooterComponent={() => this.genIndicator()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log('---onEndReached----');
              setTimeout(() => {
                if (this.canLoadMore) {
                  console.log('end');
                  this.setState({isLoadingMore: true});
                  this.loadData(false, this.state.active);
                  this.canLoadMore = false;
                }
              }, 1000);
            }}
            onMomentumScrollBegin={() => {
              this.canLoadMore = true;
              console.log('---onMomentumScrollBegin-----');
            }}
          />
        </NativeBaseProvider>
      </View>
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
  pressAble: {
    height: 30,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a3a3a3',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  activeItem: {
    backgroundColor: '#1E90FF',
  },
  activeTitle: {
    color: 'white',
  },
  itemTitle: {
    color: 'black',
    fontWeight: '300',
    fontSize: 16,
  },
});
const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
const mapDispatch = dispatch => ({
  getEmptyExam: userId => dispatch(action.getEmptyExam(userId)),
});
export default connect(mapStateProps, mapDispatch)(ExamPage);
