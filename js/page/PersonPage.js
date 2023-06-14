/* eslint-disable prettier/prettier */
import React from 'react';
import {VStack, NativeBaseProvider, Box} from 'native-base';
import PressableIcon from '../Component/PressableIcon';
function PersonPage(props) {
  return (
    <NativeBaseProvider>
      <VStack>
        <VStack bg={'white'}>
          <PressableIcon title={'手机号'} info={'180xxxxxxxxx'} />
          <Box bg="muted.100" h={0.5} w={'90%'} alignSelf={'flex-end'} />
          <PressableIcon title={'姓名'} info={'辉夜'} />
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
}

export default PersonPage;
