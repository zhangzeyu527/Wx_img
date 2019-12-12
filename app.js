//app.js
var e = require("/pages/utils/util.js");

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  login: function () {
    wx.showLoading({
      title: "加载中"
    });
    var t = this;
    this.data.userInfo;
    return new Promise(function (o, n) {
      wx.getSetting({
        success: function (a) {
          if (a.authSetting["scope.userInfo"]) {
            var s = !1;
            wx.getUserInfo({
              success: function (e) {
                t.data.scope_userInfo = !0;
                var o = e.userInfo;
                o.nickName, o.avatarUrl, o.gender, o.province, o.city, o.country;
                wx.setStorage({
                  key: "userInfo",
                  data: o
                });
                for (var n in t.data.userInfo) if (t.data.userInfo[n] != o[n]) {
                  s = !0;
                  break;
                }
                0 == t.data.userInfo.length && (s = !0), t.data.userInfo = o;
              },
              fail: function (e) {
                console.log(e);
              },
              complete: function () {
                wx.login({
                  success: function (n) {
                    n.code && e.commonGetRequest(t.data.host + "common/get_token/" + n.code, function (e) {
                      console.log(e);
                      var n = e.data;
                      n.code && (t.data.userInfo.openid = n.openid, t.data.token = n.token, t.data.login = !0,
                        s && t.update_base(), console.log(n), o(), t.getMsg().then(function () {
                          t.get_base();
                        }));
                    });
                  },
                  complete: function () {
                    wx.hideLoading();
                  }
                });
              }
            });
          } else if (wx.hideLoading(), !t.data.me) {
            var i = getCurrentPages();
            i[i.length - 1].route.indexOf("/index") < 0 && wx.showModal({
              title: "提示",
              content: "请到底栏-我-授权登录，以获得更好的服务",
              success: function (e) {
                e.confirm && wx.removeStorage({
                  key: "userInfo",
                  success: function (e) {
                    t.data.userInfo = {}, wx.navigateTo({
                      url: "/pages/index/index?menuIndex=3"
                    });
                  }
                });
              }
            }), n();
          }
        },
        complete: function () { }
      });
    });
  },
  globalData:{
    userInfo:null
  }
})