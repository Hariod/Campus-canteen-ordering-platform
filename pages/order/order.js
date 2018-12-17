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
    var log = this.data.logined;
    if (app.appData.userinfo == null) {
      this.setData({
        logined: false
      })
      // console.log("显示1");
    } else {
      this.setData({
        logined: true
      })
      // console.log("显示2");
    }

    var that = this;
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
        // console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          var img_src1 = '' + res.data[i].path;
          var img_src3 = img_src1.substring(7).replace("\\", "/");
          var img_src = "https://www.leijiangmm.xyz" + img_src3;
          order_information = {
            "store_name": res.data[i].order_storename,
            "order_time": res.data[i].order_time,
            "order_vegetable": res.data[i].order_food,
            "cost": res.data[i].order_total,
            "img":img_src,
            "id": res.data[i].id,
            "customer_name": res.data[i].id,
            "customer_phone": res.data[i].phone,
            "customer_address": res.data[i].order_deliver_address,
            "order_number": res.data[i].id,
            "orde_time": res.data[i].orde_time,
            "discount": res.data[i].order_descount
          }
          order[i] = order_information;
        }
        that.setData({
          arr: order
        });
        app.appData.order=order
        // console.log(app.appData.order)
      },
    })
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
  orderClick: function(e) {
    var index = e.currentTarget.dataset.index
    app.appData.order_index =index
    // console.log(app.appData.order_index)
    wx.navigateTo({
      url: 'order_detail/order_detail',
    })
  },
  deleteClick: function(e) {
    // console.log(e);
    var that = this
    var index = e.currentTarget.dataset.index
    // console.log(order[index].id)
    wx.showModal({
      title: '提示',
      content: '删除订单么,删除后不可恢复哦~',
      confirmColor: "#1daef2",
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定' + index)
          var list = that.data.arr;
          wx.request({
            url: 'https://www.leijiangmm.xyz/delUserOrder',
            data: {
              id: order[index].id,
            },
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded' // 默认值
            // },
            method: "POST",
            cachetime: '0',
            success: function(res) {
              // console.log(res)
              if (res.data == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000,
                })
                list.splice(index, 1);
                that.setData({
                  arr: list
                });
              } else {
                wx.showToast({
                  title: '请重试',
                  icon: 'loading',
                  duration: 1000,
                })
              }
            },
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  againClick: function() {
    wx.navigateTo({
      url: '../store/payed/payed',
    })
  },
  loginbtnClick: function() {
    wx.redirectTo({
      url: '../me/login/login',
    })
  }
})