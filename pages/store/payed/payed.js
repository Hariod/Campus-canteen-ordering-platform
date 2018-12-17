var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    select_address:null,
    payed_address:null,
    payed_address_detail:null,
    payed_name:null,
   payed_sex:null,
   payed_tel:null ,
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
        // console.log(res)
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
        // console.log("获取订单详情信息失败");
      }
    })
    var query = wx.createSelectorQuery();
    query.select('#wmps').boundingClientRect(function(rect) {
      // console.log(rect.height)
      that.setData({
        height: rect.height + 'px'
      })
    }).exec();

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
    if (app.appData.userAddress == null) {
      this.setData({ select_address: false })
    } else {
      this.setData({
        select_address: true,
        payed_address: app.appData.userAddress.address,
        payed_address_detail: app.appData.userAddress.address_detail,
        payed_name: app.appData.userAddress.name,
        payed_sex: app.appData.userAddress.sex,
        payed_tel: app.appData.userAddress.tel,
      })
    }
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
  tabNav: function(e) {
    // console.log(e.target.dataset.current, 1111111, this.data.currentTab)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  stopTouchMove: function() {
    return false;
  },
  imageLoad: function(e) {
    // console.log("图片加载");
    // console.log(e);
  },
  adressClick: function(e) {
    wx.navigateTo({
      url: '../../location/location',
    })
  }
})