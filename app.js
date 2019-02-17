//app.js
App({
  globalData: {
    userInfo: null,
    windowWidth: '',
    windowHeight: ''
  },
  onLaunch: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      },
    })
  }

})