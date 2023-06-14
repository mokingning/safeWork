/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default function CountScreen() {
  const [count, setCount] = React.useState(100);
  const latestCount = React.useRef(count); // 定义一个ref，初始值是count
  React.useEffect(() => {
    latestCount.current = count; // 更新
  });
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (latestCount.current === 0) {
        // 此处判断latestCount.current，而不是count
        clearInterval(timer);
        return;
      }
      setCount(c => c - 1);
    }, 1000);
    //组件销毁时，去掉计时器
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>倒计时{count}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});
