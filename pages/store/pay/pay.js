Page({
  data: {
    resultType: "",
    resultContent: ""
  },
  onLoad: function (options) {
    var resultType = options.resultType;
    if (resultType == "success") {
      this.setData({
        resultType: "success",
        resultContent: "支付成功",
        url: '../../order/list/list?status=tosend'
      });
    } else {
      this.setData({
        resultType: "warn",
        resultContent: "支付失败",
        url: '../../order/list/list'
      });
    }
  }
});


