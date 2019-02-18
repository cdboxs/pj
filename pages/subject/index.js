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
    items:[
      {
        tNum:1,
        title:'1、请问蹦鋇霸是妖精吗？',
        tList: [
          { name: 'A', value: '企事业单位及', checked: 'true' },
          { name: 'B', value: '企事业单位及商铺可' },
          { name: 'C', value: '企事业单位及商铺可将春联贴在本单位或商铺自身的门窗内外等其他易清理位置' },
          { name: 'D', value: '企事业单位及商铺可将春联贴在本单位或商铺自身的门窗内外等其他易清理位置' },
        ]
      },
      {
        tNum: 2,
        title: '2、请问孙悟空是谁的儿子？',
        tList: [
          { name: 'A', value: '企事业单位及', checked: 'true' },
          { name: 'B', value: '企事业单位及商铺可' },
          { name: 'C', value: '企事业单位及商铺可将春联贴在本单位或商铺自身的门窗内外等其他易清理位置' },
          { name: 'D', value: '企事业单位及商铺可将春联贴在本单位或商铺自身的门窗内外等其他易清理位置' },
        ]
      }
    ] 
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
          opsArr[0] = { name: 'A', value: items[key].tList.A }
          opsArr[1] = { name: 'B', value: items[key].tList.B }
          opsArr[2] = { name: 'C', value: items[key].tList.C }
          opsArr[3] = { name: 'D', value: items[key].tList.D }
          items[key].tList = opsArr;
        });
    
        that.setData({
          items: items
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
    wx.showToast({
      title: '',
      icon:'success',
      mask:true,
      duration:500
    })
    setTimeout(()=>{
      let nextkey = that.data.tKey += 1;
      that.setData({
        tKey: nextkey
      });
    },600);
   
    // console.log(e);
  },
  next(){
    if (that.data.tKey == that.data.items.length) {
      m.showTost('暂无题目');
      return;
    }
    let nextkey=that.data.tKey+=1;
    that.setData({
      tKey:nextkey
    });
  },
  prev() {
    if (that.data.tKey==1){
      m.showTost('暂无题目');
      return;
    }
    let prevkey = that.data.tKey -= 1;
    that.setData({
      tKey: prevkey
    });
  }
})