/* eslint-disable prettier/prettier */

import Constants from './Constants';
import { get, Login } from './HiNet';

export default class LoginDao{
    private static instance:LoginDao;
    private constructor(){}
    public static getInstance():LoginDao{
        if(!LoginDao.instance){
            LoginDao.instance=new LoginDao();
        }
        return LoginDao.instance;
    }
    login(phoneNum:string,password:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            const {login:{api}}=Constants;
            // const {loginTest:{api}}=Constants;
            const formData=new FormData();
            formData.append('phoneNum',phoneNum);
            formData.append('password',password);
            console.log(formData)

            // debugger;
            Login(api)(formData)().then((res:any)=>{
                console.log(res);
                const{code,data,msg}=res;
                if(code===200)
                {
                    resolve(data || msg);
                    console.log('登录成功')
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
    getInfo(phoneNum:String):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            const {userInfo:{api}}=Constants;
            var params={name:phoneNum};
            get(api)(params).then((res:any)=>{
                const {code,data}=res;
                if(code===200)
                {
                    resolve(data||res);
                }
                else
                {
                    reject(res);
                    console.log("用户信息获取失败",JSON.stringify(res));
                }
            }).catch(e=>{
                console.log(e);
                reject({code:-1,msg:'出错了'});
            })
        } )

    }
    // registration(
    //     userName: string,
    //     password: string,
    //     imoocId: string,
    //     orderId: string,
    //   ): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //       const {
    //         registration: { api },
    //       } = Constants;
    //       const formData = new FormData();
    //       formData.append('userName', userName);
    //       formData.append('password', password);
    //       formData.append('imoocId', imoocId);
    //       formData.append('orderId', orderId);
    //       post(api)(formData)().then((res: any) => {
    //         const { code, data, msg } = res;
    //         if (code === 0) {
    //           saveBoarding(data);
    //           resolve(data || msg);
    //         } else {
    //           reject(res);
    //         }
    //       })
    //         .catch((e) => {
    //           console.log(e);
    //           reject({ code: -1, msg: '哎呀出错了' });
    //         });
    //     });
    //   }
}