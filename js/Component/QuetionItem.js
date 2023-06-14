/* eslint-disable prettier/prettier */
import React from 'react';
import {Box, NativeBaseProvider, Radio, Text} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
function QuetionItem(props) {
  const {sysQuestionItemList, title_num, id} = props;
  console.log(props);
  return (
    <Box style={styles.root}>
      <Text style={styles.title}>{title_num + '.' + props.title}</Text>
      <Radio.Group
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        colorScheme="lightBlue"
        onChange={value => {
          props.getValue(id, value);
          console.log(value);
        }}>
        {Object.entries(sysQuestionItemList).map(item => {
          console.log(JSON.stringify(item));
          return (
            <Box style={styles.border} key={item[1].id}>
              <Radio key={item[0]} value={`${item[1].id}`} my={2} size={'sm'}>
                <Text style={styles.choice}>{item[1].content}</Text>
              </Radio>
            </Box>
          );
        })}
      </Radio.Group>
    </Box>
  );
}
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  title: {fontWeight: '600', fontSize: 15, marginBottom: 10},
  choice: {
    color: '#737373',
    fontSize: 14,
    width: width * 0.8,
  },
  border: {
    borderWidth: 0.3,
    borderColor: 'darkgray',
    paddingLeft: 10,
    paddingVertical: 5,
  },
});
export default QuetionItem;
