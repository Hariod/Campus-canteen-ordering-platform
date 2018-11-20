var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    password:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("--onload--");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("--onReady--");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("-- onShow--");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("--onHide--");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("--onUnload--");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("--onPullDownRefresh--");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("--onReachBottom--");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("--onShareAppMessag-");
  },
  regbtnClick:function(){
    // app.appdata.userinfo={username:this.data.username,password:this.data.password} 
    wx.redirectTo({
      url: '../login/login',
    })
  },
  usernameInput:function(){
    this.setData({username: event.datail.value})
  },
 passwordInput: function () {
   this.setData({password:event.datail.value})
  }
})