/* eslint-disable prettier/prettier */
import {Modal, Image, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// const images = [
//   {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
//   {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'},
// ];

export default function GetViewer(props) {
  let images = props.data.map(item => {
    console.log(item);
    console.log(item.path);
    if (props.type !== undefined && props.type === 'safe') {
      return Object.assign({}, {url: item, props: {}});
    }
    return Object.assign({}, {url: item.path, props: {}});
  });
  console.log(images);
  return (
    <Modal visible={true} transparent={true}>
      <ImageViewer imageUrls={images} onClick={props.Close} />
    </Modal>
  );
}
