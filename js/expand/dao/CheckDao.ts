/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Constants from './Constants';
import { get, post } from './HiNet';

export default class CheckDao{
    private static instance:CheckDao;
    private constructor(){}
    public static getInstance(){
        if(!CheckDao.instance){
            CheckDao.instance=new CheckDao();
        }
        return CheckDao.instance;
    }
    check(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {check:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(msg);
                    console.log('签到成功')
                }
                else{
                    reject(res);
                    console.log('签到失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`签到业务错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }
    getStandard(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {getStandard:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data);
                    console.log('获取成功');
                }
                else{
                    reject(res);
                    console.log('签到失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`签到业务错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }
    getRecords(datas:any):Promise<any>
    {
        console.log(JSON.stringify(datas))
        return new Promise((resolve,reject)=>{
            const {checkList:{api}}=Constants;
            get(api)(datas).then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data);
                    console.log('签到历史信息获取成功');
                }
                else{
                    reject(res);
                    console.log('签到历史信息获取失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`签到列表错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }
    getStatistic(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {getCheckStatistic:{recordsApi}}=Constants;
            post(recordsApi)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data);
                    console.log('位次获取成功');
                }
                else{
                    reject(res);
                    console.log('位次获取失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`位次错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }

}