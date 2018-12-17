//user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon: 0,
    Vouchers: 0,
    username: null,
    avatarUrl: "",//用户头像
    nickName:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断用户是否登录
      if (app.appData.userinfo ==null) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      this.setData({username:app.appData.userinfo.username})
    }
    var that=this;
    // //获取头像和名字
    wx.getUserInfo({
      success: function (res) {
        // console.log(1);
        // console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        })
      }
    })
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
    var that = this
    // pageNum = 1;
    that.onLoad()
    wx.stopPullDownRefresh();
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
  map:function(){
    wx.navigateTo({
      url: '../../location/location',
    })
  },
  seller:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  }
})