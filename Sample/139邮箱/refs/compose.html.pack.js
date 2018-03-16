function getFileIdByName(e) {
    for (var t = uploadManager.fileList, i = 0; i < t.length; i++) {
        var o = t[0];
        if (o.filePath == e || o.fileName == e)return o.fileId
    }
    return null
}
function bindAttachFrameOnload() {
    function e() {
        var e = window.frames.frmAttachTarget;
        commonAttachFrameOnLoad(e)
    }

    $("#frmAttachTarget").load(e)
}
function commonAttachFrameOnLoad(e, t) {
    if (window.uploadManager && uploadManager.isUploading() || t) {
        var i = document.forms.fromAttach;
        if (!(e.location.href.indexOf("blank.htm") > 0)) {
            var o = e.return_obj;
            if (o && "S_OK" == o.code) {
                var a = o["var"], n = {};
                for (elem in a)n[elem] = a[elem];
                return n.insertImage = t, upload_module.model.composeAttachs.push(n), uploadManager.refresh(function () {
                    upload_module.model.autoSendMail && mainView.toSendMail(), i.reset()
                }), !0
            }
            return o && "FA_ATTACH_SIZE_EXCEED" == o.code ? top.$Msg.alert(ComposeMessages.FileSizeOverFlow) : top.$Msg.confirm("附件上传失败，请重试。", function () {
                i.submit()
            }, function () {
                i.reset(), uploadManager.cancelUploading()
            }, {buttons: ["重试", "取消"], title: "上传附件"}), !1
        }
    }
}
function refreshAttach(e, t, i) {
    if (upload_module.model.autoSendMail)upload_module.model.PageState = upload_module.model.PageStateTypes.Common, !i && (upload_module.model.autoSendMail = !1); else if (!e) {
        var o = document.getElementById("frmAttachTarget");
        o.src = "blank.htm"
    }
    upload_module.model.composeId && upload_module.model.callApi("attach:refresh", {id: upload_module.model.composeId}, function (o) {
        var a = o.responseData["var"];
        i && (a = filterInternal(a)), upload_module.model.composeAttachs = a;
        for (var n = uploadManager.fileList, s = 0; s < n.length; s++)for (var r = n[s], l = 0; l < a.length; l++)a[l].fileId == r.fileId && (a[l].insertImage = r.insertImage, a[l].replaceImage = r.replaceImage, a[l].fromVideoUpload = r.fromVideoUpload);
        !e && uploadManager.refresh(t)
    })
}
function filterInternal(e) {
    var t = [];
    if (e && e.length)for (var i = 0; i < e.length; i++)"internal" != e[i].type && t.push(e[i]);
    return t
}
function updateAttachStatus(e, t) {
    getCommonAttachList(function (i) {
        for (var o = 0; o < i.length; o++) {
            var a = i[o];
            if (0 == a.status && a.fileName == e.fileName && a.fileSize == e.fileSize) {
                t && t();
                break
            }
        }
    })
}
function getCommonAttachList(e) {
    upload_module.model.composeId && upload_module.model.callApi("attach:refresh", {id: upload_module.model.composeId}, function (t) {
        var i = t.responseData["var"];
        i && i.length && (upload_module.model.commonComposeAttach = i, e && e(i))
    })
}
function renameConflict(e) {
    var t, i, o;
    e.sort(function (e, t) {
        return e.fileName.localeCompare(t.fileName)
    });
    for (var a = 0, n = e.length; n - 1 > a; a++)for (t = 1, i = e[a].fileName, o = i.lastIndexOf("."), 0 > o && (o = i.length); n > a + t && i == e[a + t].fileName;)e[a + t].fileName = i.substr(0, o) + "(" + t + ")" + i.substr(o), t++
}
function checkVideo() {
    var e = document.createElement("video"), t = [];
    return e.canPlayType ? (e.canPlayType('video/ogg; codecs="theora, vorbis"') && t.push("ogg"), e.canPlayType('video/mp4; codecs="avc1.4D401E, mp4a.40.2"') && t.push("mp4"), e.canPlayType('video/webm; codecs="vp8.0, vorbis"') && t.push("webm"), t) : t
}
function autoInsertVideo(e) {
    e.fromVideoUpload && ($("#attachContainer").find("a[insertid='" + e.fileId + "']").trigger("click"), htmlEditorView._getEditorBody().click(), !$B.is.mac)
}
function SWFObject(e, t, i, o, a, n) {
    this.params = new Object, this.variables = new Object, this.attributes = new Object, this.setAttribute("id", t), this.setAttribute("name", t), this.setAttribute("width", i), this.setAttribute("height", o), this.setAttribute("swf", e), this.setAttribute("classid", "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"), a && this.setAttribute("version", a), n && this.addParam("bgcolor", n)
}
function replaceAttachImage(e, t) {
    if (upload_module_multiThread.html) {
        var i = upload_module_multiThread.html.replace(/\<\!\[if \!vml\]\>/gi, "").replace(/\<\!\[endif\]\>/gi, "").replace(/\<v:imagedata/gi, "<img");
        htmlEditorView.editorView.editor.insertHTML(i), upload_module_multiThread.html = ""
    }
    var o = upload_module.model.getAttachUrl(e, t, !0);
    htmlEditorView.editorView.editor.replaceImage(t, o)
}
function _dragenter(e) {
    upload_module.model.requestComposeId();
    var t = e.dataTransfer && e.dataTransfer.files;
    e.stopPropagation(), t && t.length > 0 && e.preventDefault()
}
function _dragover(e) {
    var t = e.dataTransfer && e.dataTransfer.files;
    e.stopPropagation(), t && t.length > 0 && e.preventDefault()
}
function _drop(e) {
    var t = e.dataTransfer && e.dataTransfer.files;
    if (e.stopPropagation(), t && t.length > 0) {
        e.preventDefault();
        for (var i = 0; i < t.length; i++)if (0 == t[i].fileSize)return void top.$Msg.alert("不能拖放文件夹，以及大小为零的文件");
        var o = UploadLargeAttach.isShowLargeAttach(t, "ajax", function (e) {
            return e && e.isCancel ? void self.parentNode.reset() : (UploadLargeAttach.isLargeAttach && $(t).each(function (e, t) {
                t.isLargeAttach = !0
            }), void _uploadFiles(t))
        });
        o || _uploadFiles(t)
    }
}
function _uploadFiles(e) {
    if (e && 0 != e.length) {
        for (var t = [], i = 0; i < e.length; i++) {
            var o = e[i], a = {
                fileName: o.fileName || o.name,
                fileSize: o.fileSize || o.size,
                fileObj: o.fileObj || o,
                uploadType: "ajax",
                isLargeAttach: o.isLargeAttach,
                fromVideoUpload: o.fromVideoUpload
            };
            t.push(a)
        }
        uploadManager.uploadFile(t)
    }
}
function removeLargeAttach(e) {
    for (var t = 0; t < Arr_DiskAttach.length; t++) {
        var i = Arr_DiskAttach[t];
        if (i.fileId == e) {
            Arr_DiskAttach.splice(t, 1), renderLargeAttachList();
            break
        }
    }
}
function getOutLinkHtml(e, t) {
    M139.RichMail.API.call("disk:getDirectLink", e, t)
}
function getFileItemById(e) {
    var t, i = null;
    for (t = Arr_OutLink.length - 1; t >= 0 && (i = Arr_OutLink[t], i.fileId != e); --t);
    return t >= 0 ? i : null
}
function composeSaveToDisk(e) {
    var t = new top.M2012.UI.Dialog.SaveToDisk({ids: e, fileName: "", type: "move", comeFrom: "largeAttach"});
    t.render().on("success", function () {
    })
}
function getImgUrl(e, t) {
    var i, o = "", a = upload_module.model, n = t.fileId, s = a.get("pageType");
    return "draft" == s || "resend" == s ? o = "" : (i = _.find(a.get("initDataSet").attachments, function (e) {
            return e.fileId === n
        }) || {}, o = e.getImgUrl({
        fileSize: i.fileSize,
        fileOffSet: i.fileOffSet,
        fileName: $T.Html.encode(i.fileName),
        type: "email"
    }, a.get("mid"))), o
}
function getPreviewHtml(e, t) {
    var t = t, i = e.fileName, o = getPreviewType(i);
    if (t && o)if ("DOCUMENT" == o) {
        var a = top.getRootPath() + "/html/onlinepreview/online_preview.html?src=disk&sid={0}&mo={1}&id={2}&dl={3}&fi={4}&skin={5}&resourcePath={6}&diskservice={7}&filesize={8}&disk={9}", n = "http://" + top.location.host + a;
        n = top.M139.Text.Utils.format(n, {
            0: top.sid,
            1: top.uid,
            2: e.fileId,
            3: encodeURIComponent(t),
            4: encodeURIComponent(i),
            5: top.UserConfig.skinPath,
            6: encodeURIComponent(getResource()),
            7: encodeURIComponent(top.SiteConfig.diskInterface),
            8: e.fileSize,
            9: top.SiteConfig.disk
        }), window.open(n)
    } else if ("MUSIC" == o) {
        var s = [];
        s[0] = {id: e.fileId, url: t, text: e.fileName}, top.MusicBox.addMusic(e.fileId, s), top.MusicBox.show()
    } else if ("VIDEO" == o) {
        var n = top.getRootPath() + "/html/onlinepreview/video.html?sid=" + top.sid;
        n += "&id=" + e.fileId, n += "&name=" + encodeURIComponent(e.fileName), n += "&presentURL=" + encodeURIComponent(t);
        var r = "http://" + top.location.host + n;
        window.open(r, "_blank")
    } else if ("IMAGE" == o) {
        var l = {
            fileId: e.fileId,
            imgUrl: "",
            fileName: i,
            fileSize: e.fileSize,
            downLoad: t,
            fileExt: getExtname(e.fileName),
            singlePreview: !0
        };
        "undefined" != typeof top.focusImagesView ? top.focusImagesView.render({
            data: [l],
            num: 0,
            from: "keepFolder" === e.fileType ? "cabinet" : ""
        }) : (top.M139.registerJS("M2012.OnlinePreview.FocusImages.View", "packs/focusimages.html.pack.js?v=" + Math.random()), top.M139.requireJS(["M2012.OnlinePreview.FocusImages.View"], function () {
            top.focusImagesView = new top.M2012.OnlinePreview.FocusImages.View, top.focusImagesView.render({
                data: [l],
                num: 0,
                from: "keepFolder" === e.fileType ? "cabinet" : ""
            })
        }))
    }
}
function getResource() {
    var e = window.top.resourcePath;
    return top.isRichmail && (e = window.top.rmResourcePath), e
}
function getExtname(e) {
    if (e) {
        var t = /\.([^.]+)$/, i = e.match(t);
        return i ? i[1].toLowerCase() : ""
    }
    return ""
}
function getPreviewType(e) {
    var t = getExtname(e);
    return t ? -1 != documentExts.indexOf(t) ? "DOCUMENT" : -1 != imageExts.indexOf(t) ? "IMAGE" : -1 != videoExts.indexOf(t) ? "VIDEO" : -1 != musicExts.indexOf(t) ? "MUSIC" : "" : ""
}
function getFileUrl(e, t, i, o, a) {
    var n = {fileType: e, fileId: t, fileName: i, fileSize: o, type: a}, s = getPreviewType(i);
    upload_module.getDownloadUrl(n, function (r) {
        "prev" == a ? ("keepFolder" === e ? "VIDEO" === s || "MUSIC" === s ? top.BH({key: "compose_largeAttach_play"}) : top.BH({key: "compose_largeAttach_preview"}) : "netDisk" === e && ("VIDEO" === s || "MUSIC" === s ? top.BH({key: "compose_disk_play"}) : top.BH({key: "compose_disk_preview"})), getPreviewHtml(n, r)) : "addIn" == a && ("keepFolder" === e ? top.BH({key: "compose_largeAttach_addToContent"}) : "netDisk" === e && top.BH({key: "compose_disk_addToContent"}), "IMAGE" == s ? upload_module.insertImgFile(r) : upload_module.insertRichMediaFile(t, i, $T.Utils.getFileSizeText(o), e))
    })
}
function tranFileSize(e) {
    var t = 0, i = 1024, e = e + "";
    return t = e.indexOf("K") > -1 ? parseFloat(e) * i : e.indexOf("M") > -1 ? parseFloat(e) * i * i : e.indexOf("G") > -1 ? parseFloat(e) * i * i * i : e
}
function isOverSize(e) {
    if (e) {
        var t = 0;
        return e.indexOf("K") > -1 ? t = parseFloat(e) : e.indexOf("M") > -1 ? t = 1024 * parseFloat(e) : e.indexOf("G") > -1 && (t = 1024 * parseFloat(e) * 1024), 20480 >= t
    }
}
function renderLargeAttachList() {
    uploadManager.jContainer.find("li[rel='largeAttach']").remove();
    var e = '<li rel="largeAttach" objId="{objId}" filetype="{fileType}"><i class="{fileIconClass}"></i>                    <span class="ml_5" title="{fileName}">{prefix}<span class="gray">{suffix}</span></span>                    <span class="gray ml_5">({fileSizeText})<span class="tiquma pl_5 black" style="display:none;">提取码：{tiquma}</span></span>                    <a hideFocus="1" class="ml_5" style="display:{isShowPreview}" href="javascript:void(0)" onclick="getFileUrl(\'{fileType}\', \'{fileId}\', \'{fileName}\', \'{fileSize}\', \'prev\')">{previewTypeHTML}</a>                    <a hideFocus="1" class="ml_5" style="display:{isShowInsert}" href="javascript:void(0)" onclick="getFileUrl(\'{fileType}\', \'{fileId}\', \'{fileName}\', \'{fileSize}\', \'addIn\')">添加到正文</a>                    <a hideFocus="1" class="ml_5" href="javascript:void(0)" onclick="removeLargeAttach(\'{fileId}\')">删除</a></li>', t = "", i = [], o = {
        linkType: 0,
        encrypt: 0,
        pubType: 1,
        fileIds: ""
    }, a = [];
    Arr_OutLink.length = 0;
    for (var n = 0; n < Arr_DiskAttach.length; n++) {
        var s = Arr_DiskAttach[n];
        a.push(s), "netDisk" == s.fileType && (Arr_OutLink.push(s), !s.notNeedLink && i.push(s.fileId))
    }
    for (var r = 0, l = a.length; l > r; r++) {
        var s = a[r], d = utool.shortName(s.fileName), c = d.substring(0, d.lastIndexOf(".") + 1), p = d.substring(d.lastIndexOf(".") + 1, d.length), u = ($T.Utils.getFileIcoClass(0, s.fileName), ""), h = "";
        "netDisk" == s.fileType ? (u = "i_cloudS", h = "hide") : "keepFolder" == s.fileType && (u = "i_bigAttachmentS", p = $T.Html.encode(p), c = $T.Html.encode(c));
        var m = "", f = getPreviewType(s.fileName);
        m = "MUSIC" == f || "VIDEO" == f ? "播放" : zipExts.test(s.fileName) ? "打开" : "预览";
        var g = "";
        ("DOCUMENT" == f && !isOverSize(s.fileSize) || !f || s.hidePreview) && (g = "none");
        var v = "", y = getExtname(s.fileName);
        f && "IMAGE" != f && -1 == unableInsertExts.indexOf(y) || (v = "none");
        var w = s.fileSize;
        -1 == w.indexOf("B") && (w = $T.Utils.getFileSizeText(s.fileSize)), s.showExpireTime && (w = w + ", " + s.remainTime + "过期");
        var b = {
            objId: s.fileId ? s.fileId : "",
            fileType: s.fileType,
            fileIconClass: u,
            prefix: c,
            suffix: p,
            fileSizeText: w,
            fileId: s.fileId,
            fileName: top.$TextUtils.htmlEncode(s.fileName),
            fileSize: s.fileSize,
            previewTypeHTML: m,
            isShowPreview: g,
            isShowInsert: v,
            isShowSaveToDisk: h
        };
        t += top.$T.Utils.format(e, b)
    }
    i.length && (o.fileIds = i.join(","), getOutLinkHtml(o, function (e) {
        var t, i;
        if (e.responseData && "S_ERROR" == e.responseData.code)top.M139.UI.TipMessage.show("获取文件链接失败", {
            className: "msgRed",
            delay: 3e3
        }); else {
            t = e.responseData["var"].fileList;
            for (var o = 0, a = t.length; a > o; o++)s = t[o], i = getFileItemById(s.objID), null !== i && (i.linkUrl = s.linkUrl), s.passwd && $("li[rel='largeAttach'][objid='" + s.objID + "']").find(".tiquma").show().html("提取码：" + s.passwd)
        }
    })), t ? (uploadManager.jContainer.append(t), uploadManager.jContainer.show()) : 0 == uploadManager.fileList.length && uploadManager.jContainer.hide();
    var x = uploadManager.jContainer[0];
    x.style.display = "" != x.innerHTML ? "" : "none";
    var I = x.parentNode;
    I.style.display = "" != x.innerHTML ? "" : "none"
}
function getDiskLinkHtml() {
    var e = "";
    if (Arr_DiskAttach.length > 0 || Arr_OutLink.length > 0)var t = top.m2012ResourceDomain + top.getRootPath() + "/images/module/readmail/", i = $T.Html.encode(top.$User.getTrueName()), o = (['<table cellpadding="0" cellspacing="0" ', 'style="border:1px solid #c6cace; border-radius:5px; background:#fff; font-size:12px;" width="700">', '<tr><th bgcolor="#4a73b5" align="left" height="48" ', 'style="border-top-left-radius:4px; border-top-right-radius:4px;">', '<img src="{resourcePath}mail_logo.jpg" width="168" height="22" style="margin-left:15px;"></th></tr>', '<tr><td style="padding:20px;"><h2 style="font-size:14px; margin:0;padding:0;">尊敬的用户：</h2></td></tr>', '<tr><td style="padding:0 50px;"><p style="font-size:14px; margin:0; padding:0;">', '<a style="color:#0066cc; font-weight:bold; text-decoration:none;">{userName}</a>给您发送了以下{count}个文件，共', "<span>{totalSize}</span></p></td></tr>", '<tr><td style="padding:0 50px 0px;">', '<p style="font-size:14px;margin:0; padding:0;">部分文件将于 ', '<a style="color:#0066cc; text-decoration:none;">{exp}</a> 到期，请及时下载保存。</p></td></tr> ', '<tr><td style="padding:30px 50px 10px; font-size:14px;"><strong></strong><br>', '<p style="margin:0 20px; padding:0;"></p></td></tr>', '<tr><td align="center"><a href="{downloadUrl}" style="display:inline-block; text-align:center;">', '<img src="{resourcePath}enter_btn.png"></a></td></tr>', '<tr><td align="center">', '<div style="width:91%; border-radius:8px; margin:20px 0; border:1px solid #dfdfe2;background:#fcfcfc;">', '<table cellpadding="0" cellspacing="0" width="100%">{itemHtml}{itemHtml2}</table></div></td></tr>', '<tr><td style=" padding:10px 20px;">', '<p style="border-bottom:1px solid #dedede; margin:0 10px; padding:10px; font-size:14px; text-indent:10px; color:#666666;">', "139邮箱将一如既往。热忱的为您服务！</p></td></tr>", '<tr><td align="right" style=" padding:0 20px; font-size:12px; color:#a6a6a6;">中国移动139邮箱企业团队</td></tr>', '<tr><td align="right" style=" padding:5px 20px 30px; margin-bottom:20px; font-size:12px; color:#a6a6a6;">', "{date}</td></tr>", '<tr><td height="5" bgcolor="#efefef" ', 'style="border-bottom-left-radius:4px;border-bottom-right-radius:4px;"></td></tr>', "</table>"].join(""), ['<table id="attachAndDisk" class="attachAndDiskItem" style="margin-top:25px; border-collapse:collapse; table-layout:fixed; width:95%; font-size: 12px; line-height:18px; font-family:\'Microsoft YaHei\',Verdana,\'Simsun\';">', "<thead>", "<tr>", '<th style="background-color:#e8e8e8; height:30px; padding:0 11px; text-align:left;"><img src="{resourcePath}attachmentIcon.png" alt="" title="" style="vertical-align:middle; margin-right:6px; border:0;" />来自139邮箱的文件</th>', "</tr>", "</thead>", "<tbody>", "<tr>", '<td style="border:1px solid #e8e8e8;">', "{itemHtml}", "</td>", "</tr>", "<tr>", '<td style="border:1px solid #e8e8e8;">', "{itemHtml2}", "</td>", "</tr>", "</tbody>", "</table>"].join("")), a = new Date, e = top.M139.Text.Utils.format(o, {
        resourcePath: t,
        userName: i,
        count: Arr_DiskAttach.length,
        totalSize: getTotalSize(),
        exp: Arr_DiskAttach[0].exp,
        downloadUrl: Arr_DiskAttach[0].downloadUrl,
        itemHtml: getAttachmentItemHtml(),
        itemHtml2: getNetDiskItemHtml(),
        date: a.format("yyyy年MM月dd日")
    });
    return e
}
function getTotalSize() {
    for (var e = 0, t = 0; t < Arr_DiskAttach.length; t++)e += Arr_DiskAttach[t].fileLength;
    return $T.Utils.getFileSizeText(e)
}
function getAttachmentItemHtml() {
    var e = getFiletypeobj(), t = top.m2012ResourceDomain + top.getRootPath() + "/images/module/readmail/", i = (['<td><dl style="margin:20px 40px;">', '<dt style="float:left;"><img src="{fileIconSrc}"></dt><dd>', '<span style="width:34%;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">', "{fileName}</span>({fileSize})</dd><dd>{exp} 到期</dd></dl></td>"].join(""), ['<table style="border-collapse:collapse; table-layout:fixed; width:100%;" id="attachItem" class="newAttachItem">', "<thead>", "<tr>", '<td style="height:10px;"></td>', "</tr>", "<tr>", '<th style=" text-align:left; padding-left:30px; height:35px;"><strong style="margin-right:12px;">139邮箱-超大附件</strong><a href="{downloadUrl}" target="_blank" style="font-weight:normal;">进入下载页面</a></th>', "</tr>", "</thead>", "<tbody>", "{trs}", "</tbody>", "</table>"].join("")), o = ["<tr>", '<td style="padding-left:30px; height:40px;">', '<table style="border-collapse:collapse; table-layout:fixed; width:100%;">', '<tr class="cts">', '<td width="42"><img src="{fileIconSrc}" alt="" title="" style="vertical-align:middle; border:0;" /></td>', '<td style="line-height:18px;">', '<span>{fileName}<span class="gray"></span></span>', '<span style="color:#999; margin-left:5px;">({fileSize})</span><span style="color:#999; margin-left:5px;">({exp}天后过期)</span>', "</td>", "</tr>", "</table>", "</td>", "</tr>", "<tr>", '<td style="height:10px;"></td>', "</tr>"].join(""), a = [];
    if (0 == Arr_DiskAttach.length)return "";
    for (var n = 0, s = 0; s < Arr_DiskAttach.length; s++) {
        var r = Arr_DiskAttach[s];
        if ("keepFolder" == r.fileType) {
            n++;
            var l = "", d = r.fileName.match(/.\w+$/);
            d && (l = d[0].replace(".", "").toLowerCase());
            var c = t + (e[l] || "none.png");
            a.push(top.M139.Text.Utils.format(o, {
                fileIconSrc: c,
                fileName: r.fileName,
                fileSize: r.fileSize,
                exp: $Date.getDaysPass(new Date, $Date.parse(r.exp))
            }))
        }
    }
    return n > 0 ? top.M139.Text.Utils.format(i, {trs: a.join(""), downloadUrl: Arr_DiskAttach[0].downloadUrl}) : ""
}
function getNetDiskItemHtml() {
    var e = getFiletypeobj(), t = top.m2012ResourceDomain + top.getRootPath() + "/images/module/readmail/", i = (['<td><a href="{linkUrl}" target="_blank">123</a><dl style="margin:20px 40px;">', '<dt style="float:left;"><img src="{fileIconSrc}"></dt><dd>', '<span style="width:34%;display:inline-block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">', "{fileName}</span>({fileSize})</dd><dd>{exp} 到期</dd></dl></td>"].join(""), ["", '<table style="border-collapse:collapse; table-layout:fixed; width:100%;" id="diskItem">', "<thead>", '<tr><td style="height:10px;"></td></tr>', "<tr>", '<th style=" text-align:left; padding-left:30px; height:35px;"><strong style="margin-right:12px;">139邮箱-彩云网盘</strong></th>', "</tr>", "</thead>", "<tbody>", "{trs}", "</tbody>", "</table>"].join("")), o = ["", '<tr><td style="padding-left:30px; height:40px;">', '<table style="border-collapse:collapse; table-layout:fixed; width:100%;">', '<tr class="cts" dataString="{dataString}">', '<td width="42"><span class="dataString" style="display:none;">{dataString}</span>', '<img src="{fileIconSrc}" alt="" title="" style="vertical-align:middle; border:0;" /></td>', '<td style="line-height:18px;">', '<span>{fileName}<span class="gray"></span></span>', '<span style="color:#999; margin-left:5px;">({fileSize})</span><span class="gray ml_5"></span>', '<p style="padding:0; margin:0;"><span style="{display}">提取码：{tiquma}</span><a href="{linkUrl}">下载</a></p>', "</td>", "</tr>", "</table>", "</td>", "</tr>", '<tr><td style="height:10px;"></td></tr>'].join(""), a = [];
    if (0 == Arr_OutLink.length)return "";
    for (var n = 0; n < Arr_OutLink.length; n++) {
        var s = Arr_OutLink[n];
        s.directLink = !0;
        var r = "", l = s.fileName.match(/.\w+$/);
        l && (r = l[0].replace(".", ""));
        var d = t + (e[r] || "none.png");
        a.push(top.M139.Text.Utils.format(o, {
            fileIconSrc: d,
            fileName: s.fileName,
            fileSize: s.fileSize,
            exp: s.exp,
            linkUrl: s.linkUrl,
            display: s.passwd ? "" : "display:none;",
            tiquma: s.passwd ? s.passwd : "",
            dataString: M139.JSON.stringify(s)
        }))
    }
    return Arr_OutLink.length > 0 ? top.M139.Text.Utils.format(i, {trs: a.join("")}) : ""
}
function getFiletypeobj() {
    return {
        xls: "xls.png",
        xlsx: "xls.png",
        doc: "word.png",
        docx: "word.png",
        jpeg: "jpg.png",
        jpg: "jpg.png",
        rar: "zip.png",
        zip: "zip.png",
        "7z": "zip.png",
        txt: "txt.png",
        rtf: "txt.png",
        ppt: "ppt.png",
        pptx: "ppt.png",
        xml: "xml.png",
        wmv: "wmv.png",
        wma: "wma.png",
        wav: "wav.png",
        vsd: "vsd.png",
        vob: "vob.png",
        fla: "swf.png",
        swf: "swf.png",
        flv: "swf.png",
        sis: "sis.png",
        rm: "rm.png",
        rmvb: "rm.png",
        psd: "psd.png",
        ppt: "ppt.png",
        png: "png.png",
        pdf: "pdf.png",
        mpg: "mpg.png",
        mp4: "mp4.png",
        mpeg: "mp3.png",
        mpg: "mp3.png",
        mp3: "mp3.png",
        java: "java.png",
        iso: "iso.png",
        htm: "html.png",
        html: "html.png",
        asp: "html.png",
        jsp: "html.png",
        aspx: "html.png",
        gif: "gif.png",
        exe: "exe.png",
        css: "css.png",
        chm: "chm.png",
        cab: "cab.png",
        bmp: "bmp.png",
        avi: "ai.png",
        asf: "asf.png",
        mov: "rm.png",
        JPG: "jpg.png"
    }
}
function isExistNetDiskFile(e) {
    for (var t = 0; t < Arr_DiskAttach.length; t++)if (Arr_DiskAttach[t].fileId == e)return !0;
    return !1
}
function setNetLink(e) {
    for (var t = 0, i = e.length; i > t; t++) {
        var o = e[t];
        if ("local" != o.fileType || o.complete) {
            var a = o.fileId || o.fid || o.id;
            if (isExistNetDiskFile(a))top.$Msg.alert('文件"' + o.fileName + '"已经存在,请勿重复添加'); else if (o.fileId = a, o.fileLength || (o.fileLength = o.fileSize), o.fileSize = $T.Utils.getFileSizeText(o.fileSize), o.isDisk = !0, 0 == Arr_DiskAttach.length)Arr_DiskAttach.push(o); else for (var n = Arr_DiskAttach.length - 1; n > -1; n--) {
                if (Arr_DiskAttach[n].fileType == o.fileType) {
                    Arr_DiskAttach.splice(n + 1, 0, o);
                    break
                }
                0 == n && "netDisk" == Arr_DiskAttach[n].fileType ? Arr_DiskAttach.unshift(o) : 0 == n && Arr_DiskAttach.push(o)
            }
        } else e.splice(t, 1), t--
    }
    e.length > 0 && renderLargeAttachList()
}
function noop() {
}
function addCompleteAttach(e) {
    for (var t = uploadManager.fileList, i = 0; i < t.length; i++) {
        var o = t[i];
        if (o.fileName == e.fileName) {
            e.insertImage = o.insertImage, e.replaceImage = o.replaceImage;
            break
        }
    }
    for (var a = 0; a < upload_module.model.composeAttachs.length; a++) {
        var n = upload_module.model.composeAttachs[a];
        if (n.fileId == e.fileId)return n = {
            fileId: e.fileId,
            fileName: e.fileName,
            fileSize: e.fileSize,
            insertImage: e.insertImage,
            replaceImage: e.replaceImage
        }, void(upload_module.model.composeAttachs[a] = n)
    }
    upload_module.model.composeAttachs.push({
        fileId: e.fileId,
        fileName: e.fileName,
        fileSize: e.fileSize,
        insertImage: e.insertImage,
        replaceImage: e.replaceImage
    })
}
function removeFromAttach(e) {
    for (var t = 0; t < upload_module.model.composeAttachs.length; t++)if (upload_module.model.composeAttachs[t].fileId == e)return void upload_module.model.composeAttachs.splice(t, 1)
}
function initAddrList() {
    Utils.UI.selectSender("selFrom", !0, document)
}
function getReplyLetterStartHtml(e) {
    var t = top.ReadMailInfoTable[e].response, i = '<div style="padding-right: 0px; padding-left: 0px; font-size: 12px; padding-bottom: 2px; padding-top: 2px; font-family: arial narrow">';
    i += "------------------&nbsp;原始邮件&nbsp;------------------\n</div>", i += '<div style="font-size: 12px">', i += "<div><b>发件人:</b>&nbsp;{from};\n</div>", i += "<div><b>发送时间:</b>&nbsp;{sentDate}\n</div>", i += "<div><b>收件人:</b>&nbsp;{to}; \n</div>", i += "<div><b>抄送:</b>&nbsp;{cc}; \n</div>", i += "<div>\n</div>", i += "<div><b>主题:</b>&nbsp;{subject}</div></div><div>&nbsp;\n</div>";
    var o = {
        subject: t.subject.encode(),
        from: (t.account || "").toString().encode(),
        to: (t.to || "(无)").encode(),
        cc: (t.cc || "(无)").encode(),
        sentDate: t.sendDate && new Date(1e3 * t.sendDate).format("yyyy年MM月dd日 hh点mm分") || ""
    };
    return i = String.format(i, o)
}
function setEditorSize() {
}
function resizeAll() {
}
function setIframeSize() {
    try {
        jQuery("body").width(jQuery(window.frameElement).width())
    } catch (e) {
    }
}
function getLinkImgPath(e) {
    e = e.toLowerCase();
    for (var t in ICONS_CLASS)if (-1 != $.inArray(e, ICONS_CLASS[t]))return t;
    return "默认.GIF"
}
function showCC() {
    "none" == document.getElementById("trCc").style.display && aAddCcOnClick($("#aShowCc")[0], !0)
}
function showBCC() {
    "none" == document.getElementById("trBcc").style.display && aAddBccOnClick($("#aShowBcc")[0])
}
var Package = {
    config: function () {
        var e = this;
        this.defaultDir = top.$App.getResourceHost() + top.getRootPath() + "/js/packs/", this.packageList = {
            main_ext: {
                path: "main_ext.pack.js",
                directory: e.defaultDir,
                depend: null
            },
            mailbox_ext: {path: "mailbox_ext.pack.js", directory: e.defaultDir, depend: null},
            timingremind_ext: {path: "calremind.timingremind.pack.js", directory: e.defaultDir, depend: null},
            shortcut_key: {path: "shortcutkey.pack.js", directory: e.defaultDir, depend: null},
            denyforward_ext: {path: "m2012.denyforward.pack.js", directory: e.defaultDir, depend: null},
            readmail_ext: {path: "readmail_ext.pack.js", directory: e.defaultDir, depend: null},
            compose_ext: {path: "compose_ext.pack.js", directory: e.defaultDir, depend: null},
            newyearwish: {path: "m2012.newyearwish.pack.js", directory: e.defaultDir, depend: null},
            account_info: {
                path: "account_info.js",
                directory: top.$App.getResourceHost() + top.getRootPath() + "/js/richmail/main/",
                depend: null
            },
            qrcode: {
                path: "qrcode.js",
                directory: top.$App.getResourceHost() + top.getRootPath() + "/js/plugin/",
                depend: null
            },
            jquery_zclip: {
                path: "jquery.zclip.min.js",
                directory: top.$App.getResourceHost() + top.getRootPath() + "/js/plugin/",
                depend: null
            },
            qrcode_ext: {path: "qrcode_ext.pack.js", directory: e.defaultDir, depend: null},
            skin_tip: {
                path: "m2012.selectskinstips.view.js",
                directory: top.$App.getResourceHost() + top.getRootPath() + "/js/richmail/changeskin/",
                depend: null
            },
            skin_tip2015: {
                path: "m2015.selectskinstips.view.js",
                directory: top.$App.getResourceHost() + top.getRootPath() + "/js/richmail/changeskin/",
                depend: null
            },
            sync_guide_tip: {
                path: "m2012.product.syncguide.js",
                directory: top.$App.getResourceHost() + top.getRootPath() + "/js/prod/syncguide/",
                depend: null
            },
            cool_mail: {path: "m2012.coolmail.pack.js", directory: e.defaultDir, depend: null}
        }
    }, addConfig: function (e) {
        this.packageList || this.config(), _.defaults(this.packageList, e)
    }, require: function (e, t) {
        function i(e) {
            if (e.loaded)t(); else {
                var i = top.getResourceVersion(e.path) || $Date.format("yyyyMMdd", new Date), o = {
                    id: a,
                    src: e.directory + e.path + "?v=" + i,
                    charset: "utf-8"
                };
                e.failed && (o.src += "&rnd=" + Math.random());
                var n;
                top.$App.trigger("beforeRequireLoad", {key: a}), M139.core.utilCreateScriptTag(o, function (i) {
                    return 0 == i ? (e.failed = !0, void M139.Logger.sendClientLog({
                        level: "ERROR",
                        name: "ScriptLoadError",
                        url: o.src,
                        errorMsg: "RequireJs加载脚本失败"
                    })) : (window.clearTimeout(n), e.loaded = !0, void(!e.invoked && t()))
                }), n = window.setTimeout(function () {
                    e.failed = !0, o.src += "&timeout=1", M139.core.utilCreateScriptTag(o, function (i) {
                        return 0 == i ? void M139.Logger.sendClientLog({
                            level: "ERROR",
                            name: "ScriptLoadError",
                            url: o.src,
                            errorMsg: "RequireJs加载脚本失败(重试)"
                        }) : (M139.UI.TipMessage.hide(), e.loaded = !0, e.invoked = !0, void t())
                    }), M139.Logger.sendClientLog({
                        level: "ERROR",
                        name: "ScriptLoadError",
                        url: o.src,
                        errorMsg: "RequireJs加载脚本超时，自动重试1次"
                    })
                }, 4e3)
            }
        }

        this.packageList || this.config();
        var o, a;
        "string" == typeof e && (e = [e]);
        for (var n = 0; n < e.length; n++)a = e[n], o = this.packageList[a], o.depend ? this.require(o.depend, function () {
            i(o)
        }) : i(o)
    }
};
!function (e, t, i) {
    function o(e) {
        for (var t in e)this[t] = e[t] || "";
        this.emails = [], this.mobiles = [], this.faxes = [];
        this.name || (this.name = (this.AddrFirstName || "") + (this.AddrSecondName || "")), this.lowerName = this.name.toLowerCase(), this.check(this.FamilyEmail) && this.emails.push(this.FamilyEmail), this.check(this.BusinessEmail) && this.emails.push(this.BusinessEmail), this.check(this.OtherEmail) && this.emails.push(this.OtherEmail), this.check(this.MobilePhone) && this.mobiles.push(this.MobilePhone), this.check(this.BusinessMobile) && this.mobiles.push(this.BusinessMobile), this.check(this.OtherMobilePhone) && this.mobiles.push(this.OtherMobilePhone), this.check(this.FamilyFax) && this.faxes.push(this.FamilyFax), this.check(this.BusinessFax) && this.faxes.push(this.BusinessFax), this.check(this.OtherFax) && this.faxes.push(this.OtherFax), this.extEmail = this.checkExtend(this.extEmail), this.extMobile = this.checkExtend(this.extMobile), this.extFax = this.checkExtend(this.extFax), this.emails = this.emails.concat(this.extEmail), this.mobiles = this.mobiles.concat(this.extMobile), this.faxes = this.faxes.concat(this.extFax), s || (s = Boolean(top.$App)), s && this.fixPhoto()
    }

    var a, n, s = !1, r = ["/upload/photo/system/nopic.jpg", "/upload/photo/nopic.jpg"];
    o.prototype = {
        getMobileSendText: function () {
            var e = this.getFirstMobile();
            if (e = e && e.replace(/\D/g, ""), !e)return "";
            var t = this.name.replace(/"/g, "");
            return '"' + t + '"<' + e + ">"
        }, getEmailSendText: function () {
            var e = this.getFirstEmail();
            if (!e)return "";
            var t = this.name.replace(/"/g, "");
            return '"' + t + '"<' + e + ">"
        }, getFaxSendText: function () {
            var e = this.getFirstFax();
            if (!e)return "";
            var t = this.name.replace(/"/g, "");
            return '"' + t + '"<' + e + ">"
        }, getFirstEmail: function () {
            return this.emails && this.emails[0] ? this.emails[0] : ""
        }, getFirstMobile: function () {
            return this.mobiles && this.mobiles[0] ? this.mobiles[0] : ""
        }, getFirstFax: function () {
            return this.faxes && this.faxes[0] ? this.faxes[0] : ""
        }, match: function (e) {
            return [this.name, this.BusinessEmail, this.BusinessFax, this.BusinessMobile, this.CPName, this.FamilyEmail, this.FamilyFax, this.FirstNameword, this.Jianpin, this.MobilePhone, this.OtherEmail, this.OtherFax, this.OtherMobilePhone, this.Quanpin, this.UserJob, this.emails.join(""), this.mobiles.join(""), this.faxes.join("")].join("").toLowerCase().indexOf(e.toLowerCase()) > -1
        }, quickMatch: function (e) {
            return [this.name, this.BusinessEmail, this.CPName, this.FamilyEmail, this.FirstNameword, this.Jianpin, this.OtherEmail, this.Quanpin].join("").toLowerCase().indexOf(e.toLowerCase()) > -1
        }, fixPhoto: function () {
            function e() {
                var e = location.host, i = "";
                return e.indexOf("10086.cn") > -1 && top.$User.isGrayUser() ? i = "{0}//image0.139cm.com" : e.indexOf("10086.cn") > -1 && !top.$User.isGrayUser() ? i = "{0}//images.139cm.com" : e.indexOf("10086ts") > -1 ? i = "{0}//g2.mail.10086ts.cn" : e.indexOf("10086rd") > -1 && (i = "{0}//static.rd139cm.com"), i.format(t.getHttp())
            }

            var t = this;
            if (!this.ImagePath)if (a || (a = $App.getResourcePath() + "/images/face.png", n = e()), this.ImageUrl) {
                if (0 == this.ImageUrl.indexOf(t.getHttp() + "//"))return;
                this.ImagePath = this.ImageUrl;
                var i = this.ImagePath;
                i == r[0] || i == r[1] || "" == i ? this.ImageUrl = a : this.ImageUrl = n + i + "?rd=" + Math.random()
            } else this.ImageUrl = a, this.ImagePath = "/upload/photo/nopic.jpg"
        }, check: function (e) {
            return !t.isEmpty(e)
        }, checkExtend: function (e) {
            e = e || [];
            for (var i = e.length; i > 0; i--)t.isEmpty(e[i]) && e.splice(i, 1);
            return e
        }, getHttp: function () {
            return top.location.protocol
        }
    }, i.namespace("M2012.Contacts.ContactsInfo", o)
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = !1;
    i.namespace("M2012.Contacts.Model", Backbone.Model.extend({
        initialize: function (e) {
            this.initEvents()
        }, getUserNumber: function () {
            return top.$User.getUid()
        }, loadMainData: function (e, t) {
            e = e || {};
            var a = this;
            if (this.isLoading = !0, e.testUrl)o.get(e.testUrl, function (e) {
                a.onMainDataLoad(i.JSON.tryEval(e), t)
            }); else {
                $App.once("userAddrJsonData_load", function (e) {
                    a.isLoading = !1, clearTimeout(n);
                    var o = i.JSON.tryEval(e.response);
                    a.onMainDataLoad(o, t)
                });
                var n = setTimeout(function () {
                    var e = {GetUserAddrJsonData: {}};
                    M2012.Contacts.API.call("GetUserAddrJsonData", e, function (e) {
                        a.isLoading = !1, e ? e.responseData ? "0" == e.responseData.ResultCode ? a.onMainDataLoad(e.responseData, t) : "216" == e.responseData.ResultCode ? $App.trigger("change:sessionOut", {}, !0) : i.Logger.getDefaultLogger().error("addrsvr response error", e.responseData) : i.Logger.getDefaultLogger().error("addrsvr response invalid", e.responseText) : i.Logger.getDefaultLogger().error("addrsvr response empty")
                    })
                }, 7e3)
            }
        }, loadQueryUserInfo: function (e) {
            function o(t, i) {
                i && (t = $App.deepCloneJSON(t)), e({responseData: t}), o = new Function
            }

            function n() {
                var e = null;
                try {
                    e = document.getElementById("welcome").contentWindow.addrQueryUserInfo
                } catch (t) {
                }
                return e
            }

            if (SiteConfig.m2012NodeServerRelease && $App.isShowWelcomePage() && a) {
                var s = n();
                s ? setTimeout(function () {
                    o(s, !0)
                }, 0) : $App.on("welcome_QueryUserInfo_load", function (e) {
                    o(e, !0)
                })
            } else {
                var r = new i.ExchangeHttpClient({
                    name: "ContactsLoadMainDataHttpClient",
                    responseDataType: "JSON2Object"
                });
                r.on("error", function (e) {
                    options && t.isFunction(options.error) && options.error(e)
                });
                var l = "<QueryUserInfo><UserNumber>" + $User.getUid() + "</UserNumber></QueryUserInfo>";
                r.request({
                    method: "post",
                    url: "/addrsvr/QueryUserInfo?sid=" + $App.query.sid + "&formattype=json",
                    data: l
                }, e)
            }
            a = !1
        }, getUserInfo: function (e, t) {
            var i = this;
            if (top.$User) {
                if (e = e || {}, i.UserInfoData && !e.refresh && t && "function" == typeof t)try {
                    return void t(i.UserInfoData)
                } catch (o) {
                }
                i.getUserInfoWaiting = !0, this.loadQueryUserInfo(function (e) {
                    if (e && e.responseData) {
                        var o = e.responseData.ResultCode, a = {code: "S_FALSE", ResultCode: o};
                        "0" == o && (a = {
                            code: "S_OK",
                            "var": i.userInfoTranslate(e.responseData.UserInfo[0])
                        }), i.UserInfoData = a;
                        var n = top.window.trueName = a["var"].AddrFirstName;
                        top.window.UserData && (top.window.UserData.userName = n);
                        var s = top.$App.getConfig("UserAttrs");
                        if (s && (s.trueName = n), t && "function" == typeof t)try {
                            t(a)
                        } catch (r) {
                        }
                    }
                    i.getUserInfoWaiting = !1
                })
            }
        }, contactRequest: function (e, t, o) {
            var a = new i.ExchangeHttpClient({
                name: "ContactsLoadMainDataHttpClient",
                requestDataType: "ObjectToXML2",
                responseDataType: "JSON2Object"
            });
            t || (t = {}), t.UserNumber = top.$User.getUid();
            var n = {};
            n[e] = t, a.request({
                method: "post",
                url: "/addrsvr/" + e + "?sid=" + top.$App.query.sid + "&formattype=json",
                data: n
            }, function (e) {
                o && o(e)
            })
        }, modifyUserInfo: function (e, t) {
            var i = this;
            this.contactRequest("ModUserInfo", e, function (e) {
                i.UserInfoData = null, e && e.responseData && t && t(e.responseData)
            })
        }, modifyGroup: function (e, t) {
            this.contactRequest("EditGroupList", e, function (e) {
                e && e.responseData && t && t(e.responseData)
            })
        }, userInfoTranslate: function (e) {
            var t = {
                a: "UserType",
                b: "SourceType",
                c: "AddrFirstName",
                d: "AddrSecondName",
                e: "AddrNickName",
                f: "UserSex",
                g: "CountryCode",
                h: "ProvCode",
                i: "AreaCode",
                j: "CityCode",
                k: "StreetCode",
                l: "ZipCode",
                m: "HomeAddress",
                n: "MobilePhoneType",
                o: "BirDay",
                p: "MobilePhone",
                q: "BusinessMobile",
                r: "BusinessPhone",
                s: "FamilyPhone",
                t: "BusinessFax",
                u: "FamilyFax",
                v: "OtherPhone",
                w: "OtherMobilePhone",
                x: "OtherFax",
                y: "FamilyEmail",
                z: "BusinessEmail",
                c2: "OtherEmail",
                c3: "PersonalWeb",
                c4: "CompanyWeb",
                c5: "OtherWeb",
                c6: "OICQ",
                c7: "MSN",
                c8: "OtherIm",
                c9: "CPCountryCode",
                d0: "CPProvCode",
                d1: "CPAreaCode",
                a0: "CPCityCode",
                a1: "CPStreetCode",
                a2: "CPZipCode",
                a3: "CPAddress",
                a4: "CPName",
                a5: "CPDepartName",
                a6: "Memo",
                a7: "ContactCount",
                a8: "ContactType",
                a9: "ContactFlag",
                b0: "SynFlag",
                b1: "SynId",
                b2: "RecordSeq",
                b3: "FirstNameword",
                b4: "CountMsg",
                b5: "StartCode",
                b6: "BloodCode",
                b7: "StateCode",
                b8: "ImageUrl",
                b9: "SchoolName",
                c0: "BokeUrl",
                c1: "UserJob",
                e1: "FamilyPhoneBrand",
                e2: "BusinessPhoneBrand",
                e3: "OtherPhoneBrand",
                e4: "FamilyPhoneType",
                e5: "BusinessPhoneType",
                e6: "OtherPhoneType",
                e7: "EduLevel",
                e8: "Marriage",
                e9: "NetAge",
                e0: "Profession",
                f1: "Income",
                f2: "Interest",
                f3: "MoConsume",
                f4: "ExpMode",
                f5: "ExpTime",
                f6: "ContactMode",
                f7: "Purpose",
                f8: "Brief",
                f9: "FavoEmail",
                f0: "FavoBook",
                g1: "FavoMusic",
                g2: "FavoMovie",
                g3: "FavoTv",
                g4: "FavoSport",
                g5: "FavoGame",
                g6: "FavoPeople",
                g7: "FavoWord",
                g8: "Character",
                g9: "MakeFriend",
                ui: "UserInfo",
                un: "UserNumber",
                sd: "SerialId",
                gd: "GroupId",
                gp: "Group",
                gi: "GroupInfo",
                ct: "Contacts",
                ci: "ContactsInfo",
                gl: "GroupList",
                li: "GroupListInfo",
                tr: "TotalRecord",
                rc: "ResultCode",
                rm: "ResultMsg",
                gn: "GroupName",
                cn: "CntNum",
                ri: "RepeatInfo",
                lct: "LastContacts",
                lctd: "LastContactsDetail",
                lci: "LastContactsInfo",
                cct: "CloseContacts",
                cci: "CloseContactsInfo",
                an: "AddrName",
                at: "AddrType",
                ac: "AddrContent",
                us: "UserSerialId",
                ai: "AddrId",
                lid: "LastId",
                ate: "AddrTitle",
                trg: "TotalRecordGroup",
                trr: "TotalRecordRelation",
                cf: "ComeFrom",
                cte: "CreateTime",
                trg: "TotalRecordGroup",
                trr: "TotalRecordRelation",
                Bct: "BirthdayContacts",
                bci: "BirthdayContactInfo",
                ee: "extEmail",
                em: "extMobile",
                ef: "extFax",
                hf: "HecomboFlag",
                MotiSentence: "MotiSentence",
                LastImageURL: "LastImageUrl"
            }, i = {};
            for (elem in e)t[elem] && (i[t[elem]] = e[elem]);
            return i.extEmail = i.extEmail ? i.extEmail.split(",") : [], i.extMobile = i.extMobile ? i.extMobile.split(",") : [], i.extFax = i.extFax ? i.extFax.split(",") : [], i
        }, getPrivateSettings: function (e) {
            if (window.$User) {
                var t = new i.ExchangeHttpClient({
                    name: "ContactsLoadMainDataHttpClient",
                    responseDataType: "JSON2Object"
                }), o = "<GetPrivacySettings><UserNumber>" + $User.getUid() + "</UserNumber></GetPrivacySettings>";
                t.request({
                    method: "post",
                    url: "/addrsvr/GetPrivacySettings?sid=" + $App.query.sid,
                    data: o
                }, function (t) {
                    if (t && t.responseData) {
                        var i = t.responseData, o = i.ResultCode, a = {code: "S_FALSE"};
                        if ("0" == o && (a = {
                                code: "S_OK",
                                "var": {addMeRule: i.WhoAddMeSetting, UserInfoSetting: i.UserInfoSetting}
                            }), e && "function" == typeof e)try {
                            e(a)
                        } catch (n) {
                        }
                    }
                })
            }
        }, updatePrivateSettings: function (e, t) {
            var a = new i.ExchangeHttpClient({
                name: "ContactsLoadMainDataHttpClient",
                requestDataType: "ObjectToXML2",
                responseDataType: "JSON2Object"
            }), n = $User.getUid(), s = {UserNumber: n};
            s = {SavePrivacySettings: o.extend(s, e)}, a.request({
                method: "post",
                url: "/addrsvr/SavePrivacySettings?sid=" + $App.query.sid,
                data: s
            }, function (e) {
                if (e && e.responseData) {
                    var i = e.responseData, o = {
                        code: ("0" == i.ResultCode ? "S_OK" : i.ResultCode) || "FS_UNKNOWN",
                        "var": {msg: i.ResultMsg || ""}
                    };
                    t && t(o)
                }
            })
        }, requireData: function (e) {
            var t = this.get("data");
            t ? e && e(t) : (this.isLoading || this.loadMainData(), this.on("maindataload", function (t) {
                this.off("maindataload", arguments.callee), e && setTimeout(function () {
                    e(t)
                }, 0)
            }))
        }, isLoaded: function () {
            return !!this.get("data")
        }, onMainDataLoad: function (e, t) {
            e.Groups = e.Group || e.Groups, e.LastContacts || (e.LastContacts = []), e.CloseContacts || (e.CloseContacts = []), e.BirthdayContacts || (e.BirthdayContacts = []), e.Contacts || (e.Contacts = []), e.Groups || (e.Groups = []), e.GroupMember || (e.GroupMember = {}), e.NoGroup || (e.NoGroup = []), e.TotalRecord = parseInt(e.TotalRecord), e.TotalRecordGroup = parseInt(e.TotalRecordGroup), e.TotalRecordRelation = parseInt(e.TotalRecordRelation), e.userSerialId = e.UserSerialId;
            var i = {
                TotalRecord: e.TotalRecord,
                TotalRecordGroup: e.TotalRecordGroup,
                TotalRecordRelation: e.TotalRecordRelation,
                noGroup: e.NoGroup
            };
            this.createGroupData({data: e, exports: i}), this.createContactsData({
                data: e,
                exports: i
            }), this.createGroupMemberData({data: e, exports: i}), this.createLastAndCloseContactsData({
                data: e,
                exports: i
            }), this.createBirthdayContactsData({data: e, exports: i}), this.createVIPContactsData({
                data: e,
                exports: i
            }), e.UserInfo && e.UserInfo[0] && (this.UserInfoData = {
                code: "S_OK",
                "var": this.userInfoTranslate(e.UserInfo[0])
            }), this.set("data", i), e.Welcome && this.set("invalidEmails", e.Welcome[0].ie || ""), this.trigger("maindataload", i), t && t(i)
        }, createGroupData: function (e) {
            for (var t = e.exports, i = e.data, o = i.Groups, a = new Array(o.length), n = {}, s = 0, r = o.length; r > s; s++) {
                var l = o[s];
                n[l.gd] = a[s] = {GroupId: l.gd, id: l.gd, GroupName: l.gn, name: l.gn, CntNum: l.cn, count: l.cn}
            }
            t.groups = a, t.groupsMap = n
        }, createContactsData: function (e) {
            for (var t = e.exports, i = e.data, o = i.Contacts, a = new Array(o.length), n = {}, s = {}, r = M2012.Contacts.ContactsInfo, l = 0, d = o.length; d > l; l++) {
                var c = o[l];
                c.ee = c.ee ? c.ee.split(",") : [], c.em = c.em ? c.em.split(",") : [], c.ef = c.ef ? c.ef.split(",") : [];
                var p = new r({
                    SerialId: c.sd,
                    AddrFirstName: c.c,
                    AddrSecondName: c.d,
                    MobilePhone: c.p,
                    BusinessMobile: c.q,
                    OtherMobilePhone: c.w,
                    FamilyEmail: (c.y || "").toLowerCase(),
                    BusinessEmail: (c.z || "").toLowerCase(),
                    OtherEmail: (c.c2 || "").toLowerCase(),
                    FirstNameword: (c.b3 || "").toLowerCase(),
                    FamilyFax: c.u,
                    BusinessFax: c.t,
                    OtherFax: c.x,
                    ImageUrl: c.b8,
                    Quanpin: (c.d2 || "").toLowerCase(),
                    Jianpin: (c.d3 || "").toLowerCase(),
                    CPName: c.a4,
                    UserJob: c.c1,
                    extEmail: c.ee,
                    extMobile: c.em,
                    extFax: c.ef
                });
                a[l] = p, n[c.sd] = p, s[c.sd] = l
            }
            t.contacts = a, t.contactsMap = n, t.contactsIndexMap = s;
            var u = $App.getTabByName("addr");
            u && (u.isRendered = !1)
        }, updateContactsData: function (e) {
        }, createGroupMemberData: function (e) {
            var t = e.data, i = e.exports, o = i.contactsMap, a = i.groupsMap, n = t.GroupMember;
            for (var s in n) {
                var r = a[s];
                if (r) {
                    for (var l = n[s], d = 0; d < l.length; d++)o[l[d]] || (l.splice(d, 1), d--);
                    r.CntNum = l.length
                } else/^\d+$/.test(s) && delete a[s]
            }
            i.groupMember = n
        }, createLastAndCloseContactsData: function (e) {
            for (var t = e.exports, i = e.data, o = i.LastContacts, a = i.CloseContacts, n = [], s = [], r = 0, l = o.length; l > r; r++) {
                var d = o[r];
                "object" != typeof d.ac && n.push({SerialId: d.sd, AddrName: d.an, AddrType: d.at, AddrContent: d.ac})
            }
            for (var r = 0, l = a.length; l > r; r++) {
                var d = a[r];
                "object" != typeof d.ac && s.push({SerialId: d.sd, AddrName: d.an, AddrType: d.at, AddrContent: d.ac})
            }
            t.lastestContacts = n, t.closeContacts = s
        }, createBirthdayContactsData: function (e) {
            for (var t = e.exports, i = e.data, o = i.BirthdayContacts, a = new Array(o.length), n = o.length - 1; n >= 0; n--) {
                var s = o[n];
                a[n] = {
                    SerialId: s.sd,
                    AddrName: s.an,
                    MobilePhone: s.p,
                    FamilyEmail: s.y,
                    BusinessEmail: s.z,
                    OtherEmail: s.c2,
                    BirDay: s.o
                }
            }
            t.birthdayContacts = a
        }, createVIPContactsData: function (e) {
            var t = e.data, i = e.exports, o = t.Vip && t.Vip[0], a = {groupId: "", contacts: []};
            if (o)try {
                a.groupId = o.vipg, a.contacts = o.vipc ? o.vipc.split(",") : []
            } catch (n) {
            }
            i.vip = a
        }, getContactsById: function (e) {
            return this.get("data") && this.get("data").contactsMap[e] || null
        }, getContactsGroupById: function (e) {
            return this.getContactsGroupId(e)
        }, getGroupById: function (e) {
            return this.get("data") && this.get("data").groupsMap[e] || null
        }, getGroupByName: function (e) {
            for (var t = this.getGroupList(), i = 0, o = t.length; o > i; i++) {
                var a = t[i];
                if (a.name === e)return a
            }
            return null
        }, getReadGroupCount: function () {
            var e = this.getGroupByName("读信联系人");
            return e ? e.CntNum : null
        }, getContactsGroupId: function (e) {
            var t = this.get("data") && this.get("data").groupMember, i = [];
            if (t)for (var o in t)for (var a = t[o], n = 0, s = a.length; s > n; n++)if (a[n] === e) {
                i.push(o);
                break
            }
            return i
        }, getGroupList: function () {
            var e = this.get("data");
            return e && (e = e.groups), e = e && t.isFunction(e.concat) ? e.concat() : []
        }, getGroupMembersLength: function (e) {
            var t = this.getGroupById(e);
            if (!t)throw"M2012.Contacts.Model.getGroupContactsLength:不存在联系人分组gid=" + e;
            return t.CntNum
        }, getGroupMembersId: function (e, t) {
            for (var i = this.getGroupMembers(e, t), o = 0, a = i.length; a > o; o++)i[o] = i[o].SerialId;
            return i
        }, getGroupMembers: function (e, t) {
            t = t || {};
            var i = (t.filter, this.get("data")), o = i && i.contactsMap, a = i && i.groupMember, n = [];
            if (e == this.getVIPGroupId())n = this.getVIPContacts(); else {
                var s = a && a[e];
                if (s)for (var r = 0, l = s.length; l > r; r++) {
                    var d = s[r], c = o && o[d];
                    c && n.push(c)
                }
            }
            return t && t.filter && (n = this.filterContacts(n, {filter: t.filter, colate: t.colate})), n
        }, getVIPContacts: function () {
            var e = this.get("data"), t = [], i = e && e.vip, o = e && e.contactsMap;
            if (i && i.contacts)for (var a = i.contacts, n = 0; n < a.length; n++) {
                var s = a[n], r = o[s];
                r && t.push(r)
            }
            return t
        }, getVIPGroupId: function () {
            var e = "", t = this.get("data");
            return t && t.vip && (e = t.vip.groupId), e
        }, isVip: function (e) {
            var t = this.get("data"), i = !1;
            return t && t.vip && o.each(t.vip.contacts, function (t, o) {
                return o == e ? (i = !0, !1) : void 0
            }), i
        }, filterContacts: function (e, t) {
            for (var i = t.filter, o = [], a = 0, n = e.length; n > a; a++) {
                var s = e[a];
                "email" == i && s.getFirstEmail() ? o.push(s) : "mobile" == i && s.getFirstMobile() ? o.push(s) : "fax" == i && s.getFirstFax() ? o.push(s) : t.colate && s.getFirstEmail().indexOf(i) > -1 && o.push(s)
            }
            return o
        }, initEvents: function () {
            var e = this, t = "dataForMatch_email", i = "dataForMatch_mobile", o = "dataForMatch_fax";
            e.on("update", function (a) {
                e.has(t) && e.unset(t), e.has(i) && e.unset(i), e.has(o) && e.unset(o)
            }), e.on("maindataload", function () {
                e.has(t) && e.unset(t), e.has(i) && e.unset(i), e.has(o) && e.unset(o)
            })
        }, getDataForMatch: function (e) {
            function t(e, t) {
                var i;
                "email" == t ? i = "emails" : "fax" == t ? i = "faxes" : "mobile" == t && (i = "mobiles");
                for (var o = [], a = 0, n = e.length; n > a; a++)for (var s = e[a], r = s[i], l = 0; l < r.length; l++) {
                    var d = r[l];
                    d && s.name && s.lowerName && o.push({
                        name: s.name,
                        lowerName: s.lowerName,
                        addr: d,
                        id: s.SerialId,
                        quanpin: s.Quanpin,
                        jianpin: s.Jianpin
                    })
                }
                return o
            }

            var i = "dataForMatch_" + e, o = this.get(i);
            if (!o) {
                var a = this.filterContacts(this.get("data").contacts, {filter: e});
                o = t(a, e), this.set(i, o)
            }
            return o
        }, getInputMatch: function (e) {
            function t(e, t, i) {
                var o = t + p + e;
                10 > t && (o = "0" + o);
                var a = l[o];
                a || (l[o] = a = []), a.push(i)
            }

            function i(e) {
                return c[e.split(p)[1]]
            }

            function o(e) {
                return parseInt(e.split(p)[0], 10)
            }

            for (var a = this.getDataForMatch(e.filter), n = e.keyword, s = a.length, r = [], l = {}, d = {
                addr: "01",
                name: "02",
                quanpin: "03",
                jianpin: "04"
            }, c = {"01": "addr", "02": "name", "03": "quanpin", "04": "jianpin"}, p = "0._.0", u = 0; s > u; u++) {
                var h = a[u], m = 1e4, f = null;
                if (h.addr && h.lowerName) {
                    var g = h.addr.indexOf(n);
                    if (-1 != g && m > g && (m = g, f = d.addr), 0 != g)if (g = h.lowerName.indexOf(n && n.toLowerCase()), -1 != g && m > g && (m = g, f = d.name), 0 != m) {
                        if (/[^a-zA-Z]/.test(n)) {
                            if (/[\u4e00-\u9fa5]/.test(n) && h.name && (g = h.name.indexOf(n), -1 != g && m > g && (m = g, f = d.name), 0 == m)) {
                                t(f, m, u);
                                continue
                            }
                        } else if (h.quanpin && h.jianpin) {
                            if (g = h.quanpin.indexOf(n), -1 != g && m > g && (m = g, f = d.quanpin), 0 == m) {
                                t(f, m, u);
                                continue
                            }
                            g = h.jianpin.indexOf(n), -1 != g && m > g && (m = g, f = d.jianpin)
                        }
                        f && t(f, m, u)
                    } else t(f, m, u); else t(f, m, u)
                }
            }
            var v = [];
            for (var y in l)v.push(y);
            v.sort(function (e, t) {
                return e.localeCompare(t)
            });
            for (var w = e.maxLength || 30, u = 0; u < v.length; u++)for (var b = v[u], x = l[b], I = i(b), C = o(b), T = 0; T < x.length; T++) {
                var S = x[T];
                if (r.push({info: a[S], matchAttr: I, matchIndex: C}), r.length >= w)break
            }
            return r
        }, search: function (e, i) {
            var i = i || {}, o = [], a = [];
            i.contacts ? o = i.contacts : t.isEmpty(this.get("data")) || (o = this.get("data").contacts, i.filter && this.isLoaded() && (o = this.filterContacts(o, {filter: i.filter})));
            for (var n = 0, s = o.length; s > n; n++) {
                var r = o[n], l = r.match;
                i.quickMatch && (l = r.quickMatch), l.call(r, e) && a.push(r)
            }
            return a
        }, getAddr: function (e, t) {
            return "email" == t ? i.Text.Email.getEmail(e) : "mobile" == t ? i.Text.Mobile.getNumber(e) : ""
        }, getName: function (e, t) {
            return "email" == t ? i.Text.Email.getName(e) : "mobile" == t ? i.Text.Mobile.getName(e) : ""
        }, getSendText: function (e, t) {
            return e = (e || "") && e.replace(/["\r\n]/g, " "), '"' + e + '"<' + t + ">"
        }, getContactsByEmail: function (e) {
            e = $Email.getEmailQuick(e);
            var t = this.getHashContacts()[e];
            return t ? t.hashArray ? t.hashArray : [t] : []
        }, getContactsByEmailV2: function (e) {
            e = $Email.getEmailQuick(e);
            var t = this.get("data");
            if (!t)return [];
            var i = t.contacts, o = [];
            if (i)for (var a = 0, n = i.length; n > a; a++)for (var s = i[a], r = 0; r < s.emails.length; r++)s.emails[r] == e && o.push(s);
            return o
        }, getHashContacts: function () {
            var e = this.get("data");
            if (!e)return {};
            if (!e.emailHash) {
                var t = e.contacts, i = {};
                if (t)for (var o = 0, a = t.length; a > o; o++)for (var n = t[o], s = 0; s < n.emails.length; s++) {
                    var r = n.emails[s];
                    i[r] ? i[r].hashArray.push(n) : (i[r] = n, n.hashArray = [n])
                }
                e.emailHash = i
            }
            return e.emailHash || {}
        }, getContactsByMobile: function (e) {
            var t = this.get("data"), i = [];
            if (!t || !t.contacts)return i;
            for (var o = 0, a = t.contacts, n = a.length; n > o; o++)for (var s = a[o], r = 0; r < s.mobiles.length; r++)s.mobiles[r] == e && i.push(s);
            return i
        }, getAddrNameByEmail: function (e) {
            e = e || "", e = e.trim();
            var t = this.getContactsByEmail(e), i = $Email.getAccount(e);
            if (t && t.length > 0) {
                for (var o = 0; o < t.length; o++)if (i != t[o].name)return t[o].name;
                return t[0].name
            }
            var a = $Email.getNameQuick(e);
            return a && "" != a.replace(/['"\s]/g, "") ? a : (a = e.replace(/<[^>]+>$/, ""), a && "" != a.replace(/['"\s]/g, "") ? a : e)
        }, getChinaMobileByEmail: function (e) {
            var t = "", i = this.getContactsByEmail(e);
            return i && i.length > 0 && (t = i[0].MobilePhone), t = t || ("139.com" == $Email.getDomain(e) ? $Email.getName(e) : ""), $Mobile.isChinaMobile(t) ? t : ""
        }, getFieldByType: function (e) {
            var i = [], o = e.serialId;
            if (t.isArray(o)) {
                for (var a = 0; a < o.length; a++)i = i.concat(arguments.callee.call(this, {
                    type: e.type,
                    serialId: o[a]
                }));
                return i
            }
            var n = [], s = this.getContactsById(o);
            if (s)switch (e.type) {
                case"email":
                    i = s.emails || i;
                    break;
                case"mobile":
                    i = s.mobiles || i
            }
            for (var a = 0; a < i.length; a++)if (!t.isEmpty(i[a])) {
                n.push(i[a]);
                break
            }
            return n
        }, isExistMobile: function (e) {
            var t = this.getContactsByMobile(e) || [];
            return t.length > 0
        }, isExistEmail: function (e) {
            var t = this.getContactsByEmail(e) || [];
            return t.length > 0
        }, updateCache: function (e) {
            this.trigger("update", e)
        }, getContactsCount: function (e) {
            return e && i.Timing.waitForReady('"undefined" !== typeof top.$App.getModel("contacts").get("data").contacts.length', function () {
                e(this.get("data").contacts.length)
            }), this.isLoaded() ? this.get("data").contacts.length : -1
        }
    })), e.extend(M2012.Contacts, {
        getModel: function () {
            var e = this;
            return window != window.top ? top.M2012.Contacts.getModel() : (this.current || (this.current = new M2012.Contacts.Model), this.cache && this.cache.setModelData(), this.cache || (this.cache = new M2012.Contacts.Cache({model: e.current})), this.current)
        }, getCache: function () {
            return window != window.top ? top.M2012.Contacts.getCache() : (this.cache || this.getModel(), this.cache)
        }
    })
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.Model.ModelBase;
    i.namespace("M2012.UI.HTMLEditor.Model", {}), i.namespace("M2012.UI.HTMLEditor.Model.Editor", a.extend({
        initialize: function (e) {
            var t = this;
            if ("object" != typeof e.frame)throw"缺少参数options.frame";
            return this.isReady = !1, this.isHtml = !0, this.frame = e.frame, this.jFrame = o(this.frame), this.editorWindow = null, this.editorDocument = null, this.jEditorDocument = null, this.textArea = e.textArea || this.frame.ownerDocument.createElement("textarea"), this.jTextArea = o(this.textArea), i.Iframe.domReady(this.frame, function () {
                t.onReady()
            }), this.supportDocumentMode = document.documentMode && document.documentMode >= 9, a.prototype.initialize.apply(this, arguments)
        },
        defaults: {
            name: "M2012.UI.HTMLEditor.Model.Editor",
            printerMode: "off",
            checkedImg: "../images/global/i-selected.png",
            uncheckImg: "../images/global/i-select.png"
        },
        onReady: function () {
            this.isReady = !0, this.editorWindow = this.frame.contentWindow, this.editorDocument = this.frame.contentWindow.document, this.jEditorDocument = o(this.editorDocument), this.editorDocument.body._obj = this, this.initEvents(), this.trigger("ready")
        },
        onBookMarkChange: function () {
            if ("off" != this.get("printerMode")) {
                var e = this.getSelectedStyle(), t = this.get("formatForPrint");
                this.utilDeepEquals(e, t) || this.printFormat(t)
            }
            this.trigger("bookmarkchange", {selectedStyle: this.getSelectedStyle()})
        },
        utilDeepEquals: function (e, t) {
            for (var i in e)if (e[i] !== t[i])return !1;
            return !0
        },
        initEvents: function () {
            function e(e) {
                e.keyCode == s && t.setFormatPrintOff()
            }

            var t = this;
            this.editorWindow.eval("window.onerror=function(){return true}"), this.jEditorDocument.keydown(function (i) {
                var o = t.onEditorFrameKeyDown(i);
                return e(i), o
            }).keyup(function (e) {
                t.onEditorFrameKeyUp(e)
            }).mousedown(function (e) {
                t.onEditorFrameMouseDown(e)
            }).mouseup(function (e) {
                t.onEditorFrameMouseUp(e)
            }).click(function (e) {
                t.onFocus(e)
            }).mousemove(function (e) {
                t.onEditorFrameMouseMove(e)
            }).mouseout(function (e) {
                t.onEditorFrameMouseOut(e)
            }).keypress(function (e) {
                t.trigger("keypress", e)
            }), this.jEditorDocument.find("body").on("paste", function (e) {
                t.onPaste(e)
            });
            try {
                var a = this.editorWindow;
                i.Event.GlobalEvent.on("click", function (e) {
                    e.event && e.event.isTrigger || e.window != a && t.focused && t.onBlur()
                }), new i.Event.GlobalEventManager({window: this.editorWindow})
            } catch (n) {
            }
            o(document).on("keydown", e);
            var s = i.Event.KEYCODE.Esc;
            this.initWatchSelectChange(), this.initHistory()
        },
        onFocus: function (e) {
            this.trigger("focus", e), this.focused = !0
        },
        onBlur: function () {
            this.trigger("blur"), this.focused = !1
        },
        onPaste: function (e) {
            this.trigger("paste", e)
        },
        initWatchSelectChange: function () {
            function e() {
                var e = t.getSelectedElement(), n = t.getSelectedText(), s = t.getSelectedStyle();
                i === e && o === n && t.utilDeepEquals(a, s) || t.onBookMarkChange(), i = e, o = n, a = s
            }

            var t = this;
            try {
                var i = this.getSelectedElement(), o = this.getSelectedText(), a = this.getSelectedStyle()
            } catch (n) {
            }
            this.jEditorDocument.keydown(e).mouseup(e), this.on("afterexeccommand", e)
        },
        initHistory: function () {
            var e = this, t = [], i = [], a = this.supportRedoMode = $B.is.ie, n = this.history = {
                add: function () {
                    var a = t.length, n = {};
                    n.html = e.editorDocument.body.innerHTML, 0 !== a && t[a - 1].html === n.html || (o.browser.msie && (n.bookmark = e.getBookmarkData()), t.push(n), t.length > 11 && t.shift(), i.length = 0)
                }, undo: function () {
                    if (0 != t.length && (n.add(), !(t.length < 2))) {
                        i.push(t.pop());
                        var e = t[t.length - 1];
                        this.goHistory(e)
                    }
                }, redo: function () {
                    if (0 != i.length) {
                        var e = i.pop();
                        this.goHistory(e), t.push(e)
                    }
                }, goHistory: function (t) {
                    e.editorDocument.body.innerHTML = t.html;
                    e.editorDocument.body.createTextRange();
                    $B.is.ie && e.moveToBookmark(t.bookmark)
                }, startWatch: function () {
                    e.historyTimer = setInterval(n.add, 3e3)
                }, init: function () {
                    this.hasInit || (this.hasInit = !0, a && (this.add(), this.startWatch(), e.on("beforeexeccommand", n.add), e.on("afterexeccommand", n.add)))
                }
            };
            $B.is.ie ? ($B.is.ie && ($B.getVersion() >= 9 || e.supportDocumentMode) && (this.jEditorDocument.on("mousedown", function () {
                e.isMouseDown = !0
            }), this.jEditorDocument.on("mouseup", function () {
                e.isMouseDown = !1
            })), this.jEditorDocument.on("beforedeactivate", function () {
                e.saveBookMark()
            }).on("activate", function () {
                if (n.init(), e._keepBookmark) {
                    if ($B.is.ie && ($B.getVersion() >= 9 || e.supportDocumentMode) && e.isMouseDown)return;
                    e.moveToBookmark(e._keepBookmark), e._keepBookmark = null
                }
            }), setTimeout(function () {
                n.init()
            }, 0)) : $B.is.ie11 && this.jEditorDocument.on("beforedeactivate", function () {
                var t = e.getSelection();
                e.ie11BookMark = {node: t.focusNode, offset: t.focusOffset}
            })
        },
        _keepBookmark: null,
        saveBookMark: function () {
            this._keepBookmark = this.getBookmarkData()
        },
        moveToBookmark: function (e) {
            var t = this.editorDocument;
            if (e && e.bookmark) {
                var i = t.body.createTextRange(), o = t.body.innerHTML.length;
                i.moveToBookmark(e.bookmark);
                var a = i.duplicate(), n = a.moveStart("character", -o), s = a.moveEnd("character", o);
                n == e.startOffset && s == e.endOffset || (i.moveStart("character", n - e.startOffset), i.moveEnd("character", s - e.endOffset));
                try {
                    i.select()
                } catch (r) {
                }
            }
        },
        getBookmarkData: function () {
            var e, t = this.editorDocument;
            e = t.selection ? t.selection.createRange() : t.body.createTextRange();
            var i = t.body.innerHTML.length, o = {};
            return e.getBookmark && (o.bookmark = e.getBookmark(), o.startOffset = e.moveStart("character", -i), o.endOffset = e.moveEnd("character", i)), o
        },
        onEditorFrameKeyDown: function (e) {
            var t = e.charCode || e.keyCode;
            if (9 == t) {
                var a = "&nbsp;&nbsp;&nbsp;&nbsp;", n = this.getSelection(), s = this.getRangeObject(n);
                if (o.browser.msie)try {
                    s.pasteHTML(a)
                } catch (e) {
                } else {
                    var r = s.createContextualFragment(a), l = r.lastChild;
                    s.insertNode(r), s.setEndAfter(l), s.collapse(!1), n.removeAllRanges(), n.addRange(s)
                }
                i.Event.stopEvent(e)
            } else if (13 == t && !e.ctrlKey && !e.shiftKey && o.browser.msie) {
                var n = this.getSelection(), s = this.getRangeObject(n);
                try {
                    for (var d = s.parentElement(); d;) {
                        if ("P" == d.tagName && d == this.editorDocument.body.firstChild && 1 == this.editorDocument.body.childNodes.length) {
                            this.execCommand("formatblock", "<div>");
                            break
                        }
                        if (!/^(?:td|body|span|font|i|em|b)$/i.test(d.tagName))break;
                        if ("TD" == d.tagName || "BODY" == d.tagName) {
                            this.execCommand("formatblock", "<div>");
                            break
                        }
                        d = d.parentNode
                    }
                } catch (e) {
                }
            }
            return e.ctrlKey && this.supportRedoMode && (90 == t ? (this.undo(), i.Event.stopEvent(e)) : 89 == t && (this.redo(), i.Event.stopEvent(e))), this.trigger("keydown", e), e.returnValue
        },
        onEditorFrameKeyUp: function (e) {
            this.trigger("keyup", e)
        },
        onEditorFrameMouseDown: function (e) {
            this.trigger("mousedown", e)
        },
        onEditorFrameMouseUp: function (e) {
            this.trigger("mouseup", e)
        },
        onEditorFrameMouseMove: function (e) {
            this.trigger("mousemove", e)
        },
        onEditorFrameMouseOut: function (e) {
            this.trigger("mouseout", e)
        },
        replaceImage: function (e, t) {
            this.editorWindow.focus();
            for (var i = this.editorDocument.getElementsByTagName("img"), o = 0; o < i.length; o++)i[o].src.indexOf("file:") >= 0 && unescape(i[o].src).indexOf(unescape(e)) > 0 && (i[o].src = t)
        },
        focus: function () {
            try {
                this.editorWindow.focus()
            } catch (e) {
            }
        },
        getSelectedText: function () {
            var e = this.editorWindow;
            return e.getSelection ? e.getSelection().toString() : e.document.getSelection ? e.document.getSelection() : e.document.selection ? e.document.selection.createRange().text : ""
        },
        insertImage: function (e, t) {
            var a, n;
            if (this.editorWindow.focus(), a = this.getSelection(), n = this.getRangeObject(a), $B.is.ie && $B.getVersion() < 9 && !this.supportDocumentMode) {
                var s = i.Text.Utils.format("&nbsp;&nbsp;<img crs='{0}' src='{0}' />", [e]);
                if ("control" == a.type.toLowerCase())n.item(0).outerHTML = s; else try {
                    n.pasteHTML(s)
                } catch (r) {
                    this.editorDocument.body.innerHTML = s + this.editorDocument.body.innerHTML
                }
                o(i.Text.Utils.format("img[crs='{0}']", [e]), this.editorDocument).each(function () {
                    this.src = e, o(this).removeAttr("crs")
                })
            } else if ($B.is.ie11) {
                var l = this;
                setTimeout(function () {
                    l.jEditorDocument.trigger("beforedeactivate")
                }, 0);
                var d, c, p = this.ie11BookMark;
                p && (n.setStartBefore(p.node), n.setEnd(p.node, p.offset), d = this.editorDocument.createElement("span"), d.innerHTML = "", c = n.extractContents(), c.appendChild(d), n.insertNode(c), n.setEnd(d, 0), n.collapse(!1), a.removeAllRanges(), a.addRange(n)), this.execCommand("InsertImage", e)
            } else this.insertHTML("&nbsp;&nbsp;"), this.execCommand("InsertImage", e);
            $B.is.ie && (n = this.getRangeObject(), n.collapse(!1), a.removeAllRanges && a.removeAllRanges(), a.addRange && a.addRange(n)), o(i.Text.Utils.format("img[crs='{0}']", [e]), this.editorDocument).each(function () {
                o(this).load(function () {
                    if (this.width > 520 && this.src.indexOf("attachId=") > 0) {
                        var e = this.width, t = this.height;
                        this.setAttribute("orgWidth", e), this.setAttribute("orgHeight", t), this.width = 520
                    }
                })
            }), this.trigger("insertImage", {url: e});
            var u = o(this.editorDocument).find("body");
            top.$App.showImgEditor(u, {
                composeId: upload_module.model.composeId,
                sid: upload_module.model.getSid(),
                isAdjustWidth: t ? t.isAdjustWidth : !1
            })
        },
        insertTable: function (e) {
            for (var t = e.rows, i = e.cells, a = "<table border='1' cellPadding='0' cellSpacing='0'>", n = Math.ceil((o(this.editorDocument.body).width() - 15) / i) + "px", s = 0; t > s; s++) {
                a += "<tr>";
                for (var r = 0; i > r; r++)a += "<td style='min-width:50px;width: " + (n || "100px") + "' border='1'><div>&nbsp;</div></td>";
                a += "</tr>"
            }
            a += "</table>&nbsp;", top.$B.is.ie || top.$B.is.ie11 ? this.insertHTML(a) : this.execInsertHTML(a)
        },
        execInsertHTML: function (e) {
            var t, i, o;
            return this.editorDocument.body.focus(), $B.is.ie ? (o = this.getSelection(), i = this.getRangeObject(o), void i.pasteHTML(e)) : ($B.is.ie11 && (t = this.ie11BookMark, o = this.getSelection(), i = this.getRangeObject(o), t && (i.setEnd(t.node, t.offset), i.collapse(!1), o.removeAllRanges(), o.addRange(i))), void this.execCommand("insertHTML", e))
        },
        splitOff: function () {
            var e = this;
            o(this.editorDocument.body).focus();
            var t, i, a = e.getSelection(), n = e.getRangeObject(a), s = e.ie11BookMark;
            if (i = s ? s.node : n.startContainer || n.parentElement(), i != e.editorDocument.body) {
                for (; i.parentNode && i.parentNode !== e.editorDocument.body;)i = i.parentNode;
                $B.is.ie && $B.getVersion() < 9 ? (n.moveStart("character", -i.innerHTML.length - 1), n.select()) : (n.collapse(!1), $B.is.ie11 && s ? (n.setStartBefore(i || e.editorDocument.body.firstChild), n.setEnd(s.node, s.offset)) : n.setStartBefore(i || e.editorDocument.body.firstChild), a.removeAllRanges(), a.addRange(n), i = e.editorDocument.createElement("div"), i.innerHTML = "<br>&nbsp;<br>", t = n.extractContents(), t.appendChild(i)), $B.is.ie && $B.getVersion() < 9 ? (e.cut(), n.collapse(!0), n.select(), n.pasteHTML("<div><br>&nbsp;&nbsp;</div>"), n.moveStart("character", -100), n.collapse(!0), n.select(), e.paste(), n.moveEnd("character", 2), n.collapse(!1), n.select()) : (n.insertNode(t), n.setEnd(i, 0), n.collapse(!1), a.removeAllRanges(), a.addRange(n))
            }
        },
        dispose: function () {
            clearInterval(this.updateStateTimer), clearInterval(this.historyTimer)
        },
        getSelection: function () {
            var e, t = this.editorWindow;
            return t.getSelection ? e = t.getSelection() : t.document.selection && (e = t.document.selection), e
        },
        getRangeObject: function (e) {
            var t = e || this.getSelection();
            if (t.createRange)return t.createRange();
            if (t.getRangeAt && "Range" == t.type)return t.getRangeAt(0);
            if (this.editorDocument.createRange) {
                var i = this.editorDocument.createRange();
                try {
                    i.setStart(t.anchorNode || this.editorDocument.body, t.anchorOffset || 0), i.setEnd(t.focusNode || this.editorDocument.body, t.focusOffset || 0)
                } catch (o) {
                    console.log(t.anchorNode, t.focusNode)
                }
                return i
            }
        },
        StyleObjectElements: {img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, embed: 1, object: 1, ol: 1, ul: 1},
        utilGetSelectedElementType: function (e) {
            var t = "";
            if ($B.is.ie) {
                var i = this.editorDocument.selection.type;
                "Text" == i && (t = "text"), "Control" == i && (t = "element"), "None" == i && (t = "none")
            } else if (t = "text", 1 == e.rangeCount) {
                var o = e.getRangeAt(0), a = o.startContainer;
                a == o.endContainer && 1 == a.nodeType && o.endOffset - o.startOffset == 1 && this.StyleObjectElements[a.childNodes[o.startOffset].nodeName.toLowerCase()] && (t = "element")
            }
            return t
        },
        selectElementText: function (e) {
            var t = this.editorDocument, i = this.getSelection();
            t.getSelection ? i.selectAllChildren(e) : t.body.createTextRange && (i = t.body.createTextRange(), i.moveToElementText(e), i.select()), e.focus()
        },
        getSelectedElement: function () {
            var e = this.getSelection();
            if (!e)return null;
            var t = this.getRangeObject(e);
            if (!t)return null;
            var i, a = this.utilGetSelectedElementType(e);
            switch (a) {
                case"element":
                    if (o.browser.msie)try {
                        i = e.createRange().item(0)
                    } catch (n) {
                    } else t = e.getRangeAt(0), i = t.startContainer.childNodes[t.startOffset];
                    break;
                case"text":
                    $B.is.ie ? $B.getVersion() >= 9 || this.supportDocumentMode ? (i = e.anchorNode || t.startContainer, i && 1 != i.nodeType && (i = i.parentNode)) : (t.text.length > 0 && t.collapse(!0), i = t.parentElement()) : (i = e.anchorNode, i && 1 != i.nodeType && (i = i.parentNode));
                    break;
                default:
                    $B.is.ie ? $B.getVersion() >= 9 || this.supportDocumentMode ? (i = t.startContainer, i && !i.tagName && i.parentNode && (i = i.parentNode)) : i = t.parentElement() : (i = e.anchorNode, i && 1 != i.nodeType && (i = i.parentNode))
            }
            if (i && i.ownerDocument != this.editorDocument && (i = null), i && $B.is.ie && $B.getVersion() > 7) {
                for (var s = 0, r = 0, l = 0; l < i.childNodes.length; l++) {
                    var d = i.childNodes[l];
                    3 == d.nodeType || "BR" == d.tagName ? s++ : r++
                }
                s && 1 === r && 1 == i.lastChild.nodeType && (i = i.lastChild)
            }
            return i
        },
        utilIsBlockElement: function (e) {
            return "string" != typeof e && (e = e && e.tagName), /^(?:body|div|p|table|td|tr|ul|li|fieldset|legend)$/i.test(e)
        },
        setRowSpace: function (e) {
            function a(t) {
                t && o("*", t).add(t).css("line-height", e)
            }

            function n(e) {
                for (; e;) {
                    if (r.utilIsBlockElement(e))return e;
                    e = e.parentNode
                }
                return null
            }

            function s(e, t) {
                for (var o = [], a = m.nextSibling; a && a != t && !i.Dom.containElement(a, t);)o.push(a), a = a.nextSibling ? a.nextSibling : a.parentNode;
                return o
            }

            this.editorWindow.focus();
            var r = this;
            e = 100 * e + "%";
            var l, d, c, p = this.getSelection(), u = this.getRangeObject(p), h = [];
            if ($B.is.ie && $B.getVersion() < 9 ? (c = u.duplicate(), u.collapse(!1), l = u.parentElement(), c.collapse(!1), d = c.parentElement()) : (u = p.getRangeAt(0), l = u.startContainer.parentNode, d = u.endContainer.parentNode), l && l.ownerDocument == this.editorDocument) {
                try {
                    var m = n(l);
                    a(m)
                } catch (f) {
                }
                try {
                    var g = n(d);
                    if (m && g && m != g) {
                        var h = s(m, g);
                        h.length > 0 && t.each(h, function (e) {
                            a(e)
                        }), a(g)
                    }
                } catch (f) {
                }
            }
        },
        handlerReplyQuote: function () {
            function e(e) {
                var i = t.jEditorDocument.find("a[data-cmd]");
                e ? (o(i).text("清除往来邮件内容"), o(i).data("cmd", "clearQuote")) : (o(i).text("展开往来邮件内容"), o(i).data("cmd", "showQuote"))
            }

            var t = this, i = top.$App.getReplyWithQuote(), a = '<div contenteditable="false"><a href="javascript:;" data-cmd="clearQuote" style="position:absolute;right:10px;top:0;cursor:pointer;color:#1a75ca;text-decoration: none;font-size:14px;">清除往来邮件内容</a></div>';
            setTimeout(function () {
                var n = t.jEditorDocument.find("#reply139content");
                n.append(a), t.jEditorDocument.find("a[data-cmd]").unbind("click").click(function (i) {
                    var a = o(this).data("cmd");
                    e("showQuote" == a), t.trigger("handlerReplyQuote", {isNeedShow: "showQuote" == a})
                }), e(i), t.trigger("handlerReplyQuote", {isNeedShow: !!i})
            }, 20)
        },
        setLink: function (e) {
            this.editorWindow.focus(), this.execCommand("CreateLink", e)
        },
        setSign: function (e) {
            function t() {
                return top.BH && top.BH("compose_loadfujian_sign"), ['<tr><td colspan="2"><div>', "<div>==============================================</div>", '<h2 style="margin: 0;font-family:SimSun;font-size:13px;font-weight: normal;">福建移动互联网自助渠道大家庭：</h2>', "<div>", '<table border="1" cellpadding="0" cellspacing="0">', "<thead>", '<tr height="30" style="font-family:SimSun;font-size:12px;">', "<th>微信营业厅</th>", "<th>流量秘书</th>", "<th>手机营业厅</th>", "<th>掌上公交</th>", "<th>网上营业厅</th>", "<th>掌上营业厅</th>", "</tr>", "</thead>", '<tbody align="center">', "<tr>", '<td style="border-bottom-style:none; padding-top:5px;" width="123"><img class="not_show_img_tool" name="hideEditorBar" width="100" height="100" src="' + top.location.protocol + "//appmail.mail.10086.cn" + top.getRootPath() + '/images/compose/file0001.png"></td>', '<td style="border-bottom-style:none; padding-top:5px;" width="123"><img class="not_show_img_tool" name="hideEditorBar" width="100" height="100" src="' + top.location.protocol + "//appmail.mail.10086.cn" + top.getRootPath() + '/images/compose/file0002.png"></td>', '<td style="border-bottom-style:none; padding-top:5px;" width="123"><img class="not_show_img_tool" name="hideEditorBar" width="100" height="100" src="' + top.location.protocol + "//appmail.mail.10086.cn" + top.getRootPath() + '/images/compose/file0003.jpeg"></td>', '<td style="border-bottom-style:none; padding-top:5px;" width="123"><img class="not_show_img_tool" name="hideEditorBar" width="100" height="100" src="' + top.location.protocol + "//appmail.mail.10086.cn" + top.getRootPath() + '/images/compose/file0004.jpeg"></td>', '<td style="border-bottom-style:none; padding-top:5px;" width="123"><a href="http://www.10086.cn"><img class="not_show_img_tool" border="0" name="hideEditorBar" width="100" height="100" src="' + top.location.protocol + "//appmail.mail.10086.cn" + top.getRootPath() + '/images/compose/file0005.jpg"></a></td>', '<td style="border-bottom-style:none; color:#4f81bd; font-size:14px;font-family:SimSun;text-align: center;" width="130"><a style="text-decoration:none;" href="http://wap.fj.10086.cn">wap.fj.10086.cn</a></td>', "</tr>", '<tr style="font-size:12px;font-family:SimSun;">', '<td style="border-top-style:none;">首次关注送100M流量</td>', '<td style="border-top-style:none;">首登送100M流量</td>', '<td style="border-top-style:none;">装在手机上的营业厅</td>', '<td style="border-top-style:none;">公交到哪我先知</td>', '<td style="border-top-style:none; padding:0 10px">登录10086.cn发现更多美好</td>', '<td style="border-top-style:none; padding:0 10px">无需安装应用轻松查办</td>', "</tr>", "</tbody>", "</table>", "</div>", "<div>==============================================</div>", "</div></td></tr>"].join("")
            }

            function a() {
                return ['<tr><td colspan="2"><div>', '<img name="hideEditorBar" width="800" height="445" src="' + top.location.protocol + "//appmail.mail.10086.cn" + top.getRootPath() + '/images/compose/file0006.jpg">', "</div></td></tr>"].join("")
            }

            var n = i.Date.getServerTime(), s = n.format("yyyy年MM月dd日 星期") + ["天", "一", "二", "三", "四", "五", "六"][n.getDay()];
            if (e = e.replace("$时间$", s), e = e.replace("*年*月*日 星期*", s), e && -1 == e.indexOf("dzmp_table") && (e = "<tr><td colspan='2'>" + e + "</td></tr>"), this.isHtml) {
                var r = this.editorDocument;
                e = e.replace(/^\s*<p>|<\/p>\s*$/i, ""), /<\/\w+>/.test(e) || (e = e.replace(/\r?\n/g, "<br>"));
                var l = r.getElementById("signContainer");
                if (!l || !this.hasSetSign && l.signLength && l.signLength != l.innerHTML.length) {
                    l && (l.id = null), l = r.createElement("div"), l.id = "signContainer";
                    var d = r.getElementById("content139") || r.body, c = r.createElement("div"), p = top.$User.getDefaultFont(), u = {
                        fontFamily: p.family, fontSize: this.getPxSize(p.size), color: p.color, lineHeight: p.lineHeight
                    };
                    o(c).css(u), c.innerHTML = "<br><br><br><br><br><br>", d.appendChild(c), d.appendChild(l)
                }
                var h = top.$User.getUserConfig();
                h && (h.spcsignature ? e = h.spcsignature ? e + a() : e : h.isfujianmobile && (e = h.isfujianmobile ? e + t() : e)), e = e.replace(/ /g, "&nbsp;"), e = e.replace(/<.*?>/g, function (e) {
                    return e.replace(/&nbsp;/g, " ")
                }), e = e.replace(/<\/div>&nbsp;<div>/g, "</div><div>"), o(l).html("<table id='signTable' style='width:100%;'><tbody>" + e + "</tbody></table>"), l.signLength = l.innerHTML.length, o(l).append('<style contenteditable="false">#signContainer{word-wrap:break-word;word-break:break-all;}</style>'), this.hasSetSign = !0
            } else this.textArea.value += "\r\n" + e
        },
        setBlessings: function (e) {
            if (this.isHtml) {
                var t = this.editorDocument;
                e = e.replace(/^\s*<p>|<\/p>\s*$/i, ""), /<\/\w+>/.test(e) || (e = e.replace(/\r?\n/g, "<br>"));
                var i = t.getElementById("blessingsContainer");
                if (!i || i.signLength && i.signLength != i.innerHTML.length) {
                    i && (i.id = null), i = t.createElement("div"), i.id = "blessingsContainer";
                    var o = t.getElementById("content139") || t.body, a = t.createElement("div");
                    a.innerHTML = "<br>";
                    var n = t.getElementById("signContainer");
                    n ? (o.insertBefore(i, n), o.insertBefore(a, n)) : (o.appendChild(a), o.appendChild(i))
                }
                i.innerHTML += "<div>" + e + "</div>", i.signLength = i.innerHTML.length
            } else this.contentPlainText.value += "\r\n" + e
        },
        addReplyContent: function (e, t) {
            var i = top.$App.getSessionDataContent(), o = "";
            $composeApp && "true" != $composeApp.query.asAttch && (o = this.getHtmlContent() + i + "<div><br><br><br><br><br><br></div><div id='signContainer'></div><hr id='replySplit'/><div id='reply139content' style='position: relative;'><div id='mainReplyContent'>" + e + "</div></div>"), this.setHtmlContent(o, t), this.handlerReplyQuote()
        },
        getHtmlContent: function (e) {
            var t = this.editorDocument.body.innerHTML;
            if ($B.is.webkit && t.indexOf("<!--[if") > -1 && (t = t.replace(/<!--\[if !\w+\]-->([\s\S]*?)<!--\[endif\]-->/g, "$1")), e) {
                var i = this.editorDocument.body.cloneNode(!0), a = o(i).find("#signContainer");
                a.length && a.remove(), t = i.innerHTML
            }
            return t
        },
        setHtmlContent: function (e, t) {
            function i() {
                a.editorDocument.body.innerHTML = e, t && t.replaceOldContent && o(a.editorDocument).find("#reply139content").children("div:eq(0)").children("div:eq(2)").html(t.replaceOldContent), a.trigger("setcontent")
            }

            var a = this;
            this.isReady ? i() : this.on("ready", i)
        },
        getHtmlToTextContent: function () {
            var e = this.editorDocument.body, t = "";
            if (document.all)t = e.innerText; else {
                var i = e.innerHTML;
                i = i.replace(/<br\s?\/?>/gi, "\n");
                var o = document.createElement("div");
                o.innerHTML = i, t = o.textContent
            }
            return t
        },
        getTextToHtmlContent: function () {
            var e = this.textArea.value, t = document.createElement("div");
            return document.all ? (e = e.replace(/\r?\n/g, "<br>"), e = e.replace(/ /g, "&nbsp;"), t.innerHTML = e, t.innerHTML) : (t.appendChild(document.createTextNode(e)), t.innerHTML.replace(/\r?\n/g, "<br>"))
        },
        getTextContent: function () {
            return this.textArea.value
        },
        setTextContent: function (e) {
            this.textArea.value = e
        },
        switchEditor: function () {
            this.isHtml ? (this.setTextContent(this.getHtmlToTextContent()), this.jTextArea.show(), this.jFrame.hide(), this.isHtml = !1) : (this.setHtmlContent(this.getTextToHtmlContent()), this.jFrame.show(), this.jTextArea.hide(), this.isHtml = !0)
        },
        setFormatPrinter: function () {
            "off" == this.get("printerMode") ? this.setFormatPrinterOn() : this.setFormatPrintOff()
        },
        setFormatPrinterOn: function (e) {
            this.set("formatForPrint", this.getSelectedStyle()), this.set("printerMode", e ? "keepOn" : "on"), this._keepBookmark = null, this.editorDocument.body.style.cssText = "cursor:url(/m2015/images/compose/cursor_format.cur), text;"
        },
        setFormatPrintOff: function () {
            this.set("printerMode", "off"), this.editorDocument.body.style.cssText = ""
        },
        printFormat: function (e) {
            if (!this.formatLocked) {
                var t = this, i = this.get("printerMode");
                if ("on" == i)this.setFormatPrintOff(); else if ("off" == i)return;
                this.formatLocked = !0, setTimeout(function () {
                    t.formatLocked = !1
                }, 500), this.execCommand("removeFormat");
                var o = this.getSelectedStyle();
                o.isBold !== e.isBold && this.execCommand("bold", null, !0), o.isUnderLine !== e.isUnderLine && this.execCommand("underline", null, !0), o.isItalic !== e.isItalic && this.execCommand("italic", null, !0), o.isOrderedList !== e.isOrderedList && this.execCommand("insertorderedlist", null, !0), o.isUnorderedList !== e.isUnorderedList && this.execCommand("insertunorderedlist", null, !0), o.textAlign !== e.textAlign && this.execCommand("Justify" + e.textAlign, null, !0), o.color !== e.color && this.execCommand("ForeColor", e.color, !0), o.backgroundColor !== e.backgroundColor && this.setBackgroundColor(e.backgroundColor, !0), o.fontFamily !== e.fontFamily && this.execCommand("fontname", e.fontFamily, !0), o.fontSize !== e.fontSize && this.setFontSize(e.fontSize)
            }
        },
        insertHTML: function (e) {
            this.editorWindow.focus();
            var t = this.getSelection(), i = this.getRangeObject(t);
            if ($B.is.ie)if ($B.getVersion() >= 9 || this.supportDocumentMode) {
                i.deleteContents();
                var o = this.editorWindow.document.createElement("div");
                e = e.replace(/\<\!\[if \!vml\]\>/gi, "").replace(/\<\!\[endif\]\>/gi, ""), o.innerHTML = e;
                var a = o;
                i.insertNode(o), i.setEndAfter(a), i.collapse(!1), t.removeAllRanges(), t.addRange(i)
            } else if (e = e.replace(/\<\!\[if \!vml\]\>/gi, "").replace(/\<\!\[endif\]\>/gi, ""), "control" == t.type.toLowerCase())i.item(0).outerHTML = e; else try {
                i.pasteHTML(e)
            } catch (n) {
                this.editorDocument.body.innerHTML = e + this.editorDocument.body.innerHTML
            } else {
                i.deleteContents();
                var s = i.createContextualFragment(e), a = s.lastChild;
                i.insertNode(s), i.setEndAfter(a), i.collapse(!1), t.removeAllRanges(), t.addRange(i)
            }
        },
        queryCommandState: function (e) {
            var t = !1;
            try {
                t = this.editorDocument.queryCommandState(e)
            } catch (i) {
            }
            return t
        },
        FontSizeList: {
            6: "一号",
            5: "二号",
            4: "三号",
            3: "四号",
            2: "五号",
            1: "六号",
            "32px": "一号",
            "24px": "二号",
            "18px": "三号",
            "16px": "四号",
            "13px": "五号",
            "10px": "六号",
            "12px": "六号"
        },
        getSelectedStyle: function () {
            function e(e) {
                return t.FontSizeList[e] || e
            }

            var t = this, o = this.getSelectedElement();
            if (o && o.ownerDocument == this.editorDocument) {
                var a = i.Dom, n = a.getCurrentCSS(o, "text-align"), s = a.getCurrentCSS(o, "font-size"), r = a.getCurrentCSS(o, "font-family"), l = a.getCurrentCSS(o, "color"), d = a.getCurrentCSS(o, "background-color"), c = a.getCurrentCSS(o, "line-height"), p = {
                    isBold: this.queryCommandState("bold"),
                    isUnderLine: this.queryCommandState("underline"),
                    isItalic: this.queryCommandState("italic"),
                    isOrderedList: this.queryCommandState("insertorderedlist"),
                    isUnorderedList: this.queryCommandState("insertunorderedlist"),
                    isAlignLeft: "left" == n,
                    isAlignCenter: "center" == n,
                    isAlignRight: "right" == n,
                    textAlign: n,
                    fontFamily: r,
                    fontSize: s,
                    color: l,
                    backgroundColor: d,
                    fontSizeText: e(s),
                    lineHeight: parseInt(c) / parseInt(s)
                };
                return p
            }
            return null
        },
        utilGetFontSizeLevel: function (t) {
            if (/^\d+$/.test(t))return parseInt(t);
            var i = ["", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];
            return e.inArray(t, i) || 4
        },
        setFontSizeUp: function () {
            this.editorWindow.focus();
            var e = this.getSelectedElement(), t = i.Dom.getCurrentCSS(e, "font-size");
            if (t.indexOf("px") > -1) {
                var o = parseInt(t) + 4 + "px";
                this.setFontSize(o), e = this.getSelectedElement(), e.style.fontSize = o
            } else {
                var t = this.utilGetFontSizeLevel(t);
                this.setFontSize(t + 1)
            }
        },
        setFontSizeDown: function () {
            this.editorWindow.focus();
            var e = this.getSelectedElement(), t = i.Dom.getCurrentCSS(e, "font-size");
            if ("medium" == t && (t = "16px"), t.indexOf("px") > -1) {
                var o = Math.max(9, parseInt(t) - 4) + "px";
                this.setFontSize(o), e = this.getSelectedElement(), e.style.fontSize = o
            } else {
                var t = this.utilGetFontSizeLevel(t);
                this.setFontSize(Math.max(1, t - 1))
            }
        },
        cut: function () {
            this.execCommand("Cut")
        },
        copy: function () {
            this.execCommand("Copy")
        },
        paste: function () {
            this.execCommand("Paste")
        },
        setBold: function () {
            this.execCommand("Bold")
        },
        setUnderline: function () {
            this.execCommand("Underline")
        },
        setItalic: function () {
            this.execCommand("Italic")
        },
        setFontFamily: function (e) {
            if ($B.is.ie && $B.getVersion() < 9) {
                var t = this.editorDocument.getElementsByTagName("font");
                if (t.length > 200)var i = !0;
                if (!i)for (var o = 0, a = t.length; a > o; o++)t[o].setAttribute("oldel", "1")
            }
            if (this.execCommand("fontname", e), $B.is.ie && $B.getVersion() < 9 && !i)for (var t = this.editorDocument.getElementsByTagName("font"), o = 0, a = t.length; a > o; o++) {
                var n = t[o];
                if (!n.getAttribute("oldel"))for (var s = n.getElementsByTagName("span"), r = 0, l = s.length; l > r; r++) {
                    var d = s[r];
                    d.style.fontFamily && (d.style.fontFamily = "")
                }
            }
        },
        markFont: function () {
            this.jEditorDocument.find("font").attr("oldel", 1)
        },
        resetTextSizeForIe: function () {
            if ($B.is.ie) {
                var e = this.editorDocument, t = e.getElementsByTagName("font"), i = t.length;
                if (i > 0)for (var o = 0; i > o; o++) {
                    var a = t[o];
                    null === a.getAttribute("oldel") && a.removeAttribute("size")
                }
            }
        },
        setFontSize: function (e) {
            this.editorWindow.focus(), $B.is.ie && this.jEditorDocument.find("font").attr("oldel", 1);
            var t = this.getSelectedElement();
            if (e.toString().indexOf("px") > -1) {
                var i = {12: 1, 13: 2, 16: 3, 18: 4, 24: 5, 32: 6, 48: 7}, o = parseInt(e, 10), a = i[o] ? i[o] : 4;
                this.execCommand("FontSize", a, !0), t.style.fontSize = e, this.trigger("afterexeccommand", {
                    command: "FontSize",
                    param: e
                })
            } else this.execCommand("FontSize", e), t.style.fontSize && (t.style.fontSize = "");
            $B.is.ie && this.jEditorDocument.find("font:not([oldel])").find("span").each(function () {
                this.style.fontSize && (this.style.fontSize = "")
            })
        },
        setDefaultFont: function (e) {
            function t() {
                var e = i.jEditorDocument.find("body").children(), t = i.jEditorDocument.find("#signContainer");
                if (t.size() > 0)return {index: t.index(), jEle: t};
                var o = i.jEditorDocument.find("#replySplit");
                return o.size() > 0 ? {index: o.index(), jEle: o} : {index: e.size()}
            }

            var i = this, a = {
                fontFamily: e.family,
                fontSize: i.getPxSize(e.size),
                color: e.color,
                lineHeight: e.lineHeight,
                wordWrap: "break-word",
                wordBreak: "break-all"
            }, n = t(), s = i.jEditorDocument.find("body").find("div:lt(" + n.index + ")");
            if (s && s.length > 0)for (var r = 0; r < s.length; r++) {
                var l = s[r];
                o(l).css(a)
            } else {
                var d = o(i.editorDocument.createElement("div"));
                $B.is.ie || d.append("<br>"), n.jEle ? n.jEle.before(d) : i.jEditorDocument.find("body").append(d), d.css(a)
            }
        },
        getPxSize: function (e) {
            if (/\d+$/.test(e)) {
                if ($B.is.chrome && 1 == e)return "12px";
                e = {6: "32px", 5: "24px", 4: "18px", 3: "16px", 2: "13px", 1: "10px"}[e] || e
            }
            return e
        },
        setForeColor: function (e) {
            this.editorWindow.focus(), e.indexOf("rgb") > -1 && (e = this.changeRGBColor(e)), $B.is.ie && this.jEditorDocument.find("font").attr("oldel", 1), this.execCommand("ForeColor", e), $B.is.ie && this.jEditorDocument.find("font:not([oldel])").find("span").each(function () {
                this.style.color && (this.style.color = "")
            })
        },
        changeRGBColor: function (e) {
            var t = e.replace(/\s/g, "").match(/rgb\((\d+),(\d+),(\d+)\)/i);
            if (t) {
                var i = (1 * t[1]).toString(16).replace(/^(.)$/, "0$1"), o = (1 * t[2]).toString(16).replace(/^(.)$/, "0$1"), a = (1 * t[3]).toString(16).replace(/^(.)$/, "0$1");
                return "#" + i + o + a
            }
            return ""
        },
        preview: function () {
            function e(e) {
                var t = e ? "li[objid]" : "li span[fileid]", i = [];
                return o(uploadManager.container).find(t).each(function () {
                    var e = o(this).attr("objid") || o(this).attr("fileid");
                    e && i.push(e)
                }), i
            }

            for (var t = this.editorDocument.body.innerHTML, a = o(window).height() - 50, n = M2012.UI.RichInput.instances, s = n[0].getValidationItems().distinct(), r = n[1].getValidationItems().distinct(), l = n[2].getValidationItems().distinct(), d = mainView.getSenderAddress(), c = o("#txtSubject").val(), p = i.Date.format("yyyy-MM-dd hh:mm:ss", i.Date.getServerTime()), u = (uploadManager.fileList || []).concat(Arr_DiskAttach || []), h = [], m = e(!0).concat(e(!1)), f = 0; f < u.length; f++) {
                var g = u[f];
                -1 != o.inArray(g.fileId, m) && (!g.isDisk && (g.fileSize = top.$T.Utils.getFileSizeText(g.fileSize, {
                    maxUnit: "K",
                    comma: !0
                })), h.push(g))
            }
            top.$App.registerConfig("mailPreviewData", {
                sender: d,
                to: s,
                cc: r,
                bcc: l,
                subject: c,
                serverTime: p,
                attachs: h,
                writeContent: t
            }), top.$Msg.open({
                dialogTitle: "预览",
                url: "compose_preview.html?sid=" + top.sid,
                height: a + "px",
                width: "90%"
            })
        },
        selectAll: function () {
            this.execCommand("selectAll")
        },
        strikeThrough: function () {
            this.execCommand("strikeThrough")
        },
        setAlignLeft: function () {
            this.execCommand("JustifyLeft")
        },
        setAlignCenter: function () {
            this.execCommand("JustifyCenter")
        },
        setAlignRight: function () {
            this.execCommand("JustifyRight")
        },
        setIndent: function () {
            this.execCommand("Indent")
        },
        setOutdent: function () {
            this.execCommand("Outdent")
        },
        insertOrderedList: function () {
            this.execCommand("Insertorderedlist")
        },
        insertUnorderedList: function () {
            this.execCommand("Insertunorderedlist")
        },
        _uploadFile: function (e, t) {
            var i = supportUploadType.isSupportFlashUpload && document.getElementById("flashplayer");
            if (!i) {
                uploadManager.filterType = t, uploadManager.callback = function () {
                    for (var e, t, i, o = this.fileList, a = 0, n = o.length; n > a; a++)e = o[a], i = e.filterType, i && (i.test(e.fileName) && (t = "largeAttach" == e.fileType ? e.fileSize : $T.Utils.getFileSizeText(e.fileSize, {
                        maxUnit: "K",
                        comma: !0
                    }), upload_module.insertRichMediaFile(e.fileName, t)), delete e.filterType)
                };
                var a = document.getElementById("uploadInput"), n = {
                    audio: "audio/mpeg",
                    video: "video/mp4, flv-application/octet-stream",
                    doc: "text/plain, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/msword, application/pdf",
                    image: "image/gif, image/jpeg, image/bmp, image/png"
                };
                o(a).attr("accept", n[e]), a && o(a).trigger("click", "fakeClick")
            }
        },
        uploadInsertDocument: function () {
            this._uploadFile("doc", /\.(?:docx?|pptx?|xlsx?|pdf|txt)$/i)
        },
        uploadInsertAudio: function () {
            this._uploadFile("audio", /\.(?:mp3|m4a|wav)$/i)
        },
        uploadInsertVideo: function () {
            this._uploadFile("video", /\.(?:mp4|flv|f4v|m4v)$/i)
        },
        removeFormat: function () {
            var e = this.editorDocument;
            this.sourceBackup = e.body.innerHTML;
            var t = e.getElementById("content139") || e.body, i = e.getElementById("signContainer");
            i && i.parentNode.removeChild(i);
            var o = t.innerHTML;
            if (this.restoreSource = function (e) {
                    return e.ctrlKey && 90 === e.keyCode && this.hasOwnProperty("sourceBackup") && this.undo(), !1
                }, this.on("keydown", this.restoreSource), o = o.replace(/(style)\s*=\s*(["']?)(?:[^\\>]|\\\2)*?\2/gi, ""), o = o.replace(/<\/?(?:h\d|li|dl|dd|dt|ol|ul|font|sub|sup|i|u|em|del|b|strike|strong)(\s+[^>]*)?>/gi, ""), o = o.replace(/<!--\[if.*?-->.*?<!--\[endif\]-->/gi, ""), o = o.replace(/<([\w:]+)(\s+(?!src)\w+\s*=\s*(["']?)(?:[^\\>]|\\\3)*?\3)?>\s*<\/\1>/gi, ""), t.innerHTML = o, i) {
                var a = e.getElementById("replySplit");
                a ? t.insertBefore(i, a) : t.appendChild(i)
            }
        },
        setBackgroundColor: function (e, t) {
            if (o.browser.firefox) {
                this.execCommand("Bold");
                var i = this.getSelectedElement();
                i.style.backgroundColor = e, this.execCommand("Bold")
            } else $B.is.ie && this.jEditorDocument.find("font").attr("oldel", 1), this.execCommand("BackColor", e), $B.is.ie && this.jEditorDocument.find("font:not([oldel])").find("span").each(function () {
                this.style.backgroundColor && (this.style.backgroundColor = "")
            })
        },
        redo: function () {
            this.supportRedoMode ? this.history.redo() : this.execCommand("Redo")
        },
        undo: function () {
            this.supportRedoMode ? this.history.undo() : void 0 != this.sourceBackup ? (this.editorDocument.body.innerHTML = this.sourceBackup, this.sourceBackup = null, delete this.sourceBackup, this.editor.off("keydown", this.restoreSource)) : this.execCommand("Undo")
        },
        execCommand: function (e, t, o) {
            o || this.editorWindow.focus(), o || this.trigger("beforeexeccommand", {
                command: e,
                param: t
            }), this.editorDocument.execCommand(e, !1, t), this.styleCommand(e), !o && i.Browser.is.ie && i.Browser.getVersion() > 7 && this.editorWindow.focus(), o || this.trigger("afterexeccommand", {
                command: e,
                param: t
            })
        },
        styleCommand: function (e) {
            var t = this;
            switch (e) {
                case"Indent":
                    $B.is.ie && setTimeout(function () {
                        try {
                            var e = t.getRangeObject(), i = e.parentElement().parentElement;
                            "BLOCKQUOTE" == i.tagName && (i.style.marginTop = "0", i.style.marginBottom = "0")
                        } catch (o) {
                        }
                    }, 100)
            }
        }
    })), o.extend(M2012.UI.HTMLEditor.Model.Editor, {
        getDefaultFont: function () {
            var e = {};
            try {
                e = top.$User.getDefaultFont({isCompose: !0})
            } catch (t) {
            }
            return e
        }
    })
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = window.document;
    i.namespace("M2012.UI.HTMLEditor.View.Menu", a.extend({
        initialize: function (t) {
            var i = e(t && t.template || this.template);
            return this.setElement(i), this.options = t || {}, a.prototype.initialize.apply(this, arguments)
        }, render: function () {
            return this.$el.appendTo(n.body), this.on("select", this.hide), this.render = function () {
                return this
            }, a.prototype.render.apply(this, arguments)
        }, hide: function () {
            return M2012.UI.PopMenu.unBindAutoHide({
                action: "click",
                element: this.el
            }), a.prototype.hide.apply(this, arguments)
        }, getRGBColor: function (e) {
            if (/rgb/i.test(e))return e.toLowerCase();
            if (e.indexOf("#") > -1) {
                var t = e.match(/^\#(.)(.)(.)$/);
                if (t)return i.Text.Utils.format("rgb({r},{g},{b})", {
                    r: parseInt(t[1] + t[1], 16),
                    g: parseInt(t[2] + t[2], 16),
                    b: parseInt(t[3] + t[3], 16)
                });
                if (t = e.match(/^\#(..)(..)(..)$/))return i.Text.Utils.format("rgb({r},{g},{b})", {
                    r: parseInt(t[1], 16),
                    g: parseInt(t[2], 16),
                    b: parseInt(t[3], 16)
                })
            }
            return e
        }, show: function (e) {
            var t = this, o = this.editorView.options.editorBtnMenuDirection || "down";
            window.conversationPage && (o = "up", this.$el.find("div.FontFamilyList,div.FontSizeList").css({
                height: 140,
                "overflow-y": "scroll",
                position: "relative",
                background: "white"
            }));
            var n = this.editorView.options;
            if (n && n.direction && (o = n.direction), n && n.customAttr)for (var s in n.customAttr) {
                var r = n.customAttr[s];
                this.$el.find(s).css({
                    height: r.height || "140px",
                    overflowY: "scroll",
                    position: "relative",
                    background: "white"
                })
            }
            return this.$el.css("z-index", 4e4), this.dockElement = e.dockElement, i.Dom.dockElement(e.dockElement, this.el, {direction: o}), M2012.UI.PopMenu.bindAutoHide({
                action: "click",
                element: this.el,
                stopEvent: !0,
                callback: function () {
                    t.hide()
                }
            }), a.prototype.show.apply(this, arguments)
        }, onChangeButtonClick: function () {
            this.hide();
            var e = top.$Msg.open({
                dialogTitle: "设置默认字体",
                url: "defaultFont.htm?sid=" + top.sid,
                width: 420,
                height: 211
            }), t = this, i = e.$el.find(".DL_ButtonBar"), a = i.children(":first").children();
            i.show(), a.not(":eq(1)").show(), a.click(function (e) {
                var i = o(e.currentTarget);
                if (o(i).hasClass("YesButton")) {
                    var a = top.defaultFontView.getFontObj() || {};
                    if (o.isEmptyObject(a))return;
                    var n = $T.format("{0};{1};{2};{3}", [a.size, a.family, a.color, a.lineHeight]);
                    top.M139.RichMail.API.call("user:setAttrs", {attrs: {fonts: n}}, function (e) {
                        e.responseData && "S_OK" == e.responseData.code ? (top.BH("compose_setfontsuc"), top.M139.UI.TipMessage.show("默认字体设置成功", {delay: 1e3}), t.editorView.editor.setDefaultFont({
                            size: a.size,
                            family: a.family,
                            color: a.color,
                            lineHeight: a.lineHeight
                        }), top.$App.trigger("userAttrChange", {
                            callback: function () {
                            }
                        })) : top.M139.UI.TipMessage.show("默认字体设置失败", {delay: 1e3})
                    })
                }
            })
        }
    })), M2012.UI.HTMLEditor.View.FaceFamilyMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click a.BtnChangeDefault": "onChangeButtonClick",
            "click .FontFamilyList a": "onSelect"
        },
        template: ['<div class="menuPop shadow font-type" style="left:600px;top:260px;">', '<div class="fonttype-list FontFamilyList" style="height:200px;overflow:auto;">', '<a rel="微软雅黑" style="font-family: 微软雅黑;" href="javascript:void(0)"><span class="cur"></span>微软雅黑</a>', '<a rel="宋体" style="font-family: 宋体;" href="javascript:void(0)"><span class="cur"></span>宋体</a>', '<a rel="黑体" style="font-family: 黑体;" href="javascript:void(0)"><span class="cur"></span>黑体</a>', '<a rel="楷体" style="font-family: 楷体;" href="javascript:void(0)"><span class="cur"></span>楷体</a>', '<a rel="隶书" style="font-family: 隶书;" href="javascript:void(0)"><span class="cur"></span>隶书</a>', '<a rel="幼圆" style="font-family: 幼圆;" href="javascript:void(0)"><span class="cur"></span>幼圆</a>', '<a rel="Arial" style="font-family: Arial;" href="javascript:void(0)"><span class="cur"></span>Arial</a>', '<a rel="Arial Narrow" style="font-family: Arial Narrow;" href="javascript:void(0)"><span class="cur"></span>Arial Narrow</a>', '<a rel="Arial Black" style="font-family: Arial Black;" href="javascript:void(0)"><span class="cur"></span>Arial Black</a>', '<a rel="Comic Sans MS" style="font-family: Comic Sans MS;" href="javascript:void(0)"><span class="cur"></span>Comic Sans MS</a>', '<a rel="Courier" style="font-family: Courier;" href="javascript:void(0)"><span class="cur"></span>Courier</a>', '<a rel="System" style="font-family: System;" href="javascript:void(0)"><span class="cur"></span>System</a>', '<a rel="Times New Roman" style="font-family: Times New Roman;" href="javascript:void(0)"><span class="cur"></span>Times New Roman</a>', '<a rel="Verdana" style="font-family: Verdana;" href="javascript:void(0)"><span class="cur"></span>Verdana</a>', "</div>", '<div class="font-type-btn" style="display:none;">', '<a href="javascript:void(0)" title="修改" class="font-a BtnChangeDefault"><i class="i_setn"></i></a>', '默认:<span id="defaultFamily"></span>', "</div>", "</div>"].join(""),
        onSelect: function (e) {
            var t = e.target.style.fontFamily;
            this.trigger("select", {value: t})
        },
        onChangeButtonClick: function () {
            return M2012.UI.HTMLEditor.View.Menu.prototype.onChangeButtonClick.apply(this, arguments)
        },
        hideDefaultFont: function () {
            this.$el.find(".font-type-btn").hide()
        },
        showDefaultFont: function () {
            this.$el.find(".font-type-btn").show()
        },
        onDefaultValueChange: function (e) {
            this.trigger("defaultvaluechange", {value: e})
        },
        show: function () {
            var e = this.editorView.editor.getSelectedStyle();
            this.$("a.on").removeClass("on"), e && e.fontFamily && (e.fontFamily = e.fontFamily.replace(/'/g, ""), this.$("a[rel='" + e.fontFamily + "']").addClass("on")), $B.is.ie && this.$el.html(this.$el.html());
            var t = M2012.UI.HTMLEditor.Model.Editor.getDefaultFont().family;
            return t ? this.editorView.isShowSetDefaultFont && (this.showDefaultFont(), this.$("#defaultFamily").text(t)) : this.hideDefaultFont(), M2012.UI.HTMLEditor.View.Menu.prototype.show.apply(this, arguments)
        }
    }), M2012.UI.HTMLEditor.View.FaceSizeMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click a.BtnChangeDefault": "onChangeButtonClick",
            "click .FontSizeList a": "onSelect"
        },
        template: ['<div class="menuPop shadow font-type" style="left:600px;top:660px;">', '<div class="fonttype-list FontSizeList">', '<a href="javascript:void(0)" rel="x-small"><span style="font-size:x-small;"><span class="cur"></span>六号</span></a>', '<a href="javascript:void(0)" rel="small"><span style="font-size:small;"><span class="cur"></span>五号</span></a>', '<a href="javascript:void(0)" rel="medium"><span style="font-size:medium;"><span class="cur"></span>四号</span></a>', '<a href="javascript:void(0)" rel="large"><span style="font-size:large;"><span class="cur"></span>三号</span></a>', '<a href="javascript:void(0)" rel="x-large"><span style="font-size:x-large;"><span class="cur"></span>二号</span></a>', '<a href="javascript:void(0)" rel="xx-large"><span style="font-size:xx-large;"><span class="cur"></span>一号</span></a>', "</div>", '<div class="font-type-btn" style="display:none;">', '<a href="javascript:void(0)" title="修改" class="font-a BtnChangeDefault"><i class="i_setn"></i></a>', '默认:<span id="defaultSize"></span>', "</div>", "</div>"].join(""),
        onSelect: function (e) {
            var t = i.Dom.findParent(e.target, "a") || e.target, o = {
                "xx-large": 6,
                "x-large": 5,
                large: 4,
                medium: 3,
                small: 2,
                "x-small": 1
            }, a = o[t.getAttribute("rel")];
            this.trigger("select", {value: a})
        },
        onChangeButtonClick: function () {
            return M2012.UI.HTMLEditor.View.Menu.prototype.onChangeButtonClick.apply(this, arguments)
        },
        onDefaultValueChange: function (e) {
            this.trigger("defaultvaluechange", {value: e})
        },
        getPxSize: function (e) {
            return /\d+$/.test(e) && (e = {
                    6: "xx-large",
                    5: "x-large",
                    4: "large",
                    3: "medium",
                    2: "small",
                    1: "x-small"
                }[e] || e), e
        },
        hideDefaultFont: function () {
            this.$el.find(".font-type-btn").hide()
        },
        showDefaultFont: function () {
            this.$el.find(".font-type-btn").show()
        },
        show: function () {
            var e, t = this.editorView.editor.getSelectedStyle();
            this.$("a.on").removeClass("on"), t && t.fontSize && (e = this.getPxSize(t.fontSize), this.$("a > span").each(function () {
                var a = i.Dom.getCurrentCSS(this, "font-size");
                if (isNaN(parseInt(a)) && -1 != this.innerText.indexOf(t.fontSizeText))o(this.parentNode).addClass("on"); else {
                    if (e == a)return o(this.parentNode).addClass("on"), !1;
                    if ("12px" == t.fontSize && parseInt(a) < 12)return o(this.parentNode).addClass("on"), !1
                }
            })), $B.is.ie && $B.getVersion() < 8 && this.$el.html(this.$el.html());
            var a = M2012.UI.HTMLEditor.Model.Editor.getDefaultFont().sizeText;
            return a ? this.editorView.isShowSetDefaultFont && (this.showDefaultFont(), this.$("#defaultSize").text(a)) : this.hideDefaultFont(), M2012.UI.HTMLEditor.View.Menu.prototype.show.apply(this, arguments)
        }
    }), M2012.UI.HTMLEditor.View.ColorMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {"click .ColorList a": "onSelect"},
        colors: ["0, 0, 0", "153, 51, 0", "51, 51, 0", "0, 51, 0", "0, 51, 102", "0, 0, 128", "51, 51, 153", "51, 51, 51", "128, 0, 0", "255, 102, 0", "128, 128, 0", "0, 128, 0", "0, 128, 128", "0, 0, 255", "102, 102, 153", "128, 128, 128", "255, 0, 0", "255, 153, 0", "153, 204, 0", "51, 153, 102", "51, 204, 204", "51, 102, 255", "128, 0, 128", "153, 153, 153", "255, 0, 255", "255, 204, 0", "255, 255, 0", "0, 255, 0", "0, 255, 255", "0, 204, 255", "153, 51, 102", "192, 192, 192", "255, 153, 204", "255, 204, 153", "255, 255, 153", "204, 255, 204", "204, 255, 255", "153, 204, 255", "204, 153, 255", "255, 255, 255"],
        insertPath: ".fontcolor-list",
        template: ['<div class="menuPop shadow font-colorpop" style="left:820px;top:860px;">', '<div class="fontcolor-list ColorList">', "</div>", "</div>"].join(""),
        onSelect: function (e) {
            var t = (e.target.firstChild || e.target).style.backgroundColor;
            this.trigger("select", {value: t})
        },
        render: function () {
            for (var e = [], t = this.colors, i = '<a href="javascript:void(0)" rel="#color#"><span style="background-color:#color#"></span></a>', o = 0; o < t.length; o++) {
                var a = t[o];
                e.push(i.replace(/\#color\#/g, "rgb(" + a + ")"))
            }
            return this.$(this.insertPath).html(e.join("")), M2012.UI.HTMLEditor.View.Menu.prototype.render.apply(this, arguments)
        },
        onChangeButtonClick: function () {
        },
        onDefaultValueChange: function (e) {
            this.trigger("defaultvaluechange", {value: e})
        },
        show: function () {
            var e, t = this.editorView.editor.getSelectedStyle();
            if (this.$("a.on").removeClass("on"), t && (e = this.options && this.options.isBackgroundColor ? t.backgroundColor : t.color)) {
                var i = this.getRGBColor(e);
                this.$("a[rel='" + i + "']").addClass("on")
            }
            return M2012.UI.HTMLEditor.View.Menu.prototype.show.apply(this, arguments)
        }
    }), M2012.UI.HTMLEditor.View.TableMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click td": "onSelect",
            "mouseover td > div": "onItemMouseOver"
        },
        Rows: 10,
        Cells: 10,
        insertPath: "table",
        template: ['<div class="menuPop shadow tabpop" style="left:620px;top:860px;">', "<p>请选择表格大小<label></label></p>", "<table></table>", "</div>"].join(""),
        onSelect: function (e) {
            this.trigger("select", {value: this.getSelectedValue(e)})
        },
        getSelectedValue: function (e) {
            var t = e.target.firstChild || e.target;
            return {rows: 1 * t.getAttribute("rowIndex") + 1, cells: 1 * t.getAttribute("cellIndex") + 1}
        },
        onItemMouseOver: function (e) {
            var t = this.getSelectedValue(e);
            this.$("label").text(" " + t.rows + "行" + t.cells + "列"), this.$("td").each(function () {
                this.cellIndex < t.cells && this.parentNode.rowIndex < t.rows ? this.className = "on" : this.className = ""
            })
        },
        render: function () {
            for (var e = [], t = this.Rows, i = this.Cells, e = [], o = 0; t > o; o++) {
                e.push("<tr>");
                for (var a = 0; i > a; a++)e.push("<td><div rowIndex='" + o + "' cellIndex='" + a + "'></div></td>");
                e.push("</tr>")
            }
            return this.$(this.insertPath).html(e.join("")), M2012.UI.HTMLEditor.View.Menu.prototype.render.apply(this, arguments)
        }
    }), M2012.UI.HTMLEditor.View.RowSpaceMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click a.BtnChangeDefault": "onChangeButtonClick",
            "click .FontLineHeightList a": "onSelect"
        },
        Rows: 10,
        Cells: 10,
        template: ['<div class="menuPop shadow font-type" style="left:820px;top:1060px;">', '<div class="fonttype-list FontLineHeightList">', '<a href="javascript:;" rel="1.2"><span class="cur"></span>单倍</a>', '<a href="javascript:;" rel="1.5"><span class="cur"></span>1.5倍</a>', '<a href="javascript:;" rel="2"><span class="cur"></span>2倍</a>', '<a href="javascript:;" rel="2.5"><span class="cur"></span>2.5倍</a>', "</div>", '<div class="font-type-btn" style="display:none;">', '<a href="javascript:void(0)" title="修改" class="font-a BtnChangeDefault"><i class="i_setn"></i></a>', '默认:<span id="defaultLineHeight"></span>', "</div>", "</div>"].join(""),
        onSelect: function (e) {
            this.trigger("select", {value: this.getSelectedValue(e)})
        },
        getSelectedValue: function (e) {
            var t = e.target.getAttribute("rel");
            return 1 * t
        },
        onDefaultValueChange: function (e) {
            this.trigger("defaultvaluechange", {value: e})
        },
        onChangeButtonClick: function () {
            return M2012.UI.HTMLEditor.View.Menu.prototype.onChangeButtonClick.apply(this, arguments)
        },
        hideDefaultFont: function () {
            this.$el.find(".font-type-btn").hide()
        },
        showDefaultFont: function () {
            this.$el.find(".font-type-btn").show()
        },
        show: function () {
            var e = this.editorView.editor.getSelectedStyle();
            if (this.$("a.on").removeClass("on"), e && e.lineHeight) {
                var t = ["1.2", "1.5", "2", "2.5"];
                -1 == o.inArray(e.lineHeight + "", t) && (e.lineHeight = 1.2), ($B.is.ie || $B.is.ie11) && (e.lineHeight = e.lh), this.$("a[rel='" + e.lineHeight + "']").addClass("on")
            }
            $B.is.ie && this.$el.html(this.$el.html());
            var i = M2012.UI.HTMLEditor.Model.Editor.getDefaultFont().lineHeightText;
            return i ? this.editorView.isShowSetDefaultFont && (this.showDefaultFont(), this.$("#defaultLineHeight").text(i)) : this.hideDefaultFont(), M2012.UI.HTMLEditor.View.Menu.prototype.show.apply(this, arguments)
        }
    }), M2012.UI.HTMLEditor.View.LinkMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click a.BtnYes": "onSelect",
            click: "onContainerClick",
            "click a.i_u_close": "hide",
            "click a.BtnTestLink": "onTestLinkClick",
            "click a.CloseButton": "onCloseButtonClick"
        },
        template: ['<div class="shadow linkpop" style="position: absolute;padding-bottom: 0">', '<a href="javascript:;" title="关闭" class="i_u_close CloseButton"></a>', '<ul class="form">', '<li class="formLine">', '<label class="label">要显示的文字：</label>', '<div class="element"><input type="text" class="iText inShadow TextBoxText" value="">', "</div>", "</li>", '<li class="formLine">', '<label class="label">链接到：</label>', '<div class="element"><input type="text" class="iText inShadow TextBoxUrl" value="http://">', "</div>", "</li>", '<li class="formLine">', '<label class="label"></label>', '<div class="element"><a class="BtnTestLink" href="javascript:;" style="font-family:\'宋体\'">检测此链接&gt;&gt;</a>', '<span class="lbl_linkTip" style="color:red;display:none">  链接格式非法</span>', "</div>", "</li>", "</ul>", '<p class="ta_r"><a href="javascript:void(0)" class="btnNormal vm BtnYes"><span>确 定</span></a></p>', "</div>"].join(""),
        onContainerClick: function (e) {
            i.Event.stopEvent(e)
        },
        onTestLinkClick: function (e) {
            var t = this.getSelectedValue(e), i = t.url.trim();
            "" == i ? this.$(".TextBoxUrl").focus() : this.testLink(i) && window.open(i)
        },
        testLink: function (e) {
            return i.Text.Url.isUrl(e) ? (this.$(".lbl_linkTip").hide(), !0) : (this.$(".lbl_linkTip").show(), !1)
        },
        onCloseButtonClick: function () {
            this.hide()
        },
        render: function () {
            this.textInput = this.$(".TextBoxText"), this.urlInput = this.$(".TextBoxUrl");
            var e = this;
            return i.Timing.watchInputChange(this.urlInput[0], function () {
                e.onUrlChange()
            }), M2012.UI.HTMLEditor.View.Menu.prototype.render.apply(this, arguments)
        },
        onUrlChange: function () {
            var e = this.textInput.val(), t = this.urlInput.val();
            "" != e && 0 != t.indexOf(e) || "http://" == t && "https://" == t || this.textInput.val(t)
        },
        show: function () {
            var e = this;
            return this.textInput.val(this.editorView.editor.getSelectedText()), this.urlInput.val("http://"), setTimeout(function () {
                e.urlInput.focus(), e.urlInput.select()
            }, 10), M2012.UI.HTMLEditor.View.Menu.prototype.show.apply(this, arguments)
        },
        onSelect: function (e) {
            var t = this.getSelectedValue(e);
            this.testLink(t.url) && ("" == t.text.trim() && (t.text = value.url), this.hide(), this.trigger("select", {
                text: t.text,
                url: t.url
            }))
        },
        getSelectedValue: function (e) {
            return {text: this.textInput.val(), url: this.urlInput.val()}
        }
    }), M2012.UI.HTMLEditor.View.ImageMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click a.LocalFile": "onLocalSelect",
            "click a.InternetFile": "onInternetClick",
            "click a.NetDiskFile": "onNetDiskClick",
            "click a.MobileFile": "onMobileClick",
            click: "onContainerClick"
        },
        initialize: function (e) {
            var t = this.uploadForm = M2012.UI.HTMLEditor.UploadForm;
            return t && (this.template = i.Text.Utils.format(this.template, {fieldName: t.fieldName})), this.menus = {}, this.buttons = {}, M2012.UI.HTMLEditor.View.Menu.prototype.initialize.apply(this, arguments)
        },
        template: ['<div class="menuPop shadow picpop" style="left:120px;top:660px;width:133px;">', "<ul>", '<li><a class="LocalFile" href="javascript:;">本地图片', '<div class="FloatingDiv" style="position: absolute;top:0;left:0;width: 90px;height: 30px;overflow: hidden;z-index: 1024;padding: 0px;">', '<form target="_hideFrame_" enctype="multipart/form-data" method="post">', '<input title="" style="font-size:20px;position:absolute;right:0px;" type="file" name="{fieldName}" id="{fieldName}" />', "</form>", "</div>", "</a></li>", '<li><a bh="compose_editor_image_net" class="InternetFile" href="javascript:;">网络图片</a></li>', location.href.indexOf("rd139cm") > 0 || top.$App.isReadSessionMail() ? "" : '<li><a class="MobileFile" href="javascript:;">从手机上传图片<i class="i_phoneS ml_5"></i></a></li>', "</ul></div>"].join(""),
        onContainerClick: function (e) {
        },
        onLocalSelect: function () {
        },
        onMobileClick: function () {
            top.$App.trigger("showMobileUploadDlg")
        },
        onInternetClick: function () {
            var e = this;
            this.internetMenu || (this.internetMenu = new M2012.UI.HTMLEditor.View.InternetImageMenu, this.internetMenu.editorView = this.editorView, this.internetMenu.on("select", function (t) {
                e.onSelect(t.url)
            }), this.internetMenu.render()), this.internetMenu.show({dockElement: o("#ED_InsertImage")[0]}), this.hide()
        },
        onNetDiskClick: function () {
        },
        render: function () {
            this.initEvents();
            var e = this.$("form");
            return this.uploadForm ? (this.$(".FloatingDiv").css("opacity", "0"), this.uploadForm.getUploadUrl(function (t) {
                e.attr("action", t)
            })) : this.$("form").hide(), M2012.UI.HTMLEditor.View.Menu.prototype.render.apply(this, arguments)
        },
        initEvents: function () {
            var e = this;
            this.$("input").change(function () {
                if (this.value) {
                    var t = i.Text.Url.getFileExtName(this.value);
                    if (-1 != o.inArray(t, ["jpg", "jpeg", "gif", "bmp", "png"])) {
                        window.conversationPage && window.PageMid && top.$App.trigger("uploadImgStart_" + window.PageMid, {});
                        var a = this.form, n = e.getHideFrame();
                        try {
                            a.submit(), a.reset()
                        } catch (s) {
                            n.attr("src", top.getRootPath() + "/html/blank.html").load(function () {
                                n.unbind("load", arguments.callee), a.submit(), a.reset()
                            })
                        }
                    } else {
                        $Msg.alert("只允许插入jpg,jpeg,gif,bmp,png格式的图片", {icon: "warn"});
                        try {
                        } catch (s) {
                        }
                    }
                }
            }).click(function () {
                BH("compose_editor_image_local")
            })
        },
        onUploadFrameLoad: function (e) {
            try {
                var t = this.uploadForm.getResponseUrl(e);
                t && this.onSelect(t)
            } catch (i) {
            }
        },
        getHideFrame: function () {
            var e = this, t = this.$("#_hideFrame_");
            return 0 == t.length && (t = o('<iframe name="_hideFrame_" style="display:none"></iframe>').appendTo(n.body).load(function () {
                e.onUploadFrameLoad(this)
            })), t
        },
        onSelect: function (e) {
            this.hide(), this.trigger("select", {url: e})
        }
    }), M2012.UI.HTMLEditor.View.InternetImageMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        events: {
            "click a.YesButton": "onYesClick",
            "click .CloseButton": "onCloseClick"
        },
        initialize: function (e) {
            return this.options = e || {}, M2012.UI.HTMLEditor.View.Menu.prototype.initialize.apply(this, arguments)
        },
        template: ['<div class="tips delmailTips netpictips">', '<a class="delmailTipsClose CloseButton" href="javascript:;"><i class="i_u_close"></i></a>', '<div class="tips-text">', '<div class="netpictipsdiv">', "<p>插入网络照片</p>", "<p>", '<input type="text" class="iText" value="http://">', "</p>", '<p class="ErrorTip" style="color:red;display:none">图片地址格式错误</p>', '<p style="color:#666">右键点击所选图片，进入“属性”对话框，即可获取图片地址</p>', "</div>", '<div class="delmailTipsBtn"><a href="javascript:void(0)" class="btnNormal vm YesButton"><span>确 定</span></a></div>', "</div>", '<div class="tipsTop diamond covtop"></div>', "</div>"].join(""),
        onCloseClick: function (e) {
            this.hide()
        },
        onYesClick: function (e) {
            var t = this.$("input:text").val().trim();
            return i.Text.Url.isUrl(t) ? (this.$(".ErrorTip").hide(), this.hide(), this.trigger("select", {url: t}), !1) : void this.$(".ErrorTip").show()
        },
        show: function () {
            var e = this.$("input").val("http://");
            return setTimeout(function () {
                e.select()
            }, 0), M2012.UI.HTMLEditor.View.Menu.prototype.show.apply(this, arguments)
        }
    }), M2012.UI.HTMLEditor.View.FaceMenu = M2012.UI.HTMLEditor.View.Menu.extend({
        initialize: function (t) {
            this.options = t || {}, this.basePath = this.options.basePath || s.basePath, this.faces = this.options.faces || s.faces;
            var i = e(this.options && this.options.template || this.template);
            return this.setElement(i), this.model = new Backbone.Model, M2012.UI.HTMLEditor.View.Menu.prototype.initialize.apply(this, arguments)
        },
        events: {
            "click .HeaderItem": "onHeaderClick",
            "click .ThumbItem": "onThumbClick",
            "click .PrevPage": "onPrevPageClick",
            "click .NextPage": "onNextPageClick",
            "click .CloseButton": "onCloseClick"
        },
        headerTemplate: '<li class="HeaderItem" data-index="{index}"><a href="javascript:;"><span>{name}</span></a></li>',
        thumbTemplate: ['<div class="ab"><a class="ThumbItem" href="javascript:;" ', 'index="{index}" ', 'folder="{folder}"', 'style="height:{height}px;width:{width}px;', "background-position: -{x}px -{y}px;", "background-image: url({thumb});", 'background-repeat: no-repeat;margin:{margin}px;border:0;" ', 'data-url="{image}" ', 'title="{alt}"></a></div>'].join(""),
        template: ['<div class="tips delmailTips smilepop" style="top:1600px;left:40px;">', '<div class="tips-text">', '<div class="tab smilepopTab">', '<div class="tabTitle">', '<ul class="HeaderContainer">', "</ul>", "</div>", '<div class="tabMain">', '<div class="tabContent show">', '<div style="width:449px;height:225px" class="smilelist clearfix ContentContainer">', "</div>", '<div class="pagediv clearfix" style="display:none">', '<div class="pageDrop fr page-top mr_10">', '<span class="pagenum LabelPage"></span>', '<a class="PrevPage" href="javascript:;">上一页</a>', '<a class="NextPage" href="javascript:;">下一页</a>', "</div>", "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join(""),
        render: function () {
            return this.renderHeaders(), this.initEvents(), this.setHeader(0), M2012.UI.HTMLEditor.View.Menu.prototype.render.apply(this, arguments)
        },
        renderHeaders: function () {
            for (var e = this.faces, t = [], o = 0; o < e.length; o++)t.push(i.Text.Utils.format(this.headerTemplate, {
                index: o,
                name: e[o].name
            }));
            this.$(".HeaderContainer").html(t.join(""))
        },
        renderContent: function () {
            for (var e = this.model.get("pageindex"), o = this.model.get("header"), a = this.faces[o], n = ['<div style="display:none;left:12px;top: 140px;" class="smilelistView">', '<img class="PreviewImage" width="64" height="64" />', "</div>"], s = (e - 1) * a.pageSize, r = Math.min(a.count, s + a.pageSize), l = s; r > l; l++) {
                var d = this.basePath + "/" + a.folder + "/" + a.thumb, c = this.basePath + "/" + a.folder + "/" + l + "." + a.fileType;
                n.push(i.Text.Utils.format(this.thumbTemplate, {
                    x: l * a.thumbOffset,
                    y: 0,
                    height: a.height,
                    width: a.width,
                    folder: a.folder,
                    thumb: d,
                    image: c,
                    alt: a.desc[l],
                    index: l,
                    margin: t.isUndefined(a.margin) ? 5 : a.margin
                }))
            }
            this.$(".ContentContainer").html(n.join(""))
        },
        initEvents: function () {
            var e = this;
            this.model.on("change:header", function (t, i) {
                e.faces[i];
                t.set("pageindex", null, !0), t.set("pageindex", 1), e.focusHeader()
            }).on("change:pageindex", function (t, i) {
                e.renderContent(), e.updatePageBar()
            }), this.$(".ContentContainer").mouseover(function (t) {
                "A" == t.target.tagName && e.onPreviewShow(t, t.target.getAttribute("index"))
            }).mouseout(function (t) {
                "A" == t.target.tagName && e.onPreviewHide(t)
            })
        },
        setHeader: function (e) {
            this.model.set("header", e)
        },
        onHeaderClick: function (e) {
            var t = i.Dom.findParent(e.target, "li"), o = t.getAttribute("data-index");
            this.setHeader(o)
        },
        onCloseClick: function (e) {
            this.hide()
        },
        onPreviewShow: function (e, t) {
            var i = e.target.getAttribute("data-url"), o = this.$("img.PreviewImage").attr("src", i), a = o.parent().show();
            t % 14 > 6 ? a.css("left", 365) : a.css("left", 12)
        },
        onPreviewHide: function (e) {
            this.$("img.PreviewImage").parent().hide()
        },
        focusHeader: function () {
            var e = this.model.get("header");
            this.$(".HeaderItem.on").removeClass("on"), this.$(".HeaderItem").eq(e).addClass("on")
        },
        updatePageBar: function () {
            var e = this.model.get("header"), t = this.model.get("pageindex"), i = this.faces[e], o = Math.ceil(i.count / i.pageSize), a = t + "/" + o;
            this.$(".LabelPage").text(a), o > 1 ? this.$(".PrevPage,.NextPage").show() : this.$(".PrevPage,.NextPage").hide()
        },
        onThumbClick: function (e) {
            var t = e.target.getAttribute("data-url"), i = e.target.getAttribute("folder");
            return -1 == t.indexOf("http") && (t = "http://" + location.host + t), this.onSelect({
                url: t,
                folder: i
            }), !1
        },
        getPageCount: function () {
            var e = this.model.get("header"), t = this.faces[e], i = Math.ceil(t.count / t.pageSize);
            return i
        },
        onPrevPageClick: function () {
            var e = this.model.get("pageindex");
            e > 1 && this.model.set("pageindex", e - 1)
        },
        onNextPageClick: function () {
            var e = this.model.get("pageindex");
            e < this.getPageCount() && this.model.set("pageindex", e + 1)
        },
        onSelect: function (e) {
            this.hide(), this.trigger("select", {url: e.url, folder: e.folder})
        }
    });
    var s = {
        basePath: top.getRootPath() + "/images/face",
        faces: [{
            name: "小和玛",
            folder: "hema",
            thumb: "hema.png",
            count: 13,
            pageSize: 84,
            height: 30,
            thumbOffset: 32,
            width: 30,
            margin: 1,
            fileType: "png",
            desc: ["筒子们辛苦了", "厉害了", "亲一个", "我热爱我的工作", "咬我呀", "一起摇摆", "哼", "么么哒", "棒棒哒", "蟹蟹老板", "新年好", "突然送花", "生日快乐"]
        }, {
            name: "生活",
            folder: "life",
            thumb: "thumb.png",
            count: 49,
            pageSize: 84,
            height: 20,
            thumbOffset: 30,
            width: 20,
            fileType: "gif",
            desc: ["鄙视", "踹地板", "得意", "发呆", "奋斗", "睡觉", "委屈", "无聊", "想家", "许愿", "中彩票", "抓狂", "逛街", "开心", "可爱", "恋爱", "伤心", "郁闷", "被K", "迟到了", "加班", "盼发工资", "求美女", "失恋了", "遇见帅哥", "月光了", "健身", "开车兜风", "旅游", "约会", "爱护森林", "春节", "低碳生活", "光棍节", "国庆", "节约用水", "绿色出行", "七夕", "圣诞节", "万圣节", "中秋", "大哭", "愤怒", "开心", "流泪", "窃喜", "伤心", "爽", "郁闷"]
        }, {
            name: "豆豆",
            folder: "doudou",
            thumb: "thumb.png",
            count: 19,
            pageSize: 84,
            height: 20,
            thumbOffset: 30,
            width: 20,
            fileType: "gif",
            desc: ["假笑", "开心", "坏笑", "晴转阴", "愁", "窘", "微笑", "傻笑", "抛媚眼", "装酷", "哭了", "爱慕", "调皮", "见钱眼开", "耍帅", "哈哈笑", "鼠眉鼠眼", "打盹", "生病了"]
        }, {
            name: "飞信",
            folder: "fetion",
            thumb: "thumb.png",
            count: 52,
            pageSize: 84,
            height: 20,
            thumbOffset: 30,
            width: 20,
            fileType: "gif",
            desc: ["天使", "生气", "咬牙切齿", "困惑", "酷", "大哭", "尴尬", "思考", "惊呆", "拳头", "好主意", "偷笑", "惊讶", "睡着了", "悲伤", "鄙视", "微笑", "生病了", "大笑", "沉思", "眨眼", "失望", "天真", "担心", "困", "吓到", "饮料", "生日蛋糕", "猫脸", "闹钟", "下雨", "咖啡", "计算机", "狗脸", "红心", "心碎", "女生抱抱", "男生抱抱", "香吻", "灯泡", "酒杯", "手机", "月亮", "音乐", "礼物", "彩虹", "玫瑰", "凋谢", "星星", "太阳", "雨伞", "蜗牛"]
        }, {
            name: "YOYO",
            folder: "yoyo",
            thumb: "thumb.png",
            count: 24,
            pageSize: 84,
            height: 20,
            thumbOffset: 30,
            width: 20,
            fileType: "gif",
            desc: ["撒娇", "惊奇", "眨眼", "无精打采", "乖乖", "俏皮", "淘气", "卡哇伊", "跳舞", "流汗", "打哈欠", "兴奋", "发呆", "帅气", "爱美", "大哭", "悟空", "色咪咪", "西瓜太郎", "兔女郎", "藐视", "疑问", "同情", "牛郎"]
        }, {
            name: "信封脸",
            folder: "mailer",
            thumb: "thumb.png",
            count: 18,
            pageSize: 84,
            height: 20,
            thumbOffset: 30,
            width: 20,
            fileType: "gif",
            desc: ["害羞", "色", "可爱", "鄙视", "哭", "闭嘴", "冷汗", "抓狂", "衰", "晕", "憨笑", "大骂", "鼓掌", "飞吻", "馋", "偷笑", "可怜", "流泪"]
        }]
    };
    M2012.UI.HTMLEditor.View.Menu.setWindow = function (t) {
        o = e = t.jQuery, n = t.document
    }
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = window.document;
    i.namespace("M2012.UI.HTMLEditor.View", {}), i.namespace("M2012.UI.HTMLEditor.View.Editor", a.extend({
        initialize: function (e) {
            if (this.options = e || {}, e.buttons_Common && !this.options.toolBarPath_Common)throw"缺少参数:options.toolBarPath_Common";
            if (e.buttons_More && !this.options.toolBarPath_More)throw"缺少参数:options.toolBarPath_More";
            if (e.buttons_Additional && !this.options.toolBarPath_additional)throw"缺少参数:options.toolBarPath_additional";
            e.menus && t.isFunction(e.menus) && (e.menus = e.menus());
            var i = n.createElement("div");
            return i.innerHTML = $T.format(e.template, {blankUrl: this.options.blankUrl}), this.setElement(i.firstChild), this.menus = {}, this.buttons = {}, this.additional = {}, this.isShowSetDefaultFont = e.isShowSetDefaultFont, a.prototype.initialize.apply(this, arguments)
        }, render: function () {
            var e = this;
            this.editor = new M2012.UI.HTMLEditor.Model.Editor({frame: this.$("iframe")[0]}), this.editor.on("focus", function (t) {
                e.trigger("focus")
            }), this.editor.on("blur", function () {
                e.trigger("blur")
            }), this.toolBar_Common = this.$(this.options.toolBarPath_Common), (this.options.isSessionMenu || this.options.isUserDefineBtnContainer) && (this.toolBar_Common = o(this.options.toolBarPath_Common)), this.toolBar_More = this.$(this.options.toolBarPath_More), this.toolBar_Additional = this.$(this.options.toolBarPath_additional);
            var t = this.options.buttons_Common;
            if (t)for (var i = 0; i < t.length; i++) {
                var n = t[i];
                this.registerButton(n, !0)
            }
            var s = this.options.buttons_More;
            if (s)for (var i = 0; i < s.length; i++) {
                var n = s[i];
                this.registerButton(n)
            }
            var r = this.options.menus;
            if (r)for (var i = 0; i < r.length; i++) {
                var l = r[i];
                this.registerMenu(l)
            }
            return this.options.showMoreButton && this.$(this.options.showMoreButton).click(function () {
                e.onShowMoreClick()
            }), this.initEvents(), this.isHideBtn(!0), a.prototype.render.apply(this, arguments)
        }, isHideBtn: function (e) {
            e ? this.$el.find("#ED_InsertImage").hide() : this.$el.find("#ED_InsertImage").show()
        }, registerButton: function (t, i) {
            var o = this, a = i ? this.toolBar_Common : this.toolBar_More, n = a[0];
            if (t.isLine)$D.appendHTML(n, t.template); else {
                $D.appendHTML(n, t.template);
                var s = e(n.lastChild).click(function (e) {
                    o.onButtonClick(this, e, t)
                }).bind("dblclick", function (e) {
                    o.onButtonDblClick(this, e, t)
                });
                t.queryStateCallback && this.editor.on("bookmarkchange", function (e) {
                    t.queryStateCallback({selectedStyle: e.selectedStyle, editor: this, element: s})
                }), t.init && t.init({editor: this.editor, element: s})
            }
            this.buttons[t.name] = t
        }, registerBottom: function (e) {
            var t = this, i = this.toolBar_Additional;
            $D.appendHTML(i, e.template), o(i).click(function (i) {
                t.trigger("buttonclick", {event: i, command: e.command, target: i.target || i.srcElement, options: ""})
            }), this.additional[e.name] = e
        }, registerMenu: function (e) {
            this.menus[e.name] = e
        }, initEvents: function () {
            var e = this;
            this.editor.on("afterexeccommand", function (t) {
                "ForeColor" == t.command ? (e.$el.find("#ED_SetFontColor span").css("background-color", t.param), e.$el.find("#ED_SetFontColor span").length || o("#evocationEidtBar").find("#ED_SetFontColor span").css("background-color", t.param)) : "BackColor" == t.command && e.$el.find("#ED_SetBackgroundColor span").css("background-color", t.param)
            }), this.options.maxLength && this.editor.on("keydown", function () {
                e.testInputLength()
            }), this.options.placeHolder && this.editor.on("ready", function () {
                e.initPlaceHolder(), e.editor.on("keyup", function () {
                    e.showPlaceHolder()
                })
            }), e.$(e.options.operateFullScreen).click(function (t) {
                e.trigger("fullScreenOperate", t.srcElement || t.target)
            })
        }, initPlaceHolder: function () {
            var e = this, t = this.$el.find(".PlaceHolder");
            t.html(this.options.placeHolder), t.click(function () {
                e.editor.focus()
            }), this.showPlaceHolder(), this.editor.on("setcontent", function () {
                e.showPlaceHolder()
            })
        }, showPlaceHolder: function () {
            var e = this.$el.find(".PlaceHolder"), t = o(this.editor.editorDocument.body).text();
            "" == t ? e.show() : e.hide()
        }, showErrorTips: function (e) {
            clearTimeout(this.errorTipHideTimer);
            var t = this.$el.find(".ErrorTipContent").html(e).parent();
            t.show(), this.errorTipHideTimer = setTimeout(function () {
                t.hide()
            }, 3e3)
        }, testInputLength: function () {
            var e = this;
            clearTimeout(this.testInputTimer), this.testInputTimer = setTimeout(function () {
                var t = e.editor.getHtmlContent(), o = i.Text.Utils.getBytes(t);
                o > e.options.maxLength && (e.showErrorTips(e.options.maxLengthErrorTip), i.Dom.flashElement(e.el))
            }, 500)
        }, showMenu: function (e) {
            var t = this;
            this.editor.editorWindow.focus();
            var i = this.menus[e.name];
            o.isFunction(i.view) && (i.view = i.view(), i.view.on("select", function (e) {
                i.callback.call(t, t.editor, e)
            })), i.view.editorView = this, i.view.render().show(e), this.trigger("menushow", {name: name})
        }, onButtonDblClick: function (e, t, i) {
            i.dblClick && i.dblClick(this.editor)
        }, onButtonClick: function (e, t, a) {
            var n = i.Dom.findParent(t.target, "span") || t.target;
            if ("ED_SetFontColor" == n.id)return void this.editor.setForeColor(o(n).find("span").css("background-color"));
            if ("ED_SetBackgroundColor" == n.id)return void this.editor.setBackgroundColor(o(n).find("span").css("background-color"));
            a.menu && this.showMenu({name: a.menu, dockElement: e}), a.command && this.editor[a.command]();
            var s = i.Dom.findParent(t.target, "a"), r = "";
            s.id && (r = s.id.replace("ED_", "")), this.trigger("buttonclick", {
                event: t,
                command: r,
                target: e,
                options: a
            })
        }, onShowMoreClick: function () {
            if (void 0 === this.flashLoaded && "undefined" != typeof supportUploadType) {
                var e = n.getElementById("flashplayer"), t = !(!supportUploadType.isSupportFlashUpload || !e);
                t && 0 == this.$("#avflashupload").length && (e = e.cloneNode(!0), e.setAttribute("id", "avflashupload"), this.$(".EditorBarMore").append(o("<div></div>").css({
                    position: "absolute",
                    left: o("#ED_Video").position().left + 1 + "px",
                    top: "29px",
                    width: "45px",
                    height: "23px",
                    opacity: 0
                }).append(e))), this.flashLoaded = t
            }
            this.toggleToolBar()
        }, toggleToolBar: function () {
            var e = "", t = this.$(".eidt-body"), i = !1;
            this.$(".eidt-body").hasClass("eidt-body-full") ? (e = "更多操作", t.removeClass("eidt-body-full"), t.css("height", "+=33"), i = !0, this.$(".eidt-bar").find("span.defaultLine").removeClass("lineTop")) : (e = "隐藏更多操作", t.addClass("eidt-body-full"), t.css("height", "-=33"), i = !1, this.$(".eidt-bar").find("span.defaultLine").addClass("lineTop")), this.$("a[bh='compose_editor_more']").attr("title", e), this.trigger("listenShowMore", i)
        }
    }));
    var s = {
        toolBarPath_Common: "div.EditorBarCommon",
        toolBarPath_More: "div.EditorBarMore",
        showMoreButton: "a.ShowMoreMenu",
        toolBarPath_additional: "div.edit-additional",
        operateFullScreen: "a#operateFullScreen",
        toolBarPath_Session: "div.tips-covfont .tips-text",
        buttons_Common: [{
            name: "FontFamily",
            menu: "FontFamily_Menu",
            template: ['<a bh="compose_editor_fontfamily" title="设置字体" class="editFont" id="ED_FontFamily" href="javascript:;">', "<span>字体</span>", '<i class="i_triangle_d"></i>', "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle
            }
        }, {
            name: "FontSize",
            menu: "FontSize_Menu",
            template: ['<a bh="compose_editor_fontsize" title="设置字号" class="editFontsize" id="ED_FontSize" href="javascript:;">', "<span>字号</span>", '<i class="i_triangle_d"></i>', "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle
            }
        }, {
            name: "Bold",
            command: "setBold",
            template: ['<a bh="compose_editor_bold" title="文字加粗" href="javascript:;" class="edit-btn" id="ED_Bold">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-b">粗体</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isBold ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "Italic",
            command: "setItalic",
            template: ['<a bh="compose_editor_italic" title="斜体字" href="javascript:;" class="edit-btn" id="ED_Italic">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-i">斜体</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isItalic ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "UnderLine",
            command: "setUnderline",
            template: ['<a bh="compose_editor_underline" title="下划线" href="javascript:;" class="edit-btn" id="ED_UnderLine">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-ud">下划线</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isUnderLine ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "FontColor",
            menu: "FontColor_Menu",
            template: ['<a bh="compose_editor_color" title="文字颜色" hideFocus="1" href="javascript:;" class="edit-btn editor-btn-select p_relative " id="ED_FontColor">', '<span class="edit-btn-rc" id="ED_SetFontColor">', '<b class="ico-edit ico-edit-color">文字颜色</b><span class="ico-edit-color-span" style="background-color:rgb(0,0,0);"></span>', "</span>", '<span bh="compose_editor_color_select" class="ico-edit-color-xl"></span>', "</a>"].join("")
        }, {
            name: "BackgroundColor",
            menu: "BackgroundColor_Menu",
            template: ['<a bh="compose_editor_bgcolor" title="背景颜色" hideFocus="1" href="javascript:;" class="edit-btn editor-btn-select p_relative " id="ED_BackgroundColor">', '<span class="edit-btn-rc" id="ED_SetBackgroundColor">', '<b class="ico-edit ico-edit-color ico-editbg-color">背景颜色</b>', '<span class="ico-edit-font" style="background-color: #000000;"></span>', "</span>", '<span bh="compose_editor_bgcolor_select" class="ico-edit-color-xl"></span>', "</a>"].join("")
        }, {isLine: 1, template: '<span class="defaultLine line"></span>'}, {
            name: "AlignLeft",
            command: "setAlignLeft",
            template: ['<a bh="compose_editor_align_left" title="左对齐" href="javascript:;" class="edit-btn" id="ED_AlignLeft">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-alil">左对齐</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isAlignLeft ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "AlignCenter",
            command: "setAlignCenter",
            template: ['<a bh="compose_editor_align_middle" title="居中对齐" href="javascript:;" class="edit-btn" id="ED_AlignCenter">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-aliz" id="ED_AlignCenter">居中对齐</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isAlignCenter ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "AlignRight",
            command: "setAlignRight",
            template: ['<a bh="compose_editor_align_right" title="右对齐" href="javascript:;" class="edit-btn" id="ED_AlignRight">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-alir">右对齐</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isAlignRight ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "UnorderedList",
            command: "insertUnorderedList",
            template: ['<a bh="compose_editor_ul" title="插入项目编号" href="javascript:;" class="edit-btn" id="ED_UnorderedList">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-xl">项目编号</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isUnorderedList ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "OrderedList",
            command: "insertOrderedList",
            template: ['<a bh="compose_editor_ol" title="插入数字编号" href="javascript:;" class="edit-btn" id="ED_OrderedList">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-xl2">数字编号</b>', "</span>", "</a>"].join(""),
            queryStateCallback: function (e) {
                e.selectedStyle && (e.selectedStyle.isOrderedList ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on"))
            }
        }, {
            name: "Table",
            menu: "Table_Menu",
            template: ['<a bh="compose_editor_table" title="插入表格" href="javascript:;" class="edit-btn" id="ED_Table">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-tab">表格</b>', "</span>", "</a>"].join("")
        }, {isLine: 1, template: '<span class="defaultLine line"></span>'}, {
            name: "Undo",
            command: "undo",
            template: ['<a bh="compose_editor_undo" title="撤消" href="javascript:;" class="edit-btn" id="ED_Undo">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-cx">撤消</b>', "</span>", "</a>"].join("")
        }, {
            name: "FormatPrinter",
            command: "setFormatPrinter",
            dblClick: function (e) {
                e.setFormatPrinterOn(1)
            },
            template: ['<a bh="compose_editor_printer" title="格式刷，使用方法：\n1. 选中邮件正文的内容\n2. 单击格式刷，将复制选中内容的格式\n3. 再选中正文的其它内容，这些内容会自动应用上一步复制的格式\n\n提示：步骤2中若双击格式刷，可连续执行步骤3" href="javascript:;" class="edit-btn" id="ED_FormatPrinter">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-bush">格式刷</b>', "</span>", "</a>"].join(""),
            init: function (e) {
                e.editor.on("change:printerMode", function () {
                    "off" != e.editor.get("printerMode") ? e.element.addClass("edit-btn-on") : e.element.removeClass("edit-btn-on")
                })
            }
        }, {isLine: 1, template: '<span class="defaultLine line"></span>'}, {
            name: "Face",
            menu: "Face_Menu",
            template: ['<a bh="compose_editor_face" title="插入表情" href="javascript:;" class="edit-btn" id="ED_Face">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-smile">表情</b>', "</span>", "</a>"].join("")
        }, {
            name: "ScreenShot",
            template: ['<a bh="compose_editor_screenshot" title="截屏" href="javascript:;" class="edit-btn" id="ED_ScreenShot">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-clip">截屏</b>', "</span>", "</a>"].join("")
        }, {
            name: "Link",
            menu: "Link_Menu",
            template: ['<a bh="compose_editor_link" title="插入链接" href="javascript:;" class="edit-btn" id="ED_Link">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-link">链接</b>', "</span>", "</a>"].join("")
        }, {
            name: "WritePapers",
            template: ['<a title="写信模板" href="javascript:;" class="edit-btn" id="ED_WritePapers">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-paper">写信模板</b>', "</span>", "</a>"].join("")
        }, {
            name: "InsertImage",
            menu: "InsertImage_Menu",
            template: ['<a bh="compose_editor_image" title="插入图片" href="javascript:;" class="edit-btn" id="ED_InsertImage">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-img">图片</b>', "</span>", "</a>"].join("")
        }],
        buttons_More: [{
            name: "strikeThrough",
            command: "strikeThrough",
            template: ['<a bh="compose_strike" title="删除线" href="javascript:;" class="edit-btn" id="ED_Delete">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-delLine">删除线</b>', "</span>", "</a>"].join("")
        }, {
            name: "RemoveFormat",
            command: "removeFormat",
            template: ['<a bh="compose_remove_format" title="清除格式" href="javascript:;" class="edit-btn" id="ED_RemoveFormat">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit ico-edit-ra">清除格式</b>', "</span>", "</a>"].join("")
        }, {isLine: 1, template: '<span class="line lineBottom" style="margin-left:220px;"></span>'}, {
            name: "Outdent",
            command: "setOutdent",
            template: ['<a bh="compose_editor_indent" title="减少缩进" href="javascript:;" class="edit-btn" id="ED_Outdent">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-jdsj">减少缩进</b>', "</span>", "</a>"].join("")
        }, {
            name: "Indent",
            command: "setIndent",
            template: ['<a bh="compose_editor_outdent" title="增加缩进" href="javascript:;" class="edit-btn" id="ED_Indent">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-addsj">增加缩进</b>', "</span>", "</a>"].join("")
        }, {
            name: "RowSpace",
            menu: "RowSpace_Menu",
            template: ['<a bh="compose_editor_lineheight" title="设置行距" href="javascript:;" class="edit-btn" id="ED_RowSpace">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-sxali">行距</b>', "</span>", "</a>"].join("")
        }, {isLine: 1, template: '<span class="line lineBottom" style="margin-left:76px;"></span>'}, {
            name: "Redo",
            command: "redo",
            template: ['<a bh="compose_editor_redo" title="恢复撤销的操作" href="javascript:;" class="edit-btn" id="ED_Redo">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-hf">恢复</b>', "</span>", "</a>"].join("")
        }, {
            name: "SelectAll",
            command: "selectAll",
            template: ['<a bh="compose_select_all" title="全选" href="javascript:;" class="edit-btn" id="ED_SelectAll">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-allSeled">全选</b>', "</span>", "</a>"].join("")
        }, {isLine: 1, template: '<span class="line lineBottom"></span>'}, {
            name: "Voice",
            template: ['<a bh="compose_editor_voice" title="语音识别" href="javascript:;" class="edit-btn" id="ED_Voice">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-voice">语音</b>', "</span>", "</a>"].join("")
        }, {
            name: "InsertVideo",
            command: "uploadInsertVideo",
            template: ['<a bh="compose_insert_video" title="将mp4/flv格式的视频文件插入到邮件正文" href="javascript:;" class="edit-btn" id="ED_Video">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-picture">视频</b>', "</span>", "</a>"].join("")
        }, {
            name: "InsertAudio",
            command: "uploadInsertAudio",
            template: ['<a bh="compose_insert_audio" title="将mp3格式的音频文件插入邮件正文" href="javascript:;" class="edit-btn" id="ED_Audio">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-music">音乐</b>', "</span>", "</a>"].join("")
        }, {
            name: "BeforehandSet",
            template: ['<a bh="compose_editor_preSet" title="预设模板" href="javascript:;" class="edit-btn" id="ED_BeforehandSet">', '<span class="edit-btn-rc">', '<b class="ico-edit ico-edit-preset">预设</b>', "</span>", "</a>"].join("")
        }],
        menus: function () {
            return [{
                name: "FontFamily_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.FaceFamilyMenu
                }, callback: function (e, t) {
                    e.setFontFamily(t.value)
                }
            }, {
                name: "FontSize_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.FaceSizeMenu
                }, callback: function (e, t) {
                    e.setFontSize(t.value)
                }
            }, {
                name: "FontColor_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.ColorMenu
                }, callback: function (e, t) {
                    e.setForeColor(t.value)
                }
            }, {
                name: "BackgroundColor_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.ColorMenu({isBackgroundColor: !0})
                }, callback: function (e, t) {
                    e.setBackgroundColor(t.value)
                }
            }, {
                name: "Table_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.TableMenu
                }, callback: function (e, t) {
                    e.insertTable(t.value)
                }
            }, {
                name: "RowSpace_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.RowSpaceMenu
                }, callback: function (e, t) {
                    e.setRowSpace(t.value)
                }
            }, {
                name: "Link_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.LinkMenu
                }, callback: function (e, t) {
                    if (e.editorWindow.focus(), "" == t.text.trim())$Msg.alert("请输入链接文本", {icon: "fail"}); else if ($B.is.ie || $B.is.firefox || $B.is.ie11)e.insertHTML(i.Text.Utils.format('<a href="{url}">{text}</a>', {
                        url: t.url,
                        text: i.Text.Html.encode(t.text)
                    })); else if (e.setLink(t.url), e.getSelectedText() != t.text)try {
                        var a = e.getSelectedElement();
                        o(a).text(t.text)
                    } catch (t) {
                    }
                }
            }, {
                name: "Face_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.FaceMenu
                }, callback: function (e, i) {
                    var o = ["hema"], a = [top.$User.isHemaThemeUser()], n = t.indexOf(o, i.folder);
                    return -1 == n || a[n] ? void e.insertImage(i.url) : (this.trigger("needPayFace", {folderName: i.folder}), !1)
                }
            }, {
                name: "InsertImage_Menu", view: function () {
                    return new M2012.UI.HTMLEditor.View.ImageMenu
                }, callback: function (e, t) {
                    e.insertImage(t.url)
                }
            }]
        },
        template: ['<div class="editorWrap">', '<div class="tips write-tips ErrorTip" style="left: 0px; top: -32px; display:none;">', '<div class="tips-text ErrorTipContent" style=""></div>', '<div class="tipsBottom diamond" style=""></div>', "</div>", '<div style="position:absolute;width:100%;">', '<div class="PlaceHolder" unselectable="on" style="position: absolute;left: 10px;top: 35px;color:silver;z-index:50;font-size:16px;display:none;width:100%;"></div>', "</div>", '<div class="eidt-body"><!-- eidt-body-full 展开时加上 -->', '<div class="eidt-bar">', '<a bh="compose_editor_more" hidefocus="1" href="javascript:;" title="更多操作" class="pushon ShowMoreMenu"></a>', '<span class="defaultLine line" style="position:absolute;right:24px;top:0;"></span>', '<a bh="compose_toolbar_fullScreenOperate" hidefocus="1" href="javascript:;" title="全屏写信" class="reduce" id="operateFullScreen"></a>', '<div class="EditorBarCommon eidt-bar-li"></div>', '<div class="EditorBarMore eidt-bar-li"><span class="lineBottom" style="position:absolute;right:24px;top:34px;"></span></div>', "</div>", '<div class="eidt-content"><iframe hidefocus="1" src="{blankUrl}" frameborder="0" style="height:100%;border:0;width:100%;"></iframe></div>', '<div class="edit-additional" style="position: absolute;height:24px;bottom:8px;display:none;">', "</div>", '<a hidefocus="1" style="display:none" href="javascript:void(0)" class="stationery"></a>', "</div>", "</div>"].join("")
    };
    i.namespace("M2012.UI.HTMLEditor", {}), e.extend(M2012.UI.HTMLEditor, {
        create: function (e) {
            var t = s.buttons_Common, i = s.buttons_More;
            s.buttons_Additional;
            if (o(e.container)[0].ownerDocument != n && this.setWindow(window.parent), M2012.UI.HTMLEditor.UploadForm = e.uploadForm, e.hideButton)o(e.hideButton).each(function (e, o) {
                var a, n;
                for (a = 0; a < t.length; a++)n = t[a].name, n != o && n != o + "_Menu" || (t.splice(a, 1), a--);
                for (a = 0; a < i.length; a++)n = i[a].name, n != o && n != o + "_Menu" || (i.splice(a, 1), a--)
            }); else if (e.showButton) {
                var a = [];
                o(e.showButton).each(function (e, i) {
                    for (var o = 0; o < t.length; o++) {
                        var n = t[o].name;
                        n != i && n != i + "_Menu" || a.push(t[o])
                    }
                }), t = a, e.showMoreButton || (s.buttons_More = null)
            } else if (e.combineButton) {
                var a = [], r = t.concat(s.buttons_More);
                o(e.combineButton).each(function (e, t) {
                    for (var i = 0; i < r.length; i++) {
                        var o = r[i].name;
                        o != t && o != t + "_Menu" || a.push(r[i])
                    }
                }), t = a, s.toolBarPath_Common = s.toolBarPath_Session, s.buttons_More = null
            } else e.showAdditional || (s.buttons_Additional = null);
            e.userDefinedToolBarContainer && (s.toolBarPath_Common = e.userDefinedToolBarContainer);
            var l = new M2012.UI.HTMLEditor.View.Editor({
                template: s.template,
                buttons_Common: t,
                toolBarPath_Common: s.toolBarPath_Common,
                buttons_More: s.buttons_More,
                toolBarPath_More: s.toolBarPath_More,
                buttons_Additional: s.buttons_Additional,
                toolBarPath_additional: s.toolBarPath_additional,
                menus: s.menus,
                operateFullScreen: s.operateFullScreen,
                showMoreButton: s.showMoreButton,
                blankUrl: e.blankUrl,
                maxLength: e.maxLength,
                maxLengthErrorTip: e.maxLengthErrorTip || "超过最大输入限制：" + e.maxLength + "字节",
                placeHolder: e.placeHolder,
                isSessionMenu: !!e.combineButton,
                isUserDefineBtnContainer: !!e.userDefinedToolBarContainer,
                editorBtnMenuDirection: e.editorBtnMenuDirection,
                isShowSetDefaultFont: e.isShowSetDefaultFont || !1,
                direction: e.direction,
                customAttr: e.customAttr
            });
            return l.render(), o(e.container).html(l.$el), e.combineButton && o("a.ShowMoreMenu").hide(), e.userDefinedToolBarContainer && l.$el.find("div.eidt-bar").remove(), l
        }, setWindow: function (t) {
            e = t.jQuery, n = t.document, M2012.UI.HTMLEditor.View.Menu.setWindow(t)
        }
    })
}(jQuery, _, M139), function (e, t, i) {
    var o = i.Model.ModelBase, a = "M2012.UI.Widget.Contacts.Model";
    i.namespace(a, o.extend({
        initialize: function (e) {
            return this.options = e || {}, top.$App ? this.contactsModel = window.top.$App.getModel("contacts") : this.contactsModel = M2012.Contacts.getModel(), this.filter = e.filter, this.colate = e.colate, e.selectMode && (this.selectedList = []), o.prototype.initialize.apply(this, arguments)
        }, defaults: function () {
            return {currentGroup: "", currentCompanyGroup: []}
        }, name: a, dataReady: function (e) {
            var t = this;
            this.contactsModel.requireData(function () {
                t.contactsData = t.contactsModel.get("data"), e()
            })
        }, addSelectedItem: function (e) {
            var i = t.isUndefined(this.filter) ? e.serialId : e.addr;
            return this.isSelectedItem(i) ? !1 : (this.selectedList.push(e), !0)
        }, getGroupList: function () {
            return this.contactsModel.getGroupList()
        }, getReadGroupId: function () {
            for (var e = this.getGroupList(), t = 0; t < e.length; t++)if ("读信联系人" == e[t].name)return e[t].id
        }, getGroupMembers: function (e, t) {
            t = t || {};
            var i = this.contactsModel.getGroupMembers(e, {filter: this.filter || this.colate, colate: this.colate});
            if (t.getSendText)for (var o = 0, a = i.length; a > o; o++)"email" == this.filter ? i[o] = i[o].getEmailSendText() : "mobile" == this.filter ? i[o] = i[o].getMobileSendText() : "fax" == this.filter && (i[o] = i[o].getFaxSendText());
            return i
        }, getLastestContacts: function (e) {
            var t, i = e || this.contactsData.lastestContacts, o = [];
            if ("fax" == this.filter)return o;
            for (var a = "email" == this.filter ? "E" : "M", n = 0, s = i.length; s > n; n++) {
                var r = i[n], l = r.AddrContent;
                if (/\d{5,}/.test(r.SerialId) ? t = this.contactsData.contactsMap[r.SerialId] : "E" == r.AddrType ? t = this.contactsModel.getContactsByEmail(r.AddrContent)[0] : "M" == r.AddrType && (t = this.contactsModel.getContactsByMobile(r.AddrContent)[0]), t && ("email" === this.filter && "E" !== r.AddrType ? (l = t.getFirstEmail(), l || (t = !1)) : "mobile" === this.filter && "M" !== r.AddrType && (l = t.getFirstMobile(), l || (t = !1))), t)o.push({
                    addr: l,
                    name: t.name,
                    SerialId: t.SerialId
                }); else if (r.AddrType == a) {
                    var d = this.createLastContactsId();
                    this.lastContactsMap[d] = {
                        addr: r.AddrContent,
                        name: r.AddrName,
                        SerialId: d
                    }, o.push(this.lastContactsMap[d])
                }
            }
            return o
        }, createLastContactsId: function () {
            var e = parseInt(1e8 * Math.random());
            return -e
        }, lastContactsMap: {}, getCloseContacts: function () {
            var e = this.contactsData.closeContacts;
            return this.getLastestContacts(e)
        }, getUngroupContacts: function (e) {
            for (var t = this.contactsData.contactsMap, i = this.contactsData.noGroup, o = [], a = 0, n = i.length; n > a; a++) {
                var s = t[i[a]];
                this.colate && s && s.getFirstEmail().indexOf(this.colate) > -1 ? o.push(s) : !this.colate && s && o.push(s)
            }
            return o
        }, getSearchContacts: function () {
            var e = this.contactsModel.search(this.get("keyword"), {contacts: this.getContacts()});
            return e
        }, getContacts: function () {
            var e = this.get("contacts");
            if (!e) {
                var e = this.contactsData.contacts;
                (this.filter || this.colate) && (e = this.contactsModel.filterContacts(e, {
                    filter: this.filter || this.colate,
                    colate: this.colate
                })), this.set("contacts", e)
            }
            return e
        }, getVIPContacts: function () {
            return this.contactsModel.getGroupMembers(this.contactsModel.getVIPGroupId(), {filter: this.filter})
        }, getVIPGroupId: function () {
            return this.contactsModel.getVIPGroupId()
        }, getContactsById: function (e, t) {
            if (t = t || {}, e > 0) {
                var i = this.contactsModel.getContactsById(e);
                if (i) {
                    var o = "", a = i.getFirstMobile(), n = i.getFirstFax(), s = i.getFirstEmail();
                    switch (this.filter) {
                        case"mobile":
                            o = t.batch ? i.mobiles : a;
                            break;
                        case"fax":
                            o = t.batch ? i.faxes : n;
                            break;
                        case"email":
                        default:
                            o = t.batch ? i.emails : s || a
                    }
                    return {addr: o, name: i.name, SerialId: i.SerialId}
                }
                return null
            }
            return this.lastContactsMap[e]
        }, isSelectedItem: function (e) {
            for (var t = this.selectedList, i = 0, o = t.length; o > i; i++)if (t[i].addr == e || t[i].SerialId == e)return !0;
            return !1
        }, isSelectedNew: function (e) {
            e = e || {};
            var i = this.selectedList;
            return t.some(i, function (i) {
                var o = t.isUndefined(e.serialId) || t.isUndefined(i.serialId) ? !0 : i.serialId == e.serialId, a = t.isUndefined(e.addr) || t.isUndefined(i.addr) ? !0 : i.addr == e.addr;
                return o && a
            })
        }, getSendText: function (e, t) {
            return this.contactsModel.getSendText(e, t)
        }, clearLastContacts: function (e) {
            var t = this, i = {type: e ? "close" : "last"}, o = {
                warn_delclose: "确认清空所有紧密联系人记录？",
                warn_dellast: "确认清空所有最近联系人记录？"
            };
            top.$Msg.confirm(o["warn_del" + i.type], function () {
                top.addBehavior("19_9561_11清空最近/紧密", e ? "2" : "1"), top.Contacts.EmptyLastContactsInfo(i, function (e) {
                    e.success ? t.trigger("contactshistoryupdate") : top.$Msg.alert(e.msg)
                })
            }, {icon: "warn"})
        }, clearCloseContacts: function () {
            this.clearLastContacts(!0)
        }, reloadContactsData: function () {
            this.contactsModel.loadMainData()
        }, getCompanyList: function (e) {
            e = e || {}, top.M2012.Contacts.API.checkUserNumber({
                data: {orgID: ""}, success: function (t) {
                    if (t && "S_OK" === t.code) {
                        var i = t.data;
                        i && i["var"] && i["var"].guangDongTopOrgList && e.success && e.success(i["var"].guangDongTopOrgList)
                    }
                }
            })
        }, writePageGetAllSubList: function (e) {
            e = e || {}, top.M2012.Contacts.API.writePageGetAllSubList({
                data: e.data || {}, success: function (t) {
                    e.success && e.success(t)
                }
            })
        }, getOrgTopNMerber: function (e) {
            top.M2012.Contacts.API.getOrgTopNMerber({
                data: e.data || {}, success: function (t) {
                    e.success && e.success(t)
                }
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = "M2012.UI.Compose.Widget.Contacts.View", s = {
        All: -1,
        Ungroup: -2,
        Lastest: -3,
        Close: -4,
        Search: -5
    };
    i.namespace(n, a.extend({
        initialize: function (e) {
            var t = this;
            this.options = e || {}, this.filter = e.filter, this.selectMode = e.selectMode, this.comefrom = e.comefrom, this.showCountElFlag = "compose_addrinput" == e.comefrom ? "none" : "", this.model = new M2012.UI.Widget.Contacts.Model({
                filter: this.filter,
                colate: e.colate,
                selectMode: this.selectMode
            });
            var i = $D.getHTMLElement(e.container);
            i.innerHTML = this.template, i.style.width = "191px", this.setElement(i), this.model.dataReady(function () {
                t.render(), clearTimeout(o)
            });
            var o = setTimeout(function () {
                t.showRetryDiv()
            }, 3e3);
            return this.$groupContainer = this.$(".GroupList"), this.$searchContainer = this.$(".searchEnd"), a.prototype.initialize.apply(this, arguments)
        },
        name: n,
        retryCount: 0,
        MemberFirstSize: 10,
        MemberPageSize: 500,
        LoadCompanyContacts: !1,
        CompanyMemberFirstSize: 20,
        TipMessageTimer: null,
        TipMessageLimit: !1,
        template: ['<div class="AddrEmptyTip ta_c loadingerror" style="height:280px;padding:80px 0 0 0">', '<div class="LoadingImage" style="padding-top:50px;"><img src="', top.getRootPath(), '/images/global/searchloading.gif" /></div>', '<div class="bodyerror RetryDiv" style="display:none">', '<img src="/m2015/images/global/smile.png" width="73" height="72">', "<p>没加载出来，再试一次吧。</p>", '<a class="btnTb BtnRetry" href="javascript:"><span class="p_relative">重新加载</span></a>', "</div>", "</div>", '<div class="ContentDiv tabContent" style="display:none;">', '<div class="searchEnd" style="display:none;overflow-y:hidden;height:100%;padding-top:11px;">', '<ul class="contactList">', '<li data-groupId="-5"><a hidefocus="1" class="GroupButton contactList_a" href="javascript:;" title="显示或隐藏成员列表"><i class="i_plusj"></i><span>搜索结果</span><var></var></a>', '<ul class="pb_5">', "</ul>", "</li>", "</ul>", "</div>", '<div class="SendToMySelf contactList_a" style="padding-top:11px;line-height:14px;padding-bottom:4px;"><a bh="compose_addressbook_sendself" style="color:#666;" hidefocus="1" href="javascript:;">发给自己</a></div>', '<ul class="contactList GroupList" style="overflow-y:visible;padding-bottom:5px;position: static;">', "</ul>", '<div class="contactListNew">', '<a bh="compose_addressbook_createcontacts" hidefocus="1" class="AddNewContacts" href="javascript:;">新建联系人</a>', "</div>", "</div>"].join(""),
        GroupItemTemplate: ['<li data-groupId="{groupId}" class="{className}">', '<a title="{clearGroupTitle}" href="javascript:;" style="display:{showClearGroup}" class="i_r_yq2 i_dels ClearGroup"></a>', '<a bh="compose_addressbook_addgroupclick" hidefocus="1" style="display:{showAddGroup}" title="添加整组" href="javascript:;" class="i_r_yq2 AddGroup"></a>', '<a bh="{behavior}" hidefocus="1" class="GroupButton contactList_a" href="javascript:;" title="显示或隐藏成员列表">', '<i class="{iconClass}"></i>', "<span>{groupName}</span>", '<var style="display:{showCountEl}">({count})</var>', "</a>", '<ul class="pb_5" style="display:none"></ul>', "</li>"].join(""),
        MemberItemTemplateOld: '<li style="display:{display};" class="ContactsItem" data-addr="{addrData}" data-name="{contactsName}" data-contactsId="{contactsId}" data-isCompany="{isCompany}"><a hidefocus="1" href="javascript:;" title="{addrTitle}">{contactsName}</a><i class="icons i-enterprise" style="margin-left:6px;display:{display_i};"></i></li>',
        MemberItemTemplate: ['<li style="display:{display}" class="ContactsItem" data-addr="{addrData}" data-contactsId="{contactsId}">', '<a href="javascript:;" title="{contactsNameTitle}" style="max-width:130px;display: block;">{contactsName}', '<i class="icons i-enterprise ml_5" style="display:{display_i};"></i>', "</a>", '<a href="javascript:;" class="mr_12 memberItemRight" style="float: right;">', '<i class="i_2trid"></i></i>', "</a>", "</li>"].join(""),
        EmailTemplate: ['<ul class="ml_10 emailList" data-contactsId="<%- SerialId %>" data-name="<%- name  %>">', '<% var tmp = _.isArray(addr) ? addr : [addr || ""] %>', "<% _.each(tmp,function(value){ %>", '<li data-addr="<%- value %>" title="<%- value %>"><a href="javascript:;" class="ac"><%- value %></a></li>', "<% }) %>", "</ul>"].join(""),
        SearchTpl: ['<li style="display:{display}" class="ContactsItem" data-addr="{addrData}" data-contactsId="{contactsId}" data-isCompany="{isCompany}" data-name="{contactsNameTitle}">', '<a href="javascript:;" title="{contactsNameTitle}" class="width200">', '<em class="write_r_search">{contactsName}</em>', '<i class="icons i-enterprise ml_5" style="display:{display_i};"></i>', "</a>", '<a href="javascript:;" class="ac" title="{orgName}" style="margin-left: 10px;">{orgName}</a>', '<a href="javascript:;" class="ac" title="{addrTitle}" style="margin-left: 10px;">{addr}</a>', "</li>"].join(""),
        groupFixedTpl: ['<div style="line-height:25px;color:#444;vertical-align:top;border-top:none;overflow:hidden;_zoom:1;display:none;background:#F7F7F7;position: absolute;top: 45px;left: 0px;z-index: 1000;width:240px;" class="groupFixed">', '<a hidefocus="1" class="GroupButton contactList_a" href="javascript:;" style="background: transparent;">', '<i class="i_triangle_d" style="margin-right:8px;"></i>', "<span></span>", "<var></var>", "</a>", "</div>"].join(""),
        GroupContainerPath: "ul.GroupList",
        events: {
            "click .GroupButton": "onGroupButtonClick",
            "click .LoadMoreMember": "onLoadMoreMemberClick",
            "click .ContactsItem": "onContactsItemClick",
            "click .memberItemRight": "onMemberItemRightClick",
            "click .emailList li": "onEmailItemClick",
            "click .searchContactBtn": "onClearSearchInput",
            "click .AddGroup": "onAddGroupClick",
            "click .SendToMySelf": "onSendToMySelfClick",
            "click .AddNewContacts": "onAddNewContactsClick",
            "click .BtnCloseSearchEmptyTip": "hideGroupEmptyTip",
            "click .BtnRetry": "onRetryClick",
            "click .ClearGroup": "onClearGroupClick"
        },
        render: function () {
            var e = this.options;
            return this.clearSearchButton = this.$("a.searchContactBtn"), this.$(".AddrEmptyTip").hide(), this.renderGroupListView(), this.initEvent(), e.showSelfAddr === !1 && this.$(".SendToMySelf").hide(), e.showCreateAddr === !1 && this.$(".contactListNew").hide(), this.$("div.ContentDiv").show(), this.render = function () {
                return this
            }, a.prototype.render.apply(this, arguments)
        },
        renderGroupListView: function () {
            var e = !1, o = this.model.getGroupList(), a = [], n = this.GroupItemTemplate, r = "i_triangle_r";
            this.options.showLastAndCloseContacts !== !1 && (a.push(i.Text.format(n, {
                groupId: s.Lastest,
                groupName: "最近联系人",
                clearGroupTitle: "清空最近联系人记录",
                showCountEl: this.showCountElFlag,
                count: this.model.getLastestContacts().length,
                behavior: "compose_addressbook_lastcontacts",
                showAddGroup: "none",
                showClearGroup: 0 == this.model.getLastestContacts().length ? "none" : "",
                iconClass: r
            })), this.options.showCloseContacts !== !1 && a.push(i.Text.format(n, {
                groupId: s.Close,
                groupName: "紧密联系人",
                clearGroupTitle: "清空紧密联系人记录",
                showCountEl: this.showCountElFlag,
                count: this.model.getCloseContacts().length,
                behavior: "compose_addressbook_closecontacts",
                showAddGroup: "none",
                showClearGroup: "",
                iconClass: r
            }))), a.push(i.Text.format(n, {
                groupId: s.All,
                groupName: "所有联系人",
                showCountEl: this.showCountElFlag,
                count: this.model.getContacts().length,
                behavior: "compose_addressbook_allcontacts",
                showAddGroup: "none",
                showClearGroup: "none",
                className: "oLi-bt",
                iconClass: r
            })), this.options.showVIPGroup !== !1 && a.push(i.Text.format(n, {
                groupId: this.model.getVIPGroupId(),
                groupName: "VIP联系人",
                showCountEl: this.showCountElFlag,
                count: this.model.getGroupMembers(this.model.getVIPGroupId()).length,
                behavior: "compose_addressbook_vip",
                showAddGroup: this.options.showAddGroup === !1 ? "none" : "",
                showClearGroup: "none",
                iconClass: r
            }));
            var l = null, d = null;
            classMates = null, readMailContacts = null;
            for (var c = 0, p = o.length; p > c; c++) {
                var u = o[c], h = this.model.getGroupMembers(u.id).length, m = this.options.showAddGroup === !1 ? "none" : "", f = null;
                if (!t.isEmpty(u.name)) {
                    var g = "读信联系人" == i.Text.Html.encode(u.name) ? "compose_addressbook_readcontacts" : "compose_addressbook_customcontacts";
                    if (f = i.Text.format(n, {
                            groupId: u.id,
                            groupName: i.Text.Html.encode(i.Text.Utils.getTextOverFlow(u.name, 6, !0)),
                            showCountEl: this.showCountElFlag,
                            count: h,
                            behavior: g,
                            showAddGroup: m,
                            showClearGroup: "none",
                            iconClass: r
                        }), e) {
                        if ("同学" == i.Text.Html.encode(u.name)) {
                            classMates = f;
                            continue
                        }
                        if ("亲人" == i.Text.Html.encode(u.name)) {
                            l = f;
                            continue
                        }
                        if ("朋友" == i.Text.Html.encode(u.name)) {
                            d = f;
                            continue
                        }
                    }
                    "读信联系人" != i.Text.Html.encode(u.name) ? a.push(f) : readMailContacts = f
                }
            }
            e && (a.push(classMates), a.push(l), a.push(d)), a.push(readMailContacts), a = a.join(""), this.$(this.GroupContainerPath)[0].innerHTML = a, this.options.showSelfAddr === !1 && this.$(".SendToMySelf").hide()
        },
        initEvent: function () {
            var e = this, t = o("#searchContactsBtn"), a = "b-hover";
            this.model.on("change:currentGroup", function (e, t) {
                var i = e.previous("currentGroup");
                null != i && this.hideGroupMember(i), t && this.showGroupMember(t)
            }, this), this.model.on("contactshistoryupdate", function () {
                e.updateView()
            }), t.click(function () {
                o(this).removeAttr("readonly"), e.inputValue = this.value.trim(), !o(this).parent("").hasClass(a) && o(this).parent("").addClass(a)
            }).blur(function () {
                this.value.trim() != e.inputValue && "" != this.value.trim() && top.BH("enterprice-search-input-key"), o(this).parent("").hasClass(a) && o(this).parent("").removeClass(a)
            });
            var n = t[0];
            if (i.Timing.watchInputChange(n, function () {
                    e.onSearchInputChange(n.value.trim())
                }), this.selectMode && (this.on("additem", function (t, i) {
                    var o = [];
                    if (i = i || {}, t.isGroup ? o = t.value : (t.SerialId = t.serialId, o = [t]), e.filter)for (var a = 0; a < o.length; a++)if (o[a].addr && o[a].addr.length)if (i.isEmailList) {
                        var n = e.utilGetEmailElement(o[a].addr);
                        n.siblings("li").not(":hidden").length || (n.closest(".emailList").hide(), n.closest(".emailList").prev("li").hide().find(".i_2trid").removeClass("i_2tridd")), n.hide()
                    } else {
                        var n = e.utilGetMemberElement(o[a].addr);
                        n.hide(), n.find(".i_2trid").removeClass("i_2tridd"), n.next("ul.emailList").hide()
                    } else e.utilGetMemberElementById(o[a].serialId).hide(); else for (var a = 0; a < o.length; a++)e.utilGetMemberElementById(o[a].serialId).hide()
                }), this.on("removeitem", function (t) {
                    if (e.filter)if (t && t.addr.length) {
                        var i = e.utilGetMemberElementById(t.SerialId);
                        i.show().next(".emailList").children('li[data-addr="' + t.addr + '"]').show()
                    } else e.utilGetMemberElementById(t.serialId).hide(); else e.utilGetMemberElementById(t.serialId).show()
                })), this.on("print", function () {
                    this.model.set("currentGroup", s.Lastest)
                }), "sms" == this.options.comefrom) {
                var r = this.$(".tabContent");
                r.parent().append(this.groupFixedTpl), r.off("scroll").on("scroll", function () {
                    e.toggleGroupFixed()
                })
            }
            this.$(".searchEnd").off("scroll").on("scroll", function () {
                e.toggleGroupFixed()
            }), o(".BtnCloseSearchEmptyTip").click(function () {
                e.hideGroupEmptyTip()
            }), o(".searchContactBtn").click(function () {
                e.onClearSearchInput()
            })
        },
        toggleGroupFixed: function () {
            var e = this.model.get("currentGroup");
            e && this.isInClient(e) ? this.showGroupFixed() : this.hideGroupFixed()
        },
        showGroupEmptyTip: function () {
            o(".SearchEmptyTip").show()
        },
        hideGroupEmptyTip: function () {
            o(".SearchEmptyTip").hide()
        },
        showRetryDiv: function () {
            var e = this;
            if (e.$(".LoadingImage").hide(), e.$(".RetryDiv").show(), e.retryCount > 1) {
                var i = -1, a = -1, n = -1, s = "hasdata", r = e.model.contactsModel || {};
                if (r.get) {
                    var l = r.get("data");
                    t.isUndefined(l) ? s = "nodata" : (i = l.TotalRecord, o.isArray(l.Contacts) && (a = l.Contacts.length), o.isArray(l.Groups) && (n = l.Groups.length))
                }
                e.logger.error($TextUtils.format("addrlist retry fail|filter={0}|mode={1}|retry={2}|data={3}|isLoading={4}|total={5}|contacts={6}|groups={7}", [e.filter, e.selectMode, e.retryCount, s, r.isLoading, i, a, n]))
            }
        },
        renderSearchMemberView: function (e, a, n) {
            function r(e) {
                if (l.LoadCompanyContacts) {
                    var t = o("#searchContactsBtn").val().trim();
                    if (e && l.CurrentTime != e || "" == t)return !1;
                    clearTimeout(l.TipMessageTimer), top.M139.UI.TipMessage.hide(), d.html("")
                }
                if (0 == x)d.html(I).show(); else {
                    d.find(".no_search_result").hide(), n || u.sort(function (e, t) {
                        return e = e.quanPin || "", t = t.quanPin || "", e.localeCompare(t)
                    });
                    for (var a = d.find("li[data-addr]").length, s = 1 == c ? l.MemberPageSize : l.CompanyMemberFirstSize, r = a, h = Math.min(a + s, x); h > r; r++) {
                        var m = u[r] || {}, f = m.addr, g = i.Text.Html.encode(f), v = m.isCompany, y = !(l.selectMode && l.model.isSelectedItem(f)), C = m.orgName || "";
                        w.push(i.Text.format(b, {
                            contactsId: v ? "" : m.contactsId,
                            contactsName: l.formatStr(m.name, p),
                            contactsNameTitle: i.Text.Html.encode(m.name),
                            addr: l.formatStr(f, p),
                            addrData: f,
                            addrTitle: g,
                            display: v ? "" : y ? "" : "none",
                            display_i: v ? "" : "none",
                            isCompany: v,
                            orgName: C
                        }))
                    }
                    x > a + s && w.push('<li class="LoadMoreMember" data-groupId="-5"><a hidefocus="1" href="javascript:;">更多<span class="f_SimSun">↓</span></a></li>'), w = w.join(""), d.append(w), d.attr("init", 1), l.contacts_list = u
                }
            }

            var l = this;
            if (e != s.Search)return !1;
            var d = this.utilGetMemberContainer(e), c = d.attr("init") || 0;
            if ("init" != a || 1 != d.attr("init")) {
                var p = this.model.get("keyword");
                if (n)var u = n; else {
                    for (var u = this.model.getSearchContacts(), h = [], m = u.length, f = 0; m > f; f++) {
                        var g = u[f], v = "";
                        switch (this.filter) {
                            case"email":
                                v = g.emails.concat();
                                break;
                            case"mobile":
                                v = g.mobiles.concat();
                                break;
                            case"fax":
                                v = g.faxes.concat();
                                break;
                            default:
                                v = g.SerialId
                        }
                        v = t.isArray(v) ? v : [v];
                        var y = t.filter(v, function (e) {
                            return e.indexOf(p) > -1
                        });
                        y.length || (y = v), o.each(y, function (e, t) {
                            var i = (!(l.selectMode && l.model.isSelectedNew({
                                addr: t,
                                serialId: g.SerialId
                            })), {
                                contactsId: g.SerialId,
                                name: g.name,
                                jianPin: g.Jianpin,
                                quanPin: g.Quanpin,
                                addr: t
                            });
                            h.push(i)
                        })
                    }
                    u = h
                }
                var w = [], b = this.SearchTpl, x = u.length, I = '<p class="no_search_result" style="text-align:center;margin-top:45px;font-size:16px;color:#666;">无相关联系人</p>';
                this.LoadCompanyContacts && top.hasCompanyContacts ? (this.TipMessageTimer = setTimeout(function () {
                    l.TipMessageLimit ? clearTimeout(l.TipMessageTimer) : top.M139.UI.TipMessage.show("正在加载中...")
                }, 1e3), this.CurrentTime = (new Date).getTime(), top.M2012.Contacts.API.fuzzyQuery({
                    data: {
                        Keyword: l.model.get("keyword"),
                        PageIndex: "1",
                        MaxRecInPage: "1000",
                        CurrentTime: l.CurrentTime.toString()
                    }, success: function (e) {
                        if (e && e.data && e.data.list) {
                            var i = e.data.total, o = e.data.currentTime, a = 1e3;
                            if (x += i > a ? a : i, i > 0) {
                                for (var n = e.data.list, s = n.length, l = [], d = 0; s > d; d++) {
                                    var c = {
                                        isCompany: !0,
                                        name: n[d].name,
                                        jianPin: n[d].jianPin,
                                        quanPin: n[d].quanPin,
                                        addr: n[d].email_139,
                                        orgName: n[d].orgName,
                                        corporationName: n[d].corporationName
                                    };
                                    l.push(c)
                                }
                                u = u.concat(l);
                                for (var p = [], h = "", m = [], d = 0; d < u.length; d++)m.push((u[d].corporationName || "") + (u[d].orgName || ""));
                                for (var d = 0; d < u.length; d++) {
                                    var f = u[d], g = f.name + f.addr, v = (f.corporationName || "") + (f.orgName || "");
                                    -1 == h.indexOf(g) ? (h += g, p.push(f)) : -1 == t.indexOf(t.without(m, v), v) && p.push(f)
                                }
                                u = p, x = u.length
                            }
                            r(o)
                        }
                    }, fail: function () {
                        r()
                    }, error: function () {
                        r()
                    }
                })) : r()
            }
        },
        renderMemberView: function (e, a) {
            var n = this.utilGetMemberContainer(e), r = n.attr("init") || 0;
            if ("init" != a || 1 != n.attr("init")) {
                var l, d = [], c = this.filter ? this.MemberItemTemplate : this.MemberItemTemplateOld;
                if (e == s.All)l = this.model.getContacts(); else if (e == s.Lastest)l = this.model.getLastestContacts(); else if (e == s.Close)l = this.model.getCloseContacts(); else if (e == s.Ungroup)l = this.model.getUngroupContacts(); else {
                    if (e == s.Search)return c = this.SearchTpl, !1;
                    l = this.model.getGroupMembers(e)
                }
                for (var p = l.length, u = n.find("li[data-addr]").length, h = 1 == r ? this.MemberPageSize : this.MemberFirstSize, m = this, f = this.model.get("keyword"), g = u, v = Math.min(u + h, p); v > g; g++) {
                    var y = l[g], w = "";
                    if (e == s.Search)switch (this.filter) {
                        case"email":
                            w = y.emails.concat();
                            break;
                        case"mobile":
                            w = y.mobiles.concat();
                            break;
                        case"fax":
                            w = y.faxes.concat();
                            break;
                        default:
                            w = y.SerialId
                    } else w = this.filter ? y.addr || this.getAddr(y) : y.SerialId;
                    w = t.isArray(w) ? w : [w];
                    var b = t.filter(w, function (e) {
                        return e.indexOf(f) > -1
                    });
                    b.length || (b = w), o.each(b, function (e, t) {
                        var o = !(this.selectMode && m.model.isSelectedNew({addr: t, serialId: y.SerialId}));
                        d.push(i.Text.format(c, {
                            contactsId: y.SerialId,
                            contactsNameTitle: i.Text.Html.encode(y.name),
                            contactsName: m.formatStr(y.name, f),
                            addrData: t,
                            addr: m.formatStr(t, f),
                            addrTitle: i.Text.Html.encode(t),
                            display: o ? "" : "none",
                            display_i: "none"
                        }))
                    })
                }
                p > u + h && d.push('<li class="LoadMoreMember" data-groupId="' + e + '"><a hidefocus="1" href="javascript:;">更多<span class="f_SimSun">↓</span></a></li>'), d = d.join(""), n.append(d), n.attr("init", 1)
            }
        },
        onLoadMoreMemberClick: function (e) {
            o(i.Dom.findParent(e.currentTarget, "li")).hide();
            var t = this.utilGetClickGroupId(e);
            t != s.Search ? this.renderMemberView(t) : (this.LoadCompanyContacts = !1, top.BH("enterprice-search-loadmore-key"), this.renderSearchMemberView(t, "", this.contacts_list))
        },
        onClearSearchInput: function () {
            top.BH("compose_addressbook_search");
            var e = o("#searchContactsBtn");
            o(".searchContact").hasClass("searchContact_on") && e.val(""), this.model.set("keyword", null), this.hideGroupEmptyTip(), e.focus()
        },
        onSearchInputChange: function (e) {
            var t = o(".searchContact");
            this.trigger("groupClick");
            var i = "write_letter" == this.options.comefrom ? this.$el.parent() : this.$el;
            i.scrollTop(0), "" == e ? (this.switchGroupMode(), t.removeClass("searchContact_on")) : (this.renderSearchView(e), t.addClass("searchContact_on"), this.trigger("BH_onSearch"))
        },
        switchGroupMode: function () {
            this.$(".searchEnd").hide(), this.$(".SendToMySelf").show(), this.$(".GroupList").show(), o("#divCompanyAddressList").show(), this.TipMessageLimit = !0, top.M139.UI.TipMessage.hide()
        },
        renderSearchView: function (e) {
            this.$(".SendToMySelf").hide(), this.$(".GroupList").hide(), this.$(".searchEnd").show(), this.$(".searchEnd li ul").html("").attr("init", 0), o("#divCompanyAddressList").hide(), this.TipMessageLimit = !1, this.model.set("keyword", e), this.model.set("currentGroup", null), this.model.set("currentGroup", s.Search)
        },
        onGroupButtonClick: function (e) {
            var t = this.utilGetClickGroupId(e), i = this.model.get("currentGroup");
            i == t ? (this.model.set("currentGroup", null), this.hideGroupFixed()) : (this.model.set("currentGroup", t), this.toggleGroupFixed()), this.trigger("groupClick")
        },
        onSendToMySelfClick: function () {
            var e = top.$User.getTrueName();
            if ("email" == this.filter)var t = top.$User.getDefaultSender(); else if ("mobile" == this.filter)var t = top.$User.getShortUid();
            var i = this.model.getSendText(e, t), o = {value: i, name: e, addr: t};
            if (this.selectMode)if (this.model.selectedList.length >= this.options.maxCount)this.trigger("additemmax"); else {
                var a = this.model.addSelectedItem(o);
                a && this.trigger("additem", o)
            } else this.trigger("select", o)
        },
        showGroupMember: function (e) {
            e == s.Search && "write_letter" == this.comefrom && (this.LoadCompanyContacts = !0, clearTimeout(this.TipMessageTimer)), this.renderMemberView(e, "init"), this.renderSearchMemberView(e, "init"), this.utilGetMemberContainer(e).show(), this.utilGetGroupElement(e).find("a.GroupButton i").removeClass().addClass("i_triangle_d")
        },
        hideGroupMember: function (e) {
            this.utilGetMemberContainer(e).hide(), this.utilGetGroupElement(e).find("a.GroupButton i").removeClass().addClass("i_triangle_r")
        },
        onContactsItemClick: function (e) {
            if (!this.selectMode && "write_letter" == this.comefrom) {
                var a = i.Dom.findParent(e.currentTarget, "li").getAttribute("data-isCompany"), n = o(e.currentTarget).parent().parent().attr("data-groupid");
                if (a && n == s.Search) {
                    var r = i.Dom.findParent(e.currentTarget, "li").getAttribute("data-name"), l = i.Dom.findParent(e.currentTarget, "li").getAttribute("data-addr"), d = this.model.getSendText(r, l), c = {
                        value: d,
                        name: r,
                        addr: l
                    };
                    return top.BH("enterprice-search-contacts-key"), this.trigger("select", c), !1
                }
            }
            var p = this, u = o(e.currentTarget), h = u.data("contactsid").toString(), m = this.model.getContactsById(h, {batch: !0}), f = u.next(".emailList"), l = u.data("addr").toString();
            if (this.model.get("currentGroup") != s.Search)if (t.isArray(m.addr)) {
                for (var g = 0, v = m.addr.length; v > g; g++)if (!p.model.isSelectedNew({
                        addr: m.addr[g],
                        serialId: m.serialId
                    })) {
                    if (f.length)return f.find('li[data-addr="' + m.addr[g] + '"]').trigger("click"), !1;
                    l = m.addr[g];
                    break
                }
            } else l = m.addr;
            var d = this.model.getSendText(m.name, l), c = {value: d, name: m.name, addr: l, serialId: m.SerialId};
            if (this.selectMode)if (this.model.selectedList.length >= this.options.maxCount)this.trigger("additemmax"); else if (this.options.isAddVip && top.Contacts.IsPersonalEmail(m.SerialId))top.FF.alert("不支持添加自己为VIP联系人。"); else {
                var y = this.model.addSelectedItem(c);
                y && this.trigger("additem", c)
            } else this.trigger("select", c), -3 == o(e.currentTarget).parent().parent().attr("data-groupid") ? top.BH("compose_addressbook_lastitem") : -4 == o(e.currentTarget).parent().parent().attr("data-groupid") ? top.BH("compose_addressbook_closeitem") : -1 == o(e.currentTarget).parent().parent().attr("data-groupid") ? top.BH("compose_addressbook_allitem") : -2 == o(e.currentTarget).parent().parent().attr("data-groupid") ? top.BH("compose_addressbook_noitem") : o(e.currentTarget).parent().parent().attr("data-groupid") == this.model.getVIPGroupId() ? top.BH("compose_addressbook_vipitem") : o(e.currentTarget).parent().parent().attr("data-groupid") == this.model.getReadGroupId() ? top.BH("compose_addressbook_readitem") : BH("compose_addressbook_itemclick")
        },
        onMemberItemRightClick: function (e) {
            e.stopPropagation();
            var i = this, a = o(e.currentTarget), n = a.closest(".ContactsItem"), s = a.find(".i_2trid"), r = n.next(".emailList"), l = n.data("contactsid").toString();
            if (r.length)s.hasClass("i_2tridd") ? (top.BH("compose_addrBook_cilck_hideMultipleEmails"), s.removeClass("i_2tridd"), r.hide()) : (top.BH("compose_addrBook_cilck_showMultipleEmails"), s.addClass("i_2tridd"), r.show()); else {
                var d = this.model.getContactsById(l, {batch: !0});
                top.BH("compose_addrBook_cilck_showMultipleEmails"), s.addClass("i_2tridd"), n.after(function () {
                    return t.template(i.EmailTemplate)(d)
                })
            }
        },
        hideAllEmailList: function () {
            this.$(".emailList").hide(), this.$(".i_2tridd").removeClass("i_2tridd")
        },
        onEmailItemClick: function (e) {
            var t = o(e.currentTarget), i = t.closest("ul"), a = i.data("contactsid").toString(), n = i.data("name").toString(), s = t.data("addr").toString(), r = this.model.getSendText(n, s), l = {
                value: r,
                name: n,
                addr: s,
                serialId: a
            };
            if (this.selectMode)if (this.model.selectedList.length >= this.options.maxCount)this.trigger("additemmax"); else if (this.options.isAddVip && top.Contacts.IsPersonalEmail(c.SerialId))top.FF.alert("不支持添加自己为VIP联系人。"); else {
                var d = this.model.addSelectedItem(l);
                d && this.trigger("additem", l, {isEmailList: !0})
            } else this.trigger("select", l)
        },
        onAddGroupClick: function (e) {
            var t, i = this.utilGetClickGroupId(e);
            if (i > 0) {
                if (this.selectMode) {
                    for (var o = this.model.getGroupMembers(i).concat(), a = [], n = 0; n < o.length; n++) {
                        var s = o[n];
                        if ("email" == this.filter)var r = s.getEmailSendText(); else if ("mobile" == this.filter)var r = s.getMobileSendText();
                        if (t = {
                                value: r,
                                name: s.name,
                                addr: this.getAddr(s),
                                serialId: s.SerialId,
                                SerialId: s.SerialId
                            }, o[n] = t, this.model.selectedList.length >= this.options.maxCount) {
                            this.trigger("additemmax");
                            break
                        }
                        if (this.options.isAddVip) {
                            for (var l = this.model.selectedList, d = !1, c = 0; c < l.length; c++)if (t.serialId == l[c].serialId || top.Contacts.IsPersonalEmail(t.serialId)) {
                                d = !0;
                                break
                            }
                            if (!d) {
                                var p = this.model.addSelectedItem(t);
                                p && a.push(t)
                            }
                        } else {
                            var p = this.model.addSelectedItem(t);
                            p || (o.splice(n, 1), n--)
                        }
                    }
                    this.trigger("additem", {isGroup: !0, group: i, value: this.options.isAddVip ? a : o})
                } else this.trigger("select", {
                    isGroup: !0,
                    group: i,
                    value: this.model.getGroupMembers(i, {getSendText: !0})
                });
                "write_letter" == this.comefrom || this.utilGetMemberContainer(i).find("li").hide()
            }
            this.trigger("BH_onAddGroup")
        },
        onAddNewContactsClick: function () {
            var e = this, o = i.PageApplication.getTopAppWindow(), a = (new o.M2012.UI.Dialog.ContactsEditor).render();
            a.on("success", function (i) {
                e.trigger("addContact", i), i && i.success && i.contacts && i.contacts.length && t.each(i.contacts, function (t) {
                    var i = "";
                    switch (e.filter) {
                        case"email":
                            i = t.AddrFirstName;
                            break;
                        case"mobile":
                            i = t.MobilePhone;
                            break;
                        case"fax":
                            i = t.BusinessFax
                    }
                    if (i) {
                        var o = {
                            addr: i,
                            name: t.AddrFirstName,
                            serialId: t.SerialId,
                            value: $Email.getSendText(t.AddrFirstName, i)
                        }, a = e.model.addSelectedItem(o);
                        a && e.trigger("additem", o)
                    }
                }), e.onAddContacts(), BH("compose_linkmansuc")
            }), a.on("addGroupSuccess", function (t) {
                e.trigger("addGroup", t)
            }), this.trigger("BH_onAddNewContacts")
        },
        groupFixedInfo: function () {
            var e = this.model.get("currentGroup");
            if (e && this.isInClient(e)) {
                var t = this.model.get("currentGroup") == s.Search, i = t ? this.$searchContainer.children(".contactList") : this.$groupContainer, o = i.children('[data-groupid="' + e + '"]');
                if (!o.length)return null;
                var a = o.children(".GroupButton"), n = a.children("span").text(), r = a.children("var").text();
                return {name: n, num: r, gid: e}
            }
            return null
        },
        isInClient: function (e) {
            var t = this.model.get("currentGroup") == s.Search, i = t ? this.$searchContainer.children(".contactList") : this.$groupContainer, o = i.children('[data-groupid="' + e + '"]');
            if (!o.length)return !1;
            var a = o.height(), n = "write_letter" == this.options.comefrom ? this.$el.parent() : this.$el, r = o.offset().top - n.offset().top;
            return -25 > r && r + a > 0
        },
        showGroupFixed: function () {
            var e = this.model.get("currentGroup");
            if (e) {
                var t = this.model.get("currentGroup") == s.Search, i = t ? this.$searchContainer.children(".contactList") : this.$groupContainer, o = i.children('[data-groupid="' + e + '"]');
                if (o.length) {
                    var a = o.children(".GroupButton"), n = a.children("span").text(), r = a.children("var").text(), l = this.$(".groupFixed");
                    l.attr("data-groupid", e).children(".GroupButton").children("span").text(n).next("var").text(r), l.slideDown("fast")
                }
            }
        },
        hideGroupFixed: function () {
            this.$(".groupFixed").hide()
        },
        formatStr: function (e, t) {
            if (!t)return i.Text.Html.encode(e);
            var o = e.indexOf(t), a = t.length, n = "", s = [], r = '<span>{0}</span><span class="c_67ae6d">{1}</span><span>{2}</span>', l = i.Text.Html;
            return o > -1 ? (0 == o ? s.push("") : s.push(l.encode(e.substring(0, o))), s.push(l.encode(e.substring(o, o + a))), o + a >= e.length ? s.push("") : s.push(l.encode(e.substring(o + a))), n = i.Text.format(r, s)) : n = l.encode(e), n
        },
        onAddContacts: function () {
            this.updateView()
        },
        updateView: function () {
            this.model.set("contacts", null), this.renderGroupListView(), this.model.set("currentGroup", null)
        },
        onRetryClick: function () {
            var e = this;
            e.retryCount++, this.$(".LoadingImage").show(), this.$(".RetryDiv").hide(), setTimeout(function () {
                e.showRetryDiv()
            }, 5e3), this.model.reloadContactsData()
        },
        onClearGroupClick: function (e) {
            -3 == o(e.target).parent().attr("data-groupid") && top.BH("compose_addressbook_lastcancel"), -4 == o(e.target).parent().attr("data-groupid") && top.BH("compose_addressbook_closecancel");
            var t = this.utilGetClickGroupId(e);
            t == s.Lastest ? this.model.clearLastContacts() : t == s.Close && this.model.clearCloseContacts()
        },
        getAddr: function (e) {
            var t = "";
            return t = "email" == this.filter ? e.getFirstEmail() : "mobile" == this.filter ? e.getFirstMobile() : "fax" == this.filter ? e.getFirstFax() : e.getFirstEmail() || e.getFirstMobile()
        },
        addSelectedItems: function (e) {
            for (var t = this.filter, o = 0; o < e.length; o++) {
                var a = e[o];
                if ("object" == typeof a) {
                    var n = this.model.addSelectedItem(a);
                    n && this.trigger("additem", a)
                } else {
                    var s = "", r = "";
                    if ("email" == t ? (s = i.Text.Email.getEmail(a), r = i.Text.Email.getName(a), value = i.Text.Email.getSendText(r, s)) : "mobile" == t && (s = i.Text.Mobile.getMobile(a), r = i.Text.Mobile.getName(a), value = i.Text.Mobile.getSendText(r, s)), s) {
                        var l = {name: r, addr: s, value: value}, n = this.model.addSelectedItem(l);
                        n && this.trigger("additem", l)
                    }
                }
            }
        },
        removeSelectedAddr: function (e) {
            for (var t = this.model.selectedList, i = 0; i < t.length; i++) {
                var o = t[i], a = "";
                if (a = this.options.isAddVip ? o.serialId : o.addr, this.filter || (a = o.serialId), a == e)return t.splice(i, 1), void this.trigger("removeitem", o)
            }
        },
        getSelectedItems: function () {
            if (this.selectMode) {
                var e = this.model.selectedList.concat();
                return e
            }
            return null
        },
        utilGetClickGroupId: function (e) {
            var t = o(e.currentTarget), i = t.is("[data-groupid]") ? t : t.parent();
            return i.attr("data-groupid").toString()
        },
        utilGetMemberElement: function (e) {
            return this.$(".ContactsItem[data-addr='" + e + "']")
        },
        utilGetEmailElement: function (e) {
            return this.$(".emailList").find('li[data-addr="' + e + '"]')
        },
        utilGetMemberElementById: function (e) {
            return this.$(".ContactsItem[data-contactsid='" + e + "']")
        },
        utilGetGroupElement: function (e) {
            return this.$("li[data-groupId='" + e + "']")
        },
        utilGetMemberContainer: function (e) {
            return this.utilGetGroupElement(e).children("ul")
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = i.Model.ModelBase, a = "M2012.UI.Compose.Widget.Company.Contacts.Model";
    i.namespace(a, o.extend({
        name: a, initialize: function () {
            return o.prototype.initialize.apply(this, arguments)
        }, isShowContainer: function (e) {
            var t = e.url, o = e.postData;
            top.M139.HttpRouter.addRouter("addr2", [t]), top.M139.RichMail.API.call(t, o, function (t) {
                t = i.JSON.tryEval(t), t && t.responseData && "S_OK" === t.responseData.code && e.success(t.responseData)
            })
        }, getCompanyContacts: function (e) {
            var t = e.url, o = e.postData;
            top.M139.HttpRouter.addRouter("addr2", [t]), top.M139.RichMail.API.call(t, o, function (t) {
                t = i.JSON.tryEval(t), t && t.responseData && "S_OK" === t.responseData.code && e.success(t.responseData)
            })
        }, getGroupList: function (e) {
            var t = e.url, o = e.postData;
            top.M139.HttpRouter.addRouter("addr2", [t]), top.M139.RichMail.API.call(t, o, function (t) {
                t = i.JSON.tryEval(t), t && t.responseData && "S_OK" === t.responseData.code && e.success(t.responseData)
            })
        }, getSendText: function (e, t) {
            return e = (e || "") && e.replace(/["\r\n]/g, " "), '"' + e + '"<' + t + ">"
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = "M2012.UI.Compose.Widget.Company.Contacts.View", s = "中国移动通信集团", r = "1", l = "36101", d = null;
    i.namespace(n, a.extend({
        name: n,
        events: {},
        templateWrap: ["", '<div style="line-height:25px;padding-left:10px;color:#888;">企业通讯录</div>', '<ul id="grounpListWrap">', '<li data-orgId="{orgId}" data-recType="{recType}" data-isLoad="{isLoad}" style="line-height:25px;">', '<a bh="" hidefocus="1" class="GroupButton contactList_a" href="javascript:;" title="{aTitle}" style="display:none;width:182px;">', '<i class="{iconClass}" style="width:{width};"></i>', '<span style="display:inline-block;height:20px;line-height:20px;color:#444;">{groupName}', '<var style="display:{isShow};">({count})</var>', "</span>", "</a>", '<ul style="width:192px;" class="companyList"></ul>', "</li>", "</ul>", ""].join(""),
        templateContent: ['<li data-orgId="{orgId}" data-recType="{recType}" data-isLoad="{isLoad}" data-address="{address}" data-quanPin="{quanPin}" data-jianPin="{jianPin}" data-name="{groupNameTitle}" data-enterpriseId="{enterpriseId}" class="{isMemberButton}" style="padding-left:{paddingLeft};position:relative;">', '<a bh="" hidefocus="1" style="position:absolute;top:7px;display:{isShow_addGroup};" title="添加整个部门" href="javascript:;" class="i_r_yq2 AddGroup"></a>', '<a href="javascript:;" class="mr_12 memberItemRight" style="float: right;display:{isShow_emailList};"><i class="i_2trid"></i></a>', '<a bh="{behavior}" hidefocus="1" class="GroupButton contactList_a" href="javascript:;" title="{aTitle}" style="display:inline-block;">', '<i class="{iconClass}" style="width:{width};"></i>', '<span style="display:inline-block;height:20px;line-height:20px;color:{color};">{groupName}', '<var style="display:{isShow};">({count})</var>', "</span>", "</a>", "<ul></ul>", "</li>"].join(""),
        EmailTemplate: ['<ul class="emailList" data-contactsId="<%- orgid %>" data-name="<%- name  %>" style="margin-left:25px;">', '<% var tmp = _.isArray(addr) ? addr : [addr || ""] %>', "<% _.each(tmp,function(value){ %>", '<li data-addr="<%- value %>" title="<%- value %>" style="word-spacing:normal;text-overflow:ellipsis;overflow:hidden;padding-right:25px;"><a href="javascript:;" class="ac" style="color:#444;"><%- value %></a></li>', "<% }) %>", "</ul>"].join(""),
        initialize: function (e) {
            return this.model = new M2012.UI.Compose.Widget.Company.Contacts.Model, this.contactModel = top.M2012.Contacts.getModel(), this.container = o(e.container), this.isShowContainer(), a.prototype.initialize.apply(this, arguments)
        },
        isShowContainer: function () {
            var e = this;
            top.M2012.Contacts.API.checkUserNumber({
                data: {}, success: function (t) {
                    if (t && "S_OK" === t.code) {
                        var i = t.data;
                        i && i["var"] && i["var"].guangDongTopOrgList && (top.hasCompanyContacts = !0, e.initEvent(), e.renderWrap(i["var"].guangDongTopOrgList)), top.$App && top.$App.set("set_addr_isEnterprise", !0)
                    }
                }
            })
        },
        initEvent: function () {
            var e = this;
            this.container.show(), this.container.on("click", ".memberItemRight", function (t) {
                e.onMemberItemRightClick(t)
            }), this.container.on("click", ".MemberButton", function (t) {
                e.addMember(t)
            }), this.container.on("click", ".AddGroup", function (t) {
                e.addGroupMember(t)
            }), this.container.on("click", ".GroupButton", function (t) {
                e.toggleGroup(t)
            }), this.container.on("click", ".emailList li", function (t) {
                e.emailClick(t)
            })
        },
        renderWrap: function (e) {
            var t = this.templateWrap, a = "i_triangle_d", n = i.Text.Html.encode(e.orgName), r = e.totalMemNum, l = n ? n : s, c = r ? r : "", p = 1, u = 1, h = null;
            l.length > 10 && (h = l.substr(0, 9) + "…"), o(this.container).append(i.Text.format(t, {
                orgId: d,
                recType: p,
                isLoad: u,
                groupNameTitle: l,
                aTitle: l,
                groupName: h || l,
                width: "",
                isShow: c ? "" : "none",
                count: c ? c : "",
                behavior: "",
                iconClass: a
            })), this.topCompanyList = [];
            for (var m = 0; m < e.length; m++)this.topCompanyList.push(e[m]);
            this.getCompanyContacts()
        },
        getCompanyContacts: function (e) {
            var t = this, e = e || {}, i = e.groupId || r, o = e.enterpriseId || l, a = e.target;
            top.M2012.Contacts.API.writePageGetAllSubList({
                data: {OrgID: i, EnterpriseId: o}, success: function (o) {
                    o ? (a && a.attr("data-isload", 1), t.renderGroupList({
                        result: o.data,
                        groupId: i,
                        loadSuccess: e.loadSuccess
                    })) : top.M139.UI.TipMessage.show("网络异常，企业通讯录数据加载失败，请刷新重试", {delay: 2e3, className: "msgRed"})
                }
            })
        },
        renderGroupList: function (e) {
            var t = e.result, a = e.groupId, n = this.templateContent, s = "i_triangle_r";
            if (t && t[0]) {
                for (var l = t.length, d = [], c = 0, p = "orgId", u = "totalMemNum", h = 0; l > h; h++) {
                    var m = t[h];
                    if (1 != m.id) {
                        var f = i.Text.Html.encode(m.name), g = null;
                        f.length > 10 && (g = f.substr(0, 9) + "…");
                        var v = "1" == m.recType, y = i.Text.Html.encode(m.email_139), w = this.checkTopCompany(m.id, u) || "";
                        w = i.Text.Html.encode(w.toString());
                        var b = this.checkTopCompany(m.id, p), x = b || "1" != m.recType ? "none" : "", I = b || "2" != m.recType ? "none" : "";
                        d.push(i.Text.format(n, {
                            orgId: m.id,
                            recType: m.recType,
                            address: v ? "" : y,
                            isMemberButton: v ? "" : "MemberButton",
                            isLoad: c,
                            groupNameTitle: f,
                            aTitle: v ? f : y,
                            groupName: g || f,
                            quanPin: v ? "" : m.quanPin,
                            jianPin: v ? "" : m.jianPin,
                            width: v ? "" : "8px",
                            isShow_addGroup: x,
                            isShow_emailList: I,
                            isShow: v && w ? "" : "none",
                            count: w ? w : "",
                            paddingLeft: b ? "0px" : v ? "15px" : "8px",
                            color: b ? "#222" : "#444",
                            iconClass: v ? s : "",
                            enterpriseId: m.enterpriseId || ""
                        }))
                    }
                }
                d = d.join("")
            } else var d = '<span style="padding-left:25px;">暂无联系人</span>';
            var C = o(this.container).find("#grounpListWrap"), T = null;
            T = a == r ? C.find("ul").eq(0) : C.find("li[data-orgId='" + a + "']").find("ul").eq(0), T.html(d), e.loadSuccess && e.loadSuccess(), this.changePositionRight()
        },
        checkTopCompany: function (e, t) {
            for (var i = this.topCompanyList, o = !1, a = 0; a < i.length; a++) {
                var n = i[a];
                if (e == n.orgID) {
                    if ("orgId" == t) {
                        o = !0;
                        break
                    }
                    if ("totalMemNum" == t) {
                        o = 0 === n.totalMemNum ? "0" : n.totalMemNum ? n.totalMemNum : "";
                        break
                    }
                }
            }
            return o
        },
        changePositionRight: function () {
            var e = o(this.container).find("#grounpListWrap"), t = e.width() < 200 ? "10px" : "2px";
            e.find(".AddGroup").css({right: t})
        },
        changeScrollTop: function (e) {
            var t = e.offset().top, i = o(this.container), a = i.parent(), n = (a.height(), o(document.body).height()), s = .8 * n, r = .5 * n + a.scrollTop();
            t > s && a.scrollTop(r)
        },
        toggleGroup: function (e) {
            var t = this, i = o(e.currentTarget), a = i.parent("li"), n = i.children("i"), s = a.data("orgid").toString(), r = a.data("rectype"), l = a.attr("data-isload"), d = a.attr("data-enterpriseId"), c = "orgId", p = this.checkTopCompany(s, c);
            if (1 == r && p ? top.BH("enterprice-sendAllEmail-org-key") : 1 == r && top.BH("enterprice-sendAllEmail-group-key"), 1 == r && "" !== n.attr("class")) {
                if (n.hasClass("i_triangle_d"))a.find("ul").not(".emailList").hide(), a.filter("[data-recType=1]").find(".i_triangle_d").removeClass("i_triangle_d").addClass("i_triangle_r"); else {
                    var u = a.siblings("li");
                    n.removeClass("i_triangle_r").addClass("i_triangle_d"), a.children("ul").show(), u.find("ul").hide(), u.filter("[data-recType=1]").find(".i_triangle_d").removeClass("i_triangle_d").addClass("i_triangle_r"), "0" == l ? this.getCompanyContacts({
                        groupId: s,
                        enterpriseId: d,
                        target: a,
                        loadSuccess: function () {
                            t.changeScrollTop(a)
                        }
                    }) : t.changeScrollTop(a)
                }
                this.trigger("groupClick")
            }
            this.changePositionRight()
        },
        addMember: function (e) {
            var t = o(e.currentTarget), i = t.data("name"), a = t.data("address"), n = this.contactModel.getSendText(i, a), s = {
                value: n,
                name: i,
                addr: a
            };
            top.BH("enterprice-sendAllEmail-contacts-key"), this.trigger("select", s)
        },
        addGroupMember: function (e) {
            var t = this, a = o(e.currentTarget), n = a.parent("li").data("orgid").toString(), s = a.parent("li").attr("data-enterpriseId"), r = window.groupSendFlag ? top.$User.getMaxSend() + 400 : top.$User.getMaxSend();
            top.M2012.Contacts.API.getOrgTopNMerber({
                data: {OrgID: n, EnterpriseId: s, TopN: r.toString()},
                success: function (e) {
                    if (e && e.data) {
                        for (var o = e.data || [], a = o.length, n = [], s = 0; a > s; s++) {
                            var r = o[s], l = i.Text.Html.encode(r.name), d = i.Text.Html.encode(r.email_139), c = t.contactModel.getSendText(l, d);
                            n.push(c)
                        }
                        var e = {isGroup: !0, value: n};
                        top.BH("enterprice-sendAllEmail-addgroup-key"), t.trigger("select", e)
                    }
                }
            })
        },
        onMemberItemRightClick: function (e) {
            e.stopPropagation();
            var i = this, a = o(e.currentTarget), n = a.closest(".MemberButton"), s = a.find(".i_2trid"), r = n.next(".emailList");
            if (r.length)s.hasClass("i_2tridd") ? (top.BH("compose_addrBook_cilck_hideMultipleEmails"), s.removeClass("i_2tridd"), r.hide()) : (top.BH("compose_addrBook_cilck_showMultipleEmails"), s.addClass("i_2tridd"), r.show()); else {
                var l = {
                    orgid: n.data("orgid").toString(),
                    name: n.data("name").toString(),
                    addr: n.data("address").toString()
                };
                top.BH("compose_addrBook_cilck_showMultipleEmails"), s.addClass("i_2tridd"), n.after(function () {
                    return t.template(i.EmailTemplate)(l)
                })
            }
        },
        emailClick: function (e) {
            var t = o(e.currentTarget), i = t.parent("ul"), a = t.data("addr"), n = i.data("name"), s = this.contactModel.getSendText(n, a);
            this.trigger("select", {value: s, name: n, addr: a})
        },
        groupFixedInfo: function () {
            var e = this.container.find(".companyList").children("li"), t = e.find(".i_triangle_d"), i = t.length ? t.closest("li").data("orgid") : null;
            if (i && this.isInClient(i)) {
                var o = this.container.find(".companyList").children('[data-orgid="' + i + '"]');
                if (!o.length)return null;
                var a = o.data("name"), n = o.children(".GroupButton").find("var").text();
                return {name: a, num: n, gid: i}
            }
            return null
        },
        isInClient: function (e) {
            var t = this.container.find(".companyList"), i = t.children('[data-orgid="' + e + '"]');
            if (!i.length)return !1;
            var o = i.height(), a = i.position().top;
            return -25 > a && a + o > 0
        },
        hideCompanyGroup: function (e) {
            var t = this.container.find(".companyList").children('[data-orgid="' + e + '"]');
            t.find("ul").not(".emailList").hide(), t.filter("[data-recType=1]").find(".i_triangle_d").removeClass("i_triangle_d").addClass("i_triangle_r")
        },
        getClickTarget: function (e) {
            return i.Dom.findParent(e.target, "li")
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = "M2012.UI.Dialog.AddressBook";
    i.namespace(n, a.extend({
        initialize: function (e) {
            return this.options = e || {}, this.filter = e.filter, this.selectContacts = [], a.prototype.initialize.apply(this, arguments)
        },
        name: n,
        template: ['<div class="addFormContact">', "<table>", "<tbody><tr>", '<th class="leftTh">联系人(<var class="Label_ContactsLength"></var>)</th>', '<th class="centerTh"></th>', '<th class="rightTh"><var class="Label_ReceiverText"></var></th>', "</tr>", "<tr>", '<td class="leftTd">', '<div class="p_relative addFcLeft AddressBookContainer">', "</div>", "</td>", '<td class="centerTd"><i class="i_addjt"></i></td>', '<td class="rightTd">', '<div class="p_relative addFcRight">', "</div>", "</td>", "</tr>", "</tbody></table>", "</div>"].join(""),
        events: {"click #clear": "clearInput"},
        render: function () {
            var e = this, t = this.options;
            return this.dialog = $Msg.showHTML(this.template, function () {
                e.onSelect()
            }, function () {
                e.onCancel()
            }, {
                width: "500px",
                buttons: ["确定", "取消"],
                dialogTitle: t.dialogTitle || "从联系人添加"
            }), this.addressBook = new M2012.UI.Widget.Contacts.View({
                container: this.dialog.$(".AddressBookContainer")[0],
                showLastAndCloseContacts: t.showLastAndCloseContacts,
                showVIPGroup: t.showVIPGroup,
                showSelfAddr: t.showSelfAddr,
                maxCount: t.maxCount,
                selectMode: !0,
                filter: this.filter,
                isAddVip: t.isAddVip,
                comefrom: t.comefrom,
                showCompanyContacts: t.showCompanyContacts || !1
            }).render().on("additem", function (t) {
                if (t.isGroup) {
                    BH("addressBook_click_addGroup");
                    var i = t.value;
                    i = i || [], e.trigger("setSelectContacts", {type: "add", value: i});
                    for (var o = 0; o < i.length; o++) {
                        var a = i[o];
                        e.onAddItem(a.name, a.addr, a.serialId)
                    }
                } else e.onAddItem(t.name, t.addr, t.serialId), e.trigger("setSelectContacts", {
                    type: "add",
                    value: [t]
                })
            }).on("removeitem", function (t) {
                e.onRemoveItem(t.addr, t.serialId), e.trigger("setSelectContacts", {type: "del", value: [t]})
            }).on("additemmax", function (t) {
                e.trigger("additemmax")
            }), this.on("print", function () {
                t.items && this.addressBook.addSelectedItems(t.items)
            }), this.setElement(this.dialog.el), this.setTips({
                contactsLength: this.addressBook.model.getContacts().length,
                receiverText: t.receiverText || "接收人"
            }), this.initEvent(), a.prototype.render.apply(this, arguments)
        },
        selectedTemplate: ['<a hidefocus="1" data-contactsid ="{serialId}" data-addr="{addr}" href="javascript:;" class="lia">', '<i class="i_del"></i>', "<span>{sendText}</span>", "</a>"].join(""),
        initEvent: function (e) {
            var i = this;
            this.$(".addFcRight").click(function (e) {
                if ("i_del" == e.target.className) {
                    var t = e.target.parentNode.getAttribute("data-addr");
                    i.options.isAddVip && (t = e.target.parentNode.getAttribute("data-contactsid")), i.addressBook.removeSelectedAddr(t)
                }
            }), this.on("setSelectContacts", function (e) {
                e = e || {};
                var o = e.type || "", a = e.value || [];
                switch (o) {
                    case"add":
                        i.selectContacts = t.union(i.selectContacts, a);
                        break;
                    case"del":
                        i.selectContacts = t.reject(i.selectContacts, function (e) {
                            return e.serialId == t.first(a).serialId
                        });
                        break;
                    case"empty":
                        i.selectContacts = []
                }
                i.$(".red-mark1").length && i.$(".red-mark1").text(i.selectContacts.length)
            })
        },
        onAddItem: function (e, t, a) {
            var n = "mobile" == this.filter ? i.Text.Mobile.getSendText(e, t) : i.Text.Email.getSendText(e, t), s = i.Text.format(this.selectedTemplate, {
                addr: i.Text.Html.encode(t),
                sendText: i.Text.Html.encode(n),
                serialId: i.Text.Html.encode(a)
            });
            o(".addFcRight").append(s)
        },
        onRemoveItem: function (e, t) {
            this.options.isAddVip ? this.$("a[data-contactsid='" + t + "']").remove() : this.$("a[data-addr='" + e + "']").remove()
        },
        setTips: function (e) {
            this.$(".Label_ContactsLength").html(e.contactsLength), this.$(".Label_ReceiverText").html(e.receiverText)
        },
        onSelect: function () {
            var e = this.addressBook.getSelectedItems();
            if (this.options.getDetail !== !0)for (var t = 0; t < e.length; t++)e[t] = e[t].value;
            this.trigger("select", {value: e})
        },
        onCancel: function () {
            this.trigger("cancel")
        },
        clearInput: function () {
            var e = this;
            t.each(this.selectContacts, function (t) {
                e.addressBook.removeSelectedAddr(t.serialId)
            }), this.$(".addFcRight").empty(), this.trigger("setSelectContacts", {type: "empty"})
        }
    })), o.extend(M2012.UI.Dialog.AddressBook, {
        create: function (e) {
            var t = new M2012.UI.Dialog.AddressBook(e).render();
            return t
        }
    })
}(jQuery, _, M139), function (e, t, i, o) {
    var a = e, n = o.View.ViewBase, s = 50;
    o.namespace("M2012.UI.Suggest.InputSuggest", n.extend({
        initialize: function (e) {
            e = i.defaults(e, r), this.options = e || {};
            var t = document.createElement("div");
            t.innerHTML = e.template || this.options.template, this.setElement(t.firstChild), this.onSelect = e.onSelect || this.onSelect, this.onInput = e.onInput || this.onInput, this.maxItem = e.maxItem || 12, this.onInputGroup = e.onInputGroup || this.onInputGroup, this.textbox = e.textbox, this.body = e.body, this.initEvent(), n.prototype.initialize.apply(this, arguments)
        }, initEvent: function () {
            var t = this.options, i = this, n = e(t.textbox);
            n.bind("keydown", function (e) {
                i.onTextBoxKeyDown(e)
            }).bind("change", function (e) {
                setTimeout(function () {
                    "" == n.val() && i.hide()
                }, 10)
            }), t.textbox && o.Timing.watchInputChange(t.textbox, function (e) {
                try {
                    i.onTextBoxChange(e)
                } catch (t) {
                    o.Logger.sendClientLog({
                        Level: "ERROR",
                        Name: "SuggestError",
                        errorMsg: t.toString(),
                        stack: t.stack
                    })
                }
            }), o.Browser.is.ie ? (this.$el.mousedown(function (e) {
                n.attr("mode", "edit")
            }).mousemove(function () {
            }), a(document).click(function (e) {
                e.target != i.el && i.hide()
            })) : (n.bind("blur", function (e) {
                i.hide()
            }), this.$el.mousedown(function (e) {
                o.Event.stopEvent(e)
            }))
        }, selectItem: function (e) {
            var t = "number" == typeof e ? this.getItem(e) : e, i = this.getSelectedItem();
            null != i && this.utilBlurItem(i), this.utilFocusItem(t);
            var o = t[0];
            this.utilScrollToElement(this.el, o)
        }, getScrollElement: function () {
            return this.el
        }, getItem: function (e) {
            return this.$el.find(this.options.itemPath + "[index='" + e + "']").eq(0)
        }, getItems: function () {
            return this.$el.find(this.options.itemPath)
        }, getSelectedItem: function () {
            var e = this.$el.find(this.options.itemPath + "[i_selected='1']");
            return e.length ? e.eq(0) : null
        }, getSelectedIndex: function () {
            var e = this.getSelectedItem();
            return e ? 1 * e.attr("index") : -1
        }, onItemSelect: function (t) {
            this.hide();
            var i = a(t).attr("data-value"), o = a(t).attr("data-isself"), n = a(t).attr("data-isCompany");
            e.isFunction(this.onSelect) && this.onSelect(i), this.textbox && (this.textbox.value = i, this.textbox.setAttribute("mode", "")), n && top.BH("enterprice-org-contacts-key"), this.trigger("select", {
                value: i,
                isSelf: o
            })
        }, onGroupSelect: function (t) {
            var i = a(t).data("groupid");
            if (i > 0) {
                for (var o = this.contactModel.getGroupMembers(i), n = 0; n < o.length; n++) {
                    var s = o[n];
                    if ("email" == this.filter)var r = s.getEmailSendText(); else if ("mobile" == this.filter)var r = s.getMobileSendText();
                    var l = r;
                    e.isFunction(this.onSelect) && this.onSelect(l), this.textbox && (this.textbox.value = l, this.textbox.setAttribute("mode", "")), this.trigger("select", {value: r})
                }
                this.hide()
            }
            top.BH("addr_Click_ThinkGroup")
        }, utilGetMemberContainer: function (e) {
            return this.utilGetGroupElement(e).find("ul")
        }, utilGetGroupElement: function (e) {
            return this.$("li[data-groupId='" + e + "']")
        }, getAddr: function (e) {
            var t = "";
            return t = "email" == this.filter ? e.getFirstEmail() : "mobile" == this.filter ? e.getFirstMobile() : "fax" == this.filter ? e.getFirstFax() : e.getFirstEmail() || e.getFirstMobile()
        }, show: function (t) {
            function i() {
                r.onItemSelect(this)
            }

            function o(e) {
                r.onGroupSelect(this)
            }

            function s() {
                r.selectItem(1 * this.getAttribute("index"))
            }

            if (!this.isShow) {
                this.el.parentNode != document.body && document.body.appendChild(this.el);
                var r = this;
                this.clear();
                for (var l = this.options, d = !1, c = 0, p = 0, u = 0; u < t.length; u++)t[u].groupId && (c++, 1 == c && (p = u));
                for (var h = t.splice(p, c), m = [], f = "", u = 0; u < t.length; u++) {
                    var g = t[u], v = g.value;
                    -1 == f.indexOf(v) && (f += v, m.push(g))
                }
                m.sort(function (e, t) {
                    return e = e.quanPin || "", t = t.quanPin || "", e.localeCompare(t)
                }), t = m.concat(h);
                for (var u = 0; u < t.length; u++) {
                    var y = t[u], w = e(l.itemTemplate);
                    if (w.attr("index", u), y.value && y.value.length > 0) {
                        if (y.isCompany && (d = !0), w.attr("data-value", y.value), w.attr("data-isCompany", y.isCompany), w.find(l.itemContentPath).html(y.text), y.isCompany) {
                            var b = a('<span class="cont_span" style="color:#b1b1b1;margin-left:6px;">' + y.orgName + "(" + y.corporationName + ")</span>");
                            w.find(".cont").append(b)
                        }
                        w.appendTo(this.$el.find(l.itemInsertPath)), w.mousedown(i), w.mouseover(s)
                    } else w.attr("data-groupid", y.groupId), w.find(l.itemContentPath).html(l.GroupTemplate), w.find(l.itemGroupPath).html(y.groupName), w.appendTo(this.$el.find(l.itemInsertPath)), w.mousedown(o), w.mouseover(s)
                }
                var x = a(this.textbox).offset(), I = x.top + a(this.textbox).height() - a(document.body).scrollTop(), C = d ? 600 : 400, T = Math.max(this.textbox.offsetWidth, C), S = "300px", M = a(this.textbox).parent().parent(), A = M.offset().left + M.width(), k = x.left + T, _ = k > A ? x.left - (k - A) : x.left;
                (M.width() > 160 && M.width() < 190 || M.width() > 380 && M.width() < 400) && d && (_ = 0);
                var D = this.maxItem, E = 24, $ = parseInt(this.$el.css("paddingBottom"));
                S = t.length > D ? E * D - $ : "auto", /conversationcompose/i.test(window.location.href) && (S = t.length > 5 ? "125px" : "auto"), this.$el.css({
                    width: T + "px",
                    height: S,
                    overflowY: "auto",
                    top: I,
                    left: _
                }), this.selectItem(0), this.isShow = !0, n.prototype.show.apply(this, arguments), this.$el.scrollTop(0), t[t.length - 1].groupId && t[t.length - 1].groupId.length > 0 && top.BH("addr_Success_ThinkGroup")
            }
        }, watchInputContentChange: function (t) {
            function i() {
                s.onItemSelect(this)
            }

            function o() {
                s.selectItem(1 * this.getAttribute("index"))
            }

            var s = this;
            this.hide();
            var r;
            if (t.content ? r = this.onInput(t.content) : this.trigger("fillDefault", function (e) {
                    r = e
                }), r && r.length && !this.isShow) {
                this.el.parentNode != document.body && this.body.appendChild(this.el), this.clear();
                var l = this.options, d = 7, c = this.$el.find(l.itemInsertPath);
                this.$el.css({fontFamily: "Arial, 'Microsoft YaHei'"});
                var p, u, h = this.$el.find("#atHeader");
                !h.length && t.showHeader && (u = t.headerContent || "选择联系人或轻敲空格完成输入", p = ['<div id="atHeader" style="background-color:#f0f0f0;">', '<a style="height:24px;line-height:30px;padding:0 15px;color:#666;cursor: default;">', u, "</a>", "</div>"].join(""), c.before(p)), t.isShowAll && (r = [{
                    value: "atEveryBody@" + window.top.mailDomain,
                    text: "所有人"
                }].concat(r));
                for (var m = 0, f = r.length > d ? d : r.length; f > m; m++) {
                    var g = r[m], v = e(l.itemTemplate);
                    v.attr("index", m), v.attr("data-value", g.value), v.attr("data-isself", g.isSelf), v.find(l.itemContentPath).html(g.text), v.appendTo(this.$el.find(l.itemInsertPath)), v.mousedown(i), v.mouseover(o)
                }
                !function () {
                    a(s.body).off("keydown.menuPop").on("keydown.menuPop", function (e) {
                        var t = a(s.body).find("div.menuPop").is(":visible");
                        t && s.onTextBoxKeyDown(e)
                    })
                }();
                var y = t.offset.left + this.$el.width() > a(s.body).width() ? t.offset.left - this.$el.width() : t.offset.left, w = t.offset.top + this.$el.height() > a(s.body).height();
                a.browser.mozilla || $B.is.ie ? w && a(s.body).closest("html").animate({scrollTop: t.offset.top}) : w && a(s.body).animate({scrollTop: t.offset.top});
                var b = t.showHeader ? 24 * (f + 1) + 6 : 24 * f, x = t.offset.top + t.height + (t.dy || 0);
                if ("welcome" == t.comeFrom && (x -= t.bodyScrollHeight || 0), this.$el.css({
                        width: "auto",
                        height: b + "px",
                        overflowY: "auto",
                        top: x,
                        left: y + (t.dx || 0)
                    }), l.maxItem && l.maxItem > 0) {
                    var I = l.maxItem, C = 24;
                    this.$el.css({height: list.length > I ? C * I + "px" : "auto"})
                }
                this.selectItem(0), this.isShow = !0, n.prototype.show.apply(this, arguments)
            }
        }, hide: function () {
            this.isShow && (this.el.style.display = "none", this.clear(), this.isShow = !1)
        }, utilFocusItem: function (e) {
            e.attr("i_selected", 1), e.find("a").css({
                background: "#666",
                color: "#fff",
                borderRadius: "4px"
            }), e.addClass("selected"), e.find("span").css("color", "#ffffff"), e.find(".cont_span").css("color", "#b1b1b1"), e.find(".i-writeList-p").css("backgroundPosition", "-214px -695px")
        }, utilBlurItem: function (e) {
            e.attr("i_selected", 0), e.find("a").css({
                backgroundColor: "#fff",
                color: "#666",
                borderRadius: "4px"
            }), e.removeClass("selected"), e.find("span").css("color", "#666"), e.find(".cont_span").css("color", "#b1b1b1"), e.find(".i-writeList-p").css("backgroundPosition", "-191px -695px")
        }, utilScrollToElement: function (e, t) {
            var i = {top: this.getSelectedIndex() * a(t).height()};
            i.bottom = i.top + t.offsetHeight;
            var o = {top: e.scrollTop, bottom: e.scrollTop + e.offsetHeight};
            o.top > i.top ? e.scrollTop -= o.top - i.top : o.bottom < i.bottom && (e.scrollTop += i.bottom - o.bottom)
        }, clear: function () {
            var e = this.options;
            e.itemInsertPath ? this.$el.find(e.itemInsertPath).html("") : e.itemPath && this.$el.find(e.itemPath).remove()
        }, onTextBoxChange: function (e) {
            var t = this, i = o.Event.KEYCODE;
            switch (e && e.keyCode) {
                case i.UP:
                case i.DOWN:
                case i.LEFT:
                case i.RIGHT:
                    return
            }
            this.hide(), clearTimeout(this.TipMessageTimer);
            var a = this.options.textbox.value.trim();
            if ("" == a)return this.TipMessageLimit = !0, top.M139.UI.TipMessage.hide(), !1;
            this.TipMessageLimit = !1;
            var n = this.onInput(a), r = this.onInputGroup(a);
            if (n = n.concat(r))if (n.length >= s)this.show(n); else {
                var l = s - n.length;
                this.CurrentTime = (new Date).getTime();
                var d = {listLength: l, currentTime: t.CurrentTime};
                this._onInput(a, d, function (e, i) {
                    if (n = n.concat(e), n.length > 0) {
                        var o = t.options.textbox.value.trim();
                        if (i && t.CurrentTime != i || "" == o)return !1;
                        clearTimeout(t.TipMessageTimer), top.M139.UI.TipMessage.hide(), t.show(n)
                    } else clearTimeout(t.TipMessageTimer), top.M139.UI.TipMessage.hide()
                })
            }
        }, handlerEnter: function (e) {
            var t = this.getSelectedItem();
            if (null != t) {
                var i = t.data("groupid");
                i ? this.onGroupSelect(t) : this.onItemSelect(t)
            }
            e.keyCode == o.Event.KEYCODE.ENTER && o.Event.stopEvent(e)
        }, handlerKeyUp: function (e) {
            var t = this.getSelectedIndex();
            t >= 0 && (t--, t = 0 > t ? t + this.getItems().length : t, this.selectItem(t)), o.Event.stopEvent(e)
        }, handlerKeyDown: function (e) {
            var t = this.getSelectedIndex();
            if (t >= 0) {
                var i = this.getItems().length;
                t = (t + 1) % i, this.selectItem(t)
            }
            o.Event.stopEvent(e)
        }, onTextBoxKeyDown: function (e) {
            var t = o.Event.KEYCODE;
            switch (e = e || event, e.keyCode) {
                case t.SPACE:
                case t.TAB:
                case t.ENTER:
                    this.handlerEnter(e);
                    break;
                case t.UP:
                    this.handlerKeyUp();
                    break;
                case t.DOWN:
                    this.handlerKeyDown();
                    break;
                case t.RIGHT:
                case t.LEFT:
                    this.hide();
                    break;
                default:
                    return
            }
        }
    }));
    var r = {
        template: ['<div class="menuPop shadow popClose" style="min-width: 300px; z-index: 6024; padding:0;padding-bottom:10px; margin: 0px;" tabindex="6">', "<ul></ul>", "</div>"].join(""),
        itemInsertPath: "ul",
        itemPath: "ul > li",
        itemTemplate: '<li class="menuPop-writeList"><a class="address-con" href="javascript:;"><span class="cont"></span></a></li>',
        GroupTemplate: '<i class="i-writeList-p"></i><span></span>',
        itemContentPath: "span:eq(0)",
        itemGroupPath: "span:eq(1)"
    }
}(jQuery, Backbone, _, M139), function (e, t, i, o) {
    var a = M2012.UI.Suggest.InputSuggest;
    o.namespace("M2012.UI.Suggest.AddrSuggest", a.extend({
        initialize: function (e) {
            this.contactModel = top.M2012.Contacts.getModel(), this.filter = e.filter, this.onlyAddr = e.onlyAddr, this.maxItem = e.maxItem, a.prototype.initialize.apply(this, arguments)
        }, onInput: function (e) {
            var t = [];
            if ("" != e) {
                e = e.toLowerCase();
                for (var i = this.contactModel.getInputMatch({
                    keyword: e,
                    filter: this.filter
                }), a = e.length, n = {}, s = 0; s < i.length; s++) {
                    var r = i[s], l = r.info, d = "";
                    if (!n[l.addr + "|" + l.name]) {
                        n[l.addr + "|" + l.name] = 1, "addr" == r.matchAttr ? (matchText = l.addr.substring(r.matchIndex, r.matchIndex + a), d = l.addr.replace(matchText, "[b]" + matchText + "[/b]"), d = '"' + l.name.replace(/\"/g, "") + '"<' + d + ">", d = o.Text.Html.encode(d).replace("[b]", "<span style='font-weight:bold'>").replace("[/b]", "</span>")) : "name" == r.matchAttr ? (matchText = l.name.substring(r.matchIndex, r.matchIndex + a), d = l.name.replace(matchText, "[b]" + matchText + "[/b]"), d = '"' + d.replace(/\"/g, "") + '"<' + l.addr + ">", d = o.Text.Html.encode(d).replace("[b]", "<span style='font-weight:bold'>").replace("[/b]", "</span>")) : (d = '"' + l.name.replace(/\"/g, "") + '"<' + l.addr + ">", d = o.Text.Html.encode(d));
                        var e = l.addr;
                        this.onlyAddr || (e = "email" == this.filter ? o.Text.Email.getSendText(l.name, l.addr) : o.Text.Mobile.getSendText(l.name, l.addr));
                        var c = l.jianpin, p = l.quanpin;
                        t.push({text: d, value: e, name: l.name, jianPin: c, quanPin: p, isCompany: l.isCompany})
                    }
                }
                delete n
            }
            return t
        }, TipMessageTimer: null, TipMessageLimit: !1, _onInput: function (e, t, i) {
            var a = this, n = [];
            "" != e && top.hasCompanyContacts ? (this.TipMessageTimer = setTimeout(function () {
                a.TipMessageLimit ? clearTimeout(a.TipMessageTimer) : top.M139.UI.TipMessage.show("正在加载中...")
            }, 1e3), e = e.toLowerCase(), top.M2012.Contacts.API.fuzzyQuery({
                data: {
                    Keyword: e,
                    PageIndex: "1",
                    MaxRecInPage: t.listLength.toString(),
                    CurrentTime: t.currentTime.toString(),
                    RangeType: "1"
                }, success: function (t) {
                    if (t && t.data && t.data.list) {
                        for (var s = t.data.currentTime, r = t.data.list || [], l = r.length, d = 0; l > d; d++) {
                            var c = r[d], p = o.Text.Html.encode(c.orgName), u = o.Text.Html.encode(c.corporationName), h = c.name, m = c.email_139, f = c.phone, g = c.jianPin, v = c.quanPin, y = "", w = "", b = e.length, x = m, I = "email" == a.filter, C = I ? m : f;
                            if (-1 != h.indexOf(e)) {
                                var T = h.indexOf(e);
                                y = h.substr(0, T) + "[b]" + h.substr(T, b) + "[/b]" + h.substr(T + b)
                            } else if (-1 == h.indexOf(e) && -1 != C.indexOf(e)) {
                                var T = C.indexOf(e);
                                w = C.substr(0, T) + "[b]" + C.substr(T, b) + "[/b]" + C.substr(T + b)
                            }
                            y = y ? y : h, w = w ? w : C, w = '"' + y.replace(/\"/g, "") + '"<' + w + ">", w = o.Text.Html.encode(w).replace("[b]", "<span style='font-weight:bold'>").replace("[/b]", "</span>"), a.onlyAddr || (x = I ? o.Text.Email.getSendText(h, m) : o.Text.Mobile.getSendText(h, f));
                            var S = {
                                isCompany: !0,
                                orgName: p,
                                corporationName: u,
                                name: h,
                                jianPin: g,
                                quanPin: v,
                                text: w,
                                value: x
                            };
                            n.push(S)
                        }
                        i(n, s)
                    }
                }, fail: function () {
                    i(n)
                }, error: function () {
                    i(n)
                }
            })) : i(n)
        }, onInputGroup: function (e) {
            var t = [], i = [];
            if ("" != e) {
                e = e.toLowerCase(), t = this.contactModel.get("data").groups;
                for (var a = 0; a < t.length; a++) {
                    var n = t[a].GroupId, s = t[a].GroupName;
                    this.isEffectiveGroup(n) && "读信联系人" != s && s && -1 != s.indexOf(e) && i.push({
                        groupName: o.Text.Html.encode(s),
                        groupId: t[a].GroupId
                    })
                }
            }
            return this.groupSort(i)
        }, isEffectiveGroup: function (e) {
            var t = this.contactModel.getGroupMembers(e);
            if (t.length > 0)for (var i = 0; i < t.length; i++)if (t[i].emails.length > 0)return !0;
            return !1
        }, groupSort: function (e) {
            for (var t = [], i = [], o = [], a = [], n = 0; n < e.length; n++)/[\u4e00-\u9fa5]+/.test(e[n].groupName) ? t.push(e[n]) : /^[a-zA-Z]+/.test(e[n].groupName) ? i.push(e[n]) : o.push(e[n]);
            return t && t.length > 0 && t.sort(this.groupSort2), i && i.length > 0 && i.sort(this.groupSort2), o && o.length > 0 && o.sort(this.groupSort2), a.concat(t, i, o)
        }, groupSort2: function (e, t) {
            return e.groupName.localeCompare(t.groupName)
        }
    })), e.extend(M2012.UI.Suggest.AddrSuggest, {
        create: function (e) {
            var t = new M2012.UI.Suggest.AddrSuggest(e);
            return t
        }
    })
}(jQuery, Backbone, _, M139), function (e, t, i, o) {
    var a = e, n = o.View.ViewBase;
    o.namespace("M2012.UI.Suggest.InputAssociate", n.extend({
        initialize: function (e) {
            e && e.richInputBox || console.log("创建自动联想发件人组件需要传入地址输入框组件实例！"), this.richInputBox = e.richInputBox, this.jContainer = e.richInputBox.jAddrTipsContainer, this.contactsModel = e.richInputBox.contactsModel, this.options = e, this.response = {
                isSuccess: !0,
                requestEmail: "",
                emailList: []
            }, this.responseCache = [], this.emailsStr = "", this.emailsStrCache = [], this.isWaiting = !1, this.maxAddrs = 5, n.prototype.initialize.apply(this, arguments)
        }, render: function () {
            var e = this;
            e.timeout && clearTimeout(e.timeout), e.timeout = setTimeout(function () {
                var t = e.richInputBox.getInputBoxItems();
                t = t.ASC(), e.emailsStr = e.getEmailsStr(t);
                var i = e.getResponse(e.emailsStr);
                if (t.length && t.length > 20 && e.richInputBox.validEmailAddress(), i && i.isSuccess)e.callback(i); else if (t.length > 0 && t.length <= 20) {
                    if (e.emailsStrCache.push(e.emailsStr), !e.isWaiting) {
                        e.emailsStr = e.emailsStrCache.pop(), e.isWaiting = !0;
                        var o = "<GetAudienceEmailList><UserNumber>{0}</UserNumber><EmailList>{1}</EmailList></GetAudienceEmailList>";
                        o = o.format(top.$User.getUid(), e.emailsStr), $RM.call("GetAudienceEmailList", o, function (t) {
                            e.successHandler(t.responseData)
                        }, {error: e.error})
                    }
                } else e.jContainer.length && e.jContainer.html().indexOf("您是否在找") > -1 && e.jContainer.hide()
            }, 50)
        }, getResponse: function (e) {
            if (e)for (var t = this, i = t.responseCache, o = 0, a = i.length; a > o; o++) {
                var n = i[o];
                if (n.requestEmail == e)return n
            }
        }, getEmailsStr: function (e) {
            if (!e)return "";
            for (var t = [], i = 0; i < e.length; i++)t.push($T.Email.getEmail(e[i]));
            return t.join(",")
        }, successHandler: function (e) {
            var t = this;
            t.isWaiting = !1, e && e.EmailList ? (t.response.isSuccess = !0, t.response.requestEmail = t.emailsStr, t.response.emailList = e.EmailList, t.responseCache.push(t.response), t.callback(t.response)) : t.richInputBox.validEmailAddress()
        }, callback: function (e) {
            var t = this;
            if (e.isSuccess) {
                var i = e.emailList, o = i.length > t.maxAddrs ? t.maxAddrs : i.length;
                if (o > 0) {
                    for (var n = "您是否在找：", s = 0; o > s; s++) {
                        var r = i[s];
                        s > 0 && (n += ","), n += t.getContactHtml(r)
                    }
                    for (var l = M2012.UI.RichInput.instances, s = 0; s < l.length; s++)l[s].hideAddressTips(!0);
                    t.options.richInputBox.showAddressTips({html: n}), t.jContainer.unbind("click").bind("click", function (e) {
                        var i = a(e.target);
                        if ("a" == i[0].nodeName.toLowerCase()) {
                            var o = i.attr("rel");
                            if ("addrInfo" == o) {
                                t.richInputBox.insertItem(i.attr("title")), t.richInputBox.focus(), top.BH("compose_recommendContacts"), i.remove();
                                var n = t.jContainer.find("a[rel='addrInfo']");
                                0 == n.size() && t.options.richInputBox.hideAddressTips(!0)
                            }
                        }
                    })
                } else t.options.richInputBox.hideAddressTips(!0);
                t.richInputBox.validEmailAddress()
            }
        }, error: function () {
            this.isWaiting = !1
        }, getContactHtml: function (e) {
            function t() {
                var e = i.contactsModel.getContactsById(o), t = e && e.name ? e.name : "";
                if (!t) {
                    var n = i.contactsModel.getContactsByEmail(a);
                    n && n.length > 0 && (t = n[0].name)
                }
                return t ? t : a.split("@")[0]
            }

            var i = this, o = e.Serialid, a = e.Email, n = t(), s = n.length, r = n;
            s > 12 && (r = n.substring(0, 9) + "...");
            var l = '"' + n.replace(/\"/g, "") + '"<' + a + ">", d = '<a href="javascript:;" hidefocus="1" title="' + $T.Html.encode(l) + '" rel="addrInfo">' + $T.Html.encode(r) + "</a>";
            return d
        }
    }))
}(jQuery, Backbone, _, M139), function (e, t, i, o) {
    var a = e, n = o.View.ViewBase;
    o.namespace("M2012.UI.Suggest.InputCorrect", n.extend({
        initialize: function (e) {
            e && e.richInputBox || console.log("创建收件人地址域名纠错组件需要传入地址输入框组件实例！"), this.richInputBox = e.richInputBox, this.jContainer = e.richInputBox.jAddrDomainTipsContainer, this.response = {
                isSuccess: !0,
                requestDomain: "",
                suggestions: {}
            }, this.responseCache = [], this.domainsStr = "", this.domainsStrCache = [], this.isWaiting = !1, n.prototype.initialize.apply(this, arguments)
        }, suggesDomainTemplate: "", callApi: o.RichMail.API.call, render: function () {
            var e = this;
            e.timeout && clearTimeout(e.timeout), e.timeout = setTimeout(function () {
                var t = e.richInputBox.getInputBoxItemsDomain();
                t = t.ASC(), e.domainsStr = t.join(",");
                var i = e.getResponse(e.domainsStr);
                i && i.isSuccess ? e.callback(i) : t.length > 0 ? (e.domainsStrCache.push(e.domainsStr), e.isWaiting || (e.isWaiting = !0, e.callApi("mbox:checkDomain", {domain: t}, function (t) {
                    e.successHandler(t.responseData)
                }, {error: e.error}))) : e.jContainer.hide()
            }, 50)
        }, getResponse: function (e) {
            if (e)for (var t = this, i = t.responseCache, o = 0, a = i.length; a > o; o++) {
                var n = i[o];
                if (n.requestDomain == e)return n
            }
        }, successHandler: function (e) {
            var t = this;
            t.isWaiting = !1, e && e["var"] && e["var"].suggestions && (t.response.isSuccess = !0, t.response.requestDomain = t.domainsStr, t.response.suggestions = e["var"].suggestions, t.responseCache.push(t.response), t.callback(t.response))
        }, callback: function (e) {
            var t = this;
            if (e.isSuccess) {
                var i = '<p class="gray">我们发现您输入的地址可能有误，请修改：</p>', o = [], a = 0, n = e.suggestions;
                for (var s in n) {
                    a++;
                    var r = n[s];
                    t.richInputBox.showErrorDomain(s), o.push(t.getDomainHtml(s, r))
                }
                a > 0 ? (i += o.join(""), this.jContainer.html(i).show(), this.bindClickEvent()) : this.jContainer.hide()
            }
        }, bindClickEvent: function () {
            var e = this;
            e.jContainer.unbind("click").bind("click", function (t) {
                var i = a(t.target);
                if ("a" == i[0].nodeName.toLowerCase()) {
                    var o = i.attr("rel");
                    if ("domain" == o) {
                        var n = i.attr("domain"), s = i.parent().attr("domain");
                        e.richInputBox.changItemDomain(s, n), i.parent().remove(), 1 == e.jContainer.find("p").length && e.jContainer.hide(), top.BH("compose_emaildomain_correct")
                    }
                }
            })
        }, getDomainHtml: function (e, t) {
            for (var i = '<p domain="{errDomain}">{errDomain} → {sugDomainHtml}</p>', o = [], a = 0; a < t.length; a++)a > 0 && o.push("，"), o.push('<a href="javascript:;" hidefocus="1" rel="domain" domain=' + t[a] + ">" + t[a] + "</a>");
            return $T.format(i, {errDomain: e, sugDomainHtml: o.join("")})
        }, error: function () {
            this.isWaiting = !1
        }
    }))
}(jQuery, Backbone, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = "M2012.UI.RichInput.View";
    i.namespace(n, a.extend({
        initialize: function (e) {
            this.options = e || {}, M2012.UI.RichInput.instances.push(this), this.id = M2012.UI.RichInput.instances.length, M2012.UI.RichInput.DocumentView.create(e), this.tipPlace = e.tipPlace || "top";
            var t = document.createElement("div"), i = {
                offset: "-28px",
                arrow: "tipsBottom",
                zIndex: parseInt(e.zIndex) || 3
            };
            "bottom" == this.tipPlace && (i = {
                offset: "29px",
                arrow: "tipsTop",
                zIndex: parseInt(e.zIndex) || 3
            }), t.innerHTML = $T.format(this.template, i);
            var n = e.maxLength || "50";
            "none" != e.maxLength && o(t).find(".addrText-input").attr("maxLength", n), e.border && o(t).find("div.ItemContainer").css("border", e.border), e.heightLime && o(t).children().css({
                "overflow-y": "auto",
                "max-height": e.heightLime + "px",
                _height: 'expression(this.scrollHeight > 50 ? "' + e.heightLime + 'px" : "auto")'
            });
            var s = t.firstChild;
            this.type = e.type, this.contactsModel = M2012.Contacts.getModel(), this.model = new Backbone.Model, this.change = e.change || function () {
                }, this.errorfun = e.errorfun || null, this.setElement(s), this.jTextBox = this.$("input"), this.textbox = this.jTextBox[0], this.textboxView = new M2012.UI.RichInput.TextBoxView({
                richInput: this,
                element: this.$("div.addrText")
            }), this.jContainer = this.$el, this.container = this.el, this.jItemContainer = this.$(this.itemContainerPath), this.jAddrTipsContainer = this.$(this.addrTipsPath), this.jAddrDomainTipsContainer = this.$(this.addrDomainTipsPath), this.items = {}, this.hashMap = {};
            var r = e.maxSend || 50;
            return o.isFunction(r) || (r = new Function("", "return " + r)), this.maxSend = r, this.sendIsUpTo = function () {
                return e.sendIsUpTo || this.maxSend() - 5
            }, this.tool = M2012.UI.RichInput.Tool, this.highlight = "undefined" == typeof e.highlight ? !0 : e.highlight, a.prototype.initialize.apply(this, arguments)
        },
        name: n,
        template: ['<div class="p_relative RichInputBox writeTable" style="z-index:{zIndex};">', '<div class="tips write-tips EmptyTips" style="left:0;top:{offset};display:none;">', '<div class="tips-text EmptyTipsContent">', "</div>", '<div class="{arrow} diamond"></div>', "</div>", '<div class="ItemContainer writeTable-txt clearfix" unselectable="on" style="cursor: text;/**overflow-x:hidden;*/">', '<div class="PlaceHold" style="position:absolute;color: #ccc;display:none;left:3px;"></div>', '<div class="addrText" style="margin-top: -3px; *margin:0 0 0 3px;">', '<input type="text" style="width:100%" class="addrText-input">', "</div>", "</div>", '<div class="addnum" style="display:none"></div>', '<div class="pt_5 addrDomainCorrection" style="display:none"></div>', "</div>"].join(""),
        itemPath: ".addrBase",
        itemContainerPath: "div.ItemContainer",
        addrTipsPath: "div.addnum",
        addrDomainTipsPath: "div.addrDomainCorrection",
        render: function () {
            var e = this.options, t = "", i = $D.getHTMLElement(e.container);
            switch (i.innerHTML = "", i.appendChild(this.el), this.container = i, this.initEvent(), i.id) {
                case"evocationContainer":
                    this.comefrom = "simplemail", t = o(i).closest(".boxIframe").find(".DL_DialogTitle").text(), t = -1 !== t.indexOf("短信") ? "_sms" : -1 !== t.indexOf("彩信") ? "_mms" : -1 !== t.indexOf("贺卡") ? "_greetingcard" : "", this.comefrom += t;
                    break;
                case"to-edit":
                case"cc-edit":
                case"bcc-edit":
                    this.comefrom = "conversation";
                    break;
                default:
                    this.comefrom = "compose"
            }
            M2012.UI.RichInput.Tool.unselectable(this.el.parentNode), M2012.UI.RichInput.Tool.unselectable(this.el), M2012.UI.RichInput.Tool.unselectable(this.el.firstChild), this.options.placeHolder && this.setTipText(this.options.placeHolder);
            for (var n = e.plugins, s = 0; s < n.length; s++)new n[s](this, e.maxItem);
            return a.prototype.render.apply(this, arguments)
        },
        bindContextMenu: function (e) {
            function t(e) {
                var t = e || window.event;
                return {
                    x: t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                    y: t.clientY + document.body.scrollTop + document.documentElement.scrollTop
                }
            }

            function i() {
                function e(e, t, i, o) {
                    var a, n = window.navigator.mimeTypes;
                    try {
                        for (a in n)if (n[a][e] == t) {
                            if (void 0 !== i && o.test(n[a][i]))return !0;
                            if (void 0 === i)return !0
                        }
                        return !1
                    } catch (s) {
                        return !1
                    }
                }

                var t = e("type", "application/vnd.chromium.remoting-viewer");
                if (t)return !1;
                var i = "track" in document.createElement("track"), o = "scoped" in document.createElement("style"), a = "v8Locale" in window, n = window.navigator.userAgent.appVersion;
                return i && !o && !a && /Gecko\)\s+Chrome/.test(n) ? !0 : !!(i && o && a)
            }

            function o(e) {
                for (var t = 0; t < e.length; t++) {
                    var i = {}, o = e[t];
                    switch (i.id = "rightKeyOperate_" + o, i.bh = "compose_contact_rightKey_" + o, i.command = o, o) {
                        case"cut":
                            i.text = "剪切(Ctrl+X)";
                            break;
                        case"copy":
                            i.text = "复制(Ctrl+C)";
                            break;
                        case"edit":
                            i.text = "编辑";
                            break;
                        case"delete":
                            i.text = "删除(Delete)";
                            break;
                        case"paste":
                            i.text = "粘贴(Ctrl+V)";
                            break;
                        case"selectAll":
                            i.text = "全选(Ctrl+A)"
                    }
                    l.push(i)
                }
                return l
            }

            var a = this, n = e.event, s = e.context || this, r = e.items, l = [], d = t(n);
            window.$rightKeyWin && window.$rightKeyWin.remove(), window.$rightKeyWin = M2012.UI.PopMenu.create({
                width2: 180,
                items: o(r),
                top: d.y + "px",
                left: d.x + "px",
                onItemClick: function (e) {
                    function t(e) {
                        top.$Msg.alert(e, {
                            onClose: function () {
                                a.focus()
                            }
                        })
                    }

                    switch (top.BH(e.bh), window.$rightKeyWin.remove(), e.command) {
                        case"cut":
                            if (!$B.is.ie || i())return void t("您的浏览器安全设置不允许自动执行剪切操作,请使用键盘快捷键(Ctrl+X)来完成");
                            a.cut({isRightKey: !0});
                            break;
                        case"copy":
                            if (!$B.is.ie || i())return void t("您的浏览器安全设置不允许自动执行复制操作,请使用键盘快捷键(Ctrl+C)来完成");
                            a.copy({isRightKey: !0});
                            break;
                        case"edit":
                            a.editItem(s);
                            break;
                        case"delete":
                            a.removeSelectedItems(), !a.getSelectedItems().length && a.focus();
                            break;
                        case"selectAll":
                            a.selectAll();
                            break;
                        case"paste":
                            if (!$B.is.ie || i()) {
                                var o = prompt("因为你的浏览器的安全设置原因，本编辑器不能直接访问你的剪贴板内容，你需要在本对话框重新粘贴一次。\n\n");
                                return void(o && a.insertItem(o))
                            }
                            a.paste({isRightKey: !0})
                    }
                }
            })
        },
        initEvent: function () {
            var e = this;
            this.$el.on("click", o.proxy(this, "onClick")).on("keydown", o.proxy(this, "onKeyDown")).on("mousedown", o.proxy(this, "onMouseDown")).on("mouseup", o.proxy(this, "onMouseUp")), this.$("div.PlaceHold").click(function () {
                e.textbox.select(), e.textbox.focus()
            }), this.model.on("change:placeHolder", function () {
                e.switchTipText()
            }), this.textboxView.on("input", function () {
                e.switchTipText()
            }), this.on("itemchange", function () {
                e.switchTipText()
            }), this.jTextBox.keydown(function (t) {
                e.trigger("keydown", t)
            }).blur(function (t) {
                e.trigger("blur", t)
            }), o(this.container).on("contextmenu", function (t) {
                var i = e.getSelectedItems().length;
                return i ? e.bindContextMenu({
                    event: t,
                    items: ["cut", "copy", "delete"]
                }) : e.bindContextMenu({event: t, items: ["paste", "selectAll"]}), e.focus(), !1
            })
        },
        showEmptyTips: function (e) {
            e = e || "请填写收件人";
            var t = this.$("div.EmptyTips");
            t.show().find("div.EmptyTipsContent").text(e), setTimeout(function () {
                t.hide()
            }, 3e3)
        },
        showCardTips: function (e) {
            msg = e.html || "请填写收件人";
            var t = this.$("div.EmptyTips");
            t.show().find("div.EmptyTipsContent").html(msg), e.flash && i.Dom.flashElement(t), setTimeout(function () {
                t.hide()
            }, 3e3)
        },
        showErrorTips: function (e) {
            var t = this.getErrorItem();
            if (t) {
                e = e || "接收人输入错误";
                var i = this.$("div.EmptyTips");
                i.show().find("div.EmptyTipsContent").text(e);
                var o = t.$el.offset(), a = this.$el.offset();
                i.css({
                    left: o.left - a.left + parseInt(t.$el.width() / 2) - 16,
                    top: o.top - a.top + ("bottom" == this.tipPlace ? 25 : -32)
                }), setTimeout(function () {
                    i.hide()
                }, 3e3)
            }
        },
        getItems: function () {
            var e = [], t = this.items;
            return this.$(this.itemPath).each(function () {
                var i = this.getAttribute("rel"), o = t[i];
                o && e.push(o)
            }), e
        },
        getCurrentItems: function () {
            var e = [];
            return this.jContainer.find(".btnNormal_write").each(function () {
                var t = o(this).attr("title"), i = o(this).find("span[name='addressInfo']").text(), a = o(this).find("b[name='addrName']").text(), n = "";
                i ? (n = '"' + a.replace(/"|\\/g, "") + '"<' + t + ">", e.push(n)) : e.push(t)
            }), e
        },
        getToInstancesItems: function () {
            var e = M2012.UI.RichInput.instances;
            return e[0].getValidationItems().distinct()
        },
        getAllInstancesItems: function () {
            for (var e = M2012.UI.RichInput.instances, t = [], i = 0; i < e.length; i++)t = t.concat(e[i].getValidationItems());
            return t = t.distinct()
        },
        getInputBoxItems: function () {
            return this.getAllInstancesItems()
        },
        getInputBoxItemsDomain: function () {
            var e = [];
            for (var t in this.items) {
                var i = this.items[t];
                i && i.domain && e.push(i.domain)
            }
            return e = e.distinct()
        },
        isRepeat: function (e) {
            var t = this.contactsModel.getAddr(e, this.type);
            if (t && this.hashMap[t]) {
                for (var a in this.items) {
                    var n = this.items[a];
                    if (n && n.hashKey == t) {
                        !o(n.el).hasClass("addrBaseSame") && o(n.el).addClass("addrBaseSame"), i.Dom.flashElement(n.el), setTimeout(function () {
                            o(n.el).hasClass("addrBaseSame") && o(n.el).removeClass("addrBaseSame")
                        }, 300);
                        break
                    }
                }
                return !0
            }
            return !1
        },
        insertItem: function (e, a) {
            a = a || {};
            var n = a.nearItem, s = n && n.isAfter, r = n && n.element, l = a.isFocusItem;
            r || (r = this.textboxView.$el), "function" == typeof this.change && this.change(e);
            for (var d, c, p = t.isArray(e) ? e : this.splitAddr(e), u = this.getInputBoxItems().length, h = !1, m = "", f = 0; f < p.length; f++) {
                if (u == this.maxSend()) {
                    try {
                        if (o.isFunction(this.options.onMaxSend))this.options.onMaxSend(p.length - f); else {
                            var g = top.$User.getServiceItem(), v = !0, y = !1, w = !1, b = '<div><input name="checkbox" id="grounpMailCheckBox" type="checkbox" /><span>使用"群发人数增加400人"特权</span><em id="addMoreSender" style="display:none; padding-left:20px;">您可以再添加400人！</em></div>', x = '<a bh="over_max_mail_number"   href="http://vip.mail.10086.cn/html/index.html?sid=' + top.sid + '" style="color:#0344AE">套餐升级</a>可增加群发人数!', I = top.$App.getConfig("UserData") || {}, C = I.orderInfoList, T = "", S = [], M = [];
                            for (var A in C) {
                                var T = C[A].serviceId, k = C[A].orderStatus;
                                "320" != T || "0" != k && "4" != k || S.push({
                                    serviceId: T,
                                    orderStatus: k
                                }), "210" != T || "0" != k && "4" != k || M.push({serviceId: T, orderStatus: k})
                            }
                            this.options.noTips && (w = !0), "0017" != g && "0016" != g || (v = !1);
                            var _ = "", D = "";
                            null != location.href.match("appmail3.mail.10086.cn") || null != location.href.match("appmail.mail.10086.cn") ? (_ = "http://vip.mail.10086.cn/html/function.html?sid=" + top.sid, D = "http://vip.mail.10086.cn/html/index.html?sid=" + top.sid) : (_ = "http://rm.mail.10086ts.cn/m2015/vipMailcenter/html/function.html?sid=" + top.sid, D = "http://rm.mail.10086ts.cn/m2015/vipMailcenter/html/index.html?sid=" + top.sid);
                            var E = "请减少邮件群发人数", $ = '<a bh="over_max_mail_number"  href="' + D + '"  style="color:#0344AE" target="_blank">套餐升级</a>、<a bh="clickgotoBuyOrderTc"  href="' + _ + '" onclick ="" id="gotoOrderGroupMail" style="color:#0344AE" target="_blank">订购特权</a>可增加群发人数!';
                            if (o("#gotoOrderGroupMail").click(function () {
                                    o(this).data("click", 1)
                                }), this.maxSenders = window.topGetMaxSender || this.maxSend(), m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                    remain: p.length - f,
                                    maxSend: this.maxSenders
                                }), this.noUpgradeTips)m = '接收人数已超过上限<span style="color: #F60;">' + this.maxSend() + "</span>人！"; else {
                                if (1 == p.length)m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSend() + "人</span>!", v ? (0 == S.length ? m += $ : M.length > 0 ? "210" == M[0].serviceId && ("0" == M[0].orderStatus || "4" == M[0].orderStatus) && this.maxSenders > 150 ? m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!" : m += x : this.maxSend() > 50 ? m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!" : m += x, y = !0) : S.length > 0 ? "320" != S[0].serviceId || "0" != S[0].orderStatus && "4" != S[0].orderStatus || ("0017" == g ? M.length > 0 ? "210" == M[0].serviceId && ("0" == M[0].orderStatus || "4" == M[0].orderStatus) && this.maxSenders > 500 ? m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!" : m += b : this.maxSend() > 400 ? m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!" : m += b : M.length > 0 ? "210" == M[0].serviceId && ("0" == M[0].orderStatus || "4" == M[0].orderStatus) && this.maxSenders > 300 ? m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!" : m += x + b : this.maxSend() > 200 ? m = '发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!" : m += x + b, y = !0, E = "") : m += "0017" == g ? '<a bh="clickgotoBuyOrderTc"  href="' + _ + '" onclick ="" id="gotoOrderGroupMail" style="color:#0344AE" target="_blank">订购特权</a>可增加群发人数!' : $; else if (S.length > 0) {
                                    if ("320" == S[0].serviceId && ("0" == S[0].orderStatus || "4" == S[0].orderStatus)) {
                                        if (o("#grounpMailCheckBox").is(":checked")) {
                                            var c = o("#addMoreSender");
                                            c.show(), i.Dom.flashElement(c)
                                        }
                                        "0017" == g ? M.length > 0 ? "210" == M[0].serviceId && ("0" == M[0].orderStatus || "4" == M[0].orderStatus) && this.maxSenders > 500 ? m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                            remain: p.length - f,
                                            maxSend: this.maxSenders
                                        }) : m += b : this.maxSenders > 400 ? m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                            remain: p.length - f,
                                            maxSend: this.maxSenders
                                        }) : m += b : "0016" == g ? M.length > 0 ? "210" == M[0].serviceId && ("0" == M[0].orderStatus || "4" == M[0].orderStatus) && this.maxSenders > 300 ? m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                            remain: p.length - f,
                                            maxSend: this.maxSenders
                                        }) : m += x + b : this.maxSenders > 200 ? m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                            remain: p.length - f,
                                            maxSend: this.maxSenders
                                        }) : m += x + b : M.length > 0 ? "210" == M[0].serviceId && ("0" == M[0].orderStatus || "4" == M[0].orderStatus) && this.maxSenders > 150 ? m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                            remain: p.length - f,
                                            maxSend: this.maxSenders
                                        }) : m += x + b : this.maxSenders > 50 ? m = i.Text.Utils.format('发送邮件人数已超过上限：<span style="color: #F60;">' + this.maxSenders + "人</span>!", {
                                            remain: p.length - f,
                                            maxSend: this.maxSenders
                                        }) : m += x + b
                                    }
                                } else m += "0017" == g ? '<a bh="clickgotoBuyOrderTc"  href="' + _ + '" onclick ="" id="gotoOrderGroupMail" style="color:#0344AE" target="_blank">订购特权</a>可增加群发人数!' : "0016" == g ? $ : $;
                                y = !0
                            }
                        }
                        this.showAddressTips({
                            html: m,
                            flash: !0,
                            isShowLong: y,
                            noTips: w
                        }), o("#grounpMailCheckBox").change(function (e) {
                            console.log(o(e.target).attr("checked")), window.groupSendFlag = !!o(e.target).attr("checked")
                        })
                    } catch (B) {
                    }
                    h = !0;
                    break
                }
                u++, d = p[f].trim(), "" != d && (a.testRepeat !== !1 && this.isRepeat(d) || (c = new M2012.UI.RichInput.ItemView({
                    richInput: this,
                    text: d,
                    itemId: this.getNextItemId(),
                    type: this.type,
                    limitMailDomain: this.options.limitMailDomain,
                    errorMessage: this.options.validateMsg || "地址有误，请双击修改",
                    itemWidth: this.options.itemWidth
                }).render(), M2012.UI.RichInput.Tool.unselectable(c.el), this.items[c.itemId] = c, this.model.set("currentItem", c), c.error || (this.hashMap[c.hashKey] = !0), s ? r.after(c.$el) : r.before(c.$el), l && c.select()))
            }
            return this.onItemChange({breakSender: h}), c
        },
        onItemChange: function (e) {
            if (e = e || {}, !e.breakSender) {
                var t = (this.jAddrTipsContainer, this.getInputBoxItems().length), i = "";
                if (t >= this.sendIsUpTo()) {
                    o("#checkedTips").remove();
                    var a = this.maxSend() - t;
                    i = '还可添加<strong class="c_ff6600">' + a + "</strong>人", this.showAddressTips({html: i})
                } else this.hideAddressTips()
            }
            try {
                if (window.location.href.indexOf("html/compose_v3.html") > -1) {
                    top.$App.off("insertItem");
                    var n = this.getToInstancesItems().length;
                    n >= 3 && top.$App.trigger("insertItem", {totalLength: n})
                }
            } catch (s) {
            }
            this.trigger("itemchange")
        },
        showAddressTips: function (e) {
            if (e.noTips)return void top.M139.UI.TipMessage.show("接收人数已超过上限", {delay: 2e3, className: "msgRed"});
            var t = this;
            this.jAddrTipsContainer.html(e.html).show(), e.flash && i.Dom.flashElement(this.jAddrTipsContainer), e.isShowLong || (clearTimeout(this.hideAddressTipsTimer), this.hideAddressTipsTimer = setTimeout(function () {
                t.hideAddressTips()
            }, 5e3))
        },
        hideAddressTips: function (e) {
            function t() {
                i.jAddrTipsContainer.hide(), i.trigger("hideAddressTips")
            }

            var i = this;
            if (e)return void t();
            var o = i.jAddrTipsContainer.find("a[rel='addrInfo']");
            0 == o.size() && t()
        },
        getTextBoxNextItem: function () {
            var e = this.textboxView.el.nextSibling;
            if (!e)return null;
            var t = e.getAttribute("rel");
            return t ? this.items[t] : void 0
        },
        getTextBoxPrevItem: function () {
            var e = this.textboxView.el.previousSibling;
            if (!e)return null;
            var t = e.getAttribute("rel");
            return t ? this.items[t] : void 0
        },
        unselectAllItems: function () {
            for (var e in this.items) {
                var t = this.items[e];
                t && t.unselect()
            }
        },
        selectAll: function () {
            for (var e in this.items) {
                var t = this.items[e];
                t && t.select()
            }
        },
        copy: function (e) {
            for (var t = this, o = this.getSelectedItems(), a = [], n = 0; n < o.length; n++)a.push(o[n].allText);
            e.isRightKey && window.clipboardData && (window.clipboardData.clearData(), window.clipboardData.setData("Text", a.join(";")) || t.model.set("isNotAllowAccessClip", !0)), M2012.UI.RichInput.Tool.Clipboard.setData(a), setTimeout(function () {
                i.Dom.focusTextBox(t.textbox)
            }, 0)
        },
        cut: function (e) {
            if (this.copy(e), !this.model.get("isNotAllowAccessClip")) {
                for (var t = this.getSelectedItems(), i = 0; i < t.length; i++)t[i].remove();
                this.inputAssociateView && this.inputAssociateView.render()
            }
        },
        paste: function (e) {
            var t = this;
            setTimeout(function () {
                var o = t.textbox.value;
                e.isRightKey && window.clipboardData && (t.textbox.value = window.clipboardData.getData("Text"), o = window.clipboardData.getData("Text")), (/[;,；，]/.test(o) || "email" == t.type && i.Text.Email.isEmailAddr(o) || "mobile" == t.type && i.Text.Mobile.isMobile(o)) && t.createItemFromTextBox()
            }, 0)
        },
        getSelectedItems: function (e) {
            var t = [], i = this.items;
            if ("drag" == e)return this.jItemContainer.find(".btnNormal_writeOn").each(function () {
                var e = o(this).attr("title");
                for (var a in i) {
                    var n = i[a];
                    -1 != n.allText.indexOf(e) && t.push(n)
                }
            }), t;
            for (var a in this.items) {
                var n = this.items[a];
                n && n.selected && t.push(n)
            }
            return t
        },
        clear: function () {
            for (var e in this.items) {
                var t = this.items[e];
                t && t.remove()
            }
        },
        removeSelectedItems: function () {
            for (var e = this.getSelectedItems(), t = 0; t < e.length; t++)e[t].remove()
        },
        editItem: function (e) {
            this.textboxView.setEditMode(e)
        },
        splitAddr: function (e) {
            var t = [];
            if ("email" == this.type) {
                for (var a = i.Text.Email.splitAddr(e) || [], n = 0; n < a.length; n++) {
                    var s = a[n].trim();
                    s && -1 == s.indexOf("@") && (s = s + "@" + top.$App.getMailDomain()), s && -1 == o.inArray(s, t) && t.push(s)
                }
                return t
            }
            return "mobile" == this.type ? i.Text.Mobile.splitAddr(e) : []
        },
        createItemFromTextBox: function (e) {
            var t = this.textbox, i = t.value.trim();
            !i && e && e.value && (i = e.value.trim(), console.warn && console.warn("use the firefox version,value: " + i)), "" != i && i != this.tipText && ("email" == this.type && /^\d+$/.test(i) && (i = i + "@" + (top.$App && top.$App.getMailDomain() || "139.com")), this.textboxView.setValue(""), this.insertItem(i), this.inputAssociateView && this.inputAssociateView.render(), this.inputCorrectView && this.inputCorrectView.render(), this.focus())
        },
        moveTextBoxTo: function (e, t) {
            e && (t ? e.after(this.textboxView.el) : e.before(this.textboxView.el), window.focus(), this.jTextBox.focus())
        },
        moveTextBoxToLast: function () {
            var e = this.textboxView.el;
            e.parentNode.lastChild != e && e.parentNode.appendChild(e), o.browser.msie && window.focus()
        },
        disposeItemData: function (e) {
            var t = this.items;
            delete t[e.itemId], this.hashMap = {};
            for (var i in t) {
                var e = t[i];
                e.error || (this.hashMap[e.hashKey] = !0)
            }
            this.onItemChange()
        },
        trySelect: function (e, t) {
            var i, o, a, n, s, r;
            if (e.y == t.y) {
                if (e.x == t.x)return;
                o = Math.min(e.x, t.x), a = Math.max(e.x, t.x)
            } else e.y < t.y ? (o = e, a = t) : (o = t, a = e);
            n = this.jContainer.find(this.itemPath), n.length > 0 && (s = n.eq(0).height());
            for (var l = 0; l < n.length; l++) {
                var d = n.eq(l), c = d.offset(), p = c.left + d.width(), u = c.top + s + this.tool.getPageScrollTop(this.options), h = !1;
                i ? a.x > c.left && a.y > c.top ? h = !0 : a.y - c.top > s && (h = !0) : (o.x < p && o.y <= u || u - o.y >= s) && (i = d, h = !0), r = this.items[d.attr("rel")], h ? 0 == r.selected && r.select() : r.unselect()
            }
        },
        itemIdNumber: 0,
        getNextItemId: function () {
            return this.itemIdNumber++
        },
        setTipText: function (e) {
            this.model.set("placeHolder", e)
        },
        switchTipText: function () {
            if ("" != this.textbox.value || this.hasItem())this.$(".PlaceHold").hide(); else {
                var e = this.model.get("placeHolder");
                this.$(".PlaceHold").show().text(e)
            }
        },
        focus: function () {
            var e = this;
            try {
                setTimeout(function () {
                    e.textbox.focus()
                }, 100)
            } catch (t) {
            }
        },
        hasItem: function () {
            return this.getItems().length > 0
        },
        getAddrItems: function () {
            for (var e = this.getItems(), t = [], i = 0; i < e.length; i++)e[i].error || t.push(e[i].addr);
            return t
        },
        getValidationItems: function () {
            for (var e = this.getItems(), t = [], i = 0; i < e.length; i++)e[i].error || t.push(e[i].allText);
            return t
        },
        getErrorText: function () {
            var e = this.getErrorItem();
            return e && e.allText
        },
        getErrorItem: function () {
            for (var e = this.getItems(), t = 0; t < e.length; t++)if (e[t].error)return e[t];
            return null
        },
        getClickItemId: function (e) {
            var t = o(e.target).closest(this.itemPath);
            return t.length ? t.attr("rel") : null
        },
        onKeyDown: function (e) {
            var t = i.Event.KEYCODE;
            if ("INPUT" != e.target.tagName || "" == e.target.value)switch ((e.keyCode == t.A && e.ctrlKey || e.keyCode == t.BACKSPACE) && e.preventDefault(), e.keyCode) {
                case t.BACKSPACE:
                case t.DELETE:
                    if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
                        var o = this.getSelectedItems();
                        o.length > 0 && this.moveTextBoxTo(o[0].$el), this.removeSelectedItems(), window.focus(), this.jTextBox.focus()
                    }
                    break;
                case t.A:
                    e.ctrlKey && this.selectAll(e);
                    break;
                case t.C:
                    e.ctrlKey && this.copy(e);
                    break;
                case t.X:
                    e.ctrlKey && this.cut(e);
                    break;
                case t.V:
                    e.ctrlKey && this.paste(e)
            }
        },
        onClick: function (e) {
            if (o(e.target).hasClass("ItemContainer")) {
                var t = M2012.UI.RichInput.Tool.getNearlyElement({
                    richInputBox: this,
                    x: e.clientX,
                    y: e.clientY + M2012.UI.RichInput.Tool.getPageScrollTop(this.options)
                });
                t ? this.moveTextBoxTo(t.element, t.isAfter) : this.textbox.focus()
            }
        },
        onMouseUp: function (e) {
            if (!e.button || 2 != e.button) {
                var t, i, a = this.getClickItemId(e);
                o(document.body).off("mousemove", this.proxyMouseMove), delete this.proxyMouseMove, this.moveStartCount >= 3 || (a && (t = this.items[a], o(e.target).closest("a.quickdelete").length ? (this.unselectAllItems(), t.remove(), t.addDistinctBehavior("contact_click_remove")) : e.ctrlKey || e.shiftKey || (i = this.getSelectedItems(), this.selectArea || this.lastClickItem !== t || (this.unselectAllItems(), 0 == t.selected && t.select()), o.browser.msie && (M2012.UI.RichInput.Tool.captureElement = e.target, e.target.setCapture()))), this.selectArea = !1)
            }
        },
        onMouseDown: function (e) {
            var t = e.target, a = M2012.UI.RichInput;
            e.stopPropagation(), a.Tool.currentRichInputBox = this;
            for (var n = 0; n < a.instances.length; n++) {
                var s = a.instances[n];
                s !== this && o(s.container).is(":visible") && s.unselectAllItems()
            }
            if ("INPUT" != t.tagName && "addnum" != t.className && "addnum" != t.parentNode.className && "addrDomainCorrection" != t.className && "addrDomainCorrection" != t.parentNode.className && "addrDomainCorrection" != t.parentNode.parentNode.className) {
                var r = this.getClickItemId(e);
                this.startPosition = {
                    x: e.clientX,
                    y: e.clientY + M2012.UI.RichInput.Tool.getPageScrollTop(this.options)
                }, this.proxyMouseMove = o.proxy(this, "onMouseMove"), o(document.body).on("mousemove", this.proxyMouseMove), r ? (M2012.UI.RichInput.Tool.dragEnable = !0, items = this.getSelectedItems(), clickItem = this.items[r], e.ctrlKey ? clickItem.selected ? clickItem.unselect() : clickItem.select() : e.shiftKey ? this.shiftSelectItem(clickItem) : (this.lastClickItem = clickItem, 0 == clickItem.selected && (this.unselectAllItems(), clickItem.select())), 1 == this.editMode && this.createItemFromTextBox(), this.moveTextBoxToLast(), this.focus(), i.Event.stopEvent(e)) : (t == this.el || o.contains(this.el, t)) && (!e.ctrlKey, this.selectArea = !0, 0 == this.editMode && this.createItemFromTextBox(), this.moveTextBoxToLast(), this.focus()), this.moveStartCount = 0, M2012.UI.RichInput.Tool.dragItems = this.getSelectedItems("drag"), M2012.UI.RichInput.Tool.currentRichInputBox = this
            }
        },
        onMouseMove: function (e) {
            var t = this.tool;
            if (!(this.editMode || (this.moveStartCount++, this.moveStartCount < 3))) {
                var i = {x: e.clientX, y: e.clientY + t.getPageScrollTop(this.options), target: e.target};
                e.preventDefault(), t.dragEnable ? (t.drawDragEffect(i), t.delay("drawInsertFlag", function () {
                    t.drawInsertFlag(i)
                }, 20)) : this.selectArea && this.trySelect(this.startPosition, i)
            }
        },
        shiftSelectItem: function (e) {
            var t = this.lastClickItem;
            if (t && t != e) {
                var i = this.getItems(), a = o.inArray(t, i), n = o.inArray(e, i), s = Math.min(a, n), r = Math.max(a, n);
                o(i).each(function (e) {
                    e >= s && r >= e ? this.select() : this.unselect()
                })
            }
        },
        showErrorDomain: function (e) {
            var t = this.items, i = "";
            for (var o in t)i = t[o], i.domain == e && i.trigger("errorDomain")
        },
        changItemDomain: function (e, t) {
            var i = this.items, o = "";
            for (var a in i)o = i[a], o.domain == e && o.trigger("changeDomain", {errorDomain: e, domain: t})
        },
        validEmailAddress: function () {
            var e = this.model.get("currentItem");
            if (e) {
                var t = M2012.Contacts.getModel().get("invalidEmails"), i = $Email.getEmail(e.allText);
                if (t && i) {
                    var a = t.split(",");
                    -1 != o.inArray(i, a) && (console.warn && console.warn("is the invalid email: " + i), top.BH && top.BH("compose_success_checkInvalidContact"), e.trigger("validEmailAddress"))
                }
            }
        }
    }));
    var s = M2012.UI.RichInput.instances = [];
    M2012.UI.RichInput.getInstanceByContainer = function (e) {
        for (var t = 0; t < s.length; t++) {
            var i = s[t];
            if (i.container === e || i.jContainer === e)return i
        }
        return null
    }, M2012.UI.RichInput.Tool = {
        getPageScrollTop: function (e) {
            return e && e.scrollContainer ? o(e.scrollContainer).scrollTop() : Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        }, unselectable: function (e) {
            o.browser.msie ? e.unselectable = "on" : (e.style.MozUserSelect = "none", e.style.KhtmlUserSelect = "none")
        }, resizeContainer: function (e, t) {
        }, getNearlyElement: function (e) {
            for (var t, i, o, a, n = e.richInputBox, s = !0, r = n.jContainer.find(n.itemPath), l = [], d = r.eq(0).height(), c = 0; c < r.length; c++)a = r.eq(c), o = a.offset().top, e.y > o && e.y < o + d && l.push(a);
            for (var c = 0; c < l.length; c++) {
                if (a = l[c], i = a.offset().left, e.x < i + a.width() / 2) {
                    t = a, s = !1;
                    break
                }
                t = a
            }
            return t ? {element: t, isAfter: s} : null
        }, bindEvent: function (e, t, i) {
            for (var o in i) {
                var a = i[o];
                t.bind(o, function (t) {
                    return function (i) {
                        return i.richInputBox = e, t.call(this, i)
                    }
                }(a))
            }
        }, draw: function (e, t) {
            window.drawDiv || (window.drawDiv = o("<div style='position:absolute;left:0px;top:0px;border:1px solid blue;'></div>").appendTo(document.body));
            var i = Math.abs(e.x - t.x), a = Math.abs(e.y - t.y);
            drawDiv.width(i), drawDiv.height(a), drawDiv.css({left: Math.min(e.x, t.x), top: Math.min(e.y, t.y)})
        }, Clipboard: {
            setData: function (e) {
                var t = o("<input type='text' style='width:1px;height:1px;overflow:hidden;position:absolute;left:0px;top:0px;'/>").appendTo(document.body).val(e.join(";")).select();
                setTimeout(function () {
                    t.remove()
                }, 0)
            }
        }, hidDragEffect: function () {
            this.dragEffectDiv && this.dragEffectDiv.hide()
        }, drawDragEffect: function (e) {
            this.dragEffectDiv || (this.dragEffectDiv = o("<div style='position:absolute;				border:2px solid #444;width:7px;height:8px;z-index:5000;overflow:hidden;'></div>").appendTo(document.body)), this.dragEffectDiv.css({
                left: e.x + 4,
                top: e.y + 10,
                display: "block"
            })
        }, hidDrawInsertFlag: function () {
            this.drawInsertFlagDiv && this.drawInsertFlagDiv.hide()
        }, drawInsertFlag: function (e) {
            var t, a, n, s;
            if (this.drawInsertFlagDiv || (this.drawInsertFlagDiv = o("<div style='position:absolute;				background-color:black;width:2px;background:black;height:15px;z-index:5000;overflow:hidden;border:0;'></div>").appendTo(document.body)), $B.is.ie && $B.getVersion() > 8 || $B.is.firefox) {
                for (var r = M2012.UI.RichInput.instances.length - 1; r >= 0; r--)if (a = M2012.UI.RichInput.instances[r], !i.Dom.isHide(a.el, !0) && e.y > a.$el.offset().top) {
                    t = a;
                    break
                }
            } else for (var r = 0; r < M2012.UI.RichInput.instances.length; r++)if (a = M2012.UI.RichInput.instances[r], M2012.UI.RichInput.Tool.isContain(a.container, e.target)) {
                t = a;
                break
            }
            t && (s = M2012.UI.RichInput.Tool.getNearlyElement({
                richInputBox: t,
                x: e.x,
                y: e.y
            })), s ? (n = s.element.offset(), this.drawInsertFlagDiv.css({
                left: n.left + (s.isAfter ? s.element.width() + 2 : -2),
                top: n.top + 4,
                display: "block"
            }), this.insertFlag = {nearItem: s, richInputBox: t}) : this.insertFlag = {richInputBox: t}
        }, isContain: function (e, t) {
            for (; t;) {
                if (e == t)return !0;
                t = t.parentNode
            }
            return !1
        }, delay: function (e, t, i) {
            this.delayKeys || (this.delayKeys = {}), this.delayKeys[e] && clearTimeout(this.delayKeys[e].timer), this.delayKeys[e] = {}, this.delayKeys[e].func = t;
            var o = this;
            this.delayKeys[e].timer = setTimeout(function () {
                o.delayKeys[e] = null, t()
            }, i || 0)
        }, fireDelay: function (e) {
            this.delayKeys && this.delayKeys[e] && (this.delayKeys[e].func(), clearTimeout(this.delayKeys[e].timer))
        }, hideBlinkBox: function (e, t) {
            "number" != typeof t && (t = 5e3);
            var i = this;
            i.keep && clearTimeout(i.keep), i.keep = setTimeout(function () {
                e.hide()
            }, t)
        }, blinkBox: function (e, t) {
            e.addClass(t);
            var i, o = setInterval(function () {
                i && clearTimeout(i), e.addClass(t), i = setTimeout(function () {
                    e.removeClass(t)
                }, 100)
            }, 200);
            setTimeout(function () {
                o && clearInterval(o)
            }, 1e3)
        }
    }, Array.prototype.distinct = function () {
        for (var e = [], t = {}, i = 0; i < this.length; i++)t[this[i]] || (t[this[i]] = 1, e.push(this[i]));
        return e
    }, Array.prototype.ASC = function () {
        return this.sort(function (e, t) {
            return e.localeCompare(t) > 0 ? 1 : -1
        })
    }, o.extend(M2012.UI.RichInput, {
        create: function (e) {
            var t = [];
            t.push(M2012.UI.RichInput.Plugin.AddrSuggest), e.plugins = t;
            var i = new M2012.UI.RichInput.View(e);
            return !e.preventAssociate && top.$App && (i.inputAssociateView = new M2012.UI.Suggest.InputAssociate({richInputBox: i})), !e.preventCorrect && top.$App && M2012.UI.Suggest.InputCorrect && (i.inputCorrectView = new M2012.UI.Suggest.InputCorrect({richInputBox: i})), e.noUpgradeTips ? i.noUpgradeTips = !0 : i.noUpgradeTips = !1, i
        }
    })
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase, n = "M2012.UI.RichInput.ItemView";
    i.namespace(n, a.extend({
        initialize: function (t) {
            this.options = t || {};
            var i = e(t.template || this.template);
            this.setElement(i);
            return this.richInputBox = t.richInput, this.type = t.type, this.allText = t.text, "email" == this.type && /^\d+$/.test(this.allText) && (this.allText += "@139.com"), this.editable = !0, this.hashKey = this.addr = this.getAddr(), this.account = $Email.getAccount(this.addr), this.domain = $Email.getDomain(this.addr), this.itemId = t.itemId, this.addr || (this.error = !0, this.errorMsg = t.errorMessage, this.$el.removeClass(this.selectedClass).addClass(this.errorClass)), this.richInputBox.errorfun && (this.richInputBox.errorfun(this, this.allText), this.error && this.$el.removeClass(this.selectedClass).addClass(this.errorClass)), this.selected = !1, a.prototype.initialize.apply(this, arguments)
        },
        name: n,
        selectedClass: "btnNormal_write",
        errorClass: "addrBaseWarn",
        otherClass: "btnOther",
        errorDomainClass: "addrBase-w",
        template: '<div class="addrBase btnNormal_write" unselectable="on"><a href="javascript:;" class="addrBase_con"><b name="addrName"></b><span name="addressInfo"></span></a><a class="quickdelete" href="javascript:;" title="删除"><i class="item-close"></i></a></div>',
        render: function () {
            var e = this, t = this.error ? this.errorMsg : this.addr, i = this.error ? this.allText : this.getName();
            return this.$el.attr("title", t), this.error ? this.$("b").text(this.allText) : this.allText.indexOf("<") > -1 ? (this.$("b").text(i), "email" == this.type ? this.$("span:eq(0)").html("&lt;" + this.account + '<span class="addrDomain">@' + this.domain + "</span>&gt;") : this.$("span:eq(0)").text("<" + this.getAddr() + ">")) : "email" == this.type ? this.$("b").html(this.account + "<span class='addrDomain'>@" + this.domain + "</span>") : this.$("b").text(this.allText), this.$el.attr("rel", this.itemId), this.initEvents(), setTimeout(function () {
                var t = e.richInputBox.$el.width(), i = e.$el.find("a.addrBase_con"), o = i.width();
                o + 50 > t && (o = e.options.itemWidth || 300, i.find("b").css({
                    overflow: "hidden",
                    display: "block",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                })), i.width(o)
            }, 0), this.addDistinctBehavior("contact_insert"), a.prototype.render.apply(this, arguments)
        },
        initEvents: function () {
            this.$el.on("dblclick", o.proxy(this, "onDblclick")).on("mouseenter", o.proxy(this, "onMouseEnter")).on("mouseleave", o.proxy(this, "onMouseLeave")).on("contextmenu", o.proxy(this, "onContextMenu")), this.on("select", function () {
                this.el.className = this.el.className.replace(/\bbtn\w+(?!On)/, function (e) {
                    return (e + "On").replace("OnOn", "On")
                })
            }).on("unselect", function () {
                this.el.className = this.el.className.replace(/\b(btn\w+)On/, function (e, t) {
                    return t
                })
            }).on("errorDomain", function () {
                this.$el.attr("title", "该地址的域名可能不存在，请双击修改"), this.$el.addClass(this.errorDomainClass + " " + this.otherClass)
            }).on("changeDomain", function (e) {
                this.addr = this.addr.replace("@" + e.errorDomain, "@" + e.domain), this.allText = this.allText.replace("@" + e.errorDomain, "@" + e.domain), this.domain = e.domain, delete this.richInputBox.hashMap[this.hashKey], this.hashKey = this.addr, this.richInputBox.hashMap[this.hashKey] = this, this.$el.removeClass(this.errorDomainClass + " " + this.otherClass), this.$el.attr("title", this.addr), this.$el.find("span.addrDomain").html("@" + e.domain)
            }).on("validEmailAddress", function () {
                this.$el.attr("title", "该地址发生过退信"),
                    this.$el.addClass(this.errorDomainClass + " " + this.otherClass)
            })
        },
        getAddr: function () {
            var e = this.richInputBox.contactsModel.getAddr(this.allText, this.type);
            if ("email" == this.type) {
                var t = this.options.limitMailDomain;
                t && $Email.getDomain(e) !== t && (e = "")
            }
            return e
        },
        getName: function () {
            var e = this.richInputBox.contactsModel.getName(this.allText, this.type);
            return e
        },
        select: function () {
            var e = this.richInputBox;
            if (0 == this.selected && (this.addDistinctBehavior("contact_select"), this.selected = !0), o.browser.msie) {
                e.jTextBox;
                M2012.UI.RichInput.Tool.delay("ItemFocus", function () {
                    e.focus()
                })
            } else if (o.browser.opera) {
                var t = e.container.parentNode.scrollTop;
                e.textbox.focus(), e.container.parentNode.scrollTop = t
            } else e.focus();
            this.trigger("select")
        },
        addDistinctBehavior: function (e) {
            var t = this.richInputBox.comefrom;
            BH({key: t + "_" + e})
        },
        unselect: function () {
            this.selected = !1, this.trigger("unselect")
        },
        remove: function () {
            return this.richInputBox.disposeItemData(this), a.prototype.remove.apply(this, arguments)
        },
        onDblclick: function (e) {
            this.addDistinctBehavior("contact_dblclick"), this.editable && this.richInputBox.editItem(this)
        },
        onMouseEnter: function (e) {
            var t = this, i = !1;
            o(e.target).hasClass("quickdelete") && (i = !0), this.richInputBox.hoverItem = this, setTimeout(function () {
                t.richInputBox.hoverItem === t && (i ? t.addDistinctBehavior("contact_hover_close") : t.addDistinctBehavior("contact_hover"))
            }, 500)
        },
        onMouseLeave: function () {
            this.richInputBox.hoverItem = null
        },
        onContextMenu: function (e) {
            var t = this;
            return this.richInputBox.bindContextMenu({
                event: e,
                context: t,
                items: ["cut", "copy", "edit", "delete", "selectAll"]
            }), !1
        }
    }))
}(jQuery, _, M139), function (e, t, i, o) {
    var a = "M2012.UI.RichInput.TextBoxView";
    o.namespace(a, i.View.extend({
        initialize: function (e) {
            this.setElement(e.element), this.richInputBox = e.richInput, this.jTextBox = this.$("input"), this.textbox = this.jTextBox[0], this.initEvent()
        }, initEvent: function () {
            this.jTextBox.click($.proxy(this, "onClick")).focus($.proxy(this, "onFocus")).blur($.proxy(this, "onBlur")).keydown($.proxy(this, "onKeyDown")).keydown($.proxy(this, "onKeyUp")).bind("paste", $.proxy(this, "onPaste")).bind("cut", $.proxy(this, "onCut"));
            var e = this;
            o.Timing.watchInputChange(this.textbox, function (t) {
                e.onChange(t)
            })
        }, onChange: function (e) {
            this.fixTextBoxWidth(), this.trigger("input")
        }, fixTextBoxWidth: function () {
            var e = this.jTextBox, t = 10;
            if ("" == e.val())return void this.$el.width(t);
            if ($B.is.ie && $B.getVersion() < 10)var i = e[0].createTextRange().boundingWidth + 13; else {
                var o = $("#widthHelper");
                0 == o.length && (o = $("<span id='widthHelper' style='position:absolute;left:0px;top:0px;visibility:hidden;'></span>"), o.appendTo(document.body), o.css({
                    fontSize: e.css("font-size"),
                    fontFamily: e.css("font-family"),
                    border: 0,
                    padding: 0
                }));
                var i = o.text(e.val().replace(/ /g, "1")).width() + 50
            }
            var a = this.richInputBox.$el.width() - 3;
            if (i > a && (i = a), t > i && (i = t), $B.is.ie && $B.getVersion() < 8 && i > 200) {
                var n = this.richInputBox.$el.width();
                i + 10 > n && (i = n - 10)
            }
            this.$el.width(i), e.width(i)
        }, setEditMode: function (e) {
            var t = this.jTextBox;
            this.richInputBox.editMode = !0, t.attr("mode", "edit"), setTimeout(function () {
                t.attr("mode", "")
            }, 0), t.val(e.allText), e.$el.replaceWith(this.$el), e.remove(), o.Dom.selectTextBox(this.textbox), this.fixTextBoxWidth()
        }, setValue: function (e) {
            this.textbox.value = e, this.fixTextBoxWidth()
        }, onPaste: function (e) {
        }, onCut: function (e) {
        }, onFocus: function (e) {
            this.richInputBox.trigger("focus"), this.richInputBox.highlight && this.richInputBox.jItemContainer.addClass("writeTable-txt-on"), e && this.richInputBox.inputAssociateView && this.richInputBox.inputAssociateView.render()
        }, onBlur: function (e) {
            var t = this.richInputBox;
            return "edit" == this.jTextBox.attr("mode") ? void this.jTextBox.attr("mode", "") : (t.editMode = !1, t.createItemFromTextBox(), void t.jItemContainer.removeClass("writeTable-txt-on"))
        }, onClick: function (e) {
            e && e.richInputBox && e.richInputBox.clearTipText()
        }, onKeyUp: function (e) {
            this.fixTextBoxWidth()
        }, onKeyDown: function (e) {
            function t(e) {
                if ("" == p.value) {
                    if (d.getSelectedItems().length > 0)return;
                    var t = d.getTextBoxPrevItem();
                    t && t.remove(), p.focus()
                }
            }

            function i(e) {
                if ("" == p.value) {
                    var t = d.getTextBoxNextItem();
                    t && t.remove(), p.focus()
                }
            }

            function a(e) {
                return "" != p.value.trim() && setTimeout(function () {
                    d.createItemFromTextBox()
                }, 0), !1
            }

            function n(e) {
                if ("" == p.value) {
                    var t = d.getTextBoxPrevItem();
                    if (t)return d.moveTextBoxTo(t.$el), !1
                }
            }

            function s(e) {
                if ("" == p.value) {
                    var t = d.getTextBoxNextItem();
                    if (t)return d.moveTextBoxTo(t.$el, !0), !1
                }
            }

            function r(e) {
                if ("" == p.value) {
                    var t = d.textboxView.offset(), i = M2012.UI.RichInput.Tool.getNearlyElement({
                        x: t.left,
                        y: t.top + (e.isUp ? -5 : 20),
                        richInputBox: d
                    });
                    return i && d.moveTextBoxTo(i.element, i.isAfter), !1
                }
            }

            function l(e) {
                p.setAttribute("TabPress", "1"), setTimeout(function () {
                    p.setAttribute("TabPress", null)
                }, 0)
            }

            if (!e.shiftKey && !e.ctrlKey) {
                var d = this.richInputBox, c = o.Event.KEYCODE, p = this.textbox;
                switch (this.fixTextBoxWidth(), e.keyCode) {
                    case c.BACKSPACE:
                        return t.apply(this, arguments);
                    case c.DELETE:
                        return i.apply(this, arguments);
                    case c.SEMICOLON:
                    case c.COMMA:
                    case c.ENTER:
                        return a.apply(this, arguments);
                    case c.LEFT:
                        return n.apply(this, arguments);
                    case c.RIGHT:
                        return s.apply(this, arguments);
                    case c.UP:
                    case c.Down:
                        return e.isUp = e.keyCode == c.Up, r.apply(this, arguments);
                    case c.TAB:
                        return l.apply(this, arguments)
                }
            }
        }
    }))
}(jQuery, _, Backbone, M139), function (e, t, i, o) {
    var a = "M2012.UI.RichInput.DocumentView";
    o.namespace(a, i.View.extend({
        initialize: function (e) {
            this.setElement(document.body), this.options = e, this.initEvent()
        }, initEvent: function () {
            this.$el.mouseup($.proxy(this, "onMouseUp")).mousedown($.proxy(this, "onMouseDown"))
        }, onMouseDown: function (e) {
            var t = e.target || e.srcElement;
            if (!$(t).closest("li").attr("id") || -1 == $(t).closest("li").attr("id").indexOf("rightKeyOperate_"))for (var i, o = M2012.UI.RichInput, a = 0; a < o.instances.length; a++)i = o.instances[a], i.unselectAllItems()
        }, onMouseUp: function (e) {
            var t, i, o, a = M2012.UI.RichInput.Tool, n = a.currentRichInputBox;
            if (a.fireDelay("drawInsertFlag"), a.hidDragEffect(), a.hidDrawInsertFlag(), n) {
                if (a.dragEnable) {
                    var s = a.dragItems, r = a.insertFlag;
                    if (r && s && r.richInputBox) {
                        if (t = r.richInputBox, o = s.length, r.nearItem && r.nearItem.isAfter)for (i = o - 1; i >= 0; i--) {
                            var l = s[i];
                            t.insertItem(l.allText, {
                                nearItem: r.nearItem,
                                isFocusItem: !0,
                                testRepeat: l.richInputBox !== t
                            })
                        } else for (i = 0; o > i; i++) {
                            var l = s[i];
                            t.insertItem(l.allText, {
                                nearItem: r.nearItem,
                                isFocusItem: !0,
                                testRepeat: l.richInputBox !== t
                            })
                        }
                        for (i = 0; o > i; i++)s[i].remove()
                    }
                } else {
                    if (!n.selectArea)return;
                    var d = {x: e.clientX, y: e.clientY + a.getPageScrollTop(this.options)};
                    n.trySelect(n.startPosition, d)
                }
                $.browser.msie && a.captureElement && (a.captureElement.releaseCapture(), a.captureElement = null), a.dragEnable = !1, n.selectArea = !1, a.dragItems = null, a.insertFlag = null, a.currentRichInputBox = null
            }
        }
    }));
    var n;
    M2012.UI.RichInput.DocumentView.create = function (e) {
        return n || (n = new M2012.UI.RichInput.DocumentView(e)), n
    }
}(jQuery, _, Backbone, M139), function (e, t, i) {
    var o = "M2012.UI.RichInput.Plugin";
    i.namespace(o, {
        AddrSuggest: function (e, t) {
            M2012.Contacts.getModel().requireData(function () {
                e.addrSuggest = new M2012.UI.Suggest.AddrSuggest({
                    textbox: e.textbox,
                    filter: e.type,
                    maxItem: t
                }).on("select", function (t) {
                    e.createItemFromTextBox(t)
                })
            })
        }
    })
}(jQuery, _, M139), function () {
    M139.core.namespace("M139.Plugin.ScreenControl", {
        isScreenControlSetup: function (e, t, i) {
            function o() {
                function e(e) {
                    top.BH("click_139tool_install");
                    var t = document.getElementById("139InstallIframe"), i = window.location.protocol + "//" + window.location.host + "/m2015/controlupdate/mail139_tool_setup.exe";
                    t || ($.browser.msie && (!document.documentMode || document.documentMode <= 7) ? t = document.createElement("<iframe id='139InstallIframe' name='139InstallIframe'></iframe>") : (t = document.createElement("iframe"), t.id = "139InstallIframe", t.name = "139InstallIframe")), t.style.display = "none", document.body.appendChild(t), t.src = i, _.isFunction(e) && e()
                }

                function t(t) {
                    top.BH("open_139tool_window");
                    var i = top.$Msg.showHTML(t.htmlCode, function (t) {
                        t.cancel = !0, e(function () {
                            i && i.close(t)
                        })
                    }, function () {
                    }, {
                        dialogTitle: t.title, buttons: t.buttons, width: "449px", onClose: function () {
                            var e = $(arguments[0].event.target).closest("a");
                            (e.hasClass("CloseButton") || e.hasClass("CancelButton")) && top.BH("click_139tool_cancel")
                        }
                    });
                    i.setBottomTip('<a id="gotoTool" href="javascript:;" class="toolbar-text">什么是小工具？</a>'), i.$el.find("#gotoTool").unbind("click").click(function () {
                        top.BH("click_139tool_link"), top.$App.show("smallTool"), i.close()
                    })
                }

                var i = [top.$B.is.ie11 || top.$B.is.ie, parseInt(top.$B.is.chrome && top.$B.getVersion()) <= 41 && !top.$B.is.edge || !top.$B.isRealChrome(), parseInt(top.$B.is.firefox && top.$B.getVersion()) <= 42];
                if (top.$B.is.edge)return void top.$Msg.alert(a);
                var o = ['<div class="toolbar-box">', '<p><strong class="green fz_14">该功能在当前浏览器环境下需要安装小工具才能使用。</strong></p>', '<p class="fz_14 mt_20">安装139邮箱小工具后，您可以使用以下功能：</p>', '<table class="mestip-tab">', "<tbody>", "<tr>", '<td width="48"><i class="i-toolbar-icon i-toolbar-upload"></i></td>', '<td>上传<span class="c_009900 fw_b">2G </span>超大附件</td>', '<td width="48"><i class="i-toolbar-icon i-toolbar-paste"></i></td>', "<td>粘贴图片到正文<br>粘贴方式上传附件</td>", "</tr>", "<tr>", '<td width="48"><i class="i-toolbar-icon i-toolbar-cut"></i></td>', "<td>写信时截屏</td>", '<td width="48"><i class="i-toolbar-icon i-toolbar-storage"></i></td>', "<td>秒传文件到彩云网盘</td>", "</tr>", "</tbody>", "</table>", "</div>"].join("");
                if (!top._.some(i, function (e) {
                        return e
                    })) {
                    if (top.$B.is.firefox)return void top.$Msg.alert(a);
                    var n = this;
                    return Package.require("compose_ext", function () {
                        n.chromeB42Tool || (n.chromeB42Tool = new M2012.Compose.Chromeb42.M139tool({
                            composeId: Math.random().toString(),
                            sid: htmlEditorView.model.getSid()
                        })), n.chromeB42Tool.off().on("complete", function (e) {
                            e.url && htmlEditorView.editorView.editor.insertImage(e.url)
                        }).on("uninstall", function () {
                            t({htmlCode: o, title: "139邮箱小工具安装提示", buttons: ["立即安装", "取消"]})
                        }).captureScreen()
                    }), !1
                }
                t({htmlCode: o, title: "139邮箱小工具安装提示", buttons: ["立即安装", "取消"]})
            }

            if (i)return o();
            if (void 0 != top.isScreenControlSetup && t)return top.isScreenControlSetup;
            var a = "当前浏览器暂不支持使用此功能", n = "当前操作系统暂不支持使用此功能";
            if ("Win64" == window.navigator.platform)return e && top.$Msg.alert(a), !1;
            if (!$B.is.windows)return e && top.$Msg.alert(n), !1;
            var s = !1;
            try {
                if (void 0 !== window.ActiveXObject) {
                    var r = new ActiveXObject("ScreenSnapshotCtrl.ScreenSnapshot.1");
                    r && (s = !0)
                } else if (navigator.mimeTypes) {
                    var l = navigator.mimeTypes["application/x-richinfo-screensnaphot"];
                    l && l.enabledPlugin && (s = !0)
                }
            } catch (d) {
            }
            if (!s && e)o(); else if (s && e && top.SiteConfig.screenControlVersion && document.all) {
                var c = r.GetVersion();
                (c < top.SiteConfig.screenControlVersion || location.host.indexOf("10086") >= 0 && 16777477 == c) && (s = !1, o())
            }
            return delete r, top.isScreenControlSetup = s, s
        }, openControlDownload: function (e) {
            var t = "";
            t = top.ucDomain ? top.ucDomain : window.location.protocol + "//g2.mail.10086.cn";
            var i = window.open(t + "/LargeAttachments/html/control139.htm");
            setTimeout(function () {
                i.focus()
            }, 0), e && removeUploadproxyWindow()
        }, removeUploadproxyWindow: function () {
            try {
                top.$("#uploadproxy").attr("src", "about:blank"), top.$("#uploadproxy").remove()
            } catch (e) {
            }
        }
    })
}();
var ComposeMessages = {
    PleaseUploadSoon: "附件上传中，请稍后再添加新的附件",
    FileSizeOverFlow: "对不起，文件大小超出附件容量限制。",
    ctrlVFileSizeOverFlow: "文件超过了50M，请使用超大附件手动上传！",
    ctrlVFileSizeOverFlowAutoUpload: "附件总大小超过50M，可能会被对方邮箱拒收。\n使用超大附件发送，对方接收无障碍！",
    FileNameExist: '"{0}"相同的文件名已经存在,请重命名后再上传',
    FileUploadError: "文件\"{0}'上传失败",
    FileIsUsing: "对不起，文件正在被其它应用程序占用，请关闭文件后再试。",
    GetLargeAttachFail: "获取大附件失败，请稍后再试",
    ExistFileName: "已上传附件中存在相同文件名，请重命名后再试。",
    NoFileSize: '"{0}"文件大小为 0 字节，无法上传',
    FileUploadFail: "对不起，上传附件失败，请删除后重试！"
}, upload_module = {
    init: function (e) {
        this.model = e;
        var t = supportUploadType = this.getSupportUpload(), i = !0;
        t.isSupportMultiThreadUpload && upload_module_multiThread.init(), t.isSupportFlashUpload && (upload_module_flash.init(), i = !1), t.isSupportAJAXUpload && (upload_module_ajax.init(), i = !1), i && upload_module_common.init(), this.model.PageState = this.model.PageStateTypes.Common, bindAttachFrameOnload(), (i || t.isSupportAJAXUpload) && $("#fromAttach").show()
    }, createUploadManager: function () {
        uploadManager = new UploadManager({container: document.getElementById("attachContainer")})
    }, getSupportUpload: function () {
        var e = {};
        return e.isSupportMultiThreadUpload = upload_module_multiThread.isSupport(), e.isSupportFlashUpload = upload_module_flash.isSupport(), e.isSupportAJAXUpload = upload_module_ajax.isSupport(), e.isSupportScreenShotUpload = e.isSupportMultiThreadUpload, e
    }, deleteFile: function (e) {
        function t(e, t) {
            if (-1 != e.indexOf("\\") || "compose" == upload_module.model.get("pageType"))return !0;
            var i = upload_module.model.get("initDataSet");
            if (i.attachments)for (var o = 0; o < i.attachments.length; o++)if (t == i.attachments[o].id)return !1;
            return !0
        }

        var i = e.file, o = i.fileId, a = i.filePath;
        if ("multiThread" == i.uploadType && (a = i.fileName), t(a, o)) {
            var n = {targetServer: 1, composeId: upload_module.model.composeId, items: [o]};
            this.model.callApi("upload:deleteTasks", n, function (e) {
                "S_OK" == e.responseData.code && (uploadManager.removeFile(i), uploadManager.autoUpload())
            }), console.log("删除本次上传的附件:" + o + "," + a)
        }
    }, isOverSize: function (e) {
        if (e) {
            var t = 0;
            return e.indexOf("K") > -1 ? t = parseFloat(e) : e.indexOf("M") > -1 ? t = 1024 * parseFloat(e) : e.indexOf("G") > -1 && (t = 1024 * parseFloat(e) * 1024), 20480 >= t
        }
    }, insertImgFile: function (e) {
        htmlEditorView.editorView.editor.insertImage(e)
    }, getDownloadUrl: function (e, t) {
        var i = e.fileType, o = e.fileId, a = (e.fileName, e.fileSize, "");
        "netDisk" == i ? top.$RM.call("disk:download", {fileIds: o}, function (e) {
            a = e.responseData["var"].url, t && t(a)
        }) : "keepFolder" == i ? top.$RM.call("file:preDownload", {fileIds: o}, function (e) {
            a = e.responseData.imageUrl, t && t(a)
        }) : t && e.downloadUrl && t(e.downloadUrl.replace("https:", "http:"))
    }, getPreviewDoc: function (e, t) {
        var i, o, a = this;
        i = top.$User.getAliasName("mobile").replace(/@[^\/]*/g, ""), o = "/mw2/opes/addOfficeToEmail.do?sid=" + top.sid + "&cguid=" + $TextUtils.getCGUID(), this.getDownloadUrl(e, function (n) {
            var s = {
                account: i,
                composeId: a.model.composeId || e.fileId,
                fileid: e.fileId,
                filename: encodeURIComponent(e.fileName),
                filedownurl: n,
                fileSize: 0 | e.fileSize,
                sid: top.sid,
                comefrom: "email",
                browsetype: 1,
                longHTTP: !0
            };
            M139.RichMail.API.call(o, s, function (e) {
                var i = null, o = "";
                if (e && (i = e.responseData), i && "S_OK" == i.resultCode) {
                    pages = i.fileContent;
                    for (var a = 0, n = pages.length; n > a; a++)page = pages[a], o += "<h3>" + page.fileName + "</h3>", o += page.content + "<br />"
                }
                t(o, i.code)
            })
        })
    }, insertContent: function (e, t, i, o, a) {
        top.BH({key: "compose_addInContent"});
        var n = {fileId: e, fileName: t, fileSize: i, fileType: o, downloadUrl: a};
        this.getPreviewDoc(n, function (e, t) {
            var i = "";
            if ("4" == t ? i = "文档已加密，无法导入" : "" == e && (i = "导入文档失败"), "" == e || "4" == t)return void top.M139.UI.TipMessage.show(i, {
                delay: 3e3,
                className: "msgRed"
            });
            try {
                e = e.replace(/(<table.*?)(border="0")/gi, '$1border="1"');
                var o = document.createElement("div");
                o.innerHTML = e;
                for (var a = htmlEditorView.editorView.editor, n = o.getElementsByTagName("style"), s = document.createDocumentFragment(), r = a.editorDocument.body, l = n.length; n[0];)s.appendChild(n[0]);
                if (l > 0 && r.insertBefore(s, r.firstChild), $B.is.ie || $B.is.ie11) {
                    a.splitOff();
                    var d = o.innerHTML;
                    $B.is.ie && (d = '<PRE style="WORD-WRAP: break-word; WHITE-SPACE: pre-wrap">' + e + "</PRE>"), a.insertHTML(d)
                } else e = o.innerHTML, a.execInsertHTML(e);
                top.M139.UI.TipMessage.show("导入文档成功", {delay: 3e3})
            } catch (c) {
                top.M139.UI.TipMessage.show("导入文档失败", {delay: 3e3, className: "msgRed"})
            }
        })
    }, insertRichMediaFile: function (e, t, i, o, a) {
        var n, s = $T.Url.getFileExtName(t).toLowerCase(), r = $TextUtils.htmlEncode(t.slice(0, -s.length - 1)), l = /^(?:mp3|wma|mod|ogg|midi|wav|mp4|mpg|mpeg|mov|avi|rm|rmvb|wmv|asf|flv|mkv|3gp|m4a|m4v|docx?|pptx?|xlsx?|wps|pdf|txt|log|ini|csv)$/i.test(s), d = "txt.png", c = "", p = htmlEditorView.editorView.editor, u = "/" + s + "/", h = {
            "music.png": "/mp3/m4a/wma/wav/mod/ogg/midi/",
            "video.png": "/flv/rmvb/rm/avi/wmv/mov/3gp/mp4/m4v/mpg/mpeg/asf/mkv/webm/ogg",
            "word.png": "/doc/docx/wps/",
            "ppt.png": "/ppt/pptx/",
            "xls.png": "/xls/xlsx/",
            "pdf.png": "/pdf/",
            "txt.png": "/txt/log/ini/csv/"
        };
        if (l) {
            BH({key: "compose_attach_addto_editor"});
            for (n in h)if (-1 != h[n].indexOf(u) && h.hasOwnProperty(n)) {
                d = n;
                break
            }
            if ("music.png" === d)p.insertHTML("&nbsp;"), c = ['<span class="audioWrapper">', '<a href="javascript:;" class="inserted_Mark videoMentOther" contenteditable="false" onmouseout="this.firstChild.className=\'audioIcon\'" onmouseover="this.firstChild.className=\'audioHoverIcon\'" title="' + t + '">', '<span class="audioIcon"></span>', '<i style="display:none;width:0;height:0;font-size:0;background:transparent;opacity:0;" id="' + o + '">' + t + "</i>", '<span class="ext_container" style="visibility:hidden;">.' + s + "</span>", "</a>", "</span>"].join(""), p.insertHTML(c), p.insertHTML("&nbsp;"); else if (isOverSize(i) && "word.png" === d || "xls.png" === d || "txt.png" === d)t = top.$TextUtils.htmlEncode(t), c = ["<div>", "<span>&nbsp;</span>", '<span style="text-indent: 0.85pt;border: 1px solid #ccc; padding: 7px; display: inline-block; font-size: 12px; font-family: \'Microsoft YaHei\', Verdana, \'Simsun\'; overflow: hidden; vertical-align: middle; position: relative; margin: 7px 0; line-height: 1.6; cursor: default;box-shadow: 0 1px 3px #ccc;" class="inserted_Mark attachmentOther" title="' + t + '" contenteditable="false">', '<i style="display:none;width:0;height:0;font-size:0;background:transparent;opacity:0;" id="' + o + '">' + t + "</i>", '<img style="width: 32px; float: left; margin-right: 6px;" src="' + top.getRootPath() + "/images/module/networkDisk/images/small/" + d + '" />', '<span style="color:#000;font-weight: normal;text-indent: 0.85pt;">' + (r.length > 28 ? r.substring(0, 28) + "..." : r) + "</span>", '<span style="font-weight: normal;" class="ext gray">.' + s + '</span><span style="font-weight: normal;" class="gray"> (' + i + ")</span>", '<p style="margin: 0; padding: 0; line-height: 14px; color: #5499e5; width: 130px;" class="pctrl"><a href="javascript:;" style="font-family: \'Microsoft YaHei\', Verdana, \'Simsun\';padding-right:5px;color: #1a75ca; text-decoration: none;font-size: 12px;" onclick="parent.upload_module.insertContent(\'' + e + "','" + t + "','" + i + "','" + o + "','" + a + '\');this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);return false;">导入到正文</a><a style="font-family: \'Microsoft YaHei\', Verdana, \'Simsun\';color: #1a75ca; text-decoration: none;font-size: 12px;" href="javascript:;" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);return false;">移除</a></p>', "</span>", "<span>&nbsp;</span>", "</div>"].join(""), p.insertHTML(c); else if ("video.png" == d && -1 != $.inArray(s, checkVideo())) {
                c = ['<div id="testVideo"><video size="' + i + '"  name="videoFile" src="' + a + '" id="' + e + '_video" style="width:480px;" controls="controls" autoplay="autoplay" poster="http://appmail.mail.10086.cn/m2015/images/global/loading_xl.gif">', "您的浏览器不支持video标签", "</video>&nbsp;</div>"].join(""), p.insertHTML(c);
                var m = $(p.editorDocument).find("[id='testVideo'] video");
                m.off("loadedmetadata").on("loadedmetadata", function () {
                    $(this).css("height", $(this).height())
                })
            } else c = ["<div>", "<span>&nbsp;</span>", '<span style="text-indent: 0.85pt;border: 1px solid #ccc; padding: 7px; display: inline-block; font-size: 12px; font-family: \'Microsoft YaHei\', Verdana, \'Simsun\'; overflow: hidden; vertical-align: middle; position: relative; margin: 7px 0; line-height: 1.6; cursor: default;box-shadow: 0 1px 3px #ccc;" class="inserted_Mark attachmentOther" title="' + t + '" contenteditable="false">', '<i style="display:none;width:0;height:0;font-size:0;background:transparent;opacity:0;" id="' + o + '">' + t + "</i>", '<img style="width: 32px; float: left; margin-right: 6px;" src="' + top.getRootPath() + "/images/module/networkDisk/images/small/" + d + '" />', '<span style="color:#000;font-weight: normal;text-indent: 0.85pt;">' + (r.length > 28 ? r.substring(0, 28) + "..." : r) + "</span>", '<span style="font-weight: normal;" class="ext gray">.' + s + '</span><span style="font-weight: normal;" class="gray"> (' + i + ")</span>", '<p style="margin: 0; padding: 0; line-height: 14px; color: #5499e5;" class="pctrl"><a style="font-family: \'Microsoft YaHei\', Verdana, \'Simsun\';color: #1a75ca; text-decoration: none; font-size: 12px;" href="javascript:;" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);return false;">移除</a></p>', "</span>", "<span>&nbsp;</span>", "</div>"].join(""), p.insertHTML(c);
            this.detactAttachPlayerMark(p)
        }
    }, detactAttachPlayerMark: function (e) {
        if (e && 0 !== $(e.editorDocument).find(".inserted_Mark").length) {
            var t = this.getSourceHead();
            0 === $("#in_mail_atta_previewCss").length && this.addCssByLink({
                id: "in_mail_atta_previewCss",
                src: t + top.getRootPath() + "/css/module/atta/in_mail_atta_preview.css"
            });
            var i = e.editorWindow.parent.resetComposeMark;
            i ? i() : M139.core.utilCreateScriptTag({
                id: "playerJs",
                src: t + top.getRootPath() + "/js/plugin/player.js",
                charset: "utf-8"
            }, function () {
                M139.core.utilCreateScriptTag({
                    id: "initReadMailAttachMediaJs",
                    src: t + top.getRootPath() + "/js/richmail/readmail/initReadMailAttachMedia.js",
                    charset: "utf-8"
                }, function () {
                })
            })
        }
    }, addCssByLink: function (e) {
        var t = document, i = t.createElement("link");
        i.setAttribute("rel", "stylesheet"), i.setAttribute("type", "text/css"), i.setAttribute("id", e.id), i.setAttribute("href", e.src);
        var o = t.getElementsByTagName("head");
        o.length ? o[0].appendChild(i) : t.documentElement.appendChild(i)
    }, getSourceHead: function () {
        var e = top.location.protocol, t = location.host, i = "";
        return t.indexOf("10086.cn") > -1 && top.$User.isGrayUser() ? i = "{0}//image0.139cm.com" : t.indexOf("10086.cn") > -1 && !top.$User.isGrayUser() ? i = "{0}//images.139cm.com" : t.indexOf("10086ts") > -1 ? i = "{0}//rm.mail.10086ts.cn" : t.indexOf("10086rd") > -1 && (i = "{0}//static.rd139cm.com"), i.replace("{0}", e)
    }, removeRichMediaFile: function (e) {
        htmlEditorView.editorView.editor.jEditorDocument.find(".inserted_Mark").each(function () {
            this.getAttribute("title") == e && $(this).remove()
        })
    }, deletePreuploadFile: function (e) {
        var t = {composeId: upload_module.model.composeId, items: [e]};
        RequestBuilder.call("upload:deleteTasks", t, function (t) {
            "S_OK" == t.code && (top.Debug.write("删除本次上传的附件:" + e), upload_module.asynDeletedFile = "")
        })
    }
};
upload_module_screenShot = {
    isSupport: function () {
        return !1
    }
}, utool = {
    getMaxUploadSize: function () {
        var e = top.$User.getVipInfo();
        if (e && e.MAIL_2000005) {
            var t = parseInt(e.MAIL_2000005 / 1024 / 1024);
            return 50 > t ? 50 : parseInt(e.MAIL_2000005 / 1024 / 1024)
        }
        return 50
    }, checkFileExist: function (e) {
        e = utool.getFileNameByPath(e);
        for (var t = uploadManager.fileList, i = 0; i < t.length; i++) {
            var o = t[i];
            if (o.fileName == e)return !0
        }
        return !1
    }, getUploadTipMessage: function () {
        if (top.$B.isRealChrome())return "";
        var e = $T.Utils.format("添加小于{0}M的附件", [utool.getMaxUploadSize()]);
        return supportUploadType.isSupportScreenShotUpload ? e += "，可使用 Ctrl+V 粘贴附件和图片" : "Win64" != window.navigator.platform && $B.is.windows && (e += "<br/>安装<a hideFocus='1' style='color:blue' onclick='M139.Plugin.ScreenControl.isScreenControlSetup(true);' href='javascript:;'>邮箱小工具</a>，即可Ctrl+V粘贴上传附件"), e
    }, showDisableFlashMsg: function () {
        if (confirm("您是否要禁用Flash上传组件?")) {
            var e = new Date;
            e.setFullYear(2099), $Cookie.set({
                name: "flashUploadDisabled",
                value: "1",
                expries: e
            }), alert("Flash上传组件已经禁用，您下次打开写信页将使用原始但是稳定的上传方式。")
        }
    }, checkSizeSafe: function (e) {
        return this.getRemainSize() > e
    }, getSizeNow: function () {
        for (var e = 0, t = uploadManager.fileList, i = 0; i < t.length; i++) {
            var o = t[i];
            o.fileSize && (e += o.fileSize)
        }
        return e
    }, getRemainSize: function () {
        return 1024 * this.getMaxUploadSize() * 1024 - this.getSizeNow()
    }, shortName: function (e) {
        if (e.length <= 30)return e;
        var t = e.lastIndexOf(".");
        return -1 == t || e.length - t > 5 ? e.substring(0, 28) + "…" : e.replace(/^(.{26}).*(\.[^.]+)$/, "$1…$2")
    }, getFileNameByPath: function (e) {
        return e.replace(/^.+?\\([^\\]+)$/, "$1")
    }, getFileById: function (e) {
        for (var t = uploadManager.fileList, i = 0; i < t.length; i++) {
            var o = t[i];
            if (o.fileId == e || o.taskId == e)return o
        }
        return null
    }, getAttachFiles: function () {
        var e, t = upload_module.model.composeAttachs;
        try {
            for (var i = 0; i < t.length; i++)e = t[i], e.fileName || e.name || (t.splice(i, 1), i--)
        } catch (o) {
        }
        for (var i = 0; i < t.length; i++)e = t[i], e.fileRealSize && (e.base64Size = e.fileSize, e.fileSize = e.fileRealSize);
        return t
    }, getControlUploadUrl: function (e) {
        var t = upload_module.model;
        t.requestComposeId();
        var i = window.location.protocol + "//" + window.location.host + "/RmWeb/mail?func=attach:upload&sid=" + t.getSid() + "&composeId=" + t.composeId;
        return e && (i += "&type=internal"), i
    }, getBlockUploadUrl: function (e) {
        var t = upload_module.model, i = window.location.protocol + "//" + window.location.host + "/RmWeb/mail?func=attach:upload2&sid=" + t.getSid() + "&composeId=" + t.composeId + "&uploadType=" + e;
        return i
    }, getControlUploadedAttachUrl: function (e) {
        var t = e.contentWindow.document, i = t.body.innerHTML || t.documentElement.innerHTML, o = "", a = upload_module.model.getReturnObj(i);
        if (!a || a instanceof Array) {
            if (a instanceof Array) {
                o = [];
                for (var n = 0, s = a.length; s > n; n++)o.push(upload_module.model.getAttachUrl(a[n].fileId, a[n].fileName, !1))
            }
        } else o = upload_module.model.getAttachUrl(a.fileId, a.fileName, !1);
        return o
    }, checkUploadResultWithResponseText: function (param) {
        var text = param.responseText, result = {}, reg = /'var':([\s\S]+?)\};<\/script>/;
        if (text.indexOf("'code':'S_OK'") > 0) {
            var m = text.match(reg);
            result = eval("(" + m[1] + ")"), result.success = !0, addCompleteAttach(result)
        } else result.success = !1, $.extend(result, M139.JSON.tryEval(text));
        return result
    }, isScreenShotUploading: function () {
        return Boolean(window.upload_module_screenShot && upload_module_screenShot.isUploading)
    }, isImageFile: function (e) {
        return /\.(?:jpg|jpeg|gif|png|bmp|emz)$/i.test(e)
    }, fillSubject: function (e) {
        var t = document.getElementById("txtSubject");
        if ("" == t.value.trim()) {
            var i = -1 != e.lastIndexOf(".") ? e.substring(0, e.lastIndexOf(".")) : e;
            t.value = i;
            var o = document.getElementById("CoolMailtip");
            o && (o.style.display = "none"), top.$App.setTitle(i), upload_module.model.autoSaveTimer.subMailInfo.subject = i
        }
    }, logUpload: function (e, t) {
    }
}, UploadLogs = {
    CommonStart: 5001,
    CommonCancel: 5002,
    CommonSuccess: 5003,
    CommonFail: 5004,
    CommonFailInfo: 5005,
    AjaxStart: 5051,
    AjaxCancel: 5052,
    AjaxSuccess: 5053,
    AjaxFail: 5054,
    AjaxFailInfo: 5055,
    FlashStart: 6001,
    FlashCancel: 6002,
    FlashSuccess: 6003,
    FlashFail: 6004,
    FlashFailInfo: 6005,
    MultiStart: 7001,
    MultiStop: 7002,
    MultiContinue: 7003,
    MultiCancel: 7004,
    MultiSuccess: 7005,
    MultiFail1: 7006,
    MultiFail2: 7007
}, upload_module_common = {
    init: function (e) {
        var t = document.getElementById("uploadInput");
        t.onchange = function () {
            var e = this, t = e.value;
            if (t) {
                var i = document.forms.fromAttach;
                return utool.checkFileExist(t) ? (top.$Msg.alert(ComposeMessages.ExistFileName), void i.reset()) : void function () {
                    i.action = utool.getControlUploadUrl();
                    try {
                        i.submit(), utool.logUpload(UploadLogs.CommonStart), i.reset()
                    } catch (e) {
                        $("#frmAttachTarget").attr("src", "/blank.htm").one("load", function () {
                            i.submit(), utool.logUpload(UploadLogs.CommonStart), i.reset()
                        })
                    }
                    upload_module_common.showUploading(t)
                }()
            }
        }, t.onclick = function () {
            return BH({key: "compose_commonattach"}), upload_module.model.requestComposeId(), uploadManager.isUploading() ? (top.$Msg.alert(ComposeMessages.PleaseUploadSoon), !1) : void 0
        }
    }, showUploading: function (e) {
        uploadManager.uploadFile({fileName: e, uploadType: "common"})
    }
}, SWFObject.prototype.addParam = function (e, t) {
    this.params[e] = t
}, SWFObject.prototype.getParam = function (e) {
    return this.params[e]
}, SWFObject.prototype.addVariable = function (e, t) {
    this.variables[e] = t
}, SWFObject.prototype.getVariable = function (e) {
    return this.variables[e]
}, SWFObject.prototype.setAttribute = function (e, t) {
    this.attributes[e] = t
}, SWFObject.prototype.getAttribute = function (e) {
    return this.attributes[e]
}, SWFObject.prototype.getVariablePairs = function () {
    var e = new Array;
    for (key in this.variables)e.push(key + "=" + this.variables[key]);
    return e
}, SWFObject.prototype.getHTML = function () {
    var e = "";
    if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {
        e += '<embed class="flash" type="application/x-shockwave-flash"  pluginspage="' + top.getProtocol() + 'www.macromedia.com/go/getflashplayer" src="' + this.getAttribute("swf") + '" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '"', e += ' id="' + this.getAttribute("id") + '" name="' + this.getAttribute("id") + '" ';
        for (var t in this.params)e += [t] + '="' + this.params[t] + '" ';
        var i = this.getVariablePairs().join("&");
        i.length > 0 && (e += 'flashvars="' + i + '"'), e += "/>"
    } else {
        e = '<object class="flash" id="' + this.getAttribute("id") + '" classid="' + this.getAttribute("classid") + '"  codebase="' + top.getProtocol() + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=11,0,0,0" width="' + this.getAttribute("width") + '" height="' + this.getAttribute("height") + '">', e += '<param name="movie" value="' + this.getAttribute("swf") + '" />';
        for (var t in this.params)e += '<param name="' + t + '" value="' + this.params[t] + '" />';
        var i = this.getVariablePairs().join("&");
        i.length > 0 && (e += '<param name="flashvars" value="' + i + '" />'), e += "</object>"
    }
    return e
}, SWFObject.prototype.write = function (e) {
    if ("undefined" == typeof e)document.write(this.getHTML()); else {
        var t = document.getElementById(e);
        t || (t = $(e)), $(t).append(this.getHTML())
    }
};
var upload_module_flash = {
    init: function () {
        function e() {
            upload_module_common.init(), $("#fromAttach").show(), supportUploadType.isSupportFlashUpload = !1, $T.Cookie.set({
                name: "flashUploadDisabled",
                value: "1"
            }), document.getElementById("flashplayer").style.display = "none"
        }

        var t = top.getRootPath() + "/flash/muti_upload.swf?v=" + Math.random(), i = new SWFObject(t, "flashplayer", "86", "26");
        i.addParam("wmode", "transparent"), i.write("#floatDiv"), setTimeout(function () {
            if (!upload_module_flash.isRealOK) {
                var t = !1;
                try {
                    document.getElementById("flashplayer").upload || (t = !0), UploadFacade.init()
                } catch (i) {
                    t = !0
                }
                t && e()
            }
        }, 3e3)
    }, upload: function (e) {
        function t() {
            UploadFacade.upload(e), o && (i.isLargeAttach = !0), i.state = "uploading", i.updateUI()
        }

        var i = utool.getFileById(e), o = !1;
        if (i.taskId == window.firstTaskId) {
            var a = UploadLargeAttach.isShowLargeAttach([i], "flash", function () {
                1 == UploadLargeAttach.isLargeAttach && (o = !0), t()
            });
            a || t()
        } else t()
    }, cancel: function (e) {
        e.isCancel = !0;
        window.currentFileId;
        window.currentFileId = null, window.currentSip = null, uploadManager.removeFile(e), uploadManager.autoUpload();
        try {
            UploadFacade.cancel(e.taskId)
        } catch (t) {
        }
    }, isSupport: function () {
        if ($.browser.msie && void 0 !== window.ActiveXObject) {
            try {
                var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10")
            } catch (t) {
                try {
                    var e = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9")
                } catch (t) {
                }
            }
            if (e)return !0
        }
        return !1
    }
};
UploadFacade = {
    getFlashObj: function () {
        return document.getElementById("flashplayer")
    }, init: function () {
        var e = utool.getBlockUploadUrl("flash");
        this.getFlashObj().setUploadUrl(e), this.getFlashObj().setOptions({})
    }, getUploadUrl: function () {
        if (UploadLargeAttach.enable)return console.log("upload url:" + UploadLargeAttach.uploadUrl), UploadLargeAttach.uploadUrl;
        var e = utool.getBlockUploadUrl("flash");
        return console.log("upload url2:" + e), e
    }, onclick: function () {
        return upload_module.model.composeId || (upload_module.model.composeId = Math.random()), !0
    }, _blockInfo: {}, getBlockInfo: function () {
    }, onrequest: function (e) {
        var t;
        return UploadLargeAttach.enable ? (t = UploadLargeAttach.postParams, t.range = e.offset + "-" + (Number(e.offset) + (Number(e.length) - 1)).toString()) : (t = {
            type: 1,
            filesize: e.fileSize,
            timestamp: (new Date).toDateString(),
            range: e.offset + "-" + (Number(e.offset) + Number(e.length)).toString()
        }, window.currentFileId && (t.fileid = window.currentFileId, t.sip = window.currentSip)), t
    }, onprogress: function (e) {
        e.data.indexOf("middleret") > 0 && (e.data = UploadLargeAttach.responseConvert(e.data));
        var t = e.data.match(/["']fileId["']:["'](.+?)["']/);
        if (!t)return e.error = "Server Reponse Error:" + e.data, this.onerror(e), !1;
        var i = t[1];
        t = e.data.match(/["']sip["']:["'](.+?)["']/);
        var o = t ? t[1] : "";
        if (window.currentFileId || (window.currentFileId = i), window.currentSip = o, window.currentSip && !UploadLargeAttach.enable) {
            var a = utool.getBlockUploadUrl("flash") + "&sip=" + window.currentSip;
            this.getFlashObj().setUploadUrl(a)
        }
        var n = e.taskId, s = utool.getFileById(n);
        s && (s.state = "uploading", s.sendedSize = e.bytesLoaded, s.uploadSpeed = e.speed, console.log("上传速度" + s.uploadSpeed), s.progress = e.percent, s.updateUI(), s.uploadSpeed < 1e4 && M139.Logger.sendClientLog({
            level: "INFO",
            name: "upload speed is too slow",
            errorMsg: "speed:" + s.uploadSpeed + "|filename:" + s.fileName
        }), this.retryCount > 0 && !this.retryLogSended && (M139.Logger.sendClientLog({
            level: "INFO",
            name: "upload fail retry",
            errorMsg: "retry ok," + s.fileName
        }), this.retryLogSended = !0), this.monitorTimeout(i, s), this.lastSendedTime = new Date)
    }, monitorTimeout: function (e, t) {
        this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(function () {
            if (e == window.currentFileId && 100 != t.progress) {
                var i = "上传超时,fileName:" + t.fileName + "|fileSize:" + t.fileSize + "|progress:" + t.progress + "%";
                console.warn(i),
                    M139.Logger.sendClientLog({
                        level: "ERROR",
                        name: "request timeout",
                        errorMsg: i
                    }), UploadFacade.getFlashObj().uploadResume()
            }
        }, 45e3)
    }, oncomplete: function (e) {
        window.currentFileId = null, window.currentSip = null, e.data.indexOf("middleret") > 0 && (e.data = UploadLargeAttach.responseConvert(e.data));
        var t = utool.getFileById(e.taskId), i = utool.checkUploadResultWithResponseText({
            fileName: t.filePath,
            responseText: e.data
        });
        if (i.success)t.state = "complete", t.fileId = i.fileId, t.updateUI(), UploadLargeAttach.completeUpload(t), utool.logUpload(UploadLogs.FlashSuccess); else {
            if (t.state = "error", i.code && i.code.indexOf("SESSION") >= 0)return void top.$App.showSessionOutDialog();
            top.$Msg.alert(i.summary || "文件上传失败，请删除后重试！", {
                onclose: function (e) {
                }
            }), utool.logUpload(UploadLogs.FlashFailInfo)
        }
        uploadManager.autoUpload()
    }, onselect: function (e) {
        for (var t = [], i = 0; i < e.length; i++) {
            var o = e[i], a = {
                taskId: o.taskId,
                idx: i,
                fileName: decodeURIComponent(o.fileName),
                fileSize: o.fileSize,
                state: o.status,
                uploadType: "flash"
            };
            if (!(o.fileSize > 0))return $Msg.alert('文件："' + decodeURIComponent(o.fileName) + '"大小为0字节，请重新选择'), M139.Logger.sendClientLog({
                level: "ERROR",
                name: "fileSize Exception",
                errorMsg: "fileName:" + decodeURIComponent(o.fileName) + "|error:filesize is 0"
            }), !1;
            t.push(a)
        }
        if (t.length > 0) {
            window.firstTaskId = t[0].taskId;
            var n = uploadManager.uploadFile(t);
            if (0 == n)return !1
        }
    }, onloadcomplete: function (e) {
        var t = this, i = utool.getFileById(e.taskId);
        M139.Logger.sendClientLog({
            level: "normal",
            name: "flash getMd5 onloadcomplete",
            errorMsg: "isLarge: " + e.isLarge + " ,md5: " + e.md5 + " ,fileName: " + i.fileName
        }), e.isLarge && (i.md5 = e.md5, UploadLargeAttach.prepareUpload(i, function (e) {
            t.getFlashObj().setUploadUrl(i.uploadUrl), t.getFlashObj().uploadRequest()
        }))
    }, onerror: function (e) {
        var t = this, i = utool.getFileById(e.taskId);
        i && (i.state = "blockerror", i.updateUI()), M139.Logger.sendClientLog({
            level: "ERROR",
            name: "flash I/O Error",
            errorMsg: "fileName:" + i.fileName + "|error:" + e.error
        }), this.timeoutId && window.clearTimeout(this.timeoutId), this.retryCount <= 30 && setTimeout(function () {
            t.uploadResume()
        }, 5e3)
    }, uploadResume: function () {
        this.retryCount++, this.getFlashObj().uploadResume(), M139.Logger.sendClientLog({
            level: "INFO",
            name: "upload fail retry",
            errorMsg: "time:" + (new Date).toString() + "|retryCount:" + this.retryCount
        }), BH("compose_upload_resume")
    }, onmouseover: function () {
    }, onmouseout: function () {
    }, upload: function (e) {
        this.retryCount = 0, this.lastSendedTime = new Date;
        var t = UploadLargeAttach.enable;
        this.getFlashObj().upload(t)
    }, cancel: function (e) {
        this.getFlashObj().cancel(e)
    }
};
var upload_module_multiThread = {
    init: function (e) {
        function t() {
            var e = MultiThreadUpload.getClipboardData(), t = [], a = !1;
            if (e.copyFiles.length > 0 ? t = e.copyFiles : e.imageFiles.length > 0 ? (t = e.imageFiles, a = !0) : e.htmlFiles.length > 0 && (t = e.imageFiles), t.length > 0) {
                if (M139.Logger.sendClientLog({
                        level: "ERROR",
                        name: "pasteFile",
                        errorMsg: "use tool pasteFile size: " + t.length
                    }), uploadManager.isUploading())return void top.$Msg.alert(ComposeMessages.PleaseUploadSoon, {
                    onclose: function (e) {
                    }
                });
                var n = !!e.html;
                return i(t), a && o(t, n), uploadManager.uploadFile(t), t.length > 0 ? (e.html && (upload_module_multiThread.html = e.html), !1) : void 0
            }
        }

        function i(e) {
            $(e).each(function () {
                this.uploadType = "multiThread"
            })
        }

        function o(e, t) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                utool.isImageFile(o.fileName) && (t ? o.replaceImage = !0 : o.insertImage = !0)
            }
        }

        MultiThreadUpload.create(e), captureScreen = function () {
            return uploadManager.isUploading() ? void top.$Msg.alert(ComposeMessages.PleaseUploadSoon, {
                onclose: function (e) {
                }
            }) : void MultiThreadUpload.screenShot()
        }, captureClipboard = function () {
            return window.loadCaptureTime && new Date - window.loadCaptureTime < 1e3 ? void 0 : (window.loadCaptureTime = new Date, t())
        }, MultiThreadUpload.onScreenShot = function (e) {
            e.insertImage = !0, e.uploadType = "multiThread", uploadManager.uploadFile(e)
        }
    }, upload: function (e) {
        var t = !1;
        t ? MultiThreadUpload.upload(e) : MultiThreadUpload.commandUpload(e)
    }, cancel: function (e) {
        MultiThreadUpload.cancel(e)
    }, isSupport: function () {
        if (navigator.userAgent.indexOf("Opera") > -1)return !1;
        if (void 0 !== window.ActiveXObject)try {
            var e = new ActiveXObject("RIMail139ActiveX.InterfaceClass");
            e.Command("<param><command>common_getversion</command></param>");
            return !0
        } catch (t) {
            return !1
        } else {
            var i = navigator.mimeTypes && navigator.mimeTypes["application/x-richinfo-mail139activex"];
            if (i && i.enabledPlugin)return !0
        }
        return !1
    }
};
MultiThreadUpload = {
    create: function (e) {
        var t = "mtUploader" + Math.random();
        if ($.browser.msie || $B.is.ie11)var i = '<OBJECT style="display:none" width="0" height="0" id="' + t + '" CLASSID="CLSID:63A691E7-E028-4254-8BD5-BDFDB8EF6E66"></OBJECT>'; else var i = '<div style="height:0;width:0;overflow:hidden;"><embed id="' + t + '" type="application/x-richinfo-mail139activex" height="0" width="0" hidden="true"></embed></div>';
        if (upload_module.model.isFirefox ? $(i).appendTo(top.document.body) : e || top && top.$App && top.$App.isReadSessionMail && top.$App.isReadSessionMail() ? $(i).appendTo(document.body) : document.write(i), upload_module.model.isFirefox)var o = top.document.getElementById(t); else var o = document.getElementById(t);
        this.control = o
    }, doCommand: function (e, t) {
        function i() {
            return m.indexOf("<result>0</result>") > 0
        }

        function o() {
            var e = $TextUtils.getXmlDoc(m), t = $(e), i = [];
            return t.find("file").each(function () {
                var e = $(this), t = {filePath: e.find("name").text(), fileSize: parseInt(e.find("size").text())};
                t.fileName = t.filePath, i.push(t)
            }), i
        }

        function a() {
            var e = $TextUtils.getXmlDoc(m), t = $(e), i = {
                text: "",
                html: "",
                htmlFiles: "",
                imageFiles: [],
                copyFiles: [],
                otherFiles: []
            };
            return i.text = t.find("CF_TEXT").text(), i.html = t.find("CF_HTML Fragment").text(), t.find("CF_HTML file").each(function () {
                var e = $(this), t = {filePath: e.find("name").text(), fileSize: parseInt(e.find("size").text())};
                t.fileName = t.filePath, i.imageFiles.push(t)
            }), t.find("CF_BITMAP file").each(function () {
                var e = $(this), t = {filePath: e.find("name").text(), fileSize: parseInt(e.find("size").text())};
                t.fileName = t.filePath, i.imageFiles.push(t)
            }), t.find("CF_HDROP file").each(function () {
                var e = $(this), t = {filePath: e.find("name").text(), fileSize: parseInt(e.find("size").text())};
                t.fileName = t.filePath, i.copyFiles.push(t)
            }), t.find("CF_OTHERS file").each(function () {
                var e = $(this), t = {filePath: e.find("name").text(), fileSize: parseInt(e.find("size").text())};
                t.fileName = t.filePath, i.otherFiles.push(t)
            }), i
        }

        function n() {
            var e = $TextUtils.getXmlDoc(m), t = $(e), i = new Date(parseInt(t.find("time").text())), o = parseInt(t.find("oprResult").text());
            if (0 == o) {
                var a = {filePath: t.find("name:eq(0)").text(), fileSize: parseInt(t.find("size:eq(0)").text())};
                a.fileName = a.filePath
            }
            return {time: i, oprResult: o, file: a}
        }

        function s() {
            return m.indexOf("<result>0</result>") > 0
        }

        function r() {
            return parseInt(m.replace(/\D+/g, ""))
        }

        function l() {
            return m.indexOf("<result>0</result>") > 0
        }

        function d() {
            return m.indexOf("<result>0</result>") > 0
        }

        function c() {
            return m.indexOf("<result>0</result>") > 0
        }

        function p() {
            return m.indexOf("<result>0</result>") > 0
        }

        function u() {
            return m.indexOf("<result>0</result>") > 0
        }

        function h() {
            var e = top.$TextUtils.getXmlDoc(m), t = $(e), i = [];
            return t.find("file").each(function () {
                var e = $(this), t = {
                    taskId: e.find("taskId").text(),
                    fileName: e.find("fileName").text(),
                    status: e.find("status").text(),
                    attachId: e.find("attachId").text(),
                    totalSize: parseInt(e.find("totalSize").text()),
                    completedSize: parseInt(e.find("completedSize").text()),
                    transSpeed: parseInt(e.find("transSpeed").text()),
                    needTime: parseInt(e.find("needTime").text()),
                    stopReason: e.find("stopReason").text(),
                    errorCode: e.find("errorCode").text()
                };
                if (-1 != m.indexOf("<httpSvrPostResp>")) {
                    t.isCommonUpload = !0;
                    var o = e.find("httpSvrPostResp").text(), a = {
                        responseText: o,
                        fileName: utool.getFileNameByPath(t.fileName)
                    }, n = utool.checkUploadResultWithResponseText(a);
                    n.success ? t.attachId = n.fileId : (t.stopReason = 5, t.errorCode = n.code, t.summary = n.summary)
                }
                i.push(t)
            }), i
        }

        var m = this.control.Command(t);
        switch (e) {
            case"getopenfilename":
                return o();
            case"getscreensnapshot":
                return s();
            case"getlastscreensnapshot":
                return n();
            case"getclipboardfiles":
                return a();
            case"getversion":
                return r();
            case"upload":
                return l();
            case"suspend":
                return d();
            case"continue":
                return c();
            case"cancel":
                return p();
            case"getstatus":
                return h();
            case"setbreakpointstorepoint":
                return u();
            case"commonupload":
                return i()
        }
    }, getClipboardData: function () {
        var e = "<param><command>localfile_getclipboardfiles</command></param>", t = this.doCommand("getclipboardfiles", e);
        return t
    }, getVersion: function () {
        var e = "<param><command>getversion</command></param>", t = this.doCommand("getversion", e);
        return t
    }, showDialog: function () {
        var e = "<param><command>localfile_getopenfilename</command><title>请选择要上传的文件</title><filter>*.*</filter></param>", t = this.doCommand("getopenfilename", e);
        return t
    }, uploadFileCount: 0, upload: function (e) {
        var t = "<param>            <command>attachupload_upload</command>            <taskId>{taskId}</taskId>            <svrUrl>{svrUrl}</svrUrl>            <sid>{sid}</sid>            <composeId>{composeId}</composeId>            <referer></referer>            <cookie>{cookie}</cookie>            <filePathName>{fileName}</filePathName>	            <size>{fileSize}</size>            </param>", i = {
            svrUrl: top.getProtocol() + location.host + "/coremail/s",
            sid: upload_module.model.sid,
            composeId: upload_module.model.composeId,
            fileName: top.encodeXML(e.filePath),
            fileSize: e.fileSize,
            taskId: e.taskId,
            cookie: top.$T.Utils.format("Coremail={0}; Coremail.sid={1}", [$T.Cookie.get("Coremail"), $T.Cookie.get("Coremail.sid")])
        };
        t = top.$T.Utils.format(t, i);
        var o = this.doCommand("upload", t);
        o ? (e.state = "uploading", e.updateUI(), this.startWatching(), this.uploadFileCount++, utool.logUpload(UploadLogs.MultiStart)) : (e.state = "error", uploadManager.removeFile(e))
    }, commandUpload: function (e) {
        var t = !1;
        (e.insertImage || e.replaceImage) && (t = !0);
        var i = "<param>            <command>attachupload_commonupload</command>            <taskId>{taskId}</taskId>            <svrUrl>{svrUrl}</svrUrl>            <cookie>{cookie}</cookie>            <filePathName>{fileName}</filePathName>            <size>{fileSize}</size>            </param>", o = {
            svrUrl: $T.Xml.encode(utool.getControlUploadUrl(t)),
            fileName: $T.Xml.encode(e.filePath),
            fileSize: e.fileSize,
            taskId: e.taskId,
            cookie: top.$T.Utils.format("Coremail={0}; Coremail.sid={1}; aTestCookie=123", [$T.Cookie.get("Coremail"), $T.Cookie.get("Coremail.sid")])
        };
        i = top.$T.Utils.format(i, o);
        var a = this.doCommand("commonupload", i);
        a ? (e.state = "uploading", e.updateUI(), this.startWatching(), this.uploadFileCount++) : (e.state = "error", uploadManager.removeFile(e))
    }, "continue": function (e) {
        var t = "<param><command>attachupload_continue</command><taskId>" + e.taskId + "</taskId></param>", i = this.doCommand("continue", t);
        return i && this.startWatching(), i
    }, startCheckClipBoard: function () {
        var e = this, t = e.getLastScreenShotAction();
        clearInterval(e.checkClipBoardTimer), e.checkClipBoardTimer = setInterval(function () {
            var i = e.getLastScreenShotAction();
            i.time.getTime() != t.time.getTime() && (clearInterval(e.checkClipBoardTimer), 0 == i.oprResult && e.onScreenShot && e.onScreenShot(i.file))
        }, 1e3)
    }, getStatus: function () {
        var e = this.doCommand("getstatus", "<param><command>attachupload_getstatus</command></param>");
        return e
    }, stop: function (e) {
        if (e) {
            var t = "<param><command>attachupload_suspend</command><taskId>" + e.taskId + "</taskId></param>", i = this.doCommand("suspend", t);
            return i
        }
    }, cancel: function (e) {
        if (e) {
            var t = "<param><command>attachupload_cancel</command><taskId>" + e.taskId + "</taskId></param>", i = this.doCommand("cancel", t), o = utool.getFileById(e.taskId);
            i && o && (this.uploadFileCount > 0 && this.uploadFileCount--, uploadManager.removeFile(o)), utool.logUpload(UploadLogs.MultiCancel)
        }
    }, screenShot: function () {
        var e = this.doCommand("getscreensnapshot", "<param><command>screensnapshot_getscreensnapshot</command></param>");
        return e && this.startCheckClipBoard(), e
    }, getLastScreenShotAction: function () {
        var e = this.doCommand("getlastscreensnapshot", "<param><command>screensnapshot_getlastscreensnapshot</command></param>");
        return e
    }, startWatching: function () {
        var e = this;
        this.watchTimer || (this.watchTimer = setInterval(function () {
            try {
                e.test()
            } catch (t) {
            }
        }, 300))
    }, stopWatching: function () {
        clearInterval(this.watchTimer), this.watchTimer = 0, top.Debug.write("stopWatching")
    }, test: function () {
        var e = this, t = e.getStatus();
        0 == this.uploadFileCount && this.stopWatching();
        for (var i = 0; i < t.length; i++) {
            var o = t[i];
            if (o && o.taskId) {
                var a = utool.getFileById(o.taskId);
                if (!a)return void top.Debug.write("已经移除的taskId：" + o.taskId);
                if (o.status < 4)a.sendedSize = o.completedSize, a.uploadSpeed = o.transSpeed, a.needTime = o.needTime, a.progress = parseInt(100 * (a.sendedSize / a.fileSize || 0)), a.state = "uploading", a.fileId = o.attachId, a.updateUI(); else {
                    if (4 == o.status)if (1 == o.stopReason) {
                        if (o.isCommonUpload) {
                            if (o.attachId)if (a.state = "complete", a.fileId = o.attachId, a.updateUI(), a.insertImage) {
                                upload_module.model.active();
                                var n = upload_module.model.getAttachUrl(o.attachId, o.fileName, !1);
                                htmlEditorView.editorView.editor.insertImage(n)
                            } else a.replaceImage && (replaceAttachImage(o.attachId, o.fileName), top.$App.showImgEditor($(htmlEditorView.editorView.editor.editorDocument).find("body")))
                        } else if (a.state = "complete", a.fileId = o.attachId, a.updateUI(), a.insertImage) {
                            var n = upload_module.model.getAttachUrl(o.attachId, o.fileName, !1);
                            htmlEditorView.editorView.editor.insertImage(n)
                        }
                        utool.logUpload(UploadLogs.MultiSuccess)
                    } else 2 == o.stopReason || 3 == o.stopReason || (0 == o.stopReason ? this.uploadFileCount++ : 4 == o.stopReason ? o.errorCode && /^(5|6|17|24)$/.test(o.errorCode) ? utool.logUpload(UploadLogs.MultiFail2, "errorCode=" + o.errorCode) : utool.logUpload(UploadLogs.MultiFail1, "errorCode=" + o.errorCode) : 5 == o.stopReason && (o.errorCode.indexOf("SESSION") >= 0 ? top.$App.showSessionOutDialog() : top.$Msg.alert(o.summary)));
                    if (this.uploadFileCount > 0 && this.uploadFileCount--, 4 == o.status && uploadManager.autoUpload(), o.stopReason > 2) {
                        var s = "multiThread upload fail,stopReason:{stopReason},fileName:{fileName},fileSize:{fileSize},sendedSize:{sendedSize}";
                        try {
                            s = top.$T.Utils.format(s, {
                                stopReason: o.stopReason,
                                fileName: a.fileName,
                                fileSize: a.fileSize,
                                sendedSize: a.sendedSize
                            }), uploadManager.onUploadError(s)
                        } catch (r) {
                        }
                    }
                }
            }
        }
    }
}, upload_module_screenShot = {
    isSupport: function () {
        return !1
    }
};
var upload_module_ajax = {
    init: function () {
        document.body.addEventListener("dragenter", _dragenter, !1), document.body.addEventListener("dragover", _dragover, !1), document.body.addEventListener("drop", _drop, !1);
        var e = document.getElementById("uploadInput");
        e.onmouseover = function () {
            upload_module.model.requestComposeId(), e.onmouseover = null
        }, e.setAttribute("multiple", !0), e.onchange = function () {
            var e = this.files;
            upload_module.model.requestComposeId();
            for (var t = uploadManager.fileList, i = 0; i < t.length; i++) {
                var o = t[i];
                if ("blockerror" == o.state)return void $Msg.alert("上传队列中存在上传中断的文件，请续传或删除后才能选择新的文件上传。")
            }
            var a = this, n = UploadLargeAttach.isShowLargeAttach(e, "ajax", function (t) {
                return t && t.isCancel ? void a.parentNode.reset() : (UploadLargeAttach.isLargeAttach && $(e).each(function (e, t) {
                    t.isLargeAttach = !0
                }), _uploadFiles(e), void a.parentNode.reset())
            });
            n || (_uploadFiles(e), this.parentNode.reset())
        }, e.onclick = function () {
            return BH({key: "compose_commonattach"}), upload_module_screenShot.isUploading ? (top.$Msg.alert(ComposeMessages.PleaseUploadSoon, {
                onclose: function (e) {
                }
            }), !1) : void 0
        }
    }, upload: function (e) {
        e && e.fileObj && (HTML5AJAXUpload.lastSendedTime = new Date, HTML5AJAXUpload.lastSendedSize = 0, HTML5AJAXUpload.retryCount = 0, HTML5AJAXUpload.isCancel = !1, UploadLargeAttach.enable ? UploadLargeAttach.prepareUpload(e, function (t) {
            HTML5AJAXUpload.upload(e)
        }) : HTML5AJAXUpload.upload(e))
    }, cancel: function () {
        HTML5AJAXUpload.isCancel = !0, HTML5AJAXUpload.stop(arguments), HTML5AJAXUpload.clearTimer(), HTML5AJAXUpload.currentFile && uploadManager.removeFile(HTML5AJAXUpload.currentFile), uploadManager.autoUpload()
    }, uploadResume: function (e) {
        e && e.fileObj && HTML5AJAXUpload.upload(e)
    }, isSupport: function () {
        return window.FormData && !$B.is.opera && !$B.is.ie
    }, clearUploadInterval: function () {
        clearInterval(HTML5AJAXUpload.interval)
    }
}, HTML5AJAXUpload = {
    timeout: 3e6, xhr: {}, currentFile: {}, interval: 0, onabort: function (e) {
        console.log("onabort"), console.log(e)
    }, onerror: function (e) {
        if (!this.isCancel) {
            if ($B.is.firefox)return void M139.Logger.sendClientLog({
                level: "ERROR",
                name: "ajax I/O Error from firefox",
                errorMsg: "exception from firefox onerror"
            });
            var t = this, i = this.currentFile;
            i.state = "blockerror", i.errorProgress = i.progress, "retryLimit" == e && (i.stateDetail = "retryLimit"), i.updateUI(), M139.Logger.sendClientLog({
                level: "ERROR",
                name: "ajax I/O Error",
                errorMsg: "fileName:" + i.fileName + "|error:" + e + "|progress: " + i.progress
            }), top.$App.trigger("httperror", {isTimeout: !0}), this.timeoutId && window.clearTimeout(this.timeoutId), this.retryCount <= 100 ? setTimeout(function () {
                t.uploadResume(i)
            }, 5e3) : i.updateUI()
        }
    }, onload: function (e) {
    }, onloadend: function (e) {
    }, onloadstart: function (e) {
    }, onprogress: function (e) {
        var t = this;
        if (e.lengthComputable) {
            var i = t.currentFile;
            i.sendedSize = i.offset + e.loaded, i.progress && (i.maxProgress = Math.max(i.progress, i.maxProgress || 0), i.maxProgress = Math.min(i.maxProgress, 99)), i.progress = parseInt(i.sendedSize / i.fileSize * 100), i.state = "uploading", i.uploadSpeed = (i.sendedSize - this.lastSendedSize) / (new Date - this.lastSendedTime), console.log("上传进度" + i.progress + "|时间: " + new Date), window.isOffline && i.progress > i.maxProgress && (top.M139.UI.TipMessage.hide(), window.isOffline = !1), i.updateUI(), t.handleProgress(i), i.uploadSpeed > 0 && i.uploadSpeed < 10 && M139.Logger.sendClientLog({
                level: "INFO",
                name: "upload speed is too slow",
                errorMsg: "speed:" + i.uploadSpeed + "|filename:" + i.fileName + "|progress: " + i.progress
            }), this.retryCount > 0 && i.sendedSize > this.lastSendedSize && !this.retryLogSended && (M139.Logger.sendClientLog({
                level: "INFO",
                name: "upload fail retry",
                errorMsg: "retry ok," + i.fileName + "|progress: " + i.progress
            }), this.retryLogSended = !0), this.lastSendedTime = new Date, this.lastSendedSize = i.sendedSize
        }
        this.monitorTimeout(i)
    }, handleProgress: function (e) {
        var t = this;
        if (e.progress >= 99) {
            clearInterval(t.interval);
            var i = 0;
            t.interval = setInterval(function () {
                i++;
                var o = (e.isLargeAttach, 10);
                return i > o || "retryLimit" == e.stateDetail ? (clearInterval(t.interval), void t.onerror("retryLimit")) : (M139.Logger.sendClientLog({
                    level: "INFO",
                    name: "handleProgress 99%",
                    errorMsg: "filename:" + e.fileName + "|time: " + M139.Date.getServerTime() + "|islarge:" + e.isLargeAttach
                }), void("complete" != e.state && (e.isLargeAttach ? (this.isUpdateLargeStatus = !0, UploadLargeAttach.monitorComplete(e, function () {
                    clearInterval(t.interval), M139.Logger.sendClientLog({
                        level: "INFO",
                        name: "largeAttach 99% success",
                        errorMsg: "filename:" + e.fileName + "|timeEnd: " + M139.Date.getServerTime()
                    }), e.state = "complete", e.updateUI(), UploadLargeAttach.completeUpload(e)
                })) : (M139.Logger.sendClientLog({
                    level: "INFO",
                    name: "handleProgress 99%, update status",
                    errorMsg: "filename:" + e.fileName + "|time: " + M139.Date.getServerTime()
                }), t.isUpdateStatus = !0, updateAttachStatus(e, function () {
                    clearInterval(t.interval), e.state = "complete", e.updateUI(), M139.Logger.sendClientLog({
                        level: "INFO",
                        name: "handleProgress 99% success",
                        errorMsg: "filename:" + e.fileName + "|timeEnd: " + M139.Date.getServerTime()
                    })
                })))))
            }, 8e3)
        }
    }, monitorTimeout: function (e) {
        var t = this;
        window.lastFile = e, this.timeoutId && window.clearTimeout(this.timeoutId), this.timeoutId = window.setTimeout(function () {
            e == window.lastFile && e.progress < 100 && e.progress == window.lastFile.progress && "complete" != e.state && (top.$App.trigger("httperror", {isTimeout: !0}), t.ontimeout())
        }, 3e5)
    }, clearTimer: function () {
        this.timeoutId && window.clearTimeout(this.timeoutId)
    }, ontimeout: function (e) {
        var t = this.currentFile, i = "上传超时,fileName:" + t.fileName + "|fileSize:" + t.fileSize + "|progress:" + (t.progress || "0") + "%";
        console.warn(i), M139.Logger.sendClientLog({
            level: "ERROR",
            name: "request timeout",
            errorMsg: i
        }), console.log(t), this.uploadResume(t)
    }, onreadystatechange: function (e) {
        var t = this.xhr, i = this;
        if (4 == t.readyState)if (200 == t.status) {
            var o = i.currentFile, a = t.responseText;
            a.indexOf("middleret") > 0 && (a = UploadLargeAttach.responseConvert(a));
            var n = i.uploadResult = utool.checkUploadResultWithResponseText({responseText: a, fileName: o.fileName});
            n.success ? n.fileSize == o.fileSize ? i.oncomplete() : n.offset + n.length < o.fileSize && (o = $.extend(o, n), o.offset = n.offset + n.length, o.isLargeAttach && (o.offset = o.offset + 1), o.state = "uploading", o.updateUI(), i.upload(o)) : i.onFail("response not ok:" + t.responseText)
        } else i.onFail("http code:" + t.status)
    }, oncomplete: function () {
        var e = this.currentFile;
        e.fileId = this.uploadResult.fileId, e.state = "complete", e.progress = 100, e.updateUI(), UploadLargeAttach.completeUpload(e), uploadManager.autoUpload(), uploadManager.isUploadComplete() && (this.isUpdateStatus ? M139.Logger.sendClientLog({
            level: "INFO",
            name: "handleProgress 99% success",
            errorMsg: "timeEnd: " + M139.Date.getServerTime()
        }) : this.isUpdateLargeStatus && M139.Logger.sendClientLog({
            level: "INFO",
            name: "largeAttach 99% success",
            errorMsg: "timeEnd: " + M139.Date.getServerTime()
        }), this.isUpdateStatus = !1, this.isUpdateLargeStatus = !1, clearInterval(this.interval), refreshAttach(null, null, !0)), utool.logUpload(UploadLogs.AjaxSuccess)
    }, onFail: function (e) {
        var t = this.currentFile;
        t.state = "uploading", t.updateUI(), utool.logUpload(UploadLogs.AjaxFail);
        var i = this.xhr.responseText;
        i.indexOf("FA_ATTACH_SIZE_EXCEED") > 0 ? (console.log("附件大小超过服务端允许的大小!responseText:" + i), top.$Msg.alert(ComposeMessages.FileSizeOverFlow), M139.Logger.sendClientLog({
            level: "ERROR",
            name: "html5Upload fail: " + e,
            errorMsg: ComposeMessages.FileSizeOverFlow + "responseText" + i
        })) : i.indexOf("FS_UNKNOWN") > 0 ? (console.log("上传文件未知错误!responseText:" + i), top.$Msg.alert(ComposeMessages.FileUploadFail), M139.Logger.sendClientLog({
            level: "ERROR",
            name: "html5Upload fail: " + e,
            errorMsg: ComposeMessages.FileUploadFail + "responseText" + i
        })) : i.indexOf("FA_INVALID_SESSION") >= 0 ? (top.$App.showSessionOutDialog(), this.onerror(e)) : this.onerror(e)
    }, uploadResume: function (e) {
        this.isCancel || (this.retryCount++, HTML5AJAXUpload.upload(e), M139.Logger.sendClientLog({
            level: "INFO",
            name: "upload fail retry",
            errorMsg: "time:" + (new Date).toString() + "|retryCount:" + this.retryCount + "|progress: " + e.progress + "|fileName: " + e.fileName
        }))
    }, upload: function (e) {
        e.offset = e.offset || 0, e.length = e.length || 1048576;
        var t = this;
        this.currentFile = e;
        var i = this.getFileUploadXHR();
        this.xhr = i, i.upload.onabort = function (e) {
            t.onabort(e)
        }, i.upload.onerror = function (e) {
            t.onerror(e)
        }, i.upload.onload = function (e) {
            t.onload(e)
        }, i.upload.onloadend = function (e) {
            t.onloadend(e)
        }, i.upload.onloadstart = function (e) {
            t.onloadstart(e)
        }, i.upload.onprogress = function (e) {
            t.onprogress(e)
        }, i.onreadystatechange = function (e) {
            t.onreadystatechange(e)
        }, this.isSupportFileSlice = t.isSupportFileSliceFn(e.fileObj);
        var o = this.isSupportFileSlice ? utool.getBlockUploadUrl("html5") : utool.getControlUploadUrl();
        e.isLargeAttach && (o = e.uploadUrl), i.open("POST", o, !0), i.timeout = this.timeout;
        var a = this.getFormData(e);
        i.send(a), !e.fileName && t.onerror("fileName is null"), e.state = "uploading", e.updateUI(), utool.logUpload(UploadLogs.AjaxStart)
    }, getFormData: function (e) {
        var t, i = new FormData;
        t = e.isLargeAttach ? this.getFileDataForLarge(e) : this.getFileData(e);
        for (var o in t)"FileData" == o ? i.append(o, t[o], encodeURI(e.fileName || "unknown")) : i.append(o, t[o]);
        return i
    }, getFileData: function (e) {
        var t = this;
        if (!t.isSupportFileSlice)return {FileData: e.fileObj};
        var i = this.getRange(e);
        return {
            timestamp: (new Date).toDateString(),
            type: "1",
            sip: e.sip || "",
            range: i.from + "-" + i.to,
            fileid: e.fileId || "",
            filesize: e.fileSize,
            Filename: encodeURI(e.fileName),
            FileData: t.fileSlice(e.fileObj, i.from, i.to)
        }
    }, getFileDataForLarge: function (e) {
        var t = UploadLargeAttach.postParams, i = this.getRange(e, 1);
        return t.range = i.from + "-" + i.to, t.filedata = this.fileSlice(e.fileObj, i.from, i.to + 1), t
    }, getRange: function (e, t) {
        var i = e.offset, o = Number(e.offset) + Number(e.length);
        return o = o > e.fileSize ? e.fileSize : o, t || (t = 0), {from: i, to: o - t}
    }, stop: function (e) {
        this.xhr.abort(), e && e.length && M139.Logger.sendClientLog({
            level: "ERROR",
            name: "stop upload",
            errorMsg: "is stoping the upload,fileName: " + e[0].fileName
        }), utool.logUpload(UploadLogs.AjaxCancel)
    }, getFileUploadXHR: function () {
        return window.fileUploadXHR || (fileUploadXHR = new XMLHttpRequest), fileUploadXHR
    }, isSupportFileSliceFn: function (e) {
        return !!(e.slice || e.webkitSlice || e.mozSlice)
    }, fileSlice: function (e, t, i) {
        var o = e.type;
        return e.slice ? e.slice(t, i, o) : e.webkitSlice ? e.webkitSlice(t, i, o) : e.mozSlice ? e.mozSlice(t, i, o) : void 0
    }
}, Arr_DiskAttach = [], Arr_OutLink = [], internalAttachArr = [], documentExts = "doc/docx/pdf/txt/htm/html/ppt/pptx/xls/xlsx/rar/zip/7z/eml", imageExts = "jpg/gif/png/ico/jfif/tiff/tif/bmp/jpeg/jpe", videoExts = "mpg/mpeg/mp4/mov/avi/rm/rmvb/wmv/asf/flv/mkv/3gp", musicExts = "mp3/m4a/wma/wav/ogg", unableInsertExts = "htm/html/rar/zip/7z", zipExts = /\.(?:rar|zip|7z)$/i, UploadLargeAttach = {
    enable: !1,
    currentFile: null,
    isLargeAttach: !1,
    isShowLargeAttach: function (e, t, i) {
        var o = this, a = !1, n = !0, s = 0, r = 52428800, l = [], d = !1, c = !1;
        return top.$App.isReadSessionMail() || (l = _.union(addrInputView.toRichInput.getValidationItems(), addrInputView.ccRichInput.getValidationItems()), $(l).each(function (e, t) {
            "-1" == t.indexOf("@139.com") && (n = !1)
        })), 0 == l.length && (n = !1), UploadLargeAttach.enable = !1, UploadLargeAttach.isLargeAttach = !1, $(e).each(function (e, t) {
            var i = t.fileSize || t.size;
            s += i, c = o.checkFilesSize(i, c)
        }), c ? (i({isCancel: !0}), void uploadManager.removeFile(e)) : (("ajax" == t && !utool.checkSizeSafe(s) || "flash" == t && utool.getSizeNow() >= r) && (d = !0), d ? (top.tipsBox = top.$Msg.confirm("附件总大小超过50M，可能会被对方邮箱拒收。<br>使用 <b title='超大附件以链接形式发送，文件在您的暂存柜内保存15天，续期后可以保留更久。'>超大附件<i class='i_wenhao'></i></b>发送，对方接收无障碍。", function () {
            UploadLargeAttach.enable = !0, UploadLargeAttach.isLargeAttach = !0, BH({key: "compose_send_largeAttach_50M"}), i()
        }, function () {
            i({isCancel: !0}), uploadManager.removeFile(e)
        }, {isHtml: !0, icon: "i_warn", buttons: ["是，使用超大附件!", "不，取消上传"]}), !0) : a)
    },
    checkFilesSize: function (e, t) {
        if (t)return !0;
        if (e > 4294967296)return top.$Msg.alert("文件单个上传大小已超套餐限制4G，请重新选择。"), !0;
        var i = 1024 * (top.$User && top.$User.getCapacity("maxannexsize") || 4096) * 1024;
        if (e > i) {
            var o = ['<div class="norTips" style="padding:40px 20px;">', '<span class="norTipsIco"><i class="MB_Icon i_warn"></i></span>', '<dl class="norTipsContent">', '<dt class="norTipsTitle MB_MessageBox_Title" style="display:none"></dt>', '<dd class="norTipsLine ">文件单个上传大小已超过2G，<a id="upPack" href="javascript:top.$App.show(\'usercenter\');">升级套餐</a>可上传更大文件。</dd>', "</dl>", "</div>"].join(""), a = top.$Msg.showHTML(o, function (e) {
            }, function (e) {
            }, {
                onClose: function (e) {
                }, width: 400, height: 129, buttons: ["确定"], dialogTitle: "系统提示"
            });
            return a.$el.find("#upPack").click(function () {
                a.close()
            }), !0
        }
        return !1
    },
    prepareUpload: function (e, t) {
        function i(i) {
            var a = {fileName: e.fileName, fileSize: e.fileSize, fileMd5: i};
            window.isOffline, e.comeFrom = "cabinet", e.fileType = "keepFolder", M139.RichMail.API.call("file:fastUpload", a, function (i) {
                if (e.isCancel)return uploadManager.removeFile(e), void uploadManager.autoUpload();
                if ("uploading" == e.state, i.responseData.code && "S_OK" == i.responseData.code) {
                    var a = i.responseData;
                    a && "https:" == window.location.protocol && (a["var"].url = a["var"].url.replace("http://", "https://"), a["var"].url = a["var"].url.replace(":80", ""));
                    var n = i.responseData["var"].status;
                    if (e.fileName = i.responseData["var"].fileName, "0" == n) {
                        var s = i.responseData["var"].postParam;
                        e.fileId = i.responseData["var"].fileId, e.fileIdForSend = i.responseData["var"].fileId, e.uploadUrl = i.responseData["var"].url, o.uploadUrl = e.uploadUrl, o.postParams = s, t(s)
                    } else if ("1" == n) {
                        uploadManager.removeFile(e), e.fileId = i.responseData["var"].fileId, e.state = "complete", e.fileIdForSend = i.responseData["var"].fileId;
                        var r = [o.transformFile(e)];
                        window.$composeApp.trigger("obtainCabinetFiles", r), uploadManager.autoUpload()
                    }
                } else i.responseData.summary ? top.$Msg.alert("上传失败，错误原因：" + i.responseData.summary) : top.$Msg.alert("上传失败，错误原因：" + i.responseData.code), uploadManager.removeFile(e), top.M139.UI.TipMessage.hide(), upload_module.model.autoSendMail = !1
            })
        }

        var o = this;
        if (this.currentFile = e, e.isLargeAttach = !0, e.md5)i(e.md5); else {
            if ("uploading" == e.state || e.getMd5)return void M139.Logger.sendClientLog({
                level: "INFO",
                name: "PreUpload",
                errorMsg: "PreUpload Twice"
            });
            this.getFileMd5(i)
        }
    },
    monitorComplete: function (e, t) {
        M139.HttpRouter.addRouter("file", ["file:getUploadStatus"]), M139.RichMail.API.call("file:getUploadStatus", {fileId: e.fileIdForSend}, function (e) {
            var i = e.responseData;
            "S_OK" == i.code && (M139.Logger.sendClientLog({
                level: "INFO",
                name: "getUploadStatus response",
                errorMsg: e.responseText
            }), "0" == i["var"].status && t())
        })
    },
    transformFile: function (e) {
        return {
            comeFrom: "cabinet",
            fileId: e.fileIdForSend,
            fileName: e.fileName,
            fileSize: $T.Utils.getFileSizeText(e.fileSize),
            fileType: "keepFolder",
            state: "success"
        }
    },
    completeUpload: function (e) {
        if (e.isLargeAttach) {
            uploadManager.removeFile(e);
            var t = [this.transformFile(e)];
            window.$composeApp.trigger("obtainCabinetFiles", t)
        }
    },
    getFileMd5: function (e) {
        this.timeBegin = new Date, this.uploading = !0;
        var t, i = 1, o = top.getRootPath() + "/js/ui/upload/calculator.worker.md5.js";
        t = new Worker(o), t.addEventListener("message", this.handle_worker_event("md5_file_hash_" + i, e)), this.hash_file(this.currentFile.fileObj, t)
    },
    hash_file: function (e, t) {
        var i, o, a, n, s, r = function (e) {
            a += 1, t.postMessage({message: e.target.result, block: o})
        }, l = function (t) {
            a -= 1, 0 === a && o.end !== e.size && (o.start += i, o.end += i, o.end > e.size && (o.end = e.size), n = new FileReader, n.onload = r, s = HTML5AJAXUpload.fileSlice(e, o.start, o.end), n.readAsArrayBuffer(s))
        };
        i = 1048576, o = {
            file_size: e.size,
            start: 0
        }, o.end = i > e.size ? e.size : i, a = 0, t.addEventListener("message", l), n = new FileReader, n.onload = r, s = HTML5AJAXUpload.fileSlice(e, o.start, o.end), n.readAsArrayBuffer(s)
    },
    handle_worker_event: function (e, t) {
        var i = this;
        return function (e) {
            e.data.result ? t && t(e.data.result) : (i.currentFile.getMd5 = Math.floor(100 * e.data.block.end / e.data.block.file_size) + "%", i.currentFile.updateUI())
        }
    },
    responseConvert: function (e) {
        var t, i;
        if (e.indexOf("S_OK") >= 0 || e.indexOf("<retcode>118</retcode>") >= 0) {
            i = /<fileid>(.+?)<\/fileid>/i;
            var o = e.match(i), a = o[1];
            t = "<script>document.domain=window.location.host.match(/[^.]+.[^.]+$/)[0]; var return_obj={'code':'S_OK','var':{\"fileId\":\"" + a + '","fileName":"' + this.currentFile.fileName + '","fileSize":' + this.currentFile.fileSize + "}};</script>"
        } else {
            i = /<fileid>(.+?)<\/fileid>.+<range>(.+?)<\/range>/i;
            var o = e.match(i), a = o[1], n = o[2].split("-");
            t = "<script>document.domain=window.location.host.match(/[^.]+.[^.]+$/)[0]; var return_obj={'code':'S_OK','var':{\"fileId\":\"" + a + '","sip":"webapp_ip25","offset":' + n[0] + ',"length":' + (n[1] - n[0]) + "}};</script>"
        }
        return t
    }
}, UploadManager = function () {
    this.init.apply(this, arguments)
}, TaskID = 1e4;
UploadManager.prototype = {
    init: function (e) {
        var t = this;
        this.currentUploadType = "none", this.fileList = [], this.container = e.container, this.jContainer = $(e.container), this.callback = e.callback, this.callObject = e.callObject, this.jContainer.click(function (e) {
            var i = e.target;
            if ("A" == i.tagName && i.getAttribute("command")) {
                var o = i.getAttribute("taskid"), a = i.getAttribute("fileid"), n = utool.getFileById(o || a);
                t.doCommand({command: i.getAttribute("command"), file: n, imgUrl: i.getAttribute("imgUrl")})
            }
        }), $("#uploadInput").on("click", function () {
            setTimeout(function () {
                $("#uploadInput").removeAttr("accept")
            }, 200)
        }), $("#floatDiv").click(function (e, t) {
            "fakeClick" !== t && (uploadManager.callback = null, delete uploadManager.callback, delete uploadManager.filterType)
        }), window.addEventListener && (window.addEventListener("online", function () {
            for (var e = 0; e < t.fileList.length; e++) {
                var i = t.fileList[e];
                if ("blockerror" == i.state)return void t.uploadResume(i)
            }
            window.isOffline = !1
        }, !0), window.addEventListener("offline", function () {
            window.isOffline = !0
        }, !0)), top.$App.on("offline", function () {
            window.isOffline = !0
        })
    }, doCommand: function (e) {
        switch (e.command) {
            case"RemoveFile":
                this.removeFile(e.file), e.file.isCancel = !0, this.updateAutoSendStatus();
                break;
            case"DeleteFile":
                e.file.state && "uploading" == e.file.state ? uploadManager.cancelUploading() : upload_module.deleteFile(e), upload_module_ajax.clearUploadInterval();
                break;
            case"CancelUpload":
                e.file.cancelUpload(), uploadManager.autoUpload(), this.updateAutoSendStatus();
                break;
            case"ResumeUpload":
                this.uploadResume(e.file)
        }
    }, isUploadAble: function () {
        return !this.isUploading()
    }, uploadFile: function (e) {
        $.isArray(e) || (e = [e]);
        for (var t = 0, i = !1, o = 104857600, a = 52428800, n = 0; n < e.length; n++) {
            var s = e[n];
            if ("screenShot" != s.uploadType && utool.checkFileExist(s.fileName) && !s.replaceImage && !s.insertImage) {
                var r = ComposeMessages.FileNameExist, l = top.$T.Utils.htmlEncode(utool.getFileNameByPath(s.fileName)), d = top.$T.Utils.format(r, [l]);
                return top.$Msg.alert(d, {
                    isHtml: !0, onclose: function (e) {
                    }
                }), !1
            }
            if ("multiThread" == s.uploadType && top.BH({key: "use_139tools"}), "multiThread" == s.uploadType && 0 == s.fileSize && !s.replaceImage) {
                var c = ComposeMessages.NoFileSize, l = top.$T.Utils.htmlEncode(utool.getFileNameByPath(s.fileName)), d = top.$T.Utils.format(c, [l]);
                return top.$Msg.alert(d, {
                    isHtml: !0, onclose: function (e) {
                    }
                }), !1
            }
            if ("multiThread" == s.uploadType && s.fileSize > a) {
                var p = ComposeMessages.ctrlVFileSizeOverFlow, u = ComposeMessages.ctrlVFileSizeOverFlowAutoUpload;
                return top.$Msg.confirm(u, function () {
                    uploadView && uploadView.selectFile()
                }, function () {
                }, {icon: "warn", buttons: ["是，使用超大附件！", "不，取消上传"]}), !1
            }
            if ("flash" == s.uploadType && s.fileSize >= o)return uploadManager.removeFile(e), uploadView && uploadView.showLargeAttachDialog(), !1;
            if (UploadLargeAttach.isLargeAttach || s.fileSize && (t += s.fileSize), "multiThread" == s.uploadType && !utool.checkSizeSafe(t)) {
                var p = ComposeMessages.FileSizeOverFlow;
                return top.$Msg.alert(p, {
                    onclose: function (e) {
                    }
                }), !1
            }
        }
        for (var n = 0; n < e.length; n++) {
            var s = e[n], h = {};
            h.uploadType = s.uploadType, h.fileName = s.fileName, h.fileSize = s.fileSize || 0, h.taskId = s.taskId || TaskID++, h.fileObj = s.fileObj, h.insertImage = s.insertImage, h.replaceImage = s.replaceImage, h.isLargeAttach = s.isLargeAttach, h.fromVideoUpload = s.fromVideoUpload, h.callback = s.callback, h.callObject = s.callObject, "common" == h.uploadType ? h.state = "uploading" : h.state = s.state;
            var m, l = h.fileName.split(/[\\\/]/g).pop(), f = new UploadFileItem(h);
            this.filterType && (f.filterType = this.filterType, 0 == f.filterType.test(h.fileName)) ? i || (i = !0, m = f.filterType.source, m.indexOf("docx") > 0 ? m = "doc(x), ppt(x), xls(x), pdf, txt" : m.indexOf("mp3") > 0 ? m = "mp3" : m.indexOf("mp4") > 0 && (m = "mp4, flv"), top.$Msg.alert("请选择" + m + "类型的文件。")) : this.fileList.push(f)
        }
        this.filterType && delete this.filterType, this.render({type: "add"});
        var g = this;
        upload_module.model.requestComposeId(function () {
            g.autoUpload()
        })
    }, removeFile: function (e) {
        for (var t = this.fileList, i = 0; i < t.length; i++) {
            var o = t[i];
            if (o.taskId == e.taskId) {
                o.remove(function (e) {
                    upload_module.model.composeAttachs;
                    e && (t.splice(i, 1), removeFromAttach(o.fileId))
                });
                break
            }
        }
        this.render({type: "remove"}), top.$App.trigger("changeMobileUploadedPics", e)
    }, isUploadComplete: function () {
        for (var e = this.fileList, t = 0, i = 0; i < e.length; i++) {
            var o = e[i];
            "complete" == o.state && t++
        }
        return t == e.length
    }, autoUpload: function () {
        var e = this.fileList, t = this.isUploading();
        if (!t) {
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                if ("waiting" == o.state)return o.upload(), !0
            }
            "function" == typeof this.callback && (this.callback(), delete this.callback), upload_module.model.autoSendMail && setTimeout(function () {
                upload_module.model.autoSendMail && $("#topSend").click()
            }, 2e3)
        }
        return BH({key: "compose_commonattachsuc"}), !1
    }, isUploading: function () {
        for (var e = this.fileList, t = 0; t < e.length; t++) {
            var i = e[t];
            if ("uploading" == i.state)return !0
        }
        return !1
    }, isLargeAttachUploading: function () {
        for (var e = this.fileList, t = 0; t < e.length; t++) {
            var i = e[t];
            if (i.isLargeAttach && ("waiting" == i.state || "uploading" == i.state))return !0
        }
        if (top.selectFileDialog001) {
            var o = $(top.selectFileDialog001.el).find("iframe")[0].contentWindow;
            if (o && o.selectFileView) {
                var a = o.selectFileView.UploadApp.model;
                if (a.isUploading())return !0
            }
        }
        return !1
    }, updateAutoSendStatus: function () {
        for (var e = this.fileList, t = !1, i = 0; i < e.length; i++) {
            var o = e[i];
            if ("waiting" == o.state || "uploading" == o.state) {
                t = !0;
                break
            }
        }
        !t && upload_module.model.autoSendMail && mainView.cancelAutoSend({
            tip: "您已删除上传的附件，自动发送取消",
            className: "msgOrange"
        })
    }, render: function (e) {
        e && "refresh" == e.type && (this.container.innerHTML = "");
        var t = this.fileList, i = [];
        UploadFileItem.prototype.previewImg = [];
        for (var o = 0; o < t.length; o++) {
            var a = t[o];
            if (a.insertImage || a.replaceImage)a.updateUI("", e.type); else if (a.hasUI()) {
                var n = a.uploadType ? e.type : "refresh";
                a.updateUI("", n)
            } else this.container.appendChild(a.createUI(i, e.type))
        }
        renderLargeAttachList();
        var s = this.container;
        "" != s.innerHTML ? $([s, s.parentNode]).show() : $([s, s.parentNode]).hide(), window.conversationPage && window.PageMid && (e.len = t.length || 1, top.$App.trigger("conversationResize_" + window.PageMid, e)), top.$App.trigger("attachUploadComplete")
    }, refresh: function (e) {
        var t, i = this.fileList = [];
        t = utool.getAttachFiles();
        for (var o = 0; o < t.length; o++) {
            var a = t[o], n = new UploadFileItem({
                type: "Common",
                fileName: a.fileName || a.name,
                fileId: a.id || a.fileId,
                fileSize: a.fileSize || a.size || 0,
                insertImage: a.insertImage,
                replaceImage: a.replaceImage,
                fromVideoUpload: a.fromVideoUpload,
                isComplete: 0 === a.status || !a.hasOwnProperty("status")
            });
            i.push(n)
        }
        this.render({type: "refresh"}), "function" == typeof e && e()
    }, onUploadError: function (e) {
        top.SendScriptLog(e)
    }, cancelUploading: function () {
        for (var e = 0; e < this.fileList.length; e++) {
            var t = this.fileList[e];
            "uploading" == t.state && t.cancelUpload()
        }
    }, uploadResume: function (e) {
        e.uploadResume()
    }
}, UploadFileItem = function () {
    this.init.apply(this, arguments)
}, UploadFileItem.prototype = {
    init: function (e) {
        this.uploadType = e.uploadType, this.fileType = e.fileType || "common", this.filePath = e.fileName, this.fileName = utool.getFileNameByPath(e.fileName), this.fileSize = parseInt(e.fileSize), this.taskId = e.taskId || Math.random(), this.fileId = e.fileId, this.fileObj = e.fileObj, this.insertImage = e.insertImage, this.replaceImage = e.replaceImage, this.isLargeAttach = e.isLargeAttach, this.fromVideoUpload = e.fromVideoUpload, this.isComplete = Boolean(e.isComplete), this.callback = e.callback, this.callObject = e.callObject, this.isComplete ? this.state = "complete" : this.state = e.state || "waiting", this.lastUIState = "none", this.showProgress = "common" != this.uploadType, this.knownFileSize = "common" != e.uploadType
    }, hasUI: function () {
        return Boolean(this.container)
    }, createUI: function (e, t) {
        var i = document.createElement("li");
        return i.className = "", this.container = i, this.updateUI(e, t), i
    }, remove: function (e) {
        var t = this.container, i = this.fileName, o = !1;
        "function" != typeof e && (e = noop), this.hasUI() && (htmlEditorView.editorView.editor.jEditorDocument.find(".inserted_Mark i:first").each(function () {
            $(this).text() == i && (o = !0)
        }), o ? top.$Msg.confirm("删除附件后，邮件正文中的文件会同时被删除，确定删除吗？", function () {
            t.parentNode.removeChild(t), upload_module.removeRichMediaFile(i), e(!0)
        }, function () {
            e(!1)
        }, {icon: "i_warn"}) : (t.parentNode.removeChild(t), e(!0)))
    }, updateUI: function (e, t) {
        var i = "uploading" == this.state && this.showProgress && "uploading" == this.lastUIState;
        if ("waiting" == this.state && this.isLargeAttach && "waiting" == this.lastUIState && (i = !0), this.insertImage || this.replaceImage)return void this.updateInsertImageLoading();
        if (i)this.updateProgress(); else {
            var o = "";
            switch (this.state) {
                case"waiting":
                    o = this.getWaitingHTML(), $("#divUploadTip").hide();
                    break;
                case"complete":
                    o = this.getCompleteHTML(t), utool.fillSubject(this.fileName);
                    break;
                case"uploading":
                    o = this.showProgress ? this.getProgressUploadingHTML() : this.getCommonUploadingHTML();
                    break;
                case"blockerror":
                    o = this.getProgressUploadingHTML({resume: !0});
                    break;
                case"error":
                    o = ""
            }
            if ("uploading" == this.state || "upLoad shadow" == this.container.className, this.container.innerHTML = o, $(this.container).attr("filetype", "attach"), "complete" == this.state) {
                var a = $(this.container).find("span:first").text(), n = ($(this.container).find("span:first").attr("fileid"), a.lastIndexOf(".")), s = a.length, r = a.substring(n, s), l = $(this.container).find("a:first").attr("imgUrl"), d = $(this.container).find("a:first").attr("downloadurl"), c = /(?:\.jpg|\.gif|\.png|\.ico|\.jfif|\.bmp|\.jpeg|\.jpe)$/i.test(r);
                if (c) {
                    var p = {imgUrl: l, fileName: a, downLoad: d}, u = UploadFileItem.prototype.previewImg.push(p);
                    $(this.container).attr("index", u - 1)
                }
            }
            2 == this.clientType && "waiting" === this.state && $(this.container).find('[command="RemoveFile"]').hide(), $(this.container).show()
        }
        this.lastUIState = this.state
    }, srcollImgPreview: function (e) {
        var t = $(e).parents("li").attr("index");
        "" != t && ("undefined" != typeof top.focusImagesView ? top.focusImagesView.render({
            data: UploadFileItem.prototype.previewImg,
            num: parseInt(t)
        }) : (top.M139.registerJS("M2012.OnlinePreview.FocusImages.View", "packs/focusimages.html.pack.js?v=" + Math.random()), top.M139.requireJS(["M2012.OnlinePreview.FocusImages.View"], function () {
            top.focusImagesView = new top.M2012.OnlinePreview.FocusImages.View, top.focusImagesView.render({
                data: UploadFileItem.prototype.previewImg,
                num: parseInt(t)
            })
        })))
    }, updateInsertImageLoading: function () {
        switch (this.state) {
            case"waiting":
            case"uploading":
                top.M139.UI.TipMessage.show("图片加载中...");
                break;
            case"complete":
                top.M139.UI.TipMessage.hide();
                break;
            case"error":
        }
        this.lastUIState = this.state
    }, isUploading: !1, getWaitingHTML: function () {
        var e = '<i class="{i_attachmentS}"></i><span class="ml_5">{prefix}<span class="gray">{suffix}</span></span>                        <span class="progressBarDiv">                            <span class="progressBar"></span>                            <span class="progressBarCur">                                <span style="width: {getMd5};"></span>                            </span>                        </span>                        <span class="gray">{getFileMd5}{getMd5}({fileSizeText})</span>                        <a hideFocus="1" href="javascript:void(0)" class="ml_5" taskid="{taskId}" fileid="{fileId}" uploadtype="{uploadType}" filetype="{fileType}" command="RemoveFile">删除</a>', t = utool.shortName(this.fileName), i = t.substring(0, t.lastIndexOf(".") + 1), o = t.substring(t.lastIndexOf(".") + 1, t.length), a = $T.Utils.getFileIcoClass(0, this.fileName), n = {
            fileIconClass: a,
            prefix: i,
            suffix: $T.Html.encode(o),
            fileId: this.taskId,
            fileSizeText: "",
            fileType: this.fileType,
            uploadType: this.uploadType,
            taskId: this.taskId,
            getFileMd5: this.isLargeAttach ? "扫描中" : "上传中",
            getMd5: this.getMd5 || "0%"
        };
        return this.knownFileSize && (n.fileSizeText = "largeAttach" == this.fileType ? this.fileSize : top.$T.Utils.getFileSizeText(this.fileSize, {
            maxUnit: "K",
            comma: !0
        })), n.i_attachmentS = this.isLargeAttach ? "i_bigAttachmentS" : "i_attachmentS", e = top.$T.Utils.format(e, n)
    }, getDownloadUrl: function () {
        var e, t, i, o, a = this.fileId;
        if (t = upload_module.model, i = t.get("pageType"), "|draft|forward|reply|replyAll|resend|".indexOf("|" + i + "|") >= 0) {
            if (e = _.find(t.get("initDataSet").attachments, function (e) {
                        return e.fileId === a
                    }) || {}, !e.fileOffSet)return o = t.getAttachUrl(a, encodeURIComponent(this.fileName), !0);
            o = top.getProtocol() + location.host + "/RmWeb/view.do?func=attach:download&type=attach&encoding=1&sid={0}&mid={1}&offset={2}&size={3}&name={4}", o = top.$T.Utils.format(o, [t.getSid(), t.get("mid"), e.fileOffSet, e.base64Size, encodeURIComponent(e.fileName)])
        } else o = t.getAttachUrl(a, encodeURIComponent(this.fileName), !0);
        return o
    }, getImgUrl: function (e) {
        var t, i = "", o = upload_module.model, a = this.fileId, n = o.get("pageType");
        return "draft" == n || "resend" == n ? i = "" : (t = _.find(o.get("initDataSet").attachments, function (e) {
                return e.fileId === a
            }) || {}, i = e.getImgUrl({
            fileSize: t.fileSize,
            fileOffSet: t.fileOffSet,
            fileName: $T.Html.encode(t.fileName),
            type: "email"
        }, o.get("mid"))), i
    }, playMusic: function (e) {
        var t = /\.(?:mp3|m4a|wma|wav|ogg)($|\?)/i, i = [];
        i[0] = {
            id: this.fileId,
            url: e.resURL,
            text: this.fileName
        }, $("#attachContainer").off("**").on("click", function (o) {
            var a = $(o.target), n = a.attr("filename"), s = a.attr("downloadurl");
            s == e.resURL && t.test(n) && (o.preventDefault(), o.stopPropagation(), top.MusicBox.addMusic(this.fileId, i), top.MusicBox.show())
        })
    }, getPreviewHtml: function (e, t) {
        var i, o = "", a = "", n = "", e = e, s = "compose", r = "_blank", l = "", d = upload_module.model, c = d.get("pageType"), p = new top.M2012.ReadMail.View.FilePreview, u = p.checkFile(this.fileName, this.fileSize), h = 3 != u && "largeAttach" != this.fileType && p.isRelease(), m = /\.(?:eml?)$/i.test(this.fileName), f = "<a style='' {6} hideFocus='1' imgUrl='{3}' fileName='{5}' class='ml_5' behavior='{0}' ext='2' href=\"{1}\" target='{7}' title='预览文件' downloadurl='{4}' >{2}</a>", g = 1 == u ? "preview-onlinePreview" : "preview-pressPack", v = 1 == u ? "预览" : "打开", y = {}, w = this.fileId, b = this.fileSize;
        if (3 != u && 4 != u || (v = "播放"), this.fromVideoUpload && (v = ""), h = h && u > 0) {
            if (3 === u)e += "&range=1", n = "javascript:void(0);", this.playMusic({resURL: e}); else {
                "|draft|forward|reply|replyAll|resend|".indexOf("|" + c + "|") >= 0 && (s = "draftresend", y = _.find(d.get("initDataSet").attachments, function (e) {
                        return e.fileId === w
                    }) || {}), "refresh" == t && m && (s = "forwardAsAttach" == c ? "forwardAsAttach" : "draftreRead");
                var x = y && y.base64Size ? parseInt(y.base64Size, 10) : 0;
                b = Math.max(b, x), n = top.M2012.ReadMail.View.FilePreview.getUrl({
                    fileName: encodeURIComponent(this.fileName),
                    fileSize: b,
                    type: "email",
                    downloadUrl: e,
                    contextId: this.fileId,
                    comefrom: s,
                    composeId: d.composeId
                }, null), o = this.getImgUrl(p)
            }
            m && -1 != n.indexOf("callback=previewEmlReady") && (n += "&callback=previewEmlReady"), o = this.getImgUrl(p), i = [g, n, v, o, e, $T.Html.encode(this.fileName), l, r], a = top.$T.Utils.format(f, i)
        }
        return a
    }, getInsertContentHTML: function (e, t) {
        var i = "", o = /\.(?:jpg|gif|png|ico|jfif|bmp|jpeg?)$/i.test(this.fileName);
        if (o)i = '<a hideFocus="1" class="ml_5" href="javascript:void(0)" onclick="upload_module.insertImgFile(\'' + e + "')\">添加到正文</a>"; else if (/\.(?:mp3|mp4|m4a|m4v|flv|docx?|pptx?|xlsx?|pdf|txt)$/i.test(this.fileName))if (this.fileSize > 20971520 && /\.(?:docx?|pptx?|xlsx?|pdf|txt)$/i.test(this.fileName)); else {
            var a = top.$TextUtils.htmlEncode(this.fileName);
            i = "<a insertId=" + this.fileId + ' hideFocus="1" class="ml_5" href="javascript:;" onclick="upload_module.insertRichMediaFile(\'' + this.fileId + "', '" + a + "', '" + t + "', '" + this.fileType + "', '" + e + "')\">添加到正文</a>"
        }
        return i
    }, getCompleteHTML: function (e) {
        var t = this.getDownloadUrl(), i = this.getPreviewHtml(t, e), o = "largeAttach" == this.fileType ? this.fileSize : top.$T.Utils.getFileSizeText(this.fileSize);
        i += this.getInsertContentHTML(t, o);
        var a = '<i class="i_attachmentS"></i>                        <span class="ml_5" fileid="{fileId}" title="{fileName}">{prefix}<span class="gray">{suffix}</span></span>                        <span class="gray ml_5">({fileSizeText})</span>                        {previewHtml}                        <a hideFocus="1" class="ml_5" href="javascript:void(0)" fileid="{fileId}" filetype="{fileType}" command="DeleteFile">删除</a>', n = $T.Utils.htmlEncode(utool.shortName(this.fileName));
        $T.Utils.getFileIcoClass(0, this.fileName);
        return top.$T.Utils.format(a, {
            fileIconClass: "i_attachmentS",
            fileName: $T.Utils.htmlEncode(this.fileName),
            prefix: n.substring(0, n.lastIndexOf(".") + 1),
            suffix: n.substring(n.lastIndexOf(".") + 1),
            fileSizeText: o,
            fileId: this.fileId,
            fileType: this.fileType,
            previewHtml: i
        })
    }, getCommonUploadingHTML: function () {
        var e = '<i class="i_attachmentS"></i>                        <span class="ml_5">{prefix}<span class="gray">{suffix}</span></span>                        <span class="progressBarDiv" style="display:none">                            <span class="progressBar"></span>                            <span class="progressBarCur">                                <span style="width: 0%;"></span>                            </span>                        </span>                        <span class="gray" style="display:none">0%</span>                        <span class="gray">上传中……</span>                        <a hideFocus="1" class="ml_5" href="javascript:void(0)" command="CancelUpload" taskid="{taskId}" uploadtype="{uploadType}">删除</a>', t = utool.shortName(this.fileName), i = t.substring(0, t.lastIndexOf(".") + 1), o = t.substring(t.lastIndexOf(".") + 1, t.length), a = $T.Utils.getFileIcoClass(0, this.fileName), n = {
            fileIconClass: a,
            prefix: i,
            suffix: o,
            uploadType: "common",
            taskId: this.taskId
        };
        return e = top.$T.Utils.format(e, n)
    }, getProgressUploadingHTML: function (e) {
        var t = '<i class="{i_attachmentS}"></i>                        <span class="ml_5">{prefix}<span class="gray">{suffix}</span></span>                        <span class="progressBarDiv" style="{progressShow}">                            <span class="progressBar"></span>                            <span class="progressBarCur">                                <span style="width: {progress}%;"></span>                            </span>                        </span>                        <span class="gray" style="{progressShow}">{progress}%</span>                        <span class="gray">({sendedSizeText}){uploadTipText}</span>                        <a class="ml_5" href="javascript:void(0)" command="CancelUpload" taskid="{taskId}" uploadtype="{uploadType}">删除</a>', i = utool.shortName(this.fileName), o = i.substring(0, i.lastIndexOf(".") + 1), a = i.substring(i.lastIndexOf(".") + 1, i.length), n = $T.Utils.getFileIcoClass(0, this.fileName), s = "上传中", r = "display:''";
        e && e.resume && (r = "display:none", s = window.isOffline ? '<span class="server_error"><i class="i-redWarn-min"></i>网络连接中断，请稍后再试</span>' : ("retryLimit" == this.stateDetail, '<span class="server_error"><i class="i-redWarn-min"></i>服务器连接错误，请重试</span>'), t += '&nbsp;|&nbsp;<a href="javascript:void(0)" command="ResumeUpload" taskid="{taskId}">续传</a>');
        var l = {
            fileIconClass: n,
            prefix: o,
            suffix: $T.Html.encode(a),
            uploadTipText: s,
            sendedSizeText: top.$T.Utils.getFileSizeText(this.sendedSize || 0, {maxUnit: "K", comma: !0}),
            fileSizeText: top.$T.Utils.getFileSizeText(this.fileSize, {maxUnit: "K", comma: !0}),
            progress: Math.min(this.progress || 0, 99),
            progressShow: r,
            uploadType: this.uploadType,
            taskId: this.taskId
        };
        return this.maxProgress && this.maxProgress > this.progress && (l.progress = this.maxProgress, console.log("进度恢复中，progress:", l.progress)), l.i_attachmentS = this.isLargeAttach ? "i_bigAttachmentS" : "i_attachmentS", t = top.$T.Utils.format(t, l)
    }, updateProgress: function () {
        var e = document.createElement("li");
        e.innerHTML = this.getProgressUploadingHTML(), this.isLargeAttach && "waiting" == this.state && (e.innerHTML = this.getWaitingHTML());
        var t = $(e).children()[2], i = $(e).children()[3], o = $(e).children()[4], a = $(this.container).children()[2], n = $(this.container).children()[3], s = $(this.container).children()[4];
        a.innerHTML = t.innerHTML, n.innerHTML = i.innerHTML, s.innerHTML = o.innerHTML
    }, upload: function () {
        "flash" == this.uploadType ? upload_module_flash.upload(this.taskId) : "multiThread" == this.uploadType ? upload_module_multiThread.upload(this) : "ajax" == this.uploadType ? upload_module_ajax.upload(this) : "loadImgs" == this.uploadType ? this.callback(this) : "videoFlash" == this.uploadType && this.callback(this)
    }, cancelUpload: function () {
        if ("common" == this.uploadType) {
            var e = document.forms.fromAttach;
            e.reset(), refreshAttach(), utool.logUpload(UploadLogs.CommonCancel)
        } else if ("flash" == this.uploadType)upload_module_flash.cancel(this); else if ("multiThread" == this.uploadType)upload_module_multiThread.cancel(this), refreshAttach(!0), uploadManager.removeFile(this); else if ("ajax" == this.uploadType)return upload_module_ajax.cancel(this), void uploadManager.removeFile(this);
        upload_module.model.autoSendMail = !1
    }, uploadResume: function () {
        "flash" == this.uploadType ? UploadFacade.uploadResume() : "ajax" == this.uploadType && upload_module_ajax.uploadResume(this)
    }
}, $(window).resize(resizeAll), ICONS_CLASS = {
    "access.gif": ["ade", "snp", "mda", "mdb", "adp"],
    "msword.gif": ["wiz", "rtf", "dot", "doc", "wbk"],
    "excel.gif": ["xlw", "xlv", "xlt", "slk", "xls", "xld", "xll", "xlb", "xla", "xlk", "dif", "csv", "xlc", "xlm"],
    "ppt.gif": ["ppa", "pps", "ppt", "pwz", "pot"],
    "ii_WAR.GIF": ["rar", "zip", "iso", "7z"],
    "MUSIC.GIF": ["aifc", "aiff", "aif", "snd", "au", "midi", "mid", "rmi", "mp3", "wav", "m3u", "wax", "wma"],
    "JPG.GIF": ["bmp", "dib", "gif", "jpe", "jpg", "jpeg", "jfif", "png", "mdi", "ico", "xbm"],
    "WORD.GIF": ["css", "323", "html", "htm", "sol", "txt", "sor", "wsc", "sct", "htt", "htc", "xml", "xsl", "odc", "rqy", "vcf"],
    "Movie.GIF": ["mpa", "mpg", "m1v", "mpeg", "mp2", "mpe", "mp2v", "mpv2", "mov", "qt", "IVF", "asx", "asf", "avi", "wm", "wmv", "wmx", "wvx", "rm"]
}, $(function () {
    $("button,input:button").click(function () {
        $(this).blur()
    }), $(".navgation button").mouseover(function () {
        $(this).addClass("on")
    }), $(".navgation button").mouseout(function () {
        $(".navgation button").removeClass("on")
    }), $("#btnContactsSelectMenu").click(function (e) {
        window.gotoAddressMenu || (gotoAddressMenu = new PopMenu, gotoAddressMenu.addItem("新建联系人", function () {
            top.Links.show("addrContacts"), top.addBehavior("写信页新建联系人")
        }), gotoAddressMenu.addItem("管理通讯录", function () {
            top.Links.show("addr"), top.addBehavior("写信页通讯录")
        })), gotoAddressMenu.show(this), top.$Event.stopEvent(e)
    });
    try {
        window.frameElement.module.onShow.addEventListener(function () {
        })
    } catch (e) {
    }
}), function (jQuery, Backbone, _, M139) {
    var $ = jQuery;
    M139.namespace("M2012.Compose.Model", Backbone.Model.extend({
        defaults: {
            pageType: "",
            mid: "",
            sd: "",
            ids: "",
            autoGroup: "",
            isEditorPageOnload: !0,
            isComposePageOnload: !1,
            initDataSet: {},
            contIsSuc: !1,
            hasLargeAttach: !1,
            openContactsSwitch: !0,
            atAllContacts: !1
        },
        isChrome: !1,
        isFirefox: !1,
        PageStateTypes: {Initializing: 1, Uploading: 2, Sending: 3, Saving: 4, Common: 5, Sended: 6},
        PageState: 1,
        autoSendMail: !1,
        sid: "",
        composeId: "",
        messageId: "",
        draftId: "",
        composeAttachs: [],
        asynDeletedFile: "",
        maxUploadLargeAttach: 1,
        mailInfo: {
            id: "",
            mid: "",
            messageId: "",
            account: "",
            to: "",
            cc: "",
            bcc: "",
            showOneRcpt: 0,
            isHtml: 1,
            subject: "",
            content: "",
            priority: 1,
            signatureId: 0,
            stationeryId: 0,
            saveSentCopy: 1,
            requestReadReceipt: 0,
            inlineResources: 1,
            scheduleDate: 0,
            normalizeRfc822: 0,
            busAssistant: 0,
            remoteAttachment: [],
            attachments: [],
            headers: {}
        },
        autoSaveTimer: {timer: null, interval: 120, subMailInfo: {content: "", subject: "", composeAttachs: 0}},
        pageTypes: {
            COMPOSE: "compose",
            REPLY: "reply",
            REPLYALL: "replyAll",
            FORWARD: "forward",
            FORWARDASATTACH: "forwardAsAttach",
            FORWARDATTACHS: "forwardAttachs",
            FORWARDMORE: "forwardMore",
            DRAFT: "draft",
            RESEND: "resend",
            VCARD: "vCard",
            SHARE: "share",
            CUSTOM: "customExtMail",
            UPLOAD_LARGE_ATTACH: "uploadLargeAttach"
        },
        tipWords: {
            LOADING: "加载中...",
            SENDING: "邮件正在发送...",
            LOAD_FAIL: "加载失败，请重试。",
            AUTO_SAVE_SUC: "{0}点{1}分自动保存草稿成功",
            SAVE_SUC: "{0}点{1}分成功保存到草稿箱",
            LACK_SUBJECT: "未填写主题，确定发送吗？",
            LACK_ATTACHMENTS: "您在邮件中提到了附件，可能忘了上传附件。确定继续发送吗？",
            CANCEL_SEND: "关闭写信页，未保存的内容将会丢失，是否关闭？",
            INVALID_DATE: "定时发送时间不能比当前时间早。",
            NO_RECEIPT: "收件人格式不正确。",
            TO_DEFAULT_TEXT: "输入对方移动手机号，就能给他发邮件",
            UPLOAD_LARGEATTACH: "添加最大{0}G的附件和暂存柜文件",
            SCHEDULE_MAIL: "您设置在{0}定时发送此邮件"
        },
        richInputTypes: {TO: "to", CC: "cc", BCC: "bcc"},
        actionTypes: {CONTINUE: "continue", AUTOSAVE: "autosave", SAVE: "save", DELIVER: "deliver"},
        systemSigns: ["Best wishes for the year to come!", "I hope you have a most happy and prosperous New Year.！", "天增岁月人增寿，春满乾坤福满门；福开新运，财源广进！", "恭祝您的事业蒸蒸日上，新年更有新气象！", "值此春回大地、万象更新之良辰，敬祝您福、禄、寿三星高照，阖府康乐，如意吉祥！ 拜新年！", "上联：加薪买房购小车；下联：娶妻生子成家室；横批：接财神！", "傲不可长，欲不可纵，乐不可极，志不可满。", "宝剑锋从磨砺出，梅花香自苦寒来。", "博观而约取，厚积而薄发。", "博学之，审问之，慎思之，明辨之，笃行之。", "不登高山，不知天之高也；不临深溪，不知地之厚也。", "不飞则已，一飞冲天；不鸣则已,一鸣惊人。", "不可乘喜而轻诺，不可因醉而生嗔，不可乘快而多事，不可因倦而鲜终。", "沧海横流，方显英雄本色。", "沉舟侧畔千帆过，病树前头万木春。", "尺有所短，寸有所长。物有所不足，智有所不明。"],
        sysImgPath: ["/upload/photo/system/nopic.jpg", "/upload/photo/nopic.jpg"],
        containerHeight: {emailInputBox: 33, allToOne: 0, moreOptions: 28},
        logger: new top.M139.Logger({name: "M2012.Compose"}),
        tabName: "",
        editorMinHeight: 250,
        handlerQueue: [],
        containRemindKey: !1,
        containAtRemind: "",
        replyWithQuote: top.$App.getReplyWithQuote(),
        initialize: function (e) {
            this.actionTypes.DELIVER = "asyn", this.initGlobalVars(), this.initUploadComponent(), this.on("route", function () {
                this.routePage()
            })
        },
        initGlobalVars: function () {
            var e = this, t = $composeApp.query.type || $composeApp.inputData && $composeApp.inputData.type || this.pageTypes.COMPOSE, i = $composeApp.query.composeType, o = $composeApp.query.id, a = $composeApp.query.mid, n = $composeApp.inputData && $composeApp.inputData.content, s = $composeApp.inputData && $composeApp.inputData.unUseDefaultFont, r = $composeApp.inputData && $composeApp.inputData.replaceOldContent, l = $composeApp.inputData && $composeApp.inputData.isInsertAttach, d = $composeApp.inputData && $composeApp.inputData.isAutoSendEmail, c = $composeApp.query.greetingString, p = $composeApp.inputData ? $composeApp.inputData.fileMess : "", u = $composeApp.query.ids ? $composeApp.query.ids.split(",") : [];
            t == this.pageTypes.COMPOSE && "2" == o && !top.ssoComposeHandled && i && a && (top.ssoComposeHandled = !0, t = i), e.sid = e.getSid(), e.set("replaceOldContent", r), e.set("pageType", t), e.set("mid", a), e.set("greetingString", c), e.set("ids", u), e.set("content", n), e.set("unUseDefaultFont", s), e.set("isInsertAttach", l), e.set("isAutoSendEmail", d), e.set("fileMess", p), "rewrite" == t && e.set("rewriteOptions", $composeApp.inputData.rewrite), e.resourcePath = "/rm/coremail/", e.PageState = this.PageStateTypes.Initializing, e.isChrome = $B.is.chrome, e.isFirefox = $B.is.firefox;
            var h = top.$App.getCustomAttrs("autoGroup");
            e.set("autoGroup", h), top.SiteConfig.comboUpgrade && (e.maxUploadLargeAttach = Math.floor(top.$User.getCapacity("maxannexsize") / 1024) || 4), e.maxUploadLargeAttach < 4 ? e.tipWords.UPLOAD_LARGEATTACH = "最大2G。" : e.tipWords.UPLOAD_LARGEATTACH = e.tipWords.UPLOAD_LARGEATTACH.format(e.maxUploadLargeAttach), e.tabName = top.$App.getCurrentTab().name;
            var m = e.getTop().getDomain("mail").replace(location.protocol + "//", ""), f = e.getTop().getDomain("resource").substring(13);
            e.regG2 = new RegExp("(gd+)." + m, "i"), e.regApp = new RegExp("appmail[3]?." + m, "i"), e.regSrc = new RegExp("image[0s]" + f, "i");
            var g = e.pageTypes;
            e.regRouter({
                matchs: [g.COMPOSE, g.UPLOAD_LARGE_ATTACH], onroute: function () {
                    var t = e.get("initDataSet"), i = $composeApp.query;
                    t.isShowVideoMail = Boolean(i.videomail), t.isShowTimeSet = Boolean(i.timeset) || $composeApp.inputData ? $composeApp.inputData.timeset : "", t.scheduleDate = i.timeset || $composeApp.inputData ? $composeApp.inputData.timeset : "", t.isShowSelectBox = Boolean(i.showSelectBox), t.account = i.userAccount || $composeApp.inputData ? $composeApp.inputData.userAccount : "", t.to = i.receiver || $composeApp.inputData ? $composeApp.inputData.receiver : "", t.subject = i.subject || $composeApp.inputData ? $composeApp.inputData.subject : "", t.content = i.content || $composeApp.inputData ? $composeApp.inputData.content : "", t.template = i.template || $composeApp.inputData ? $composeApp.inputData.template : "", t.letterPaperId = i.letterPaperId || $composeApp.inputData ? $composeApp.inputData.letterPaperId : "", t.saveSentCopy = 1, t.withAttachments = $composeApp.inputData ? $composeApp.inputData.withAttachments : "", t.headers = $composeApp.inputData ? $composeApp.inputData.headers : {}, e.set("isComposePageOnload", !0)
                }
            })
        },
        regRouter: function (e) {
            for (var t = this, i = t.get("pageType"), o = e.matchs, a = 0; a < o.length; a++)o[a] == i && t.handlerQueue.push(e.onroute)
        },
        routePage: function () {
            for (var e = this, t = e.get("pageType"), i = e.handlerQueue, o = 0; o < i.length; o++)i[o]({pageType: t}, e), e.set("isComposePageOnload", !0)
        },
        getMailData: function (e) {
            var t = {fid: 1, order: "receiveDate", desc: 1, start: 1, total: 20, topFlag: "top", sessionEnable: 2};
            this.callApi("mbox:listMessages", t, function (t) {
                e && t.responseData && e(t.responseData["var"])
            })
        },
        initUploadComponent: function () {
            upload_module.init(this), upload_module.createUploadManager()
        },
        callApi: M139.RichMail.API.call,
        replyMessage: function (e, t) {
            var i = this;
            if ("string" != typeof e)return void console.log("replyMessage:回复类型请传递字符串!");
            var o = {
                toAll: e === this.pageTypes.REPLYALL ? "1" : "0",
                mid: this.get("mid"),
                withAttachments: "true" == $T.Url.queryString("withAttach") ? "1" : "0"
            };
            this.get("isInsertAttach") && (o = {
                toAll: e === this.pageTypes.REPLYALL ? "1" : "0",
                mid: this.get("mid"),
                withAttachments: "1"
            }), this.callApi("mbox:replyMessage", o, function (e) {
                var e = i.get("isInsertAttach") ? i.showOneAttach(e) : e;
                t && t(e)
            })
        },
        showOneAttach: function (e) {
            var t = this.get("fileMess"), i = t.fileId, o = e.responseData["var"].attachments;
            if (0 === o.length)return e;
            for (var a = 0, n = o.length; n > a; a++)if (i == o[a].fileId) {
                var s = [];
                s.push(o[a])
            }
            return e.responseData["var"].attachments = s, e
        },
        forwardMessage: function (e, t) {
            if ("string" != typeof e)return void console.log("forwardMessage:转发类型请传递字符串!");
            var i = this.getRequestDataForForward(e);
            this.callApi("mbox:forwardMessages", i, function (e) {
                t && t(e)
            })
        },
        forwardAttachs: function (e, t) {
            if ("string" != typeof e)return void console.log("forwardMessage:转发类型请传递字符串!");
            var i = top.FORWARDATTACHS;
            top.FORWARDATTACHS = null, this.callApi("mbox:forwardAttachs", i, function (e) {
                t && t(e)
            })
        },
        restoreDraft: function (e) {
            var t = {mid: this.get("mid")};
            this.callApi("mbox:restoreDraft", t, function (t) {
                e && e(t)
            })
        },
        editMessage: function (e) {
            var t = {mid: this.get("mid")};
            this.callApi("mbox:editMessage", t, function (t) {
                e && e(t)
            })
        },
        rewriteMessage: function (e) {
            var t = this, i = this.get("rewriteOptions");
            M139.HttpRouter.addRouter("webapp", ["mbox:readAttachEml"]), this.callApi("mbox:readAttachEml", i, function (i) {
                i.responseData["var"] && (t.composeId = i.responseData["var"].tid), e && e(i)
            })
        },
        setSubMailInfo: function (e, t) {
            this.autoSaveTimer.subMailInfo.content = e, this.autoSaveTimer.subMailInfo.subject = t, this.autoSaveTimer.subMailInfo.composeAttachs = this.composeAttachs.length
        },
        createAutoSaveTimer: function () {
            var e = this;
            e.autoSaveTimer.timer = setInterval(function () {
                var t = e.compare(!0);
                t && (mainView.saveMailCallback.actionType = e.actionTypes.AUTOSAVE, e.sendOrSaveMail(e.actionTypes.AUTOSAVE, mainView.saveMailCallback))
            }, 1e3 * e.autoSaveTimer.interval)
        },
        compare: function (e) {
            var t, i = this, o = $.extend({}, i.autoSaveTimer.subMailInfo), a = "", n = "";
            return e ? (i.setSubMailInfo(htmlEditorView.getEditorContent(!0), $("#txtSubject").val()), a = i.autoSaveTimer.subMailInfo.content, n = i.autoSaveTimer.subMailInfo.subject, t = i.autoSaveTimer.subMailInfo.composeAttachs) : (a = htmlEditorView.getEditorContent(!0), n = $("#txtSubject").val(), t = this.composeAttachs.length), a !== o.content || n != o.subject || t !== o.composeAttachs
        },
        isBlankCompose: function () {
            var e = this;
            return !(e.addrInputManager.getAllEmails().length > 0 || $("#txtSubject").val() || htmlEditorView.getEditorContent() != e.defaultContent)
        },
        sendOrSaveMail: function (e, t) {
            if ("string" != typeof e)return void console.log("sendOrSaveMail:请传递字符串action！" + e);
            var i = this;
            e !== i.actionTypes.AUTOSAVE && e !== i.actionTypes.SAVE || (clearInterval(i.autoSaveTimer.timer), i.createAutoSaveTimer()), mainView.buildMailInfo(e, t)
        },
        filterEmails: function () {
            var e = top.$User.getUidList(), t = top.$App.getPopList(), i = e.concat(t), o = this.get("initDataSet");
            if (o.to)for (var a = 0, n = o.to.length; n > a; a++)for (var s = 0, r = i.length; r > s; s++)if ($Email.compare(o.to[a], i[s])) {
                o.to.splice(a, 1), a--;
                break
            }
            if (o.cc)for (var l = 0; l < o.cc.length; l++)for (var d = 0; d < i.length; d++)if ($Email.compare(o.cc[l], i[d])) {
                o.cc.splice(l, 1), l--;
                break
            }
        },
        getRequestDataForSend: function (e) {
            var t = 1;
            e === this.actionTypes.CONTINUE && (t = 0);
            var i = top.$App.getConfig("UserData") || {}, o = i.orderInfoList, a = "", n = "", s = [];
            for (var r in o) {
                var a = o[r].serviceId;
                "320" == a && (n = o[r].orderStatus), s.push(a)
            }
            var l = top.$User.getMaxSend(), d = this.mailInfo.to.split(",");
            return this.mailInfo.cc && (d = d.concat(this.mailInfo.cc.split(","))), this.mailInfo.bcc && (d = d.concat(this.mailInfo.bcc.split(","))), d.length > l && s.join(",").indexOf("320") > -1 && (4 == n || 0 == n) && (this.mailInfo.antinums = 400 + l, this.mailInfo.onceSend = 1), {
                attrs: this.mailInfo,
                action: e,
                replyNotify: $("#replyNotify")[0].checked ? 1 : 0,
                returnInfo: t
            }
        },
        getRequestDataForForward: function (e) {
            var t = this, i = {};
            return e === this.pageTypes.FORWARD ? (i.mode = "quote", i.ids = [t.get("mid")], i.mid = t.get("mid")) : e === this.pageTypes.FORWARDASATTACH || e === this.pageTypes.FORWARDMORE ? (i.mode = "attach", i.ids = t.get("ids")) : console.log("不支持的参数值：" + e), i
        },
        getTipwords: function (e) {
            return e === this.actionTypes.AUTOSAVE ? this.tipWords.AUTO_SAVE_SUC : e === this.actionTypes.SAVE ? this.tipWords.SAVE_SUC : ""
        },
        handlerSignImags: function () {
            var e = htmlEditorView.editorView.editor.editorWindow.document;
            if (e) {
                var t, i = [], o = e.getElementsByTagName("IMG"), a = this;
                try {
                    for (var n = o.length - 1; n >= 0; n--)"signImg" == o[n].getAttribute("rel") && (t = o[n].src, 0 > t.indexOf("attach:getAttach") && (t = a.replaceSignImgsSrc(t), i.push($T.Xml.encode(t)), o[n].src = t))
                } catch (s) {
                    return i
                }
                return i
            }
        },
        RESRCIP: "172.16.172.171:2080",
        G2DOMAIN: "$1.api.localdomain",
        replaceSignImgsSrc: function (e) {
            var t = this;
            return e = e.replace("https", "http").replace("/images_139cm", ""), e.replace(t.regApp, t.RESRCIP).replace(t.regSrc, t.RESRCIP).replace(t.regG2, t.G2DOMAIN)
        },
        getTop: function () {
            return M139.PageApplication.getTopAppWindow()
        },
        getSid: function () {
            var e = top.$App.getSid();
            return e
        },
        requestComposeId: function (e) {
            this.composeId || (this.composeId = Math.random().toString()), e && e()
        },
        getAttachUrl: function (e, t, i) {
            var o = this.getSid(), a = "/RmWeb/view.do?func=attach:getAttach&sid=" + o + "&fileId=" + e + "&fileName=" + encodeURIComponent(t);
            return i && (a = top.getProtocol() + location.host + a), a
        },
        subjectColorManager: {
            maps: {
                0: {color: "#000000", title: "黑色"},
                1: {color: "#FF0000", title: "红色"},
                2: {color: "#FF9800", title: "橙色"},
                3: {color: "#339A67", title: "绿色"},
                4: {color: "#2D5AE2", title: "蓝色"},
                5: {color: "#7F0081", title: "紫色"}
            }, getColorName: function (e) {
                var t = this.maps, i = t[e];
                return i || (i = t[0]), i.title
            }, getColor: function (e) {
                var t = this.maps, i = t[e];
                return i || (i = t[0]), i.color
            }, getColorList: function () {
                for (var e = this.maps, t = [], i = 0; ;) {
                    if (!e[i])break;
                    t.push(e[i]), i++
                }
                return t
            }
        },
        modifySendList: function (e) {
            var t = this, i = e.responseData["var"] && e.responseData["var"].mid, o = e.responseData["var"] && e.responseData["var"].tid, a = new top.Array, n = new top.Array, s = new top.Array;
            a = a.concat($T.Email.getMailListFromString(t.mailInfo.to)), n = n.concat($T.Email.getMailListFromString(t.mailInfo.cc)), s = s.concat($T.Email.getMailListFromString(t.mailInfo.bcc));
            var r = {
                to: a,
                cc: n,
                bcc: s,
                subject: t.mailInfo.subject,
                action: "asyn",
                saveToSendBox: t.mailInfo.saveSentCopy,
                pageType: this.get("pageType"),
                mid: i,
                tid: o
            };
            t.mailInfo.scheduleDate && (r.action = "schedule"), top.$App.getCurrentTab().data.sendList = new top.Array, top.$App.getCurrentTab().data.sendList.push(r), top.window.sendLists || (top.window.sendLists = new top.Array), top.window.sendLists.push(r)
        },
        getDateTipwords: function (e) {
            var t = $Date.format("yyyy-MM-dd", new Date), i = $Date.format("yyyy-MM-dd", $Date.getDateByDays(new Date, 1)), o = $Date.format("yyyy-MM-dd", $Date.getDateByDays(new Date, 2)), a = $Date.format("yyyy-MM-dd", $Date.getWeekDateByDays(6)), n = $Date.format("yyyy-MM-dd", $Date.getWeekDateByDays(13)), s = "";
            return s = e === t ? "今天" : e === i ? "明天" : e === o ? "后天" : e > o && a >= e ? "本周" + this._getWeek(e) : e > a && n >= e ? "下周" + this._getWeek(e) : e
        },
        _getWeek: function (e) {
            var t = $Date.getChineseWeekDay($Date.parse(e.trim() + " 00:00:00"));
            return t.substr(2, 1)
        },
        getTimeTipwords: function (e) {
            var t = e.split(":"), i = parseInt(t[0].trim(), 10), o = new Date, a = $Date.getHelloString(new Date(o.setHours(i))), n = "";
            return n = 12 >= i ? a + e : a + (i - 12) + ":" + t[1]
        },
        getReturnObj: function (html) {
            if ("string" !== $.type(html))return null;
            var returnObj = null, reg = /'var':([\s\S]+?)\};<\/script>/i;
            if (html.indexOf("'code':'S_OK'") > 0) {
                returnObj = {};
                var m = html.match(reg), result = eval("(" + m[1] + ")");
                returnObj.fileId = result.fileId, returnObj.fileName = result.fileName
            }
            return result instanceof Array && result.length > 1 ? result : returnObj
        },
        addrInputManager: {
            addMail: function (e, t) {
                if (!(e instanceof M2012.UI.RichInput.View))return void console.log("请传入RichInput实例对象");
                if ("string" == typeof t) {
                    for (var i = M139.Text.Email.splitAddr(t), o = 0; o < i.length; o++) {
                        var a = i[o], n = top.$App.getAddrNameByEmail(a);
                        a && (i[o] = n + " <" + top.$Email.getEmail(a) + ">")
                    }
                    t = i.join(",")
                }
                "string" === $.type(t) && (t = [t]);
                for (var s = 0, r = t.length; r > s; s++)e.insertItem(t[s])
            }, removeMail: function (e, t) {
                "string" === $.type(t) && (t = [t]);
                for (var i = e.getItems(), o = 0; o < i.length; o++)for (var a = i[o], n = 0; n < t.length; n++)if (a.allText == t[n] || a.addr == t[n]) {
                    a.remove();
                    break
                }
            }, addMailToCurrentRichInput: function (e) {
                return addrInputView.currentRichInput || (addrInputView.currentRichInput = addrInputView.toRichInput), addrInputView.currentRichInput.insertItem(e), addrInputView.currentRichInput
            }, getAllEmails: function (e) {
                var t = addrInputView.toRichInput.getValidationItems(), i = addrInputView.ccRichInput.getValidationItems(), o = addrInputView.bccRichInput.getValidationItems();
                return e && (o = []), t.concat(i).concat(o)
            }
        },
        mailFileSend: function (e, t) {
            e = e || [];
            for (var i = [], o = 0, a = e.length; a > o; o++)"netDisk" !== e[o].fileType && i.push(e[o]);
            var n = this.getXmlStr(i), s = {xmlStr: n};
            this.callApi("file:mailFileSend", s, function (e) {
                t && t(e)
            })
        },
        getDenyForwardCount: function (e) {
            var t = this;
            t.callApi("user:getNoforwardingTimes", {}, function (t) {
                t = t.responseData;
                var i = (Number(t["var"].isForwardFree) || 0, Number(t["var"].noForwardingTimes) || 0), o = t["var"].serviceItem;
                "S_OK" == t.code ? ("0010" == o || "0015" == o) && i > 0 && e && e() : top.M139.UI.TipMessage.show("接口请求失败", {delay: 2e3})
            })
        },
        queryGroupById: function (e, t) {
            this.callApi("gm:queryGroupByMid", e, function (e) {
                t && t(e)
            })
        },
        getXmlStr: function (e) {
            var t = this, i = "";
            i += "<![CDATA[", i += "<Request>";
            var o = [], a = "", n = $T.Email.getMailListFromString(t.mailInfo.to), s = $T.Email.getMailListFromString(t.mailInfo.cc), r = $T.Email.getMailListFromString(t.mailInfo.bcc), l = n.concat(s).concat(r);
            l = _.map(l, function (e) {
                return $T.Email.getEmail(e)
            });
            for (var d = 0; d < e.length; d++) {
                var c = e[d];
                if ("netDisk" == c.fileType) {
                    var p = "<File><FileID>{0}</FileID><FileName>{1}</FileName><FileGUID>{2}</FileGUID><FileSize>{3}</FileSize></File>";
                    a += $T.Utils.format(p, [c.fileId, $T.Xml.encode(c.fileName), c.fileGUID, c.fileLength])
                } else o.push(c.uploadId || c.fileId)
            }
            return o.length > 0 && (i += "<Fileid>" + o.join(",") + "</Fileid>", i += "<Emails>" + _.unique(l).join(",") + "</Emails>"), a && (i += "<DiskFiles>" + a + "</DiskFiles>"), i += "</Request>", i += "]]>"
        },
        getErrorMessageByCode: function (e, t, i) {
            function o() {
                return i && i.account ? !top.$App.isLocalDomainAccount(i.account) : !1
            }

            var a = {
                attach: {FA_ATTACH_EXCEED_LIMIT: "上传失败，附件大小超出限制", FA_UPLOAD_SIZE_EXCEEDED: "上传失败，附件大小超出限制"},
                saveMail: {FA_ATTACH_EXCEED_LIMIT: "发送失败，附件/信件大小超过邮箱限制", FA_OVERFLOW: "附件/信件大小超出邮箱限制,无法保存草稿"},
                sendMail: {
                    FA_ATTACH_EXCEED_LIMIT: "发送失败，附件/信件大小超过邮箱限制",
                    FA_OVERFLOW: "发送失败，附件/信件大小超过邮箱限制",
                    FA_INVALID_ACCOUNT: "发送失败，FA_INVALID_ACCOUNT(发件人数据异常)",
                    FA_INVALID_PARAMETER: "发送失败，FA_INVALID_PARAMETER(发件人数据异常)",
                    FA_ID_NOT_FOUND: "请勿重复发送(邮件可能已发出，但由于网络问题服务器没有反馈，请到发件箱确认)",
                    FA_WRONG_RECEIPT: "收件人地址格式不正确，请修改后重试",
                    FS_UNKNOWN: "发送失败，请重新发送",
                    FA_REDUNDANT_REQUEST: "邮件正在发送中，请稍候",
                    FA_IS_SPAM: "您的邮件发送失败，原因可能是：<br>1、  你超出了单天发送邮件封数的限制。<br>2、  你发送的邮件包含广告内容等不良信息。"
                }
            };
            return "sendMail" == e && "FA_INVALID_ACCOUNT" == t && o() ? '第三方账号发信失败，请确认账号密码以及POP服务器地址设置正确。<a hideFocus="1" href="javascript:top.$App.show("account")">管理账号&gt;&gt;</a>' : a[e] && a[e][t] ? a[e][t] : ""
        },
        adjustEditorHeight: function (e) {
            var t = $("#htmlEdiorContainer div.eidt-body"), i = t.height() + e;
            i = parseInt(i), i < self.editorMinHeight, t.height(i)
        },
        getRandomArray: function (e, t) {
            if (!(e.length <= 0 || 0 >= t)) {
                if (e.length <= t)return e;
                for (var i = new Array, o = 0; t > o; o++) {
                    var a = e.length, n = Math.floor(Math.random() * a);
                    i.push(e[n]), e = $.grep(e, function (e, t) {
                        return t != n
                    })
                }
                return i
            }
        },
        removeArrOverlap: function (e, t) {
            return e = $.grep(e, function (e, i) {
                for (var o = !0, i = 0, a = t.length; a > i; i++)e == t[i] && (o = !1);
                return o
            })
        },
        randomContacts: function (e, t, i) {
            var o = this, a = new Array;
            return e.length > i ? a = o.getRandomArray(e, i) : (a = $.merge(a, e), t = o.removeArrOverlap(t, e), t.length >= 1 && a.push(o.getRandomArray(t, i - e.length))), a
        },
        getMailAddrs: function (e) {
            var t = new Array, i = e;
            return $.each(i, function (e, i) {
                "E" == i.AddrType ? t.push(i.AddrContent) : "M" == i.AddrType && t.push(i.AddrContent + "@139.com")
            }), t
        },
        getShareContacts: function (e) {
            var t = this, i = [], o = t.getMailAddrs(e.closeContacts), a = t.getMailAddrs(e.lastestContacts), n = [];
            return i = t.randomContacts(o, a, 5), i.length < 5 && ($.each(e.contacts, function (e, t) {
                t.emails.length >= 1 ? n.push(t.emails[0]) : t.mobiles.length >= 1 && n.push(t.mobiles[0] + "@139.com")
            }), i = t.randomContacts(i, n, 5)), i.join(",")
        },
        getEamils: function (e) {
            function t(e) {
                if (e) {
                    0 == e.indexOf("<") && (e = e.replace(/</, '"<').replace(/></, '>"<'));
                    var t = $T.Utils.parseSingleEmail(e), i = t.addr.split("@")[0], o = top.Contacts.getSingleContactsByEmail(t.addr);
                    if (o) {
                        var a = o.name;
                        return a == i || o.MobilePhone && o.MobilePhone == a ? e : '"' + a.replace(/\"/g, "") + '"<' + t.addr + ">"
                    }
                    return e
                }
            }

            if (!e)return "";
            for (var i = e.split(","), o = [], a = 0, n = i.length; n > a; a++) {
                var s = i[a], r = i[a + 1];
                if (s && r) {
                    var l = top.Utils.parseSingleEmail(s);
                    $T.Email.isEmailAddr(l.all) || (i[a] = s + " " + r, i.splice(a + 1, 1), a--)
                }
            }
            for (var d = 0, c = i.length; c > d; d++)o.push(t(i[d]));
            return o.join(",")
        },
        active: function () {
            var e = this, t = e.tabName;
            t && -1 != t.indexOf("compose") && top.$App.getCurrentTab().name != t && top.$App.activeTab(t)
        },
        transformFileList: function (e) {
            if (!$.isArray(e))return e;
            for (var t = this, i = [], o = 0, a = e.length; a > o; o++) {
                var n = e[o];
                i.push(t.getFileByComeFrom(n))
            }
            return i
        },
        fixBase64FileSize: function () {
            var e = this.composeAttachs;
            if (e.length > 0)for (var t = 0; t < e.length; t++)e[t].base64Size && (e[t].fileSize = e[t].base64Size)
        },
        getFileByComeFrom: function (e) {
            var t = e.comeFrom, i = {}, o = {local: !1, disk: !1, cabinet: !1};
            return "localFile" == t ? (i.fileId = e.businessId, i.fileName = e.name, i.filePath = e.name, i.fileSize = e.size, i.fileType = "keepFolder", i.name1 = e.name1 || "", i.state = "success", o.local = !0) : "disk" == t ? (i.fileGUID = e.filerefid, i.fileId = e.id, i.fileName = e.name, i.filePath = e.name, i.fileSize = e.fileSize, i.linkUrl = e.presentURL, e.file && e.file.fileSize && (i.fileSize = e.file.fileSize), e.file && e.file.presentURL && (i.linkUrl = e.file.presentURL), i.fileType = "netDisk", i.state = "success", o.disk = !0) : "cabinet" == t ? (i.fileId = e.fid || e.fileId, i.fileName = e.fileName, i.filePath = e.fileName, i.fileSize = e.fileSize, i.fileType = "keepFolder", i.state = "success", o.cabinet = !0) : "attach" == t ? (i.fileId = e.fid || e.fileId, i.fileName = e.fileName, i.filePath = e.fileName, i.fileSize = e.fileSize, i.fileType = "keepFolder", i.state = "success", o.cabinet = !0) : console.log("不支持的文件来源！comeFrom:" + t), o.local && BH({key: "compose_largeattach_local"}), o.disk && BH({key: "compose_largeattach_disk"}), o.cabinet && BH({key: "compose_largeattach_cabinet"}), i
        },
        isSupportCompressRequest: function () {
            return !!(window.FormData || $B.is.ie && $B.getVersion() >= 9)
        },
        newForwardAttachs: function (e, t) {
            this.callApi("mbox:forwardAttachs", {attachments: e}, function (i) {
                var o = i.responseData;
                o && "S_OK" == o.code && t && t(e)
            }, {urlParam: "&composeId=" + this.composeId})
        },
        addAttach: function (e) {
            for (var t = uploadManager.fileList || [], i = 0; i < e.length; i++) {
                var o = e[i], a = new UploadFileItem({
                    type: "Common",
                    fileName: (o.fileName || o.name).replace(/\"/g, "“").replace(/'/g, "‘"),
                    fileId: o.id || o.fileId,
                    fileSize: o.fileRealSize || o.fileSize || o.size || 0,
                    insertImage: o.insertImage,
                    replaceImage: o.replaceImage,
                    isComplete: !0
                });
                t.push(a), this.composeAttachs.push({
                    fileId: o.id || o.fileId,
                    fileName: o.fileName || o.name,
                    fileSize: o.fileSize || o.size || 0,
                    insertImage: o.insertImage,
                    replaceImage: o.replaceImage
                })
            }
            uploadManager.render({type: "add"})
        },
        filterExistAttach: function (e) {
            function t() {
                for (var e, t = uploadManager.fileList || [], o = [], a = 0; a < t.length; a++)e = t[a], o.push(e.fileId + i + e.fileSize + i + e.fileName);
                return o
            }

            var i = "-", o = t(), a = _.pluck(Arr_DiskAttach, "fileId") || [], n = o.concat(a), s = [], r = [];
            if (e.length && n.length)for (var l = e.length - 1; l >= 0; l--) {
                var d = e[l], c = d.id || d.fileId, p = d.comeFrom;
                "attach" == p && (c = c + i + d.fileRealSize + i + d.fileName), -1 != $.inArray(c, n) && ("attach" == p ? s.push(d) : "disk" == p && r.push(d), e.splice(l, 1))
            }
            var u = s.concat(r) || [];
            if (u.length) {
                var h = u[0].fileName || u[0].name || "default";
                1 == u.length ? top.$Msg.alert('"' + h + '"已添加，请勿重复添加。') : top.$Msg.alert('"' + h + '"等文件已添加，请勿重复添加。')
            }
        },
        loadCompressLib: function () {
            var e = "rawdeflateScript";
            document.getElementById(e) || M139.core.utilCreateScriptTag({
                id: e,
                src: top.getRootPath() + "/js/richmail/compose/rawdeflate.js",
                charset: "utf-8"
            })
        },
        isExpireTime: function (e) {
            var e = top.$Date.parse(e).getTime(), t = top.M139.Date.getServerTime().getTime();
            return t > e
        },
        mailBusiness: function () {
            var e = 0, t = top.$App.getConfig("UserData") || {}, i = t.orderInfoList, o = "", a = "";
            for (var n in i) {
                if (o = i[n].serviceId, a = i[n].orderStatus, "360" == o && ("0" == a || "4" == a)) {
                    e = 1;
                    break
                }
                e = 0
            }
            return e
        },
        getLargeFileByGroupId: function (e, t, i) {
            var o = this;
            top.$RM.call("file:downLoadInitNew", {groupIds: e}, function (e) {
                var a = e.responseData;
                if (a && "S_OK" == a.code) {
                    for (var n = a["var"].fileList, s = [], r = {}, l = 0; l < n.length; l++)r = {
                        fileId: n[l].fileFid,
                        fileName: n[l].fileName,
                        fileSize: n[l].fileSize,
                        fileType: "keepFolder",
                        isDisk: !0,
                        state: "success",
                        hidePreview: !0,
                        showExpireTime: !0,
                        remainTime: n[l].remainTime
                    }, o.isExpireTime(n[l].remainTime) || s.push(r);
                    s.length && t && t(s)
                } else i && i()
            })
        },
        deleteAttach: function (e, t) {
            var i = {targetServer: 1, composeId: this.composeId, items: e};
            this.callApi("upload:deleteTasks", i, function (e) {
                "S_OK" == e.responseData.code && t && t()
            })
        }
    }))
}(jQuery, Backbone, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.Encrypt", a.extend({
        el: "body",
        events: {
            "click #encrypEmailSet": "showEncryp",
            "click #encryptMail_cancel": "hideEncryp",
            "click #encryptMail_ok": "endEncryp",
            "click #encryptMailLookPassword": "lookencryptCode",
            "click #encryptMailClearPassword": "unsetencryptCode"
        },
        initialize: function (e) {
            return this.model = e.model, this.focusholderEvents(), a.prototype.initialize.apply(this, arguments)
        },
        showEncryp: function () {
            var e = this;
            top.BH("encry_blankbtn"), e.$el.find("#encrypBox").toggle(), o("#encryptMailTips").length > 0 && o("#encryptMail_ok").find("span").text("修改密码")
        },
        hideEncryp: function () {
            var e = this;
            top.BH("encry_stopbtn"), e.$el.find("#encrypBox").hide()
        },
        endEncryp: function () {
            function e(e, t) {
                switch (e) {
                    case t[0]:
                        top.BH("encry_setbtn");
                        break;
                    case t[1]:
                        top.BH("encry_resetbtn")
                }
            }

            var t = this, i = o("#encryptMail_ok").find("span").text(), a = ["设置密码", "修改密码"];
            e(i, a);
            var n = o("#encryptMail_pwd").val(), s = o("#encryptMail_repwd").val(), r = n.replace(/\s+/g, ""), l = s.replace(/\s+/g, ""), d = o.trim(r), c = o.trim(l), p = $T.Html.encode(d), u = ($T.Html.encode(c), {
                wordnothing: "密码不能为空,不支持纯空格设置",
                wordchinese: "密码不能含有汉字",
                wordnotsame: "两次密码不一致",
                wordstauts: "查看密码",
                wordsetok: "密码设置成功"
            });
            if (p.length <= 0 || "密码不支持空格输入" == p)return o("#encryptMail_pwd_error").parent().show(), void o("#encryptMail_pwd_error").text(u.wordnothing);
            if (/[\u4e00-\u9fa5]/.test(p))return o("#pwd_errortipsCon").show(), void o("#encryptMail_pwd_error").text(u.wordchinese);
            if (n != s)return o("#repwd_errortipsCon").show(), void o("#encryptMail_repwd_error").text(u.wordnotsame);
            t.model.set("encryptCode", p);
            var h = ['<tr id="encryptMailTips">', '<td colspan="2" class="write-secret">', '<div class="write-secret-div">', '<i class="icons i_m_secret"></i><span class="write-secret-letter" id="encryptMailPwd">已设置密码{0}</span><a href="javascript:" id="encryptMailLookPassword">{1}</a><span class="lineMlr">|</span><a href="javascript:" id="encryptMailClearPassword">取消密码</a>', "</div>", "</td>", "</tr>"].join("");
            h = $T.Utils.format(h, ["", u.wordstauts]), o("#encrypBox").hide(), o("#encryptMailTips").remove(), t.$el.find("#composeUploadBar").parents("tr").after(h), top.M139.UI.TipMessage.show(u.wordsetok, {delay: 1500}), t.$el.find("#encrypEmailSet").addClass("stackStrace")
        },
        focusholderEvents: function () {
            try {
                document.getElementById("testNode").type = "button"
            } catch (e) {
                for (var t = '<input type="password" id="{id}" class="iText" autocomplete="off" style="color: #999;font-size:12px;">', i = ["encryptMail_pwd", "encryptMail_repwd"], a = 0; a < i.length; a++)o("#" + i[a]).replaceWith($T.format(t, {id: i[a]}))
            }
            o("#repwd_holder,#pwd_holder").click(function (e) {
            }), o("#encryptMail_repwd,#encryptMail_pwd").focus(function () {
                o(this).val("").css("color", "black");
                try {
                    this.type = "password"
                } catch (e) {
                }
                o("#repwd_errortipsCon,#pwd_errortipsCon").hide()
            }), o("#encryptMail_repwd,#encryptMail_pwd").blur(function (e) {
                var t = o(this).val();
                if (!t) {
                    try {
                        this.type = "text"
                    } catch (i) {
                        return
                    }
                    o(this).val("密码不支持空格输入").css("color", "#999")
                }
            })
        },
        lookencryptCode: function (e) {
            var t = this;
            top.BH("encry_readpagelook");
            var i = o(e.currentTarget), a = i.text(), n = "密码是:" + t.model.get("encryptCode");
            "隐藏密码" == a ? (i.text("查看密码"), o("#encryptMailPwd").text("已设置密码")) : (i.text("隐藏密码"), o("#encryptMailPwd").text("已设置密码，" + n))
        },
        unsetencryptCode: function () {
            var e = this;
            top.BH("encry_readpagestop"), o("#encryptMailTips").remove(), e.$el.find("#encrypEmailSet").removeClass("stackStrace"), e.model.set("encryptCode", ""), o("#encryptMail_pwd,#encryptMail_repwd").val("")
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.Main", a.extend({
        el: "body",
        name: "compose",
        events: {
            "click #topSend": "toSendMail",
            "click #topSave": "toSaveMail",
            "click #bottomSend": "toSendMail",
            "click #bottomSave": "toSaveMail",
            "click #topCancelSend": "cancelSend",
            "click #cancelSend": "cancelSend",
            "click #newWinComposeLink": "preOpenNewWinCompose",
            "click #composePreviewLink": "composePreview",
            "click #questionSurveyLink": "showSurvey",
            "click #btn_newDoc": "showAddNewDoc",
            "click #aMMSSend": "MMSSend",
            "click #aSMSSend": "SMSSend",
            "click #activityInvite": "sendInvite",
            "click #startDiscuss": "onDiscussClick",
            "click #checkScout": "checkScout",
            "click #topSendFile": "topSendFile",
            "click #topSendGroup": "topSendGroup",
            "click #upPackage": "alertUpPackage",
            "click #insertContactsSwitch": "insertContactsSwitch"
        },
        shareTemplate: '<div style="font-family: 宋体;font-size: 13.0px;color: rgb(0,0,0);line-height: 1.5;"><p class="p0" style="margin: 0.0pt 0.0px;padding: 0.0px;line-height: 19.5px;"><span style="font-size: 10.5pt;">Hi，小伙伴：</span><span style="font-size: 10.5pt;"></span></p><p class="p0" style="margin: 0.0pt 0.0px;padding: 0.0px;line-height: 19.5px;"><span style="font-size: 10.5pt;">&nbsp;</span></p><p class="p0" style="margin: 0.0pt 0.0px;padding: 0.0px;line-height: 19.5px;"><span style="font-size: 10.5pt;">“@greetingString”——</span><span style="font-size: 10.5pt;">每次登录邮箱都收到激励或者温情的话，内心有所触动。</span><span style="font-size: 10.5pt;"></span></p><p class="p0" style="margin: 0.0pt 0.0px;padding: 0.0px;line-height: 19.5px;"><span style="font-size: 10.5pt;">&nbsp;</span></p><p class="p0" style="margin: 0.0pt 0.0px;padding: 0.0px;line-height: 19.5px;"><span style="font-size: 10.5pt;">你有get到感动吗？去139邮箱看看吧！</span><span style="font-size: 10.5pt;"></span></p><p class="p0" style="margin: 0.0pt 0.0px;padding: 0.0px;line-height: 19.5px;"><a href="http://mail.10086.cn/" target="_blank"><span class="15" style="color: rgb(0,0,255);">http://mail.10086.cn</span></a></p><br><br></div>',
        letterTemplate: '<iframe frameborder="0" scrolling="no" style="width:191px;border:0;height:{height}px;" src="letterpaper/letterpaper.htm" id="frmLetterPaper" name="frmLetterPaper"></iframe>',
        initialize: function (e) {
            return this.model = e.model,
                this.saveDraftComplete = !0,
                this.initEvents(),
                this.loadData(),
                this.encrypt = new M2012.Compose.View.Encrypt({ model: this.model }),
                a.prototype.initialize.apply(this, arguments)
        },
        initEvents: function () {
            var e = this, t = -1 != top.$App.getCurrentTab().name.indexOf("compose") || !!o("#compose_preload", top.document).length;
            e.registerMouseEvent(), e.registerKeyboardEvent(), e.divSubjectEvent(), t && e.registerCloseTabEvent();
            var i = o("#newWinComposeLink", document), a = i.prev();
            top.$App.isNewWinCompose() && (i.hide(), a.hide()), top.$App.on("closeNewWinCompose", function () {
                i.show(), a.show()
            }), top.$App.on("handlerMeetingInvite", function (e) {
            }), e.model.on("listenToInput", function () {
                Package.require("compose_ext", function () {
                    var t = htmlEditorView.editorView.editor;
                    t && e.model.get("openContactsSwitch") && Number(o("#aAllToOne").attr("showOneRcpt")) && (e.insertToEditor = new M2012.Compose.View.InsertToEditor({
                        doc: t.editorDocument,
                        addrInput: addrInputView
                    }).on("insert", function (e) {
                        t.insertHTML(e.node), o("#bottomTiming").closest("li").hide()
                    }).on("edit", function (e) {
                        var t = e.data, i = "", a = o("#toContainer"), n = ['<b name="addrName">{userName}</b>', '<span name="addressInfo">&lt;{prefix}<span class="addrDomain">{suffix}</span>&gt;</span>'].join("");
                        if (t)for (var s in t)i = $T.format(n, {
                            userName: $T.Html.encode(t[s]),
                            prefix: s.split("@")[0],
                            suffix: "@" + s.split("@")[1]
                        }), a.find(".btnNormal_write[title='" + s + "'] .addrBase_con").html(i).css("width", "auto")
                    }))
                })
            }), e.model.on("checkScoutIconshow", function () {
                var e = o("#txtSubject").val().length, t = o("#CoolMailtip"), i = {
                    Dragon: {
                        word: "正文、主题如包含'端午'关键字，对方会收到端午节特效动画哦~",
                        time: {begin: "2018/06/15 00:00:00", end: "2018/06/20 00:00:00"}
                    },
                    MidAutumn: {
                        word: "正文、主题如包含'中秋','月饼'关键字，对方会收到中秋节特效动画哦~",
                        time: {begin: "2018/09/21 00:00:00", end: "2018/09/26 00:00:00"}
                    },
                    Christmas: {
                        word: "正文、主题如包含'圣诞'关键字，对方会收到圣诞节特效动画哦~",
                        time: {begin: "2018/12/21 00:00:00", end: "2018/12/27 00:00:00"}
                    },
                    Spring_Festival: {
                        word: "正文、主题如包含'春节','新年'关键字，对方会收到春节特效动画哦~",
                        time: {begin: "2018/02/08 00:00:00", end: "2018/02/19 00:00:00"}
                    }
                }, a = {
                    Dragon: $Date.isGuideTime && $Date.isGuideTime(i.Dragon.time),
                    MidAutumn: $Date.isGuideTime && $Date.isGuideTime(i.MidAutumn.time),
                    Christmas: $Date.isGuideTime && $Date.isGuideTime(i.Christmas.time),
                    Spring_Festival: $Date.isGuideTime && $Date.isGuideTime(i.Spring_Festival.time)
                };
                a.Dragon ? t.text(i.Dragon.word) : a.MidAutumn ? t.text(i.MidAutumn.word) : a.Christmas ? t.text(i.Christmas.word) : a.Spring_Festival ? t.text(i.Spring_Festival.word) : t.text("");
                var n = a.Dragon || a.MidAutumn || a.Christmas || a.Spring_Festival;
                0 == e && n ? (t.show(), (o("#composeFicon").is(":visible") || o("#checkScoutIcon").is(":visible")) && t.hide()) : t.hide()
            }), e.model.on("removeAllItem", function () {
                o(htmlEditorView.editorView.editor.editorDocument).find("[id='insertUserList']").each(function () {
                    o(this).closest("#reply139content").length || o(this).remove()
                }), o("#bottomTiming").closest("li").show()
            }), t && window.$composeApp.on("handlerClose", function (e) {
                e.event && (e.event.cancel = !0);
                var t = mainView.model.compare(), i = -1 != top.$App.getCurrentTab().name.indexOf("compose");
                try {
                    t && !window.cancelTabOpen && i ? (top.BH && top.BH("compose_open_closeDia"), top.$Msg.confirm("您正在写信中，离开前是否保存草稿？", function () {
                        top.BH && top.BH("compose_closeDia_saveDraft"), top.M139.UI.TipMessage.hide(), clearInterval(mainView.model.autoSaveTimer.timer), mainView.model.sendOrSaveMail(mainView.model.actionTypes.SAVE, function (t) {
                            mainView.saveMailCallback(t), e && e.callback && e.callback()
                        }), setTimeout(function () {
                            e && e.callback && e.callback()
                        }, 1e4)
                    }, function () {
                        top.BH && top.BH("compose_closeDia_noSaveDraft"), e && e.callback && e.callback()
                    }, {
                        icon: "i_warn",
                        buttons: ["离开并存草稿", "离开不存草稿"],
                        dialogTitle: "离开提示"
                    })) : (top.M139.UI.TipMessage.hide(), clearInterval(mainView.model.autoSaveTimer.timer), e && e.callback && e.callback())
                } catch (o) {
                    e.event && (e.event.cancel = !1)
                }
            }), top.$App.off("closePopupPaper").on("closePopupPaper", function () {
                o("#popup_popupPapper").hide()
            }), o(document).click(function (e) {
                o(e.target).closest("#ED_WritePapers").length || o(e.target).closest("#popup_popupPapper").length || top.$App.trigger("closePopupPaper"), o(e.target).closest("tr#trCc").length && addrInputView.ccRichInput.focus(), o(e.target).closest("tr#trBcc").length && addrInputView.bccRichInput.focus()
            }), top.$App.off("startDiscussTip").on("startDiscussTip", function (t) {
                var i = "compose" == e.model.get("pageType");
                if (i)for (var a = t.content && t.content.trim() || "", n = ["讨论"], s = 0; s < n.length; s++)-1 != a.trim().indexOf(n[s]) && top.$App.showOnce("startDiscussTip", function () {
                    top.$Msg.confirm("推荐您使用讨论组管理主题会话，点击<span class='green'>确定</span>马上使用,已填写内容不会丢失", function () {
                        top.$App.registerConfig("discussInfo", {
                            receiver: e.getContactInfo(!1).join(","),
                            subject: o("#txtSubject").val().trim(),
                            content: e.filterExtraNode()
                        }), top.$App.show("startDiscuss")
                    }, function () {
                    }, {
                        icon: "warn", buttons: ["确定", "取消"], isHtml: !0, onClose: function () {
                        }
                    })
                })
            }), o("#txtSubject").on("keydown keyup", function () {
                -1 != top.$App.getCurrentTab().name.indexOf("compose_")
            }), top.$App.trigger("bindBeforeunload")
        },
        registerMouseEvent: function () {
            o("#switchSider").toggle(function (e) {
                top.BH("compose_addressbook_toggle"), o(this).attr("title", "显示右边栏"), o("#writeWrap").addClass("writeMainOff")
            }, function (e) {
                top.BH("compose_addressbook_toggle"), o(this).attr("title", "隐藏右边栏"), o("#writeWrap").removeClass("writeMainOff")
            })
        },
        divSubjectEvent: function () {
            var e = this;
            o("#divSubject").click(function () {
                o("#CoolMailtip").hide(), o("#txtSubject").focus()
            }), o("#txtSubject").blur(function () {
                e.model.trigger("checkScoutIconshow")
            }), o("#txtSubject").on("focus keydown", function () {
                o("#CoolMailtip").hide()
            })
        },
        registerKeyboardEvent: function () {
            function e(e) {
                if (e.ctrlKey && e.keyCode == i.Event.KEYCODE.ENTER) {
                    var a = o(".norTipsContent").html();
                    a === t.model.tipWords.LACK_ATTACHMENTS ? t.sendMail() : o("#topSend").click()
                } else if (e.ctrlKey && e.keyCode == i.Event.KEYCODE.V)try {
                    window.captureClipboard()
                } catch (n) {
                }
            }

            if (!top.SiteConfig.shortcutKeyConf) {
                var t = this;
                $B.is.ie && 6 == $B.getVersion() ? o(window.document).bind("keydown", function (t) {
                    e(t)
                }).bind("keypress", function (t) {
                    e(t)
                }) : o(window.document).bind("keydown", function (t) {
                    e(t)
                })
            }
        },
        registerCloseTabEvent: function () {
            var e = this;
            top.$App.on("closeTab", e.closeTabCallback)
        },
        closeTabCallback: function (e) {
            var t, i = top.$App.getCurrentTab().name, a = -1 != i.indexOf("compose"), n = o(top.$App.getCurrentTab().element).find("iframe");
            n && (t = n.get(0).id), a && e.name && e.name === i && t == window.frameElement.id ? window.$composeApp.trigger("handlerClose", {
                callback: function () {
                    top.$App.off("closeTab", mainView.closeTabCallback), top.$App.getView("tabpage").close(e.name), top.$App.trigger("removeBeforeunload"), window.$composeApp.off("handlerClose")
                }, event: e
            }) : e.name == window.frameElement.id && top.$App.off("closeTab", mainView.closeTabCallback)
        },
        loadData: function () {
            top.M139.UI.TipMessage.show(this.model.tipWords.LOADING, {after: 2e3});
            var e = this, t = e.model, i = t.pageTypes;
            t.regRouter({
                matchs: [i.COMPOSE, i.UPLOAD_LARGE_ATTACH], onroute: function () {
                    e.initPageInfo()
                }
            }), t.regRouter({
                matchs: [i.REPLY, i.REPLYALL], onroute: function (t, o) {
                    var a = t.pageType === i.REPLY ? "回复" : "全部回复";
                    top.$App.setTitle(a), o.replyMessage(t.pageType, e.composeCallback)
                }
            }), t.regRouter({
                matchs: [i.FORWARD, i.FORWARDASATTACH], onroute: function (t, i) {
                    top.$App.setTitle("转发"), i.forwardMessage(t.pageType, e.composeCallback)
                }
            }), t.regRouter({
                matchs: [i.FORWARDATTACHS], onroute: function (t, i) {
                    top.$App.setTitle("附件转发"), i.forwardAttachs(t.pageType, e.composeCallback)
                }
            }), t.regRouter({
                matchs: [i.DRAFT], onroute: function (t, i) {
                    i.restoreDraft(e.composeCallback)
                }
            }), t.regRouter({
                matchs: [i.RESEND], onroute: function (t, i) {
                    i.editMessage(e.composeCallback)
                }
            }), t.regRouter({
                matchs: ["rewrite"], onroute: function (t, i) {
                    i.rewriteMessage(e.composeCallback)
                }
            }), t.regRouter({
                matchs: [i.VCARD, i.CUSTOM], onroute: function (t, i) {
                    e.loadCustom(t, i)
                }
            }), t.regRouter({
                matchs: [i.SHARE], onroute: function (t, i) {
                    top.$App.setTitle("送你一句话，一起努力吧"), e.shareMessage(t, i)
                }
            }), t.trigger("route")
        },
        loadCustom: function (e, t) {
            var a = this, n = $composeApp.inputData.templateid, s = $composeApp.inputData.args;
            $composeApp.on("mailcontentload", function (e) {
                htmlEditorView.setEditorContent(e.content)
            }), $composeApp.on("mailsignload", function (e) {
                htmlEditorView.editorView.editor.on("ready", function (t) {
                    e.sign && htmlEditorView.editorView.editor.setSign(e.sign), e.onsign && e.onsign(htmlEditorView, a)
                })
            }), $composeApp.on("mailsubjectload", function (e) {
                o("#txtSubject").val(e.subject)
            }), $composeApp.on("mailreceiverload", function (e) {
                addrInputView.toRichInput.insertItem(e.to), e.cc && addrInputView.ccRichInput.insertItem(e.cc), e.bcc && addrInputView.bccRichInput.insertItem(e.bcc)
            }), n && i.requireJS(["packs/promotion/" + encodeURIComponent(n) + ".pack"], function () {
                a.initPageInfo(), $composeApp.trigger("extmailload", {templateid: n, param: s})
            })
        },
        composeCallback: function (e) {
            function a(e, t) {
                function i(e, t, i) {
                    return o.each(i, function (i, o) {
                        t && e && "undefined" != typeof t[o] && e[o] && (t[o] = e[o])
                    }), t
                }

                var a = ["account", "to", "cc", "bcc", "subject"], n = e.responseData["var"];
                return r && e && n && (n = i(r, e.responseData["var"], a)), n
            }

            function n(e, t) {
                return "string" != typeof e || "string" != typeof t ? "" : '"' + e.replace(/"|\\/g, "") + '"<' + t.replace(/[\s;,；，<>"]/g, "") + ">"
            }

            function s() {
                for (var e = 0; e < f.length; e++)if (h && h[0].indexOf(f[e]) > -1)return f[e];
                return ""
            }

            var r, l = e.responseData["var"].omid;
            top.M139.PageApplication.getTopApp().sessionPostData && (r = top.M139.PageApplication.getTopApp().sessionPostData);
            try {
                e.responseData["var"] = a(e, l)
            } catch (d) {
                console.log(d)
            }
            var c = top.$User.getTrueName(), p = e.responseData["var"].content, u = /收件人:(.*)/gim, h = null;
            p && (h = p.match(u));
            var m = o(".sendPsel").text();
            if (h && -1 == h[0].indexOf($Email.getEmail(m))) {
                i.NoNeedToGetDefaultSender = 1;
                "" == c ? top.$User.getDefaultSender() : n(c, top.$User.getDefaultSender())
            }
            var f = t.pluck(top.$App.getPopList(), "email"), g = s(), v = mainView;
            "" != g && (i.NoNeedToGetDefaultSender = 2, i.NoNeedToGetDefaultSender2 = g, mainView.model.set("sendAddress", n(c, g))), v.model.set("initDataSet", e.responseData["var"] ? e.responseData["var"] : {}), v.model.get("initDataSet").headers && v.model.get("initDataSet").headers["X-RM-isDeliverStatus"] && (v.model.set("checkScout", !0), o("#checkScoutIcon").parent("").addClass("transmited"), o("#checkScoutIcon").show(), o("#checkScout").addClass("stackStrace")), v.model.set("isComposePageOnload", !0);
            var y = v.model.get("pageType");
            if (o.inArray(y, [v.model.pageTypes.REPLY, v.model.pageTypes.REPLYALL, v.model.pageTypes.FORWARD]) >= 0 && ($composeApp.query.userAccount && (v.model.get("initDataSet").account = $composeApp.query.userAccount), e.responseData.code && "S_OK" == e.responseData.code ? e.responseData["var"].content = v.replaceContactQuote(e.responseData["var"].content) : console.log("读取原邮件信息出错！"), top.Contacts.isReady)) {
                var w = v.model.get("initDataSet");
                r && (w.to = r.account, w.cc = r.cc, w.bcc = r.bcc), w.to = v.model.getEamils(w.to), w.cc = v.model.getEamils(w.cc), w.bcc = v.model.getEamils(w.bcc)
            }
            v.initPageInfo(), v.initHistory()
        },
        replaceContactQuote: function (e) {
            function t(e, t, o) {
                for (var a = i.Text.Email.splitAddr(i.Text.Html.decode(o)), n = 0; n < a.length; n++) {
                    var s = a[n];
                    if ("" != s.trim()) {
                        var r = top.$App.getAddrNameByEmail(s);
                        s && (a[n] = r + " <" + top.$Email.getEmail(s) + ">", a[n] = i.Text.Html.encode(a[n]))
                    }
                }
                var l = t + a.join(",");
                return l.length > 2 && (l = l.substring(0, l.length - 2)), l
            }

            var o = new RegExp("(<b>收件人:</b>)(.+?)\r\n"), a = new RegExp("(<b>抄送:</b>)(.+?)\r\n");
            return e = e.replace(o, t), e = e.replace(a, t)
        },
        initHistory: function () {
            var e = $composeApp.query, t = this.model.get("initDataSet");
            if (top.M2012.History && !top.M2012.History.fromHistory) {
                var i = top.M2012.History.addCompose(e, t);
                top.M2012.History.modifyCurrent(i)
            }
        },
        shareMessage: function (e, t) {
            var i = this, o = i.model.get("initDataSet"), a = top.$App.getConfig("ContactData");
            i.model.set("isComposePageOnload", !0), o.subject = "送你一句话，一起努力吧", o.to = i.model.getEamils(i.model.getShareContacts(a)), o.content = i.shareTemplate.replace("@greetingString", i.model.get("greetingString")), i.initPageInfo()
        },
        initPageInfo: function () {
            var e = this;
            if (e.model.get("isEditorPageOnload") && e.model.get("isComposePageOnload")) {
                top.M139.UI.TipMessage.hide();
                var t = e.model.get("initDataSet");
                if (!t)return void top.$Msg.alert(e.model.tipWords.LOADFAIL, {
                    onclose: function (e) {
                    }
                });
                t.id && (e.model.composeId = t.id), t.messageId && (e.model.messageId = t.messageId);
                var i = e.model.get("pageType");
                e.render(i, t), e.initFocus(t), top && top.$App && -1 != top.$App.getCurrentTab().name.indexOf("compose") && e.model.createAutoSaveTimer(), e.showMoreAttach(), e.initGroupMail(), e.initForwardTip(), e.model.trigger("checkScoutIconshow"), BH({key: "compose_load"})
            } else console.log("写信页编辑器还未加载完！")
        },
        initForwardTip: function () {
            $composeApp && $composeApp.inputData && $composeApp.inputData.denyForward && o("#denyForward")[0].click(function () {
                top.$Msg.alert("该功能为收费套餐，建议您订购后使用！", {isHtml: !0})
            })
        },
        initGroupMail: function () {
        },
        render: function (e, i) {
            var a = this;
            htmlEditorView.render(e, i), addrInputView.render(e, i), subjectView.render(i), uploadView.render(i), littlesView.render(e, i), timingView.render(e, i), o("#mainContainer").scrollTop(o("#trCc").offset().top - 45 - 55);
            var n = i.withAttachments;
            if (n) {
                var s = t.groupBy(n, function (e) {
                    return e.type
                });
                s.attach && s.attach.length && (a.model.requestComposeId(), a.model.newForwardAttachs(s.attach, function () {
                    a.model.addAttach(s.attach)
                })), s.keepFolder && s.keepFolder.length && a.model.getLargeFileByGroupId(s.keepFolder[0].groupId, function (e) {
                    e.length && setNetLink(e)
                })
            }
        },
        _solveIeBug: function () {
            $B.is.ie && 6 == $B.getVersion() && o("html")[0].scrollHeight > o("html").height() && o("html").css("overflowY", "scroll")
        },
        initFocus: function (e) {
            try {
                e.to ? e.subject ? htmlEditorView.editorView.editor.isReady ? htmlEditorView.setFocus && htmlEditorView.setFocus() : htmlEditorView.editorView.editor.on("ready", function (e) {
                    htmlEditorView.setFocus && htmlEditorView.setFocus()
                }) : o("#txtSubject").focus() : addrInputView.toRichInput.focus()
            } catch (t) {
                i.Logger.sendClientLog({level: "ERROR", name: "Compose", errorMsg: "initFocus erorr:" + t.toString()})
            }
        },
        _solveInlineResources: function (e) {
            var t = e.responseData["var"].attachments;
            if (t) {
                for (var i = [], o = 0, a = t.length; a > o; o++) {
                    var n = t[o];
                    n.inlined && i.push({id: n.id, inlined: !1})
                }
                i.length > 0 && (this.model.mailInfo.id = e.responseData["var"].id, this.model.mailInfo.attachments = i, this.model.sendOrSaveMail(this.model.actionTypes.CONTINUE, null))
            }
        },
        showMoreAttach: function () {
            function e(e) {
                for (var i = e.offsetParent, o = 0; e != i;)o += e.offsetTop, e = e.parentNode;
                i.scrollTop = o;
                try {
                    t.contentWindow.document.documentElement.scrollTop = o
                } catch (a) {
                }
            }

            var t, i, a, n = this, s = 0;
            o("iframe").each(function () {
                -1 != this.src.indexOf("editor_blank") && (t = this)
            }), a = setInterval(function () {
                if (n.model.get("contIsSuc") || s > 20)clearInterval(a); else {
                    try {
                        s++, t && (i = t.contentWindow.document.getElementById("attachAndDisk"))
                    } catch (r) {
                    }
                    i && (n.model.set("contIsSuc", !0), o("#showMoreLargeAttach").show().click(function () {
                        e(i)
                    }))
                }
            }, 500)
        },
        clickSendMailSdk: function () {
            var e = this.clickSendMailCguid = i.Core.getCGUID(), t = (this.clickSendMailTime = (new Date).getTime(), ["sendmail", e, "", ""]);
            top.window.sendUData("webp_sendmail_click", t)
        },
        toSendMail: function (e) {
            if (!o("#topSend").attr("disabled")) {
                if (top.$App.isNewWinCompose() && BH({key: "newwin_compose_send"}), !addrInputView.checkInputAddr(e))return void console.log("收件人验证未通过a！");
                if (!subjectView.checkSubject(e))return void console.log("主题验证未通过！");
                if (uploadManager.isUploading() || uploadManager.isLargeAttachUploading()) {
                    var t = !!uploadManager.isLargeAttachUploading();
                    this.model.autoSendMail = !0;
                    var i = "附件上传完毕后邮件将自动发送 <a style='cursor:pointer;' onclick='mainView.cancelAutoSend();return false;'>取消自动发送</a>";
                    return t && (top.autoSendMail = !0, i = "超大附件正在上传中，上传完毕后邮件将自动发送 <a style='cursor:pointer;' onclick='mainView.cancelAutoSend();return false;'>取消自动发送</a>"), void top.M139.UI.TipMessage.show(i)
                }
                if (!htmlEditorView.checkContent(e))return void console.log("正文验证未通过！");
                if (this.model.containRemindKey = htmlEditorView.containRemindKey(), this.checkDenyForw())return void console.log("禁止转发邮件验证未通过！");
                this.model.replyWithQuote || htmlEditorView.removeReplyQuote();
                var a = this.model.get("pageType");
                if (a == this.model.pageTypes.DRAFT) {
                    if (!timingView.isClickTimingBtn(e) && !timingView.checkTiming(e))return void console.log("定时邮件验证未通过！")
                } else timingView.isClickTimingBtn(e) || (timingView.isScheduleDate = !1);
                return /合同|订单|报价|简历|紧急|重要|邀请|协助/g.test(o("#txtSubject").val()) ? void this.showLeadcheckScout() : void this.sendMail()
            }
        },
        cancelAutoSend: function (e) {
            top.M139.UI.TipMessage.hide(), this.model.autoSendMail = !1, top.$App.trigger("cancelAutoSend"), e ? top.M139.UI.TipMessage.show(e.tip, {
                delay: 2e3,
                className: e.className
            }) : top.M139.UI.TipMessage.show("已取消自动发送邮件", {delay: 2e3})
        },
        sendMail: function () {
            function e() {
                top.M139.UI.TipMessage.show(i.model.tipWords.SENDING, {after: 2e3}), o("#topSend,#bottomSend").attr("disabled", !0), o("#scoutTemplate", top.document).remove(), setTimeout(function () {
                    o("#topSend,#bottomSend").attr("disabled", null)
                }, 3e3), htmlEditorView.removeAttachQuoteBar(), htmlEditorView.editorView.editor.trigger("before_send_mail"), mainView.model.sendOrSaveMail(mainView.model.actionTypes.DELIVER, mainView.sendMailCallback)
            }

            function t(e, t) {
                return "string" != typeof e || "string" != typeof t ? "" : '"' + e.replace(/"|\\/g, "") + '"<' + t.replace(/[\s;,；，<>"]/g, "") + ">"
            }

            var i = this;
            try {
                top.$App.trigger("cancelFullScreen"), top.$App.trigger("removeSuggestView")
            } catch (a) {
            }
            !this.showSetTrueName() || top.$User.getTrueName() || this.checkSendMail ? e() : Package.require("compose_ext", function () {
                var o = i;
                o.getDefaultName(function (i) {
                    if (top.$App.setUserCustomInfoNew({showSetTrueNameTime: (new Date).getTime()}), i && "setSensName" == i.setSensName) {
                        var a = top.$User.getDefaultSender(), n = t(i.defaultName, a);
                        o.setSendName = !0, o.model.set("sendAddress", n)
                    }
                    e()
                })
            })
        },
        getDefaultName: function (e) {
            var t = top.$App.getCurrentView().model.get("mailListData") || [];
            t.length > 1 ? this.showDefaultName(t, e) : this.getMailList(e)
        },
        showDefaultName: function (e, t) {
            for (var i = "", o = 0; o < e.length && 20 > o; o++)for (var a = e[o].to.split(","), n = 0; n < a.length; n++) {
                var s = top.$Email.getEmail(a[n]), r = top.$Email.getName(a[n]);
                if (this.isUserEmail(s) && !/^[0-9]*$/g.test(r)) {
                    if (/[\u4E00-\u9FA5]/g.test(r)) {
                        i = r;
                        break
                    }
                    i || (i = r)
                }
            }
            if (!i)for (var l = top.UserData && top.UserData.uidList || [], o = 0; o < l.length; o++)if (!/^[0-9]*$/g.test(l[o]) && (i = l[0], /[\u4E00-\u9FA5]/g.test(l[o]))) {
                i = l[o];
                break
            }
            new M2012.Compose.View.SetTruename({defaultSendName: i, callback: t})
        },
        getMailList: function (e) {
            var t = this, i = e;
            this.model.getMailData(function (e) {
                t.showDefaultName(e, i)
            })
        },
        showSetTrueName: function () {
            var e = (new Date).getTime(), t = top.$App.getUserCustomInfo("showSetTrueNameTime");
            return !t || e - t > 2592e6
        },
        isUserEmail: function (e) {
            for (var t = top.UserData && top.UserData.uidList || [], i = 0; i < t.length; i++)if (-1 != e.indexOf(t[i]))return !0;
            return !1
        },
        toSaveMail: function (e) {
            this.saveDraftComplete && (this.saveDraftComplete = !1, BH({key: top.$App.isNewWinCompose() ? "newwin_compose_save" : "compose_save"}), o("#topSave,#bottomSave").attr("disabled", !0), setTimeout(function () {
                o("#topSave,#bottomSave").attr("disabled", null)
            }, 3e3), this.saveMailCallback.actionType = this.model.actionTypes.SAVE, htmlEditorView.removeAttachQuoteBar(), this.model.sendOrSaveMail(this.model.actionTypes.SAVE, this.saveMailCallback))
        },
        saveMailCallback: function (e) {
            if (e.responseData && "S_OK" == e.responseData.code) {
                top.$App && top.$App.trigger("mailboxDataChange"), mainView.model.mailInfo.mid = e.responseData["var"], e.responseData["var"] && "string" == typeof e.responseData["var"] ? mainView.model.draftId = e.responseData["var"] : mainView.model.draftId = e.responseData["var"] && e.responseData["var"].mid, top.$App.trigger("changDraftMid", {mid: e.responseData["var"]});
                var t = mainView.model.getTipwords(mainView.model.actionTypes.SAVE), i = new Date, a = mainView.saveMailCallback.actionType;
                a && a === mainView.model.actionTypes.AUTOSAVE ? t = mainView.model.getTipwords(a) : mainView.model.setSubMailInfo(htmlEditorView.getEditorContent(!0), o("#txtSubject").val()), top.M139.UI.TipMessage.show($T.Utils.format(t, [i.getHours(), i.getMinutes()]), {delay: 1e3})
            } else {
                var n = mainView.model.getErrorMessageByCode("saveMail", e.responseData.code) || e.responseData.summary;
                n && top.M139.UI.TipMessage.show(n, {delay: 1e3})
            }
            mainView.saveDraftComplete = !0
        },
        sendMailCallback: function (e) {
            if (top.M139.UI.TipMessage.hide(), mainView.setSendName && (top.M139.UI.TipMessage.show("<span>发件人姓名已保存。</span><a href=\"javascript:top.$App.show('account_accountSet');\">立即查看</a>", {delay: 3e3}), mainView.setSendName = !1), !e.responseData)return void top.$Msg.alert("发送失败！", {
                isHtml: !0,
                onclose: function (e) {
                }
            });
            if ("S_OK" == e.responseData.code) {
                timingView.isScheduleDate && BH({key: "compose_timingsendsuc"});
                var t = "" == mainView.model.get("autoGroup"), a = !1;
                mainView.isSendToGroup() ? top.$App.showGroupDialog(mainView.model.mailInfo, e.responseData["var"], t) : a = mainView.autoShowCalRemind(), clearInterval(mainView.model.autoSaveTimer.timer), mainView.model.PageState = mainView.model.PageStateTypes.Sended, mainView.model.setSubMailInfo(htmlEditorView.getEditorContent(), o("#txtSubject").val()), mainView.model.modifySendList(e);
                var n = htmlEditorView.getAtRemindData();
                top.$App.off("closeTab", mainView.closeTabCallback), window.$composeApp.off("handlerClose");
                var s = "write_ok_new.html?sid=" + mainView.model.getSid();
                s = $composeApp.inputDataToUrl(s, {
                    sid: mainView.model.getSid(),
                    index: top.$App.getCurrentTab().data.sendList.length - 1,
                    showCalRemind: a,
                    atRemindData: n || {},
                    mailContent: mainView.model.mailInfo.content
                });
                var r = e.responseData;
                r["var"] && r["var"].tid && (s += "&tid=" + r["var"].tid), r && r.attachs && r.attachs.length > 0 && (s += "&attachs=1"), mainView.model.get("hasLargeAttach"), mainView.sendMailSdk("webp_sendmail_loaded", "S_OK"), location.href = s
            } else {
                var l = e.responseData.summary || mainView.model.getErrorMessageByCode("sendMail", e.responseData.code, mainView.model.mailInfo);
                if (l || (l = "发送失败:" + e.responseData.code), mainView.sendMailSdk("webp_sendmail_loaded", "F_FAIL"), "FA_INVALID_SESSION" == e.responseData.code)return void top.$App.showSessionOutDialog();
                top.$Msg.alert(l, {
                    isHtml: !0, onclose: function (e) {
                    }
                }), i.Logger.sendClientLog({
                    level: "ERROR",
                    name: "send failure",
                    errorMsg: "error:" + (l + "|account: " + mainView.getSenderAddress() + "|type: " + typeof mainView.model.mailInfo.account)
                })
            }
        },
        sendMailSdk: function (e, t) {
            var i = this.clickSendMailCguid, o = (new Date).getTime() - this.clickSendMailTime, a = ["sendmail", i, t, o];
            top.window.sendUData(e, a)
        },
        cancelSend: function (e) {
            if (top.$App.isNewWinCompose()) {
                BH({key: "newwin_compose_cancel"});
                var t = mainView.model.compare();
                t && !window.confirm(mainView.model.tipWords.CANCEL_SEND) || top.window.close()
            } else BH({key: "compose_cancel"}), top.$App.close()
        },
        preOpenNewWinCompose: function () {
            function e(e) {
                var t = document.documentElement, a = document.createElement("form");
                a.target = "_blank", a.method = "get", o(a).append('<input type="hidden" name="t" value="win_compose" />'), o(a).append('<input type="hidden" name="id" value="2" />'), o(a).append('<input type="hidden" name="v" value="25" />'), o(a).append('<input type="hidden" name="sid" value="' + top.$App.getSid() + '" />'), o(a).append('<input type="hidden" name="draftId" value="' + e + '" />'), t.insertBefore(a, t.childNodes[0]), a.action = i, a.submit()
            }

            function t(e) {
                if (e.responseData && "S_OK" == e.responseData.code)top.$App && top.$App.trigger("mailboxDataChange"), i = i.replace(/[&](id|t|draftId)=\w+/g, ""), a.location.href = i + "&id=2&t=win_compose&draftId=" + e.responseData["var"]; else {
                    a.close(), console.log("存草稿失败！");
                    var t = mainView.model.getErrorMessageByCode("saveMail", e.responseData.code) || e.responseData.summary;
                    t && top.M139.UI.TipMessage.show(t, {delay: 1e3})
                }
            }

            BH({key: "newwin_compose"});
            var i = top.location.href;
            if (i = i.slice(0, i.lastIndexOf("#")), i += "&v=25", this.dealBeforeOpenWin(), this.model.isBlankCompose())e(); else {
                o("#topSave,#bottomSave").attr("disabled", !0), setTimeout(function () {
                    o("#topSave,#bottomSave").attr("disabled", null)
                }, 3e3), t.actionType = this.model.actionTypes.SAVE;
                var a = top.window.open("about:blank");
                this.model.sendOrSaveMail(this.model.actionTypes.SAVE, t)
            }
        },
        dealBeforeOpenWin: function () {
            var e = o("#htmlEdiorContainer").find(".eidt-content").children("iframe");
            if (e.length > 0 && e[0].contentWindow) {
                var t = e[0].contentWindow.document;
                o(t).find(".removeContent").remove()
            }
        },
        composePreview: function () {
            htmlEditorView.editorView.editor.preview()
        },
        showPaperFrame: function (e) {
            top.BH("compose_click_writeModule");
            var t = 200, a = o("#popup_popupPapper"), n = o("#ED_WritePapers"), s = n.offset().top;
            return a.length ? void(a.is(":visible") ? a.hide() : (a.show(), s + a.height() > o(window).height() ? a.offset({top: s - a.height()}) : a.offset({top: s + 24}))) : (this.popupPapper = i.UI.Popup.create({
                autoHide: !1,
                noClose: !0,
                name: "popupPapper",
                width: 330,
                target: n.get(0),
                content: '<iframe src=\'letterpaper/letterpaper.htm\' frameborder="0" allowTransparency="true" style=\'border:0px;width:100%;height:' + t + "px'/>"
            }), void this.popupPapper.render())
        },
        showSurvey: function (e) {
            var t = this, i = [{
                text: "问卷调研", onClick: function () {
                    t.showQuestionSurvey()
                }
            }, {
                text: "在线投票", onClick: function () {
                    t.showvoteSurvey()
                }
            }], a = o("#questionSurveyLink");
            top.M2012.UI.PopMenu.create({
                dockElement: a,
                items: i,
                width: 100,
                maxHeight: 165,
                container: o("body"),
                onItemClick: function (e, t) {
                }
            })
        },
        showQuestionSurvey: function () {
            var e = top.$Msg.open({
                dialogTitle: "创建问卷",
                url: "/m2015/html/questionSurvey.html",
                width: 743,
                height: 490
            });
            top.$App.off("closeSurveyWin").on("closeSurveyWin", function (t) {
                e.off("close"), e.close()
            }), top.BH("queSurveyWindow")
        },
        showvoteSurvey: function () {
            var e = top.$Msg.open({dialogTitle: "发起投票", url: "/m2015/html/vote/vote.html", width: 743, height: 490});
            top.$App.off("closeVote").on("closeVote", function (t) {
                e.off("close"), e.close()
            }), top.BH("voteWriteEnter")
        },
        showAddNewDoc: function (e) {
            top.BH("getNewDoc");
            var t = this, i = e.target;
            o(i).hasClass("load") || (o(i).addClass("load"), top.$App.off("obtainSelectedNewFiles"), top.$App.on("obtainSelectedNewFiles", function (e) {
                var i, o;
                for (var a in e)i = e[a], "attach" == a ? i.length && (renameConflict(i), t.model.newForwardAttachs(i, function (e) {
                    t.model.addAttach(e)
                })) : "disk" == a && (o = t.model.transformFileList(i), o.length && setNetLink(o));
                var n = e.firstElement;
                n.length && n[0].fileName && utool.fillSubject(n[0].fileName), top.selectFileDialog3 && top.selectFileDialog3.close()
            }), t.model.requestComposeId(), (new M2012.Compose.View.AddNewDoc).render())
        },
        addNewDoc: function (e) {
            top.$App.trigger("obtainSelectedFiles", e)
        },
        MMSSend: function (e) {
            function t() {
                i.Timing.waitForReady("top.document.getElementById('mms').contentWindow.document.body", function () {
                    var e = window.top.document.getElementById("mms").contentWindow;
                    if (e.willBeRefresh)return void setTimeout(t, 1e3);
                    try {
                        e.clearContentTip()
                    } catch (i) {
                    }
                })
            }

            top.$App.isNewWinCompose() && top.$App.closeNewWinCompose(!0);
            var a = this, n = this.getTextContentWithoutSign(), s = o("#txtSubject").val(), r = a.model.addrInputManager.getAllEmails(), l = [], d = null, c = "";
            o(r).each(function () {
                var e = this.toString(), t = $Email.getEmail(e);
                if (/^\d{11}@139\.com$/.test(t))d = t.match(/(^\d{11})@139\.com$/), d && d[1] && l.push(d[1]); else {
                    var i = top.Contacts.getSingleContactsByEmail(t, !0);
                    i && (c = i.getFirstMobile(), c && l.push(c))
                }
            }), top.Main.setReplyMMSData({
                content: n || "",
                receivers: l,
                subject: s || ""
            }), window.top.Links.show("mms", "&mmstype=diy&initData=replyMMSData"), t(), l = d = null
        },
        SMSSend: function (e) {
            top.$App.isNewWinCompose() && top.$App.closeNewWinCompose(!0);
            var t = this, i = this.getTextContentWithoutSign(), a = "composeMobileText" + Math.random();
            top[a] = i;
            var n = t.model.addrInputManager.getAllEmails(), s = "";
            o(n).each(function () {
                var e = this.toString(), t = $Email.getEmail(e);
                if (/^\d{11}@139\.com$/.test(t))s += '"{0}"<{1}>,'.format($Email.getName(e).replace(/"/g, ""), $Email.getAccount(t)); else {
                    var i = top.Contacts.getSingleContactsByEmail(t, !0);
                    i && (s += i.getMobileSendText())
                }
            }), s ? window.top.Links.show("sms", "&mobile=" + escape(s) + "&composeText=" + a) : window.top.Links.show("sms", "&composeText=" + a)
        },
        onActivityClick: function (e) {
            var t = this;
            top.BH && top.BH({key: "activity_invite"});
            var i = top.$App.getView("tabpage").model.pages;
            for (var a in i)a && a.indexOf("activityInvite") >= 0 && i[a].isSendInviteSuccess && top.$App.getView("tabpage").close(a);
            var n = "compose" == t.model.get("pageType");
            return n ? top.$App.registerConfig("activityInviteInfo", {
                receiver: t.getContactInfo(!0).join(","),
                subject: o("#txtSubject").val().trim(),
                content: t.filterExtraNode()
            }) : top.$App.registerConfig("activityInviteInfo", {}), top.$App.show("activityInvite"), BH({key: "activity_page_load"}), !1
        },
        onDiscussClick: function () {
            var e = this, t = "compose" == e.model.get("pageType");
            return t ? (top.$App.registerConfig("discussInfo", {
                receiver: e.getContactInfo(!1).join(","),
                subject: o("#txtSubject").val().trim(),
                content: e.filterExtraNode()
            }), void top.$App.show("startDiscuss")) : (top.$App.registerConfig("discussInfo", {}), void top.$App.show("startDiscuss"))
        },
        checkScout: function (e) {
            top.BH("setCheckScout");
            var t = this;
            "checkScout" == e.currentTarget.id && (o("#checkScoutIcon").parent("").addClass("transmited"), t.model.get("checkScout") ? o(e.target).closest("a").removeClass("stackStrace") : o(e.target).closest("a").addClass("stackStrace"), o("#checkScoutIcon").toggle(function () {
                t.model.trigger("checkScoutIconshow"), t.model.set("checkScout", !t.model.get("checkScout"))
            })), this.showLeadcheckScout(e)
        },
        showLeadcheckScout: function (e) {
            var t = e || {}, a = this, n = !1;
            if (t.currentTarget && "checkScout" == t.currentTarget.id && (n = !0), top.$App.getUserCustomInfo("showCheckScout"))n || a.sendMail(); else {
                this.checkSendMail = 1, top.$App.setUserCustomInfoNew({showCheckScout: "1"});
                var s = {setScoutClass: "set_strace_added", setScoutDisplay: "", sendMail: "", pictureCss: ""};
                n ? (top.BH("leadCheckScout"), s.setScoutClass = "", s.setScoutDisplay = "display: none;", s.sendMail = "cancelSend", s.picutreCss = "set_straced") : top.BH("leadCheckScoutBySend");
                var r = ['<div class="set_strace {pictureClass}" id="scoutTemplate" style="z-index:999">', '<div class="set_strace" style="display: none;"></div>', '<a href="javascript:;" class="set_strace_close {sendMail}"></a>', '<a href="javascript:;" class="set_strace_btn addScout {sendMail}"><span class="set_strace_add {setScoutClass}"></span></a>', '<a style="{setScoutDisplay}" class="set_strace_continue noSetScout" href="javascript:;" >不设置,继续发送</a>', "</div>"].join("");
                o(top.document.body).prepend(i.Text.Utils.format(r, s));
                var l = o("#scoutTemplate", top.document);
                a.scoutInitEvents(l)
            }
        },
        scoutInitEvents: function (e) {
            var t = this, e = o("#scoutTemplate", top.document);
            e.find("a").click(function (i) {
                clearTimeout(t.ScoutTimer), e.remove();
                try {
                    !!o(this).hasClass("cancelSend");
                    if (o(this).hasClass("addScout") && !o(this).hasClass("cancelSend") && (top.BH("setCheckScoutAndSend"), t.model.set("checkScout", !0)), o(this).hasClass("noSetScout") && top.BH("noCheckScoutAndSend"), o(this).hasClass("set_strace_close") && top.BH("closeCheckScoutLead"), o(this).hasClass("cancelSend"))return;
                    t.sendMail()
                } catch (a) {
                    console.warn(a.toString())
                }
            })
        },
        scoutPlayImg: function (e) {
            function t() {
                e.hasClass("set_straced") ? a.eq(1).removeClass("setStrace_next").siblings().addClass("setStrace_next") : a.eq(0).removeClass("setStrace_next").siblings().addClass("setStrace_next"), i.ScoutTimer = setTimeout(function () {
                    e.toggleClass("set_straced"), t()
                }, 1e3)
            }

            var i = this, a = o("#palyControl", top.document).find("li");
            t(), a.hover(function (t) {
                clearTimeout(i.ScoutTimer), 0 == o(t.currentTarget).index() ? (o(t.currentTarget).addClass("setStrace_next").siblings().removeClass("setStrace_next"), e.addClass("set_straced")) : (o(t.currentTarget).addClass("setStrace_next").siblings().removeClass("setStrace_next"), e.removeClass("set_straced"))
            }, function (e) {
                t()
            })
        },
        getContactInfo: function (e) {
            var t = addrInputView.toRichInput.getValidationItems().concat(addrInputView.ccRichInput.getValidationItems());
            e && (t = t.concat(addrInputView.bccRichInput.getValidationItems()));
            for (var i = {}, o = [], a = 0; a < t.length; a++) {
                var n = t[a], s = top.$Email.getEmail(n);
                i[s] || (i[s] = n, o.push(n))
            }
            return o
        },
        filterExtraNode: function () {
            var e = htmlEditorView.editorView.editor.editorDocument.body.cloneNode(!0), t = o(e).find("#signContainer")[0];
            t && t.parentNode.removeChild(t);
            var i = o(e).html();
            $B.is.webkit && i.indexOf("<!--[if") > -1 && (i = i.replace(/<!--\[if !\w+\]-->([\s\S]*?)<!--\[endif\]-->/g, "$1"));
            var a = /<img(?:.|\s)*?>/gi;
            return i = i.replace(a, "")
        },
        topSendFile: function (e) {
            var t, i = !!top.$sendfileApp;
            if (top.BH && top.BH("widget_send_files_compose"), i)top.$App.trigger("sendfile"); else {
                if (t = o(e.target).attr("isClick"))return;
                top.M139.core.utilCreateScriptTag({src: top.getRootPath() + "/js/packs/sendfile.html.pack.js"}, function () {
                    top.$App.trigger("sendfile")
                }), t = o(e.target).attr("isClick", !0)
            }
        },
        topSendGroup: function () {
            top.$App.show("compose", null, {inputData: {groupMail: !0}})
        },
        alertUpPackage: function () {
            top.BH("alertUpPackage");
            var e = top.$App.getSid(), t = ['<div class="layer_mask" style="overflow: hidden; z-index: 5149; opacity: 0.5; display: block;"></div>', '<div id="UpPackage" style="position:absolute;z-index: 9999;top:50%;left:50%;margin-left:-262px;margin-top:-169px;">', '<div class="interestsBox">', '<a id="closePackge" href="" class="interestsBox-close"></a>', '<a href="{upgradeAddress}" target="_blank" bh="morePack" class="interestsBox-more">查看更多特权</a>', '<a href="/m2015/html/set/feature_meal_upgrade1.html?sid=' + e + '&to=0016" target="_blank" bh="fivePack" onclick="top.BH(\'fivePack\')" class="interestsBox-btn interestsBox-five">升级5元套餐</a>', '<a href="/m2015/html/set/feature_meal_upgrade1.html?sid=' + e + '&to=0017" target="_blank" bh="twoPack" onclick="top.BH(\'twoPack\')" class="interestsBox-btn interestsBox-money">升级20元套餐</a>', "</div>", "</div>"].join("");
            o(top.document.body).prepend($T.format(t, {upgradeAddress: "//vip.mail.10086.cn/html/index.html?sid=" + e + "&rnd=782&tab=welcome&comefrom=54&v=25&k=7341&resource=indexLogin&cguid=1356126006569&mtime=512&h=4"})), o(top.document).find("#closePackge").click(function (e) {
                var t = o(top.document).find("#UpPackage");
                return t.prev().remove(), t.remove(), !1
            })
        },
        insertContactsSwitch: function (e) {
            var t = o(e.target).closest("span").find("label");
            t.hasClass("closingbtn") ? (t.removeClass().addClass("openingbtn"), this.model.set("openContactsSwitch", !0), top.BH && top.BH("compose_clickInsertToEditor_open"), top.$App.setCustomAttrs("insertContacts_forum", 0), this.model.trigger("listenToInput")) : (t.removeClass().addClass("closingbtn"), this.model.set("openContactsSwitch", !1), top.BH && top.BH("compose_clickInsertToEditor_close"), top.$App.setCustomAttrs("insertContacts_forum", 1), this.model.trigger("removeAllItem"))
        },
        sendInvite: function (e, t) {
            var i = this, a = o("#toobarBottom").find("ul li:gt(0)");
            Package.require("compose_ext", function () {
                i.sendInviteComponent ? i.sendInviteComponent.deleteNode() : (a.hide(), i.sendInviteComponent = new M2012.Compose.View.SendInviteCalendar({inviteData: t ? t.inviteData : null}).on("remove", function () {
                    i.sendInviteComponent = null, a.show()
                }))
            })
        },
        getSenderAddress: function () {
            var e = this.model.get("sendAddress");
            if (!e || "null" == e) {
                var t = top.$User.getDefaultSender();
                e = t, i.Logger.sendClientLog({
                    level: "ERROR",
                    name: "Compose",
                    errorMsg: "getSenderAddress is null, defaultSender: " + t
                })
            }
            return i.Text.Html.decode(e)
        },
        buildMailInfo: function (e, t) {
            this.model.composeId && (this.model.mailInfo.id = this.model.composeId), this.model.messageId && (this.model.mailInfo.messageId = this.model.messageId), this.model.draftId && (this.model.mailInfo.mid = this.model.draftId);
            var a = o("#txtSubject");
            this.model.mailInfo.account = this.getSenderAddress(), this.model.mailInfo.to = addrInputView.toRichInput.getValidationItems().join(","), this.model.mailInfo.cc = addrInputView.ccRichInput.getValidationItems().join(","), this.model.mailInfo.bcc = addrInputView.bccRichInput.getValidationItems().join(","), this.model.mailInfo.showOneRcpt = o("#aAllToOne").attr("showOneRcpt") ? o("#aAllToOne").attr("showOneRcpt") : 0, this.model.mailInfo.subject = a.val(), this.model.mailInfo.atRemind = htmlEditorView.containAtRemind(), this.model.mailInfo.isDeliverStatus = this.model.get("checkScout") ? 1 : 0;
            var n = [];
            "deliver" == e && (n = this.model.handlerSignImags());
            var s = htmlEditorView.getEditorContent();
            this.model.mailInfo.content = s, this.model.mailInfo.priority = o("#chkUrgent")[0].checked ? 1 : 3, this.model.mailInfo.requestReadReceipt = o("#chkReceipt")[0].checked ? 1 : 0, this.model.mailInfo.saveSentCopy = o("#chkSaveToSentBox")[0].checked ? 1 : 0, this.model.mailInfo.denyForward = o("#denyForward").attr("isdeny"), this.model.mailInfo.inlineResources = 1;
            var r = timingView.getScheduleDate();
            if (0 != r && 1e3 * r - i.Date.getServerTime().getTime() < 0)return top.$Msg.alert("定时邮件时间不能小于当前时间，请检查后重试"), void top.M139.UI.TipMessage.hide();
            this.model.mailInfo.scheduleDate = r, this.model.mailInfo.normalizeRfc822 = 0, this.model.mailInfo.busAssistant = this.model.mailBusiness(), n.length > 0 ? this.model.mailInfo.remoteAttachment = n : delete this.model.mailInfo.remoteAttachment, o("#encryptMailTips").length > 0 && (this.model.mailInfo.encryptCode = this.model.get("encryptCode"), this.model.mailInfo.sendWay = 3), this.model.fixBase64FileSize();
            for (var l = [], d = 0; d < this.model.composeAttachs.length; d++)void 0 != this.model.composeAttachs[d].fileSize && l.push(this.model.composeAttachs[d]);
            this.model.mailInfo.attachments = l, this.setHeadersValue("X-RM-FontColor", a.attr("headerValue")), this.sendInviteComponent && this.setHeadersValue("X-RM-MeetingInfo", this.sendInviteComponent.getValue().webappParam), (this.model.mailInfo.scheduleDate || "save" == e) && this.model.get("checkScout") && (this.model.mailInfo.headers["X-RM-isDeliverStatus"] = 1);
            for (var c = [], d = 0, p = Arr_DiskAttach.length; p > d; d++)"netDisk" !== Arr_DiskAttach[d].fileType && c.push(Arr_DiskAttach[d]), "keepFolder" == Arr_DiskAttach[d].fileType ? this.model.mailInfo.largeAttach = 1 : this.model.mailInfo.largeAttach || "netDisk" != Arr_DiskAttach[d].fileType || (this.model.mailInfo.cloudAttach = 1);
            0 == c.length && (this.model.mailInfo.content += getDiskLinkHtml());
            var u = [this.model.actionTypes.DELIVER, this.model.actionTypes.SAVE, this.model.actionTypes.AUTOSAVE];
            c.length > 0 && -1 != o.inArray(e, u) ? this.resolveLargeAttachs(e, t) : this.callComposeApi(e, t)
        },
        setHeadersValue: function (e, i) {
            t.isUndefined(i) || (this.model.mailInfo.headers[e] = i)
        },
        resolveLargeAttachs: function (e, t) {
            var i = this;
            i.model.mailFileSend(Arr_DiskAttach, function (o) {
                if (o.responseData && "S_OK" == o.responseData.code) {
                    for (var a = o.responseData["var"].fileList, n = 0, s = [], r = 0, l = Arr_DiskAttach.length; l > r; r++)"netDisk" !== Arr_DiskAttach[r].fileType && s.push(Arr_DiskAttach[r]);
                    for (var d = 0, c = s.length; c > d; d++)for (var p = s[d], r = 0, u = a.length; u > r; r++) {
                        var h = a[r];
                        if (h.fileId === p.fileId || h.fileName == p.fileName || h.fileName == p.name1) {
                            p.downloadUrl = h.url, p.exp = h.exp, n++;
                            break
                        }
                    }
                    n == s.length ? (i.model.mailInfo.content += getDiskLinkHtml(), i.model.set("hasLargeAttach", !0), i.callComposeApi(e, t)) : console.log("获取大附件下载地址有误！！")
                } else console.log("获取大附件下载地址失败！！")
            })
        },
        getFileByComeFrom: function (e) {
            var t = e.comeFrom, i = {};
            return "localFile" == t ? (i.fileId = e.businessId, i.fileName = e.name, i.filePath = e.name, i.fileSize = e.size, i.fileType = "keepFolder", i.state = "success") : "disk" == t ? (i.fileGUID = e.filerefid, i.fileId = e.id, i.fileName = e.name, i.filePath = e.name, i.fileSize = e.file.fileSize, i.fileType = "netDisk", i.state = "success") : "cabinet" == t ? (i.fileId = e.fid, i.fileName = e.fileName, i.filePath = e.fileName, i.fileSize = e.fileSize, i.fileType = "keepFolder", i.state = "success") : console.log("不支持的文件来源！comeFrom:" + t), i
        },
        autoShowCalRemind: function () {
            return Boolean(this.model.containRemindKey)
        },
        checkDenyForw: function () {
            var e = this, t = [], i = [], a = "", n = "", s = [], r = !1, l = o("#denyForward").attr("isdeny"), d = this.model.addrInputManager.getAllEmails();
            if (1 == l) {
                for (var c = 0; c < d.length; c++) {
                    var p = $Email.getDomain(d[c]);
                    -1 == p.indexOf("139.com") && t.push($Email.getEmailQuick(d[c]))
                }
                if (t.length > 0)return n = "【禁止转发】邮件只能发给139邮箱用户（@139.com），请修改收件人地址后继续使用", a = '<span style="color: #1a75ca;">使用规则</span>&nbsp;<i class="i_wenhao" title="收件人地址只能为本域（139.com）邮件地址，邮件不支持被POP、IMAP收取；附件仅支持收件人在线预览"></i>', e.showDenyForwTip(n, a), e.checkAddrColor(t), !0;
                for (var c = 0; c < this.model.composeAttachs.length; c++) {
                    var u = this.model.composeAttachs[c].fileSize;
                    if (void 0 != u) {
                        var h = this.model.composeAttachs[c], m = h.fileName;
                        this.checkDenyForwFile(m) || (i.push(h), s.push(m.substring(m.lastIndexOf(".") + 1, m.length).toLowerCase())), u > 20971520 && (r = !0)
                    }
                }
                if (s = o.unique(s), i.length > 0)return n = "【禁止转发】附件暂不支持<span style='color:#ed0000;'> " + s.join("、") + " </span>格式预览，收件人将不能预览该文件。请您删除后继续使用", a = '<span style="color: #1a75ca;">附件规定</span>&nbsp;<i class="i_wenhao" title="单个附件不超过20M，仅支持格式为doc、docx、xls、xlsx、ppt、pptx、 pdf、txt、jpg、jpeg、jpe、gif、png、rar、zip的附件在线预览，且不支持附件下载功能。"></i>', e.showDenyForwTip(n, a), !0;
                if (r)return n = "【禁止转发】单个附件大小不超过20M。请您删除后继续使用。", a = '<span style="color: #1a75ca;">附件规定</span>&nbsp;<i class="i_wenhao" title="单个附件不超过20M，仅支持格式为doc、docx、xls、xlsx、ppt、pptx、 pdf、txt、jpg、jpeg、jpe、gif、png、rar、zip的附件在线预览，且不支持附件下载功能。"></i>', e.showDenyForwTip(n, a), !0
            }
            return !1
        },
        checkAddrColor: function (e) {
            if ("[object Array]" === Object.prototype.toString.call(e))for (var t = 0; t < e.length; t++) {
                var i = e[t];
                o("div[title='" + i + "']").addClass("addrBaseOther")
            }
        },
        showDenyForwTip: function (e, t) {
            top.$Msg.confirm(e, function () {
            }, function () {
            }, {isHtml: !0, icon: "warn", bottomTip: t, buttons: ["确定"]})
        },
        checkDenyForwFile: function (e) {
            var t = /\.(?:txt|doc|docx|ppt|pptx|xls|xlsx|pdf|jpg|jpeg|png|gif|rar|zip)$/i;
            return !!t.test(e)
        },
        isSendToGroup: function () {
            return !1
        },
        getCloneBody: function () {
            return htmlEditorView.editorView.editor.editorDocument.body.cloneNode(!0)
        },
        isAttachExtendLimit: function () {
            var e = o(htmlEditorView.editorView.editor.editorDocument).find("video[name='videoFile']"), t = !1;
            return e.each(function () {
                var e = tranFileSize(o(this).attr("size") || 0);
                return e > 20971520 ? (t = !0, !1) : void 0
            }), utool.getSizeNow() >= 31457280 || t
        },
        handlerComposeParameter: function (e, t) {
            var a = this, n = this.getCloneBody(), s = !1;
            htmlEditorView.editorView.editor.editorDocument.body;
            if (n.innerHTML = e.attrs.content, e.attrs.showOneRcpt && a.insertToEditor) {
                var r = a.insertToEditor.getInsertData();
                r.length && "asyn" == e.action && (e.attrs.showOneReplace = i.JSON.stringify(r), e.attrs.to = addrInputView.toRichInput.getCurrentItems().join(","), n = a.insertToEditor.reformEditorBody(n), s = !0, top.BH("compose_useInsertEditor_send"))
            }
            var l = this.model.get("pageType"), d = !!e.attrs.atRemind;
            d && top.BH && top.BH("compose_send_containAtContacts"), ("draft" == l || mainView.model.draftId) && (-1 != e.action.indexOf("save") || s || (e.action = "deliver")), a.sendInviteComponent && o(n).find("#signContainer").remove(), window.location.origin ? location.origin = window.location.origin : location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
            var c = o(n).find("#questionnaire"), p = c.attr("class"), u = c.find("#surveyTitle").text(), h = c.find("#surveyDescription").text(), m = location.origin + "/m2015/html/questionnaire.html?surveyId=" + p;
            if (c.length) {
                var f = ['<div class="paper_reply" style="color: #444;margin:0 auto;text-align:center;border:1px solid #ddd; max-width:680px;font-family:Microsoft YaHei;">', '<h2 id="surveyTitle" style="line-height: 26px;padding: 16px 0;color: #444;font-size: 22px;text-align: center;font-weight: normal;word-wrap:break-word;word-break:break-all;">' + u + "</h2>", '<p style="color:#444;font-size: 14px;text-align:left;text-align: left;padding: 0 20px;line-height: 24px;word-wrap:break-word;word-break:break-all;">' + h + "</p>", '<div class="paper_reply_inner" style="margin-bottom:20px;">', '<i class="icon_v i-paper_unfair" style="display:none"></i>', '<a href="' + m + '" target="_blank" title="" style="text-decoration:none;">', '<img src="http://appmail.mail.10086.cn/m2015/images/temp/mail_paper_icon.jpg" style="margin-bottom:30px;border:none;">', "</a>", "</div>", "</div>"].join("");
                c.find("#questionnaireContent").remove(), c.html(f)
            }
            var g = o(n).find("#myVoting");
            if (g.length) {
                var v = g.attr("class"), y = g.find("#surveyTitle").text(), w = g.find(".newDescription").html() || "", b = location.origin + "/m2015/html/vote/myvoting.html?surveyId=" + v, f = ['<div class="paper_reply" style="padding: 14px 20px 26px 20px;max-width:616px;color:#444;box-shadow: 0 0 3px 3px #f5f5f5;color:#444;border-radius: 4px;border: 1px solid #e3e1e1; margin: 0 auto; font-size: 14px; word-break: break-all; word-wrap: break-word; position: relative; font: 14px / 1.5 Helvetica, Microsoft YaHei;">', '<h2 id="surveyTitle" style="margin:0 ;font-size: 20px;text-align: center;font-weight: normal;line-height: 24px;padding:27px 0 0 0;">' + y + "</h2>", '<p style="margin:0 ;padding:16px 0 22px 0;text-align: center;color: #999;line-height: 40px;">' + w + "</p>", '<div class="paper_reply_inner" style="padding:0;text-align:center;width: 181px;margin:0 auto;height:30px;">', '<a href="' + b + '" target="_blank" title="" style="text-decoration:none;">', '<img src="http://appmail.mail.10086.cn/m2015/images/temp/resume/btn_vote.png" style="cursor: pointer">', "</a>", "</div>", "</div>"].join("");
                g.find("#myVotingContent").remove(), g.html(f)
            }
            a.isAttachExtendLimit() && "asyn" == e.action && (e.action = "deliver"), e.attrs.content = n.innerHTML
        },
        handlerCreateDiscuss: function (e, a) {
            function n(e) {
                if (!e)return [];
                var i = e.split(",") || [], a = top.$User.getAccountList(), n = t.pluck(a, "name");
                if (i && i.length)for (var s = 0; s < i.length; s++)-1 != o.inArray($Email.getEmail(i[s]), n) && i.splice(s, 1);
                return i
            }

            function s(e) {
                i.RichMail.API.call("mbox:updateMessagesStatus", {ids: [l], type: "send2Id", value: e}, function (e) {
                })
            }

            var r = this, l = r.model.get("mid");
            r.model.queryGroupById({mailId: l}, function (t) {
                function d(e) {
                    var t = top.Contacts.getContactsByEmail(e), i = {};
                    return i = t.length ? {
                        receiverName: t[0].AddrFirstName,
                        receiverMobile: t[0].MobilePhone,
                        receiverEmail: $Email.getEmail(e)
                    } : {receiverName: top.$Email.getName(e), receiverMobile: "", receiverEmail: $Email.getEmail(e)}
                }

                function c() {
                    for (var e = r.model.addrInputManager.getAllEmails(), t = [], i = 0; i < e.length; i++)t.push(d(e[i]));
                    return t.push(d(top.$User.getDefaultSender())), t
                }

                if ("S_OK" == t.responseData.code) {
                    var p = t.responseData["var"].groupId;
                    if (Number(p)) {
                        e = o.extend(e, {sendId: p});
                        var u = e.attrs.to.split(",").concat();
                        e.attrs.to = n(e.attrs.to).concat(top.$User.getDefaultSender()).join(","), e.attrs.cc = n(e.attrs.cc).join(","), e.attrs.bcc = n(e.attrs.bcc).join(","), top.BH("replyall_joinDiscuss");
                        var h = t.responseData["var"].cancelUsers;
                        h.length && (e.attrs.filterSendid = h.join(","), r.isContainSelf(h) && (e.attrs.to = u.join(","))), a && a()
                    } else {
                        var m = {
                            fullTopic: o("#txtSubject").val().trim(),
                            userList: c(),
                            groupName: o("#txtSubject").val().trim(),
                            groupDescription: htmlEditorView.getTextContent(),
                            mailId: l
                        };
                        i.RichMail.API.call("gm:createGroup", m, function (t) {
                            if ("S_OK" == t.responseData.code) {
                                var i = t.responseData["var"].groupId;
                                i && (e = o.extend(e, {sendId: i})), e.attrs.to = n(e.attrs.to).concat(top.$User.getDefaultSender()).join(","), e.attrs.cc = n(e.attrs.cc).join(","), e.attrs.bcc = n(e.attrs.bcc).join(","), e.attrs.saveSentCopy = 1, e.attrs.subject = e.attrs.subject.replace(/(Re|Reply):/i, ""), top.BH("replyall_joinDiscuss"), s(i), a && a()
                            } else a && a()
                        }, function (e) {
                            a && a()
                        })
                    }
                } else a && a()
            })
        },
        isContainSelf: function (e) {
            for (var i = t.pluck(top.$User.getAccountList(), "name"), a = 0; a < e.length; a++)if (-1 != o.inArray(top.$Email.getEmail(e[a]), i))return !0;
            return !1
        },
        callComposeApi: function (e, t) {
            function a() {
                var e = 0;
                o.browser.msie || l.attrs.requestReadReceipt || l.attrs.isDeliverStatus || (e = setTimeout(function () {
                    o(document.body).prepend('<h1 id="snedStatus" style="display:none">发送成功<h1>')
                }, 80 + Math.ceil(40 * Math.random())), top.PreloadMailState = 1);
                var t = $Url.queryString("categroyId");
                u ? (l.corpId = top.SiteConfig.corpId, l.corpDomain = "@" + top.mailDomain, n.model.callApi("mbox:groupCompose", l, function (e) {
                    r && r(e)
                })) : t ? n.model.callApi("mbox:compose", l, function (e) {
                    r && r(e)
                }, {urlParam: "&guid=" + s + "&categroyId=" + t}) : n.model.callApi("mbox:compose&categroyId=103000000", l, function (e) {
                    r && (r(e), top.$App.trigger("reloadFolder"), l.attrs && l.attrs.onceSend && top.$App.trigger("userAttrChange"))
                }, {urlParam: "&guid=" + s})
            }

            var n = this, s = window.guid, r = t, l = n.model.getRequestDataForSend(e), d = 1 == top.$App.getCustomAttrs("reply_forum");
            if ("save" != e && "autosave" != e && (clearInterval(n.model.autoSaveTimer.timer), n.sendInviteComponent)) {
                var c = n.sendInviteComponent.getValue().calendarParam, p = {
                    comeFrom: 0,
                    ownerEmail: top.$User.getDefaultSender(),
                    title: l.attrs.subject,
                    to: l.attrs.to,
                    cc: l.attrs.cc,
                    bcc: l.attrs.bcc,
                    calendars: [o.extend(c, {content: htmlEditorView.getTextContent(), contentStyle: l.attrs.content})],
                    headers: l.attrs.headers,
                    atRemind: l.attrs.atRemind,
                    saveSentCopy: l.attrs.saveSentCopy,
                    showOneRcpt: l.attrs.showOneRcpt,
                    composeId: l.attrs.id,
                    messageId: l.attrs.messageId
                };
                return n.isContainSelf(n.model.addrInputManager.getAllEmails()) ? (top.M139.UI.TipMessage.show("不能将自己的帐号设为参与人", {
                    delay: 1e3,
                    className: "msgRed"
                }), !0) : void i.RichMail.API.call("calendar:addMeeting", p, function (e) {
                    e && e.responseData && "S_OK" == e.responseData.code ? r && r(e) : top.M139.UI.TipMessage.show("接口响应失败，请稍后重试", {
                        delay: 2e3, className: "msgRed"
                    })
                }, function (e) {
                })
            }
            n.handlerComposeParameter(l, function () {
            });
            var u = this.isSendToGroup();
            if (!top.$User.isRedListUser() && d && "replyAll" == n.model.get("pageType"))return "save" == e || "autosave" == e ? void a() : void n.handlerCreateDiscuss(l, function () {
                a()
            });
            if ("@139.com" == l.attrs.account) {
                var h = (top.$App.getConfig("UserAttrs") || {}).uid;
                return i.Logger.sendClientLog({
                    level: "ERROR",
                    name: "commonSend",
                    errorMsg: "getSenderAddress is @139.com, defaultSender: " + top.$User.getDefaultSender() + "|uid: " + h
                }), void i.RichMail.API.call("info:getInfoSet", null, function (e) {
                    if (e.responseData && "S_OK" == e.responseData.code) {
                        var t = e.responseData["var"].userMainData;
                        t && t.defaultSenderAccount ? l.attrs.account = t.defaultSenderAccount : l.attrs.account = h
                    } else l.attrs.account = h;
                    return "@139.com" == l.attrs.account ? void top.M139.UI.TipMessage.show("发信账号有误，请刷新页面后重试", {
                        delay: 2e3,
                        className: "msgRed"
                    }) : void a()
                })
            }
            a()
        },
        getTextContentWithoutSign: function () {
            var e = htmlEditorView.editorView.editor.editorDocument.cloneNode(!0), t = e.getElementById("signContainer"), i = e.getElementsByTagName("style");
            for (t && t.parentNode.removeChild(t); i[0];)i[0].parentNode.removeChild(i[0]);
            return (e.body.innerText || e.body.textContent || "").trim()
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.Subject", a.extend({
        el: "#subjectColor", name: "subject", initialize: function (e) {
            return this.model = e.model, this.initEvents(), this.colorData = this.model.subjectColorManager.getColorList(), this._loadColorTable(this.colorData), a.prototype.initialize.apply(this, arguments)
        }, initEvents: function () {
            var e = this, t = e.model.get("pageType");
            e.moduleName = top.$App.getCurrentTab().name, o("#txtSubject").focus(function () {
                o("#divSubject").addClass("writeTable-txt-on")
            }).blur(function () {
                o("#divSubject").removeClass("writeTable-txt-on");
                var e = o.trim(o(this).val());
                if (!e)switch (t) {
                    case"reply":
                    case"replyAll":
                        e = "回复";
                        break;
                    case"forward":
                    case"forwardAsAttach":
                        e = "转发";
                        break;
                    default:
                        e = "写信"
                }
                top.$App.getView("tabpage").setTitle(e)
            }), o("#divSubject div.theme-select").click(function (t) {
                e.showColorTable(t)
            })
        }, _loadColorTable: function (e) {
            var t = this.$("li");
            if (!(t.size() > 0)) {
                for (var i = this, o = [], a = 0, n = e.length; n > a; a++) {
                    var s = i.model.subjectColorManager.getColorName(a), r = ['<li onclick="subjectView.selectColor(this)"><a><span class="theme-i theme0', a + 1, '"><i class="i_xgg"></i></span>', s, "</a></li>"].join("");
                    o.push(r)
                }
                this.$("ul")[0].innerHTML = o.join("")
            }
        }, _setColorTableStyle: function (e) {
            var t = this;
            this.$("li.on").removeClass("on"), e.addClass("on"), o("#subjectColorSelector").attr("class", e.find("span")[0].className), this.$el.addClass("hide");
            var i = e.index(), a = t.model.subjectColorManager.getColor(i), n = o("#txtSubject");
            n.css("color", a), n.attr("headerValue", t.getColorValue(i))
        }, selectColor: function (e) {
            var t = this;
            BH({key: "compose_subjectcolor"}), e = o(e), t._setColorTableStyle(e);
            var i = e.index();
            i = t.getColorValue(i), top.$App.setAttrs({subject_color: i}, function (e) {
                "S_OK" === e.code ? (console.log("颜色值保存成功！" + i), o("#txtSubject").focus()) : console.log("颜色值保存失败！" + i)
            })
        }, render: function (e) {
            var t = this, i = $composeApp.query.subject;
            e && (i = e.subject, o("#txtSubject").val(i)), top.$App.setTitle(i, t.model.tabName);
            top.$App.getCurrentTab().view.param && top.$App.getCurrentTab().view.param.lastTabName;
            t.model.autoSaveTimer.subMailInfo.subject = o("#txtSubject").val(), VoiceInput.create({
                autoClose: !0,
                button: o("#btn_voiceSubject"),
                input: o("#txtSubject"),
                from: "subject"
            })
        }, showColorTable: function (e) {
            BH({key: "compose_subjectcolor"}), this._loadColorTable(this.colorData), o("#subjectColor").removeClass("hide"), M2012.UI.PopMenu.bindAutoHide({
                action: "click",
                element: o("#subjectColor")[0],
                stopEvent: !0,
                callback: function () {
                    o("#subjectColor").addClass("hide"), M2012.UI.PopMenu.unBindAutoHide({
                        action: "click",
                        element: o("#subjectColor")[0]
                    })
                }
            }), top.$Event.stopEvent(e)
        }, checkSubject: function (e) {
            var t = this;
            e || (e = {}, e.target = o("#topSend")[0]);
            var a = !1, n = o("#txtSubject"), s = n.val();
            if ("" == o.trim(s)) {
                var r = o(window).scrollTop(), l = n.offset().top, d = t.getPopupTarget(e);
                e.isTimeSendOperate && (d = o("#topSend").closest("li")[0]), t.popup && t.popup.close(), t.popup = i.UI.Popup.create({
                    target: d,
                    icon: "i_ok",
                    width: 300,
                    showArrow: !0,
                    buttons: [{
                        text: "确定", cssClass: "btnSure icoG icoG-s", click: function () {
                            var i = document.getElementById("CoolMailtip");
                            i && (i.style.display = "none");
                            var o = $T.Email.getEmail(mainView.getSenderAddress());
                            n.attr("value", o + "的来信"), timingView.isClickTimingBtn(e) && (timingView.isScheduleDate = !0), t.popup.close(), mainView.toSendMail(e)
                        }
                    }, {
                        text: "取消", cssClass: "btnNormal icoTb icoTb-s", click: function () {
                            t.popup.close(), r > l && (window.scrollTo(0, 0), i.Dom.flashElement(o("#divSubject")[0])), n.focus()
                        }
                    }],
                    containerClass: "norTips-news",
                    content: t.model.tipWords.LACK_SUBJECT
                }), t.popup.render()
            } else a = !0;
            return a
        }, getPopupTarget: function (e) {
            var t = o(e.target);
            t.attr("id") || t.parent("a").attr("id");
            return timingView.isClickTimingBtn(e) ? timingView.targetEle : t.parents("li")[0]
        }, getColorValue: function (e) {
            return 1 == e ? e = 5 : e > 1 && (e -= 1), e
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.Littles", a.extend({
        el: "#moreOptions",
        name: "littles",
        events: {},
        initialize: function (e) {
            return this.model = e.model, this.initEvents(), a.prototype.initialize.apply(this, arguments)
        },
        render: function (e, t) {
            function i(e) {
                return o("#addMoreMenu").find("#" + e)
            }

            "draft" == e && i("chkSaveToSentBox").attr("checked", Boolean(t.saveSentCopy)), 1 == t.priority && i("chkUrgent").attr("checked", !0), 1 == t.requestReadReceipt && i("chkReceipt").attr("checked", !0), 1 == t.replyNotify && i("replyNotify").attr("checked", !0)
        },
        initEvents: function () {
            var e = this, t = o("#addMoreMenu");
            t.find("input[type=checkbox]").m139Check(), o(document).click(function (a) {
                var n = o(a.target), s = !!o(n).closest("div#addMoreMenu").length, r = !!o(n).closest("a#showMoreOptions").length;
                s || r || t.hide(), r && (t.show(), i.Dom.dockElement(o("#showMoreOptions")[0], t[0], {
                    direction: "upDown",
                    dy: -1
                })), o(n).closest("#denyForward").length && (e.initDenyForward(), top.BH("denyforward_set")), o(n).closest("#freeDenyForward").length && (e.initDenyForward(), top.BH("denyforward_freeuse")), o(n).closest("li[name='moreOperateItems']").length && o(n).find("input[type=checkbox]").click()
            })
        },
        initDenyForward: function () {
            top.Package.require("denyforward_ext", function () {
                var e = {denyForwEle: o("#denyForward")[0], subjectEle: o("#txtSubject")[0]};
                new top.M2012.DenyForward.View(e)
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.AddrInput", a.extend({
        el: "body",
        name: "addrinput",
        events: {
            "click #receiverTo": "showAddressBookDialog",
            "click #receiverCc": "showAddressBookDialog",
            "click #receiverBcc": "showAddressBookDialog"
        },
        initialize: function (e) {
            this.model = e.model, window.topGetMaxSender, this.maxSenders = function () {
                return window.groupSendFlag ? (window.topGetMaxSender = top.$User.getMaxSend() + 400, window.topGetMaxSender) : (window.topGetMaxSender = top.$User.getMaxSend(), window.topGetMaxSender)
            }, this.createAddrInputs(), this.currentRichInput = null, this.initEvents();
            var t = this;
            return this.model.on("addMail", function (e) {
                e.remove && t.model.addrInputManager.removeMail(t.toRichInput, [e.remove]), t.model.groupUin = e.uin;
                var i = $TextUtils.format('"{0}"<{1}>', [e.name, e.email]), a = t.toRichInput.insertItem(i);
                a.editable = !1, o(a.el).attr("title", e.name), o(a.el).find(".addrBase_con>span").hide();
                var n = document.getElementById("txtSubject");
                "" == n.value && (n.value = e.title)
            }), a.prototype.initialize.apply(this, arguments)
        },
        createAddrInputs: function () {
            var e = this;
            e.toRichInput = M2012.UI.RichInput.create({
                container: document.getElementById("toContainer"),
                maxSend: e.maxSenders,
                type: "email",
                tipPlace: "bottom",
                maxLength: "none",
                scrollContainer: document.getElementById("mainContainer"),
                preventCorrect: !0
            }).render(), e.toRichInput.on("blur", function () {
                e.toRichInput.hasItem() || e.toRichInput.setTipText(e.model.tipWords.TO_DEFAULT_TEXT)
            }), e.toRichInput.on("itemchange", function () {
                e.ccRichInput && e.ccRichInput.hideAddressTips(), setTimeout(function () {
                    e.model.trigger("listenToInput")
                }, 100)
            }).on("itemchange", function () {
            }), e.toRichInput.on("focus", function () {
                e.currentRichInput = this, e.toRichInput.setTipText("")
            }), e.toRichInput.on("keydown", function (e) {
                e.ctrlKey && e.keyCode == i.Event.KEYCODE.ENTER && o("#topSend").click()
            }), e.ccRichInput = M2012.UI.RichInput.create({
                container: document.getElementById("ccContainer"),
                maxSend: e.maxSenders,
                type: "email",
                tipPlace: "bottom",
                zIndex: 4,
                maxLength: "none",
                scrollContainer: document.getElementById("mainContainer"),
                preventCorrect: !0
            }).render(), e.ccRichInput.on("itemchange", function () {
            }).on("itemchange", function () {
            }), e.ccRichInput.on("focus", function () {
                e.currentRichInput = this
            }), e.ccRichInput.on("keydown", function (e) {
                e.ctrlKey && e.keyCode == i.Event.KEYCODE.ENTER && o("#topSend").click()
            }), e.bccRichInput = M2012.UI.RichInput.create({
                container: document.getElementById("bccContainer"),
                maxSend: e.maxSenders,
                type: "email",
                tipPlace: "bottom",
                maxLength: "none",
                scrollContainer: document.getElementById("mainContainer"),
                preventCorrect: !0
            }).render(), e.bccRichInput.on("itemchange", function () {
            }).on("itemchange", function () {
            }), e.bccRichInput.on("focus", function () {
                e.currentRichInput = this
            }), e.bccRichInput.on("keydown", function (e) {
                e.ctrlKey && e.keyCode == i.Event.KEYCODE.ENTER && o("#topSend").click()
            })
        },
        render: function (e, t) {
            o("#toContainer input:text")[0].tabIndex = 1, o("#ccContainer input:text")[0].tabIndex = 2, o("#bccContainer input:text")[0].tabIndex = 3, e == this.model.pageTypes.REPLYALL && this.model.filterEmails(), this._initEmailInputs(t)
        },
        checkInputAddr: function () {
            var e = this, t = !0;
            if (!e.toRichInput.hasItem()) {
                window.scrollTo(0, 0), e.toRichInput.showEmptyTips("请填写收件人");
                o("#toContainer").find("div.ItemContainer").eq(0);
                e.toRichInput.focus(), t = !1
            }
            var i = null;
            e.toRichInput.getErrorText() ? i = e.toRichInput : e.ccRichInput.getErrorText() ? i = e.ccRichInput : e.bccRichInput.getErrorText() && (i = e.bccRichInput), i && (t = !1);
            var a = e.model.addrInputManager.getAllEmails();
            return a.length > e.maxSenders && (t = !1), t
        },
        initEvents: function () {
            this.addOrDelCcClick(), this.addOrDelBccClick(), this.addOrDelAllToOneClick(), o("#cancelAllToOne").bind("click", function () {
                o("#aAllToOne").click()
            }), VoiceInput.create({
                autoClose: !0, button: o("#btn_voiceTo"), from: "to", onComplete: function (e) {
                    var t = o("#toContainer").find(".addrText-input");
                    t.val(t.val() + e)
                }
            }), this.guideTips()
        },
        addOrDelCcClick: function () {
            var e = this, t = o("#trCc");
            o("#aShowCc").toggle(function (i) {
                o(this).text("添加抄送"), t.hide(), e.ccRichInput.clear(), o(this).attr("title", "同时将这封邮件发送给其他联系人"), e.currentRichInput = e.toRichInput, e._removeTabIndex(e.model.richInputTypes.CC), e.model.adjustEditorHeight(e.model.containerHeight.emailInputBox)
            }, function (i) {
                BH({key: "compose_cc"}), o(this).text("删除抄送"), t.show(), o(this).attr("title", ""), e.ccRichInput.focus(), e.currentRichInput = e.ccRichInput, e._addTabIndex(e.model.richInputTypes.CC), e.model.adjustEditorHeight(-e.model.containerHeight.emailInputBox)
            })
        },
        addOrDelBccClick: function () {
            var e = this, t = o("#trBcc");
            o("#aShowBcc").toggle(function (i) {
                BH({key: "compose_bcc"}), o(this).text("删除密送"), t.show(), o(this).attr("titleBak", o(this).attr("title")), o(this).attr("title", ""), e.bccRichInput.focus(), e.currentRichInput = e.bccRichInput, e._addTabIndex(e.model.richInputTypes.BCC), o("#txtSubject").hide().show(), e.model.adjustEditorHeight(-e.model.containerHeight.emailInputBox)
            }, function () {
                o(this).text("添加密送"), t.hide(), e.bccRichInput.clear(), o(this).attr("title", o(this).attr("titleBak")), e.currentRichInput = e.toRichInput, e._removeTabIndex(e.model.richInputTypes.CC), o("#txtSubject").hide().show(), e.model.adjustEditorHeight(e.model.containerHeight.emailInputBox)
            })
        },
        addOrDelAllToOneClick: function () {
            var e = this;
            o("#aAllToOne").toggle(function (t) {
                BH({key: "compose_alltoone"}), o(this).text("取消群发单显"), o(this).attr("showOneRcpt", 1), o("#aShowCc,#aShowBcc").each(function () {
                    o(this).hide().next().hide()
                }), o("#trCc").is(":visible") && (e.lastCCObj = e.ccRichInput.getValidationItems(), e.model.addrInputManager.addMail(e.toRichInput, e.lastCCObj), o("#aShowCc").click()), o("#trBcc").is(":visible") && (e.lastBCCObj = e.bccRichInput.getValidationItems(), e.model.addrInputManager.addMail(e.toRichInput, e.lastBCCObj), o("#aShowBcc").click()), o("#receiverTo").text("群发单显"), o("#receiverTo").attr("title", "点击选择收件人");
                var i = top.$App.getCustomAttrs("insertContacts_forum"), a = o("#mailInsertContainer");
                "" == i ? (a.show().find("label").removeClass().addClass("openingbtn"), e.model.set("openContactsSwitch", !0), top.BH && top.BH("compose_clickInsertToEditor_open"), e.model.trigger("listenToInput")) : (a.show().find("label").removeClass().addClass("closingbtn"), e.model.set("openContactsSwitch", !1), top.BH && top.BH("compose_clickInsertToEditor_close")), e.model.adjustEditorHeight(-e.model.containerHeight.allToOne)
            }, function () {
                o(this).text("群发单显"), o("#aShowCc,#aShowBcc").each(function () {
                    o(this).show().next().show()
                }), o(this).attr("showOneRcpt", 0), e.model.trigger("removeAllItem"), e.lastCCObj && (o("#aShowCc").click(), e.model.addrInputManager.addMail(e.ccRichInput, e.lastCCObj), e.model.addrInputManager.removeMail(e.toRichInput, e.lastCCObj)), e.lastBCCObj && (o("#aShowBcc").click(), e.model.addrInputManager.addMail(e.bccRichInput, e.lastBCCObj), e.model.addrInputManager.removeMail(e.toRichInput, e.lastBCCObj)), e.lastCCObj = null, e.lastBCCObj = null, o("#receiverTo").text("收件人："), o("#receiverTo").attr("title", "点击选择收件人"), o("#sendOperators").show(), o("#allToOneOperator").hide(), o("#mailInsertContainer").hide(), e.model.adjustEditorHeight(e.model.containerHeight.allToOne)
            })
        },
        showAddressBookDialog: function (e) {
            var t = this, i = e.target;
            t._setCurrentRichInput(i);
            var o = t.currentRichInput.getValidationItems(), a = top.M2012.UI.Dialog.AddressBook.create({
                filter: "email",
                items: o,
                comefrom: "compose_addrinput"
            });
            a.on("select", function (e) {
                var i = t.model.addrInputManager;
                i.addMailToCurrentRichInput(e.value.join(";")).focus()
            }), a.on("cancel", function () {
            })
        },
        _setCurrentRichInput: function (e) {
            var t = this, i = o(e).attr("id");
            switch (i) {
                case"receiverTo":
                    BH({key: "compose_to"}), t.currentRichInput = t.toRichInput;
                    break;
                case"receiverCc":
                    BH({key: "compose_cc_click"}), t.currentRichInput = t.ccRichInput;
                    break;
                case"receiverBcc":
                    BH({key: "compose_bcc_click"}), t.currentRichInput = t.bccRichInput
            }
        },
        _initEmailInputs: function (e) {
            var t = this, i = this.model;
            e.to && t.model.addrInputManager.addMail(t.toRichInput, e.to), e.cc ? (e.cc = e.cc.replace(/\\["']/g, ""), i.get("pageType") != i.pageTypes.COMPOSE && (o("#trCc").is(":visible") || o("#aShowCc").click()), t.model.addrInputManager.addMail(t.ccRichInput, e.cc)) : "1" == $T.Cookie.get("c_cc") && i.get("pageType") != i.pageTypes.COMPOSE && (o("#trCc").is(":visible") || o("#aShowCc").click()), e.bcc && (t.model.addrInputManager.addMail(t.bccRichInput, e.bcc), i.get("pageType") != i.pageTypes.COMPOSE && (o("#trBcc").is(":visible") || o("#aShowBcc").click()))
        },
        _disableLink: function (e) {
            e.style.color = "silver", e._onclick = e.onclick, e.style.cursor = "none", e.onclick = null
        },
        _enableLink: function (e) {
            e.style.color = "", e._onclick && (e.onclick = e._onclick), e.style.cursor = "pointer"
        },
        _removeTabIndex: function (e) {
            $B.is.ie && (e == this.model.richInputTypes.CC ? o("#ccContainer input:text")[0].tabIndex = null : e == this.model.richInputTypes.BCC && (o("#bccContainer input:text")[0].tabIndex = null))
        },
        _addTabIndex: function (e) {
            $B.is.ie && (e == this.model.richInputTypes.CC ? o("#ccContainer input:text")[0].tabIndex = 2 : e == this.model.richInputTypes.BCC && (o("#bccContainer input:text")[0].tabIndex = 3))
        },
        guideTips: function () {
            function e(e) {
                var t = [], i = top.$App.getConfig("AdLink");
                return i && i.tips && (t = i.tips), o.grep(t, function (t, i) {
                    return t.elementid === e
                })
            }

            var t = this, i = e("aAllToOne");
            i && i.length > 0 && (top.$App.off("insertItem"), top.$App.on("insertItem", function (e) {
                e && e.totalLength && e.totalLength > 2 && !t.model.get("hasShowGuideTips") && (t.model.set({hasShowGuideTips: !0}), o("body").append(top.operatetipsview.render(i[0], document)), top.operatetipsview.closeTips({
                    tipsid: i[0].id,
                    doc: document,
                    type: i[0].type
                }), top.BH("compose_alltoonetips"))
            }))
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.Upload", a.extend({
        el: "#composeUploadBar",
        name: "composeUpload",
        events: {"click #attachmentSwitchIcon": "showUploadMenu", "click #insertContentBtn": "showContentMenu"},
        initialize: function (e) {
            this.model = e.model;
            var t = o("#divUploadTip");
            return 0 == t.length && (t = o('<span id="divUploadTip" class="tips write-tips EmptyTips" style="display:none;"></span>').css("z-index", 128).appendTo(document.body)), this.initEvents(), this.initializeUploadMenuList(), a.prototype.initialize.apply(this, arguments)
        },
        render: function (e) {
            e && e.attachments && (this.model.composeAttachs = e.attachments.concat()), uploadManager.refresh()
        },
        initEvents: function () {
            var e = this;
            o("#aInsertPic").click(function () {
                Package.require("compose_ext", function () {
                    new M2012.UI.UploadImage.Menu.View({
                        wrapper: document.getElementById("aInsertPic"),
                        uploadType: "html5"
                    }).render()
                })
            }), o("#aScreenShot").on("click", function () {
                htmlEditorView.captureScreen()
            }), o("#divUploadTip").on("mouseenter", function (t) {
                clearTimeout(e.hideTimer)
            }).on("mouseleave", function (e) {
                o(this).hide()
            }), window.conversationPage || o("#floatDiv").mouseenter(function () {
                var t = {host: this, text: utool.getUploadTipMessage()};
                e.showUploadTip(t), o("#uploadFileBtn").addClass("addattraHover")
            }).mouseleave(function () {
                e.hideUploadTip(), o("#uploadFileBtn").removeClass("addattraHover")
            }), o("#aLargeAttach").click(function (e) {
                return !1
            }).mouseenter(function () {
                var t = {host: this, text: e.model.tipWords.UPLOAD_LARGEATTACH};
                e.showUploadTip(t)
            }).mouseleave(function () {
                e.hideUploadTip()
            }), o("#toAttachment").click(function (e) {
            }), o("#caiyunDisk").click(function (t) {
                return top.$App.getCurrentTab().name.indexOf("compose_") > -1 ? top.BH("compose_largeattach_disk") : top.BH("cMail_compose_uploadDisk"), e.showDiskDialog(), top.$("li[tabid^='compose'] a").click(function () {
                    top.dirid && (top.dirid = "")
                }), !1
            }).mouseenter(function () {
                var t = {host: this, text: "从彩云网盘选择文件发送"};
                e.showUploadTip(t)
            }).mouseleave(function () {
                e.hideUploadTip()
            }), top.$App.off("showMobileUploadDlg").on("showMobileUploadDlg", function () {
                e.showMobileUploadDlg()
            }), top.$App.off("changeMobileUploadedPics").on("changeMobileUploadedPics", function (t) {
                if (upload_module.uploadedPics && upload_module.uploadedPics.length)for (var i = 0, o = upload_module.uploadedPics.length; o > i; i++)upload_module.uploadedPics[i] == t.fileName && (upload_module.uploadedPics.splice(i, 1), e.oldUploadTotal && (e.oldUploadTotal = e.oldUploadTotal - 1))
            }), o("#aInsertMap").click(function (e) {
            }), window.$composeApp.off("obtainCabinetFiles"), window.$composeApp.on("obtainCabinetFiles", function (t) {
                var i = e.model.transformFileList(t);
                setNetLink(i), t.length && t[0].fileName && utool.fillSubject(t[0].fileName), top.selectFileDialog3 && top.selectFileDialog3.close()
            })
        },
        showMobileUploadDlg: function () {
            function e() {
                var e = ['<div class="mobileUpload clearfix">', '<img src="../images/201312/img_phone_01.jpg" class="mobileUpload-img1" />', '<p class="mobileUpload-info">请查收短信，点击链接登录139邮箱，选择要上传的图片</p>', '<p class="mobileUpload-introduction">支持android、ios手机操作系统<a href="http://help.mail.10086.cn/statichtml/1/Content/3198.html" target="_blank">帮助</a></p>', "</div>"].join("\r\n");
                d = top.$Msg.showHTML(e, {
                    dialogTitle: "从手机上传图片",
                    width: 360,
                    height: 235,
                    buttons: [],
                    noDelayPrint: !0,
                    onClose: function () {
                        r()
                    }
                })
            }

            function a(e) {
                l.insertImages([e.fileId]), upload_module.uploadedPics.push(e.fileName)
            }

            function n() {
                mobileUploadTimer = setTimeout(function () {
                    s(function (e) {
                        e && (p = e.fileId, 0 == e.status ? a(e) : 1 == e.status), !l.isUploadComplete && n()
                    })
                }, 3e3)
            }

            function s(e) {
                i.RichMail.API.call("attach:refresh", {id: upload_module.model.composeId, type: 1}, function (t) {
                    var i, o, a, n, s, r, d, c, p, m = 0, f = 0, g = 0, v = [];
                    v = t.responseData["var"], upload_module.model.composeAttachs = v.concat(), p = uploadManager.fileList;
                    for (var y = 0; y < v.length; y++)2 != v[y].clientType && v.splice(y, 1);
                    var w = t.responseData.uploadTotal;
                    for (w && (l.oldUploadTotal != v.length ? w += l.oldUploadTotal || 0 : w = l.oldUploadTotal || 0, u = !0, w && (l.progressDlg ? h.progress({
                        count: w,
                        hasUploadSum: v.length
                    }) : (h.show(), h.progress({
                        count: w,
                        hasUploadSum: v.length
                    })))), i = 0, a = v.length; a > i; i++) {
                        for (d = v[i], s = !1, o = 0, n = p.length; n > o; o++)c = p[o], c.fileId == d.fileId && (c.insertImage = d.insertImage, c.replaceImage = d.replaceImage);
                        for (o = 0, n = upload_module.uploadedPics.length; n > o; o++)upload_module.uploadedPics[o] == d.fileName && (s = !0);
                        s === !1 && /\.(?:gif|bmp|jpe?g|png|ico|tiff)$/i.test(d.fileName) && 2 == d.clientType && 0 == d.status && (r = d), 0 == d.status ? m++ : 1 == d.status ? g++ : f++, w == a && (g || (h.remove(), w != l.oldUploadTotal && (h.complete({
                            failureSum: f,
                            successSum: m,
                            isUploadingSum: g
                        }), l.oldUploadTotal = w)))
                    }
                    uploadManager.refresh(function () {
                        e(r)
                    })
                })
            }

            function r() {
                d && (d.remove(), d = null), clearTimeout(c)
            }

            var l = this;
            if (!top.$App.isReadSessionMail()) {
                void 0 === window.mobileUploadTimer && (window.mobileUploadTimer = null), l.progressDlg = null, l.isUploadComplete = !1, o("#guideUpload").hide();
                var d, c = null, p = "", u = (['<div class="mobileUpload clearfix">', '<img src="../images/201312/img_phone_02.jpg" class="mobileUpload-img2" />', '<p class="mobileUpload-introduction"></p>', '<span class="progressBarDiv">', '	<span class="progressBar"></span>', '	<span class="progressBarCur">', '		<span style="width: 0%;"></span>', "	</span>", "</span>", "</div>"].join("\r\n"), !1), h = {
                    show: function () {
                        var e = ['<div id="main" class="norTips">', '<div class="load-img">', '<img src="/m2015/images/global/upload-img.png" alt="" width="268" height="100">', "</div>", '<p id="progressBar" class="mb_10 c_333 fz_14 ta_c"></p>', "</div>"].join("");
                        r(), l.progressDlg = top.$Msg.showHTML(e, {
                            dialogTitle: "从手机上传图片",
                            width: 360,
                            height: 235,
                            buttons: [],
                            noDelayPrint: !0,
                            onClose: function () {
                            }
                        })
                    }, remove: function () {
                        l.progressDlg && l.progressDlg.remove(), l.progressDlg = null
                    }, progress: function (e) {
                        if (l.progressDlg) {
                            var t = l.progressDlg.$el;
                            t.find("#progressBar").text("正在上传  " + e.hasUploadSum + "/" + e.count)
                        }
                    }, complete: function (e) {
                        var t = ['<div class="norTips upload-img-tips">', '<span class="norTipsIco mt_15">', '<i class="i_ok"></i>', "</span>", '<dl class="norTipsContent mt_25">', '<dt class="norTipsLine c_333">上传成功</dt>', '<dd class="norTipsLine mt_10 hide"></dd>', "</dl>", "</div>"].join(""), i = ['<div class="norTips upload-img-tips">', '<span class="norTipsIco mt_15">', '<i class="i_ok"></i>', "</span>", '<dl class="norTipsContent mt_25">', '<dt class="norTipsLine c_333 pb_0_i mb_3">{successSum}张图片上传成功</dt>', '<dd class="norTipsLine c_999">{failureSum}张图片未上传成功，请在正文查看，再进行上传</dd>', "</dl>", "</div>"].join(""), o = !!e.failureSum;
                        l.completeDialog || (o ? l.completeDialog = top.$Msg.showHTML($T.format(i, {
                            successSum: e.successSum,
                            failureSum: e.failureSum
                        }), {
                            dialogTitle: "从手机上传图片",
                            width: 400,
                            buttons: ["关闭"],
                            noDelayPrint: !0,
                            onClose: function () {
                                l.completeDialog = null
                            }
                        }) : (l.completeDialog = top.$Msg.showHTML($T.format(t, {
                            successSum: e.successSum,
                            failureSum: e.failureSum
                        }), {
                            dialogTitle: "从手机上传图片",
                            width: 400,
                            buttons: ["关闭"],
                            noDelayPrint: !0,
                            onClose: function () {
                                l.completeDialog = null
                            }
                        }), setTimeout(function () {
                            l.completeDialog && l.completeDialog.remove(), l.completeDialog = null
                        }, 2500)))
                    }
                };
                upload_module.uploadedPics = [];
                for (var m = 0; m < upload_module.model.composeAttachs.length; m++)upload_module.uploadedPics.push(upload_module.model.composeAttachs[m].fileName);
                c = setTimeout(function () {
                    var e;
                    u || (e = ['<dl class="norTipsContent">', '<dt class="norTipsLine">未检测到上传成功的手机图片，已取消此操作。</dt>', '<dd class="norTipsLine gray">手机短信将无法进行图片上传，点击短信连接将登陆139酷版邮箱。</dd>', "</dl>"].join("\r\n"), r(), l.isUploadComplete = !0, top.$Msg.confirm(e, {
                        isHtml: !0,
                        icon: "i_warn",
                        buttons: ["关闭"],
                        dialogTitle: "从手机上传图片"
                    }))
                }, 6e5), e(), upload_module.model.requestComposeId(), o(document).click(), l.sendSysSms(function (e) {
                    "S_OK" === e.code ? (mobileUploadTimer && clearTimeout(mobileUploadTimer), n()) : "PML404010001" === e.code ? (r(), top.M139.UI.TipMessage.show("操作过于频繁，请稍后再试。", {
                        delay: 2e3,
                        className: "msgRed"
                    }), clearTimeout(c)) : (r(), top.M139.UI.TipMessage.show("网络异常，请稍后再试", {
                        delay: 2e3,
                        className: "msgRed"
                    }), clearTimeout(c))
                }), BH({key: "compose_mobile_upload_pic"}), l.fileIds = t.pluck(uploadManager.fileList, "fileId")
            }
        },
        sendSysSms: function (e) {
            var t = ("/mw2/sms/sms?func=sms:sendSysSms&sid=" + top.$App.getSid() + "&rnd=" + Math.random(), (top.$User.getAliasName("mobile") + "/" + top.$User.getAliasName("common")).replace(/@[^\/]*/g, "")), o = (["<object>", '<int name="type">1</int>', '<int name="attr">', [htmlEditorView.model.composeId, top.$App.getSid(), (new Date).getTime()].join("/"), "," + t, "</int>", "</object>"].join(""), "http://html5.mail.10086.cn/?id=phoneAttach&cid=" + [htmlEditorView.model.composeId, top.$App.getSid(), (new Date).getTime()].join("/") + "&cnum=" + t), a = {
                loginName: top.$User.getAliasName("mobile").replace(/@[^\/]*/g, ""),
                fv: "4",
                clientId: "1000",
                loginSuccessUrl: o
            };
            i.RichMail.API.call("login:sendSmsCode", a, function (t) {
                e(t.responseData || {})
            })
        },
        insertImages: function (e) {
            setTimeout(function () {
                top.WaitPannel.hide()
            }, 3e3), BH({key: "compose_mobile_insert_pic"}), e && 0 !== e.length ? t.each(e, function (e) {
                var t = utool.getFileById(e), i = decodeURIComponent(t.getDownloadUrl());
                htmlEditorView.editorView.editor.insertImage(i, {isAdjustWidth: !0})
            }) : top.WaitPannel.show("未获取到图片，请稍后再试^^", {className: "msgRed"})
        },
        getPreviewDoc: function (e, t) {
        },
        showDiskDialog: function () {
            var e = this;
            if (top.selectFileDialog2)return void top.selectFileDialog2.cancelMiniSize();
            var t = top.selectFileDialog2 = top.$Msg.open({
                dialogTitle: "从彩云网盘选择",
                url: "selectfile/disk_write.html?sid=" + top.sid,
                width: 520,
                height: 468
            });
            t.on("remove", function () {
                top.selectFileDialog2 = null
            }), top.$App.on("obtainSelectedFiles", function (i) {
                e.model.filterExistAttach(i);
                var o = e.model.transformFileList(i);
                setNetLink(o), t.close(), i.length && i[0].name && utool.fillSubject(i[0].name)
            }), t.on("remove", function () {
                top.$App.off("obtainSelectedFiles")
            })
        },
        showAttachmentDialog: function () {
            var e = this;
            e.model.requestComposeId();
            var t = top.selectFileDialog4 = top.$Msg.open({
                dialogTitle: "从附件夹中选择",
                url: "selectfile/attachment_write.html?sid=" + top.sid + "&composeId=" + e.model.composeId,
                width: 520,
                height: 415
            });
            t.on("remove", function () {
                top.selectFileDialog4 = null
            }), top.$App.on("obtainAttachFiles", function (i) {
                e.model.filterExistAttach(i);
                for (var o = uploadManager.fileList || [], a = 0; a < i.length; a++) {
                    var n = i[a], s = new UploadFileItem({
                        type: "Common",
                        fileName: (n.fileName || n.name).replace(/\"/g, "“").replace(/'/g, "‘"),
                        fileId: n.id || n.fileId,
                        fileSize: n.fileRealSize || n.fileSize || n.size || 0,
                        insertImage: n.insertImage,
                        replaceImage: n.replaceImage,
                        isComplete: !0
                    });
                    o.push(s), e.model.composeAttachs.push({
                        fileId: n.id || n.fileId,
                        fileName: n.fileName || n.name,
                        fileSize: n.fileSize || n.size || 0,
                        insertImage: n.insertImage,
                        replaceImage: n.replaceImage
                    })
                }
                uploadManager.render({type: "add"}), t.close()
            }), t.on("remove", function () {
                top.$App.off("obtainAttachFiles")
            })
        },
        showLargeAttachDialog: function () {
            var e = this;
            BH({key: "compose_largeattach"}), i.RichMail.API.call("disk:init", null, function (e) {
                e && e.responseData && (e = e.responseData, "S_OK" == e.code && (top.isMcloud = "0" != e["var"].isMcloud))
            }), e.selectFile()
        },
        initializeUploadMenuList: function () {
            var e = this;
            e.uploadMenuList = [{
                text: "超大附件", onClick: function () {
                    e.showLargeAttachDialog()
                }
            }, {
                text: "从附件夹中选择", onClick: function () {
                    e.showAttachmentDialog()
                }
            }, {
                text: "从网盘中选择", onClick: function () {
                    e.showDiskDialog()
                }
            }], e.contentMenuList = [{
                text: "日程安排",
                id: "aInsertCalendar",
                title: "将日历中的活动插入到邮件正文",
                onClick: function () {
                    top.BH("compose_insertContent_click_schedule"), (new M2012.Compose.View.Calendar).initCalendarList()
                }
            }, {
                text: "文档内容", id: "aInsertDoc", onClick: function () {
                }
            }, {
                text: "和笔记", id: "aInsertNote", title: "插入和笔记", onClick: function () {
                    top.BH("compose_insertContent_click_note"), (new M2012.Compose.View.Note).initNoteList()
                }
            }, {
                text: "地图位置", id: "aInsertMap", title: "插入地图", onClick: function () {
                    top.getProtocol && "https://" == top.getProtocol() ? top.$Msg.alert("当前功能仅支持Http模式下使用！") : (top.BH("compose_insertContent_click_map"), e.showInsertMapDialog())
                }
            }];
            var t = {
                text: "音视频", id: "insertVideo", title: "音视频", onClick: function () {
                }
            };
            e.contentMenuList.push(t)
        },
        showUploadMenu: function () {
            var e = this;
            e.uploadMenu = M2012.UI.PopMenu.create({
                dockElement: o("#attachmentSwitchIcon")[0],
                width: 130,
                items: e.uploadMenuList,
                dx: -93,
                dy: 0,
                onItemClick: function (e) {
                }
            })
        },
        showContentMenu: function () {
            var e = this;
            return top.BH("compose_click_insertContent"), e.contentPopMenu ? (e.contentPopMenu.show(), void(upload_video_flash.fileUpload && upload_video_flash.fileUpload.isShow(!0))) : void(e.contentPopMenu = M2012.UI.PopMenu.create({
                noStopPropagation: !0,
                dockElement: o("#insertContentBtn")[0],
                width: 130,
                items: e.contentMenuList,
                dx: 0,
                dy: 0,
                hideInsteadOfRemove: !0,
                hideCallback: function () {
                    upload_video_flash.fileUpload && upload_video_flash.fileUpload.isShow(!1)
                },
                onItemClick: function (e) {
                },
                onComplete: function () {
                    i.core.utilCreateScriptTag({
                        id: "insertContent",
                        src: top.getRootPath() + "/js/packs/compose.insertContent.html.pack.js?v=" + Math.random(),
                        charset: "utf-8"
                    }, function () {
                    })
                }
            }))
        },
        cancelAutoSend: function () {
            top.autoSendMail = !1, clearInterval(this.secTimer), this.autoDialog && this.autoDialog.close()
        },
        selectFile: function () {
            var e = this;
            if (window.selectFileDialog)return void window.selectFileDialog.cancelMiniSize();
            var t = window.selectFileDialog = top.$Msg.open({
                dialogTitle: "添加超大附件",
                url: "selectfile/largeAttach.html?sid=" + top.sid,
                width: 520,
                height: 411,
                showMiniSize: !0
            });
            top.selectFileDialog001 = t, setTimeout(function () {
                window.selectFileDialog.setMiddle()
            }, 500), M2012.UI.Widget.LargeAttachUploadTips || i.core.utilCreateScriptTag({
                id: "m2012.ui.widget.largeattachuploadtips",
                src: top.getRootPath() + "/js/ui/widget/m2012.ui.widget.largeattachuploadtips.js",
                charset: "utf-8"
            }), t.on("minisize", function () {
                var e = this.$el.offset(), i = {
                    top: e.top,
                    left: e.left,
                    height: this.$el.height(),
                    width: this.$el.width()
                }, a = o('<div style="border:3px silver solid;position:absolute;z-index:9999"></div>').css(i);
                a.appendTo(document.body).animate({
                    left: o(document.body).width() - 200,
                    top: o(document.body).height() - 200,
                    height: 100,
                    width: 100
                }, 300, function () {
                    if (a.remove(), t) {
                        var e = new M2012.UI.Widget.LargeAttachUploadTips({dialog: t});
                        e.render()
                    }
                }), top.BH("compose_largeattach_minisize"), top.$App.trigger("listenAutoSend")
            }), t.on("remove", function () {
                window.selectFileDialog = null
            }), t.on("close", function (e) {
                function t() {
                    o("object", i.document).remove()
                }

                var i = o(this.el).find("iframe")[0].contentWindow, a = i.selectFileView.UploadApp.model, n = a.isUploading();
                n ? window.confirm(i.selectFileView.model.tipWords.UPLOADING) ? (top.M139.UI.TipMessage.hide(), e.cancel = !1) : (t(), e.cancel = !0) : (t(), e.cancel = !1)
            }), top.$App.on("rebuildSelectFileDialog", function (e) {
                t.jContainer.find("iframe").css(e)
            }), top.$App.on("obtainSelectedFiles", function (i) {
                var a = e.model.transformFileList(i);
                if (setNetLink(a), i.length && i[0].name && utool.fillSubject(i[0].name), top.autoSendMail) {
                    if (!i.isChecked)return t.close(), void(mainView && mainView.toSendMail());
                    var n = 10, s = '即将于 <span style="color:red;">' + n + "</span> 秒后自动发送本邮件。<br/>此前您可以取消自动发送，继续编辑邮件。", r = function () {
                        e.cancelAutoSend(), window.top.M139.UI.TipMessage.show("已取消自动发送邮件", {delay: 2e3})
                    };
                    top.M139.UI.TipMessage.hide();
                    var l = top.$Msg.confirm(s, function () {
                        r()
                    }, function () {
                        return !1
                    }, {icon: "i_warn", isHtml: !0, dialogTitle: "邮件自动发送", buttons: ["取消自动发送"], onBeforeClose: r});
                    e.autoDialog = l, e.secTimer = setInterval(function () {
                        n -= 1;
                        var t = '即将于 <span style="color:red;">' + n + "</span> 秒后自动发送本邮件。<br/>此前您可以取消自动发送，继续编辑邮件。";
                        return o(top.document).find(".MB_MessageBox_Content").html(t), 0 > n ? (l.close(), clearInterval(e.secTimer), mainView && mainView.toSendMail(), !1) : void 0
                    }, 1e3)
                }
                t.close()
            }), t.on("remove", function () {
                top.$App.off("rebuildSelectFileDialog"), top.$App.off("obtainSelectedFiles")
            })
        },
        showUploadTip: function (e) {
            if (e || (e = {
                    host: o("#realUploadButton")[0],
                    text: utool.getUploadTipMessage()
                }), !window.conversationPage) {
                clearTimeout(this.hideTimer);
                var t = o("#divUploadTip").html(e.text);
                i.Dom.dockElement(e.host, t[0], {dy: -5}), !!e.text && t.show()
            }
        },
        hideUploadTip: function () {
            var e = o("#divUploadTip");
            clearTimeout(this.hideTimer), this.hideTimer = setTimeout(function () {
                e.hide()
            }, 200)
        },
        showInsertMapDialog: function (e) {
            return top.$B.is.ie && "6.0" == top.$B.getVersion() ? void top.$Msg.alert("IE6以上版本浏览器才能使用此功能！") : (top.insertMapDialog = top.$Msg.open({
                dialogTitle: "插入地图",
                url: "compose_insertmap.html?sid=" + top.sid,
                width: 452,
                height: 400
            }), void top.insertMapDialog.on("remove", function () {
                top.insertMapDialog = null
            }))
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.HtmlEditor", a.extend({
        el: "body",
        name: "htmlEditor",
        events: {},
        config: {"editor-body-selected": "eidt-body-selected"},
        initialize: function (e) {
            function n() {
                var e = p.editorView.editor.jEditorDocument, t = e.find("img").map(function () {
                    return o(this).attr("src")
                }), i = o(".insertImgBox");
                -1 == o.inArray(i.attr("imgsrc"), t) && i.remove()
            }

            function s() {
                if (internalAttachArr && internalAttachArr.length) {
                    for (var e = o(htmlEditorView.editorView.editor.editorDocument).find("video[name='videoFile']").map(function () {
                        return o(this).attr("id")
                    }).get(), t = [], i = [], a = 0; a < internalAttachArr.length; a++) {
                        var n = internalAttachArr[a].fileId;
                        -1 == o.inArray(n + "_video", e) ? t.push(n) : i.push(internalAttachArr[a])
                    }
                    t.length && setTimeout(function () {
                        p.model.deleteAttach(t, function () {
                            internalAttachArr = i
                        })
                    }, 500)
                }
            }

            function r(e) {
                var t = e.originalEvent.clipboardData.getData("text/html");
                if ("-1" == t.indexOf("<style>"))return !1;
                var i = t.replace(/:.5pt solid/gim, ":1px solid"), a = i.indexOf("<!--") + 4, n = i.indexOf("-->"), s = i.slice(a, n), r = o(e.target).parents("body"), l = s.indexOf("@page");
                -1 != s.indexOf("@page") && (s = s.substring(l), console.log(s)), r.append("<style>table{border-collapse:collapse};" + s + "</style>"), setTimeout(function () {
                    r.find("table").css("border-collapse", "collapse"), r.find("td").each(function (e, t) {
                        if (i.indexOf(this.className) >= 0) {
                            var a = this.getAttribute("style"), n = this.className, s = i.indexOf(n), r = i.indexOf("{", s) + 1, l = i.indexOf("}", s);
                            r > 0 && !o(this).closest("#signContainer").length && this.setAttribute("style", i.slice(r, l) + ";" + a)
                        }
                    })
                }, 40)
            }

            function l(e) {
                c.markFont();
                try {
                    if (top.$B.isRealChrome())return !1;
                    e.returnValue = window.captureClipboard(), e.returnValue === !1 && top.$Event.stopEvent(e), setTimeout(function () {
                        c.resetTextSizeForIe()
                    }, 50)
                } catch (e) {
                    var t = p.getEditorContent() || "";
                    if (top.$B.isRealChrome())return top.$Event.stopEvent(e), !1;
                    setTimeout(function () {
                        var e = p.getEditorContent() || "";
                        t == e && $B.is.windows && "Win64" != window.navigator.platform && !p.isHtml5Paste && i.Plugin.ScreenControl.isScreenControlSetup(!0), c.resetTextSizeForIe(), p.isHtml5Paste = !1
                    }, 50)
                }
            }

            function d(e) {
                if (o.browser.safari)return void setTimeout(function () {
                    for (var e = c.editorDocument.images, t = 0; t < e.length; t++) {
                        var i = e[t];
                        -1 == i.src.indexOf("blob:") && -1 == i.src.indexOf("webkit-fake-url:") || (i.src = "/m2015/images/global/upload-avatar-160x114.png", top.M139.UI.TipMessage.show("当前浏览器不支持图片粘贴，请使用插入图片功能", {
                            className: "msgGreen",
                            delay: 5e3
                        }))
                    }
                }, 300);
                if (!e.originalEvent || !e.originalEvent.clipboardData || !e.originalEvent.clipboardData.items)return void(($B.is.ie11 || $B.is.ie) && setTimeout(function () {
                    top.$App.showImgEditor(o(c.editorDocument.body))
                }, 500));
                var t = e.originalEvent.clipboardData.items, a = e.originalEvent.clipboardData.getData("text/html");
                if (!(parseInt(top.$B.is.firefox && top.$B.getVersion()) > 48)) {
                    if (a)return void setTimeout(function () {
                        top.$App.showImgEditor(o(c.editorDocument.body))
                    }, 100);
                    if (t && t.length)for (var n = 0; n < t.length; n++)if ("file" == t[n].kind && -1 !== t[n].type.indexOf("image/")) {
                        p.isHtml5Paste = !0;
                        var s = t[n].getAsFile(), r = new FileReader;
                        r.readAsDataURL(s), r.onload = function () {
                            var e = {
                                composeId: upload_module.model.composeId,
                                filename: "ris" + Math.random() + ".jpg",
                                content: this.result.substring(22, this.result.length),
                                type: "internal"
                            };
                            i.RichMail.API.call("attach:uploadPicBase64", e, function (e) {
                                if (e && e.responseData && "S_OK" === e.responseData.code) {
                                    var t = e.responseData["var"], i = "/RmWeb/view.do?func=attach:getAttach&sid=" + upload_module.model.getSid() + "&fileId=" + t.fileId + "&fileName=" + encodeURIComponent(t.fileName);
                                    return void htmlEditorView.editorView.editor.insertImage(i)
                                }
                            })
                        }
                    }
                }
            }

            this.model = e.model, this.model.set("isFullScreen", !1);
            var c, p = this, u = {
                container: o("#htmlEdiorContainer"),
                blankUrl: "../html/editor_blank.htm?sid=" + top.sid,
                isShowSetDefaultFont: !0,
                uploadForm: {
                    getUploadUrl: function (e) {
                        var i = utool.getControlUploadUrl(!0);
                        setTimeout(function () {
                            t.isFunction(e) && e(i)
                        }, 0)
                    }, fieldName: "uploadInput", getResponseUrl: function (e) {
                        var t = utool.getControlUploadedAttachUrl(e);
                        return t
                    }
                }
            }, h = this.model.get("pageType");
            return o.inArray(h, ["reply", "forward", "replyAll"]) >= 0 && (u.showAdditional = !0), this.editorView = M2012.UI.HTMLEditor.create(u), c = this.editorView.editor, this.editorView.on("buttonclick", function (e) {
                switch (e.command) {
                    case"ScreenShot":
                        (upload_module_multiThread.isSupport() || i.Plugin.ScreenControl.isScreenControlSetup(!0)) && captureScreen != arguments.callee && captureScreen();
                        break;
                    case"Voice":
                        p.EditorVoiceInstance ? p.EditorVoiceInstance.render() : p.EditorVoiceInstance = VoiceInput.create({
                            autoCreate: !0,
                            button: o(e.target),
                            from: "editor",
                            onComplete: function (e) {
                                c.insertHTML(e), setTimeout(function () {
                                    c.editorWindow.focus()
                                }, 200)
                            }
                        });
                        break;
                    case"BeforehandSet":
                        top.BH("compose_click_presetIcon"), Package.require("compose_ext", function () {
                            p.presetList = new M2012.Compose.View.PresetTemplate({target: e.target}).on("select", function (e) {
                                c.insertHTML(e.content)
                            })
                        });
                        break;
                    case"WritePapers":
                        mainView.showPaperFrame()
                }
            }), this.editorView.on("needPayFace", function (e) {
                var t = e.folderName, i = {
                    hema: {
                        name: "小和玛主题包",
                        url: top.$App.getVipMailCenterUrl("html/detailsPage(hema-theme).html"),
                        bhArgs: {dialogBh: "face_hemaTheme_dialog", orderBh: "face_activeHemaTheme_click"}
                    }
                };
                p.showFaceDialog(i[t])
            }), c.on("before_send_mail", function (e) {
                o(c.editorDocument).find(".removeContent").remove();
                var t = o(c.editorDocument).find(".inserted_Mark"), i = o(c.editorDocument).find("[class='menuPop shadow popClose']");
                i.remove(), t.hide()
            }), c.on("focus", function (e) {
                setTimeout(function () {
                    p._getEditorBody().addClass(p.config["editor-body-selected"]), top.$App && top.$App.trigger("closePopupPaper"), o("#addMoreMenu").hide(), p.presetList && p.presetList.remove(), o("#mailInsertGuide").hide()
                }, 100), (o(e.target).closest("#signContainer").length || o(e.target).closest("#reply139content").length) && (p.isSignArea = !0)
            }), c.on("blur", function (e) {
                p._getEditorBody().removeClass(p.config["editor-body-selected"])
            }), c.on("keydown keyup", function (e) {
                p.initAtRemind(), n && n(), s && s()
            }), c.on("mousedown", function (e) {
                var t = e.target;
                if (!$B.is.ie || $B.getVersion() > 8) {
                    if ("IMG" == t.tagName) {
                        var i = c.editorDocument.createRange(), a = c.editorWindow.getSelection();
                        i.setStartBefore(t), i.setEndAfter(t), a.removeAllRanges(), a.addRange(i)
                    }
                } else p.ieBuck = null, "IMG" != t.tagName && "TABLE" != t.tagName || (p.ieBuck = o(t));
                2 == e.button ? p.isRight = !0 : p.isRight = !1
            }), c.on("mouseup", function (e) {
                var t = e.target;
                if ((!$B.is.ie || $B.getVersion() > 8) && "IMG" == t.tagName) {
                    var i = c.editorDocument.createRange(), o = c.editorWindow.getSelection();
                    i.selectNode(t), o.removeAllRanges(), o.addRange(i)
                }
            }), c.on("paste", function (e) {
                e.originalEvent.clipboardData && r(e), p.isRight && l(e), d(e)
            }), c.on("handlerReplyQuote", function (e) {
                top.BH("reply_with_quote_set");
                var t = e.isNeedShow, i = p.editorView.editor.jEditorDocument;
                i.find("#reply139content").find("div[id='mainReplyContent']")[t ? "show" : "hide"](), i.find("#replySplit")[t ? "show" : "hide"](), p.model.replyWithQuote = t ? 1 : 0
            }), c.jFrame.load(function () {
                "compose" == p.model.get("pageType")
            }), c.on("keypress", function (e) {
                e.shiftKey && 64 == (e.keyCode || e.which) && top.BH("compose_useAt")
            }), c.on("keydown", function (e) {
                if (top.SiteConfig.shortcutKeyConf || e.ctrlKey && e.keyCode == i.Event.KEYCODE.ENTER && o("#topSend").click(), e.ctrlKey && e.keyCode == i.Event.KEYCODE.V)l(e); else if (e.keyCode == i.Event.KEYCODE.BACKSPACE && p.ieBuck)return p.ieBuck.remove(), p.ieBuck = null, !1
            }), this.on("vCardHandlerEvent", function () {
                var e = c.editorDocument.body, t = 0, i = o(e).find("#openSign"), a = top.$App.getConfig("UserData") || {}, n = a.orderInfoList, s = "", r = [];
                for (var l in n) {
                    var s = n[l].serviceId;
                    r.push(s)
                }
                -1 == r.toString().indexOf("270") ? o(e).find("#dzmp_table").unbind("hover").find("#openSign").show().find("a").show().css("cursor", "pointer").html("<span style='color: #666;'>电子名片新出VIP模板啦，</span>快来体验>>") : o(e).find("#dzmp_table").unbind("mouseenter mouseleave").hover(function () {
                    var e = this;
                    t = setTimeout(function () {
                        var t = o(e).find("#openSign");
                        t.removeClass("v-hidden").find("a").show().css("cursor", "pointer").text("编辑")
                    }, 50)
                }, function () {
                    var e = this, i = o(e).find("#openSign");
                    clearTimeout(t), i.addClass("v-hidden").find("a").hide().css("cursor", "default").text("我也要制作一个")
                }), i.unbind("click").click(function () {
                    top.BH("compose_edit_vcardsign"), top.$App.showVcardEditView(function (e, t) {
                        var i = p._getVcardContent(e, t);
                        p.editorView.editor.setSign(i), signMenuView.refreshMenu && signMenuView.refreshMenu(t), p.trigger("vCardHandlerEvent")
                    })
                })
            }), a.prototype.initialize.apply(this, arguments)
        },
        editSurvey: function (e) {
            function t(e) {
                var t = top.$Msg.open({
                    dialogTitle: "创建问卷",
                    url: "/m2015/html/questionSurvey.html?surveyId=" + e,
                    width: 743,
                    height: 500
                });
                top.$App.off("closeSurveyWin").on("closeSurveyWin", function (e) {
                    t.off("close"), t.close()
                })
            }

            function i(e) {
                var t = top.$Msg.open({
                    dialogTitle: "发起投票",
                    url: "/m2015/html/vote/vote.html?surveyId=" + e,
                    width: 743,
                    height: 490
                });
                top.$App.off("closeVote").on("closeVote", function (e) {
                    t.off("close"), t.close()
                })
            }

            o(e).find("#questionnaire i.survey-close,#myVoting i.survey-close").on("click", function () {
                o(this).parent().remove()
            }), o(e).find("#questionnaire .vote-preview").on("click", function () {
                var t = o(e).find("#questionnaire").attr("class");
                top.$App.showUrl(location.protocol + "//" + location.host + "/m2015/html/questionnaire.html?surveyId=" + t + "&allowvote=0", "问卷预览")
            }), o(e).find("#myVoting .vote-preview").on("click", function () {
                var t = o(e).find("#myVoting").attr("class");
                top.$App.showUrl(location.protocol + "//" + location.host + "/m2015/html/vote/myvoting.html?surveyId=" + t + "&allowvote=0", "投票预览")
            }), o(e).find("#questionnaire .survey-edit,#myVoting .vote-edit").on("click", function (e) {
                var a = o(this).parents("#questionnaire").attr("class"), n = o(this).parents("#myVoting").attr("class"), s = o(this).parents("#myVoting").attr("count"), r = o(this).parents("#questionnaire").attr("answerCount");
                if (o(e.target).hasClass("survey-edit")) {
                    if (0 == r)return void t(a);
                    top.$Msg.confirm("编辑问卷将清空已收集的数据，是否继续？", function () {
                        t(a)
                    }, function () {
                    }, {buttons: ["确定", "取消"]})
                } else {
                    if (0 == s)return void i(n);
                    top.$Msg.confirm("编辑投票将清空已收集的数据，是否继续？", function () {
                        i(n)
                    }, function () {
                    }, {buttons: ["确定", "取消"]})
                }
            }), top.$App.off("saveSurvey").on("saveSurvey", function (e) {
                var t = htmlEditorView.editorView.editor;
                o(t.editorDocument).find("#questionnaire,#myVoting").remove(), e.content && t.insertHTML(e.content), htmlEditorView.editSurvey(t.editorDocument.body)
            }), top.$App.off("saveVoteSurvey").on("saveVoteSurvey", function (e) {
                var t = htmlEditorView.editorView.editor;
                o(t.editorDocument).find("#myVoting,#questionnaire").remove(), e.content && t.insertHTML(e.content), htmlEditorView.editSurvey(t.editorDocument.body)
            })
        },
        render: function (e, t) {
            function a(e, t) {
                if (o(s.editorDocument.body).click(function () {
                        o(".PlaceHolder").remove()
                    }), t.content || t.html || t.text) {
                    var a = t.content || t.html && t.html.content || t.text && t.text.content;
                    0 == Number(t.isHtml) && (a = top.$T.Utils.htmlEncode(a).replace(/\r?\n/g, "<br />")), "compose" != e && "draft" != e && "resend" != e && "rewrite" != e && "share" != e && -1 == e.indexOf("reply") || (a = a, setTimeout(function () {
                        $B.is.ie11 && s.editorWindow && s.editorWindow.focus()
                    }, 0)), "compose" == e || "draft" == e || "resend" == e || "rewrite" == e || "share" == e ? (n.setEditorContent(a), "draft" == e && s.handlerReplyQuote()) : (n.model.get("content") && s.jEditorDocument.find("body").prepend(n.model.get("content")), s.addReplyContent(a, {replaceOldContent: n.model.get("replaceOldContent")}))
                } else {
                    var a = top.$App.getSessionDataContent();
                    n.setEditorContent(a)
                }
                if (t.letterPaperId) {
                    mainView.showPaperFrame();
                    var r = "$('#frmLetterPaper')[0].contentWindow && $('#frmLetterPaper')[0].contentWindow.letterPaperView";
                    i.Timing.waitForReady(r, function () {
                        o("#frmLetterPaper")[0].contentWindow.letterPaperView.setPaper("", null, t.letterPaperId)
                    })
                }
                t.template && !function (e, t) {
                    var o = top.getRootPath() + "/js/compose/template/" + e + ".js";
                    i.core.utilCreateScriptTag({id: e, src: o, charset: "utf-8"}, function () {
                        var e = top.$App.composeTemplate;
                        t = $T.format(e, {content: t || ""}), n.setEditorContent(t)
                    })
                }(t.template, t.content), i.Timing.waitForReady('top.$App.getConfig("SignList") && top.$User.getUserConfig()', function () {
                    n._loadSign(e)
                }), "uploadLargeAttach" == e && o("#aLargeAttach").click(), e == n.model.pageTypes.VCARD || e == n.model.pageTypes.CUSTOM || n.model.get("unUseDefaultFont") || s.setDefaultFont(top.$User.getDefaultFont({isCompose: !0})), e == n.model.pageTypes.DRAFT && n.initAtRemind(), setTimeout(function () {
                    n.model.autoSaveTimer.subMailInfo.content = n.getEditorContent(!0), n.model.autoSaveTimer.subMailInfo.composeAttachs = n.model.composeAttachs.length
                }, 30), n.model.defaultContent = n.getEditorContent();
                var l = s.editorDocument.body;
                l.addEventListener && (l.addEventListener("dragenter", _dragenter, !1), l.addEventListener("dragover", _dragover, !1), l.addEventListener("drop", _drop, !1)), "compose" != e && top.$App.showImgEditor(o(l)), $B.is.ie && $B.getVersion() <= 8 && (o(l).css("overflow-y", "auto"), o("html", s.editorDocument).css("overflow-y", "auto")), t.showOneRcpt && (o("#aAllToOne").trigger("click"), o("#insertUserList em", s.editorDocument).css("text-overflow", "ellipsis"));
                var d = t.headers && t.headers["X-RM-MeetingInfo"];
                if (d && o("#activityInvite").trigger("click", {inviteData: "default" == d ? null : d}), n.model.get("isInsertAttach")) {
                    top.BH("success_compose");
                    var c = n.model.get("fileMess"), p = c.fileId, u = c.filename, h = c.fileSize, m = c.showType, f = /(?:\.jpg|\.gif|\.png|\.ico|\.jfif|\.bmp|\.jpeg|\.jpe)$/i.test(u);
                    if (f) {
                        var g = c.imgurl;
                        return void htmlEditorView.editorView.editor.insertImage(g)
                    }
                    p = p.indexOf("_") > -1 ? p.split("_")[0] : p, upload_module.insertRichMediaFile(p, u, h, m)
                }
                -1 != e.indexOf("reply") && o(l).find("[id='attachAndDisk']").remove();
                var v = ["forward", "resend", "draft"];
                if (-1 != o.inArray(e, v)) {
                    var y = "", w = [], b = !1, x = o(l).find("[id='attachAndDisk']");
                    if (!x.length)return void upload_module.detactAttachPlayerMark(s);
                    x.find("tbody table[id]").each(function () {
                        var e = o(this).attr("id");
                        if ("attachItem" == e) {
                            if ("none" != o(this).css("display")) {
                                var t = o(this).find("a[href]").attr("href");
                                y = top.$Url.queryString("sendid", t), b = !0
                            }
                        } else o(this).find("span.dataString").each(function () {
                            var e = o.parseJSON(o(this).text());
                            e.fileName = $T.Html.encode(e.fileName), e.filePath && (e.filePath = $T.Html.encode(e.filePath)), w.push(o.extend(e, {
                                hidePreview: !0,
                                notNeedLink: !0,
                                fileType: "netDisk"
                            }))
                        })
                    }), b ? n.model.getLargeFileByGroupId(y, function (e) {
                        e.length && setNetLink(e), w.length && setNetLink(w), x.remove()
                    }, function () {
                        w.length && setNetLink(w), x.remove()
                    }) : (w.length && setNetLink(w), x.remove()), upload_module.detactAttachPlayerMark(s)
                }
                n.model.get("isAutoSendEmail") ? mainView.sendMail() : null, n.editSurvey(l)
            }

            var n = this, s = n.editorView.editor, r = 0;
            s.frame.tabIndex = 5, o(window).resize(function () {
                n.model.get("isFullScreen") || (clearTimeout(r), r = setTimeout(function () {
                    n._initEditorHeight(), n._initRightContactHeight(), n._initMainContainerHeight(), o("#divLetterPaper").is(":visible") && mainView.showPaperFrame()
                }, 50))
            });
            var l = o(top).height() - o("#header", top.document).height() - o("#divTab", top.document).height() - o("#top", top.document).height() - 5;
            n.model.set("tmpFrameHeight", l), n._initEditorHeight(), n._initRightContactHeight(), n._initMainContainerHeight(), s.isReady ? a(e, t) : s.on("ready", function (i) {
                a(e, t)
            }), n.editorView.on("listenShowMore", function (e) {
                var t = n.model.get("defaultEditorBodyHeight"), i = e ? t + 33 : t - 33;
                n.model.set("defaultEditorBodyHeight", i), n.model.get("isFullScreen") && $B.getVersion() <= 7 && n._getEditorBody().css("width", o(top.document).width() - 20)
            }), n.editorView.on("fullScreenOperate", function (e) {
                function t() {
                    o("#sub", top.document).hide(), o("#divTab", top.document).hide(), o("#header", top.document).hide(), o("#top", top.document).hide(), o("#main", top.document).removeClass("main").addClass("main_write"), o("#contactsListArea").hide(), p.hide(), s.length && s.attr("id") && -1 != s.attr("id").indexOf("compose") && (n.model.set("defaultComposeHeight", o(s).height() || 521), n.model.set("defaultMainContainerHeight", o("#mainContainer").height()), s.height(o(top).height())), d.parent("").removeClass("p_absolute"), d.removeClass("bgPadding").css({
                        height: "100%",
                        overflowY: ""
                    }), d.attr("style", "padding: 0px 10px 0px 2px !important"), c.css("margin-right", "0"), n._getEditorBody().height(s.height() - l.height() - 10), n.editorView.isHideBtn(!1), r.css({
                        position: "absolute",
                        top: 0,
                        zIndex: 9999,
                        width: "100%"
                    })
                }

                function i() {
                    o("#top", top.document).show();
                    var e = top.$App.isNewWinCompose();
                    e || (o("#sub", top.document).show(), o("#divTab", top.document).show(), o("#header", top.document).show(), o("#main", top.document).removeClass("main_write").addClass("main")), o("#contactsListArea").show(), p.show(), r.css({
                        position: "",
                        top: 0,
                        zIndex: 0,
                        width: "100%"
                    }), d.parent("").addClass("p_absolute"), d.addClass("bgPadding"), d.attr("style", "padding: 0px 10px !important;overflow-x:hidden;overflow-y:auto;height: " + n.model.get("defaultMainContainerHeight") + "px;"), c.css("margin-right", "200px"), s.length && -1 != s.attr("id").indexOf("compose") && s.height(n.model.get("defaultComposeHeight")), n._getEditorBody().height(n.model.get("defaultEditorBodyHeight")), setTimeout(function () {
                        n.model.set("isFullScreen", !1)
                    }, 50), n.editorView.isHideBtn(!0)
                }

                var a = this.$el, s = o("#div_main", top.document).find("iframe:visible"), r = a.closest("#htmlEdiorContainer"), l = a.find(".eidt-bar"), d = o("#mainContainer"), c = o("#outerContainer"), p = o("#toolBar");
                o(e).hasClass("reduce") ? (n.model.set("isFullScreen", !0), o(e).removeClass("reduce").addClass("amplify").attr("title", "取消全屏"), n.model.set("defaultEditorBodyHeight", n._getEditorBody().height()), t()) : (o(e).removeClass("amplify").addClass("reduce").attr("title", "全屏写信"), i()), top.$App.off("cancelFullScreen").on("cancelFullScreen", function () {
                    i()
                })
            })
        },
        _isShowAtPlaceHolder: function () {
            return !1
        },
        _getEditorBody: function () {
            return this.divEdBody || (this.divEdBody = o("#htmlEdiorContainer div.eidt-body")), this.divEdBody
        },
        _initMainContainerHeight: function () {
            var e = this, t = o("#mainContainer"), i = $B.is.ie ? 0 : 3;
            t.css({
                height: parseInt(window.frameElement.style.height || e.model.get("tmpFrameHeight")) - t.offset().top + i - 40,
                overflowY: "auto"
            })
        },
        _initEditorHeight: function () {
            var e = this, t = window.frameElement, i = $B.is.ie ? 2 : 0, o = 75 + i + 2, a = this._getEditorBody(), n = parseInt(t.style.height || e.model.get("tmpFrameHeight")) - a.offset().top - o;
            n < e.model.editorMinHeight && (n = e.model.editorMinHeight), a.height(n), e.model.set("defaultEditorBodyHeight", n)
        },
        _initRightContactHeight: function () {
            var e = this, t = o("#divAddressList"), i = window.frameElement, a = parseInt(i.style.height || e.model.get("tmpFrameHeight")), n = t.find(".GroupList");
            n.height("100%"), t.find(".searchEnd").height("100%");
            var s = o("#tabMainAddressList");
            s.height(a - 44)
        },
        _loadSign: function (e) {
            var t = this, i = "|compose|uploadLargeAttach|reply|replyAll|forward|forwardAsAttach|forwardAttachs|share|forwardMore";
            i.indexOf("|" + e + "|") >= 0 && t._setDefaultSign()
        },
        _setDefaultSign: function () {
            var e = this, o = top.$App.getSignList(), a = !1, n = !1, s = null;
            o.length || (o = top.$App.getConfig("configSignList") || [], t.map(o, function (e) {
                e.other = "_custom_manual_set|1"
            }), i.Logger.sendClientLog({
                level: "ERROR",
                name: "getSignatures response exception!!",
                errorMsg: "signList: " + o.length
            }));
            var r = top.$App.getConfig("NewUserInfo") ? top.$App.getConfig("NewUserInfo").AddrFirstName : "";
            if (!o.length && r) {
                var l = [{content: "background-color:#fafafa", title: "我的电子名片", type: 1, isAutoDate: 0, isDefault: 1}];
                return void e.createVcardSign(l[0])
            }
            for (var d = 0, c = o.length; c > d; d++) {
                var p = o[d];
                if (p.isDefault) {
                    1 == p.type ? e.createVcardSign(p) : e.editorView.editor.setSign(i.Text.Html.decode(p.content)), a = !0;
                    break
                }
                1 == p.type && (n = !0, s = d), d != o.length - 1 || a || e.editorView.editor.setSign("")
            }
            if (!a) {
                var u = function () {
                    for (var e = 0, t = o.length; t > e; e++)if (o[e].other.indexOf("_custom_manual_set|1") > -1)return !0
                };
                if (u() || !r)e.editorView.editor.setSign(""); else if (n)e.createVcardSign(o[s]); else {
                    var l = [{
                        content: "background-color:#fafafa",
                        title: "我的电子名片",
                        type: 1,
                        isAutoDate: 0,
                        isDefault: 1
                    }];
                    e.createVcardSign(l[0])
                }
            }
        },
        showFaceDialog: function (e) {
            var t = ['<div class="norTips">', '<dl class="norTipsContent">', '<dd class="norTipsLine MB_MessageBox_Content">该表情为<span style="color:red">' + e.name + "</span>专属特权，建议您订购后使用。</dd>", "</dl>", "</div>"].join("");
            e.bhArgs = e.bhArgs || {}, e.bhArgs.dialogBh ? top.BH(e.bhArgs.dialogBh) : "", top.$Msg.showHTML(t, function () {
                e.bhArgs.orderBh ? top.BH(e.bhArgs.orderBh) : "";
                var t = e.url;
                window.open(t, "_blank")
            }, function () {
            }, {isHtml: !0, name: "skin_tip", buttons: ["前往订购", "取消"], title: ""})
        },
        tranContent: function (e) {
            var t = "";
            try {
                t = o.parseJSON(e)
            } catch (i) {
                t = e
            }
            return t
        },
        getVcardInfo: function (e) {
            var i = "#fafafa", o = this.tranContent($T.Html.decode(e.content));
            if (t.isObject(o)) {
                o.bgColor = o.bgColor || i;
                var a = /^http(?:s)?:\/\/[^\/]+/;
                return -1 != o.bgColor.indexOf("m2015/images/imgsrc") ? o.bgColor = "url(" + o.bgColor.replace(a, function () {
                        return top.location.protocol + "//appmail.mail.10086.cn"
                    }) + ")" : -1 != o.bgColor.indexOf("Upload/Photo/Sign") && (o.bgColor = "url(" + o.bgColor.replace(a, function () {
                        return top.getDomain("resource")
                    }) + ")"), {bgColor: o.bgColor, action: isNaN(o.action) ? o.action || "" : ""}
            }
            var n = /background-color:.+/i, s = e.content.split("|")[0].match(n);
            return s && s.length > 0 && (i = s[0].replace("background-color:", "")), {
                bgColor: -1 != i.indexOf("http") ? "url(" + i + ")" : i,
                action: ""
            }
        },
        getVcardBgImage: function (e) {
            return e.content.split("|")[1] || ""
        },
        getVcardBgLink: function (e) {
            return e.content.split("|")[2] || ""
        },
        getVcardType: function (e) {
            return -1 != e.indexOf("m2015/images/imgsrc") ? "background" : -1 != e.indexOf("Upload/Photo/Sign") ? "custom" : "pure"
        },
        createVcardSign: function (e) {
            var t = this;
            M2012.Contacts.getModel().getUserInfo({}, function (i) {
                var o = {};
                if ("S_OK" !== i.code)return console.warn && console.warn("M2012.Contacts.getModel().getUserInfo 获取用户信息失败！result.code:" + i.code), void top.M139.UI.TipMessage.hide();
                o = i["var"];
                var a = t._getVcardContent(o, e);
                t.editorView.editor.setSign(a), t.model.autoSaveTimer.subMailInfo.content = t.getEditorContent(), t.model.defaultContent = t.getEditorContent(), $B.is.ie && $B.getVersion() < 9 || t.trigger("vCardHandlerEvent", {})
            })
        },
        buildPersonInfo: function (e) {
            var t = ["<p style=\"text-align:left;margin: 0;padding: 0;line-height:18px;padding-top: 18px;padding-bottom: 5px;width:365px;font-family: 'Microsoft Yahei',verdana,'Simun';\">", '<span style="font-size: 16px;padding-right: 23px;display: inline-block;line-height: 18px;">{userName}</span>', '<span style="font-size: 12px;">{userJob}</span>', "</p>"].join(""), i = ['<p class="otherInfo" style="text-align:left;margin: 1px;padding: 0;line-height:22px;width:365px;overflow:hidden;">', '<i style="background:url(', top.location.protocol + "//appmail.mail.10086.cn/m2015/images/imgsrc/vcard.png", ') no-repeat 0 0;background-position: {position};display:inline-block;float:left;margin-right: 11px;width:15px;height:18px;"></i>', "<span style=\"font-size:12px;margin: 0;padding: 0;line-height:18px;width:91%;display: block;float:left;font-family: 'Microsoft Yahei',verdana,'Simun';\">{value}<i class=\"{cls}\"></i></span>", "</p>"].join(""), o = {
                company: "0 -2px",
                address: "-15px -2px",
                email: "-30px 0",
                phone: "-45px -2px",
                favoWord: "-60px -3px"
            }, a = [];
            a.push($T.format(t, {userName: e.userName, userJob: e.userJob}));
            var n = !1;
            for (var s in o) {
                var r = "";
                e[s] && ("email" == s && top.$Email.isPrettyNumberEmail(e[s]) && (r = "ml_5 icons i-m-pretty", n = !0), a.push($T.format(i, {
                    position: o[s],
                    value: e[s],
                    cls: r
                })))
            }
            var l = a.join("");
            return n && (l = l.replace('<i class="ml_5 icons i-m-pretty"></i>', '<img src="http://appmail.mail.10086.cn/m2015/images/imgsrc/vcard/pretty-num.png" alt="" style="margin:3px 0 0 5px;">')), l
        },
        _getVcardContent: function (e, t) {
            function a() {
                var t = "";
                t = -1 != location.host.indexOf("10086ts.cn") ? location.host : top.$User.isGrayUser() ? "smsrebuild0.mail.10086.cn" : "smsrebuild1.mail.10086.cn";
                var i = top.getProtocol() + t + "/addr_p3_gw/qrcode/ContactsServlet?type=3";
                for (var o in r) {
                    var a = e[o];
                    if (a) {
                        if ("UserJob" == o) {
                            var n = e.CPName, s = ["_", "_", a], l = n ? [n].concat(s) : s;
                            a = l.join("")
                        }
                        "HomeAddress" == o && (a = ["_", "_", "_", "_", a].join("")), i += -1 == i.indexOf("?") ? "?" : "&", i += encodeURIComponent(r[o]) + "=" + encodeURIComponent(a)
                    }
                }
                return i
            }

            var n = this, s = i.Text.Html.encode, r = {
                AddrFirstName: "name",
                UserJob: "position",
                MobilePhone: "mobile",
                FamilyEmail: "email"
            }, l = {
                company: s(e.CPName) || "",
                address: s(e.HomeAddress) || "",
                phone: s(e.MobilePhone) || "",
                email: s(e.FamilyEmail) || "",
                favoWord: e.FavoWord && s(e.FavoWord.replace(/&nbsp;/gi, " ")),
                userName: e.AddrFirstName && s(e.AddrFirstName),
                userJob: e.UserJob && s(e.UserJob),
                date: $Date.format("yyyy-MM-dd 星期w", top.M139.Date.getServerTime()),
                headImg: n._getContactImage(e.ImageUrl) || "",
                bgcolor: n.getVcardInfo(t).bgColor || "",
                action: n.getVcardInfo(t).action || ""
            }, d = "631", c = "168", p = "18px 27px 0 26px", u = "contain", h = n.getVcardType(l.bgcolor);
            -1 != o.inArray(h, ["background", "pure"]) && (p = "18px 10px 0 10px", u = "initial", d = "480", l.bgcolor = l.bgcolor.replace(".png", "_mini.png").replace(".jpg", "_mini.jpg"));
            var m = ['<tr><td id="dzmp_table" style="width:' + d + "px;font-family:'Microsoft Yahei',verdana,'Simun';\">"];
            -1 != l.bgcolor.indexOf("http") ? m.push('<div style="background-image:' + l.bgcolor + ";position:relative;height:" + c + "px;width:" + d + "px;max-width:" + d + "px;clear:both;background-size:" + u + ';background-repeat:no-repeat;">') : m.push('<div style="background:' + l.bgcolor + " no-repeat;position:relative;height:" + c + "px;width:" + d + "px;max-width:" + d + 'px;clear:both;">'), m.push('<div style="position:relative;width:' + d + "px;max-width: " + d + 'px;">'), m.push('<div style="padding:' + p + ';float:left">'), m.push('<img name="hideEditorBar" class="avatar-ry avatar-image" src="' + l.headImg + '" style="border-radius:50%;width:80px;height:80px;" onerror="this.onerror=null;this.src=\'../../images/global/face.png\';">'), m.push("</div>"), m.push('<div class="addrClass" style="float: left;color:#666;font-size: 12px;width:320px;">'), m.push(n.buildPersonInfo(l));
            for (var f = [{key: e.MotiSentence, value: e.MotiSentence}, {
                key: t.isAutoDate,
                value: l.date
            }], g = 0; g < f.length; g++)f[g].key && (m.push('<p style="margin: 1px;padding: 0;line-height:22px;width:365px;">'), m.push("<span style=\"margin: 0;padding: 0;line-height:22px;width:98%;display: block;float:left;font-size:12px;font-family: 'Microsoft Yahei',verdana,'Simun'\">"), m.push($T.Html.encode(f[g].value)), m.push("</span>"), m.push("</p>"));
            return m.push("</div>"), l.action, m.push('<div style="clear:both"></div>'), m.push("</div>"), m.push("</div>"), m.push('<div contenteditable="false" class="v-hidden" style="margin:0;padding: 0;height:24px;line-height: 24px;" id="openSign">'), m.push('<a href="javascript:;" style="display:none;float:right;font-size: 12px;color:#1a8ad8;text-decoration: none;">我也要制作一个</a>'), m.push("</div>"), m.push("</div>"), m.push("</td>"), m.push('<td id="signInfoCode" style="width:auto;display:block;padding:0px 8px 8px 8px;vertical-align: top;">'), m.push('<div style="vertical-align:top;">'), m.push('<img rel="signImg_qcode" name="hideEditorBar" src="' + a()), m.push('" alt="扫描二维码添加名片到手机"></div>'), m.push('<div style="margin-top:5px;margin-bottom:5px;">'), m.push('<p style="width:146px;font-size:12px;color:#444;text-align:center;line-height: 1.4;margin:0;">扫一扫,</p>'), m.push('<p style="width:146px;font-size:12px;color:#444;text-align:center;line-height: 1.4;margin:0;">快速添加名片到手机</p>'), m.push("</div></td>"), m.push("</tr>"), m.join("")
        },
        _getContactImage: function (e) {
            var t, i, o = this.model.sysImgPath;
            return i = top.getRootPath() + "/images/global/face.png", e && (t = e.toLowerCase(), t != o[0] && t != o[1] && (i = /^https?:\/\//.test(t) ? $T.Html.encode(e) : top.getDomain("resource") + $T.Html.encode(e))), i
        },
        getEditorContent: function (e) {
            return this.editorView.editor.isHtml ? this.editorView.editor.getHtmlContent(e) : this.editorView.editor.getTextContent()
        },
        getTextContent: function () {
            return this.editorView.editor.isHtml ? this.editorView.editor.getHtmlToTextContent() : this.editorView.editor.getTextContent()
        },
        setEditorContent: function (e) {
            return this.editorView.editor.isHtml ? this.editorView.editor.setHtmlContent(e) : this.editorView.editor.setTextContent(e)
        },
        checkContent: function (e) {
            if (!e || e.isTimeSendOperate)return !0;
            var t = this, a = !1, n = 0 == uploadManager.fileList.length && 0 == Arr_DiskAttach.length;
            if (n) {
                var s = t.getEditorContent() || "";
                s = s.split("replySplit")[0];
                var r = t.model.autoSaveTimer.subMailInfo.subject, l = o("#txtSubject").val();
                if (s.indexOf("附件") >= 0 || r != l && l.indexOf("附件") >= 0) {
                    i.UI.Popup.currentPopup && i.UI.Popup.currentPopup.close();
                    var d = subjectView.getPopupTarget(e), c = i.UI.Popup.create({
                        target: d,
                        icon: "i_ok",
                        width: 300,
                        height: 45,
                        showArrow: !0,
                        buttons: [{
                            text: "确定", cssClass: "btnSure icoG icoG-s", click: function () {
                                mainView.sendMail(), c.close()
                            }
                        }, {
                            text: "取消", cssClass: "btnNormal icoTb icoTb-s", click: function () {
                                c.close()
                            }
                        }],
                        content: t.model.tipWords.LACK_ATTACHMENTS
                    });
                    c.render()
                } else a = !0
            } else a = !0;
            return a
        },
        containRemindKey: function () {
            for (var e = this, t = ["作业", "数学", "物理", "语文", "英语", "地理", "政治", "化学", "复习", "期中", "期末", "考试"], i = e.getEditorContent() || "", a = e.model.autoSaveTimer.subMailInfo.subject, n = o("#txtSubject").val(), s = !1, r = 0; r < t.length; r++)if (i.indexOf(t[r]) >= 0 || a != n && n.indexOf(t[r]) >= 0) {
                s = !0;
                break
            }
            return s
        },
        initAtRemind: function () {
            var e = this;
            o(e.editorView.editor.editorDocument).find("span").removeClass("atwho-query"), !e.atHasLoaded && (o.browser.mozilla || o.browser.webkit || $B.is.ie && $B.getVersion() > 8) && i.core.utilCreateScriptTag({
                id: "composeAtEditor",
                src: "/m2015/js/packs/m2012.compose.atremind.pack.js",
                charset: "utf-8"
            }, function () {
                e.atHasLoaded = !0;
                var t = e.editorView.editor.jFrame[0];
                new M2012.Compose.View.AtRemind({currWin: window, container: t, isIgnore: e.isSignArea})
            })
        },
        containAtRemind: function () {
            var e = this, t = o(e.editorView.editor.editorDocument).find("span[id^='atInserted-']"), i = [], a = "ateverybody@" + top.mailDomain;
            return o.each(t, function (e, t) {
                if (!o(this).closest("#reply139content").length) {
                    var a = o(t).find("input[name='address']").val();
                    a && -1 == o.inArray(a, i) && i.push(a)
                }
            }), -1 != o.inArray(a, i) && (i = e.model.addrInputManager.getAllEmails()), t.find(".atEditName").text(""), t.find(".remindName").css({cursor: "default"}), t.find("#kalendarhIcon").hide(), i.join(",")
        },
        getAtRemindData: function () {
            var e = this, i = {}, o = !t.isUndefined(M2012.Compose.Model.AtRemind) && new M2012.Compose.Model.AtRemind;
            return e.containAtRemind() && o && (i = o.atRemindData), i
        },
        setRemindData: function (e) {
            try {
                var t = this;
                t.containAtRemind() && ((new M2012.Compose.Model.AtRemind).atRemindData = e)
            } catch (i) {
            }
        },
        removeReplyQuote: function () {
            var e = this.editorView.editor.jEditorDocument;
            e.find("#reply139content").remove(), e.find("#replySplit").remove()
        },
        removeAttachQuoteBar: function () {
            var e = this.editorView.editor.jEditorDocument;
            e.find("a[data-cmd='showQuote']").remove(), e.find("a[data-cmd='clearQuote']").remove()
        },
        captureScreen: function () {
            (upload_module_multiThread.isSupport() || i.Plugin.ScreenControl.isScreenControlSetup(!0)) && captureScreen != arguments.callee && captureScreen()
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.Timing", a.extend({
        el: "body",
        template: ["", , '<div class="pl_20 pt_10">', '<p class="pl_20 pb_10">请选择定时发送的时间：</p>', '<div class="pl_20 clearfix">', '<div class="dropDown dropDown-ydm" id="txtCalendar">', '<div class="dropDownText fl">2013-07-24</div>', '<a hidefocus="1" href="javascript:void(0)" class="i_ymd fl"></a>', "</div>", '<div class="dropDown dropDown-month" id="hourMenu">', '<div class="dropDownA" href="javascript:void(0)"><i class="i_triangle_d"></i></div>', '<div class="dropDownText" id="hourText">09</div>', "</div>", '<div class="ydmtext">时</div>', '<div class="dropDown dropDown-month" id="miniuteMenu">', '<div class="dropDownA" href="javascript:void(0)"><i class="i_triangle_d"></i></div>', '<div class="dropDownText" id="miniuteText">56</div>', "</div>", '<div class="ydmtext">分</div>', "</div>", '<p class="pl_20 pb_10 mt_10">本邮件将在 <strong class="c_ff6600"><span id="dateTip">2013-07-24</span><span id="timeTip"> 13:40</span></strong> 发送</p>', "</div>"].join(""),
        name: "timing",
        initialize: function (e) {
            return this.model = e.model, this.initEvents(), this.isScheduleDate = !1, this.targetEle = o("#topTiming")[0], a.prototype.initialize.apply(this, arguments)
        },
        createCalander: function () {
            var e = this, t = this.calendarPicker = top.M2012.UI.Picker.Calendar.create({
                bindInput: e.$el.find("#txtCalendar")[0],
                value: new Date,
                stopPassDate: !0
            }), i = e.$el.find("#txtCalendar > div:eq(0)");
            t.on("select", function (t) {
                var o = t.value.format("yyyy-MM-dd");
                i.html(o), e.$el.find("#dateTip").html(o + " ")
            })
        },
        createTimer: function () {
            var e = this, t = e._getMenuItems(0, 23, "hourText"), i = (top.M2012.UI.PopMenu.createWhenClick({
                target: e.$el.find("#hourMenu")[0],
                width: 70,
                maxHeight: 170,
                items: t,
                top: "200px",
                left: "200px",
                onItemClick: function (t) {
                    var i = e.$el.find("#hourText").html() + ":" + e.$el.find("#miniuteText").html();
                    e.$el.find("#timeTip").html(i)
                }
            }), e._getMenuItems(0, 59, "miniuteText"));
            top.M2012.UI.PopMenu.createWhenClick({
                target: e.$el.find("#miniuteMenu")[0],
                width: 70,
                maxHeight: 170,
                items: i,
                top: "200px",
                left: "200px",
                onItemClick: function (t) {
                    var i = e.$el.find("#hourText").html() + ":" + e.$el.find("#miniuteText").html();
                    e.$el.find("#timeTip").html(i)
                }
            })
        },
        initializeDate: function (e) {
            function t() {
                var e = new Date;
                return new Date(e.getTime() + 3e5)
            }

            function i(e) {
                return e >= 10 ? e : "0" + e
            }

            var o = this, a = e || t(), e = $Date.format("yyyy-MM-dd", a), n = i(a.getHours()) + ":" + i(a.getMinutes());
            o.$el.find("#txtCalendar > div:eq(0)").html(e), o.$el.find("#hourText").html(i(a.getHours())), o.$el.find("#miniuteText").html(i(a.getMinutes())), o.$el.find("#dateTip").html(e + " "), o.$el.find("#timeTip").html(n)
        },
        initEvents: function () {
            var t = this;
            this.$el = e(this.template), o("#topTiming, #bottomTiming").bind("click", function (e) {
                top.$App.isNewWinCompose() && BH({key: "newwin_compose_send_toptiming"}), t.createInstance()
            })
        },
        createInstance: function (e) {
            this.show(), this.createTimer(), this.initializeDate(e), this.createCalander(), this.isScheduleDate = !0, this.targetEle = this
        },
        render: function (e, t) {
            if (("draft" == e || t.isShowTimeSet) && t.scheduleDate) {
                var i = new Date(1e3 * t.scheduleDate);
                "string" == typeof t.scheduleDate && (i = $Date.parse(t.scheduleDate)), this.isScheduleDate = !0, this.createInstance(i)
            }
        },
        showSchedule: function () {
            var e = this, t = top.$Msg.showHTML(e.template, function (e) {
                BH({key: "compose_send_toptiming"}), e.isTimeSendOperate = !0, mainView.toSendMail(e)
            }, function () {
                e.isScheduleDate = !1
            }, {dialogTitle: "定时发送", buttons: ["定时发送", "取消"]});
            e.setElement(t.el)
        },
        show: function () {
            var e = this;
            e.showSchedule()
        },
        getScheduleDate: function () {
            var e = this._getDefiniteTime();
            return console.log("定时邮件时间为getScheduleDate:" + e), e = e ? parseInt(e.getTime() / 1e3) : 0
        },
        _getDefiniteTime: function () {
            if (this.isScheduleDate) {
                var e = this.$el.find("#txtCalendar > div:eq(0)").html(), t = this.$el.find("#hourText").html() + ":" + this.$el.find("#miniuteText").html();
                return console.log(e + " " + t + ":00"), $Date.parse(e + " " + t + ":00")
            }
            return 0
        },
        _getMenuItems: function (e, t, i) {
            for (var o = this, a = [], n = e; t >= n; n++) {
                var s = "";
                s = 10 > n ? "0" + n : n + "";
                var r = {
                    text: s, onClick: function () {
                        o.$el.find("#" + i).html(this.text), o.targetText = this.text
                    }
                };
                a.push(r)
            }
            return a
        },
        checkTiming: function (e) {
            var t = this, a = !0, n = this.model.get("initDataSet");
            if (n.scheduleDate) {
                var s = new Date(1e3 * n.scheduleDate), r = new Date, l = s - r > 0;
                if (l) {
                    a = !1;
                    var d = t.model.tipWords.SCHEDULE_MAIL, c = $Date.format("yyyy年MM月dd日 hh点mm分", s);
                    d = $T.Utils.format(d, [c]);
                    var p = i.UI.Popup.create({
                        target: o(e.target).parents("li")[0],
                        icon: "i_ok",
                        width: 300,
                        buttons: [{
                            text: "仍定时发送", click: function () {
                                t.isScheduleDate = !0, mainView.sendMail(), p.close()
                            }
                        }, {
                            text: "立即发送", click: function () {
                                t.isScheduleDate = !1, mainView.sendMail(), p.close()
                            }
                        }],
                        content: d
                    });
                    p.render()
                } else console.log("定时邮件设置的时间已过")
            }
            return a
        },
        isClickTimingBtn: function (e) {
            if (e) {
                var t = o(e.target), i = t.attr("id") || t.parent("a").attr("id");
                return !i
            }
        },
        addBehavior: function (e) {
            var t = e.attr("id");
            "topTiming" === t ? BH({key: "compose_send_toptiming"}) : "bottomTiming" === t ? BH({key: "compose_send_bottomtiming"}) : console.log("未知的属性ID：" + t)
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = i.View.ViewBase;
    i.namespace("M2012.Compose.Model.AddNewDoc", o.extend({
        el: "body",
        name: "newDocModel",
        callApi: i.RichMail.API.call,
        initialize: function (e) {
            return this.options = e || {}, o.prototype.initialize.apply(this, arguments)
        },
        getNewDocFromRm: function (e, t) {
            this.callApi("attach:listAttachments", e, function (e) {
                e.responseData && "S_OK" == e.responseData.code ? t(e.responseData["var"]) : top.M139.UI.TipMessage.show("网络异常，请稍后再试。", {
                    delay: 2e3,
                    className: "msgRed"
                })
            })
        },
        getNewDocFromDisk: function (e, t) {
            this.callApi("disk:getContentInfosByType", e, function (e) {
                e.responseData && "S_OK" == e.responseData.code ? t(e.responseData["var"]) : (top.M139.UI.TipMessage.show("网络异常，请稍后再试。", {
                    delay: 2e3,
                    className: "msgRed"
                }), t())
            })
        },
        funcObj: function () {
            return {
                getFileId: function () {
                    var e = this.data.id || this.data.selectId || "";
                    return e
                }, getIconType: function () {
                    var e = this.data.name || this.data.attachName, t = e.match(/\.[^\.]*/g);
                    return t ? "i-cm-" + this.acceptType[t[t.length - 1]] : ""
                }, getFileName: function () {
                    var e = this.data.attachName || this.data.name;
                    return $T.Html.encode(e)
                }, getFileSize: function (e) {
                    var t = this.data.attachRealSize || this.data.fileSize || 0;
                    return "number" == e ? t : top.$T.Utils.getFileSizeText(t)
                }, getDocFrom: function () {
                    var e = top.$Email.getEmail(this.data.from);
                    if ("disk" == this.data.comeFrom)return '<p class="tab-soon-one">彩云网盘</p>';
                    if (this.fileIsUser(e)) {
                        var t = this.getFileTo();
                        return '<p>我发给</p><span class="tab-soon-on">' + t + "</span>"
                    }
                    return '<p class="tab-soon-on">' + $T.Html.encode(top.$Email.getName(this.data.from)) + "</p><span>发给我</span>"
                }, getDate: function (e) {
                    var t = this.data.receiveDate || this.data.createTime;
                    if (t = "number" == typeof t ? top.$Date.format("yyyy-MM-dd hh:mm", new Date(1e3 * t)) : t.slice(0, -3), "date" == e) {
                        var i = (new Date, $Date.format("yyyy/MM/dd", new Date) + " 00:00:00"), o = t.replace(/-/g, "/"), a = new Date(i).getTime() - new Date(o).getTime();
                        return 0 >= a ? "今天" : 864e5 > a ? "昨天" : t.split(" ")[0]
                    }
                    return "time" == e ? t.split(" ")[1] : ""
                }
            }
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.AddNewDoc", a.extend({
        el: "body",
        name: "newDocView",
        events: {
            "click #selectDoc": "selectDoc",
            "click #fontSize": "showSizeMenu",
            "click #fontColor": "showColorMenu",
            "click #fontLineheight": "showLineheightMenu"
        },
        docListHead: ['<div class="calendar-mask-layer" style="z-index:5009;display:block;"></div>', '<div id="newDocContent" class="p_absolute boxIframe add-attachments-pop" style="{getPosition}z-index:5010;width:520px;display:block;">', '<div class="boxIframeTitle DL_TitleBar"><h2><span class="DL_DialogTitle">最近文件</span></h2><a class="i_t_close DL_CloseBut CloseButton closeNewDocContent" title="关闭" href="javascript:;"></a><a class="i_t_min DL_MiniSizeBut" title="最小化" style="display:none" href="javascript:;"></a><a class="i_t_zoomin DL_ZoomSizeBut" title="放大" style="display:none" href="javascript:;"></a></div>', '<div class="boxIframeMain" id="tipContent">', '<div class="boxIframeText MB_Content wTipCont">', '<div class="popups-inner">', '<div class="tab-box tab-write-box" style="height:318px;">', '<div class="tab-nav">', '<div class="tab-nav1">文件名</div>', '<div class="tab-nav2">来源</div>', '<div class="tab-nav3">时间</div>', "</div>", '<div class="tab-inner-soon">', '<ul id="selectDoc">'].join(""),
        docListTemplate: ['<li class="clearfix" fileid="@getFileId()" fileName="@getFileName()" fileSize="@getFileSize(number)">', '<div class="tab-soon-list1">', '<i class="fl i-chooseMo c-pointer selectDoc"></i>', "</div>", '<div class="tab-soon-list2 selectDoc">', '<i class="@getIconType() i-c-vat"></i>', "</div>", '<div class="tab-soon-list3 selectDoc">', "<p>@getFileName()</p>", "<sapn>@getFileSize()", "</sapn></div>", '<div class=""><div class="tab-soon-list4 showHover">', "@getDocFrom()", "</div>", '<div class="tab-soon-list5">', "<p>@getDate(date)</p><span>@getDate(time)</span>", "</div></div>", "</li>"].join(""),
        docListBottom: ["</ul>", "</div>", "</div>", "</div>", "</div>", "</div>", '<div id="newDocBottom" class="boxIframeBtn DL_ButtonBar boxIframeMain">', '<span class="bibText BottomTip" id="docCount"></span>', '<span class="bibBtn"><a id="configFile" class="icoG config closeNewDocContent ico_btn_code" href="javascript:void(0)"><span>确定</span></a><a class="icoTb cancel closeNewDocContent" href="javascript:void(0)"><span>取消</span></a></span>', "</div>", "</div>"].join(""),
        showTip: ['<div class="bubblePop" id="docTip" style="position:absolute;left:{left};top:{top};z-index:10001;display:block;">', '<div class="write_file_box">', "<ul>", '<li>主<em class="em_1"></em>题：{subject}</li>', '<li>时<em class="em_1"></em>间：{date}</li>', "</ul>", "</div>", '<div class="TriangleTop" style="right:20px;left:auto;"></div>', "</div>"].join(""),
        leadTipTemplte: ['<div class="writeGuide" id="newDocLead" style="top:0px;left:-1px;">', '<div class="writeGuideBox"></div>', '<div class="write_pic">', '<a href="" id="closeNewDoc" class="writeKnown"></a>', "</div>", "</div>"].join(""),
        initialize: function (e) {
            return this.model = new M2012.Compose.Model.AddNewDoc, this.newDocAry = [], this.composeModel = e && e.view.model, this.selectDocList = {docCount: 0}, this.requestCount = 0, this.limitTime = 2592e3, this.acceptType = {
                ".doc": "doc",
                ".docx": "docx",
                ".xls": "xls",
                ".xlsx": "xlsx",
                ".ppt": "ppt",
                ".pptx": "pptx",
                ".pdf": "pdf",
                ".txt": "txt"
            }, a.prototype.initialize.apply(this, arguments)
        },
        render: function () {
            this.loadCss(), this.getNewDoc(), this.getNewDocFromDisk()
        },
        getNewDoc: function () {
            var e = this, t = parseInt(top.M139.Date.getServerTime().getTime() / 1e3), i = {
                start: 1,
                total: 48,
                order: "receiveDate",
                desc: 1,
                stat: 1,
                isSearch: 1,
                filter: {recvTime: {startTime: t - this.limitTime, endTime: t}}
            };
            this.model.getNewDocFromRm(i, function (t) {
                if (t) {
                    e.requestCount++;
                    for (var i = {}, o = 0, a = t.length; a > o; o++) {
                        var n = t[o].attachName, s = t[o].mid, r = n.match(/\.[^\.]*/g), l = t[o].attachName + "_" + t[o].attachOffset + "_" + s;
                        r && e.acceptType[r[r.length - 1]] && !i[l] && (t[o].comeFrom = "attach", t[o].selectId = Math.random(), t[o].fileRealSize = t[o].attachRealSize, t[o].fileId = s, t[o].fileName = t[o].attachName, i[l] = !0, e.newDocAry.push(t[o]))
                    }
                    e.showDocList()
                }
            })
        },
        getNewDocFromDisk: function () {
            var e = this, t = {
                toPage: 1,
                pageSize: 50,
                sortDirection: 0,
                contentSortType: 4,
                isSumnum: 1,
                contentType: 4
            };
            this.model.getNewDocFromDisk(t, function (t) {
                if (t && t.files) {
                    for (var i = top.M139.Date.getServerTime().getTime(), a = 0, n = t.files.length; n > a; a++) {
                        var s = t.files[a].createTime.replace(/-/g, "/"), r = new Date(s).getTime(), l = t.files[a].name, d = l.match(/\.[^\.]*/g);
                        i - r < 1e3 * e.limitTime && d && e.acceptType[d[d.length - 1]] && (t.files[a].comeFrom = "disk", t.files[a].fileName = t.files[a].name, e.newDocAry.push(t.files[a]))
                    }
                    e.requestCount++, e.showDocList()
                } else o("#btn_newDoc").removeClass("load")
            })
        },
        showDocList: function () {
            if (!(this.requestCount < 2)) {
                if (0 == this.newDocAry.length)return top.BH("noNewDoc"), o("#btn_newDoc").removeClass("load"), void top.$Msg.showHTML('<div class="norTips"><p class="write_soon_text">您最近30天没有上传文件到网盘，也没有收到或发出以下类型附件：doc,docx,xls,xlsx,ppt,pptx,pdf,txt</p></div>', function () {
                }, function () {
                }, {buttons: ["我知道了"], dialogTitle: "最近文件", width: "402px"});
                for (var e = this.newDocAry.concat(), t = this.quickSort(e), a = /\@(\w+)\s?(\((.*?)\))?/gi, n = [], s = "", r = 0; r < t.length && 50 > r; r++) {
                    var l = this.replaceHtml(t[r], this.docListTemplate, a);
                    n.push(l)
                }
                var d = o(top).height() / 2 - 210 + "px;", c = o(top).width() / 2 - 250 + "px;", p = {getPosition: "top:" + d + "left:" + c};
                s = i.Text.Utils.format(this.docListHead, p) + n.join("") + this.docListBottom, this.showHtml(s)
            }
        },
        showHtml: function (e) {
            o(top.document.body).append(e), this.listContent = o("#newDocContent", top.document), this.newDocAry.length > 50 && this.listContent.find("#selectDoc").append('<li class="writeLi">最多显示50个文件</li>'), this.initEvent()
        },
        initEvent: function () {
            var e = this;
            top.$App.showOnce("showLeadNewDoc", function () {
                top.BH("showLeadNewDoc"), e.listContent.append(e.leadTipTemplte), e.bindEvent({
                    selector: "#closeNewDoc",
                    callback: e.closeNewDoc,
                    eventType: ["click"],
                    cancelBubble: !0
                })
            }), top.$D.setDragAble(top.document.getElementById("newDocContent"), {handleElement: ".DL_TitleBar"}), this.bindEvent({
                selector: ".selectDoc",
                callback: this.selectDoc,
                eventType: ["click"]
            }), this.bindEvent({
                selector: ".showHover",
                callback: this.showDetailTip,
                eventType: ["mouseleave", "mouseenter"]
            }), this.bindEvent({
                selector: ".closeNewDocContent",
                callback: this.closeNewDocContent,
                eventType: ["click"]
            })
        },
        closeNewDocContent: function (e) {
            var t = o(e.currentTarget);
            if (!t.hasClass("ico_btn_code")) {
                if (t.hasClass("config")) {
                    top.BH("configNewDoc");
                    var i = [];
                    for (var a in this.selectDocList)"docCount" != a && (top.BH("selectDocCount"), i.push(this.selectDocList[a]));
                    upload_module.model.filterExistAttach(i), top.$App.trigger("obtainSelectedNewFiles", this.splitFiles(i))
                } else top.BH("cancelNewDoc");
                o("#btn_newDoc").removeClass("load"), this.listContent.prev().remove(), this.listContent.remove()
            }
        },
        splitFiles: function (e) {
            for (var t = [], i = [], a = [], n = 0; n < e.length; n++) {
                var s = e[n];
                0 == n && a.push(s), "disk" == s.comeFrom ? t.push(s) : "attach" == s.comeFrom && i.push(s)
            }
            return i.length && (i = o.map(i, function (e) {
                return {
                    fileId: e.mid,
                    fileName: e.attachName,
                    state: "success",
                    fileRealSize: e.attachRealSize,
                    fileSize: e.attachSize,
                    comeFrom: "attach",
                    encoding: "1",
                    fileOffSet: e.attachOffset,
                    type: "attach"
                }
            })), {disk: t, attach: i, firstElement: a}
        },
        closeNewDoc: function () {
            this.listContent.find("#newDocLead").remove()
        },
        renameConfigFile: function (e) {
            for (var t, i, o, a = 0, n = e.length; n - 1 > a; a++)if ("attach" == e[a].comeFrom)for (t = 1, i = e[a].attachName || "", o = i.lastIndexOf("."), 0 > o && (o = i.length); n > a + t && i == e[a + t].attachName;)e[a + t].attachName = i.substr(0, o) + "(" + t + ")" + i.substr(o), t++
        },
        quickSort: function (e) {
            var t = e.length;
            if (1 > t)return e;
            for (var i = Math.floor(t / 2), o = e.splice(i, 1), a = [], n = [], s = this.getDocTime(o[0]), r = 0; r < e.length; r++) {
                var l = this.getDocTime(e[r]);
                l > s ? a.push(e[r]) : n.push(e[r])
            }
            return this.quickSort(a).concat(o, this.quickSort(n))
        },
        getDocTime: function (e) {
            var t, i = "";
            return e.receiveDate ? i = "receiveDate" : e.createTime && (i = "createTime"), t = "number" == typeof e[i] ? 1e3 * e[i] : Date.parse(e[i].replace(/-/g, "/"))
        },
        replaceHtml: function (e, t, i) {
            this.data = e;
            var o = this, a = this.model.funcObj(), t = t.replace(i, function (e, t, i, n) {
                var s = n.split(","), r = a[t] && a[t].apply(o, s);
                return r
            });
            return t
        },
        fileIsUser: function (e) {
            for (var t = top.$User.getAccountList() || [], i = 0; i < t.length; i++)if (top.$Email.getEmail(e) == t[i].name)return !0;
            return !1
        },
        loadCss: function () {
            var e = top.document.getElementById("newFileCss");
            if (!e) {
                var t = "../css/module/networkDisk/networkDisk_v3.css", i = top.document.createElement("link"), o = top.document.getElementsByTagName("head")[0];
                i.type = "text/css", i.rel = "stylesheet", i.href = t, i.id = "newFileCss", o.appendChild(i)
            }
        },
        selectDoc: function (e) {
            var t = o(e.target).parents("li[fileid]"), i = t.attr("fileid"), a = t.find(".i-chooseMo");
            return a.hasClass("i-chooseYet") ? (a.removeClass("i-chooseYet"), delete this.selectDocList[i], this.selectDocList.docCount--) : (top.BH("selectNewDoc"), a.addClass("i-chooseYet"), this.selectDocList[i] = this.getFileById(i), this.selectDocList.docCount++), this.changeSelectDoc(), !1
        },
        changeSelectDoc: function () {
            this.selectDocList.docCount > 0 ? (this.listContent.find("#configFile").removeClass("ico_btn_code"), this.listContent.find("#docCount").html('<em class="write_file_num">选择了&nbsp;<b>' + this.selectDocList.docCount + "</b>&nbsp;个文件</em>")) : (this.listContent.find("#configFile").addClass("ico_btn_code"), this.listContent.find("#docCount").html(""))
        },
        showDetailTip: function (e) {
            var t = e.currentTarget, a = t;
            if ("mouseenter" == e.type) {
                var n = a.clientWidth, s = a.clientHeight, r = (o(a).offset(), o(a).parents("li[fileid]").attr("fileid")), l = this.getFileById(r);
                if (l && "disk" == l.comeFrom)return;
                top.BH("showNewDocMsg");
                var d = this.listContent.find(".tab-inner-soon").scrollTop(), c = (this.fileIsUser(l.from), a.offsetTop + s - d + 10), p = {
                    left: a.offsetLeft + n / 2 - 230 + "px",
                    top: c > 317 ? 317 : c + "px",
                    subject: $T.Html.encode(l.subject),
                    date: this.getFileDate(l)
                }, u = i.Text.Utils.format(this.showTip, p);
                this.listContent.find("#tipContent").append(u)
            } else this.listContent.find("#docTip").remove()
        },
        getFileDate: function (e) {
            var t = e.receiveDate || e.createTime;
            return t = "number" == typeof t ? top.$Date.format("yyyy-MM-dd hh:mm", new Date(1e3 * t)) : t.slice(0, -3)
        },
        getFileById: function (e) {
            for (var t = 0; t < this.newDocAry.length; t++)if (this.newDocAry[t].selectId == e || this.newDocAry[t].id == e)return this.newDocAry[t];
            return ""
        },
        getFileTo: function () {
            var e = this.data && this.data.to || "", t = e.split(","), i = $T.Html.encode(top.$Email.getName(t[0]));
            return t.length > 1 && (i = "<b>" + i + "...</b>等"), i
        },
        bindEvent: function (e) {
            for (var t = this, e = e || {}, i = e.eventType || [], a = e.contains || this.listContent, n = e.doc || top.document, s = e.callback, r = 0; r < i.length; r++)o(a, n).find(e.selector).on(i[r], function (i) {
                return s && s.call(t, i), e.cancelBubble ? !1 : void 0
            })
        }
    }))
}(jQuery, _, M139), function (e, t, i) {
    var o = e, a = i.View.ViewBase;
    i.namespace("M2012.Compose.View.AddressBook", a.extend({
        el: "body",
        name: "addressBook",
        events: {"click #thContactFrame": "showContactFrame", "click #addressListGroupFixed": "hideGroup"},
        initialize: function (e) {
            return this.model = e.model, this.render(), this.initEvents(), a.prototype.initialize.apply(this, arguments)
        },
        render: function (e, t) {
            var i = this;
            this.contactsWidget = new M2012.UI.Compose.Widget.Contacts.View({
                container: document.getElementById("divAddressList"),
                filter: "email",
                width: "auto",
                showCreateAddr: !1,
                showSearchContact: !1,
                showCloseContacts: !1,
                comefrom: "write_letter"
            }).on("select", function (e) {
                var t = e.isGroup ? e.value.join(";") : e.value, o = i.model.addrInputManager;
                o.addMailToCurrentRichInput(t).focus()
            }).on("groupClick", function () {
                i.$("#addressListGroupFixed").slideUp("fast")
            }), this.companyWidget = new M2012.UI.Compose.Widget.Company.Contacts.View({
                container: document.getElementById("divCompanyAddressList"),
                filter: "email",
                width: "auto",
                comefrom: "write_letter"
            }).on("select", function (e) {
                var t = e.isGroup ? e.value.join(";") : e.value, o = i.model.addrInputManager;
                o.addMailToCurrentRichInput(t).focus()
            }).on("groupClick", function () {
                i.$("#addressListGroupFixed").slideUp("fast")
            })
        },
        showContactFrame: function () {
            BH({key: "compose_addressbook"}), o("#divAddressList").addClass("show"), o("#divLetterPaper").removeClass("show"), o("#thContactFrame").addClass("on"), o("#thLetterPaperFrame").removeClass("on")
        },
        initEvents: function () {
            var e = this, t = e.$("#addressListGroupFixed");
            this.$("#tabMainAddressList").off("scroll").on("scroll", function () {
                var i = e.contactsWidget && e.contactsWidget.groupFixedInfo(), o = e.companyWidget && e.companyWidget.groupFixedInfo();
                if (i)t.removeAttr("data-orgid").attr("data-groupid", i.gid).find(".GroupButton span").text(i.name).next("var").text(i.num), t.slideDown("fast"); else if (o) {
                    var a = o.name;
                    o.name.length > 9 && (a = a.substring(0, 9) + "..."), t.removeAttr("data-groupid").attr("data-orgid", o.gid).find(".GroupButton span").text(a).next("var").text(o.num), t.slideDown("fast")
                } else t.slideUp("fast")
            })
        },
        hideGroup: function (e) {
            var t = o(e.currentTarget), i = t.attr("data-groupid"), a = t.attr("data-orgid");
            i ? this.contactsWidget && this.contactsWidget.onGroupButtonClick(e) : a && this.companyWidget && this.companyWidget.hideCompanyGroup(a)
        }
    }))
}(jQuery, _, M139), function (e, t, i, o) {
    var a = e, n = o.PageApplication;
    o.namespace("M2012.Compose.Application", n.extend({
        initialize: function (e) {
            n.prototype.initialize.apply(this, arguments)
        }, defaults: {name: "M2012.Compose.Application"}, run: function () {
            this.initViews(), this.initEvents()
        }, initViews: function () {
            var e = this.model = new M2012.Compose.Model, t = {model: e};
            addrInputView = new M2012.Compose.View.AddrInput(t), subjectView = new M2012.Compose.View.Subject(t), uploadView = new M2012.Compose.View.Upload(t), htmlEditorView = new M2012.Compose.View.HtmlEditor(t), signMenuView = {}, senderMenuView = {}, littlesView = new M2012.Compose.View.Littles(t), timingView = new M2012.Compose.View.Timing(t), addressBook = new M2012.Compose.View.AddressBook(t), mainView = new M2012.Compose.View.Main(t), top.mainView = mainView;
            var i = this;
            a("#signs").click(function () {
                Package.require("compose_ext", function () {
                    a.isEmptyObject(signMenuView) && (signMenuView = new M2012.Compose.View.SignMenu(t)), signMenuView.showSignMenu()
                })
            }), a(".sendPsel").click(function () {
                Package.require("compose_ext", function () {
                    a.isEmptyObject(senderMenuView) && (senderMenuView = new M2012.Compose.View.Sender(t)), senderMenuView.render()
                })
            }), o.Timing.waitForReady("top.$User.getAccountList().length", function () {
                function e(e, t) {
                    return "string" != typeof e || "string" != typeof t ? "" : '"' + e.replace(/"|\\/g, "") + '"<' + t.replace(/[\s;,；，<>"]/g, "") + ">"
                }

                var t, a = top.$User.getDefaultSender(), n = top.$User.getTrueName();
                n && (a = e(n, a)), $T.Email.isEmailAddr(a) ? t = a : $T.Email.isEmailAddr(top.$User.getDefaultSender()) ? t = top.$User.getDefaultSender() : (t = top.$User.getShortUid() + "@" + top.SiteConfig.mailDomain, o.Logger.sendClientLog({
                    level: "ERROR",
                    name: "compose waitForReady",
                    errorMsg: "defaultSender: " + top.$User.getDefaultSender() + " ,trueName: " + n
                }), n && (t = e(n, t))), i.model.set("sendAddress", t)
            })
        }, initEvents: function () {
            this.startCheckContentLength()
        }, startCheckContentLength: function () {
            function e() {
                var e = htmlEditorView.getEditorContent().length;
                e > 81920 && 1638400 > e && (t.model.loadCompressLib(), clearInterval(i))
            }

            if (top.SiteConfig.compressSendMailRelease) {
                var t = this;
                if (this.model.isSupportCompressRequest()) {
                    setTimeout(e, 5e3);
                    var i = setInterval(e, 3e4)
                }
            }
        }, getInputAddr: function (e) {
        }, showAddressBookDialog: function (e) {
        }, getEditorContent: function (e) {
        }
    })), window.guid = Math.random().toString(16).replace(".", ""), $composeApp = new M2012.Compose.Application, $composeApp.run()
}(jQuery, Backbone, _, M139);