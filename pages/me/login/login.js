var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("--onload--");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("--onReady--");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("--onShow--");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("--onHide--");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("-- onUnload--");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("--onPullDownRefresh--");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("--onReachBottom--");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log("--onShareAppMessage--");
  },


  loginbtnClick: function(e) {
    // console.log(11);


    var that = this;
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5bd9cae25c4a0e732444aa5d/login', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //         // 在此处检验密码
    //     if(that.data.username==res.data.data.ousername&&that.data.password==res.data.data.opassword)
    //     {
    //       wx.switchTab({
    //         url: '/pages/me/user/user',
    //       })
    //     }
    //     else
    //     {
    //       console.log("密码错误");
    //     }
    //   },
    // })
    wx.request({
      url: 'https://www.leijiangmm.xyz/UserLogin', //仅为示例，并非真实的接口地址
      data: {
        username: 'that.data.username',
        password: 'that.data.password'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success(res) {
        console.log("登录");
        console.log(res)
        // 在此处检验密码
        // if (that.data.username == res.data.data.ousername && that.data.password == res.data.data.opassword)
        if (that) {
          wx.switchTab({
            url: '/pages/me/user/user',
          })
        } else {
          console.log("密码错误");
        }
      },
    })
    app.appData.userinfo = {
      username: this.data.username,
      password: this.data.password
    }; //设置userinfo下面的内容
    console.log(22);
  },

  usernameInput: function(event) {
    // console.log(event);
    this.setData({
      username: event.detail.value
    });
  },
  passwordInput: function(event) {
    // console.log(event);
    this.setData({
      password: event.detail.value
    });
  },
  homeClick: function() {
    wx.switchTab({
      url: '../../home/home',
    })
  }
})