// pages/package/selectClass/index.js
import {M} from "../../utils/M.js";
let app=getApp();
let m=new M();
let that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navId:1,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfo=wx.getStorageSync('userInfo');
    if (userInfo){that.setData({ u: userInfo})};
    m.getTeacher({ did: userInfo.did, cid: userInfo.cid, types: 0, code: userInfo.code}).then((res)=>{
      console.log(res);
      if(res.data.code==200){
        that.setData({
          t:res.data.data
        });
      }
      return m.getTeacher({ did: userInfo.did, cid: userInfo.cid, types: 1, code: userInfo.code });
    }).then((res)=>{
      if (res.data.code == 200) {
        that.setData({
          d: res.data.data
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  loginout(){
    m.showLoading('正在退出');
    wx.clearStorage();
    setTimeout(()=>{
      wx.reLaunch({
        url: '../login/index',
      })
    },1200);
  },
  clickNav(e){
    that.setData({
      navId: e.currentTarget.dataset.navid
    });
  },
  linkSubJect(e){
    wx.navigateTo({
      url: '../subject/index?types=' + e.currentTarget.dataset.types + '&tname=' + e.currentTarget.dataset.tname + '&subjectname=' + e.currentTarget.dataset.subjectname,
    })
  }
})






 