var index = 0;
// var last_index=2;
var li = [{
  sex: "先生",
  img: "../../image/uncheck.png"
}, {
  sex: "女士",
  img: "../../image/uncheck.png"
}];
var temp_new_receive_address = {};
var detail_do_what=''
Page({
  data: {
    name: "请填写您的姓名",
    tel: "请填写您的联系方式",
    addreValue: 0,
    addreRange: ['　　　　　　　　　　', '长沙市芙蓉区', '长沙市天心区', '长沙市雨花区', '长沙市开福区', '长沙市岳麓区', '长沙市长沙县'],
    door: "例：8楼808室",
    areaValue: 0,
    areaRange: ['家', '公司', '学校'],
    choose_address: '点击选择',
    address_selected: -1,
    sex_list: li,
    new_receive_address: {
      name: '',
      sex: '',
      tel: '',
      address: '',
      address_detail: '',
      frequent_address: '',
      image:'../image/uncheck.png',
      index:0
    }

  },
  areaPickerBindchange: function(e) {
    this.setData({
      areaValue: e.detail.value
    })
  },
  addrePickerBindchange: function(e) {
    this.setData({
      addreValue: e.detail.value
    })
  },
  formSubmit: function(e) {
    var warn = "";
    var that = this;
    var flag = false;
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.tel == "") {
      warn = "请填写您的联系电话！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
      warn = "手机号格式不正确！";
    } else if (e.detail.value.address == '') {
      warn = "请选择您的收货地址！";
    } else if (e.detail.value.address_detail == "") {
      warn = "请输入您的门牌号！";
    } else if (e.detail.value.frequent_address == '') {
      warn = "请选择您的常用地址！";

    } else {
      flag = true;
      // console.log('form发生了submit事件，携带数据为：', e.detail.value);

      var name = 'new_receive_address.name';
      var tel = 'new_receive_address.tel';
      var address_detail = 'new_receive_address.address_detail';
      that.setData({
        [name]: e.detail.value.name,
        [tel]: e.detail.value.tel,
        [address_detail]: e.detail.value.door,
      })
      // console.log(that.data.new_receive_address);
      if(detail_do_what=='modify'){
        wx.setStorageSync(
          "new_receive_address_item_modify", that.data.new_receive_address
        );

      }else{
        
        wx.setStorageSync(
          "new_receive_address_item_add", that.data.new_receive_address
        );
      }
     
      wx.showToast({
        title: '保存成功！',
      })
      wx.redirectTo({
        url: '../../location/location'
      
      });
      // console.log("传过去的地址下标是多少？" + e.detail.value.addre)
    }
    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }

  },
  sex_choose: function(e) {
    //  console.log(e);

    var that = this;
    var sex = 'new_receive_address.sex';

    for (var i = 0; i < that.data.sex_list.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        li[e.currentTarget.dataset.index].img = "../../image/check.png"
      } else {
        li[i].img = "../../image/uncheck.png"
      }
    }
    that.setData({
      sex_list: li,
      [sex]: e.currentTarget.dataset.sex
    });
    // console.log(that.data.new_receive_address);

  },
  address_selected: function(e) {
    // console.log(e);
    var that = this;
    var frequent_address = 'new_receive_address.frequent_address';
    that.setData({
      address_selected: e.currentTarget.dataset.index,
      [frequent_address]: e.currentTarget.dataset.address
    });
    // console.log(that.data.address_selected);

  },
  openmap: function(e) {
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
        that.setData({
          choose_address: res.name,
          [address]: res.name

        });
        // console.log(that.data.new_receive_address);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.longitude
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude
        })
        that.setData({
          longitude: longitude
        })
      }
    })
  }
  , 
  onLoad: function (option) {
    var that = this;
    var do_what = wx.getStorageSync("do_what");
    var temp_last_index=wx.getStorageSync("list_length");
    // console.log(temp_last_index);
    // last_index = temp_last_index;
    detail_do_what = do_what;
    var temp_index ='new_receive_address.index'

    that.setData({
      [temp_index]: temp_last_index
    
    })
    // console.log(do_what);
    if (do_what=="modify"){
    
      var modify_data = wx.getStorageSync("modify_data");
that.setData({
  new_receive_address: modify_data,
  choose_address: modify_data.address
})
      // console.log(that.data.new_receive_address)
    }

  }

})