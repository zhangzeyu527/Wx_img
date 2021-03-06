// pages/DiyIcon.js
function t(t) {
  if (Array.isArray(t)) {
    for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
    return e;
  }
  return Array.from(t);
}

var a = function() {
    function t(t, a) {
      var e = [],
        i = !0,
        r = !1,
        n = void 0;
      try {
        for (var s, o = t[Symbol.iterator](); !(i = (s = o.next()).done) && (e.push(s.value), !a || e.length !== a); i = !0);
      } catch (t) {
        r = !0, n = t;
      } finally {
        try {
          !i && o.return && o.return();
        } finally {
          if (r) throw n;
        }
      }
      return e;
    }
    return function(a, e) {
      if (Array.isArray(a)) return a;
      if (Symbol.iterator in Object(a)) return t(a, e);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  }(),
  e = getApp(),
  i = (require("../utils/util.js"), wx.createCanvasContext("myCanvas"));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: '',
    imagePath: '../img/icon1.png',
    imageWidth: '',
    imageHeight: '',
    avatar: "/images/chris.jpg",
    avatarTmp: null,
    iconTmp: [],
    targetIcon: [],
    current: 0,
    cap_index: 0,
    startX: 0,
    startY: 0,
    desWidth: 300,
    desHeight: 300,
    showAd: !1,
    showCapAd: !1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  bindGetUserInfo: function(e) {
    console.log(e.detail)
    // this.headimgHD(e.detail.userinfo.avatarUrl)
    this.setData({
      imgUrl: this.headimgHD(e.detail.userInfo.avatarUrl)
    })
  },
  headimgHD: function(imageUrl) {
    console.log('原来的头像', imageUrl);

    imageUrl = imageUrl.split('/'); //把头像的路径切成数组

    //把大小数值为 46 || 64 || 96 || 132 的转换为0
    if (imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
      imageUrl[imageUrl.length - 1] = 0;
    }

    imageUrl = imageUrl.join('/'); //重新拼接为字符串

    console.log('高清的头像', imageUrl);

    return imageUrl;

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  tap: function(t) {
    var a = this.data.targetIcon,
      e = t.currentTarget.id.substring(3);
    a.push({
      cap_index: e,
      px: 20,
      py: 20,
      degree: 0,
      size: 80
    }), this.setData({
      current: a.length - 1,
      targetIcon: a,
      cap_index: e
    }), this.drawCap();
  },
  getCapWidth: function (t) {
    return t;
  },
  getRotatePosition: function (t, a, e, i, r) {
    var n = (t - e) * Math.cos(r) - (a - i) * Math.sin(r) + e, s = (t - e) * Math.sin(r) + (a - i) * Math.cos(r) + i;
    return [Number(n), Number(s)];
  },
  drawCap: function(a) {
    var r = this,
      n = ([].concat(t(this.data.iconTmp)), this),
      s = [].concat(t(this.data.targetIcon)),
      o = this.data.height;
    i.clearRect(0, 0, o, o), this.drawAvatar();
    for (var h in s) {
      var d = s[h];
      if (!d) return;
      var c = d.px,
        u = d.py,
        g = d.cap_index,
        p = d.size,
        f = d.degree,
        l = this.getCapWidth(p),
        v = this.data.iconTmp[g];
      if (!v) return void wx.getImageInfo({
        src: this.data.icons[g],
        success: function(t) {
          r.data.iconTmp[g] = t.path, r.drawCap();
        }
      });
      f = f * Math.PI / 180;
      var w = c + l / 2,
        m = u + l / 2;
      i.translate(w, m), i.rotate(f), i.translate(-l / 2, -l / 2), i.drawImage(v, 0, 0, l, l),
        h != this.data.current || a || (i.setStrokeStyle("#FF6A6A"), i.setLineWidth(3),
          i.setLineDash([10, 7], 8), i.rect(0, 0, l, l), i.stroke(), i.drawImage("/images/delete.png", -10, -10, 20, 20),
          i.drawImage("/images/rotate.png", l - 10, l - 10, 20, 20)), i.rotate(-f);
      var x = l / 2,
        y = l / 2,
        I = this.getRotatePosition(0, 0, x, y, f),
        A = I[0],
        C = I[1];
      i.translate(-c - A, -u - C), d.ox = w, d.oy = m, this.data.targetIcon[h] = d;
    }
    a ? i.draw(!1, function() {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: r.data.height,
        height: r.data.height,
        destWidth: r.data.desWidth,
        destHeight: r.data.desHeight,
        canvasId: "myCanvas",
        success: function(t) {
          console.log(t.tempFilePath), wx.saveImageToPhotosAlbum({
            filePath: t.tempFilePath,
            success: function(t) {
              wx.showToast({
                title: "保存成功"
              }), n.setData({
                showAd: !0
              });
            },
            fail: function() {
              e.error2("保存失败，请到个人中心重新授权", function() {
                wx.navigateTo({
                  url: "/pages/index/index?menuIndex=3"
                });
              });
            }
          });
        }
      });
    }) : i.draw();
  },
  drawAvatar: function(t) {
    var a = this.data.height;
    i.drawImage(this.data.avatar, 0, 0, a, a), t && i.draw();
  },
  start: function(e) {
    var i = a(e.changedTouches, 1)[0],
      r = [i.x, i.y],
      n = r[0],
      s = r[1],
      o = [].concat(t(this.data.targetIcon));
    if (this.data.current = o.length - 1, this.data.startX = n, this.data.startY = s, !this.data.scaleMode)
      for (var h = o.length - 1; h >= 0; h--) {
        var d = o[h],
          c = Number(this.getCapWidth(d.size)),
          u = Number(d.px),
          g = Number(d.py),
          p = d.degree * Math.PI / 180,
          f = this.getRotatePosition(0, 0, c / 2, c / 2, p);
        u += f[0], g += f[1];
        var l = (f = this.getRotatePosition(c, c, c / 2, c / 2, p))[0],
          v = f[1];
        if (n >= u - 10 && n <= u + 10 && s >= g - 10 && s <= g + 10) return this.data.targetIcon.splice(h, 1),
          void this.drawCap();
        if (u = Number(d.px), g = Number(d.py), n >= u + l - 10 && n <= u + l + 10 && s >= g + v - 10 && s <= g + v + 10) return void(this.data.scaleMode = 1);
        if (n >= u && s >= g && n <= u + c && s <= g + c) {
          var w = [o[this.data.current], o[h]];
          o[h] = w[0], o[this.data.current] = w[1];
          break;
        }
      }
  },
  move: function(e) {
    var i = a(e.changedTouches, 1)[0],
      r = [i.x, i.y],
      n = r[0],
      s = r[1],
      o = [this.data.startX, this.data.startY],
      h = o[0],
      d = o[1],
      c = [].concat(t(this.data.targetIcon)),
      u = this.data.current;
    if (this.data.scaleMode) {
      var g = c[u],
        p = this.getCapWidth(g.size),
        f = g.px,
        l = g.py,
        v = g.ox,
        w = g.oy,
        m = Math.sqrt((n - v) * (n - v) + (s - w) * (s - w));
      c[u].size;
      c[u].size = m * Math.SQRT2, c[u].px = v - c[u].size / 2, c[u].py = w - c[u].size / 2;
      var x = s - w,
        y = n - v,
        I = 1 * x / y,
        A = 180 * Math.atan(I) / Math.PI,
        C = A - 45;
      (x >= 0 && y < 0 || x < 0 && y < 0) && (C = 135 + A), c[u].degree = C;
    } else {
      if (!(g = c[u])) return;
      var p = Number(this.getCapWidth(g.size)),
        f = Number(g.px),
        l = Number(g.py);
      h >= f && d >= l && h <= f + p && d <= l + p && (g.px += n - h, g.py += s - d),
        c[u] = g;
    }
    this.data.targetIcon = c, this.data.startX = n, this.data.startY = s, this.drawCap();
  },
  end: function(t) {
    this.data.scaleMode = 0, this.data.avatar.indexOf("/images/chris") > 0 && this.login();
  },
  save: function() {
    this.drawCap(1);
  },
  createImage: function() {
    let imageWidth = this.data.imageWidth,
      imageHeight = this.data.imageHeight;
    let _this = this,
      deviceWidth = 0;

    //获取设备宽度，用于求所需画在画布上的图片的高度
    wx.getSystemInfo({
      success: function(res) {
        deviceWidth = res.windowWidth; //获取设备宽度
        wx.getImageInfo({ //获取图片信息
          src: _this.data.imagePath,
          success: function(res) {
            let imageWidth = deviceWidth,
              imageHeight = deviceWidth / res.width * res.height; //求所需画在画布上的图片的高度
            _this.setData({
              'imageWidth': imageWidth,
              'imageHeight': imageHeight
            });

            const ctx = wx.createCanvasContext('gameCanvas'); //创建画布对象  
            ctx.drawImage(_this.data.imgUrl, 0, 0, imageWidth, imageHeight); //添加图片
            ctx.draw()
            ctx.drawImage(_this.data.imagePath, 50, -10, 120, 120);
            ctx.draw(true); //开始绘画
          }
        })
      }
    });
    wx.canvasToTempFilePath({ //将canvas生成图片
      canvasId: 'gameCanvas',
      x: 0,
      y: 0,
      width: imageWidth,
      height: imageHeight,
      destWidth: imageWidth, //截取canvas的宽度
      destHeight: imageHeight, //截取canvas的高度
      success: function(res) {
        wx.saveImageToPhotosAlbum({ //保存图片到相册
          filePath: res.tempFilePath,
          success: function() {
            wx.showToast({
              title: "生成图片成功！",
              duration: 2000
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})