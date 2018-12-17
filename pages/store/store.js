var app = getApp()
var old_scrollTop = 0;
var temp_goods = [];
var temp_foods = [];
Page({
  data: {
    goods: [],
    toView: '0',
    scrollTop: 100,
    foodCounts: 0,
    totalPrice: 0, // 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    minPrice: 20, //起送價格
    payDesc: '',
    deliveryPrice: 4, //配送費
    fold: true,
    user_info: {},
    selectFoods: [{
      price: 20,
      count: 2
    }],
    cartList: {
      total_price: 0,
      total_count: 0,
      list: {}
    },
    cartShow: 'none',
    status: 0,
    store_status: 1,
    store_status_string: '在营业',
    classifySeleted: '',
    header_show: true,
    store_info: {},
    user_info: {},
    height: 0, // scroll-wrap 的高度，这个高度是固定的
    inner_height: 0, // inner-wrap 的高度，这个高度是动态的
    scroll_top: 0, // 滚动到位置。
    start_scroll: 0, // 滚动前的位置。
    touch_down: 0,
    store_id:null
  },

  selectMenu: function(e) {
    // console.log(e)

    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString(),
      classifySeleted: e.currentTarget.dataset.itemIndex
    })
    // console.log(this.data.toView);
  },
  onGoodsScroll2: function(e) {},
  onGoodsScroll: function(e) {
    // 联动左侧导航
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true,
      });
      // var temp_header=
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false,
      });
    }
    var scale = e.detail.scrollWidth / 550,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = e.detail.scrollHeight;
    len = this.data.goods.length;
    this.data.goods.forEach(function(item, i) {

      var _h = 70 + item.foods.length * (46 * 3 + 20 * 2);

      if (scrollTop >= h - 100 / scale) {
        classifySeleted = i;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  //移除商品
  decreaseCart: function(e) {
    var food_id = e.currentTarget.dataset.food_id;
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count--
      var num = this.data.goods[parentIndex].foods[index].Count;
    var mark = 'a' + index + 'b' + parentIndex
    var name = this.data.goods[parentIndex].foods[index].food_name;
    var price = this.data.goods[parentIndex].foods[index].food_price;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      food_id: food_id
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark);
    carArray1.push(obj);
    if (num == 0) {
      delete this.data.cartList.list[food_id];
    } else {
      this.data.cartList.list[food_id].num = num;
    }

    // console.log(this.data.cartList);
    this.setData({
      cartList: this.data.cartList,
      carArray: carArray1,
      goods: this.data.goods
    })
    // console.log(this.data.carArray)
    this.calTotalPrice()
    this.setData({
      payDesc: this.payDesc(),
    })
    //关闭弹起
    var count1 = 0
    for (let i = 0; i < carArray1.length; i++) {
      if (carArray1[i].num == 0) {
        count1++;
      }
    }
    //console.log(count1)
    if (count1 == carArray1.length) {
      if (num == 0) {
        this.setData({
          cartShow: 'none'
        })
      }
    }
  },
  decreaseShopCart: function(e) {
    // console.log(e);
    this.decreaseCart(e);
  },

  //添加到购物车



  addCart(e) {

    // console.log(e)
    // console.log(this.data.goods)
    var food_id = e.currentTarget.dataset.food_id;
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].food_price;
    var num = this.data.goods[parentIndex].foods[index].Count;
    var name = this.data.goods[parentIndex].foods[index].food_name;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex,
      food_id: food_id
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)

    this.data.cartList.list[food_id] = obj;
    // console.log(this.data.cartList);
    // console.log(carArray1);
    this.setData({
      cartList: this.data.cartList,
      carArray: carArray1,
      goods: this.data.goods
    })
    // console.log(this.data.goods);
    // console.log(this.data.carArray)
    this.calTotalPrice();
    this.setData({
      payDesc: this.payDesc()
    })
  },
  addShopCart: function(e) {
    // console.log(e);F
    this.addCart(e);
  },
  //计算总价
  calTotalPrice: function() {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].num;
      totalCount += carArray[i].num
    }
    this.data.cartList.total_price = totalPrice;
    this.data.cartList.total_count = totalCount;
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
      cartList: this.data.cartList
    });
  },

  submit_pay: function(e) {
    // console.log(e);

    var data = {
      cartList: this.data.cartList,
      store_info: this.data.store_info,
      uer_info: this.data.user_info
    }
    // console.log(this.data.user_info)
    if (app.appData.userinfo == null) {
      wx.navigateTo({
        url: '../me/login/login',
      })
    } else {
      wx.navigateTo({
        url: '/pages/store/payed1/payed1?order_info=' + JSON.stringify(data),
      })
    }


  },
  payDesc() {
    if (this.data.totalPrice === 0) {
      return `￥${this.data.minPrice}元起送`;
    } else if (this.data.totalPrice < this.data.minPrice) {
      let diff = this.data.minPrice - this.data.totalPrice;
      return '还差' + diff + '元起送';
    } else {
      return '去结算';
    }
  },
  //結算
  // pay() {
  //   if (this.data.totalPrice < this.data.minPrice) {
  //     return;
  //   }
  //   // window.alert('支付' + this.totalPrice + '元');
  //   //确认支付逻辑
  //   var resultType = "success";
  //   wx.redirectTo({
  //     url: '../goods/pay/pay?resultType=' + resultType
  //   })
  // },

  empty: function(e) {

    this.data.cartList.list = {}

    for (var i = 0; i < this.data.goods.length; i++) {
      for (var j = 0; j < this.data.goods[i].foods.length; j++) {
        this.data.goods[i].foods[j].Count = 0;
      }
    }

    this.setData({
      cartList: this.data.cartList,
      totalCount: 0,
      totalPrice: 0,
      goods: this.data.goods
    })
  },
  //彈起購物車
  toggleList: function() {
    if (!this.data.totalCount) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    //console.log(this.data.fold);
    this.cartShow(fold)
  },
  cartShow: function(fold) {
    // console.log(fold);
    if (fold == false) {
      this.setData({
        cartShow: 'block',
      })
    } else {
      this.setData({
        cartShow: 'none',
      })
    }
    // console.log(this.data.cartShow);
  },

  onLoad: function(options) {
    console.log(app.appData.click_index+"232323");
    // 页面初始化 options为页面跳转所带来的参数
    if (options) {
      var that = this;
      let data = JSON.parse(options.store_info)
      // console.log(data)
      that.setData({
        store_info: data.store_info,
        user_info: data.uer_info
      })
    }
    var that = this;
    var temp_store_info = wx.getStorageSync("store_id");
    var temp_food_store_id = wx.getStorageSync("food_store_id");
    that.setData({
      store_id: temp_store_info,
    })
    wx.request({
      url: 'https://www.leijiangmm.xyz/food',
      data: {
        id: that.data.store_id
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function(res) {
        // console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].foods.length; j++) {
            var temp_src1 = '' + res.data[i].foods[j].food_picpath;
            var temp_src3 = temp_src1.substring(7).replace("\\", "/");
            var temp_src = "https://www.leijiangmm.xyz" + temp_src3;
            var temp_foodss = {
              "id": res.data[i].foods[j].id,
              "food_desc": res.data[i].foods[j].food_desc,
              "food_name": res.data[i].foods[j].food_name,
              "food_picpath": temp_src,
              "food_price": res.data[i].foods[j].food_price,
              "food_sold": res.data[i].foods[j].food_sold,
              "Count": 0
            };
            temp_foods[j] = temp_foodss;
          }
          temp_goods[i] = {
            foods: temp_foods,
            class_name: res.data[i].class_name
          };
          temp_foods = [];
        }
        that.setData({
          goods: temp_goods
        })
        // console.log(that.data.goods);
      }
    })
    this.setData({
      payDesc: this.payDesc()
    });
  },

  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})