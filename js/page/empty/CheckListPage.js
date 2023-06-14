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
  Spinner,
  Box,
  VStack,
  Center,
  NativeBaseProvider,
  Heading,
} from 'native-base';
import action from '../../action';
import {connect} from 'react-redux';
import NavigationBar from 'react-native-navbar-plus';
import NavigationUtil from '../../navigator/NavigationUtil';
import CheckDao from '../../expand/dao/CheckDao';
import CheckItem from '../../Component/CheckItem';
import ViewUtil from '../../util/ViewUtil';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
class CheckListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      isLoading: false,
      isLoadingMore: false,
      page: 0,
      total: 0,
    };
  }

  componentDidMount() {
    this.loadData(true);
  }

  _renderItem(data) {
    // console.log(JSON.stringify({...data}));  会自动在对象数据外再加一层item:{data}
    return (
      <CheckItem
        {...data.item}
        goDetail={() => {
          //   NavigationUtil.goPage({examId: data.item.id}, 'ExamDetailPage');
        }}
      />
    );
  }

  loadData(refresh) {
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
    CheckDao.getInstance()
      .getRecords({...datas, userId: this.props.info.id})
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
        <Spinner color="cyan.500" />
      </Center>
    );
  }
  render() {
    let navigationBar = (
      <NavigationBar
        title={'历史考勤记录'}
        leftButton={ViewUtil.getLeftBackButton(() => {
          NavigationUtil.goBack(this.props.navigation);
        })}
        style={{backgroundColor: '#2196f3'}} //修改标题栏主题色
      />
    );
    return (
      <View style={styles.container}>
        {navigationBar}
        <NativeBaseProvider>
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
            // onEndReachedThreshold={0.2}
            onEndReached={() => {
              console.log('---onEndReached----');
              setTimeout(() => {
                if (this.canLoadMore) {
                  console.log('end');
                  this.setState({isLoadingMore: true});
                  this.loadData();
                  this.canLoadMore = false;
                }
              }, 100);
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
});

const mapStateProps = state => ({
  theme: state.currentTheme.theme,
  info: state.info,
});
const mapDispatch = dispatch => ({
  getEmptyExam: userId => dispatch(action.getEmptyExam(userId)),
});
export default connect(mapStateProps, mapDispatch)(CheckListPage);
