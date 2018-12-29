// pages/hot/hot.js
var hot_information = {}
var hot = []
var app=getApp()
var temp_status = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中...',
    })
    var that = this;
    wx.request({
      url: 'https://www.leijiangmm.xyz/sellHot',
      success(res) {
        // console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          var img_src1 = '' + res.data[i].food_picpath;
          var img_src3 =img_src1.substring(7).replace("\\", "/");
          var img_src = "https://www.leijiangmm.xyz" + img_src3;
          hot_information = {
            "foods_belong_store_id":res.data[i].foods_belong_store,
            "food_name": res.data[i].food_name,
            "food_number": res.data[i].food_sold,
            "food_price": res.data[i].food_price,
            "food_img":img_src,
          }
          hot[i] = hot_information;
        }
        that.setData({ arr: hot });
      },
    })
    wx.hideLoading();
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
  foodclick: function (event) {
    // console.log(event.currentTarget.dataset.foods_belong_store_id);
    app.appData.click_index=2;
    console.log(app.appData.click_index);
    wx.setStorageSync("food_store_id", event.currentTarget.dataset.foods_belong_store_id);
    if (app.appData.userinfo != null) {
      temp_status = app.appData.userinfo
    }
    var temp_data = {

      uer_info: temp_status
    }
    wx.navigateTo({
      url: '/pages/store/store?store_info=' + JSON.stringify(temp_data),
    })
  }
})
