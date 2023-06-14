/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {Input, Icon, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import keys from '../common/keys.json';
import {tabNav} from '../navigator/NavigationDelegate';
import ListCompo from '../Component/ListCompo';
import UnSafeCompo from '../Component/UnSafeCompo';
import {connect} from 'react-redux';
import action from '../action';
import NavigationUtil from '../navigator/NavigationUtil';

function StudyPage() {
  const TabNavigator = keys.length
    ? tabNav({
        Component: StudyTabPage,
        theme: {themeColor: '#2196f3'},
        keys,
      })
    : null;
  return (
    <View style={styles.root}>
      {TabNavigator}
      {/* <StudyTab /> */}
    </View>
  );
}

class StudyTab extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     dataArray: noticeData,
  //     isLoading: false,
  //   };
  // }
  constructor(props) {
    super(props);
    // console.log(props);
    const {tabLabel, onThemeChange} = this.props;
    this.storeName = tabLabel;
  }

  componentDidMount() {
    this.loadData(true);
  }
  _renderItem(data) {
    // console.log(JSON.stringify({...data}));  会自动在对象数据外再加一层item:{data}
    return this.storeName === '公告' ? (
      <ListCompo
        {...data.item}
        userId={this.props.info.id}
        goDetail={() => NavigationUtil.goPage({...data.item}, 'NoticeDetail')}
      />
    ) : (
      <UnSafeCompo
        {...data.item}
        type={this.storeName === '学习资源' ? 'study' : 'unsafe'}
        userId={this.props.info.id}
        goDetail={() => {
          this.storeName === '安全信息'
            ? NavigationUtil.goPage({...data.item}, 'UnSafeDetail')
            : NavigationUtil.goPage({...data.item}, 'StudyDetail');
        }}
      />
    );
  }

  _store() {
    const {study} = this.props;
    let store = study[this.storeName]; //动态获取state
    // console.log(store);
    if (!store) {
      store = {
        datas: [],
        isLoading: false,
        isLoadingMore: false,
      };
    }
    return store;
  }

  loadData(refresh) {
    const {onLoadData, onLoadMoreData} = this.props;
    const store = this._store();
    if (refresh) {
      console.log('准备进入Redux');
      onLoadData(this.storeName);
    } else {
      console.log(store.page, store.total);
      if (store.page < store.total) {
        console.log('可以加载更多');
        onLoadMoreData(this.storeName, store.datas, {current: ++store.page});
      } else {
        ToastAndroid.show('没有更多了', ToastAndroid.SHORT);
      }
    }
  }

  genIndicator() {
    console.log('加载器生成中');
    return this._store().isLoadingMore ? (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    ) : null;
  }

  render() {
    let store = this._store();
    return (
      <View style={styles.root}>
        <FlatList
          data={store.datas}
          renderItem={data => this._renderItem(data)}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={['red']}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData(true)}
              tintColor={'orange'}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          // onEndReachedThreshold={0.5}
          onEndReached={() => {
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {
                //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                console.log('end');
                this.loadData();
                this.canLoadMore = false;
              }
            }, 200);
          }}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----');
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  content: {
    fontSize: 15,
    color: 'black',
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
const mapStateToProps = state => ({
  study: state.study,
  theme: state.currentTheme.theme,
  info: state.info,
});
const mapDispatchToProps = dispatch => ({
  onLoadData: storeName => dispatch(action.loadFirstData(storeName)),
  onLoadMoreData: (storeName, datas, page) =>
    dispatch(action.loadMore(storeName, datas, page)),
});
const StudyTabPage = connect(mapStateToProps, mapDispatchToProps)(StudyTab);
export default StudyPage;
