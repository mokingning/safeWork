/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Constants from './Constants';
import { get, post } from './HiNet';

export default class flowDao{
    private static instance:flowDao;
    private constructor(){}
    public static getInstance(){
        if(!flowDao.instance){
            flowDao.instance=new flowDao();
        }
        return flowDao.instance;
    }
    flowLeave(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {flowLeave:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data || msg);
                    console.log('请假成功')
                    
                }
                else{
                    reject(res);
                    console.log('请假失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`请假业务错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }
    flowCancel(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {flowCancel:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data || msg);
                    console.log('销假成功')
                    
                }
                else{
                    reject(res);
                    console.log('销假失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`销假业务错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }
    flowOverTime(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {flowOverTime:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data || msg);
                    console.log('加班申请成功')
                    
                }
                else{
                    reject(res);
                    console.log('加班申请失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`加班业务错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }

    flowWorkTime(datas:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {flowWorkTime:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data || msg);
                    console.log('工时补充申请成功')
                    
                }
                else{
                    reject(res);
                    console.log('补充申请失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`补充业务错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })
    }


    flowLeaveList(datas:any,type:String)
    {
        return new Promise((resolve,reject)=>{
            const {flowLeaveList:{apiLeave}} = Constants;
            const {flowCancelList:{apiCancel}} = Constants;
            const {flowOverList:{apiOver}} = Constants;
            const {flowWorkList:{apiWork}}=Constants;
            var api= type === 'leave' ? apiLeave : type === 'cancel' ? apiCancel : type === 'work' ? apiWork : apiOver;
            console.log(api);
            get(api)(datas).then((res:any)=>{
                const {code,data} = res;
                if (code === 200)
                {
                    console.log(res);
                    resolve(data);
                    console.log('请假信息获取成功')
                }
                else {
                    reject(res);
                    console.log('请假list信息失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`请假列表错误${error}`)
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    flowDetail(datas:any)
    {
        return new Promise((resolve,reject)=>{
            const {flowApprovel:{api}} = Constants;
            // console.log(api)
            get(api)(datas).then((res:any)=>{
                const {code,data} = res;
                if (code === 200)
                {
                    console.log(res);
                    resolve(data);
                    console.log('详情信息获取成功')
                }
                else {
                    reject(res);
                    console.log('详情信息失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`详情信息错误${error}`)
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    getVicationForCancel(datas:any)
    {
        return new Promise((resolve,reject)=>{
            const {forCancelList:{api}} = Constants;
            get(api)(datas).then((res:any)=>{
                const {code,data} = res;
                if (code === 200)
                {
                    console.log(res);
                    resolve(data);
                    console.log('已审批请假信息获取成功')
                }
                else {
                    reject(res);
                    console.log('详情信息失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`详情信息错误${error}`)
                reject({code:-1,msg:'出错了'});
            })
        })
    }
    
    

}