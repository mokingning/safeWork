/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Flex, Divider, Box} from 'native-base';
import {Dimensions} from 'react-native';
import Datep from './DateTimeCompo';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default function MyDateTime(props) {
  const [begin, setBegin] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [days, setDays] = useState(0);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  function getValueFromSon(selectDate, id) {
    console.log(selectDate);
    if (id === 1) {
      console.log('id=1执行');
      setBegin(new Date(selectDate));
      setFlag1(true);
    } else {
      console.log('id=2执行');
      setEnd(new Date(selectDate));
      setFlag2(true);
    }
  }
  function Clean() {
    setFlag1(false);
    setFlag2(false);
  }
  useEffect(() => {
    console.log('effect');
    console.log(flag1, flag2);
    if (props.status === 0) {
      if (flag1 === true && flag2 === true) {
        console.log(begin, end);
        const p = Math.abs((begin - end) / 1000 / 60 / 60 / 24);
        console.log(`p=${p}`);
        setDays(p);
        props.sendDays(begin, end, p);
        Clean();
      }
    } else if (flag1 === true && flag2 === true) {
      Clean();
    }
  }, [flag1, flag2]);
  useEffect(() => {
    if (flag1 == true && props.status === 1) props.sendDays(begin, end, 1);
  }, [flag1]);
  useEffect(() => {
    if (flag2 == true && props.status === 1) props.sendDays(begin, end, 2);
  }, [flag2]);
  return (
    <Box w={width}>
      <Flex direction="row" w={width}>
        <Datep
          id={1}
          sendTo={getValueFromSon.bind(this)}
          status={props.status}
        />
        <Divider orientation="vertical" h="10" mx={'5'} />
        <Datep
          id={2}
          sendTo={getValueFromSon.bind(this)}
          status={props.status}
        />
      </Flex>
    </Box>
  );
}
