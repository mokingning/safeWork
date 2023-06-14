/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
  Button,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import LoadingTag from '../Component/LoadingTag';
import {ConfirmButton, Input, NavBar, Tips} from '../common/loginComponent';
import action from '../action';
import LoginDao from '../expand/dao/loginDao';
import NavigationUtil from '../navigator/NavigationUtil';
import {saveToken} from '../util/BoardingUtil';
import {connect} from 'react-redux';

function LoginPage(props: any) {
  const {navigation} = props;
  //  console.log(props);
  //   console.log({navigation});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [url, setHelpUrl] = useState(
    'https://www.runoob.com/typescript/ts-function.html',
  );
  const login = () => {
    console.log('doing login.....');
    if (userName === '' || password === '') {
      setMsg('用户名或密码不为空');
      return;
    }
    setHelpUrl('');
    setMsg('');
    // showInfo();
    saveToken('1');
    LoginDao.getInstance()
      .login(userName, password)
      .then(res => {
        setMsg('登录成功');
        props.loadInfo(userName);
        props.getEmptyExam({phoneNumber: userName});
        console.log('登录成功');
        setTimeout(() => {
          NavigationUtil.resetToHomPage({navigation});
        }, 3000);
      })
      .catch(e => {
        setLoading(false);
        const {code, data: {helpUrl = ''} = {}, msg} = e;
        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.root}>
        <NavBar title="登录" rightTitle="注册" />
        <LoadingTag isOpen={isLoading} />
        <View style={styles.line} />
        <View style={styles.content}>
          <Input
            label="手机号"
            placeholder="请输入手机号"
            shortLine={true}
            onChangeText={(text: string) => setUserName(text)}
          />
          <Input
            label="密码"
            placeholder="请输入密码"
            secure={true}
            onChangeText={(text: string) => setPassword(text)}
          />
          <ConfirmButton
            title="登录"
            onClick={() => {
              setLoading(true);
              login();
            }}
          />

          <Tips msg={msg} helpUrl={url} />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
const mapProps = (state: any) => ({
  initToken: state.info.init,
});
const mapDispatch = (dispatch: any) => ({
  loadInfo: (userName: any) => dispatch(action.loadInfo(userName)),
  getEmptyExam: (userId: any) => dispatch(action.getEmptyExam(userId)),
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1,
  },
  line: {
    color: '#D0D4D4',
    height: 0.5,
  },
});
export default connect(mapProps, mapDispatch)(LoginPage);
