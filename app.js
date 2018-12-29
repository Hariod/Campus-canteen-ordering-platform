App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },
  onLoad:function(){
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  onLaunch: function () {
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.userInfo) {
      typeof cb == "function" && cb(this.userInfo)
    } else {
      wx.login({
        success: function (res) {

          if (res.code) {
            var code = res.code;
            wx.getSetting({
              success: res => {
                wx.showToast({
                  title: '正在登录...',
                  icon: 'loading',
                  duration: 10000
                });
                //请求服务器
                wx.request({
                  url: "https://www.leijiangmm.xyz/getopenid", //Getopenid.php
                  data: {
                    js_code: code,
                  },
                  method: 'GET',
                  header: {
                    'content-type': 'application/json'
                  }, // 设置请求的 header
                  success: function (res) {
                    // success
                    // console.log(res);
                    wx.hideToast();
                    // console.log("JSON:" + res.data);
                    if (res.data.result == "1") { //获取openid成功
                      wx.showToast({
                        title: '数据加载中...',
                        icon: 'loading',
                        duration: 500
                      })
                      wx.setStorage({ //存储openid
                        key: "openid",
                        data: res.data.openid
                      })
                    } else {
                      wx.showToast({
                        title: 'openid获取失败',
                        icon: 'none',
                        duration: 2000
                      })
                    }

                  },
                  fail: function () {
                    // fail
                    // wx.hideToast();
                  },
                  complete: function () {
                    // complete
                  }
                })
              }
            })
            //     }



            // })
          } else {
            // console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  
  appData:{
    userinfo:null,
    appstore_id:null,
    userAddress:null,
    order_index:null,
    order:null,
    click_index:""
  }
})