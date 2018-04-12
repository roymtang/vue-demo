!
  function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();

    else if ("function" == typeof define && define.amd) define([], a);
    else {
      var b;
      b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.store = a()
    }
  }(function() {
    return function d(a, b, c) {
      function e(g, h) {
        var i, j, k;
        if (!b[g]) {
          if (!a[g]) {
            if (i = "function" == typeof require && require, !h && i) return i(g, !0);
            if (f) return f(g, !0);
            throw j = new Error("Cannot find module '" + g + "'"), j.code = "MODULE_NOT_FOUND", j
          }
          k = b[g] = {
            exports: {}
          }, a[g][0].call(k.exports, function(b) {
            var c = a[g][1][b];
            return e(c ? c : b)
          }, k, k.exports, d, a, b, c)
        }
        return b[g].exports
      }
      var g, f = "function" == typeof require && require;
      for (g = 0; g < c.length; g++) e(c[g]);
      return e
    }({
      1: [function(a, b) {
        !
          function(a) {
            "use strict";
            b.exports = function() {
              function b() {
                try {
                  return g in e && e[g]
                } catch (a) {
                  return !1
                }
              }
              var hostname = location.hostname;
              var port = location.port;
              var jsPath = document.location.pathname;
              var path = jsPath.substring(1,jsPath.substr(1).indexOf('/')+1);
              var c, i, j, l, m, n, o, d = {},
                e = "undefined" != typeof window ? window : a,
                f = e.document,
                g = "sessionStorage",
                h = "script";
              if (d.disabled = !1, d.version = "1.3.20", d.set = function() {}, d.get = function() {}, d.has = function(a) {
                  return void 0 !== d.get(a)
                }, d.remove = function() {}, d.clear = function() {}, d.transact = function(a, b, c) {
                  null == c && (c = b, b = null), null == b && (b = {});
                  var e = d.get(a, b);
                  c(e), d.set(a, e)
                }, d.getAll = function() {}, d.forEach = function() {}, d.serialize = function(a) {
                  return JSON.stringify(a)
                }, d.deserialize = function(a) {
                  if ("string" == typeof a) try {
                    return JSON.parse(a)
                  } catch (b) {
                    return a || void 0
                  }
                }, b()) c = e[g], d.set = function(a, b) {
                a = hostname + '_' + port + '_' + path + '_' + a;
                return void 0 === b ? d.remove(a) : (c.setItem(a, d.serialize(b)), b)
              }, d.get = function(a, b) {
                a = hostname + '_' + port + '_' + path + '_' + a;
                var e = d.deserialize(c.getItem(a));
                return void 0 === e ? b : e
              }, d.remove = function(a) {
                c.removeItem(a)
              }, d.clear = function() {
                c.clear()
              }, d.getAll = function() {
                var a = {};
                return d.forEach(function(b, c) {
                  a[b] = c
                }), a
              }, d.forEach = function(a) {
                var b, e;
                for (b = 0; b < c.length; b++) e = c.key(b), a(e, d.get(e))
              };
              else if (f && f.documentElement.addBehavior) {
                try {
                  j = new ActiveXObject("htmlfile"), j.open(), j.write("<" + h + ">document.w=window</" + h + '><iframe src="/favicon.ico"></iframe>'), j.close(), i = j.w.frames[0].document, c = i.createElement("div")
                } catch (k) {
                  c = f.createElement("div"), i = f.body
                }
                l = function(a) {
                  return function() {
                    var e, b = Array.prototype.slice.call(arguments, 0);
                    return b.unshift(c), i.appendChild(c), c.addBehavior("#default#userData"), c.load(g), e = a.apply(d, b), i.removeChild(c), e
                  }
                }, m = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), n = function(a) {
                  return a.replace(/^d/, "___$&").replace(m, "___")
                }, d.set = l(function(a, b, c) {
                  return b = n(b), void 0 === c ? d.remove(b) : (a.setAttribute(b, d.serialize(c)), a.save(g), c)
                }), d.get = l(function(a, b, c) {
                  b = n(b);
                  var e = d.deserialize(a.getAttribute(b));
                  return void 0 === e ? c : e
                }), d.remove = l(function(a, b) {
                  b = n(b), a.removeAttribute(b), a.save(g)
                }), d.clear = l(function(a) {
                  var c, b = a.XMLDocument.documentElement.attributes;
                  for (a.load(g), c = b.length - 1; c >= 0; c--) a.removeAttribute(b[c].name);
                  a.save(g)
                }), d.getAll = function() {
                  var b = {};
                  return d.forEach(function(a, c) {
                    b[a] = c
                  }), b
                }, d.forEach = l(function(a, b) {
                  for (var c, e = a.XMLDocument.documentElement.attributes, f = 0; c = e[f]; ++f) b(c.name, d.deserialize(a.getAttribute(c.name)))
                })
              }
              try {
                o = "__storejs__", d.set(o, o), d.get(o) != o && (d.disabled = !0), d.remove(o)
              } catch (k) {
                d.disabled = !0
              }
              return d.enabled = !d.disabled, d
            }()
          }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
      }, {}]
    }, {}, [1])(1)
  });
export default store;
