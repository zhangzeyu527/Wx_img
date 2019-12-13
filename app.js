var e = require("/pages/utils/util.js");

App({
  globalData: {
    menuVersion: "2.1.9"
  },
  data: {
    host: "https://www.xxxzh.top/assist/",
    origin: "https://www.xxxzh.top",
    label: {
      a0: "闲聊",
      a1: "咨询",
      a2: "吐槽",
      a3: "征友",
      a4: "卖舍友",
      a5: "寻物",
      a6: "失物招领",
      a7: "求购",
      b: "全部",
      b1: "图书音像",
      b2: "运动户外",
      b3: "家用电器",
      b4: "电子产品",
      b5: "手机",
      b6: "电脑",
      b7: "办公用品",
      b8: "其它"
    },
    colors: ["#FFA500", "#FF7F24", "#FF7256", "#FF7256"],
    userInfo: {},
    token: null,
    login: !1,
    navigate: !0,
    scope_userInfo: !1
  },
  error: function (e) {
    null == e && (e = "操作失败"), wx.showToast({
      title: e,
      image: "/images/close.png"
    });
  },
  error2: function (e, t) {
    null == e && (e = "操作失败"), wx.showModal({
      title: "提示",
      content: e,
      showCancel: !1,
      success: function (e) {
        "function" == typeof t && t();
      }
    });
  },
  toastAuthorize: function () {
    wx.showModal({
      title: "提示",
      content: "授权登录后才能发布哦~",
      success: function (e) {
        e.confirm && wx.navigateTo({
          url: "/pages/index/index?menuIndex=3"
        });
      }
    });
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
  update_base: function () {
    var t = this.data.userInfo;
    console.log("Begin to update the base msg..."), e.commonPostRequest(this.data.host + "contact/update_base", {
      avatarUrl: t.avatarUrl,
      name: t.nickName,
      gender: t.gender,
      native: t.country + " " + t.province + " " + t.city
    }, function (e) {
      console.log(e), e.data.code ? console.log("Updated user base information ") : console.log(e);
    });
  },
  onLaunch: function () {
    var e = wx.getStorageSync("userInfo");
    e && e.avatarUrl && (this.data.userInfo = e, this.data.scope_userInfo = !0);
  },
  getMsg: function () {
    var t = this;
    return new Promise(function (o, n) {
      e.commonGetRequest(t.data.host + "contact/get_msg", function (e) {
        if (e.data.code) {
          var t = e.data.data.length, n = 0;
          wx.getStorage({
            key: "msg",
            success: function (e) {
              n = Number(e.data.length);
            },
            complete: function () {
              var e = t - n;
              e > 0 && wx.setTabBarBadge({
                index: 2,
                text: e + ""
              }), wx.setStorage({
                key: "newMsg_num",
                data: e > 99 ? "99+" : e + ""
              }), o();
            }
          });
        }
      });
    });
  },
  get_base: function () {
    var t = this;
    return new Promise(function (o, n) {
      e.commonGetRequest(t.data.host + "contact/get_basic", function (e) {
        var n = e.data, a = {};
        if (n.code) {
          n = n.data;
          for (var s in n) {
            var i = n[s].value;
            try {
              i = JSON.parse(i);
            } catch (e) { }
            a[n[s].attribute] = i;
          }
          t.data.base = a, console.log(a);
        }
        o();
      });
    });
  },
  uploadFile: function (e, t) {
    wx.showLoading({
      title: "上传中"
    });
    var o = this;
    return new Promise(function (n, a) {
      wx.getNetworkType({
        success: function (s) {
          "none" != s.networkType ? wx.uploadFile({
            url: o.data.host + "common/upload",
            header: {
              Authorization: o.data.token
            },
            filePath: e,
            formData: {
              type: e.substring(e.lastIndexOf(".") + 1)
            },
            name: "file",
            success: function (e) {
              console.log(e.data);
              var s = JSON.parse(e.data);
              if (s.code) {
                var e = [s.data, t];
                n(e);
              } else o.login(), a([t]);
            },
            fail: function (e) {
              console.log(e), a([t]);
            }
          }) : (o.error("请检查网络"), a([t]));
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    });
  },
  onShow: function (e) { },
  redirectTo: function (e) {
    wx.redirectTo({
      url: e
    });
  },
  onHide: function () { },
  onError: function (e) { }
});