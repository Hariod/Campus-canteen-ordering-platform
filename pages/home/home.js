// pages/home/home.js
var temp_location = "获取位置";
var temp_restaurant = [];
var temp_obj_restauran = {};
var temp_adver_img = [];
var temp_user_info = {};
var temp_status = null;
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    characteristicList: [{
      text: "免配送费"
    }, {
      text: "0元起送"
    }, {
      text: "新商家"
    }, {
      text: "品牌商家"
    }, {
      text: "跨天预定"
    }],
    sortList: [{
      sort: "综合排序",
      image: "",
    }, {
      sort: "速度最快",
      image: "",
    }, {
      sort: "评分最高",
      image: "",
    }, {
      sort: "起送价最低",
      image: "",
    }, {
      sort: "配送费最低",
      image: "",
    }],
    discountList: [{
      icon: "减",
      iconColor: "#FF635B",
      text: "满减优惠"
    }, {
      icon: "领",
      iconColor: "#FF7298",
      text: "进店领券"
    }, {
      icon: "返",
      iconColor: "#FB4343",
      text: "满返代金券"
    }, {
      icon: "折",
      iconColor: "#C183E2",
      text: "折扣商品"
    }, {
      icon: "订",
      iconColor: "#6FDF64",
      text: "提前下单优惠"
    }, {
      icon: "赠",
      iconColor: "#FDC41E",
      text: "满赠活动"
    }, {
      icon: "免",
      iconColor: "#43B697",
      text: "满免配送"
    }],
    categoryList: {
      pageone: [{
        name: "美食",
        src: "/pages/image/1.png"
      }, {
        name: "甜点饮品",
        src: "/pages/image/2.png"
      }, {
        name: "武职食堂",
        src: "/pages/image/3.png"
      }, {
        name: "正餐精选",
        src: "/pages/image/4.png"
      }, {
        name: "生鲜果蔬",
        src: "/pages/image/5.png"
      }, {
        name: "全部商家",
        src: "/pages/image/6.png"
      }, {
        name: "免配送费",
        src: "/pages/image/7.png"
      }, {
        name: "新商家",
        src: "/pages/image/8.png"
      }],
    },
    user_info: {
    },
    selected: 0,
    mask1Hidden: true,
    mask2Hidden: true,
    animationData: "",
    location: "点击定位",
    characteristicSelected: [false, false, false, false, false, false, false],
    discountSelected: null,
    selectedNumb: 0,
    sortSelected: "综合排序",
    adver_list: 9,
    adver_img: [],
    restaurant: [],
  },
  finish: function () {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5bd082811650950db51030fe/restaurant",
      method: "GET",
      success: function (res) {
        // console.log(res);
        that.setData({
          restaurant: res.data.data.restaurant,
        })
      }
    });
  },
  sortSelected: function (e) {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/5bd082811650950db51030fe/restaurant",
      method: "GET",
      success: function (res) {
        that.setData({
          restaurant: res.data.data.restaurant,
          sortSelected: that.data.sortList[e.currentTarget.dataset.index].sort
        })
      }
    });
  },
  clearSelectedNumb: function () {
    this.setData({
      characteristicSelected: [false],
      discountSelected: null,
      selectedNumb: 0
    })
  },
  characteristicSelected: function (e) {
    var info = this.data.characteristicSelected;
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index];
    this.setData({
      characteristicSelected: info,
      selectedNumb: this.data.selectedNumb + (info[e.currentTarget.dataset.index] ? 1 : -1)
    })
    // console.log(e.currentTarget.dataset.index);
  },
  discountSelected: function (e) {
    if (this.data.discountSelected != e.currentTarget.dataset.index) {
      this.setData({
        discountSelected: e.currentTarget.dataset.index,
        selectedNumb: this.data.selectedNumb + (this.data.discountSelected == null ? 1 : 0)
      })
    } else {
      this.setData({
        discountSelected: null,
        selectedNumb: this.data.selectedNumb - 1
      })
    }
  },
  onTapTag: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    });
  },
  mask1Cancel: function () {
    this.setData({
      mask1Hidden: true
    })
  },
  mask2Cancel: function () {
    this.setData({
      mask2Hidden: true
    })
  },
  onOverallTag: function () {
    this.setData({
      mask1Hidden: false
    })
  },
  onFilter: function () {
    this.setData({
      mask2Hidden: false
    })
  },
  to_store: function (e) {
    // console.log(e);
    var that = this;
    app.appData.click_index=1
    console.log(app.appData.click_index);
    // var store_info = that.data.restaurant[e.currentTarget.dataset.store_id];
    // console.log(e);
    // wx.setStorageSync("store_info", e.currentTarget.dataset);
    wx.setStorageSync("store_id", e.currentTarget.dataset.store_id)
    // console.log(temp_user_info)
    if (app.appData.userinfo != null) {
      temp_status = app.appData.userinfo
    }
    var temp_data = {
      store_info: e.currentTarget.dataset,
      uer_info: temp_status
    }
    wx.navigateTo({
      url: '/pages/store/store?store_info=' + JSON.stringify(temp_data),

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.appData.userinfo);
    var that = this;
    if (wx.getStorageSync('location')) {
      temp_location = wx.getStorageSync('location')
      // console.log(temp_location);
    }
    that.setData({
      location: temp_location
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: '#1198f3', // 必写项
      animation: { // 可选项
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    // 轮播图
    wx.request({
      url: "https://www.leijiangmm.xyz/adver_img",
      method: "GET",
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          var temp_src1 = '' + res.data[i].adver_picpath;
          var temp_src3 = temp_src1.substring(7).replace("\\", "/");
          var temp_src = "https://www.leijiangmm.xyz" + temp_src3;
          var temp_adver_img_child = temp_src;
          temp_adver_img[i] = temp_adver_img_child;
        }
        that.setData({
          adver_img: temp_adver_img
        })
      }
    });

    wx.request({
      url: "https://www.leijiangmm.xyz/allstore",
      method: "GET",
      success: function (res) {
        // console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {

          var temp_src1 = '' + res.data[i].store_picpath
          var temp_src3 = temp_src1.substring(7).replace("\\", "/");
          var temp_src = "https://www.leijiangmm.xyz" + temp_src3;
          // 可加满减优惠
          temp_obj_restauran = {
            "store_id": res.data[i].id,
            "name": res.data[i].store_name,
            "sales": res.data[i].sales,
            "src": temp_src,
            "initial_price": res.data[i].store_lowprice,
            "distribution_price": res.data[i].store_deli,
            "desc": res.data[i].store_desc,
            "statues": res.data[i].store_status,
            "store_discount": res.data[i].store_discount
          };
          temp_restaurant[i] = temp_obj_restauran;
        }
        // console.log(temp_restaurant) ;
        that.setData({
          restaurant: temp_restaurant
        });
        // console.log(that.data.restaurant)
      }
    });
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
    // console.log(app.appData.userinfo);
    var that = this;
    that.setData({
      location: temp_location
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

  }
})