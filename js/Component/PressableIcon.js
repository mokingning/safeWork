/* eslint-disable prettier/prettier */
import React from 'react';
import {Pressable, HStack, Box, Text, Icon} from 'native-base';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const height = Dimensions.get('window').height;
export default function Index(props) {
  const {title, info} = props;
  return (
    <Pressable h={height * 0.1} bg="white" onPress={() => console.log('3')}>
      {({isHovered, isFocused, isPressed}) => {
        return (
          <HStack
            alignItems={'center'}
            h="100%"
            justifyContent={'space-between'}
            bg={isPressed ? 'muted.300' : isHovered ? 'muted.300' : 'white'}>
            <HStack space={3} marginLeft={'5%'} alignItems={'center'}>
              <Text fontSize={16}>{`${title}:`}</Text>
            </HStack>

            <Box
              marginRight={'5%'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              w="40%">
              <Box marginRight={'10%'}>
                <Text color={'muted.400'} fontSize={16}>
                  {`${info}`}
                </Text>
              </Box>
              <Icon
                as={FontAwesome}
                name="angle-right"
                size={5}
                color={'muted.400'}
              />
            </Box>
          </HStack>
        );
      }}
    </Pressable>
  );
}
