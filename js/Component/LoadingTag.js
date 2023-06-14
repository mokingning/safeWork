/* eslint-disable prettier/prettier */
import React from 'react';
import {Modal, Spinner, HStack, Heading} from 'native-base';
export default function LoadingTag(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      avoidKeyboard
      justifyContent="center"
      alignItems={'center'}
      size="xs">
      <Modal.Content>
        <Modal.Body>
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" color={'info.600'} />
            <Heading color="info.600" fontSize="md">
              请稍后
            </Heading>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
