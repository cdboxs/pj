import {Cd} from './B.js';
class M extends Cd{
  constructor(){
    super();
  }
  /**
   * 登录模块网络请求
   * */ 
  getDepart(){
    let parameter={
      url:'/api/depart',
      type:'POST',
      data:''
    }
    return this.ajax('encode',parameter);
  }

  mLogin(datas) {
    let parameter = {
      url: '/api/students/login',
      type: 'POST',
      data: datas
    }
    return this.ajax('json', parameter);
  }

  getTeacher(datas){
    let parameter={
      url:'/api/Teacherinfo',
      type:'POST',
      data: datas
    }
    return this.ajax('encode',parameter);
  }

  testQuestions(datas){
    let parameter={
      url:'/api/question',
      type:'POST',
      data:datas
    }
    return this.ajax('encode',parameter);
  }
 
  ceptea(types,datas){
    if(types==0){
      var parameter = {
        url: '/api/ceptea',
        type: 'POST',
        data: datas
      }
    }else if(types==1){
      var parameter = {
        url: '/api/cepgui',
        type: 'POST',
        data: datas
      }
    }
    return this.ajax('encode', parameter);
  }
}
export{M}