!function ($) {
    for (var supportedCSS, supportedCSSOrigin, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "), a = 0; a < toCheck.length; a++)void 0 !== styles[toCheck[a]] && (supportedCSS = toCheck[a]);
    supportedCSS && (supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/, "TransformOrigin"), "T" == supportedCSSOrigin[0] && (supportedCSSOrigin[0] = "t")), eval('IE = "v"=="\x0B"'), jQuery.fn.extend({
        rotate: function (t) {
            if (0 !== this.length && "undefined" != typeof t) {
                "number" == typeof t && (t = {angle: t});
                for (var e = [], i = 0, a = this.length; a > i; i++) {
                    var n = this.get(i);
                    if (n.Wilq32 && n.Wilq32.PhotoEffect)n.Wilq32.PhotoEffect._handleRotation(t); else {
                        var s = $.extend(!0, {}, t), o = new Wilq32.PhotoEffect(n, s)._rootObj;
                        e.push($(o))
                    }
                }
                return e
            }
        }, getRotateAngle: function () {
            for (var t = [], e = 0, i = this.length; i > e; e++) {
                var a = this.get(e);
                a.Wilq32 && a.Wilq32.PhotoEffect && (t[e] = a.Wilq32.PhotoEffect._angle)
            }
            return t
        }, stopRotate: function () {
            for (var t = 0, e = this.length; e > t; t++) {
                var i = this.get(t);
                i.Wilq32 && i.Wilq32.PhotoEffect && clearTimeout(i.Wilq32.PhotoEffect._timer)
            }
        }
    }), Wilq32 = window.Wilq32 || {}, Wilq32.PhotoEffect = function () {
        return supportedCSS ? function (t, e) {
            t.Wilq32 = {PhotoEffect: this}, this._img = this._rootObj = this._eventObj = t, this._handleRotation(e)
        } : function (t, e) {
            if (this._img = t, this._onLoadDelegate = [e], this._rootObj = document.createElement("span"), this._rootObj.style.display = "inline-block", this._rootObj.Wilq32 = {PhotoEffect: this}, t.parentNode.insertBefore(this._rootObj, t), t.complete)this._Loader(); else {
                var i = this;
                jQuery(this._img).bind("load", function () {
                    i._Loader()
                })
            }
        }
    }(), Wilq32.PhotoEffect.prototype = {
        _setupParameters: function (t) {
            this._parameters = this._parameters || {}, "number" != typeof this._angle && (this._angle = 0), "number" == typeof t.angle && (this._angle = t.angle), this._parameters.animateTo = "number" == typeof t.animateTo ? t.animateTo : this._angle, this._parameters.step = t.step || this._parameters.step || null, this._parameters.easing = t.easing || this._parameters.easing || this._defaultEasing, this._parameters.duration = t.duration || this._parameters.duration || 1e3, this._parameters.callback = t.callback || this._parameters.callback || this._emptyFunction, this._parameters.center = t.center || this._parameters.center || ["50%", "50%"], "string" == typeof this._parameters.center[0] ? this._rotationCenterX = parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._rotationCenterX = this._parameters.center[0], "string" == typeof this._parameters.center[1] ? this._rotationCenterY = parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._rotationCenterY = this._parameters.center[1], t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind)
        }, _emptyFunction: function () {
        }, _defaultEasing: function (t, e, i, a, n) {
            return -a * ((e = e / n - 1) * e * e * e - 1) + i
        }, _handleRotation: function (t, e) {
            return supportedCSS || this._img.complete || e ? (this._setupParameters(t), void(this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart())) : void this._onLoadDelegate.push(t)
        }, _BindEvents: function (t) {
            if (t && this._eventObj) {
                if (this._parameters.bind) {
                    var e = this._parameters.bind;
                    for (var i in e)e.hasOwnProperty(i) && jQuery(this._eventObj).unbind(i, e[i])
                }
                this._parameters.bind = t;
                for (var i in t)t.hasOwnProperty(i) && jQuery(this._eventObj).bind(i, t[i])
            }
        }, _Loader: function () {
            return IE ? function () {
                var t = this._img.width, e = this._img.height;
                this._imgWidth = t, this._imgHeight = e, this._img.parentNode.removeChild(this._img), this._vimage = this.createVMLNode("image"), this._vimage.src = this._img.src, this._vimage.style.height = e + "px", this._vimage.style.width = t + "px", this._vimage.style.position = "absolute", this._vimage.style.top = "0px", this._vimage.style.left = "0px", this._aspectW = this._aspectH = 1, this._container = this.createVMLNode("group"), this._container.style.width = t, this._container.style.height = e, this._container.style.position = "absolute", this._container.style.top = "0px", this._container.style.left = "0px", this._container.setAttribute("coordsize", t - 1 + "," + (e - 1)), this._container.appendChild(this._vimage), this._rootObj.appendChild(this._container), this._rootObj.style.position = "relative", this._rootObj.style.width = t + "px", this._rootObj.style.height = e + "px", this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._eventObj = this._rootObj;
                for (var i; i = this._onLoadDelegate.shift();)this._handleRotation(i, !0)
            } : function () {
                this._rootObj.setAttribute("id", this._img.getAttribute("id")), this._rootObj.className = this._img.className, this._imgWidth = this._img.naturalWidth, this._imgHeight = this._img.naturalHeight;
                var t = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
                this._width = 3 * t, this._height = 3 * t, this._aspectW = this._img.offsetWidth / this._img.naturalWidth, this._aspectH = this._img.offsetHeight / this._img.naturalHeight, this._img.parentNode.removeChild(this._img), this._canvas = document.createElement("canvas"), this._canvas.setAttribute("width", this._width), this._canvas.style.position = "relative", this._canvas.style.left = -this._img.height * this._aspectW + "px", this._canvas.style.top = -this._img.width * this._aspectH + "px", this._canvas.Wilq32 = this._rootObj.Wilq32, this._rootObj.appendChild(this._canvas), this._rootObj.style.width = this._img.width * this._aspectW + "px", this._rootObj.style.height = this._img.height * this._aspectH + "px", this._eventObj = this._canvas, this._cnv = this._canvas.getContext("2d");
                for (var e; e = this._onLoadDelegate.shift();)this._handleRotation(e, !0)
            }
        }(), _animateStart: function () {
            this._timer && clearTimeout(this._timer), this._animateStartTime = +new Date, this._animateStartAngle = this._angle, this._animate()
        }, _animate: function () {
            var t = +new Date, e = t - this._animateStartTime > this._parameters.duration;
            if (e && !this._parameters.animatedGif)clearTimeout(this._timer); else {
                if (this._canvas || this._vimage || this._img) {
                    var i = this._parameters.easing(0, t - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                    this._rotate(~~(10 * i) / 10)
                }
                this._parameters.step && this._parameters.step(this._angle);
                var a = this;
                this._timer = setTimeout(function () {
                    a._animate.call(a)
                }, 10)
            }
            this._parameters.callback && e && (this._angle = this._parameters.animateTo, this._rotate(this._angle), this._parameters.callback.call(this._rootObj))
        }, _rotate: function () {
            var t = Math.PI / 180;
            return IE ? function (t) {
                this._angle = t, this._container.style.rotation = t % 360 + "deg", this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px", this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px", this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px", this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
            } : supportedCSS ? function (t) {
                this._angle = t, this._img.style[supportedCSS] = "rotate(" + t % 360 + "deg)", this._img.style[supportedCSSOrigin] = this._parameters.center.join(" ")
            } : function (e) {
                this._angle = e, e = e % 360 * t, this._canvas.width = this._width, this._canvas.height = this._height, this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH), this._cnv.translate(this._rotationCenterX, this._rotationCenterY), this._cnv.rotate(e), this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY), this._cnv.scale(this._aspectW, this._aspectH), this._cnv.drawImage(this._img, 0, 0)
            }
        }()
    }, IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function () {
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), function (t) {
                return document.createElement("<rvml:" + t + ' class="rvml">')
            }
        } catch (t) {
            return function (t) {
                return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
    }())
}(jQuery), function (t) {
    function e() {
        return t("<div/>")
    }

    var i = Math.abs, a = Math.max, n = Math.min, s = Math.round;
    t.imgAreaSelect = function (o, r) {
        function l(t) {
            return t + ft.left - vt.left
        }

        function h(t) {
            return t + ft.top - vt.top
        }

        function c(t) {
            return t - ft.left + vt.left
        }

        function d(t) {
            return t - ft.top + vt.top
        }

        function u(t) {
            return t.pageX - vt.left
        }

        function p(t) {
            return t.pageY - vt.top
        }

        function m(t) {
            var e = t || O, i = t || W;
            return {
                x1: s(xt.x1 * e),
                y1: s(xt.y1 * i),
                x2: s(xt.x2 * e),
                y2: s(xt.y2 * i),
                width: s(xt.x2 * e) - s(xt.x1 * e),
                height: s(xt.y2 * i) - s(xt.y1 * i)
            }
        }

        function g(t, e, i, a, n) {
            var o = n || O, r = n || W;
            xt = {
                x1: s(t / o || 0),
                y1: s(e / r || 0),
                x2: s(i / o || 0),
                y2: s(a / r || 0)
            }, xt.width = xt.x2 - xt.x1, xt.height = xt.y2 - xt.y1
        }

        function f() {
            U && ct.width() && (ft = {
                left: s(ct.offset().left),
                top: s(ct.offset().top)
            }, H = ct.innerWidth(), F = ct.innerHeight(), ft.top += ct.outerHeight() - F >> 1, ft.left += ct.outerWidth() - H >> 1, Z = s(r.minWidth / O) || 0, q = s(r.minHeight / W) || 0, Q = s(n(r.maxWidth / O || 1 << 24, H)), G = s(n(r.maxHeight / W || 1 << 24, F)), "1.3.2" != t().jquery || "fixed" != yt || wt.getBoundingClientRect || (ft.top += a(document.body.scrollTop, wt.scrollTop), ft.left += a(document.body.scrollLeft, wt.scrollLeft)), vt = /absolute|relative/.test(Y.css("position")) ? {
                left: s(Y.offset().left) - Y.scrollLeft(),
                top: s(Y.offset().top) - Y.scrollTop()
            } : "fixed" == yt ? {left: t(document).scrollLeft(), top: t(document).scrollTop()} : {
                left: 0,
                top: 0
            }, z = l(0), j = h(0), (xt.x2 > H || xt.y2 > F) && I())
        }

        function v(e) {
            if (K) {
                switch (dt.css({
                    left: l(xt.x1),
                    top: h(xt.y1)
                }).add(ut).width(rt = xt.width).height(lt = xt.height), ut.add(pt).add(gt).css({
                    left: 0,
                    top: 0
                }), pt.width(a(rt - pt.outerWidth() + pt.innerWidth(), 0)).height(a(lt - pt.outerHeight() + pt.innerHeight(), 0)), t(mt[0]).css({
                    left: z,
                    top: j,
                    width: xt.x1,
                    height: F
                }), t(mt[1]).css({left: z + xt.x1, top: j, width: rt, height: xt.y1}), t(mt[2]).css({
                    left: z + xt.x2,
                    top: j,
                    width: H - xt.x2,
                    height: F
                }), t(mt[3]).css({
                    left: z + xt.x1,
                    top: j + xt.y2,
                    width: rt,
                    height: F - xt.y2
                }), rt -= gt.outerWidth(), lt -= gt.outerHeight(), gt.length) {
                    case 8:
                        t(gt[4]).css({left: rt >> 1}), t(gt[5]).css({
                            left: rt,
                            top: lt >> 1
                        }), t(gt[6]).css({left: rt >> 1, top: lt}), t(gt[7]).css({top: lt >> 1});
                    case 4:
                        gt.slice(1, 3).css({left: rt}), gt.slice(2, 4).css({top: lt})
                }
                e !== !1 && (t.imgAreaSelect.onKeyPress != Mt && t(document).unbind(t.imgAreaSelect.keyPress, t.imgAreaSelect.onKeyPress), r.keys && t(document)[t.imgAreaSelect.keyPress](t.imgAreaSelect.onKeyPress = Mt)), It && pt.outerWidth() - pt.innerWidth() == 2 && (pt.css("margin", 0), setTimeout(function () {
                    pt.css("margin", "auto")
                }, 0))
            }
        }

        function b(t) {
            f(), v(t), J = l(xt.x1), tt = h(xt.y1), et = l(xt.x2), it = h(xt.y2)
        }

        function y(t, e) {
            r.fadeSpeed ? t.fadeOut(r.fadeSpeed, e) : t.hide()
        }

        function x(t) {
            var e = c(u(t)) - xt.x1, i = d(p(t)) - xt.y1;
            ht || (f(), ht = !0, dt.one("mouseout", function () {
                ht = !1
            })), V = "", r.resizable && (i <= r.resizeMargin ? V = "n" : i >= xt.height - r.resizeMargin && (V = "s"), e <= r.resizeMargin ? V += "w" : e >= xt.width - r.resizeMargin && (V += "e")), dt.css("cursor", V ? V + "-resize" : r.movable ? "move" : ""), L && L.toggle()
        }

        function w(e) {
            t("body").css("cursor", ""), (r.autoHide || xt.width * xt.height == 0) && y(dt.add(mt), function () {
                t(this).hide()
            }), t(document).unbind("mousemove", S), dt.mousemove(x), r.onSelectEnd(o, m())
        }

        function C(e) {
            return 1 != e.which ? !1 : (f(), V ? (t("body").css("cursor", V + "-resize"), J = l(xt[/w/.test(V) ? "x2" : "x1"]), tt = h(xt[/n/.test(V) ? "y2" : "y1"]), t(document).mousemove(S).one("mouseup", w), dt.unbind("mousemove", x)) : r.movable ? (N = z + xt.x1 - u(e), R = j + xt.y1 - p(e), dt.unbind("mousemove", x), t(document).mousemove(_).one("mouseup", function () {
                r.onSelectEnd(o, m()), t(document).unbind("mousemove", _), dt.mousemove(x)
            })) : ct.mousedown(e), !1)
        }

        function M(t) {
            X && (t ? (et = a(z, n(z + H, J + i(it - tt) * X * (et > J || -1))), it = s(a(j, n(j + F, tt + i(et - J) / X * (it > tt || -1)))), et = s(et)) : (it = a(j, n(j + F, tt + i(et - J) / X * (it > tt || -1))), et = s(a(z, n(z + H, J + i(it - tt) * X * (et > J || -1)))), it = s(it)))
        }

        function I() {
            J = n(J, z + H), tt = n(tt, j + F), i(et - J) < Z && (et = J - Z * (J > et || -1), z > et ? J = z + Z : et > z + H && (J = z + H - Z)), i(it - tt) < q && (it = tt - q * (tt > it || -1), j > it ? tt = j + q : it > j + F && (tt = j + F - q)), et = a(z, n(et, z + H)), it = a(j, n(it, j + F)), M(i(et - J) < i(it - tt) * X), i(et - J) > Q && (et = J - Q * (J > et || -1), M()), i(it - tt) > G && (it = tt - G * (tt > it || -1), M(!0)), xt = {
                x1: c(n(J, et)),
                x2: c(a(J, et)),
                y1: d(n(tt, it)),
                y2: d(a(tt, it)),
                width: i(et - J),
                height: i(it - tt)
            }, v(), r.onSelectChange(o, m())
        }

        function S(t) {
            return et = /w|e|^$/.test(V) || X ? u(t) : l(xt.x2), it = /n|s|^$/.test(V) || X ? p(t) : h(xt.y2), I(), !1
        }

        function D(e, i) {
            et = (J = e) + xt.width, it = (tt = i) + xt.height, t.extend(xt, {
                x1: c(J),
                y1: d(tt),
                x2: c(et),
                y2: d(it)
            }), v(), r.onSelectChange(o, m())
        }

        function _(t) {
            return J = a(z, n(N + u(t), z + H - xt.width)), tt = a(j, n(R + p(t), j + F - xt.height)), D(J, tt), t.preventDefault(), !1
        }

        function T() {
            t(document).unbind("mousemove", T), f(), et = J, it = tt, I(), V = "", mt.is(":visible") || dt.add(mt).hide().fadeIn(r.fadeSpeed || 0), K = !0, t(document).unbind("mouseup", B).mousemove(S).one("mouseup", w), dt.unbind("mousemove", x), r.onSelectStart(o, m())
        }

        function B() {
            t(document).unbind("mousemove", T).unbind("mouseup", B), y(dt.add(mt)), g(c(J), d(tt), c(J), d(tt)), this instanceof t.imgAreaSelect || (r.onSelectChange(o, m()), r.onSelectEnd(o, m()))
        }

        function k(t) {
            return !1
        }

        function P() {
            b(!1)
        }

        function E() {
            U = !0, A(r = t.extend({
                classPrefix: "imgareaselect",
                movable: !0,
                parent: "body",
                resizable: !0,
                resizeMargin: 10,
                onInit: function () {
                },
                onSelectStart: function () {
                },
                onSelectChange: function () {
                },
                onSelectEnd: function () {
                }
            }, r)), dt.add(mt).css({visibility: ""}), r.show && (K = !0, f(), v(), dt.add(mt).hide().fadeIn(r.fadeSpeed || 0)), setTimeout(function () {
                r.onInit(o, m())
            }, 0)
        }

        function $(t, e) {
            for (var i in e)void 0 !== r[i] && t.css(e[i], r[i])
        }

        function A(i) {
            if (i.parent && (Y = t(i.parent)).append(dt.add(mt)), t.extend(r, i), f(), null != i.handles) {
                for (gt.remove(), gt = t([]), st = i.handles ? "corners" == i.handles ? 4 : 8 : 0; st--;)gt = gt.add(e());
                gt.addClass(r.classPrefix + "-handle").css({
                    position: "absolute",
                    fontSize: 0,
                    zIndex: bt + 1 || 1
                }), !parseInt(gt.css("width")) >= 0 && gt.width(5).height(5), (ot = r.borderWidth) && gt.css({
                    borderWidth: ot,
                    borderStyle: "solid"
                }), $(gt, {
                    borderColor1: "border-color",
                    borderColor2: "background-color",
                    borderOpacity: "opacity"
                }), gt.css({background: "#4b91e7", border: "solid 0px #4b91e7", opacity: "0.8"})
            }
            for (O = r.imageWidth / H || 1, W = r.imageHeight / F || 1, null != i.x1 && (g(i.x1, i.y1, i.x2, i.y2), i.show = !i.hide), i.keys && (r.keys = t.extend({
                shift: 1,
                ctrl: "resize"
            }, i.keys)), mt.addClass(r.classPrefix + "-outer"), mt.css({
                background: "#000",
                opacity: "0.6"
            }), ut.addClass(r.classPrefix + "-selection"), st = 0; st++ < 4;)t(pt[st - 1]).addClass(r.classPrefix + "-border" + st);
            $(ut, {selectionColor: "background-color", selectionOpacity: "opacity"}), $(pt, {
                borderOpacity: "opacity",
                borderWidth: "border-width"
            }), $(mt, {
                outerColor: "background-color",
                outerOpacity: "opacity"
            }), (ot = r.borderColor1) && t(pt[0]).css({
                borderStyle: "solid",
                borderColor: ot
            }), (ot = r.borderColor2) && t(pt[1]).css({borderStyle: "dashed", borderColor: ot});
            var a = '<div class="vnetwork"></div>', n = '<div class="hnetwork"></div>';
            if (ut.append(a).addClass("editAvatar_boxLine"), ut.append(n), dt.append(ut.add(pt).add(L)).append(gt), It && 8 >= It) {
                var s = t("<div></div>").css({background: "#fff", opacity: "0", width: "100%", height: "100%"});
                dt.append(s)
            }
            It && ((ot = (mt.css("filter") || "").match(/opacity=(\d+)/)) && mt.css("opacity", ot[1] / 100), (ot = (pt.css("filter") || "").match(/opacity=(\d+)/)) && pt.css("opacity", ot[1] / 100)), i.hide ? y(dt.add(mt)) : i.show && U && (K = !0, dt.add(mt).fadeIn(r.fadeSpeed || 0), b()), X = (nt = (r.aspectRatio || "").split(/:/))[0] / nt[1], ct.add(mt).unbind("mousedown", k), r.disable || r.enable === !1 ? (dt.unbind("mousemove", x).unbind("mousedown", C), t(window).unbind("resize", P)) : ((r.enable || r.disable === !1) && ((r.resizable || r.movable) && dt.mousemove(x).mousedown(C), t(window).resize(P)), r.persistent || ct.add(mt).mousedown(k)), r.enable = r.disable = void 0
        }

        var U, L, z, j, H, F, Y, N, R, O, W, V, Z, q, Q, G, X, K, J, tt, et, it, at, nt, st, ot, rt, lt, ht, ct = t(o), dt = e(), ut = e(), pt = e().add(e()).add(e()).add(e()), mt = e().add(e()).add(e()).add(e()), gt = t([]), ft = {
            left: 0,
            top: 0
        }, vt = {left: 0, top: 0}, bt = 0, yt = "absolute", xt = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            width: 0,
            height: 0
        }, wt = document.documentElement, Ct = navigator.userAgent, Mt = function (t) {
            var e, i, s = r.keys, o = t.keyCode;
            if (e = isNaN(s.alt) || !t.altKey && !t.originalEvent.altKey ? !isNaN(s.ctrl) && t.ctrlKey ? s.ctrl : !isNaN(s.shift) && t.shiftKey ? s.shift : isNaN(s.arrows) ? 10 : s.arrows : s.alt, "resize" == s.arrows || "resize" == s.shift && t.shiftKey || "resize" == s.ctrl && t.ctrlKey || "resize" == s.alt && (t.altKey || t.originalEvent.altKey)) {
                switch (o) {
                    case 37:
                        e = -e;
                    case 39:
                        i = a(J, et), J = n(J, et), et = a(i + e, J), M();
                        break;
                    case 38:
                        e = -e;
                    case 40:
                        i = a(tt, it), tt = n(tt, it), it = a(i + e, tt), M(!0);
                        break;
                    default:
                        return
                }
                I()
            } else switch (J = n(J, et), tt = n(tt, it), o) {
                case 37:
                    D(a(J - e, z), tt);
                    break;
                case 38:
                    D(J, a(tt - e, j));
                    break;
                case 39:
                    D(J + n(e, H - c(et)), tt);
                    break;
                case 40:
                    D(J, tt + n(e, F - d(it)));
                    break;
                default:
                    return
            }
            return !1
        };
        this.remove = function (t) {
            A({disable: !0}), dt.add(mt).remove(), t && t()
        }, this.getOptions = function () {
            return r
        }, this.setOptions = A, this.getSelection = m, this.setSelection = g, this.cancelSelection = B, this.update = b;
        var It = (/msie ([\w.]+)/i.exec(Ct) || [])[1], St = /opera/i.test(Ct), Dt = /webkit/i.test(Ct) && !/chrome/i.test(Ct);
        for (at = ct; at.length;)bt = a(bt, isNaN(at.css("z-index")) ? bt : at.css("z-index")), "fixed" == at.css("position") && (yt = "fixed"), at = at.parent(":not(body)");
        bt = r.zIndex || bt, It && ct.attr("unselectable", "on"), t.imgAreaSelect.keyPress = It || Dt ? "keydown" : "keypress", St && (L = e().css({
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: bt + 2 || 2
        })), dt.add(mt).css({
            visibility: "hidden",
            position: yt,
            overflow: "hidden",
            zIndex: bt || "0"
        }), dt.css({zIndex: bt + 2 || 2}), ut.add(pt).css({
            position: "absolute",
            fontSize: 0
        }), o.complete || "complete" == o.readyState || !ct.is("img") ? E() : ct.one("load", E), !U && It && It >= 7 && (o.src = o.src)
    }, t.fn.imgAreaSelect = function (e) {
        return e = e || {}, this.each(function () {
            t(this).data("imgAreaSelect") ? e.remove ? (t(this).data("imgAreaSelect").remove(), t(this).removeData("imgAreaSelect")) : t(this).data("imgAreaSelect").setOptions(e) : e.remove || (void 0 === e.enable && void 0 === e.disable && (e.enable = !0), t(this).data("imgAreaSelect", new t.imgAreaSelect(this, e)))
        }), e.instance ? t(this).data("imgAreaSelect") : this
    }
}(jQuery), function (t, e, i, a) {
    a.namespace("UploadForm.Model", e.Model.extend({
        callApi: a.RichMail.API.call, initialize: function () {
            this.render()
        }, render: function (t) {
            this.currentFile = t && t.files
        }, getFileMd5: function (t) {
            this.timeBegin = new Date, this.uploading = !0;
            var e, i = 1, a = "/m2015/js/ui/upload/calculator.worker.md5.js";
            "undefined" != typeof Worker && (e = new Worker(a), e.addEventListener("message", this.handle_worker_event("md5_file_hash_" + i, t)), this.hash_file(this.currentFile, e), this.worker = e)
        }, handle_worker_event: function (t, e) {
            return function (i) {
                var a = document;
                a.getElementById(t);
                i.data.result && e && e(i.data.result)
            }
        }, hash_file: function (t, e) {
            var i, a, n, s, o, r = this, l = function (t) {
                n += 1, e.postMessage({message: t.target.result, block: a})
            }, h = function (e) {
                n -= 1, 0 === n && a.end !== t.size && (a.start += i, a.end += i, a.end > t.size && (a.end = t.size), s = new FileReader, s.onload = l, o = r.fileSlice(t, a.start, a.end), s.readAsArrayBuffer(o))
            };
            i = 1048576, a = {
                file_size: t.size,
                start: 0
            }, a.end = i > t.size ? t.size : i, n = 0, e.addEventListener("message", h), s = new FileReader, s.onload = l, o = this.fileSlice(t, a.start, a.end), s.readAsArrayBuffer(o)
        }, fileSlice: function (t, e, i) {
            var a = t.type;
            return t.slice ? t.slice(e, i, a) : t.webkitSlice ? t.webkitSlice(e, i, a) : t.mozSlice ? t.mozSlice(e, i, a) : void 0
        }, uploadAsLargeImgs: function (t, e) {
            this.callApi("file:fastUpload", t, function (t) {
                t && t.responseData && "S_OK" == t.responseData.code ? e(t.responseData["var"]) : t && t.responseData && console.log(t.responseData.summary)
            })
        }, getDownImgSrc: function (t, e) {
            this.callApi("file:preDownload", t, function (t) {
                t && t.responseData && "S_OK" == t.responseData.code ? e(t.responseData) : t && t.responseData && (console.log(t.responseData.summary), e())
            })
        }, getActivityTime: function (t, e) {
        }
    }))
}(jQuery, Backbone, _, M139), function (jQuery, Backbone, M139) {
    var $ = jQuery, superClass = M139.View.ViewBase;
    M139.namespace("M2012.Compose.View.UploadForm", Backbone.View.extend({
        el: "div",
        events: {},
        template: ['<form target="{target}" enctype="multipart/form-data" method="post" action="{action}">', '	<input title="{title}" {multiple} style="font-size:24px; *font-size:44px;position:absolute; right: 0;height:24px;" type="file" name="{fieldName}" />', "</form>"].join(""),
        initialize: function (t) {
            function e() {
                return !0
            }

            var i = M2012.Compose.View.UploadForm.UID++, a = "";
            t = t || {}, this.frameId = t.frameId || "_hideFrame_" + i, this.uploadType = t && t.uploadType, "html5" == this.uploadType && (a = 'multiple="multiple"', this.model = new UploadForm.Model), this.template = M139.Text.Utils.format(this.template, {
                target: this.frameId,
                fieldName: t.fieldName || "file",
                action: t.uploadUrl || "/",
                title: t.title || "请选择文件",
                multiple: a
            }), this.accepts = t.accepts, this.onSelect = t.onSelect || e, this.onBeforeUpload = t.onBeforeUpload || e, this.onUploadFrameLoad = t.onUploadFrameLoad || e, this.wrapper = t.wrapper || document.body;
            var n = $(this.wrapper).append(this.template);
            this.setElement(n)
        },
        render: function () {
            return this.resetAccepts(), this.initEvents(), this
        },
        initEvents: function () {
            var t = this;
            this.$("input").on("change", function () {
                var e, i, a;
                if (e = this.form, a = this.value, !a || !t.onSelect(a, $Url.getFileExtName(a)))return void e.reset();
                if ("html5" == t.uploadType && this.files) {
                    var n = 0;
                    t.failTotal = 0, t.filesList = {files: this.files, index: 0};
                    for (var s = 0, o = this.files.length; o > s; s++)n += this.files[s].size;
                    if (!t.onBeforeUpload(n))return void e.reset();
                    t.currentFile = t.filesList.files[t.filesList.index], t.uploadFile(t.currentFile)
                } else {
                    i = t.getHideFrame(), i.one("load", function () {
                        t.onUploadFrameLoad(this)
                    });
                    try {
                        e.submit(), e.reset()
                    } catch (r) {
                        i.attr("src", top.getRootPath() + "/html/blank.html").one("load", function () {
                            e.submit(), e.reset()
                        })
                    }
                }
            })
        },
        uploadFile: function (t) {
            var e = {
                fileName: t.fileName || t.name,
                fileSize: t.fileSize || t.size,
                fileObj: t,
                uploadType: "ajax",
                offset: t.offset || 0,
                length: t.length || 1048576,
                sip: t.sip || "",
                fileId: t.fileId || ""
            };
            this.ajaxUpload(e)
        },
        ajaxUpload: function (t) {
            var e = this, i = this.getFormData(t), a = this.getFileUploadXHR();
            this.xhr = a, a.upload.onloadstart = function (t) {
                e.onloadstart(t)
            }, a.upload.onprogress = function (t) {
                e.onprogress(t)
            }, a.ontimeout = function (t) {
                e.ontimeout(t)
            }, a.onreadystatechange = function (t) {
                e.onreadystatechange(t)
            }, this.isSupportFileSlice = this.isSupportFileSliceFn(t.fileObj);
            var n = upload_module.model, s = window.location.protocol + "//" + window.location.host + "/RmWeb/mail?func=attach:upload2&sid=" + n.getSid() + "&composeId=" + n.composeId + "&type=internal&cguid=" + Math.random();
            a.open("POST", s, !0), a.send(i)
        },
        checkUploadResultWithResponseText: function (param) {
            var text = param.responseText, result = {}, reg = /'var':([\s\S]+?)\};<\/script>/;
            if (text.indexOf("'code':'S_OK'") > 0) {
                var m = text.match(reg);
                result = eval("(" + m[1] + ")"), result.success = !0
            } else result.success = !1, $.extend(result, M139.JSON.tryEval(text)), result.isExtendSize = text.indexOf("'code':'FA_ATTACH_SIZE_EXCEED'") > 0;
            return result
        },
        getFormData: function (t) {
            var e = new FormData, i = this.getFileData(t);
            for (var a in i)"FileData" == a ? e.append(a, i[a], t.fileName) : e.append(a, i[a]);
            return e
        },
        getFileData: function (t) {
            var e = this.getRange(t);
            return {
                timestamp: (new Date).toDateString(),
                type: "1",
                sip: t.sip || "",
                range: e.from + "-" + e.to,
                fileid: t.fileId || "",
                filesize: t.fileSize,
                Filename: t.fileName,
                FileData: this.fileSlice(t.fileObj, e.from, e.to)
            }
        },
        getRange: function (t, e) {
            var i = t.offset, a = Number(t.offset) + Number(t.length);
            return a = a > t.fileSize ? t.fileSize : a, e || (e = 0), {from: i, to: a - e}
        },
        fileSlice: function (t, e, i) {
            var a = t.type;
            return t.slice ? t.slice(e, i, a) : t.webkitSlice ? t.webkitSlice(e, i, a) : t.mozSlice ? t.mozSlice(e, i, a) : void 0
        },
        getFileUploadXHR: function () {
            return window.fileUploadXHR || (fileUploadXHR = new XMLHttpRequest), fileUploadXHR
        },
        isSupportFileSliceFn: function (t) {
            return !!(t.slice || t.webkitSlice || t.mozSlice)
        },
        showProgress: function () {
            0 == this.filesList.index && top.BH("showIMgProccess")
        },
        onloadstart: function () {
            this.showProgress()
        },
        onprogress: function (t) {
            var e = this.filesList.files.length, i = this.filesList.index + 1, a = this;
            if (t.lengthComputable) {
                var n = a.currentFile;
                n.sendedSize = (n.offset || 0) + t.loaded, n.progress = parseInt(n.sendedSize / n.size * 100), n.progress = Math.min(n.progress, 100), top.M139.UI.TipMessage.show("正在上传" + i + "/" + e + ",当前文件上传进度" + n.progress + "%")
            }
        },
        ontimeout: function (t) {
            top.$Msg.alert("上传超时")
        },
        onreadystatechange: function (t) {
            var e = this.xhr, i = this;
            if (4 == e.readyState)if (200 == e.status) {
                var a = i.currentFile, n = e.responseText;
                n.indexOf("middleret") > 0 && (n = UploadLargeAttach.responseConvert(n));
                var s = i.uploadResult = this.checkUploadResultWithResponseText({
                    responseText: n,
                    fileName: a.fileName
                });
                s.success ? s.fileSize == a.size ? (i.parseFile({
                    fileId: s.fileId,
                    fileName: s.fileName,
                    fileSize: s.fileSize
                }), i.updateProgress()) : s.offset + s.length < a.size && (a = $.extend(a, s), a.offset = s.offset + s.length, a.isLargeAttach && (a.offset = a.offset + 1), a.state = "uploading", i.uploadFile(a)) : (i.failTotal += 1, s.isExtendSize ? top.M139.UI.TipMessage.show("上传总大小超过限制", {
                    delay: 1e3,
                    className: "msgRed"
                }) : top.M139.UI.TipMessage.show((a.fileName || a.name) + "上传失败，请重试", {
                    delay: 1e3,
                    className: "msgRed"
                }), i.loadImgComplete())
            } else i.failTotal += 1, M139.UI.TipMessage.show(a.fileName + " 上传失败", {delay: 1e3}), i.loadImgComplete()
        },
        parseFile: function (t) {
            var e = t.fileId, i = t.fileName, a = t.fileSize;
            if (e && i) {
                var n = this.getAttachUrl(e, i);
                this.onUploadFrameLoad && this.onUploadFrameLoad({
                    url: n,
                    fileId: e,
                    fileName: i,
                    fileSize: a + ""
                }), this.loadImgComplete()
            }
        },
        loadImgComplete: function () {
            if (this.filesList.index < this.filesList.files.length - 1) {
                var t = ++this.filesList.index;
                switch (this.currentFile = this.filesList.files[t], this.uploadType) {
                    case"largeAttacth":
                        this.uploadAsLargeAttacth(this.filesList.files[t]);
                        break;
                    default:
                        this.uploadFile(this.filesList.files[t])
                }
            } else if (this.filesList.index == this.filesList.files.length - 1) {
                if (this.failTotal > 0)return top.BH("imgsPartComplete"), void this.$("input")[0].form.reset();
                top.BH("imgsUploadComplete"), top.M139.UI.TipMessage.show("上传完成", {delay: 1e3}), this.$("input")[0].form.reset()
            }
        },
        updateProgress: function () {
        },
        getAttachUrl: function (t, e, i) {
            var a = top.$App.getSid(), n = "/RmWeb/view.do?func=attach:getAttach&sid=" + a + "&fileId=" + t + "&fileName=" + encodeURIComponent(e);
            return i && (n = top.getProtocol() + location.host + n), n
        },
        uploadAsLargeAttacth: function (t) {
            var e = this, i = t;
            this.model.render({files: t}), this.model.getFileMd5(function (t) {
                e.uploadAttacth(i, t)
            })
        },
        uploadAttacth: function (t, e) {
            var i = this, a = {fileName: t.name, fileSize: t.size, fileMd5: e};
            a = top.$Xml.obj2xml(a), this.onloadstart(), this.model.uploadAsLargeImgs(a, function (t) {
                t && t.file && t.file && i.downImgSrc(t.file)
            })
        },
        downImgSrc: function (t) {
            var e = this, i = {fileIds: t.fid};
            this.model.getDownImgSrc(i, function (t) {
                t && t.imageUrl ? htmlEditorView && htmlEditorView.editorView.editor.insertImage(t.imageUrl, {isAdjustWidth: {newWidthClass: "newWidthClass"}}) : e.failTotal++, e.loadImgComplete()
            })
        },
        resetAccepts: function (t) {
            var e = t || this.accepts, i = M2012.Compose.View.UploadForm.mimeTypes;
            _.isArray(this.accepts) && (e = _.map(e, function (t) {
                return i[t]
            }), e = _.unique(e).join(", "), this.$("input").attr("accept", e))
        },
        getHideFrame: function () {
            var t = "#" + this.frameId, e = $(this.wrapper).closest("body").find(t);
            return 0 == e.length && (e = $('<iframe id="' + this.frameId + '" name="' + this.frameId + '" style="display:none"></iframe>').appendTo(this.wrapper)), e
        }
    }, {
        UID: 0,
        mimeTypes: {
            gif: "image/gif",
            jpg: "image/jpeg",
            bmp: "image/bmp",
            png: "image/png",
            txt: "text/plain",
            doc: "application/msword",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ppt: "application/vnd.ms-powerpoint",
            pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            xls: "application/vnd.ms-excel",
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            pdf: "application/pdf",
            mp3: "audio/mpeg",
            mp4: "video/mp4",
            webm: "video/webm",
            ogg: "video/ogg",
            zip: "application/zip",
            rar: "application/octet-stream",
            flv: "flv-application/octet-stream"
        }
    }))
}(jQuery, Backbone, M139), function (t, e, i) {
    var a = "ComputeCoords", n = i.Model.ModelBase;
    i.namespace(a, n.extend({
        name: a,
        defaults: {
            direction: "",
            sePoint: {x: 0, Y: 0},
            nwPoint: {x: 0, y: 0},
            previousMousePoint: {x: 0, y: 0},
            rotateAngle: 0,
            orignImgW: 0,
            orignImgH: 0,
            orignImgTop: 0,
            orignImgLeft: 0,
            dragBox: {dragBoxW: 0, dragBoxH: 0, dragBoxTop: 0, dragBoxLeft: 0},
            maxMouseStepX: 0,
            maxMouseStepY: 0
        },
        initialize: function (t) {
            var e = t.orginImgEl, i = t.dragBox;
            this.set({
                orignImgW: e.width(),
                orignImgH: e.height(),
                orignImgTop: e.offset().top,
                orignImgLeft: e.offset().left
            }), this.set("dragBox", i), this.set({
                maxMouseStepX: this.get("orignImgW") - this.get("dragBox").dragBoxW,
                maxMouseStepY: this.get("orignImgH") - this.get("dragBox").dragBoxH
            }), n.prototype.initialize.apply(this, arguments)
        },
        caculateMouseSteps: function (t, e) {
            var i = this.get("previousMousePoint"), a = 0, n = 0;
            return a = t.pageX - i.x, n = t.pageY - i.y, this.set("previousMousePoint", {
                x: t.pageX,
                y: t.pageY
            }), [a, n]
        },
        caculateDragBoxBoundary: function (t, e) {
            var t = Math.max(t, 0);
            t = Math.min(this.get("maxMouseStepX"), t);
            var e = Math.max(e, 0);
            return e = Math.min(this.get("maxMouseStepY"), e), [t, e]
        },
        setCoords: function (t) {
            var e = this, i = t.dragBox, a = {
                w: e.get("orignImgW"),
                h: e.get("orignImgH")
            }, n = t.isCornerDragging, s = this.get("rotateAngle");
            if (this.set({dragBox: i}), 1 == n)this.set({
                maxMouseStepX: a.h - i.dragBoxW,
                maxMouseStepY: a.w - i.dragBoxH
            }); else switch (s) {
                case 0:
                    this.set("nwPoint", {x: i.dragBoxLeft, y: i.dragBoxTop});
                    break;
                case 90:
                    this.set("sePoint", {x: a.h - i.dragBoxTop - i.dragBoxH, y: i.dragBoxLeft});
                    break;
                case 180:
                    this.set("nwPoint", {x: a.w - i.dragBoxLeft - i.dragBoxW, y: a.h - i.dragBoxTop - i.dragBoxH});
                    break;
                case 270:
                    this.set("sePoint", {x: i.dragBoxTop, y: a.w - i.dragBoxLeft - i.dragBoxW});
                    break;
                default:
                    this.set("nwPoint", {x: i.dragBoxLeft, y: i.dragBoxTop})
            }
        },
        dragStart: function (t) {
            var e = {x: t.pageX, y: t.pageY};
            this.set("previousMousePoint", e), this.set({
                maxMouseStepX: this.get("orignImgW") - this.get("dragBox").dragBoxW,
                maxMouseStepY: this.get("orignImgH") - this.get("dragBox").dragBoxH
            })
        },
        onDragging: function (t) {
            var e = this.get("rotateAngle");
            switch (e) {
                case 0:
                    this.onDragging0Angle(t);
                    break;
                case 90:
                    this.onDragging90Angle(t);
                    break;
                case 180:
                    this.onDragging180Angle(t);
                    break;
                case 270:
                    this.onDragging270Angle(t);
                    break;
                default:
                    this.onDragging0Angle(t)
            }
        },
        onDragging0Angle: function (t) {
            var e = this.caculateMouseSteps(t), i = this.get("dragBox").dragBoxLeft + e[0], a = this.get("dragBox").dragBoxTop + e[1], n = this.caculateDragBoxBoundary(i, a), s = {
                dragBoxW: this.get("dragBox").dragBoxW,
                dragBoxH: this.get("dragBox").dragBoxH,
                dragBoxLeft: n[0],
                dragBoxTop: n[1]
            };
            this.setCoords({dragBox: s, isCornerDragging: !1})
        },
        onDragging90Angle: function (t) {
            var e = this.caculateMouseSteps(t), i = this.get("dragBox").dragBoxLeft + e[1], a = this.get("dragBox").dragBoxTop - e[0], n = this.caculateDragBoxBoundary(i, a), s = {
                dragBoxW: this.get("dragBox").dragBoxW,
                dragBoxH: this.get("dragBox").dragBoxH,
                dragBoxLeft: n[0],
                dragBoxTop: n[1]
            };
            this.setCoords({dragBox: s, isCornerDragging: !1})
        },
        onDragging180Angle: function (t) {
            var e = this.caculateMouseSteps(t), i = this.get("dragBox").dragBoxLeft - e[0], a = this.get("dragBox").dragBoxTop - e[1], n = this.caculateDragBoxBoundary(i, a), s = {
                dragBoxW: this.get("dragBox").dragBoxW,
                dragBoxH: this.get("dragBox").dragBoxH,
                dragBoxLeft: n[0],
                dragBoxTop: n[1]
            };
            this.setCoords({dragBox: s, isCornerDragging: !1})
        },
        onDragging270Angle: function (t) {
            var e = this.caculateMouseSteps(t), i = this.get("dragBox").dragBoxLeft - e[1], a = this.get("dragBox").dragBoxTop + e[0], n = this.caculateDragBoxBoundary(i, a), s = {
                dragBoxW: this.get("dragBox").dragBoxW,
                dragBoxH: this.get("dragBox").dragBoxH,
                dragBoxLeft: n[0],
                dragBoxTop: n[1]
            };
            this.setCoords({dragBox: s, isCornerDragging: !1})
        },
        cornerDragging: function (t) {
            var e = this.get("rotateAngle");
            switch (e) {
                case 0:
                    this.seDragging0Angle(t);
                    break;
                case 90:
                    this.nwDragging90Angle(t);
                    break;
                case 180:
                    this.seDragging180Angle(t);
                    break;
                case 270:
                    this.nwDragging270Angle(t)
            }
        },
        seDragging0Angle: function (t) {
            var e = this.get("dragBox"), i = 0, a = this.caculateMouseSteps(t), n = a[0], s = a[1], o = 0, r = e.dragBoxW, l = e.dragBoxH, h = e.dragBoxTop, c = e.dragBoxLeft, d = this.get("orignImgH"), u = this.get("orignImgW"), p = this.get("nwPoint"), m = p.x, g = p.y;
            n > 0 && s > 0 && (o = Math.max(n, s), l += o, r += o, i = Math.max(l + h - d, c + r - u), i > 0 && (r -= i, l -= i)), 0 > n && 0 > s && (o = Math.min(n, s), r += o, r = Math.max(1, r), c = Math.max(m, c), l += o, l = Math.max(1, l), r = l, h = Math.max(g, h)), e = {
                dragBoxW: r,
                dragBoxH: l,
                dragBoxLeft: c,
                dragBoxTop: h
            }, this.setCoords({dragBox: e, isCornerDragging: !0})
        },
        nwDragging90Angle: function (t) {
            var e = this.get("dragBox"), i = 0, a = this.caculateMouseSteps(t), n = a[0], s = a[1], o = 0, r = e.dragBoxW, l = e.dragBoxH, h = e.dragBoxTop, c = e.dragBoxLeft, d = this.get("orignImgH"), u = this.get("orignImgW"), p = this.get("sePoint"), m = p.x, g = p.y;
            n > 0 && s > 0 && (o = Math.max(n, s), h -= o, r += o, l += o, i = Math.max(g + l - u, r + m - d), i > 0 && (r -= i, l -= i, h += i)), 0 > n && 0 > s && (o = Math.min(n, s), r += o, l += o, h -= o, r = Math.max(r, 1), l = Math.max(l, 1), i = m + h + r - d, i > 0 && (h -= i)), e = {
                dragBoxW: r,
                dragBoxH: l,
                dragBoxLeft: c,
                dragBoxTop: h
            }, this.setCoords({dragBox: e, isCornerDragging: !0})
        },
        seDragging180Angle: function (t) {
            var e = this.get("dragBox"), i = 0, a = this.caculateMouseSteps(t), n = a[0], s = a[1], o = 0, r = e.dragBoxW, l = e.dragBoxH, h = e.dragBoxTop, c = e.dragBoxLeft, d = this.get("orignImgH"), u = this.get("orignImgW"), p = this.get("nwPoint"), m = p.x, g = p.y;
            n > 0 && s > 0 && (o = Math.max(n, s), c -= o, h -= o, r += o, l += o, (0 > c || 0 > h) && (i = Math.min(c, h), c -= i, h -= i, r += i, l += i)), 0 > n && 0 > s && (o = Math.min(n, s), r += o, l += o, r = Math.max(r, 1), l = Math.max(l, 1), h -= o, c -= o, i = Math.max(m + c - u, g + h - d), i > 0 && (h -= i, c -= i)), e = {
                dragBoxW: r,
                dragBoxH: l,
                dragBoxLeft: c,
                dragBoxTop: h
            }, this.setCoords({dragBox: e, isCornerDragging: !0})
        },
        nwDragging270Angle: function (t) {
            var e = this.get("dragBox"), i = 0, a = this.caculateMouseSteps(t), n = a[0], s = a[1], o = 0, r = e.dragBoxW, l = e.dragBoxH, h = e.dragBoxTop, c = e.dragBoxLeft, d = this.get("orignImgH"), u = this.get("orignImgW"), p = this.get("sePoint"), m = p.x, g = p.y;
            n > 0 && s > 0 && (o = Math.max(n, s), c -= o, r += o, l += o, i = Math.max(g + l - u, r + m - d), i > 0 && (r -= i, l -= i, c += i)), 0 > n && 0 > s && (o = Math.min(n, s), r += o, l += o, c -= o, r = Math.max(r, 1), l = Math.max(l, 1), i = g + c + l - u, i > 0 && (c -= i)), e = {
                dragBoxW: r,
                dragBoxH: l,
                dragBoxLeft: c,
                dragBoxTop: h
            }, this.setCoords({dragBox: e, isCornerDragging: !0})
        }
    }))
}(jQuery, _, M139), function (t, e, i) {
    var a = "M2012.UI.Model.ImageCropper", n = i.Model.ModelBase;
    i.namespace(a, n.extend({
        name: a,
        EVENTS: {
            FACE_EDIT_READY: "imagecropper:face_edit_ready",
            OPERATE_FREQUENT: "imagecropper:operate_frequent",
            IMG_UPLOAD_FAILURE: "imagecropper:img_upload_failure",
            IMG_UPLOAD_START: "imagecropper:img_upload_start",
            IMG_UPLOAD_SUCCESS: "imagecropper:img_upload_success"
        },
        defaults: function () {
            return {
                rotateAngle: 0,
                isPopupFromPage: !0,
                imagePath: "",
                imageName: "",
                dragBox: null,
                zoomRatio: 1,
                rotateZoomRatio: 1,
                userSelctType: 1,
                nwPoint: {x: 0, y: 0},
                sePoint: {x: 0, y: 0},
                imageWidth: 0,
                imageHeight: 0
            }
        },
        initialize: function (t) {
            n.prototype.initialize.apply(this, arguments)
        },
        saveCroppedImg: function (t, e) {
            var a = this;
            i.RichMail.API.call("contact:uploadAfterCut", t, function (t) {
                var i = t.responseData, n = "", s = "";
                "S_OK" == i.code ? (n = i.msg, a.set({imagePath: n}), s = a.getImageUrl(), e.success && e.success({
                    imagePath: n,
                    imageUrl: s
                }), M2012.Contacts.getModel().getUserInfo({refresh: !0}, function (t) {
                })) : e.fail && e.fail(i.msg)
            }, function (t) {
                e.fail && e.fail(t.responseData.msg)
            })
        },
        getImageUrl: function (t) {
            var i = "", a = top.location.host;
            return a.indexOf("10086.cn") > -1 && top.$User.isGrayUser() ? a = t ? "http://image0.139cm.com:2080" : "http://image0.139cm.com" : a.indexOf("10086.cn") > -1 && !top.$User.isGrayUser() ? a = t ? "http://172.16.172.171:2080" : "http://images.139cm.com" : a.indexOf("10086ts") > -1 ? a = t ? "http://g2.mail.10086ts.cn" : "http://192.168.9.193:2080" : a.indexOf("10086rd") > -1 && (a = "http://app.mail.10086rd.cn"), i = this.get("imagePath"), e.isEmpty(i) ? void 0 : i.indexOf("http://") > -1 || i.indexOf("https://") > -1 ? i : a + i
        },
        formUploadUrl: function (t) {
            var t = t || 0, e = "10086.cn" == document.domain ? top.getDomain("rebuildDomain") : "", i = "{0}/bmail/s?func=contact:uploadImage&sid={1}&serialId={2}&type=1&callback={3}&isTemp={4}";
            return i = i.format(e, top.sid, t, "myPicture", 1), console.log("m2012.ui.model.imagecropper.js formUploadUrl url==" + i), i
        },
        setDefaultImg: function (t, e) {
            top.M2012.Contacts.API.resetUserImgURL({
                success: function (e) {
                    var i = e.data;
                    if ("S_OK" == i.code) {
                        var a = i.ImageUrl;
                        return t && t(a)
                    }
                }, error: function () {
                    return e && e()
                }
            })
        },
        sendSysSms: function (t) {
            var e = ("/mw2/sms/sms?func=sms:sendSysSms&sid=" + top.$App.getSid() + "&rnd=" + Math.random(), (top.$User.getAliasName("mobile") + "/" + top.$User.getAliasName("common")).replace(/@[^\/]*/g, "")), a = "http://html5.mail.10086.cn/?id=phoneAttach&cid=" + [Math.random(), top.$App.getSid(), (new Date).getTime(), "contact"].join("/") + "&cnum=" + e + "&multiple=0", n = {
                loginName: top.$User.getAliasName("mobile").replace(/@[^\/]*/g, ""),
                fv: "4",
                clientId: "1000",
                loginSuccessUrl: a
            };
            i.RichMail.API.call("login:sendSmsCode", n, function (e) {
                t(e.responseData || {})
            })
        },
        getDiskImages: function (t, e, i) {
            top.$RM.call("disk:getContentInfosByType", t, function (t) {
                var a = t.responseData;
                if ("S_OK" == a.code) {
                    var n = a["var"].files;
                    return e && e(n)
                }
                i && i(a.msg)
            })
        }
    }))
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = "M2012.UI.View.ImageCropper", s = i.View.ViewBase;
    i.namespace(n, s.extend({
        name: n,
        imgConst: {
            large: {w: 363, h: 250},
            small: {w: 100, h: 100},
            smaller: {w: 52, h: 52},
            largest: {w: 200, h: 200},
            smallest: {w: 30, h: 30}
        },
        defaultSelection: {x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0},
        selection: {},
        originImg: {w: 0, h: 0, src: ""},
        doingImg: {imgWidth: 0, imgHeight: 0, firstImgWidth: 0, firstImgHeight: 0},
        imgSelectObj: null,
        ui: {},
        PAGE_SIZE: 9,
        initialize: function (t) {
            var e = this;
            e.imageUrl = e.checkimageUrl(t), e.accepts = t.accepts || ["jpg", "jpeg", "bmp", "png"], e.onImgSaving = t.onImgSaving || function () {
                }, e.model = new M2012.UI.Model.ImageCropper, e.event = {}, e.pageIndex = 1, e.render(), s.prototype.initialize.apply(e, arguments)
        },
        getElement: function (t) {
            var e = this;
            return t = $T.format("#{cid}_{id}", {cid: e.cid, id: t}), e.dialog.$el.find(t)
        },
        getInitDialogHTML: function () {
            var t = this, e = t.faceEditPopupTpl.join("");
            return e = $T.format(e, {cid: t.cid, URL: t.imageUrl})
        },
        getDiskDialog: function (t) {
            var i = this;
            top.M139.UI.TipMessage.show("正在加载中..."), i.model.getDiskImages(t, function (n) {
                i.ui.$uploadDisk.removeAttr("click"), top.M139.UI.TipMessage.hide();
                var s = i.renderDiskData(n);
                if (1 == t.toPage)i.diskDialog = top.$Msg.showHTML(s, function () {
                    var t = i.diskDialog.$el.find("ul li.focus img");
                    return 0 == t.length ? (i.cancelDiskChoose(), !1) : (i.model.set({
                        imagePath: t.attr("src"),
                        imageName: t.attr("filename"),
                        isPopupFromPage: !1
                    }), i.pageIndex = 1, void i.uploadSuccessDone())
                }, function () {
                    i.cancelDiskChoose()
                }, {
                    dialogTitle: "从彩云网盘选择头像", height: 369, width: 518, buttons: ["确定", "取消"], onClose: function () {
                        i.pageIndex = 1
                    }
                }), i.dialogObj = i.diskDialog.$el, i.dialogObj.find("#imgScrollArea").on("click", function (t) {
                    "anchor" == a(t.target).attr("role") && (i.dialogObj.find("ul li").removeClass("focus"), a(t.target).closest("li").addClass("focus"))
                }), i.diskScrollLoad(n.length, i.dialogObj); else {
                    var o = e.template(i.singleImageTpl), r = o(n);
                    i.dialogObj.find("#imgScrollArea ul").append(r), i.diskScrollLoad(n.length, i.dialogObj)
                }
            }, function () {
                top.M139.UI.TipMessage.show("加载失败！", {delay: 3e3, className: "msgRed"})
            })
        },
        diskScrollLoad: function (t, e) {
            var i = this;
            if (t >= i.PAGE_SIZE) {
                var n = e.find("#imgScrollArea");
                n.unbind("scroll").scroll(function () {
                    a(this).find("ul").height() - a(this).scrollTop() - a(this).height() <= 2 && (i.pageIndex++, i.getDiskDialog({
                        contentType: 1,
                        toPage: i.pageIndex,
                        pageSize: i.PAGE_SIZE,
                        sortDirection: 1
                    }), a(this).unbind("scroll"))
                })
            }
        },
        renderDiskData: function (t) {
            var i = this, t = i.getDecorateDiskData(t);
            return i.diskImageTemplate = e.template(i.diskDialogTpl), i.diskImageTemplate(t)
        },
        getDecorateDiskData: function (t) {
            return a.each(t, function (t, e) {
                var i = e.name, a = i.lastIndexOf("."), n = i.substring(0, a);
                n = n.length > 12 ? $T.Html.encode(n.substring(0, 12)) + "…" : $T.Html.encode(n), e.shortName = n + "." + e.ext
            }), t
        },
        render: function () {
            var t = this;
            this.dialog = top.$Msg.showHTML(t.getInitDialogHTML(), function () {
                var i = t.model.get("userSelctType");
                if (e.isUndefined(t.dialog.$el.attr("lock"))) {
                    if (t.dialog.$el.attr("lock", "yes"), "1" == i)return t.saveSysImg(), !1;
                    t.saveCroppedImg(t.model.get("isPopupFromPage"))
                }
            }, function () {
                t.cancelCroppedImg()
            }, {
                dialogTitle: "编辑头像", height: 390, width: 518, buttons: ["确定", "取消"], onClose: function () {
                    top.BH("dialog_icon_close")
                }
            }), this.contentChangeZoneEl = this.getElement("contentChangeZone"), this.ui = {
                $upload: this.getElement("uploadLocalDisk"),
                $uploadSms: this.getElement("uploadMobile"),
                $uploadDisk: this.getElement("uploadDisk"),
                $setDefault: this.getElement("setDefault"),
                $small: this.getElement("largeFacePreview"),
                $smaller: this.getElement("smallFacePreview"),
                $divSmall: this.getElement("largeFacePreviewWrapper"),
                $divSmaller: this.getElement("smallFacePreviewWrapper"),
                $toggleTag: this.getElement("boxIframePicUl"),
                $line: this.getElement("line"),
                $largeFacePreviewWrapper: this.getElement("largeFacePreviewWrapper"),
                $smallFacePreviewWrapper: this.getElement("smallFacePreviewWrapper"),
                $lastTimeFacePreviewWrapper: this.getElement("lastTimeFacePreviewWrapper"),
                $imgZone: this.contentChangeZoneEl
            }, this.uploadForm = this.initUploadFormComp(), this.setLastImageUrl(), this.initEvents()
        },
        initEvents: function () {
            var t = this, e = t.model, i = t.model.EVENTS;
            t.ui.$toggleTag.off("click").on("click", function (e) {
                var i = e.target, n = a(i).attr("toggleType"), s = t.dialog.$el;
                "1" === n ? (t.model.set({userSelctType: 1}), s.find(".boxIframePic_change[avatarType='2']").hide(), s.find(".boxIframePic_change[avatarType='1']").show(), t.ui.$line.attr("style", "position: absolute;bottom: -2px;left: 0;width: 76px;height: 2px;background-color: #444;display: inline-block;"), top.BH("sysAvatar_sys")) : (t.model.set({userSelctType: 2}), s.find(".boxIframePic_change[avatarType='1']").hide(), s.find(".boxIframePic_change[avatarType='2']").show(), t.ui.$line.attr("style", "position: absolute;bottom: -2px;left:76px;width: 76px;height: 2px;background-color: #444;display: inline-block;"), top.BH("sysAvatar_user"))
            }), t.dialog.$el.find(".boxIframePic_change[avatarType='1'] img").bind("click", function (e) {
                var i = a(this), n = i.attr("src");
                t.model.set({
                    imagePath: n,
                    isPopupFromPage: !1
                }), t.ui.$small.attr("src", n).attr("style", "width:100px; height:100px;"), t.ui.$smaller.attr("src", n).attr("style", "width:52px; height:52px;"), top.BH("sysAvatar_select")
            }), t.ui.$uploadSms.bind("click", function () {
                t.getElement("faceImgEditPos").remove(), t.ui.$imgZone.attr("style", "").addClass("editAvatar_help"), t.ui.$small.attr("src", t.imageUrl).attr("style", "width:100px; height:100px;"), t.ui.$smaller.attr("src", t.imageUrl).attr("style", "width:52px; height:52px;"), t.uploadImgMobile()
            }), t.ui.$lastTimeFacePreviewWrapper.bind("click", function () {
                var e = a(this).find("img").attr("src");
                t.ui.$largeFacePreviewWrapper.find("img").attr("src", e), t.ui.$smallFacePreviewWrapper.find("img").attr("src", e), t.model.set({isUseLastImageUrl: !0}), t.model.set({
                    imagePath: t.lastImageUrl,
                    isPopupFromPage: !1
                }), top.BH && top.BH("click_lastImageUrl")
            });
            var n = {contentType: 1, toPage: 1, pageSize: t.PAGE_SIZE, sortDirection: 1};
            t.ui.$uploadDisk.bind("click", function () {
                return t.ui.$uploadDisk.attr("click") ? !1 : (top.BH("upload_image_disk"), t.ui.$uploadDisk.attr("click", "true"), void t.getDiskDialog(n))
            }), t.ui.$setDefault.bind("click", function () {
                top.BH("setDefaultHeadClick");
                var e, i;
                e = "您的头像将被设置为系统默认头像。确定还原？", i = top.$Msg.confirm(e, function () {
                    t.model.setDefaultImg(function (e) {
                        top.BH("setDefaultHeadSuccess"), t.cancelCroppedImg(), t.model.set({imagePath: e});
                        var i = t.model.getImageUrl();
                        t.onImgSaving({imageUrl: i, ImagePath: e}), top.M139.UI.TipMessage.show("头像设置成功", {delay: 2e3})
                    })
                }, "", "", {isHtml: !0})
            }), e.on(i.FACE_EDIT_READY, function () {
            }), e.on(i.IMG_UPLOAD_FAILURE, function (e) {
                t.updateFaceImgEditZone("upload-fail", e.message)
            }), e.on(i.OPERATE_FREQUENT, function (e) {
                t.updateFaceImgEditZone("upload-frequent", e.message)
            }), e.on(i.IMG_UPLOAD_START, function (e) {
                t.updateFaceImgEditZone("upload-start", e.message)
            }), e.on(i.IMG_UPLOAD_SUCCESS, function (i) {
                e.set({isPopupFromPage: !1}), t.updateFaceImgEditZone("upload-success")
            })
        },
        showLoadingAfterClick: function () {
            var t = this;
            t.ui.$imgZone.html("").removeClass("editAvatar_no"), t.ui.$small.attr("src", t.imageUrl).attr("style", "width:100px; height:100px;"), t.ui.$smaller.attr("src", t.imageUrl).attr("style", "width:52px; height:52px;"), t.contentChangeZoneClassSet("editAvatar_upload")
        },
        initUploadFormComp: function () {
            var t = this, i = t.model, a = this.getElement("uploadLocalDisk"), n = '<iframe id="ifmReturnInfo" name="ifmReturnInfo" height="0" width="0" frameborder="0" style="display:none;"></iframe>';
            t.dialog.$el.append(n);
            var s = new M2012.Compose.View.UploadForm({
                wrapper: a,
                frameId: "ifmReturnInfo",
                uploadUrl: t.model.formUploadUrl(),
                accepts: t.accepts,
                onSelect: function (a, n) {
                    return top.BH("upload_image_local_disk"), -1 == e.indexOf(this.accepts, n) ? (i.trigger(i.EVENTS.IMG_UPLOAD_FAILURE, {message: "只允许插入" + this.accepts.join(", ") + "格式的图片"}), !1) : (t.showLoadingAfterClick(), !0)
                }
            }).render();
            return t.myPictureProcess(), s
        },
        setLastImageUrl: function () {
            var t = this;
            M2012.Contacts.getModel().getUserInfo({refresh: !0}, function (e) {
                var i = "/m2015/images/global/face.png";
                "S_OK" == e.code && e["var"].LastImageUrl ? (t.lastImageUrl = e["var"].LastImageUrl, t.lastImageUrl ? t.ui.$lastTimeFacePreviewWrapper.find("img").attr("src", top.getDomain("resource") + t.lastImageUrl) : (t.ui.$lastTimeFacePreviewWrapper.find("img").attr("src", i), t.lastImageUrl = i)) : (t.ui.$lastTimeFacePreviewWrapper.find("img").attr("src", i), t.lastImageUrl = i)
            })
        },
        checkimageUrl: function (t) {
            if (e.isUndefined(t.imageUrl))throw new Error("图片路径地址不能为空");
            return t.imageUrl
        },
        waitingImgLoading: function () {
        },
        updateFaceImgEditZone: function (t, e) {
            var i = this, a = (i.model, i.contentChangeZoneEl), n = "";
            switch (t) {
                case"upload-start":
                    i.contentChangeZoneClassSet("editAvatar_upload"), a.html("<p>" + e + "</p>");
                    break;
                case"upload-fail":
                    i.contentChangeZoneClassSet("editAvatar_limit"), a.html('<i class="i_warn_min"></i>' + e);
                    break;
                case"upload-success":
                    i.uploadSuccessDone(a);
                    break;
                case"upload-frequent":
                    i.contentChangeZoneClassSet("editAvatar_help"), n = ['<i class="i_warn_min"></i>', '<span class="red">', e, "</span>", "<br>", "<span>支持android、ios手机操作系统</span>"].join(""), a.html(n)
            }
        },
        setDefaultSelection: function (t, e) {
            var i = 0, a = 0, n = this.imgConst.largest.w, s = this.imgConst.small.w, o = this.imgConst.smaller.w, r = this.imgConst.smallest.w;
            t >= n && e >= n ? a = i = n : t >= s && e >= s ? a = i = s : t >= o && e >= o ? a = i = o : t >= r && e >= r && (a = i = r);
            var l = (t - i) / 2, h = (e - a) / 2, c = l + i, d = h + a, u = {
                x1: l,
                y1: h,
                x2: c,
                y2: d,
                width: i,
                height: a
            };
            this.defaultSelection = u, this.selection = u
        },
        bindRotate: function () {
            var t = this, e = function (e) {
                t.beforeRotate(e), t.rotate(t.ui.$large[0], e + "deg"), t.rotate(t.ui.$small[0], e + "deg"), t.rotate(t.ui.$smaller[0], e + "deg"), t.afterRotate(e)
            }, i = function (e) {
                t.upperBeforeRotate(e), t.ui.$large.rotate(e), t.ui.$small.rotate(e), t.ui.$smaller.rotate(e), t.upperAfterRotate(e)
            }, a = function (a) {
                $B.is.ie && $B.getVersion() <= 8 ? e(a) : i(a), t.model.set("rotateAngle", a), t.imgSelectObj.remove(function () {
                    t.initImgAreaSelect(), t.preview(null, t.defaultSelection)
                })
            };
            this.ui.$rotateLeft.click(function () {
                top.BH("rotate_left");
                var e = t.model.get("rotateAngle") - 90;
                a(e)
            }), this.ui.$rotateRight.click(function () {
                top.BH("rotate_right");
                var e = t.model.get("rotateAngle") + 90;
                a(e)
            })
        },
        upperBeforeRotate: function (t) {
            var e = t % 180 == 0, i = this.imgConst.large.w, a = this.imgConst.large.h, n = this.doingImg.imgWidth, s = this.doingImg.imgHeight;
            n >= s && i <= this.originImg.w && (s = a * s / n, n = a), e && (n = this.doingImg.firstImgWidth, s = this.doingImg.firstImgHeight), this.doingImg.imgWidth = n, this.doingImg.imgHeight = s;
            var o = (i - n) / 2, r = (a - s) / 2;
            this.ui.$large.height(s).width(n).css({top: r, left: o}), this.ui.$divAvatar.height(s).width(n).css({
                top: r,
                left: o
            }), this.ui.$small.height(s).width(n), this.ui.$smaller.height(s).width(n), this.preview(null, this.defaultSelection)
        },
        upperAfterRotate: function (t) {
            var e = this.imgConst.large.w, i = this.imgConst.large.h, a = this.doingImg.imgWidth, n = this.doingImg.imgHeight;
            if (t % 180 != 0) {
                var s = (e - n) / 2, o = (i - a) / 2;
                this.ui.$divAvatar.height(a).width(n).css({
                    top: o,
                    left: s
                }), this.setDefaultSelection(n, a), this.preview(null, this.defaultSelection)
            } else {
                var o = (i - n) / 2, s = (e - a) / 2;
                this.ui.$divAvatar.height(n).width(a).css({
                    top: o,
                    left: s
                }), this.setDefaultSelection(a, n), this.preview(null, this.defaultSelection)
            }
        },
        beforeRotate: function (t) {
            var e = t % 180 == 0, i = this.imgConst.large.w, a = this.imgConst.large.h, n = this.doingImg.imgWidth, s = this.doingImg.imgHeight;
            n >= s && i <= this.originImg.w && (s = a * s / n, n = a), e && (n = this.doingImg.firstImgWidth, s = this.doingImg.firstImgHeight), this.doingImg.imgWidth = n, this.doingImg.imgHeight = s, this.ui.$large.height(s).width(n), this.ui.$divAvatar.height(s).width(n), e ? this.setDefaultSelection(n, s) : this.setDefaultSelection(s, n)
        },
        afterRotate: function (t) {
            var e = this.ui.$divAvatar.width(), i = this.ui.$divAvatar.height();
            t % 180 != 0 ? (this.ui.$divAvatar.width(i).height(e), this.setImagesPosition(i, e)) : this.setImagesPosition(e, i)
        },
        rotate: function (t, e) {
            var i = function (t) {
                return -1 != t.indexOf("deg") ? parseInt(t, 10) * (2 * Math.PI / 360) : -1 != t.indexOf("grad") ? parseInt(t, 10) * (Math.PI / 200) : parseFloat(t)
            }, n = document.createElement("div"), s = n.style, o = a.support;
            o.transform = "" === s.MozTransform ? "MozTransform" : "" === s.MsTransform ? "MsTransform" : "" === s.WebkitTransform ? "WebkitTransform" : "" === s.OTransform ? "OTransform" : !1, o.matrixFilter = !o.transform && "" === s.filter, n = null;
            var r, l, h = o, c = h.transform;
            if ("string" == typeof e && (e = i(e)), a.data(t, "transform", {rotate: e}), c)t.style[c] = "rotate(" + e + "rad)"; else if (h.matrixFilter) {
                r = Math.cos(e), l = Math.sin(e);
                var d = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=" + r + ",", "M12=" + -l + ",", "M21=" + l + ",", "M22=" + r + ",", "SizingMethod='auto expand'", ")"].join("");
                t.style.filter = d
            }
        },
        adjust: function (t, e) {
            var i = t.width() / (e.width || 1), a = t.height() / (e.width || 1), n = Math.round(i * this.doingImg.imgWidth), s = Math.round(a * this.doingImg.imgHeight), o = Math.round(i * e.x1), r = Math.round(a * e.y1), l = (n - s) / 2;
            $B.is.ie && $B.getVersion() <= 8 ? this.model.get("rotateAngle") % 180 != 0 && n > s && (o += i * this.ui.$divAvatar.position().top / 2, r += a * this.ui.$divAvatar.position().top / 2) : this.model.get("rotateAngle") % 180 != 0 && (o += l, r -= l), o = 0 - o, r = 0 - r, t.children("img").css({
                width: n + "px",
                height: s + "px",
                marginLeft: o + "px",
                marginTop: r + "px"
            }), this.selection = e
        },
        preview: function (t, e) {
            this.adjust(this.ui.$divSmall, e), this.adjust(this.ui.$divSmaller, e)
        },
        initImgAreaSelect: function () {
            var t = this.defaultSelection, e = this;
            this.imgSelectObj = this.ui.$divAvatar.imgAreaSelect({
                aspectRatio: "1:1",
                x1: t.x1,
                y1: t.y1,
                x2: t.x2,
                y2: t.y2,
                handles: "corners",
                disable: !1,
                instance: !0,
                minHeight: e.imgConst.smallest.h,
                minWidth: e.imgConst.smallest.w,
                parent: "#" + e.ui.$imgZone.attr("id"),
                onSelectEnd: function (t, i) {
                    e.selection = i
                },
                onSelectChange: function (t, i) {
                    e.preview.call(e, t, i)
                }
            })
        },
        setImagesPosition: function (t, e) {
            var i = this.imgConst.large.w, a = this.imgConst.large.h, n = (i - t) / 2, s = (a - e) / 2;
            this.ui.$large.css({top: s, left: n}), this.ui.$divAvatar.css({top: s, left: n})
        },
        isNotMiniImages: function (t, e) {
            if (t < this.imgConst.smallest.w || e < this.imgConst.smallest.h) {
                var i = '<i class="i_warn_min"></i>图片长宽比过大，请重新上传';
                return this.ui.$imgZone.addClass("editAvatar_limit").html(i), this.imgSelectObj && this.imgSelectObj.remove(), !1
            }
            return !0
        },
        initLargeImg: function (t) {
            var e = t.src, i = t.width, a = t.height, n = this.imgConst.large.w, s = this.imgConst.large.h, o = this.imgConst.small.w, r = this.imgConst.small.h;
            if (this.originImg.src = e, this.originImg.w = i, this.originImg.h = a, a >= s && a >= i ? (i = i * s / a, a = s) : i >= n ? (a = a * n / i, i = n, a >= s && (i = i * s / a, a = s)) : r >= a ? (i = i * r / a, a = r) : r >= i && (a = a * o / i, i = o, r > a && (i = i * r / a, a = r)), this.doingImg.imgWidth = i, this.doingImg.imgHeight = a, this.doingImg.firstImgWidth = i, this.doingImg.firstImgHeight = a, !this.isNotMiniImages(i, a))return !1;
            this.ui.$large.attr("src", e).width(i).height(a).show(), this.ui.$small.attr("src", e).attr("style", "").width(i).height(a), this.ui.$smaller.attr("src", e).attr("style", "").width(i).height(a), this.ui.$divAvatar.height(a).width(i), this.model.set("rotateAngle", 0), this.setImagesPosition(i, a), this.setDefaultSelection(i, a), this.preview(null, this.defaultSelection);
            var l = this;
            l.imgSelectObj ? l.imgSelectObj.remove(function () {
                l.initImgAreaSelect.call(l)
            }) : l.initImgAreaSelect.call(l)
        },
        uploadSuccessDone: function (t) {
            this.ui.$imgZone.html("");
            var e = this, i = this.model.getImageUrl(), a = {
                cid: this.cid,
                URL: i
            }, n = $T.format(this.faceImgEditZone.join(""), a);
            this.ui.$imgZone.removeClass("editAvatar_no editAvatar_help editAvatar_limit").html(n), this.ui.$large = this.getElement("controlImg"), this.ui.$rotateLeft = this.getElement("rotateLeft"), this.ui.$rotateRight = this.getElement("rotateRight"), this.ui.$divAvatar = this.getElement("divAvatar"), this.bindRotate();
            var s = new Image;
            s.src = i, s.complete ? (e.ui.$imgZone.removeClass("editAvatar_upload").css("background", "#eee"), e.initLargeImg.call(e, s)) : s.onload = function () {
                e.ui.$imgZone.removeClass("editAvatar_upload").css("background", "#eee"), e.initLargeImg.call(e, s)
            }
        },
        contentChangeZoneClassSet: function (t) {
            var i = this.getElement("contentChangeZone");
            i.attr("class", function (i, a) {
                var n = a.split(" ");
                return n = e.isArray(n) ? n : [n], n.length > 1 ? (n.splice(1, n.length - 1, t), n.join(" ")) : (n.push(t), n.join(" "))
            })
        },
        uploadImgMobile: function () {
            top.BH("upload_image_mobile");
            var t = this, e = this.model, i = e.EVENTS, a = ['<span id="sms-start">请查收短信，点击链接登录139邮箱，选择要上传的图片</span>', "<br>", "<span>支持android、ios手机操作系统</span>"].join("");
            t.contentChangeZoneClassSet("editAvatar_help"), t.ui.$imgZone.html(a), this.model.sendSysSms(function (a) {
                "S_OK" === a.code ? top.$App && top.$App.on("imageUploadStatus", function (a) {
                    a.code && "START_UPLOAD" == a.code && e.trigger(i.IMG_UPLOAD_START, {message: "图片正在上传中，请稍等…"}), a.code && "S_ERROR" == a.code && e.trigger(i.IMG_UPLOAD_FAILURE, {message: "图片上传失败,请重试"}), a.code && "S_OK" == a.code && (t.ui.$imgZone.removeClass("editAvatar_help").addClass("editAvatar_upload"), e.set({imagePath: a.msg}), e.set({imageWidth: parseInt(a.width)}), e.set({imageHeight: parseInt(a.height)}), e.trigger(e.EVENTS.IMG_UPLOAD_SUCCESS, {message: ""}))
                }) : "WAPSEND_LIMIT" === a.code ? e.trigger(i.OPERATE_FREQUENT, {message: "操作过于频繁，请稍后再试"}) : e.trigger(i.IMG_UPLOAD_FAILURE, {message: "网络异常，请稍后再试"})
            })
        },
        myPictureProcess: function () {
            var t = this, e = t.model;
            top.myPicture = function (t) {
                t.code && "S_OK" == t.code ? (e.set({imagePath: t.msg}), e.set({imageWidth: parseInt(t.width)}), e.set({imageHeight: parseInt(t.height)}), e.trigger(e.EVENTS.IMG_UPLOAD_SUCCESS, {message: ""})) : e.trigger(e.EVENTS.IMG_UPLOAD_FAILURE, {message: t.msg})
            }
        },
        saveCroppedImg: function (t) {
            var e = this;
            top.BH("save_cropped_image");
            var i = {
                success: function (t) {
                    e.onImgSaving(t), top.$App && top.$User.setHeadImageUrl(t.imageUrl), top.M139.UI.TipMessage.show("头像设置成功", {delay: 2e3})
                }, fail: function () {
                    top.M139.UI.TipMessage.show("头像保存失败，请重试", {delay: 2e3, className: "msgRed"})
                }
            };
            if (this.model.get("isUseLastImageUrl"))return void this.saveSysImg();
            if (t)return this.model.set({isPopupFromPage: !1}), this.cancelCroppedImg(), !1;
            var a = this.selection, n = this.doingImg.imgWidth / this.originImg.w, s = parseInt(this.model.get("rotateAngle")) % 360, o = Math.floor(a.width / n), r = Math.floor(a.height / n), l = 0;
            s = s >= 0 ? s : s + 360, o = o > this.originImg.h ? this.originImg.h : o, r = r > this.originImg.w ? this.originImg.w : r, l = o > r ? r : o;
            var h = {
                serialId: 0,
                rotateAngle: s % 360,
                pointX: Math.floor(a.x1 / n) || 0,
                pointY: Math.floor(a.y1 / n) || 0,
                height: l || 50,
                width: l || 50,
                cutType: 3,
                imageName: this.model.get("imageName"),
                imageUrl: this.model.getImageUrl(!0)
            };
            return this.model.saveCroppedImg(h, i), !1
        },
        saveSysImg: function () {
            var t = this, e = t.model.getImageUrl(!0);
            return this.model.get("isPopupFromPage") ? (this.model.set({isPopupFromPage: !1}), this.cancelCroppedImg(), !1) : void t.model.saveCroppedImg({
                serialId: 0,
                imageUrl: e
            }, {
                success: function (e) {
                    t.onImgSaving(e), top.M139.UI.TipMessage.show("头像设置成功", {delay: 2e3}), top.$App && top.$App.trigger("changeHeadImage", {url: e.imageUrl}), top.$App && top.$User.setHeadImageUrl(e.imageUrl)
                }, fail: function () {
                    top.M139.UI.TipMessage.show("头像保存失败，请重试", {delay: 2e3, className: "msgRed"})
                }
            }, "", "", {isHtml: !0})
        },
        cancelCroppedImg: function () {
            top.BH("cancel_cropped_image"), this.dialog.close()
        },
        cancelDiskChoose: function () {
            this.diskDialog.close(), this.pageIndex = 1
        },
        faceEditPopupTpl: ['<div class="boxIframePic clearfix">', '<div class="boxIframePic_img">', "<!-- 系统头像、自定义头像切换 -->", '<div class="boxIframePic_ul" id="{cid}_boxIframePicUl">', '<a href="javascript:;" toggleType="1">系统头像<i class="i-newsmall"></i></a>', '<a href="javascript:;" toggleType="2">自定义头像</a>', "<!-- 鼠标上移线条滑动 -->", '<div class="line" id="{cid}_line"></div>', "</div>", "<!-- 系统头像 开始 -->", '<div class="boxIframePic_change" avatarType="1">', '<ul class="picList">', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/vase.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/sky.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/sunflower.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/lotus.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/bottle.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems mr_0"><img src="/m2015/images/temp/avatar/bulb.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/rainbowCandy.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/candy.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/cat.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/dog.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/friend.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems mr_0"><img src="/m2015/images/temp/avatar/bear.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/christmas.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/female.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/ancientFemale.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/male.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/hema.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems mr_0"><img src="/m2015/images/temp/avatar/default.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalMouse.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalBull.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalTiger.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalRabit.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalDragon.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems mr_0"><img src="/m2015/images/temp/avatar/animalSnail.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalHorse.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalSheep.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalMonkey.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalChicken.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems"><img src="/m2015/images/temp/avatar/animalDog.png" alt=""></a></li>', '<li><a href="javascript:;" class="picItems mr_0"><img src="/m2015/images/temp/avatar/animalPig.png" alt=""></a></li>', "</ul>", "</div>", "<!-- 系统头像 结束 -->", "<!-- 自定义头像 开始 -->", '<div class="boxIframePic_change" style="display:none;" avatarType="2">', '<div class="boxIframePic_btn">', '<div class="clearfix">', '<a style="cursor: pointer; overflow: hidden;" href="javascript:void(0)" id="{cid}_uploadLocalDisk" class="btnGrayNew cropAvatarUpload">', '<span><i class="i-localUpload"></i>本地上传</span>', "</a>", '<a style="cursor: pointer;" href="javascript:void(0)" id="{cid}_uploadMobile" class="btnGrayNew ml_10 cropAvatarUploadSms">', '<span><i class="i-mobileUpload"></i>上传手机图片</span>', "</a>", '<a style="cursor: pointer;" href="javascript:void(0)" id="{cid}_uploadDisk" class="btnGrayNew ml_10 cropAvatarUploadSms">', '<span><i class="i-cloudUpload"></i>选择网盘图片</span>', "</a>", "</div>", "<p>请上传小于10M的JPG、JPEG、BMP或PNG文件</p>", "</div>", '<div class="editAvatar avataContentChangeZone" id="{cid}_contentChangeZone">', "</div>", "</div>", "<!-- 自定义头像 结束 -->", "</div>", '<div class="boxIframePic_imgSmall">', "<p>", '<a href="javascript:;" id="{cid}_setDefault" class="">', "<span><i></i>还原默认头像</span>", "</a>", "</p>", '<p class="boxIframePic_imgSmall_title">头像预览</p>', '<div class="boxIframePic_picB" id="{cid}_largeFacePreviewWrapper" style="position: relative;">', '<img id="{cid}_largeFacePreview" src="{URL}"  class="cropAvatarSmall" style="width:100px;height:100px;left:0;top:0;position:absolute;"/>', "</div>", "<span>100*100</span>", '<div class="boxIframePic_picS" id="{cid}_smallFacePreviewWrapper" style="position: relative;">', '<img id="{cid}_smallFacePreview" src="{URL}" class="cropAvatarSmaller" style="width:52px;height:52px;left:0;top:0;position:absolute"/>', "</div>", "<span>52*52</span>", '<p class="boxIframePic_imgSmall_title sign_marg">上次使用过的头像</p>', '<div class="boxIframePic_picB signPhoto" id="{cid}_lastTimeFacePreviewWrapper" style="position: relative;"><img src="{lastImageUrl}" style="cursor: pointer;"></div>', "<span>32*32</span>", "</div>", "</div>"],
        diskDialogTpl: ['<div class="boxIframePic boxIframePicList clearfix">', "<strong>网盘图片</strong>", '<div class="boxIframePicList_ul" id="imgScrollArea">', '<ul class="clearfix">', "<% _.each(obj, function(i){ %>", '<li title="<%-i.name%>">', '<a href="javascript:void(0)" role="anchor">', '<img src="<%-i.bigthumbnailURL%>" filename="<%-i.name%>" style="width: 65px; height:65px;" role="anchor" />', '<p role="anchor"><%=i.shortName%></p>', '<i class="i-imgUpload"></i>', "</a>", "</li>", "<% }) %>", "</ul>", "</div>", "</div>"].join(""),
        singleImageTpl: ["<% _.each(obj, function(i){ %>", '<li title="<%-i.name%>">', '<a href="javascript:void(0)" role="anchor">', '<img src="<%-i.bigthumbnailURL%>" filename="<%-i.name%>" role="anchor" style="width: 65px; height:65px;" />', '<p role="anchor"><%=i.shortName%></p>', '<i class="i-imgUpload"></i>', "</a>", "</li>", "<% }) %>"].join(""),
        faceImgEditZone: ['<div class="editAvatar_box" id="{cid}_faceImgEditPos" style="position:relative;">', '<img id="{cid}_controlImg" src="{URL}" class="cropAvatarLarge" style="position:absolute; display:none;" />', '<div id="{cid}_divAvatar" style="position:absolute; top:0;left:0px;"></div>', "</div>", '<a href="javascript:void(0)" id="{cid}_rotateLeft" class="btnRotateLeft btnGrayNew editAvatar_left"><span><i class="i-whirlLeft"></i>左旋转</span></a>', '<a href="javascript:void(0)" id="{cid}_rotateRight" class="btnRotateRight btnGrayNew editAvatar_right"><span><i class="i-whirlRight"></i>右旋转</span></a>']
    }))
}(jQuery, _, M139), function () {
    M139.core.namespace("M139.UI", {
        Repeater: function (t, e) {
            function i() {
                for (elem in e)elem && (this[elem] = e[elem])
            }

            this.HtmlTemplate = null, this.HeaderTemplate = null, this.FooterTemplate = null, this.ItemTemplate, this.EmptyTemplate = "暂无数据", this.SeparateTemplate, this.Functions = null, this.DataSource = null, this.ItemContainer, this.ItemDataBound = null, this.RenderMode = 0, this.RenderCallback = null, this.Element = null, this.Instance = null, this.DataRow = null;
            void 0 != typeof t && ("string" == typeof t ? this.HtmlTemplate = t : this.Element = t), i(), this.DataBind = function (t) {
                var e = this;
                this.DataSource = t, this.DataSource && !$.isArray(this.DataSource) && (this.DataSource = [this.DataSource]), null == this.HtmlTemplate && (this.HtmlTemplate = this.Element.innerHTML);
                var i = /(<!--item\s+start-->)([\r\n\w\W]+)(<!--item\s+end-->)/;
                if (!t || 0 == t.length)return this.Render([]), this.HtmlTemplate.replace(i, "");
                var a = this.HtmlTemplate.match(i);
                if (this.ItemTemplateOrign = a[0], this.ItemTemplate = a[2], this.HtmlTemplate.indexOf("section") >= 0) {
                    var n = this.HtmlTemplate.match(/(<!--section start-->)([\w\W]+?)(<!--item start-->)([\w\W]+?)(<!--item end-->)([\w\W]+?)(<!--section end-->)/);
                    this.sectionStart = n[2], this.sectionEnd = n[6]
                }
                reg1 = /\$[\w\.]+\s?/g, reg2 = /\@(\w+)\s?(\((.*?)\))?/g;
                var s = new Array;
                this.prevSectionName = "";
                for (var o = 0; o < this.DataSource.length; o++) {
                    var r = this.DataSource[o];
                    r.index = o, this.DataRow = r;
                    var l = this.ItemTemplate;
                    l = l.replace(reg2, function (t, i, a, n) {
                        var s = i.trim(), o = [];
                        n && (o = n.split(","));
                        for (var l = new Array, h = 0; h < o.length; h++)null != r[o[h]] ? l.push(r[o[h]]) : l.push(o[h]);
                        if (e.Functions[s]) {
                            var c = e;
                            e.Instance && (e.Instance.DataRow = r, c = e.Instance);
                            var d = e.Functions[s].apply(c, l);
                            return d && "string" == typeof d && d.indexOf("$") >= 0 && (d = d.replace(/\$/gi, "@￥")), d
                        }
                    }), l = l.replace(reg1, function (t) {
                        if (m = t.substr(1).trim(), void 0 != r[m])return r[m];
                        if (m.indexOf(".") >= 0) {
                            for (var e = m.split("."), i = r, a = 0; a < e.length; a++) {
                                if (void 0 == i[e[a]])return "";
                                i = i[e[a]]
                            }
                            return i
                        }
                        return ""
                    });
                    var h = "";
                    e.Functions && e.Functions.getSectionName && (h = e.Functions.getSectionName.call(e, e.DataRow)), this.sectionStart && h != this.prevSectionName && (0 == o ? (this.prevSectionName = h, this.firstSectionName = h) : (s.push(this.sectionEnd), s.push(this.sectionStart.replace("@getSectionName", h)), this.prevSectionName = h)), this.HtmlTemplate.indexOf("<!--display") >= 0 && (l = l.replace(/(<!--display\s+start-->)(\W+<\w+[^>]+display:none[\w\W]+?)(<!--display end-->)/gi, ""));
                    var c = {index: o, sectionName: h, data: r, html: l};
                    if (this.ItemDataBound) {
                        var d = this.ItemDataBound(c);
                        d && (l = d)
                    }
                    s.push(l)
                }
                return this.Render(s)
            }, this.Render = function (t) {
                var e = t.join("");
                "0" === "0".replace("0", "$&") && (e = e.replace(/\$/gi, "$$$$"));
                var i = "";
                return this.HtmlTemplate && (i = this.firstSectionName ? this.HtmlTemplate.replace("@getSectionName", this.firstSectionName) : this.HtmlTemplate, i = i.replace(this.ItemTemplateOrign, e)), this.HeaderTemplate && (i = this.HeaderTemplate + i), this.FooterTemplate && (i += this.FooterTemplate), "" == i && (i = this.EmptyTemplate), this.Element && (this.Element.innerHTML = i, this.Element.style.display = ""), i && i.indexOf("@￥") >= 0 && (i = i.replace(/@￥/gi, "$")), i
            }
        }
    }), window.Repeater = M139.UI.Repeater
}(), function (t, e, i) {
    var a, n, s = t, o = i.View.ViewBase;
    i.namespace("M2012.UI.DialogBase", o.extend({
        initialize: function (e) {
            this.options = e || {};
            var i = t(e.template);
            return a = n, n = this, this.setElement(i), this.jContainer = i, o.prototype.initialize.apply(this, arguments)
        }, defaults: {name: "M2012.UI.DialogBase"}, render: function () {
            var t = this.options;
            return t.iDiskHeight && (this.setBoxTop = t.iDiskHeight), t.dialogTitle && t.dialogTitlePath && (this.$(t.dialogTitlePath).text(t.dialogTitle), t.hideTitleBar && this.$(t.titleBarPath).hide()), t.bottomTip && this.$(t.bottomTipPath).html(t.bottomTip), t.showMiniSize && !t.isShowMinBtn && this.$(t.minisizeButPath).show(), t.showZoomSize && (this.$(t.zoomsizeButPath).show(), this.zoomInSize = t.zoomInSize, t.showZoomIn && (this.showZoomIn = t.showZoomIn, this.$(t.zoomsizeButPath).removeClass("i_t_zoomin").addClass("i_t_zoomout").attr("title", "缩小"), t.width && (t.width += t.zoomInSize.width), t.height && (t.height += t.zoomInSize.height))), this.$el.css("z-index", i.Dom.getNextZIndex()), this.on("render", function () {
                if (t.content && t.contentPath) {
                    var e = this.$(t.contentPath);
                    e.html(t.content), t.height && (e.height(t.height), this.cntHeight = t.height), t.width && this.$el.width(t.width), this.$cntEl = e
                }
                t.title && t.titlePath && this.$(t.titlePath).text(t.title), t.icon && t.iconPath && this.$(t.iconPath).addClass(t.icon), this.bindEvents()
            }), i.Dom.fixIEFocus(!0), o.prototype.render.apply(this, arguments)
        }, bindEvents: function () {
            var t = this.options, e = this;
            if (t.titleBarPath) {
                this.$(t.titleBarPath)[0]
            }
            t.closeButPath && this.$(t.closeButPath).click(function (t, i) {
                var i = i;
                e.trigger("beforeClose", t, i)
            }), t.contentButtonPath && this.$(t.contentButtonPath).click(function (i) {
                var a = {event: i, cancel: t.isNoCancel || !1};
                e.trigger("contentbuttonclick", a), a.cancel || e.close(i), i.preventDefault(), i.stopPropagation()
            }), this.$(t.minisizeButPath).click(function (t) {
                return e.onMiniSizeClick(t), !1
            }), this.$(t.zoomsizeButPath).click(function (t) {
                return e.onZoomSizeClick(t), !1
            });
            var a, n = this.$el.css("z-index") - 1;
            this.on("print", function () {
                a = M2012.UI.DialogBase.showMask({zIndex: n}), this.mask = a, this.setMiddle(), this.$el.css("visibility", ""), e.trigger("afterPrint", e)
            }).on("remove", function () {
                a.hide(), i.Dom.fixIEFocus()
            }).on("minisize", function () {
                a.hide()
            }).on("cancelminisize", function () {
                a = M2012.UI.DialogBase.showMask({zIndex: n}), e.trigger("afterCancelminisize")
            }).on("beforeClose", function (i, a) {
                var n = !1, a = a;
                a || "function" == typeof t.onBeforeClose && (n = t.onBeforeClose(i)), n || e.close(i)
            }).on("close", function (e) {
                "function" == typeof t.onClose && t.onClose(e)
            }), t.stopDragAble ? e.$(t.titleBarPath).css("cursor", "default") : $D.setDragAble(this.el, {
                handleElement: t.titleBarPath,
                onDragEnd: function (t) {
                    e.trigger("dragAbled", e.$el.offset())
                }
            })
        }, setDialogTitle: function (t) {
            this.$(this.options.dialogTitlePath).text(t)
        }, setMiddle: function () {
            var t = s(document.body).width(), e = s(document.body).height(), i = 0;
            this.setBoxTop && (i = -this.setBoxTop), this.$el.css({
                left: (t - this.getWidth()) / 2 + "px",
                top: (e - this.getHeight() + i) / 2 + "px"
            })
        }, setRightBottom: function () {
            var t = s(document.body).width(), e = s(document.body).height();
            this.$el.css({left: t - this.getWidth() - 2 + "px", top: e - this.getHeight() - 3 + "px"})
        }, getHeight: function () {
            var t = this.$(".boxIframeMain").height();
            return Math.max(t, this.$el.height())
        }, resetHeight: function (t) {
            var e = t || this.$el.height();
            this.$(this.options.contentPath).height(e), this.$(this.options.contentPath).find("iframe").height(e)
        }, resetHeightWithoutIframe: function (t) {
            var e = this.$el.height();
            t ? this.$el.height(e + 27 + 51) : this.$el.height(e), this.$(this.options.contentPath).height(e)
        }, onMiniSizeClick: function (t) {
            var e = {};
            this.oldSize = {
                height: this.$el.height(),
                width: this.$el.width()
            }, this.trigger("beforeminisize", {}), e.cancel || this.options.animate ? this.trigger("minisize") : this.minisize()
        }, minisize: function () {
            this.trigger("minisize"), this.oldSize = {
                height: this.$el.height(),
                width: this.$el.width()
            }, this.$el.height(1), this.$el.width(1), this.$el.css({left: 0, top: 0, overflow: "hidden"})
        }, cancelMiniSize: function () {
            this.oldSize && this.oldSize.height && (this.$el.height(this.oldSize.height), this.$el.width(this.oldSize.width)), this.$el.css("overflow", ""), this.setMiddle(), this.options.animate && (this.$el.show(), this.$el.css("visibility", "visible")), this.trigger("cancelminisize")
        }, onZoomSizeClick: function (t) {
            var e = s(t.target), i = "zoomIn", a = 0, n = 0;
            e.hasClass("i_t_zoomin") ? (i = "zoomIn", e.removeClass("i_t_zoomin").addClass("i_t_zoomout").attr("title", "缩小"), a += this.zoomInSize.width, n += this.zoomInSize.height) : (i = "zoomOut", e.removeClass("i_t_zoomout").addClass("i_t_zoomin").attr("title", "放大"), a -= this.zoomInSize.width, n -= this.zoomInSize.height);
            var o = this.$el.width(), r = this.$el.height();
            if (this.$cntEl && this.cntHeight) {
                var l = this.$cntEl.height();
                this.$cntEl.height(l + n)
            }
            this.$el.width(o + a).height(r + n), this.options.onZoom && this.options.onZoom(i), this.setMiddle()
        }, close: function (t) {
            var e = {event: t};
            "function" == typeof this.onClose && this.onClose.call(this, e), t && t.silent === !0 || this.trigger("close", e), e.cancel || (this.remove(), this.isClosed = !0, a && !a.isClosed && (n = a, a = null))
        }, getButton: function (t) {
            return this.$(this.options.contentButtonPath).eq(t)
        }, setButtonDisable: function (t, e) {
            var i = this.$(this.options.contentButtonPath).eq(t);
            e ? i.addClass(this.options.buttonDisableClass) : i.removeClass(this.options.buttonDisableClass)
        }, setButtonText: function (t, e) {
            this.$(this.options.contentButtonPath).eq(t).find("span").text(e)
        }, setButtonClass: function (t, e) {
            this.$(this.options.contentButtonPath).eq(t).removeClass().addClass(e)
        }, setButtonStyle: function (t, e) {
            this.$(this.options.contentButtonPath).eq(t).attr("style", e)
        }, setBottomTip: function (t) {
            this.$(this.options.bottomTipPath).html(t)
        }, resize: function () {
            try {
                var t = this.$("iframe")[0];
                t && (t.parentNode.style.height = t.contentWindow.document.body.scrollHeight + "px")
            } catch (e) {
            }
        }
    }));
    var r = {
        template: ['<div class="boxIframe" style="position:absolute;visibility: hidden;">', '<div class="boxIframeTitle DL_TitleBar"><h2><span class="DL_DialogTitle"></span></h2>', '<a class="i_t_close DL_CloseBut CloseButton" title="关闭" href="javascript:;"></a>', '<a class="i_t_min DL_MiniSizeBut" title="最小化" style="display:none" href="javascript:;"></a>', '<a class="i_t_zoomin DL_ZoomSizeBut" title="放大" style="display:none" href="javascript:;"></a>', "</div> ", '<div class="boxIframeMain">', '<div class="boxIframeText MB_Content wTipCont">', "</div>", '<div class="boxIframeBtn DL_ButtonBar">', '<span class="bibBtn">', '<a class="icoG btnSure MB_But_0 YesButton" rel="0" href="javascript:void(0);" style="display:none"><span>确定</span></a> <a class="icoTb btnNormal MB_But_1 CancelButton" rel="1" href="javascript:void(0);" style="display:none"><span>否</span></a> <a class="icoTb btnNormal MB_But_2 CancelButton" rel="2" href="javascript:void(0);" style="display:none"><span>取消</span></a>', "</span>", '<span class="bibText BottomTip"></span>', "</div>", "</div>", "</div>"].join(""),
        dialogTitle: "系统提示",
        titleBarPath: ".DL_TitleBar",
        dialogTitlePath: ".DL_DialogTitle",
        buttonBarPath: ".DL_ButtonBar",
        closeButPath: ".DL_CloseBut",
        minisizeButPath: ".DL_MiniSizeBut",
        zoomsizeButPath: ".DL_ZoomSizeBut",
        contentButtonPath: ".DL_ButtonBar a",
        bottomTipPath: ".BottomTip",
        buttonDisableClass: "btnGrayn",
        contentPath: ".MB_Content"
    }, l = {
        template: ['<div class="boxIframe fileSendBoxIframe" style="width:520px;position:absolute;visibility: hidden;">', '    <div class="boxIframeTitle DL_TitleBar">', '        <h2><span class="DL_DialogTitle">文件发送</span></h2>', '        <span class="fileSendTitleBtn"><a href="javascript:;" class="mr_5 DL_MiniSizeBut" style="inline-block"><span class="minWinBtn">－</span></a><a class="DL_CloseBut" href="javascript:;"><span class="clloseWinBtn">×</span></a></span>', "    </div>", '    <div class="boxIframeMain">', '        <div class="boxIframeText MB_Content">', "        </div>", '        <div class="upFileBtnWrap"><a href="javascript:;" id="DL_UploadBtn" class="virtualFileBtn"><span>+</span>添加文件</a></div>', '        <div class="boxIframeBtn DL_ButtonBar"><span class="bibBtn"><a class="icoG btnSure" rel="0" href="javascript:void(0);"><span>发 送</span></a> <a class="icoTb btnNormal" rel="1" href="javascript:void(0);"><span>取 消</span></a></span></div>', "    </div>", "</div>"].join(""),
        titleBarPath: ".DL_TitleBar",
        dialogTitlePath: ".DL_DialogTitle",
        buttonBarPath: ".DL_ButtonBar",
        closeButPath: ".DL_CloseBut",
        minisizeButPath: ".DL_MiniSizeBut",
        contentButtonPath: ".DL_ButtonBar a",
        contentPath: ".MB_Content"
    }, h = {
        replaceInnerHTML: {".MB_Content": ['<div class="norTips"> <span class="norTipsIco"><i class="MB_Icon" style="display:none"></i></span>', '<dl class="norTipsContent">', '<dt class="norTipsTitle MB_MessageBox_Title"></dt>', '<dd class="norTipsLine MB_MessageBox_Content"></dd>', "</dl>", "</div>"].join("")},
        iconPath: ".MB_Icon",
        titlePath: ".MB_MessageBox_Title",
        contentPath: ".MB_MessageBox_Content"
    }, c = {ok: "i_ok", fail: "i_fail", warn: "i_warn"};
    s.extend(M2012.UI.DialogBase, {
        alert: function (t, i) {
            i = i || {};
            var a = {buttons: ["确 定"], icon: i.icon || "warn"};
            return e.defaults(a, i), this.confirm(t, a)
        }, confirm: function (t, a, n, o, l) {
            for (var d = [], u = [], p = ["确 定", "取 消"], m = [], g = {}, f = 1; f < arguments.length; f++)(e.isFunction(arguments[f]) || null === arguments[f]) && m.push(arguments[f]);
            for (var f = arguments.length - 1; f > 0; f--)if (e.isObject(arguments[f]) && !e.isFunction(arguments[f])) {
                l = arguments[f];
                break
            }
            l || (l = {}), p = l.buttons || p;
            for (var f = 0; f < p.length; f++)d.push(".MB_But_" + f), g[".MB_But_" + f + " span"] = p[f];
            p && 0 != p.length || u.push(r.buttonBarPath), l.icon && d.push(h.iconPath);
            var v = {
                name: l.name,
                title: l.title,
                height: l.height,
                width: l.width,
                dialogTitle: l.dialogTitle,
                hideTitleBar: l.hideTitleBar,
                titleBarPath: l.titleBarPath,
                shows: d.join(","),
                hides: u.join(","),
                animate: l.animate,
                showMiniSize: l.showMiniSize,
                showZoomSize: l.showZoomSize,
                showZoomIn: l.showZoomIn,
                zoomInSize: l.zoomInSize,
                replaceInnerText: g,
                content: l && l.isHtml ? t : i.Text.Html.encode(t),
                bottomTip: l.bottomTip,
                onBeforeClose: l.onBeforeClose,
                onClose: l.onClose,
                onZoom: l.onZoom,
                iDiskHeight: l.iDiskHeight,
                isNoCancel: l.isNoCancel,
                noDelayPrint: l.noDelayPrint,
                events: {
                    contentbuttonclick: function (t) {
                        if (t.event) {
                            var e = i.Dom.findParent(t.event.target, "a");
                            if (e) {
                                var a = e.getAttribute("rel");
                                m[a] && m[a](t)
                            }
                        }
                        l.onclose && l.onclose(t)
                    }
                },
                icon: l.icon ? c[l.icon] || l.icon : ""
            }, b = s.extend({}, r);
            l.usingTemplate !== !1 && (b = s.extend(b, h)), e.defaults(v, b);
            var y = new M2012.UI.DialogBase(v);
            return y.render().$el.appendTo(document.body), y
        }, prompt: function (t, i, a, n) {
            for (var s = arguments.length - 1; s > 0; s--)if (e.isObject(arguments[s]) && !e.isFunction(arguments[s])) {
                n = arguments[s];
                break
            }
            n = n || {};
            var o = ['<fieldset class="form">', '<legend class="hide"></legend>', '<ul class="formLine">', "<li>", '<label class="label">' + t + "</label>", '<div class="element">', '<input type="text" class="iText" style="width:170px;">', "</div>", "</li>", "</ul>", "</fieldset>"].join("");
            n.isPassword && (o = o.replace('type="text"', 'type="password"')), n.buttons = ["确 定", "取 消"];
            var r = this.showHTML(o, function (t) {
                var e = r.get$El().find("input:eq(0)").val();
                i && i(e, t)
            }, function () {
                e.isFunction(a) && a()
            }, n);
            return n.defaultValue && r.on("print", function () {
                r.get$El().find("input:eq(0)").val(n.defaultValue).select()
            }), r
        }, open: function (t) {
            if (t.name) {
                var a = this.getCurrent();
                if (a && a.isClosed !== !0 && a.options && a.options.name === t.name)return null
            }
            var n = {
                dialogTitle: t.dialogTitle,
                showMiniSize: t.showMiniSize,
                showZoomSize: t.showZoomSize,
                showZoomIn: t.showZoomIn,
                zoomInSize: t.zoomInSize,
                width: t.width || "400px",
                height: t.height || "250px",
                hideTitleBar: t.hideTitleBar,
                stopDragAble: t.stopDragAble || !1,
                hides: ".DL_ButtonBar",
                content: "<iframe frameBorder='0' scrolling='no' style='height:100%;width:100%;'></ifame>",
                events: {
                    close: function () {
                        t && t.onclose && t.onclose()
                    }
                }
            };
            e.defaults(n, r);
            var s = new M2012.UI.DialogBase(n), o = i.Text.Url.makeUrl(t.url, {viewid: s.id});
            return s.render().$el.appendTo(document.body).find("iframe").attr("src", o), s
        }, openCustomBox: function (t, a, n) {
            if (t.name) {
                var s = this.getCurrent();
                if (s && s.isClosed !== !0 && s.options && s.options.name === t.name)return null
            }
            for (var o = [], r = 1; r < arguments.length; r++)(e.isFunction(arguments[r]) || null === arguments[r]) && o.push(arguments[r]);
            for (var r = arguments.length - 1; r > 0; r--)if (e.isObject(arguments[r]) && !e.isFunction(arguments[r])) {
                t = arguments[r];
                break
            }
            var h = {
                dialogTitle: t.dialogTitle,
                showMiniSize: t.showMiniSize,
                showZoomSize: t.showZoomSize,
                showZoomIn: t.showZoomIn,
                zoomInSize: t.zoomInSize,
                onBeforeClose: t.onBeforeClose,
                animate: t.animate,
                width: t.width || "400px",
                height: t.height || "250px",
                hideTitleBar: t.hideTitleBar,
                content: t.content,
                isShowMinBtn: !0,
                isNoCancel: !0,
                events: {
                    close: function () {
                        t && t.onclose && t.onclose()
                    }, contentbuttonclick: function (t) {
                        if (t.event) {
                            var e = i.Dom.findParent(t.event.target, "a");
                            if (e) {
                                var a = e.getAttribute("rel");
                                o[a] && o[a](t)
                            }
                        }
                    }
                }
            };
            e.defaults(h, t.extraOptions || l);
            var c = new M2012.UI.DialogBase(h);
            return c.render().$el.appendTo(document.body), c
        }, showHTML: function (t, i, a, n, s) {
            for (var o = {
                isHtml: !0,
                usingTemplate: !1
            }, r = arguments.length - 1; r > 0; r--)if (e.isObject(arguments[r]) && !e.isFunction(arguments[r])) {
                s = arguments[r];
                break
            }
            if (s = s || {}, s.buttons = s.buttons || [], e.defaults(o, s), s.name) {
                var l = this.getCurrent();
                if (l && l.isClosed !== !0 && l.options && l.options.name === s.name)return null
            }
            return this.confirm(t, i, a, n, o)
        }, getDialog: function (t) {
            var e = null;
            if (s.isWindow(t)) {
                var a = t.frameElement, n = i.Text.Url.queryString("viewid", a.src);
                e = i.View.getView(n)
            }
            return e
        }, close: function (t) {
            var e = this.getDialog(t);
            e && e.close()
        }, getCurrent: function () {
            return n
        }
    }), t.extend(M2012.UI.DialogBase, {
        masks: [], showMask: function (t) {
            function e() {
                var e = s("<div class='layer_mask' style='overflow:hidden'></div>");
                return $B.is.ie && e.append("<iframe frameBorder='0' style='width:100%;height:100%;filter:alpha(opacity=0);'></iframe>"), e.appendTo(t.target || document.body), e
            }

            var i;
            t = t || {};
            for (var a = t.zIndex, n = t.opacity || .5, o = 0; o < this.masks.length; o++)if ("none" == this.masks[o].css("display")) {
                i = this.masks[o];
                break
            }
            return i || (i = e(), this.masks.push(i)), i.css("z-index", a), i.css("opacity", n), i.show(), i
        }
    }), window.$Msg = M2012.UI.DialogBase
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = i.View.ViewBase;
    i.namespace("M2012.UI.PopMenu", n.extend({
        initialize: function (e) {
            var i = e.customClass || "", a = e.customStyle || "";
            e.template = e.template.replace("{customClass}", i), e.template = e.template.replace("{customStyle}", a), this.options = e || {};
            var s = t(e.template);
            return this.setElement(s), n.prototype.initialize.apply(this, arguments)
        }, name: "M2012.UI.PopMenu", render: function () {
            var s = this, o = this.options, r = o.items, l = o.itemsContainerPath ? this.$el.find(o.itemsContainerPath) : this.$el, h = 0;
            o.selectMode && this.$el.addClass(o.selectModeClass);
            for (var c = 0; c < r.length; c++) {
                var d = r[c];
                if (d.isLine)l.append(o.splitLineTemplate); else {
                    var u = t(o.itemsTemplate).appendTo(l);
                    if (d.text ? (u.find(o.itemsContentPath).text(d.text), "none" == d.display && u.attr("id", "pop").css("display", "none")) : d.html && (0 == d.highlight ? u.html(d.html) : u.find(o.itemsContentPath).html(d.html)), d.id && (u.attr("id", d.id), u.attr("title", d.title)), d.name && u.attr("name", d.name), "object" == typeof d.dataDom && "[object object]" == Object.prototype.toString.call(d.dataDom).toLowerCase() && !d.dataDom.length)for (var p in dataDom)u.data(p, dataDom[p]);
                    d.css && u.addClass(d.css), o.selectMode && u.find(o.subMenuIconInsertPath).prepend(o.selectIconTemplate), d.items && d.items.length && (u.find(o.subMenuIconInsertPath).append(o.subMenuIconTemplate), u.attr("submenu", "1")), u.attr("index", c), h++
                }
            }
            return this.on("print", function () {
                if ((h > (o.scrollCount || 15) || this.getHeight() > o.maxHeight) && this.$el.css({
                        "overflow-x": "hidden",
                        "overflow-y": "scroll",
                        height: o.maxHeight || 310
                    }), this.options.parentMenu) {
                    var t = this.$el.offset(), e = t.top + i.Dom.getElementHeight(this.$el), n = e - a(document.body).height() + 10;
                    n > 0 && this.$el.css("top", -n + "px")
                }
            }), this.$el.find(o.itemsPath).mouseover(function () {
                s.onMenuItemMouseOver(this)
            }).click(function (t) {
                var e = t.target, n = i.Dom.containElement(s.el, e);
                n && s.$el.find("ul div *").each(function () {
                    this == e && (n = !1)
                }), n && s.onMenuItemClick(this), o.noStopPropagation === !0 || (t.stopPropagation(), a.browser.msie && a.browser.version <= 7 && t.preventDefault())
            }), o.isClickHide || (o.hideInsteadOfRemove ? this.on("itemclick", function () {
                this.hide()
            }) : this.on("itemclick", function () {
                this.remove()
            })), e.isFunction(o.onComplete) && o.onComplete(), n.prototype.render.apply(this, arguments)
        }, getItemByNode: function (t) {
            return this.options.items[t.getAttribute("index")]
        }, onMenuItemClick: function (e) {
            var i = e.getAttribute("index");
            if (i) {
                i = 0 | i;
                var a = this.getItemByNode(e);
                t.isFunction(a.onClick) && a.onClick(a), t.isFunction(this.options.onItemClick) && this.options.onItemClick(a, i), a.keepContainer === !0 || this.trigger("itemclick", a, i)
            }
        }, remove: function () {
            this.removeSubMenu(), n.prototype.remove.apply(this, arguments)
        }, selectItem: function (t) {
            var e = this.options;
            this.$(e.itemsPath).removeClass(e.selectedClass).eq(t).addClass(e.selectedClass)
        }, onMenuItemMouseOver: function (e) {
            var i = this;
            if (e.getAttribute("submenu")) {
                var n = this.getItemByNode(e);
                if (this.trigger("itemMouseOver", n), n.menu && this.subMenu == n.menu)return;
                var s = t.extend({}, this.options);
                s.items = n.items, s.parentMenu = this;
                var o = s.width ? parseInt(s.width) : 150, r = -5;
                s.width2 && (s.width = s.width2), n.menu = new M2012.UI.PopMenu(s), this.trigger("subItemCreate", n);
                var l = n.menu.render().get$El(), h = this.$el.offset();
                h.left > a(document.body).width() / 2 && (o = -l.width()), l.appendTo(e).css({
                    left: o + "px",
                    top: r + "px"
                }), n.menu.on("remove", function () {
                    n.menu = null
                }).on("itemclick", function () {
                    i.remove()
                }), this.removeSubMenu(), this.subMenu = n.menu
            } else this.removeSubMenu()
        }, setPosition: function () {
            var t = this.options;
            t.dockElement && i.Dom.dockElement(t.dockElement, this.$el, {direction: t.direction, dx: t.dx, dy: t.dy})
        }, show: function () {
            var t = this, e = this.options;
            this.setPosition(), $D.bindAutoHide({
                stopEvent: !0, action: "click", element: this.el, callback: function () {
                    t.hide(), e.hideCallback && e.hideCallback()
                }
            }), n.prototype.show.apply(this, arguments)
        }, hide: function () {
            $D.unBindAutoHide({element: this.el}), n.prototype.hide.apply(this, arguments)
        }, removeSubMenu: function () {
            if (this.subMenu)try {
                this.subMenu.remove(), this.subMenu = null
            } catch (t) {
            }
        }
    }));
    var s = {
        template: ['<div class="menuPop shadow {customClass}" style="top:0;left:0;z-index:9001;{customStyle}">', "<ul>", "</ul>", "</div>"].join(""),
        splitLineTemplate: '<li class="line"></li>',
        itemsContainerPath: "ul",
        itemsPath: "ul > li",
        itemsTemplate: '<li><a href="javascript:;"><span class="text"></span></a></li>',
        itemsContentPath: "a > span",
        subMenuIconTemplate: '<i class="i_triangle_h"></i>',
        selectModeClass: "menuPops",
        selectedClass: "cur",
        selectIconTemplate: '<i class="i_b_right"></i>',
        subMenuIconInsertPath: "a"
    };
    t.extend(M2012.UI.PopMenu, {
        create: function (t) {
            if (!t || !t.items)throw"M2012.UI.PopMenu.create:参数非法";
            t = e.defaults(t, s);
            var n = new M2012.UI.PopMenu(t);
            if (n.render().$el.appendTo(t.container || document.body).css("visibility", "hidden"), t.dockElement)setTimeout(function () {
                i.Dom.dockElement(t.dockElement, n.$el, {
                    direction: t.direction,
                    dx: t.dx,
                    dy: t.dy,
                    sourceType: t.sourceType
                }), n.$el.css("visibility", "")
            }, 0); else {
                var o = parseInt(t.top), r = parseInt(t.left);
                n.$el.height() + o > a(document.body).height() && (t.top = o - n.$el.height()), n.$el.width() + r > a(document.body).width() && (t.left = r - n.$el.width()), n.$el.css({
                    left: t.left || 0,
                    top: t.top || 0
                }), n.$el.css("visibility", "")
            }
            return !t.stopCreateAutoHide && $D.bindAutoHide({
                stopEvent: !0,
                action: "click",
                element: n.el,
                callback: t.hideInsteadOfRemove ? function () {
                    n.hide(), t.hideCallback && t.hideCallback()
                } : function () {
                    n.remove()
                }
            }), n
        }, createWhenClick: function (t, e) {
            if (!t || !t.target)throw"必须包含options.target，表示被点击的元素";
            a(t.target).unbind("click").click(function (i) {
                t.dockElement || (t.dockElement = a(t.target));
                var n = M2012.UI.PopMenu.create(t);
                e && e(n)
            })
        }, bindAutoHide: function (t) {
            return $D.bindAutoHide(t)
        }, unBindAutoHide: function (t) {
            return $D.unBindAutoHide(t)
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = i.View.ViewBase;
    i.namespace("M2012.UI.MenuButton", n.extend({
        initialize: function (t) {
            this.options = t || {};
            var e = document.createElement("div");
            return e.innerHTML = $T.format(t.template, {templateClass: t.templateClass}), this.setElement(e.firstChild), n.prototype.initialize.apply(this, arguments)
        }, name: "M2012.UI.MenuButton", render: function () {
            var t = this, e = this.options, s = e.text ? i.Text.Html.encode(e.text) : e.html;
            if (this.el.firstChild.innerHTML = s, e.leftSibling && $D.appendHTML(this.el.firstChild, e.leftSiblingTemplate), e.menuItems) {
                if (e.menuIconTemplate) {
                    var o = e.onClick ? e.menuIconTemplate : e.menuIconNoSpliterTemplate;
                    $D.appendHTML(this.el.firstChild, o)
                }
            } else e.noMenu(this.$el);
            if (e.rightSibling) {
                var r = this.el.firstChild;
                r = r.firstChild && "SPAN" == r.firstChild.tagName ? r.firstChild : r, $D.appendHTML(r, e.rightSiblingTemplate)
            } else!e.onClick && e.rightNoSibling && e.rightNoSibling(this.$el);
            return e.onClick ? this.$el.click(function (n) {
                var s = t.$el.find(e.menuIconButtonPath)[0], o = s == n.target || s && i.Dom.containElement(s, n.target);
                o ? e.onClickBefore && e.onClickBefore(n) : e.onClick(), a.browser.msie && a.browser.version <= 8 && n.preventDefault()
            }) : e.menuItems && this.$el.click(function (i) {
                e.onClickShow && e.onClickShow(i), t.showMenu(), e.onClickAfter && e.onClickAfter(i);
                var n = a.trim(e.text);
                "移动到" == n ? $App.isReadSessionMail() && BH("cMail_toolbar_move") : "标记为" == n ? $App.isReadSessionMail() && BH("cMail_toolbar_mark") : "更多" == n && "addr_more" != e.bh_drop && $App.getMailboxView().model.trigger("resetMoreBtnItem")
            }), e.menuItems && e.onClick && e.menuIconButtonPath && this.$el.find(e.menuIconButtonPath).click(function () {
                t.showMenu()
            }), n.prototype.render.apply(this, arguments)
        }, showMenu: function () {
            var t = this.menu, i = this.options, a = i.popMenuWidth || "";
            "addr_more" == i.bh_drop && "#toolbar_more" == i.el && (a = "160px"), void 0 === t ? this.menu = M2012.UI.PopMenu.create(e.chain(i).pick(["selectMode", "onItemClick", "customClass", "customStyle"]).extend({
                dockElement: this.$el,
                items: i.menuItems,
                hideInsteadOfRemove: !0,
                dx: i.dx,
                dy: i.dy,
                width: a
            }).value()) : t.isHide() ? t.show() : t.hide()
        }, changeItems: function (t) {
            this.menu = void 0, this.options.menuItems = t
        }
    }));
    var s = {
        template: ['<a class="{templateClass}" href="javascript:">', '<span class="r two"></span>', "</a>"].join(""),
        templateClass: "icoTb mr_6",
        menuIconTemplate: '<span><i class="i_triangle_d"></i></span>',
        menuIconNoSpliterTemplate: '<i class="i_triangle_d"></i>',
        leftSiblingTemplate: '<i class="l-line"></i>',
        rightSiblingTemplate: '<i class="r-line"></i>',
        rightNoSibling: function (t) {
            t.find("span.two").length > 0 && (t.find("span.two")[0].className = "p_relative")
        },
        noMenu: function (t) {
            t.find("span.two").length > 0 && (t.find("span.two")[0].className = "p_relative")
        },
        menuIconButtonPath: "span > span"
    };
    t.extend(M2012.UI.MenuButton, {
        create: function (t) {
            if (!t || !t.text && !t.html || !t.container)throw"M2012.UI.MenuButton.create:参数非法";
            t = e.defaults(t, s);
            var i = new M2012.UI.MenuButton(t), n = i.render().el, o = t.container || document.body;
            return a(o).append(n), i
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = i.View.ViewBase;
    i.namespace("M2012.UI.DropMenu", n.extend({
        initialize: function (t) {
            this.options = t || {};
            var e = a(t.template);
            return this.setElement(e), n.prototype.initialize.apply(this, arguments)
        }, name: "M2012.UI.DropMenu", render: function () {
            var t = this, e = this.options;
            if (e.contentPath) {
                var i = e.defaultText || "";
                "number" == typeof e.selectedIndex && (i = e.menuItems[e.selectedIndex].text || e.menuItems[e.selectedIndex].html, this.selectedIndex = e.selectedIndex), this.setText(i)
            }
            return this.$el.off("click").on("click", function () {
                t.quiet || t.showMenu()
            }), n.prototype.render.apply(this, arguments)
        }, defaults: {selectedIndex: -1}, setText: function (t) {
            this.$el.find(this.options.contentPath).html(t)
        }, disable: function () {
            this.quiet = !0
        }, enable: function () {
            this.quiet = !1
        }, showMenu: function () {
            var t = this, e = this.menu, i = this.options;
            if (void 0 === e) {
                var a = {
                    onItemClick: function (e, i) {
                        t.onMenuItemClick(e, i)
                    },
                    container: i.menuContainer || document.body,
                    items: i.menuItems,
                    dockElement: this.$el,
                    width: this.getWidth(),
                    maxHeight: i.maxHeight,
                    scrollCount: i.scrollCount,
                    customClass: i.customClass,
                    selectMode: i.selectMode,
                    hideInsteadOfRemove: !0,
                    isClickHide: i.isClickHide
                };
                this.menu = M2012.UI.PopMenu.create(a), this.menu.on("subItemCreate", function (e) {
                    t.trigger("subItemCreate", e)
                }), t.trigger("menuCreate", this.menu)
            } else e.isHide() ? e.show() : e.hide();
            i.isHoverHide && t.menu && t.menu.$el.hover(function () {
            }, function () {
                t.menu && t.menu.hide()
            })
        }, onMenuItemClick: function (t, e) {
            this.setText(top.M139.Text.Html.encode(t.text) || t.html), this.selectedIndex = e, a.isFunction(this.options.onItemClick) && this.options.onItemClick(t, e), this.trigger("change", t, e)
        }, getSelectedItem: function () {
            return this.options.menuItems[this.selectedIndex] || null
        }, setSelectedIndex: function (t) {
            this.selectedIndex = t, this.options.selectedIndex = t;
            var e = this.getSelectedItem();
            this.setText(e.text || e.html)
        }, setSelectedText: function (t) {
            this.setSelectedValue(t, "text")
        }, setSelectedValue: function (t, e) {
            for (var i = 0; i < this.options.menuItems.length; i++)if (this.options.menuItems[i].value == t || "text" == e && this.options.menuItems[i].text == t)return void this.setSelectedIndex(i)
        }, getCount: function () {
            return this.options.menuItems.length
        }, addItem: function (t, e) {
            void 0 == e ? this.options.menuItems.push(t) : this.options.menuItems.splice(e, 0, t), this.render()
        }
    }));
    var s = {
        template: ['<div class="dropDown">', '<div class="dropDownA" href="javascript:void(0)"><i class="i_triangle_d"></i></div>', '<div class="dropDownText"></div>', "</div>"].join(""),
        contentPath: ".dropDownText",
        dropButtonPath: ".dropDownA"
    };
    t.extend(M2012.UI.DropMenu, {
        create: function (t) {
            if (!t || !t.container)throw"M2012.UI.DropMenu.create:参数非法";
            t = e.defaults(t, s);
            var i = new M2012.UI.DropMenu(t);
            return t.container.html(i.render().$el), i
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    i.core.namespace("M139.UI.Popup", Backbone.View.extend({
        initialize: function (t) {
            this.options = t || {}, this.target = t.target, this.icon = null, this.buttons = null, this.contentElement = null, t.mainClass = t.mainClass || "tips delmailTips", t.containerClass = t.containerClass || "norTips", t.contentClass = t.contentClass || "norTipsContent", this.width = t.width, this.scrollHeight = this.options.scrollHeight || 0
        }, render: function () {
            function t() {
                var t = $(l.target).offset();
                return t
            }

            function e() {
                return l.height || $(l.contentElement).height()
            }

            function i() {
                return $.browser.msie && $.browser.version < 7 && !l.width && (l.width = 220), l.width || $(l.contentElement).width() + 5
            }

            function a(a) {
                var n = t(), s = $(l.target).height();
                try {
                    $(l.contentElement).width(i())
                } catch (o) {
                }
                var r, c = n.left, d = parseInt(t().left) + parseInt(i());
                d > $(window).width() ? (c = $(l.target).offset().left + $(l.target).width() - i() + (h.dx || 0), r = $(l.contentElement).width() - $(l.target).width() / 2) : r = $(l.target).width() / 2, r -= 10, $(l.contentElement).find("[name=popup_arrow]").css("left", r + "px");
                var u = h.showArrow ? 10 : 2;
                if ("down" == a)l.contentElement.css({top: n.top + s + u + (h.dy || 0) + "px", left: c + "px"}); else {
                    var p = $(l.target).offset().top - e() - u;
                    l.contentElement.css({top: p + "px", left: c + "px"})
                }
            }

            function n() {
                var i = t().top + e() + l.scrollHeight;
                return l.options.isPlusTargetHeight && (i += $(l.target).height()), i > $(window).height() ? "up" : "down"
            }

            function s() {
                return l.options && l.options.icon ? '<span class="norTipsIco"><i class="' + l.options.icon + '"></i></span>' : ""
            }

            function o() {
                var t = h.buttons;
                if (t) {
                    for (var e = ['<div name="buttons" class="delmailTipsBtn">'], i = 0; i < t.length; i++) {
                        var a = t[i].cssClass ? t[i].cssClass : "btnNormal";
                        e = e.concat(['<a href="javascript:void(0)" class="', a, '"><span>', t[i].text, "</span></a>"])
                    }
                    return e.push("</div>"), e.join("")
                }
                return ""
            }

            function r() {
            }

            var l = this, h = this.options;
            if (null == this.contentElement) {
                var c = ['<div id="popup_', h.name, '" style="z-index:1001" class="', h.mainClass, '"> <a href="javascript:" class="delmailTipsClose" name="popup_close">', h.noClose ? "" : '<i class="i_u_close"></i>', '</a><div class="tips-text">', '<div class="', h.containerClass, '" style="', h.height ? "height:" + h.height + "px !important" : "", '"> ', s(), '<div class="', h.contentClass, '">', h.content, "</div>", "</div>", o(), "</div>", h.showArrow ? '<div class="diamond" name="popup_arrow" style="' + r() + '"></div>' : "", "</div>"].join("");
                this.contentElement = $(c), $(document.body).append(this.contentElement);
                var d = h.direction || n(), u = "up" == d ? "tipsBottom" : "tipsTop";
                h && h.noClose && this.contentElement.find("[name=popup_close]").addClass("hide"), this.contentElement.find("[name=popup_arrow]").addClass(u), this.contentElement.find("[name=popup_close]").click(function (t) {
                    h && h.closeClick && "function" == typeof h.closeClick && h.closeClick(), l.trigger("close", {
                        event: t,
                        source: "popup_close"
                    }), l.close()
                }), a(d), $(this.options.buttons).each(function (t) {
                    l.contentElement.find("div[name=buttons] a").eq(t).click(this.click)
                }), h.autoHide && $D.bindAutoHide({
                    action: "click",
                    stopEvent: !0,
                    element: this.contentElement.get(0),
                    callback: function (t) {
                        l.trigger("close", t), t.cancel || l.close()
                    }
                })
            }
        }, close: function () {
            try {
                i.Dom.fixIEFocus()
            } catch (t) {
            }
            this.contentElement && this.contentElement.remove(), this.contentElement = null
        }
    })), t.extend(i.UI.Popup, {
        popupList: {}, create: function (t) {
            var e = t.name || "tips" + Math.random();
            return t.name = e, this.popupList[e] && null != this.popupList[e].contentElement || (this.popupList[e] = new i.UI.Popup(t), this.currentPopup = this.popupList[e]), this.popupList[e]
        }, close: function (t) {
            var e = this.currentPopup;
            t && (e = this.popupList[t]), e && e.close()
        }
    })
}(jQuery, _, M139), M139.core.namespace("M139.UI", {
    TabPage: function (t) {
        function e() {
            for (elem in t)elem && (i[elem] = t[elem])
        }

        var i = this;
        this.el = null, this.className = "tab", this.tabList = null, this.tabBh = null, this.pageList = null, this.container = null, this.selectedIndex = 0, this.onTabChange = null, this.tabControl = null, this.tabContent = null, this.tabDefaultClass = "", this.tabActiveClass = "on", this.contentList = new Object, e(), this.init = function () {
            var e = document.createElement("div");
            if (null == this.tabControl) {
                e.className = this.className, e.innerHTML = '<div class="tabTitle"></div>', this.container && this.container.appendChild(e);
                var i = document.createElement("ul");
                e.firstChild.appendChild(i), this.tabControl = i, this.tabContent = document.createElement("div"), e.appendChild(this.tabContent), t.contentClass && (this.tabContent.className = t.contentClass)
            }
            return this.el = e, e
        }, this.setPageContent = function (t) {
            var e = this.selectedIndex;
            if (this.tabContent.childNodes.length > 0 && this.tabContent.removeChild(this.tabContent.childNodes[0]), this.contentList[e])this.tabContent.appendChild(this.contentList[e]); else {
                var i = document.createElement("div");
                i.className = "tabContent", i.style.display = "block", this.tabContent.appendChild(i), "string" == typeof t ? i.innerHTML = t : i.appendChild(t), this.contentList[e] = i
            }
        }, this.renderTab = function (t) {
            function e(t, e) {
                t.onclick = function () {
                    return i.changeTab(e), !1
                }
            }

            var a = 0;
            for (elem in this.tabList) {
                obj = this.tabList[elem], tabBh = this.tabBh[elem];
                var n;
                t ? (n = document.createElement("li"), n.innerHTML = ' <a hidefocus="1" bh=' + tabBh + ' href="javascript:"> <span>' + obj + " </span> </a>", this.tabControl.appendChild(n)) : n = this.tabControl.childNodes[a], this.selectedIndex == a ? n.className = "on" : n.className = "", e(n, a), a++
            }
        }, this.changeTab = function (t, e) {
            this.selectedIndex = t, this.renderTab(!1), this.pageList && this.setPageContent(this.pageList[t]), this.onTabChange && this.onTabChange(t, e)
        }, this.render = function () {
            return this.init(), this.renderTab(!0), this.changeTab(0, !0), this.el
        }
    }
}), M139.namespace("M139.UI.TabNav", Backbone.View.extend({
    events: {"click li.nav-item": "changeTab", "click .groupToggleShow": "toggleFold"}, initialize: function (t) {
        var e, i, a = {};
        this.items = [], this.onTabChange = t.onTabChange;
        for (var n in t.items)i = t.items[n], this.items = this.items.concat(i.data), a[n] = $TextUtils.formatBatch(i.itemTemplate, i.data).join("");
        e = $TextUtils.format(t.template, a);
        var s = $(e).hide().css("marginLeft", 0);
        s.appendTo(t.container), s.find("li.nav-item").each(function (t) {
            $(this).attr("nav-index", t)
        }), this.setElement(s)
    }, render: function () {
        return this
    }, getItems: function () {
        return this.items
    }, changeTab: function (t) {
        var e = 0 | $(t.currentTarget).attr("nav-index");
        if (!("number" == typeof e && 0 > e || e >= this.items.length)) {
            var i = this.items[e].key;
            setTimeout(function () {
                $App.show(i)
            }, 0), this.onTabChange(this.items[e])
        }
    }, switchItem: function (t) {
        var e, i, a = this.items;
        if ("string" == typeof t)for (e = 0, i = a.length; i > e && t !== a[e].key; e++); else e = t;
        this.$el.find("li a.on").removeClass("on"), this.$el.find("li.nav-item:eq(" + e + ")>a").addClass("on")
    }, toggleFold: function (t) {
        var e = $(t.currentTarget).find("i"), i = $(t.currentTarget).next("ul");
        e.hasClass("t_blackRight") ? (i.show(), e.removeClass("t_blackRight").addClass("t_blackDown")) : (i.hide(), e.removeClass("t_blackDown").addClass("t_blackRight"))
    }, hide: function () {
        this.$el.hide()
    }, show: function (t) {
        this.$el.show()
    }
})), M139.core.namespace("M2012.UI.RichHint", Backbone.View.extend({
    histList: {},
    hintEl: null,
    register: function (t, e) {
        function i(i) {
            if ($(t).is(":visible")) {
                r.hintEl || (r.hintEl = $("<div class='remarkTips shadow'></div>"), $(document.body).append(r.hintEl)), r.hintEl.unbind(), r.hintEl.hide(), _.isFunction(e) ? r.hintEl.html(e(i)) : r.hintEl.html(e);
                var a = $(i).offset();
                a.top = a.top + $(i).height() + 8, r.hintEl.css({
                    position: "absolute",
                    left: a.left + "px",
                    top: a.top + "px"
                });
                var s = {sender: i, el: r.hintEl, isShow: !0};
                if (r.trigger("show", s), !s.isShow)return r.hintEl.html(""), void r.hintEl.hide();
                r.hintEl.show(), r.hintEl.hover(function () {
                    o = !0
                }, function () {
                    o = !1, n()
                }), r.hintEl.click(function () {
                    n()
                })
            }
        }

        function a() {
            $(t).hover(function () {
                s = !0;
                var e = $(this);
                setTimeout(function () {
                    $(t).is(":visible") && (s || o) && i(e)
                }, 1e3)
            }, function () {
                s = !1, n()
            })
        }

        function n() {
            setTimeout(function () {
                s || o || r.hintEl && (r.hintEl.html(""), r.hintEl.hide())
            }, 200)
        }

        var s = !1, o = !1, r = this;
        a()
    }
})), function () {
    $Hint = M2012.UI.RichHint.prototype
}(), function (t, e, i, a) {
    var n = t;
    a.core.namespace("M139.UI", {
        TipMessage: {
            show: function (t, e) {
                if (t && !this.prior) {
                    var a = this;
                    if (!this.isAdded) {
                        var s = document.createElement("div");
                        s.innerHTML = '<span id="tipmsg" style="display:none;position:absolute;z-index:9999;top:0px;left:45%;" class="msg"></span>', this.el = n(s.firstChild), document.body.appendChild(s.firstChild), this.isAdded = !0
                    }
                    this._removeClass(), e && e.className && (this.className = e.className, this.el.addClass(e.className)), this.el[0].innerHTML = t, this.el.css({opacity: 1}), clearTimeout(this.afterTimer), e && e.after ? (this.el.hide(), this.afterTimer = setTimeout(function () {
                        a.el.show(), i.isFunction(e.afterCall) && e.afterCall()
                    }, e.after)) : this.el.show();
                    var o = Math.random().toString();
                    this.el.attr("showkey", o), clearTimeout(this.el.stop().data("timer")), e && e.prior && (this.prior = e.prior), e && e.delay && setTimeout(function () {
                        a.el.attr("showkey") === o && (a.prior = !1, a.hide(), i.isFunction(e.delayCall) && e.delayCall())
                    }, e.delay)
                }
            }, warn: function (t, e) {
                e = i.defaults(e || {}, {delay: 3e3}), this.show(t, n.extend({className: "msgOrange"}, e))
            }, error: function (t, e) {
                e = i.defaults(e || {}, {delay: 3e3}), this.show(t, n.extend({className: "msgRed"}, e))
            }, showSwitchTimes: 0, showSwitch: function (t) {
                if ("calendar" != top.$App.getCurrentTab().name && t && (t.indexOf("readMessage") >= 0 || t.indexOf("mbox:compose") >= 0)) {
                    if (this.showSwitchTimes >= 1)return;
                    var e = top.getDomain("mail") + "/switchto.aspx?sid=" + top.sid + "&v=3";
                    top.M139.UI.TipMessage.warn("网速较慢，建议您可以试下简洁的<a href='" + e + "'>基础版</a>", {delay: 3e4}), this.showSwitchTimes++
                }
            }, showRetry: function (t, e, i) {
                top.M139.UI.TipMessage.error("网络异常，请<a href='javascript:' id='tips_retry'>刷新</a>重试", {delay: 3e4}), n("#tips_retry", top.document).click(function () {
                    t.apply(e, i)
                })
            }, showMiddleTip: function (t, e) {
                var i = this;
                this.middleTip || (this.middleTip = n(['<div class="noflashtips inboxloading" style="z-index:99999">', n.browser.msie && n.browser.version <= 7 ? "<i></i>" : "", '<img src="/m2012/images/global/load.gif" alt="加载中..." style="vertical-align:middle;">加载中，请稍后...', "</div>"].join("")).appendTo(document.body)), t = t || "加载中，请稍后...", a.Dom.setTextNode(this.middleTip[0], t), this.middleTip.show();
                var s = Math.random().toString();
                this.middleTip.attr("showkey", s), clearTimeout(this.middleTip.stop().data("timer")), e && e.delay && setTimeout(function () {
                    i.middleTip.attr("showkey") === s && i.hideMiddleTip()
                }, e.delay)
            }, hideMiddleTip: function () {
                this.middleTip && this.middleTip.fadeOut(800)
            }, hide: function () {
                if (clearTimeout(this.afterTimer), !this.prior) {
                    var t = this;
                    $B.is.ie && $B.getVersion() < 8 ? (this.el && this.el.hide(), t._removeClass()) : this.el && this.el.fadeOut(800, function () {
                        t._removeClass()
                    })
                }
            }, _removeClass: function () {
                this.className && (this.el.removeClass(this.className), this.className = null)
            }
        }
    })
}(jQuery, Backbone, _, M139), function (t, e, i) {
    var a = t, n = i.View.ViewBase, s = "M2012.UI.PageTurning";
    i.namespace(s, n.extend({
        initialize: function (e) {
            this.options = e || {};
            var i = t(e.template);
            return this.setElement(i), n.prototype.initialize.apply(this, arguments)
        }, name: s, render: function () {
            var t = this.options;
            return this.renderChildren(t), this.initEvent(), n.prototype.render.apply(this, arguments)
        }, renderChildren: function (e) {
            this.options.pageIndex = e.pageIndex, this.options.pageCount = e.pageCount, e.selectButtonTemplate && (this.$el.append(e.selectButtonTemplate), this.$(e.pageLabelPath).text(e.pageIndex + "/" + e.pageCount));
            var i = e.pageIndex > 1, n = a(e.prevButtonTemplate);
            if (e.prevButtonTemplate && (e.prevButtonInsertPath ? n.appendTo(this.$el.find(e.prevButtonInsertPath)) : n.appendTo(this.$el)), i || e.disablePrevButtonClass && n.removeClass(e.PrevButtonClass).addClass(e.disablePrevButtonClass), e.pageNumberButtonPath) {
                if (e.pageCount > 1 && e.pageNumberButtonTemplate) {
                    var s = e.pageNumberButtonInsertPath ? this.$el.find(e.pageNumberButtonInsertPath) : this.$el, o = 1, r = e.pageCount;
                    e.maxPageButtonShow && e.maxPageButtonShow < e.pageCount && (o = Math.max(e.pageIndex - 2, 1), o = Math.min(o, e.pageCount - e.maxPageButtonShow + 1), r = Math.min(o + e.maxPageButtonShow - 1, e.pageCount));
                    for (var l = o; r >= l; l++) {
                        var h = t(e.pageNumberButtonTemplate).appendTo(s);
                        e.pageNumberContentPath ? h.find(e.pageNumberContentPath).text(l) : h.text(l), h.attr("index", l)
                    }
                }
                e.numberButtonFocusClass && this.$el.find("*[index='" + e.pageIndex + "']").addClass(e.numberButtonFocusClass)
            }
            var c = e.pageCount > 1 && e.pageIndex < e.pageCount, d = a(e.nextButtonTemplate);
            e.nextButtonTemplate && (e.nextButtonInsertPath ? d.appendTo(this.$el.find(e.nextButtonInsertPath)) : d.appendTo(this.$el)), c || (e.disableNextButtonClass ? d.removeClass(e.NextButtonClass).addClass(e.disableNextButtonClass) : d.hide())
        }, initEvent: function () {
            var t = this, e = this.options;
            e.pageNumberButtonPath && this.$el.find(e.pageNumberButtonPath).click(function () {
                var e = 1 * this.getAttribute("index");
                t.onNumberButtonClick(e)
            }), e.prevButtonPath && this.$el.find(e.prevButtonPath).click(function () {
                t.onPrevButtonClick()
            }), e.nextButtonPath && this.$el.find(e.nextButtonPath).click(function () {
                t.onNextButtonClick()
            }), e.selectButtonPath && this.$(e.selectButtonPath).click(function () {
                t.onSelectPageClick()
            })
        }, update: function (t, i, a) {
            this.$el.html(""), i = "number" == typeof i ? i : this.options.pageCount;
            var n = e.defaults({pageIndex: t, pageCount: i}, this.options);
            this.renderChildren(n), this.initEvent(), 2 == arguments.length && e.isBoolean(arguments[1]) && (a = arguments[1]), a || this.trigger("pagechange", t)
        }, onSelectPageClick: function () {
            var t = this, e = i.UI.Popup.create({
                mainClass: "tips jumppagesLayer",
                target: this.$(this.options.selectButtonPath),
                width: 135,
                buttons: [{
                    text: "确定", cssClass: "icoG", click: function () {
                        var i = e.contentElement.find("input:text").val();
                        /^\d+$/.test(i) && (i > 0 && i <= t.options.pageCount ? t.onNumberButtonClick(parseInt(i)) : i > t.options.pageCount ? t.onNumberButtonClick(t.options.pageCount) : t.onNumberButtonClick(1)), e.close()
                    }
                }, {
                    text: "取消", cssClass: "icoTb", click: function () {
                        e.close()
                    }
                }],
                noClose: !0,
                width: 150,
                content: '<div class="ta_c">跳转到第 <input class="ipt-text" type="text" /> 页</div>'
            });
            e.render(), e.contentElement.find("input:text").keyup(function (t) {
                this.value = this.value.replace(/\D/g, "")
            }).focus(), i.Dom.bindAutoHide({
                element: e.contentElement[0], stopEvent: !0, callback: function () {
                    e.contentElement.remove()
                }
            })
        }, onNumberButtonClick: function (t) {
            this.update(t)
        }, onPrevButtonClick: function () {
            var t = this.options.pageIndex - 1;
            t > 0 && this.update(t)
        }, onNextButtonClick: function () {
            var t = this.options.pageIndex + 1;
            t <= this.options.pageCount && this.update(t)
        }
    })), t.extend(M2012.UI.PageTurning, {
        create: function (t) {
            var i = t.styleTemplate || 1, a = this["STYLE_" + i];
            t = e.defaults(t, a);
            var n = new M2012.UI.PageTurning(t);
            return n.render().$el.appendTo(t.container), n
        },
        STYLE_1: {
            template: '<div class="blacklist-page"></div>',
            pageNumberButtonTemplate: '<a rel="number" href="javascript:;"></a>',
            pageNumberButtonPath: "a[rel='number']",
            prevButtonTemplate: '<a rel="prev" href="javascript:;">上一页</a>',
            prevButtonPath: "a[rel='prev']",
            nextButtonTemplate: '<a rel="next" href="javascript:;">下一页</a>',
            nextButtonPath: "a[rel='next']",
            numberButtonFocusClass: "on"
        },
        STYLE_2: {
            template: '<div class="toolBarPaging ml_10 fr"><div>',
            pageLabelPath: "a[rel='selector'] span",
            selectButtonTemplate: '<a rel="selector" href="javascript:;" class="pagenum"><span class="pagenumtext">100/5000</span></a>',
            prevButtonTemplate: '<a rel="prev" title="上一页" href="javascript:;" class="up"></a>',
            nextButtonTemplate: '<a rel="next" title="下一页" href="javascript:;" class="down"></a>',
            prevButtonPath: "a[rel='prev']",
            nextButtonPath: "a[rel='next']",
            selectButtonPath: "a[rel='selector']",
            PrevButtonClass: "iconPrev",
            NextButtonClass: "iconNext",
            disablePrevButtonClass: "up-gray",
            disableNextButtonClass: "down-gray"
        },
        STYLE_3: {
            template: '<div class="p_relative fr mtb_3 jumppageslink"><div>',
            pageLabelPath: "a[rel='selector'] span em",
            selectButtonTemplate: '<a rel="selector" class="icoJump ml_6" href="javascript:"><span class="p_relative"><em>2/86</em><i class="l-line"></i><i class="i_triangle_d"></i></span></a>',
            prevButtonTemplate: '<a rel="prev" title="上一页" href="javascript:;" class="ml_6 iconPrev"></a>',
            nextButtonTemplate: '<a rel="next" title="下一页" href="javascript:;" class="ml_6 iconNext"></a>',
            prevButtonPath: "a[rel='prev']",
            nextButtonPath: "a[rel='next']",
            selectButtonPath: "a[rel='selector']",
            PrevButtonClass: "iconPrev",
            NextButtonClass: "iconNext",
            disablePrevButtonClass: "iconPrevBan c-default",
            disableNextButtonClass: "iconNextBan c-default"
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    t.extend(t.fn, {
        blankText: function () {
            if (this.length < 1)return this;
            var e = arguments[0];
            "" === e ? t(this).unbind("focus").unbind("blur") : (t(this).focus(function () {
                this.value == e && (this.value = "", this.style.color = "")
            }).blur(function () {
                0 == this.value.length && (this.value = e, this.style.color = "#AAA")
            }), "" == this.val() && this.val(e).css("color", "#AAA"))
        }
    }), i.namespace("M2012.UI.ListMenu", function (e) {
        this.expandButton = e.expandButton, this.listContainer = e.listContainer, this.textField = e.textField, this.data = e.data, this.onItemCreate = e.onItemCreate, this.onItemClick = e.onItemClick;
        var i = this;
        t(i.expandButton).click(function (e) {
            var a = t(i.listContainer).height(), n = t(this), s = a + n.offset().top + n.height(), o = s > t(document).height() ? 0 - a - 7 : n.height();
            t(i.listContainer).css("top", o).show(), e.stopPropagation()
        }), t(document).click(function (e) {
            t(i.listContainer).hide()
        }), t.isFunction(i.onItemCreate) || (i.onItemCreate = function () {
        });
        for (var a = [], n = 0, s = i.data.length; s > n; n++)a.push(i.onItemCreate(i.data[n], n, s));
        i.listContainer.innerHTML = a.join(""), t(i.listContainer).hide(), a = null, a = [].concat(i.data), t(i.listContainer.childNodes).each(function (e) {
            t(this).data("value", a.shift())
        }), "undefined" != typeof e.defaultValue && (i.textField.innerHTML = e.defaultValue), t(i.listContainer.childNodes).click(function (e) {
            i.textField.innerHTML = this.textContent || this.innerText;
            var a = t(this).data("value");
            i.onItemClick({value: a, sender: this, event: e}), e.stopPropagation(), t(i.listContainer).hide()
        }), this.length = function () {
            return i.listContainer.childNodes.length
        }, this.value = function (e) {
            if ("undefined" == typeof e) {
                var a = i.textField.innerHTML;
                t(i.listContainer.childNodes).each(function (t) {
                    var e = this.textContent || this.innerText;
                    return a == e ? i.data[t] : void 0
                })
            } else t(i.listContainer.childNodes).each(function (a) {
                t(this).data("value") == e && (i.textField.innerHTML = e)
            })
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = i.View.ViewBase;
    i.namespace("M2012.UI.Picker.PickerBase", n.extend({
        initialize: function (e) {
            this.options = e || {};
            var i = t(e.template || this.template);
            return this.setElement(i), this.bindHostEvent(), n.prototype.initialize.apply(this, arguments)
        }, name: "M2012.UI.Picker.PickerBase", render: function () {
            return this.options.isNotLimit || (this.render = function () {
                return this
            }), this.$el.appendTo(this.options.container || document.body), n.prototype.render.apply(this, arguments)
        }, show: function (t) {
            t = t || {};
            var e = t.dockElement || this.options.bindInput;
            return this.$el.css("z-index", "9999"), e ? (this.$el.show(), i.Dom.dockElement(e, this.el, {
                margin: 3,
                dx: t.dx || -2,
                dy: t.dy || 0
            })) : t.x && t.y && this.$el.css({top: t.y, left: t.x}), n.prototype.show.apply(this, arguments)
        }, hide: function () {
            return M2012.UI.PopMenu.unBindAutoHide({
                action: "click",
                element: this.el
            }), n.prototype.hide.apply(this, arguments)
        }, bindHostEvent: function () {
            if (this.options.bindInput) {
                var t = this;
                this.$el.click(function (t) {
                    i.Event.stopEvent(t)
                }), a(this.options.bindInput).click(function () {
                    t.render().show(t.options), M2012.UI.PopMenu.bindAutoHide({
                        action: "click",
                        element: t.el,
                        stopEvent: !0,
                        callback: function () {
                            t.hide()
                        }
                    })
                })
            }
        }, onSelect: function (t, e) {
            void 0 === t && (this.getValue ? t = this.getValue() : this.getSelectedValue && (t = this.getSelectedValue())), this.trigger("select", {
                value: t,
                index: e
            })
        }
    }))
}(jQuery, _, M139), function (t, e, i) {
    var a = M2012.UI.Picker.PickerBase;
    i.namespace("M2012.UI.Picker.Calendar", a.extend({
        initialize: function (t) {
            if (this.options = t || {}, this.stopPassDate = t.stopPassDate, this.dateStart = t.dateStart, this.dateEnd = t.dateEnd, t.value)if (this.stopPassDate) {
                var e = new Date;
                this.value = e > t.value ? e : t.value
            } else this.value = t.value; else this.value = new Date;
            return a.prototype.initialize.apply(this, arguments)
        },
        name: "M2012.UI.Picker.Calendar",
        template: ['<div class="dayControl" style="position:absolute;z-index:9999;background-color:white">', '<div class="dayControlTitle">', '<a href="javascript:;" class="upYear UpMonth"></a>', '<a href="javascript:;" class="upMonth UpYear"></a>', '<span class="MonthLabel"></span>', '<a href="javascript:;" class="downYear DownYear"></a>', '<a href="javascript:;" class="downMonth DownMonth"></a>', "</div>", '<div class="dayControlNo"></div>', "<table>", "<thead>", "<tr>", "<th>日</th>", "<th>一</th>", "<th>二</th>", "<th>三</th>", "<th>四</th>", "<th>五</th>", "<th>六</th>", "</tr>", "</thead>", "<tbody>", "</tbody>", "</table>", "</div>"].join(""),
        events: {
            "click a.UpYear": "onPrevYearClick",
            "click a.DownYear": "onNextYearClick",
            "click a.UpMonth": "onPrevMonthClick",
            "click a.DownMonth": "onNextMonthClick",
            "click td": "onDateClick"
        },
        render: function () {
            return this.updateContent(this.value), a.prototype.render.apply(this, arguments)
        },
        onPrevYearClick: function () {
            if (this.stopPassDate) {
                var t = new Date(this.curValue);
                if (t.setFullYear(t.getFullYear() - 1), this.compareMonth(new Date, t) > 0)return
            }
            this.curValue.setFullYear(this.curValue.getFullYear() - 1), this.updateContent(this.curValue)
        },
        onNextYearClick: function () {
            this.curValue.setFullYear(this.curValue.getFullYear() + 1), this.updateContent(this.curValue)
        },
        onPrevMonthClick: function () {
            this.stopPassDate && this.isCurrentMonth(this.curValue) || (this.curValue.setDate(0), this.updateContent(this.curValue))
        },
        onNextMonthClick: function () {
            this.curValue.setDate(32), this.updateContent(this.curValue)
        },
        updateContent: function (t) {
            this.$("tbody").html(this.getCalendarHTML(t)), this.$(".MonthLabel").text(t.format("yyyy-MM")), this.curValue = new Date(t), this.focusSelectedCell(t)
        },
        focusSelectedCell: function () {
            this.$("td.on").removeClass("on");
            var t = this.value.getDate();
            this.$("td[rel='" + t + "']").addClass("on")
        },
        onDateClick: function (t) {
            var e = t.target, a = e.innerHTML;
            if (/\d+/.test(a)) {
                var n = new Date(this.curValue);
                if (n.setDate(a), this.stopPassDate) {
                    var s = new Date;
                    if (!i.Date.isSameDay(s, n) && s > n)return
                }
                if (this.dateStart && this.dateEnd && "color: silver;" == e.style.cssText)return;
                this.value = n, this.focusSelectedCell(), this.onSelect(n), this.hide()
            }
        },
        compareMonth: function (t, e) {
            return t.getFullYear() > e.getFullYear() ? 1 : t.getFullYear() < e.getFullYear() ? -1 : t.getMonth() - e.getMonth()
        },
        isCurrentMonth: function (t) {
            var e = new Date;
            return t.getMonth() == e.getMonth() && t.getFullYear() == e.getFullYear()
        },
        getOptionalDate: function () {
            var t = $Date.parse(this.dateStart), e = $Date.parse(this.dateEnd);
            this.optionalDate = {startDate: t.getDate(), endDate: e.getDate()}
        },
        getCalendarHTML: function (t) {
            function e(t) {
                if (!l && !h)return "";
                var e = 'style="color:silver;"';
                return l ? c > 0 ? e : 0 > c ? "" : d > t ? e : "" : h ? 0 > u * p ? e : u * p > 0 ? "" : 0 > p ? t < a.optionalDate.startDate ? e : "" : 0 > u ? t > a.optionalDate.endDate ? e : "" : t < a.optionalDate.startDate || t > a.optionalDate.endDate ? e : "" : void 0
            }

            var a = this, n = i.Date.getDaysOfMonth(t), s = i.Date.getFirstWeekDayOfMonth(t), o = [], r = n + s, l = this.stopPassDate, h = this.dateStart && this.dateEnd, c = this.compareMonth(new Date, t), d = (new Date).getDate();
            if (h) {
                var u = this.compareMonth($Date.parse(this.dateStart), t), p = this.compareMonth(t, $Date.parse(this.dateEnd));
                a.getOptionalDate()
            }
            o.push("<tr>");
            for (var m = 1, g = 1; r >= m; m++, g++)m > s && n >= g ? o.push("<td rel='" + g + "' " + e(g) + ">" + g + "</td>") : (o.push("<td></td>"), g--), m % 7 != 0 && m != r || o.push("</tr>");
            return o.join("")
        }
    })), t.extend(M2012.UI.Picker.Calendar, {
        create: function (t) {
            var e = new M2012.UI.Picker.Calendar(t);
            return e
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    i.namespace("M2012.UI.Picker.CommonAPI", function () {
    });
    var a = M2012.UI.Picker.CommonAPI;
    a.prototype.padding = function (t, e) {
        return e = (e || 2) - (1 + Math.floor(Math.log(1 | t) / Math.LN10 + 1e-15)), new Array(e + 1).join("0") + t
    }, a.prototype.fixHourTime = function (t) {
        if (t += "", !t)return "";
        if (t.indexOf(":") > 0)return t;
        t = function (t, e) {
            var i = (e || 2) - (1 + Math.floor(Math.log(1 | t) / Math.LN10 + 1e-15));
            return new Array(i + 1).join("0") + t
        }(t, 4);
        var e = t.length;
        return $T.format("{0}:{1}", [t.substr(e - 4, 2), t.substr(e - 2)])
    };
    var n = this;
    M2012.UI.Picker.CommonAPI.getInstance = function () {
        return n.commonApi || (n.commonApi = new M2012.UI.Picker.CommonAPI), n.commonApi
    }
}(jQuery, _, M139), function (t, e, i) {
    var a = M2012.UI.Picker.CommonAPI.getInstance(), n = "M2012.UI.Picker.TimePicker", s = function () {
        var t, e = [];
        for (t = 0; 24 > t; t++)e.push({text: a.padding(t, 2), data: t});
        return e
    }(), o = function () {
        var t, e = [];
        for (t = 0; 6 > t; t++) {
            var i = 10 * t;
            e.push({text: a.padding(i, 2), data: i})
        }
        return e
    }();
    i.namespace(n, Backbone.View.extend({
        name: n,
        configData: {
            initData: {},
            hour: {name: "hour", max: 23, width: 65, height: "145px", items: e.clone(s)},
            minute: {name: "minute", max: 59, width: 50, height: "auto", items: e.clone(o)}
        },
        template: {
            MAIN: '<span class="textTimeOther ml_5"><input name="hour" type="text" value="00" maxlength="2"> : <input name="minute" type="text" value="00" maxlength="2"></span>',
            MAIN2: '<div class="createInput_right"><input name="hour" type="text" value="00" maxlength="2">:<input name="minute" type="text" value="00" maxlength="2"></div>',
            selectedClass: "ses"
        },
        initialize: function (t) {
            t = t || {};
            var e = this;
            e.options = t, e.container = t.container, e.container && (e.model = new Backbone.Model(e.configData.initData), e.render(), e.bindEvents(), e._initData())
        },
        render: function () {
            var e = this, i = e.options.width, a = e.template.MAIN, n = e.options.style;
            n && e.template[n] && (a = e.template[n]), e.currentEl = t(a).appendTo(e.container), void 0 !== i && e.currentEl.css("width", i), e.input = e.currentEl.find("input"), e.hour = e.currentEl.find("input[name='hour']"), e.minute = e.currentEl.find("input[name='minute']")
        },
        bindEvents: function () {
            var i = this, n = i.model;
            i.input.off("blur click").on("blur", function () {
                var e = t(this), a = e.attr("name");
                a && i.onBlur(a)
            }).on("click", function () {
                var e, s = t(this), o = s.attr("name"), r = i.configData[o], l = r && r.items || [];
                r && l.length > 0 && (e = new M2012.UI.PopMenu.create({
                    dockElement: s,
                    items: l,
                    width: r.width,
                    maxHeight: r.height,
                    onItemClick: function (t) {
                        var e = t.data;
                        s.val(a.padding(e, 2)), n.set(o, e)
                    }
                }), s.on("keydown", function () {
                    s.off("keydown"), e && e.remove && e.remove()
                })), s.select()
            }), n.on("change:hour change:minute", function () {
                i.timer && window.clearTimeout(i.timer), self.timer = window.setTimeout(function () {
                    var t = i.options.onChange;
                    e.isFunction(t) && t(i.getData())
                }, 100)
            })
        },
        _initData: function (t, e) {
            var i = this;
            t = t || i.options;
            var n = t.hour, s = t.minute, o = t.time;
            if ("number" == typeof n && "number" == typeof s)n = Number(n), s = Number(s); else if (o)o = a.padding(Number(o), 4), n = Number(o.slice(0, 2)), s = Number(o.slice(2, 4)); else {
                var r = i.closestDate();
                n = r.hour, s = r.minute
            }
            i.hour.val(a.padding(n, 2)), i.minute.val(a.padding(s, 2)), i.model.set({
                hour: n,
                minute: s
            }, {silent: !0}), e || i.model.trigger("change:hour")
        },
        setData: function (t, e) {
            void 0 == typeof e && (e = !0), this._initData(t, !!e)
        },
        closestDate: function (t) {
            t = t && new Date(t) || new Date;
            var e = t.getHours(), i = t.getMinutes();
            return e += Math.ceil(i / 60), i = 30 * Math.floor(i / 30), {hour: e % 24, minute: i}
        },
        onBlur: function (t) {
            var e = this, i = e[t], n = i.val(), s = e.configData[t] && e.configData[t].max, o = n;
            /[^0-9]/.test(n) && (n = e.model.get(t), o = n), Number(o) > Number(s) && (o = s), o = Number(o), i.val(a.padding(o, 2)), e.model.set(t, o), i.removeClass(e.template.selectedClass)
        },
        getData: function () {
            var t = this, e = t.model.get("hour"), i = t.model.get("minute"), n = a.padding(e, 2), s = a.padding(i, 2);
            return {hour: e, minute: i, time: n + s, text: n + ":" + s}
        },
        hide: function () {
            this.currentEl.addClass("hide")
        },
        show: function () {
            this.currentEl.removeClass("hide")
        }
    }))
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = M2012.UI.Picker.PickerBase;
    i.namespace("M2015.UI.Picker.Calendar", n.extend({
        initialize: function (t) {
            if (t = t || {}, this.stopPassDate = t.stopPassDate, this.dateStart = t.dateStart, this.dateEnd = t.dateEnd, t.value)if (this.stopPassDate) {
                var e = new Date;
                this.value = e > t.value ? e : t.value
            } else this.value = t.value; else this.value = new Date;
            return n.prototype.initialize.apply(this, arguments)
        },
        name: "M2012.UI.Picker.Calendar",
        templateOld: ['<div class="dayControl" style="position:absolute;z-index:9999;background-color:white">', '<div class="dayControlTitle">', '<a href="javascript:;" class="upYear UpMonth"></a>', '<a href="javascript:;" class="upMonth UpYear"></a>', '<span class="MonthLabel"></span>', '<a href="javascript:;" class="downYear DownYear"></a>', '<a href="javascript:;" class="downMonth DownMonth"></a>', "</div>", '<div class="dayControlNo"></div>', "<table>", "<thead>", "<tr>", "<th>日</th>", "<th>一</th>", "<th>二</th>", "<th>三</th>", "<th>四</th>", "<th>五</th>", "<th>六</th>", "</tr>", "</thead>", "<tbody>", "</tbody>", "</table>", "</div>"].join(""),
        template: ['<div class="calendar-month" style="position:absolute;z-index:9999;background-color:white">', '<div class="calendar-month-head">', '<a href="javascript:;" class="i_icoPre prevMonth"></a>', '<a href="javascript:;" class="currentMonth">', '<em class="calendarYear">2015</em>年', '<em class="calendarMonth">11</em>月', "</a>", '<a href="javascript:;" class="i_icoNext nextMonth"></a>', '<div class="menuPop selectList" style="display:none;top:38px;left:43px;z-index:999999;width:82px;height:auto;overflow:hidden;overflow-y:auto;"><!--隐藏的时候加上hide-->', '<ul id="ulSelectYear">', "</ul>", "</div>", '<div class="menuPop selectList " style="display:none; top:38px;left:108px;z-index:9999999;width:62px;height:145px;overflow:hidden;overflow-y:auto;">', '<ul id="ulSelectMonth">', "<li>12</li>", "<li>11</li>", "<li>10</li>", "<li>9</li>", "<li>8</li>", "<li>7</li>", "<li>6</li>", "<li>5</li>", "<li>4</li>", "<li>3</li>", "<li>2</li>", "<li>1</li>", "</ul>", "</div>", "</div>", '<div class="calendar-month-table">', '<table cellspacing="0" cellpadding="0" border="0">', "<thead>", "<tr>", "<th>日</th>", "<th>一</th>", "<th>二</th>", "<th>三</th>", "<th>四</th>", "<th>五</th>", "<th>六</th>", "</tr>", "</thead>", "<tbody>", "</tbody>", "</table>", "</div>", "</div>"].join(""),
        events: {
            "click a.UpYear": "onPrevYearClick",
            "click a.DownYear": "onNextYearClick",
            "click a.prevMonth": "onPrevMonthClick",
            "click a.nextMonth": "onNextMonthClick",
            "click td": "onDateClick"
        },
        render: function () {
            return this.updateContent(this.value), this.initEvents(), n.prototype.render.apply(this, arguments)
        },
        initEvents: function () {
            var t = this;
            t.$(".calendarYear").click(function (e) {
                var i = (new Date).getFullYear();
                t.selectUlHide(), t.$("#ulSelectYear").html("");
                for (var n = 0; 5 > n; n++) {
                    var s;
                    s = t.stopPassDate ? i + n : i - n;
                    var o = a("<li data-year='" + s + "'>" + s + "</li>");
                    o.click(function () {
                        var e = a(this).attr("data-year");
                        t.curValue.setFullYear(e), t.updateContent(t.curValue)
                    }), t.$("#ulSelectYear").append(o)
                }
                t.$("#ulSelectYear").parent().show()
            }), t.$(".calendarMonth").click(function (e) {
                t.$("#ulSelectMonth").html(""), t.selectUlHide();
                for (var i = 1; 13 > i; i++) {
                    var n = a("<li data-month='" + i + "'>" + i + "</li>");
                    n.click(function () {
                        var e = a(this).attr("data-month");
                        t.curValue.setMonth(e - 1), t.updateContent(t.curValue)
                    }), t.$("#ulSelectMonth").append(n)
                }
                t.$("#ulSelectMonth").parent().show()
            })
        },
        selectUlHide: function () {
            var t = this;
            t.$("#ulSelectYear").parent().hide(), t.$("#ulSelectMonth").parent().hide()
        },
        onPrevYearClick: function () {
            if (this.stopPassDate) {
                var t = new Date(this.curValue);
                if (t.setFullYear(t.getFullYear() - 1), this.compareMonth(new Date, t) > 0)return
            }
            this.curValue.setFullYear(this.curValue.getFullYear() - 1), this.updateContent(this.curValue)
        },
        onNextYearClick: function () {
            this.curValue.setFullYear(this.curValue.getFullYear() + 1), this.updateContent(this.curValue)
        },
        onPrevMonthClick: function () {
            this.stopPassDate && this.isCurrentMonth(this.curValue) || (this.curValue.setDate(0), this.updateContent(this.curValue))
        },
        onNextMonthClick: function () {
            this.curValue.setDate(32), this.updateContent(this.curValue)
        },
        updateContent: function (t) {
            this.selectUlHide(), this.$("tbody").html(this.getCalendarHTML(t)), this.$(".calendarYear").text(t.format("yyyy")), this.$(".calendarMonth").text(t.format("MM")), this.curValue = new Date(t), t.format("yyyy") == this.value.getFullYear() && t.format("MM") == this.value.getMonth() + 1 && this.focusSelectedCell(t)
        },
        focusSelectedCell: function () {
            this.$("td span.selected-date").removeClass("selected-date");
            var t = this.value.getDate();
            this.$("td[rel='" + t + "'] span").addClass("selected-date")
        },
        onDateClick: function (t) {
            var e = t.target, n = e.innerHTML;
            if (/^\d+/.test(n)) {
                var s = new Date(this.curValue);
                if (s.setDate(n), this.stopPassDate) {
                    var o = new Date;
                    if (!i.Date.isSameDay(o, s) && o > s)return
                }
                if (this.dateStart && this.dateEnd && !a(e).hasClass("effective-date"))return;
                this.value = s, this.focusSelectedCell(), this.onSelect(s), this.hide()
            }
        },
        compareMonth: function (t, e) {
            return t.getFullYear() > e.getFullYear() ? 1 : t.getFullYear() < e.getFullYear() ? -1 : t.getMonth() - e.getMonth()
        },
        isCurrentMonth: function (t) {
            var e = new Date;
            return t.getMonth() == e.getMonth() && t.getFullYear() == e.getFullYear()
        },
        getOptionalDate: function () {
            var t = $Date.parse(this.dateStart), e = $Date.parse(this.dateEnd);
            this.optionalDate = {startDate: t.getDate(), endDate: e.getDate()}
        },
        getCalendarHTML: function (t) {
            function e(t) {
                if (!l && !h)return "";
                var e = "", i = "effective-date";
                return l ? c > 0 ? e : 0 > c ? i : d > t ? e : i : h ? 0 > u * p ? e : u * p > 0 ? i : 0 > p ? t < a.optionalDate.startDate ? e : i : 0 > u ? t > a.optionalDate.endDate ? e : i : t < a.optionalDate.startDate || t > a.optionalDate.endDate ? e : i : void 0
            }

            var a = this, n = i.Date.getDaysOfMonth(t), s = i.Date.getFirstWeekDayOfMonth(t), o = [], r = n + s, l = this.stopPassDate, h = this.dateStart && this.dateEnd, c = this.compareMonth(new Date, t), d = (new Date).getDate();
            if (h) {
                var u = this.compareMonth($Date.parse(this.dateStart), t), p = this.compareMonth(t, $Date.parse(this.dateEnd));
                a.getOptionalDate()
            }
            o.push("<tr>");
            for (var m = 1, g = 1; r >= m; m++, g++)m > s && n >= g ? o.push('<td rel="' + g + '"><span class="' + e(g) + '" title="">' + g + "</span></td>") : (o.push("<td></td>"), g--), m % 7 != 0 && m != r || o.push("</tr>");
            return o.join("")
        }
    })), t.extend(M2015.UI.Picker.Calendar, {
        create: function (t) {
            var e = new M2015.UI.Picker.Calendar(t);
            return e
        }
    })
}(jQuery, _, M139), function (t, e, i) {
    var a = t, n = i.View.ViewBase, s = {
        Date: {
            parse: function (t) {
                if (/^\d{10}$/.test(t))return new Date(1e3 * t);
                if (/^\d{13}$/.test(t))return new Date(1 * t);
                t = s.Text.trim(t);
                var e = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/, i = t.match(e);
                if (i) {
                    var a = i[1], n = parseInt(i[2] - 1, 10), o = parseInt(i[3], 10);
                    parseInt(i[4], 10);
                    return new Date(a, n, o)
                }
            }, formatToString: function (t, e) {
                var i = /yyyy|yy|M+|d+|S|w/g;
                return e = e.replace(i, function (e) {
                    var i;
                    switch (e) {
                        case"yyyy":
                            i = t.getFullYear();
                            break;
                        case"yy":
                            i = t.getFullYear().toString().substring(2);
                            break;
                        case"M":
                        case"MM":
                            i = t.getMonth() + 1;
                            break;
                        case"dd":
                        case"d":
                            i = t.getDate();
                            break;
                        default:
                            i = ""
                    }
                    return 2 == e.length && 1 == i.toString().length && (i = "0" + i), i
                })
            }
        }, Text: {
            format: function (t, e) {
                var i;
                return i = a.isArray(e) ? /\{([\d]+)\}/g : /\{([\w]+)\}/g, t.replace(i, function (t, i) {
                    var a = e[i];
                    return void 0 !== a ? a : ""
                })
            }, trim: function (t) {
                for (var t = t, t = t.replace(/^\s\s*/, ""), e = /\s/, i = t.length; e.test(t.charAt(--i)););
                return t.slice(0, i + 1)
            }
        }
    };
    i.namespace("M2012.UI.CalendarSelector", n.extend({
        name: "M2012.UI.CalendarSelector",
        template: {
            main: ['<div id="calendarS_{cid}" class="calendarSelector" style="position:absolute; z-index:9999">', '<div class="calendarPendant" id="datepickerDays" style="display: block;">', '<div class="calendarPendant_top">', '<a href="javascript:void(0);" class="i-calendarPrev" id="prevMonth"><</a>', '<a href="javascript:void(0);" class="i-calendarCurrent" id="dateDisplay">', "</a>", '<a href="javascript:void(0);" class="i-calendarNext" id="nextMonth">></a>', '<input type="hidden" id="currentDate" />', "</div>", '<table class="calendarPendant_table">', "<thead>", "<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>", "</thead>", '<tbody id="dateSelectorTBody"></tbody>', "</table>", "</div>", '<div class="calendarPendant" id="datepickerMonths" style="display: none;">', '<div class="calendarPendant_top">', '<a href="javascript:void(0);" class="i-calendarPrev" id="prevYear"><</a>', '<a href="javascript:void(0);" class="i-calendarCurrent" id="yearDisplay">', "</a>", '<a href="javascript:void(0);" class="i-calendarNext" id="nextYear">></a>', "</div>", '<table class="calendarPendant_other">', '<tbody id="monthSelectorTBody">', "<tr>", "<td><a>1月</a></td>", "<td><a>2月</a></td>", "<td><a>3月</a></td>", "<td><a>4月</a></td>", "</tr>", "<tr>", "<td><a>5月</a></td>", "<td><a>6月</a></td>", "<td><a>7月</a></td>", "<td><a>8月</a></td>", "</tr>", "<tr>", "<td><a>9月</a></td>", "<td><a>10月</a></td>", "<td><a>11月</a></td>", "<td><a>12月</a></td>", "</tr>", "</tbody>", "</table>", "</div>", '<div class="calendarPendant" id="datepickerYears" style="display: none;">', '<div class="calendarPendant_top">', '<a href="javascript:void(0);" class="i-calendarPrev" id="prevRangeYear"><</a>', '<span class="i-calendarCurrenty" id="yearRangeDisplay">', "</span>", '<a href="javascript:void(0);" class="i-calendarNext" id="nextRangeYear">></a>', "</div>", '<table class="calendarPendant_other">', '<tbody id="yearSelectorTBody"></tbody>', "</table>", "</div>"].join(""),
            date: ['<td class="{isSelectable}" title="农历{lunarDateStr}" date="{stringDate}">', '<a class="{isToday}">', "<span>{currentDay}</span>", "<p>{lunarDate}</p>", "</a>", "</td>"].join(""),
            year: ['<td class="{isSelectableYear}" year="{stringYear}">', '<a class="{isThisYear}">{stringYear}</a>', "</td>"].join("")
        },
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        monthNumber: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        minYear: 1901,
        maxYear: 2049,
        initialize: function (t) {
            var e = this;
            if (t || (t = {}), !t.container)throw new Error("[CalendarSelector] container is empty!");
            this.target = a(t.container);
            var i = t.date || new Date;
            return "object" != typeof i && (i = s.Date.parse(i)), this.date = i || new Date, this.dateFormat = t.dateFormat || "yyyy-MM-dd", this.callback = t.callback || function () {
                }, this.direction = t.direction || "Auto", this.cid = Math.floor(1e9 * Math.random()), this.pickerArea = a(s.Text.format(this.template.main, {cid: this.cid})), this.lastTargetTop = this.target.offset().top, this.target.on("click", function (t) {
                e.show()
            }), n.prototype.initialize.apply(this, arguments)
        },
        initEvents: function () {
            var t = this;
            this.prevMonthBtn.on("click", function (e) {
                t.addMonth(-1)
            }), this.nextMonthBtn.on("click", function (e) {
                t.addMonth(1)
            }), this.prevYearBtn.on("click", function (e) {
                t.addYear(-1)
            }), this.nextYearBtn.on("click", function (e) {
                t.addYear(1)
            }), this.prevRangeYearBtn.on("click", function (e) {
                t.addRangeYear(-10)
            }), this.nextRangeYearBtn.on("click", function (e) {
                t.addRangeYear(10)
            }), this.yearSelectorTbodyEl.on("click", "td", function (e) {
                var i = a(e.currentTarget).attr("year");
                i > t.maxYear || i < t.minYear || t.selectYear(i)
            }), this.monthTdBtn.on("click", function (e) {
                t.selectMonth(e)
            }), this.dateSelectorTbodyEl.on("click", "td", function (e) {
                t.changeDate(a(e.currentTarget).attr("date"))
            }), this.monthSelectorTbodyEl.on({
                mouseover: function () {
                    var t = a(this).attr("class");
                    t || a(this).addClass("onHoverDay")
                }, mouseout: function () {
                    a(this).hasClass("onDay") || a(this).removeClass("onHoverDay")
                }
            }, "td a"), this.dateSelectorTbodyEl.on({
                mouseover: function () {
                    a(this).hasClass("onDay") || a(this).addClass("onHoverDay")
                }, mouseout: function () {
                    a(this).hasClass("onDay") || a(this).removeClass("onHoverDay");
                }
            }, "td a"), this.yearSelectorTbodyEl.on({
                mouseover: function () {
                    a(this).hasClass("onDay") || a(this).addClass("onHoverDay")
                }, mouseout: function () {
                    a(this).hasClass("onDay") || a(this).removeClass("onHoverDay")
                }
            }, "td a")
        },
        show: function (t) {
            var e = this;
            t && (t.stopPropagation(), t.preventDefault());
            var i = a("#calendarS_" + this.cid);
            0 == i.length ? (this.pickerArea.appendTo("body"), this.keepElements(), this.hiddenInput.val(s.Date.formatToString(this.date, this.dateFormat)), this.renderAndAddStyle(this.date), this.initEvents()) : (this.renderAndAddStyle(this.date), i.css("display", "block"), this.changeToDateView()), this.place(), a(window).on("resize", function (t) {
                e.place()
            }), this.scrollInterval = setInterval(function () {
                var t = e.target.offset().top;
                t !== e.lastTargetTop && (e.place(), e.lastTargetTop = t)
            }, 500), a(document).keydown(a.proxy(this.keydownHandler, e));
            var n = function (t) {
                0 == a(t.target).closest("#calendarS_" + e.cid).length && e.hide()
            };
            a(document).unbind("mousedown.calSelector").bind("mousedown.calSelector", n), top && a(top.document).unbind("mousedown.calSelector").bind("mousedown.calSelector", n)
        },
        hide: function () {
            a(window).off("resize", this.place), a(document).off("mousedown", this.hide), a(document).off("keydown", this.keydownHandler), window.clearInterval(this.scrollInterval), this.pickerArea.css("display", "none")
        },
        place: function () {
            var t = this.direction, e = {
                height: document.body.clientHeight,
                width: document.body.clientWidth
            }, i = a.extend({
                height: this.target.outerHeight(),
                width: this.target.outerWidth()
            }, this.target.offset()), n = {
                height: this.dateSelectorEl.height(),
                width: this.dateSelectorEl.width()
            }, s = 0, o = 0;
            switch (t) {
                case"Auto":
                    var r = e.height - (i.top + i.height + n.height), l = i.top - n.height;
                    s = 0 > r && l > 0 ? 2 : 0 > r && 0 > l ? 3 : 1;
                    var h = i.left + i.width - n.width, c = e.width - (i.left + n.width);
                    o = h > 0 && 0 > c ? 8 : 0 > h && 0 > c ? 12 : 4;
                    break;
                case"rightBottom":
                    s = 1, o = 4;
                    break;
                case"leftBottom":
                    s = 1, o = 8;
                    break;
                case"centerBottom":
                    s = 1, o = 12;
                    break;
                case"rightTop":
                    s = 2, o = 4;
                    break;
                case"leftTop":
                    s = 2, o = 8;
                    break;
                case"center":
                    s = 3, o = 12;
                    break;
                case"leftCenter":
                    s = 3, o = 8;
                    break;
                case"rightCenter":
                    s = 3, o = 4
            }
            var d = null;
            switch (s | o) {
                case 6:
                    d = {top: i.top - n.height, left: i.left};
                    break;
                case 5:
                    d = {top: i.top + i.height, left: i.left};
                    break;
                case 10:
                    d = {top: i.top - n.height, left: i.left + i.width - n.width};
                    break;
                case 9:
                    d = {top: i.top + i.height, left: i.left + i.width - n.width};
                    break;
                case 13:
                    d = {top: i.top + i.height, left: i.left + (i.width - n.width) / 2};
                    break;
                case 11:
                    d = {top: i.top - (n.height - i.height) / 2, left: i.left - n.width};
                    break;
                case 15:
                    d = {top: i.top - (n.height - i.height) / 2, left: i.left};
                    break;
                case 7:
                    d = {top: i.top - (n.height - i.height) / 2, left: i.left + i.width}
            }
            this.pickerArea.css({top: d.top, left: d.left})
        },
        keepElements: function () {
            var t = this;
            t.prevMonthBtn = a("#prevMonth", this.pickerArea), t.nextMonthBtn = a("#nextMonth", this.pickerArea), t.prevYearBtn = a("#prevYear", this.pickerArea), t.nextYearBtn = a("#nextYear", this.pickerArea), t.prevRangeYearBtn = a("#prevRangeYear", this.pickerArea), t.nextRangeYearBtn = a("#nextRangeYear", this.pickerArea), t.dateDisplayEl = a("#dateDisplay", this.pickerArea), t.yearDisplayEl = a("#yearDisplay", this.pickerArea), t.yearRangeDisplayEl = a("#yearRangeDisplay", this.pickerArea), t.yearSelectorEl = a("#datepickerYears", this.pickerArea), t.yearSelectorTbodyEl = a("#yearSelectorTBody", t.yearSelectorEl), t.dateSelectorEl = a("#datepickerDays", this.pickerArea), t.popView = t.dateSelectorEl, t.dateSelectorTbodyEl = a("#dateSelectorTBody", t.dateSelectorEl), t.monthSelectorEl = a("#datepickerMonths", this.pickerArea), t.monthSelectorTbodyEl = a("#monthSelectorTBody", t.monthSelectorEl), t.hiddenInput = a("#currentDate", t.dateSelectorEl), t.monthTdBtn = a("td", this.monthSelectorTbodyEl)
        },
        renderDateSelectArea: function (t) {
            var e = this;
            "object" != typeof t && console.log("渲染日期必须为对象");
            var i = new Date(t.getFullYear(), t.getMonth(), 1);
            if (this.isSameDate(i)) {
                this.currentDate = i;
                var a = t.getFullYear(), n = 10 * parseInt(a / 10, 10), o = [], r = [];
                e.yearRangeDisplayEl.html(n + "-" + (n + 9)), n -= 1;
                for (var l = 1; 13 > l; l++) {
                    var h = "", c = "", d = "";
                    if (h = 1 === l || 12 === l ? "noDay" : "selectable", e.isToYear(n) && (c = "onDay"), d = s.Text.format(this.template.year, {
                            isSelectableYear: h,
                            isThisYear: c,
                            stringYear: n
                        }), n += 1, r.push(d), l % 4 === 0) {
                        var u = "<tr>" + r.join("") + "</tr>";
                        o.push(u), r = []
                    }
                }
                var p = new Date(i), m = p.getFullYear(), g = p.getMonth(), f = new Date(m, g - 1, 28, 0, 0, 0, 0), v = e.getDaysInMonth(f.getFullYear(), f.getMonth());
                f.setDate(v), f.setDate(v - (f.getDay() + 7) % 7);
                var b = new Date(f);
                b.setDate(b.getDate() + 41);
                for (var y = f, x = b, w = this.daysBetween(y, x), C = [], M = [], I = 0; w >= I; I++) {
                    var S = new Date(y.getFullYear(), y.getMonth(), y.getDate() + I, 12, 0), D = "", _ = "", T = "";
                    _ = S.getMonth() == t.getMonth() ? "selectable" : "noDay";
                    var B = new Lunar(S.getFullYear(), S.getMonth() + 1, S.getDate()), k = B.ldayStr, P = B.lmonthStr, E = P + k;
                    this.isToday(S) ? T = "onDay" : "初一" == k && (T = "startMonth");
                    var $ = s.Date.formatToString(S, "yyyy-MM-dd");
                    if (D = s.Text.format(this.template.date, {
                            isSelectable: _,
                            lunarDateStr: E,
                            stringDate: $,
                            isToday: T,
                            currentDay: S.getDate(),
                            lunarDate: "初一" != k ? k : P
                        }), M.push(D), (I + 1) % 7 == 0) {
                        var u = "<tr>" + M.join("") + "</tr>";
                        C.push(u), M = []
                    }
                }
                this.yearSelectorTbodyEl.html(o.join("")), this.dateSelectorTbodyEl.html(C.join("")), this.dateDisplayEl.html(this.currentDate.getFullYear() + "年" + this.getMonthName(t)), this.yearDisplayEl.html(this.currentDate.getFullYear() + "年"), this.bindRenderEvents(t)
            }
        },
        bindRenderEvents: function (t) {
            var e = this;
            this.dateDisplayEl.on("click", function (i) {
                e.changeToMonthView(), e.hightLightMonth(t);
                var a = t.getFullYear();
                a <= e.minYear ? e.prevYearBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : e.prevYearBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev"), a >= e.maxYear ? e.nextYearBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : e.nextYearBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"), i.stopPropagation()
            }), this.yearDisplayEl.on("click", function (i) {
                e.changeToYearView(), e.hightLightYear(t);
                var a = t.getFullYear();
                a >= e.minYear && a <= e.minYear + 8 ? e.prevRangeYearBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : e.prevRangeYearBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev"), a <= e.maxYear && a >= e.maxYear - 9 ? e.nextRangeYearBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : e.nextRangeYearBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"), i.stopPropagation()
            }), a("td.selectable a", this.dateSelectorTbodyEl).mouseout(function () {
                a(this).hasClass("onDay") || a(this).removeClass("onHoverDay")
            })
        },
        hightLightMonth: function (t, e) {
            var i = a("td a", this.monthSelectorTbodyEl).removeClass("onClick");
            e || t.getFullYear() == this.currentDate.getFullYear() && i.eq(this.monthNumber[t.getMonth()] - 1).addClass("onClick"), i.eq(this.monthNumber[(new Date).getMonth()] - 1).removeClass("onDay"), this.currentDate.getFullYear() === (new Date).getFullYear() && i.eq(this.monthNumber[(new Date).getMonth()] - 1).addClass("onDay")
        },
        hightLightYear: function (t) {
            var e = t.getFullYear();
            a("td.selectable a", this.yearSelectorTbodyEl).removeClass("onClick").removeClass("onHoverDay"), a("td.selectable[year=" + e + "] a", this.yearSelectorTbodyEl).addClass("onClick"), this.currentDate.getFullYear() === (new Date).getFullYear() && a("td.selectable[year=" + this.currentDate.getFullYear() + "] a", this.yearSelectorTbodyEl).addClass("onDay")
        },
        isSameDate: function (t) {
            return !this.currentDate || !(this.currentDate.getFullYear() == t.getFullYear() && this.currentDate.getMonth() == t.getMonth())
        },
        isToday: function (t) {
            var e = t, i = new Date;
            return e.getMonth() == i.getMonth() && e.getFullYear() == i.getFullYear() && e.getDate() == i.getDate()
        },
        isToYear: function (t) {
            return t == (new Date).getFullYear()
        },
        changeToYearView: function () {
            this.dateSelectorEl.hide(), this.monthSelectorEl.hide(), this.yearSelectorEl.show()
        },
        changeToMonthView: function () {
            this.dateSelectorEl.hide(), this.monthSelectorEl.show(), this.yearSelectorEl.hide()
        },
        changeToDateView: function () {
            this.dateSelectorEl.show(), this.monthSelectorEl.hide(), this.yearSelectorEl.hide()
        },
        addMonth: function (t) {
            var e = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + t, this.currentDate.getDate());
            if (!(this.currentDate.getFullYear() <= this.minYear && this.currentDate.getMonth() + t <= -1 || this.currentDate.getFullYear() >= this.maxYear && this.currentDate.getMonth() + t >= 12))return this.nextMonthBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"), this.prevMonthBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev"), this.renderAndAddStyle(this.getSelectedDateObj(), this.clickFromMonthView), this.renderDateSelectArea(e), this.currentDate.getFullYear() <= this.minYear && this.currentDate.getMonth() + t <= -1 ? void this.prevMonthBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : this.currentDate.getFullYear() >= this.maxYear && this.currentDate.getMonth() + t >= 12 ? void this.nextMonthBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : void 0
        },
        renderAndAddStyle: function (t, e) {
            var i = s.Date.formatToString(t, "yyyy-MM-dd");
            this.hiddenInput.val(s.Date.formatToString(t, this.dateFormat)), this.renderDateSelectArea(t), a("td.selectable a", this.dateSelectorTbodyEl).removeClass("onClick").removeClass("onHoverDay"), e || a("td[date=" + i + "] a", this.dateSelectorTbodyEl).addClass("onClick")
        },
        addYear: function (t) {
            if (!(this.currentDate.getFullYear() + t > this.maxYear || this.currentDate.getFullYear() + t <= this.minYear - 1)) {
                this.nextYearBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"), this.prevYearBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev");
                var e = new Date(this.currentDate.getFullYear() + t, this.currentDate.getMonth(), this.currentDate.getDate());
                return this.renderDateSelectArea(e), this.hightLightMonth(this.getSelectedDateObj(), this.clickFromYearView), this.currentDate.getFullYear() + t > this.maxYear ? void this.nextYearBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : this.currentDate.getFullYear() + t <= this.minYear - 1 ? void this.prevYearBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : void 0
            }
        },
        addRangeYear: function (t) {
            if (!(this.currentDate.getFullYear() + t > this.maxYear || this.currentDate.getFullYear() + t < this.minYear - 2)) {
                this.nextRangeYearBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"), this.prevRangeYearBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev");
                var e = new Date(this.currentDate.getFullYear() + t, this.currentDate.getMonth(), this.currentDate.getDate()), i = this.getSelectedDateObj().getFullYear();
                return this.renderDateSelectArea(e), a("td.selectable a", this.yearSelectorTbodyEl).removeClass("onClick").removeClass("onHoverDay"), a("td.selectable[year=" + i + "] a", this.yearSelectorTbodyEl).addClass("onClick"), this.currentDate.getFullYear() + t > this.maxYear ? void this.nextRangeYearBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : this.currentDate.getFullYear() + t < this.minYear - 2 ? void this.prevRangeYearBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : void 0
            }
        },
        selectYear: function (t) {
            var e = new Date(t, this.currentDate.getMonth(), this.getSelectedDateObj().getDate());
            return this.hiddenInput.val(s.Date.formatToString(e, this.dateFormat)), this.renderDateSelectArea(this.getSelectedDateObj()), this.changeToMonthView(), this.clickFromYearView = !0, this.hightLightMonth(e, this.clickFromYearView), t >= this.maxYear ? void this.nextYearBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : (this.nextYearBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"), t <= this.minYear ? void this.prevYearBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : void this.prevYearBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev"))
        },
        selectMonth: function (t) {
            t.stopPropagation();
            var e = a(t.target).closest("a"), i = e[0].innerHTML, n = i.substring(0, i.length - 1), o = new Date(this.currentDate.getFullYear(), n - 1, this.getSelectedDateObj().getDate());
            return this.hiddenInput.val(s.Date.formatToString(o, this.dateFormat)), this.clickFromMonthView = !0, this.renderAndAddStyle(this.getSelectedDateObj(), this.clickFromMonthView), this.changeToDateView(), this.currentDate.getFullYear() <= this.minYear && 1 >= n ? void this.prevMonthBtn.removeClass("i-calendarPrev").addClass("i-calendardisabled") : (this.prevMonthBtn.removeClass("i-calendardisabled").addClass("i-calendarPrev"), this.currentDate.getFullYear() >= this.maxYear && n >= 12 ? void this.nextMonthBtn.removeClass("i-calendarNext").addClass("i-calendardisabled") : void this.nextMonthBtn.removeClass("i-calendardisabled").addClass("i-calendarNext"))
        },
        setDate: function (t) {
            this.date = t
        },
        changeDate: function (t) {
            var e = s.Date.parse(t);
            this.date = e;
            var i = s.Date.formatToString(e, this.dateFormat), a = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate();
            this.hiddenInput.val(i);
            var r = new Lunar(a, n, o), l = r.ldayStr, h = r.lmonthStr, c = r.lyearStr, d = r.hsebYear, u = {
                dateObj: e,
                dateString: i,
                year: a,
                month: n,
                date: o,
                lunarDate: l,
                lunarMonth: h,
                lunarYear: c,
                hsebYear: d
            };
            this.callback(u), this.clickFromMonthView = !1, this.clickFromYearView = !1, this.hide()
        },
        switchTo: function (t) {
            var e = this.getSelectedDateObj(), i = new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
            this.renderAndAddStyle(i)
        },
        getSelectedDateObj: function () {
            return s.Date.parse(this.hiddenInput.val())
        },
        moveDateMonthBy: function (t) {
            var e = this.getSelectedDateObj(), i = new Date(e.getFullYear(), e.getMonth() + t, e.getDate());
            i.getMonth() == e.getMonth() + t + 1 && i.setDate(0), this.renderAndAddStyle(i)
        },
        daysBetween: function (t, e) {
            var t = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), e = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
            return (e - t) / 864e5
        },
        isLeapYear: function (t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        },
        getDaysInMonth: function (t, e) {
            return [31, this.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        getMonthName: function (t) {
            return this.monthNames[t.getMonth()]
        },
        keydownHandler: function (t) {
            switch (t.keyCode) {
                case 9:
                case 27:
                    return void this.hide();
                case 13:
                    this.changeDate(this.hiddenInput.val());
                    break;
                case 33:
                    this.moveDateMonthBy(t.ctrlKey ? -12 : -1);
                    break;
                case 34:
                    this.moveDateMonthBy(t.ctrlKey ? 12 : 1);
                    break;
                case 38:
                    this.switchTo(-7);
                    break;
                case 40:
                    this.switchTo(7);
                    break;
                case 37:
                    this.switchTo(-1);
                    break;
                case 39:
                    this.switchTo(1);
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    })), t.extend(M2012.UI.CalendarSelector, {
        create: function (t) {
            var e = new M2012.UI.CalendarSelector(t);
            return e
        }
    })
}(jQuery, _, M139), function () {
    function t() {
        this.date = 3 != arguments.length ? new Date : new Date(arguments[0], arguments[1] - 1, arguments[2]), this.setLunar()
    }

    t.prototype.HsString = "甲乙丙丁戊己庚辛壬癸".split(""), t.prototype.EbString = "子丑寅卯辰巳午未申酉戌亥".split(""), t.prototype.NumString = "一二三四五六七八九十".split(""), t.prototype.MonString = "正二三四五六七八九十冬腊".split(""), t.prototype.YearString = "零一二三四五六七八九".split(""), t.prototype.Animals = "鼠牛虎兔龙蛇马羊猴鸡狗猪".split(""), t.prototype.Weeks = "日一二三四五六".split(""), t.prototype.WeekStart = "星期", t.prototype.CalendarData = [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984, 27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680, 53584, 62034, 54560], t.prototype.setLunar = function (t) {
        t || this.date || (t = new Date);
        var e = this.getLunar(t);
        this.year = this.date.getFullYear(), this.month = this.date.getMonth() + 1, this.day = this.date.getDate(), this.week = this.date.getDay(), this.isLeap = this.year % 4 === 0, this.isLeapMonth = e.isLeap, this.animal = e.animal, this.lyear = e.lyear, this.lmonth = e.lmonth, this.lday = e.lday, this.lyearStr = this.toLunarYear(this.lyear), this.lmonthStr = this.toLunarMonth(this.lmonth), this.ldayStr = this.toLunarDay(this.lday), this.weekStr = this.toWeekDay(this.week), this.hsebYear = e.yHSEB
    }, t.prototype.leapMonth = function (t) {
        return 15 & this.CalendarData[t - 1900]
    }, t.prototype.leapDays = function (t) {
        return this.leapMonth(t) ? 65536 & this.CalendarData[t - 1900] ? 30 : 29 : 0
    }, t.prototype.leapYearTotalDays = function (t) {
        var e, i = 348;
        for (e = 32768; e > 8; e >>= 1)i += this.CalendarData[t - 1900] & e ? 1 : 0;
        return i + this.leapDays(t)
    }, t.prototype.leapMonthTotalDays = function (t, e) {
        return this.CalendarData[t - 1900] & 65536 >> e ? 30 : 29
    }, t.prototype.getLunar = function (t) {
        t = t || this.date;
        var e, i, a, n, s, o, r, l = 0, h = 0, c = new Date(1900, 0, 31), d = (t - c) / 864e5;
        for (o = d + 40, monCyl = 14, e = 1900; 2050 > e && d > 0; e++)h = this.leapYearTotalDays(e), d -= h, monCyl += 12;
        for (0 > d && (d += h, e--, monCyl -= 12), i = e, s = e - 1864, l = this.leapMonth(e), r = !1, e = 1; 13 > e && d > 0; e++)l > 0 && e == l + 1 && 0 == r ? (--e, r = !0, h = this.leapDays(i)) : h = this.leapMonthTotalDays(i, e), 1 == r && e == l + 1 && (r = !1), d -= h, 0 == r && monCyl++;
        return 0 == d && l > 0 && e == l + 1 && (r ? r = !1 : (r = !0, --e, --monCyl)), 0 > d && (d += h, --e, --monCyl), a = e, n = d + 1, n = Math.floor(n), s = Math.floor(s), monCyl = Math.floor(monCyl), o = Math.floor(o), {
            lyear: i,
            lmonth: a,
            lday: n,
            yHSEB: this.toHseb(i),
            isLeap: r,
            animal: this.Animals[s % 12]
        }
    }, t.prototype.hseb = function (t) {
        return this.HsString[t % 10] + this.EbString[t % 12]
    }, t.prototype.toHseb = function (t) {
        var e = t % 10 - 3, i = t % 12 - 3;
        return 1 > e && (e += 10), 1 > i && (e += 12), this.HsString[e - 1] + this.EbString[i - 1] + "年"
    }, t.prototype.toLunarYear = function (t) {
        if (t) {
            var e = this.YearString;
            return t.toString().replace(/\d{1}/gi, function (t) {
                return e[t]
            })
        }
    }, t.prototype.toLunarMonth = function (t) {
        return this.MonString[t - 1] + "月"
    }, t.prototype.toLunarDay = function (t) {
        var e = "";
        return e = t >= 30 ? "三十" : t > 20 ? "廿" : 20 == t ? "二十" : t > 10 ? "十" : 10 == t ? "初十" : "初", t %= 10, t > 0 && (e += this.NumString[t - 1]), e
    }, t.prototype.toWeekDay = function (t) {
        return this.WeekStart + this.Weeks[t]
    }, window.Lunar = t
}(), function (t) {
    var e = "placeholder" in document.createElement("input"), i = t.browser.opera && t.browser.version < 10.5;
    t.fn.placeholder = function (a) {
        var a = t.extend({}, t.fn.placeholder.defaults, a), n = a.placeholderCSS.left;
        return e ? this : this.each(function () {
            var e = t(this), s = t.trim(e.val()), o = e.width(), r = (e.height(), this.id ? this.id : "placeholder" + +new Date), l = e.attr("placeholder"), h = t("<label for=" + r + ">" + l + "</label>");
            a.placeholderCSS.width = o, a.placeholderCSS.left = !i || "email" != this.type && "url" != this.type ? n : "11%", h.css(a.placeholderCSS), e.wrap(a.inputWrapper), e.attr("id", r).after(h), s && (h.hide(), e.focus()), e.focus(function () {
                t.trim(e.val()) || h.hide()
            }), e.blur(function () {
                t.trim(e.val()) || h.show()
            })
        })
    }, t.fn.placeholder.defaults = {
        inputWrapper: '<span style="position:relative"></span>',
        placeholderCSS: {
            cursor: "text",
            font: "12px",
            color: "#bababa",
            position: "absolute",
            left: "0px",
            top: "0px",
            overflow: "hidden"
        }
    }
}(jQuery), function (t, e, i) {
    var a = t, n = i.View.ViewBase, s = "M2012.UI.Widget.VoiceInput";
    i.namespace(s, n.extend({
        initialize: function (t) {
            this.options = t || {}, void 0 == this.options.autoClose && (this.options.autoClose = !0)
        }, template: "", events: {}, isSupportFlash: function () {
            if (navigator.plugins && navigator.plugins["Shockwave Flash"])return !0;
            try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                return !0
            } catch (t) {
            }
            return !1
        }, getFlashHtml: function (t, e, i, a) {
            var n = a;
            return ['<object codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"', ' width="' + e + '" height="' + i + '" id="' + t + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000">', '<param name="allowScriptAccess" value="always" />', '<param name="movie" value="' + n + '" />', '<param name="quality" value="high" /><param name="allowScriptAccess" value="always" />', '<param name="wmode" value="transparent" />', ' <embed src="' + n + '" quality="high" width="' + e + '" height="' + i + '" wmode="transparent"', ' type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer"', ' name="' + t + '"  >', "</embed>", "</object>"].join("")
        }, getVoiceOption: function () {
            var t = {};
            return this.options.grammarList && (t.grammarList = this.options.grammarList), t
        }, onComplete: function (t) {
            var e = a(this.options.input), i = decodeURIComponent(t.result).replace(/[，。！？]/gi, "");
            e && e.is("input") ? (e.val(e.val() + i), e.focus()) : e.html(e.html() + i), this.options.onComplete && (console.log("oncomplete:" + i), this.options.onComplete(i)), this.options.autoClose && "" != i && this.onCancel()
        }, onCancel: function (t) {
            setTimeout(function () {
                var e = VoiceInput._instance;
                t && t.onCancel && (e = t), e.options.popup && e.options.popup.close()
            }, 100)
        }, render: function () {
            function t() {
                for (var t = 0; t < VoiceInput._instanceList.length; t++) {
                    var s = VoiceInput._instanceList[t];
                    s != n && s.onCancel(s)
                }
                i.UI.Popup.close();
                var o = i.UI.Popup.create({
                    target: a(n.options.button),
                    input: a(n.options.input),
                    autoHide: !0,
                    content: e
                });
                n.options.popup = o, o.render(), o.contentElement.css("z-index", "9000"), o.on("close", function () {
                })
            }

            var e, n = this;
            e = this.isSupportFlash() ? this.getFlashHtml("VoiceInput", 250, 150, top.getRootPath() + "/flash/voice_input.swf?rnd=" + top.sid) : '<div style="width:200px;height:55px;margin-top:20px;margin-bottom:20px">您的浏览器未安装或禁用了flash插件，无法使用语音功能。</div>', this.options.autoCreate ? (VoiceInput.setCurrent(n), t(), BH("voiceinput_" + this.options.from)) : a(this.options.button).click(function () {
                VoiceInput.setCurrent(n), t(), BH("voiceinput_" + n.options.from)
            })
        }
    }))
}(jQuery, _, M139);
var VoiceInput = {
    _instance: null, _instanceList: [], setCurrent: function (t) {
        this._instance = t
    }, create: function (t) {
        return t.from || (t.from = "search"), this._instance = new M2012.UI.Widget.VoiceInput(t), this._instanceList.push(this._instance), this._instance.render(), this._instance
    }, getVoiceOption: function () {
        return this._instance.getVoiceOption()
    }, onComplete: function (t) {
        this._instance.onComplete(t)
    }, onCancel: function () {
        this._instance.onCancel()
    }, close: function (t) {
        this._instance.onCancel()
    }, onInit: function (t) {
    }
};
!function (t, e, i, a) {
    var n = t, s = a.View.ViewBase;
    a.namespace("M2012.UI.Tip.DockTips", s.extend({
        template: ['<div id={id} class="tipsLayer showTips " style="top:20px;left:650px;z-index:50;width:auto:height:auto">', '<div class="tipsLayerMain ">', '<div class="tipsLayerMainInner" style="padding-left:58px;">', '<i id="i_icon" class="i-tipsRemind"></i>', "<dl>", "<dt>{title}</dt>", "<dd>{text}</dd>", "</dl>", "</div>", "</div>", '<i class="i-tipsLayerArrow  {tipsArrow}"></i>', '<a href="javascript:;" class="closeTipsLayerBtn closetip" title="关闭"><i class="i-closeTipsLayer"></i></a>', "</div>"].join(""),
        initialize: function (t) {
            this.options = t || {};
            var e = this.options.id || Math.floor(1e10 * Math.random());
            void 0 == t.autoHide && (t.autoHide = !0), this.el = t.el, this.setCss(), this.poptip(e), this.bindEvents()
        },
        poptip: function (t) {
            var e = {
                id: t,
                title: this.options.title,
                text: this.options.text,
                tipsArrow: this.dirCss
            }, i = $T.format(this.template, e);
            n("body").append(i), this.tips = n("#" + t), "none" == this.options.icon ? (this.tips.find("#i_icon").remove(), this.tips.find(".tipsLayerMainInner").css({padding: "10px"})) : this.options.icon && this.tips.find("#i_icon").removeClass().addClass(this.options.icon), this.dock()
        },
        bindEvents: function () {
            var t = this;
            if (this.options.autoHide && $D.bindAutoHide({
                    action: "click",
                    element: n("#" + t.id),
                    callback: function () {
                        t.tips.remove()
                    }
                }), n(".closetip").click(function () {
                    t.tips.remove()
                }), t.options.link) {
                var e = t.options.link;
                n("#" + e.linkId).click(function () {
                    e.click(), t.tips.remove()
                })
            }
        },
        setCss: function () {
            var t = $D.getQuadrant(this.el[0]) - 1, e = ["tipsTopRArrow", "tipsTopArrow", "tipsBottomArrow", "tipsBottomRArrow"];
            this.dirCss = e[t]
        },
        dock: function () {
            if (this.el.is(":visible")) {
                var t = {direction: "auto", margin: 0};
                this.options.dx && (t.dx = this.options.dx, t.dy = this.options.dy), $D.dockElement(this.el[0], this.tips[0], t)
            } else this.tips.remove()
        }
    })), t.extend(M2012.UI.Tip.DockTips, {
        create: function (t) {
            var e = new M2012.UI.Tip.DockTips(t);
            return e
        }
    })
}(jQuery, Backbone, _, M139), function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    "use strict";
    function e(e, n) {
        function s() {
            return g.update(), r(), g
        }

        function o() {
            x.css(S, g.thumbPosition), f[0].scrollTop = g.contentPosition, b.css(I, g.trackSize), y.css(I, g.trackSize), x.css(I, g.thumbSize)
        }

        function r() {
            w ? f[0].ontouchstart = function (t) {
                1 === t.touches.length && (t.stopPropagation(), c(t.touches[0]))
            } : (x.bind("mousedown", function (t) {
                t.stopPropagation(), c(t)
            }), y.bind("mousedown", function (t) {
                c(t, !0)
            })), t(window).resize(function () {
                g.update("relative")
            }), g.options.wheel && window.addEventListener ? e[0].addEventListener(C, d, !1) : g.options.wheel && (e[0].onmousewheel = d)
        }

        function l() {
            return g.contentPosition > 0
        }

        function h() {
            return g.contentPosition <= g.contentSize - g.viewportSize - 5
        }

        function c(e, i) {
            g.hasContentToSroll && (t("body").addClass("noSelect"), D = i ? x.offset()[S] : M ? e.pageX : e.pageY, w ? (document.ontouchmove = function (t) {
                (g.options.touchLock || l() && h()) && t.preventDefault(), u(t.touches[0])
            }, document.ontouchend = p) : (t(document).bind("mousemove", u), t(document).bind("mouseup", p), x.bind("mouseup", p), y.bind("mouseup", p)), u(e))
        }

        function d(i) {
            if (g.hasContentToSroll) {
                var a = i || window.event, n = -(a.deltaY || a.detail || -1 / 3 * a.wheelDelta) / 40, s = 1 === a.deltaMode ? g.options.wheelSpeed : 1;
                g.contentPosition -= n * s * g.options.wheelSpeed, g.contentPosition = Math.min(g.contentSize - g.viewportSize, Math.max(0, g.contentPosition)), g.thumbPosition = g.contentPosition / g.trackRatio, e.trigger("move"), x.css(S, g.thumbPosition), f[0].scrollTop = g.contentPosition, (g.options.wheelLock || l() && h()) && (a = t.event.fix(a), a.preventDefault())
            }
        }

        function u(t) {
            if (g.hasContentToSroll) {
                var i = M ? t.pageX : t.pageY, a = w ? D - i : i - D, n = Math.min(g.trackSize - g.thumbSize, Math.max(0, g.thumbPosition + a));
                g.contentPosition = n * g.trackRatio, e.trigger("move"), x.css(S, n), f[0].scrollTop = g.contentPosition, t.preventDefault()
            }
        }

        function p() {
            g.thumbPosition = parseInt(x.css(S), 10) || 0, t("body").removeClass("noSelect"), t(document).unbind("mousemove", u), t(document).unbind("mouseup", p), x.unbind("mouseup", p), y.unbind("mouseup", p), document.ontouchmove = document.ontouchend = null
        }

        this.options = t.extend({}, a, n), this._defaults = a, this._name = i;
        var m = t('<div id="scrollbar_' + Math.random() + '" class="tinyscroll_scrollbar"><div class="track"><div class="tinyscroll_thumb"></div></div></div>');
        t(document.body).append(m), e.css("overflow", "hidden");
        var g = this, f = e, v = e, b = m, y = b.find(".track"), x = b.find(".tinyscroll_thumb"), w = "ontouchstart" in document.documentElement, C = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll", M = "x" === this.options.axis, I = M ? "width" : "height", S = M ? "left" : "top", D = 0;
        return this.contentPosition = 0, this.viewportSize = 0, this.contentSize = 0, this.contentRatio = 0, this.trackSize = 0, this.trackRatio = 0, this.thumbSize = 0, this.thumbPosition = 0, this.hasContentToSroll = !1, this.update = function (t) {
            var e = I.charAt(0).toUpperCase() + I.slice(1).toLowerCase();
            switch (this.viewportSize = f[0]["offset" + e], this.contentSize = v[0]["scroll" + e], this.contentRatio = this.viewportSize / this.contentSize, this.trackSize = this.options.trackSize || this.viewportSize, this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, this.options.thumbSize || this.trackSize * this.contentRatio)), this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize), this.hasContentToSroll = this.contentRatio < 1, b.toggleClass("disable", !this.hasContentToSroll), t) {
                case"bottom":
                    this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                    break;
                case"relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;
                default:
                    this.contentPosition = parseInt(t, 10) || 0
            }
            return this.thumbPosition = this.contentPosition / this.trackRatio, b.css({
                top: f.offset().top + this.options.top + "px",
                left: f.width() + f.offset().left + 8 + this.options.left + "px"
            }), o(), g
        }, s()
    }

    var i = "tinyscrollbar", a = {
        axis: "y",
        left: 0,
        top: 0,
        wheel: !0,
        wheelSpeed: 40,
        wheelLock: !0,
        touchLock: !0,
        trackSize: !1,
        thumbSize: !1,
        thumbSizeMin: 20
    };
    t.fn[i] = function (a) {
        return this.each(function () {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new e(t(this), a))
        })
    }
}), function (t) {
    t.fn.m139Check = function (e) {
        var i = {
            checkClass: "chk-m139check",
            labelClass: "i-chooseMo",
            labeledClass: "i-chooseYet",
            lblOtherClass: "",
            lblStyle: "",
            update: !1
        };
        e = t.extend(i, e);
        var a = function (t) {
            var i = t.next();
            t.is(":checked") ? i.addClass(e.labeledClass) : i.removeClass(e.labeledClass)
        }, n = function (i) {
            if (!i.hasClass(e.checkClass)) {
                var a = i.attr("id"), n = e.labelClass, s = e.lblStyle;
                a || (a = "id_" + Math.round(1e16 * Math.random()), i.attr("id", a)), i.is(":checked") && (n = e.labelClass + " " + e.labeledClass);
                var o = "lbl_" + a, r = t('<label id="' + o + '" for="' + a + '" class="' + n + '" style="' + s + '">&nbsp;&nbsp;&nbsp;&nbsp;</label>');
                if (t("#" + o).length > 0)return !1;
                i.addClass(e.checkClass).after(r), r.addClass(e.lblOtherClass), r.click(function () {
                    var e = t(this).prev();
                    e.change()
                }), i.change(function (i) {
                    var a = i ? i.target : window.event ? window.event.srcElement : null;
                    t(a).is(":checked") ? t(a).next().addClass(e.labeledClass) : t(a).next().removeClass(e.labeledClass)
                }), e.initCallback && e.initCallback(i)
            }
        };
        return this.each(function () {
            e.update ? a(t(this)) : n(t(this))
        })
    }
}(jQuery), function (t, e, i) {
    var a = i.View.ViewBase, n = "M2012.UI.ContactAvatar";
    i.namespace(n, a.extend({
        name: n,
        initialize: function (t) {
            this.options = t || {}, this.model = new Backbone.Model;
            var e = {
                grayUrl: this.options.grayUrl || "../../images/global/face.png",
                errorUrl: this.options.grayUrl || "../../images/global/face.png",
                bgColor: this.options.bgColor || ["#df574d", "#ed9036", "#47ab52", "#926ec2", "#36b990", "#5792c9"],
                width: parseInt(this.options.width) || 40,
                height: parseInt(this.options.height) || 40,
                borderRadius: this.options.borderRadius || "4px",
                isErrorUrl: this.options.isError || !1
            };
            return this.model.set(e), this.contactsModel = M2012.Contacts.getModel(), a.prototype.initialize.apply(this, arguments)
        },
        template: {
            div: '<div class="avatar-ry avatar-div" style="border-radius:<%= borderRadius %>;width:<%= width %>;height:<%= height %>;line-height:<%= lineHeight %>;font-size:<%= fontSize %>;background-color:<%= backgroundColor %>;text-align:center;color:#FFF;"><%- name %></div>',
            image: '<img class="avatar-ry avatar-image" src="<%= url %>" style="border-radius:<%= borderRadius %>;width:<%= width %>;height:<%= height %>;"<% if(isErrorUrl){ %> onerror="this.onerror=null;this.src=\'<%= errorUrl %>\';"<% } %> />'
        },
        render: function () {
            var t = this.options, e = "";
            if ("none" == t.module) {
                var i = this.getName(), a = this.getFontSize(i), n = this.getBgColor();
                return e = this.renderDiv(a, n, i.str)
            }
            var s = this.requestAvatarUrl(), o = this.getUserImageUrl(s), r = this.urlType(o);
            switch (r) {
                case"system":
                case"ad":
                case"custom":
                case"ignore":
                case"unKnow":
                    e = this.renderImage(o);
                    break;
                case"default":
                    var i = this.getName(), a = this.getFontSize(i), n = this.getBgColor(s);
                    e = i && i.str ? this.renderDiv(a, n, i.str) : this.renderGary();
                    break;
                default:
                    e = this.renderGary()
            }
            return e
        },
        renderGary: function () {
            var t = e.template(this.template.image), i = t({
                width: this.model.get("width") + "px",
                height: this.model.get("height") + "px",
                borderRadius: this.model.get("borderRadius"),
                url: this.model.get("grayUrl"),
                isErrorUrl: !1
            });
            return i
        },
        renderImage: function (t) {
            var i = e.template(this.template.image), a = i({
                width: this.model.get("width") + "px",
                height: this.model.get("height") + "px",
                borderRadius: this.model.get("borderRadius"),
                errorUrl: this.model.get("errorUrl"),
                url: t,
                isErrorUrl: this.model.get("isErrorUrl") || !0
            });
            return a
        },
        renderDiv: function (t, i, a) {
            var n = e.template(this.template.div), s = n({
                width: this.model.get("width") + "px",
                height: this.model.get("height") + "px",
                lineHeight: this.model.get("height") - 1 + "px",
                borderRadius: this.model.get("borderRadius"),
                fontSize: t + "px",
                backgroundColor: i,
                name: a
            });
            return s
        },
        requestAvatarUrl: function () {
            var t = this.options, e = "";
            if (t.url)e = t.url; else if (this.contactsModel.isLoaded())if (t.serialId) {
                var i = this.contactsModel.getContactsById(t.serialId);
                e = i ? i.ImagePath || i.ImageUrl || "" : ""
            } else if (t.email) {
                var i = this.contactsModel.getContactsByEmail(t.email);
                i && i.length && (e = i[0].ImagePath || i[0].ImageUrl || "")
            }
            return e
        },
        getUserImageUrl: function (t) {
            return t && t.indexOf("https://") >= 0 ? t : t ? top.$Url.correctUrl(t) : ""
        },
        getFontSize: function (t) {
            var e = this.model.get("width"), i = this.model.get("height"), a = Math.floor(Math.min(e, i) / 1.8), n = 12 > a ? 12 : a;
            return "en" == t.type ? n += 4 : "num" == t.type && (n = 12 > n - 2 ? 12 : n - 2),
                n
        },
        getUnicode: function (e) {
            var i = e.lastIndexOf("_");
            if (0 > i)return 0;
            var a = e.substr(i + 1), n = a.lastIndexOf(".");
            a = a.substr(0, n);
            var s = a.split(""), o = "", r = [1, 4, 5];
            return t.each(r, function (t, e) {
                e <= s.length && (o += s[e].charCodeAt())
            }), o ? parseInt(o) : 0
        },
        getBgColor: function (t) {
            var e = this.getUnicode(t), i = this.model.get("bgColor").length, a = e % i;
            return this.model.get("bgColor")[a]
        },
        urlType: function (t) {
            return t ? /\/\bCommonHeadImage\b\//.test(t) ? /\/\bdefault\b\//.test(t) ? "system" : /\/\bcommonimage\b\//.test(t) ? "ad" : /\.\bgif\b/.test(t) ? "default" : "ignore" : /\/\bPhoto\b\/[0-9]+/.test(t) ? "custom" : "unKnow" : "noUrl"
        },
        getName: function () {
            var t, e = this.options, a = "";
            if (e.name)a = e.name; else if (e.serialId)t = this.contactsModel.getContactsById(e.serialId), t && (a = t.name); else if (e.email) {
                var n = e.email.replace('"', "").replace('"', ""), s = i.Text.Email.getEmail(n), o = i.Text.Email.getName(n);
                t = this.contactsModel.getContactsByEmail(s), t && t.length ? (a = t[0].name, e.serialId = t[0].SerialId) : a = o
            }
            var r = /[\u4e00-\u9fa5|a-z|A-Z|0-9]+/.exec(a), l = {};
            if (null != r) {
                var h = r[0], c = h.length;
                if (/^[\u4e00-\u9fa5]/.test(h))l.str = h.substr(0, 1), l.type = "zh"; else if (/^[a-z|A-Z]/.test(h))l.str = h.substr(0, 1).toUpperCase(), l.type = "en"; else {
                    if (l.type = "num", 1 == c)return l.str = h.substr(0, 1), l;
                    var d = h.substr(1, 1);
                    /[0-9]/.test(d) ? l.str = h.substr(0, 2) : /[a-z|A-Z]/.test(d) ? l.str = h.substr(0, 2) : l.str = h.substr(0, 1)
                }
            } else l.str = "", l.type = "none";
            return l
        }
    })), t.extend(M2012.UI.ContactAvatar, {
        create: function (t) {
            var e = new M2012.UI.ContactAvatar(t);
            return e
        }
    })
}(jQuery, _, M139);