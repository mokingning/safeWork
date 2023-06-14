/* eslint-disable prettier/prettier */
import Constants from './Constants';
import {get,post} from './HiNet'
export default class StudyDao{
    private static instance:StudyDao;
    private constructor(){}
    public static getInstance():StudyDao{
        if(!StudyDao.instance){
            StudyDao.instance=new StudyDao();
        }
        return StudyDao.instance;
    }
    refreshData(datas:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            const {api}=datas[0];
            console.log('开始refreshdata请求'+api)
            get(api)().then((res:any)=>{
                const{code}=res;
                if(code===200)
                {
                    resolve(res);
                    console.log('study获取成功'+`api:${api}`)
                }
                else{
                    reject(res);
                    console.log("study失败"+`api:${api}`,JSON.stringify(res))
                }
            }).catch((e)=>{
                console.log(e);
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    loadMore(datas:any,page:Object):Promise<any>{
        return new Promise((resolve,reject)=>{
            const {api}=datas[0];
            get(api)(page).then((res:any)=>{
                console.log(res);
                const{code}=res;
                if(code===200)
                {
                    resolve(res);
                    console.log('study获取成功')
                }
                else{
                    reject(res);
                    console.log("study失败",JSON.stringify(res))
                }
            }).catch((e)=>{
                console.log(e);
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    addStudyUser(datas:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            const {addUserStudy:{api}}=Constants;
            post(api)(datas)().then((res:any)=>{
                console.log(res);
                const{code}=res;
                if(code===200)
                {
                    resolve(res);
                    console.log('study获取成功')
                }
                else{
                    reject(res);
                    console.log("study失败",JSON.stringify(res))
                }
            }).catch((e)=>{
                console.log(e);
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    statistic(datas:any):Promise<any>{
        return new Promise((resolve,reject)=>{
            const {getStudyStatistic:{api}}=Constants;
            get(api)(datas).then((res:any)=>{
                console.log(res);
                const{code,data}=res;
                if(code===200)
                {
                    resolve(data || res);
                    console.log('study获取成功')
                }
                else{
                    reject(res);
                    console.log("study失败",JSON.stringify(res))
                }
            }).catch((e)=>{
                console.log(e);
                reject({code:-1,msg:'出错了'});
            })
        })
    }
}
