function t(t) {
    return function() {
        var e = t.apply(this, arguments);
        return new Promise(function(t, n) {
            function r(o, i) {
                try {
                    var a = e[o](i), u = a.value;
                } catch (t) {
                    return void n(t);
                }
                if (!a.done) return Promise.resolve(u).then(function(t) {
                    r("next", t);
                }, function(t) {
                    r("throw", t);
                });
                t(u);
            }
            return r("next");
        });
    };
}

function e(t, e) {
    var n = (e = e.replace("T", " ")).indexOf(".");
    n > 0 && (e = e.substring(0, n));
    var r = t.split(" "), o = e.split(" "), i = r[0].split("-"), a = o[0].split("-"), u = r[1].split(":"), c = o[1].split(":");
    return (Date.UTC(i[0], i[1], i[2], u[0], u[1]) - Date.UTC(a[0], a[1], a[2], c[0], c[1])) / 1e3;
}

function n(t, e, n, r, o) {
    var i = getApp();
    wx.request({
        url: t,
        method: e,
        data: n,
        header: {
            Authorization: i.data.token,
            "content-type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            return "function" == typeof r && r(t);
        },
        complete: function(t) {
            "function" == typeof o && o();
        }
    });
}

function r(t) {
    var e, n, r = "", o = 0, i = 0;
    for (e = i; o < t.length; ) (e = t.charCodeAt(o)) < 128 ? (r += String.fromCharCode(e), 
    o++) : e > 191 && e < 224 ? (i = t.charCodeAt(o + 1), r += String.fromCharCode((31 & e) << 6 | 63 & i), 
    o += 2) : (i = t.charCodeAt(o + 1), n = t.charCodeAt(o + 2), r += String.fromCharCode((15 & e) << 12 | (63 & i) << 6 | 63 & n), 
    o += 3);
    return r;
}

var o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./regenerator-runtime/runtime.js")), i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}, u = function(t) {
    var e = t.getFullYear(), n = t.getMonth() + 1, r = t.getDate(), o = t.getHours(), i = t.getMinutes(), u = t.getSeconds();
    return [ e, n, r ].map(a).join("-") + " " + [ o, i, u ].map(a).join(":");
}, c = function() {
    var e = t(o.default.mark(function t(e) {
        var n;
        return o.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.next = 2, new Promise(function(t, n) {
                    wx.showLoading({
                        title: "加载图片中"
                    }), wx.getImageInfo({
                        src: e,
                        success: function(e) {
                            t(e.path);
                        }
                    });
                });

              case 2:
                return n = t.sent, t.abrupt("return", n);

              case 4:
              case "end":
                return t.stop();
            }
        }, t, void 0);
    }));
    return function(t) {
        return e.apply(this, arguments);
    };
}();

module.exports = {
    formatTime: u,
    getWeek: function(t, e) {
        var n = u(new Date()).split(" ")[0].split("-"), r = Number(n[1]), o = (Number(n[0]), 
        Number(n[2])), i = 0, a = t[0], c = t[1], s = 0, f = 1, d = (t = r >= a[0] || r < c[0] ? a : c)[0], g = t[1], l = t[2];
        console.log(t + "\tmonth:" + r + "\tsoM:" + d), r = r < d ? 12 + r : r;
        for (var h = d; h < r; h++) i += h > 12 ? e[h - 13] : e[h - 1];
        for (i -= g - 1 - o; 1 != new Date(l, d - 1, g).getDay(); ) s++, g++;
        return i -= s, f = Math.ceil(i / 7), console.log(i + "\thead:" + s + "\tdate" + o), 
        console.log(n + "周数：" + f + "月数：" + r), f;
    },
    DateDistan: e,
    getDateDis: e,
    decode: function(t) {
        var e, n, o, a, u, c, s = "", f = 0;
        for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); f < t.length; ) e = i.indexOf(t.charAt(f++)) << 2 | (a = i.indexOf(t.charAt(f++))) >> 4, 
        n = (15 & a) << 4 | (u = i.indexOf(t.charAt(f++))) >> 2, o = (3 & u) << 6 | (c = i.indexOf(t.charAt(f++))), 
        s += String.fromCharCode(e), 64 != u && (s += String.fromCharCode(n)), 64 != c && (s += String.fromCharCode(o));
        return s = r(s);
    },
    commonGetRequest: function(t, e, r) {
        n(t, "GET", {}, e, r);
    },
    commonPostRequest: function(t, e, r, o) {
        n(t, "POST", e, r, o);
    },
    getImageInfo: c,
    analyzeKcb: function() {
        return new Promise(function(t, e) {
            wx.getStorage({
                key: "class",
                success: function(e) {
                    wx.showLoading({
                        title: "分析中"
                    }), e.data.substring(0, 4), wx.getStorage({
                        key: "kcb",
                        success: function(e) {
                            var n = e.data, r = [];
                            console.log(n);
                            for (var o in n) {
                                var i = n[o], a = [];
                                for (var u in i) {
                                    var c = i[u];
                                    if (c.course) {
                                        var s = c.duration, f = c.jieshu, d = "";
                                        s.indexOf(" ") > 0 && -1 == s.indexOf("[") && (d = s.substring(s.indexOf(" "))), 
                                        s.indexOf("[") >= 0 && (s = s.substring(s.indexOf("[") + 1, s.indexOf("]"))), s += d, 
                                        f.indexOf("节") > 0 && (f = f.substring(0, f.indexOf("节"))), f.lastIndexOf(" ") >= 0 && (f = f.substring(f.lastIndexOf(" ") + 1)), 
                                        c.jieshu = f, c.duration = s, a.push(c);
                                    }
                                }
                                r.push(a);
                            }
                            wx.setStorageSync("kcb", r), t(r);
                        }
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    }
};