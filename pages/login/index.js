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
    m.getDepart().then((res)=>{
      if(res.data.code==200){
        that.setData({
          college:res.data.data
        });
      }
    });
  },
  onShow(){
    let userInfo=wx.getStorageSync('userInfo');
    if (userInfo){
      wx.redirectTo({
        url: '../index/index',
      })
    }
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
    }else{
      m.showLoading('正在登录');
      m.mLogin({ did: e.detail.value.college, code: e.detail.value.userName, password: e.detail.value.userPwd}).then((res)=>{
        if(res.data.code==200){
          wx.setStorageSync('userInfo', res.data.data);
          wx.hideLoading();
          wx.redirectTo({
            url: '../index/index',
          })
        }else if(res.data.code==400){
          m.showTost(res.data.msg);
        }
      });
    }
  }

})
