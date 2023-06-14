/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {connect} from 'react-redux';
import {getToken, saveToken} from '../../util/BoardingUtil';
import Constants from './Constants';

/**
 *
 * 发送Get请求
 * @param api
 */
export function get(api: string) {
  return async (params?: {}) => {
    console.log('开始执行async');
    const token = await getToken();
    const {url} = Constants;
    console.log('开始数据处理');
    return handleData(
      fetch(buildParams(url, api, params), {
        headers: {
          Authorization: token || '',
        },
      }),
    );
  };
}
export function Login(api: string) {
  return (params: {}) => {
    return async (queryParams?: {} | string) => {
      const token = await getToken();
      const {url} = Constants;
      var data = params instanceof FormData ? params : JSON.stringify(params);
      console.log(data);
      return handleData(
        fetch(buildParams(url, api, queryParams), {
          method: 'POST',
          mode: 'cors',
          body: data,
          headers: {
            Authorization: token || '',
          },
        }),
      );
    };
  };
}
export function post(api: string) {
  return (params: {}) => {
    return async (queryParams?: {} | string) => {
      const token = await getToken();
      const {url} = Constants;
      var data = params instanceof FormData ? params : JSON.stringify(params);
      console.log(data);
      // console.log(typeof params)
      // console.log(data.valueOf)
      return handleData(
        fetch(buildParams(url, api, queryParams), {
          method: 'POST',
          mode: 'cors',
          body: data,
          headers: {
            Authorization: token || '',
            'Content-Type': 'application/json',
          },
        }),
      );
    };
  };
}
function handleData(doAction: Promise<any>) {
  console.log('进入数据处理');
  return new Promise((resolve, reject) => {
    doAction
      .then(res => {
        const type = res.headers.get('Content-Type');
        //todo   保存Token
        const Authorization = res.headers.get('Authorization');
        console.log(`=======>token${Authorization}`);
        if (Authorization !== null) {
          saveToken(Authorization);
        }

        if ((type || '').indexOf('json') !== -1) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then(result => {
        // resolve(result);  一般返回string类型意味着出错了
        if (typeof result === 'string') {
          throw new Error(result);
        }
        const {code} = result;
        if (code === 401) {
          // todo 返回登录页
          return;
        }
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function buildParams(url: string, api: string, params?: {} | string): string {
  console.log('参数构造中');
  let newUrl = new URL(api, url),
    finalUrl;
  console.log(`============>${url}`);

  console.log(`============>${newUrl}`);
  if (typeof params === 'object') {
    console.log('对象参数构建中');
    for (const [key, value] of Object.entries(params)) {
      newUrl.searchParams.append(key, value as string);
    }
    finalUrl = newUrl.toString();
  } else if (typeof params === 'string') {
    // finalUrl = url.endsWith('?') ? newUrl + params : newUrl + '?' + params;
    finalUrl = api.endsWith('/') ? newUrl + params : newUrl + '/' + params;
  } else {
    finalUrl = (url + api).toString();
    console.log('从这里出来');
  }
  console.log('buildParams===>', finalUrl);
  return finalUrl;
}
// const mapDispatch=dispatch=>({
//   initToken:token=>dispatch(action.initToken(token)),
// });
// const handleData_token=connect(null,mapDispatch)(handleData);
