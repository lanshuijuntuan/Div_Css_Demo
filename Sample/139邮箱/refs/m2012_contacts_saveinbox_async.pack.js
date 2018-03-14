!function (e, o, t) {
    function a(e, o) {
        var t = e.length, a = setInterval(function () {
            if (t--)try {
                o(e[t])
            } catch (i) {
            } else clearInterval(a)
        }, 32)
    }

    var i = [], r = [], c = !1, n = "读信联系人", s = {
        "yn_edu@139.com": !0,
        "2010expo@139.com": !0,
        "xyr@139.com": !0,
        "mail139010@139.com": !0,
        "toupiao@139.com": !0,
        "mail139@139.com": !0,
        "homemail@139.com": !0,
        "sd10086@139.com": !0,
        "dg10086@139.com": !0,
        "account@139.com": !0,
        "gdcmail@139.com": !0,
        "gd10086@139.com": !0,
        "wh990027@139.com": !0,
        "sxmail139@139.com": !0,
        "hebei10086@139.com": !0,
        "jmyd3g@139.com": !0,
        "hbmc10086@139.com": !0,
        "cmail@139.com": !0,
        "myfetion@139.com": !0,
        "xfyd_10086@139.com": !0,
        "bizmail@139.com": !0,
        "billmail@139.com": !0,
        "990027@139.com": !0,
        "hnmcc.com@139.com": !0,
        "fj10086@139.com": !0,
        "cmpayhb@139.com": !0,
        "sjtv2010@139.com": !0,
        "choujiang@139.com": !0,
        "tuijian@139.com": !0,
        "songli@139.com": !0,
        "sh10086@139.com": !0,
        "xz139@139.com": !0,
        "jl10086@139.com": !0,
        "tj10086@139.com": !0,
        "gs10086@139.com": !0,
        "xj10086@139.com": !0,
        "hi10086@139.com": !0,
        "he10086@139.com": !0,
        "hl10086@139.com": !0,
        "nx10086@139.com": !0,
        "sd10086@139.com": !0,
        "zj10086@139.com": !0,
        "cq10086@139.com": !0,
        "nm10086@139.com": !0,
        "administrator@139.com": !0,
        "hostmaster@139.com": !0,
        "root@139.com": !0,
        "webmaster@139.com": !0,
        "postmaster@139.com": !0,
        "abuse@139.com": !0,
        "vip@139.com": !0,
        "kefu@139.com": !0,
        "tech@139.com": !0,
        "mailtech@139.com": !0,
        "admin@139.com": !0,
        "Postmaster@139.com": !0,
        "idea@139.com": !0,
        "antispam@139.com": !0,
        "mail139@139.com": !0,
        "ued@139.com": !0,
        "card10086@139.com": !0,
        "dx@139.com": !0,
        "uec@139.com": !0,
        "dba@139.com": !0,
        "join@139.com": !0,
        "cmail@139.com": !0,
        "gdcmail@139.com": !0,
        "lstd@139.com": !0,
        "service@139.com": !0,
        "ilove10086@139.com": !0,
        "suggestion@139.com": !0,
        "idea@139.com": !0,
        "subscribe@139.com": !0
    }, m = M2012.Folder.Model.FolderModel.prototype.SysFolderId, l = [m.advertise, m.junk, m.virus, m.bill, m.business];
    t.namespace("M2012.Contacts.Model.SaveInputBoxContacts", Backbone.Model.extend({
        handlertimer: 0,
        requesttimer: 0,
        isbusy: !1,
        logger: t.Logger.getDefaultLogger(),
        initialize: function (e) {
            this.initEvents()
        },
        isExcept: function (o) {
            return e.inArray(o.fid, l) > -1 || o.flags && (o.flags.subscriptionFlag || o.flags.billFlag)
        },
        initEvents: function (e, o) {
            e = e || {};
            var t = this;
            $App.on("app:mailreaded#savecontact", function (e) {
                return t.isExcept(e) ? t.logger.debug("not save, mail from except folder", e) : void(2 != top.$App.getUserCustomInfo("readAutoSave") && (i.push(e.mid), t.start()))
            });
            var a = top.M2012.Contacts.getModel();
            a.off("contacts:group#deleted"), a.on("contacts:group#deleted", function (e) {
                e == c && (t.createGroup = function () {
                    this.createGroup = function () {
                    }, this._createGroup()
                }, c = !1)
            })
        },
        _createGroup: function () {
            var e = this;
            M2012.Contacts.API.addGroup(n, function (o) {
                e.logger.debug("group created.", o.groupId), c = 22 == o.ResultCode ? 0 : o.groupId, e.start()
            })
        },
        createGroup: function () {
            this.createGroup = function () {
            }, this._createGroup()
        },
        showGuide: function () {
            function o() {
                for (var e = Contacts.getModel().getGroupList(), o = 0; o < e.length; o++)if ("读信联系人" == e[o].name)return e[o].id
            }

            function t() {
                e($App.getCurrentTab().element).find(".i_u_close,[name=rg_link]").click(function () {
                    e(this).closest("div").hide()
                })
            }

            var a = ['<div class="rMList clearfix">', '<div style="position:relative;background: #ffffe1;display:inline-block;padding:2px 16px 2px 12px;font-size: 12px;width:auto;" class="tips">', "{text}", '<a class="delmailTipsClose delmailTipsClosed" href="javascript:" bh="{bh}"><i class="i_u_close"></i></a>', '<div class="tipsTop2 diamond"></div>', "</div>", "</div>"].join(""), i = o(), r = Contacts.getContactsByGroupId(i), c = 499, n = 999, s = e($App.getCurrentTab().element).find("#receiver_from");
            r.length > c && (r.length < n ? $App.showOnce("ReadGroup1", function () {
                a = $TextUtils.format(a, {
                    bh: "readgroup_close1",
                    text: "自动保存发件人到通讯录，好友管理更便捷！<a name='rg_link' bh='readgroup_see' href=\"javascript:$App.show('set_addr')\">去看看&gt;&gt;</a>"
                }), s.after(a), t(), top.BH("readgroup_show1")
            }) : $App.showOnce("ReadGroup2", function () {
                $App.showSpecialAddr || ($App.showSpecialAddr = function (e) {
                    this.show("addr")
                }), a = $TextUtils.format(a, {
                    bh: "readgroup_close2",
                    text: "温馨提示：自动保存的联系人数量已超限，超限后将不再保存。<a name='rg_link' bh='readgroup_clean' href=\"javascript:$App.showSpecialAddr({name:'addr',groupId:'" + i + "'})\">立即清理&gt;&gt;</a>"
                }), s.after(a), t(), top.BH("readgroup_show2")
            }))
        },
        start: function () {
            var e = this, m = M2012.Contacts.getModel();
            if (!e.handlertimer) {
                if (c === !1) {
                    var l = m.getGroupByName(n);
                    if (null == l)return e.createGroup();
                    c = l.GroupId
                }
                e.handlertimer = setInterval(function () {
                    if (2 != top.$App.getUserCustomInfo("readAutoSave"))if (i.length) {
                        var n = i.shift(), l = !1, d = t.PageApplication.getTopApp().print;
                        if (d && (l = d[n]), l) {
                            if (!o.isUndefined(l.headers.fraudFlag) && "0" != l.headers.fraudFlag)return void e.logger.error("not save, mail maybe fraud|" + n + "|" + l.headers.fraudFlag);
                            var u = $Email;
                            try {
                                var p = u.getMailListFromString(l.account);
                                a(p, function (e) {
                                    if (e = u.getObjQuick(e), !s[e.email.toLowerCase()]) {
                                        var o = m.getContactsByEmail(e.email);
                                        if (!(o && o.length > 0)) {
                                            e.GroupId = c;
                                            var t = u.getAccount(e.email);
                                            t && (t = t.replace(/[^\d]/g, ""), t = $Mobile.remove86(t), $Mobile.isMobile(t) && (e.mobile = t)), r.push(e)
                                        }
                                    }
                                })
                            } catch (g) {
                            }
                        } else i.push(n)
                    } else e.handlertimer && (clearInterval(e.handlertimer), e.handlertimer = 0)
                }, 100);
                var d = !1;
                e.requesttimer = setInterval(function () {
                    if (e.isbusy || 0 == r.length)return void clearInterval(e.requesttimer);
                    var o = M2012.Contacts.getModel();
                    if (o.isLoaded()) {
                        var t = o.getGroupByName("读信联系人");
                        if (t && (t.CntNum >= 1e3 || t.CntNum + r.length > 1e3))return void clearInterval(e.requesttimer)
                    }
                    if (r.length > 0 && !d && (d = !0, e.showGuide()), 1 == r.length) {
                        e.isbusy = !0;
                        var a = r.splice(0, 1);
                        M2012.Contacts.API.addBatchContactsNew(a, function (o) {
                            if (e.isbusy = !1, BH({
                                    key: "readmail_saveinboxcontact",
                                    ext1: 1
                                }), "21" == o.code)return e.logger.error("not save, contact full now|" + m.getContactsCount()), void top.M139.UI.TipMessage.show("自动保存联系人失败，联系人数量已达上限。", {
                                delay: 1500,
                                className: "msgRed"
                            });
                            e.logger.info("1#NEW入信联系人保存完成", o);
                            var t = $App.getTabByName("addr");
                            t && (t.isRendered = !1)
                        })
                    } else {
                        var i = 10, a = r.splice(0, i);
                        e.isbusy = !0, M2012.Contacts.API.addBatchContacts(a, function (o) {
                            e.logger.info("2#入信联系人保存完成", o), e.isbusy = !1, BH({
                                key: "readmail_saveinboxcontact",
                                ext1: o.list ? o.list.length : 0
                            });
                            var t = $App.getTabByName("addr");
                            t && (t.isRendered = !1)
                        })
                    }
                }, 3e3)
            }
        }
    }));
    new M2012.Contacts.Model.SaveInputBoxContacts
}(jQuery, _, M139);