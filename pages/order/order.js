// pages/order/order.js
var app = getApp()
var order_information = {}
var order = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: null,
    logined: null,
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
    var log = this.data.logined;
    if (app.appData.userinfo == null) {
      this.setData({ logined:false })
      console.log("显示1");
    }
    else {
      this.setData({ logined: true })
      console.log("显示2");
    }

    var that = this;
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5bd9a4325c4a0e732444a994/order',
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     that.setData({ arr: res.data.order.arr })
    //   },
    // })
    wx.request({
      url: 'https://www.leijiangmm.xyz/userOrder',
      data: {
        phone: app.appData.userinfo.username,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          var temp_src1 = '' + res.data[i].path;
          var temp_src3 = temp_src1.substring(7).replace("\\", "/");
          var temp_src = "https://www.leijiangmm.xyz" + temp_src3;
          order_information = {
            "store_name": res.data[i].order_storename,
            "order_time": res.data[i].order_time,
            "order_vegetable": res.data[i].order_food,
            "cost": res.data[i].order_total,
            "img": temp_src,
          }
          order[i] = order_information;
        }
        that.setData({ arr: order });
      },
    })
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
  orderClick: function () {
    wx.navigateTo({
      url: 'order_detail/order_detail',
    })
  },
  deleteClick: function (e) {
    console.log(e);
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '删除订单么',
      confirmColor: "#1daef2",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定' + index)
          var list = that.data.arr;
          wx.request({
            'url': 'https://www.easy-mock.com/mock/5bd9a0475c4a0e732444a967/delete',
            'cachetime': '0',
            success: function (res) {
              console.log(res)
              if (res.data.data == 'ok') {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000,
                })
                list.splice(index, 1);
                that.setData({
                  arr: list
                });
              }
              else {
                wx.showToast({
                  title: '请重试',
                  icon: 'loading',
                  duration: 1000,
                })
              }
            },
          })
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  againClick: function () {
    wx.navigateTo({
      url: '../store/payed/payed',
    })
  },
  loginbtnClick: function () {
    wx.redirectTo({
      url: '../me/login/login',
    })
  }
})