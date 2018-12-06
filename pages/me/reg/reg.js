var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    repassword: null,
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
  regbtnClick: function () {
    var that = this;
    wx.request({
      url: 'https://www.leijiangmm.xyz/userSignIn', //仅为示例，并非真实的接口地址
      data: {
        username: that.data.username,
        password: that.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("注册");
        console.log(res)
        // 在此处检验密码
        // if (that.data.username == res.data.data.ousername && that.data.password == res.data.data.opassword)
        if (that) {
          wx.redirectTo({
            url: '../login/login',
          })
        } else {  
          console.log("两次密码不同");
        }
      },
    })

  },
  usernameInput: function (event) {
    // console.log(event);
    this.setData({
      username: event.detail.value
    });
  },
  passwordInput: function (event) {
    this.setData({
      password: event.detail.value
    });
  },
  repasswordInput: function (event) {
    this.setData({
      repassword: event.detail.value
    });

  }
})