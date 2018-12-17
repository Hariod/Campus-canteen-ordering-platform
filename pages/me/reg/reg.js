var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    password: null,
    repassword: null,
    yzm:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  regbtnClick: function () {    
    var that = this;
    // username: null,
    //   password: null,
    //     repassword: null,
    //       yzm: null
    if(this.data.username==""){
      wx.showModal({
        content: '请输入您的手机号',
        duration: 1000,
      })
    }
    else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.username))){
      wx.showModal({
        content: '手机号格式不正确',
        duration: 1000,
      })
    }
    else if (this.data.password == ""){
      wx.showModal({
        content: '密码不能为空',
        duration: 1000,
      })
    }
    else if (this.data.password != this.data.repassword){
      wx.showModal({
        content: '两次密码输入不同',
        duration: 1000,
      })
    }
    else{
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
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 1500,
                success:function(){
                  setTimeout(function(){
                    // wx.redirectTo({
                    //   url: '../login/login',
                    // })
                    wx.navigateBack()
                  },1500)
                 
                }
              })
            }
          })
        }
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
  ,
  yzmInput:function(event){
    this.setData({
      yzm:event.detail.value
    })
  }
})