import {Cd} from './B.js';
class M extends Cd{
  constructor(){
    super();
  }
  /**
   * 登录模块网络请求
   * */ 
  mLogin(datas){
    let parameter={
      url:'',
      type:'POST',
      data:datas
    }
    this.ajax('encode',parameter);
  }
 
}
export{M}