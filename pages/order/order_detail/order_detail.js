// pages/order/order_detail/order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: null,
    discount: null,
    customer_name: null,
    customer_phone: null,
    customer_address: null,
    order_number: null,
    order_time: null,
    order_data: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bd9a4325c4a0e732444a994/order',
      // data: {
      //   x: '',
      //   y: ''
      // },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          arr: res.data.order_detail.arr,
          discount: res.data.order_detail.discount,
          customer_name: res.data.order_detail.customer_name,
          customer_phone: res.data.order_detail.customer_phone,
          customer_address: res.data.order_detail.customer_address,
          order_number: res.data.order_detail.order_number,
          order_data: res.data.order_detail.order_data,
          order_time: res.data.order_detail.order_time,
        })
      },
      fail(res) {
        console.log("获取订单详情信息失败");
      }
    })
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

  }
})