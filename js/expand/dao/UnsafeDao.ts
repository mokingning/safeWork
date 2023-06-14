/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AnyAction } from 'redux';
import Constants from './Constants';
import { get, post } from './HiNet';

export default class UnsafeDao{
    private static instance:UnsafeDao;
    private constructor(){}
    public static getInstance():UnsafeDao{
        if(!UnsafeDao.instance){
            UnsafeDao.instance=new UnsafeDao();
        }
        return UnsafeDao.instance;
    }
    uploadInfo(datas:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            const {unsafeUpload:{api}}=Constants;
            // debugger;
            const pureData=datas.datas.map((item:any)=>{
                return item.data;
            })
            datas={...datas,datas:pureData}
            console.log(JSON.stringify(datas));
            post(api)(datas)().then((res:any)=>{
                console.log(res);
                const{code,data,msg}=res;
                if(code===200)
                {
                    resolve(res);
                    console.log('安全上传成功')
                }
                else{
                    reject(res);
                    console.log("登录失败",JSON.stringify(res))
                }
            }).catch((e)=>{
                console.log(e);
                reject({code:-1,msg:'出错了'});
            })
        })
    }
}