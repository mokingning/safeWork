/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import ExamItem from '../../Component/ExamItem';
import NavigationBar from 'react-native-navbar-plus';
const CITY_NAMES = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '苏州',
  '成都',
  '武汉',
  '郑州',
  '洛阳',
  '厦门',
  '青岛',
  '拉萨',
];
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
export default class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: ExamData,
      isLoading: false,
    };
  }

  _renderItem(data) {
    // console.log(JSON.stringify({...data}));  会自动在对象数据外再加一层item:{data}
    return <ExamItem {...data.item} />;
  }

  loadData(refresh) {
    if (refresh) {
      this.setState({
        isLoading: true,
      });
    }
    setTimeout(() => {
      let dataArray = [];
      if (refresh) {
        for (let i = this.state.dataArray.length - 1; i >= 0; i--) {
          dataArray.push(this.state.dataArray[i]);
        }
        this.setState({
          dataArray: dataArray,
          isLoading: false,
        });
      } else {
        dataArray = this.state.dataArray.concat(NewData);
        console.log('加载更多这里，没有loading这种标识');
        this.setState({
          dataArray: dataArray,
        });
      }
    }, 2000);
  }

  genIndicator() {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    );
  }

  render() {
    let statusBar = {
      backgroundColor: 'black',
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        title={'考试页面'}
        statusBar={statusBar}
        style={{backgroundColor: '#0ea5e9'}} //修改标题栏主题色
      />
    );
    debugger;
    return (
      <View style={styles.container}>
        {navigationBar}
        <FlatList
          data={this.state.dataArray}
          renderItem={data => this._renderItem(data)}
          // refreshing={this.state.isLoading}
          // onRefresh={() => {
          // this.loadData();
          // }}
          refreshControl={
            <RefreshControl
              title="Loading..."
              colors={['red']}
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData(true)}
              tintColor={'orange'}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            this.loadData();
          }}
        />
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
