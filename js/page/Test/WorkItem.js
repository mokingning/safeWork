/* eslint-disable prettier/prettier */
import React from 'react';
import {IconButton, Box, Icon, Text} from 'native-base';
import NavigationUtil from '../../navigator/NavigationUtil';
import Entypo from 'react-native-vector-icons/Entypo';
function WorkItem(props) {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      style={{marginLeft: 20}}>
      <IconButton
        w={60}
        h={60}
        onPress={() => NavigationUtil.goPage('', props.page)}
        bg={props.backColor}
        icon={<Icon as={Entypo} name={props.name} size={27} />}
        borderRadius="10"
        _icon={{
          color: '#fafaf9',
        }}
        _pressed={{
          bg: props.backColor + ':alpha.20',
        }}
      />
      <Text>{props.title}</Text>
    </Box>
  );
}

export default WorkItem;
