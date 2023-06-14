/* eslint-disable prettier/prettier */
import {Alert, VStack, HStack, Text} from 'native-base';

export function AlerTag(props) {
  return (
    <Alert status={props.status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {props.status === 'success'
                ? `${props.seconds}后将自动返回工作台`
                : `${props.title}`}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
}
