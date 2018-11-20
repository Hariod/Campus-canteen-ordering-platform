var app = getApp()
var amapFile = require('../../libs/amap-wx.js');
var li = [];
var old_temp = [];
var is_request_my__receive_address = false;
Page({
  data: {
    locationList: [],
    hidden: true,
    add_rece_address_list: li,
  },
  onTap: function(e) {
    // console.log("ONtap" + e)

    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  // 重新选择收获地址
  toCleanOrder: function(e) {
    var that = this;
    console.log(e);
    for (var i = 0; i < that.data.add_rece_address_list.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        li[e.currentTarget.dataset.index].image = "../image/check.png"
      } else {
        li[i].image = "../image/uncheck.png"
      }
    }
    that.setData({
      add_rece_address_list: li
    })
    app.appData.userAddress = {
      address: e.currentTarget.dataset.address,
      address_detail: e.currentTarget.dataset.address_detail,
      frequent_address: e.currentTarget.dataset.frequent_address,
      index: e.currentTarget.dataset.index,
      name: e.currentTarget.dataset.name,
      sex: e.currentTarget.dataset.sex,
      tel: e.currentTarget.dataset.tel,
    };
  },

  getLocation2: function() {

    var that = this;
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
    wx.chooseLocation({
      success: function(res) {
        var address = 'new_receive_address.address';
        wx.setStorageSync('location', res.name);
        // wx.switchTab({
        //   // url: '/pages/home/home'
        // })
      }
    });

  },

  getLocation: function() {
    var myAmapFun = new amapFile.AMapWX({
      key: '632ed44ee98a0467108450b949fca3a0'
    });
    myAmapFun.getRegeo({
      success: function(data) {
        wx.setStorageSync('location', data["0"].desc);
      }
    })

    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  input: function(e) {
    if (e.detail.value) {
      this.setData({
        hidden: false
      })
      this.search(e.detail.value);
    } else {
      this.setData({
        hidden: true
      })
    }
  },
  toModifyAddre: function(e) {
    // console.log(e);
    var do_what = "modify";
    var that = this;
    wx.navigateTo({
      url: '/pages/location/rece_address/rece_address',
    });
    wx.setStorageSync("do_what", do_what);
    wx.setStorageSync("modify_data", that.data.add_rece_address_list[e.currentTarget.dataset.index]);
  },
  search: function(text) {
    var that = this;
    wx.request({
      url: 'http://api.map.baidu.com/place/v2/search?query=' + text + '&page_size=20&page_num=0&scope=2&region=南昌&output=json&ak=btsVVWf0TM1zUBEbzFz6QqWF',
      success: function(res) {
        // console.log(res);
        that.setData({
          locationList: res.data.results
        })
      }
    })
  },
  add_rece_address: function() {
    var that = this;
    var do_what = "add";
    wx.navigateTo({
      url: '/pages/location/rece_address/rece_address'
    });
    wx.setStorageSync("do_what", do_what);
    // console.log(that.data.add_rece_address_list.length);
    wx.setStorageSync("list_length", that.data.add_rece_address_list.length)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // console.log(li);
    // console.log(is_request_my__receive_address);
    if (!is_request_my__receive_address) {

      wx.request({
        url: 'https://www.easy-mock.com/mock/5bd3391e7713f54106107251/my__receive_address',
        method: 'GET',
        success: function(res) {
          li = res.data.li;
          that.setData({
            add_rece_address_list: li
          });
          // console.log(li);
        }
      });

      is_request_my__receive_address = !is_request_my__receive_address;
    } else {

      // var li = wx.getStorageSync("li");
      // }
      // console.log("我开始运行了");
      // console.log(li);
      that.setData({
        add_rece_address_list: li
      });
      var temp = wx.getStorageSync("new_receive_address_item_modify");
      var temp2 = wx.getStorageSync("new_receive_address_item_add");
      console.log(temp);
      console.log(temp2);
      if (temp) {
        // console.log(temp);
        li[temp.index] = temp;
        // li.push(temp);
        that.setData({
          add_rece_address_list: li
        });
        wx.clearStorage("new_receive_address_item_modify");
      }
      if (temp2) {
        li.push(temp2);
        that.setData({
          add_rece_address_list: li
        });
        wx.clearStorage("new_receive_address_item_add");
      }
    }
  },
  onReady: function() {

  },
  onUnload: function() {
    // wx.reLaunch({
    //   url: '/pages/home/home'
    // })
  }
})