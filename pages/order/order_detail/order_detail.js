// pages/order/order_detail/order_detail.js
var app = getApp()
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
    store_name:null,
    store_img:null,
    cost:null,
  },
  onLoad:function(){
    
    // console.log(app.appData.order[app.appData.order_index])
    this.setData({
      store_img: app.appData.order[app.appData.order_index].img,
      store_name: app.appData.order[app.appData.order_index].store_name,
      arr: app.appData.order[app.appData.order_index].order_vegetable,
      discount: app.appData.order[app.appData.order_index].discount,
      customer_name: app.appData.order[app.appData.order_index].customer_name,
      customer_phone: app.appData.order[app.appData.order_index].customer_phone,
      customer_address: app.appData.order[app.appData.order_index].customer_address,
      order_number: app.appData.order[app.appData.order_index].id,
      order_time: app.appData.order[app.appData.order_index].order_time,
      cost: app.appData.order[app.appData.order_index].cost
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