/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Constants from './Constants';
import { get, post } from './HiNet';

export default class ExamDao{
    private static instance:ExamDao;
    private constructor(){}
    public static getInstance(){
        if(!ExamDao.instance){
            ExamDao.instance=new ExamDao();
        }
        return ExamDao.instance;
    }
    listExam(datas:Object,type:String):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {examList:{listApi}}=Constants;
            const {examHistory:{historyApi}}=Constants;
            const api = type==='allPage'?listApi:historyApi;
            get(api)(datas).then((res:any)=>{
                const {code,data,msg}=res;
                if(code===200)
                {
                    resolve(data || msg);
                    console.log(type+'试卷信息获取成功')
                }
                else{
                    reject(res);
                    console.log('试卷信息失败',JSON.stringify(res))
                }
            }).catch(error=>{
                console.log(`试卷错误${error}`)
                reject({code:-1,msg:'出错了'});
            })

        })

    }

    getExamInfo(datas:any):Promise<any>
    {
        console.log('examId'+JSON.stringify(datas))
        return new Promise<any>((resolve, reject) => {
            const {examInfo:{api}}=Constants;
            console.log(typeof datas);
            get(api)(datas).then((res:any)=>{
                const {code,msg,data}=res;
                if(code === 200)
                {
                    resolve(data || msg);
                }
                else
                {
                    reject(res);
                }
            }).catch(e=>{
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    getEmptyExam(datas:any):Promise<any>
    {
        return new Promise<any>((resolve, reject) => {
            const {examEmpty:{api}}=Constants;
            console.log(typeof datas);
            get(api)(datas).then((res:any)=>{
                const {code,msg,data}=res;
                if(code === 200)
                {
                    resolve(data || msg);
                }
                else
                {
                    reject(res);
                }
            }).catch(e=>{
                reject({code:-1,msg:'出错了'});
            })
        })
    }

    submitExam(datas:any):Promise<any>
    {
        console.log(JSON.stringify(datas))
        return new Promise<any>((resolve, reject) => {
            const {submitExam:{api}}=Constants;
            console.log(typeof datas);
            post(api)(datas)().then((res:any)=>{
                const {code,msg,data}=res;
                if(code === 200)
                {
                    resolve(data || msg);
                }
                else
                {
                    reject(res);
                }
            }).catch(e=>{
                reject({code:-1,msg:'出错了'});
            })
        })
    }

}