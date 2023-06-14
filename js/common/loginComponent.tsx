/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const Input = (props: any) => {
  const {label, placeholder, shortLine, secure, onChangeText} = props;
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.row}>
        {label === '手机号' ? (
          <Entypo name="phone" size={25} style={styles.icon} color="black" />
        ) : (
          <MaterialCommunityIcons
            name="onepassword"
            size={25}
            style={styles.icon}
            color="black"
          />
        )}
        {/* <Text style={styles.InputLable}>{label}</Text> */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secure}
          //取消大小写
          autoCapitalize={'none'}
          onChangeText={onChangeText}
          placeholderTextColor={'gray'}
        />
      </View>
      <View
        style={{
          height: 0.5,
          backgroundColor: '#D0D4D4',
          marginLeft: shortLine ? 20 : 0,
        }}
      />
      {/* 分割线  */}
    </View>
  );
};
export const ConfirmButton = (props: any) => {
  const {title, onClick} = props;
  return (
    <TouchableOpacity style={styles.confirmLayout} onPress={onClick}>
      <Text style={styles.confirmTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Tips = (props: any) => {
  const {msg, helpUrl} = props;
  return (
    <View style={styles.tipsLayout}>
      <Text style={styles.tips}>{msg}</Text>
      {!!helpUrl && (
        <Button
          title="查看帮助"
          onPress={() => {
            Linking.openURL(helpUrl);
          }}
        />
      )}
    </View>
  );
};
export const NavBar = (props: any) => {
  const {title, rightTitle, RightOnClick} = props;
  return (
    <View style={styles.navBar}>
      <View />
      <View style={styles.titleLayout}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={RightOnClick}>
        <Text style={styles.button}>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 18,
  },
  InputLable: {
    marginLeft: 15,
    marginTop: 18,
    marginBottom: 18,
    fontSize: 16,
    width: 70,
  },
  input: {
    flex: 1,
    marginRight: 5,
    color: 'black',
  },
  confirmLayout: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2196F3',
    margin: 20,
    marginTop: 30,
    borderRadius: 5,
  },
  confirmTitle: {
    fontSize: 20,
    color: 'white',
  },
  tips: {
    fontSize: 14,
    color: 'red',
  },
  tipsLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  titleLayout: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 40,
    right: 40,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  button: {
    color: '#007AFF',
    paddingRight: 15,
    fontSize: 16,
  },
});
