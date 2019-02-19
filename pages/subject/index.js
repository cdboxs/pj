// pages/subject/index.js
import {M} from "../../utils/M.js";
let m=new M();
let app=getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:app.globalData.windowWidth,
    height:'',
    tKey:1,
    coreAll:[],
    items:[] 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    m.query('.teacher',(e)=>{
      that.setData({
        height: app.globalData.windowHeight-e[0].height
      });
    });
    that.setData({
      id:options.id,
      types: options.types,
      tname: options.tname,
      subjectname: options.subjectname
    });
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
    m.testQuestions({ types:that.data.types }).then((res)=>{
      //console.log(res);
      if(res.data.code==200&&res.data.data.length!=0){
        let items = [], options = [];
        res.data.data.map((item, key)=>{
          let t = {}, opsArr = [];
          t.tNum=item.id;
          t.title= item.ptittle;
          t.pscore= item.pscore;
          t.tList= item;
          items.push(t);
          opsArr[0] = { name: 'A', value: items[key].tList.A, rule:1.0 }
          opsArr[1] = { name: 'B', value: items[key].tList.B, rule: 0.95 }
          opsArr[2] = { name: 'C', value: items[key].tList.C, rule: 0.85 }
          opsArr[3] = { name: 'D', value: items[key].tList.D, rule: 0.75 }
          items[key].tList = opsArr;
        });
    
        that.setData({
          items: items,
          tLength: res.data.data.length
        });
        console.log(items);
        
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
  checkT(e){
    if (that.data.tKey <= that.data.tLength){
      
      wx.showToast({
        title: '',
        icon: 'success',
        mask: true,
        duration: 500
      })
      setTimeout(() => {
        if (that.data.tKey == that.data.tLength) {
          let nextkey = that.data.tKey;
          that.setData({
            tKey: nextkey
          });
        } else {
          let nextkey = that.data.tKey += 1;
          that.setData({
            tKey: nextkey
          });
        }
        
      }, 600); 
      if (that.data.coreAll[e.currentTarget.dataset.optionid - 1]!=undefined){
        that.data.coreAll[e.currentTarget.dataset.optionid - 1]=e.detail.value;
        console.log(that.data.coreAll);
      }else{
        that.data.coreAll.push(e.detail.value);
        console.log(that.data.coreAll[e.currentTarget.dataset.optionid - 1]);
        console.log(that.data.coreAll);
      }
    }
   
  },
  next(e){
    console.log(e.currentTarget.dataset.nowkey);
    if (that.data.tKey == that.data.items.length) {
      m.showTost('暂无题目');
      return;
    } else if (that.data.coreAll[e.currentTarget.dataset.nowkey-1] == undefined) {
      m.showTost('请答题');
      return;
    }else{
      let nextkey = that.data.tKey += 1;
      that.setData({
        tKey: nextkey
      });
    }
  },
  prev() {
    if (that.data.tKey==1){
      m.showTost('暂无题目');
      return;
    }else{
      let prevkey = that.data.tKey -= 1;
      that.setData({
        tKey: prevkey
      });
    }
  },
  ceptea(e){
    m.showLoading('正在提交');
    m.ceptea({ cid: wx.getStorageSync('userInfo').cid, tid: that.data.id, sid: wx.getStorageSync('userInfo').id, code: wx.getStorageSync('userInfo').code, option: that.data.coreAll }).then((res) => {
      if (res.data.code == 200) {
        wx.hideLoading();
        wx.reLaunch({
          url: '../index/index',
        })
      }else if(res.data.code==400){
        wx.hideLoading();
        m.showTost('请答完题目');
      }
    });
 
  }
})