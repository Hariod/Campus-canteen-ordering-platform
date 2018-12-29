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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
   
  },


  loginbtnClick: function(e) {
    // console.log(11);


    var that = this;
    wx.request({
      url: 'https://www.leijiangmm.xyz/UserLogin', 
      data: {
        username: that.data.username,
        password: that.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success(res) {
        // console.log("登录");
        // console.log(res)
        if (res.data == null) {
          // console.log("密码错误");
          wx.showModal({
            content: '账号或密码错误',
            duration: 1000,
          })
        } else {
          wx.switchTab({
            url: '/pages/me/user/user',
          })
        }
      },
    })
    app.appData.userinfo = {
      username: this.data.username,
      password: this.data.password
    }; //设置userinfo下面的内容
    // console.log(22);
  },

  usernameInput: function(event) {
   
    this.setData({
      username: event.detail.value
    });
  },
  passwordInput: function(event) {
   
    this.setData({
      password: event.detail.value
    });
  },
  homeClick: function() {
    wx.switchTab({
      url: '../../home/home',
    })
  
  },
  regClick: function() {
    wx.redirectTo({
      url: '../reg/reg',
    })
  }
})