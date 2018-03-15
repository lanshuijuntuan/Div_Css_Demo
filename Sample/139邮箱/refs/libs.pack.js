/*! jQuery v3.2 jquery.com | jquery.org/license */
(function (e, t) {
    function _(e) {
        var t = M[e] = {};
        return v.each(e.split(y), function (e, n) {
            t[n] = !0
        }),
            t
    }
    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
                } catch (s) { }
                v.data(e, n, r)
            } else
                r = t
        }
        return r
    }
    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t]))
                continue; if (t !== "toJSON")
                return !1
        }
        return !0
    }
    function et() {
        return !1
    }
    function tt() {
        return !0
    }
    function ut(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }
    function at(e, t) {
        do
            e = e[t];
        while (e && e.nodeType !== 1); return e
    }
    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t))
            return v.grep(e, function (e, r) {
                var i = !!t.call(e, r, e);
                return i === n
            });
        if (t.nodeType)
            return v.grep(e, function (e, r) {
                return e === t === n
            });
        if (typeof t == "string") {
            var r = v.grep(e, function (e) {
                return e.nodeType === 1
            });
            if (it.test(t))
                return v.filter(t, r, !n);
            t = v.filter(t, r)
        }
        return v.grep(e, function (e, r) {
            return v.inArray(e, t) >= 0 === n
        })
    }
    function lt(e) {
        var t = ct.split("|")
            , n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length)
                n.createElement(t.pop());
        return n
    }
    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }
    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e))
            return;
        var n, r, i, s = v._data(e), o = v._data(t, s), u = s.events;
        if (u) {
            delete o.handle,
                o.events = {};
            for (n in u)
                for (r = 0,
                    i = u[n].length; r < i; r++)
                    v.event.add(t, n, u[n][r])
        }
        o.data && (o.data = v.extend({}, o.data))
    }
    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1)
            return;
        t.clearAttributes && t.clearAttributes(),
            t.mergeAttributes && t.mergeAttributes(e),
            n = t.nodeName.toLowerCase(),
            n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML),
                v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
                    t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text),
            t.removeAttribute(v.expando)
    }
    function Mt(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }
    function _t(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked)
    }
    function Qt(e, t) {
        if (t in e)
            return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1)
            , r = t
            , i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e)
                return t
        }
        return r
    }
    function Gt(e, t) {
        return e = t || e,
            v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
    }
    function Yt(e, t) {
        var n, r, i = [], s = 0, o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style)
                continue; i[s] = v._data(n, "olddisplay"),
                    t ? (!i[s] && n.style.display === "none" && (n.style.display = ""),
                        n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"),
                            !i[s] && r !== "none" && v._data(n, "olddisplay", r))
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style)
                continue; if (!t || n.style.display === "none" || n.style.display === "")
                n.style.display = t ? i[s] || "" : "none"
        }
        return e
    }
    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0
            , s = 0;
        for (; i < 4; i += 2)
            n === "margin" && (s += v.css(e, n + $t[i], !0)),
                r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0),
                    n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0,
                        n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
        return s
    }
    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight
            , i = !0
            , s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null)
                r = e.style[t];
            if (Ut.test(r))
                return r;
            i = s && (v.support.boxSizingReliable || r === e.style[t]),
                r = parseFloat(r) || 0
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
    }
    function nn(e) {
        if (Wt[e])
            return Wt[e];
        var t = v("<" + e + ">").appendTo(i.body)
            , n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Ht || !Pt.createElement)
                Ht = (Pt.contentWindow || Pt.contentDocument).document,
                    Ht.write("<!doctype html><html><body>"),
                    Ht.close();
            t = Ht.body.appendChild(Ht.createElement(e)),
                n = Dt(t, "display"),
                i.body.removeChild(Pt)
        }
        return Wt[e] = n,
            n
    }
    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t))
            v.each(t, function (t, i) {
                n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
            });
        else if (!n && v.type(t) === "object")
            for (i in t)
                fn(e + "[" + i + "]", t[i], n, r);
        else
            r(e, t)
    }
    function Cn(e) {
        return function (t, n) {
            typeof t != "string" && (n = t,
                t = "*");
            var r, i, s, o = t.toLowerCase().split(y), u = 0, a = o.length;
            if (v.isFunction(n))
                for (; u < a; u++)
                    r = o[u],
                        s = /^\+/.test(r),
                        s && (r = r.substr(1) || "*"),
                        i = e[r] = e[r] || [],
                        i[s ? "unshift" : "push"](n)
        }
    }
    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0],
            o = o || {},
            o[s] = !0;
        var u, a = e[s], f = 0, l = a ? a.length : 0, c = e === Sn;
        for (; f < l && (c || !u); f++)
            u = a[f](n, r, i),
                typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u),
                    u = kn(e, n, r, i, u, o)));
        return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)),
            u
    }
    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n)
            n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        i && v.extend(!0, e, i)
    }
    function An(e, n, r) {
        var i, s, o, u, a = e.contents, f = e.dataTypes, l = e.responseFields;
        for (s in l)
            s in r && (n[l[s]] = r[s]);
        while (f[0] === "*")
            f.shift(),
                i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        if (i)
            for (s in a)
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break
                }
        if (f[0] in r)
            o = f[0];
        else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        }
        if (o)
            return o !== f[0] && f.unshift(o),
                r[o]
    }
    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(), u = o[0], a = {}, f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1])
            for (n in e.converters)
                a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];)
            if (i !== "*") {
                if (u !== "*" && u !== i) {
                    n = a[u + " " + i] || a["* " + i];
                    if (!n)
                        for (r in a) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = a[u + " " + s[0]] || a["* " + s[0]];
                                if (n) {
                                    n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0],
                                        o.splice(f--, 0, i));
                                    break
                                }
                            }
                        }
                    if (n !== !0)
                        if (n && e["throws"])
                            t = n(t);
                        else
                            try {
                                t = n(t)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: n ? l : "No conversion from " + u + " to " + i
                                }
                            }
                }
                u = i
            }
        return {
            state: "success",
            data: t
        }
    }
    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) { }
    }
    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) { }
    }
    function $n() {
        return setTimeout(function () {
            qn = t
        }, 0),
            qn = v.now()
    }
    function Jn(e, t) {
        v.each(t, function (t, n) {
            var r = (Vn[t] || []).concat(Vn["*"])
                , i = 0
                , s = r.length;
            for (; i < s; i++)
                if (r[i].call(e, t, n))
                    return
        })
    }
    function Kn(e, t, n) {
        var r, i = 0, s = 0, o = Xn.length, u = v.Deferred().always(function () {
            delete a.elem
        }), a = function () {
            var t = qn || $n()
                , n = Math.max(0, f.startTime + f.duration - t)
                , r = n / f.duration || 0
                , i = 1 - r
                , s = 0
                , o = f.tweens.length;
            for (; s < o; s++)
                f.tweens[s].run(i);
            return u.notifyWith(e, [f, i, n]),
                i < 1 && o ? n : (u.resolveWith(e, [f]),
                    !1)
        }
            , f = u.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: qn || $n(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n, r) {
                    var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(i),
                        i
                },
                stop: function (t) {
                    var n = 0
                        , r = t ? f.tweens.length : 0;
                    for (; n < r; n++)
                        f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]),
                        this
                }
            }), l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r)
                return r
        }
        return Jn(f, l),
            v.isFunction(f.opts.start) && f.opts.start.call(e, f),
            v.fx.timer(v.extend(a, {
                anim: f,
                queue: f.opts.queue,
                elem: e
            })),
            f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }
    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n),
                i = t[r],
                s = e[n],
                v.isArray(s) && (i = s[1],
                    s = e[n] = s[0]),
                n !== r && (e[r] = s,
                    delete e[n]),
                o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s),
                    delete e[r];
                for (n in s)
                    n in e || (e[n] = s[n],
                        t[n] = i)
            } else
                t[r] = i
        }
    }
    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this, p = e.style, d = {}, m = [], g = e.nodeType && Gt(e);
        n.queue || (l = v._queueHooks(e, "fx"),
            l.unqueued == null && (l.unqueued = 0,
                c = l.empty.fire,
                l.empty.fire = function () {
                    l.unqueued || c()
                }
            ),
            l.unqueued++ ,
            h.always(function () {
                h.always(function () {
                    l.unqueued-- ,
                        v.queue(e, "fx").length || l.empty.fire()
                })
            })),
            e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY],
                v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)),
            n.overflow && (p.overflow = "hidden",
                v.support.shrinkWrapBlocks || h.done(function () {
                    p.overflow = n.overflow[0],
                        p.overflowX = n.overflow[1],
                        p.overflowY = n.overflow[2]
                }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r],
                    a = a || s === "toggle";
                if (s === (g ? "hide" : "show"))
                    continue; m.push(r)
            }
        }
        o = m.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}),
                "hidden" in u && (g = u.hidden),
                a && (u.hidden = !g),
                g ? v(e).show() : h.done(function () {
                    v(e).hide()
                }),
                h.done(function () {
                    var t;
                    v.removeData(e, "fxshow", !0);
                    for (t in d)
                        v.style(e, t, d[t])
                });
            for (r = 0; r < o; r++)
                i = m[r],
                    f = h.createTween(i, g ? u[i] : 0),
                    d[i] = u[i] || v.style(e, i),
                    i in u || (u[i] = f.start,
                        g && (f.end = f.start,
                            f.start = i === "width" || i === "height" ? 1 : 0))
        }
    }
    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }
    function Zn(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t)
            n = $t[i],
                r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
            r
    }
    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n, r, i = e.document, s = e.location, o = e.navigator, u = e.jQuery, a = e.$, f = Array.prototype.push, l = Array.prototype.slice, c = Array.prototype.indexOf, h = Object.prototype.toString, p = Object.prototype.hasOwnProperty, d = String.prototype.trim, v = function (e, t) {
        return new v.fn.init(e, t, n)
    }
        , m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, g = /\S/, y = /\s+/, b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, S = /^[\],:{}\s]*$/, x = /(?:^|:|,)(?:\s*\[)+/g, T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, C = /^-ms-/, k = /-([\da-z])/gi, L = function (e, t) {
            return (t + "").toUpperCase()
        }
        , A = function () {
            i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1),
                v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A),
                    v.ready())
        }
        , O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function (e, n, r) {
            var s, o, u, a;
            if (!e)
                return this;
            if (e.nodeType)
                return this.context = this[0] = e,
                    this.length = 1,
                    this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
                if (s && (s[1] || !n)) {
                    if (s[1])
                        return n = n instanceof v ? n[0] : n,
                            a = n && n.nodeType ? n.ownerDocument || n : i,
                            e = v.parseHTML(s[1], a, !0),
                            E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0),
                            v.merge(this, e);
                    o = i.getElementById(s[2]);
                    if (o && o.parentNode) {
                        if (o.id !== s[2])
                            return r.find(e);
                        this.length = 1,
                            this[0] = o
                    }
                    return this.context = i,
                        this.selector = e,
                        this
                }
                return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
            }
            return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector,
                this.context = e.context),
                v.makeArray(e, this))
        },
        selector: "",
        jquery: "3.2",
        length: 0,
        size: function () {
            return this.length
        },
        toArray: function () {
            return l.call(this)
        },
        get: function (e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function (e, t, n) {
            var r = v.merge(this.constructor(), e);
            return r.prevObject = this,
                r.context = this.context,
                t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"),
                r
        },
        each: function (e, t) {
            return v.each(this, e, t)
        },
        ready: function (e) {
            return v.ready.promise().done(e),
                this
        },
        eq: function (e) {
            return e = +e,
                e === -1 ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        slice: function () {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
        },
        map: function (e) {
            return this.pushStack(v.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    },
        v.fn.init.prototype = v.fn,
        v.extend = v.fn.extend = function () {
            var e, n, r, i, s, o, u = arguments[0] || {}, a = 1, f = arguments.length, l = !1;
            typeof u == "boolean" && (l = u,
                u = arguments[1] || {},
                a = 2),
                typeof u != "object" && !v.isFunction(u) && (u = {}),
                f === a && (u = this,
                    --a);
            for (; a < f; a++)
                if ((e = arguments[a]) != null)
                    for (n in e) {
                        r = u[n],
                            i = e[n];
                        if (u === i)
                            continue; l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1,
                                o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {},
                                u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
                    }
            return u
        }
        ,
        v.extend({
            noConflict: function (t) {
                return e.$ === v && (e.$ = a),
                    t && e.jQuery === v && (e.jQuery = u),
                    v
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? v.readyWait++ : v.ready(!0)
            },
            ready: function (e) {
                if (e === !0 ? --v.readyWait : v.isReady)
                    return;
                if (!i.body)
                    return setTimeout(v.ready, 1);
                v.isReady = !0;
                if (e !== !0 && --v.readyWait > 0)
                    return;
                r.resolveWith(i, [v]),
                    v.fn.trigger && v(i).trigger("ready").off("ready")
            },
            isFunction: function (e) {
                return v.type(e) === "function"
            },
            isArray: Array.isArray || function (e) {
                return v.type(e) === "array"
            }
            ,
            isWindow: function (e) {
                return e != null && e == e.window
            },
            isNumeric: function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            },
            type: function (e) {
                return e == null ? String(e) : O[h.call(e)] || "object"
            },
            isPlainObject: function (e) {
                if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e))
                    return !1;
                try {
                    if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (n) {
                    return !1
                }
                var r;
                for (r in e)
                    ;
                return r === t || p.call(e, r)
            },
            isEmptyObject: function (e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            error: function (e) {
                throw new Error(e)
            },
            parseHTML: function (e, t, n) {
                var r;
                return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t,
                    t = 0),
                    t = t || i,
                    (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []),
                        v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
            },
            parseJSON: function (t) {
                if (!t || typeof t != "string")
                    return null;
                t = v.trim(t);
                if (e.JSON && e.JSON.parse)
                    return e.JSON.parse(t);
                if (S.test(t.replace(T, "@").replace(N, "]").replace(x, "")))
                    return (new Function("return " + t))();
                v.error("Invalid JSON: " + t)
            },
            parseXML: function (n) {
                var r, i;
                if (!n || typeof n != "string")
                    return null;
                try {
                    e.DOMParser ? (i = new DOMParser,
                        r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"),
                            r.async = "false",
                            r.loadXML(n))
                } catch (s) {
                    r = t
                }
                return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n),
                    r
            },
            noop: function () { },
            globalEval: function (t) {
                t && g.test(t) && (e.execScript || function (t) {
                    e.eval.call(e, t)
                }
                )(t)
            },
            camelCase: function (e) {
                return e.replace(C, "ms-").replace(k, L)
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function (e, n, r) {
                var i, s = 0, o = e.length, u = o === t || v.isFunction(e);
                if (r) {
                    if (u) {
                        for (i in e)
                            if (n.apply(e[i], r) === !1)
                                break
                    } else
                        for (; s < o;)
                            if (n.apply(e[s++], r) === !1)
                                break
                } else if (u) {
                    for (i in e)
                        if (n.call(e[i], i, e[i]) === !1)
                            break
                } else
                    for (; s < o;)
                        if (n.call(e[s], s, e[s++]) === !1)
                            break;
                return e
            },
            trim: d && !d.call("\ufeff\u00a0") ? function (e) {
                return e == null ? "" : d.call(e)
            }
                : function (e) {
                    return e == null ? "" : (e + "").replace(b, "")
                }
            ,
            makeArray: function (e, t) {
                var n, r = t || [];
                return e != null && (n = v.type(e),
                    e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)),
                    r
            },
            inArray: function (e, t, n) {
                var r;
                if (t) {
                    if (c)
                        return c.call(t, e, n);
                    r = t.length,
                        n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                    for (; n < r; n++)
                        if (n in t && t[n] === e)
                            return n
                }
                return -1
            },
            merge: function (e, n) {
                var r = n.length
                    , i = e.length
                    , s = 0;
                if (typeof r == "number")
                    for (; s < r; s++)
                        e[i++] = n[s];
                else
                    while (n[s] !== t)
                        e[i++] = n[s++];
                return e.length = i,
                    e
            },
            grep: function (e, t, n) {
                var r, i = [], s = 0, o = e.length;
                n = !!n;
                for (; s < o; s++)
                    r = !!t(e[s], s),
                        n !== r && i.push(e[s]);
                return i
            },
            map: function (e, n, r) {
                var i, s, o = [], u = 0, a = e.length, f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
                if (f)
                    for (; u < a; u++)
                        i = n(e[u], u, r),
                            i != null && (o[o.length] = i);
                else
                    for (s in e)
                        i = n(e[s], s, r),
                            i != null && (o[o.length] = i);
                return o.concat.apply([], o)
            },
            guid: 1,
            proxy: function (e, n) {
                var r, i, s;
                return typeof n == "string" && (r = e[n],
                    n = e,
                    e = r),
                    v.isFunction(e) ? (i = l.call(arguments, 2),
                        s = function () {
                            return e.apply(n, i.concat(l.call(arguments)))
                        }
                        ,
                        s.guid = e.guid = e.guid || v.guid++ ,
                        s) : t
            },
            access: function (e, n, r, i, s, o, u) {
                var a, f = r == null, l = 0, c = e.length;
                if (r && typeof r == "object") {
                    for (l in r)
                        v.access(e, n, l, r[l], 1, o, i);
                    s = 1
                } else if (i !== t) {
                    a = u === t && v.isFunction(i),
                        f && (a ? (a = n,
                            n = function (e, t, n) {
                                return a.call(v(e), n)
                            }
                        ) : (n.call(e, i),
                            n = null));
                    if (n)
                        for (; l < c; l++)
                            n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
                    s = 1
                }
                return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
            },
            now: function () {
                return (new Date).getTime()
            }
        }),
        v.ready.promise = function (t) {
            if (!r) {
                r = v.Deferred();
                if (i.readyState === "complete")
                    setTimeout(v.ready, 1);
                else if (i.addEventListener)
                    i.addEventListener("DOMContentLoaded", A, !1),
                        e.addEventListener("load", v.ready, !1);
                else {
                    i.attachEvent("onreadystatechange", A),
                        e.attachEvent("onload", v.ready);
                    var n = !1;
                    try {
                        n = e.frameElement == null && i.documentElement
                    } catch (s) { }
                    n && n.doScroll && function o() {
                        if (!v.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (e) {
                                return setTimeout(o, 50)
                            }
                            v.ready()
                        }
                    }()
                }
            }
            return r.promise(t)
        }
        ,
        v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
            O["[object " + t + "]"] = t.toLowerCase()
        }),
        n = v(i);
    var M = {};
    v.Callbacks = function (e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [], f = !e.once && [], l = function (t) {
            n = e.memory && t,
                r = !0,
                u = s || 0,
                s = 0,
                o = a.length,
                i = !0;
            for (; a && u < o; u++)
                if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                    n = !1;
                    break
                }
            i = !1,
                a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
        }
            , c = {
                add: function () {
                    if (a) {
                        var t = a.length;
                        (function r(t) {
                            v.each(t, function (t, n) {
                                var i = v.type(n);
                                i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n)
                            })
                        })(arguments),
                            i ? o = a.length : n && (s = t,
                                l(n))
                    }
                    return this
                },
                remove: function () {
                    return a && v.each(arguments, function (e, t) {
                        var n;
                        while ((n = v.inArray(t, a, n)) > -1)
                            a.splice(n, 1),
                                i && (n <= o && o-- ,
                                    n <= u && u--)
                    }),
                        this
                },
                has: function (e) {
                    return v.inArray(e, a) > -1
                },
                empty: function () {
                    return a = [],
                        this
                },
                disable: function () {
                    return a = f = n = t,
                        this
                },
                disabled: function () {
                    return !a
                },
                lock: function () {
                    return f = t,
                        n || c.disable(),
                        this
                },
                locked: function () {
                    return !f
                },
                fireWith: function (e, t) {
                    return t = t || [],
                        t = [e, t.slice ? t.slice() : t],
                        a && (!r || f) && (i ? f.push(t) : l(t)),
                        this
                },
                fire: function () {
                    return c.fireWith(this, arguments),
                        this
                },
                fired: function () {
                    return !!r
                }
            };
        return c
    }
        ,
        v.extend({
            Deferred: function (e) {
                var t = [["resolve", "done", v.Callbacks("once memory"), "resolved"], ["reject", "fail", v.Callbacks("once memory"), "rejected"], ["notify", "progress", v.Callbacks("memory")]]
                    , n = "pending"
                    , r = {
                        state: function () {
                            return n
                        },
                        always: function () {
                            return i.done(arguments).fail(arguments),
                                this
                        },
                        then: function () {
                            var e = arguments;
                            return v.Deferred(function (n) {
                                v.each(t, function (t, r) {
                                    var s = r[0]
                                        , o = e[t];
                                    i[r[1]](v.isFunction(o) ? function () {
                                        var e = o.apply(this, arguments);
                                        e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
                                    }
                                        : n[s])
                                }),
                                    e = null
                            }).promise()
                        },
                        promise: function (e) {
                            return e != null ? v.extend(e, r) : r
                        }
                    }
                    , i = {};
                return r.pipe = r.then,
                    v.each(t, function (e, s) {
                        var o = s[2]
                            , u = s[3];
                        r[s[1]] = o.add,
                            u && o.add(function () {
                                n = u
                            }, t[e ^ 1][2].disable, t[2][2].lock),
                            i[s[0]] = o.fire,
                            i[s[0] + "With"] = o.fireWith
                    }),
                    r.promise(i),
                    e && e.call(i, i),
                    i
            },
            when: function (e) {
                var t = 0, n = l.call(arguments), r = n.length, i = r !== 1 || e && v.isFunction(e.promise) ? r : 0, s = i === 1 ? e : v.Deferred(), o = function (e, t, n) {
                    return function (r) {
                        t[e] = this,
                            n[e] = arguments.length > 1 ? l.call(arguments) : r,
                            n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                }
                    , u, a, f;
                if (r > 1) {
                    u = new Array(r),
                        a = new Array(r),
                        f = new Array(r);
                    for (; t < r; t++)
                        n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
                }
                return i || s.resolveWith(f, n),
                    s.promise()
            }
        }),
        v.support = function () {
            var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
            p.setAttribute("className", "t"),
                p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                n = p.getElementsByTagName("*"),
                r = p.getElementsByTagName("a")[0];
            if (!n || !r || !n.length)
                return {};
            s = i.createElement("select"),
                o = s.appendChild(i.createElement("option")),
                u = p.getElementsByTagName("input")[0],
                r.style.cssText = "top:1px;float:left;opacity:.5",
                t = {
                    leadingWhitespace: p.firstChild.nodeType === 3,
                    tbody: !p.getElementsByTagName("tbody").length,
                    htmlSerialize: !!p.getElementsByTagName("link").length,
                    style: /top/.test(r.getAttribute("style")),
                    hrefNormalized: r.getAttribute("href") === "/a",
                    opacity: /^0.5/.test(r.style.opacity),
                    cssFloat: !!r.style.cssFloat,
                    checkOn: u.value === "on",
                    optSelected: o.selected,
                    getSetAttribute: p.className !== "t",
                    enctype: !!i.createElement("form").enctype,
                    html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
                    boxModel: i.compatMode === "CSS1Compat",
                    submitBubbles: !0,
                    changeBubbles: !0,
                    focusinBubbles: !1,
                    deleteExpando: !0,
                    noCloneEvent: !0,
                    inlineBlockNeedsLayout: !1,
                    shrinkWrapBlocks: !1,
                    reliableMarginRight: !0,
                    boxSizingReliable: !0,
                    pixelPosition: !1
                },
                u.checked = !0,
                t.noCloneChecked = u.cloneNode(!0).checked,
                s.disabled = !0,
                t.optDisabled = !o.disabled;
            try {
                delete p.test
            } catch (d) {
                t.deleteExpando = !1
            }
            !p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function () {
                t.noCloneEvent = !1
            }
            ),
                p.cloneNode(!0).fireEvent("onclick"),
                p.detachEvent("onclick", h)),
                u = i.createElement("input"),
                u.value = "t",
                u.setAttribute("type", "radio"),
                t.radioValue = u.value === "t",
                u.setAttribute("checked", "checked"),
                u.setAttribute("name", "t"),
                p.appendChild(u),
                a = i.createDocumentFragment(),
                a.appendChild(p.lastChild),
                t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
                t.appendChecked = u.checked,
                a.removeChild(u),
                a.appendChild(p);
            if (p.attachEvent)
                for (l in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                })
                    f = "on" + l,
                        c = f in p,
                        c || (p.setAttribute(f, "return;"),
                            c = typeof p[f] == "function"),
                        t[l + "Bubbles"] = c;
            return v(function () {
                var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;", a = i.getElementsByTagName("body")[0];
                if (!a)
                    return;
                n = i.createElement("div"),
                    n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
                    a.insertBefore(n, a.firstChild),
                    r = i.createElement("div"),
                    n.appendChild(r),
                    r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                    s = r.getElementsByTagName("td"),
                    s[0].style.cssText = "padding:0;margin:0;border:0;display:none",
                    c = s[0].offsetHeight === 0,
                    s[0].style.display = "",
                    s[1].style.display = "none",
                    t.reliableHiddenOffsets = c && s[0].offsetHeight === 0,
                    r.innerHTML = "",
                    r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
                    t.boxSizing = r.offsetWidth === 4,
                    t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1,
                    e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%",
                        t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                            width: "4px"
                        }).width === "4px",
                        o = i.createElement("div"),
                        o.style.cssText = r.style.cssText = u,
                        o.style.marginRight = o.style.width = "0",
                        r.style.width = "1px",
                        r.appendChild(o),
                        t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)),
                    typeof r.style.zoom != "undefined" && (r.innerHTML = "",
                        r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1",
                        t.inlineBlockNeedsLayout = r.offsetWidth === 3,
                        r.style.display = "block",
                        r.style.overflow = "visible",
                        r.innerHTML = "<div></div>",
                        r.firstChild.style.width = "5px",
                        t.shrinkWrapBlocks = r.offsetWidth !== 3,
                        n.style.zoom = 1),
                    a.removeChild(n),
                    n = r = s = o = null
            }),
                a.removeChild(p),
                n = r = s = o = u = a = p = null,
                t
        }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/
        , P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando],
                !!e && !B(e)
        },
        data: function (e, n, r, i) {
            if (!v.acceptData(e))
                return;
            var s, o, u = v.expando, a = typeof n == "string", f = e.nodeType, l = f ? v.cache : e, c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t)
                return;
            c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u),
                l[c] || (l[c] = {},
                    f || (l[c].toJSON = v.noop));
            if (typeof n == "object" || typeof n == "function")
                i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
            return s = l[c],
                i || (s.data || (s.data = {}),
                    s = s.data),
                r !== t && (s[v.camelCase(n)] = r),
                a ? (o = s[n],
                    o == null && (o = s[v.camelCase(n)])) : o = s,
                o
        },
        removeData: function (e, t, n) {
            if (!v.acceptData(e))
                return;
            var r, i, s, o = e.nodeType, u = o ? v.cache : e, a = o ? e[v.expando] : v.expando;
            if (!u[a])
                return;
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t),
                        t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0,
                        s = t.length; i < s; i++)
                        delete r[t[i]];
                    if (!(n ? B : v.isEmptyObject)(r))
                        return
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a]))
                    return
            }
            o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
        },
        _data: function (e, t, n) {
            return v.data(e, t, n, !0)
        },
        acceptData: function (e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }),
        v.fn.extend({
            data: function (e, n) {
                var r, i, s, o, u, a = this[0], f = 0, l = null;
                if (e === t) {
                    if (this.length) {
                        l = v.data(a);
                        if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                            s = a.attributes;
                            for (u = s.length; f < u; f++)
                                o = s[f].name,
                                    o.indexOf("data-") || (o = v.camelCase(o.substring(5)),
                                        H(a, o, l[o]));
                            v._data(a, "parsedAttrs", !0)
                        }
                    }
                    return l
                }
                return typeof e == "object" ? this.each(function () {
                    v.data(this, e)
                }) : (r = e.split(".", 2),
                    r[1] = r[1] ? "." + r[1] : "",
                    i = r[1] + "!",
                    v.access(this, function (n) {
                        if (n === t)
                            return l = this.triggerHandler("getData" + i, [r[0]]),
                                l === t && a && (l = v.data(a, e),
                                    l = H(a, e, l)),
                                l === t && r[1] ? this.data(r[0]) : l;
                        r[1] = n,
                            this.each(function () {
                                var t = v(this);
                                t.triggerHandler("setData" + i, r),
                                    v.data(this, e, n),
                                    t.triggerHandler("changeData" + i, r)
                            })
                    }, null, n, arguments.length > 1, null, !1))
            },
            removeData: function (e) {
                return this.each(function () {
                    v.removeData(this, e)
                })
            }
        }),
        v.extend({
            queue: function (e, t, n) {
                var r;
                if (e)
                    return t = (t || "fx") + "queue",
                        r = v._data(e, t),
                        n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)),
                        r || []
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = v.queue(e, t)
                    , r = n.length
                    , i = n.shift()
                    , s = v._queueHooks(e, t)
                    , o = function () {
                        v.dequeue(e, t)
                    }
                    ;
                i === "inprogress" && (i = n.shift(),
                    r--),
                    i && (t === "fx" && n.unshift("inprogress"),
                        delete s.stop,
                        i.call(e, o, s)),
                    !r && s && s.empty.fire()
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return v._data(e, n) || v._data(e, n, {
                    empty: v.Callbacks("once memory").add(function () {
                        v.removeData(e, t + "queue", !0),
                            v.removeData(e, n, !0)
                    })
                })
            }
        }),
        v.fn.extend({
            queue: function (e, n) {
                var r = 2;
                return typeof e != "string" && (n = e,
                    e = "fx",
                    r--),
                    arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
                        var t = v.queue(this, e, n);
                        v._queueHooks(this, e),
                            e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
                    })
            },
            dequeue: function (e) {
                return this.each(function () {
                    v.dequeue(this, e)
                })
            },
            delay: function (e, t) {
                return e = v.fx ? v.fx.speeds[e] || e : e,
                    t = t || "fx",
                    this.queue(t, function (t, n) {
                        var r = setTimeout(t, e);
                        n.stop = function () {
                            clearTimeout(r)
                        }
                    })
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", [])
            },
            promise: function (e, n) {
                var r, i = 1, s = v.Deferred(), o = this, u = this.length, a = function () {
                    --i || s.resolveWith(o, [o])
                }
                    ;
                typeof e != "string" && (n = e,
                    e = t),
                    e = e || "fx";
                while (u--)
                    r = v._data(o[u], e + "queueHooks"),
                        r && r.empty && (i++ ,
                            r.empty.add(a));
                return a(),
                    s.promise(n)
            }
        });
    var j, F, I, q = /[\t\r\n]/g, R = /\r/g, U = /^(?:button|input)$/i, z = /^(?:button|input|object|select|textarea)$/i, W = /^a(?:rea|)$/i, X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function (e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                v.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = v.propFix[e] || e,
                this.each(function () {
                    try {
                        this[e] = t,
                            delete this[e]
                    } catch (n) { }
                })
        },
        addClass: function (e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e))
                return this.each(function (t) {
                    v(this).addClass(e.call(this, t, this.className))
                });
            if (e && typeof e == "string") {
                t = e.split(y);
                for (n = 0,
                    r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)
                        if (!i.className && t.length === 1)
                            i.className = e;
                        else {
                            s = " " + i.className + " ";
                            for (o = 0,
                                u = t.length; o < u; o++)
                                s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                            i.className = v.trim(s)
                        }
                }
            }
            return this
        },
        removeClass: function (e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e))
                return this.each(function (t) {
                    v(this).removeClass(e.call(this, t, this.className))
                });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0,
                    a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0,
                            o = n.length; s < o; s++)
                            while (r.indexOf(" " + n[s] + " ") >= 0)
                                r = r.replace(" " + n[s] + " ", " ");
                        i.className = e ? v.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e
                , r = typeof t == "boolean";
            return v.isFunction(e) ? this.each(function (n) {
                v(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if (n === "string") {
                    var i, s = 0, o = v(this), u = t, a = e.split(y);
                    while (i = a[s++])
                        u = r ? u : !o.hasClass(i),
                            o[u ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean")
                    this.className && v._data(this, "__className__", this.className),
                        this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || ""
            })
        },
        hasClass: function (e) {
            var t = " " + e + " "
                , n = 0
                , r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0)
                    return !0;
            return !1
        },
        val: function (e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s)
                    return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()],
                        n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value,
                            typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
                return
            }
            return i = v.isFunction(e),
                this.each(function (r) {
                    var s, o = v(this);
                    if (this.nodeType !== 1)
                        return;
                    i ? s = e.call(this, r, o.val()) : s = e,
                        s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
                            return e == null ? "" : e + ""
                        })),
                        n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                    if (!n || !("set" in n) || n.set(this, s, "value") === t)
                        this.value = s
                })
        }
    }),
        v.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = e.attributes.value;
                        return !t || t.specified ? e.value : e.text
                    }
                },
                select: {
                    get: function (e) {
                        var t, n, r = e.options, i = e.selectedIndex, s = e.type === "select-one" || i < 0, o = s ? null : [], u = s ? i + 1 : r.length, a = i < 0 ? u : s ? i : 0;
                        for (; a < u; a++) {
                            n = r[a];
                            if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                                t = v(n).val();
                                if (s)
                                    return t;
                                o.push(t)
                            }
                        }
                        return o
                    },
                    set: function (e, t) {
                        var n = v.makeArray(t);
                        return v(e).find("option").each(function () {
                            this.selected = v.inArray(v(this).val(), n) >= 0
                        }),
                            n.length || (e.selectedIndex = -1),
                            n
                    }
                }
            },
            attrFn: {},
            attr: function (e, n, r, i) {
                var s, o, u, a = e.nodeType;
                if (!e || a === 3 || a === 8 || a === 2)
                    return;
                if (i && v.isFunction(v.fn[n]))
                    return v(e)[n](r);
                if (typeof e.getAttribute == "undefined")
                    return v.prop(e, n, r);
                u = a !== 1 || !v.isXMLDoc(e),
                    u && (n = n.toLowerCase(),
                        o = v.attrHooks[n] || (X.test(n) ? F : j));
                if (r !== t) {
                    if (r === null) {
                        v.removeAttr(e, n);
                        return
                    }
                    return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""),
                        r)
                }
                return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n),
                    s === null ? t : s)
            },
            removeAttr: function (e, t) {
                var n, r, i, s, o = 0;
                if (t && e.nodeType === 1) {
                    r = t.split(y);
                    for (; o < r.length; o++)
                        i = r[o],
                            i && (n = v.propFix[i] || i,
                                s = X.test(i),
                                s || v.attr(e, i, ""),
                                e.removeAttribute(V ? i : n),
                                s && n in e && (e[n] = !1))
                }
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (U.test(e.nodeName) && e.parentNode)
                            v.error("type property can't be changed");
                        else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                        }
                    }
                },
                value: {
                    get: function (e, t) {
                        return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
                    },
                    set: function (e, t, n) {
                        if (j && v.nodeName(e, "button"))
                            return j.set(e, t, n);
                        e.value = t
                    }
                }
            },
            propFix: {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            },
            prop: function (e, n, r) {
                var i, s, o, u = e.nodeType;
                if (!e || u === 3 || u === 8 || u === 2)
                    return;
                return o = u !== 1 || !v.isXMLDoc(e),
                    o && (n = v.propFix[n] || n,
                        s = v.propHooks[n]),
                    r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        var n = e.getAttributeNode("tabindex");
                        return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
                    }
                }
            }
        }),
        F = {
            get: function (e, n) {
                var r, i = v.prop(e, n);
                return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
            },
            set: function (e, t, n) {
                var r;
                return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n,
                    r in e && (e[r] = !0),
                    e.setAttribute(n, n.toLowerCase())),
                    n
            }
        },
        V || (I = {
            name: !0,
            id: !0,
            coords: !0
        },
            j = v.valHooks.button = {
                get: function (e, n) {
                    var r;
                    return r = e.getAttributeNode(n),
                        r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
                },
                set: function (e, t, n) {
                    var r = e.getAttributeNode(n);
                    return r || (r = i.createAttribute(n),
                        e.setAttributeNode(r)),
                        r.value = t + ""
                }
            },
            v.each(["width", "height"], function (e, t) {
                v.attrHooks[t] = v.extend(v.attrHooks[t], {
                    set: function (e, n) {
                        if (n === "")
                            return e.setAttribute(t, "auto"),
                                n
                    }
                })
            }),
            v.attrHooks.contenteditable = {
                get: j.get,
                set: function (e, t, n) {
                    t === "" && (t = "false"),
                        j.set(e, t, n)
                }
            }),
        v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
            v.attrHooks[n] = v.extend(v.attrHooks[n], {
                get: function (e) {
                    var r = e.getAttribute(n, 2);
                    return r === null ? t : r
                }
            })
        }),
        v.support.style || (v.attrHooks.style = {
            get: function (e) {
                return e.style.cssText.toLowerCase() || t
            },
            set: function (e, t) {
                return e.style.cssText = t + ""
            }
        }),
        v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
            get: function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex),
                    null
            }
        })),
        v.support.enctype || (v.propFix.enctype = "encoding"),
        v.support.checkOn || v.each(["radio", "checkbox"], function () {
            v.valHooks[this] = {
                get: function (e) {
                    return e.getAttribute("value") === null ? "on" : e.value
                }
            }
        }),
        v.each(["radio", "checkbox"], function () {
            v.valHooks[this] = v.extend(v.valHooks[this], {
                set: function (e, t) {
                    if (v.isArray(t))
                        return e.checked = v.inArray(v(e).val(), t) >= 0
                }
            })
        });
    var $ = /^(?:textarea|input|select)$/i
        , J = /^([^\.]*|)(?:\.(.+)|)$/
        , K = /(?:^|\s)hover(\.\S+|)\b/
        , Q = /^key/
        , G = /^(?:mouse|contextmenu)|click/
        , Y = /^(?:focusinfocus|focusoutblur)$/
        , Z = function (e) {
            return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
        }
        ;
    v.event = {
        add: function (e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, m, g;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e)))
                return;
            r.handler && (d = r,
                r = d.handler,
                s = d.selector),
                r.guid || (r.guid = v.guid++),
                a = o.events,
                a || (o.events = a = {}),
                u = o.handle,
                u || (o.handle = u = function (e) {
                    return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
                }
                    ,
                    u.elem = e),
                n = v.trim(Z(n)).split(" ");
            for (f = 0; f < n.length; f++) {
                l = J.exec(n[f]) || [],
                    c = l[1],
                    h = (l[2] || "").split(".").sort(),
                    g = v.event.special[c] || {},
                    c = (s ? g.delegateType : g.bindType) || c,
                    g = v.event.special[c] || {},
                    p = v.extend({
                        type: c,
                        origType: l[1],
                        data: i,
                        handler: r,
                        guid: r.guid,
                        selector: s,
                        needsContext: s && v.expr.match.needsContext.test(s),
                        namespace: h.join(".")
                    }, d),
                    m = a[c];
                if (!m) {
                    m = a[c] = [],
                        m.delegateCount = 0;
                    if (!g.setup || g.setup.call(e, i, h, u) === !1)
                        e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
                }
                g.add && (g.add.call(e, p),
                    p.handler.guid || (p.handler.guid = r.guid)),
                    s ? m.splice(m.delegateCount++, 0, p) : m.push(p),
                    v.event.global[c] = !0
            }
            e = null
        },
        global: {},
        remove: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
            if (!g || !(h = g.events))
                return;
            t = v.trim(Z(t || "")).split(" ");
            for (s = 0; s < t.length; s++) {
                o = J.exec(t[s]) || [],
                    u = a = o[1],
                    f = o[2];
                if (!u) {
                    for (u in h)
                        v.event.remove(e, u + t[s], n, r, !0);
                    continue
                }
                p = v.event.special[u] || {},
                    u = (r ? p.delegateType : p.bindType) || u,
                    d = h[u] || [],
                    l = d.length,
                    f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (c = 0; c < d.length; c++)
                    m = d[c],
                        (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1),
                            m.selector && d.delegateCount-- ,
                            p.remove && p.remove.call(e, m));
                d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle),
                    delete h[u])
            }
            v.isEmptyObject(h) && (delete g.handle,
                v.removeData(e, "events", !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (n, r, s, o) {
            if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
                var u, a, f, l, c, h, p, d, m, g, y = n.type || n, b = [];
                if (Y.test(y + v.event.triggered))
                    return;
                y.indexOf("!") >= 0 && (y = y.slice(0, -1),
                    a = !0),
                    y.indexOf(".") >= 0 && (b = y.split("."),
                        y = b.shift(),
                        b.sort());
                if ((!s || v.event.customEvent[y]) && !v.event.global[y])
                    return;
                n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y),
                    n.type = y,
                    n.isTrigger = !0,
                    n.exclusive = a,
                    n.namespace = b.join("."),
                    n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    h = y.indexOf(":") < 0 ? "on" + y : "";
                if (!s) {
                    u = v.cache;
                    for (f in u)
                        u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                    return
                }
                n.result = t,
                    n.target || (n.target = s),
                    r = r != null ? v.makeArray(r) : [],
                    r.unshift(n),
                    p = v.event.special[y] || {};
                if (p.trigger && p.trigger.apply(s, r) === !1)
                    return;
                m = [[s, p.bindType || y]];
                if (!o && !p.noBubble && !v.isWindow(s)) {
                    g = p.delegateType || y,
                        l = Y.test(g + y) ? s : s.parentNode;
                    for (c = s; l; l = l.parentNode)
                        m.push([l, g]),
                            c = l;
                    c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
                }
                for (f = 0; f < m.length && !n.isPropagationStopped(); f++)
                    l = m[f][0],
                        n.type = m[f][1],
                        d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"),
                        d && d.apply(l, r),
                        d = h && l[h],
                        d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
                return n.type = y,
                    !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h],
                        c && (s[h] = null),
                        v.event.triggered = y,
                        s[y](),
                        v.event.triggered = t,
                        c && (s[h] = c)),
                    n.result
            }
            return
        },
        dispatch: function (n) {
            n = v.event.fix(n || e.event);
            var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [], m = d.delegateCount, g = l.call(arguments), y = !n.exclusive && !n.namespace, b = v.event.special[n.type] || {}, w = [];
            g[0] = n,
                n.delegateTarget = this;
            if (b.preDispatch && b.preDispatch.call(this, n) === !1)
                return;
            if (m && (!n.button || n.type !== "click"))
                for (s = n.target; s != this; s = s.parentNode || this)
                    if (s.disabled !== !0 || n.type !== "click") {
                        u = {},
                            f = [];
                        for (r = 0; r < m; r++)
                            c = d[r],
                                h = c.selector,
                                u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length),
                                u[h] && f.push(c);
                        f.length && w.push({
                            elem: s,
                            matches: f
                        })
                    }
            d.length > m && w.push({
                elem: this,
                matches: d.slice(m)
            });
            for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                a = w[r],
                    n.currentTarget = a.elem;
                for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                    c = a.matches[i];
                    if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace))
                        n.data = c.data,
                            n.handleObj = c,
                            o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g),
                            o !== t && (n.result = o,
                                o === !1 && (n.preventDefault(),
                                    n.stopPropagation()))
                }
            }
            return b.postDispatch && b.postDispatch.call(this, n),
                n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode),
                    e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, n) {
                var r, s, o, u = n.button, a = n.fromElement;
                return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i,
                    s = r.documentElement,
                    o = r.body,
                    e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0),
                    e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)),
                    !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a),
                    !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0),
                    e
            }
        },
        fix: function (e) {
            if (e[v.expando])
                return e;
            var t, n, r = e, s = v.event.fixHooks[e.type] || {}, o = s.props ? this.props.concat(s.props) : this.props;
            e = v.Event(r);
            for (t = o.length; t;)
                n = o[--t],
                    e[n] = r[n];
            return e.target || (e.target = r.srcElement || i),
                e.target.nodeType === 3 && (e.target = e.target.parentNode),
                e.metaKey = !!e.metaKey,
                s.filter ? s.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (e, t, n) {
                    v.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = v.extend(new v.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i),
                i.isDefaultPrevented() && n.preventDefault()
        }
    },
        v.event.handle = v.event.dispatch,
        v.removeEvent = i.removeEventListener ? function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        }
            : function (e, t, n) {
                var r = "on" + t;
                e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null),
                    e.detachEvent(r, n))
            }
        ,
        v.Event = function (e, t) {
            if (!(this instanceof v.Event))
                return new v.Event(e, t);
            e && e.type ? (this.originalEvent = e,
                this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e,
                t && v.extend(this, t),
                this.timeStamp = e && e.timeStamp || v.now(),
                this[v.expando] = !0
        }
        ,
        v.Event.prototype = {
            preventDefault: function () {
                this.isDefaultPrevented = tt;
                var e = this.originalEvent;
                if (!e)
                    return;
                e.preventDefault ? e.preventDefault() : e.returnValue = !1
            },
            stopPropagation: function () {
                this.isPropagationStopped = tt;
                var e = this.originalEvent;
                if (!e)
                    return;
                e.stopPropagation && e.stopPropagation(),
                    e.cancelBubble = !0
            },
            stopImmediatePropagation: function () {
                this.isImmediatePropagationStopped = tt,
                    this.stopPropagation()
            },
            isDefaultPrevented: et,
            isPropagationStopped: et,
            isImmediatePropagationStopped: et
        },
        v.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function (e, t) {
            v.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n, r = this, i = e.relatedTarget, s = e.handleObj, o = s.selector;
                    if (!i || i !== r && !v.contains(r, i))
                        e.type = s.origType,
                            n = s.handler.apply(this, arguments),
                            e.type = t;
                    return n
                }
            }
        }),
        v.support.submitBubbles || (v.event.special.submit = {
            setup: function () {
                if (v.nodeName(this, "form"))
                    return !1;
                v.event.add(this, "click._submit keypress._submit", function (e) {
                    var n = e.target
                        , r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
                    r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
                        e._submit_bubble = !0
                    }),
                        v._data(r, "_submit_attached", !0))
                })
            },
            postDispatch: function (e) {
                e._submit_bubble && (delete e._submit_bubble,
                    this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
            },
            teardown: function () {
                if (v.nodeName(this, "form"))
                    return !1;
                v.event.remove(this, "._submit")
            }
        }),
        v.support.changeBubbles || (v.event.special.change = {
            setup: function () {
                if ($.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio")
                        v.event.add(this, "propertychange._change", function (e) {
                            e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                        }),
                            v.event.add(this, "click._change", function (e) {
                                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                                    v.event.simulate("change", this, e, !0)
                            });
                    return !1
                }
                v.event.add(this, "beforeactivate._change", function (e) {
                    var t = e.target;
                    $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
                        this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
                    }),
                        v._data(t, "_change_attached", !0))
                })
            },
            handle: function (e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox")
                    return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                return v.event.remove(this, "._change"),
                    !$.test(this.nodeName)
            }
        }),
        v.support.focusinBubbles || v.each({
            focus: "focusin",
            blur: "focusout"
        }, function (e, t) {
            var n = 0
                , r = function (e) {
                    v.event.simulate(t, e.target, v.event.fix(e), !0)
                }
                ;
            v.event.special[t] = {
                setup: function () {
                    n++ === 0 && i.addEventListener(e, r, !0)
                },
                teardown: function () {
                    --n === 0 && i.removeEventListener(e, r, !0)
                }
            }
        }),
        v.fn.extend({
            on: function (e, n, r, i, s) {
                var o, u;
                if (typeof e == "object") {
                    typeof n != "string" && (r = r || n,
                        n = t);
                    for (u in e)
                        this.on(u, n, r, e[u], s);
                    return this
                }
                r == null && i == null ? (i = n,
                    r = n = t) : i == null && (typeof n == "string" ? (i = r,
                        r = t) : (i = r,
                            r = n,
                            n = t));
                if (i === !1)
                    i = et;
                else if (!i)
                    return this;
                return s === 1 && (o = i,
                    i = function (e) {
                        return v().off(e),
                            o.apply(this, arguments)
                    }
                    ,
                    i.guid = o.guid || (o.guid = v.guid++)),
                    this.each(function () {
                        v.event.add(this, e, i, r, n)
                    })
            },
            one: function (e, t, n, r) {
                return this.on(e, t, n, r, 1)
            },
            off: function (e, n, r) {
                var i, s;
                if (e && e.preventDefault && e.handleObj)
                    return i = e.handleObj,
                        v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                        this;
                if (typeof e == "object") {
                    for (s in e)
                        this.off(s, n, e[s]);
                    return this
                }
                if (n === !1 || typeof n == "function")
                    r = n,
                        n = t;
                return r === !1 && (r = et),
                    this.each(function () {
                        v.event.remove(this, e, r, n)
                    })
            },
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function (e, t) {
                return this.off(e, null, t)
            },
            live: function (e, t, n) {
                return v(this.context).on(e, this.selector, t, n),
                    this
            },
            die: function (e, t) {
                return v(this.context).off(e, this.selector || "**", t),
                    this
            },
            delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function (e, t, n) {
                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            trigger: function (e, t) {
                return this.each(function () {
                    v.event.trigger(e, t, this)
                })
            },
            triggerHandler: function (e, t) {
                if (this[0])
                    return v.event.trigger(e, t, this[0], !0)
            },
            toggle: function (e) {
                var t = arguments
                    , n = e.guid || v.guid++
                    , r = 0
                    , i = function (n) {
                        var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                        return v._data(this, "lastToggle" + e.guid, i + 1),
                            n.preventDefault(),
                            t[i].apply(this, arguments) || !1
                    }
                    ;
                i.guid = n;
                while (r < t.length)
                    t[r++].guid = n;
                return this.click(i)
            },
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
            v.fn[t] = function (e, n) {
                return n == null && (n = e,
                    e = null),
                    arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
                ,
                Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks),
                G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
        }),
        function (e, t) {
            function nt(e, t, n, r) {
                n = n || [],
                    t = t || g;
                var i, s, a, f, l = t.nodeType;
                if (!e || typeof e != "string")
                    return n;
                if (l !== 1 && l !== 9)
                    return [];
                a = o(t);
                if (!a && !r)
                    if (i = R.exec(e))
                        if (f = i[1]) {
                            if (l === 9) {
                                s = t.getElementById(f);
                                if (!s || !s.parentNode)
                                    return n;
                                if (s.id === f)
                                    return n.push(s),
                                        n
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f)
                                return n.push(s),
                                    n
                        } else {
                            if (i[2])
                                return S.apply(n, x.call(t.getElementsByTagName(e), 0)),
                                    n;
                            if ((f = i[3]) && Z && t.getElementsByClassName)
                                return S.apply(n, x.call(t.getElementsByClassName(f), 0)),
                                    n
                        }
                return vt(e.replace(j, "$1"), t, n, r, a)
            }
            function rt(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e
                }
            }
            function it(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e
                }
            }
            function st(e) {
                return N(function (t) {
                    return t = +t,
                        N(function (n, r) {
                            var i, s = e([], n.length, t), o = s.length;
                            while (o--)
                                n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                        })
                })
            }
            function ot(e, t, n) {
                if (e === t)
                    return n;
                var r = e.nextSibling;
                while (r) {
                    if (r === t)
                        return -1;
                    r = r.nextSibling
                }
                return 1
            }
            function ut(e, t) {
                var n, r, s, o, u, a, f, l = L[d][e + " "];
                if (l)
                    return t ? 0 : l.slice(0);
                u = e,
                    a = [],
                    f = i.preFilter;
                while (u) {
                    if (!n || (r = F.exec(u)))
                        r && (u = u.slice(r[0].length) || u),
                            a.push(s = []);
                    n = !1;
                    if (r = I.exec(u))
                        s.push(n = new m(r.shift())),
                            u = u.slice(n.length),
                            n.type = r[0].replace(j, " ");
                    for (o in i.filter)
                        (r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())),
                            u = u.slice(n.length),
                            n.type = o,
                            n.matches = r);
                    if (!n)
                        break
                }
                return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
            }
            function at(e, t, r) {
                var i = t.dir
                    , s = r && t.dir === "parentNode"
                    , o = w++;
                return t.first ? function (t, n, r) {
                    while (t = t[i])
                        if (s || t.nodeType === 1)
                            return e(t, n, r)
                }
                    : function (t, r, u) {
                        if (!u) {
                            var a, f = b + " " + o + " ", l = f + n;
                            while (t = t[i])
                                if (s || t.nodeType === 1) {
                                    if ((a = t[d]) === l)
                                        return t.sizset;
                                    if (typeof a == "string" && a.indexOf(f) === 0) {
                                        if (t.sizset)
                                            return t
                                    } else {
                                        t[d] = l;
                                        if (e(t, r, u))
                                            return t.sizset = !0,
                                                t;
                                        t.sizset = !1
                                    }
                                }
                        } else
                            while (t = t[i])
                                if (s || t.nodeType === 1)
                                    if (e(t, r, u))
                                        return t
                    }
            }
            function ft(e) {
                return e.length > 1 ? function (t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r))
                            return !1;
                    return !0
                }
                    : e[0]
            }
            function lt(e, t, n, r, i) {
                var s, o = [], u = 0, a = e.length, f = t != null;
                for (; u < a; u++)
                    if (s = e[u])
                        if (!n || n(s, r, i))
                            o.push(s),
                                f && t.push(u);
                return o
            }
            function ct(e, t, n, r, i, s) {
                return r && !r[d] && (r = ct(r)),
                    i && !i[d] && (i = ct(i, s)),
                    N(function (s, o, u, a) {
                        var f, l, c, h = [], p = [], d = o.length, v = s || dt(t || "*", u.nodeType ? [u] : u, []), m = e && (s || !t) ? lt(v, h, e, u, a) : v, g = n ? i || (s ? e : d || r) ? [] : o : m;
                        n && n(m, g, u, a);
                        if (r) {
                            f = lt(g, p),
                                r(f, [], u, a),
                                l = f.length;
                            while (l--)
                                if (c = f[l])
                                    g[p[l]] = !(m[p[l]] = c)
                        }
                        if (s) {
                            if (i || e) {
                                if (i) {
                                    f = [],
                                        l = g.length;
                                    while (l--)
                                        (c = g[l]) && f.push(m[l] = c);
                                    i(null, g = [], f, a)
                                }
                                l = g.length;
                                while (l--)
                                    (c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                            }
                        } else
                            g = lt(g === o ? g.splice(d, g.length) : g),
                                i ? i(null, o, g, a) : S.apply(o, g)
                    })
            }
            function ht(e) {
                var t, n, r, s = e.length, o = i.relative[e[0].type], u = o || i.relative[" "], a = o ? 1 : 0, f = at(function (e) {
                    return e === t
                }, u, !0), l = at(function (e) {
                    return T.call(t, e) > -1
                }, u, !0), h = [function (e, n, r) {
                    return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
                }
                ];
                for (; a < s; a++)
                    if (n = i.relative[e[a].type])
                        h = [at(ft(h), n)];
                    else {
                        n = i.filter[e[a].type].apply(null, e[a].matches);
                        if (n[d]) {
                            r = ++a;
                            for (; r < s; r++)
                                if (i.relative[e[r].type])
                                    break;
                            return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                        }
                        h.push(n)
                    }
                return ft(h)
            }
            function pt(e, t) {
                var r = t.length > 0
                    , s = e.length > 0
                    , o = function (u, a, f, l, h) {
                        var p, d, v, m = [], y = 0, w = "0", x = u && [], T = h != null, N = c, C = u || s && i.find.TAG("*", h && a.parentNode || a), k = b += N == null ? 1 : Math.E;
                        T && (c = a !== g && a,
                            n = o.el);
                        for (; (p = C[w]) != null; w++) {
                            if (s && p) {
                                for (d = 0; v = e[d]; d++)
                                    if (v(p, a, f)) {
                                        l.push(p);
                                        break
                                    }
                                T && (b = k,
                                    n = ++o.el)
                            }
                            r && ((p = !v && p) && y-- ,
                                u && x.push(p))
                        }
                        y += w;
                        if (r && w !== y) {
                            for (d = 0; v = t[d]; d++)
                                v(x, m, a, f);
                            if (u) {
                                if (y > 0)
                                    while (w--)
                                        !x[w] && !m[w] && (m[w] = E.call(l));
                                m = lt(m)
                            }
                            S.apply(l, m),
                                T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                        }
                        return T && (b = k,
                            c = N),
                            x
                    }
                    ;
                return o.el = 0,
                    r ? N(o) : o
            }
            function dt(e, t, n) {
                var r = 0
                    , i = t.length;
                for (; r < i; r++)
                    nt(e, t[r], n);
                return n
            }
            function vt(e, t, n, r, s) {
                var o, u, f, l, c, h = ut(e), p = h.length;
                if (!r && h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                        t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                        if (!t)
                            return n;
                        e = e.slice(u.shift().length)
                    }
                    for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                        f = u[o];
                        if (i.relative[l = f.type])
                            break;
                        if (c = i.find[l])
                            if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                                u.splice(o, 1),
                                    e = r.length && u.join("");
                                if (!e)
                                    return S.apply(n, x.call(r, 0)),
                                        n;
                                break
                            }
                    }
                }
                return a(e, h)(r, t, s, n, z.test(e)),
                    n
            }
            function mt() { }
            var n, r, i, s, o, u, a, f, l, c, h = !0, p = "undefined", d = ("sizcache" + Math.random()).replace(".", ""), m = String, g = e.document, y = g.documentElement, b = 0, w = 0, E = [].pop, S = [].push, x = [].slice, T = [].indexOf || function (e) {
                var t = 0
                    , n = this.length;
                for (; t < n; t++)
                    if (this[t] === e)
                        return t;
                return -1
            }
                , N = function (e, t) {
                    return e[d] = t == null || t,
                        e
                }
                , C = function () {
                    var e = {}
                        , t = [];
                    return N(function (n, r) {
                        return t.push(n) > i.cacheLength && delete e[t.shift()],
                            e[n + " "] = r
                    }, e)
                }
                , k = C(), L = C(), A = C(), O = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", _ = M.replace("w", "w#"), D = "([*^$|!~]?=)", P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]", H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)", B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"), F = new RegExp("^" + O + "*," + O + "*"), I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"), q = new RegExp(H), R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, U = /^:not/, z = /[\x20\t\r\n\f]*[+~]/, W = /:not\($/, X = /h\d/i, V = /input|select|textarea|button/i, $ = /\\(?!\\)/g, J = {
                    ID: new RegExp("^#(" + M + ")"),
                    CLASS: new RegExp("^\\.(" + M + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + P),
                    PSEUDO: new RegExp("^" + H),
                    POS: new RegExp(B, "i"),
                    CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
                }, K = function (e) {
                    var t = g.createElement("div");
                    try {
                        return e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t = null
                    }
                }
                , Q = K(function (e) {
                    return e.appendChild(g.createComment("")),
                        !e.getElementsByTagName("*").length
                }), G = K(function (e) {
                    return e.innerHTML = "<a href='#'></a>",
                        e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
                }), Y = K(function (e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return t !== "boolean" && t !== "string"
                }), Z = K(function (e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
                        !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e",
                            e.getElementsByClassName("e").length === 2)
                }), et = K(function (e) {
                    e.id = d + 0,
                        e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>",
                        y.insertBefore(e, y.firstChild);
                    var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
                    return r = !g.getElementById(d),
                        y.removeChild(e),
                        t
                });
            try {
                x.call(y.childNodes, 0)[0].nodeType
            } catch (tt) {
                x = function (e) {
                    var t, n = [];
                    for (; t = this[e]; e++)
                        n.push(t);
                    return n
                }
            }
            nt.matches = function (e, t) {
                return nt(e, null, null, t)
            }
                ,
                nt.matchesSelector = function (e, t) {
                    return nt(t, null, null, [e]).length > 0
                }
                ,
                s = nt.getText = function (e) {
                    var t, n = "", r = 0, i = e.nodeType;
                    if (i) {
                        if (i === 1 || i === 9 || i === 11) {
                            if (typeof e.textContent == "string")
                                return e.textContent;
                            for (e = e.firstChild; e; e = e.nextSibling)
                                n += s(e)
                        } else if (i === 3 || i === 4)
                            return e.nodeValue
                    } else
                        for (; t = e[r]; r++)
                            n += s(t);
                    return n
                }
                ,
                o = nt.isXML = function (e) {
                    var t = e && (e.ownerDocument || e).documentElement;
                    return t ? t.nodeName !== "HTML" : !1
                }
                ,
                u = nt.contains = y.contains ? function (e, t) {
                    var n = e.nodeType === 9 ? e.documentElement : e
                        , r = t && t.parentNode;
                    return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r))
                }
                    : y.compareDocumentPosition ? function (e, t) {
                        return t && !!(e.compareDocumentPosition(t) & 16)
                    }
                        : function (e, t) {
                            while (t = t.parentNode)
                                if (t === e)
                                    return !0;
                            return !1
                        }
                ,
                nt.attr = function (e, t) {
                    var n, r = o(e);
                    return r || (t = t.toLowerCase()),
                        (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t),
                            n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null)
                }
                ,
                i = nt.selectors = {
                    cacheLength: 50,
                    createPseudo: N,
                    match: J,
                    attrHandle: G ? {} : {
                        href: function (e) {
                            return e.getAttribute("href", 2)
                        },
                        type: function (e) {
                            return e.getAttribute("type")
                        }
                    },
                    find: {
                        ID: r ? function (e, t, n) {
                            if (typeof t.getElementById !== p && !n) {
                                var r = t.getElementById(e);
                                return r && r.parentNode ? [r] : []
                            }
                        }
                            : function (e, n, r) {
                                if (typeof n.getElementById !== p && !r) {
                                    var i = n.getElementById(e);
                                    return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
                                }
                            }
                        ,
                        TAG: Q ? function (e, t) {
                            if (typeof t.getElementsByTagName !== p)
                                return t.getElementsByTagName(e)
                        }
                            : function (e, t) {
                                var n = t.getElementsByTagName(e);
                                if (e === "*") {
                                    var r, i = [], s = 0;
                                    for (; r = n[s]; s++)
                                        r.nodeType === 1 && i.push(r);
                                    return i
                                }
                                return n
                            }
                        ,
                        NAME: et && function (e, t) {
                            if (typeof t.getElementsByName !== p)
                                return t.getElementsByName(name)
                        }
                        ,
                        CLASS: Z && function (e, t, n) {
                            if (typeof t.getElementsByClassName !== p && !n)
                                return t.getElementsByClassName(e)
                        }
                    },
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function (e) {
                            return e[1] = e[1].replace($, ""),
                                e[3] = (e[4] || e[5] || "").replace($, ""),
                                e[2] === "~=" && (e[3] = " " + e[3] + " "),
                                e.slice(0, 4)
                        },
                        CHILD: function (e) {
                            return e[1] = e[1].toLowerCase(),
                                e[1] === "nth" ? (e[2] || nt.error(e[0]),
                                    e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")),
                                    e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]),
                                e
                        },
                        PSEUDO: function (e) {
                            var t, n;
                            if (J.CHILD.test(e[0]))
                                return null;
                            if (e[3])
                                e[2] = e[3];
                            else if (t = e[4])
                                q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n),
                                    e[0] = e[0].slice(0, n)),
                                    e[2] = t;
                            return e.slice(0, 3)
                        }
                    },
                    filter: {
                        ID: r ? function (e) {
                            return e = e.replace($, ""),
                                function (t) {
                                    return t.getAttribute("id") === e
                                }
                        }
                            : function (e) {
                                return e = e.replace($, ""),
                                    function (t) {
                                        var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                                        return n && n.value === e
                                    }
                            }
                        ,
                        TAG: function (e) {
                            return e === "*" ? function () {
                                return !0
                            }
                                : (e = e.replace($, "").toLowerCase(),
                                    function (t) {
                                        return t.nodeName && t.nodeName.toLowerCase() === e
                                    }
                                )
                        },
                        CLASS: function (e) {
                            var t = k[d][e + " "];
                            return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function (e) {
                                return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                            })
                        },
                        ATTR: function (e, t, n) {
                            return function (r, i) {
                                var s = nt.attr(r, e);
                                return s == null ? t === "!=" : t ? (s += "",
                                    t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                            }
                        },
                        CHILD: function (e, t, n, r) {
                            return e === "nth" ? function (e) {
                                var t, i, s = e.parentNode;
                                if (n === 1 && r === 0)
                                    return !0;
                                if (s) {
                                    i = 0;
                                    for (t = s.firstChild; t; t = t.nextSibling)
                                        if (t.nodeType === 1) {
                                            i++;
                                            if (e === t)
                                                break
                                        }
                                }
                                return i -= r,
                                    i === n || i % n === 0 && i / n >= 0
                            }
                                : function (t) {
                                    var n = t;
                                    switch (e) {
                                        case "only":
                                        case "first":
                                            while (n = n.previousSibling)
                                                if (n.nodeType === 1)
                                                    return !1;
                                            if (e === "first")
                                                return !0;
                                            n = t;
                                        case "last":
                                            while (n = n.nextSibling)
                                                if (n.nodeType === 1)
                                                    return !1;
                                            return !0
                                    }
                                }
                        },
                        PSEUDO: function (e, t) {
                            var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                            return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t],
                                i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
                                    var i, s = r(e, t), o = s.length;
                                    while (o--)
                                        i = T.call(e, s[o]),
                                            e[i] = !(n[i] = s[o])
                                }) : function (e) {
                                    return r(e, 0, n)
                                }
                            ) : r
                        }
                    },
                    pseudos: {
                        not: N(function (e) {
                            var t = []
                                , n = []
                                , r = a(e.replace(j, "$1"));
                            return r[d] ? N(function (e, t, n, i) {
                                var s, o = r(e, null, i, []), u = e.length;
                                while (u--)
                                    if (s = o[u])
                                        e[u] = !(t[u] = s)
                            }) : function (e, i, s) {
                                return t[0] = e,
                                    r(t, null, s, n),
                                    !n.pop()
                            }
                        }),
                        has: N(function (e) {
                            return function (t) {
                                return nt(e, t).length > 0
                            }
                        }),
                        contains: N(function (e) {
                            return function (t) {
                                return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                            }
                        }),
                        enabled: function (e) {
                            return e.disabled === !1
                        },
                        disabled: function (e) {
                            return e.disabled === !0
                        },
                        checked: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && !!e.checked || t === "option" && !!e.selected
                        },
                        selected: function (e) {
                            return e.parentNode && e.parentNode.selectedIndex,
                                e.selected === !0
                        },
                        parent: function (e) {
                            return !i.pseudos.empty(e)
                        },
                        empty: function (e) {
                            var t;
                            e = e.firstChild;
                            while (e) {
                                if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4)
                                    return !1;
                                e = e.nextSibling
                            }
                            return !0
                        },
                        header: function (e) {
                            return X.test(e.nodeName)
                        },
                        text: function (e) {
                            var t, n;
                            return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
                        },
                        radio: rt("radio"),
                        checkbox: rt("checkbox"),
                        file: rt("file"),
                        password: rt("password"),
                        image: rt("image"),
                        submit: it("submit"),
                        reset: it("reset"),
                        button: function (e) {
                            var t = e.nodeName.toLowerCase();
                            return t === "input" && e.type === "button" || t === "button"
                        },
                        input: function (e) {
                            return V.test(e.nodeName)
                        },
                        focus: function (e) {
                            var t = e.ownerDocument;
                            return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                        },
                        active: function (e) {
                            return e === e.ownerDocument.activeElement
                        },
                        first: st(function () {
                            return [0]
                        }),
                        last: st(function (e, t) {
                            return [t - 1]
                        }),
                        eq: st(function (e, t, n) {
                            return [n < 0 ? n + t : n]
                        }),
                        even: st(function (e, t) {
                            for (var n = 0; n < t; n += 2)
                                e.push(n);
                            return e
                        }),
                        odd: st(function (e, t) {
                            for (var n = 1; n < t; n += 2)
                                e.push(n);
                            return e
                        }),
                        lt: st(function (e, t, n) {
                            for (var r = n < 0 ? n + t : n; --r >= 0;)
                                e.push(r);
                            return e
                        }),
                        gt: st(function (e, t, n) {
                            for (var r = n < 0 ? n + t : n; ++r < t;)
                                e.push(r);
                            return e
                        })
                    }
                },
                f = y.compareDocumentPosition ? function (e, t) {
                    return e === t ? (l = !0,
                        0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
                }
                    : function (e, t) {
                        if (e === t)
                            return l = !0,
                                0;
                        if (e.sourceIndex && t.sourceIndex)
                            return e.sourceIndex - t.sourceIndex;
                        var n, r, i = [], s = [], o = e.parentNode, u = t.parentNode, a = o;
                        if (o === u)
                            return ot(e, t);
                        if (!o)
                            return -1;
                        if (!u)
                            return 1;
                        while (a)
                            i.unshift(a),
                                a = a.parentNode;
                        a = u;
                        while (a)
                            s.unshift(a),
                                a = a.parentNode;
                        n = i.length,
                            r = s.length;
                        for (var f = 0; f < n && f < r; f++)
                            if (i[f] !== s[f])
                                return ot(i[f], s[f]);
                        return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
                    }
                ,
                [0, 0].sort(f),
                h = !l,
                nt.uniqueSort = function (e) {
                    var t, n = [], r = 1, i = 0;
                    l = h,
                        e.sort(f);
                    if (l) {
                        for (; t = e[r]; r++)
                            t === e[r - 1] && (i = n.push(r));
                        while (i--)
                            e.splice(n[i], 1)
                    }
                    return e
                }
                ,
                nt.error = function (e) {
                    throw new Error("Syntax error, unrecognized expression: " + e)
                }
                ,
                a = nt.compile = function (e, t) {
                    var n, r = [], i = [], s = A[d][e + " "];
                    if (!s) {
                        t || (t = ut(e)),
                            n = t.length;
                        while (n--)
                            s = ht(t[n]),
                                s[d] ? r.push(s) : i.push(s);
                        s = A(e, pt(i, r))
                    }
                    return s
                }
                ,
                g.querySelectorAll && function () {
                    var e, t = vt, n = /'|\\/g, r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, i = [":focus"], s = [":active"], u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
                    K(function (e) {
                        e.innerHTML = "<select><option selected=''></option></select>",
                            e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                            e.querySelectorAll(":checked").length || i.push(":checked")
                    }),
                        K(function (e) {
                            e.innerHTML = "<p test=''></p>",
                                e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"),
                                e.innerHTML = "<input type='hidden'/>",
                                e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
                        }),
                        i = new RegExp(i.join("|")),
                        vt = function (e, r, s, o, u) {
                            if (!o && !u && !i.test(e)) {
                                var a, f, l = !0, c = d, h = r, p = r.nodeType === 9 && e;
                                if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                                    a = ut(e),
                                        (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c),
                                        c = "[id='" + c + "'] ",
                                        f = a.length;
                                    while (f--)
                                        a[f] = c + a[f].join("");
                                    h = z.test(e) && r.parentNode || r,
                                        p = a.join(",")
                                }
                                if (p)
                                    try {
                                        return S.apply(s, x.call(h.querySelectorAll(p), 0)),
                                            s
                                    } catch (v) { } finally {
                                        l || r.removeAttribute("id")
                                    }
                            }
                            return t(e, r, s, o, u)
                        }
                        ,
                        u && (K(function (t) {
                            e = u.call(t, "div");
                            try {
                                u.call(t, "[test!='']:sizzle"),
                                    s.push("!=", H)
                            } catch (n) { }
                        }),
                            s = new RegExp(s.join("|")),
                            nt.matchesSelector = function (t, n) {
                                n = n.replace(r, "='$1']");
                                if (!o(t) && !s.test(n) && !i.test(n))
                                    try {
                                        var a = u.call(t, n);
                                        if (a || e || t.document && t.document.nodeType !== 11)
                                            return a
                                    } catch (f) { }
                                return nt(n, null, null, [t]).length > 0
                            }
                        )
                }(),
                i.pseudos.nth = i.pseudos.eq,
                i.filters = mt.prototype = i.pseudos,
                i.setFilters = new mt,
                nt.attr = v.attr,
                v.find = nt,
                v.expr = nt.selectors,
                v.expr[":"] = v.expr.pseudos,
                v.unique = nt.uniqueSort,
                v.text = nt.getText,
                v.isXMLDoc = nt.isXML,
                v.contains = nt.contains
        }(e);
    var nt = /Until$/
        , rt = /^(?:parents|prev(?:Until|All))/
        , it = /^.[^:#\[\.,]*$/
        , st = v.expr.match.needsContext
        , ot = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    v.fn.extend({
        find: function (e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e != "string")
                return v(e).filter(function () {
                    for (t = 0,
                        n = u.length; t < n; t++)
                        if (v.contains(u[t], this))
                            return !0
                });
            o = this.pushStack("", "find", e);
            for (t = 0,
                n = this.length; t < n; t++) {
                r = o.length,
                    v.find(e, this[t], o);
                if (t > 0)
                    for (i = r; i < o.length; i++)
                        for (s = 0; s < r; s++)
                            if (o[s] === o[i]) {
                                o.splice(i--, 1);
                                break
                            }
            }
            return o
        },
        has: function (e) {
            var t, n = v(e, this), r = n.length;
            return this.filter(function () {
                for (t = 0; t < r; t++)
                    if (v.contains(this, n[t]))
                        return !0
            })
        },
        not: function (e) {
            return this.pushStack(ft(this, e, !1), "not", e)
        },
        filter: function (e) {
            return this.pushStack(ft(this, e, !0), "filter", e)
        },
        is: function (e) {
            return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (e, t) {
            var n, r = 0, i = this.length, s = [], o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            }
            return s = s.length > 1 ? v.unique(s) : s,
                this.pushStack(s, "closest", e)
        },
        index: function (e) {
            return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function (e, t) {
            var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e)
                , r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
        },
        addBack: function (e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }),
        v.fn.andSelf = v.fn.addBack,
        v.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            parents: function (e) {
                return v.dir(e, "parentNode")
            },
            parentsUntil: function (e, t, n) {
                return v.dir(e, "parentNode", n)
            },
            next: function (e) {
                return at(e, "nextSibling")
            },
            prev: function (e) {
                return at(e, "previousSibling")
            },
            nextAll: function (e) {
                return v.dir(e, "nextSibling")
            },
            prevAll: function (e) {
                return v.dir(e, "previousSibling")
            },
            nextUntil: function (e, t, n) {
                return v.dir(e, "nextSibling", n)
            },
            prevUntil: function (e, t, n) {
                return v.dir(e, "previousSibling", n)
            },
            siblings: function (e) {
                return v.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function (e) {
                return v.sibling(e.firstChild)
            },
            contents: function (e) {
                return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
            }
        }, function (e, t) {
            v.fn[e] = function (n, r) {
                var i = v.map(this, t, n);
                return nt.test(e) || (r = n),
                    r && typeof r == "string" && (i = v.filter(r, i)),
                    i = this.length > 1 && !ot[e] ? v.unique(i) : i,
                    this.length > 1 && rt.test(e) && (i = i.reverse()),
                    this.pushStack(i, e, l.call(arguments).join(","))
            }
        }),
        v.extend({
            filter: function (e, t, n) {
                return n && (e = ":not(" + e + ")"),
                    t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
            },
            dir: function (e, n, r) {
                var i = []
                    , s = e[n];
                while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r)))
                    s.nodeType === 1 && i.push(s),
                        s = s[n];
                return i
            },
            sibling: function (e, t) {
                var n = [];
                for (; e; e = e.nextSibling)
                    e.nodeType === 1 && e !== t && n.push(e);
                return n
            }
        });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
        , ht = / jQuery\d+="(?:null|\d+)"/g
        , pt = /^\s+/
        , dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
        , vt = /<([\w:]+)/
        , mt = /<tbody/i
        , gt = /<|&#?\w+;/
        , yt = /<(?:script|style|link)/i
        , bt = /<(?:script|object|embed|option|style)/i
        , wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i")
        , Et = /^(?:checkbox|radio)$/
        , St = /checked\s*(?:[^=]|=\s*.checked.)/i
        , xt = /\/(java|ecma)script/i
        , Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g
        , Nt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }
        , Ct = lt(i)
        , kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option,
        Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead,
        Nt.th = Nt.td,
        v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]),
        v.fn.extend({
            text: function (e) {
                return v.access(this, function (e) {
                    return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
                }, null, e, arguments.length)
            },
            wrapAll: function (e) {
                if (v.isFunction(e))
                    return this.each(function (t) {
                        v(this).wrapAll(e.call(this, t))
                    });
                if (this[0]) {
                    var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                        t.map(function () {
                            var e = this;
                            while (e.firstChild && e.firstChild.nodeType === 1)
                                e = e.firstChild;
                            return e
                        }).append(this)
                }
                return this
            },
            wrapInner: function (e) {
                return v.isFunction(e) ? this.each(function (t) {
                    v(this).wrapInner(e.call(this, t))
                }) : this.each(function () {
                    var t = v(this)
                        , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function (e) {
                var t = v.isFunction(e);
                return this.each(function (n) {
                    v(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function () {
                return this.parent().each(function () {
                    v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
                }).end()
            },
            append: function () {
                return this.domManip(arguments, !0, function (e) {
                    (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
                })
            },
            prepend: function () {
                return this.domManip(arguments, !0, function (e) {
                    (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
                })
            },
            before: function () {
                if (!ut(this[0]))
                    return this.domManip(arguments, !1, function (e) {
                        this.parentNode.insertBefore(e, this)
                    });
                if (arguments.length) {
                    var e = v.clean(arguments);
                    return this.pushStack(v.merge(e, this), "before", this.selector)
                }
            },
            after: function () {
                if (!ut(this[0]))
                    return this.domManip(arguments, !1, function (e) {
                        this.parentNode.insertBefore(e, this.nextSibling)
                    });
                if (arguments.length) {
                    var e = v.clean(arguments);
                    return this.pushStack(v.merge(this, e), "after", this.selector)
                }
            },
            remove: function (e, t) {
                var n, r = 0;
                for (; (n = this[r]) != null; r++)
                    if (!e || v.filter(e, [n]).length)
                        !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")),
                            v.cleanData([n])),
                            n.parentNode && n.parentNode.removeChild(n);
                return this
            },
            empty: function () {
                var e, t = 0;
                for (; (e = this[t]) != null; t++) {
                    e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
                    while (e.firstChild)
                        e.removeChild(e.firstChild)
                }
                return this
            },
            clone: function (e, t) {
                return e = e == null ? !1 : e,
                    t = t == null ? e : t,
                    this.map(function () {
                        return v.clone(this, e, t)
                    })
            },
            html: function (e) {
                return v.access(this, function (e) {
                    var n = this[0] || {}
                        , r = 0
                        , i = this.length;
                    if (e === t)
                        return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
                    if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(dt, "<$1></$2>");
                        try {
                            for (; r < i; r++)
                                n = this[r] || {},
                                    n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")),
                                        n.innerHTML = e);
                            n = 0
                        } catch (s) { }
                    }
                    n && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function (e) {
                return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
                    var n = v(this)
                        , r = n.html();
                    n.replaceWith(e.call(this, t, r))
                }) : (typeof e != "string" && (e = v(e).detach()),
                    this.each(function () {
                        var t = this.nextSibling
                            , n = this.parentNode;
                        v(this).remove(),
                            t ? v(t).before(e) : v(n).append(e)
                    }))
            },
            detach: function (e) {
                return this.remove(e, !0)
            },
            domManip: function (e, n, r) {
                e = [].concat.apply([], e);
                var i, s, o, u, a = 0, f = e[0], l = [], c = this.length;
                if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f))
                    return this.each(function () {
                        v(this).domManip(e, n, r)
                    });
                if (v.isFunction(f))
                    return this.each(function (i) {
                        var s = v(this);
                        e[0] = f.call(this, i, n ? s.html() : t),
                            s.domManip(e, n, r)
                    });
                if (this[0]) {
                    i = v.buildFragment(e, this, l),
                        o = i.fragment,
                        s = o.firstChild,
                        o.childNodes.length === 1 && (o = s);
                    if (s) {
                        n = n && v.nodeName(s, "tr");
                        for (u = i.cacheable || c - 1; a < c; a++)
                            r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0))
                    }
                    o = s = null,
                        l.length && v.each(l, function (e, t) {
                            t.src ? v.ajax ? v.ajax({
                                url: t.src,
                                type: "GET",
                                dataType: "script",
                                async: !1,
                                global: !1,
                                "throws": !0
                            }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")),
                                t.parentNode && t.parentNode.removeChild(t)
                        })
                }
                return this
            }
        }),
        v.buildFragment = function (e, n, r) {
            var s, o, u, a = e[0];
            return n = n || i,
                n = !n.nodeType && n[0] || n,
                n = n.ownerDocument || n,
                e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0,
                    s = v.fragments[a],
                    u = s !== t),
                s || (s = n.createDocumentFragment(),
                    v.clean(e, n, s, r),
                    o && (v.fragments[a] = u && s)),
                {
                    fragment: s,
                    cacheable: o
                }
        }
        ,
        v.fragments = {},
        v.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (e, t) {
            v.fn[e] = function (n) {
                var r, i = 0, s = [], o = v(n), u = o.length, a = this.length === 1 && this[0].parentNode;
                if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1)
                    return o[t](this[0]),
                        this;
                for (; i < u; i++)
                    r = (i > 0 ? this.clone(!0) : this).get(),
                        v(o[i])[t](r),
                        s = s.concat(r);
                return this.pushStack(s, e, o.selector)
            }
        }),
        v.extend({
            clone: function (e, t, n) {
                var r, i, s, o;
                v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML,
                    kt.removeChild(o = kt.firstChild));
                if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                    Ot(e, o),
                        r = Mt(e),
                        i = Mt(o);
                    for (s = 0; r[s]; ++s)
                        i[s] && Ot(r[s], i[s])
                }
                if (t) {
                    At(e, o);
                    if (n) {
                        r = Mt(e),
                            i = Mt(o);
                        for (s = 0; r[s]; ++s)
                            At(r[s], i[s])
                    }
                }
                return r = i = null,
                    o
            },
            clean: function (e, t, n, r) {
                var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct, b = [];
                if (!t || typeof t.createDocumentFragment == "undefined")
                    t = i;
                for (s = 0; (u = e[s]) != null; s++) {
                    typeof u == "number" && (u += "");
                    if (!u)
                        continue; if (typeof u == "string")
                        if (!gt.test(u))
                            u = t.createTextNode(u);
                        else {
                            y = y || lt(t),
                                c = t.createElement("div"),
                                y.appendChild(c),
                                u = u.replace(dt, "<$1></$2>"),
                                a = (vt.exec(u) || ["", ""])[1].toLowerCase(),
                                f = Nt[a] || Nt._default,
                                l = f[0],
                                c.innerHTML = f[1] + u + f[2];
                            while (l--)
                                c = c.lastChild;
                            if (!v.support.tbody) {
                                h = mt.test(u),
                                    p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                                for (o = p.length - 1; o >= 0; --o)
                                    v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
                            }
                            !v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild),
                                u = c.childNodes,
                                c.parentNode.removeChild(c)
                        }
                    u.nodeType ? b.push(u) : v.merge(b, u)
                }
                c && (u = c = y = null);
                if (!v.support.appendChecked)
                    for (s = 0; (u = b[s]) != null; s++)
                        v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
                if (n) {
                    m = function (e) {
                        if (!e.type || xt.test(e.type))
                            return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                    }
                        ;
                    for (s = 0; (u = b[s]) != null; s++)
                        if (!v.nodeName(u, "script") || !m(u))
                            n.appendChild(u),
                                typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m),
                                    b.splice.apply(b, [s + 1, 0].concat(g)),
                                    s += g.length)
                }
                return b
            },
            cleanData: function (e, t) {
                var n, r, i, s, o = 0, u = v.expando, a = v.cache, f = v.support.deleteExpando, l = v.event.special;
                for (; (i = e[o]) != null; o++)
                    if (t || v.acceptData(i)) {
                        r = i[u],
                            n = r && a[r];
                        if (n) {
                            if (n.events)
                                for (s in n.events)
                                    l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                            a[r] && (delete a[r],
                                f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null,
                                v.deletedIds.push(r))
                        }
                    }
            }
        }),
        function () {
            var e, t;
            v.uaMatch = function (e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }
                ,
                e = v.uaMatch(o.userAgent),
                t = {},
                e.browser && (t[e.browser] = !0,
                    t.version = e.version),
                t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0),
                v.browser = t,
                v.sub = function () {
                    function e(t, n) {
                        return new e.fn.init(t, n)
                    }
                    v.extend(!0, e, this),
                        e.superclass = this,
                        e.fn = e.prototype = this(),
                        e.fn.constructor = e,
                        e.sub = this.sub,
                        e.fn.init = function (r, i) {
                            return i && i instanceof v && !(i instanceof e) && (i = e(i)),
                                v.fn.init.call(this, r, i, t)
                        }
                        ,
                        e.fn.init.prototype = e.fn;
                    var t = e(i);
                    return e
                }
        }();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i, jt = /opacity=([^)]*)/, Ft = /^(top|right|bottom|left)$/, It = /^(none|table(?!-c[ea]).+)/, qt = /^margin/, Rt = new RegExp("^(" + m + ")(.*)$", "i"), Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"), zt = new RegExp("^([-+])=(" + m + ")", "i"), Wt = {
        BODY: "block"
    }, Xt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Vt = {
        letterSpacing: 0,
        fontWeight: 400
    }, $t = ["Top", "Right", "Bottom", "Left"], Jt = ["Webkit", "O", "Moz", "ms"], Kt = v.fn.toggle;
    v.fn.extend({
        css: function (e, n) {
            return v.access(this, function (e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function () {
            return Yt(this, !0)
        },
        hide: function () {
            return Yt(this)
        },
        toggle: function (e, t) {
            var n = typeof e == "boolean";
            return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
                (n ? e : Gt(this)) ? v(this).show() : v(this).hide()
            })
        }
    }),
        v.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = Dt(e, "opacity");
                            return n === "" ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": v.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function (e, n, r, i) {
                if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)
                    return;
                var s, o, u, a = v.camelCase(n), f = e.style;
                n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)),
                    u = v.cssHooks[n] || v.cssHooks[a];
                if (r === t)
                    return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
                o = typeof r,
                    o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)),
                        o = "number");
                if (r == null || o === "number" && isNaN(r))
                    return;
                o === "number" && !v.cssNumber[a] && (r += "px");
                if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t)
                    try {
                        f[n] = r
                    } catch (l) { }
            },
            css: function (e, n, r, i) {
                var s, o, u, a = v.camelCase(n);
                return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)),
                    u = v.cssHooks[n] || v.cssHooks[a],
                    u && "get" in u && (s = u.get(e, !0, i)),
                    s === t && (s = Dt(e, n)),
                    s === "normal" && n in Vt && (s = Vt[n]),
                    r || i !== t ? (o = parseFloat(s),
                        r || v.isNumeric(o) ? o || 0 : s) : s
            },
            swap: function (e, t, n) {
                var r, i, s = {};
                for (i in t)
                    s[i] = e.style[i],
                        e.style[i] = t[i];
                r = n.call(e);
                for (i in t)
                    e.style[i] = s[i];
                return r
            }
        }),
        e.getComputedStyle ? Dt = function (t, n) {
            var r, i, s, o, u = e.getComputedStyle(t, null), a = t.style;
            return u && (r = u.getPropertyValue(n) || u[n],
                r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)),
                Ut.test(r) && qt.test(n) && (i = a.width,
                    s = a.minWidth,
                    o = a.maxWidth,
                    a.minWidth = a.maxWidth = a.width = r,
                    r = u.width,
                    a.width = i,
                    a.minWidth = s,
                    a.maxWidth = o)),
                r
        }
            : i.documentElement.currentStyle && (Dt = function (e, t) {
                var n, r, i = e.currentStyle && e.currentStyle[t], s = e.style;
                return i == null && s && s[t] && (i = s[t]),
                    Ut.test(i) && !Ft.test(t) && (n = s.left,
                        r = e.runtimeStyle && e.runtimeStyle.left,
                        r && (e.runtimeStyle.left = e.currentStyle.left),
                        s.left = t === "fontSize" ? "1em" : i,
                        i = s.pixelLeft + "px",
                        s.left = n,
                        r && (e.runtimeStyle.left = r)),
                    i === "" ? "auto" : i
            }
            ),
        v.each(["height", "width"], function (e, t) {
            v.cssHooks[t] = {
                get: function (e, n, r) {
                    if (n)
                        return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
                            return tn(e, t, r)
                        }) : tn(e, t, r)
                },
                set: function (e, n, r) {
                    return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
                }
            }
        }),
        v.support.opacity || (v.cssHooks.opacity = {
            get: function (e, t) {
                return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function (e, t) {
                var n = e.style
                    , r = e.currentStyle
                    , i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : ""
                    , s = r && r.filter || n.filter || "";
                n.zoom = 1;
                if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                    n.removeAttribute("filter");
                    if (r && !r.filter)
                        return
                }
                n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
            }
        }),
        v(function () {
            v.support.reliableMarginRight || (v.cssHooks.marginRight = {
                get: function (e, t) {
                    return v.swap(e, {
                        display: "inline-block"
                    }, function () {
                        if (t)
                            return Dt(e, "marginRight")
                    })
                }
            }),
                !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
                    v.cssHooks[t] = {
                        get: function (e, n) {
                            if (n) {
                                var r = Dt(e, t);
                                return Ut.test(r) ? v(e).position()[t] + "px" : r
                            }
                        }
                    }
                })
        }),
        v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
            return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
        }
            ,
            v.expr.filters.visible = function (e) {
                return !v.expr.filters.hidden(e)
            }
        ),
        v.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function (e, t) {
            v.cssHooks[e + t] = {
                expand: function (n) {
                    var r, i = typeof n == "string" ? n.split(" ") : [n], s = {};
                    for (r = 0; r < 4; r++)
                        s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
                    return s
                }
            },
                qt.test(e) || (v.cssHooks[e + t].set = Zt)
        });
    var rn = /%20/g
        , sn = /\[\]$/
        , on = /\r?\n/g
        , un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i
        , an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function () {
            return v.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
            }).map(function (e, t) {
                var n = v(this).val();
                return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
                    return {
                        name: t.name,
                        value: e.replace(on, "\r\n")
                    }
                }) : {
                        name: t.name,
                        value: n.replace(on, "\r\n")
                    }
            }).get()
        }
    }),
        v.param = function (e, n) {
            var r, i = [], s = function (e, t) {
                t = v.isFunction(t) ? t() : t == null ? "" : t,
                    i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            }
                ;
            n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
            if (v.isArray(e) || e.jquery && !v.isPlainObject(e))
                v.each(e, function () {
                    s(this.name, this.value)
                });
            else
                for (r in e)
                    fn(r, e[r], n, s);
            return i.join("&").replace(rn, "+")
        }
        ;
    var ln, cn, hn = /#.*$/, pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, vn = /^(?:GET|HEAD)$/, mn = /^\/\//, gn = /\?/, yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bn = /([?&])_=[^&]*/, wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, En = v.fn.load, Sn = {}, xn = {}, Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch (Nn) {
        cn = i.createElement("a"),
            cn.href = "",
            cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [],
        v.fn.load = function (e, n, r) {
            if (typeof e != "string" && En)
                return En.apply(this, arguments);
            if (!this.length)
                return this;
            var i, s, o, u = this, a = e.indexOf(" ");
            return a >= 0 && (i = e.slice(a, e.length),
                e = e.slice(0, a)),
                v.isFunction(n) ? (r = n,
                    n = t) : n && typeof n == "object" && (s = "POST"),
                v.ajax({
                    url: e,
                    type: s,
                    dataType: "html",
                    data: n,
                    complete: function (e, t) {
                        r && u.each(r, o || [e.responseText, t, e])
                    }
                }).done(function (e) {
                    o = arguments,
                        u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
                }),
                this
        }
        ,
        v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
            v.fn[t] = function (e) {
                return this.on(t, e)
            }
        }),
        v.each(["get", "post"], function (e, n) {
            v[n] = function (e, r, i, s) {
                return v.isFunction(r) && (s = s || i,
                    i = r,
                    r = t),
                    v.ajax({
                        type: n,
                        url: e,
                        data: r,
                        success: i,
                        dataType: s
                    })
            }
        }),
        v.extend({
            getScript: function (e, n) {
                return v.get(e, t, n, "script")
            },
            getJSON: function (e, t, n) {
                return v.get(e, t, n, "json")
            },
            ajaxSetup: function (e, t) {
                return t ? Ln(e, v.ajaxSettings) : (t = e,
                    e = v.ajaxSettings),
                    Ln(e, t),
                    e
            },
            ajaxSettings: {
                url: cn,
                isLocal: dn.test(ln[1]),
                global: !0,
                type: "GET",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                processData: !0,
                async: !0,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": Tn
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": e.String,
                    "text html": !0,
                    "text json": v.parseJSON,
                    "text xml": v.parseXML
                },
                flatOptions: {
                    context: !0,
                    url: !0
                }
            },
            ajaxPrefilter: Cn(Sn),
            ajaxTransport: Cn(xn),
            ajax: function (e, n) {
                function T(e, n, s, a) {
                    var l, y, b, w, S, T = n;
                    if (E === 2)
                        return;
                    E = 2,
                        u && clearTimeout(u),
                        o = t,
                        i = a || "",
                        x.readyState = e > 0 ? 4 : 0,
                        s && (w = An(c, x, s));
                    if (e >= 200 && e < 300 || e === 304)
                        c.ifModified && (S = x.getResponseHeader("Last-Modified"),
                            S && (v.lastModified[r] = S),
                            S = x.getResponseHeader("Etag"),
                            S && (v.etag[r] = S)),
                            e === 304 ? (T = "notmodified",
                                l = !0) : (l = On(c, w),
                                    T = l.state,
                                    y = l.data,
                                    b = l.error,
                                    l = !b);
                    else {
                        b = T;
                        if (!T || e)
                            T = "error",
                                e < 0 && (e = 0)
                    }
                    x.status = e,
                        x.statusText = (n || T) + "",
                        l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]),
                        x.statusCode(g),
                        g = t,
                        f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]),
                        m.fireWith(h, [x, T]),
                        f && (p.trigger("ajaxComplete", [x, c]),
                            --v.active || v.event.trigger("ajaxStop"))
                }
                typeof e == "object" && (n = e,
                    e = t),
                    n = n || {};
                var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n), h = c.context || c, p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event, d = v.Deferred(), m = v.Callbacks("once memory"), g = c.statusCode || {}, b = {}, w = {}, E = 0, S = "canceled", x = {
                    readyState: 0,
                    setRequestHeader: function (e, t) {
                        if (!E) {
                            var n = e.toLowerCase();
                            e = w[n] = w[n] || e,
                                b[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return E === 2 ? i : null
                    },
                    getResponseHeader: function (e) {
                        var n;
                        if (E === 2) {
                            if (!s) {
                                s = {};
                                while (n = pn.exec(i))
                                    s[n[1].toLowerCase()] = n[2]
                            }
                            n = s[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function (e) {
                        return E || (c.mimeType = e),
                            this
                    },
                    abort: function (e) {
                        return e = e || S,
                            o && o.abort(e),
                            T(0, e),
                            this
                    }
                };
                d.promise(x),
                    x.success = x.done,
                    x.error = x.fail,
                    x.complete = m.add,
                    x.statusCode = function (e) {
                        if (e) {
                            var t;
                            if (E < 2)
                                for (t in e)
                                    g[t] = [g[t], e[t]];
                            else
                                t = e[x.status],
                                    x.always(t)
                        }
                        return this
                    }
                    ,
                    c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"),
                    c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y),
                    c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()),
                        c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))),
                    c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)),
                    kn(Sn, c, n, x);
                if (E === 2)
                    return x;
                f = c.global,
                    c.type = c.type.toUpperCase(),
                    c.hasContent = !vn.test(c.type),
                    f && v.active++ === 0 && v.event.trigger("ajaxStart");
                if (!c.hasContent) {
                    c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data,
                        delete c.data),
                        r = c.url;
                    if (c.cache === !1) {
                        var N = v.now()
                            , C = c.url.replace(bn, "$1_=" + N);
                        c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
                    }
                }
                (c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType),
                    c.ifModified && (r = r || c.url,
                        v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]),
                        v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])),
                    x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
                for (l in c.headers)
                    x.setRequestHeader(l, c.headers[l]);
                if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                    S = "abort";
                    for (l in {
                        success: 1,
                        error: 1,
                        complete: 1
                    })
                        x[l](c[l]);
                    o = kn(xn, c, n, x);
                    if (!o)
                        T(-1, "No Transport");
                    else {
                        x.readyState = 1,
                            f && p.trigger("ajaxSend", [x, c]),
                            c.async && c.timeout > 0 && (u = setTimeout(function () {
                                x.abort("timeout")
                            }, c.timeout));
                        try {
                            E = 1,
                                o.send(b, T)
                        } catch (k) {
                            if (!(E < 2))
                                throw k;
                            T(-1, k)
                        }
                    }
                    return x
                }
                return x.abort()
            },
            active: 0,
            lastModified: {},
            etag: {}
        });
    var Mn = []
        , _n = /\?/
        , Dn = /(=)\?(?=&|$)|\?\?/
        , Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            return this[e] = !0,
                e
        }
    }),
        v.ajaxPrefilter("json jsonp", function (n, r, i) {
            var s, o, u, a = n.data, f = n.url, l = n.jsonp !== !1, c = l && Dn.test(f), h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
            if (n.dataTypes[0] === "jsonp" || c || h)
                return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback,
                    o = e[s],
                    c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s),
                    n.converters["script json"] = function () {
                        return u || v.error(s + " was not called"),
                            u[0]
                    }
                    ,
                    n.dataTypes[0] = "json",
                    e[s] = function () {
                        u = arguments
                    }
                    ,
                    i.always(function () {
                        e[s] = o,
                            n[s] && (n.jsonpCallback = r.jsonpCallback,
                                Mn.push(s)),
                            u && v.isFunction(o) && o(u[0]),
                            u = o = t
                    }),
                    "script"
        }),
        v.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function (e) {
                    return v.globalEval(e),
                        e
                }
            }
        }),
        v.ajaxPrefilter("script", function (e) {
            e.cache === t && (e.cache = !1),
                e.crossDomain && (e.type = "GET",
                    e.global = !1)
        }),
        v.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
                return {
                    send: function (s, o) {
                        n = i.createElement("script"),
                            n.async = "async",
                            e.scriptCharset && (n.charset = e.scriptCharset),
                            n.src = e.url,
                            n.onload = n.onreadystatechange = function (e, i) {
                                if (i || !n.readyState || /loaded|complete/.test(n.readyState))
                                    n.onload = n.onreadystatechange = null,
                                        r && n.parentNode && r.removeChild(n),
                                        n = t,
                                        i || o(200, "success")
                            }
                            ,
                            r.insertBefore(n, r.firstChild)
                    },
                    abort: function () {
                        n && n.onload(0, 1)
                    }
                }
            }
        });
    var Hn, Bn = e.ActiveXObject ? function () {
        for (var e in Hn)
            Hn[e](0, 1)
    }
        : !1, jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return !this.isLocal && Fn() || In()
    }
        : Fn,
        function (e) {
            v.extend(v.support, {
                ajax: !!e,
                cors: !!e && "withCredentials" in e
            })
        }(v.ajaxSettings.xhr()),
        v.support.ajax && v.ajaxTransport(function (n) {
            if (!n.crossDomain || v.support.cors) {
                var r;
                return {
                    send: function (i, s) {
                        var o, u, a = n.xhr();
                        n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                        if (n.xhrFields)
                            for (u in n.xhrFields)
                                a[u] = n.xhrFields[u];
                        n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType),
                            !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (u in i)
                                a.setRequestHeader(u, i[u])
                        } catch (f) { }
                        a.send(n.hasContent && n.data || null),
                            r = function (e, i) {
                                var u, f, l, c, h;
                                try {
                                    if (r && (i || a.readyState === 4)) {
                                        r = t,
                                            o && (a.onreadystatechange = v.noop,
                                                Bn && delete Hn[o]);
                                        if (i)
                                            a.readyState !== 4 && a.abort();
                                        else {
                                            u = a.status,
                                                l = a.getAllResponseHeaders(),
                                                c = {},
                                                h = a.responseXML,
                                                h && h.documentElement && (c.xml = h);
                                            try {
                                                c.text = a.responseText
                                            } catch (p) { }
                                            try {
                                                f = a.statusText
                                            } catch (p) {
                                                f = ""
                                            }
                                            !u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                                        }
                                    }
                                } catch (d) {
                                    i || s(-1, d)
                                }
                                c && s(u, f, c, l)
                            }
                            ,
                            n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn,
                                Bn && (Hn || (Hn = {},
                                    v(e).unload(Bn)),
                                    Hn[o] = r),
                                a.onreadystatechange = r) : r()
                    },
                    abort: function () {
                        r && r(0, 1)
                    }
                }
            }
        });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/, zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"), Wn = /queueHooks$/, Xn = [Gn], Vn = {
        "*": [function (e, t) {
            var n, r, i = this.createTween(e, t), s = zn.exec(t), o = i.cur(), u = +o || 0, a = 1, f = 20;
            if (s) {
                n = +s[2],
                    r = s[3] || (v.cssNumber[e] ? "" : "px");
                if (r !== "px" && u) {
                    u = v.css(i.elem, e, !0) || n || 1;
                    do
                        a = a || ".5",
                            u /= a,
                            v.style(i.elem, e, u + r);
                    while (a !== (a = i.cur() / o) && a !== 1 && --f)
                }
                i.unit = r,
                    i.start = u,
                    i.end = s[1] ? u + (s[1] + 1) * n : n
            }
            return i
        }
        ]
    };
    v.Animation = v.extend(Kn, {
        tweener: function (e, t) {
            v.isFunction(e) ? (t = e,
                e = ["*"]) : e = e.split(" ");
            var n, r = 0, i = e.length;
            for (; r < i; r++)
                n = e[r],
                    Vn[n] = Vn[n] || [],
                    Vn[n].unshift(t)
        },
        prefilter: function (e, t) {
            t ? Xn.unshift(e) : Xn.push(e)
        }
    }),
        v.Tween = Yn,
        Yn.prototype = {
            constructor: Yn,
            init: function (e, t, n, r, i, s) {
                this.elem = e,
                    this.prop = n,
                    this.easing = i || "swing",
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = s || (v.cssNumber[n] ? "" : "px")
            },
            cur: function () {
                var e = Yn.propHooks[this.prop];
                return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
            },
            run: function (e) {
                var t, n = Yn.propHooks[this.prop];
                return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : Yn.propHooks._default.set(this),
                    this
            }
        },
        Yn.prototype.init.prototype = Yn.prototype,
        Yn.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""),
                        !t || t === "auto" ? 0 : t) : e.elem[e.prop]
                },
                set: function (e) {
                    v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        },
        Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        v.each(["toggle", "show", "hide"], function (e, t) {
            var n = v.fn[t];
            v.fn[t] = function (r, i, s) {
                return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
            }
        }),
        v.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(Gt).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function (e, t, n, r) {
                var i = v.isEmptyObject(e)
                    , s = v.speed(t, n, r)
                    , o = function () {
                        var t = Kn(this, v.extend({}, e), s);
                        i && t.stop(!0)
                    }
                    ;
                return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
            },
            stop: function (e, n, r) {
                var i = function (e) {
                    var t = e.stop;
                    delete e.stop,
                        t(r)
                }
                    ;
                return typeof e != "string" && (r = n,
                    n = e,
                    e = t),
                    n && e !== !1 && this.queue(e || "fx", []),
                    this.each(function () {
                        var t = !0
                            , n = e != null && e + "queueHooks"
                            , s = v.timers
                            , o = v._data(this);
                        if (n)
                            o[n] && o[n].stop && i(o[n]);
                        else
                            for (n in o)
                                o[n] && o[n].stop && Wn.test(n) && i(o[n]);
                        for (n = s.length; n--;)
                            s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r),
                                t = !1,
                                s.splice(n, 1));
                        (t || !r) && v.dequeue(this, e)
                    })
            }
        }),
        v.each({
            slideDown: Zn("show"),
            slideUp: Zn("hide"),
            slideToggle: Zn("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function (e, t) {
            v.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }),
        v.speed = function (e, t, n) {
            var r = e && typeof e == "object" ? v.extend({}, e) : {
                complete: n || !n && t || v.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !v.isFunction(t) && t
            };
            r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
            if (r.queue == null || r.queue === !0)
                r.queue = "fx";
            return r.old = r.complete,
                r.complete = function () {
                    v.isFunction(r.old) && r.old.call(this),
                        r.queue && v.dequeue(this, r.queue)
                }
                ,
                r
        }
        ,
        v.easing = {
            linear: function (e) {
                return e
            },
            swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        },
        v.timers = [],
        v.fx = Yn.prototype.init,
        v.fx.tick = function () {
            var e, n = v.timers, r = 0;
            qn = v.now();
            for (; r < n.length; r++)
                e = n[r],
                    !e() && n[r] === e && n.splice(r--, 1);
            n.length || v.fx.stop(),
                qn = t
        }
        ,
        v.fx.timer = function (e) {
            e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
        }
        ,
        v.fx.interval = 13,
        v.fx.stop = function () {
            clearInterval(Rn),
                Rn = null
        }
        ,
        v.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        v.fx.step = {},
        v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
            return v.grep(v.timers, function (t) {
                return e === t.elem
            }).length
        }
        );
    var er = /^(?:body|html)$/i;
    v.fn.offset = function (e) {
        if (arguments.length)
            return e === t ? this : this.each(function (t) {
                v.offset.setOffset(this, e, t)
            });
        var n, r, i, s, o, u, a, f = {
            top: 0,
            left: 0
        }, l = this[0], c = l && l.ownerDocument;
        if (!c)
            return;
        return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement,
            v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()),
                i = tr(c),
                s = n.clientTop || r.clientTop || 0,
                o = n.clientLeft || r.clientLeft || 0,
                u = i.pageYOffset || n.scrollTop,
                a = i.pageXOffset || n.scrollLeft,
                {
                    top: f.top + u - s,
                    left: f.left + a - o
                }) : f)
    }
        ,
        v.offset = {
            bodyOffset: function (e) {
                var t = e.offsetTop
                    , n = e.offsetLeft;
                return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0,
                    n += parseFloat(v.css(e, "marginLeft")) || 0),
                    {
                        top: t,
                        left: n
                    }
            },
            setOffset: function (e, t, n) {
                var r = v.css(e, "position");
                r === "static" && (e.style.position = "relative");
                var i = v(e), s = i.offset(), o = v.css(e, "top"), u = v.css(e, "left"), a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1, f = {}, l = {}, c, h;
                a ? (l = i.position(),
                    c = l.top,
                    h = l.left) : (c = parseFloat(o) || 0,
                        h = parseFloat(u) || 0),
                    v.isFunction(t) && (t = t.call(e, n, s)),
                    t.top != null && (f.top = t.top - s.top + c),
                    t.left != null && (f.left = t.left - s.left + h),
                    "using" in t ? t.using.call(e, f) : i.css(f)
            }
        },
        v.fn.extend({
            position: function () {
                if (!this[0])
                    return;
                var e = this[0]
                    , t = this.offsetParent()
                    , n = this.offset()
                    , r = er.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return n.top -= parseFloat(v.css(e, "marginTop")) || 0,
                    n.left -= parseFloat(v.css(e, "marginLeft")) || 0,
                    r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0,
                    r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0,
                    {
                        top: n.top - r.top,
                        left: n.left - r.left
                    }
            },
            offsetParent: function () {
                return this.map(function () {
                    var e = this.offsetParent || i.body;
                    while (e && !er.test(e.nodeName) && v.css(e, "position") === "static")
                        e = e.offsetParent;
                    return e || i.body
                })
            }
        }),
        v.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function (e, n) {
            var r = /Y/.test(n);
            v.fn[e] = function (i) {
                return v.access(this, function (e, i, s) {
                    var o = tr(e);
                    if (s === t)
                        return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                    o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s
                }, e, i, arguments.length, null)
            }
        }),
        v.each({
            Height: "height",
            Width: "width"
        }, function (e, n) {
            v.each({
                padding: "inner" + e,
                content: n,
                "": "outer" + e
            }, function (r, i) {
                v.fn[i] = function (i, s) {
                    var o = arguments.length && (r || typeof i != "boolean")
                        , u = r || (i === !0 || s === !0 ? "margin" : "border");
                    return v.access(this, function (n, r, i) {
                        var s;
                        return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement,
                            Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                    }, n, o ? i : t, o, null)
                }
            })
        }),
        e.jQuery = e.$ = v,
        typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
            return v
        })
})(window);
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function (r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r)
                , a = (o || r).length
                , c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c],
                c += n),
                t(r, e, u, o, c, a)
        }
    }
    function t(n) {
        return function (t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t))
                    return i;
            return -1
        }
    }
    function r(n, t, r) {
        return function (e, u, i) {
            var o = 0
                , a = O(e);
            if ("number" == typeof i)
                n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a)
                return i = r(e, u),
                    e[i] === u ? i : -1;
            if (u !== u)
                return i = t(l.call(e, o, a), m.isNaN),
                    i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u)
                    return i;
            return -1
        }
    }
    function e(n, t) {
        var r = I.length
            , e = n.constructor
            , u = m.isFunction(e) && e.prototype || a
            , i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;)
            i = I[r],
                i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this
        , i = u._
        , o = Array.prototype
        , a = Object.prototype
        , c = Function.prototype
        , f = o.push
        , l = o.slice
        , s = a.toString
        , p = a.hasOwnProperty
        , h = Array.isArray
        , v = Object.keys
        , g = c.bind
        , y = Object.create
        , d = function () { }
        , m = function (n) {
            return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n)
        }
        ;
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m),
        exports._ = m) : u._ = m,
        m.VERSION = "1.8.3";
    var b = function (n, t, r) {
        if (t === void 0)
            return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function (r) {
                    return n.call(t, r)
                }
                    ;
            case 2:
                return function (r, e) {
                    return n.call(t, r, e)
                }
                    ;
            case 3:
                return function (r, e, u) {
                    return n.call(t, r, e, u)
                }
                    ;
            case 4:
                return function (r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function () {
            return n.apply(t, arguments)
        }
    }
        , x = function (n, t, r) {
            return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
        }
        ;
    m.iteratee = function (n, t) {
        return x(n, t, 1 / 0)
    }
        ;
    var _ = function (n, t) {
        return function (r) {
            var e = arguments.length;
            if (2 > e || null == r)
                return r;
            for (var u = 1; e > u; u++)
                for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                    var f = o[c];
                    t && r[f] !== void 0 || (r[f] = i[f])
                }
            return r
        }
    }
        , j = function (n) {
            if (!m.isObject(n))
                return {};
            if (y)
                return y(n);
            d.prototype = n;
            var t = new d;
            return d.prototype = null,
                t
        }
        , w = function (n) {
            return function (t) {
                return null == t ? void 0 : t[n]
            }
        }
        , A = Math.pow(2, 53) - 1
        , O = w("length")
        , k = function (n) {
            var t = O(n);
            return "number" == typeof t && t >= 0 && A >= t
        }
        ;
    m.each = m.forEach = function (n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0,
                u = n.length; u > e; e++)
                t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0,
                u = i.length; u > e; e++)
                t(n[i[e]], i[e], n)
        }
        return n
    }
        ,
        m.map = m.collect = function (n, t, r) {
            t = x(t, r);
            for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
                var a = e ? e[o] : o;
                i[o] = t(n[a], a, n)
            }
            return i
        }
        ,
        m.reduce = m.foldl = m.inject = n(1),
        m.reduceRight = m.foldr = n(-1),
        m.find = m.detect = function (n, t, r) {
            var e;
            return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r),
                e !== void 0 && e !== -1 ? n[e] : void 0
        }
        ,
        m.filter = m.select = function (n, t, r) {
            var e = [];
            return t = x(t, r),
                m.each(n, function (n, r, u) {
                    t(n, r, u) && e.push(n)
                }),
                e
        }
        ,
        m.reject = function (n, t, r) {
            return m.filter(n, m.negate(x(t)), r)
        }
        ,
        m.every = m.all = function (n, t, r) {
            t = x(t, r);
            for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
                var o = e ? e[i] : i;
                if (!t(n[o], o, n))
                    return !1
            }
            return !0
        }
        ,
        m.some = m.any = function (n, t, r) {
            t = x(t, r);
            for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
                var o = e ? e[i] : i;
                if (t(n[o], o, n))
                    return !0
            }
            return !1
        }
        ,
        m.contains = m.includes = m.include = function (n, t, r, e) {
            return k(n) || (n = m.values(n)),
                ("number" != typeof r || e) && (r = 0),
                m.indexOf(n, t, r) >= 0
        }
        ,
        m.invoke = function (n, t) {
            var r = l.call(arguments, 2)
                , e = m.isFunction(t);
            return m.map(n, function (n) {
                var u = e ? t : n[t];
                return null == u ? u : u.apply(n, r)
            })
        }
        ,
        m.pluck = function (n, t) {
            return m.map(n, m.property(t))
        }
        ,
        m.where = function (n, t) {
            return m.filter(n, m.matcher(t))
        }
        ,
        m.findWhere = function (n, t) {
            return m.find(n, m.matcher(t))
        }
        ,
        m.max = function (n, t, r) {
            var e, u, i = -1 / 0, o = -1 / 0;
            if (null == t && null != n) {
                n = k(n) ? n : m.values(n);
                for (var a = 0, c = n.length; c > a; a++)
                    e = n[a],
                        e > i && (i = e)
            } else
                t = x(t, r),
                    m.each(n, function (n, r, e) {
                        u = t(n, r, e),
                            (u > o || u === -1 / 0 && i === -1 / 0) && (i = n,
                                o = u)
                    });
            return i
        }
        ,
        m.min = function (n, t, r) {
            var e, u, i = 1 / 0, o = 1 / 0;
            if (null == t && null != n) {
                n = k(n) ? n : m.values(n);
                for (var a = 0, c = n.length; c > a; a++)
                    e = n[a],
                        i > e && (i = e)
            } else
                t = x(t, r),
                    m.each(n, function (n, r, e) {
                        u = t(n, r, e),
                            (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n,
                                o = u)
                    });
            return i
        }
        ,
        m.shuffle = function (n) {
            for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++)
                t = m.random(0, i),
                    t !== i && (u[i] = u[t]),
                    u[t] = r[i];
            return u
        }
        ,
        m.sample = function (n, t, r) {
            return null == t || r ? (k(n) || (n = m.values(n)),
                n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
        }
        ,
        m.sortBy = function (n, t, r) {
            return t = x(t, r),
                m.pluck(m.map(n, function (n, r, e) {
                    return {
                        value: n,
                        index: r,
                        criteria: t(n, r, e)
                    }
                }).sort(function (n, t) {
                    var r = n.criteria
                        , e = t.criteria;
                    if (r !== e) {
                        if (r > e || r === void 0)
                            return 1;
                        if (e > r || e === void 0)
                            return -1
                    }
                    return n.index - t.index
                }), "value")
        }
        ;
    var F = function (n) {
        return function (t, r, e) {
            var u = {};
            return r = x(r, e),
                m.each(t, function (e, i) {
                    var o = r(e, i, t);
                    n(u, e, o)
                }),
                u
        }
    }
        ;
    m.groupBy = F(function (n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }),
        m.indexBy = F(function (n, t, r) {
            n[r] = t
        }),
        m.countBy = F(function (n, t, r) {
            m.has(n, r) ? n[r]++ : n[r] = 1
        }),
        m.toArray = function (n) {
            return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
        }
        ,
        m.size = function (n) {
            return null == n ? 0 : k(n) ? n.length : m.keys(n).length
        }
        ,
        m.partition = function (n, t, r) {
            t = x(t, r);
            var e = []
                , u = [];
            return m.each(n, function (n, r, i) {
                (t(n, r, i) ? e : u).push(n)
            }),
                [e, u]
        }
        ,
        m.first = m.head = m.take = function (n, t, r) {
            return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
        }
        ,
        m.initial = function (n, t, r) {
            return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
        }
        ,
        m.last = function (n, t, r) {
            return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
        }
        ,
        m.rest = m.tail = m.drop = function (n, t, r) {
            return l.call(n, null == t || r ? 1 : t)
        }
        ,
        m.compact = function (n) {
            return m.filter(n, m.identity)
        }
        ;
    var S = function (n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0
                    , l = c.length;
                for (u.length += l; l > f;)
                    u[i++] = c[f++]
            } else
                r || (u[i++] = c)
        }
        return u
    }
        ;
    m.flatten = function (n, t) {
        return S(n, t, !1)
    }
        ,
        m.without = function (n) {
            return m.difference(n, l.call(arguments, 1))
        }
        ,
        m.uniq = m.unique = function (n, t, r, e) {
            m.isBoolean(t) || (e = r,
                r = t,
                t = !1),
                null != r && (r = x(r, e));
            for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
                var c = n[o]
                    , f = r ? r(c, o, n) : c;
                t ? (o && i === f || u.push(c),
                    i = f) : r ? m.contains(i, f) || (i.push(f),
                        u.push(c)) : m.contains(u, c) || u.push(c)
            }
            return u
        }
        ,
        m.union = function () {
            return m.uniq(S(arguments, !0, !0))
        }
        ,
        m.intersection = function (n) {
            for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
                var i = n[e];
                if (!m.contains(t, i)) {
                    for (var o = 1; r > o && m.contains(arguments[o], i); o++)
                        ;
                    o === r && t.push(i)
                }
            }
            return t
        }
        ,
        m.difference = function (n) {
            var t = S(arguments, !0, !0, 1);
            return m.filter(n, function (n) {
                return !m.contains(t, n)
            })
        }
        ,
        m.zip = function () {
            return m.unzip(arguments)
        }
        ,
        m.unzip = function (n) {
            for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)
                r[e] = m.pluck(n, e);
            return r
        }
        ,
        m.object = function (n, t) {
            for (var r = {}, e = 0, u = O(n); u > e; e++)
                t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
            return r
        }
        ,
        m.findIndex = t(1),
        m.findLastIndex = t(-1),
        m.sortedIndex = function (n, t, r, e) {
            r = x(r, e, 1);
            for (var u = r(t), i = 0, o = O(n); o > i;) {
                var a = Math.floor((i + o) / 2);
                r(n[a]) < u ? i = a + 1 : o = a
            }
            return i
        }
        ,
        m.indexOf = r(1, m.findIndex, m.sortedIndex),
        m.lastIndexOf = r(-1, m.findLastIndex),
        m.range = function (n, t, r) {
            null == t && (t = n || 0,
                n = 0),
                r = r || 1;
            for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++ ,
                n += r)
                u[i] = n;
            return u
        }
        ;
    var E = function (n, t, r, e, u) {
        if (!(e instanceof t))
            return n.apply(r, u);
        var i = j(n.prototype)
            , o = n.apply(i, u);
        return m.isObject(o) ? o : i
    }
        ;
    m.bind = function (n, t) {
        if (g && n.bind === g)
            return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n))
            throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2)
            , e = function () {
                return E(n, e, t, this, r.concat(l.call(arguments)))
            }
            ;
        return e
    }
        ,
        m.partial = function (n) {
            var t = l.call(arguments, 1)
                , r = function () {
                    for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)
                        i[o] = t[o] === m ? arguments[e++] : t[o];
                    for (; e < arguments.length;)
                        i.push(arguments[e++]);
                    return E(n, r, this, this, i)
                }
                ;
            return r
        }
        ,
        m.bindAll = function (n) {
            var t, r, e = arguments.length;
            if (1 >= e)
                throw new Error("bindAll must be passed function names");
            for (t = 1; e > t; t++)
                r = arguments[t],
                    n[r] = m.bind(n[r], n);
            return n
        }
        ,
        m.memoize = function (n, t) {
            var r = function (e) {
                var u = r.cache
                    , i = "" + (t ? t.apply(this, arguments) : e);
                return m.has(u, i) || (u[i] = n.apply(this, arguments)),
                    u[i]
            }
                ;
            return r.cache = {},
                r
        }
        ,
        m.delay = function (n, t) {
            var r = l.call(arguments, 2);
            return setTimeout(function () {
                return n.apply(null, r)
            }, t)
        }
        ,
        m.defer = m.partial(m.delay, m, 1),
        m.throttle = function (n, t, r) {
            var e, u, i, o = null, a = 0;
            r || (r = {});
            var c = function () {
                a = r.leading === !1 ? 0 : m.now(),
                    o = null,
                    i = n.apply(e, u),
                    o || (e = u = null)
            }
                ;
            return function () {
                var f = m.now();
                a || r.leading !== !1 || (a = f);
                var l = t - (f - a);
                return e = this,
                    u = arguments,
                    0 >= l || l > t ? (o && (clearTimeout(o),
                        o = null),
                        a = f,
                        i = n.apply(e, u),
                        o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)),
                    i
            }
        }
        ,
        m.debounce = function (n, t, r) {
            var e, u, i, o, a, c = function () {
                var f = m.now() - o;
                t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null,
                    r || (a = n.apply(i, u),
                        e || (i = u = null)))
            }
                ;
            return function () {
                i = this,
                    u = arguments,
                    o = m.now();
                var f = r && !e;
                return e || (e = setTimeout(c, t)),
                    f && (a = n.apply(i, u),
                        i = u = null),
                    a
            }
        }
        ,
        m.wrap = function (n, t) {
            return m.partial(t, n)
        }
        ,
        m.negate = function (n) {
            return function () {
                return !n.apply(this, arguments)
            }
        }
        ,
        m.compose = function () {
            var n = arguments
                , t = n.length - 1;
            return function () {
                for (var r = t, e = n[t].apply(this, arguments); r--;)
                    e = n[r].call(this, e);
                return e
            }
        }
        ,
        m.after = function (n, t) {
            return function () {
                return --n < 1 ? t.apply(this, arguments) : void 0
            }
        }
        ,
        m.before = function (n, t) {
            var r;
            return function () {
                return --n > 0 && (r = t.apply(this, arguments)),
                    1 >= n && (t = null),
                    r
            }
        }
        ,
        m.once = m.partial(m.before, 2);
    var M = !{
        toString: null
    }.propertyIsEnumerable("toString")
        , I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function (n) {
        if (!m.isObject(n))
            return [];
        if (v)
            return v(n);
        var t = [];
        for (var r in n)
            m.has(n, r) && t.push(r);
        return M && e(n, t),
            t
    }
        ,
        m.allKeys = function (n) {
            if (!m.isObject(n))
                return [];
            var t = [];
            for (var r in n)
                t.push(r);
            return M && e(n, t),
                t
        }
        ,
        m.values = function (n) {
            for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
                e[u] = n[t[u]];
            return e
        }
        ,
        m.mapObject = function (n, t, r) {
            t = x(t, r);
            for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)
                e = u[a],
                    o[e] = t(n[e], e, n);
            return o
        }
        ,
        m.pairs = function (n) {
            for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
                e[u] = [t[u], n[t[u]]];
            return e
        }
        ,
        m.invert = function (n) {
            for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)
                t[n[r[e]]] = r[e];
            return t
        }
        ,
        m.functions = m.methods = function (n) {
            var t = [];
            for (var r in n)
                m.isFunction(n[r]) && t.push(r);
            return t.sort()
        }
        ,
        m.extend = _(m.allKeys),
        m.extendOwn = m.assign = _(m.keys),
        m.findKey = function (n, t, r) {
            t = x(t, r);
            for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
                if (e = u[i],
                    t(n[e], e, n))
                    return e
        }
        ,
        m.pick = function (n, t, r) {
            var e, u, i = {}, o = n;
            if (null == o)
                return i;
            m.isFunction(t) ? (u = m.allKeys(o),
                e = b(t, r)) : (u = S(arguments, !1, !1, 1),
                    e = function (n, t, r) {
                        return t in r
                    }
                    ,
                    o = Object(o));
            for (var a = 0, c = u.length; c > a; a++) {
                var f = u[a]
                    , l = o[f];
                e(l, f, o) && (i[f] = l)
            }
            return i
        }
        ,
        m.omit = function (n, t, r) {
            if (m.isFunction(t))
                t = m.negate(t);
            else {
                var e = m.map(S(arguments, !1, !1, 1), String);
                t = function (n, t) {
                    return !m.contains(e, t)
                }
            }
            return m.pick(n, t, r)
        }
        ,
        m.defaults = _(m.allKeys, !0),
        m.create = function (n, t) {
            var r = j(n);
            return t && m.extendOwn(r, t),
                r
        }
        ,
        m.clone = function (n) {
            return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
        }
        ,
        m.tap = function (n, t) {
            return t(n),
                n
        }
        ,
        m.isMatch = function (n, t) {
            var r = m.keys(t)
                , e = r.length;
            if (null == n)
                return !e;
            for (var u = Object(n), i = 0; e > i; i++) {
                var o = r[i];
                if (t[o] !== u[o] || !(o in u))
                    return !1
            }
            return !0
        }
        ;
    var N = function (n, t, r, e) {
        if (n === t)
            return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t)
            return n === t;
        n instanceof m && (n = n._wrapped),
            t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t))
            return !1;
        switch (u) {
            case "[object RegExp]":
            case "[object String]":
                return "" + n == "" + t;
            case "[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t)
                return !1;
            var o = n.constructor
                , a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t)
                return !1
        }
        r = r || [],
            e = e || [];
        for (var c = r.length; c--;)
            if (r[c] === n)
                return e[c] === t;
        if (r.push(n),
            e.push(t),
            i) {
            if (c = n.length,
                c !== t.length)
                return !1;
            for (; c--;)
                if (!N(n[c], t[c], r, e))
                    return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length,
                m.keys(t).length !== c)
                return !1;
            for (; c--;)
                if (f = l[c],
                    !m.has(t, f) || !N(n[f], t[f], r, e))
                    return !1
        }
        return r.pop(),
            e.pop(),
            !0
    }
        ;
    m.isEqual = function (n, t) {
        return N(n, t)
    }
        ,
        m.isEmpty = function (n) {
            return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
        }
        ,
        m.isElement = function (n) {
            return !(!n || 1 !== n.nodeType)
        }
        ,
        m.isArray = h || function (n) {
            return "[object Array]" === s.call(n)
        }
        ,
        m.isObject = function (n) {
            var t = typeof n;
            return "function" === t || "object" === t && !!n
        }
        ,
        m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) {
            m["is" + n] = function (t) {
                return s.call(t) === "[object " + n + "]"
            }
        }),
        m.isArguments(arguments) || (m.isArguments = function (n) {
            return m.has(n, "callee")
        }
        ),
        "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function (n) {
            return "function" == typeof n || !1
        }
        ),
        m.isFinite = function (n) {
            return isFinite(n) && !isNaN(parseFloat(n))
        }
        ,
        m.isNaN = function (n) {
            return m.isNumber(n) && n !== +n
        }
        ,
        m.isBoolean = function (n) {
            return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
        }
        ,
        m.isNull = function (n) {
            return null === n
        }
        ,
        m.isUndefined = function (n) {
            return n === void 0
        }
        ,
        m.has = function (n, t) {
            return null != n && p.call(n, t)
        }
        ,
        m.noConflict = function () {
            return u._ = i,
                this
        }
        ,
        m.identity = function (n) {
            return n
        }
        ,
        m.constant = function (n) {
            return function () {
                return n
            }
        }
        ,
        m.noop = function () { }
        ,
        m.property = w,
        m.propertyOf = function (n) {
            return null == n ? function () { }
                : function (t) {
                    return n[t]
                }
        }
        ,
        m.matcher = m.matches = function (n) {
            return n = m.extendOwn({}, n),
                function (t) {
                    return m.isMatch(t, n)
                }
        }
        ,
        m.times = function (n, t, r) {
            var e = Array(Math.max(0, n));
            t = b(t, r, 1);
            for (var u = 0; n > u; u++)
                e[u] = t(u);
            return e
        }
        ,
        m.random = function (n, t) {
            return null == t && (t = n,
                n = 0),
                n + Math.floor(Math.random() * (t - n + 1))
        }
        ,
        m.now = Date.now || function () {
            return (new Date).getTime()
        }
        ;
    var B = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
        , T = m.invert(B)
        , R = function (n) {
            var t = function (t) {
                return n[t]
            }
                , r = "(?:" + m.keys(n).join("|") + ")"
                , e = RegExp(r)
                , u = RegExp(r, "g");
            return function (n) {
                return n = null == n ? "" : "" + n,
                    e.test(n) ? n.replace(u, t) : n
            }
        }
        ;
    m.escape = R(B),
        m.unescape = R(T),
        m.result = function (n, t, r) {
            var e = null == n ? void 0 : n[t];
            return e === void 0 && (e = r),
                m.isFunction(e) ? e.call(n) : e
        }
        ;
    var q = 0;
    m.uniqueId = function (n) {
        var t = ++q + "";
        return n ? n + t : t
    }
        ,
        m.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
    var K = /(.)^/
        , z = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
        , D = /\\|'|\r|\n|\u2028|\u2029/g
        , L = function (n) {
            return "\\" + z[n]
        }
        ;
    m.template = function (n, t, r) {
        !t && r && (t = r),
            t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g")
            , u = 0
            , i = "__p+='";
        n.replace(e, function (t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L),
                u = a + t.length,
                r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"),
                t
        }),
            i += "';\n",
            t.variable || (i = "with(obj||{}){\n" + i + "}\n"),
            i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i,
            a
        }
        var c = function (n) {
            return o.call(this, n, m)
        }
            , f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}",
            c
    }
        ,
        m.chain = function (n) {
            var t = m(n);
            return t._chain = !0,
                t
        }
        ;
    var P = function (n, t) {
        return n._chain ? m(t).chain() : t
    }
        ;
    m.mixin = function (n) {
        m.each(m.functions(n), function (t) {
            var r = m[t] = n[t];
            m.prototype[t] = function () {
                var n = [this._wrapped];
                return f.apply(n, arguments),
                    P(this, r.apply(m, n))
            }
        })
    }
        ,
        m.mixin(m),
        m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
            var t = o[n];
            m.prototype[n] = function () {
                var r = this._wrapped;
                return t.apply(r, arguments),
                    "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0],
                    P(this, r)
            }
        }),
        m.each(["concat", "join", "slice"], function (n) {
            var t = o[n];
            m.prototype[n] = function () {
                return P(this, t.apply(this._wrapped, arguments))
            }
        }),
        m.prototype.value = function () {
            return this._wrapped
        }
        ,
        m.prototype.valueOf = m.prototype.toJSON = m.prototype.value,
        m.prototype.toString = function () {
            return "" + this._wrapped
        }
        ,
        "function" == typeof define && define.amd && define("underscore", [], function () {
            return m
        })
}
).call(this);
//# sourceMappingURL=underscore-min.map
(function (t) {
    var e = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global;
    if (typeof define === "function" && define.amd) {
        define(["underscore", "jquery", "exports"], function (i, r, n) {
            e.Backbone = t(e, n, i, r)
        })
    } else if (typeof exports !== "undefined") {
        var i = require("underscore"), r;
        try {
            r = require("jquery")
        } catch (n) { }
        t(e, exports, i, r)
    } else {
        e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
    }
})(function (t, e, i, r) {
    var n = t.Backbone;
    var s = Array.prototype.slice;
    e.VERSION = "1.3.3";
    e.$ = r;
    e.noConflict = function () {
        t.Backbone = n;
        return this
    }
        ;
    e.emulateHTTP = false;
    e.emulateJSON = false;
    var a = function (t, e, r) {
        switch (t) {
            case 1:
                return function () {
                    return i[e](this[r])
                }
                    ;
            case 2:
                return function (t) {
                    return i[e](this[r], t)
                }
                    ;
            case 3:
                return function (t, n) {
                    return i[e](this[r], o(t, this), n)
                }
                    ;
            case 4:
                return function (t, n, s) {
                    return i[e](this[r], o(t, this), n, s)
                }
                    ;
            default:
                return function () {
                    var t = s.call(arguments);
                    t.unshift(this[r]);
                    return i[e].apply(i, t)
                }
        }
    }
        ;
    var h = function (t, e, r) {
        i.each(e, function (e, n) {
            if (i[n])
                t.prototype[n] = a(e, n, r)
        })
    }
        ;
    var o = function (t, e) {
        if (i.isFunction(t))
            return t;
        if (i.isObject(t) && !e._isModel(t))
            return l(t);
        if (i.isString(t))
            return function (e) {
                return e.get(t)
            }
                ;
        return t
    }
        ;
    var l = function (t) {
        var e = i.matches(t);
        return function (t) {
            return e(t.attributes)
        }
    }
        ;
    var u = e.Events = {};
    var c = /\s+/;
    var f = function (t, e, r, n, s) {
        var a = 0, h;
        if (r && typeof r === "object") {
            if (n !== void 0 && "context" in s && s.context === void 0)
                s.context = n;
            for (h = i.keys(r); a < h.length; a++) {
                e = f(t, e, h[a], r[h[a]], s)
            }
        } else if (r && c.test(r)) {
            for (h = r.split(c); a < h.length; a++) {
                e = t(e, h[a], n, s)
            }
        } else {
            e = t(e, r, n, s)
        }
        return e
    }
        ;
    u.on = function (t, e, i) {
        return d(this, t, e, i)
    }
        ;
    var d = function (t, e, i, r, n) {
        t._events = f(v, t._events || {}, e, i, {
            context: r,
            ctx: t,
            listening: n
        });
        if (n) {
            var s = t._listeners || (t._listeners = {});
            s[n.id] = n
        }
        return t
    }
        ;
    u.listenTo = function (t, e, r) {
        if (!t)
            return this;
        var n = t._listenId || (t._listenId = i.uniqueId("l"));
        var s = this._listeningTo || (this._listeningTo = {});
        var a = s[n];
        if (!a) {
            var h = this._listenId || (this._listenId = i.uniqueId("l"));
            a = s[n] = {
                obj: t,
                objId: n,
                id: h,
                listeningTo: s,
                count: 0
            }
        }
        d(t, e, r, this, a);
        return this
    }
        ;
    var v = function (t, e, i, r) {
        if (i) {
            var n = t[e] || (t[e] = []);
            var s = r.context
                , a = r.ctx
                , h = r.listening;
            if (h)
                h.count++;
            n.push({
                callback: i,
                context: s,
                ctx: s || a,
                listening: h
            })
        }
        return t
    }
        ;
    u.off = function (t, e, i) {
        if (!this._events)
            return this;
        this._events = f(g, this._events, t, e, {
            context: i,
            listeners: this._listeners
        });
        return this
    }
        ;
    u.stopListening = function (t, e, r) {
        var n = this._listeningTo;
        if (!n)
            return this;
        var s = t ? [t._listenId] : i.keys(n);
        for (var a = 0; a < s.length; a++) {
            var h = n[s[a]];
            if (!h)
                break;
            h.obj.off(e, r, this)
        }
        return this
    }
        ;
    var g = function (t, e, r, n) {
        if (!t)
            return;
        var s = 0, a;
        var h = n.context
            , o = n.listeners;
        if (!e && !r && !h) {
            var l = i.keys(o);
            for (; s < l.length; s++) {
                a = o[l[s]];
                delete o[a.id];
                delete a.listeningTo[a.objId]
            }
            return
        }
        var u = e ? [e] : i.keys(t);
        for (; s < u.length; s++) {
            e = u[s];
            var c = t[e];
            if (!c)
                break;
            var f = [];
            for (var d = 0; d < c.length; d++) {
                var v = c[d];
                if (r && r !== v.callback && r !== v.callback._callback || h && h !== v.context) {
                    f.push(v)
                } else {
                    a = v.listening;
                    if (a && --a.count === 0) {
                        delete o[a.id];
                        delete a.listeningTo[a.objId]
                    }
                }
            }
            if (f.length) {
                t[e] = f
            } else {
                delete t[e]
            }
        }
        return t
    }
        ;
    u.once = function (t, e, r) {
        var n = f(p, {}, t, e, i.bind(this.off, this));
        if (typeof t === "string" && r == null)
            e = void 0;
        return this.on(n, e, r)
    }
        ;
    u.listenToOnce = function (t, e, r) {
        var n = f(p, {}, e, r, i.bind(this.stopListening, this, t));
        return this.listenTo(t, n)
    }
        ;
    var p = function (t, e, r, n) {
        if (r) {
            var s = t[e] = i.once(function () {
                n(e, s);
                r.apply(this, arguments)
            });
            s._callback = r
        }
        return t
    }
        ;
    u.trigger = function (t) {
        if (!this._events)
            return this;
        var e = Math.max(0, arguments.length - 1);
        var i = Array(e);
        for (var r = 0; r < e; r++)
            i[r] = arguments[r + 1];
        f(m, this._events, t, void 0, i);
        return this
    }
        ;
    var m = function (t, e, i, r) {
        if (t) {
            var n = t[e];
            var s = t.all;
            if (n && s)
                s = s.slice();
            if (n)
                _(n, r);
            if (s)
                _(s, [e].concat(r))
        }
        return t
    }
        ;
    var _ = function (t, e) {
        var i, r = -1, n = t.length, s = e[0], a = e[1], h = e[2];
        switch (e.length) {
            case 0:
                while (++r < n)
                    (i = t[r]).callback.call(i.ctx);
                return;
            case 1:
                while (++r < n)
                    (i = t[r]).callback.call(i.ctx, s);
                return;
            case 2:
                while (++r < n)
                    (i = t[r]).callback.call(i.ctx, s, a);
                return;
            case 3:
                while (++r < n)
                    (i = t[r]).callback.call(i.ctx, s, a, h);
                return;
            default:
                while (++r < n)
                    (i = t[r]).callback.apply(i.ctx, e);
                return
        }
    }
        ;
    u.bind = u.on;
    u.unbind = u.off;
    i.extend(e, u);
    var y = e.Model = function (t, e) {
        var r = t || {};
        e || (e = {});
        this.cid = i.uniqueId(this.cidPrefix);
        this.attributes = {};
        if (e.collection)
            this.collection = e.collection;
        if (e.parse)
            r = this.parse(r, e) || {};
        var n = i.result(this, "defaults");
        r = i.defaults(i.extend({}, n, r), n);
        this.set(r, e);
        this.changed = {};
        this.initialize.apply(this, arguments)
    }
        ;
    i.extend(y.prototype, u, {
        changed: null,
        validationError: null,
        idAttribute: "id",
        cidPrefix: "c",
        initialize: function () { },
        toJSON: function (t) {
            return i.clone(this.attributes)
        },
        sync: function () {
            return e.sync.apply(this, arguments)
        },
        get: function (t) {
            return this.attributes[t]
        },
        escape: function (t) {
            return i.escape(this.get(t))
        },
        has: function (t) {
            return this.get(t) != null
        },
        matches: function (t) {
            return !!i.iteratee(t, this)(this.attributes)
        },
        set: function (t, e, r) {
            if (t == null)
                return this;
            var n;
            if (typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r || (r = {});
            if (!this._validate(n, r))
                return false;
            var s = r.unset;
            var a = r.silent;
            var h = [];
            var o = this._changing;
            this._changing = true;
            if (!o) {
                this._previousAttributes = i.clone(this.attributes);
                this.changed = {}
            }
            var l = this.attributes;
            var u = this.changed;
            var c = this._previousAttributes;
            for (var f in n) {
                e = n[f];
                if (!i.isEqual(l[f], e))
                    h.push(f);
                if (!i.isEqual(c[f], e)) {
                    u[f] = e
                } else {
                    delete u[f]
                }
                s ? delete l[f] : l[f] = e
            }
            if (this.idAttribute in n)
                this.id = this.get(this.idAttribute);
            if (!a) {
                if (h.length)
                    this._pending = r;
                for (var d = 0; d < h.length; d++) {
                    this.trigger("change:" + h[d], this, l[h[d]], r)
                }
            }
            if (o)
                return this;
            if (!a) {
                while (this._pending) {
                    r = this._pending;
                    this._pending = false;
                    this.trigger("change", this, r)
                }
            }
            this._pending = false;
            this._changing = false;
            return this
        },
        unset: function (t, e) {
            return this.set(t, void 0, i.extend({}, e, {
                unset: true
            }))
        },
        clear: function (t) {
            var e = {};
            for (var r in this.attributes)
                e[r] = void 0;
            return this.set(e, i.extend({}, t, {
                unset: true
            }))
        },
        hasChanged: function (t) {
            if (t == null)
                return !i.isEmpty(this.changed);
            return i.has(this.changed, t)
        },
        changedAttributes: function (t) {
            if (!t)
                return this.hasChanged() ? i.clone(this.changed) : false;
            var e = this._changing ? this._previousAttributes : this.attributes;
            var r = {};
            for (var n in t) {
                var s = t[n];
                if (i.isEqual(e[n], s))
                    continue; r[n] = s
            }
            return i.size(r) ? r : false
        },
        previous: function (t) {
            if (t == null || !this._previousAttributes)
                return null;
            return this._previousAttributes[t]
        },
        previousAttributes: function () {
            return i.clone(this._previousAttributes)
        },
        fetch: function (t) {
            t = i.extend({
                parse: true
            }, t);
            var e = this;
            var r = t.success;
            t.success = function (i) {
                var n = t.parse ? e.parse(i, t) : i;
                if (!e.set(n, t))
                    return false;
                if (r)
                    r.call(t.context, e, i, t);
                e.trigger("sync", e, i, t)
            }
                ;
            B(this, t);
            return this.sync("read", this, t)
        },
        save: function (t, e, r) {
            var n;
            if (t == null || typeof t === "object") {
                n = t;
                r = e
            } else {
                (n = {})[t] = e
            }
            r = i.extend({
                validate: true,
                parse: true
            }, r);
            var s = r.wait;
            if (n && !s) {
                if (!this.set(n, r))
                    return false
            } else if (!this._validate(n, r)) {
                return false
            }
            var a = this;
            var h = r.success;
            var o = this.attributes;
            r.success = function (t) {
                a.attributes = o;
                var e = r.parse ? a.parse(t, r) : t;
                if (s)
                    e = i.extend({}, n, e);
                if (e && !a.set(e, r))
                    return false;
                if (h)
                    h.call(r.context, a, t, r);
                a.trigger("sync", a, t, r)
            }
                ;
            B(this, r);
            if (n && s)
                this.attributes = i.extend({}, o, n);
            var l = this.isNew() ? "create" : r.patch ? "patch" : "update";
            if (l === "patch" && !r.attrs)
                r.attrs = n;
            var u = this.sync(l, this, r);
            this.attributes = o;
            return u
        },
        destroy: function (t) {
            t = t ? i.clone(t) : {};
            var e = this;
            var r = t.success;
            var n = t.wait;
            var s = function () {
                e.stopListening();
                e.trigger("destroy", e, e.collection, t)
            }
                ;
            t.success = function (i) {
                if (n)
                    s();
                if (r)
                    r.call(t.context, e, i, t);
                if (!e.isNew())
                    e.trigger("sync", e, i, t)
            }
                ;
            var a = false;
            if (this.isNew()) {
                i.defer(t.success)
            } else {
                B(this, t);
                a = this.sync("delete", this, t)
            }
            if (!n)
                s();
            return a
        },
        url: function () {
            var t = i.result(this, "urlRoot") || i.result(this.collection, "url") || F();
            if (this.isNew())
                return t;
            var e = this.get(this.idAttribute);
            return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e)
        },
        parse: function (t, e) {
            return t
        },
        clone: function () {
            return new this.constructor(this.attributes)
        },
        isNew: function () {
            return !this.has(this.idAttribute)
        },
        isValid: function (t) {
            return this._validate({}, i.extend({}, t, {
                validate: true
            }))
        },
        _validate: function (t, e) {
            if (!e.validate || !this.validate)
                return true;
            t = i.extend({}, this.attributes, t);
            var r = this.validationError = this.validate(t, e) || null;
            if (!r)
                return true;
            this.trigger("invalid", this, r, i.extend(e, {
                validationError: r
            }));
            return false
        }
    });
    var b = {
        keys: 1,
        values: 1,
        pairs: 1,
        invert: 1,
        pick: 0,
        omit: 0,
        chain: 1,
        isEmpty: 1
    };
    h(y, b, "attributes");
    var x = e.Collection = function (t, e) {
        e || (e = {});
        if (e.model)
            this.model = e.model;
        if (e.comparator !== void 0)
            this.comparator = e.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (t)
            this.reset(t, i.extend({
                silent: true
            }, e))
    }
        ;
    var w = {
        add: true,
        remove: true,
        merge: true
    };
    var E = {
        add: true,
        remove: false
    };
    var I = function (t, e, i) {
        i = Math.min(Math.max(i, 0), t.length);
        var r = Array(t.length - i);
        var n = e.length;
        var s;
        for (s = 0; s < r.length; s++)
            r[s] = t[s + i];
        for (s = 0; s < n; s++)
            t[s + i] = e[s];
        for (s = 0; s < r.length; s++)
            t[s + n + i] = r[s]
    }
        ;
    i.extend(x.prototype, u, {
        model: y,
        initialize: function () { },
        toJSON: function (t) {
            return this.map(function (e) {
                return e.toJSON(t)
            })
        },
        sync: function () {
            return e.sync.apply(this, arguments)
        },
        add: function (t, e) {
            return this.set(t, i.extend({
                merge: false
            }, e, E))
        },
        remove: function (t, e) {
            e = i.extend({}, e);
            var r = !i.isArray(t);
            t = r ? [t] : t.slice();
            var n = this._removeModels(t, e);
            if (!e.silent && n.length) {
                e.changes = {
                    added: [],
                    merged: [],
                    removed: n
                };
                this.trigger("update", this, e)
            }
            return r ? n[0] : n
        },
        set: function (t, e) {
            if (t == null)
                return;
            e = i.extend({}, w, e);
            if (e.parse && !this._isModel(t)) {
                t = this.parse(t, e) || []
            }
            var r = !i.isArray(t);
            t = r ? [t] : t.slice();
            var n = e.at;
            if (n != null)
                n = +n;
            if (n > this.length)
                n = this.length;
            if (n < 0)
                n += this.length + 1;
            var s = [];
            var a = [];
            var h = [];
            var o = [];
            var l = {};
            var u = e.add;
            var c = e.merge;
            var f = e.remove;
            var d = false;
            var v = this.comparator && n == null && e.sort !== false;
            var g = i.isString(this.comparator) ? this.comparator : null;
            var p, m;
            for (m = 0; m < t.length; m++) {
                p = t[m];
                var _ = this.get(p);
                if (_) {
                    if (c && p !== _) {
                        var y = this._isModel(p) ? p.attributes : p;
                        if (e.parse)
                            y = _.parse(y, e);
                        _.set(y, e);
                        h.push(_);
                        if (v && !d)
                            d = _.hasChanged(g)
                    }
                    if (!l[_.cid]) {
                        l[_.cid] = true;
                        s.push(_)
                    }
                    t[m] = _
                } else if (u) {
                    p = t[m] = this._prepareModel(p, e);
                    if (p) {
                        a.push(p);
                        this._addReference(p, e);
                        l[p.cid] = true;
                        s.push(p)
                    }
                }
            }
            if (f) {
                for (m = 0; m < this.length; m++) {
                    p = this.models[m];
                    if (!l[p.cid])
                        o.push(p)
                }
                if (o.length)
                    this._removeModels(o, e)
            }
            var b = false;
            var x = !v && u && f;
            if (s.length && x) {
                b = this.length !== s.length || i.some(this.models, function (t, e) {
                    return t !== s[e]
                });
                this.models.length = 0;
                I(this.models, s, 0);
                this.length = this.models.length
            } else if (a.length) {
                if (v)
                    d = true;
                I(this.models, a, n == null ? this.length : n);
                this.length = this.models.length
            }
            if (d)
                this.sort({
                    silent: true
                });
            if (!e.silent) {
                for (m = 0; m < a.length; m++) {
                    if (n != null)
                        e.index = n + m;
                    p = a[m];
                    p.trigger("add", p, this, e)
                }
                if (d || b)
                    this.trigger("sort", this, e);
                if (a.length || o.length || h.length) {
                    e.changes = {
                        added: a,
                        removed: o,
                        merged: h
                    };
                    this.trigger("update", this, e)
                }
            }
            return r ? t[0] : t
        },
        reset: function (t, e) {
            e = e ? i.clone(e) : {};
            for (var r = 0; r < this.models.length; r++) {
                this._removeReference(this.models[r], e)
            }
            e.previousModels = this.models;
            this._reset();
            t = this.add(t, i.extend({
                silent: true
            }, e));
            if (!e.silent)
                this.trigger("reset", this, e);
            return t
        },
        push: function (t, e) {
            return this.add(t, i.extend({
                at: this.length
            }, e))
        },
        pop: function (t) {
            var e = this.at(this.length - 1);
            return this.remove(e, t)
        },
        unshift: function (t, e) {
            return this.add(t, i.extend({
                at: 0
            }, e))
        },
        shift: function (t) {
            var e = this.at(0);
            return this.remove(e, t)
        },
        slice: function () {
            return s.apply(this.models, arguments)
        },
        get: function (t) {
            if (t == null)
                return void 0;
            return this._byId[t] || this._byId[this.modelId(t.attributes || t)] || t.cid && this._byId[t.cid]
        },
        has: function (t) {
            return this.get(t) != null
        },
        at: function (t) {
            if (t < 0)
                t += this.length;
            return this.models[t]
        },
        where: function (t, e) {
            return this[e ? "find" : "filter"](t)
        },
        findWhere: function (t) {
            return this.where(t, true)
        },
        sort: function (t) {
            var e = this.comparator;
            if (!e)
                throw new Error("Cannot sort a set without a comparator");
            t || (t = {});
            var r = e.length;
            if (i.isFunction(e))
                e = i.bind(e, this);
            if (r === 1 || i.isString(e)) {
                this.models = this.sortBy(e)
            } else {
                this.models.sort(e)
            }
            if (!t.silent)
                this.trigger("sort", this, t);
            return this
        },
        pluck: function (t) {
            return this.map(t + "")
        },
        fetch: function (t) {
            t = i.extend({
                parse: true
            }, t);
            var e = t.success;
            var r = this;
            t.success = function (i) {
                var n = t.reset ? "reset" : "set";
                r[n](i, t);
                if (e)
                    e.call(t.context, r, i, t);
                r.trigger("sync", r, i, t)
            }
                ;
            B(this, t);
            return this.sync("read", this, t)
        },
        create: function (t, e) {
            e = e ? i.clone(e) : {};
            var r = e.wait;
            t = this._prepareModel(t, e);
            if (!t)
                return false;
            if (!r)
                this.add(t, e);
            var n = this;
            var s = e.success;
            e.success = function (t, e, i) {
                if (r)
                    n.add(t, i);
                if (s)
                    s.call(i.context, t, e, i)
            }
                ;
            t.save(null, e);
            return t
        },
        parse: function (t, e) {
            return t
        },
        clone: function () {
            return new this.constructor(this.models, {
                model: this.model,
                comparator: this.comparator
            })
        },
        modelId: function (t) {
            return t[this.model.prototype.idAttribute || "id"]
        },
        _reset: function () {
            this.length = 0;
            this.models = [];
            this._byId = {}
        },
        _prepareModel: function (t, e) {
            if (this._isModel(t)) {
                if (!t.collection)
                    t.collection = this;
                return t
            }
            e = e ? i.clone(e) : {};
            e.collection = this;
            var r = new this.model(t, e);
            if (!r.validationError)
                return r;
            this.trigger("invalid", this, r.validationError, e);
            return false
        },
        _removeModels: function (t, e) {
            var i = [];
            for (var r = 0; r < t.length; r++) {
                var n = this.get(t[r]);
                if (!n)
                    continue; var s = this.indexOf(n);
                this.models.splice(s, 1);
                this.length--;
                delete this._byId[n.cid];
                var a = this.modelId(n.attributes);
                if (a != null)
                    delete this._byId[a];
                if (!e.silent) {
                    e.index = s;
                    n.trigger("remove", n, this, e)
                }
                i.push(n);
                this._removeReference(n, e)
            }
            return i
        },
        _isModel: function (t) {
            return t instanceof y
        },
        _addReference: function (t, e) {
            this._byId[t.cid] = t;
            var i = this.modelId(t.attributes);
            if (i != null)
                this._byId[i] = t;
            t.on("all", this._onModelEvent, this)
        },
        _removeReference: function (t, e) {
            delete this._byId[t.cid];
            var i = this.modelId(t.attributes);
            if (i != null)
                delete this._byId[i];
            if (this === t.collection)
                delete t.collection;
            t.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function (t, e, i, r) {
            if (e) {
                if ((t === "add" || t === "remove") && i !== this)
                    return;
                if (t === "destroy")
                    this.remove(e, r);
                if (t === "change") {
                    var n = this.modelId(e.previousAttributes());
                    var s = this.modelId(e.attributes);
                    if (n !== s) {
                        if (n != null)
                            delete this._byId[n];
                        if (s != null)
                            this._byId[s] = e
                    }
                }
            }
            this.trigger.apply(this, arguments)
        }
    });
    var S = {
        forEach: 3,
        each: 3,
        map: 3,
        collect: 3,
        reduce: 0,
        foldl: 0,
        inject: 0,
        reduceRight: 0,
        foldr: 0,
        find: 3,
        detect: 3,
        filter: 3,
        select: 3,
        reject: 3,
        every: 3,
        all: 3,
        some: 3,
        any: 3,
        include: 3,
        includes: 3,
        contains: 3,
        invoke: 0,
        max: 3,
        min: 3,
        toArray: 1,
        size: 1,
        first: 3,
        head: 3,
        take: 3,
        initial: 3,
        rest: 3,
        tail: 3,
        drop: 3,
        last: 3,
        without: 0,
        difference: 0,
        indexOf: 3,
        shuffle: 1,
        lastIndexOf: 3,
        isEmpty: 1,
        chain: 1,
        sample: 3,
        partition: 3,
        groupBy: 3,
        countBy: 3,
        sortBy: 3,
        indexBy: 3,
        findIndex: 3,
        findLastIndex: 3
    };
    h(x, S, "models");
    var k = e.View = function (t) {
        this.cid = i.uniqueId("view");
        i.extend(this, i.pick(t, P));
        this._ensureElement();
        this.initialize.apply(this, arguments)
    }
        ;
    var T = /^(\S+)\s*(.*)$/;
    var P = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    i.extend(k.prototype, u, {
        tagName: "div",
        $: function (t) {
            return this.$el.find(t)
        },
        initialize: function () { },
        render: function () {
            return this
        },
        remove: function () {
            this._removeElement();
            this.stopListening();
            return this
        },
        _removeElement: function () {
            this.$el.remove()
        },
        setElement: function (t) {
            this.undelegateEvents();
            this._setElement(t);
            this.delegateEvents();
            return this
        },
        _setElement: function (t) {
            this.$el = t instanceof e.$ ? t : e.$(t);
            this.el = this.$el[0]
        },
        delegateEvents: function (t) {
            t || (t = i.result(this, "events"));
            if (!t)
                return this;
            this.undelegateEvents();
            for (var e in t) {
                var r = t[e];
                if (!i.isFunction(r))
                    r = this[r];
                if (!r)
                    continue; var n = e.match(T);
                this.delegate(n[1], n[2], i.bind(r, this))
            }
            return this
        },
        delegate: function (t, e, i) {
            this.$el.on(t + ".delegateEvents" + this.cid, e, i);
            return this
        },
        undelegateEvents: function () {
            if (this.$el)
                this.$el.off(".delegateEvents" + this.cid);
            return this
        },
        undelegate: function (t, e, i) {
            this.$el.off(t + ".delegateEvents" + this.cid, e, i);
            return this
        },
        _createElement: function (t) {
            return document.createElement(t)
        },
        _ensureElement: function () {
            if (!this.el) {
                var t = i.extend({}, i.result(this, "attributes"));
                if (this.id)
                    t.id = i.result(this, "id");
                if (this.className)
                    t["class"] = i.result(this, "className");
                this.setElement(this._createElement(i.result(this, "tagName")));
                this._setAttributes(t)
            } else {
                this.setElement(i.result(this, "el"))
            }
        },
        _setAttributes: function (t) {
            this.$el.attr(t)
        }
    });
    e.sync = function (t, r, n) {
        var s = H[t];
        i.defaults(n || (n = {}), {
            emulateHTTP: e.emulateHTTP,
            emulateJSON: e.emulateJSON
        });
        var a = {
            type: s,
            dataType: "json"
        };
        if (!n.url) {
            a.url = i.result(r, "url") || F()
        }
        if (n.data == null && r && (t === "create" || t === "update" || t === "patch")) {
            a.contentType = "application/json";
            a.data = JSON.stringify(n.attrs || r.toJSON(n))
        }
        if (n.emulateJSON) {
            a.contentType = "application/x-www-form-urlencoded";
            a.data = a.data ? {
                model: a.data
            } : {}
        }
        if (n.emulateHTTP && (s === "PUT" || s === "DELETE" || s === "PATCH")) {
            a.type = "POST";
            if (n.emulateJSON)
                a.data._method = s;
            var h = n.beforeSend;
            n.beforeSend = function (t) {
                t.setRequestHeader("X-HTTP-Method-Override", s);
                if (h)
                    return h.apply(this, arguments)
            }
        }
        if (a.type !== "GET" && !n.emulateJSON) {
            a.processData = false
        }
        var o = n.error;
        n.error = function (t, e, i) {
            n.textStatus = e;
            n.errorThrown = i;
            if (o)
                o.call(n.context, t, e, i)
        }
            ;
        var l = n.xhr = e.ajax(i.extend(a, n));
        r.trigger("request", r, l, n);
        return l
    }
        ;
    var H = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    e.ajax = function () {
        return e.$.ajax.apply(e.$, arguments)
    }
        ;
    var $ = e.Router = function (t) {
        t || (t = {});
        if (t.routes)
            this.routes = t.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }
        ;
    var A = /\((.*?)\)/g;
    var C = /(\(\?)?:\w+/g;
    var R = /\*\w+/g;
    var j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    i.extend($.prototype, u, {
        initialize: function () { },
        route: function (t, r, n) {
            if (!i.isRegExp(t))
                t = this._routeToRegExp(t);
            if (i.isFunction(r)) {
                n = r;
                r = ""
            }
            if (!n)
                n = this[r];
            var s = this;
            e.history.route(t, function (i) {
                var a = s._extractParameters(t, i);
                if (s.execute(n, a, r) !== false) {
                    s.trigger.apply(s, ["route:" + r].concat(a));
                    s.trigger("route", r, a);
                    e.history.trigger("route", s, r, a)
                }
            });
            return this
        },
        execute: function (t, e, i) {
            if (t)
                t.apply(this, e)
        },
        navigate: function (t, i) {
            e.history.navigate(t, i);
            return this
        },
        _bindRoutes: function () {
            if (!this.routes)
                return;
            this.routes = i.result(this, "routes");
            var t, e = i.keys(this.routes);
            while ((t = e.pop()) != null) {
                this.route(t, this.routes[t])
            }
        },
        _routeToRegExp: function (t) {
            t = t.replace(j, "\\$&").replace(A, "(?:$1)?").replace(C, function (t, e) {
                return e ? t : "([^/?]+)"
            }).replace(R, "([^?]*?)");
            return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$")
        },
        _extractParameters: function (t, e) {
            var r = t.exec(e).slice(1);
            return i.map(r, function (t, e) {
                if (e === r.length - 1)
                    return t || null;
                return t ? decodeURIComponent(t) : null
            })
        }
    });
    var N = e.History = function () {
        this.handlers = [];
        this.checkUrl = i.bind(this.checkUrl, this);
        if (typeof window !== "undefined") {
            this.location = window.location;
            this.history = window.history
        }
    }
        ;
    var M = /^[#\/]|\s+$/g;
    var O = /^\/+|\/+$/g;
    var U = /#.*$/;
    N.started = false;
    i.extend(N.prototype, u, {
        interval: 50,
        atRoot: function () {
            var t = this.location.pathname.replace(/[^\/]$/, "$&/");
            return t === this.root && !this.getSearch()
        },
        matchRoot: function () {
            var t = this.decodeFragment(this.location.pathname);
            var e = t.slice(0, this.root.length - 1) + "/";
            return e === this.root
        },
        decodeFragment: function (t) {
            return decodeURI(t.replace(/%25/g, "%2525"))
        },
        getSearch: function () {
            var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
            return t ? t[0] : ""
        },
        getHash: function (t) {
            var e = (t || this).location.href.match(/#(.*)$/);
            return e ? e[1] : ""
        },
        getPath: function () {
            var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
            return t.charAt(0) === "/" ? t.slice(1) : t
        },
        getFragment: function (t) {
            if (t == null) {
                if (this._usePushState || !this._wantsHashChange) {
                    t = this.getPath()
                } else {
                    t = this.getHash()
                }
            }
            return t.replace(M, "")
        },
        start: function (t) {
            if (N.started)
                throw new Error("Backbone.history has already been started");
            N.started = true;
            this.options = i.extend({
                root: "/"
            }, this.options, t);
            this.root = this.options.root;
            this._wantsHashChange = this.options.hashChange !== false;
            this._hasHashChange = "onhashchange" in window && (document.documentMode === void 0 || document.documentMode > 7);
            this._useHashChange = this._wantsHashChange && this._hasHashChange;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.history && this.history.pushState);
            this._usePushState = this._wantsPushState && this._hasPushState;
            this.fragment = this.getFragment();
            this.root = ("/" + this.root + "/").replace(O, "/");
            if (this._wantsHashChange && this._wantsPushState) {
                if (!this._hasPushState && !this.atRoot()) {
                    var e = this.root.slice(0, -1) || "/";
                    this.location.replace(e + "#" + this.getPath());
                    return true
                } else if (this._hasPushState && this.atRoot()) {
                    this.navigate(this.getHash(), {
                        replace: true
                    })
                }
            }
            if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
                this.iframe = document.createElement("iframe");
                this.iframe.src = "javascript:0";
                this.iframe.style.display = "none";
                this.iframe.tabIndex = -1;
                var r = document.body;
                var n = r.insertBefore(this.iframe, r.firstChild).contentWindow;
                n.document.open();
                n.document.close();
                n.location.hash = "#" + this.fragment
            }
            var s = window.addEventListener || function (t, e) {
                return attachEvent("on" + t, e)
            }
                ;
            if (this._usePushState) {
                s("popstate", this.checkUrl, false)
            } else if (this._useHashChange && !this.iframe) {
                s("hashchange", this.checkUrl, false)
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval)
            }
            if (!this.options.silent)
                return this.loadUrl()
        },
        stop: function () {
            var t = window.removeEventListener || function (t, e) {
                return detachEvent("on" + t, e)
            }
                ;
            if (this._usePushState) {
                t("popstate", this.checkUrl, false)
            } else if (this._useHashChange && !this.iframe) {
                t("hashchange", this.checkUrl, false)
            }
            if (this.iframe) {
                document.body.removeChild(this.iframe);
                this.iframe = null
            }
            if (this._checkUrlInterval)
                clearInterval(this._checkUrlInterval);
            N.started = false
        },
        route: function (t, e) {
            this.handlers.unshift({
                route: t,
                callback: e
            })
        },
        checkUrl: function (t) {
            var e = this.getFragment();
            if (e === this.fragment && this.iframe) {
                e = this.getHash(this.iframe.contentWindow)
            }
            if (e === this.fragment)
                return false;
            if (this.iframe)
                this.navigate(e);
            this.loadUrl()
        },
        loadUrl: function (t) {
            if (!this.matchRoot())
                return false;
            t = this.fragment = this.getFragment(t);
            return i.some(this.handlers, function (e) {
                if (e.route.test(t)) {
                    e.callback(t);
                    return true
                }
            })
        },
        navigate: function (t, e) {
            if (!N.started)
                return false;
            if (!e || e === true)
                e = {
                    trigger: !!e
                };
            t = this.getFragment(t || "");
            var i = this.root;
            if (t === "" || t.charAt(0) === "?") {
                i = i.slice(0, -1) || "/"
            }
            var r = i + t;
            t = this.decodeFragment(t.replace(U, ""));
            if (this.fragment === t)
                return;
            this.fragment = t;
            if (this._usePushState) {
                this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, r)
            } else if (this._wantsHashChange) {
                this._updateHash(this.location, t, e.replace);
                if (this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
                    var n = this.iframe.contentWindow;
                    if (!e.replace) {
                        n.document.open();
                        n.document.close()
                    }
                    this._updateHash(n.location, t, e.replace)
                }
            } else {
                return this.location.assign(r)
            }
            if (e.trigger)
                return this.loadUrl(t)
        },
        _updateHash: function (t, e, i) {
            if (i) {
                var r = t.href.replace(/(javascript:|#).*$/, "");
                t.replace(r + "#" + e)
            } else {
                t.hash = "#" + e
            }
        }
    });
    e.history = new N;
    var q = function (t, e) {
        var r = this;
        var n;
        if (t && i.has(t, "constructor")) {
            n = t.constructor
        } else {
            n = function () {
                return r.apply(this, arguments)
            }
        }
        i.extend(n, r, e);
        n.prototype = i.create(r.prototype, t);
        n.prototype.constructor = n;
        n.__super__ = r.prototype;
        return n
    }
        ;
    y.extend = x.extend = $.extend = k.extend = N.extend = q;
    var F = function () {
        throw new Error('A "url" property or function must be specified')
    }
        ;
    var B = function (t, e) {
        var i = e.error;
        e.error = function (r) {
            if (i)
                i.call(e.context, t, r, e);
            t.trigger("error", t, r, e)
        }
    }
        ;
    return e
});
//# sourceMappingURL=backbone-min.map
// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v2.4.7
//
// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com
/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */
!function (a, b) {
    if ("function" == typeof define && define.amd)
        define(["backbone", "underscore"], function (c, d) {
            return a.Marionette = a.Mn = b(a, c, d)
        });
    else if ("undefined" != typeof exports) {
        var c = require("backbone")
            , d = require("underscore");
        module.exports = b(a, c, d)
    } else
        a.Marionette = a.Mn = b(a, a.Backbone, a._)
}(this, function (a, b, c) {
    "use strict";
    !function (a, b) {
        var c = a.ChildViewContainer;
        return a.ChildViewContainer = function (a, b) {
            var c = function (a) {
                this._views = {},
                    this._indexByModel = {},
                    this._indexByCustom = {},
                    this._updateLength(),
                    b.each(a, this.add, this)
            }
                ;
            b.extend(c.prototype, {
                add: function (a, b) {
                    var c = a.cid;
                    return this._views[c] = a,
                        a.model && (this._indexByModel[a.model.cid] = c),
                        b && (this._indexByCustom[b] = c),
                        this._updateLength(),
                        this
                },
                findByModel: function (a) {
                    return this.findByModelCid(a.cid)
                },
                findByModelCid: function (a) {
                    var b = this._indexByModel[a];
                    return this.findByCid(b)
                },
                findByCustom: function (a) {
                    var b = this._indexByCustom[a];
                    return this.findByCid(b)
                },
                findByIndex: function (a) {
                    return b.values(this._views)[a]
                },
                findByCid: function (a) {
                    return this._views[a]
                },
                remove: function (a) {
                    var c = a.cid;
                    return a.model && delete this._indexByModel[a.model.cid],
                        b.any(this._indexByCustom, function (a, b) {
                            return a === c ? (delete this._indexByCustom[b],
                                !0) : void 0
                        }, this),
                        delete this._views[c],
                        this._updateLength(),
                        this
                },
                call: function (a) {
                    this.apply(a, b.tail(arguments))
                },
                apply: function (a, c) {
                    b.each(this._views, function (d) {
                        b.isFunction(d[a]) && d[a].apply(d, c || [])
                    })
                },
                _updateLength: function () {
                    this.length = b.size(this._views)
                }
            });
            var d = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck", "reduce"];
            return b.each(d, function (a) {
                c.prototype[a] = function () {
                    var c = b.values(this._views)
                        , d = [c].concat(b.toArray(arguments));
                    return b[a].apply(b, d)
                }
            }),
                c
        }(a, b),
            a.ChildViewContainer.VERSION = "0.1.11",
            a.ChildViewContainer.noConflict = function () {
                return a.ChildViewContainer = c,
                    this
            }
            ,
            a.ChildViewContainer
    }(b, c),
        function (a, b) {
            var c = a.Wreqr
                , d = a.Wreqr = {};
            return a.Wreqr.VERSION = "1.3.6",
                a.Wreqr.noConflict = function () {
                    return a.Wreqr = c,
                        this
                }
                ,
                d.Handlers = function (a, b) {
                    var c = function (a) {
                        this.options = a,
                            this._wreqrHandlers = {},
                            b.isFunction(this.initialize) && this.initialize(a)
                    }
                        ;
                    return c.extend = a.Model.extend,
                        b.extend(c.prototype, a.Events, {
                            setHandlers: function (a) {
                                b.each(a, function (a, c) {
                                    var d = null;
                                    b.isObject(a) && !b.isFunction(a) && (d = a.context,
                                        a = a.callback),
                                        this.setHandler(c, a, d)
                                }, this)
                            },
                            setHandler: function (a, b, c) {
                                var d = {
                                    callback: b,
                                    context: c
                                };
                                this._wreqrHandlers[a] = d,
                                    this.trigger("handler:add", a, b, c)
                            },
                            hasHandler: function (a) {
                                return !!this._wreqrHandlers[a]
                            },
                            getHandler: function (a) {
                                var b = this._wreqrHandlers[a];
                                if (b)
                                    return function () {
                                        return b.callback.apply(b.context, arguments)
                                    }
                            },
                            removeHandler: function (a) {
                                delete this._wreqrHandlers[a]
                            },
                            removeAllHandlers: function () {
                                this._wreqrHandlers = {}
                            }
                        }),
                        c
                }(a, b),
                d.CommandStorage = function () {
                    var c = function (a) {
                        this.options = a,
                            this._commands = {},
                            b.isFunction(this.initialize) && this.initialize(a)
                    }
                        ;
                    return b.extend(c.prototype, a.Events, {
                        getCommands: function (a) {
                            var b = this._commands[a];
                            return b || (b = {
                                command: a,
                                instances: []
                            },
                                this._commands[a] = b),
                                b
                        },
                        addCommand: function (a, b) {
                            var c = this.getCommands(a);
                            c.instances.push(b)
                        },
                        clearCommands: function (a) {
                            var b = this.getCommands(a);
                            b.instances = []
                        }
                    }),
                        c
                }(),
                d.Commands = function (a, b) {
                    return a.Handlers.extend({
                        storageType: a.CommandStorage,
                        constructor: function (b) {
                            this.options = b || {},
                                this._initializeStorage(this.options),
                                this.on("handler:add", this._executeCommands, this),
                                a.Handlers.prototype.constructor.apply(this, arguments)
                        },
                        execute: function (a) {
                            a = arguments[0];
                            var c = b.rest(arguments);
                            this.hasHandler(a) ? this.getHandler(a).apply(this, c) : this.storage.addCommand(a, c)
                        },
                        _executeCommands: function (a, c, d) {
                            var e = this.storage.getCommands(a);
                            b.each(e.instances, function (a) {
                                c.apply(d, a)
                            }),
                                this.storage.clearCommands(a)
                        },
                        _initializeStorage: function (a) {
                            var c, d = a.storageType || this.storageType;
                            c = b.isFunction(d) ? new d : d,
                                this.storage = c
                        }
                    })
                }(d, b),
                d.RequestResponse = function (a, b) {
                    return a.Handlers.extend({
                        request: function (a) {
                            return this.hasHandler(a) ? this.getHandler(a).apply(this, b.rest(arguments)) : void 0
                        }
                    })
                }(d, b),
                d.EventAggregator = function (a, b) {
                    var c = function () { }
                        ;
                    return c.extend = a.Model.extend,
                        b.extend(c.prototype, a.Events),
                        c
                }(a, b),
                d.Channel = function (c) {
                    var d = function (b) {
                        this.vent = new a.Wreqr.EventAggregator,
                            this.reqres = new a.Wreqr.RequestResponse,
                            this.commands = new a.Wreqr.Commands,
                            this.channelName = b
                    }
                        ;
                    return b.extend(d.prototype, {
                        reset: function () {
                            return this.vent.off(),
                                this.vent.stopListening(),
                                this.reqres.removeAllHandlers(),
                                this.commands.removeAllHandlers(),
                                this
                        },
                        connectEvents: function (a, b) {
                            return this._connect("vent", a, b),
                                this
                        },
                        connectCommands: function (a, b) {
                            return this._connect("commands", a, b),
                                this
                        },
                        connectRequests: function (a, b) {
                            return this._connect("reqres", a, b),
                                this
                        },
                        _connect: function (a, c, d) {
                            if (c) {
                                d = d || this;
                                var e = "vent" === a ? "on" : "setHandler";
                                b.each(c, function (c, f) {
                                    this[a][e](f, b.bind(c, d))
                                }, this)
                            }
                        }
                    }),
                        d
                }(d),
                d.radio = function (a, b) {
                    var c = function () {
                        this._channels = {},
                            this.vent = {},
                            this.commands = {},
                            this.reqres = {},
                            this._proxyMethods()
                    }
                        ;
                    b.extend(c.prototype, {
                        channel: function (a) {
                            if (!a)
                                throw new Error("Channel must receive a name");
                            return this._getChannel(a)
                        },
                        _getChannel: function (b) {
                            var c = this._channels[b];
                            return c || (c = new a.Channel(b),
                                this._channels[b] = c),
                                c
                        },
                        _proxyMethods: function () {
                            b.each(["vent", "commands", "reqres"], function (a) {
                                b.each(d[a], function (b) {
                                    this[a][b] = e(this, a, b)
                                }, this)
                            }, this)
                        }
                    });
                    var d = {
                        vent: ["on", "off", "trigger", "once", "stopListening", "listenTo", "listenToOnce"],
                        commands: ["execute", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"],
                        reqres: ["request", "setHandler", "setHandlers", "removeHandler", "removeAllHandlers"]
                    }
                        , e = function (a, c, d) {
                            return function (e) {
                                var f = a._getChannel(e)[c];
                                return f[d].apply(f, b.rest(arguments))
                            }
                        }
                        ;
                    return new c
                }(d, b),
                a.Wreqr
        }(b, c);
    var d = a.Marionette
        , e = a.Mn
        , f = b.Marionette = {};
    f.VERSION = "2.4.7",
        f.noConflict = function () {
            return a.Marionette = d,
                a.Mn = e,
                this
        }
        ,
        b.Marionette = f,
        f.Deferred = b.$.Deferred,
        f.extend = b.Model.extend,
        f.isNodeAttached = function (a) {
            return b.$.contains(document.documentElement, a)
        }
        ,
        f.mergeOptions = function (a, b) {
            a && c.extend(this, c.pick(a, b))
        }
        ,
        f.getOption = function (a, b) {
            return a && b ? a.options && void 0 !== a.options[b] ? a.options[b] : a[b] : void 0
        }
        ,
        f.proxyGetOption = function (a) {
            return f.getOption(this, a)
        }
        ,
        f._getValue = function (a, b, d) {
            return c.isFunction(a) && (a = d ? a.apply(b, d) : a.call(b)),
                a
        }
        ,
        f.normalizeMethods = function (a) {
            return c.reduce(a, function (a, b, d) {
                return c.isFunction(b) || (b = this[b]),
                    b && (a[d] = b),
                    a
            }, {}, this)
        }
        ,
        f.normalizeUIString = function (a, b) {
            return a.replace(/@ui\.[a-zA-Z-_$0-9]*/g, function (a) {
                return b[a.slice(4)]
            })
        }
        ,
        f.normalizeUIKeys = function (a, b) {
            return c.reduce(a, function (a, c, d) {
                var e = f.normalizeUIString(d, b);
                return a[e] = c,
                    a
            }, {})
        }
        ,
        f.normalizeUIValues = function (a, b, d) {
            return c.each(a, function (e, g) {
                c.isString(e) ? a[g] = f.normalizeUIString(e, b) : c.isObject(e) && c.isArray(d) && (c.extend(e, f.normalizeUIValues(c.pick(e, d), b)),
                    c.each(d, function (a) {
                        var d = e[a];
                        c.isString(d) && (e[a] = f.normalizeUIString(d, b))
                    }))
            }),
                a
        }
        ,
        f.actAsCollection = function (a, b) {
            var d = ["forEach", "each", "map", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "toArray", "first", "initial", "rest", "last", "without", "isEmpty", "pluck"];
            c.each(d, function (d) {
                a[d] = function () {
                    var a = c.values(c.result(this, b))
                        , e = [a].concat(c.toArray(arguments));
                    return c[d].apply(c, e)
                }
            })
        }
        ;
    var g = f.deprecate = function (a, b) {
        c.isObject(a) && (a = a.prev + " is going to be removed in the future. Please use " + a.next + " instead." + (a.url ? " See: " + a.url : "")),
            void 0 !== b && b || g._cache[a] || (g._warn("Deprecation warning: " + a),
                g._cache[a] = !0)
    }
        ;
    g._console = "undefined" != typeof console ? console : {},
        g._warn = function () {
            var a = g._console.warn || g._console.log || function () { }
                ;
            return a.apply(g._console, arguments)
        }
        ,
        g._cache = {},
        f._triggerMethod = function () {
            function a(a, b, c) {
                return c.toUpperCase()
            }
            var b = /(^|:)(\w)/gi;
            return function (d, e, f) {
                var g = arguments.length < 3;
                g && (f = e,
                    e = f[0]);
                var h, i = "on" + e.replace(b, a), j = d[i];
                return c.isFunction(j) && (h = j.apply(d, g ? c.rest(f) : f)),
                    c.isFunction(d.trigger) && (g + f.length > 1 ? d.trigger.apply(d, g ? f : [e].concat(c.drop(f, 0))) : d.trigger(e)),
                    h
            }
        }(),
        f.triggerMethod = function (a) {
            return f._triggerMethod(this, arguments)
        }
        ,
        f.triggerMethodOn = function (a) {
            var b = c.isFunction(a.triggerMethod) ? a.triggerMethod : f.triggerMethod;
            return b.apply(a, c.rest(arguments))
        }
        ,
        f.MonitorDOMRefresh = function (a) {
            function b() {
                a._isShown = !0,
                    d()
            }
            function c() {
                a._isRendered = !0,
                    d()
            }
            function d() {
                a._isShown && a._isRendered && f.isNodeAttached(a.el) && f.triggerMethodOn(a, "dom:refresh", a)
            }
            a._isDomRefreshMonitored || (a._isDomRefreshMonitored = !0,
                a.on({
                    show: b,
                    render: c
                }))
        }
        ,
        function (a) {
            function b(b, d, e, f) {
                var g = f.split(/\s+/);
                c.each(g, function (c) {
                    var f = b[c];
                    if (!f)
                        throw new a.Error('Method "' + c + '" was configured as an event handler, but does not exist.');
                    b.listenTo(d, e, f)
                })
            }
            function d(a, b, c, d) {
                a.listenTo(b, c, d)
            }
            function e(a, b, d, e) {
                var f = e.split(/\s+/);
                c.each(f, function (c) {
                    var e = a[c];
                    a.stopListening(b, d, e)
                })
            }
            function f(a, b, c, d) {
                a.stopListening(b, c, d)
            }
            function g(b, d, e, f, g) {
                if (d && e) {
                    if (!c.isObject(e))
                        throw new a.Error({
                            message: "Bindings must be an object or function.",
                            url: "marionette.functions.html#marionettebindentityevents"
                        });
                    e = a._getValue(e, b),
                        c.each(e, function (a, e) {
                            c.isFunction(a) ? f(b, d, e, a) : g(b, d, e, a)
                        })
                }
            }
            a.bindEntityEvents = function (a, c, e) {
                g(a, c, e, d, b)
            }
                ,
                a.unbindEntityEvents = function (a, b, c) {
                    g(a, b, c, f, e)
                }
                ,
                a.proxyBindEntityEvents = function (b, c) {
                    return a.bindEntityEvents(this, b, c)
                }
                ,
                a.proxyUnbindEntityEvents = function (b, c) {
                    return a.unbindEntityEvents(this, b, c)
                }
        }(f);
    var h = ["description", "fileName", "lineNumber", "name", "message", "number"];
    return f.Error = f.extend.call(Error, {
        urlRoot: "http://marionettejs.com/docs/v" + f.VERSION + "/",
        constructor: function (a, b) {
            c.isObject(a) ? (b = a,
                a = b.message) : b || (b = {});
            var d = Error.call(this, a);
            c.extend(this, c.pick(d, h), c.pick(b, h)),
                this.captureStackTrace(),
                b.url && (this.url = this.urlRoot + b.url)
        },
        captureStackTrace: function () {
            Error.captureStackTrace && Error.captureStackTrace(this, f.Error)
        },
        toString: function () {
            return this.name + ": " + this.message + (this.url ? " See: " + this.url : "")
        }
    }),
        f.Error.extend = f.extend,
        f.Callbacks = function () {
            this._deferred = f.Deferred(),
                this._callbacks = []
        }
        ,
        c.extend(f.Callbacks.prototype, {
            add: function (a, b) {
                var d = c.result(this._deferred, "promise");
                this._callbacks.push({
                    cb: a,
                    ctx: b
                }),
                    d.then(function (c) {
                        b && (c.context = b),
                            a.call(c.context, c.options)
                    })
            },
            run: function (a, b) {
                this._deferred.resolve({
                    options: a,
                    context: b
                })
            },
            reset: function () {
                var a = this._callbacks;
                this._deferred = f.Deferred(),
                    this._callbacks = [],
                    c.each(a, function (a) {
                        this.add(a.cb, a.ctx)
                    }, this)
            }
        }),
        f.Controller = function (a) {
            this.options = a || {},
                c.isFunction(this.initialize) && this.initialize(this.options)
        }
        ,
        f.Controller.extend = f.extend,
        c.extend(f.Controller.prototype, b.Events, {
            destroy: function () {
                return f._triggerMethod(this, "before:destroy", arguments),
                    f._triggerMethod(this, "destroy", arguments),
                    this.stopListening(),
                    this.off(),
                    this
            },
            triggerMethod: f.triggerMethod,
            mergeOptions: f.mergeOptions,
            getOption: f.proxyGetOption
        }),
        f.Object = function (a) {
            this.options = c.extend({}, c.result(this, "options"), a),
                this.initialize.apply(this, arguments)
        }
        ,
        f.Object.extend = f.extend,
        c.extend(f.Object.prototype, b.Events, {
            initialize: function () { },
            destroy: function (a) {
                return a = a || {},
                    this.triggerMethod("before:destroy", a),
                    this.triggerMethod("destroy", a),
                    this.stopListening(),
                    this
            },
            triggerMethod: f.triggerMethod,
            mergeOptions: f.mergeOptions,
            getOption: f.proxyGetOption,
            bindEntityEvents: f.proxyBindEntityEvents,
            unbindEntityEvents: f.proxyUnbindEntityEvents
        }),
        f.Region = f.Object.extend({
            constructor: function (a) {
                if (this.options = a || {},
                    this.el = this.getOption("el"),
                    this.el = this.el instanceof b.$ ? this.el[0] : this.el,
                    !this.el)
                    throw new f.Error({
                        name: "NoElError",
                        message: 'An "el" must be specified for a region.'
                    });
                this.$el = this.getEl(this.el),
                    f.Object.call(this, a)
            },
            show: function (a, b) {
                if (this._ensureElement()) {
                    this._ensureViewIsIntact(a),
                        f.MonitorDOMRefresh(a);
                    var d = b || {}
                        , e = a !== this.currentView
                        , g = !!d.preventDestroy
                        , h = !!d.forceShow
                        , i = !!this.currentView
                        , j = e && !g
                        , k = e || h;
                    if (i && this.triggerMethod("before:swapOut", this.currentView, this, b),
                        this.currentView && e && delete this.currentView._parent,
                        j ? this.empty() : i && k && this.currentView.off("destroy", this.empty, this),
                        k) {
                        a.once("destroy", this.empty, this),
                            a._parent = this,
                            this._renderView(a),
                            i && this.triggerMethod("before:swap", a, this, b),
                            this.triggerMethod("before:show", a, this, b),
                            f.triggerMethodOn(a, "before:show", a, this, b),
                            i && this.triggerMethod("swapOut", this.currentView, this, b);
                        var l = f.isNodeAttached(this.el)
                            , m = []
                            , n = c.extend({
                                triggerBeforeAttach: this.triggerBeforeAttach,
                                triggerAttach: this.triggerAttach
                            }, d);
                        return l && n.triggerBeforeAttach && (m = this._displayedViews(a),
                            this._triggerAttach(m, "before:")),
                            this.attachHtml(a),
                            this.currentView = a,
                            l && n.triggerAttach && (m = this._displayedViews(a),
                                this._triggerAttach(m)),
                            i && this.triggerMethod("swap", a, this, b),
                            this.triggerMethod("show", a, this, b),
                            f.triggerMethodOn(a, "show", a, this, b),
                            this
                    }
                    return this
                }
            },
            triggerBeforeAttach: !0,
            triggerAttach: !0,
            _triggerAttach: function (a, b) {
                var d = (b || "") + "attach";
                c.each(a, function (a) {
                    f.triggerMethodOn(a, d, a, this)
                }, this)
            },
            _displayedViews: function (a) {
                return c.union([a], c.result(a, "_getNestedViews") || [])
            },
            _renderView: function (a) {
                a.supportsRenderLifecycle || f.triggerMethodOn(a, "before:render", a),
                    a.render(),
                    a.supportsRenderLifecycle || f.triggerMethodOn(a, "render", a)
            },
            _ensureElement: function () {
                if (c.isObject(this.el) || (this.$el = this.getEl(this.el),
                    this.el = this.$el[0]),
                    !this.$el || 0 === this.$el.length) {
                    if (this.getOption("allowMissingEl"))
                        return !1;
                    throw new f.Error('An "el" ' + this.$el.selector + " must exist in DOM")
                }
                return !0
            },
            _ensureViewIsIntact: function (a) {
                if (!a)
                    throw new f.Error({
                        name: "ViewNotValid",
                        message: "The view passed is undefined and therefore invalid. You must pass a view instance to show."
                    });
                if (a.isDestroyed)
                    throw new f.Error({
                        name: "ViewDestroyedError",
                        message: 'View (cid: "' + a.cid + '") has already been destroyed and cannot be used.'
                    })
            },
            getEl: function (a) {
                return b.$(a, f._getValue(this.options.parentEl, this))
            },
            attachHtml: function (a) {
                this.$el.contents().detach(),
                    this.el.appendChild(a.el)
            },
            empty: function (a) {
                var b = this.currentView
                    , c = a || {}
                    , d = !!c.preventDestroy;
                return b ? (b.off("destroy", this.empty, this),
                    this.triggerMethod("before:empty", b),
                    d || this._destroyView(),
                    this.triggerMethod("empty", b),
                    delete this.currentView,
                    d && this.$el.contents().detach(),
                    this) : this
            },
            _destroyView: function () {
                var a = this.currentView;
                a.isDestroyed || (a.supportsDestroyLifecycle || f.triggerMethodOn(a, "before:destroy", a),
                    a.destroy ? a.destroy() : (a.remove(),
                        a.isDestroyed = !0),
                    a.supportsDestroyLifecycle || f.triggerMethodOn(a, "destroy", a))
            },
            attachView: function (a) {
                return this.currentView && delete this.currentView._parent,
                    a._parent = this,
                    this.currentView = a,
                    this
            },
            hasView: function () {
                return !!this.currentView
            },
            reset: function () {
                return this.empty(),
                    this.$el && (this.el = this.$el.selector),
                    delete this.$el,
                    this
            }
        }, {
                buildRegion: function (a, b) {
                    if (c.isString(a))
                        return this._buildRegionFromSelector(a, b);
                    if (a.selector || a.el || a.regionClass)
                        return this._buildRegionFromObject(a, b);
                    if (c.isFunction(a))
                        return this._buildRegionFromRegionClass(a);
                    throw new f.Error({
                        message: "Improper region configuration type.",
                        url: "marionette.region.html#region-configuration-types"
                    })
                },
                _buildRegionFromSelector: function (a, b) {
                    return new b({
                        el: a
                    })
                },
                _buildRegionFromObject: function (a, b) {
                    var d = a.regionClass || b
                        , e = c.omit(a, "selector", "regionClass");
                    return a.selector && !e.el && (e.el = a.selector),
                        new d(e)
                },
                _buildRegionFromRegionClass: function (a) {
                    return new a
                }
            }),
        f.RegionManager = f.Controller.extend({
            constructor: function (a) {
                this._regions = {},
                    this.length = 0,
                    f.Controller.call(this, a),
                    this.addRegions(this.getOption("regions"))
            },
            addRegions: function (a, b) {
                return a = f._getValue(a, this, arguments),
                    c.reduce(a, function (a, d, e) {
                        return c.isString(d) && (d = {
                            selector: d
                        }),
                            d.selector && (d = c.defaults({}, d, b)),
                            a[e] = this.addRegion(e, d),
                            a
                    }, {}, this)
            },
            addRegion: function (a, b) {
                var c;
                return c = b instanceof f.Region ? b : f.Region.buildRegion(b, f.Region),
                    this.triggerMethod("before:add:region", a, c),
                    c._parent = this,
                    this._store(a, c),
                    this.triggerMethod("add:region", a, c),
                    c
            },
            get: function (a) {
                return this._regions[a]
            },
            getRegions: function () {
                return c.clone(this._regions)
            },
            removeRegion: function (a) {
                var b = this._regions[a];
                return this._remove(a, b),
                    b
            },
            removeRegions: function () {
                var a = this.getRegions();
                return c.each(this._regions, function (a, b) {
                    this._remove(b, a)
                }, this),
                    a
            },
            emptyRegions: function () {
                var a = this.getRegions();
                return c.invoke(a, "empty"),
                    a
            },
            destroy: function () {
                return this.removeRegions(),
                    f.Controller.prototype.destroy.apply(this, arguments)
            },
            _store: function (a, b) {
                this._regions[a] || this.length++ ,
                    this._regions[a] = b
            },
            _remove: function (a, b) {
                this.triggerMethod("before:remove:region", a, b),
                    b.empty(),
                    b.stopListening(),
                    delete b._parent,
                    delete this._regions[a],
                    this.length-- ,
                    this.triggerMethod("remove:region", a, b)
            }
        }),
        f.actAsCollection(f.RegionManager.prototype, "_regions"),
        f.TemplateCache = function (a) {
            this.templateId = a
        }
        ,
        c.extend(f.TemplateCache, {
            templateCaches: {},
            get: function (a, b) {
                var c = this.templateCaches[a];
                return c || (c = new f.TemplateCache(a),
                    this.templateCaches[a] = c),
                    c.load(b)
            },
            clear: function () {
                var a, b = c.toArray(arguments), d = b.length;
                if (d > 0)
                    for (a = 0; d > a; a++)
                        delete this.templateCaches[b[a]];
                else
                    this.templateCaches = {}
            }
        }),
        c.extend(f.TemplateCache.prototype, {
            load: function (a) {
                if (this.compiledTemplate)
                    return this.compiledTemplate;
                var b = this.loadTemplate(this.templateId, a);
                return this.compiledTemplate = this.compileTemplate(b, a),
                    this.compiledTemplate
            },
            loadTemplate: function (a, c) {
                var d = b.$(a);
                if (!d.length)
                    throw new f.Error({
                        name: "NoTemplateError",
                        message: 'Could not find template: "' + a + '"'
                    });
                return d.html()
            },
            compileTemplate: function (a, b) {
                return c.template(a, b)
            }
        }),
        f.Renderer = {
            render: function (a, b) {
                if (!a)
                    throw new f.Error({
                        name: "TemplateNotFoundError",
                        message: "Cannot render the template since its false, null or undefined."
                    });
                var d = c.isFunction(a) ? a : f.TemplateCache.get(a);
                return d(b)
            }
        },
        f.View = b.View.extend({
            isDestroyed: !1,
            supportsRenderLifecycle: !0,
            supportsDestroyLifecycle: !0,
            constructor: function (a) {
                this.render = c.bind(this.render, this),
                    a = f._getValue(a, this),
                    this.options = c.extend({}, c.result(this, "options"), a),
                    this._behaviors = f.Behaviors(this),
                    b.View.call(this, this.options),
                    f.MonitorDOMRefresh(this)
            },
            getTemplate: function () {
                return this.getOption("template")
            },
            serializeModel: function (a) {
                return a.toJSON.apply(a, c.rest(arguments))
            },
            mixinTemplateHelpers: function (a) {
                a = a || {};
                var b = this.getOption("templateHelpers");
                return b = f._getValue(b, this),
                    c.extend(a, b)
            },
            normalizeUIKeys: function (a) {
                var b = c.result(this, "_uiBindings");
                return f.normalizeUIKeys(a, b || c.result(this, "ui"))
            },
            normalizeUIValues: function (a, b) {
                var d = c.result(this, "ui")
                    , e = c.result(this, "_uiBindings");
                return f.normalizeUIValues(a, e || d, b)
            },
            configureTriggers: function () {
                if (this.triggers) {
                    var a = this.normalizeUIKeys(c.result(this, "triggers"));
                    return c.reduce(a, function (a, b, c) {
                        return a[c] = this._buildViewTrigger(b),
                            a
                    }, {}, this)
                }
            },
            delegateEvents: function (a) {
                return this._delegateDOMEvents(a),
                    this.bindEntityEvents(this.model, this.getOption("modelEvents")),
                    this.bindEntityEvents(this.collection, this.getOption("collectionEvents")),
                    c.each(this._behaviors, function (a) {
                        a.bindEntityEvents(this.model, a.getOption("modelEvents")),
                            a.bindEntityEvents(this.collection, a.getOption("collectionEvents"))
                    }, this),
                    this
            },
            _delegateDOMEvents: function (a) {
                var d = f._getValue(a || this.events, this);
                d = this.normalizeUIKeys(d),
                    c.isUndefined(a) && (this.events = d);
                var e = {}
                    , g = c.result(this, "behaviorEvents") || {}
                    , h = this.configureTriggers()
                    , i = c.result(this, "behaviorTriggers") || {};
                c.extend(e, g, d, h, i),
                    b.View.prototype.delegateEvents.call(this, e)
            },
            undelegateEvents: function () {
                return b.View.prototype.undelegateEvents.apply(this, arguments),
                    this.unbindEntityEvents(this.model, this.getOption("modelEvents")),
                    this.unbindEntityEvents(this.collection, this.getOption("collectionEvents")),
                    c.each(this._behaviors, function (a) {
                        a.unbindEntityEvents(this.model, a.getOption("modelEvents")),
                            a.unbindEntityEvents(this.collection, a.getOption("collectionEvents"))
                    }, this),
                    this
            },
            _ensureViewIsIntact: function () {
                if (this.isDestroyed)
                    throw new f.Error({
                        name: "ViewDestroyedError",
                        message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
                    })
            },
            destroy: function () {
                if (this.isDestroyed)
                    return this;
                var a = c.toArray(arguments);
                return this.triggerMethod.apply(this, ["before:destroy"].concat(a)),
                    this.isDestroyed = !0,
                    this.triggerMethod.apply(this, ["destroy"].concat(a)),
                    this.unbindUIElements(),
                    this.isRendered = !1,
                    this.remove(),
                    c.invoke(this._behaviors, "destroy", a),
                    this
            },
            bindUIElements: function () {
                this._bindUIElements(),
                    c.invoke(this._behaviors, this._bindUIElements)
            },
            _bindUIElements: function () {
                if (this.ui) {
                    this._uiBindings || (this._uiBindings = this.ui);
                    var a = c.result(this, "_uiBindings");
                    this.ui = {},
                        c.each(a, function (a, b) {
                            this.ui[b] = this.$(a)
                        }, this)
                }
            },
            unbindUIElements: function () {
                this._unbindUIElements(),
                    c.invoke(this._behaviors, this._unbindUIElements)
            },
            _unbindUIElements: function () {
                this.ui && this._uiBindings && (c.each(this.ui, function (a, b) {
                    delete this.ui[b]
                }, this),
                    this.ui = this._uiBindings,
                    delete this._uiBindings)
            },
            _buildViewTrigger: function (a) {
                var b = c.defaults({}, a, {
                    preventDefault: !0,
                    stopPropagation: !0
                })
                    , d = c.isObject(a) ? b.event : a;
                return function (a) {
                    a && (a.preventDefault && b.preventDefault && a.preventDefault(),
                        a.stopPropagation && b.stopPropagation && a.stopPropagation());
                    var c = {
                        view: this,
                        model: this.model,
                        collection: this.collection
                    };
                    this.triggerMethod(d, c)
                }
            },
            setElement: function () {
                var a = b.View.prototype.setElement.apply(this, arguments);
                return c.invoke(this._behaviors, "proxyViewProperties", this),
                    a
            },
            triggerMethod: function () {
                var a = f._triggerMethod(this, arguments);
                return this._triggerEventOnBehaviors(arguments),
                    this._triggerEventOnParentLayout(arguments[0], c.rest(arguments)),
                    a
            },
            _triggerEventOnBehaviors: function (a) {
                for (var b = f._triggerMethod, c = this._behaviors, d = 0, e = c && c.length; e > d; d++)
                    b(c[d], a)
            },
            _triggerEventOnParentLayout: function (a, b) {
                var d = this._parentLayoutView();
                if (d) {
                    var e = f.getOption(d, "childViewEventPrefix")
                        , g = e + ":" + a
                        , h = [this].concat(b);
                    f._triggerMethod(d, g, h);
                    var i = f.getOption(d, "childEvents");
                    i = f._getValue(i, d);
                    var j = d.normalizeMethods(i);
                    j && c.isFunction(j[a]) && j[a].apply(d, h)
                }
            },
            _getImmediateChildren: function () {
                return []
            },
            _getNestedViews: function () {
                var a = this._getImmediateChildren();
                return a.length ? c.reduce(a, function (a, b) {
                    return b._getNestedViews ? a.concat(b._getNestedViews()) : a
                }, a) : a
            },
            _parentLayoutView: function () {
                for (var a = this._parent; a;) {
                    if (a instanceof f.LayoutView)
                        return a;
                    a = a._parent
                }
            },
            normalizeMethods: f.normalizeMethods,
            mergeOptions: f.mergeOptions,
            getOption: f.proxyGetOption,
            bindEntityEvents: f.proxyBindEntityEvents,
            unbindEntityEvents: f.proxyUnbindEntityEvents
        }),
        f.ItemView = f.View.extend({
            constructor: function () {
                f.View.apply(this, arguments)
            },
            serializeData: function () {
                if (!this.model && !this.collection)
                    return {};
                var a = [this.model || this.collection];
                return arguments.length && a.push.apply(a, arguments),
                    this.model ? this.serializeModel.apply(this, a) : {
                        items: this.serializeCollection.apply(this, a)
                    }
            },
            serializeCollection: function (a) {
                return a.toJSON.apply(a, c.rest(arguments))
            },
            render: function () {
                return this._ensureViewIsIntact(),
                    this.triggerMethod("before:render", this),
                    this._renderTemplate(),
                    this.isRendered = !0,
                    this.bindUIElements(),
                    this.triggerMethod("render", this),
                    this
            },
            _renderTemplate: function () {
                var a = this.getTemplate();
                if (a !== !1) {
                    if (!a)
                        throw new f.Error({
                            name: "UndefinedTemplateError",
                            message: "Cannot render the template since it is null or undefined."
                        });
                    var b = this.mixinTemplateHelpers(this.serializeData())
                        , c = f.Renderer.render(a, b, this);
                    return this.attachElContent(c),
                        this
                }
            },
            attachElContent: function (a) {
                return this.$el.html(a),
                    this
            }
        }),
        f.CollectionView = f.View.extend({
            childViewEventPrefix: "childview",
            sort: !0,
            constructor: function (a) {
                this.once("render", this._initialEvents),
                    this._initChildViewStorage(),
                    f.View.apply(this, arguments),
                    this.on({
                        "before:show": this._onBeforeShowCalled,
                        show: this._onShowCalled,
                        "before:attach": this._onBeforeAttachCalled,
                        attach: this._onAttachCalled
                    }),
                    this.initRenderBuffer()
            },
            initRenderBuffer: function () {
                this._bufferedChildren = []
            },
            startBuffering: function () {
                this.initRenderBuffer(),
                    this.isBuffering = !0
            },
            endBuffering: function () {
                var a, b = this._isShown && f.isNodeAttached(this.el);
                this.isBuffering = !1,
                    this._isShown && this._triggerMethodMany(this._bufferedChildren, this, "before:show"),
                    b && this._triggerBeforeAttach && (a = this._getNestedViews(),
                        this._triggerMethodMany(a, this, "before:attach")),
                    this.attachBuffer(this, this._createBuffer()),
                    b && this._triggerAttach && (a = this._getNestedViews(),
                        this._triggerMethodMany(a, this, "attach")),
                    this._isShown && this._triggerMethodMany(this._bufferedChildren, this, "show"),
                    this.initRenderBuffer()
            },
            _triggerMethodMany: function (a, b, d) {
                var e = c.drop(arguments, 3);
                c.each(a, function (a) {
                    f.triggerMethodOn.apply(a, [a, d, a, b].concat(e))
                })
            },
            _initialEvents: function () {
                this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd),
                    this.listenTo(this.collection, "remove", this._onCollectionRemove),
                    this.listenTo(this.collection, "reset", this.render),
                    this.getOption("sort") && this.listenTo(this.collection, "sort", this._sortViews))
            },
            _onCollectionAdd: function (a, b, d) {
                var e = void 0 !== d.at && (d.index || b.indexOf(a));
                if ((this.getOption("filter") || e === !1) && (e = c.indexOf(this._filteredSortedModels(e), a)),
                    this._shouldAddChild(a, e)) {
                    this.destroyEmptyView();
                    var f = this.getChildView(a);
                    this.addChild(a, f, e)
                }
            },
            _onCollectionRemove: function (a) {
                var b = this.children.findByModel(a);
                this.removeChildView(b),
                    this.checkEmpty()
            },
            _onBeforeShowCalled: function () {
                this._triggerBeforeAttach = this._triggerAttach = !1,
                    this.children.each(function (a) {
                        f.triggerMethodOn(a, "before:show", a)
                    })
            },
            _onShowCalled: function () {
                this.children.each(function (a) {
                    f.triggerMethodOn(a, "show", a)
                })
            },
            _onBeforeAttachCalled: function () {
                this._triggerBeforeAttach = !0
            },
            _onAttachCalled: function () {
                this._triggerAttach = !0
            },
            render: function () {
                return this._ensureViewIsIntact(),
                    this.triggerMethod("before:render", this),
                    this._renderChildren(),
                    this.isRendered = !0,
                    this.triggerMethod("render", this),
                    this
            },
            reorder: function () {
                var a = this.children
                    , b = this._filteredSortedModels();
                if (!b.length && this._showingEmptyView)
                    return this;
                var d = c.some(b, function (b) {
                    return !a.findByModel(b)
                });
                if (d)
                    this.render();
                else {
                    var e = c.map(b, function (b, c) {
                        var d = a.findByModel(b);
                        return d._index = c,
                            d.el
                    })
                        , f = a.filter(function (a) {
                            return !c.contains(e, a.el)
                        });
                    this.triggerMethod("before:reorder"),
                        this._appendReorderedChildren(e),
                        c.each(f, this.removeChildView, this),
                        this.checkEmpty(),
                        this.triggerMethod("reorder")
                }
            },
            resortView: function () {
                f.getOption(this, "reorderOnSort") ? this.reorder() : this.render()
            },
            _sortViews: function () {
                var a = this._filteredSortedModels()
                    , b = c.find(a, function (a, b) {
                        var c = this.children.findByModel(a);
                        return !c || c._index !== b
                    }, this);
                b && this.resortView()
            },
            _emptyViewIndex: -1,
            _appendReorderedChildren: function (a) {
                this.$el.append(a)
            },
            _renderChildren: function () {
                this.destroyEmptyView(),
                    this.destroyChildren({
                        checkEmpty: !1
                    }),
                    this.isEmpty(this.collection) ? this.showEmptyView() : (this.triggerMethod("before:render:collection", this),
                        this.startBuffering(),
                        this.showCollection(),
                        this.endBuffering(),
                        this.triggerMethod("render:collection", this),
                        this.children.isEmpty() && this.getOption("filter") && this.showEmptyView())
            },
            showCollection: function () {
                var a, b = this._filteredSortedModels();
                c.each(b, function (b, c) {
                    a = this.getChildView(b),
                        this.addChild(b, a, c)
                }, this)
            },
            _filteredSortedModels: function (a) {
                var b = this.getViewComparator()
                    , d = this.collection.models;
                if (a = Math.min(Math.max(a, 0), d.length - 1),
                    b) {
                    var e;
                    a && (e = d[a],
                        d = d.slice(0, a).concat(d.slice(a + 1))),
                        d = this._sortModelsBy(d, b),
                        e && d.splice(a, 0, e)
                }
                return this.getOption("filter") && (d = c.filter(d, function (a, b) {
                    return this._shouldAddChild(a, b)
                }, this)),
                    d
            },
            _sortModelsBy: function (a, b) {
                return "string" == typeof b ? c.sortBy(a, function (a) {
                    return a.get(b)
                }, this) : 1 === b.length ? c.sortBy(a, b, this) : a.sort(c.bind(b, this))
            },
            showEmptyView: function () {
                var a = this.getEmptyView();
                if (a && !this._showingEmptyView) {
                    this.triggerMethod("before:render:empty"),
                        this._showingEmptyView = !0;
                    var c = new b.Model;
                    this.addEmptyView(c, a),
                        this.triggerMethod("render:empty")
                }
            },
            destroyEmptyView: function () {
                this._showingEmptyView && (this.triggerMethod("before:remove:empty"),
                    this.destroyChildren(),
                    delete this._showingEmptyView,
                    this.triggerMethod("remove:empty"))
            },
            getEmptyView: function () {
                return this.getOption("emptyView")
            },
            addEmptyView: function (a, b) {
                var d, e = this._isShown && !this.isBuffering && f.isNodeAttached(this.el), g = this.getOption("emptyViewOptions") || this.getOption("childViewOptions");
                c.isFunction(g) && (g = g.call(this, a, this._emptyViewIndex));
                var h = this.buildChildView(a, b, g);
                h._parent = this,
                    this.proxyChildEvents(h),
                    h.once("render", function () {
                        this._isShown && f.triggerMethodOn(h, "before:show", h),
                            e && this._triggerBeforeAttach && (d = this._getViewAndNested(h),
                                this._triggerMethodMany(d, this, "before:attach"))
                    }, this),
                    this.children.add(h),
                    this.renderChildView(h, this._emptyViewIndex),
                    e && this._triggerAttach && (d = this._getViewAndNested(h),
                        this._triggerMethodMany(d, this, "attach")),
                    this._isShown && f.triggerMethodOn(h, "show", h)
            },
            getChildView: function (a) {
                var b = this.getOption("childView");
                if (!b)
                    throw new f.Error({
                        name: "NoChildViewError",
                        message: 'A "childView" must be specified'
                    });
                return b
            },
            addChild: function (a, b, c) {
                var d = this.getOption("childViewOptions");
                d = f._getValue(d, this, [a, c]);
                var e = this.buildChildView(a, b, d);
                return this._updateIndices(e, !0, c),
                    this.triggerMethod("before:add:child", e),
                    this._addChildView(e, c),
                    this.triggerMethod("add:child", e),
                    e._parent = this,
                    e
            },
            _updateIndices: function (a, b, c) {
                this.getOption("sort") && (b && (a._index = c),
                    this.children.each(function (c) {
                        c._index >= a._index && (c._index += b ? 1 : -1)
                    }))
            },
            _addChildView: function (a, b) {
                var c, d = this._isShown && !this.isBuffering && f.isNodeAttached(this.el);
                this.proxyChildEvents(a),
                    a.once("render", function () {
                        this._isShown && !this.isBuffering && f.triggerMethodOn(a, "before:show", a),
                            d && this._triggerBeforeAttach && (c = this._getViewAndNested(a),
                                this._triggerMethodMany(c, this, "before:attach"))
                    }, this),
                    this.children.add(a),
                    this.renderChildView(a, b),
                    d && this._triggerAttach && (c = this._getViewAndNested(a),
                        this._triggerMethodMany(c, this, "attach")),
                    this._isShown && !this.isBuffering && f.triggerMethodOn(a, "show", a)
            },
            renderChildView: function (a, b) {
                return a.supportsRenderLifecycle || f.triggerMethodOn(a, "before:render", a),
                    a.render(),
                    a.supportsRenderLifecycle || f.triggerMethodOn(a, "render", a),
                    this.attachHtml(this, a, b),
                    a
            },
            buildChildView: function (a, b, d) {
                var e = c.extend({
                    model: a
                }, d)
                    , g = new b(e);
                return f.MonitorDOMRefresh(g),
                    g
            },
            removeChildView: function (a) {
                return a ? (this.triggerMethod("before:remove:child", a),
                    a.supportsDestroyLifecycle || f.triggerMethodOn(a, "before:destroy", a),
                    a.destroy ? a.destroy() : a.remove(),
                    a.supportsDestroyLifecycle || f.triggerMethodOn(a, "destroy", a),
                    delete a._parent,
                    this.stopListening(a),
                    this.children.remove(a),
                    this.triggerMethod("remove:child", a),
                    this._updateIndices(a, !1),
                    a) : a
            },
            isEmpty: function () {
                return !this.collection || 0 === this.collection.length
            },
            checkEmpty: function () {
                this.isEmpty(this.collection) && this.showEmptyView()
            },
            attachBuffer: function (a, b) {
                a.$el.append(b)
            },
            _createBuffer: function () {
                var a = document.createDocumentFragment();
                return c.each(this._bufferedChildren, function (b) {
                    a.appendChild(b.el)
                }),
                    a
            },
            attachHtml: function (a, b, c) {
                a.isBuffering ? a._bufferedChildren.splice(c, 0, b) : a._insertBefore(b, c) || a._insertAfter(b)
            },
            _insertBefore: function (a, b) {
                var c, d = this.getOption("sort") && b < this.children.length - 1;
                return d && (c = this.children.find(function (a) {
                    return a._index === b + 1
                })),
                    c ? (c.$el.before(a.el),
                        !0) : !1
            },
            _insertAfter: function (a) {
                this.$el.append(a.el)
            },
            _initChildViewStorage: function () {
                this.children = new b.ChildViewContainer
            },
            destroy: function () {
                return this.isDestroyed ? this : (this.triggerMethod("before:destroy:collection"),
                    this.destroyChildren({
                        checkEmpty: !1
                    }),
                    this.triggerMethod("destroy:collection"),
                    f.View.prototype.destroy.apply(this, arguments))
            },
            destroyChildren: function (a) {
                var b = a || {}
                    , d = !0
                    , e = this.children.map(c.identity);
                return c.isUndefined(b.checkEmpty) || (d = b.checkEmpty),
                    this.children.each(this.removeChildView, this),
                    d && this.checkEmpty(),
                    e
            },
            _shouldAddChild: function (a, b) {
                var d = this.getOption("filter");
                return !c.isFunction(d) || d.call(this, a, b, this.collection)
            },
            proxyChildEvents: function (a) {
                var b = this.getOption("childViewEventPrefix");
                this.listenTo(a, "all", function () {
                    var d = c.toArray(arguments)
                        , e = d[0]
                        , f = this.normalizeMethods(c.result(this, "childEvents"));
                    d[0] = b + ":" + e,
                        d.splice(1, 0, a),
                        "undefined" != typeof f && c.isFunction(f[e]) && f[e].apply(this, d.slice(1)),
                        this.triggerMethod.apply(this, d)
                })
            },
            _getImmediateChildren: function () {
                return c.values(this.children._views)
            },
            _getViewAndNested: function (a) {
                return [a].concat(c.result(a, "_getNestedViews") || [])
            },
            getViewComparator: function () {
                return this.getOption("viewComparator")
            }
        }),
        f.CompositeView = f.CollectionView.extend({
            constructor: function () {
                f.CollectionView.apply(this, arguments)
            },
            _initialEvents: function () {
                this.collection && (this.listenTo(this.collection, "add", this._onCollectionAdd),
                    this.listenTo(this.collection, "remove", this._onCollectionRemove),
                    this.listenTo(this.collection, "reset", this._renderChildren),
                    this.getOption("sort") && this.listenTo(this.collection, "sort", this._sortViews))
            },
            getChildView: function (a) {
                var b = this.getOption("childView") || this.constructor;
                return b
            },
            serializeData: function () {
                var a = {};
                return this.model && (a = c.partial(this.serializeModel, this.model).apply(this, arguments)),
                    a
            },
            render: function () {
                return this._ensureViewIsIntact(),
                    this._isRendering = !0,
                    this.resetChildViewContainer(),
                    this.triggerMethod("before:render", this),
                    this._renderTemplate(),
                    this._renderChildren(),
                    this._isRendering = !1,
                    this.isRendered = !0,
                    this.triggerMethod("render", this),
                    this
            },
            _renderChildren: function () {
                (this.isRendered || this._isRendering) && f.CollectionView.prototype._renderChildren.call(this)
            },
            _renderTemplate: function () {
                var a = {};
                a = this.serializeData(),
                    a = this.mixinTemplateHelpers(a),
                    this.triggerMethod("before:render:template");
                var b = this.getTemplate()
                    , c = f.Renderer.render(b, a, this);
                this.attachElContent(c),
                    this.bindUIElements(),
                    this.triggerMethod("render:template")
            },
            attachElContent: function (a) {
                return this.$el.html(a),
                    this
            },
            attachBuffer: function (a, b) {
                var c = this.getChildViewContainer(a);
                c.append(b)
            },
            _insertAfter: function (a) {
                var b = this.getChildViewContainer(this, a);
                b.append(a.el)
            },
            _appendReorderedChildren: function (a) {
                var b = this.getChildViewContainer(this);
                b.append(a)
            },
            getChildViewContainer: function (a, b) {
                if (a.$childViewContainer)
                    return a.$childViewContainer;
                var c, d = f.getOption(a, "childViewContainer");
                if (d) {
                    var e = f._getValue(d, a);
                    if (c = "@" === e.charAt(0) && a.ui ? a.ui[e.substr(4)] : a.$(e),
                        c.length <= 0)
                        throw new f.Error({
                            name: "ChildViewContainerMissingError",
                            message: 'The specified "childViewContainer" was not found: ' + a.childViewContainer
                        })
                } else
                    c = a.$el;
                return a.$childViewContainer = c,
                    c
            },
            resetChildViewContainer: function () {
                this.$childViewContainer && (this.$childViewContainer = void 0)
            }
        }),
        f.LayoutView = f.ItemView.extend({
            regionClass: f.Region,
            options: {
                destroyImmediate: !1
            },
            childViewEventPrefix: "childview",
            constructor: function (a) {
                a = a || {},
                    this._firstRender = !0,
                    this._initializeRegions(a),
                    f.ItemView.call(this, a)
            },
            render: function () {
                return this._ensureViewIsIntact(),
                    this._firstRender ? this._firstRender = !1 : this._reInitializeRegions(),
                    f.ItemView.prototype.render.apply(this, arguments)
            },
            destroy: function () {
                return this.isDestroyed ? this : (this.getOption("destroyImmediate") === !0 && this.$el.remove(),
                    this.regionManager.destroy(),
                    f.ItemView.prototype.destroy.apply(this, arguments))
            },
            showChildView: function (a, b, d) {
                var e = this.getRegion(a);
                return e.show.apply(e, c.rest(arguments))
            },
            getChildView: function (a) {
                return this.getRegion(a).currentView
            },
            addRegion: function (a, b) {
                var c = {};
                return c[a] = b,
                    this._buildRegions(c)[a]
            },
            addRegions: function (a) {
                return this.regions = c.extend({}, this.regions, a),
                    this._buildRegions(a)
            },
            removeRegion: function (a) {
                return delete this.regions[a],
                    this.regionManager.removeRegion(a)
            },
            getRegion: function (a) {
                return this.regionManager.get(a)
            },
            getRegions: function () {
                return this.regionManager.getRegions()
            },
            _buildRegions: function (a) {
                var b = {
                    regionClass: this.getOption("regionClass"),
                    parentEl: c.partial(c.result, this, "el")
                };
                return this.regionManager.addRegions(a, b)
            },
            _initializeRegions: function (a) {
                var b;
                this._initRegionManager(),
                    b = f._getValue(this.regions, this, [a]) || {};
                var d = this.getOption.call(a, "regions");
                d = f._getValue(d, this, [a]),
                    c.extend(b, d),
                    b = this.normalizeUIValues(b, ["selector", "el"]),
                    this.addRegions(b)
            },
            _reInitializeRegions: function () {
                this.regionManager.invoke("reset")
            },
            getRegionManager: function () {
                return new f.RegionManager
            },
            _initRegionManager: function () {
                this.regionManager = this.getRegionManager(),
                    this.regionManager._parent = this,
                    this.listenTo(this.regionManager, "before:add:region", function (a) {
                        this.triggerMethod("before:add:region", a)
                    }),
                    this.listenTo(this.regionManager, "add:region", function (a, b) {
                        this[a] = b,
                            this.triggerMethod("add:region", a, b)
                    }),
                    this.listenTo(this.regionManager, "before:remove:region", function (a) {
                        this.triggerMethod("before:remove:region", a)
                    }),
                    this.listenTo(this.regionManager, "remove:region", function (a, b) {
                        delete this[a],
                            this.triggerMethod("remove:region", a, b)
                    })
            },
            _getImmediateChildren: function () {
                return c.chain(this.regionManager.getRegions()).pluck("currentView").compact().value()
            }
        }),
        f.Behavior = f.Object.extend({
            constructor: function (a, b) {
                this.view = b,
                    this.defaults = c.result(this, "defaults") || {},
                    this.options = c.extend({}, this.defaults, a),
                    this.ui = c.extend({}, c.result(b, "ui"), c.result(this, "ui")),
                    f.Object.apply(this, arguments)
            },
            $: function () {
                return this.view.$.apply(this.view, arguments)
            },
            destroy: function () {
                return this.stopListening(),
                    this
            },
            proxyViewProperties: function (a) {
                this.$el = a.$el,
                    this.el = a.el
            }
        }),
        f.Behaviors = function (a, b) {
            function c(a, d) {
                return b.isObject(a.behaviors) ? (d = c.parseBehaviors(a, d || b.result(a, "behaviors")),
                    c.wrap(a, d, b.keys(g)),
                    d) : {}
            }
            function d(a, b) {
                this._view = a,
                    this._behaviors = b,
                    this._triggers = {}
            }
            function e(a) {
                return a._uiBindings || a.ui
            }
            var f = /^(\S+)\s*(.*)$/
                , g = {
                    behaviorTriggers: function (a, b) {
                        var c = new d(this, b);
                        return c.buildBehaviorTriggers()
                    },
                    behaviorEvents: function (c, d) {
                        var g = {};
                        return b.each(d, function (c, d) {
                            var h = {}
                                , i = b.clone(b.result(c, "events")) || {};
                            i = a.normalizeUIKeys(i, e(c));
                            var j = 0;
                            b.each(i, function (a, e) {
                                var g = e.match(f)
                                    , i = g[1] + "." + [this.cid, d, j++, " "].join("")
                                    , k = g[2]
                                    , l = i + k
                                    , m = b.isFunction(a) ? a : c[a];
                                m && (h[l] = b.bind(m, c))
                            }, this),
                                g = b.extend(g, h)
                        }, this),
                            g
                    }
                };
            return b.extend(c, {
                behaviorsLookup: function () {
                    throw new a.Error({
                        message: "You must define where your behaviors are stored.",
                        url: "marionette.behaviors.html#behaviorslookup"
                    })
                },
                getBehaviorClass: function (b, d) {
                    return b.behaviorClass ? b.behaviorClass : a._getValue(c.behaviorsLookup, this, [b, d])[d]
                },
                parseBehaviors: function (a, d) {
                    return b.chain(d).map(function (d, e) {
                        var f = c.getBehaviorClass(d, e)
                            , g = new f(d, a)
                            , h = c.parseBehaviors(a, b.result(g, "behaviors"));
                        return [g].concat(h)
                    }).flatten().value()
                },
                wrap: function (a, c, d) {
                    b.each(d, function (d) {
                        a[d] = b.partial(g[d], a[d], c)
                    })
                }
            }),
                b.extend(d.prototype, {
                    buildBehaviorTriggers: function () {
                        return b.each(this._behaviors, this._buildTriggerHandlersForBehavior, this),
                            this._triggers
                    },
                    _buildTriggerHandlersForBehavior: function (c, d) {
                        var f = b.clone(b.result(c, "triggers")) || {};
                        f = a.normalizeUIKeys(f, e(c)),
                            b.each(f, b.bind(this._setHandlerForBehavior, this, c, d))
                    },
                    _setHandlerForBehavior: function (a, b, c, d) {
                        var e = d.replace(/^\S+/, function (a) {
                            return a + ".behaviortriggers" + b
                        });
                        this._triggers[e] = this._view._buildViewTrigger(c)
                    }
                }),
                c
        }(f, c),
        f.AppRouter = b.Router.extend({
            constructor: function (a) {
                this.options = a || {},
                    b.Router.apply(this, arguments);
                var c = this.getOption("appRoutes")
                    , d = this._getController();
                this.processAppRoutes(d, c),
                    this.on("route", this._processOnRoute, this)
            },
            appRoute: function (a, b) {
                var c = this._getController();
                this._addAppRoute(c, a, b)
            },
            _processOnRoute: function (a, b) {
                if (c.isFunction(this.onRoute)) {
                    var d = c.invert(this.getOption("appRoutes"))[a];
                    this.onRoute(a, d, b)
                }
            },
            processAppRoutes: function (a, b) {
                if (b) {
                    var d = c.keys(b).reverse();
                    c.each(d, function (c) {
                        this._addAppRoute(a, c, b[c])
                    }, this)
                }
            },
            _getController: function () {
                return this.getOption("controller")
            },
            _addAppRoute: function (a, b, d) {
                var e = a[d];
                if (!e)
                    throw new f.Error('Method "' + d + '" was not found on the controller');
                this.route(b, d, c.bind(e, a))
            },
            mergeOptions: f.mergeOptions,
            getOption: f.proxyGetOption,
            triggerMethod: f.triggerMethod,
            bindEntityEvents: f.proxyBindEntityEvents,
            unbindEntityEvents: f.proxyUnbindEntityEvents
        }),
        f.Application = f.Object.extend({
            constructor: function (a) {
                this._initializeRegions(a),
                    this._initCallbacks = new f.Callbacks,
                    this.submodules = {},
                    c.extend(this, a),
                    this._initChannel(),
                    f.Object.apply(this, arguments)
            },
            execute: function () {
                this.commands.execute.apply(this.commands, arguments)
            },
            request: function () {
                return this.reqres.request.apply(this.reqres, arguments)
            },
            addInitializer: function (a) {
                this._initCallbacks.add(a)
            },
            start: function (a) {
                this.triggerMethod("before:start", a),
                    this._initCallbacks.run(a, this),
                    this.triggerMethod("start", a)
            },
            addRegions: function (a) {
                return this._regionManager.addRegions(a)
            },
            emptyRegions: function () {
                return this._regionManager.emptyRegions()
            },
            removeRegion: function (a) {
                return this._regionManager.removeRegion(a)
            },
            getRegion: function (a) {
                return this._regionManager.get(a)
            },
            getRegions: function () {
                return this._regionManager.getRegions()
            },
            module: function (a, b) {
                var d = f.Module.getClass(b)
                    , e = c.toArray(arguments);
                return e.unshift(this),
                    d.create.apply(d, e)
            },
            getRegionManager: function () {
                return new f.RegionManager
            },
            _initializeRegions: function (a) {
                var b = c.isFunction(this.regions) ? this.regions(a) : this.regions || {};
                this._initRegionManager();
                var d = f.getOption(a, "regions");
                return c.isFunction(d) && (d = d.call(this, a)),
                    c.extend(b, d),
                    this.addRegions(b),
                    this
            },
            _initRegionManager: function () {
                this._regionManager = this.getRegionManager(),
                    this._regionManager._parent = this,
                    this.listenTo(this._regionManager, "before:add:region", function () {
                        f._triggerMethod(this, "before:add:region", arguments)
                    }),
                    this.listenTo(this._regionManager, "add:region", function (a, b) {
                        this[a] = b,
                            f._triggerMethod(this, "add:region", arguments)
                    }),
                    this.listenTo(this._regionManager, "before:remove:region", function () {
                        f._triggerMethod(this, "before:remove:region", arguments)
                    }),
                    this.listenTo(this._regionManager, "remove:region", function (a) {
                        delete this[a],
                            f._triggerMethod(this, "remove:region", arguments)
                    })
            },
            _initChannel: function () {
                this.channelName = c.result(this, "channelName") || "global",
                    this.channel = c.result(this, "channel") || b.Wreqr.radio.channel(this.channelName),
                    this.vent = c.result(this, "vent") || this.channel.vent,
                    this.commands = c.result(this, "commands") || this.channel.commands,
                    this.reqres = c.result(this, "reqres") || this.channel.reqres
            }
        }),
        f.Module = function (a, b, d) {
            this.moduleName = a,
                this.options = c.extend({}, this.options, d),
                this.initialize = d.initialize || this.initialize,
                this.submodules = {},
                this._setupInitializersAndFinalizers(),
                this.app = b,
                c.isFunction(this.initialize) && this.initialize(a, b, this.options)
        }
        ,
        f.Module.extend = f.extend,
        c.extend(f.Module.prototype, b.Events, {
            startWithParent: !0,
            initialize: function () { },
            addInitializer: function (a) {
                this._initializerCallbacks.add(a)
            },
            addFinalizer: function (a) {
                this._finalizerCallbacks.add(a)
            },
            start: function (a) {
                this._isInitialized || (c.each(this.submodules, function (b) {
                    b.startWithParent && b.start(a)
                }),
                    this.triggerMethod("before:start", a),
                    this._initializerCallbacks.run(a, this),
                    this._isInitialized = !0,
                    this.triggerMethod("start", a))
            },
            stop: function () {
                this._isInitialized && (this._isInitialized = !1,
                    this.triggerMethod("before:stop"),
                    c.invoke(this.submodules, "stop"),
                    this._finalizerCallbacks.run(void 0, this),
                    this._initializerCallbacks.reset(),
                    this._finalizerCallbacks.reset(),
                    this.triggerMethod("stop"))
            },
            addDefinition: function (a, b) {
                this._runModuleDefinition(a, b)
            },
            _runModuleDefinition: function (a, d) {
                if (a) {
                    var e = c.flatten([this, this.app, b, f, b.$, c, d]);
                    a.apply(this, e)
                }
            },
            _setupInitializersAndFinalizers: function () {
                this._initializerCallbacks = new f.Callbacks,
                    this._finalizerCallbacks = new f.Callbacks
            },
            triggerMethod: f.triggerMethod
        }),
        c.extend(f.Module, {
            create: function (a, b, d) {
                var e = a
                    , f = c.drop(arguments, 3);
                b = b.split(".");
                var g = b.length
                    , h = [];
                return h[g - 1] = d,
                    c.each(b, function (b, c) {
                        var g = e;
                        e = this._getModule(g, b, a, d),
                            this._addModuleDefinition(g, e, h[c], f)
                    }, this),
                    e
            },
            _getModule: function (a, b, d, e, f) {
                var g = c.extend({}, e)
                    , h = this.getClass(e)
                    , i = a[b];
                return i || (i = new h(b, d, g),
                    a[b] = i,
                    a.submodules[b] = i),
                    i
            },
            getClass: function (a) {
                var b = f.Module;
                return a ? a.prototype instanceof b ? a : a.moduleClass || b : b
            },
            _addModuleDefinition: function (a, b, c, d) {
                var e = this._getDefine(c)
                    , f = this._getStartWithParent(c, b);
                e && b.addDefinition(e, d),
                    this._addStartWithParent(a, b, f)
            },
            _getStartWithParent: function (a, b) {
                var d;
                return c.isFunction(a) && a.prototype instanceof f.Module ? (d = b.constructor.prototype.startWithParent,
                    c.isUndefined(d) ? !0 : d) : c.isObject(a) ? (d = a.startWithParent,
                        c.isUndefined(d) ? !0 : d) : !0
            },
            _getDefine: function (a) {
                return !c.isFunction(a) || a.prototype instanceof f.Module ? c.isObject(a) ? a.define : null : a
            },
            _addStartWithParent: function (a, b, c) {
                b.startWithParent = b.startWithParent && c,
                    b.startWithParent && !b.startWithParentIsConfigured && (b.startWithParentIsConfigured = !0,
                        a.addInitializer(function (a) {
                            b.startWithParent && b.start(a)
                        }))
            }
        }),
        f
});
//# sourceMappingURL=backbone.marionette.min.js.map
