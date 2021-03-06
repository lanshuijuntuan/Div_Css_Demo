function jsScroller(options) {
    for (var o = options.contentDom, w = options.width || $(o).width(), h = options.height || $(o).height(), callback = options.callback, initBar = options.initBar || !0, trackClass = options.trackClass || "scrollbar-track", handleClass = options.handleClass || "scrollbar-handle", scrollerContainer = options.scrollerContainer || "scroller-container", setInitBar = function () {
        if (!initBar)return !1;
        var e = options.contentDom, t = $(e).height(), i = $(e).find("." + scrollerContainer).height(), a = t, n = a * a / i;
        $(e).find("." + trackClass).height(a), $(e).find("." + handleClass).height(n)
    }, self = this, list = o.getElementsByTagName("div"), i = 0; i < list.length; i++)list[i].className.indexOf(scrollerContainer) > -1 && (o = list[i]);
    this._setPos = function (x, y) {
        with (x < this.viewableWidth - this.totalWidth && (x = this.viewableWidth - this.totalWidth), x > 0 && (x = 0), y < this.viewableHeight - this.totalHeight && (y = this.viewableHeight - this.totalHeight), y > 0 && (y = 0), this._x = x, this._y = y, o.style)left = this._x + "px", top = this._y + "px"
    }, this.reset = function () {
        with (setInitBar(o), this.content = o, this.totalHeight = o.offsetHeight, this.totalWidth = o.offsetWidth, this._x = 0, this._y = 0, o.style)left = "0px", top = "0px";
        callback && callback()
    }, this.scrollBy = function (e, t) {
        this._setPos(this._x + e, this._y + t)
    }, this.scrollTo = function (e, t) {
        this._setPos(-e, -t)
    }, this.stopScroll = function () {
        this.scrollTimer && window.clearInterval(this.scrollTimer)
    }, this.startScroll = function (e, t) {
        this.stopScroll(), this.scrollTimer = window.setInterval(function () {
            self.scrollBy(e, t)
        }, 40)
    }, this.swapContent = function (e, t, i) {
        o = e;
        for (var a = o.getElementsByTagName("div"), n = 0; n < a.length; n++)a[n].className.indexOf(scrollerContainer) > -1 && (o = a[n]);
        t && (this.viewableWidth = t), i && (this.viewableHeight = i), this.reset()
    }, this.content = o, this.viewableWidth = w, this.viewableHeight = h, this.totalWidth = o.offsetWidth, this.totalHeight = o.offsetHeight, this.scrollTimer = null, this.reset()
}
function jsScrollbar(options) {
    function findOffsetTop(e) {
        var t = 0;
        if (e.offsetParent)for (; e.offsetParent;)t += e.offsetTop, e = e.offsetParent;
        return t
    }

    var o = options.barDom, s = new jsScroller(options), a = options.auto || !0, ev = options.ev, onscroll = options.onscroll, upClass = options.upClass || "scrollbar-up", downClass = options.downClass || "scrollbar-down", trackClass = options.trackClass || "scrollbar-track", handleClass = options.handleClass || "scrollbar-handle", trackHoverClass = options.trackClass || "scrollbar-track-hover", handleHoverClass = options.handleClass || "scrollbar-handle-hover", self = this;
    this.reset = function () {
        with (this._parent = o, this._src = s, this.auto = a ? a : !1, this.eventHandler = ev ? ev : function () {
        }, this.onscroll = onscroll, this._up = this._findComponent(upClass, this._parent), this._down = this._findComponent(downClass, this._parent), this._yTrack = this._findComponent(trackClass, this._parent), this._yHandle = this._findComponent(handleClass, this._yTrack), this._trackTop = findOffsetTop(this._yTrack), this._trackHeight = this._yTrack.offsetHeight, this._handleHeight = this._yHandle.offsetHeight, this._x = 0, this._y = 0, this._scrollDist = 5, this._scrollTimer = null, this._selectFunc = null, this._grabPoint = null, this._tempTarget = null, this._tempDistX = 0, this._tempDistY = 0, this._disabled = !1, this._ratio = (this._src.totalHeight - this._src.viewableHeight) / (this._trackHeight - this._handleHeight), this._yHandle.ondragstart = function () {
            return !1
        }, this._yHandle.onmousedown = function () {
            return !1
        }, this._addEvent(this._src.content, "mousewheel", this._scrollbarWheel), window.navigator.userAgent.indexOf("Firefox") >= 0 && this._addEvent(this._src.content, "DOMMouseScroll", this._scrollbarWheel), this._removeEvent(this._parent, "mousedown", this._scrollbarClick), this._addEvent(this._parent, "mousedown", this._scrollbarClick), this._src.reset(), this._yHandle.style)top = "0px", left = "0px";
        this._moveContent(), this._src.totalHeight < this._src.viewableHeight ? (this._disabled = !0, this._yHandle.style.visibility = "hidden", this.auto && (this._parent.style.visibility = "hidden")) : (this._disabled = !1, this._yHandle.style.visibility = "visible", this._parent.style.visibility = "visible")
    }, this._addEvent = function (e, t, i) {
        e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent ? e.attachEvent("on" + t, i) : e["on" + t] = i
    }, this._removeEvent = function (e, t, i) {
        e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent ? e.detachEvent("on" + t, i) : e["on" + t] = null
    }, this._findComponent = function (e, t) {
        for (var i = t.childNodes, a = 0; a < i.length; a++)if (i[a].className && i[a].className == e)return i[a]
    }, this._scrollbarClick = function (e) {
        return self._disabled ? !1 : (e = e ? e : event, e.target || (e.target = e.srcElement), e.target.className.indexOf(upClass) > -1 ? self._scrollUp(e) : e.target.className.indexOf(downClass) > -1 ? self._scrollDown(e) : e.target.className.indexOf(trackClass) > -1 ? self._scrollTrack(e) : e.target.className.indexOf(handleClass) > -1 && self._scrollHandle(e), self._tempTarget = e.target, self._selectFunc = document.onselectstart, document.onselectstart = function () {
            return !1
        }, self.eventHandler(e.target, "mousedown"), self._addEvent(document, "mouseup", self._stopScroll, !1), !1)
    }, this._scrollbarDrag = function (e) {
        e = e ? e : event;
        var v = (parseInt(self._yHandle.style.top), e.clientY + document.body.scrollTop - self._trackTop);
        with (self._yHandle.style)v >= self._trackHeight - self._handleHeight + self._grabPoint ? top = self._trackHeight - self._handleHeight + "px" : v <= self._grabPoint ? top = "0px" : top = v - self._grabPoint + "px", self._y = parseInt(top);
        $(self._parent).find("." + trackClass).addClass(trackHoverClass), $(self._parent).find("." + handleClass).addClass(handleHoverClass), self._moveContent()
    }, this._scrollbarWheel = function (e) {
        e = e ? e : event;
        var t = 0;
        e.wheelDelta ? (e.wheelDelta >= 120 && (t = -1), e.wheelDelta <= -120 && (t = 1)) : e.detail && (e.detail >= 3 && (t = 3), e.detail < -3 && (t = -3)), self.scrollBy(0, 20 * t), e.returnValue = !1
    }, this._startScroll = function (e, t) {
        this._tempDistX = e, this._tempDistY = t, this._scrollTimer = window.setInterval(function () {
            self.scrollBy(self._tempDistX, self._tempDistY)
        }, 40)
    }, this._stopScroll = function () {
        self._removeEvent(document, "mousemove", self._scrollbarDrag, !1), self._removeEvent(document, "mouseup", self._stopScroll, !1), self._selectFunc ? document.onselectstart = self._selectFunc : document.onselectstart = function () {
            return !0
        }, self._scrollTimer && window.clearInterval(self._scrollTimer), self.eventHandler(self._tempTarget, "mouseup"), $(self._parent).find("." + trackClass).removeClass(trackHoverClass), $(self._parent).find("." + handleClass).removeClass(handleHoverClass), self.onscroll && self.onscroll()
    }, this._scrollUp = function (e) {
        this._startScroll(0, -this._scrollDist)
    }, this._scrollDown = function (e) {
        this._startScroll(0, this._scrollDist)
    }, this._scrollTrack = function (e) {
        var t = e.clientY + document.body.scrollTop;
        this._scroll(0, t - this._trackTop - this._handleHeight / 2)
    }, this._scrollHandle = function (e) {
        var t = e.clientY + document.body.scrollTop;
        this._grabPoint = t - findOffsetTop(this._yHandle), this._addEvent(document, "mousemove", this._scrollbarDrag, !1)
    }, this._scroll = function (e, t) {
        t > this._trackHeight - this._handleHeight && (t = this._trackHeight - this._handleHeight), 0 > t && (t = 0), this._yHandle.style.top = t + "px", this._y = t, this._moveContent(), this.onscroll()
    }, this._moveContent = function () {
        this._src.scrollTo(0, Math.round(this._y * this._ratio))
    }, this.scrollBy = function (e, t) {
        this._scroll(0, (-this._src._y + t) / this._ratio)
    }, this.scrollTo = function (e, t) {
        this._scroll(0, t / this._ratio)
    }, this.swapContent = function (e, t, i) {
        this._removeEvent(this._src.content, "mousewheel", this._scrollbarWheel, !1), this._src.swapContent(e, t, i), this.reset()
    }, this.reset()
}
!function (e, t, i) {
    var a = i.View.ViewBase, n = "Main.UserInfo.View";
    i.namespace(n, a.extend({
        name: n,
        el: "#userInfo",
        greetingTip: ["", '<div style="top: 95px; left:185px; z-index: 1000; width: 214px; position: absolute;display:none;" class="tipsLayer" id="tipsLayer">', '<div class="tipsLayerMain">', '<div class="tipsLayerMainInner tipsLayerShareBox">', "<dl><dd>", '<div class="tipsLayerShare">', '<a id="sinaShare" href="javascript:;" ><i class="i-conSina"></i>微博分享</a>', '<a id="mailShare" href="javascript:;" ><i class="i-conMail"></i>告诉朋友</a>', "</div>", "</dd></dl>", "</div>", "</div>", '<i class="i-tipsLayerArrow tipsTopArrow"></i>', '<div class="tipsLayerMain_div"></div>', "</div>"].join(""),
        initialize: function (e) {
            return a.prototype.initialize.apply(this, arguments)
        },
        render: function () {
            var e = this;
            return mainView.waitTopReady(function () {
                e.telCharge()
            }), this.greetingShare(), this.initEvents(), this
        },
        initEvents: function () {
            top.$App && top.$App.on("changeHeadImage", function (t) {
                top.$User.setHeadImageUrl(t.url), e("#userImg").attr({src: top.$User.getHeadImageUrl(t.url)})
            })
        },
        gotoChongZhiPage: function () {
            top.$App.show("mpostOnlineService", null, {
                title: "邮箱营业厅",
                key: "38159",
                inputData: {
                    urlParams: {oct: "ipos", oac: "iposorder"},
                    key: "38159",
                    columnId: "38159",
                    columnName: "邮箱营业厅"
                }
            })
        },
        telCharge: function () {
            var t = this;
            if (!top.SiteConfig.closeTelCharge) {
                var i = top.$User.getProvCode();
                e("#chargeNum").hide(), top.SiteConfig.billAllowProvince[i] ? e("#chargeQuery").show() : e("#chongZhi_li").html('话费充值：<span class="c_457fbd ml_5"><a id="chargeDetail" href="javascript:;" class="c_457fbd"><i class="i_iphone"></i>充值</a></span>'), e("#chargeDetail").click(function () {
                    t.gotoChongZhiPage()
                }), e("#chargeQuery").click(function () {
                    t._telChargeQuery()
                })
            }
        },
        _telChargeQuery: function (t) {
            var i = this;
            e("#chargeNum").show(), e("#chargeQuery").hide(), top.BH("telChargeHistory");
            var a = top.$App.get("billCharge");
            a && "string" == typeof a.balance && "null" != a.balance ? (e("#chargeNum strong").text(a.balance).css("cursor", "pointer"), this.addFeeBubble()) : top.M139.RichMail.API.call("mailoffice:getTipsinfo", null, function (t) {
                var a = t.responseData;
                a && "S_OK" === a.code && "string" == typeof a["var"].balance && "null" != a["var"].balance ? setTimeout(function () {
                    top.$App.set({billCharge: a["var"]}), top.$App.trigger({billChargeLoad: a["var"]}), e("#chargeNum strong").text(a["var"].balance).css("cursor", "pointer"), i.addFeeBubble()
                }, 0) : (e("#chargeNum").hide(), e("#chargeFail").show(), setTimeout(function () {
                    e("#chargeFail").hide(), e("#chargeQuery").show()
                }, 2e3))
            }, {method: "GET"})
        },
        greetingShare: function () {
            var t = this, i = e("#greeting").text(), a = (e("#greeting").offset(), t.greetingTip, "%23139邮箱微语录%23“" + i + "”——每次登录邮箱都能看到一句温暖或激励的话，内心有所触动。分享自@139邮箱  http://mail.10086.cn"), n = "http://service.weibo.com/share/share.php?url=&appkey=4XCvQX&pic=&title=" + a;
            e(this.el).append(t.greetingTip), setTimeout(function () {
                e("#greeting,#tipsLayer").mouseover(function () {
                    var t = e("#greeting").offset();
                    e("#tipsLayer").css({left: t.left + "px", top: t.top + 35 + "px"}), e("#tipsLayer").show()
                }), e("#greeting,#tipsLayer").mouseout(function () {
                    e("#tipsLayer").hide()
                }), e("#sinaShare").off().on("click", function () {
                    top.BH("greetings_blog_share"), e("#tipsLayer").hide(), window.open(n, "_blank")
                }), e("#mailShare").off().on("click", function () {
                    top.$App.show("compose", {
                        type: "share",
                        greetingString: e("#greeting").find("a").text()
                    }), top.BH("greetings_compose_share"), e("#tipsLayer").hide()
                })
            }, 50)
        },
        addFeeBubble: function () {
            var t = ['<div id="feeDetail" style="display: none;" class="tipsOther">', '<div class="tips-text">查看明细</div>', '<span class="tipsBottom"></span>', "</div>"].join("");
            e("#chongZhi_li").append(t), setTimeout(function () {
                e("#feeDetail").css({
                    left: e("#chargeDetail").position().left - 68 + "px",
                    top: e("#chargeDetail").position().top - 30 + "px"
                }).find(".tipsBottom").css({left: "22px"})
            }, 600), e("#chargeNum").hover(function () {
                e("#feeDetail").show()
            }, function () {
                e("#feeDetail").hide()
            }).click(function () {
                top.BH("telChargequery"), top.$App.show("googSubscription"), top.$App.show("mpostOnlineService", null, {
                    title: "邮箱营业厅",
                    key: "38159",
                    inputData: {
                        urlParams: {oct: "main", oac: "index"},
                        key: "38159",
                        columnId: "38159",
                        columnName: "邮箱营业厅"
                    }
                });
                try {
                    top.M139.RichMail.API.call(top.getDomain("image") + "subscribe/inner/bis/subscribe?sid=" + top.sid, '{"comeFrom":503,"columnId":38159}')
                } catch (e) {
                    console.log(e)
                }
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Main.Navigate.View";
    i.namespace(n, a.extend({
        name: n,
        el: "#navigate",
        events: {"click li[fid]": "onEntranceClick"},
        initialize: function (e) {
            return a.prototype.initialize.apply(this, arguments)
        },
        render: function () {
            return this.initEvents(), this
        },
        initEvents: function () {
            var t = this;
            e("#compose_new").on("click", function (e) {
                t.onComposeClick(e)
            })
        },
        onEntranceClick: function (t) {
            var i = t.currentTarget, a = e(i).attr("fid");
            top.$App.showMailbox(Number(a))
        },
        onReceiveLetterClick: function (e) {
        },
        onComposeClick: function (t) {
            t.preventDefault();
            var i = top.$App.getView("tabpage").model.pages;
            for (var a in i)if (a && a.indexOf("compose") >= 0) {
                var n = e(i[a].element).find("iframe")[0].contentWindow, s = n.mainView.model;
                try {
                    if ("compose" == s.get("pageType") && 1 == s.isBlankCompose())return void top.$App.activeTab(a)
                } catch (o) {
                }
            }
            return top.$App.show("compose"), !1
        },
        test: function () {
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Main.TimeSwitcher.View";
    i.namespace(n, a.extend({
        name: n,
        el: "#contentList",
        events: {},
        template: {loadingHTML: '<div id="div_calendar_load" class="createActivity mt_177"><img style="position:relative;top:3px;" class="mr_5" src="' + top.getRootPath() + '/images/global/load.gif">加载中...</div>'},
        initialize: function (e) {
            var t = new Date;
            return this.curDay = t.getDate(), this.curYear = t.getFullYear(), a.prototype.initialize.apply(this, arguments)
        },
        render: function () {
            return this.initEvents(), (e.browser.mozilla || e.browser.webkit || $B.is.ie && $B.getVersion() > 8) && this.initShortcutContainer(), this
        },
        initShortcutContainer: function () {
            var t = e(".welcomeNewSon_leftCon"), i = ['<div class="modBox new-quick-reply clearfix" id="replyContainer">', '<div class="readMailReplyMes-w">', '<textarea class="readMailReplyMes" style="overflow-y: hidden;">@TA，直接写邮件</textarea>', "</div>", '<div class="btnBox btnNewGreen" id="sendEmailBtn" hasSend="true">发送</div>', "</div>"].join("");
            t.before(i), this.bindEvents()
        },
        bindEvents: function () {
            function t() {
                return n.parent().width() - 54 - 28 - 10 - 8
            }

            var a = this, n = e("#replyContainer"), s = n.find("textarea"), o = n.find(".readMailReplyMes-w");
            n.find("#sendEmailBtn").click(function () {
                top.M139.UI.TipMessage.show("请输入内容@TA一下，快速发送", {delay: 2e3, className: "msgRed"})
            }), window.mainView && window.mainView.unbind("atContainerRender").on("atContainerRender", function () {
                s.is(":visible") ? o.width(t()) : o.width(t() + 54 + 4), s.unbind("focus").focus(function () {
                    return !n.hasClass("focus") && n.addClass("focus"), o.width(t() + 54 + 4), a.shortCutObj ? void a.shortCutObj.render() : void i.core.utilCreateScriptTag({
                        id: "shortCutAt",
                        src: "/m2015/js/packs/m139.shortCutSend.pack.js",
                        charset: "utf-8"
                    }, function () {
                        a.shortCutObj = new Welcome.ShortCutSend.View({container: n}).on("onBlur", function () {
                            o.width(t())
                        })
                    })
                })
            })
        },
        reloadRemindList: function (t) {
            var i = location.href.replace(/\?.+/gi, "?type=remindlist&date=" + t + "&sid=" + top.sid + "&rnd=" + Math.random());
            e.get(i, function (t) {
                e(document.body).append(t)
            })
        },
        initEvents: function () {
            var t = this, i = new Date, a = this.getDateStr(i);
            e("#currDayTitle").attr("timestamp", +i).find(".mailListHeader li:eq(0)").html(a), setInterval(function () {
                (new Date).getDate() != t.curDay && t.updateTitleDate()
            }, 1e4), this.on("request", function (i) {
                var a = $Date.getServerTime(), n = $Date.format("yyyy-MM-dd", i), s = new Date(a.setDate(a.getDate())), o = new Date(a.setDate(a.getDate() + 1));
                s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0), o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0), s > i ? (e(".mailList_con").show(), window.mailListView.reloadMailList(n)) : i >= s && o > i ? (e(".mailList_con").show(), window.mailListView.reloadMailList(n), t.reloadRemindList(n), e("#remindList").show()) : e(".mailList_con").hide()
            })
        },
        updateTitleDate: function () {
            var t = new Date, i = new Date(t - 864e5), a = new Date(+t + 864e5);
            e("#prevDayTitle").attr("timestamp", +i).find(".mailListHeader_title").html(this.getDateStr(i)), e("#nextDayTitle").attr("timestamp", +a).find(".mailListHeader_title").html(this.getDateStr(a))
        },
        onSelectChange: function (t) {
            var i, a = e(t.currentTarget);
            i = parseInt(a.attr("timestamp")), i && (this.switchDate(new Date(i)), document.body.scrollTop = 0, document.documentElement && (document.documentElement.scrollTop = 0), BH("welcome_select_day"))
        },
        switchDate: function (t) {
            var i;
            e("#unread").hide(), i = this.getDateStr(t), e("#scrollbar-container").hide(), e(".welcomeNewSon_right").removeClass("welcomeFixed"), e("body").removeData("indexTipsCount"), e("#tip_pns, #addTaskTips,#messageEmpty").remove(), e("#remindList, #mailListContainer").html(""), e(".mailListCon_btn").hide(), e("#loading_more").show(), e("#list_header span").html(i), e("#currDayTitle").attr("timestamp", +t), e(".i-triangleNewWel").animate({left: e("#list_header").position().left + e("#list_header").width() / 2}), e(".relatedTome").remove(), -1 != i.indexOf("今天") && (e("#prevDayTitle .mailListHeaderCon>span").filter(function () {
                return "none" != this.style.display
            }).length && e("#prevDayTitle").show(), e("#nextDayTitle .mailListHeaderCon>span").filter(function () {
                return "none" != this.style.display
            }).length && e("#nextDayTitle").show()), this.loadData(t), window.calendarIndexView.onSetDate(t), window.selectedDate = t, BH("welcome_select_day")
        },
        loadData: function (t) {
            var i = this.template.loadingHTML;
            this.trigger("request", t), mainView.adjustContentListHeight(function () {
                e(".mailListCon_btn").hide(), e("#mailListContainer").html(i)
            })
        },
        getDateStr: function (t) {
            var i, a, n, s = "";
            if (t instanceof Date != 0) {
                var o = new Date;
                o.setHours(0), o.setMinutes(0), o.setSeconds(0), o.setMilliseconds(0), a = t - o, n = 864e5, a >= -n && 0 > a ? s = "昨天" : a >= 0 && n > a ? s = "今天" : a >= n && 2 * n > a && (s = "明天"), i = t.getFullYear(), s ? s += i == this.curYear ? " <span>(" + $Date.format("M月dd日", t) + ")</span>" : " <span>(" + $Date.format("yyyy年M月dd日", t) + ")</span>" : s = i == this.curYear ? $Date.format("M月dd日", t) : $Date.format("yyyy年M月dd日", t);
                var r = e("body").data("isFirst");
                return "true" != r ? (s = "<span>未读的邮件和消息</span>", e("body").data("isFirst", "true"), e("body").data("isFirstLoad", "true")) : e("body").removeData("isFirstLoad"), s
            }
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Main.View";
    i.namespace(n, a.extend({
        name: n, initialize: function (e) {
            return a.prototype.initialize.apply(this, arguments)
        }, render: function () {
            this.userInfoView = new Main.UserInfo.View, this.navgateView = (new Main.Navigate.View).render(), this.timeSwitcherView = (new Main.TimeSwitcher.View).render(), this.remindList = new Welcome.RemindList.View, this.maildynamic = new Welcome.Maildynamic.View, this.remindListView = (new Welcome.RemindList.View).render(), this.initEvents(), top.BH("welcome_new_load");
            var t = this;
            setTimeout(function () {
                t.advertisingShow()
            }, 5e3);
            return e("#advertising").click(function () {
                t.advertisingClick(advertising)
            }), e("#advertising2").click(function () {
                t.advertisingClick(advertising2)
            }), e(function () {
                var t = "welcome_ad_click", i = e("#advertising a").eq(0), a = i.attr("data-link");
                i.attr("data-public") && (t = i.attr("data-public")), a && (a = "http://smsrebuild1.mail.10086.cn/weather/weather?func=user:logBehaviorAction&key=" + t + "&version=m2012&tourl=" + encodeURIComponent(a), i.attr("href", a))
            }), i.Timing.waitForReady('top.$App.getConfig("UserData").orderInfoList', function () {
                "CleanMailbox" == top.$App.isclearSkinUser() && top.$App.getCommConfig({configId: 610}, function (t) {
                    var i = {configId: 610, configValue1: 0, configValue2: ""};
                    "S_OK" == t.code && (0 == t["var"].length && (t["var"][0] = i), 0 == t["var"][0].configValue1 ? e("#mainContainer").find("#advertising2, #advertising").addClass("hide") : e("#mainContainer").find("#advertising2, #advertising").removeClass("hide"))
                })
            }), this.initMobileApp(), e(".calendarWeather").hide(), e("#bottomLink .wfLine:eq(4)").before("<span class='wfLine'>|</span><a href='http://mail.10086.cn/agreement.html' target='_blank'>用户协议</a>"), this
        }, initMobileApp: function () {
            function t() {
                e("#mcloud").click(function (e) {
                    "i_set" != e.target.className && a("mcloud")
                }), e("#note").click(function (e) {
                    "i_set" != e.target.className && top.$App.show("note")
                }), e("#addr").click(function (e) {
                    "i_set" != e.target.className && a("addr")
                }), e("#smsSend").click(function (e) {
                    "i_set" != e.target.className && (top.BH("left_sms"), top.$App.show("sms"))
                }), e("#Mobilebill").click(function (e) {
                    "i_set" != e.target.className && top.$App.showBill(2)
                }), e("#oneStopmail").click(function (e) {
                    "i_set" != e.target.className && (top.BH("onestand_welcome"), top.$App.showBill(14))
                })
            }

            function a(t) {
                var i = e("#umcboxpluginbar .newLogoInfo_a", top.document);
                if (i.length > 0) {
                    switch (i[0].click(), t) {
                        case"fetion":
                            e(".feibar", top.document).parent()[0].click();
                            break;
                        case"mcloud":
                            e(".caibar", top.document).parent()[0].click();
                            break;
                        case"message":
                            e(".yyxxIco", top.document).parent()[0].click();
                            break;
                        case"addr":
                            e(".txbar", top.document).parent()[0].click()
                    }
                    e("#umcpassportplugin", top.document).hide()
                }
            }

            var n = this, s = ['<li><a href="javascript:void(0);" id="smsSend"><i class="i_iconInfo"></i><span>发短信</span></a></li>', '<li><a href="javascript:void(0);" id="Mobilebill"><i class="i_icoBill"></i><span>移动账单</span></a></li>', '<li><a href="http://feixin.10086.cn/rcs/" target="_blank" id="fetion" bh="welcome_fetion"><i class="i_icoFetion"></i><span>和飞信</span></a></li> ', '<li><a href="http://caiyun.feixin.10086.cn/" target="_blank" id="mcloud" bh="welcome_mcloud"><i class="i_icoAndCloud"></i><span>和彩云</span></a></li>', '<li><a href="javascript:void(0);" id="note"><i class="i_icoAndNote"></i><span>和笔记</span></a></li>', '<li><a href="http://pim.10086.cn/" target="_blank" id="addr" bh="welcome_pim"><i class="i_icoAndCommunication"></i><span>和通讯录</span></a></li>'].join(""), o = ['<li><a href="javascript:void(0);" id="smsSend"><i class="i_iconInfo"></i><span>发短信</span></a></li>', '<li><a href="javascript:void(0);" id="oneStopmail"><i class="i-cmcc"></i><span>{0}</span></a></li>', '<li><a href="http://feixin.10086.cn/rcs/" target="_blank" id="fetion" bh="welcome_fetion"><i class="i_icoFetion"></i><span>和飞信</span></a></li> ', '<li><a href="http://caiyun.feixin.10086.cn/" target="_blank" id="mcloud" bh="welcome_mcloud"><i class="i_icoAndCloud"></i><span>和彩云</span></a></li>', '<li><a href="javascript:void(0);" id="note"><i class="i_icoAndNote"></i><span>和笔记</span></a></li>', '<li><a href="http://pim.10086.cn/" target="_blank" id="addr" bh="welcome_pim"><i class="i_icoAndCommunication"></i><span>和通讯录</span></a></li>'].join("");
            e(".menuOperating_list").children(":gt(1)").remove(), i.Timing.waitForReady("top.$App && top.$App.requireUserData", function () {
                function a() {
                    return top.$User.getProvText() + "移动"
                }

                function r(e) {
                    function t() {
                        new Welcome.NavigateSetting.View({mainView: n}).render(e)
                    }

                    document.getElementById("navigateSetting") ? t() : i.core.utilCreateScriptTag({
                        id: "navigateSetting",
                        src: top.getRootPath() + "/js/richmail/welcome_v4/welcome.navigate.setting.view.js?v=" + top.sid,
                        charset: "utf-8"
                    }, t)
                }

                function l(t) {
                    var i = t.split("");
                    e(".menuOperating_list li").each(function (t, a) {
                        var n = t - 2;
                        n >= 0 && ("0" == i[n] ? e(a).hide() : e(a).show())
                    }), "000000" == t ? (e("#navMore").remove(), e(".menuOperating_list").after("<div style='' id='navMore'><a href='javascript:' id='welcome_navMore' bh='welcome_navset_more'><span><i class=\"i-sidebar-set\"></i>设置</span></a></div>"), e("#welcome_navMore").click(function () {
                        r()
                    })) : e("#navMore").remove()
                }

                top.$User.isChinaMobileUser() ? (o = top.$T.Utils.format(o, [a()]), e(".menuOperating_list").append(o)) : e(".menuOperating_list").append(s), t(), e(".menuOperating_list li").on("mouseenter", function (t) {
                    var i = e(t.target).closest("li").index();
                    i >= 2 && e(this).find("a").append('<i class="i_set"></i>')
                }).on("mouseleave", function () {
                    e(this).find(".i_set").remove()
                }), e(".menuOperating_list").on("click", function (t) {
                    if ("i_set" == t.target.className) {
                        t.stopPropagation(), t.preventDefault();
                        var i = e(t.target).parents("li").index() - 2;
                        r(i)
                    }
                }), top.$App.requireUserData(function () {
                    var e = top.$App.getCustomAttrs("welcomeNav");
                    "" != e && l(e)
                }), n.on("saveSetting", function (e) {
                    l(e.value)
                }), i.core.utilCreateScriptTag({src: top.getRootPath() + "/js/richmail/welcome_v4/webbar.js"}, function () {
                    i.RichMail.API.call("umc:getArtifact", {}, function (e) {
                        var t = e.responseData;
                        if ("S_OK" == t.code) {
                            var i = t["var"].artifact;
                            getAndVerifyToken(i)
                        }
                    })
                })
            }), i.Timing.waitForReady('top.$("#umcboxpluginbar .newLogoInfo_a").length>0', function () {
                top.$("#umcboxpluginbar .newLogoInfo_a").length > 0 && e("#mcloud,#message,#addr").attr({
                    target: "_self",
                    href: "javascript:"
                })
            })
        }, replaceAdData: function (e) {
            function t(e) {
                e.content = e.content.replace(/\$cid\$/g, e.contentId), e.content = e.content.replace(/\$thingId\$/g, e.thingId), e.content = top.$T.Html.decode(e.content), e.content.indexOf("$behaviorUrl$") && (e.content = e.content.replace(/\$behaviorUrl\$/g, top.getDomain("rebuildDomain") + "/weather/weather?func=user:logBehaviorAction&sid=" + top.sid + "&version=m2012")), "https:" == window.location.protocol && e.content.indexOf("https://monitor.cm-analysis.com/") && (e.content = e.content.replace("https://monitor.cm-analysis.com/", "https://monitor.cm-analysis.com:8081/"), e.content = e.content.replace("https://track.cm-analysis.com/", "https://track.cm-analysis.com:8081/"))
            }

            var i = e[0];
            for (elem in e)if (elem.indexOf("web_") >= 0) {
                var i = e[elem][0];
                if (i)if (i.content)t(i); else if (i.contentList)for (var a = 0; a < i.contentList.length; a++)t(i.contentList[a])
            }
            if (!top.addBehaviorExt) {
                var n = this;
                top.addBehaviorExt = function (e) {
                    n.waitTopReady(function () {
                        top.BH({actionId: e.actionId, thingId: e.thingId, module: "25", pageId: "24"})
                    })
                }
            }
        }, closeGuideTips: function () {
            e(top.document).find(".guideContainer").addClass("hide"), e(top.document).find("#index_layer_mask").addClass("hide")
        }, showNavGuide: function () {
            var t = e(top.document).find("#new_index_nav_guide"), i = 0, a = 4;
            t.css({top: i, right: a}).removeClass("hide")
        }, showMsgGuide: function () {
            var t = e(top.document).find("#new_index_msg_guide"), i = e(".welcomeNewSon_left").offset(), a = parseInt(i.top) + 64, n = parseInt(i.left) - 10;
            t.css({top: a, left: n}).removeClass("hide")
        }, showPersonalGuide: function () {
            var t = e(top.document).find("#new_index_personal_guide"), i = e(".welcomeNew_left").offset(), a = parseInt(i.top) + 64, n = parseInt(i.left) - 22;
            t.css({top: a, left: n}).removeClass("hide")
        }, showCalendarGuide: function () {
            var t = e(top.document).find("#new_index_calendar_guide"), i = e(".welcomeNewSon_right").offset(), a = parseInt(i.top) + 64, n = parseInt(i.left) - 682;
            t.css({top: a, left: n}).removeClass("hide")
        }, initGuideTips: function () {
            var t = this, i = ['<div id="index_layer_mask" class="layer_mask hide" style="overflow: hidden; z-index: 5009; opacity: 0.5;"></div>   ', '<div class="guideContainer guideIdx hide" id="div_old_to_new_guide">', '<a class="guide_closeBtn" href="javascript:;" id="btn_old_guide_close" bh="old_welcome_show_close"></a>', '<a class="guide_btnLink"  href="javscript:;"  id="btn_to_new_link" bh="old_welcome_show_click"></a>', "</div>", "<!-- 导航引导 -->", '<div id="new_index_nav_guide" step="1" class="guideContainer guideNav hide" style="top:0;right:4px;">', '<a class="guide_closeBtn" href="javascript:;" bh="new_home_search_close"></a>', '<a class="guide_btnLink" href="javscript:;" bh="new_home_search_next"></a>', "</div>", "<!-- 新增消息区引导 -->", '<div id="new_index_msg_guide"  step="2" class="guideContainer guideMsg hide" style="top:79px;left:305px;">', '<a class="guide_closeBtn" href="javascript:;" bh="new_home_msg_close"></a>', '<a class="guide_btnLink" href="javscript:;" bh="new_home_msg_next"></a>', "</div>", "<!-- 个人信息引导 -->", '<div id="new_index_personal_guide" step="3"  class="guideContainer personMsg hide" style="top:78px;left:82px;">', '<a class="guide_closeBtn" href="javascript:;" bh="new_home_person_close"></a>', '<a class="guide_btnLink" href="javscript:;" bh="new_home_person_next"></a>', "</div>", "<!-- 日历引导 -->", '<div id="new_index_calendar_guide" step="4" class="guideContainer calendarMsg hide" style="top:74px;left:106px;">', '<a class="guide_closeBtn" href="javascript:;" bh="new_home_cal_close"></a>', '<a class="guide_btnLink" href="javscript:;" bh="new_home_cal_next"></a>', "</div>"].join("");
            0 == e(top.document).find("#index_layer_mask").length && e(top.document.body).append(i);
            var a = function (i) {
                switch (e(top.document).find("#index_layer_mask").removeClass("hide"), e(top.document).find(".guideContainer").addClass("hide"), i) {
                    case 2:
                        t.showMsgGuide();
                        break;
                    case 3:
                        t.showPersonalGuide();
                        break;
                    case 4:
                        t.showCalendarGuide();
                        break;
                    case 5:
                        t.closeGuideTips();
                        break;
                    case 1:
                    default:
                        t.showNavGuide()
                }
            };
            a(1), e(top.document).find(".guide_closeBtn").click(function () {
                t.closeGuideTips()
            }), e(top.document).find(".guide_btnLink").click(function () {
                var t = e(this).parent().attr("step");
                return t = parseInt(t) + 1, a(t), !1
            })
        }, initEvents: function () {
            function i(e) {
                var t = "", i = "";
                document.domain;
                return i = top.getDomain("mail") || "", i && (t = i + "/login/switchto.aspx?sid=" + top.$App.getSid() + "&v=3"), t
            }

            var a = e(top.document).find("#welcome").height();
            e("#mainContainer").height(a);
            e("#back_to_today,.back_to_today").live("click", function (t) {
                e("body").data("selectDate", (new Date).format("yyyy-MM-dd")), mainView.timeSwitcherView.switchDate(new Date)
            });
            var n = "6";
            e(top.document).find("#btn_base").attr("href", i(n));
            var s, o = '<a href="javascript:;" class="i-backTop" style="display:none;" title="回到顶部" hidefocus=""></a>', r = e(document.body);
            this.waitTopReady(function () {
                s = top.$("#welcome").after(o).parent().find("a.i-backTop"), s.on("click", function () {
                    r.animate({scrollTop: 0}, 300, function () {
                        s.fadeOut(300)
                    }), document.documentElement.scrollTop > 0 && (document.documentElement.scrollTop = 0)
                })
            });
            var l = t.throttle(function () {
                if (s) {
                    var t = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    t > 3 ? s.fadeIn(0) : s.fadeOut(300);
                    var i = e(window).height();
                    document.body.scrollTop > 600 || document.documentElement.scrollTop > 600 ? (e("#userInfo").css({
                        position: "fixed",
                        top: "10px",
                        width: "240px",
                        left: ""
                    }), i > 380 && e("#navigate").css({
                        position: "fixed",
                        top: "222px",
                        width: "240px",
                        left: ""
                    })) : e("#userInfo,#navigate").css({
                        position: "inherit",
                        top: "0px",
                        left: ""
                    }), document.body.scrollTop > 753 || document.documentElement.scrollTop > 753 ? (e("#div_magazine").css({
                        position: "fixed",
                        top: "0px",
                        right: ""
                    }), i > 360 && e("#advertising").css({
                        position: "fixed",
                        top: "179px",
                        right: ""
                    })) : e("#div_magazine,#advertising").css({position: "inherit", top: "0px", right: ""})
                }
            }, 100);
            e(document).scroll(l), e(top.document).find("#msgBoxClick").hide(), top.M139.Timing.waitForReady("$App.getConfig('UserData')", function () {
                var e = top.$User.isGrayUser();
                return e ? !1 : void 0
            }), e(window).resize(function () {
                $B.is.safari && setTimeout(function () {
                    var t = e(window).width(), i = e(".welcomeNew").width(), a = (t - i) / 2;
                    a > 0 && "fixed" == e("#div_magazine,#advertising").css("position") && (e("#userInfo,#navigate").css("left", a), e("#div_magazine,#advertising").css("right", a))
                }, 100)
            })
        }, waitList: [], waitIntervalId: null, waitTopReady: function (e) {
            this.waitList.push(e);
            var t = this;
            this.waitIntervalId || (this.waitIntervalId = setInterval(function () {
                if ("complete" == top.document.readyState) {
                    clearInterval(t.waitIntervalId);
                    for (var e = 0; e < t.waitList.length; e++)t.waitList[e].call(t)
                }
            }, 300))
        }, ajaustActivityHeight: function () {
        }, adjustContentListHeight: function (t) {
            e(".mailList_con")
        }, advertisingShow: function () {
            var t = this, i = [], a = 1, n = [], s = e("#advertising2").find("a"), o = s.attr("tagid") || "", r = s.attr("buyerid") || "", l = s.attr("contentid") || "", d = e("#advertising").find("a"), c = d.attr("tagid") || "", m = d.attr("buyerid") || "", p = d.attr("contentid") || "", h = e("#wrapper").find("a"), u = h.attr("tagid") || "", f = h.attr("buyerid") || "", v = h.attr("contentid") || "", g = top.mwUnifiedPositionContent;
            o && (n.push(l), i.push({
                tagId: o,
                buyerId: r
            })), c && (!p && g && (p = g["var"].web_163[0].contentId), n.push(p), i.push({
                tagId: c,
                buyerId: m
            })), u && (n.push(v), i.push({
                tagId: u,
                buyerId: f
            })), n = n.join(), "" === o && "" === c && "" === u || t.unifiedLogRepot(i, a, n)
        }, advertisingClick: function (t) {
            var i = this, a = [], n = 2, s = "", o = e(t).find("a"), r = o.attr("tagid") || "", l = o.attr("buyerid") || "", s = o.attr("contentId") || "";
            r && (a.push({tagId: r, buyerId: l}), i.unifiedLogRepot(a, n, s))
        }, unifiedLogRepot: function (e, t, i) {
            var a = {positionCode: i, eventType: t, comeFrom: "2", ads: e, version: "1.0"};
            top.M139.RichMail.API.call("unified:logreport", a, function (e) {
                e.responseData.code && "S_OK" == e.responseData.code && console.log("统一位置行为日志上报成功")
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = e, n = i.View.ViewBase;
    i.namespace("M2012.UI.Picker.CalendarIndex", n.extend({
        initialize: function (t) {
            this.options = t || {}, this.callback = t.callback, this.stopPassDate = t.stopPassDate, t.value ? this.value = t.value : this.value = new Date;
            var i = e(t.template || this.template);
            return this.setElement(i), t.container && this.render(), this.initEvent(), n.prototype.initialize.apply(this, arguments)
        },
        name: "M2012.UI.Picker.CalendarIndex",
        template: ['<div class="calendarMod_top" style="position: relative; z-index:999999">', '<a href="javascript:;" class="i_icoPre preMonth" bh="welcome_prev_month"></a>', '<a href="javascript:;" class="calendarMod_topTime"></a>', '<a href="javascript:;" class="i_icoNext nextMonth" bh="welcome_next_month"></a>', '<ul id="ulSelectYear"  class="selectList hide" style="width:50px;top:36px;left:71px; height:auto; overflow:auto;z-index:999999;"></ul>', '<ul id="ulSelectMonth" class="selectList hide" style="width:44px;top:36px;left:129px;z-index:9999999;overflow-x:hidden;"></ul>', "</div>", '<table border="0" cellspacing="1" cellpadding="0" class="calendarModTable" style="position: relative; z-index:0">', "<thead>", "<tr>", "<th>日</th>", "<th>一</th>", "<th>二</th>", "<th>三</th>", "<th>四</th>", "<th>五</th>", "<th>六</th>", "</tr>", "</thead>", "<tbody>", "</tbody>", "</table>"].join(""),
        events: {
            "click a.preMonth": "onPrevMonthClick",
            "click a.nextMonth": "onNextMonthClick",
            "click td": "onDateClick"
        },
        render: function () {
            return this.updateContent(this.value), this.render = function () {
                return this
            }, this.$el.appendTo(this.options.container || document.body), n.prototype.render.apply(this, arguments)
        },
        initEvent: function () {
            var e = this;
            a(document).click(function (t) {
                e.onDocumentClick(t)
            })
        },
        onDocumentClick: function (e) {
            var t = a(e.target).hasClass("calendarMonth"), i = a(e.target).hasClass("calendarYear"), n = a(e.target).hasClass("selectList");
            if (!(t || i || n)) {
                var s = this.$("#ulSelectYear"), o = this.$("#ulSelectMonth");
                s.addClass("hide"), o.addClass("hide"), a("em.calendarMonth").removeClass("hover"), a("em.calendarYear").removeClass("hover")
            }
        },
        isMinMonth: function () {
            var e = (new Date).getFullYear() - 1, t = 1, i = new Date(this.curValue).getFullYear(), a = new Date(this.curValue).getMonth() + 1;
            return e === i && t === a
        },
        isMaxMonth: function () {
            var e = (new Date).getFullYear() + 1, t = 12, i = new Date(this.curValue).getFullYear(), a = new Date(this.curValue).getMonth() + 1;
            return e === i && t === a
        },
        showMonthIcon: function () {
            this.isMaxMonth() ? a(".nextMonth").addClass("i_icoNextB").removeClass("i_icoNext") : this.isMinMonth() ? a(".preMonth").removeClass("i_icoPre").addClass("i_icoPreB") : (a(".preMonth").removeClass("i_icoPreB").addClass("i_icoPre"), a(".nextMonth").removeClass("i_icoNextB").addClass("i_icoNext"))
        },
        onPrevMonthClick: function () {
            this.isMinMonth() || (this.curValue.setDate(0), this.updateContent(this.curValue))
        },
        onNextMonthClick: function () {
            this.isMaxMonth() || (this.curValue.setDate(32), this.updateContent(this.curValue))
        },
        onSelectYearClick: function () {
            var e = this, t = this.$("#ulSelectYear"), i = this.$("#ulSelectMonth");
            t.removeClass("hide"), i.addClass("hide"), a("em.calendarMonth").removeClass("hover"), a("em.calendarYear").addClass("hover"), t.children("li").click(function () {
                return "" == a(this).text() ? (console.log("year is null"), !1) : (e.curValue.setFullYear(parseInt(a(this).text())), e.updateContent(e.curValue), t.addClass("hide"), void a("em.calendarYear").removeClass("hover"))
            })
        },
        onSelectMonthClick: function () {
            var e = this, t = this.$("#ulSelectYear"), i = this.$("#ulSelectMonth");
            t.addClass("hide"), i.removeClass("hide"), a("em.calendarMonth").addClass("hover"), a("em.calendarYear").removeClass("hover"), i.children("li").click(function () {
                return "" == a(this).text() ? (console.log("month is null"), !1) : (e.curValue.setMonth(parseInt(a(this).text()) - 1), e.updateContent(e.curValue), i.addClass("hide"), void a("em.calendarMonth").removeClass("hover"))
            })
        },
        updateContent: function (e) {
            var t = '<em class="calendarYear">' + e.format("yyyy") + "</em>年", i = '<em class="calendarMonth">' + e.format("MM") + "</em>月";
            this.$("tbody").html(this.getCalendarHTML(e));
            this.$("tbody").children("tr").length;
            this.$(".calendarMod_topTime").html(t + i), this.curValue = new Date(e), this.selectYearAndMonth(e), this.showMonthIcon(), this.todaySelectedCell(e), this.focusSelectedCell(), this.callback && this.callback(e)
        },
        selectYearAndMonth: function () {
            for (var e = "", t = "", i = new Date, a = i.getFullYear(), n = 12; n >= 1; n--)e += "<li>" + n + "</li>";
            for (var n = a + 1; n >= a - 1; n--)t += "<li>" + n + "</li>";
            this.$("#ulSelectMonth").html(e), this.$("#ulSelectYear").html(t)
        },
        focusAndSetDate: function (e) {
            var t = this.curValue.getMonth(), i = this.curValue.getFullYear(), a = e.getMonth(), n = e.getFullYear(), s = e.getDate();
            if (n == i && a == t)this.focusSelectedCell(e); else {
                var o = new Date(this.curValue);
                this.value = e, o.setYear(s), o.setMonth(s), o.setDate(s), this.updateContent(e)
            }
        },
        focusSelectedCell: function (e) {
            var t = "";
            t = e ? e.getDate() : this.value.getDate();
            var i = this.value.getMonth() + 1, n = this.value.getFullYear(), s = parseInt(a("em.calendarMonth").text()), o = a("em.calendarYear").text(), r = this.$("td[rel='" + t + "']").find("span");
            isNaN(s) && (s = i, o = n), this.$("td[rel]").find("span").removeClass("calendarMod_focus"), i == s && n == o && r.addClass("calendarMod_focus"), r.hasClass("calendarMod_on") && r.next().remove(), this.$("td[rel]").find(".calendarMod_on").each(function () {
                var e = a(this).parent().attr("rel");
                a(this).hasClass("calendarMod_on") && t != e && (a(this).parent().find("i").remove(), a(this).after("<i></i>"))
            })
        },
        todaySelectedCell: function () {
            var e = (new Date).getDate(), t = (new Date).getMonth() + 1, i = (new Date).getFullYear(), n = parseInt(a("em.calendarMonth").text()), s = a("em.calendarYear").text();
            isNaN(n) && (n = t, s = i), t == n && i == s && this.$("td[rel='" + e + "']").find("span").addClass("calendarMod_today")
        },
        calendarActionCell: function (e) {
            var t = "<span>" + e + "</span><i></i>";
            this.$("td[rel='" + e + "']").html(t).attr("action", "true"), this.$("td[rel='" + e + "']").find("span").addClass("calendarMod_on")
        },
        onDateClick: function (e) {
            var t = e.target, i = a(t).text();
            if (/\d+/.test(i)) {
                var n = new Date(this.curValue);
                n.setDate(i), this.value = n, this.focusSelectedCell(), this.onSelect(n)
            }
        },
        onSelect: function (e, t) {
            void 0 === e && (this.getValue ? e = this.getValue() : this.getSelectedValue && (e = this.getSelectedValue())), this.trigger("select", {
                value: e,
                index: t
            })
        },
        compareMonth: function (e, t) {
            return e.getFullYear() > t.getFullYear() ? 1 : e.getFullYear() < t.getFullYear() ? -1 : e.getMonth() - t.getMonth()
        },
        isCurrentMonth: function (e) {
            var t = new Date;
            return e.getMonth() == t.getMonth() && e.getFullYear() == t.getFullYear()
        },
        getCalendarHTML: function (e) {
            var t = i.Date.getDaysOfMonth(e), a = i.Date.getFirstWeekDayOfMonth(e), n = [], s = t + a;
            this.stopPassDate, (new Date).getDate();
            n.push("<tr>");
            for (var o = 1, r = 1; s >= o; o++, r++)o > a && t >= r ? n.push("<td rel='" + r + "'><span>" + r + "</span></td>") : (n.push("<td style='cursor: default;'></td>"), r--), o % 7 != 0 && o != s || n.push("</tr>");
            return n.join("")
        }
    })), e.extend(M2012.UI.Picker.CalendarIndex, {
        create: function (e) {
            var t = new M2012.UI.Picker.CalendarIndex(e);
            return t
        }
    })
}(jQuery, _, M139), function (e, t, a) {
    var n = e, s = a.View.ViewBase;
    a.namespace("M2012.Welcome.Calendar.View", s.extend({
        template: ['<div class="calendarIndexDiv">', '    <div class="clearfix" style=""><ul class="calendarRemind_list mailList_con_ul">', "        {calendarList}", "    </ul></div>", "</div>"].join(""),
        templateLi: ['<li class="liCarlendar" seqno="{seqno}" rid="{rid}" mid="{mid}" id="{id}">', '   <div class="mailListConBox clearfix">', '       <a href="javascript:;" class="mailListConBox_img"><img src="', top.getRootPath(), '/images/module/welcome/{icon}"></a>   ', '       <div class="mailListConBox_info clearfix">', '           <div class="mailListConBox_infoLeft">', '               <ul class="mailListConBox_listOne">', '                   <li mid="{mid}" class="ellipsis">', '                   {time} "<strong class="themeTwo">{title}</strong>" {defaultText}</li>', "               </ul>", "        </div>", "   </div>", "</li>"].join(""),
        templateSpecial: ['<li class="liCarlendar" seqno="{seqno}" rid="{rid}" mid="{mid}" id="{id}">', '   <div class="mailListConBox clearfix {clazz}">', '       <a href="javascript:;" class="mailListConBox_img"><img src="', top.getRootPath(), '/images/module/welcome/{icon}"></a>   ', '<div class="eventCard clearfix ">', '<div class="eventImg"><img src="{src}" alt="" title=""></div>', '<div class="eventInfo">', '<div class="eventInfoList">', "{eventInfoList}", "</div>", "</div>", "</div>", "   </div>", "</li>"].join(""),
        templateEmpty: ['<div class="calendarIndexDiv" style="padding-bottom: 14px;">', '    <div class="mailListHeader clearfix" style="">', '       <strong class="calendarRemind_time mailListHeader_title">{date}</strong>', "   </div>", "{content}", "</div>"].join(""),
        templateAdd2: ['<div id="addTaskTips" class="modBox mt_8 addTaskTips" style="height: 593px;"><div class="addTaskTipsCon">', '<i class="i-addTaskTips"></i>', '<div class="addTaskTips_txt">', "<p>重要事情怕忘记？<br>随手添加至待办事项</p>", '<div class="addTaskBtn" onclick="{href}"><a href="javascript:">添加待办事项</a></div>', "</div>", "</div></div>"].join(""),
        events: {},
        initialize: function (e) {
            this.render(e), top.$App.on("calendarUpdate", function () {
                top.$App.clearTabCache("welcome")
            })
        },
        reqGetCalendarView: function (e) {
            var t = n("#div_calendar").data("isSecond");
            if (!t)return n("#div_calendar").data("isSecond", "true"), !1;
            var i = this, s = this.getCalendarParam(e);
            a.RichMail.API.call("calendar:getCalendarView", s, function (e) {
                e.responseData && "S_OK" == e.responseData.code ? i.calendarViewSuccess(e.responseData) : i.logger.error("calendar returndata error", "[calendar:getCalendarView]", e)
            })
        },
        getCalendarParam: function (e) {
            var t = function (e) {
                return e = e >= 10 ? e : "0" + e
            }, i = e.getFullYear(), a = t(e.getMonth()), n = e.getDate(), s = $Date.getDaysOfMonth($Date.parse(i + "-" + (parseInt(a, 10) + 2) + "-" + n + " 00:00:00")), o = i + "-" + a + "-01", r = i + "-" + t(e.getMonth() + 2) + "-" + s, l = {
                comeFrom: 0,
                startDate: o,
                endDate: r,
                maxCount: 5
            };
            return l
        },
        showCurrentMonth: function (e) {
            this.calendarViewSuccess(e)
        },
        calendarViewSuccess: function (e) {
            n("#div_calendar").data("calendar", e);
            var t = e["var"], i = e.table, a = [], s = [];
            n.each(i, function (e, t) {
                var i = t;
                i.isGroup || i.isSubCalendar ? a.push(e) : s.push(e)
            }), n.each(t, function (e, t) {
                for (var i = !1, a = t.info, o = 0; o < a.length; o++)for (var r = 0; r < s.length; r++)a[o] == s[r] && (i = !0);
                var l = $Date.parse(e + " 00:00:00"), d = l >= new Date, c = (t.info.length, parseInt(e.split("-")[2], 10)), m = parseInt(e.split("-")[1], 10), p = "<span>" + c + "</span><i></i>", h = n("td[rel='" + c + "']"), u = h.find("span").hasClass("calendarMod_focus");
                return m != parseInt(n(".calendarMonth").text(), 10) ? !1 : void(!h.find("span").hasClass("calendarMod_today") && d && i && (u ? h.find("span").addClass("calendarMod_on").attr("title", "该天有活动提醒") : (h.html(p).attr("action", "true"), h.find("span").addClass("calendarMod_on").attr("title", "该天有活动提醒"))))
            })
        },
        getByClass: function (e, t) {
            for (var i = e.getElementsByTagName("*"), a = [], n = new RegExp("\\b" + t + "\\b", "i"), s = 0; s < i.length; s++)n.test(i[s].className) && a.push(i[s]);
            return a
        },
        initDate: function (e) {
            var t = a.Date.getServerTime().format("yyyy-MM-dd"), i = (new Date, t.split("-")[0]), n = t.split("-")[1], s = t.split("-")[2], o = this.getByClass(e, "year_month")[0], r = this.getByClass(e, "week")[0], l = this.getByClass(e, "currDay")[0];
            o.innerHTML = i + "年" + n + "月", r.innerHTML = "星期" + this.getDayWeek(i + "/" + n + "/" + s), l.innerHTML = s
        },
        getDayWeek: function (e) {
            switch (new Date(e).getDay()) {
                case 1:
                    return "一";
                case 2:
                    return "二";
                case 3:
                    return "三";
                case 4:
                    return "四";
                case 5:
                    return "五";
                case 6:
                    return "六";
                case 0:
                    return "日";
                default:
                    return ""
            }
        },
        getMonthDay: function (e, t) {
            var i = 0;
            return 1 == t || 3 == t || 5 == t || 7 == t || 8 == t || 10 == t || 12 == t ? i = 31 : 4 == t || 6 == t || 9 == t || 11 == t ? i = 30 : 2 == t && (i = e % 4 == 0 && e % 100 != 0 ? 29 : e % 400 == 0 ? 29 : 28), i
        },
        render: function (e) {
            this.render = function () {
                return this
            };
            var t = this;
            this.calendarPicker = M2012.UI.Picker.CalendarIndex.create({
                container: n("#div_calendar")[0],
                value: new Date,
                callback: function (e) {
                    t.reqGetCalendarView(e)
                }
            });
            n("#div_calendar").css("display", "none");
            var i = document.createElement("div");
            i.id = "wrapper", i.style.cssText = "width:238px; height: 119px; position: relative; margin:0px auto; background-size:240px 119px; cursor:pointer; ", i.innerHTML = '<div class="calendarDay top">                                <div class="calendarMod_top clearfix">                                    <div class="fl"><span class="calendarMod_topTime calendarMod_topTime_date year_month">></span><span class="calendarMod_topTime calendarMod_topTime_name"></span></div>                                    <div class="fr pr_5"><span class="calendarMod_topTime calendarMod_topTime_week week"></span>                                    <span class="i_icon"><i class="i_icoPre prev"></i></span>                                    <span class="i_icon"><i class="i_icoNext next"></i></span>                                    </div>                                </div>                                <p class="calendarMod_time_day currDay"></p>                            </div>';
            var s = this.getByClass(document.getElementById("mainContainer"), "calendarMod")[0], o = this.getByClass(document.getElementById("mainContainer"), "calendarWeather")[0];
            this.initDate(i), s.insertBefore(i, o);
            var r = document.getElementById("wrapper"), l = t.getByClass(r, "top")[0], d = t.getByClass(r, "next")[0], c = t.getByClass(r, "prev")[0], m = t.getByClass(r, "calendarMod_topTime_name")[0], p = a.Date.getServerTime().format("yyyy-MM-dd");
            l.onclick = function (e) {
                var i = e || event, a = i.srcElement || i.target, s = t.getByClass(r, "year_month")[0], o = t.getByClass(r, "week")[0], l = t.getByClass(r, "currDay")[0], h = (parseInt(l.innerHTML, 10), n("#wrapper").find("a")[0]);
                t.getByClass(r, "calendarDay")[0];
                if ("i" != a.tagName.toLowerCase()) {
                    if (top.BH("welcome_ad4"), h) {
                        h.children[0];
                        t.unifiedLogRepot(h), window.open(h.href)
                    }
                } else {
                    if (/\bnext\b/g.test(a.className)) {
                        top.BH("welcome_next_day");
                        var u = s.innerHTML.replace(/[^0-9]/gi, ","), f = u.substring(0, u.length - 1), v = f.split(",")[0], g = f.split(",")[1], _ = l.innerHTML, w = t.getMonthDay(v, g);
                        _ != w ? (_++, s.innerHTML = v + "年" + g + "月") : 12 != g ? (g++, s.innerHTML = v + "年" + g + "月", _ = 1) : (v++, g = 1, _ = 1, s.innerHTML = v + "年" + g + "月"), _ = _ >= 10 ? _ : "0" + _, l.innerHTML = _, o.innerHTML = "星期" + t.getDayWeek(v + "/" + g + "/" + _), d.style.display = "none", c.style.display = "block", mainView.timeSwitcherView.switchDate(new Date(v + "/" + g + "/" + _))
                    } else if (/\bprev\b/g.test(a.className)) {
                        top.BH("welcome_prev_day");
                        var u = s.innerHTML.replace(/[^0-9]/gi, ","), f = u.substring(0, u.length - 1), v = f.split(",")[0], g = f.split(",")[1], _ = l.innerHTML;
                        1 != _ ? (_--, _ = _ >= 10 ? _ : "0" + _, l.innerHTML = _, s.innerHTML = v + "年" + g + "月", o.innerHTML = "星期" + t.getDayWeek(v + "/" + g + "/" + _), mainView.timeSwitcherView.switchDate(new Date(v + "/" + g + "/" + _))) : (1 != g ? (g--, _ = t.getMonthDay(v, g), s.innerHTML = v + "年" + g + "月", l.innerHTML = _) : (v--, g = 12, _ = t.getMonthDay(v, g), s.innerHTML = v + "年" + g + "月", l.innerHTML = _), o.innerHTML = "星期" + t.getDayWeek(v + "/" + g + "/" + _), mainView.timeSwitcherView.switchDate(new Date(v + "/" + g + "/" + _))), c.style.display = "none", d.style.display = "block"
                    }
                    $Date.parse(v + "-" + g + "-" + _) < $Date.parse(p) ? m.innerHTML = "(昨天)" : $Date.parse(v + "-" + g + "-" + _) > $Date.parse(p) ? m.innerHTML = "(明天)" : (m.innerHTML = "", d.style.display = "block", c.style.display = "block")
                }
                return !1
            }, mainView.waitTopReady(function () {
                t.changeTextColor()
            })
        },
        unifiedLogRepot: function (e) {
            var t = n(e).attr("tagid") || "", i = n(e).attr("buyerid") || "", a = n(e).attr("contentId") || "", s = {
                positionCode: a,
                eventType: 2,
                comeFrom: "2",
                ads: [{tagId: t, buyerId: i}],
                version: "1.0"
            };
            top.M139.RichMail.API.call("unified:logreport", s, function (e) {
                e.responseData.code && "S_OK" == e.responseData.code && console.log("统一位置行为日志上报成功")
            })
        },
        changeTextColor: function () {
            var e = n("#wrapper").find("a")[0], t = n(".calendarDay");
            "skin_claritDawn" != top.$User.getSkinName() && "skin_claritDreamLeaf" != top.$User.getSkinName() && "skin_claritSideRiver" != top.$User.getSkinName() || e ? n(t).removeClass("skin_clarit_noBg") : n(t).addClass("skin_clarit_noBg")
        },
        onSelectDate: function (e) {
            var t = this;
            this.calendarPicker.on("select", function (i) {
                var a = i.value.format("yyyy-MM-dd");
                t.currentDate = a, n(".calendarIndexDiv").remove();
                var s = $Date.parse(a + " 00:00:00"), o = $Date.getDaysPass(s, new Date), r = o > 0;
                if (r) {
                    t.showActivity(a);
                    var l = n(".welcomeNew_left").offset().left;
                    l = l + 202 + 8 + 478, n(".welcomeNewSon_right").addClass("welcomeFixed"), n(".welcomeNewSon_right").css({left: l})
                }
                e && e(a)
            })
        },
        onSetDate: function (e) {
            var t = this, i = $Date.getDaysPass(new Date, e) > 0;
            if (n(".calendarIndexDiv").remove(), i) {
                var a = e.format("yyyy-MM-dd");
                t.showActivity(a)
            }
            this.calendarPicker.focusAndSetDate(e)
        },
        getCanlendarList: function (e) {
            var t = n("#div_calendar").data("calendar"), i = {};
            n.each(t.table, function (e, t) {
                i[e] = n.extend(t, {
                    beginDateTime: $Date.parse(t.dtStart),
                    scheduleId: t.seqNo,
                    title: t.title || "无标题",
                    site: t.site || "无"
                })
            });
            var a = [];
            return n.each(t["var"], function (t, s) {
                t == e && (a = n.map(s.info || [], function (e, t) {
                    return i[e]
                }))
            }), a
        },
        dateShow: function (e) {
            var t = $Date.parse(e + " 00:00:00");
            return window.mainView.timeSwitcherView.getDateStr(t)
        },
        noMessage: function (e) {
        },
        noActivity: function (e) {
            var t = "top.$App.show('calendar_addAct', '&date={0}')";
            t = $T.format(t, [e]);
            var i = $T.Utils.format(this.templateAdd2, {date: this.dateShow(e), href: t});
            n(".welcomeNewSon_leftCon").append(i), n("#contentList").append(Welcome.MailList.View.prototype.templateEmpty), n(".mailListCon_noNewsTitle").html('"' + n("#list_header span").html() + '"没有任何内容'), n(".mailListCon_noNewsTxt").html("当前面板会展示邮箱当天的未读邮件及系统消息。")
        },
        lessTwoActivity: function (e) {
            var t = "javascript:top.$App.show('calendar_addAct', '&date={0}')";
            t = $T.format(t, [e]);
            var i = $T.Utils.format(this.templateAdd2, {href: t});
            n(".welcomeNewSon_leftCon").append(i)
        },
        changeImg: function (e) {
            var t = [{
                day: 0,
                src: "/m2015/images/module/welcome/eventCard/birthday_05.png",
                url: "/m2015/images/module/welcome/eventCard/remind_07.png",
                path: "/m2015/images/module/welcome/eventCard/todo_05.png"
            }, {
                day: 1,
                src: "/m2015/images/module/welcome/eventCard/birthday_01.png",
                url: "/m2015/images/module/welcome/eventCard/remind_01.png",
                path: "/m2015/images/module/welcome/eventCard/todo_01.png"
            }, {
                day: 2,
                src: "/m2015/images/module/welcome/eventCard/birthday_02.png",
                url: "/m2015/images/module/welcome/eventCard/remind_02.png",
                path: "/m2015/images/module/welcome/eventCard/todo_02.png"
            }, {
                day: 3,
                src: "/m2015/images/module/welcome/eventCard/birthday_03.png",
                url: "/m2015/images/module/welcome/eventCard/remind_03.png",
                path: "/m2015/images/module/welcome/eventCard/todo_03.png"
            }, {
                day: 4,
                src: "/m2015/images/module/welcome/eventCard/birthday_04.png",
                url: "/m2015/images/module/welcome/eventCard/remind_04.png",
                path: "/m2015/images/module/welcome/eventCard/todo_04.png"
            }, {
                day: 5,
                src: "/m2015/images/module/welcome/eventCard/birthday_05.png",
                url: "/m2015/images/module/welcome/eventCard/remind_05.png",
                path: "/m2015/images/module/welcome/eventCard/todo_05.png"
            }, {
                day: 6,
                src: "/m2015/images/module/welcome/eventCard/birthday_05.png",
                url: "/m2015/images/module/welcome/eventCard/remind_06.png",
                path: "/m2015/images/module/welcome/eventCard/todo_05.png"
            }];
            return t[e]
        },
        delItem: function (e) {
            var t = n("#div_calendar").data("calendar");
            if (t.table)for (i in t.table)(i = e) && delete t.table[i]
        },
        hasActivity: function (e) {
            var i = this, a = [], n = [], s = this.templateLi, o = this.templateSpecial;
            e = t.sortBy(e, function (e) {
                var t = $Date.parse(e.dtStart).getHours(), i = $Date.parse(e.dtStart).getMinutes(), a = 60 * t + i;
                return -a
            });
            for (var r = function (e) {
                return "1" == e.allDay ? e.beginDateTime.getMonth() == (new Date).getMonth && e.beginDateTime.getDate() == new Date.getDate ? "今天" : e.startDate : $Date.parse(e.dtStart).format("hh:mm")
            }, l = 0, d = e.length; d > l; l++) {
                var c = e[l];
                if (1 != c.specialType) {
                    if (!c.isGroup && !c.isSubCalendar) {
                        var m = {
                            id: "",
                            rid: "",
                            mid: "",
                            email: "",
                            defaultText: "活动开始",
                            icon: "img_02.jpg",
                            seqno: c.seqNo,
                            title: $T.Html.encode(c.title),
                            address: "地点：" + $T.Html.encode(c.site),
                            time: r(c),
                            clazz: "",
                            src: "",
                            eventInfoList: ""
                        };
                        if (0 == c.specialType)m.mid = c.id, m.rid = "2", m.defaultText = "", m.icon = "img_02.jpg", m.clazz = "remindCard", m.src = i.changeImg($Date.parse(c.dtStart).getDay()).url, m.eventInfoList = ['<p class="eventTime">', "<span>" + m.time + "</span>", "</p>", '<p class="eventTxt">', '<strong>“<span class="eventTxt-main" style="max-width:68%;">' + m.title + "</span>”</strong>活动开始", "</p>", '<p class="eventBtn">', '<a href="javascript:;" class="eventLink">查看</a>', '<a href="javascript:;" class="eventLink">删除</a>', "</p>"].join(""), a.push($T.Utils.format(o, m)); else if (6 == c.specialType && 2 != c.taskFlag)m.rid = "1", m.mid = c.id, m.defaultText = "待处理", m.icon = "img_01.jpg", m.clazz = "todoCard", m.src = i.changeImg($Date.parse(c.dtStart).getDay()).path, m.eventInfoList = ['<p class="eventTime">', "<span>" + m.time + "</span>", "</p>", '<p class="eventTxt">', '<strong>“<span class="eventTxt-main">' + m.title + "</span>”</strong>待处理", "</p>", '<p class="eventBtn">', '<a href="javascript:;" class="eventLink">标记完成</a>', '<a href="javascript:;" class="eventLink">取消任务</a>', "</p>"].join(""), a.push($T.Utils.format(o, m)); else {
                            if (6 == c.specialType && 2 == c.taskFlag)continue;
                            a.push($T.Utils.format(s, m))
                        }
                    }
                } else n.push(c)
            }
            if (0 !== n.length) {
                for (var p, h, u = [], f = [], v = 0, g = n.length; g > v; v++) {
                    if (p = n[v], 3 > v) {
                        var _ = p.title.replace(/生日$/, "");
                        /\D+/.test(_) ? u.push($T.Utils.getTextOverFlow2(_, 12, "")) : u.push($T.Utils.getTextOverFlow2(_, 11, ""))
                    }
                    f.push(p.emailAddress)
                }
                u = u.join("、"), h = g > 3 ? "<strong>" + u + "</strong>&nbsp;等<var>" + g + "人</var>" : "<strong>" + u + "</strong>", m = {
                    id: "testHeka",
                    rid: "5",
                    icon: "img_05.jpg",
                    clazz: "birthdayCard",
                    src: i.changeImg($Date.parse(c.dtStart).getDay()).src
                }, m.eventInfoList = ['<p class="eventTime hide">', "<span>" + m.time + "</span>", "</p>", '<p class="eventTxt" data-email=' + f.join(";") + ">", "" + h + "今天生日，赶紧送上祝福吧~", "</p>", '<p class="eventBtn">', '<a href="javascript:;" class="eventLink">发送贺卡</a>', "</p>"].join(""), a.push($T.Utils.format(o, m))
            }
            if (a.reverse(), a.length > 5) {
                a.splice(5, a.length - 5);
                var w = this.currentDate;
                a.push("<li><p class=\"mt_2\"><a href=\"javascript:top.$App.show('calendar','&viewMore=" + w + '\');" class="mailListCon_btn" id="a_more_calendar">查看更多</a></p></li>')
            }
            return a.join("")
        },
        infoTips: function (e) {
            top.M139.UI.TipMessage.show(e, {delay: 2e3})
        },
        warnTips: function (e) {
            top.M139.UI.TipMessage.show(e, {delay: 2e3, className: "msgYellow"})
        },
        errorTips: function (e) {
            top.M139.UI.TipMessage.show(e, {delay: 2e3, className: "msgRed"})
        },
        showActivity: function (e) {
            var t = this, i = this.getCanlendarList(e), s = $Date.parse(e + " 00:00:00").getDate(), o = n("td[rel='" + s + "']");
            o.find("span").hasClass("calendarMod_on");
            if (i.length > 0) {
                var r = this.hasActivity(i);
                if ("" == r)return this.noMessage(e), void this.noActivity(e);
                var l = $T.Utils.format(this.template, {calendarList: r});
                n("#contentList").append(l), n(".liCarlendar").mouseenter(function () {
                    n(this).addClass("hover");
                    var e = n(this).attr("rid");
                    n(this).find("a.mailListConBox_img").css("cursor", "default"), "5" == e && n(this).css("cursor", "pointer").find("a.mailListConBox_img").css("cursor", "pointer"), "1" != e && "2" != e || n(this).find(".eventCard").css("cursor", "pointer")
                }).mouseleave(function () {
                    n(this).removeClass("hover")
                }), n(".liCarlendar .eventCard").live("click", function (e) {
                    var t = n(this), i = (n(e.target), parseInt(t.closest("li[rid]").attr("rid"), 10), t.closest("li[rid]").attr("seqno"));
                    t.closest("li[rid]").attr("mid");
                    "A" != e.target.tagName && top.$App.show("calendar_addAct", "&seqno=" + i)
                }), n(".liCarlendar .eventBtn a").live("click", function (e) {
                    var i = n(this), s = n(e.target), o = parseInt(i.closest("li[rid]").attr("rid"), 10), r = i.closest("li[seqno]").attr("seqno"), l = i.closest("li[mid]").attr("mid");
                    if (1 == o)"标记完成" == s.text() ? (top.BH("welcome_mark_finish"), mainView.remindList.markFinish(r, l, i), t.delItem(r)) : "取消任务" == s.text() ? (top.BH("welcome_task_cancle"), mainView.remindList.markCancel(r, l, i), t.delItem(r)) : (mainView.remindList.rollOutNewMsg(i), top.$App.searchTaskmail()); else if (2 == o)if ("查看" == s.text())top.BH("welcome_msg_watch"), top.$App.show("calendar_addAct", "&seqno=" + r); else if ("删除" == s.text()) {
                        top.BH("welcome_msg_del");
                        var d = {seqNos: r, actionType: 0, isNotify: 0, specialType: 0, comeFrom: 0};
                        i.closest("li[rid]").hide("500"), a.RichMail.API.call("calendar:delCalendar", d, function (e) {
                            var n = e.responseData.code;
                            "S_OK" == n ? (i.closest("li[rid]").remove(), t.delItem(r), t.infoTips("删除成功！")) : a.RichMail.API.call("calendar:cancelInvitedInfo", {
                                seqNos: r,
                                comeFrom: 0
                            }, function (e) {
                                "S_OK" == e.responseData.code ? (t.infoTips("删除成功！"), t.delItem(r), i.closest("li[rid]").remove()) : (t.infoTips("删除失败！"), i.closest("li[rid]").show("200"))
                            })
                        })
                    }
                }), n("#testHeka").live("click", function () {
                    top.BH("welcome_send_birthcard");
                    var e = n(this).attr("data-emails");
                    e = e ? e : "", top.$App.show("greetingcard", {email: e, materialId: 10556})
                }), i.length <= 30 && this.lessTwoActivity(e)
            } else this.noMessage(e), this.noActivity(e);
            n(".liCarlendar:last").find(".mailListConBox").css("border-bottom", "0px"), mainView.trigger("resize")
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    i.namespace("M2012.Welcome.Weather.Model", Backbone.Model.extend({
        defaults: {},
        logger: new i.Logger({name: "welcome.weather.model"}),
        reqDefaultWeather: function (e) {
            var t = this;
            i.RichMail.API.call("weather:getDefaultWeather", null, function (i) {
                i.responseData && "S_OK" == i.responseData.code ? e && e(i.responseData) : t.logger.error("weather returndata error", "[weather:getDefaultWeather]", i)
            })
        },
        reqCityWeather: function (e, t) {
            var a = this, n = {weatherCode: e};
            i.RichMail.API.call("weather:getWeather", n, function (e) {
                "S_OK" == e.responseData.code ? t && t(e.responseData) : a.logger.error("weather returndata error", "[weather:getDefaultWeather]", e)
            })
        },
        reqSetWeather: function (e, t) {
            var a = this, n = {weatherCode: e};
            i.RichMail.API.call("weather:setWeather", n, function (e) {
                "S_OK" == e.responseData.code ? t && t(e.responseData["var"]) : a.logger.error("weather returndata error", "[weather:setWeather]", e)
            })
        },
        reqAreas: function (e) {
            var t = this;
            i.RichMail.API.call("weather:getArea", null, function (i) {
                "S_OK" == i.responseData.code ? (t.set({areas: i.responseData.areas}), e && e(i.responseData.areas)) : t.logger.error("weather returndata error", "[weather:getArea]", i)
            })
        },
        queryProvince: function (e) {
            var t = this.get("areas");
            if (null != t)for (var i = 0, a = t.length; a > i; i++) {
                var n = t[i];
                if (n.areaCode == e)return n.children
            }
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = e, n = i.View.ViewBase;
    i.namespace("M2012.Welcome.Weather.View", n.extend({
        dialogBoxStatus: "out",
        hoverTimeId: 0,
        dialogTimeId: 0,
        ui: {
            today: a("#div_weather_today"),
            dialog: a("#div_weather_box"),
            downCity: a("#dropDown_city"),
            city: a("#weather_area"),
            weather: a("#div_weather_forecast"),
            area: a("#div_city_area_select"),
            emCity: a("#em_select_city"),
            emArea: a("#em_select_area"),
            divCity: a("#div_select_city"),
            divArea: a("#div_select_area"),
            ulCity: a("#div_select_city>ul"),
            ulArea: a("#div_select_area>ul")
        },
        templateImage: top.getRootPath() + "/images/module/welcome/weather/{0}.png",
        templateToday: ['<span class="calendarWeather_img" style=" text-align: center;">', '<img src="{icon}" alt="{weather}" width="60" height="60" style=""/>', "</span>", '<div class="calendarWeather_info">', "<strong>{city} ({weather})</strong>", '<p class="calendarWeather_tem">{temper}</p>', "<p>{wind}</p>", "</div>"].join(""),
        templateDialogLi: ['<li class="{liClass}">', '<p class="gray">{day}({weekDay})</p>', '<img src="{icon}" alt="{weather}" />', '<p class="gray">{temper}</p>', '<p class="gray">{weather}</p>', "</li>"].join(""),
        templateDialogWeather: ["<div>", '<div class="dropDown_new" id="dropDown_city">', '<em id="weather_area">{city}</em>', '<i class="i_triangle_down"></i>', "</div>", '<p class="forecast_date ml_5">{date}</p>', '<ul class="foreCast-list" style="height:154px;"> ', "{weatherHtml}", '<span class="clearfix"></span>', "</ul>", '<span class="clearfix"></span>', "</div>"].join(""),
        events: {},
        initialize: function (e) {
            this.model = e.model, e.initData && this.showTodayWeather(e.initData), this.initEvents()
        },
        initEvents: function () {
            function e() {
                var e;
                return window.pageYOffset ? e = window.pageYOffset : document.compatMode && "BackCompat" != document.compatMode ? e = document.documentElement.scrollTop : document.body && (e = document.body.scrollTop), e
            }

            var t = this;
            window.onscroll = function () {
                var t = e();
                t > 18 ? a(".mailListHeader").css("top", "0px") : (t = 18 - t, a(".mailListHeader").css("top", t + "px"))
            }, this.ui.today.mouseenter(function (e) {
                var i = a(this);
                0 != t.dialogTimeId && clearTimeout(t.dialogTimeId), t.hoverTimeId = setTimeout(function () {
                    t.showDialog(i)
                }, 200)
            }).mouseleave(function (e) {
                0 != t.hoverTimeId && (clearTimeout(t.hoverTimeId), t.hoverTimeId = 0), a(e.target).attr("id") == t.ui.weather.attr("id") || (t.dialogTimeId = setTimeout(function () {
                    t.ui.area.find(".i_close").trigger("click")
                }, 500))
            }), this.initDialogEvent()
        },
        showDialog: function (e) {
            this.dialogBoxStatus = "show";
            var t = e.offset(), i = t.left - 450 + 165, a = t.top + 64;
            this.ui.dialog.removeClass("hide").css({
                left: i,
                top: a
            }), this.ui.weather.removeClass("hide"), this.ui.area.addClass("hide")
        },
        initDialogEvent: function () {
            var e = this;
            this.ui.downCity.live("click", function () {
                e.ui.weather.addClass("hide"), e.ui.area.removeClass("hide"), e.getProvince(function () {
                    e.ui.emCity.find("em").text("请选择"), e.ui.emArea.hide(), e.ui.emCity.trigger("click")
                })
            }), this.ui.emCity.live("click", function () {
                e.ui.divCity.removeClass("hide"), e.ui.divArea.addClass("hide"), a(this).addClass("hover"), e.ui.emArea.removeClass("hover"), e.ui.emArea.find("i").removeClass("i_arrow_down"), a(this).find("i").addClass("i_arrow_down")
            }), this.ui.emArea.live("click", function () {
                e.ui.divArea.removeClass("hide"), e.ui.divCity.addClass("hide"), a(this).addClass("hover"), e.ui.emCity.removeClass("hover"), e.ui.emCity.find("i").removeClass("i_arrow_down"), a(this).find("i").addClass("i_arrow_down")
            }), this.ui.area.find(".i_close").live("click", function () {
                e.ui.weather.addClass("hide"), e.ui.area.addClass("hide")
            }), this.ui.dialog.mouseleave(function (t) {
                e.dialogBoxStatus = "leave";
                a(this);
                e.dialogTimeId = setTimeout(function () {
                    e.dialogTimeId = 0, e.ui.area.find(".i_close").trigger("click")
                }, 800), a(t.target).attr("id") == e.ui.today.attr("id") && (clearTimeout(e.dialogTimeId), e.dialogTimeId = 0)
            }).mouseenter(function () {
                e.dialogBoxStatus = "enter", 0 != e.dialogTimeId && (clearTimeout(e.dialogTimeId), e.dialogTimeId = 0)
            })
        },
        render: function () {
            var e = this;
            this.model.reqDefaultWeather(function (t) {
                t && t.weather && e.showTodayWeather(t)
            })
        },
        getImage: function (e) {
            e.length < 2 && (e = "0" + e);
            var t = $T.Utils.format(this.templateImage, [e]);
            return t
        },
        showTodayWeather: function (e) {
            var t = e["var"], i = t.weather[0], a = $T.Utils.format(this.templateToday, {
                icon: this.getImage(i.pic0),
                city: t.city,
                weather: i.weather.substr(0, 5),
                temper: i.temper,
                wind: i.wind
            });
            this.ui.today.html(a), this.getWeatherTipHtml(t)
        },
        getProvince: function (e) {
            var t = this;
            return null != t.model.get("areas") ? (e && e(), !1) : (t.ui.ulCity.html("<li>正在加载...</li>"), void t.model.reqAreas(function (i) {
                t.ui.ulCity.html(""), t.provinceRender(), e && e()
            }))
        },
        provinceRender: function () {
            for (var e = this, t = this.model.get("areas"), i = [], n = 0, s = t.length; s > n; n++) {
                var o = t[n], r = '<li><a value="{provinceCode}" href="javascript:;">{provinceName}</a></li>';
                i.push($T.Utils.format(r, {provinceCode: o.areaCode, provinceName: o.areaName}))
            }
            this.ui.ulCity.html(i.join("")), this.ui.ulCity.find("a").click(function () {
                e.clickProvinceName(a(this).attr("value")), e.ui.emCity.find("em").text(a(this).text()), e.ui.emArea.show()
            })
        },
        clickProvinceName: function (e) {
            var t = this, i = this.model.queryProvince(e), n = [];
            if (void 0 != i)for (var s = 0, o = i.length; o > s; s++) {
                var r = i[s], l = '<li><a value="{cityCode}" href="javascript:;">{cityName}</a></li>';
                n.push($T.Utils.format(l, {cityCode: r.areaCode, cityName: r.areaName}))
            }
            this.ui.ulArea.html(n.join("")), this.ui.emArea.trigger("click"), this.ui.ulArea.find("a").click(function () {
                t.clickCityName(a(this).attr("value"))
            })
        },
        clickCityName: function (e) {
            var t = this;
            this.model.reqCityWeather(e, function (e) {
                t.ui.area.find(".i_close").trigger("click"), t.weatherTip(e)
            }), this.model.reqSetWeather(e, function (e) {
                top.BH("welcome_weathersetok")
            })
        },
        weatherTip: function (e) {
            var t = e["var"];
            this.getWeatherTipHtml(t), this.showTodayWeather(e), this.ui.area.find(".i_close").trigger("click")
        },
        changeData: function (e) {
            var t = function (e) {
                return e = e.replace("年", "-").replace("月", "-").replace("日", ""), e += " 00:00:00", e = $Date.parse(e)
            }, i = function (e) {
                var t = new Date;
                return t.setDate(t.getDate() + e), t.format("yyyy年MM月dd日")
            }, a = t(e[0].date);
            return a.getDate() == (new Date).getDate() ? e : (e[0].date = i(0), e[1].date = i(1), e[2].date = i(2), e)
        },
        getWeatherTipHtml: function (e) {
            var t = [], a = "今天", n = e.weather, s = 3, o = "list_notToday", r = function (e) {
                return e = e.replace("年", "-").replace("月", "-").replace("日", ""), e += " 00:00:00", e = $Date.parse(e), $Date.getChineseWeekDay(e)
            };
            n = this.changeData(n);
            for (var l = 0; s > l; l++) {
                var d = n[l];
                switch (l) {
                    case 0:
                        a = "今天", o = "list_today";
                        break;
                    case 1:
                        a = "明天", o = "list_notToday";
                        break;
                    case 2:
                        a = "后天", o = "list_notToday"
                }
                t.push(i.Text.format(this.templateDialogLi, {
                    liClass: o,
                    day: a,
                    weekDay: r(d.date),
                    weather: d.weather,
                    temper: d.temper,
                    icon: this.getImage(d.pic0)
                }))
            }
            var c = i.Text.format(this.templateDialogWeather, {city: e.city, date: n[0].date, weatherHtml: t.join("")});
            this.ui.weather.html(c)
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = e, n = i.View.ViewBase;
    i.namespace("M2012.Welcome.Magazine.View", n.extend({
        autoPlayId: 0,
        selectedIndex: 0,
        events: {},
        ui: {
            ulMagazine: a("#ul_magazine"),
            ulNode: a("#ul_magazine_node"),
            ulService: a("#ul_myservice"),
            ulRecommend: a("#ul_recommend"),
            divMagazine: a("#div_magazine"),
            divService: a("#div_myservice"),
            divRecommend: a("#div_recommend"),
            magazineTitle: a("#p_magazine_title"),
            magazineInner: a("#div_magazine_inner"),
            menuRecommend: a("#menu_recommend"),
            menuService: a("#menu_service")
        },
        magazineTemplate: '<li style="{style}"><a href="{href}"><img orgsrc="{src}" alt="{title}"/></a></li>',
        nodeTemplate: '<li class="{liClass}"><a href="javascript:;"></a></li>',
        serviceTemplate2: ["<li>", '<a href="{href}"><img src="{src}" alt="{title}" width="65" height="65" /><i class="i_icoService"></i></a>', "<p>{title}</p>", "</li>"].join(""),
        serviceTemplate: ['<li class="clearfix liService" columnId="{columnId}" columnName="{title}">', '<a href="{href}"><img src="{src}" alt="{title}" width="65" height="65"/><i class="i_icoService"></i></a>', '<div class="service_listCon">', '   <strong><a href="{href}">{title}</a></strong>', '   <div class="service_cont"><p>{count}位用户</p>', '   <em class="starBox"><em style="width:{score}%"></em></em></div>', '   <div class="service_btn hide">', '       <a href="javascript:;" class="btn btnGreen unSubClass hide mpostAdd"><em>添加</em></a>', '       <a href="javascript:;" class="btn btnGreen subClass mpostUse"><em>使用</em></a>', '       <a href="javascript:;" class="btn btnReadOnly ml_5 subClass mpostUnsubscribe"><em>退订</em></a>', "   </div>", "</div>", "</li>"].join(""),
        recommendTemplage: ['<li class="clearfix liRecommend" columnId="{columnId}" columnName="{title}">', '<a href="{href}"><img src="{src}" alt="{title}" width="65" height="65"/></a>', '<div class="service_listCon">', '   <strong><a href="{href}">{title}</a></strong>', '   <div class="service_cont"><p>{count}位用户</p>', '   <em class="starBox"><em style="width:{score}%"></em></em></div>', "</div>", '<div class="fr" name="service_btn" style="">', '<div class="btnBox btnNewGray" name="mpostUse">使用</div>', '<div class="btnBox btnNewGreen hide" name="mpostAdd">添加</div>', "</div>", "</li>"].join(""),
        initialize: function (e) {
            this.render(e.initData), this.initEvent(), this.magazineBH()
        },
        replaceImagesDomain: function (e) {
            return "https:" == window.location.protocol && (e = e.replace(new RegExp("http://images.139cm.com/", "g"), "https://appmail.mail.10086.cn/images_139cm/")), e
        },
        render: function (e) {
            return e && (e = e.body) ? (this.renderMagazine(e.hotItems), e.recommends.length > 0 ? (this.renderRecommend(e.recommends), this.addChaozhouBh(41005), this.ui.menuRecommend.removeClass("hide")) : (this.renderMyService(e.myService), this.ui.menuService.removeClass("hide")), void("https:" == window.location.protocol && (a(".moreNav>.inner").children(":eq(1)").hide(), a(".moreNav>.inner").children(":eq(2)").hide()))) : !1
        },
        addChaozhouBh: function (e) {
            var t = a("#ul_recommend li[columnid=" + e + "]");
            t.length > 0 && t.find("a, .btnBox").click(function () {
                top.BH("chaozhou_recommends")
            })
        },
        renderMagazine: function (e) {
            for (var t = [], i = [], a = 0, n = e.length; n > a; a++) {
                var s = e[a], o = this.magazineTemplate, r = 0 == a ? "" : "display:none;", l = "javascript:top.$App.show('googSubscription', {'mtype' : '27', 'cid' : {0}, 'serialid' : {1}, 'openRead' : '1', 'isSubscribe' : '1'});";
                t.push($T.Utils.format(o, {
                    style: r,
                    href: $T.Utils.format(l, [s.columnId, s.itemId]),
                    src: s.thumbnail,
                    title: s.title
                }));
                var d = 0 == a ? "seld" : "", c = this.nodeTemplate;
                i.push($T.Utils.format(c, {liClass: d}))
            }
            this.ui.magazineTitle.text(e[0].title), this.ui.ulMagazine.html(this.replaceImagesDomain(t.join(""))), this.ui.ulNode.html(this.replaceImagesDomain(i.join(""))), this.showImg(this.ui.ulMagazine.children("li").eq(0).find("img"))
        },
        showImg: function (e) {
            var t = e.attr("orgsrc");
            t && (e.attr("src", t), e.attr("orgsrc", ""))
        },
        renderMyService: function (e) {
            for (var t = [], i = 0, a = e.length; a > i && 2 > i; i++) {
                var n = e[i], s = this.serviceTemplate;
                t.push($T.Utils.format(s, {
                    columnId: n.columnId,
                    count: n.subscribeCount,
                    href: "javascript:top.$App.show('googSubscription', {'columnId':" + n.columnId + "});",
                    src: n.logoUrl,
                    title: n.columnName
                }))
            }
            this.ui.ulService.html(this.replaceImagesDomain(t.join(""))), this.ui.divService.show()
        },
        renderRecommend: function (e) {
            for (var t = [], i = 2, a = 0, n = e.length; n > a && i > a; a++) {
                var s = e[a], o = this.recommendTemplage;
                t.push($T.Utils.format(o, {
                    columnId: s.columnId,
                    count: s.subscribeCount,
                    href: "javascript:top.$App.show('googSubscription', {'columnId':" + s.columnId + "});",
                    src: s.logoUrl,
                    title: s.columnName,
                    score: 100 * parseFloat(s.virtualScore) / 10
                }))
            }
            this.ui.ulRecommend.html(this.replaceImagesDomain(t.join(""))), this.ui.divRecommend.show()
        },
        initEvent: function () {
            var e = this, t = this.ui.ulMagazine.children("li").length, i = function (t) {
                e.selectedIndex = t;
                var i = e.ui.ulNode.children("li").eq(t);
                i.addClass("seld").siblings().removeClass("seld");
                var a = e.ui.ulMagazine.children("li").eq(t);
                e.ui.magazineTitle.text(a.find("img").attr("alt")), e.showImg(a.find("img")), a.fadeIn().siblings().fadeOut()
            };
            this.ui.ulNode.children("li").hover(function () {
                i(a(this).index())
            });
            var n = function () {
                var a = e.selectedIndex + 1;
                a = a >= t ? 0 : a, i(a)
            };
            setTimeout(function () {
                e.autoPlayId = setInterval(function () {
                    return e.ui.magazineInner.data("hover") ? !1 : void n()
                }, 6e3)
            }, 8e3), this.ui.magazineInner.mouseenter(function () {
                a(this).data("hover", "true")
            }).mouseleave(function () {
                a(this).removeData("hover")
            }), a(".adTitleNav li").hover(function () {
                var e = a(this)[0], t = a(this).index();
                a(this).addClass("on").siblings().removeClass("on"), a(".onLine").css({
                    width: e.offsetWidth,
                    left: e.offsetLeft
                }), a(".advertisingOther_img").eq(t).removeClass("hide").siblings(".advertisingOther_img").addClass("hide")
            }, function () {
            }), a(".liRecommend, .liService").mouseenter(function () {
            }).mouseleave(function () {
            }), a("[name=mpostAdd]").click(function () {
                e.subscribe(a(this))
            }), a("[name=mpostUse]").click(function () {
                e.mpostUse(a(this)), BH("welcome_user_service")
            })
        },
        subscribe: function (e) {
            var t = {
                columnId: e.parents("li").attr("columnId"),
                comeFrom: "503",
                eventType: 1,
                topicId: 1
            }, a = {requestDataType: "Object2JSON"}, n = "/subscribe/inner/bis/subscribe?sid=" + top.$App.getSid();
            i.RichMail.API.call(n, t, function (t) {
                var i = "订阅成功!";
                top.M139.UI.TipMessage.show(i, {delay: 2e3}), e.parents("li").find("[name=mpostUse]").removeClass("hide"), e.parents("li").find("[name=mpostAdd]").addClass("hide")
            }, a)
        },
        unSubscribe: function (e) {
        },
        mpostUse: function (e) {
            var t = e.parents("li").attr("columnId"), i = e.parents("li").attr("columnName");
            top.$App.show("mpostOnlineService", null, {title: i, key: t, inputData: {columnId: t, columnName: i}})
        },
        magazineBH: function () {
            a(".advertisingOtherTitle a").click(function () {
                top.BH("index_mpost_more")
            }), this.ui.ulMagazine.find("li").click(function () {
                top.BH && top.BH("welcome_ad1");
                var e = a(this).index();
                switch (e) {
                    case 0:
                        top.BH("index_mpost_img1");
                        break;
                    case 1:
                        top.BH("index_mpost_img2");
                        break;
                    case 2:
                        top.BH("index_mpost_img3")
                }
            }), a(".serviceTitle a").click(function () {
                top.BH && top.BH("index_mpost_more")
            }), this.ui.ulService.find("li").click(function () {
                top.BH && top.BH("index_mpost_service")
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Welcome.MailList.View";
    i.namespace(n, a.extend({
        name: n,
        lock: !0,
        againRequest: 0,
        templateEmpty: ['<li class="mailList_con_li clearfix" style="list-style-type:none" id="messageEmpty">', '<div class="mailListCon_noNews">', '<i class="i-likeNike-noTips"></i>', '<p class="mailListCon_noNewsTitle">“未读的邮件和消息”中没有内容</p>', '<p class="mailListCon_noNewsTxt">未读的邮件和消息会展示邮箱内所有的未读邮件及系统消息。</p>', "</div>", "</li>"].join(""),
        mailDynamicEmpty: ['<li class="mailList_con_li clearfix" style="list-style-type:none" id="messageEmpty">', '<div class="mailListCon_noNews">', '<i class="i-likeNike-noTips"></i>', '<p class="mailListCon_noNewsTitle">“邮动态”中没有内容</p>', '<p class="mailListCon_noNewsTxt">当前无互动邮件，参与邮件评论或点赞后，将在该面板出现。</p>', "</div>", "</li>"].join(""),
        mailConfs: {
            1000001: {sendId: 1000001, name: "通知动态", iconUrl: "/welcome/notice.png", setorder: "7"},
            1000006: {sendId: 1000006, name: "移动账单", iconUrl: "/welcome/pic_09.png", setorder: "5"},
            1000007: {sendId: 1000007, name: "生活服务", iconUrl: "/welcome/serviceMail.png", setorder: "6"},
            1000008: {sendId: 1000008, name: "广告邮件", iconUrl: "/welcome/adMail.png", setorder: "9"},
            1000009: {sendId: 1000009, name: "注册激活", iconUrl: "/welcome/key.png", setorder: "8"},
            1000010: {sendId: 1000010, name: "电子发票", iconUrl: "/welcome/invoice.png", setorder: "13"},
            1000011: {sendId: 1000011, name: "行程邮件", iconUrl: "/welcome/trip.png", setorder: "13"},
            1000013: {sendId: 1000013, name: "潮州移动", iconUrl: "/welcome/pic_09.png", setorder: "13"},
            1010001: {sendId: 1010001, name: "携程", iconUrl: "/inbox/trip/xiec.png", setorder: "13"},
            1010002: {sendId: 1010002, name: "12306", iconUrl: "/inbox/trip/ch12306.png", setorder: "13"},
            1010003: {sendId: 1010003, name: "中国国际航空", iconUrl: "/inbox/trip/ca.png", setorder: "13"},
            1010004: {sendId: 1010004, name: "中国南方航空", iconUrl: "/inbox/trip/cz.png", setorder: "13"},
            1010005: {sendId: 1010005, name: "艺龙", iconUrl: "/inbox/trip/yil.png", setorder: "13"},
            1010006: {sendId: 1010006, name: "去哪儿网", iconUrl: "/inbox/trip/gow.png", setorder: "13"},
            1010007: {sendId: 1010007, name: "商旅100", iconUrl: "/inbox/trip/sl100.png", setorder: "13"},
            1000100: {sendId: 1000100, name: "浙江宁波水务公司", iconUrl: "/inbox/trip/zjsw.png", setorder: "13"},
            1000101: {sendId: 1000101, name: "浙江台州黄岩自来水", iconUrl: "/inbox/trip/zjzls.png", setorder: "13"},
            1000102: {sendId: 1000102, name: "浙江温州燃气", iconUrl: "/inbox/trip/zjgas.png", setorder: "13"},
            1000103: {sendId: 1000103, name: "浙江电力", iconUrl: "/inbox/trip/zjdl.png", setorder: "13"},
            1010101: {sendId: 1010101, name: "招商银行", iconUrl: "/inbox/trip/bankzh.png", setorder: "13"}
        },
        initialize: function (t) {
            var i = this;
            return i.zanView = new Zan_View({
                el: "#mailListContainer",
                type: 1
            }), e("#unread").hide(), top.$App.on("pnsNewArrival", function (t) {
                if (!e(".calendarMod_today").hasClass("calendarMod_focus"))return !1;
                if (t.msg && t.msg.length > 0) {
                    var i = t.c, a = t.msg[0].type, n = '<li id="tip_pns"><div class="mailListConBox clearfix">	<a href="javascript:;" class="mailListConBox_img">		<img src="/m2015/images/module/welcome/img_08.jpg">	</a>	<div class="mailListConBox_info clearfix">		<div class="mailListConBox_infoLeft">			<ul class="mailListConBox_listOne">				<li>					<p>您收到 <strong class="c_orange">' + i + '</strong>{0}，<a href="javascript:;">点击查看</a></p>				</li>			</ul>		</div>	</div></div></li>';
                    if (70 == a)a = "封新邮件"; else {
                        if (100 != a)return;
                        a = "条新消息"
                    }
                    e("#tip_pns").remove(), n = $T.format(n, [a]);
                    var s = e(n);
                    e(s).click(function () {
                        window.mainView.timeSwitcherView.switchDate(new Date), e(this).remove()
                    }), e("#remindList").before(s)
                }
            }), top.$App.on("showTab", function (e) {
                "welcome" == e.name && i.isDirty ? (i.isDirty = !1, i.reloadMailList(i.selectedDate)) : document.body.scrollTop = 0
            }), a.prototype.initialize.apply(this, arguments)
        },
        initMainScroll: function () {
        },
        adjustContentSize: function () {
            var t = e(top.window).height() - 75;
            e.browser.msie && (t += 8), e("#mainContainer").height(t - 1);
            var i = e(window).width(), a = e(window).height();
            if (0 != i) {
                var n = 1e3, s = 503;
                i >= 1260 && 1440 > i ? (n = 1100, s = 603) : i >= 1440 && 1920 > i ? (n = 1200, s = 703) : i >= 1920 ? (n = 1300, s = 803) : window.screen.width <= 999 && (e.browser.msie && e.browser.version <= 8 ? e("#mainContainer").width(window.screen.width - 8) : e("#mainContainer").width(window.screen.width)), e(".welcomeNew").width(n), e(".welcomeNewSon_left").width(s), e(".attachmentForm").width(e("#contentList").width() - 21), e("li[fid]").find(".mailListConBox").width(e("#contentList").width() - 28), e.browser.msie && document.documentMode <= 7 && e(".welcomeNew_right").width(n - e(".welcomeNew_left").width() - 8), e(".welcomeNew").css("height", ""), a - e(".welcomeNew").height() > 55 && e(".welcomeNew").height(a - 50), setTimeout(function () {
                    var t = 725;
                    7 == e(".calendarModTable tr").length && (t += 31);
                    var i = t - e("#contentList").height();
                    if (e("#replyContainer").length > 0 && (i -= 66), i > 250) {
                        e("#addTaskTips").height(i);
                        var a = e("#mailListContainer").width() + 1;
                        a > 0 ? 330 > i ? (e("#addTaskTips .addTaskTipsCon").addClass("layout-horizontal"), e(".i-addTaskTips").css("margin", "25px")) : e("#addTaskTips .addTaskTipsCon").removeClass("layout-horizontal") : e(".i-addTaskTips").removeAttr("style")
                    } else e("#addTaskTips").height(420), e(".i-addTaskTips").removeAttr("style"), e("#addTaskTips .addTaskTipsCon").removeClass("layout-horizontal")
                }, 100), window.mainView.trigger("atContainerRender")
            }
        },
        checkScroll: function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (!this.isScrollLoading && e("#loading_more").is(":visible") && e("#loading_more").offset().top <= e(window).height() + t) {
                if (e("#loading_more").show(), e(".mailList_con").hasClass("mailList_dynamic"))return void e("#loading_more").hide();
                this.scrollLoadMail()
            }
        },
        renderAttachImg: function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop, i = e("#mailListContainer li[attach]").find("img[_src]");
            if (i.length > 0)for (var a = e("#mailListContainer li[attach]").find(".attachmentList"), n = 0; n < a.length; n++)if (e(a[n]).offset().top <= e(window).height() + t && e(a[n]).find("img[_src]").length > 0)for (var s = e(a[n]).children("a").find(".attachmentItem"), o = 0; o < s.length; o++)if (5 > o && "" != e(s[o]).find("img").attr("_src")) {
                var r = e(s[o]).find("img").attr("_src");
                e(s[o]).find("img").attr("src", r), e(s[o]).find("img").removeAttr("_src")
            }
        },
        showRelateMe: function () {
            var t = this, i = top.$App.getCustomAttrs("relatedMail");
            "" == i && (i = "1,1,1,1,1");
            var a = i.split(",");
            this.relateState = a;
            for (var n = ["key", "vip", "onlyme", "atme", "tag"], s = 0; s < a.length; s++)0 == a[s] && e(".referTo[flag=" + n[s] + "]").remove();
            e(".referTo").each(function (e, t) {
            });
            var o = {
                atme: '<p>发件人在邮件中@了我</p><a href="javascript:;" class="btnBox btnNewGray mt_5 mb_5">不再标记“@我的”邮件</a> ',
                key: '<p>邮件主题命中关键字：<span id="highlight"></span></p><a href="javascript:;" class="btnBox btnNewGray mt_5 mb_5">不再标记该关键字</a>						<p><a href="javascript:;" id="set_key" bh="welcome_key_manage">管理关键字</a></p>',
                onlyme: '<p>邮件只发给我一个人</p><a href="javascript:;" class="btnBox btnNewGray mt_5 mb_5">不再标记“只发给我”的邮件</a><p><a href="javascript:;" id="btn_addBlack">不标记TA的邮件</a></p>',
                tag: ' <p>邮件主题命中标签：<span id="highlight"></span></p><a href="javascript:;" class="btnBox btnNewGray mt_5 mb_5">不再标记该标签</a>	                     <p><a href="javascript:;" id="set_tag" bh="welcome_tag_manage">管理标签</a></p>',
                vip: '  <a href="javascript:;" class="btnBox btnNewGray mt_5 mb_5">不再标记“VIP联系人”邮件</a><p><a href="javascript:;" id="set_vip" bh="welcome_vip_manage">管理VIP联系人</a></p>'
            };
            e(".referTo").unbind("click").click(function (i) {
                var a = e(i.target).offset(), n = e(i.target).attr("flag");
                BH("welcome_menu_" + n);
                var s = e(i.target).closest("li").attr("mid");
                return e("#referTo_menu[mid=" + s + "]").length > 0 ? void e("#referTo_menu").remove() : (e("#referTo_menu").remove(), e(document.body).append('<div id="referTo_menu" mid="' + s + '" flag="' + n + '" style="cursor:pointer;position:absolute;top:' + (a.top + 20) + "px;left:" + a.left + 'px;" class="componentTips">' + o[n] + "</div>"), t.showHighlight(n, s, i.target), e("#referTo_menu").on("click", function (i) {
                    var a = e(this).attr("flag");
                    BH("welcome_mark_" + a), e(i.target).hasClass("btnBox") ? (t.markRelate({
                        type: a,
                        mid: e(this).attr("mid")
                    }), e("#referTo_menu").remove()) : "btn_addBlack" == i.target.id ? (t.markRelate({
                        type: a,
                        addBlack: !0,
                        mid: e(this).attr("mid")
                    }), e("#referTo_menu").remove()) : "set_tag" == i.target.id ? setTimeout(function () {
                        e(window).scrollTop(0), e(".i-welcomeSet").click(), setTimeout(function () {
                            e(".relatedToMe_nav").children().eq(4).click()
                        }, 50)
                    }) : "set_key" == i.target.id ? setTimeout(function () {
                        e(window).scrollTop(0), e(".i-welcomeSet").click()
                    }, 50) : "set_vip" == i.target.id && setTimeout(function () {
                        e(window).scrollTop(0), e(".i-welcomeSet").click(), setTimeout(function () {
                            e(".relatedToMe_nav").children().eq(1).click()
                        }, 50)
                    }, 50)
                }), void i.stopPropagation())
            }), e(document.body).click(function () {
                e("#referTo_menu").remove()
            })
        },
        showHighlight: function (t, a, n) {
            if ("key" == t)i.RichMail.API.call("mbox:readMessage", {markRead: 0, mid: a}, function (t) {
                var i = t.responseData["var"].subject;
                top.$RM.getWhiteBlackList({type: 5}, function (t) {
                    var a = t["var"], n = [];
                    a && a.length > 0 && (e.each(a, function (e, t) {
                        "" != t && i.indexOf(t) >= 0 && n.push(t)
                    }), e("#highlight").html(n.join("、")), 0 == n.length && (e("#highlight").hide(), e("#highlight").parent().contents().eq(0).remove()))
                })
            }); else if ("tag" == t) {
                var s = e(n).attr("label").split(","), o = [];
                e.each(top.$App.getTagsById(s), function (e, t) {
                    o.push(t.name)
                }), e("#highlight").html(o.join("、"))
            }
        },
        markRelate: function (t) {
            var a = this, n = e("li[mid=" + t.mid + "]"), s = n.find("[name=subject]").html(), o = n.find("i[addr]").attr("addr");
            switch (t.type) {
                case"atme":
                    e(".referTo[flag=" + t.type + "]").remove(), this.relateState[3] = "0", top.$App.setCustomAttrs("relatedMail", this.relateState.join(","), function () {
                    });
                    break;
                case"key":
                    i.RichMail.API.call("mbox:readMessage", {markRead: 0, mid: n.attr("mid")}, function (t) {
                        s = t.responseData["var"].subject, top.$RM.getWhiteBlackList({type: 5}, function (t) {
                            var i = t["var"], o = null;
                            if (i && i.length > 0) {
                                var r = 0;
                                e.each(i, function (e, t) {
                                    if ("" != t && s.indexOf(t) >= 0) {
                                        o = t, r++;
                                        var l = {opType: "delete", type: 5, member: t};
                                        $RM.setWhiteBlackList(l, function (e) {
                                        }), a.removeKey(o, n.attr("mid"), i)
                                    }
                                }), r == i.length && top.$App.setCustomAttrs("EmptyKeyword", 1)
                            }
                            o || (top.M139.UI.TipMessage.show("该关键字已取消过标记", {
                                delay: 2e3,
                                className: "msgRed"
                            }), n.find("[flag=key]").remove(), top.M139.RichMail.API.call("mbox:updateMessagesStatus", {
                                ids: [n.attr("mid")],
                                type: "hitKeyword",
                                value: 0
                            }, function (e) {
                            }))
                        })
                    });
                    break;
                case"onlyme":
                    t.addBlack ? $RM.setWhiteBlackList({opType: "add", type: 4, member: o}, function (i) {
                        var a = n.find("[addr]").attr("addr"), s = [];
                        e(".referTo[flag=" + t.type + "]").each(function (t, i) {
                            a == e(i).closest("li").find("[addr]").attr("addr") && (s.push(e(i).closest("li").attr("mid")), setTimeout(function () {
                                e(i).remove()
                            }, 20))
                        }), top.M139.RichMail.API.call("mbox:updateMessagesStatus", {
                            ids: s,
                            type: "justSendme",
                            value: 0
                        }, function (e) {
                        }), "S_OK" == i.code || "S_EXISTS" == i.code && top.M139.UI.TipMessage.show("该联系人已取消过标记", {
                            delay: 2e3,
                            className: "msgRed"
                        }), BH("welcome_onlyme_markblack")
                    }) : (this.relateState[2] = "0", top.$App.setCustomAttrs("relatedMail", this.relateState.join(","), function () {
                    }), e(".referTo[flag=" + t.type + "]").remove());
                    break;
                case"tag":
                    for (var r = n.find("[label]").attr("label"), l = r.split(","), d = 0; d < l.length; d++) {
                        var c = l[d];
                        !function (t) {
                            top.$RM.getFilter_New(function (i) {
                                e.each(i["var"], function (i, a) {
                                    var n = a.dealType.split(",");
                                    if (e.inArray("5", n) >= 0 && a.attachLabel == t)if (1 == n.length)top.$RM.setFilter_New({
                                        opType: "delete",
                                        filterId: a.filterId
                                    }, function (e) {
                                        "S_OK" == e.code
                                    }); else {
                                        n = e.grep(n, function (e) {
                                            return "5" != e
                                        });
                                        var s = a;
                                        for (elem in s)"" == s[elem] && delete s[elem];
                                        s.opType = "mod", s.dealType = n.join(","), delete s.attachLabel, top.$RM.setFilter_New(s, function (e) {
                                            "S_OK" == e.code
                                        })
                                    }
                                })
                            })
                        }(c), a.removeTag(c)
                    }
                    break;
                case"vip":
                    e(".referTo[flag=" + t.type + "]").remove(), this.relateState[1] = "0", top.$App.setCustomAttrs("relatedMail", this.relateState.join(","), function () {
                    })
            }
        },
        removeTag: function (t) {
            var i = [];
            e(".referTo[flag=tag]").each(function (a, n) {
                var s = e(n).attr("label").split(",");
                if (e.inArray(t, s) >= 0) {
                    var o = e(n).closest("li").attr("mid");
                    i.push(o), setTimeout(function () {
                        e(n).remove()
                    }, 20)
                }
            }), top.$App.getMailboxView().model.removeTagForMail(i, t)
        },
        checkFileType: function (e) {
            var t = {
                doc: /doc|docx/i,
                exl: /excel|excel|xlsx|xls/i,
                zip: /zip|rar/i,
                music: /mp3|wma|wav|asf|aac|mp3pro|vqf|flac|ape|mid|ogg/i,
                video: /mp4|MPEG|AVI|MOV|ASF|WMV|NAVI|3GP|Rmvb|rm|divx|mpg|mpeg|ra|qt|mkv|vob/i,
                ppt: /ppt/i,
                pdf: /pdf/i,
                txt: /txt/i,
                eml: /eml/i
            };
            for (var i in t)if (t[i].test(e))return i;
            return "file"
        },
        removeKey: function (i, a, n) {
            var s = [];
            e(".referTo[flag=key]").each(function (o, r) {
                var l = e(r).parent().find("[name=subject]").html();
                if (l.indexOf(i) >= 0) {
                    n = t.without(n, i);
                    var d = e.grep(n, function (e, t) {
                        return l.indexOf(e) >= 0 ? !0 : void 0
                    });
                    0 != d.length && e(r).closest("li").attr("mid") != a || (s.push(e(r).closest("li").attr("mid")), setTimeout(function () {
                        e(r).remove()
                    }, 20))
                }
            }), 0 == s.length && (s.push(a), e("li[mid=" + a + "]").find(".referTo").remove()), top.M139.RichMail.API.call("mbox:updateMessagesStatus", {
                ids: s,
                type: "hitKeyword",
                value: 0
            }, function (e) {
            })
        },
        getImgUrl: function (e) {
            var t = "&sid={sid}&mid={mid}&realsize={realsize}&size={size}&offset={offset}&name={name}&type={type}&width={width}&height={height}&quality={quality}&encoding={encoding}", i = top.getProtocol() + location.host + "/RmWeb/mail?func=mbox:getThumbnail" + $T.Utils.format(t, {
                    sid: top.$App.getSid(),
                    mid: e.mid,
                    size: e.attachSize,
                    realsize: e.attachRealSize,
                    offset: e.attachOffset,
                    name: encodeURIComponent(e.attachName),
                    type: e.attachType,
                    width: 150,
                    height: 90,
                    quality: 100,
                    encoding: e.encode
                });
            return i
        },
        getUrl: function (e) {
            var t = (top.getDomain("webmail"), top.$App.getSid()), i = "skin_green", a = top.getDomain("rmResourcePath"), n = top.getDomain("diskInterface"), s = top.getDomain("disk"), o = top.$User.getUid() || null, r = top.getRootPath() + "/html/onlinepreview/online_preview.html?fi={fileName}&mo={uid}&dl={downloadUrl}&sid={sid}&id={contextId}&rnd={rnd}&src={type}&loginName={loginName}&fid={fid}&comefrom={comefrom}&composeId={composeId}&previewFileId={previewFileId}";
            r += "&skin={skin}", r += "&resourcePath={resourcePath}", r += "&diskservice={diskService}", r += "&filesize={fileSize}", r += "&disk={disk}", r += "&callback={callback}", r += "&denyforward={denyforward}";
            var l = "";
            return -1 != $T.Url.getFileExtName(e.attachName).indexOf("eml") && (l = "previewEmlReady"), r = $T.Utils.format(r, {
                uid: o,
                sid: t,
                rnd: Math.random(),
                skin: i,
                resourcePath: encodeURIComponent(a),
                diskService: encodeURIComponent(n),
                type: "email",
                fileName: encodeURIComponent(encodeURIComponent(e.attachName)),
                downloadUrl: encodeURIComponent(encodeURIComponent(e.downloadUrl)),
                contextId: e.mid || "",
                fileSize: e.attachRealSize || "",
                encoding: 4,
                disk: s,
                loginName: top.$User.getLoginName(),
                fid: e.fid,
                comefrom: e.comefrom || 54,
                composeId: e.composeId || "",
                denyforward: e.denyforward || 0,
                previewFileId: e.mid + "_0",
                callback: l
            }), r.replace(/'/g, "")
        },
        getDownloadUrl: function (e) {
            var t = window.location.origin + "/RmWeb/view.do?func=attach%3Adownload&mid={mid}&offset={offset}&size={size}&sid={sid}&type=attach&encoding={encoding}&name={name}";
            return t = $T.Utils.format(t, {
                mid: e.mid,
                offset: e.attachOffset,
                size: e.attachSize || "",
                sid: top.$App.getSid(),
                encoding: e.encode,
                name: encodeURIComponent(e.attachName)
            })
        },
        getAttachments: function (t, a) {
            var n = this;
            i.HttpRouter.addRouter("webapp", ["attach:queryAttachmentsByMid"]), i.RichMail.API.call("attach:queryAttachmentsByMid", t, function (i) {
                if ("S_OK" == i.responseData.code) {
                    var s = i.responseData["var"].attachmens;
                    if (s && 0 == s.length && n.againRequest < 2) {
                        n.againRequest++;
                        for (var o = 0; o < t.mids.length; o++)e("#mailListContainer li[mid=" + t.mids[o] + "]").attr("attach", "true");
                        setTimeout(function () {
                            n.renderAttach(function () {
                                n.renderAttachImg()
                            })
                        }, 3e3)
                    }
                    for (var r = {}, l = 0; l < s.length; l++) {
                        var d = s[l].mid;
                        r[d] ? r[d].push(s[l]) : (r[d] = [], r[d].push(s[l]))
                    }
                    a && a(r)
                }
            })
        },
        renderAttach: function (t) {
            var i = this, a = [];
            e("#mailListContainer li[attach=true]").each(function (t, i) {
                var n = e(i).attr("mid");
                a.push(n), e(i).attr("attach", "false")
            }), a.length && i.getAttachments({mids: a}, function (a) {
                for (var n in a)if (a.hasOwnProperty(n)) {
                    for (var s = a[n], o = "", r = 0; r < s.length; r++) {
                        var l = s[r].mid, d = (s[r].attachOffset, s[r].attachRealSize), c = s[r].attachName.lastIndexOf("."), m = $T.Html.encode(s[r].attachName.slice(0, c)), p = $T.Html.encode(s[r].attachName.slice(c + 1)), h = /png|jpg|bmp|gif|pic|tif|jpeg/i.test(p), u = !(d > 20971520), f = /mp3/i.test(p) || /mp4|flv/i.test(p);
                        /eml/i.test(p);
                        s[r].downloadUrl = i.getDownloadUrl(s[r]);
                        var v = i.checkFileType(p);
                        h && u ? o += ['<a href="' + i.getUrl(s[r]) + '" target="_blank" bh="online_preview" style="display:inline-block;">', '<div class="attachmentItem" type="' + p + '">', '<div class="attItem-img">', '<img src="/m2015/images/module/welcome/attachment/img_loading.png" alt="" class="attachImg"  _src="' + i.getImgUrl(s[r]) + '" style="height:90px;">', "</div>", "</div>", "</a>"].join("") : "file" != v && !h && u ? o += "music" != v && "video" != v || f ? "music" == v && f ? ['<a href="javascript:void(0);" target="" onclick="BH("online_preview");top.M2012.ReadMail.View.FilePreview.stopPropagation(event);top.M2012.ReadMail.View.FilePreview.playMusic(\'' + l + "','" + s[r].attachName + "','" + i.getDownloadUrl(s[r]) + '\');return false;" style="display:inline-block;">', '<div class="attachmentItem" type="' + p + '">', '<div class="attItem-file">', '<div class="attItem-file-img"><img src="/m2015/images/module/welcome/attachment/img_' + i.checkFileType(p) + '.png" alt=""></div>', '<div class="attItem-file-txt">', "<span>" + m + "</span>", "</div>", "</div>", "</div>", "</a>"].join("") : "eml" == v ? ['<a href="' + i.getUrl(s[r]) + '" target="_blank" bh="online_preview" style="display:inline-block;">', '<div class="attachmentItem" type="' + p + '">', '<div class="attItem-file">', '<div class="attItem-file-img"><img src="/m2015/images/module/welcome/attachment/img_file.png" alt=""></div>', '<div class="attItem-file-txt">', "<span>" + m + "</span>", "</div>", "</div>", "</div>", "</a>"].join("") : ['<a href="' + i.getUrl(s[r]) + '" target="_blank" bh="online_preview" style="display:inline-block;">', '<div class="attachmentItem" type="' + p + '">', '<div class="attItem-file">', '<div class="attItem-file-img"><img src="/m2015/images/module/welcome/attachment/img_' + i.checkFileType(p) + '.png" alt=""></div>', '<div class="attItem-file-txt">', "<span>" + m + "</span>", "</div>", "</div>", "</div>", "</a>"].join("") : ['<a href="' + s[r].downloadUrl + '" bh="online_download"" style="display:inline-block;">', '<div class="attachmentItem" type="' + p + '">', '<div class="attItem-file">', '<div class="attItem-file-img"><img src="/m2015/images/module/welcome/attachment/img_' + i.checkFileType(p) + '.png" alt=""></div>', '<div class="attItem-file-txt">', "<span>" + m + "</span>", "</div>", '<div class="unknow-file"  title="下载文件">', '<div class="unknow-file-bg"></div>', '<i class="i-downLoad"></i>', "</div>", "</div>", "</div>", "</a>"].join("") : "file" != i.checkFileType(p) && u || (o += ['<a href="' + s[r].downloadUrl + '" bh="online_download"" style="display:inline-block;">', '<div class="attachmentItem" type="' + p + '">', '<div class="attItem-file">', '<div class="attItem-file-img"><img src="/m2015/images/module/welcome/attachment/img_' + i.checkFileType(p) + '.png" alt=""></div>', '<div class="attItem-file-txt">', "<span>" + m + "</span>", "</div>", '<div class="unknow-file"  title="下载文件">', '<div class="unknow-file-bg"></div>', '<i class="i-downLoad"></i>', "</div>", "</div>", "</div>", "</a>"].join(""))
                    }
                    e("#mailListContainer").find('li[mid="' + n + '"] .attachmentList').html(o);
                    var g = e("#mailListContainer").width(), _ = e(".attachmentList>a").outerWidth(!0), w = e("#mailListContainer").find('li[mid="' + n + '"] .attachmentList').children("a"), y = w.length;
                    g >= _ * y && e("#mailListContainer").find('li[mid="' + n + '"] .attachmentForm').children("a").hide()
                }
                t && t()
            })
        },
        render: function () {
            var t = this;
            e("#contentList").find(".mailList_con").hasClass("mailList_dynamic") || e("#mailState").hide(), void 0 == this.selectedDate ? e("#unread").show() : e("#unread").hide(), i.Timing.waitForReady("top.$User && top.UserData", function () {
                t.renderAttach(function () {
                    t.renderAttachImg()
                })
            }), this.initEvents(), e(window).resize(function () {
                e(top.document).ready(function () {
                    top.$App.getModel("contacts").requireData(function (e) {
                        t.showUserImg()
                    })
                }), e("#mailListContainer li").removeAttr("style"), e("#mailListContainer .mailListConBox").removeAttr("style"), t.adjustContentSize()
            }), e(window).scroll(function (e) {
                t.checkScroll(), t.renderAttachImg()
            }), this.renderList();
            var a = setInterval(function () {
                e("#mailListContainer").find("li").length > 0 && (e("#mailState").show(), clearInterval(a))
            }, 1e3), n = e.Deferred(), s = n.promise();
            s.then(function (i) {
                e("i[addr]").each(function (e, a) {
                    i.vip && t.lightVipIcon(a, i.vip.contacts)
                }), t.showRelateMe()
            }), e(top.document).ready(function () {
                i.Timing.waitForReady("top.Contacts", function () {
                    top.$App.getModel("contacts").requireData(function (e) {
                        n.resolve(e)
                    })
                })
            }), e("#a_more_email").live("click", function () {
                top.$App.trigger("mailCommand", {command: "viewUnread", fid: 0}), BH("welcome_more")
            }), this.setDefaultImage(), t.adjustContentSize(), t.autoFit(), t.zanView.render(function () {
                var t = 0;
                if (!e(".mailList_con").hasClass("mailList_dynamic"))var i = setInterval(function () {
                    var a = e("#mailListContainer").find("i.i-red-dot").length;
                    a > 0 ? (e("#maildynamic-new").removeClass("hide"), clearInterval(i)) : (t++, e("#maildynamic-new").addClass("hide"), t > 0 && clearInterval(i))
                }, 500)
            })
        },
        renderList: function (t) {
            function a() {
                var t = e("#remindList>ul>li").length || e("#remindList>li").length;
                (e(top.window).height() - 125) / 65 / 2 + 1;
                e("#addTaskTips").remove(), 0 == t && e("#remindList").hide(), 0 == t && 0 == o ? (e("#messageEmpty").remove(), e("#contentList").find(".mailList_con").hasClass("mailList_dynamic") ? e("#mailListContainer").html(l) : (e("#mailListContainer").html(r), e(".mailListHeader li:last").hasClass("active") ? (e(".mailListCon_noNewsTitle").html('"与我有关"没有任何内容'), void 0 == n.selectedDate ? e(".mailListCon_noNewsTxt").html("当前面板会为您自动筛选邮箱内的重要邮件") : e(".mailListCon_noNewsTxt").html("当前面板会为您自动筛选邮箱内的重要邮件")) : (e(".mailListCon_noNewsTitle").html('"' + e("#list_header span").html() + '"没有任何内容'), void 0 == n.selectedDate ? e(".mailListCon_noNewsTxt").html("未读的邮件和消息会展示邮箱内所有的未读邮件及系统消息。") : e(".mailListCon_noNewsTxt").html("当前面板会展示邮箱当天的未读邮件及系统消息。"))), e(".welcomeNewSon_leftCon").append(d), e(".i_icoListPoint").hide(), e(".mailList_con").css("border-left-width", "0px")) : 12 >= t + o ? (e("#contentList").find(".mailList_con").hasClass("mailList_dynamic") ? e("#messageEmpty").show() : e("#messageEmpty").hide(), e(".welcomeNewSon_leftCon").append(d), t + o >= 3 ? e("#addTaskTips .addTaskTipsCon").addClass("layout-horizontal") : e("#addTaskTips .addTaskTipsCon").removeClass("layout-horizontal")) : t + o > 12 && e("#messageEmpty").hide();
                var a = e("#unread").attr("count");
                if (a || (a = "0"), !n.isLoaded) {
                    n.isLoaded = !0;
                    var s = parseInt(a, 10) + t;
                    0 == s && e("#unread").hide(), t > 0 && (e("#unread").attr("count", s), e("#unread").html(s > 99 ? "99+" : s)), window.mainView.on("birthdayRender", function (t) {
                        s += 1, e("#unread").attr("count", s), e("#unread").html(s > 99 ? "99+" : s), e(".addTaskTipsCon").height() < 400 && e("#addTaskTips .addTaskTipsCon").addClass("layout-horizontal"), n.adjustContentSize()
                    }), window.mainView.on("resize", function () {
                        n.adjustContentSize()
                    })
                }
                var c = e(".welcomeNew_left").offset().left;
                c = c + 202 + 8 + 478, e(".welcomeNewSon_right").addClass("welcomeFixed"), e(".welcomeNewSon_right").css({left: c});
                parent.document.body.clientHeight;
                e("#mailListContainer li:last").find(".mailListConBox").css("border-bottom-width", "0px"), 0 == e("#mailListContainer li").length && e("#remindList>ul>li:last").find(".mailListConBox").css("border-bottom-width", "0px"), e(".mailListCon_starBox").css("right", "0px"), e(".i-stared").attr("title", "取消星标"), e(top.document).ready(function () {
                    top.Contacts ? n.showUserImg() : i.Timing.waitForReady("top.Contacts", function () {
                        n.showUserImg()
                    })
                }), window.remindData = null, n.isRemindLoaded = !0
            }

            var n = this, s = parseInt(e("#today_mail_count").val(), 10), o = e("#mailListContainer").children("li").length;
            e(".i_icoListPoint").show(), e(".mailList_con").css("border-left-width", "1px");
            var r = this.templateEmpty, l = this.mailDynamicEmpty, d = M2012.Welcome.Calendar.View.prototype.templateAdd2, c = "top.$App.show('calendar_addAct', '&date={0}')";
            c = $T.format(c, [$Date.format("yyyy-MM-dd", new Date)]), d = $T.format(d, {href: c}), 0 == s ? (e("#contentList").find(".mailList_con").hasClass("mailList_dynamic") && e("#mailListContainer").html(l), e("#a_more_email").hide()) : 50 > s ? e("#a_more_email").hide() : (e("#mailListContainer li").children().length > 40 ? e("#a_more_email").css("font-size", "12px").show() : e("#a_more_email").hide(), "50" == e("#unread").html() && e("#a_more_email").hide()), s >= 20 && s - this.scrollStartIndex > 0 ? o >= 20 ? e("#loading_more").show() : (e("#loading_more").hide(), e("#a_more_email").css("font-size", "12px").show()) : e("#loading_more").hide(), t || this.isRemindLoaded ? (a(), n.adjustContentSize()) : i.Timing.waitForReady("window.remindData", function () {
                a(), n.adjustContentSize()
            }), mainView.adjustContentListHeight(), e("#clearYourthMail").live("click", function () {
                top.$App.show("clearFileTool")
            })
        },
        showSYSicon: function (e, t) {
            var i = this, a = i.mailConfs;
            if (t = parseInt(t, 10), t >= 1 && 1e6 >= t)return void e.attr({
                src: "/m2015/images/module/welcome/subscribe.png",
                orgsrc: "",
                setorder: "4"
            });
            var n = a.hasOwnProperty(t);
            if (n) {
                var s = a[t];
                return void e.attr({src: "/m2015/images/module" + s.iconUrl, orgsrc: "", setorder: s.setorder})
            }
        },
        showUserImg: function () {
            var t = this, i = e("#div_scroller_inter").find("li[mid]"), a = 52;
            e("#replyContainer").length > 0 && (a = 112);
            for (var n = 0; n < i.length; n++) {
                var s = e(i[n]), o = s.attr("sendid"), r = s.find(".mailListConBox_img").find("img");
                if (s.offset().top - a < e("#div_scroller_inter").height() && (t.showSYSicon(r, o), "" != r.attr("orgsrc"))) {
                    var l = r.attr("orgsrc"), d = s.find("span.name").text(), c = s.find("i.i_icoVips").attr("addr"), m = top.M2012.UI.ContactAvatar.create({
                        url: l,
                        name: d,
                        email: c,
                        width: "40px",
                        height: "40px",
                        borderRadius: "4px"
                    }), p = m.urlType(l);
                    if ("default" == p) {
                        var h = m.render();
                        r.replaceWith(h)
                    } else r.attr({src: l, orgsrc: ""})
                }
            }
        },
        renderDateInfo: function () {
            if (this.selectedDate && this.selectedDate != $Date.format("yyyy-MM-dd", new Date)) {
                e("#today").html(this.selectedDate), e("#yesterday").hide();
                var t = new Date($Date.parseValidDateStr(this.selectedDate).getTime() + 864e5);
                e("#tomorrow span:first").html($Date.format("yyyy-MM-dd", t))
            } else {
                e("#yesterday").show(), e("#today").html("<strong class='mailListHeader_title'>今天&nbsp;<span>(" + this.selectedDate + ")</span></strong>");
                var i = new Date;
                e("#today span:first").html("(" + $Date.format("yyyy-MM-dd", i) + ")"), e("#yesterday span:first").html("(" + $Date.format("yyyy-MM-dd", new Date(i.getTime() - 864e5)) + ")"), e("#tomorrow span:first").html("(" + $Date.format("yyyy-MM-dd", new Date(i.getTime() + 864e5)) + ")")
            }
        },
        lightVipIcon: function (t, i) {
            var a = e(t).attr("addr");
            e.each(i, function (i, n) {
                var s, o = top.Contacts.getContactsById(n);
                if (o && (s = o.emails.toString(), s.indexOf(a) >= 0)) {
                    var r = e(t).closest("div").find("[name=subject]");
                    0 == r.prev().length ? r.before('<em class="referTo bg_darkYellow" flag="vip">VIP联系人</em>') : r.prev().replaceWith('<em class="referTo bg_darkYellow" flag="vip">VIP联系人</em>')
                }
            })
        },
        reduceUnread: function () {
            var t = parseInt(e("#unread").attr("count"), 10);
            t--, e("#unread").attr("count", t), 99 >= t && e("#unread").html(t), e("#today_mail_count").val(t), 0 >= t && e("#unread").hide(), this.scrollStartIndex--, this.renderList(!0), this.checkScroll()
        },
        markStar: function (e, t, i) {
            top.$App.doCommand("mark", {
                type: "starFlag", value: t, mids: [e], callback: i
            }), BH("welcome_star")
        },
        markRead: function (e, t) {
            var i = this;
            top.$App.doCommand("mark", {
                type: "read", value: 0, mids: [e], callback: function () {
                    t(), i.reduceUnread()
                }
            }), BH("welcome_read")
        },
        deleteMail: function (t, i) {
            var a = this;
            top.$App.doCommand("move", {
                comefrom: "welcome", type: "move", fid: 4, mids: [t], callback: function () {
                    e('li[mid="' + t + '"]').remove(), a.reduceUnread()
                }
            }), BH("welcome_delete")
        },
        readMail: function (t) {
            if (t.setOrder && 1 != t.billflag && t.count > 1)switch (t.setOrder) {
                case"1":
                    top.appView.searchTaskmail();
                    break;
                case"2":
                    top.appView.searchVip();
                    break;
                case"3":
                    top.appView.searchMail({flags: {starFlag: 1}});
                    break;
                case"4":
                    top.appView.showSubscribe(!0);
                    break;
                case"5":
                    top.appView.showBill(2);
                    break;
                case"6":
                    top.appView.showBill(1);
                    break;
                case"7":
                    top.appView.showBill(3);
                    break;
                case"8":
                    top.appView.showBill(5);
                    break;
                case"9":
                    top.appView.showBill(6);
                    break;
                case"10":
                    top.appView.show("meetingManage");
                    break;
                case"11":
                    top.appView.showMailbox(5);
                    break;
                case"12":
                    top.appView.showBill(8);
                    break;
                case"13":
                    var i = {
                        fid: t.fid,
                        isSearch: 1,
                        isFullSearch: 0,
                        exceptFids: [4],
                        condictions: [{field: "sendId", operator: "=", value: t.sendid}]
                    };
                    top.appView.searchMail(i);
                    break;
                case"14":
                    top.appView.showBill(14)
            } else {
                top.$App.readMail(t.mid);
                var a = e('li[mid="' + t.mid + '"]').find(".referTo[flag]");
                a.length > 0 && BH("welcome_unread_" + a.attr("flag")), BH("welcome_readNewMail"), e("#contentList").find(".mailList_con").hasClass("mailList_dynamic") || (e('li[mid="' + t.mid + '"]').remove(), this.reduceUnread()), setTimeout(function () {
                    top.$App.trigger("reloadFolder", {reload: !0, comefrom: "welcome"})
                }, 1e3)
            }
        },
        setDefaultImage: function () {
            e(".mailListConBox_img>img").each(function () {
                e(this)[0].onerror = function () {
                    var t = e(this).attr("src"), i = top.getRootPath() + "/images/module/welcome/mybeKnow.png";
                    e(this).attr("src", i).attr("orgiSrc", t)
                }
            })
        },
        currentPage: 1,
        loadMaildynamic: function () {
            var t = location.href.replace(/\?.+/gi, "?type=maildynamic&currentPage=1&sid=" + top.sid + "&rnd=" + Math.random());
            e.get(t, function (t) {
                e(document.body).find("#MailList").remove(), e(document.body).append(t), render("MailList")
            })
        },
        scrollMailDynamic: function (t) {
            var i = this;
            this.isScrollLoading = !0, i.currentPage = i.currentPage + 1;
            var a = location.href.replace(/\?.+/gi, "?type=maildynamic&currentPage" + i.currentPage + "&sid=" + top.sid + "&rnd=" + Math.random());
            e.get(a, function (t) {
                if (t && t.match(/mid/))if (e("#mailListContainer li").eq(0).hasClass("attachmentBox")) {
                    e("#mailListContainer li").eq(0).css("border-bottom-color")
                } else {
                    e("#mailListContainer li").eq(0).find(".mailListConBox").css("border-bottom-color")
                }
                e(document.body).find("#MailList").remove(), e(document.body).append(t), setTimeout(function () {
                    i.isScrollLoading = !1
                }, 50), i.showUserImg();
                var a = t.match(/li mid/gi);
                i.currentPage >= 1 || a.length < 30 ? (setTimeout(function () {
                    e("#a_more_email").css("font-size", "12px").parent().show()
                }, 100), e("#loading_more").remove()) : e("#a_more_email").parent().hide(), e("#mailListContainer li:last").find(".mailListConBox").css("border-bottom", "0px")
            })
        },
        scrollStartIndex: 30,
        scrollLoadMail: function (t) {
            var i = this;
            if (this.isScrollLoading = !0, (void 0 != this.selectedDate || this.scrollStartIndex >= 50) && e("#mailListContainer").children("li").size() >= 50) {
                for (var a = e(".mailListHeader").children().length, n = 0; a > n; n++)e(".mailListHeader li:last").hasClass("active") && 2 == n && (e(".mailList_con_li").children("p").hide(), e("#loading_more").remove());
                return void(this.isScrollLoading = !1)
            }
            var s = location.href.replace(/\?.+/gi, "?type=maillist&start=" + this.scrollStartIndex + "&sid=" + top.sid + "&rnd=" + Math.random());
            e.get(s, function (t) {
                if (t && t.match(/mid/))if (e("#mailListContainer li").eq(0).hasClass("attachmentBox")) {
                    e("#mailListContainer li").eq(0).css("border-bottom-color")
                } else {
                    e("#mailListContainer li").eq(0).find(".mailListConBox").css("border-bottom-color")
                }
                e(document.body).find("#MailList").remove(), e(document.body).append(t), setTimeout(function () {
                    i.isScrollLoading = !1
                }, 50), i.showUserImg();
                var a = t.match(/li mid/gi);
                i.scrollStartIndex >= 50 || a.length < 10 ? (setTimeout(function () {
                    e("#a_more_email").css("font-size", "12px").parent().show()
                }, 100), e("#loading_more").hide()) : e("#a_more_email").parent().hide(), e("#mailListContainer li:last").find(".mailListConBox").css("border-bottom", "0px")
            }), this.scrollStartIndex += 10
        },
        loadRelatedMail: function (t) {
            var i = this, a = location.href.replace(/\?.+/gi, "?type=maillist&related=1&sid=" + top.sid + "&rnd=" + Math.random()), n = top.Contacts.getVipInfo();
            n && (a += "&vip=" + n.vipEmails.join(",")), a += "&setting=" + t;
            var s = [];
            e.each(top.$User.getAccountList(), function (e, t) {
                s.push(t.name)
            }), s.length > 0 && (a += "&account=" + s.join(",")), e.get(a, function (t) {
                e(document.body).find("#MailList").remove(), e(document.body).append(t), i.showUserImg()
            }), window.isRelatedList = !0
        },
        reloadMailList: function (t) {
            if (!t)return void(window.location.href = window.location.href);
            this.selectedDate = t;
            var i = location.href.replace(/\?.+/gi, "?type=maillist&sid=" + top.sid + "&rnd=" + Math.random());
            t && (i += "&date=" + t, i = location.href.replace(/\?.+/gi, "?type=maillist&date=" + t + "&sid=" + top.sid + "&rnd=" + Math.random())), e.get(i, function (t) {
                e(document.body).find("#MailList").remove(), e(document.body).append(t)
            }), e("#contentList").find(".mailList_con").removeClass("mailList_dynamic")
        },
        autoFit: function () {
            var t = e("#mailListContainer li[data-control='1']");
            t.each(function (t, i) {
                var a = (e(i).find(".mailListConBox").outerHeight(!0), e(i).find(".mailListConBox_infoCon").outerHeight(!0));
                30 > a ? (e(i).find(".mailListConBox_infoLeft").height(40).css("overflow", "hidden"), e(i).find(".mailListConBox_summary,.mailListConBox_default,.mailListConBox_attachment,.mailListConBox_att_default").height(62), e(i).find(".mailListCon_operationBox").height(62).css("line-height", "62px"), e(i).find(".mailListCon_starBox").css("line-height", "40px")) : (e(i).find(".mailListConBox_infoLeft").height(60).css("overflow", "hidden"), e(i).find(".mailListConBox_summary,.mailListConBox_default,.mailListConBox_attachment,.mailListConBox_att_default").height(76), e(i).find(".mailListCon_operationBox").height(76).css("line-height", "76px"), e(i).find(".mailListCon_starBox").css("line-height", "60px")), e(i).attr("data-control", "2")
            })
        },
        initEvents: function () {
            var t = this;
            e("span[name='from']").css("cursor", "pointer"), e(".mailListConBox_infoCon").css("cursor", "pointer"), e("#mailListContainer li").find(".mailListCon_operationBox").hide();
            var i = null;
            e("#mailListContainer li").mouseenter(function (t) {
                var a = e(this);
                a.addClass("on"), a.find("[name=delete_mail]").attr("title", "删除邮件"), a.find(".i-star").attr("title", "标为星标"), a.children(".mailListConBox_attachment,.mailListConBox_summary,.mailListConBox_default,.mailListConBox_att_default").width(e(".welcomeNewSon_left").width() + 210), clearTimeout(i), i = setTimeout(function () {
                    a.find(".mailListCon_operationBox").show(), a.find(".i-breakHeart").length > 0 ? "none" == a.find(".i-breakHeart").css("display") ? a.find(".mailListConBox").stop().animate({width: e(".welcomeNewSon_left").width() - 120}, 200, "linear") : a.find(".mailListConBox").stop().animate({width: e(".welcomeNewSon_left").width() - 190}, 200, "linear") : "none" == a.find(".i-likeNike-done").css("display") ? a.find(".mailListConBox").stop().animate({width: e(".welcomeNewSon_left").width() - 120}, 200, "linear") : a.find(".mailListConBox").stop().animate({width: e(".welcomeNewSon_left").width() - 154}, 200, "linear"), a.find(".mailListCon_starBox").hide(), a.find(".mailListConBox").removeClass("stared")
                }, 500)
            }).mouseleave(function () {
                clearTimeout(i), e(this).removeClass("on");
                var t = this;
                e(this).find("[name=sp_receive]").show(), e(this).find(".i_icoAccessory[hoverHide]").show(), e(this).find(".mailListConBox").stop().animate({width: e(".welcomeNewSon_left").width() - 30}, 200, "linear", function () {
                    e(t).find(".mailListCon_operationBox").hide(), e(t).find(".mailListCon_operationBox>.i-stared").length > 0 ? (e(t).find(".mailListConBox").addClass("stared"), e(t).find(".mailListCon_starBox").show()) : (e(t).find(".mailListConBox").removeClass("stared"), e(t).find(".mailListCon_starBox").hide())
                })
            }), e("#mailListContainer li .attachmentForm").hover(function () {
                var t = e(this).find(".attachmentList").position().left - 67, i = e(this).find(".attachmentCon").width() - 67, a = e(this).find(".attachmentList").width();
                a > i + 5 && 0 == t ? e(this).find("a.i-attRight").show() : 0 > t && a - -t - 10 > i ? e(this).find("a.i-attLeft,a.i-attRight").show() : 0 > t && i + 10 >= a - -t && (e(this).find("a.i-attRight").hide(50), e(this).find("a.i-attLeft").show())
            }, function () {
                e(this).find("a.i-attLeft,a.i-attRight").hide()
            }), e("#mailListContainer").unbind("click").bind("click", function (i) {
                var a = e(i.target).closest("li").attr("mid"), n = Number(e(i.target).closest("li").attr("fid")), s = i.target.getAttribute("name"), o = i.target.className;
                if ("delete_mail" == s)t.deleteMail(a), i.stopPropagation(); else if ("i-star" == o)i.stopPropagation(), t.markStar(a, 1), i.target.className = "i-stared", i.target.title = "标为星标", i.stopPropagation(); else if ("i-stared" == o)i.stopPropagation(), t.markStar(a, 0), i.target.className = "i-star", i.target.title = "取消星标", i.stopPropagation(); else if ("i-likeNike-done" == o)i.stopPropagation(), e(".mailList_con_li .mt_2").hide(), t.markRead(a, function () {
                    e(i.target).closest("li").remove()
                }); else {
                    if ("attachmentItem" == o)return !1;
                    if ("subject" == s || "from" == s || "summary" == s || "mailListConBox_infoCon" == o || "mailListConBox_infoLeft" == o || "mailListConBox_img" == o || "mailListConBox_info clearfix" == o || "mailListConBox_tome" == o || "referTo" == o || "40" == i.target.width && "IMG" == i.target.tagName) {
                        e(i.target).closest("p").find("strong").css("font-weight", "normal");
                        var r = e(i.target).closest("li").find(".mailListConBox_img img").attr("setorder"), l = e(i.target).closest("li").attr("billflag"), d = e(i.target).closest("li").attr("sendid"), c = e(i.target).closest("li").find("i.bgc-light-blue").text(), m = {
                            setOrder: r,
                            billflag: l,
                            sendid: d,
                            count: c,
                            mid: a,
                            fid: n
                        };
                        t.readMail(m), i.stopPropagation()
                    } else if ("i-breakHeart" == o) {
                        BH("not_notice");
                        for (var p = "", h = top.$App.getFolders("custom").concat(top.$App.getFolders("system"), top.$App.getFolders("pop")), u = 0, f = h.length; f > u; u++) {
                            var v = h[u], g = v.fid, _ = v.name;
                            n == g && (p = _)
                        }
                        top.$Msg.confirm("取消关注“" + p + "”，首页将不再显示该文件夹的邮件，是否继续？", function () {
                            BH("not_notice_float");
                            var t = top.$App.getCustomAttrs("expectFids").split(",") || [];
                            -1 == e.inArray(String(n), t) && t.push(String(n)), top.$App.setCustomAttrs("expectFids", t.join(",")), window.location.reload()
                        }, function () {
                            BH("still_notice")
                        }, {
                            icon: "warn",
                            dialogTitle: "取消关注",
                            buttons: ["不再关注", "仍然关注"],
                            isHtml: !0
                        }), i.stopPropagation()
                    } else if ("i-attLeft" == o) {
                        if (t.lock) {
                            BH("click_attach_left"), t.lock = !1;
                            var w = e(i.target).parent().find(".attachmentList>a").eq(0).outerWidth(!0), y = e(i.target).parent().find(".attachmentList").position().left - 67;
                            y += w, (y >= 0 || y > -w) && (y = 0, e(i.target).hide(50)), e(i.target).parent().find(".attachmentList").stop().animate({left: y + "px"}, 200, "linear", function () {
                                t.lock = !0, e(i.target).parent(".attachmentForm").find("a.i-attRight").show(50)
                            })
                        }
                    } else if ("i-attRight" == o && t.lock) {
                        t.lock = !1, BH("click_attach_right");
                        var b = e(i.target).siblings(".attachmentCon").find("img[_src]");
                        if (b.length > 0)for (var u = 0; u < b.length; u++) {
                            var C = e(b[u]).attr("_src");
                            e(b[u]).attr("src", C), e(b[u]).removeAttr("_src")
                        }
                        e(i.target).parent(".attachmentForm").find("a.i-attLeft").show(50);
                        var y = e(i.target).parent().find(".attachmentList").position().left - 67, w = e(i.target).parent().find(".attachmentList>a").eq(0).outerWidth(!0);
                        y -= w;
                        var T = e(".attachmentCon").width() - 67 - (e(i.target).parent(".attachmentForm").find(".attachmentList").width() - Math.abs(y));
                        T >= -10 && w > T && (y = y, e(i.target).hide(50)), e(i.target).parent().find(".attachmentList").stop().animate({left: y + "px"}, 200, "linear", function () {
                            t.lock = !0
                        })
                    }
                }
            }), e(".mailListHeaderOpt-link").click(function () {
                top.$App.doCommand("markAll", {fid: 1});
                var t = [];
                e.each(top.$App.getFolders(), function (e, i) {
                    "0" == i.folderPassFlag && t.push(i.fid)
                });
                for (var i = t.length, a = 0, n = 0; n < t.length; n++) {
                    var s = t[n];
                    top.$App.getMailboxView().model.markAllRead(s, null, function () {
                        a++, a == i && (top.M139.UI.TipMessage.show("全部标记完成", {delay: 2e3}), location.href = location.href)
                    })
                }
                BH("welcome_markAllRead")
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Welcome.Maildynamic.View";
    i.namespace(n, a.extend({
        name: n,
        el: "",
        events: {},
        template: {loadingHTML: '<div id="div_calendar_load" class="createActivity mt_177"><img style="position:relative;top:3px;" class="mr_5" src="' + top.getRootPath() + '/images/global/load.gif">加载中...</div>'},
        initialize: function () {
            this.initEvents()
        },
        initEvents: function () {
            e("#list_header").click(function () {
                window.mailListView.reloadMailList()
            }), e("#mailState").click(function () {
                BH("maildynamic"), e(".i-triangleNewWel").css("left", "172px"), e("#remindList").hide();
                var t = e(this).find("#maildynamic-new").hasClass("hide");
                t || e("#maildynamic-new").addClass("hide"), window.mailListView.loadMaildynamic(), e("#contentList").find(".mailList_con").addClass("mailList_dynamic")
            })
        }
    }))
}(jQuery, _, M139), function (e, t) {
    var i = Backbone.Model, a = "Welcome.RemindList.Model";
    t.namespace(a, i.extend({
        name: a, initialize: function () {
        }, setData: function (e) {
            this.set("data", e)
        }, getMsgList: function (e) {
            t.RichMail.API.call("msg:getRemindMsg", {}, function (t) {
                var i = t.responseData;
                e && e(i)
            })
        }, removeMsg: function (e, i) {
            t.RichMail.API.call("msg:delRemindMsg", e, function (e) {
                var t = e.responseData;
                i && i(t)
            })
        }, updateInviteStatus: function (e, t) {
            var i = {comeFrom: 0, refuseResion: ""};
            i.seqNos = e.seqNo, i.actionType = e.actionType, $RM.call("calendar:updateInviteStatus", i, function (e) {
                t && t(e.responseData)
            }, function (e) {
                t && t(0), top.M139.UI.TipMessage.show("请求失败", {delay: 2e3, className: "msgRed"})
            })
        }, processShareLabelInfo: function (e, t) {
            var i = {comeFrom: 0, refuseResion: ""};
            i.seqNos = e.seqNo, i.actionType = e.actionType, $RM.call("calendar:processShareLabelInfo", i, function (e) {
                t && t(e.responseData)
            }, function (e) {
                t && t(0), top.M139.UI.TipMessage.show("请求失败", {delay: 2e3, className: "msgRed"})
            })
        }, markFinish: function (e, t, i) {
            var a = top.$App.getView("remind").model;
            a.set("mid", t), a.deleteRemind({
                requestData: {actionType: 2, specialType: 6, seqNo: e}, success: function () {
                    a.setTask({
                        requestData: {value: 2, time: 0}, success: function () {
                            i && i(), top.$App.trigger("reloadFolder", {reload: !1}), top.$App.trigger("covMailRemindRender", {
                                taskFlag: 2,
                                taskDate: 0,
                                mid: t
                            })
                        }, error: function () {
                            i && i(0)
                        }
                    })
                }, error: function () {
                    i && i(0)
                }
            })
        }, markCancel: function (e, t, i) {
            var a = top.$App.getView("remind").model;
            a.set("mid", t), a.deleteRemind({
                requestData: {actionType: 0, specialType: 6, seqNo: e}, success: function () {
                    a.setTask({
                        requestData: {value: 0, time: 0}, success: function () {
                            i && i(), top.$App.trigger("reloadFolder", {}), top.$App.clearTabCache("readmail_" + t), top.$App.trigger("covMailRemindRender", {
                                taskFlag: 2,
                                taskDate: 0,
                                mid: t
                            })
                        }, error: function () {
                            i && i(0)
                        }
                    })
                }, error: function () {
                    i && i(0)
                }
            })
        }, getUnreadMailList: function (e, i) {
            var e = {
                fid: 0,
                recursive: 0,
                ignoreCase: 0,
                isSearch: 1,
                isFullSearch: 2,
                start: 1,
                total: 100,
                limit: 1e3,
                order: "receiveDate",
                desc: "1",
                flags: {read: 1},
                statType: 1
            };
            t.RichMail.API.call("mbox:searchMessages", e, function (e) {
                var t = e.responseData;
                i && i(t)
            })
        }
    }))
}(_, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Welcome.RemindList.View";
    i.namespace(n, a.extend({
        name: n, el: "#remindList", events: {}, initialize: function (e) {
            return this.model = new Welcome.RemindList.Model, a.prototype.initialize.apply(this, arguments)
        }, render: function () {
            return window._remind_list_data_ && !this.model.get("data") && this.model.setData(window._remind_list_data_), this.initEvents(), this
        }, infoTips: function (e) {
            top.M139.UI.TipMessage.show(e, {delay: 2e3})
        }, warnTips: function (e) {
            top.M139.UI.TipMessage.show(e, {delay: 2e3, className: "msgYellow"})
        }, errorTips: function (e) {
            top.M139.UI.TipMessage.show(e, {delay: 2e3, className: "msgRed"})
        }, initEvents: function () {
            var t = this;
            e("#remindList").on("mouseenter", "li[rid]", function () {
                var t = e(this), i = t.attr("rid");
                t.find("a.mailListConBox_img").css("cursor", "default"), t.addClass("hover"), 3 == i || 4 == i ? t.find("li").append('<span class="mailListConBox_info_ok"><a class="JSOP_accept" href="javascript:;">接受</a><a class="JSOP_reject" href="javascript:;">拒绝</a></span>') : 5 == i ? t.css("cursor", "pointer").find(".mailListConBox_img").css("cursor", "pointer") : 1 != i && 2 != i || t.find(".eventCard").css("cursor", "pointer"), i > 4 && t.addClass("on"), 7 == i && t.find(".mailListConBox_info").append('<div class="mailListConBox_infoTime" style="right:6px; top:10px;"><a class="JSOP_renewal" href="javascript:;">续期</a><a class="JSOP_ignore" href="javascript:;">忽略</a></div>')
            }).on("mouseleave", "li[rid]", function () {
                var t = e(this), i = t.attr("rid");
                i > 3 && t.removeClass("on"), 7 == i && t.find(".mailListConBox_infoTime").remove(), t.removeClass("hover"), t.find(".mailListConBox_info_ok").remove()
            }), e("#remindList").on("click", "li[rid] .eventCard", function (t) {
                var i = e(this), a = (e(t.target), parseInt(i.closest("li[rid]").attr("rid"), 10), i.attr("seqno")), n = i.attr("mid"), s = i.attr("type");
                "A" != t.target.tagName && ("taskmail" == s ? top.$App.show("calendar_addAct", "&seqno=" + a) : "clanderActivity" == s && (top.BH("welcome_msg_watch"), top.$App.show("calendar_addAct", "&seqno=" + n)))
            }), e(".eventBtn a").live("click", function (a) {
                a.stopPropagation();
                var n = e(this), s = e(a.target), o = parseInt(n.closest("li[rid]").attr("rid")), r = n.closest("div[seqno]").attr("seqno"), l = n.closest("div[mid]").attr("mid");
                if (1 == o)"标记完成" == s.text() ? (top.BH("welcome_mark_finish"), t.markFinish(r, l, n)) : "取消任务" == s.text() ? (top.BH("welcome_task_cancle"), t.markCancel(r, l, n)) : (t.rollOutNewMsg(n), top.$App.searchTaskmail()); else if (2 == o)if ("查看" == s.text())top.BH("welcome_msg_watch"), top.$App.show("calendar_addAct", "&seqno=" + l); else if ("删除" == s.text()) {
                    top.BH("welcome_msg_del");
                    var d = {seqNos: l, actionType: 0, isNotify: 0, specialType: 0, comeFrom: 0};
                    n.closest("li[rid]").hide("500"), i.RichMail.API.call("calendar:delCalendar", d, function (e) {
                        var a = e.responseData.code;
                        "S_OK" == a ? (n.closest("li[rid]").remove(), t.infoTips("删除成功！")) : i.RichMail.API.call("calendar:cancelInvitedInfo", {
                            seqNos: l,
                            comeFrom: 0
                        }, function (e) {
                            "S_OK" == e.responseData.code ? (t.infoTips("删除成功！"), n.closest("li[rid]").remove()) : (t.infoTips("删除失败！"), n.closest("li[rid]").show("200"))
                        })
                    })
                }
            }), e("#testHeka,#sendCard").live("click", function () {
                top.BH("welcome_send_birthcard");
                var t = e("#testHeka").attr("data-emails");
                t = t ? t : "", top.$App.show("greetingcard", {email: t, materialId: 10556})
            }), e(".mailListConBox_info_ok a").live("click", function (i) {
                var a = e(this), n = e(i.target), s = parseInt(a.closest("li[rid]").attr("rid")), o = a.closest("li[seqno]").attr("seqno"), r = a.closest("li[mid]").attr("mid");
                3 != s && 4 != s || (n.is("a.JSOP_accept") ? t.markAccept(o, r, a, s) : n.is("a.JSOP_reject") ? t.markReject(o, r, a, s) : (t.rollOutNewMsg(a), top.$App.show("calendar_msg")))
            }), e("#remindList").on("click", "li[rid]>div", function (i) {
                var a = e(i.target), n = e(this), s = parseInt(n.closest("li[rid]").attr("rid")), o = n.closest("li[seqNo]").attr("seqNo"), r = n.closest("li[mid]").attr("mid");
                6 == s ? (t.rollOutNewMsg(n), top.$App.show("googSubscription", {mtype: 0})) : 7 == s && (a.is("a.JSOP_renewal") ? t.markRenewal(o, r, n) : a.is("a.JSOP_ignore") ? t.markIgnore(o, r, n) : (top.$App.show("diskDev", {from: "cabinet"}), t.rollOutNewMsg(n)))
            })
        }, rollOutNewMsg: function (e) {
            var t = e.closest("li[rid]");
            parseInt(t.attr("rid")), this.model;
            t.fadeOut(500, function () {
                t.find("ul").is(":empty") && t.fadeOut(200, function () {
                    t.css("display", "none")
                })
            })
        }, markIgnore: function (e, t, i) {
            var a = this, n = this.model;
            n.removeMsg({seqNO: e}, function () {
                a.rollOutNewMsg(i), a.infoTips("已忽略")
            })
        }, reduceUnread: function () {
            var t = parseInt(e("#unread").attr("count"), 10);
            t--, e("#unread").attr("count", t), 99 >= t && e("#unread").html(t), e("#today_mail_count").val(t), 0 >= t && e("#unread").hide()
        }, markFinish: function (e, t, i) {
            var a = this, n = this.model;
            a.rollOutNewMsg(i), n.markFinish(e, t, function () {
                a.rollOutNewMsg(i), a.infoTips("待办任务标记完成")
            }), top.$App.clearTabCache("calendar"), this.reduceUnread()
        }, markCancel: function (e, t, i) {
            var a = this, n = this.model;
            a.rollOutNewMsg(i), n.markCancel(e, t, function (e) {
                a.rollOutNewMsg(i), a.infoTips("待办任务取消成功")
            }), top.$App.clearTabCache("calendar"), this.reduceUnread()
        }, markAccept: function (e, t, i, a) {
            function n(e) {
                e && "S_OK" == e.code ? (s.rollOutNewMsg(i), s.infoTips("已接受")) : s.warnTips("活动已取消")
            }

            var s = this, o = this.model, r = {seqNo: t, actionType: 0};
            o.removeMsg({seqNO: e}), 3 == a ? o.updateInviteStatus(r, n) : 4 == a && o.processShareLabelInfo(r, n)
        }, markReject: function (e, t, i, a) {
            function n(e) {
                e && "S_OK" == e.code ? (s.rollOutNewMsg(i), s.infoTips("已拒绝")) : s.warnTips("活动已取消")
            }

            var s = this, o = this.model, r = {seqNo: t, actionType: 1};
            o.removeMsg({seqNO: e}), 3 == a ? o.updateInviteStatus(r, n) : 4 == a && o.processShareLabelInfo(r, n)
        }, markRenewal: function (e, t, i) {
            var a, n = this, s = this.model, o = s.get("data");
            return o && (a = 0 | i.attr("data-num"), a > 5) ? void top.$Msg.confirm("即将到期的文件过多，请到暂存柜续期", function () {
                n.markIgnore(e, t, i), delete o[7], top.$App.show("diskDev", {from: "cabinet"})
            }, {
                width: 320,
                height: 48,
                dialogTitle: "文件续期",
                buttons: ["去暂存柜", "取消"],
                icon: "i_warn",
                onClose: function () {
                }
            }) : void $RM.call("file:continueFiles", {fileIds: t}, function (t) {
                t = t.responseData, "S_OK" == t.code ? (n.rollOutNewMsg(i), n.infoTips("文件续期成功！"), s.removeMsg({seqNO: e}), delete o[7]) : n.warnTips("文件续期失败！")
            })
        }, reloadRemindList: function (t) {
            var i = location.href.replace(/\?.+/gi, "?type=remindlist&date=" + t + "&sid=" + top.sid + "&rnd=" + Math.random());
            e.get(i, function (t) {
                e(document.body).append(t)
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    "function" != typeof Array.prototype.forEach && (Array.prototype.forEach = function (e, t) {
        for (var i = 0, a = this.length; a > i; i++)"function" == typeof e && Object.prototype.hasOwnProperty.call(this, i) && e.call(t, this[i], i, this)
    }), "function" != typeof Array.prototype.map && (Array.prototype.map = function (e, t) {
        var i = [];
        if ("function" == typeof e)for (var a = 0, n = this.length; n > a; a++)i.push(e.call(t, this[a], a, this));
        return i
    }), "function" != typeof Array.prototype.filter && (Array.prototype.filter = function (e, t) {
        var i = [];
        if ("function" == typeof e)for (var a = 0, n = this.length; n > a; a++)e.call(t, this[a], a, this) && i.push(this[a]);
        return i
    });
    var a = {
        arrImgPath: [{
            day: 0,
            src: "/m2015/images/module/welcome/eventCard/birthday_05.png",
            url: "/m2015/images/module/welcome/eventCard/remind_07.png",
            path: "/m2015/images/module/welcome/eventCard/todo_05.png"
        }, {
            day: 1,
            src: "/m2015/images/module/welcome/eventCard/birthday_01.png",
            url: "/m2015/images/module/welcome/eventCard/remind_01.png",
            path: "/m2015/images/module/welcome/eventCard/todo_01.png"
        }, {
            day: 2,
            src: "/m2015/images/module/welcome/eventCard/birthday_02.png",
            url: "/m2015/images/module/welcome/eventCard/remind_02.png",
            path: "/m2015/images/module/welcome/eventCard/todo_02.png"
        }, {
            day: 3,
            src: "/m2015/images/module/welcome/eventCard/birthday_03.png",
            url: "/m2015/images/module/welcome/eventCard/remind_03.png",
            path: "/m2015/images/module/welcome/eventCard/todo_03.png"
        }, {
            day: 4,
            src: "/m2015/images/module/welcome/eventCard/birthday_04.png",
            url: "/m2015/images/module/welcome/eventCard/remind_04.png",
            path: "/m2015/images/module/welcome/eventCard/todo_04.png"
        }, {
            day: 5,
            src: "/m2015/images/module/welcome/eventCard/birthday_05.png",
            url: "/m2015/images/module/welcome/eventCard/remind_05.png",
            path: "/m2015/images/module/welcome/eventCard/todo_05.png"
        }, {
            day: 6,
            src: "/m2015/images/module/welcome/eventCard/birthday_05.png",
            url: "/m2015/images/module/welcome/eventCard/remind_06.png",
            path: "/m2015/images/module/welcome/eventCard/todo_05.png"
        }], change: function (e) {
            return this.arrImgPath[e]
        }
    }, n = {
        parse: function (e) {
            var t = {}, i = e.split("&");
            return i.forEach(function (e) {
                var i = e.split("=");
                t[i[0]] = i[1]
            }), t
        }
    }, s = {
        parseEmail: function (e) {
            var t = /(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}|(?:"[^"]*")?\s?<[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}>)\s*(?=;|,|，|；|$)/gi, i = /^"([^"]+)"|^([^<]+)</, a = /<?([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})>?/i, n = e.match(t), s = [];
            if (n)for (var o = 0, r = n.length; r > o; o++) {
                var l = {};
                l.all = n[o];
                var d = n[o].match(i);
                d && (l.name = d[1]), d = n[o].match(a), d && (l.addr = d[1]), l.addr && (l.account = l.addr.split("@")[0], l.domain = l.addr.split("@")[1], l.name || (l.name = l.account), s.push(l))
            }
            return s
        }, format: function (e, t, i) {
            var a, n, s, o;
            for (t.length || (t = [t]), n = t.length, s = /\{([\w]+)\}/g, a = 0, o = []; n > a; a++)o.push(e.replace(s, function (e, n) {
                var s = n;
                return t[a][s] ? String(t[a][s]) : i && i[s] ? i[s].apply(t[a]) : void 0
            }));
            return o.join("")
        }, formatDate: function (e, t) {
            var i = /yyyy|yy|M+|d+|h+|m+|s+|q+|S|w/g;
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
                    case"hh":
                    case"h":
                        i = t.getHours();
                        break;
                    case"mm":
                    case"m":
                        i = t.getMinutes();
                        break;
                    case"ss":
                    case"s":
                        i = t.getSeconds();
                        break;
                    case"q":
                        i = Math.floor((t.getMonth() + 3) / 3);
                        break;
                    case"S":
                        i = t.getMilliseconds();
                        break;
                    case"w":
                        i = "日一二三四五六".charAt(t.getDay());
                        break;
                    default:
                        i = ""
                }
                return 2 == e.length && 1 == i.toString().length && (i = "0" + i), i
            })
        }, htmlEncode: function (e) {
            return "string" != typeof e ? "" : e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/ /g, "&nbsp;")
        }
    }, o = {
        mail: {
            key: "mail", type: 0, compile: function (e) {
                return ""
            }
        }, groupmail_gin: {
            key: "addrGroupinvite", compile: function (e) {
                return ""
            }
        }, addr_mkpn: {
            key: "addrMaykown", compile: function (e) {
                return ""
            }
        }, calendar_invite: {
            key: "calendarInvite", type: 3, compile: function (t, i) {
                var a = [], o = [], r = t.msgContent.split("|");
                r.shift();
                var l = i && i.date || s.formatDate("yyyy-MM-dd", new Date);
                return a = r.map(function (e, t) {
                    return n.parse(e)
                }).filter(function (e, t) {
                    return e.date && 0 === e.date.indexOf(l)
                }).map(function (e, i) {
                    o.push(e.id);
                    var a = /会议|例会|周会/i.test(e.activity) ? "会议" : "活动", n = '<div class="mailListConBox clearfix"><a href="javascript:;" class="mailListConBox_img"><img src="/m2015/images/module/welcome/img_03.jpg"/></a><div class="mailListConBox_info clearfix"><div class="mailListConBox_infoLeft"><ul class="mailListConBox_listOne"><li mid="' + e.id + '" seqno="' + t.seqNO + '" class="ellipsis">  <p></p><span class="name green">' + s.htmlEncode(e.name) + '</span>  邀请您参加 " <strong class="themeFour">' + s.htmlEncode(e.activity) + '</strong>" ' + a + "</p></li></ul></div></div></div>";
                    return n
                }), e("body").data("arrCalId", o), a
            }
        }, calendar_share: {
            key: "calendarShare", type: 4, compile: function (e, t) {
                var i = [], a = e.msgContent.split("|");
                a.shift();
                var o = t && t.date || s.formatDate("yyyy-MM-dd", new Date);
                return i = a.map(function (e, t) {
                    return n.parse(e)
                }).filter(function (e, t) {
                    return e.date && 0 === e.date.indexOf(o)
                }).map(function (t, i) {
                    return '<div class="mailListConBox clearfix"><a href="javascript:;" class="mailListConBox_img"><img src="/m2015/images/module/welcome/img_04.jpg"/></a><div class="mailListConBox_info clearfix"><div class="mailListConBox_infoLeft"><ul class="mailListConBox_listOne"><li mid="' + t.id + '" seqno="' + e.seqNO + '" class="ellipsis"><span class="name green ">' + s.htmlEncode(t.name) + '</span>给您共享了日历  "<strong class="themeFour">' + s.htmlEncode(t.activity) + '</strong>"</li></ul></div></div></div>'
                })
            }
        }, calendar_cen: {
            key: "calendarActivity", type: 2, compile: function (t, o) {
                var r = [], l = t.msgContent.split("|id");
                l.shift();
                var d = o && o.date || s.formatDate("yyyy-MM-dd", i.Date.getServerTime());
                e("body").data("arrCalId");
                e("body").removeData("arrCalId");
                return r = l.map(function (e, t) {
                    return e = "id" + e, n.parse(e)
                }).filter(function (e, t) {
                    return e.date ? e.date.indexOf(d) >= 0 : void 0
                }).sort(function (e, t) {
                    return e.date.charCodeAt(0) > 255 ? "00:00" > t.date : t.date.charCodeAt(0) > 255 ? e.date > "00:00" : e.date > t.date
                }).map(function (e, i) {
                    var n = $Date.parse(e.date.split(" ")[0] + " 00:00:00").getDay();
                    if (e.date.indexOf(!0))var o = e.date.split(" ")[1];
                    var r = a.change(n), l = ['<div class="mailListConBox clearfix remindCard">', '<a href="javascript:;" class="mailListConBox_img"><img src="/m2015/images/module/welcome/img_02.jpg" alt="" title=""></a>', '<div class="eventCard clearfix" type="clanderActivity" mid="' + e.id + '" seqno="' + t.seqNO + '">', '<div class="eventImg"><img src="' + r.url + '" alt="" title=""></div>', '<div class="eventInfo">', '<div class="eventInfoList">', '<p class="eventTime">', "<span>" + o + "</span>", "</p>", '<p class="eventTxt">', '<strong>“<span class="eventTxt-main" style="max-width:68%;">' + s.htmlEncode(e.name) + "</span>”</strong>活动开始", "</p>", '<p class="eventBtn">', '<a href="javascript:;" class="eventLink">查看</a>', '<a href="javascript:;" class="eventLink">删除</a>', "</p>", "</div>", "</div>", "</div>", "</div>"].join("");
                    return l
                })
            }
        }, netdisk_tsen: {
            key: "cabinet", type: 7, compile: function (e) {
                var t, i = [], a = n.parse(e.msgContent);
                return a.name && (i = a.name.split(","), i = i.map(function (e, t) {
                    return cut(e, 5)
                })), t = '<div class="mailListConBox clearfix"><a href="javascript:;"class="mailListConBox_img"><img src="/m2015/images/module/welcome/img_07.jpg"/></a><div class="mailListConBox_info clearfix"><div class="mailListConBox_infoLeft"><ul class="mailListConBox_listOne"><li mid="' + a.id + '" seqno="' + e.seqNO + '" data-num="' + a.count + '">' + i.slice(0, 3).join("、"), a.count > 3 && (t += ' 等<strong class="orange">' + a.count + "个</strong>"), t += "文件即将到期</li></ul></div></div></div>", [t]
            }
        }, cpo_cpopu: {
            key: "myMagazine", type: 6, compile: function (e) {
                var t = parseInt(e.msgContent, 10);
                return t > 0 ? [] : []
            }
        }, cpo_cponm: {
            key: "magazineHome", compile: function (e) {
                var t = "";
                return t
            }
        }, calendar_task: {
            key: "myTask", type: 1, compile: function (e) {
                var t = [], o = e.msgContent.split("|mid");
                return o.shift(), t = o.map(function (e, t) {
                    e = "mid" + e;
                    var o = n.parse(e), r = o.date.split(" "), l = $Date.parse(o.date).getDay(), d = a.change(l), c = r[1] ? r[1] : r[0];
                    if (c == r[0] && (c = "今天"), r[0] == i.Date.getServerTime().format("yyyy-MM-dd")) {
                        var m = ['   <div class="mailListConBox clearfix todoCard">', '       <a href="javascript:;" class="mailListConBox_img"><img src="/m2015/images/module/welcome/img_01.jpg"/></a>', '        <div class=" eventCard clearfix " type="taskmail" mid="' + o.mid + '" seqno="' + o.calendarId + '">', '            <div class="eventImg"><img src="' + d.path + '" alt="" title=""></div>', '            <div class="eventInfo">', '               <div class="eventInfoList">', '                    <p class="eventTime">', "                        <span>" + c + "</span>", "                    </p>", '                   <p class="eventTxt">', '                        <strong>“<span class="eventTxt-main">' + s.htmlEncode(o.name.replace(/(RE:)|(fw:)/gi, "")) + "</span>”</strong>待处理", "                   </p>", '                    <p class="eventBtn">', '                        <a href="javascript:;" class="eventLink">标记完成</a>', '                        <a href="javascript:;" class="eventLink">取消任务</a>', "                    </p>", "                </div>", "            </div>", "       </div>", "    </div>"].join("");
                        return m
                    }
                })
            }
        }
    }, r = function (e, t) {
        var a, n, r, l, d, c = {};
        if (!e || !e.length)return c;
        d = s.formatDate("yyyy-MM-dd", i.Date.getServerTime()), r = !t || t.date == d;
        try {
            for (var m = i.Date.getServerTime().getTime(), p = (r ? s.formatDate("yyyy-MM-dd", new Date(m - 864e5)) : "", e.length - 1); p >= 0; p--)n = e[p], l = o[n.msgType], l && void 0 != l.type && 0 != n.msgContent && (r || 3 == l.type || 4 == l.type) && (a = $Date.parse(n.createTime.trim()), c[l.type] = {
                type: n.msgType,
                seqNO: n.seqNO,
                date: a,
                contents: l.compile(n, t)
            })
        } catch (h) {
            console.log(h)
        }
        return c
    }, l = i.View.ViewBase, d = "M2012.Welcome.Remind.View";
    i.namespace(d, l.extend({
        name: d,
        el: "#remindList",
        liTemplate: ['<li rid="{rid}" src="{src}">', "                    {desc}", "</li>"].join(""),
        ulTemplate: '<ul class="mailListCon clearfix">{lis}</ul>',
        events: {},
        initialize: function (e) {
            this.render(e.initData)
        },
        render: function (e) {
            this.renderRemind(e, null), this.initEvents(), this.renderBirthRemind()
        },
        getMindsHtml: function (e, t) {
            for (var i = "", a = (e.type, e.seqNO, e.date, e.contents), n = [{
                className: "mailListConBox_list",
                imgUrl: "/images/module/welcome/img_01.jpg"
            }, {
                className: "mailListConBox_list",
                imgUrl: "/images/module/welcome/img_01.jpg"
            }, {
                className: "mailListConBox_list",
                imgUrl: "/images/module/welcome/img_02.jpg"
            }, {
                className: "mailListConBox_list",
                imgUrl: "/images/module/welcome/img_03.jpg"
            }, {
                className: "mailListConBox_listOne",
                imgUrl: "/images/module/welcome/img_04.jpg"
            }, {
                className: "mailListConBox_listTwo",
                imgUrl: "/images/module/welcome/img_05.jpg"
            }, {
                className: "mailListConBox_listOne",
                imgUrl: "/images/module/welcome/img_06.jpg"
            }, {
                className: "mailListConBox_listTwo",
                imgUrl: "/images/module/welcome/img_07.jpg"
            }], s = 0, o = a.length; o > s; s++)a[s] && (i += $T.Utils.format(this.liTemplate, {
                rid: t,
                href: "javascript:;",
                src: top.getRootPath() + n[t].imgUrl,
                desc: a[s]
            }));
            return i
        },
        renderRemind: function (t, i) {
            var a = this, n = "";
            if (n = e("body").data("birString") ? e("body").data("birString") : "", "" != n && e("#messageEmpty").remove(), t && t["var"])var s = t["var"]; else var s = {};
            var o = r(s, i), l = "";
            for (var d in o)l += this.getMindsHtml(o[d], d);
            var c = $T.Utils.format(this.ulTemplate, {lis: l});
            c = n + c, e(this.el).html(c).show(), i && i.date == (new Date).format("yyyy-MM-dd") && a.renderBirthRemind(t);
        },
        renderBirthRemind: function (t) {
            var n = new Date, s = $Date.format("yyyy-MM-dd", n), o = {
                includeTypes: 1,
                maxCount: 2,
                comefrom: 0,
                startDate: $Date.format("yyyy-MM-dd", n),
                endDate: $Date.format("yyyy-MM-dd", new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1))
            };
            if (i.RichMail.API.call("calendar:getCalendarView", o, function (t) {
                    function i(t) {
                        l = t.length;
                        for (var i, n = [], s = 0; l > s; s++) {
                            if (3 > s) {
                                var o = t[s].title.replace(/生日$/, "");
                                /\D+/.test(o) ? p.push($T.Utils.getTextOverFlow2(o, 12, "")) : p.push($T.Utils.getTextOverFlow2(o, 11, ""))
                            }
                            n.push(t[s].emailAddress);
                            var r = $Date.parse(t[s].dtStart).getDay();
                            i = a.change(r)
                        }
                        p = p.join("、"), m = l > 3 ? "<strong>" + p + "</strong>&nbsp;等<var>" + l + "人</var>" + m : "<strong>" + p + "</strong>" + m;
                        var d = ['<li rid="{rid}"  data-emails="' + n.join(";") + '"  id="testHeka">', '<div class="mailListConBox clearfix birthdayCard">', '<a href="{href}" class="mailListConBox_img"><img src="{src}"/></a>', '<div class=" eventCard clearfix ">', '<div class="eventImg"><img src="' + i.src + '" alt="" title=""></div>', '<div class="eventInfo">', '<div class="eventInfoList">', '<p class="eventTime hide">', "<span>10:00</span>", "</p>", '<p class="eventTxt">', m, "</p>", '<p class="eventBtn">', '<a href="javascript:;" class="eventLink" id="sendCard">发送贺卡</a>', "</p>", "</div>", "</div>", "</div>", "</div>", "</li>"].join(""), h = $T.Utils.format(d, {
                            rid: "5",
                            href: "javascript:;",
                            src: "/m2015/images/module/welcome/img_05.jpg"
                        });
                        e("body").data("birString", h), c = e("#remindList>.mailListCon"), c.prepend(h), e("#remindList").show(), l > 0 && e(".mailListCon_noNews").hide()
                    }

                    if (t.responseData && "S_OK" == t.responseData.code) {
                        var n = t.responseData["var"];
                        if (n[s]) {
                            for (var o = n[s].info, r = [], d = 0; d < o.length; d++) {
                                var h = o[d], u = t.responseData.table[h];
                                r.push(u)
                            }
                            i(r), window.mainView.trigger("birthdayRender", {count: r.length}), e("#remindList .mailListConBox").css("width", "95%")
                        }
                    }
                }), e("body").attr("birString")) {
                var r = e("body").data("birString");
                c = e("#remindList>.mailListCon"), c.append(r), c.show()
            }
            var l, d, c, m = "今日生日，赶紧送上祝福吧~", p = [];
            if (t = t || {}, d = t.BirthdayContactInfo, void 0 == d)return !1;
            for (var h = 0; h < d.length; h++) {
                var u = $Date.parse(d[h].BirDay + " 00:00:00"), n = new Date, f = u.getMonth() == n.getMonth(), v = u.getDate() == n.getDate();
                f && v || (d.splice(h, 1), h--)
            }
            t.TotalRecord > 0 && d && d.length
        },
        initEvents: function () {
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Welcome.relatedMail.View";
    i.namespace(n, a.extend({
        el: "body",
        template: ['<div class="relatedTome">', '<img class="relatedToMe_img" src="/m2015/images/module/welcome/relatedTome.png">', '<p class="relatedToMe_txt">是139邮箱自动为您筛选的<span class="bloldTxt">重要邮件</span>，该分类邮件的筛选条件可由您灵活设置。</p>', '<i class="i-btn_close"></i>', '<i class="i-arrow_relatedToMe"></i>'].join(""),
        template_all: ['<div class="relatedToMe_header">', "<p>根据左侧的筛选条件，选择您想显性化的邮件。筛选条件不断扩充中，敬请期待...</p>", "<!-- 关闭按钮 -->", '<i class="i-btnClose_pw"></i>', "</div>", '<div class="relatedToMe_conBox clearfix">', '<ul class="relatedToMe_nav fl">', '<li class="relatedToMe_itemList on"><i class="i-keyWord"></i>包含关键字</li>', '<li class="relatedToMe_itemList"><i class="i-vip"></i>VIP联系人</li>', '<li class="relatedToMe_itemList"><i class="i-sendMyself"></i>只发给我</li>', '<li class="relatedToMe_itemList"><i class="i-remindMe"></i>@我的</li>', '<li class="relatedToMe_itemList"><i class="i-myLable"></i>我的标签</li>', '<li class="relatedToMe_itemList"><i class="i-mailFolder"></i>文件夹管理</li>', "</ul>", '<div class="relatedToMe_mainBox">', "<!-- 关键字 -->", '<div class="relatedToMe_main">', '<div class="relatedToMe_mainHd">', '<p class="relatedToMe_mainHd_txt">包含关键字</p>', "<!-- openingbtn开关打开状态，closingbtn关闭状态 --> ", '<div class="c-checkbox">', '<input type="checkbox" id="notify_enable" checked="checked" class="chk-m139check">', '<label name="lbl_notify_enable" for="notify_enable" class="closingbtn openingbtn" style="">&nbsp;&nbsp;&nbsp;&nbsp;</label>', "</div>", "</div>", '<div class="relatedToMe_mainCon relatedToMe_keyWordMainCon">', '<p class="relatedToMe_mainConTxt">未读邮件的主题含指定关键字时，显示“关键字”。</p>', '<div class="relatedToMe_mainCon_subconBox">', '<p class="relatedToMe_mainConTitle">添加关键字：</p>', '<div class="relatedToMe_iptBox">', '<input id="tb_keyword" maxlength="16" class="ipt_welocome mr_10" type="text" placeholder="最多不超过16个字">', '<div id="tb_addKey" class="btnBox btnNewGreen">添加</div>', "</div>", '<div class="relatedToMe_mainCon_subcon">', '<ul class="clearfix" id="keyword_list" style="">', "</ul>", "</div>", "</div>", "</div>", "</div>", "<!-- VIP联系人 -->", '<div class="relatedToMe_main hide">', '<div class="relatedToMe_mainHd">', '<p class="relatedToMe_mainHd_txt">VIP联系人</p>', "<!-- openingbtn开关打开状态，closingbtn关闭状态 -->", '<div class="c-checkbox">', '<input type="checkbox" id="notify_enable" checked="checked" class="chk-m139check">', '<label name="lbl_notify_enable" for="notify_enable" class="closingbtn openingbtn" style="">&nbsp;&nbsp;&nbsp;&nbsp;</label>', "</div>", "</div>", '<div class="relatedToMe_mainCon relatedToMe_addr_subcon">', '<p class="relatedToMe_mainConTxt">未读邮件来自VIP联系人时，显示“VIP联系人”。</p>', '<div class="relatedToMe_mainCon_subconBox">', '<div class="clearfix relatedToMe_addr writeTable-txt" style="">', "</div>", "</div>", '<a class="icoG" href="javascript:top.$App.doCommand(\'addVip\');top.BH(\'click_add_vip_contact\');"><span class="addVipAddr">添加VIP联系人</span></a>', "</div>", "</div>", "<!-- 只发给我 -->", '<div class="relatedToMe_main hide">', '<div class="relatedToMe_mainHd">', '<p class="relatedToMe_mainHd_txt">只发给我</p>', "<!-- openingbtn开关打开状态，closingbtn关闭状态 -->", '<div class="c-checkbox">', '<input type="checkbox" id="notify_enable" checked="checked" class="chk-m139check">', '<label name="lbl_notify_enable" for="notify_enable" class="closingbtn openingbtn" style="">&nbsp;&nbsp;&nbsp;&nbsp;</label>', "</div>", "</div>", '<div class="relatedToMe_mainCon">', '<p class="relatedToMe_mainConTxt">未读邮件的收件人只有我一个人（不含广告、垃圾邮件）时，显示“只发给我”。</p>', '<div class="relatedToMe_mainCon_subconBox" name="div_blacklist">', '<p class="relatedToMe_mainConTitle">示例：</p>', '<div class="relatedToMe_mainCon_subcon">', '<img _src="/m2015/images/module/welcome/relatedToMe_02.png">', "</div>", "</div>", "</div>", "</div>", "<!-- @我的 -->", '<div class="relatedToMe_main hide">', '<div class="relatedToMe_mainHd">', '<p class="relatedToMe_mainHd_txt">@我的</p>', "<!-- openingbtn开关打开状态，closingbtn关闭状态 -->", '<div class="c-checkbox">', '<input type="checkbox" id="notify_enable" checked="checked" class="chk-m139check">', '<label name="lbl_notify_enable" for="notify_enable" class="closingbtn openingbtn" style="">&nbsp;&nbsp;&nbsp;&nbsp;</label>', "</div>", "</div>", '<div class="relatedToMe_mainCon">', '<p class="relatedToMe_mainConTxt">未读邮件的发件人在邮件中@我时， 显示“有人@我” 。</p>', '<div class="relatedToMe_mainCon_subconBox">', '<img _src="/m2015/images/module/welcome/relatedToMe_01.png">', "</div>", "</div>", "</div>", "<!-- 我的标签 -->", '<div class="relatedToMe_main hide">', '<div class="relatedToMe_mainHd">', '<p class="relatedToMe_mainHd_txt">我的标签</p>', "<!-- openingbtn开关打开状态，closingbtn关闭状态 -->", '<div class="c-checkbox">', '<input type="checkbox" id="notify_enable" checked="checked" class="chk-m139check">', '<label name="lbl_notify_enable" for="notify_enable" class="closingbtn openingbtn" style="">&nbsp;&nbsp;&nbsp;&nbsp;</label>', "</div>", "</div>", '<div class="relatedToMe_mainCon relatedToMe_mainCon_another">', '<p class="relatedToMe_mainConTxt">未读邮件命中某个自定义标签时，显示“我的标签”。</p>', '<div class="relatedToMe_mainCon_subcon">', '<ul class="clearfix" id="tag_list">', "</ul>", "</div>", "</div>", "</div>", "<!-- 文件夹管理 -->", '<div class="relatedToMe_main hide">', '<div class="relatedToMe_mainHd">', '<p class="relatedToMe_mainHd_txt" style="padding-right:0;">文件夹管理<span class="ml_10 relatedToMe_mainConTxt">设置文件夹的未读邮件是否在首页展示</span></p>', "</div>", '<div class="relatedToMe_mailCon">', '<ul class="relatedToMe_mainCon" id="folder">', "</ul>", "</div>", "</div>", "</div>"].join(""),
        initialize: function (e) {
            return a.prototype.initialize.apply(this, arguments)
        },
        initEvent: function (t) {
            var i = this, a = !1;
            e(window).resize(function () {
                var t = e(".i-welcomeSet").offset().top + 24, i = e(".i-welcomeSet").offset().left - 516;
                e("#related_setting").is(":visible") && e("#related_setting").css({top: t, left: i})
            }), e(document.body).click(function () {
                e(".relatedToMe_popw").addClass("hide"), e(".relatedToMe_popw").hide(), a && (window.location.reload(), a = !1)
            }), e(".i-btnClose_pw").click(function () {
                top.BH("welcome_aboutme2"), e(".relatedToMe_popw").addClass("hide"), a && (window.location.reload(), a = !1)
            }), e(".relatedToMe_itemList").click(function (t) {
                var a = e(this).index();
                e(this).addClass("on").siblings().removeClass("on"), e(".relatedToMe_main").eq(a).removeClass("hide").siblings().addClass("hide"), t.stopPropagation(), 1 == a ? i.loadVip() : 4 == a ? i.loadTag() : 2 == a ? i.loadBlackList() : 5 == a && i.loadFolder();
                var n = {0: "key", 1: "vip", 2: "onlyme", 3: "atme", 4: "tag", 5: "welcome_tab_folder_control"};
                BH("welcome_tab_" + n[a])
            }), this.loadKeyword(), BH("welcome_tab_key"), e("[name=lbl_notify_enable]").click(function () {
                "我的标签" == e(this).parent().prev().html() ? top.BH("welcome_aboutme8") : "@我的" == e(this).parent().prev().html() ? top.BH("welcome_aboutme7") : "只发给我" == e(this).parent().prev().html() ? top.BH("welcome_aboutme6") : "VIP联系人" == e(this).parent().prev().html() ? top.BH("welcome_aboutme4") : "包含关键字" == e(this).parent().prev().html() && top.BH("welcome_aboutme3"), e(this).hasClass("openingbtn") ? (e(this).removeClass("openingbtn"), e(this).prev().removeAttr("checked")) : (e(this).addClass("openingbtn"), e(this).prev().attr("checked", "checked")), i.saveRelatedState()
            }), e("#list_header span").click(function () {
                if (e(".mailListHeader li:last").removeClass("active"), -1 != this.innerHTML.indexOf("未读的邮件和消息"))return void location.reload();
                e(".calendarIndexDiv") && e(".calendarIndexDiv").show(), e(".mailList_con .relatedTome").remove(), e(".scroller-container").before(i.template);
                var t = window.selectedDate;
                e("body").data("selectDate", (new Date).format("yyyy-MM-dd")), mainView.timeSwitcherView.switchDate(t), e(".i-triangleNewWel").animate({left: e("#list_header").position().left + e("#list_header").width() / 2}).delay(500), e("#div_calendar_mask").remove(), e("#list_header").show(), e("#div_scroller_inter .mt_2") && e("#div_scroller_inter .mt_2").hide()
            }), e("#currDayTitle .i-relatedToMe").click(function () {
                if (top.BH("welcome_aboutme"), e(".mailListHeader li:last").addClass("active"), e(".i-triangleNewWel").animate({left: e("#list_header").parent().find("li:last").position().left + e("#list_header").parent().find("li:last").width() / 2 - 3}).delay(500), e("#div_scroller_inter").css({display: "block"}), e(".calendarIndexDiv").hide(), e("#remindList").hide(), window.mailListView) {
                    if (0 == e("#div_calendar_mask").length) {
                        var t = e('<div id="div_calendar_mask"></div>');
                        e(".calendarMod_top").css("zIndex", 2), t.css({
                            width: e(".calendarModTable").width() + "px",
                            height: e(".calendarModTable").height() + "px",
                            right: 14,
                            top: 41,
                            opacity: 0,
                            zIndex: 3,
                            position: "absolute",
                            backgroundColor: "#fff"
                        }), e(".welcomeNew_rightCon").append(t)
                    }
                    1 != top.$App.getUserCustomInfo("relatedClose") && (top.BH("welcome_aboutme_open"), e(".mailList_con .relatedTome").remove(), e(".scroller-container").before(i.template)), e(".i-btn_close").click(function () {
                        top.BH("welcome_aboutme_close"), top.$App.setUserCustomInfoNew({relatedClose: 1}), e(".relatedTome").remove()
                    });
                    var a = top.$App.getCustomAttrs("relatedMail");
                    "" == a && (a = "1,1,1,1,1"), window.mailListView.loadRelatedMail(a)
                }
                return !1
            }), e("#folder").on("click", function (t) {
                var i = top.$App.getCustomAttrs("expectFids").split(",") || [], n = t.target, s = e(n), o = s.closest("li").attr("fid");
                if ("lbl_notify_enable" == n.id)if (BH("folder_open_close"), s.hasClass("openingbtn")) {
                    var r = e("#folder").find('input[check="false"]').length;
                    if (r >= 50)return void top.M139.UI.TipMessage.show("关闭的文件夹数量已达上线，请开启部分再重试", {
                        delay: 2e3,
                        className: "msgRed"
                    });
                    s.removeClass("openingbtn"), i.push(o), top.$App.setCustomAttrs("expectFids", i.join(",")), s.prev("input").prop("checked", !1), s.prev("input[type=checkbox]").removeAttr("checked").attr("check", "false"), a = !0
                } else {
                    s.addClass("openingbtn"), a = !0;
                    var l = e.inArray(o, i);
                    i.splice(l, 1), top.$App.setCustomAttrs("expectFids", i.join(",")), s.prev("input").prop("checked", !0), s.prev("input[type=checkbox]").attr("checked", "checked").attr("check", "true")
                }
            })
        },
        folderTpl: function (e, t, i, a, n) {
            var s = ['<li class="relatedToMe_mainHd" fid="' + t + '">', '<p class="relatedToMe_mainHd_txt">' + e + "</p>", "<!-- openingbtn开关打开状态，closingbtn关闭状态 -->", '<div class="c-checkbox">', '<input type="checkbox" id="notify_enable" ' + a + " " + n + ' class="chk-m139check">', '<label id="lbl_notify_enable" for="notify_enable" class="' + i + '" style="">&nbsp;&nbsp;&nbsp;&nbsp;</label>', "</div>", "</li>"].join("");
            return s
        },
        loadFolder: function () {
            e("#folder").html("");
            for (var t = this, i = "", a = top.$App.getFolders("custom").concat(top.$App.getFolders("system"), top.$App.getFolders("pop")), n = top.$App.getCustomAttrs("expectFids").split(",") || [], s = 0, o = a.length; o > s; s++) {
                var r = a[s], l = String(r.fid), d = r.name;
                1 != l && 2 != l && 3 != l && 4 != l && (i += -1 != e.inArray(l, n) ? t.folderTpl(d, l, "closingbtn", "", 'check="false"') : t.folderTpl(d, l, "closingbtn openingbtn", 'checked="checked"', 'check="true"'))
            }
            e("#folder").append(i)
        },
        showTips: function (t) {
            window.clearTimeout(this.timerId), e("#tips_keyword").remove();
            var i = ['<div id="tips_keyword" style="position:absolute;left:165px;top:124px;z-index:10000;outline:none;font-size: 12px;display:block;padding: 3px 6px;padding-right: 15px;    color: #666;', 'border: #ccc solid 1px;line-height: 21px;background: #fefefe;border-radius: 3px;    box-shadow: 0 0 5px rgba(0,0,0,.1);font-family: Microsoft YaHei;">', '<div style="line-height: 18px;">', t, "</div>", '<div style="position: absolute;display: inline-block;vertical-align: middle;background: url(/m2015/images/global/global_v3_24.png) no-repeat 0 0;_background: url(../../images/global/global_v3.png) no-repeat 0 0;overflow: hidden;left: 10px;right: auto;bottom: -12px; width: 15px;height: 12px;background-position: -67px -341px;;left:10px"></div>', "</div>"].join("");
            e("#tb_keyword").before(i), this.timerId = setTimeout(function () {
                e("#tips_keyword").remove()
            }, 5e3)
        },
        dealEmptyKeyWord: function () {
            0 == e("#keyword_list").children().length && top.$RM.getWhiteBlackList({type: 5}, function (e) {
                var t = e["var"];
                0 == t.length && top.$App.setCustomAttrs("EmptyKeyword", 1)
            })
        },
        loadKeyword: function () {
            function i(t) {
                e("#keyword_list").prepend('<li class="tag_keyword"><span>' + t + '</span><i class="i-btn_close_sml"></i></li>')
            }

            var a = this, n = [];
            e("#keyword_list").click(function (i) {
                if ("i-btn_close_sml" == i.target.className) {
                    var s = e(i.target).closest("li"), o = s.find("span").html();
                    BH("welcome_key_delete"), o = $T.Html.decode(o);
                    var r = {opType: "delete", type: 5, member: o};
                    $RM.setWhiteBlackList(r, function (e) {
                        s.remove(), a.dealEmptyKeyWord(), window.mailListView.removeKey(o, null, n), n = t.without(n, o)
                    })
                }
            }), top.$RM.getWhiteBlackList({type: 5}, function (t) {
                function a(t) {
                    e("#keyword_list").empty(), e.each(t, function (e, t) {
                        i(t)
                    })
                }

                var s = t["var"];
                if (n = s, s && s.length > 0)"1" == top.$App.getCustomAttrs("EmptyKeyword") && top.$App.setCustomAttrs("EmptyKeyword", "0"), a(s), e("#keyword_list").parent().removeClass("relatedToMe_mainCon_subconBox").addClass("relatedToMe_mainCon_subcon"); else if ("" == top.$App.getCustomAttrs("EmptyKeyword")) {
                    var o = {opType: "add", type: 5, member: "会议,邀请,合同,账单,协助,总结,订单,重要,紧急,通知"};
                    $RM.setWhiteBlackList(o, function (e) {
                        a(o.member.split(","))
                    })
                }
            }), e("#tb_keyword").click(function () {
                BH("welcome_key_input")
            }), e("#tb_addKey").click(function () {
                var t = e("#tb_keyword").val().replace(/,/g, "");
                if (e("#keyword_list").children().length >= 15)return void a.showTips("已超过关键词上限，请删除部分再添加");
                if (0 == e("#keyword_list").children().length && top.$App.setCustomAttrs("EmptyKeyword", "0"), "" == t)return void a.showTips("请输入相关内容");
                if (t.length > 16)return void a.showTips("关键字长度超过16字");
                var n = {opType: "add", type: 5, member: t};
                $RM.setWhiteBlackList(n, function (n) {
                    n && "S_OK" == n.code ? (i($TextUtils.htmlEncode(t)), e("#tb_keyword").val(""), top.M139.UI.TipMessage.show("添加成功", {delay: 3e3})) : n && "S_EXISTS" == n.code && a.showTips("关键字重复，请重新输入")
                }), BH("welcome_key_add")
            })
        },
        loadBlackList: function () {
            var t = this;
            top.$RM.getWhiteBlackList({type: 4}, function (i) {
                var a = i["var"];
                if (a && a.length > 0) {
                    var n = [];
                    e.each(a, function (e, t) {
                        var i = $Email.parseEmail(t)[0];
                        n.push('<div class="addrBase" style="margin-bottom:6px" addr="' + t + '" title=""><a href="javascript:;" class="addrBase_con"><b>' + i.account + "</b><span>&lt;" + i.addr + '&gt;</span></a><a class="quickdelete" href="javascript:;" title="删除"><i class="item-close"></i></a></div>')
                    }), n.length > 0 && (e("#blacktips").remove(), e("[name=div_blacklist]").before('<p id="blacktips" class="" style="  margin: 15px 0px 5px; font-size: 14px;">以下联系人不进行标记:</p>'), e("[name=div_blacklist]").removeClass("relatedToMe_mainCon_subconBox").html(n.join(""))), e("[name=div_blacklist]").click(function (i) {
                        if ("item-close" == i.target.className) {
                            var a = e(i.target).closest("div"), n = {
                                opType: "delete",
                                type: 4,
                                member: e(a).attr("addr")
                            };
                            $RM.setWhiteBlackList(n, function (i) {
                                a.remove(), 0 == e("[name=div_blacklist]").children().length && t.initView(2)
                            }), BH("welcome_onlyme_delete")
                        }
                    })
                }
            })
        },
        loadVip: function () {
            var t = this;
            top.$App.getModel("contacts").requireData(function () {
                setTimeout(function () {
                    i.Timing.waitForReady("top.Contacts.getVipInfo()", function () {
                        var i = top.Contacts.getVipInfo();
                        if (i && i.vipContacts) {
                            var a = [];
                            e.each(i.vipContacts, function (e, t) {
                                console.log(t), a.push('<div class="addrBase" title="" serialId=' + t.SerialId + " addr=" + t.emails[0] + '><a href="javascript:;" class="addrBase_con"><b>' + $TextUtils.htmlEncode(t.AddrFirstName) + "</b><span>&lt;" + t.emails[0] + '&gt;</span></a><a class="quickdelete" href="javascript:;" title="删除"><i class="item-close"></i></a></div>')
                            }), a.length > 0 ? e(".relatedToMe_addr").parent().removeClass("relatedToMe_mainCon_subconBox").addClass("relatedToMe_mainCon_subcon") : e(".relatedToMe_addr").parent().html('<img src="/m2015/images/module/welcome/relatedToMe_04.png">'), e(".relatedToMe_addr").html(a.join("")), e(".relatedToMe_addr").click(function (i) {
                                if (BH("welcome_vip_remove"), "item-close" == i.target.className) {
                                    var a = e(i.target).closest("div"), n = a.attr("serialId");
                                    console.log(n);
                                    var s = a.attr("addr");
                                    top.M2012.Contacts.API.removeVipContacts({
                                        data: {serialId: n},
                                        success: function () {
                                            e(a).remove(), 0 == e(".relatedToMe_addr").children().length && t.initView(1), e("#contentList i[addr='" + s + "']").parent().find("[flag=vip]").remove()
                                        }
                                    })
                                }
                            })
                        }
                    })
                }, 20)
            })
        },
        loadTag: function () {
            var t = this, i = {};
            e("#tag_list").empty(), top.$RM.getFilter_New(function (t) {
                e.each(t["var"], function (t, a) {
                    var n = a.dealType.split(",");
                    if (e.inArray("5", n) >= 0 && !i[a.attachLabel]) {
                        i[a.attachLabel] = !0;
                        var s = top.$App.getTagsById([a.attachLabel]), o = s[0];
                        e("#tag_list").append('<li class="tag_keyword" fid=' + o.fid + " filterId=" + a.filterId + "><span>" + o.name + '</span><i class="i-btn_close_sml"></i></li>')
                    }
                }), 0 == e("#tag_list").children().length && e("#tag_list").parent().html('<img src="/m2015/images/module/welcome/relatedToMe_03.png">').removeClass().addClass("relatedToMe_mainCon_subconBox")
            }), e("#tag_list").click(function (i) {
                if ("i-btn_close_sml" == i.target.className) {
                    var a = e(i.target).closest("li"), n = a.attr("filterId");
                    BH("welcome_tag_remove"), top.$RM.setFilter_New({opType: "delete", filterId: n}, function (i) {
                        "S_OK" == i.code && (a.remove(), 0 == e("#tag_list").children().length && t.initView(4))
                    });
                    var s = a.attr("fid");
                    window.mailListView.removeTag(s)
                }
            })
        },
        initView: function (t) {
            var i = this;
            e("#related_setting").html(i.template_all), i.initEvent(), top.BH("welcome_aboutme1"), e(".relatedToMe_mainBox img").each(function (t, i) {
                e(this).attr("_src") && e(this).attr("src", e(this).attr("_src"))
            }), i.loadRelatedState(), t && e(".relatedToMe_nav").children().eq(t).click()
        },
        render: function () {
            var t = this;
            e(".i-welcomeSet").click(function (i) {
                e("#referTo_menu").remove(), t.initView();
                var a = e(this).offset().top + 24, n = e(this).offset().left - 516;
                e(".relatedToMe_popw").css({
                    top: a,
                    left: n
                }), e(".relatedToMe_popw").removeClass("hide"), e(".relatedToMe_popw").show(), e("#related_setting").is(":visible") && e("#related_setting").click(function (e) {
                    e.stopPropagation()
                }), i.stopPropagation(), i.cancelBubble = !0
            })
        },
        loadRelatedState: function () {
            var t = top.$App.getCustomAttrs("relatedMail");
            "" == t && (t = "1,1,1,1,1");
            for (var i = e("[name=lbl_notify_enable]"), a = t.split(","), n = 0; n < i.length; n++) {
                var s = i[n];
                "0" == a[n] && e(s).removeClass("openingbtn")
            }
        },
        saveRelatedState: function () {
            for (var t = e("[name=lbl_notify_enable]"), i = [], a = 0; a < t.length; a++) {
                var n = t[a];
                e(n).hasClass("openingbtn") ? i.push("1") : i.push("0")
            }
            var s = i.join(",");
            top.$App.setCustomAttrs("relatedMail", s, function () {
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var a = i.View.ViewBase, n = "Zan_View";
    i.namespace(n, a.extend({
        name: n,
        el: "",
        initialize: function (e) {
            this.options = e, this.el = e.el || "#mailListContainer", this.mid = e.mid || "", this.share = e.share || "", this.block = e.block || "", this.area = e.area || 2, this.type = e.type || 1, this.UI = i.UI || top.M139.UI, this.checkCode = e.checkCode || "", this.toAndcc = e.toAndcc || ""
        },
        template1: ['<div class="subinfo-box" user={user}>', '<div class="subinfo-nav">', '<a href="javascript:;"><i class="icons i-comment"></i>{redDotComment}评论<var class="discussNum">{discussNum}</var></a>', '<span class="v-line"></span>', "<!-- 已点赞i-lauded -->", '<a href="javascript:;"><i class="icons i-laud {lauded}"></i>{redDotLike}赞<var class="like">{zanNum}</var></a>', '<span class="v-line" style="display:{share}"></span>', '<a href="javascript:;" style="position:relative;display:{share};"><i class="i-subinfo-share"></i>分享</a>', "</div>", '<div class="subinfo-com" style="display:{isShow}">', '<i class="icons i-arr-up"></i>', '<div class="subinfo-main">', '<div class="subinfo-com-list" style="display:{display}">', "{list}", "</div>", '<div class="modBox new-quick-reply discuss-box clearfix">', '<div class="readMailReplyMes-w reply_textarea">', '<textarea class="readMailReplyMes" id="reply_textarea" style="color:#000;" placeholder="写下你的评论，Enter键确认" maxlength="255"></textarea>', "</div>", '<div class="btnBox btnNewGreen disscuss icoG">评论</div>', "</div>", "</div>", "</div>", "</div>"].join(""),
        template2: ['<div class="subinfo-com-item clearfix">', '<div class="subinfo-photo">', '<img src="{src}" alt="">', "</div>", '<dl class="subinfo-message">', "<dt></dt>", '<dd><span class="subinfo-name">{name}</span><span class="subinfo-time c_999" title="{tip}">{time}</span></dd>', "<dd>{content}</dd>", "</dl>", "</div>"].join(""),
        getArrMid: function () {
            var t = this, i = [], a = e(t.el).parents(".mailList_dynamic").length;
            a > 0 ? e(t.el).find("[dynamic=true]").each(function (t, a) {
                var n = e(a).attr("talkid");
                i.push(n), e(a).attr("dynamic", "false")
            }) : e(t.el).find("[discuss=true]").each(function (t, a) {
                var n = e(a).attr("mid");
                i.push(n), e(a).attr("discuss", "false")
            });
            var n = {ids: i.join(","), isUpdateReadTime: "0"};
            return n
        },
        getRequest: function (e, t, a, n) {
            var s, o, r, l, d = this;
            2 == d.area ? (l = "bmail", s = "mail:queryCommentAndLikesByIds", o = e, r = "") : (l = "outland", s = "mail:queryCommentAndLikesForOther", o = null, r = {urlParam: "&checkCode=" + a + "&isUpdateReadTime=" + n}), i.HttpRouter.addRouter(l, [s]), i.RichMail.API.call(s, o, function (e) {
                e.responseData && e.responseData.code && "S_OK" == e.responseData.code && e.responseData["var"] ? t && t(e.responseData["var"]) : (e.responseData && e.responseData.code && "PML10404002" == e.responseData.code && d.UI.TipMessage.show("参数不合法", {delay: 3e3}), e.responseData && e.responseData.code && "PML10407002" == e.responseData.code && d.UI.TipMessage.show("系统错误", {delay: 3e3}), e.responseData && e.responseData.code && "PML10406003" == e.responseData.code && d.UI.TipMessage.show("链接已失效", {delay: 3e3}), e.responseData && e.responseData.code && "PML10406002" == e.responseData.code && d.UI.TipMessage.show("无对应的邮件信息", {delay: 3e3}))
            }, r)
        },
        commentAndLike: function (e, t, a, n) {
            var s, o, r, l, d = this;
            2 == d.area ? (l = "bmail", s = "mail:commentAndLike", o = e, r = "") : (l = "outland", s = "mail:commentAndLikeForOther", o = e, r = {urlParam: "&checkCode=" + a}), i.HttpRouter.addRouter(l, [s]), i.RichMail.API.call(s, o, function (e) {
                if (e && e.responseData && e.responseData.code)if ("S_OK" == e.responseData.code)t && t(); else {
                    n && n();
                    var i = "";
                    switch (e.responseData.code) {
                        case"PML10406021":
                            i = "所输入的内容包含敏感信息";
                            break;
                        case"PML10404002":
                            i = "参数不合法";
                            break;
                        case"PML10407002":
                            i = "系统错误";
                            break;
                        case"PML10406003":
                            i = "链接已失效";
                            break;
                        case"PML10406002":
                            i = "无对应的邮件信息";
                            break;
                        default:
                            i = "网络异常，发送失败，请稍后重试"
                    }
                    d.UI.TipMessage.show(i, {delay: 1500, className: "msgRed"})
                }
            }, r)
        },
        renderDOM: function (e, t) {
            var i = this, a = i.mid || e || i.getArrMid(), n = t || !1;
            i.getRequest(a, function (e) {
                i.renderHtml(e, n)
            }, i.checkCode, "0")
        },
        getAllContact: function (e) {
            if (!top.M2012.Contacts || !e.userNumber) {
                var t = {
                    name: e.userNumber.split("@")[0],
                    email: e.userNumber,
                    src: "/m2015/images/module/welcome/mybeKnow.png"
                };
                return t
            }
            var i = top.M2012.Contacts.getModel().getContactsByMobile(e.userNumber);
            if (!(i.length > 0)) {
                var t = {
                    name: e.userNumber.split("@")[0],
                    email: e.userNumber,
                    src: "/m2015/images/module/welcome/mybeKnow.png"
                };
                return t
            }
            for (var a = 0; a < i.length; a++) {
                var n = i[a], s = {name: n.name, email: n.emails[0], src: n.ImageUrl};
                return s
            }
        },
        friendlyTime: function (e) {
            var t = $Date.parse(e.commentTime), i = $Date.getServerTime();
            return $Date.getFriendlyString(t, i)
        },
        getList: function (e) {
            for (var t = this, i = "", a = e.comments.reverse(), n = 0; n < a.length; n++) {
                var s = a[n];
                if ("" !== s.content) {
                    var o = t.getAllContact(s);
                    i += $T.Utils.format(t.template2, {
                        src: o.src,
                        name: $T.Html.encode(o.name),
                        tip: s.commentTime,
                        time: t.friendlyTime(s),
                        content: $T.Html.encode(s.content)
                    })
                }
            }
            return i
        },
        renderList: function (e, t) {
            var i = this;
            i.getRequest(e, function (e) {
                e && e.commentAndLike[0] && t && t(i.getList(e.commentAndLike[0]), e)
            }, i.checkCode, "1")
        },
        renderRedDot: function (e) {
            if ("1" === e) {
                var t = '<i class="i-red-dot"></i>';
                return t
            }
        },
        renderHtml: function (t, i, a) {
            for (var n = this, s = t && t.commentAndLike ? t.commentAndLike : [], o = 0; o < s.length; o++) {
                var r = "", l = s[o];
                r = $T.Utils.format(n.template1, {
                    user: t.userNumber,
                    redDotComment: n.renderRedDot(l.hasNewComment),
                    discussNum: 0 != l.totalComments ? "(" + l.totalComments + ")" : "",
                    zanNum: 0 != l.totalLikes ? "(" + l.totalLikes + ")" : "",
                    lauded: "1" == l.myLike ? "i-lauded" : "",
                    redDotLike: n.renderRedDot(l.hasNewLike),
                    share: n.share,
                    isShow: i ? "block" : "none",
                    display: n.block || (l.totalComments > 0 ? "block" : "none")
                });
                var d = e(n.el).find("[talkid=" + l.id + "]").length;
                if (d > 0)var c = e(n.el).find("[talkid=" + l.id + "]").find(".subinfo"); else var c = e(n.el).find("[mid=" + l.id + "]").find(".subinfo");
                c.length > 0 && "true" == c.attr("load") && "" !== r && (c.html("").append(r), c.attr("load", "false"))
            }
        },
        getFrom: function (e, t) {
            if (3 == e)var i = t.parents(".outland-main").find("#discuss").find("div[account]").attr("account"); else if (2 == e)var i = t.parents("#leftbox").find("#leftPart").find("a[email]").attr("email"); else var i = t.parents("li[mid]").find("i[addr]").attr("addr");
            return i
        },
        getSubject: function (e, t) {
            if (3 == e)var i = t.parents(".outland-main").find("#header").find("h1").text(); else if (2 == e)var i = t.parents("#leftbox").find("#leftPart").find(".emailTitle").text(); else var i = t.parents("li[mid]").find("strong[name=subject]").text();
            return i
        },
        getQueryMid: function (e, t) {
            var i = "";
            return i = 1 == e ? t.parents("li[mid]").attr("mid") : t.parents("div[querymid]").attr("querymid")
        },
        getData: function (e, t, i, a) {
            var n = this, s = {};
            return 2 == n.area ? (e ? s.content = e : "", t ? s.like = t : "", s.id = i, s.subject = n.getSubject(n.type, a), s.from = n.getFrom(n.type, a), s.queryMid = n.getQueryMid(n.type, a)) : (e ? s.content = e : "", t ? s.like = t : "", s.from = n.getFrom(n.type, a), s.queryMid = n.getQueryMid(n.type, a)), s
        },
        showQrcode: function (t) {
            var a = this, n = t.target, s = e(n).parents(".subinfo-nav").find("a").eq(2), o = e(t.target).closest("li"), r = o.attr("mid");
            top.Package.require("qrcode_ext", function () {
                a.qrcodeContainer = new top.M2012.CreateQrcode.View({
                    mid: r,
                    target: s[0],
                    scrollHeight: e(document).scrollTop(),
                    shortShare: !0,
                    desc: o.find("span[name='summary']").text(),
                    subject: o.find("[name='subject']").text(),
                    QQFriend_BH: "welcomeshare-onKeyShare-QQFriend",
                    QQSpace_BH: "welcomeshare-onKeyShare-QQSpace",
                    SINAWB_BH: "welcomeshare-onKeyShare-sinaWB",
                    RR_BH: "welcomeshare-onKeyShare-RR",
                    YDY_BH: "welcomeshare-onKeyShare-YDY"
                })
            }), i.Event.stopEvent(t), e(document).scroll(function () {
                a.qrcodeContainer && a.qrcodeContainer.remove()
            })
        },
        refreshList: function (t, i, a) {
            var n = this;
            2 == n.type && BH("read_discuss"), n.commentAndLike(t, function () {
                1 == n.type && (e("#div_scroller_inter").hasClass("mailList_dynamic") ? BH("dynamic_success") : BH("dis_success")), a.find("div.disscuss").removeClass("forbid"), a.find(".readMailReplyMes").val("").blur(), n.UI.TipMessage.show("发送成功", {delay: 2e3}), n.renderList({
                    ids: i,
                    isUpdateReadTime: "1"
                }, function (e, t) {
                    0 != t.commentAndLike[0].totalComments && a.find("var.discussNum").text("(" + t.commentAndLike[0].totalComments + ")"), a.find(".subinfo-com-list").html("").html(e).show(), n.fit(), n.setDefaultImage()
                })
            }, n.checkCode, function () {
                1 == n.type && (e("#div_scroller_inter").hasClass("mailList_dynamic") ? BH("dynamic_fail") : BH("dis_fail"))
            })
        },
        setDefaultImage: function () {
            e(".subinfo-photo>img").each(function () {
                e(this)[0].onerror = function () {
                    var t = e(this).attr("src"), i = top.getRootPath() + "/images/module/welcome/mybeKnow.png";
                    e(this).attr("src", i).attr("orgiSrc", t)
                }
            })
        },
        fit: function () {
            var t = this;
            if (e(t.el).hasClass("mailListCon")) {
                var i = e(".welcomeNewSon_left").width();
                e(".subinfo-box").width(i - 67 - 10), e(".subinfo-com-list").width(i - 67 - 10 - 22 - 5), e(".subinfo-com-item").width(i - 67 - 10 - 25 - 5), e(".subinfo-message").width(i - 67 - 10 - 25 - 40 - 25 - 3), e(".discuss-box").width(i - 67 - 10 - 39), e(".subinfo-main .readMailReplyMes-w").width(i - 67 - 10 - 39 - 62 - 16), e(".reply_textarea").width(i - 67 - 10 - 39 - 62 - 16)
            }
        },
        initEvent: function () {
            var t = this;
            e(window).resize(function () {
                t.fit()
            }), e(t.el).find(".subinfo").off("click").on("click", ".subinfo-nav a", function (i) {
                i.preventDefault();
                var a = e(this), n = a.parents("[mid]"), s = a.parents(".subinfo-box"), o = a.index();
                if (0 == o) {
                    if (n.siblings("li").find(".subinfo-com").hide(), a.find("i").hasClass("i-red-dot") && a.find(".i-red-dot").remove(), 1 == t.type && (e("#div_scroller_inter").hasClass("mailList_dynamic") ? BH("dynamic_dis") : BH("first_dis")), 2 == t.type && BH("read_dis"), "block" == s.find(".subinfo-com").css("display")) {
                        if (3 == t.type)return;
                        return void s.find(".subinfo-com").hide()
                    }
                    if ("undefined" != String(n.attr("talkid")))var r = n.attr("talkid"); else var r = n.attr("mid");
                    var l = {ids: r, isUpdateReadTime: "1"};
                    t.renderList(l, function (e, i) {
                        0 != i.commentAndLike[0].totalComments && a.find("var.discussNum").text("(" + i.commentAndLike[0].totalComments + ")"), "" !== e && (s.find(".subinfo-com-list").html("").html(e).show(), t.fit()), t.setDefaultImage()
                    }), s.find(".subinfo-com").show(), t.fit()
                }
                if (2 == o) {
                    if (a.find("i").hasClass("i-red-dot") && a.find(".i-red-dot").remove(), a.find("i").hasClass("i-lauded"))return;
                    if (1 == t.type && (e("#div_scroller_inter").hasClass("mailList_dynamic") ? BH("dynamic_zan") : BH("first_zan")), 2 == t.type && BH("read_zan"), "undefined" != String(n.attr("talkid")))var d = n.attr("talkid"); else var d = n.attr("mid");
                    var c = t.getData("", 1, d, s);
                    t.commentAndLike(c, function () {
                        a.find("i").addClass("i-lauded"), t.getRequest({
                            ids: n.attr("mid"),
                            isUpdateReadTime: "1"
                        }, function (e) {
                            0 != e.commentAndLike[0].totalLikes && a.find("var.like").text("(" + e.commentAndLike[0].totalLikes + ")")
                        }, t.checkCode, "1")
                    }, t.checkCode)
                }
                4 == o && (1 == t.type && (e("#div_scroller_inter").hasClass("mailList_dynamic") ? BH("dynamic_share") : BH("first_share")), t.showQrcode(i))
            }), e(t.el).find("[mid]").on("focus", ".readMailReplyMes", function () {
                e(this).val();
                1 == t.type && (e("#div_scroller_inter").hasClass("mailList_dynamic") ? BH("dynamic_focus") : BH("dis_focus")), 2 == t.type && BH("read_focus"), e(this).val() == e(this).attr("placeholder") && e(this).val(""), e(this).attr("placeholder", "")
            }).on("blur", ".readMailReplyMes", function () {
                "" == e(this).val() && e(this).attr("placeholder", "写下你的评论，Enter键确认")
            }).on("click", "div.disscuss", function () {
                var i = e.trim(e(this).siblings().find(".readMailReplyMes").val()), a = e(this).parents(".subinfo-box");
                if ("" != i && !e(this).hasClass("forbid")) {
                    if (a.find("div.disscuss").addClass("forbid"), "undefined" != String(e(this).parents("[mid]").attr("talkid")))var n = e(this).parents("[mid]").attr("talkid"); else var n = e(this).parents("[mid]").attr("mid");
                    var s = t.getData(i, 0, n, a);
                    t.refreshList(s, n, a)
                }
            }).on("keydown", ".readMailReplyMes", function (i) {
                if (13 == i.keyCode) {
                    i.preventDefault();
                    var a = e.trim(e(this).val()), n = e(this).parents(".subinfo-box");
                    if ("" == a)return void e(this).blur();
                    e(this);
                    if (n.find("div.disscuss").hasClass("forbid"))return;
                    if (n.find("div.disscuss").addClass("forbid"), "undefined" != String(e(this).parents("[mid]").attr("talkid")))var s = e(this).parents("[mid]").attr("talkid"); else var s = e(this).parents("[mid]").attr("mid");
                    var o = t.getData(a, 0, s, n);
                    t.refreshList(o, s, n)
                }
            })
        },
        getActualMidByTid: function (t) {
            var a = this, n = {
                mid: this.mid.ids,
                sort: 0, start: 0, total: 50
            };
            i.RichMail.API.call("mbox:getDeliverStatus", n, function (s) {
                if (s && s.responseData && s.responseData["var"] && s.responseData["var"][0] && s.responseData["var"][0].tid) {
                    var o = s.responseData["var"][0].tid;
                    delete n.mid, n.tid = o
                }
                i.RichMail.API.call("mbox:getDeliverStatus", n, function (i) {
                    if (i && i.responseData && i.responseData["var"] && i.responseData["var"][0] && i.responseData["var"][0].mid) {
                        var n = i.responseData["var"][0].mid;
                        a.mid.ids = n, e(a.el).find("[mid]").attr("mid", n)
                    }
                    t()
                })
            })
        },
        render: function (e) {
            function t() {
                i.renderDOM(), i.initEvent(), e && e()
            }

            var i = this;
            if (this.options && this.options.mid && this.options.mid.ids)var a = this.mid.ids.slice(12, 16); else var a = "";
            "0000" == a ? this.getActualMidByTid(function () {
                t()
            }) : t()
        }
    }))
}(jQuery, _, M139);