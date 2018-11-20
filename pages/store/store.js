
var old_scrollTop = 0;
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
    selectFoods: [{
      price: 20,
      count: 2
    }],
    cartShow: 'none',
    status: 0,
    store_status: 1,
    store_status_string: '正在营业',
    classifySeleted: '',
    header_show: true,
    store_info: {},
    height: 0, // scroll-wrap 的高度，这个高度是固定的
    inner_height: 0, // inner-wrap 的高度，这个高度是动态的
    scroll_top: 0, // 滚动到位置。
    start_scroll: 0, // 滚动前的位置。
    touch_down: 0 // 触摸时候的 Y 的位置
  },

  selectMenu: function (e) {
    // console.log(e)

    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      toView: 'order' + index.toString(),
      classifySeleted: e.currentTarget.dataset.itemIndex
    })
    // console.log(this.data.toView);
  },





  onGoodsScroll2: function (e) {
    // var that = this;
    // console.log(e);
    // var sub_length = e.touches["0"].clientY - old_scrollTop;
    // old_scrollTop = e.touches["0"].clientY;
    //   console.log(sub_length);
    // if (sub_length > 100) {
    //   that.setData({
    //     header_show: false
    //   });
    // } else if (sub_length<-100){
    //   that.setData({
    //     header_show: true
    //   });
    // }

  },
  onGoodsScroll: function (e) {


    // var that=this;
    //   var sub_length = e.detail.scrollTop - old_scrollTop;
    //     old_scrollTop = e.detail.scrollTop;
    //   // console.log(sub_length);
    //   if (sub_length>20){
    //     that.setData({
    //       header_show: false
    //     });
    //   } else{
    //     that.setData({
    //       header_show: true
    //     });
    //   }



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

    this.data.goods.forEach(function (item, i) {

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
  decreaseCart: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count--
    var num = this.data.goods[parentIndex].foods[index].Count;
    var mark = 'a' + index + 'b' + parentIndex
    var name = this.data.goods[parentIndex].foods[index].name;
    var price = this.data.goods[parentIndex].foods[index].price;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark);
    carArray1.push(obj);
    // console.log(carArray1);
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
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
  decreaseShopCart: function (e) {
    // console.log('1');
    this.decreaseCart(e);
  },
  //添加到购物车
  addCart(e) {
    var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goods[parentIndex].foods[index].Count++;
    var mark = 'a' + index + 'b' + parentIndex
    var price = this.data.goods[parentIndex].foods[index].price;
    var num = this.data.goods[parentIndex].foods[index].Count;
    var name = this.data.goods[parentIndex].foods[index].name;
    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex
    };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    // console.log(carArray1);
    this.setData({
      carArray: carArray1,
      goods: this.data.goods
    })
    this.calTotalPrice();
    this.setData({
      payDesc: this.payDesc()
    })
  },
  addShopCart: function (e) {
    this.addCart(e);
  },
  //计算总价
  calTotalPrice: function () {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].num;
      totalCount += carArray[i].num
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
      //payDesc: this.payDesc()
    });
  },
  //差几元起送
  submit_pay: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: '/pages/store/payed/payed',
    })
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
  pay() {
    if (this.data.totalPrice < this.data.minPrice) {
      return;
    }
    // window.alert('支付' + this.totalPrice + '元');
    //确认支付逻辑
    var resultType = "success";
    wx.redirectTo({
      url: '../goods/pay/pay?resultType=' + resultType
    })
  },
  // empty:function(e){
  //   this.setData({

  //       carArray: none,

  //   })
  // },
  //彈起購物車
  toggleList: function () {
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
  cartShow: function (fold) {
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

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数



    var that = this;
    var temp_store_info = wx.getStorageSync("store_info");
    // console.log(temp_store_info);
    that.setData({
      store_info: temp_store_info
    })
 
    wx.request({
      url: 'https://www.easy-mock.com/mock/5bc4ade739e6c639bca090cd/whlsp/',
      // data: {
      //   id: store_info
      // },
      method: 'GET',
      success: function (res) {
        that.setData({
          goods: res.data.goods
        })
        // console.log(that.data.goods);
      }
    })
    this.setData({
      payDesc: this.payDesc()
    });




  },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})