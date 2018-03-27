!function () {
    Function.prototype.bind || (Function.prototype.bind = function () {
        var e = this, t = Array.prototype.slice.call(arguments), n = t.shift();
        return function () {
            return e.apply(n, t.concat(Array.prototype.slice.call(arguments)))
        }
    })
}();
var M139;
!function (jQuery, Backbone) {
    M139 = {},
    M139.Core = Backbone.Model.extend({
        initialize: function (e) {
            this.jsPath = e.jsPath
        },
        NSLOADEDSTATUS: {NOTLOAD: "none", LOADING: "loading", LOADED: "loaded"},
        THROWS: {NSNOTEXIST: "namespace not registered:"},
        defaults: {definedJSNSPath: {}, loadingJSPath: {}, loadedJSPath: {}},
        namespace: function (e, t, n) {
            for (var r = e.split("."), i = n || window; r.length > 0;) {
                var o = r.shift();
                i[o] ? 0 == r.length && (i[o] = jQuery.extend(i[o], t)) : r.length > 0 ? i[o] = {} : i[o] = t || {}, i = i[o]
            }
            return this.trigger("namespace", e), i
        },
        getJSPathByNS: function (e) {
            var t = this.get("definedJSNSPath"),
                n = t[e];
            return n || (n = e.toLowerCase() + ".js"), this.jsPath + "/" + n
        },
        registerJS: function (e, t) {
            var n = this.get("definedJSNSPath");
            n[e] = t, this.trigger("registerjs", {namespace: e, path: t})
        },
        requireJS: function (e, t) {
            function n() {
                setTimeout(t, 0)
            }

            for (var r = 0, i = [], o = [], a = [], s = 0; s < e.length; s++) {
                var l = e[s], c = this.checkNSLoaded(l);
                switch (c) {
                    case this.NSLOADEDSTATUS.NOTLOAD:
                        i.push(l);
                        break;
                    case this.NSLOADEDSTATUS.LOADING:
                        o.push(l);
                        break;
                    case this.NSLOADEDSTATUS.LOADED:
                        a.push(l)
                }
            }
            r = a.length;
            var u = o.concat(i);
            if (r === e.length)n(); else {
                this.on("namespaceload", function (t) {
                    jQuery.inArray(t.namespace, u) > -1 && (r++, r === e.length && (this.off("namespaceload", arguments.callee), n()))
                });
                for (var d = this, s = 0; s < i.length; s++)this.loadNS(i[s], function () {
                    d.trigger("namespaceload", {namespace: l, path: path})
                })
            }
        },
        checkNSLoaded: function (ns) {
            if (this.get("loadingJSPath")[ns])return this.NSLOADEDSTATUS.LOADING;
            if (this.get("definedJSNSPath")[ns])return this.NSLOADEDSTATUS.NOTLOAD;
            var obj;
            try {
                obj = eval(ns)
            } catch (e) {
            }
            return obj ? this.NSLOADEDSTATUS.LOADED : this.NSLOADEDSTATUS.NOTLOAD
        },
        loadNS: function (e, t) {
            var n = this.getJSPathByNS(e);
            this.utilCreateScriptTag({id: e, src: n}, function () {
                this.trigger("namespaceload", {
                    namespace: e,
                    path: n
                }), delete this.get("loadingJSPath")[e], this.get("loadedJSPath")[e] = 1
            }), this.get("loadingJSPath")[e] = 1
        },
        getCGUID: function () {
            function e(e, t) {
                var n = (t || 2) - (1 + Math.floor(Math.log(1 | e) / Math.LN10 + 1e-15));
                return new Array(n + 1).join("0") + e
            }

            var t = new Date;
            return "" + e(t.getHours()) + e(t.getMinutes()) + e(t.getSeconds()) + e(t.getMilliseconds(), 3) + e(Math.ceil(9999 * Math.random()), 4)
        },
        getScriptPath: function (e) {
            var t = window.location.protocol;
            e = e.replace("http:", t);
            var n = /\.js($|\?)/.test(e) && !/\/|http:/.test(e);
            if (n) {
                var r = "/m2015/js";
                if (e.indexOf(".pack.js") > -1 && (r += "/packs/"), -1 == e.indexOf("?"))try {
                    e += "?sid=" + $App.getSid()
                } catch (i) {
                }
                return r + "/" + e
            }
            return e
        },
        utilCreateScriptTag: function (e, t) {
            var n = this;
            if (t)var r = t, t = function (e) {
                r.call(n, e)
            };
            for (var i = e.id, o = this.getScriptPath(e.src), a = e.charset, s = !1, l = document.getElementsByTagName("head")[0], c = i && document.getElementById(i), u = !document.all && !0 || !1, d = ["trident/7.0", "msie 10.0", "msie 9.0", "chrome", "firefox"], p = 0, h = d.length - 1, g = window.navigator.userAgent.toLowerCase() || ""; h >= p && !(u = g.indexOf(d[p]) > -1 && !0 || !1);)p++;
            d = null;
            try {
                c && u && (c.src = "", c.parentNode.removeChild(c), c = null)
            } catch (f) {
            }
            if (null != c) {
                -1 == o.indexOf("?") && (o += "?"), o += "&" + Math.random(), c.src = o;
                var m = c
            } else {
                var m = document.createElement("script");
                i && (m.id = i), a && (m.charset = a);
                try {
                    -1 == o.indexOf("?") && (o = M139.Text.Url.makeUrl(o, {sid: top.$App.getSid()}))
                } catch (f) {
                }
                m.src = o, m.defer = !0, m.type = "text/javascript", l.appendChild(m)
            }
            document.all ? m.onreadystatechange = function () {
                "loaded" != m.readyState && "complete" != m.readyState || (s = !0, t && t())
            } : (m.onload = function () {
                s = !0, t && t()
            }, m.onerror = function () {
                s = !0, t && t(!1)
            })
        },
        utilCreateCssTag: function (e, t, n) {
            t = t || document;
            for (var r = $("link", t), i = 0; i < r.length; i++)if (r[i].href.indexOf(e) > -1)return void(n && n());
            -1 == e.indexOf("http") && (e = window.location.protocol + "//" + location.host + e);
            var o = '<link rel="stylesheet" href="' + e + '" type="text/css" />';
            $B.is.ie && document.documentMode && document.documentMode <= 8 ? $(o).load(function () {
                n && n()
            }) : n && n(), $("head:eq(0)", t).append(o)
        }
    }), M139.core = M139.Core = new M139.Core({jsPath: "/m2015/js"}), M139.namespace = function () {
        M139.Core.namespace.apply(M139.Core, arguments)
    }, M139.requireJS = function () {
        M139.Core.requireJS.apply(M139.Core, arguments)
    }, M139.registerJS = function () {
        M139.Core.registerJS.apply(M139.Core, arguments)
    }, M139.unique = function (e, t) {
        var n = [];
        try {
            for (var r = 0, i = e.length; i > r; r++) {
                for (var o = e[r], a = !1, s = 0, l = n.length; l > s; s++)if (t(n[s], o)) {
                    a = !0;
                    break
                }
                a || n.push(e[r])
            }
        } catch (c) {
            n = e
        }
        return n
    }
}(jQuery, Backbone),
function (e) {
    var t = e;
    M139.Text = {
        Mobile: {
            getChinaMobileRegex: function () {
                return new RegExp("^86(?:13[4-9]|147|15[012789]|178|18[23478]|198)[0-9]{8}$|^861705[0-9]{7}$")
            }, getMobileRegex: function () {
                return new RegExp("^86(?:13|14|15|17|18|19)[0-9]{9}$")
            }, isMobile: function (e) {
                return e = this.add86(e), this.getMobileRegex().test(e)
            }, isChinaMobile: function (e) {
                return e ? (e = this.add86(e), this.getChinaMobileRegex().test(e)) : !1
            }, isMobileAddr: function (e) {
                if (/^\d+$/.test(e))return this.isMobile(e);
                var t = /^(?:"[^"]*"|'[^']*'|[^"<>;,；，]*)\s*<(\d+)>$/, n = e.match(t);
                if (n) {
                    var r = n[1];
                    return this.isMobile(r)
                }
                return !1
            }, isChinaMobileAddr: function (e) {
                if (/^\d+$/.test(e))return this.isChinaMobile(e);
                var t = /^(?:"[^"]*"|'[^']*'|[^"<>;,；，]*)\s*<(\d+)>$/, n = e.match(t);
                if (n) {
                    var r = n[1];
                    return this.isChinaMobile(r)
                }
                return !1
            }, parse: function (e, n) {
                var r = {};
                if (r.error = "", "string" != typeof e)return r.error = "参数不合法", r;
                for (var i = e.split(/[;,，；]/), o = r.numbers = [], a = 0; a < i.length; a++) {
                    var s = t.trim(i[a]);
                    if ("" != s) {
                        var l = !1;
                        l = n && n.checkType && "chinamobile" == n.checkType.toLowerCase() ? this.isChinaMobileAddr(s) : this.isMobileAddr(s), l ? o.push(s) : r.error = s
                    }
                }
                return r.error ? r.success = !1 : r.success = !0, r
            }, getName: function (e) {
                return this.isMobileAddr(e) ? -1 == e.indexOf("<") ? "" : e.replace(/<\d+>$/, "").replace(/^["']|["']$/g, "") : ""
            }, getNumber: function (e) {
                if ("string" != typeof e)return "";
                if (e = e.trim(), this.isMobile(e))return e;
                var t = /<(\d+)>$/, n = e.match(t);
                return n ? n[1].toLowerCase() : ""
            }, compare: function (e, t) {
                return e && t ? (e = this.remove86(this.getNumber(e)), t = this.remove86(this.getNumber(t)), !(!e || e != t)) : !1
            }, splitAddr: function (e) {
                for (var t = e.split(/[,;；，]/), n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (0 == r.indexOf('"') && 0 == r.lastIndexOf('"')) {
                        var i = t[n + 1];
                        i && i.indexOf('"') == i.lastIndexOf('"') && (t[n] = r + " " + i, t.splice(n + 1, 1), n--)
                    }
                }
                return t
            }, add86: function (e) {
                return "string" != typeof e && (e = e.toString()), e.trim().replace(/^(?:86)?(?=\d{11}$)/, "86")
            }, remove86: function (e) {
                return "string" != typeof e && (e = e.toString()), e.trim().replace(/^86(?=\d{11}$)/, "")
            }, getSendText: function (e, t) {
                return "string" != typeof e || "string" != typeof t ? "" : '"' + e.replace(/[\s;,；，<>"]/g, " ") + '"<' + t.replace(/\D/g, "") + ">"
            }
        },
        Email: {
            getEmailRegex: function () {
                return /^[A-Z0-9._%&\/'+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i
            }, getEmailRegexQuckMode: function () {
                return /<([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8})>$/i
            }, isEmail: function (e) {
                if ("string" != typeof e)return !1;
                e = t.trim(e);
                var n = this.getEmailRegex();
                return n.test(e)
            }, isPrettyNumberEmail: function (e) {
                if (!this.isLocalEmailAddr(e))return !1;
                if ("string" != typeof e)return !1;
                var t = $App.getConfig("prettyNumber");
                if (!t) {
                    if (!$D.storage.exists("prettyNumberStr"))return !1;
                    if ($App.getPrettyNumberData(), t = $App.getConfig("prettyNumber"), !t)return !1
                }
                var n = t.forbiddenAccount, r = t.cuteNumberStr, i = $Email.getName(e);
                return -1 != n.indexOf("," + i + ",") ? !1 : -1 != r.indexOf("," + i + ",") ? !0 : !(!/^[A-Za-z0-9]{4,4}$/.test(i) || /^\d{4,4}$/.test(i))
            }, isLocalEmailAddr: function (e) {
                if (!this.isEmail(e))return !1;
                var t = this.getDomain(e);
                return t == (window.SiteConfig && SiteConfig.mailDomain || "139.com") || "hmg1.rd139.com" == t
            }, isEmailAddr: function (e) {
                if ("string" != typeof e)return !1;
                if (e = t.trim(e), this.isEmail(e))return !0;
                var n = /^(?:"[^"]*"\s?|[^;,，；"]*|'[^']*')<([^<>]+)>$/, r = e.match(n);
                return r ? !!this.isEmail(r[1]) : !1
            }, getName: function (e) {
                if ("string" != typeof e)return "";
                if (e = e.trim(), this.isEmail(e))return e.split("@")[0];
                if (this.isEmailAddr(e)) {
                    var n = e.replace(/<[^@<>]+@[^@<>]+>$/, "");
                    return n = t.trim(n.replace(/"/g, "")), "" == n ? this.getAccount(e) : n
                }
                return ""
            }, getNameQuick: function (e) {
                var t = "";
                if (-1 == e.indexOf("<"))this.isEmail(e) && (t = e.split("@")[0]); else {
                    var n = e.replace(/<[^@<>]+@[^@<>]+>$/, "");
                    n = n.replace(/"/g, "").trim(), t = n || this.getAccount(e)
                }
                return t
            }, getObjQuick: function (e) {
                var t, n;
                if (e.indexOf("<") > -1) {
                    t = this.getEmailRegexQuckMode(), n = e.match(t);
                    var r = e.replace(/<[^@<>]+@[^@<>]+>$/, "");
                    return r = r.replace(/"/g, "").trim(), result = r || this.getAccount(e), {
                        original: e,
                        email: n ? n[1].toLowerCase() : "",
                        name: result
                    }
                }
                return t = this.getEmailRegex(), n = e.match(t), {
                    original: e,
                    email: n ? n[0].toLowerCase() : "",
                    name: n[1]
                }
            }, getEmail: function (e) {
                return this.isEmailAddr(e) ? this.getAccount(e) + "@" + this.getDomain(e) : ""
            }, getEmailQuick: function (e) {
                var t, n;
                return e.indexOf("<") > -1 ? (t = this.getEmailRegexQuckMode(), n = e.match(t), n ? n[1].toLowerCase() : "") : (t = this.getEmailRegex(), n = e.match(t), n ? n[0].toLowerCase() : "")
            }, getAccount: function (e) {
                return "string" != typeof e ? "" : (e = t.trim(e), this.isEmail(e) ? e.split("@")[0].toLowerCase() : this.isEmailAddr(e) ? e.match(/<([^@<>]+)@[^@<>]+>$/)[1].toLowerCase() : "")
            }, getDomain: function (e) {
                return "string" != typeof e ? "" : (e = t.trim(e), this.isEmail(e) ? e.split("@")[1].toLowerCase() : this.isEmailAddr(e) ? e.match(/@([^@]+)>$/)[1].toLowerCase() : "")
            }, splitAddr: function (e) {
                for (var t = e.split(/[,;；，]/), n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (0 == r.indexOf('"') && 0 == r.lastIndexOf('"')) {
                        var i = t[n + 1];
                        i && i.indexOf('"') == i.lastIndexOf('"') && (t[n] = r + " " + i, t.splice(n + 1, 1), n--)
                    }
                }
                return t
            }, compare: function (e, t) {
                var n = this.getEmail(e).toLowerCase();
                return !(!n || n != this.getEmail(t).toLowerCase())
            }, getSendText: function (e, t) {
                return "string" != typeof e || "string" != typeof t ? "" : '"' + e.replace(/[\s;,；，<>"]/g, " ") + '"<' + t.replace(/[\s;,；，<>"]/g, "") + ">"
            }, parse: function (e) {
                var n = {};
                if (n.error = "", "string" != typeof e)return n.error = "参数不合法", n;
                for (var r = e.split(/[;,，；]/), i = n.emails = [], o = 0; o < r.length; o++) {
                    var a = t.trim(r[o]);
                    "" != a && (this.isEmail(a) ? i.push(a) : this.isEmailAddr(a) ? i.push(a) : n.error = a)
                }
                return n.error ? n.success = !1 : n.success = !0, n
            }, parseEmail: function (e) {
                var t = /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}|(?:"[^"]*")?\s?<[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}>)\s*(?=;|,|，|；|$)/gi, n = /^"([^"]+)"|^([^<]+)</, r = /<?([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})>?/i, i = e.match(t), o = [];
                if (i)for (var a = 0, s = i.length; s > a; a++) {
                    var l = {};
                    l.all = i[a];
                    var c = i[a].match(n);
                    c && (l.name = c[1]), c = i[a].match(r), c && (l.addr = c[1]), l.addr && (l.account = l.addr.split("@")[0], l.domain = l.addr.split("@")[1], l.name || (l.name = l.account), o.push(l))
                }
                return o
            }, getMailListFromString: function (e) {
                if ("string" == typeof e) {
                    e = e.split(",");
                    for (var t = 0; t < e.length; t++)"" == e[t].trim() && (e.splice(t, 1), t--);
                    return e
                }
            }
        },
        Url: {
            queryString: function (e, t) {
                t = void 0 === t ? location.search : t, t = t.split(/&|\?/);
                var n = null;
                e = String(e).toLowerCase();
                for (var r = 0; r < t.length; r++) {
                    var i = t[r], o = i.split("=");
                    if (o[0].toLowerCase() == e) {
                        n = o[1];
                        break
                    }
                }
                if (n)try {
                    n = M139.Text.Encoding.tryDecode(n)
                } catch (a) {
                }
                return n
            }, getQueryObj: function (e) {
                var t = {};
                if (e = e || location.href, "string" != typeof e)throw"参数url必须是字符串类型";
                if (-1 != e.indexOf("?"))for (var n = e.split("?")[1], r = n.split("&"), i = 0; i < r.length; i++) {
                    var o = r[i].split("="), a = o[0], s = o[1];
                    try {
                        s = M139.Text.Encoding.tryDecode(s)
                    } catch (l) {
                    }
                    t[a] = s
                }
                return t
            }, makeUrl: function (e, t) {
                return -1 == e.indexOf("?") && (e += "?"), /\?$/.test(e) || (e += "&"), e += "string" == typeof t ? t : this.urlEncodeObj(t)
            }, urlEncodeObj: function (e) {
                var t = [];
                for (var n in e)e.hasOwnProperty(n) && t.push(n + "=" + encodeURIComponent(e[n]));
                return t.join("&")
            }, getAbsoluteUrl: function (e, t) {
                if (t = t || location.href, t = t.split("?")[0], t = t.replace(/([^:\/])\/+/g, "$1/"), e = e.replace(/\/+/g, "/"), t = t.replace(/\/[^\/]*$/, ""), e.indexOf("http://") > -1 || e.indexOf("https://") > -1)return e;
                if (0 == e.indexOf("/"))return window.location.protocol + "//" + this.getHost(t) + e;
                for (; 0 == e.indexOf("../");)e = e.replace("../", ""), t = t.replace(/\/[^\/]*$/, "");
                return t + "/" + e
            }, getFileName: function (e) {
                if ("string" == typeof e) {
                    var t = e.split("?")[0], n = /[^\/\\]+$/, r = t.match(n);
                    if (r)return r[0]
                }
                return ""
            }, getFileExtName: function (e) {
                return e && e.indexOf(".") > -1 ? e.split(".").pop().toLowerCase() : ""
            }, getFileNameNoExt: function (e) {
                var t = this.getFileName(e);
                return t.replace(/([^.]+)\.[^.]+$/, "$1")
            }, getOverflowFileName: function (e, t) {
                if (t = t || 25, e = this.getFileName(e), e.length <= t)return e;
                var n = e.lastIndexOf(".");
                if (-1 == n || e.length - n > 5)return e.substring(0, t - 2) + "…";
                var r = "^(.{" + (t - 4) + "}).*(\\.[^.]+)$";
                return e.replace(new RegExp(r), "$1…$2")
            }, isUrl: function (e) {
                var t = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/;
                return t.test(e)
            }, getHost: function (e) {
                e = this.removeProtocols(e);
                var t = e.match(/([^\/]+)/);
                return t ? t[1] : ""
            }, removeProtocols: function (e) {
                try {
                    return e.replace(/^(http|ftp|https|file):\/\//, "")
                } catch (t) {
                    return ""
                }
            }, removeHttp: function () {
                return this.removeProtocols.apply(this, arguments)
            }, addHttp: function (e) {
                return /^https?:\/\//.test(e) || (e = window.location.protocol + "//" + e), e
            }, joinUrl: function () {
                return Array.prototype.join.call(arguments, "/").replace(/\/+/g, "/")
            }, removeHost: function (e) {
                return e = this.removeProtocols(e), e.replace(/^[^\/]+/, "")
            }, correctUrl: function (e, t) {
                var n = top.$User.getPartId(), r = window.location.protocol, i = e;
                return i ? (/^http:\/\//.test(i) && (i = this.removeHost(i)), "1" == n || "12" == n ? i = top.getDomain("resource") + i : "21" == n && (t ? "http:" == r ? i = "http://images.139cm.com" + i : "https:" == r && (i = "https://appmail.mail.10086.cn/images_139cm" + i) : (i = "http://g2.mail.10086ts.cn" + i, "https:" == r && (i = i.replace(/^http:\/\//, "https://")))), i) : void 0
            }
        },
        Xml: {
            xml_encodes: {"&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;"},
            xml_decodes: {"&amp;": "&", "&quot;": '"', "&lt;": "<", "&gt;": ">"},
            encode: function (e) {
                if ("string" != typeof e)e = void 0 === e ? "" : String(e); else if (0 == e.indexOf("<![CDATA["))return e;
                var t = this.xml_encodes;
                return e.replace(/([\&"<>])/g, function (e, n) {
                    return t[n]
                })
            },
            decode: function (e) {
                var t = this.xml_decodes;
                return e.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function (e, n) {
                    return t[n]
                })
            },
            parseXML: function (t) {
                var n = null;
                try {
                    if (document.all) {
                        var r = this.getIEXMLDoc();
                        r.loadXML(t), r.documentElement && (n = r)
                    } else n = e.parseXML(t)
                } catch (i) {
                }
                return n
            },
            getIEXMLDoc: function () {
                var e = ["Microsoft.XMLDOM", "MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML.DOMDocument"];
                if (this.enabledXMLObjectVersion)return new ActiveXObject(this.enabledXMLObjectVersion);
                for (var t = 0; t < e.length; t++)try {
                    var n = e[t], r = new ActiveXObject(n);
                    if (r)return this.enabledXMLObjectVersion = n, r
                } catch (i) {
                }
                return null
            },
            obj2xml2: function (e) {
                function n(e) {
                    for (var i in e) {
                        var o = e[i];
                        if ("string" == typeof o || "number" == typeof o || "boolean" == typeof o) {
                            var a = "string" == typeof o && 0 == o.indexOf("<![CDATA[") ? o : M139.Text.Xml.encode(o);
                            r.push("<" + i + ">" + a + "</" + i + ">")
                        } else if (t.isArray(o))for (var s = 0; s < o.length; s++)r.push("<" + i + ">"), r.push(n(o[s])), r.push("</" + i + ">"); else if (o && o.attributes) {
                            r.push("<" + i + " ");
                            for (var l in o.attributes)o.attributes.hasOwnProperty(l) && r.push(l + '="' + o.attributes[l] + '" ');
                            r.push(">"), delete o.attributes, r.push(n(o)), r.push("</" + i + ">")
                        } else"object" == typeof o && (r.push("<" + i + ">"), r.push(n(o)), r.push("</" + i + ">"))
                    }
                }

                var r = [];
                return n(e), r.join("")
            },
            obj2xml: function (e) {
                function t(e) {
                    return r(null, e, "\n").substr(1)
                }

                function n(e) {
                    return Object.prototype.toString.call(e).replace(/^\[object (\w+)\]$/, "$1")
                }

                function r(e, t, s) {
                    if (null == t)return s + o("null", e);
                    var l = n(t);
                    if ("String" == l)return s + o("string", e, $Xml.encode(a(t)));
                    if ("Object" == l) {
                        if (t.nodeType)return T.Tip.show("参数错误"), "";
                        var c = "";
                        for (var u in t)c += r(u, t[u], s + "  ");
                        return s + o("object", e, c + s)
                    }
                    if ("Array" == l) {
                        for (var c = "", u = 0; u < t.length; u++)c += r(null, t[u], s + "  ");
                        return s + o("array", e, c + s)
                    }
                    if ("Boolean" == l || "Number" == l) {
                        var c = t.toString();
                        return s + o(i(t, c), e, c)
                    }
                    if ("Date" == l) {
                        var c = "" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
                        return (t.getHours() > 0 || t.getMinutes() > 0 || t.getSeconds() > 0) && (c += " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()), s + o(i(t, c), e, c)
                    }
                    return ""
                }

                function i(e, t) {
                    if (null == e)return "null";
                    var r = n(e);
                    if ("Number" == r) {
                        var i = t ? t : e.toString();
                        if (-1 == i.indexOf(".")) {
                            if (e >= -2147483648 & 2147483648 > e)return "int";
                            if (!isNaN(e))return "long"
                        }
                        return "int"
                    }
                    return r.toLowerCase()
                }

                function o(e, t, n) {
                    var r = "<" + e;
                    return t && (r += ' name="' + a(t) + '"'), n ? (r += ">" + n, ">" == n.charAt(n.length - 1) && (r += "\n"), r + "</" + e + ">") : r + " />"
                }

                function a(e) {
                    return e = e.replace(/[\x00-\x08\x0b\x0e-\x1f]/g, "")
                }

                return t(e)
            },
            xml2object: function (e) {
                function n(e) {
                    if (e.firstChild && 3 == e.firstChild.nodeType)return t(e.firstChild).text();
                    if (e.firstChild) {
                        var r = {};
                        if (e.childNodes)for (var i = 0; i < e.childNodes.length; i++) {
                            var o = e.childNodes[i], a = r[o.nodeName];
                            a ? (t.isArray(a) || (r[o.nodeName] = [a]), r[o.nodeName].push(n(o))) : r[o.nodeName] = n(o)
                        }
                        return r
                    }
                    return ""
                }

                var r = null, i = this.parseXML(e);
                if (i && i.documentElement) {
                    var o = i.documentElement;
                    r = n(o)
                }
                return r
            }
        },
        Html: {
            html_decodes: {"&amp;": "&", "&quot;": '"', "&lt;": "<", "&gt;": ">", "&nbsp;": " ", "&#39;": "'"},
            encode: function (e) {
                return "string" != typeof e ? "" : e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/ /g, "&nbsp;")
            },
            decode: function (e) {
                if ("string" != typeof e)return "";
                var t = this.html_decodes;
                return e.replace(/(&quot;|&lt;|&gt;|&amp;|&nbsp;|&#39;)/g, function (e, n) {
                    return t[n]
                })
            }
        },
        Utils: {
            getFileSizeText: function (e, t) {
                var n = "B";
                t || (t = {}), t.byteChar && (n = t.byteChar, "B" == t.maxUnit && (t.maxUnit = n));
                var r = t.maxUnit || "T";
                if (n != r && e >= 1024 && (n = "K", e /= 1024, n != r && e >= 1024 && (n = "M", e /= 1024, n != r && e >= 1024 && (n = "G", e /= 1024, n != r && e >= 1024 && (n = "T", e /= 1024))), e = Math.ceil(100 * e) / 100), "K" == n && (e = Math.ceil(e)), t.comma) {
                    var i = /(\d)(\d{3})($|\.)/;
                    for (e = e.toString(); i.test(e);)e = e.replace(i, "$1,$2$3")
                }
                return -1 != (e + "").indexOf("B") ? e : -1 != (e + "").indexOf("B") ? e : (t.fixed && e.toString().indexOf(".") >= 0 && (e = e.toFixed(1)), e + n)
            },
            getTextOverFlow: function (e, t, n) {
                return e.length <= t ? e : e.substring(0, t) + (n ? "..." : "")
            },
            getTextOverFlow2: function (e, t, n) {
                for (var r = e.split(""), i = 0, o = new RegExp("[A-Z]|[^\x00-ÿ]", "g"), a = 0; a < r.length; a++) {
                    var s = r[a].match(o);
                    if (i += null == s ? 1 : 2, i > t)return e.substring(0, a) + (n ? "..." : "")
                }
                return e
            },
            format: function (e, n) {
                var r;
                return r = t.isArray(n) ? /\{([\d]+)\}/g : /\{([\w]+)\}/g, e.replace(r, function (e, t) {
                    var r = n[t];
                    return void 0 !== r ? r : ""
                })
            },
            formatBatch: function (e, t) {
                var n, r, i, o, a, s = [], l = {};
                if ((r = t.length) <= 0)return [];
                for (a in t[0])s.push(a), l["{" + a + "}"] = a;
                for (i = new RegExp("{(?:" + s.join("|") + ")}", "gm"), n = 0, o = []; r > n; n++)o.push(e.replace(i, function (e) {
                    return String(t[n][l[e]])
                }));
                return o
            },
            getBytes: function (e) {
                var t = e.match(/[^\x00-\xff]/gi);
                return e.length + (null == t ? 0 : t.length)
            },
            getBytesLength: function (e) {
                for (var t, n = 0, r = 0; r < e.length; r++)t = e.charCodeAt(r), 127 > t ? n++ : n += t >= 128 && 2047 >= t ? 2 : t >= 2048 && 65535 >= t ? 3 : 4;
                return n
            },
            getXmlDoc: function (e) {
                if (window.DOMParser) {
                    var t = new DOMParser;
                    return t.parseFromString(e, "text/xml")
                }
                var n = this.createIEXMLObject();
                return n.loadXML(e), n
            },
            createIEXMLObject: function () {
                var e = ["Microsoft.XMLDOM", "MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "MSXML2.DOMDocument.3.0", "MSXML.DOMDocument"];
                if (window.enabledXMLObjectVersion)return new ActiveXObject(enabledXMLObjectVersion);
                for (var t = 0; t < e.length; t++)try {
                    var n = e[t], r = new ActiveXObject(n);
                    if (r)return enabledXMLObjectVersion = n, r
                } catch (i) {
                }
                return null
            },
            htmlEncode: function (e) {
                return "undefined" == typeof e ? "" : (e = e.replace(/&/g, "&amp;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = e.replace(/\"/g, "&quot;"), e = e.replace(/ /g, "&nbsp;"), e = e.replace(/&amp;#([^\;]+);/gi, "&#$1;"))
            },
            parseSingleEmail: function (e) {
                e = t.trim(e);
                var n = {}, r = /^([\s\S]*?)<([^>]+)>$/;
                if (-1 == e.indexOf("<"))n.addr = e, n.name = e.split("@")[0], n.all = e; else {
                    var i = e.match(r);
                    i ? (n.name = t.trim(i[1]).replace(/^"|"$/g, ""), n.addr = i[2], n.name = n.name.replace(/\\["']/g, "").replace(/^["']+|["']+$/g, ""), n.all = '"' + n.name.replace(/"/g, "") + '"<' + n.addr + ">") : (n.addr = e, n.name = e, n.all = e)
                }
                return n.name && (n.name = this.htmlEncode(n.name)), n
            },
            getFileIcoClass: function (e, t) {
                var n = /\.(?:doc|docx|xls|xlsx|ppt|pptx|pdf|txt|html|htm|jpg|jpeg|jpe|jfif|gif|png|bmp|tif|tiff|ico|rar|zip|7z|exe|apk|ipa|mp3|wav|iso|avi|rmvb|wmv|flv|bt|fla|swf|dvd|cd|fon|eml)$/i, r = t.split(".").length, i = t.split(".")[r - 1].toLowerCase();
                return n.test(t) ? 1 == e ? "i_file i_f_" + i : "i_file_16 i_m_" + i : 1 == e ? "i_file i_f_139" : "i_file_16 i_m_139"
            },
            getFileIcoClass2: function (e, t) {
                var n = /\.(?:doc|docx|xls|xlsx|ppt|pptx|pdf|txt|html|htm|jpg|jpeg|jpe|jfif|gif|png|bmp|tif|tiff|ico|eml|rar|zip|7z|exe|apk|ipa|mp3|wav|iso|avi|rmvb|wmv|flv|bt|fla|swf|dvd|cd|fon|mp4|3gp|mpg|mkv|asf|mov|rm|wma|m4a|asf)$/i, r = t.split(".").length, i = t.split(".")[r - 1].toLowerCase();
                return n.test(t) ? 1 == e ? "i_file i_f_" + i : "i-file-smalIcion i-f-" + i : 1 == e ? "i_file i_f_139" : "i-file-smalIcion i_m_139"
            },
            getFileIcoClassV3: function (e, t) {
                t = t ? t : "";
                var n = /\.(?:doc|docx|xls|xlsx|ppt|pptx|pdf|txt|html|htm|jpg|jpeg|jpe|jfif|gif|png|bmp|tif|tiff|ico|psd|ai|eml|rar|zip|7z|exe|apk|ipa|mp3|wav|iso|avi|rmvb|wmv|flv|bt|fla|swf|dvd|cd|fon|mp4|3gp|mpg|mkv|asf|mov|rm|wma|m4a|asf)$/i, r = t.split(".").length, i = t.split(".")[r - 1].toLowerCase();
                return n.test(t) ? 1 == e ? "i-cb-" + i : "i-cm-" + i : 1 == e ? "i-cb-default" : "i-cm-default"
            },
            textFocusEnd: function (e) {
                if (e) {
                    e.focus();
                    var t = e.value.length;
                    if (document.selection) {
                        var n = e.createTextRange();
                        n.moveStart("character", t), n.collapse(), n.select()
                    } else"number" == typeof e.selectionStart && "number" == typeof e.selectionEnd && (e.selectionStart = e.selectionEnd = t)
                }
            },
            getCGUID: function (e) {
                function t(e, t) {
                    var n = (t || 2) - (1 + Math.floor(Math.log(1 | e) / Math.LN10 + 1e-15));
                    return new Array(n + 1).join("0") + e
                }

                var n = e || new Date;
                return "" + t(n.getHours()) + t(n.getMinutes()) + t(n.getSeconds()) + t(n.getMilliseconds(), 3) + t(Math.ceil(9999 * Math.random()), 4)
            },
            getDateTimeFromCGUID: function (e) {
                var t = /^(\d{2})(\d{2})(\d{2})(\d{3})/, n = e.match(t);
                if (n) {
                    var r = parseInt(n[1], 10), i = parseInt(n[2], 10), o = parseInt(n[3], 10), a = parseInt(n[4], 10), s = new Date;
                    return new Date(s.getFullYear(), s.getMonth(), s.getDate(), r, i, o, a)
                }
                return null
            },
            chnNumChar: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
            chnUnitSection: ["", "万", "亿", "万亿", "亿亿"],
            chnUnitChar: ["", "十", "百", "千"],
            chnNumCharObj: {"零": 0, "一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9},
            chnNameValue: {
                "十": {value: 10, secUnit: !1},
                "百": {value: 100, secUnit: !1},
                "千": {value: 1e3, secUnit: !1},
                "万": {value: 1e4, secUnit: !0},
                "亿": {value: 1e8, secUnit: !0}
            },
            sectionToChinese: function (e) {
                for (var t = "", n = "", r = 0, i = !0; e > 0;) {
                    var o = e % 10;
                    0 === o ? i || (i = !0, n = this.chnNumChar[o] + n) : (i = !1, t = this.chnNumChar[o], t += this.chnUnitChar[r], n = t + n), r++, e = Math.floor(e / 10)
                }
                return n
            },
            numberToChinese: function (e) {
                var t = 0, n = "", r = "", i = !1;
                if (0 === e)return this.chnNumChar[0];
                for (; e > 0;) {
                    var o = e % 1e4;
                    i && (r = this.chnNumChar[0] + r), n = this.sectionToChinese(o), n += 0 !== o ? this.chnUnitSection[t] : this.chnUnitSection[0], r = n + r, i = 1e3 > o && o > 0, e = Math.floor(e / 1e4), t++
                }
                return r
            },
            chineseToNumber: function (e) {
                for (var t = 0, n = 0, r = 0, i = !1, o = e.split(""), a = 0; a < o.length; a++) {
                    var s = this.chnNumCharObj[o[a]];
                    if ("undefined" != typeof s)r = s, a === o.length - 1 && (n += r); else {
                        var l = this.chnNameValue[o[a]].value;
                        i = this.chnNameValue[o[a]].secUnit, i ? (n = (n + r) * l, t += n, n = 0) : n += r * l, r = 0
                    }
                }
                return t + n
            }
        },
        Cookie: {
            get: function (e) {
                var t = $Url.getQueryObj() && $Url.getQueryObj().k, n = null;
                return t ? (n = document.cookie.match(new RegExp("(^|\\W)" + e + t + "=([^;]*)(;|$)")), n = n ? n : document.cookie.match(new RegExp("(^|\\W)" + e + "=([^;]*)(;|$)"))) : n = document.cookie.match(new RegExp("(^|\\W)" + e + "=([^;]*)(;|$)")), null != n ? unescape(n[2]) : ""
            }, set: function (e) {
                var t = e.name, n = e.value, r = e.path || "/", i = e.domain, o = e.expires, a = t + "=" + escape(n) + "; ";
                a += "path=" + r + "; ", i && (a += "domain=" + i + "; "), o && (a += "expires=" + o.toGMTString() + "; "), document.cookie = a
            }
        },
        Encoding: {
            tryDecode: function (e) {
                var t = "";
                if (/%u[0-9A-Fa-f]{4}|\+/.test(e) && !/~|!/.test(e))try {
                    t = unescape(e)
                } catch (n) {
                } else try {
                    t = decodeURIComponent(e)
                } catch (n) {
                }
                return t
            }
        }
    }, $T = M139.Text, $Xml = M139.Text.Xml, $JSON = M139.Text.JSON, $Cookie = M139.Text.Cookie, $Email = M139.Text.Email, $Mobile = M139.Text.Mobile, $Mobile.getMobile = $Mobile.getNumber, $TextUtils = M139.Text.Utils, $Url = M139.Text.Url, $T.format = M139.Text.Utils.format, "function" != typeof String.prototype.trim && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), String.prototype.toNormalString = function () {
        var e = /&#([^\;]+);/gi, t = new String(this), n = t.match(e);
        if (null == n || 0 == n.length)return this;
        for (var r = 0; r < n.length; r++) {
            var i = String.fromCharCode(parseInt(n[r].replace(e, "$1"), 10));
            t = t.replace(n[r], i)
        }
        return t
    }, String.prototype.getByteCount = function () {
        for (var e, t = this.length, n = 0; t--;)switch (e = this.charCodeAt(t), !0) {
            case 127 >= e:
                n += 1;
                break;
            case 2047 >= e:
                n += 2;
                break;
            case 65535 >= e:
                n += 3;
                break;
            case 131071 >= e:
                n += 4;
                break;
            case 34359738367 >= e:
                n += 5
        }
        return n
    }, String.prototype.format = function () {
        var e = this, t = arguments, n = t.length;
        return e = e.replace(/\{(\d+)\}/g, function (e, r) {
            return r = String(r), r >= n ? e : t[r]
        })
    }, String.prototype.encode = function () {
        return M139.Text.Html.encode(this)
    }, String.prototype.decode = function () {
        return M139.Text.Html.decode(this)
    }
}(jQuery),
function (e, t, n) {
    n.Event = {
        getEvent: function (e) {
            var t = e || window.event;
            if (!t)for (var n = [], r = this.getEvent.caller; r && (t = r.arguments[0], !t || !t.constructor.target && !t.srcElement);) {
                for (var i = !1, o = 0; o < n.length; o++)if (r == n[o]) {
                    i = !0;
                    break
                }
                if (i)break;
                n.push(r), r = r.caller
            }
            return t
        },
        stopEvent: function (e) {
            e || (e = this.getEvent()), e && (e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : (e.cancelBubble = !0, e.returnValue = !1))
        },
        KEYCODE: {
            A: 65,
            C: 67,
            S: 83,
            X: 88,
            V: 86,
            UP: 38,
            DOWN: 40,
            ENTER: 13,
            SPACE: 32,
            TAB: 9,
            LEFT: 37,
            RIGHT: 39,
            DELETE: 46,
            BACKSPACE: 8,
            SEMICOLON: $.browser.mozilla || $.browser.opera ? 59 : 186,
            COMMA: 188,
            LEFTSLASH: 191,
            Esc: 27
        }
    }, n.Event.GlobalEventManager = t.Model.extend({
        initialize: function (t) {
            var n = this;
            t = t || {};
            var r = t.window || window;
            e(r.document).bind("click", function (e) {
                n.triggerEvent("click", {window: r, event: e})
            }).bind("mousemove", function (e) {
                n.triggerEvent("mousemove", {window: r, event: e})
            }).bind("mouseup", function (e) {
                n.triggerEvent("mouseup", {window: r, event: e})
            }).bind("keydown", function (e) {
                n.triggerEvent("keydown", {window: r, event: e})
            }).bind("keyup", function (e) {
                n.triggerEvent("keyup", {window: r, event: e})
            })
        }, triggerEvent: function (e, t) {
            try {
                var n = this.getTopManager();
                n.trigger(e, t)
            } catch (r) {
            }
        }, getTopManager: function () {
            var e = this, t = this.get("window") || window;
            try {
                for (var n = 0; 255 > n; n++)if (t.parent) {
                    if (t.$GlobalEvent && (e = t.$GlobalEvent), t == t.top)break;
                    t = t.parent
                }
            } catch (r) {
            }
            return e
        }, on: function (e, n, r) {
            var i = this.getTopManager();
            if (this !== i)return i.on.apply(i, arguments);
            if (r !== !1)var o = function () {
                try {
                    n.apply(this, arguments)
                } catch (e) {
                }
            }; else o = n;
            return t.Model.prototype.on.apply(this, [e, o]), o
        }, off: function (e, n) {
            var r = this.getTopManager();
            return this !== r ? r.off.apply(r, arguments) : t.Model.prototype.off.apply(this, arguments)
        }
    }), window.$Event = n.Event, window.$GlobalEvent = n.Event.GlobalEvent = new n.Event.GlobalEventManager
}(jQuery, Backbone, M139),
function (e, t) {
    function n(e) {
        var t = {}.toString.call(e);
        return "[object Array]" == t
    }

    if (t.Logger = e.Model.extend({
            initialize: function (e) {
                e && e.name || this.set("name", "unknown")
            }, debug: function (e) {
                top.SiteConfig.isDev && top.console && arguments.length > 0 && (top.console.debug ? "[object Function]" === Object.prototype.toString.call(top.console.debug) ? (top.console.debug("[DEBUG][" + this.get("name") + "]"), top.console.debug.apply(top.console, arguments)) : top.console.debug("[DEBUG][" + this.get("name") + "]" + e) : top.console.log("[DEBUG][" + this.get("name") + "]" + e))
            }, info: function (e, n) {
                var r = "[INFO][" + this.get("name") + "]";
                r += "[" + e + "]", top.console && arguments.length > 0 && (top.console.info ? top.console.info.apply ? (top.console.info(r), top.console.info.apply(top.console, arguments)) : top.console.info(r) : top.console.log(r)), n && t.Logger.sendClientLog({
                    Level: "INFO",
                    Name: "Logger-" + this.get("name"),
                    errorMsg: e
                })
            }, error: function (e) {
                var n = "[ERROR][" + this.get("name") + "]";
                top.console && arguments.length > 0 && top.console.error && ("[object Function]" === Object.prototype.toString.call(top.console.error) ? (top.console.error(n), top.console.error.apply(top.console, arguments), top.console.trace && top.console.trace()) : top.console.error(n + e)), t.Logger.sendClientLog({
                    Level: "ERROR",
                    Name: "Logger-" + this.get("name"),
                    errorMsg: e
                })
            }, _timeMap: {}, timeStart: function (e) {
                e && (this._timeMap[e] = new Date)
            }, timeEnd: function (e) {
                if (this._timeMap[e]) {
                    var n = $Date.format("yyyy-MM-dd hh:mm:ss", this._timeMap[e]), r = new Date - this._timeMap[e];
                    if (r > 5e4)return;
                    setTimeout(function () {
                        t.Logger.sendClientLog({
                            Level: "INFO",
                            Name: "Logger-profile",
                            Url: e,
                            BeginTime: n,
                            RequestTime: r.toString()
                        })
                    }, 200)
                }
            }, fatal: function (e) {
                var n = "[FATAL][" + this.get("name") + "]";
                top.console && arguments.length > 0 && top.console.warn && (top.console.warn.apply ? (top.console.warn(n), top.console.warn.apply(top.console, arguments)) : top.console.warn(n + e)), t.Logger.sendClientLog({
                    Level: "FATAL",
                    Name: "Logger-" + this.get("name"),
                    errorMsg: e
                })
            }, log: function (e, t) {
                top.console && arguments.length > 0 && top.console.log && (top.console.log.apply ? (top.console.log("[" + this.get("name") + "][" + e + "]"), top.console.log.apply(top.console, arguments)) : top.console.log("[" + this.get("name") + "][" + e + "]" + t))
            }, getThrow: function (e) {
                return this.get("name") + ":" + e
            }, _report_: function (e) {
                console.log("_report_ has remove")
            }
        }), jQuery.extend(t.Logger, {
            getDefaultLogger: function () {
                return this.defaultLogger || (this.defaultLogger = new t.Logger({name: "default"})), this.defaultLogger
            }, logBehavior: function (e) {
                if (window != window.top)return top.M139.Logger.logBehavior(e);
                if (!e)return void console.error("M139.Logger.logBehavior()行为日志上报，参数为空");
                try {
                    t.Logger.getDefaultLogger().debug("[上报日志]" + JSON.stringify(e))
                } catch (n) {
                }
                "string" == typeof e && (e = {key: e});
                var r = {};
                e.key ? r.key = e.key : r.pageId = 24, e.actionId && (r.action = String(e.actionId)), e.thingId && (r.thingId = String(e.thingId)), e.moduleId && (r.module = String(e.moduleId)), e.actionType && (r.actionType = String(e.actionType)), e.pageId && (r.pageId = String(e.pageId)), e.ext3 && (r.ext3 = String(e.ext3)), this.waitList.push(r), this.behaviorTimer || this.startWatchSend()
            }, behaviorClick: function (e) {
                function n() {
                    var t, n, r = e, i = "";
                    try {
                        for (; r;) {
                            if (r.getAttribute("thingid") && !r.getAttribute("behavior")) {
                                var o = r.getAttribute("thingid");
                                if (/^\d+$/.test(o))return void top.M139.Logger.logBehavior({
                                    actionId: 8e3,
                                    thingId: o,
                                    moduleId: 0,
                                    pageId: i
                                })
                            }
                            if (t = r.getAttribute("behavior"), n = r.getAttribute("ext"), t)break;
                            var a = r.getAttribute("tj_actionid");
                            if (a && /^\d+$/.test(a)) {
                                var s = r.getAttribute("tj_thingid"), l = r.getAttribute("tj_moduleid");
                                return void top.M139.Logger.logBehavior({
                                    actionId: tj_actionid,
                                    thingId: s,
                                    moduleId: l,
                                    pageId: i
                                })
                            }
                            if (r = r.parentNode, null == r || "#document" === r.nodeName)break
                        }
                    } catch (c) {
                    }
                }

                for (var r, i, o, a, s = e; s && (s.getAttribute && (r = s.getAttribute("bh") || s.getAttribute("behavior"), o = s.getAttribute("action"), i = s.getAttribute("thing"), a = s.getAttribute("ext3")), !r && !o);)s = s.parentNode;
                r || o ? t.Logger.logBehavior({key: r, actionId: o, thingId: i, ext3: a}) : n()
            }, waitList: [], startWatchSend: function () {
                var e = this, n = "";
                if (top.sid)n = top.sid; else if (top.$App && "function" == typeof top.$App.getSid)n = top.$App.getSid(); else {
                    if (!t.Text.Url.getQueryObj().sid)return;
                    n = t.Text.Url.getQueryObj().sid
                }
                var r = t.Text.Url.makeUrl(top.SiteConfig.behaviorLog, {sid: n});
                this.behaviorTimer = setInterval(function () {
                    var n = e.waitList.concat();
                    if (!(window.simpleMode && window.simpleMode() || 0 == n.length)) {
                        e.waitList.length = 0;
                        try {
                            t.Logger.getDefaultLogger().debug("开始发送行为日志：" + JSON.stringify(e.waitList))
                        } catch (i) {
                        }
                        t.RichMail.API.call(r, {version: "m2012", behaviors: n}, function (e) {
                            try {
                                t.Logger.getDefaultLogger().debug(JSON.stringify(e.responseData))
                            } catch (n) {
                            }
                        })
                    }
                }, 2e3)
            }, clientLogSendCount: 0, clientLogSendMax: 50, sendClientLog: function (e) {
                if (e && !(this.clientLogSendCount > this.clientLogSendMax)) {
                    e.Name || (e.Name = "NONE"), e.Level || (e.Level = "ERROR");
                    var n = {};
                    for (var r in e) {
                        var i = String(e[r]);
                        i.indexOf("\n") > -1 && (i = i.replace(/\</g, "(").replace(/\>/g, ")").replace(/(\r|\n)/g, "|")), n[r] = i
                    }
                    try {
                        var o = top.sid || top.$App.getSid()
                    } catch (a) {
                    }
                    var s = t.Text.Url.makeUrl(top.SiteConfig.scriptLog, {sid: o});
                    if (this.clientLogSendCount++, !window.simpleMode || !window.simpleMode()) {
                        var l = new t.HttpClient;
                        l.request({
                            method: "post",
                            timeout: 1e4,
                            url: s,
                            isSendClientLog: !1,
                            data: t.Text.Xml.obj2xml({version: "m2012", messages: [n]}),
                            headers: {"Content-Type": "application/xml"}
                        })
                    }
                }
            }
        }), window.onerror = function (e, n, r, i, o) {
            if ("string" == typeof e) {
                var a = "";
                if (o && o.stack)a = o.stack.toString(); else {
                    var s = [], l = arguments.callee.caller;
                    if (null != l) {
                        for (var c = /function (\w*\([^(]*\))/, u = 255; u > -1; u--) {
                            var d = l.toString(), p = d.match(c);
                            if (s.push(p && p[1] || d),
                                    l = l.caller, !l)break
                        }
                        a = t.Text.Utils.getTextOverFlow(s.join(""), 200, !0)
                    }
                }
                t.Logger.sendClientLog({Level: "ERROR", Name: "SCRIPTERROR", file: n, errorMsg: e, lines: r, stack: a})
            }
        }, window == window.top && t.Event.GlobalEvent.on("click", function (e) {
            var n = e.event, r = n.target;
            t.Logger.behaviorClick(r)
        }), window.BH = function (e) {
            return t.Logger.logBehavior(e)
        }, window.sendUData = function (e, r) {
            r && t.Timing.waitForReady("window._udata && window._udata.sendEvent", function () {
                var t = r.toString();
                n(r) && (t = r.join("@@")), window._udata.sendEvent(e, t)
            })
        }, window.addBehavior) {
        var r = window.addBehavior, i = t.Logger.getDefaultLogger();
        window.addBehavior = function (e) {
            r(e), i.info("调用了旧版的addBehavior：" + e)
        }
    }
}(Backbone, M139),
function (e, t, n) {
    n.Model = {};
    var r = Backbone.Model;
    n.Model.ModelBase = r.extend({
        initialize: function (e) {
            var r = this.name || this.get("name");
            if (this.logger = new n.Logger({name: r || "ModelBase"}), null == r)throw"继承自ModelBase的类型缺少name属性";
            if (e && !t.isObject(e))throw"继承自ModelBase的类型初始化参数必须为Object类型"
        }, trigger: function (e, i) {
            if ("undefined" == typeof i && (i = {}), !t.isObject(i))throw this.get("name") + ".trigger(" + e + ")方法必须使用Object数据参数";
            try {
                return r.prototype.trigger.apply(this, arguments)
            } catch (o) {
                console.error("trigger异常", o.toString()), i.callback && i.callback();
                var a = o.toString();
                o.stack && (a = o.stack.toString()), n.Logger.sendClientLog({
                    level: "ERROR",
                    name: "TriggerError",
                    errorMsg: a
                })
            }
        }
    })
}(jQuery, _, M139),
function (e) {
    e.HttpClient = Backbone.Model.extend({
        initialize: function (t) {
            this.logger = new e.Logger({name: this.get("name")}), this.on("beforerequest", this.onBeforeRequest)
        }, defaults: {name: "M139.HttpClient"}, request: function (t, n) {
            this.requestOptions = t;
            var r = this;
            if (this.xhr)throw this.logger.getThrow("一个HTTPClient实例只能执行一次request操作");
            if (this.trigger("beforerequest", t, n), t.cancel)return t.async === !1 ? t.responseResult : this;
            var i = this.xhr = this.utilCreateXHR(t);
            t.timeout && (this.timeoutTimer = setTimeout(function () {
                3 == i.readyState && 200 == i.status || (i.abort(), r.onTimeout())
            }, t.timeout)), n && this.on("response", n), i.onreadystatechange = function (n) {
                if (t.async !== !1 && 4 == i.readyState && 0 != i.status) {
                    clearTimeout(r.timeoutTimer), clearTimeout(r.sendTimer);
                    var o = i.status;
                    if (1223 === o && window.ActiveXObject && (o = 204), 304 == o || o >= 200 && 300 > o) {
                        var a = r.utilGetHttpHeaders(i);
                        if (a && a.Date) {
                            var s = new Date(a.Date);
                            e._ServerTime_ = s, e._ClientDiffTime_ = new Date - s
                        }
                        r.onResponse({
                            responseText: i.responseText, status: o, getHeaders: function () {
                                return r.utilGetHttpHeaders(i)
                            }
                        })
                    } else {
                        r.onError({status: o, responseText: i.responseText});
                        try {
                            top.$App && top.$App.trigger("httperror", {status: o})
                        } catch (l) {
                        }
                    }
                }
            }, t.url = e.Text.Url.makeUrl(t.url, {cguid: this.getCGUID()});
            var o = t.method || "get", a = t.data;
            if ("object" == typeof a) {
                a = [];
                for (var s in t.data)a.push(s + "=" + encodeURIComponent(t.data[s]));
                a = a.join("&"), t.headers || (t.headers = {}), t.headers["Content-Type"] || (t.headers["Content-Type"] = "application/x-www-form-urlencoded")
            }
            return "get" == o.toLowerCase() && "string" == typeof a && "<null />" != a && (t.url += "&" + a, a = ""), i.open(o, t.url, t.async !== !1), this.utilSetHttpHeaders(t.headers, i), this.sendTimer = setTimeout(function () {
                if (t.isSendClientLog !== !1) {
                    e.Logger.sendClientLog({
                        level: "ERROR",
                        name: "HttpClient",
                        errorMsg: "LongTimeNoResponse",
                        url: r.requestOptions.url
                    }), e.UI.TipMessage.showSwitch(t.url);
                    try {
                        top.$App && top.$App.trigger("httperror", {isTimeout: !0})
                    } catch (n) {
                    }
                }
            }, 1e4), t.async === !1 ? (i.send(a), clearTimeout(r.timeoutTimer), clearTimeout(r.sendTimer), 304 == i.status || i.status >= 200 && i.status < 300 ? r.onResponse({
                responseText: i.responseText,
                status: i.status,
                getHeaders: function () {
                    return r.utilGetHttpHeaders(i)
                }
            }) : r.onError({status: i.status, responseText: i.responseText})) : (i.send(a), this)
        }, getCGUID: function () {
            function e(e, t) {
                var n = (t || 2) - (1 + Math.floor(Math.log(1 | e) / Math.LN10 + 1e-15));
                return new Array(n + 1).join("0") + e
            }

            var t = new Date;
            return "" + e(t.getHours()) + e(t.getMinutes()) + e(t.getSeconds()) + e(t.getMilliseconds(), 3) + e(Math.ceil(9999 * Math.random()), 4)
        }, abort: function (e) {
            return this.timeoutTimer && clearTimeout(this.timeoutTimer), this.xhr.abort(), this.onAbort(), this
        }, utilCreateXHR: function (e) {
            var t = e && e.window || window;
            if (t.XMLHttpRequest)return new t.XMLHttpRequest;
            for (var n = ["MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "Microsoft.XMLHTTP"], r = 0; r < n.length; r++)try {
                return new t.ActiveXObject(n[r])
            } catch (i) {
            }
        }, utilSetHttpHeaders: function (e, t) {
            if (e)for (var n in e)t.setRequestHeader(n, e[n])
        }, utilGetHttpHeaders: function (e) {
            var t = e.getAllResponseHeaders(), n = {};
            if (t) {
                t = t.split(/\r?\n/);
                for (var r = 0; r < t.length; r++) {
                    var i = t[r], o = i.split(": "), a = o[0].replace(/^\w|-\w/g, function (e) {
                        return e.toUpperCase()
                    });
                    a && o[1] && (n[a] = o[1])
                }
            }
            return n
        }, onAbort: function () {
            this.trigger("abort")
        }, onResponse: function (e) {
            return this.trigger("response", e), e
        }, onError: function (t) {
            this.requestOptions.isSendClientLog !== !1 && e.Logger.sendClientLog({
                level: "ERROR",
                name: "HttpClient",
                url: this.requestOptions.url,
                status: t.status,
                responseText: t.responseText
            }), this.trigger("error", t)
        }, onTimeout: function () {
            this.trigger("timeout")
        }, onBeforeRequest: function (t, n) {
            if ("10086.cn" == document.domain && !t.hasRouted) {
                var r = this, i = e.HttpRouter.getProxy(t.url);
                i && (t.responseResult = e.HttpRouter.proxyReady(window.location.protocol + "//" + i.host + "/" + i.proxy, function (o) {
                    return t.url = i.url, t.window = o, t.cancel = !1, t.hasRouted = !0, e.HttpClient.prototype.request.call(r, t, n)
                }), t.cancel = !0)
            }
        }
    })
}(M139),
function (e, t) {
    var n = e;
    t.Dom = {
        isHide: function (e, t) {
            var n = !1;
            if (e)if (t)for (; e;) {
                if (e.style && "none" == e.style.display) {
                    n = !0;
                    break
                }
                e = e.parentNode
            } else n = "none" == e.style.display;
            return n
        },
        flashChecker: function () {
            var e = 0, t = 0;
            if (document.all) {
                try {
                    var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch (r) {
                    return console.error(r), {hasFlash: !1}
                }
                n && (e = 1, VSwf = n.GetVariable("$version"), t = parseInt(VSwf.split(" ")[1].split(",")[0]))
            } else if (navigator.plugins && navigator.plugins.length > 0) {
                var n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    e = 1;
                    for (var i = n.description.split(" "), o = 0; o < i.length; ++o)isNaN(parseInt(i[o])) || (t = parseInt(i[o]))
                }
            }
            return {hasFlash: e, version: t}
        },
        inBounds: function (e, t) {
            if (e.top && e.left)var r = e; else var r = n(e).position();
            return r.left >= t.left && r.top >= t.top && r.left <= t.right && r.top <= t.bottom
        },
        containElement: function (t, n) {
            return e.contains(t, n)
        },
        findParent: function (e, t) {
            for (t = t.toUpperCase(); e;) {
                if (e.tagName == t)return e;
                e = e.parentNode
            }
            return null
        },
        isRemove: function (e) {
            try {
                for (; e;) {
                    if ("BODY" == e.tagName)return !1;
                    e = e.parentNode
                }
            } catch (t) {
                return !0
            }
            return !0
        },
        selectTextBox: function (e, t) {
            t = t || {};
            var n = void 0 === t.pointerAt ? 2 : t.pointerAt;
            try {
                if (2 == n)if (document.all) {
                    var r = e.createTextRange();
                    r.moveStart("character", e.value.length), r.collapse(!0), r.select()
                } else e.setSelectionRange(e.value.length, e.value.length), e.focus(); else 1 == n ? e.select() : e.focus()
            } catch (i) {
            }
        },
        ZINDEX: 5e3,
        getNextZIndex: function () {
            return this.ZINDEX += 10
        },
        preloadImages: function (e) {
        },
        hitTest: function (e, t) {
            function r(e, t) {
                return e.left >= t.left && e.top >= t.top && e.left <= t.left + t.width && e.top <= t.top + t.height
            }

            var i = n(e).offset();
            i.width = e.offsetWidth, i.height = e.offsetHeight;
            var o = n(t).offset();
            return o.width = t.offsetWidth, o.height = t.offsetHeight, !!(r({
                left: i.left,
                top: i.top
            }, o) || r({left: i.left + i.width, top: i.top}, o) || r({
                left: i.left,
                top: i.top + i.height
            }, o) || r({left: i.left + i.width, top: i.top + i.height}, o) || r({
                left: o.left,
                top: o.top
            }, i) || r({left: o.left + o.width, top: o.top}, i) || r({
                left: o.left,
                top: o.top + o.height
            }, i) || r({left: o.left + o.width, top: o.top + o.height}, i))
        },
        setDragAble: function (e, r) {
            function i(t) {
                var n, i;
                if (window.event ? (n = event.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft), i = event.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) : (n = t.pageX, i = t.pageY), r.bounds) {
                    var o = {
                        left: r.bounds[0],
                        top: r.bounds[1],
                        right: r.bounds[2],
                        bottom: r.bounds[3]
                    }, a = $D.inBounds({left: n, top: i}, o);
                    if (!a)return
                }
                var c = n - f[0], u = i - f[1];
                0 > c ? c = 0 : r.isHitTest && c > s() && (c = s()), 0 > u ? u = 0 : r.isHitTest && u > l() && (u = l()), r.orignOffset && (c += r.orignOffset.x, u += r.orignOffset.y), e.style.position = "absolute", r.lockX || (e.style.left = c + "px"), r.lockY || (e.style.top = u + "px"), r.onDragMove && r.onDragMove({
                    x: n,
                    y: i,
                    target: t.target
                })
            }

            function o(e) {
                g.startDrag(e)
            }

            function a(e) {
                g.stopDrag(e)
            }

            function s() {
                return d || (d = n(document.body).width() - h.width()), d
            }

            function l() {
                return p || (p = n(document.body).height() - h.height()), p
            }

            r = r || {}, r = n.extend({isHitTest: !0}, r);
            var c = r.handleElement;
            if (c)if ("string" == typeof c)var u = n(e).find(c); else if ("object" == typeof c)var u = this.isJQueryObj(c) ? c : n(c);
            e.orignX = 0, e.orignY = 0;
            var d, p, h = n(e), g = e, f = [];
            u ? u.mousedown(function (e) {
                o(e)
            }) : e.onmousedown = o, e.startDrag = function (o) {
                var s, l;
                o = t.Event.getEvent(), window.event ? (s = event.clientX + document.body.scrollLeft, l = event.clientY + document.body.scrollTop) : (s = o.pageX, l = o.pageY);
                var c = n(e).position();
                f = c.left <= 0 ? [0, 0] : [s - c.left, l - c.top];
                var u = !0;
                r.onDragStart && (startResult = r.onDragStart({
                    x: s,
                    y: l,
                    target: o.target || o.srcElement
                }), 0 == startResult && (u = !1)), u && (e.setCapture ? e.setCapture() : window.captureEvents && window.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP), n(document).bind("mousemove", i), $GlobalEvent.on("mouseup", function (e) {
                    a(e)
                }), t.Event.stopEvent(o))
            }, e.stopDrag = function () {
                e.releaseCapture ? e.releaseCapture() : window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP), r.onDragEnd && r.onDragEnd(), $GlobalEvent.off("mouseup"), n(document).unbind("mousemove", i).unbind("mouseup", a)
            }
        },
        getCurrentCSS: function (e, t) {
            return e.currentStyle ? e.currentStyle[t.replace(/-[a-z]/, function (e) {
                return e.replace("-", "").toUpperCase()
            })] : e.ownerDocument.defaultView.getComputedStyle(e, "").getPropertyValue(t)
        },
        bindAutoHide: function (e) {
            if (!e.element)return void console.log("M139.Dom.bindAutoHide(),缺少element参数");
            var r = e.action || "click", i = new Date;
            "click" == r && "1" != n(e.element).attr("bindAutoHide") && (t.Dom.unBindAutoHide(e), n(e.element).attr("bindAutoHide", "1"), setTimeout(function () {
                var r = t.Event.GlobalEvent;
                top.M139 && (r = top.M139.Event.GlobalEvent), e.element.autoHideHandler = r.on("click", function (o) {
                    try {
                        if (e.stopEvent) {
                            var a = o.event.target;
                            if (e.element === a || t.Dom.containElement(e.element, a))return
                        }
                        if (new Date <= i)return;
                        n.isFunction(e.callback) && (e.callback(o), e.callback = null), r.off("click", arguments.callee)
                    } catch (s) {
                    }
                }, !1)
            }, 0))
        },
        getElementHeight: function (e) {
            var t = n(e), r = parseInt(t.css("padding-top")) || 0, i = parseInt(t.css("padding-bottom")) || 0;
            return t.height() + r + i
        },
        unBindAutoHide: function (e) {
            e.element && (n(e.element).attr("bindAutoHide", "0"), e.element.autoHideHandler && (t.Event.GlobalEvent.off(e.action, e.element.autoHideHandler), e.element.autoHideHandler = null))
        },
        getQuadrant: function (e) {
            var t, r = window;
            "left" in e ? t = e : (t = n(e).offset(), r = n(e)[0].ownerDocument);
            var i = n(r).width(), o = n(r).height(), a = {left: i / 2, top: o / 2};
            return t.left <= a.left && t.top <= a.top ? 2 : t.left >= a.left && t.top <= a.top ? 1 : t.left <= a.left && t.top >= a.top ? 3 : t.left >= a.left && t.top >= a.top ? 4 : void 0
        },
        dockElement: function (e, r, i) {
            function o(o) {
                var a = n(e), s = n(r), l = a.offset(), c = i.margin || 0, u = l.left, d = l.top, l = {
                    up: l.top - t.Dom.getElementHeight(s) - c,
                    down: l.top + a.height() + c,
                    left: l.left - s.width() - c,
                    right: l.left + a.width() + c
                };
                switch (o) {
                    case"up":
                        d = l.up;
                        break;
                    case"down":
                        d = l.down;
                        break;
                    case"left":
                        u = l.left;
                        break;
                    case"right":
                        u = l.right;
                        break;
                    case"leftUp":
                        u = l.left, d = l.up;
                        break;
                    case"leftDown":
                        u = l.left, d = l.down;
                        break;
                    case"rightUp":
                        u = l.right, d = l.up;
                        break;
                    case"rightDown":
                        u = l.right, d = l.down
                }
                u += 0 | i.dx, d += 0 | i.dy;
                var p = s.offsetParent().offset();
                u -= p.left, d -= p.top, s.css({position: "absolute", left: u + "px", top: d + "px"})
            }

            i = i || {};
            var a, s = {
                1: {auto: "leftDown", leftRight: "left", upDown: "down"},
                2: {auto: "rightDown", leftRight: "right", upDown: "down"},
                3: {auto: "rightUp", leftRight: "right", upDown: "up"},
                4: {auto: "leftUp", leftRight: "left", upDown: "up"}
            };
            if (i.direction || (i.direction = "upDown"), "auto" == i.direction || "leftRight" == i.direction || "upDown" == i.direction)var a = s[this.getQuadrant(e)][i.direction]; else a = i.direction;
            if ("addr" == i.sourceType) {
                var l = n(r), c = n(e), u = t.Dom.getElementHeight(l), d = window;
                d = n(e)[0].ownerDocument;
                var p = n(d).height() - c.offset().top - c.height();
                a = p >= u ? "down" : "up"
            }
            return o(a), a
        },
        setTextNode: function (e, t) {
            e = this.isHTMLElement(e) ? e : e[0];
            for (var n = 0; n < e.childNodes.length; n++)if (3 == e.childNodes[n].nodeType) {
                e.childNodes[n].nodeValue = t;
                break
            }
        },
        isHTMLElement: function (e) {
            return Boolean(e && e.getAttribute)
        },
        flashElement: function (e, t) {
            var r = "#FE9", i = 3;
            t && t.color && (r = t.color), t && t.flashCount && (i = t.flashCount);
            var o = n(e);
            /INPUT|TEXTAREA/.test(o[0].tagName) || (o = o.find("*").add(o));
            var a = 0, s = setInterval(function () {
                a++, a % 2 == 1 ? o.css("background-color", r) : o.css("background-color", ""), a > 2 * i - 1 && clearInterval(s)
            }, 200)
        },
        focusTextBox: function (e) {
            try {
                if (document.all) {
                    var t = e.createTextRange();
                    t.moveStart("character", e.value.length), t.collapse(!0), t.select()
                } else e.setSelectionRange(e.value.length, e.value.length), e.focus()
            } catch (n) {
            }
        },
        fixIEFocus: function (e) {
        },
        rebuildDom: function (e) {
            try {
                if (this.isJQueryObj(e))e.each(function () {
                    var e = this.cloneNode(!0);
                    n(this).replaceWith(e)
                }); else {
                    var t = e.cloneNode(!0);
                    n(e).replaceWith(t)
                }
            } catch (r) {
            }
        },
        isJQueryObj: function (t) {
            return Boolean(t instanceof e || t && t.jquery)
        },
        setTextBoxMaxLength: function (e, r) {
            var i = n(e);
            try {
            } catch (o) {
            }
            var a = t.Event.KEYCODE, s = [a.BACKSPACE, a.DELETE, a.UP, a.DOWN, a.LEFT, a.RIGHT];
            $B.is.ie && $B.getVersion() <= 9 && i.keydown(function (e) {
                return this.value.length >= r && -1 == _.indexOf(s, e.keyCode) ? !1 : void 0
            }).bind("paste", function () {
                return this.value.length >= r ? !1 : void 0
            })
        },
        appendHTML: function (e, t) {
            e.insertAdjacentHTML ? e.insertAdjacentHTML("beforeEnd", t) : n(e).append(t)
        },
        getHTMLElement: function (e) {
            return "string" == typeof e ? n(e)[0] : this.isJQueryObj(e) ? e[0] : e
        },
        _getGhostDiv: function () {
            var e = this;
            if (!this._ghostDiv) {
                var t = "<div style='position:absolute;width:100%;height:100%;left:0px;top:0px;visibility: hidden;'></div>";
                this.appendHTML(document.body, t);
                this._ghostDiv = document.body.lastChild;
                n(window).resize(function () {
                    delete e.cacheHeight, delete e.cacheWidth
                })
            }
            return this._ghostDiv
        },
        getWinHeight: function () {
            if (window.innerHeightCache)return window.innerHeightCache;
            var e = window.innerHeight || document.documentElement.clientHeight;
            return window.innerHeightCache = e, e
        },
        getWinWidth: function () {
            if (window.innerWidthCache)return window.innerWidthCache;
            var e = window.innerWidth || document.documentElement.clientWidth;
            return window.innerWidthCache = e, e
        },
        storage: {
            save: function (e, t) {
                if (!$B.support.storage())return !1;
                try {
                    return localStorage.setItem(e, t)
                } catch (n) {
                    return !1
                }
            }, exists: function (e) {
                if (!$B.support.storage())return !1;
                for (var t = 0; t < localStorage.length; t++)if (localStorage.key(t) == e)return !0;
                return !1
            }, remove: function (e) {
                return $B.support.storage() ? this.exists(e) ? localStorage.removeItem(e) : !0 : !1
            }
        },
        setTextAreaAdaptive: function (e, t) {
            function r() {
                var n, r, i, a = e.height(), s = o.height();
                n = parseInt(o.css("padding-top"), 10) + c ? parseInt(o.css("padding-bottom"), 10) : 0 + (parseInt(o.css("line-height"), 10) || parseInt(o.css("font-size"), 10)), a !== s && s > u && e.height(Math.max(s, n)), u > s && e.height(u), t.maxrows && (r = Math.floor(o.height() / n), r > t.maxrows && (i = t.maxrows * n, o.css({
                    height: i,
                    "overflow-y": "auto"
                }), e.css({height: i, "overflow-y": "auto"}), e.scrollTop(i), setTimeout(function () {
                    e.height(i)
                }, 15)))
            }

            if (e) {
                var i, o, a, s = this, l = s.mimics, c = !!n.browser.msie;
                t = t || {}, a = t.maxlength || e.attr("maxlength") || Number.MAX_VALUE;
                var u = t.defaultheight || 0;
                i = n("<div />").css({
                    position: "absolute",
                    display: "none",
                    "word-wrap": "break-word",
                    "white-space": "pre-wrap"
                }), e.css({"overflow-y": "hidden", "overflow-x": "hidden", resize: "none"}), o = i.appendTo(e.parent());
                for (var d = l.length; d--;)o.css(l[d].toString(), e.css(l[d].toString()));
                u && (e.css("height", u), u = parseInt(u, 10) || 0), e.bind("input keydown cut paste change blur", function (t) {
                    if (!(_.indexOf([16, 17, 18, 20], t.keyCode) >= 0)) {
                        var n = e.val();
                        if (n.length >= a)return t.stopPropagation(), !1;
                        if ("paste" == t.type && c)return void setTimeout(function () {
                            e.trigger("input")
                        }, 15);
                        var i = $T.Html.encode(n).replace(/\r/g, "<br />").replace(/\n/g, "<br />");
                        o.html(i), r()
                    }
                }), t.placeholder && s.setPlaceholder(e, {
                    placeholder: t.placeholder,
                    defaultcolor: t.defaultcolor
                }), setTimeout(function () {
                    e.trigger("change")
                }, 250)
            }
        },
        mimics: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontSize", "lineHeight", "fontFamily", "width", "fontWeight", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "borderTopStyle", "borderTopColor", "borderRightStyle", "borderRightColor", "borderBottomStyle", "borderBottomColor", "borderLeftStyle", "borderLeftColor"],
        setPlaceholder: function (e, t) {
            var r = this;
            if (e)if (e = e.length > 0 ? e : n(e), r.isSupportPlaceholder())e.attr("placeholder", t.placeholder), e.css({color: t.defaultcolor}); else {
                var i = t.placeholder, o = t.color || "#ababab", a = t.defaultcolor || e.css("color");
                if (!i)return;
                e.bind("focus", function () {
                    var t = e.val();
                    n(this).data("placeholder") && t === i && e.val("").css("color", a)
                }).bind("blur", function () {
                    var t = e.val();
                    0 === t.length ? (e.val(i).css("color", o), e.data("placeholder", !0)) : e.data("placeholder", !1)
                }), setTimeout(function () {
                    e.trigger("blur")
                }, 255)
            }
        },
        isSupportPlaceholder: function () {
            return "placeholder" in document.createElement("input")
        }
    }, window.$D = t.Dom
}(jQuery, M139),
function (jQuery, M139) {
    function f(e) {
        return 10 > e ? "0" + e : e
    }

    function tojson(e) {
        return this.valueOf()
    }

    function quote(e) {
        return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
            var t = meta[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }

    function str(e, t) {
        var n, r, i, o, a, s = gap, l = t[e];
        switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(e)), "function" == typeof rep && (l = rep.call(t, e, l)), typeof l) {
            case"string":
                return quote(l);
            case"number":
                return isFinite(l) ? String(l) : "null";
            case"boolean":
            case"null":
                return String(l);
            case"object":
                if (!l)return "null";
                if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(l)) {
                    for (o = l.length, n = 0; o > n; n += 1)a[n] = str(n, l) || "null";
                    return i = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + s + "]" : "[" + a.join(",") + "]", gap = s, i
                }
                if (rep && "object" == typeof rep)for (o = rep.length, n = 0; o > n; n += 1)r = rep[n], "string" == typeof r && (i = str(r, l), i && a.push(quote(r) + (gap ? ": " : ":") + i)); else for (r in l)Object.hasOwnProperty.call(l, r) && (i = str(r, l), i && a.push(quote(r) + (gap ? ": " : ":") + i));
                return i = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + s + "}" : "{" + a.join(",") + "}", gap = s, i
        }
        return i
    }

    M139.JSON = {
        parse: function (e) {
            try {
                return jQuery.parseJSON(e)
            } catch (t) {
                throw"M139.JSON.parse Error"
            }
        }, tryEval: function (text) {
            var obj = null;
            try {
                /^\s*\{/.test(text) && (text = "(" + text + ")"), obj = eval(text)
            } catch (e) {
            }
            return obj
        }, stringify: function (e, t, n) {
            var r;
            if (gap = "", indent = "", "number" == typeof n)for (r = 0; n > r; r += 1)indent += " "; else"string" == typeof n && (indent = n);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))throw"M139.JSON.stringify Error";
            return str("", {"": e})
        }
    }, "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, Boolean.prototype.toJSON = tojson, String.prototype.toJSON = tojson, Number.prototype.toJSON = tojson);
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    window.JSON || (JSON = {
        parse: function (e) {
            return M139.JSON.tryEval(e)
        }, stringify: function (e) {
            return M139.JSON.stringify(e)
        }
    })
}(jQuery, M139),
function (e) {
    e.Date = {
        parse: function (e) {
            if (/^\d{10}$/.test(e))return new Date(1e3 * e);
            if (/^\d{13}$/.test(e))return new Date(1 * e);
            var t = /^(\d{4})-(\d{1,2})-(\d{1,2})(\W+(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/, n = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(\W+(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/, r = /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-8]|3[0-1])$/, i = e.match(t) || e.match(n) || e.match(r);
            if (i) {
                var o = parseInt(i[1], 10), a = parseInt(i[2] - 1, 10), s = parseInt(i[3], 10);
                if (void 0 == i[5] || "" == i[5])return new Date(o, a, s);
                var l = parseInt(i[5], 10), c = i[6] ? parseInt(i[6], 10) : 0, u = i[8] ? parseInt(i[8], 10) : 0;
                return new Date(o, a, s, l, c, u)
            }
            return null
        }, format: function (e, t) {
            var n = /yyyy|yy|M+|d+|h+|m+|s+|q+|S|w/g;
            return e = e.replace(n, function (e) {
                var n;
                switch (e) {
                    case"yyyy":
                        n = t.getFullYear();
                        break;
                    case"yy":
                        n = t.getFullYear().toString().substring(2);
                        break;
                    case"M":
                    case"MM":
                        n = t.getMonth() + 1;
                        break;
                    case"dd":
                    case"d":
                        n = t.getDate();
                        break;
                    case"hh":
                    case"h":
                        n = t.getHours();
                        break;
                    case"mm":
                    case"m":
                        n = t.getMinutes();
                        break;
                    case"ss":
                    case"s":
                        n = t.getSeconds();
                        break;
                    case"q":
                        n = Math.floor((t.getMonth() + 3) / 3);
                        break;
                    case"S":
                        n = t.getMilliseconds();
                        break;
                    case"w":
                        n = "日一二三四五六".charAt(t.getDay());
                        break;
                    default:
                        n = ""
                }
                return 2 == e.length && 1 == n.toString().length && (n = "0" + n), n
            })
        }, getDaysPass: function (e, t) {
            var n = t.getTime() - e.getTime(), r = Math.round(n / 1e3 / 60 / 60 / 24);
            return 0 != r && 1 != r || (r = e.getDate() == t.getDate() ? 0 : 1), r
        }, diffTime: function (e, t, n) {
            time1 = new Date(e), time2 = new Date(t), time1.setMilliseconds(0), time2.setMilliseconds(0);
            var r = Math.ceil((time1.getTime() - time2.getTime()) / 1e3);
            if (0 > r)return !1;
            if (0 == r)return !0;
            var i = Math.floor(r / 86400), o = Math.floor((r - 24 * i * 3600) / 3600), a = Math.floor((r - 24 * i * 3600 - 3600 * o) / 60), s = Math.floor(r - 24 * i * 3600 - 3600 * o - 60 * a);
            return {
                days: n && i.toString().length < 2 ? "0" + i : i,
                hours: n && o.toString().length < 2 ? "0" + o : o,
                minutes: n && a.toString().length < 2 ? "0" + a : a,
                seconds: n && s.toString().length < 2 ? "0" + s : s
            }
        }, isSameDay: function (e, t) {
            return e.getDate() == t.getDate() && e.getMonth() == t.getMonth() && e.getFullYear() == t.getFullYear()
        }, getServerTime: function () {
            var t = new Date, n = top.M139 && top.M139._ClientDiffTime_ || e._ClientDiffTime_;
            return n ? new Date(t.getTime() - n) : t
        }, isGuideTime: function (e) {
            if (e) {
                var t = this.getServerTime().getTime(), n = new Date(e.begin).getTime(), r = new Date(e.end).getTime();
                return r - t > 0 && t - n > 0
            }
            return !1
        }, getFriendlyString: function (e, t) {
            if (!e)return "";
            "number" == typeof e && (e = new Date(1e3 * e)), t = t || new Date;
            var n, r = t.getTime() - e.getTime();
            if (0 > r)n = this.format("yyyy-M-dd", e); else if (e.getYear() == t.getYear() && e.getMonth() == t.getMonth() && e.getDate() == t.getDate()) {
                var i = Math.round(r / 1e3 / 60);
                n = 0 == i ? "刚刚" : i > 0 && 60 > i ? i + "分钟前" : Math.floor(i / 60) + "小时前"
            } else n = e.getYear() == (new Date).getYear() ? this.format("M-dd(w)", e) : this.format("yyyy-M-dd(w)", e);
            return n
        }, parseValidDateStr: function (e, t, n) {
            var r, i, o, a;
            return void 0 === t && (t = 1970), void 0 === n && (n = 2100), (a = e.match(/^(\d{4})([\.\/-]?)(\d{1,2})\2(\d{1,2})$/)) ? (r = parseInt(a[1], 10), i = parseInt(a[3], 10), o = parseInt(a[4], 10), 0 === o || 0 === i || o > 31 || i > 12 || t > r || r > n ? null : 2 === i && o > 28 + (r % 400 == 0 || r % 4 == 0 && r % 100 != 0) ? null : "46911".indexOf(i) >= 0 && 31 === o ? null : "" == a[2] && 4 != (a[3] + a[4]).length ? null : new Date(r, i - 1, o)) : null
        }, getHelloString: function (e) {
            e = e || new Date;
            var t = e.getHours(), n = {
                0: "凌晨",
                1: "上午",
                2: "中午",
                3: "下午",
                4: "晚上",
                5: "深夜"
            }, r = "555000111112233333344444", i = r.charAt(t);
            return n[i]
        }, getDaysOfMonth: function (e) {
            e || (e = new Date);
            var t = this.isLeapYear(e.getFullYear());
            return [31, t ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e.getMonth()]
        }, isLeapYear: function (e) {
            return e || (e = new Date), e.getFullYear && (e = e.getFullYear()), e % 400 == 0 || e % 4 == 0 && e % 100 != 0
        }, isDateStr: function (e) {
            var t = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/, n = /^(((0[1-9]|[12][0-9]|3[01])\/((0[13578]|1[02]))|((0[1-9]|[12][0-9]|30)\/(0[469]|11))|(0[1-9]|[1][0-9]|2[0-8])\/(02))\/([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3}))|(29\/02\/(([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00)))$/;
            return t.test(e) || n.test(e)
        }, isDatetimeStr: function (e) {
            var t = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\s([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
            return t.test(e)
        }, WEEKDAYS: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], getChineseWeekDay: function (e) {
            return e || (e = new Date), this.WEEKDAYS[e.getDay()]
        }, getFirstWeekDayOfMonth: function (e) {
            return e = e ? new Date(e) : new Date, e.setDate(1), e.getDay()
        }, getWeeksOfMonth: function (e) {
            e || (e = new Date);
            var t = this.getFirstWeekDayOfMonth(e), n = this.getDaysOfMonth(e);
            return Math.ceil((n + (6 - t)) / 7)
        }, getThisMonday: function () {
            var e = new Date;
            return new Date(e.getTime() - 864e5 * (e.getDay() - 1))
        }, getWeekDateByDays: function (e) {
            e || (e = 0);
            var t = this.getThisMonday();
            return new Date(1e3 * (t.getTime() / 1e3 + 86400 * e))
        }, getDateByDays: function (e, t) {
            return e || (e = new Date), new Date(e.getTime() + 864e5 * t)
        }, getTimeObj: function (e) {
            var t = 1e3, n = 60 * t, r = 60 * n, i = 24 * r, o = parseInt(e / i), a = parseInt((e - o * i) / r), s = parseInt((e - o * i - a * r) / n), l = parseInt((e - o * i - a * r - s * n) / t), c = 10 > o ? "0" + o : "" + o, u = 10 > a ? "0" + a : "" + a, d = 10 > s ? "0" + s : "" + s, p = 10 > l ? "0" + l : "" + l, h = {};
            return h.date = c, h.hour = u, h.minute = d, h.second = p, h
        }
    }, Date.prototype.format = function (t) {
        return e.Date.format(t, this)
    }, $Date = e.Date
}(M139),
function (e, t) {
    var n = e, r = navigator.userAgent;
    t.Browser = {
        ua: r,
        _is: {
            ie: /MSIE/,
            edge: /edge/i,
            firefox: /firefox/i,
            chrome: /chrome/i,
            opera: /opera/i,
            safari: /safari/i,
            webkit: /webkit/i,
            gecko: /gecko/i,
            ios: /iPad|iPhone|iPod/,
            mac: /mac/i,
            android: /Android/,
            windowsphone: /Windows Phone/,
            windows: /Windows/,
            phone: /mobile|phone/i,
            pad: /iPad/,
            linux: /Linux/
        },
        support: {
            cssFixed: function () {
                return !$B.is.ie || $B.getVersion() > 6
            }, storage: function () {
                try {
                    return "undefined" != typeof window.localStorage && null !== window.localStorage
                } catch (e) {
                    return !1
                }
            }
        },
        isRealChrome: function () {
            try {
                var e = window.navigator.userAgent.toLowerCase(), t = -1 != e.indexOf("qqbrowser");
                if (t)return !1;
                var n = -1 != e.indexOf("ubrowser");
                if (n)return !1;
                var r = -1 != e.indexOf("chrome");
                return !!(r && chrome && chrome.runtime)
            } catch (i) {
            }
            return !1
        },
        getVersion: function () {
            var e;
            if ($B.is.edge) {
                var t = /edge\D?([\d.]+)/i, i = r.match(t);
                i && (e = parseInt(i[1]))
            } else if ($B.is.chrome) {
                var t = /Chrome\D?([\d.]+)/, i = r.match(t);
                i && (e = parseInt(i[1]))
            } else if ($B.is.safari) {
                var t = /version\D?([\d.]+)/i, i = r.match(t);
                i && (e = parseFloat(i[1]))
            }
            return e || n.browser.version
        },
        uaContains: function (e, t) {
            for (var n = !1, r = 0; r < arguments.length; r++)n = n || $B.ua.indexOf(arguments[r]) > -1;
            return n
        },
        init: function (e) {
            var t = $B.is = {}, n = $B._is, i = e || r;
            for (var o in n)"object" == typeof n[o] && (t[o] = n[o].test(i));
            t.safari = t.safari && !t.chrome, void 0 == window.ActiveXObject && void 0 !== window.ActiveXObject && (t.ie11 = !0)
        }
    }, window.$B = t.Browser, $B.init(), window.console || (console = {
        assert: function () {
        }, count: function () {
        }, debug: function () {
        }, dir: function () {
        }, dirxml: function () {
        }, error: function () {
        }, group: function () {
        }, groupCollapsed: function () {
        }, groupEnd: function () {
        }, info: function () {
        }, log: function () {
        }, markTimeline: function () {
        }, profile: function () {
        }, profileEnd: function () {
        }, time: function () {
        }, timeEnd: function () {
        }, timeStamp: function () {
        }, trace: function () {
        }, warn: function () {
        }
    })
}(jQuery, M139),
function (e, t) {
    var n = e;
    t.ConfigManager = Backbone.Model.extend({
        initialize: function () {
            this._configs = {}
        },
        registerConfig: function (e, t) {
            var r = this;
            if (t instanceof Array) {
                this._configs[e] = t;
            } else {
                n.each(t, function (t, n) {
                    r.setConfig(e, t, n)
                });
                this.trigger("register", { configName: e, configValue: t });
            }
        },
        setConfig: function (e, t, n) {
            var r = this._configs[e];
            r || (r = this._configs[e] = {});
            r[t] = n;
            this.trigger("update", { configName: e, key: t, value: n });
        },
        getConfig: function (e, t) {
        },
        getConfig: function (e, t) {
            return 1 == arguments.length ? this._configs[e] : this._configs[e] && this._configs[e][t]
        },
        showAll: function () {
            try {
                console.log(t.JSON.stringify(this._configs, "", "    "))
            } catch (e) {
            }
        }
    }),
    window.$Config = new t.ConfigManager
}(jQuery, M139),
function (e) {
    var t = e.Text;
    e.ExchangeHttpClient = e.HttpClient.extend({
        initialize: function (t) {
            e.HttpClient.prototype.initialize.apply(this, arguments)
        }, defaults: {name: "M139.ExchangeHttpClient"}, request: function (t, n) {
            var r = t.requestDataType || this.get("requestDataType");
            if (r) {
                var i = e.ExchangeHttpClient.DataType[r];
                if (!i)throw this.logger.getThrow('RequestDataType "' + r + '" unregister');
                i.exchangeData && (t.data = i.exchangeData(t.data, t.headers)), i.exchangeHeader && (t.headers = i.exchangeHeader(t.headers || {}))
            }
            return e.HttpClient.prototype.request.apply(this, arguments)
        }, onResponse: function (t) {
            var n = this.requestOptions.responseDataType || this.get("responseDataType");
            if (n) {
                var r = e.ExchangeHttpClient.DataType[n];
                if (!r)throw this.logger.getThrow('ResponseDataType "' + n + '" unregister');
                t.responseData = r.exchangeData(t.responseText), null == t.responseData && "text/html" != t.getHeaders()["Content-Type"] && (e.Logger.sendClientLog({
                    level: "ERROR",
                    name: "ExchangeHttpClient",
                    url: this.requestOptions.url,
                    errorMsg: "exchange data error",
                    dataType: n,
                    responseText: t.responseText
                }), this.trigger("exchangeerror", {dataType: n, responseText: t.responseText}))
            }
            return e.HttpClient.prototype.onResponse.apply(this, arguments)
        }
    }), e.ExchangeHttpClient.DataType = {}, e.ExchangeHttpClient.registerExchangeDataType = function (t) {
        var n = e.ExchangeHttpClient.DataType;
        n[t.dataType] = t
    }, e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "ObjectToXML", exchangeData: function (e, n) {
            return "string" == typeof e ? e : n && "application/x-www-form-urlencoded" == n["Content-Type"] ? e : t.Xml.obj2xml(e)
        }, exchangeHeader: function (e) {
            return e["Content-Type"] || (e["Content-Type"] = "application/xml"), e
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "ObjectToXML2", exchangeData: function (e) {
            return "string" == typeof e ? e : t.Xml.obj2xml2(e)
        }, exchangeHeader: function (e) {
            return e["Content-Type"] || (e["Content-Type"] = "application/xml"), e
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "ObjectToXML2_URL", exchangeData: function (e) {
            return "xml=" + encodeURIComponent(t.Xml.obj2xml2(e))
        }, exchangeHeader: function (e) {
            return e["Content-Type"] = "application/x-www-form-urlencoded", e
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "ObjectToObject", exchangeData: function (e) {
            return e
        }, exchangeHeader: function (e) {
            return e["Content-Type"] = "application/x-www-form-urlencoded", e
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "XML2Object", exchangeData: function (t) {
            return e.Text.Xml.xml2object(t)
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "JSON2Object", exchangeData: function (t) {
            var n = e.JSON.tryEval(t);
            return n || (t = t.replace(/[\u2028]/gi, ""), n = e.JSON.tryEval(t)), n
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "Nothing", exchangeData: function (e) {
            return e
        }
    }), e.ExchangeHttpClient.registerExchangeDataType({
        dataType: "Object2JSON", exchangeData: function (t) {
            return e.JSON.stringify(t)
        }
    })
}(M139),
M139.HttpRouter = {
    serverList: {
        login: {domain: "http://" + location.host, path: "/login/s?func={api}&sid={sid}"},
        appsvr: {domain: "http://" + location.host, path: "/s?func={api}&sid={sid}"},
        webapp: {domain: "http://" + location.host, path: "/RmWeb/mail?func={api}&sid={sid}"},
        setting: {domain: "http://" + location.host, path: "/setting/s?func={api}&sid={sid}"},
        addr: {domain: "http://" + location.host, path: "/addrsvr/{api}?sid={sid}&formattype=json"},
        addr2: {domain: "http://" + location.host, path: "/addrsvr2/{api}?sid={sid}&formattype=json"},
        addr3: {domain: "http://" + location.host, path: "/addrsvr3/peAddrService/{api}?sid={sid}&formattype=json"},
        addr_p3_gw: {
            domain: "http://" + location.host,
            path: "/addr_p3_gw/SyncUserInfo/addrlistservice_sync_get?func={api}&sid={sid}"
        },
        weather: {domain: "http://" + location.host, path: "/mw2/weather/weather?func={api}&sid={sid}"},
        positioncontent: {domain: "http://" + location.host, path: "/mw/mw/getUnifiedPositionContent?sid={sid}"},
        mms: {domain: "http://" + location.host, path: "/sm/mms/mms?func={api}&sid={sid}"},
        sms: {domain: "http://" + location.host, path: "/mw2/sms/sms?func={api}&sid={sid}"},
        search: {domain: "http://" + location.host, path: "/bmail/s?func={api}&sid={sid}"},
        card: {domain: "http://" + location.host, path: "/mw2/card/s?func={api}&sid={sid}"},
        together: {domain: "http://" + location.host, path: "/together/s?func={api}&sid={sid}"},
        disk: {domain: "http://" + location.host, path: "/mw2/disk/disk?func={api}&sid={sid}"},
        file: {domain: "http://" + location.host, path: "/mw2/file/disk?func={api}&sid={sid}"},
        note: {domain: "http://" + location.host, path: "/mw2/file/mnote?func={api}&sid={sid}"},
        evernote: {domain: "http://" + location.host, path: "/mw2/file/mnote?func={api}&sid={sid}"},
        uec: {domain: "http://" + location.host, path: "/uec/uec/s?func={api}&sid={sid}"},
        bill: {domain: "http://" + location.host, path: "/mw/mw/billsvr?func={api}&sid={sid}"},
        middleware: {
            domain: "http://" + location.host, path: "/middleware/s?func={api}&sid={sid}"
        },
        calendar: {domain: "http://" + location.host, path: "/mw2/calendar/s?func={api}&sid={sid}"},
        businessHall: {domain: "http://" + location.host, path: "/together/s?func={api}&sid={sid}"},
        billcharge: {domain: "http://" + location.host, path: "/mail_hall/info?func={api}&sid={sid}"},
        groupmail: {domain: "http://" + location.host, path: "/mw2/groupmail/s?func={api}&sid={sid}"},
        webdav: {domain: "http://" + location.host, path: "/addr_p3_gw/{api}"},
        bmail: {domain: "http://" + location.host, path: "/bmail/s?func={api}&sid={sid}"},
        weixin: {domain: "http://" + location.host, path: "/weixin/s?func={api}&sid={sid}"},
        outland: {domain: "http://" + location.host, path: "/bmail/s?func={api}"},
        fax: {domain: "http://" + location.host, path: "/mw2/fax/s?func={api}&sid={sid}"},
        nothing: {}
    },
    apiList: {"mbox:getAllFolders": "appsvr"},
    addServer: function (e, t) {
        this.serverList[e] = t
    },
    addRouter: function (e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            this.apiList[r] = e
        }
        return !0
    },
    getUrl: function (e) {
        var t = {};
        e.indexOf("?") > 0 && (t = $Url.getQueryObj(e), e = e.split("?")[0]);
        var n = this.apiList[e];
        n || e.indexOf("&") > 0 && (n = this.apiList[e.split("&")[0]]);
        var r = this.serverList[n].domain;
        r = r.replace("http:", window.location.protocol);
        var i = r + this.serverList[n].path,
            o = $T.format(i, { sid: top.sid || $T.Url.queryString("sid"), api: e });
        if("global:sequential2" == e ){
            o = o.replace("global:sequential2", "global:sequential");
        }
        if(o && t){
            o = $Url.makeUrl(o, t);
        }
        if(!top.COMEFROM ){
            top.COMEFROM = $T.Url.queryString("comefrom");
        }
        if(top.COMEFROM){
            if (o += window == top) {
                "&comefrom=" + top.COMEFROM;
            } else {
                if ($T.Url.queryString("comefrom")) {
                    "&comefrom=" + $T.Url.queryString("comefrom");
                } else {
                    "&comefrom=" + top.COMEFROM;
                }
            }
        }
        return o;
    },
    hostConfig_12: {
        login: {host: "mail.10086.cn", proxy: "/proxy.html"},
        mw: {host: "mw.mail.10086.cn", proxy: "/proxy.htm"},
        mw2: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm"},
        bill: {host: "mw.mail.10086.cn", proxy: "/bill/proxy.htm"},
        sm: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm"},
        together: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        setting: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addrsvr: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addrsvr2: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addrsvr3: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addr_p3_gw: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        uec: {host: "uec.mail.10086.cn", proxy: "proxy.htm"},
        g2: {host: "g2.mail.10086.cn", proxy: "/proxy.htm"},
        mail_hall: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        sharpapi: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        pns: {host: "pushmsg.mail.10086.cn", proxy: "pns/proxy.htm", keepPath: !0},
        webdav: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        weixin: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0}
    },
    hostConfig_1: {
        login: {host: "mail.10086.cn", proxy: "/proxy.html"},
        mw: {host: "mw-test.mail.10086.cn", proxy: "/proxy.htm"},
        mw2: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm"},
        bill: {host: "mw-test.mail.10086.cn", proxy: "/bill/proxy.htm"},
        sm: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm"},
        together: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        setting: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addrsvr: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addrsvr2: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addrsvr3: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        addr_p3_gw: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        uec: {host: "uec0.mail.10086.cn", proxy: "proxy.htm"},
        g2: {host: "g3.mail.10086.cn", proxy: "/proxy.htm"},
        g3: {host: "g3.mail.10086.cn", proxy: "/proxy.htm"},
        mail_hall: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        sharpapi: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        pns: {host: "pushmsg0.mail.10086.cn", proxy: "pns/proxy.htm", keepPath: !0},
        webdav: {host: "smsrebuild0.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0},
        weixin: {host: "smsrebuild1.mail.10086.cn", proxy: "/proxy.htm", keepPath: !0}
    },
    getProxy: function (e) {
        if ("10086.cn" != document.domain)return null;
        var t, n = M139.Text.Url.removeHost(e).replace(/\/+/g, "/").split("/")[1];
        if (t = window.getCookie ? getCookie("cookiepartid") : M139.Text.Cookie.get("cookiepartid"), "12" === t) {
            var r = !1;
            "[object Function]" === Object.prototype.toString.call(window.getDomain) && (r = window.getDomain("betadomain")), r || "[object Function]" !== Object.prototype.toString.call(top.getDomain) || (r = top.getDomain("betadomain")), r || (r = "appmail3.mail.10086.cn"), "undefined" != typeof r && "" !== r && r === location.host && (t = "1")
        }
        var i = this["hostConfig_" + t] || this.hostConfig_12, o = i[n];
        if (n && o) {
            var a = this.removeProxyPath(e, n, o.keepPath);
            return {url: a, host: o.host, proxy: o.proxy}
        }
        return null
    },
    getNoProxyUrl: function (e) {
        var t = this.getProxy(e);
        return t ? window.location.protocol + "//" + t.host + t.url : e
    },
    removeProxyPath: function (e, t, n) {
        return e = M139.Text.Url.removeHost(e), n ? e : e.replace("/" + t, "")
    },
    ProxyFrameMap: {},
    proxyReady: function (e, t) {
        var n = this.ProxyFrameMap[e];
        if (!n) {
            var r = '<iframe src="{0}" style="display:none"></iframe>'.format(e);
            this.ProxyFrameMap[e] = n = $(r).appendTo(document.body), M139.Iframe.checkIframeHealth({iframe: n[0]})
        }
        return M139.Iframe.isAccessAble(n[0]) ? t(n[0].contentWindow) : void M139.Iframe.domReady(n[0], function () {
            t(n[0].contentWindow)
        })
    }
},
function (e, t, n, r) {
    r.namespace("M139.Iframe", t.Model.extend({
        initialize: function (e) {
            if (!e || !e.name)throw"Application实例缺少参数:name"
        }
    })), e.extend(r.Iframe, {
        isAccessAble: function (e, t) {
            var n = !1;
            try {
                var r = e.contentWindow, i = r.document;
                n = Boolean(i.body && document.domain == i.domain && r.location.href.indexOf("http") > -1), n && i.readyState && (n = "complete" == i.readyState), n && t && (n = Boolean(r[t]))
            } catch (o) {
            }
            return n
        }, domReady: function (e, t, n) {
            var i;
            n = n || {}, r.Timing.waitForReady(function () {
                var t = r.Iframe.isAccessAble(e, n.query);
                return t && i && clearInterval(i), t
            }, t), n.checkIframeHealth && (i = this.checkIframeHealth({iframe: e}))
        }, checkIframeHealth: function (e) {
            var t = e.iframe, n = e.retryTimes || 3, i = e.interval || 3e3, o = (e.query, function () {
                return r.Iframe.isAccessAble(t, e.query)
            }), a = setInterval(function () {
                if (r.Dom.isRemove(t))return void clearInterval(a);
                if (n--, o())clearInterval(a); else {
                    var e = t.src;
                    -1 == e.indexOf("?") && (e += "?"), e += "&" + Math.random(), t.src = e
                }
                if (0 >= n && (clearInterval(a), !o()))throw"M139.Iframe.checkIframeHealth Fail:" + t.src
            }, i);
            return a
        }
    }), $Iframe = r.Iframe
}(jQuery, Backbone, _, M139),
function (e) {
    e.core.namespace("M139.RichMail"),
    e.RichMail.RichMailHttpClient = e.ExchangeHttpClient.extend({
        initialize: function (t) {
            e.ExchangeHttpClient.prototype.initialize.apply(this, arguments), this.router = e.HttpRouter;
            var n = t || {}, r = n.onrouter || $.noop;
            r.call(this, this.router),
            this.router.addRouter("appsvr", ["user:getInitData", "user:getInitDataConfig", "mbox:getAllFolders", "mbox:listMessages", "global:sequential", "mbox:setUserFlag",
                "mbox:getSearchResult", "mbox:deleteFolders", "mbox:updateMessagesLabel", "mbox:updateMessagesAll", "mbox:setFolderPass", "mbox:updateFolders", "mbox:setSessionMode",
                "user:getWhiteBlackList", "user:setWhiteBlackList", "user:setFilter_New", "user:getFilter_New", "user:setFilter", "user:getFilter", "user:filterHistoryMail",
                "user:statMessages", "mbox:updateBillType"]),
            this.router.addRouter("appsvr2", ["attach:listAttachments", "mbox:queryContactMessages", "attach:queryContactAttachments"]),
            this.router.addRouter("webapp", ["user:getSignatures", "user:signatures", "mbox:moveMessages", "mbox:deleteMessages", "mbox:updateMessagesStatus", "mbox:readMessage",
                "mbox:readMessage&comefrom=5", "mbox:updateFolders2", "mbox:getMessageInfo", "mbox:readSessionMessage", "mbox:readAggregateMessage", "mbox:readSessionMessage&comefrom=5",
                "mbox:replyMessage", "mbox:forwardAttachs", "mbox:forwardMessage", "mbox:searchMessages", "mbox:sendMDN", "mbox:sendMDN&comefrom=5&categroyId=103000000", "mbox:mailFile",
                "mbox:mailClean", "user:setPOPAccount", "user:getPOPAccounts", "user:syncPOPAccount", "user:syncPOPAccountAll", "mbox:mailMemo", "mbox:getDeliverStatus", "mbox:compose",
                "mbox:compose&comefrom=5&categroyId=103000000", "mbox:compose&comefrom=5&categroyId=102000000", "mbox:compose&comefrom=5&categroyId=103000005",
                "mbox:compose&comefrom=5&categroyId=102000015", "mbox:compose&comefrom=5&categroyId=103000010", "mbox:compose&comefrom=5", "mbox:groupCompose", "mbox:getComposeId",
                "upload:deleteTasks", "attach:refresh", "attach:uploadPicBase64", "mbox:forwardMessages", "mbox:restoreDraft", "mbox:editMessage", "mbox:reportSpamMails",
                "mbox:recallMessage", "mbox:packMessages", "user:moveHOMail", "mbox:checkDomain", "user:setFilter_139", "user:getFilter_139", "user:filterHistoryMail139",
                "user:forwardVerify", "user:sortFilter_139", "user:getAttrs", "user:setAttrs", "global:sequential2", "mbox:setTaskMessages", "attach:listAttachments",
                "mbox:queryContactMessages", "attach:queryContactAttachments", "user:getTemplates", "mbox:readTemplateMail", "user:deleteTemplates"]),
            this.router.addRouter("setting", ["user:getOnlineFriends", "user:getRightStatus", "user:receiveRight", "user:getMainData", "user:setUserConfigInfo", "user:getInfoCenter",
                "user:taskCount", "user:getMyTask", "user:taskAward", "user:taskWorshipEnvy", "user:taskStar", "user:taskBadge", "user:getMedals", "poperations:signInit",
                "poperations:queryphiz", "poperations:publishedsign", "poperations:querysign", "poperations:invitefriends", "poperations:checkinviteadd", "user:getPersonal",
                "user:setMyApp", "user:sendPasswordAction", "user:updatePasswordAction", "user:checkAliasAction", "user:updateAliasAction", "meal:getMealInfo", "meal:setMealInfo",
                "mailUpdate:getMailUpdateInfo", "mailUpdate:setMailUpdateInfo", "mailPatter:setMailPatterInfo", "mailPatter:getMailPatterInfo", "mailPatter:getSMSCode",
                "user:setAddMeRule", "user:bindFeixinAction", "user:getLoginNotify", "user:setLoginNotify", "user:getMailNotify", "user:updateMailNotify", "user:addMailNotifyExcp",
                "user:modifyMailNotifyExcp", "user:delMailNotifyExcp", "user:getUndisturb", "user:updateUndisturb", "user:mailToMe", "user:sendPasswordAction", "user:checkPhoneAction",
                "user:bindPhoneAction", "bill:setszjtBill", "user:loginHistory", "user:updateMailSize", "user:mailDeleteHistory", "user:popAgentHistory", "user:passwordModifyHistory",
                "user:SetDefaultAccount", "user:setDefaultSendAccount", "user:getCommConfig", "user:updateCommConfig", "user:setUserConfigItem", "ir:reflushContent", "ir:getIRContent",
                "user:checkPassword", "user:getQuestion", "user:setPasswordProtect", "earthhour:earthHourInit", "earthhour:setStatus", "earthhour:getStencil", "earthhour:inviteFriends",
                "umc:getArtifact", "umc:mailCallUMC", "umc:updatePassport", "umc:passPortTips", "user:cancelMailboxAction", "info:getInfoSet", "addr:getVCard", "umc:rdirectCall",
                "umc:rdirectTo", "guide:getUserinfo", "guide:setUserinfo", "guide:setUserpic", "bill:getTypeList", "bill:openTrafficBill", "bill:clossTrafficBill", "bill:openBill",
                "bill:closeBill", "bill:batterypitcherBill", "bill:getBatterypitcherBill", "bill:getSynName", "setting:examineShowStatus", "setting:examineUserStatus",
                "setting:queryServiceNumbers", "user:getImageCode", "setting:examinePwdStatus", "disk:getDiskAttConf", "disk:updateDiskAttConf", "healthy:getHealthyInfo",
                "healthy:getShareContent", "healthy:setTrustAutoLogin", "healthy:setTrustForward", "healthy:oneClickUpdate", "healthy:getOneClickUpdateInfo", "healthy:getHealthyHistory",
                "healthy:updateLastTipsTime", "user:getCapModHist", "msg:getRemindMsg", "msg:delRemindMsg", "user:getPaymentLink", "user:orderFreeProduct", "user:getOrderInfo",
                "tips:startTipsTask", "user:mailSubscribe", "user:mailSubscribeStatus", "user:getTrialSkinOrder", "user:sendUpdateStatusSmsCode", "user:sendLoginNotifySMsCode",
                "user:updateStatus", "user:setLoginNotify", "user:sendAliasSmscode", "user:sendSmsCode", "user:bindMobileNumber", "user:bindOldAccount", "user:queryBindStatus",
                "user:getNoforwardingTimes", "setting:querySystemStatus", "user:getBatchDelStatus", "user:setBatchDelStatus", "user:getDelMailByTool", "user:getDelMids",
                "user:mailCapacityInfo", "user:mailAttrifilter", "user:queryMailCapacityOrderInfo", "user:queryGPRSDonationStatus", "user:GPRSDonation", "user:searchNiceNumbers",
                "user:queryNiceNumberInfo", "user:queryOrderStatus", "user:queryUserAliasInfo"]),
            this.router.addRouter("together", ["user:getExDataSync", "user:getFetionC", "weibo:userinfo", "together:europeCup", "together:getvotes", "together:getTokenInfo",
                "together:getShowResultInfo", "unified:getUnifiedPositionContent", "unified:logreport", "unified:updatePositionContent", "survey:createSurvey", "survey:updateSurvey",
                "survey:deleteSurvey", "survey:createQuestion", "survey:updateQuestion", "survey:deleteQuestion", "survey:viewSurvey", "survey:answerSurvey", "survey:statSurvey",
                "survey:getSurveyList", "survey:getSurveyAnswer", "survey:submitSurvey", "survey:updateSurveyInfo"]),
            this.router.addRouter("addr", ["GetUserAddrJsonData", "QueryUserInfo", "ModUserInfo", "AddUserInfo", "DelContacts", "WhoAddMeByPage", "OneKeyAddWAM", "WhoWantAddMe",
                "AgreeOrRefuseAll", "WMAGroupList", "ModDealStatus", "GetUpdatedContactsNum", "GetUpdatedContactsDetailInfo", "QuerySaveAllUpdatedResult",
                "SaveIncrementalUpdatedInfo", "SaveAllUpdatedInfo", "AddImageReport", "NoPromptUpdate", "SkipCurrent", "QueryContactsAndGroup", "ModContactsField",
                "MergeContacts", "DelGroup", "AddGroupList", "DelGroupList", "GetAudienceEmailList", "GetBatchOperHistoryRecord", "GetBatchOperStatus", "AutoMergeContacts",
                "QueryMergeResult", "GetColorCloudInfo", "GetFinshImportResult", "GetFinshImportList", "GetRemindBirdays", "SetRemindBirdays"]),
            this.router.addRouter("weather", ["weather:getDefaultWeather", "weather:getArea", "weather:getWeather", "weather:setWeather"]),
            this.router.addRouter("positioncontent", ["positioncontent:ad"]),
            this.router.addRouter("card", ["card:birthdayRemind", "card:getCardMaterail"]),
            this.router.addRouter("mms", ["mms:mmsInitData", "mms:getMaterialById"]),
            this.router.addRouter("sms", ["sms:getSmsMainData", "sms:smsNotifyInit"]),
            this.router.addRouter("ServiceAPI", ["RMSecretFolder"]),
            this.router.addRouter("search", ["contact:uploadAfterCut", "mbox:searchMessages", "mail:askAddFriendToMayKnow", "mail:systemCutMessage", "mail:askShareContact", "mail:shareContact",
                "sign:queryImg", "contact:uploadImageFromDisk"]),
            this.router.addRouter("bill", ["bill:setBill"]),
            this.router.addRouter("disk", ["disk:fSharingInitData", "disk:getFiles", "disk:setFiles", "disk:getdiskallinfo", "disk:getdirfiles", "disk:renameFiles", "disk:renameDiskFile",
                "disk:renameDirectory", "disk:renameDiskAlbum", "disk:renameDiskMusicClass", "disk:saveAttach", "disk:mailFileSend", "disk:flashplay", "disk:shareCopyTo"]),
            this.router.addRouter("login", ["login:sendWapPush", "login:sendPush", "login:sendSmsCode"]),
            this.router.addRouter("file", ["file:cabinetFile", "file:cabinet", "file:fSharingInitData", "file:getFiles", "file:setFiles", "file:delFiles", "file:preDownload", "file:continueFiles",
                "file:renameFiles", "file:fastUpload", "file:resumeUpload", "file:breakPFile", "file:turnFile", "file:toDiskForCenter", "file:mailFileSend", "disk:delete", "disk:getFile", "disk:rename",
                "disk:getthumbnailimage", "disk:thumbnail", "disk:addDirectory", "disk:turnFile", "disk:move", "disk:init", "disk:createDirectory", "disk:getDirectorys", "disk:fileList", "disk:fileListPage",
                "disk:search", "file:cabinetSearch", "disk:download", "disk:fastUpload", "disk:breakPFile", "disk:resumeUpload", "disk:normalUpload", "disk:setCover", "disk:resumeUpload",
                "disk:delDiskDirsAndFiles", "disk:shareCopyTo", "disk:copyContentCatalog", "disk:attachUpload", "disk:thumbnails", "disk:getDiskAlbumList", "disk:getOutLinkList", "disk:delOutLink",
                "disk:getOutLink", "disk:getDirectLink", "disk:getDirectLinkUrl", "disk:backupMail", "disk:backupAllBillMail", "disk:backupAffix", "disk:index", "disk:isShareSiChuan",
                "file:downLoadInitNew", "file:fileBatDownload", "disk:getContentInfosByType", "disk:shareDetail", "disk:friendShareList", "disk:myShareList", "disk:deleteShare",
                "disk:delShare", "disk:cancelShare", "disk:share", "disk:shareDetail", "disk:replyShare", "disk:getVirDirInfo", "disk:mgtVirDirInfo", "disk:getContentInfosByType",
                "global:files", "global:userFiles", "global:index", "global:download", "global:saveToMcloud", "disk:mgtVirDirInfo", "global:saveToMcloud", "file:fileSenderPnsNotify",
                "file:sendMobile", "file:sendEmail", "file:sendFileBySms", "disk:mcloudDownload"]),
            this.router.addRouter("billcharge", ["mailoffice:getTipsinfo"]),
            this.router.addRouter("fax", ["fax:getSendFaxData", "fax:getReceiveFaxData", "fax:deleteFaxData"]),
            this.router.addRouter("note", ["mnote:createNote", "mnote:getNote", "mnote:getNotes", "mnote:deleteNote", "mnote:updateNote", "mnote:searchNote", "mnote:mailsToNote",
                "mnote:uploadNote", "mnote:downloadNote", "mnote:thumbnailNote", "mnote:nothing"]),
            this.router.addRouter("evernote", ["evernote:createbyMnoteId", "evernote:oauth", "evernote:createOrReplace", "evernote:createNote"]),
            this.router.addRouter("uec", ["uec:list", "uec:status", "uec:addFeedback"]),
            this.router.addRouter("middleware", []),
            this.router.addRouter("outland", []),
            this.router.addRouter("calendar", ["calendar:addLabel", "calendar:updateLabel", "calendar:updateLabelLimited", "calendar:deleteLabel", "calendar:shareLabel", "calendar:deleteLabelShare",
                "calendar:acceptShareLabel", "calendar:getUsersOfSharedLabel", "calendar:getLabelById", "calendar:getLabels", "calendar:initCalendar", "calendar:addCalendar", "calendar:addNoteCalendar",
                "calendar:updateCalendar", "calendar:delCalendar", "calendar:cancelInvitedInfo", "calendar:inviteSomeone", "calendar:updateInviteStatus", "calendar:shareCalendar",
                "calendar:getCalendarView", "calendar:getCalendarViewWithInviter", "calendar:getCalendarListView", "calendar:getCalendar", "calendar:getCalendarCount", "calendar:getMessageCount",
                "calendar:activeSyncCalendarList", "calendar:getNormalUploadUrl", "calendar:getDownloadUrl", "calendar:uploadFile", "calendar:activeSyncCalendarList", "calendar:uploadFile",
                "calendar:addMailCalendar", "calendar:updateMailCalendar", "calendar:getMailCalendar", "calendar:delMailCalendar", "calendar:getMessages", "calendar:updateBabyInfo",
                "calendar:getBabyInfo", "calendar:getLabelShareMessage", "calendar:getCalendarInviteMessage", "calendar:getCalendarShareMessage", "calendar:processShareLabelInfo",
                "calendar:delShareMsg", "calendar:acceptCalendarShare", "calendar:addBlackWhiteItem", "calendar:deBlackWhiteItem", "calendar:delBlackWhiteItem", "calendar:getBlackWhiteItem",
                "calendar:getBlackWhiteList", "calendar:getMessageCount", "calendar:getMessageList", "calendar:getMessageById", "calendar:delMessage", "calendar:setLabelUpdateNotify",
                "calendar:setCalendarRemind", "calendar:selectDailyRemindar", "calendar:insertDailyRemindar", "calendar:updateDailyRemindar", "calendar:deleteDailyRemindar", "calendar:synCaiYun",
                "calendar:addBirthdayCalendar", "calendar:getUserAddrJsonData", "calendar:cancelSubscribeLabel", "calendar:subscribeLabel", "calendar:searchPublicLabel", "calendar:searchCalendars",
                "calendar:setSubLabelUpdateNotify", "calendar:listTopLabels", "calendar:batchAddCalendar", "calendar:getCalendarList", "calendar:getAllLabelTypes", "calendar:getLabelsByType",
                "calendar:getPublishLabelsByType", "calendar:copyCalendar", "calendar:getPublishedLabelByOper", "calendar:getCalendarsByLabel", "calendar:shareCalendar", "calendar:cancelMailCalendars",
                "calendar:getGroupCalendarList", "calendar:addGroupLabel", "calendar:updateDragCalendar", "calendar:updateNoteCalendar", "calendar:delNoteCalendar", "calendar:subMovieLabel",
                "calendar:getBillData", "calendar:notificationContact", "calendar:exportActivityDates", "calendar:validAddCalendar", "calendar:getCalendarListNew", "calendar:addMeeting",
                "calendar:getAllMeetings", "calendar:getMeetingMessage", "calendar:processMeeting", "calendar:delAllMessage", "calendar:addTicketReminder", "calendar:batchAddCalForMail",
                "calendar:getIdAddCache", "calendar:getIdDelCache", "calendar:getCalendarsByInterval", "calendar:setSelectLabel", "calendar:getSubLabelStatus", "calendar:shareSubLabel",
                "calendar:getMarketingCalendarView", "calendar:getMarketingCalendarViewNoCookie", "calendar:subscribeLabelNew", "calendar:setPublishNewStatus", "nothing"]),
            this.router.addRouter("businessHall", ["businessHall:queryDetailDiscountInfo", "businessHall:getUserConsumption", "businessHall:queryBillInfo", "businessHall:queryProductInfo",
                "businesshall:userStateQuery", "businesshall:sendSmsAuthCode", "businesshall:productOrder", "businesshall:queryBusinessInfo", "together:getFetionFriends", "together:sendMailToFetion",
                "together:getLotteryCode"]),
            this.router.addRouter("bmail", ["mail:sendSystemMail"]),
            this.router.addRouter("groupmail", ["gm:createGroup", "gm:updateGroup", "gm:queryUserList", "gm:queryGroupByMid", "gm:updateGroupUser", "gm:queryCancelUserList"]),
            this.router.addRouter("addr3", ["GetHeSubOrgMemberList", "GetHeMemberInfo", "CheckUserNumber"])
        },
        defaults: {
            name: "M139.RichMail.RichMailHttpClient",
            requestDataType: "ObjectToXML",
            responseDataType: "JSON2Object"
        },
        request: function (t, n) {
            return e.ExchangeHttpClient.prototype.request.apply(this, arguments)
        },
        onResponse: function (t) {
            return e.ExchangeHttpClient.prototype.onResponse.apply(this, arguments)
        }
    }),
    e.core.namespace("M139.RichMail.API", {
        getFolderList: function (e) {
            this.call("mbox:getAllFolders", {}, function (t) {
                e && e(t.responseData)
            })
        },
        getMailList: function (e, t) {
            this.call("mbox:listMessages", e, function (e) {
                t && t(e.responseData)
            })
        },
        readMail: function (e, t) {
            this.call("mbox:readMessage", e, function (e) {
                t && t(e.responseData)
            })
        },
        getMessageInfo: function (e, t) {
            var n = {ids: e};
            this.call("mbox:getMessageInfo", n, function (e) {
                t && t(e.responseData)
            })
        },
        updateFolders: function (e, t) {
            this.call("mbox:updateFolders", e, function (e) {
                t && t(e.responseData)
            })
        },
        moveMessages: function (e, t) {
            this.call("mbox:moveMessages", e, function (e) {
                t && t(e.responseData)
            })
        },
        deleteFolders: function (e, t) {
            this.call("mbox:deleteFolders", e, function (e) {
                t && t(e.responseData)
            })
        },
        readAggregateMessage: function (e, t) {
            this.call("mbox:readAggregateMessage", e, function (e) {
                t && t(e.responseData)
            })
        },
        readSessionMail: function (e, t) {
            this.call("mbox:readSessionMessage", e, function (e) {
                t && t(e.responseData)
            })
        },
        setFolderPass: function (e, t) {
            this.call("mbox:setFolderPass", e, function (e) {
                t && t(e.responseData)
            })
        },
        getAttrs: function (e, t) {
            this.call("user:getAttrs", e, function (e) {
                t && t(e.responseData)
            })
        },
        setAttrs: function (e, t) {
            this.call("user:setAttrs", e, function (e) {
                t && t(e.responseData)
            })
        },
        setSessionModel: function (e, t) {
            this.call("mbox:setSessionModel", e, function (e) {
                t && t(e.responseData)
            })
        },
        getWhiteBlackList: function (e, t) {
            this.call("user:getWhiteBlackList", e, function (e) {
                t && t(e.responseData)
            })
        },
        setWhiteBlackList: function (e, t) {
            this.call("user:setWhiteBlackList", e, function (e) {
                t && t(e.responseData)
            })
        },
        getSignatures: function (e) {
            this.call("user:getSignatures", {}, function (t) {
                e && e(t.responseData)
            })
        },
        setSignatures: function (e, t) {
            this.call("user:signatures", e, function (e) {
                t && t(e.responseData)
            })
        },
        setPOPAccount: function (e, t, n) {
            this.call("user:setPOPAccount", e, function (e) {
                t && t(e.responseData)
            }, n)
        },
        getPOPAccounts: function (e, t) {
            this.call("user:getPOPAccounts", e, function (e) {
                t && t(e.responseData)
            })
        },
        syncPOPAccount: function (e, t) {
            this.call("user:syncPOPAccount", e, function (e) {
                t && t(e.responseData)
            })
        },
        setFilter_New: function (e, t) {
            this.call("user:setFilter_New", e, function (e) {
                t && t(e.responseData)
            })
        },
        getFilter_New: function (e) {
            var t = {filterFlag: 0, extContentFlag: 1};
            this.call("user:getFilter_New", t, function (t) {
                e && e(t.responseData)
            })
        },
        setFilter: function (e, t) {
            this.call("user:setFilter", e, function (e) {
                t && t(e.responseData)
            })
        },
        getFilter: function (e) {
            this.call("user:getFilter", {}, function (t) {
                e && e(t.responseData)
            })
        },
        statMessages: function (e, t) {
            this.call("user:statMessages", e, function (e) {
                t && t(e.responseData)
            })
        },
        filterHistoryMail: function (e, t) {
            this.call("user:filterHistoryMail", e, function (e) {
                t && t(e.responseData)
            })
        },
        call: function (t, n, r, i) {
            var o = function () { };
            a = new e.RichMail.RichMailHttpClient(i || {});
            if (!i || !i.mock) {
                a.on("error", function (e) {
                    o.call(a, e)
                }), i && ($.isFunction(i) ? (o = i, i = !1) : $.isFunction(i.error) && (o = i.error), $.isFunction(i.ontimeout) && a.on("timeout", function (e) {
                    i.ontimeout.call(a, e)
                }));
                var s = t.indexOf("/") > -1 ? t : a.router.getUrl(t),
                    l = "post";
                i && i.method && (l = i.method);
                i && i.urlParam && (s += i.urlParam);
                return a.request({
                    url: s,
                    method: l,
                    data: n,
                    async: i && i.async,
                    headers: i && i.headers,
                    timeout: i && i.timeout,
                    isSendClientLog: i && i.isSendClientLog
                }, function (e) {
                    top.$App && top.$App.onHttpClientResponse && top.$App.onHttpClientResponse(a, e);
                    r && r(e);
                });
            }
            var a = e.API.Mock.call({
                api: t,
                data: n,
                success: r,
                error: function (e, t) {
                    r(e, t)
                }
            })
        }
    }), $RM = e.RichMail.API
}(M139),
function (e, t, n) {
    var r = n.Model.ModelBase;
    n.namespace("M139.PageApplication", r.extend({
        initialize: function (e) {
            r.prototype.initialize.apply(this, arguments), e = e || {};
            var t = this;
            this.name = e.name || this.name,
            this.win = e.window || window,
            n.PageApplication.getTopApp() || n.PageApplication.registerTopApp(this),
            this.query = n.Text.Url.getQueryObj(this.win.location.href),
            this.config = $Config,
            this.config.on("update", function (e) {
                t.trigger("configupdate", e)
            }),
            this.inputData = null,
            this.query && this.query.inputData && (this.inputData = this.getStorage(this.query.inputData)),
            e.views && this.registerView(e.views)
        },
        registerConfig: function (e, t) {
            return this.config.registerConfig.apply(this.config, arguments)
        },
        setConfig: function (e, t, n) {
            return this.config.setConfig.apply(this.config, arguments)
        },
        getConfig: function () {
            return this.config.getConfig.apply(this.config, arguments)
        },
        registerMessages: function (e) {
            this.config.registerConfig("Message", e)
        },
        getMessage: function (e) {
            this.config.getConfig("Message", e)
        },
        await: function (t, n) {
            if ("string" != typeof t)throw this.logger.getThrow("await参数非法，必须为字符串");
            if (!e.isFunction(n))throw this.logger.getThrow("await参数非法，必须为函数");
            var r = 0, i = {"|": 1, ",": 2, "&": 4};
            if (t.replace(/&|,|\|/g, function (e) {
                    r ^= i[e]
                }), r === i["|"] || r === i[","] || r === i["&"])t = e.map(t.split(/&|,|\|/), function (t) {
                return e.trim(t)
            }); else if (0 !== r)throw this.logger.getThrow("await参数非法，只能同时使用一种操作符");
            this.on("somethingready", function (o) {
                var a = o.event, s = o.data;
                if (e.isArray(t)) {
                    var l = e.inArray(a, t);
                    l > -1 && (r === i["|"] ? (this.off("somethingready", arguments.callee), n.call(this, s, a)) : r === i[","] ? (t.splice(l, 1), n.call(this, s, a)) : r === i["&"] && (t.splice(l, 1), 0 === t.length && (this.off("somethingready", arguments.callee), n.call(this, s))))
                } else a === t && (this.off("somethingready", arguments.callee), n.call(this, s))
            })
        },
        makeReady: function (e, t) {
            this.trigger("somethingready", {event: e, data: t})
        },
        getTop: function () {
            return n.PageApplication.getTopAppWindow()
        },
        getTopPageApp: function () {
            return n.PageApplication.getTopApp()
        },
        getStorage: function (e) {
            var t = this.getTopPageApp();
            if (t != this)return t.getStorage.apply(t, arguments);
            var r = this.config.getConfig("_Storage_", e);
            try {
                r = n.JSON.parse(r)
            } catch (i) {
                r = n.JSON.tryEval(r)
            }
            return r
        },
        setStorage: function (e) {
            var t = this.getTopPageApp();
            if (t != this)return t.setStorage.apply(t, arguments);
            var r = Math.random();
            return t.config.setConfig("_Storage_", r, n.JSON.stringify(e)), r
        },
        inputDataToUrl: function (e, t) {
            return n.Text.Url.makeUrl(e, {inputData: this.setStorage(t)})
        },
        registerHttpClient: function (e) {
            this.config.registerConfig("HttpClient", e)
        },
        getHttpClient: function (e) {
            return this.config.getConfig("HttpClient", e)
        },
        registerView: function (e, t) {
            "object" == typeof arguments[0] ? this.config.registerConfig("Views", arguments[0]) : this.config.setConfig("Views", e, t)
        },
        getView: function (e) {
            return this.config.getConfig("Views", e)
        },
        registerModel: function (e, t) {
            if ("object" == typeof arguments[0]) {
                this.config.registerConfig("Models", arguments[0]);
            } else {
                this.config.setConfig("Models", e, t);
            }
        },
        getModel: function (e) {
            return this.config.getConfig("Models", e)
        }
    })),
    e.extend(n.PageApplication, {
        getTopAppWindow: function () {
            return window.top
        },
        registerTopApp: function (e) {
            this.getTopAppWindow()._pageapp = e
        },
        getTopApp: function () {
            var e = this.getTopAppWindow()._pageapp;
            return e
        },
        utilShowLoading: function () {
        },
        utilHideLoading: function () {
        },
        registerGlobalConfig: function () {
        }
    }),
    window.getTopAppWindow = n.PageApplication.getTopAppWindow
}(jQuery, Backbone, M139),
function () {
    M139.Timing = {
        waitForReady: function (query, callback) {
            function checkReady() {
                tryTimes++;
                try {
                    if ($.isFunction(query)) {
                        var result = query();
                    } else {
                        var result = eval(query);
                    }
                    if (result) {
                        done = !0;
                        if(intervalId){
                            self.clearInterval(intervalId);
                        }
                    }
                } catch (e) {
                }
                if (done || tryTimes > 100) {
                    intervalId && self.clearInterval(intervalId);
                    callback && callback();
                }
            }

            var tryTimes = 0,
                done = !1;
            checkReady();
            if (!done) {
                var intervalId = this.setInterval("M139.Timing.waitForReady", checkReady, 300);
            }
            var self = this;
        },
        makeSureIframeReady: function (e) {
            return M139.Iframe.checkIframeHealth(e)
        },
        watchElementScroll: function (e) {
            function t(e) {
                for (; e;) {
                    if (e.style && "none" == e.style.display)return !1;
                    e = e.parentNode
                }
                return !0
            }

            function n(e) {
                try {
                    for (; e;) {
                        if ("BODY" == e.tagName)return !1;
                        e = e.parentNode
                    }
                } catch (t) {
                    return !0
                }
                return !0
            }

            if (!($.browser.msie && $.browser.version < 8)) {
                e.lastScrollTop = e.scrollTop;
                var r = !1, i = this.setInterval("M139.Timing.watchElementScroll", function () {
                    return n(e) ? void M139.Timing.clearInterval(i) : void(t(e) ? r ? (e.scrollTop = e.lastScrollTop, r = !1) : e.lastScrollTop = e.scrollTop : r = !0)
                }, 500)
            }
        },
        watchIframeHeight: function (e, t, n) {
            function r() {
                var t = e.contentWindow.document, n = t.body;
                n.scrollHeight > e.offsetHeight && (e.style.height = (n.scrollHeight + 35 - s).toString() + "px", $.browser.msie && $.browser.version < 7)
            }

            function i() {
                M139.Timing.clearInterval(l)
            }

            var o = t || 1e3, a = 0, s = n ? 40 : 0;
            s && ($B.is.ie && 8 == $B.getVersion() || $B.is.firefox) && (s = 30, o = 10);
            var l = this.setInterval("M139.Timing.watchIframeHeight", function () {
                if ($D.isRemove(e))i(); else {
                    if ($D.isHide(e))return;
                    r(), a++, 2 == a && (jQuery("img", e.contentWindow.document).bind("load", function () {
                        $(this).unbind("load", arguments.callee), r()
                    }), i())
                }
            }, o)
        },
        watchInputChange: function (e, t, n) {
            function r(n) {
                e.value !== i && (i = e.value, $.isFunction(t) && t.call(e, n))
            }

            var i = e.value;
            this.setInterval("M139.Timing.watchInputChange", r, 1e3);
            $(e).keydown(r).keyup(r)
        },
        setInterval: function (e, t, n) {
            var r = this.timerMap[e];
            r || (r = this.timerMap[e] = new M139.Timing.Timer(e, n));
            var i = r.addHandler(t);
            return i
        },
        clearInterval: function (e) {
            if (e) {
                var t = e.split("_")[0], n = this.timerMap[t];
                n && n.removeHandler(e)
            }
        },
        timerMap: {}
    },
    M139.Timing.Timer = function (e, t) {
        this.name = e, this.interval = t;
        var n = {};
        this.addHandler = function (t) {
            var r = e + "_" + Math.random();
            return n[r] = t, r
        }, this.removeHandler = function (e) {
            delete n[e]
        }, this.timerId = setInterval(function () {
            for (var e in n)try {
                n[e]()
            } catch (t) {
            }
        }, t)
    },
    $Timing = M139.Timing
}(),
function (e, t) {
    var n = e;
    t.View = {},
    t.View.ViewBase = Backbone.View.extend({
        initialize: function (n) {
            if (n || (n = {}), n.events)for (var r in n.events)this.on(r, n.events[r]);
            var i = n.style || this.style;
            i && this.el && (e.browser.msie ? this.el.style.cssText = i : this.$el.attr("style", i)), n.width && this.$el.width(n.width), n.height && this.$el.height(n.height), this.logger = new t.Logger({name: n.name || this.name}), this.id || this.el && this.el.id || (this.id = this.getRandomId(), this.el && (this.el.id = this.id)), this.options = n || {}, t.View.registerView(this.id, this)
        },
        name: "M139.View.ViewBase",
        render: function () {
            var e = this;
            if (this.rendered)return this;
            this.rendered = !0;
            var t = this.options;
            return t.replaceInnerText && n.each(t.replaceInnerText, function (t, n) {
                e.$(t).text(n)
            }), t.replaceInnerHTML && n.each(t.replaceInnerHTML, function (t, n) {
                e.$(t).html(n)
            }), t.hides && this.$(t.hides).hide(), t.shows && this.$(t.shows).css("display", ""), this.trigger("render"), t.noDelayPrint ? e.trigger("print") : setTimeout(function () {
                e.trigger("print")
            }, 0), this
        },
        remove: function () {
            return this.$el.remove(), this.isRemoved = !0, this.trigger("remove"), this
        },
        show: function () {
            return this.$el.show(), this.trigger("show"), this
        },
        hide: function () {
            return this.$el.hide(), this.trigger("hide"), this
        },
        isHide: function (e) {
            return $D.isHide(this.el, e)
        },
        getHeight: function () {
            return this.$el ? this.$el.height() : 0
        },
        getWidth: function () {
            return this.$el ? this.$el.width() : 0
        },
        setWidth: function (e) {
            return this.setSize(e, null)
        },
        setHeight: function (e) {
            return this.setSize(null, e)
        },
        setPosition: function (e, t) {
            return this.$el && (this.$el.css({left: e, top: t}), this.trigger("move")), this
        },
        setSize: function (e, t) {
            return this.$el && ((e || 0 === e) && this.$el.width(e), (t || 0 === t) && this.$el.height(t), this.trigger("resize")), this
        },
        onUpdate: function () {
            this.trigger("update")
        },
        getEl: function () {
            return this.el
        },
        get$El: function () {
            return this.$el
        },
        getCidEl: function (e) {
            return e ? n("#" + this.cid + "_" + e) : null
        },
        getCidElStr: function (e) {
            return e ? "#" + this.cid + "_" + e : null
        },
        getId: function () {
            return this.el.id
        },
        getRandomId: function () {
            return "view_" + Math.random()
        },
        setHtml: function (e) {
            this.el && (this.el.innerHTML = e, this.onUpdate())
        }
    }), n.extend(t.View, {
        getView: function (e) {
            return this.AllViews[e] || null
        },
        AllViews: {},
        registerView: function (e, t) {
            this.AllViews[e] = t
        }
    })
}(jQuery, M139);