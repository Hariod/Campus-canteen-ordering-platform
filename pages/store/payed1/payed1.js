var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    currentTab: 0,
    cartList: {},
    store_info: {},
    payed_address: null,
    payed_address_detail: null,
    payed_name: null,
    payed_sex: null,
    payed_tel: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    var that = this;
    let data = JSON.parse(options.order_info)
    console.log(data)
    that.data.cartList = data.cartList;
    that.data.store_info = data.store_info;
    that.data.user_info = data.uer_info;
    // console.log(that.data.store_info)
    that.setData({
      cartList: that.data.cartList,
      store_info: that.data.store_info,
      user_info: that.data.user_info
    })
console.log(this.data.cartList);
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
    console.log(app.appData.userAddress)
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
  to_pay: function (e) {


    wx.request({
      url: 'https://www.leijiangmm.xyz/intoUserOrder',
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      method: 'POST',
      data: {
        all_info: {
          cartList: this.data.cartList,
          store_info: this.data.store_info,
          user_info: this.data.user_info
        }
      },
      // data:{
      //     key:{
      //       "name":"leijiang"
      //     }
      // },
      success: function (res) {

      }
    })
    // wx.navigateTo({
    //   url: '',
    //   success: function(res) {},

    // })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabNav: function (e) {
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
  stopTouchMove: function () {
    return false;
  },
  imageLoad: function (e) {
    // console.log("图片加载");
    // console.log(e);
  },
  adressClick: function (e) {
    wx.navigateTo({
      url: '../../location/location',
    })
  }
})