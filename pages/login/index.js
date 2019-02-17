//index.js
import {M} from "../../utils/M.js";
const app = getApp();
let m=new M();
let that;

Page({
  data: {
    collegeKey:'',
    college:['河工软件学院','石职软件学院']
  },
  //事件处理函数
 
  onLoad: function () {
   that=this;
  },
  collegeSwitch(e){
    that.setData({
      collegeKey:e.detail.value
    });
  },
  login(e){
    if(e.detail.value.college==""){
      m.showTost('请选择学院');
      return;
    } else if (e.detail.value.userName == ""){
      m.showTost('学号不能为空');
      return;
    } else if (e.detail.value.userPwd == "") {
      m.showTost('密码不能为空');
      return;
    } else if (e.detail.value.college!="河工软件学院" && e.detail.value.userName!="admin" && e.detail.value.userPwd!="admin"){
      m.showTost('学号或密码错处');
      return;
    }else{
      wx.redirectTo({
        url: '../index/index',
      })
    }
  }

})
