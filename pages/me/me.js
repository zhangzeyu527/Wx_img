var e = getApp();

Component({
  options: {
    multipleSlots: !0
  },
  data: {
    login: e.data.scope_userInfo,
    info: e.data.userInfo,
    tip: "点击授权登录",
    menuItem: ["制作我的圣诞帽"],
    menuIcon: ["/images/cap.png"],
    url: ["/pages/me/cap/cap"],
    new_msg: 0,
    showComp: !1
  },
  properties: {
    compId: {
      type: String
    },
    show: {
      type: Boolean,
      value: !1,
      observer: function (e, n, o) {
        e && this.onShow();
      }
    },
    refresh: {
      type: Boolean,
      value: !1,
      observer: function (e, n, o) {
        e && this.onPullDownRefresh();
      }
    }
  },
  ready_: function (n) {
    e.data.me = !0;
  },
  methods: {
    navigate: function (e) {
      wx.navigateTo({
        url: this.data.url[e.currentTarget.id]
      });
    },
    onReady: function () { },
    onShow: function () {
      var n = this;
      e.data.login ? (e.getMsg().then(function () {
        wx.getStorage({
          key: "newMsg_num",
          success: function (e) {
            e.data <= 0 && wx.removeTabBarBadge({
              index: 2
            }), n.setData({
              new_msg: e.data
            });
          }
        });
      }), this.setData({
        login: !0,
        info: e.data.userInfo
      })) : e.login().then(function () {
        n.onShow();
      }).catch(function () {
        n.setData({
          info: {}
        });
      });
    },
    onHide: function () {
      e.data.me = !1;
    },
    onUnload: function () {
      e.data.me = !1;
    },
    onPullDownRefresh: function () {
      this.onShow();
    }
  }
});