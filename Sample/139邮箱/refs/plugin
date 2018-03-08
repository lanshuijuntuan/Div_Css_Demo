(function(win){
var config = {"sourceid":"3","cmdpath":"/umcsso/plugin","ver":"1.0","websvr":"https://www.cmpassport.com","initmethod":"plug:init","containerId":"umcboxpluginbar","aliveinterval":"5","arrowmargin":100,"ssomethod":"plug:sso","livemethod":"plug:keeplive","token":"461cdac1_20ab397e-b1fc-4a40-a272-399723204208"};
var useWhiteBg = false;

//{ 模板 ${test}
var template = [
    '<div class="#{skin} passportTip" style="width:338px;">',
        '<ul>',
            '<li>',
                '<a href="javascript:void(0)" class="txr" cmd="toaccount">进入通行证</a>',
                '<em class="tipName">和通行证：<em class="c_009900">#{authid}</em></em>',
            '</li>',
            '<li>',
                '<a href="javascript:void(0)" class="txr" cmd="#{phonecmd}">#{phonemethod}</a>',
                '<span>手机号码：#{phonevalue}</span>',
            '</li>',
            '<li>',
                '<a href="javascript:void(0)" class="txr" cmd="#{emailcmd}">#{emailmethod}</a>',
                '<span title="通过此邮箱可登录通行证或者找回密码">邮箱地址：#{emailvalue}</span>',
            '</li>',
            '<li>',
                '<a href="javascript:void(0)" class="txr" cmd="toaccount">更多</a>',
                '<span>帐号管理：<a href="javascript:void(0)" cmd="modpwd">修改密码</a><em class="gray">|</em>#{nocryptoguard}</span>',
            '</li>',
        '</ul>',
        '<div class="feibarDiv clearfix" id="txz_footer">',
            '<a href="javascript:void(0)" class="openMoreUp" cmd="openMore"></a>',
            '<div class="resume  ">',
            '<a href="javascript:void(0)" cmd="tosso" arg="2" style="margin: 0 16px 0 14px;" title="飞信">',
                '<i class="feibar"></i>',
                '<em>飞信</em>',
            '</a>',
            '<a href="javascript:void(0)" cmd="tosso" arg="3" style="margin-right:16px;" title="139邮箱">',
                '<i class="mailbar"></i>',
                '<em>139邮箱</em>#{emailNumber}',
            '</a>',
            '<a href="javascript:void(0)" cmd="tosso" arg="5" style="margin-right:15px;" title="和彩云">',
                '<i class="caibar"></i>',
                '<em>和彩云</em>',
            '</a>',
            '<a href="javascript:void(0)" cmd="tosso" arg="6" style="margin-right:5px;" title="和通讯录">',
                '<i class="txbar"></i>',
                '<em>和通讯录</em>',
            '</a>',
            '<a href="javascript:void(0)" cmd="tosso" arg="13" style="margin: 0 20px 0 14px;" title="和笔记">',
                '<i class="notebar"></i>',
                '<em>和笔记</em>',
            '</a>',
            //'<a href="javascript:void(0)" cmd="tosso" arg="4" style="margin:0 6px 0 4px;" title="移动微博">',
            //    '<i class="weibar"></i>',
            //   '<em>移动微博</em>',
            // '</a>',
            '</div>',
            '<div class="resume" id="openMoreBox">',
			'<a href="javascript:void(0)" cmd="tosso" arg="12" style="margin: 0 15px 0 13px;" title="和生活">',
                '<i class="lifeIco"></i>',
                '<em>和生活 </em>',
            '</a>',
	        '<a href="javascript:void(0)" cmd="tosso" arg="107" style="margin-left: 5px;" title="和留言">',
                '<i class="yyxxIco"></i>',
                '<em>和留言</em>',
            '</a>',
            // '<a href="javascript:void(0)" cmd="tosso" arg="11" style="margin: 0 20px 0 -4px;" title="G3通话">',
            //     '<i class="g3"></i>',
            //     '<em>G3通话</em>',
            // '</a>',
            '</div>',
        '</div>',
    '</div>',
    '<div style="display:none;"><OBJECT id="QuickLaunch" CLASSID="CLSID:AEB5EDB7-9AD1-41B2-9326-651CA5D23D12"></OBJECT></div>',
    '<form id="umcpassportplugin_form" action="about:_blank" target="_blank" method="get"></form>'].join("");

var $ = (function(){

var M139 = function (id, undefined){
    var _this = this;
    var context = M139;

    if (typeof id === "function") {
        return context.ready.apply(context, arguments);
    }

    var ele = document.getElementById(id);
    if (id.nodeType > 0) {
        ele = id;
    }

    var wrap = {

        el: ele,

        on: function(e, fn) {
            ele.addEventListener
                ? ele.addEventListener(e,fn,false)
                : ele.attachEvent("on" + e, function(evt) {
                    if (!evt.target) evt.target = ele;
                    if (evt.srcElement) evt.target = evt.srcElement;

                    if (!evt.stopPropagation) {
                        evt.stopPropagation = function() {
                            evt.cancelBubble = true;
                        }
                    }
                    fn(evt);
                });
            return this;
        },

        trigger: function(e) {
            ele[e]();
        },

        click: function(fn) {
            return this.on("click", fn);
        },

        addCls: function(cls) {
            //添加某个样式时，空格分隔并去重
            var reg = /(^|\s)(\S+)(?=\s(?:\S+\s)*\2(?:\s|$))/g;
            var _cls = ele.className;
            _cls += ' ' + cls;
            _cls = _cls.replace(reg, '').replace(/\s+/g, ' ');
            ele.className =  _cls;
            return this;
        },

        delCls: function(cls) {
            var _reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
            ele.className = ele.className.replace(_reg, ' ');
            return this;
        },

        hasCls: function(cls) {
            //删除某个样式
            var _reg = new RegExp('^(?=[\\s\\S]*(?:^|\\s)' + cls + '(?:\\s|$))');
            return _reg.test(ele.className);
        },

        findCls: function(cls) {
            var eles = [];
            if (ele.getElementsByClassName) {
                eles = ele.getElementsByClassName(cls);
            } else {
                var _eles = ele.getElementsByTagName("*");
                for (var i=0; i<_eles.length; i++) {
                    if ($(_eles[i]).hasCls(cls)) {
                        eles.push(_eles[i]);
                    }
                }
            }
            return eles;
        },

        css: function(css, val) {
            ele.style[css] = val;
            return this;
        },

        find: function(id) {
            var child = false;
            if (ele.querySelectorAll) {
                var _ele = ele.querySelectorAll("#" + id);
                if (_ele.length > 0) {
                    child = _ele[0];
                }
            } else {
                for(var es = ele.getElementsByTagName("*"), i=es.length; i--; ) {
                    if (es[i].id == id) {
                        child = es[i];
                        break;
                    }
                }
            }

            if (child) {
                child = context(child);
            }

            return child;
        },

        hide: function() {
            ele.style.display = "none";
            return this;
        },

        show: function() {
            ele.style.display = "";
            if (this.hasCls("hide")) this.delCls("hide");
            return this;
        },

        attr: function(name, value) {
            ele.setAttribute( name, value + "" );
            return this;
        },

        val: function(v) {
            if (v) {
                ele.value = v;
                return v;
            } else {
                return context.trim(ele.value);
            }
        },

        focus: function() {
            ele.focus();
            try{
                if(document.all){
                    var r =ele.createTextRange();
                    r.moveStart("character",ele.value.length);
                    r.collapse(true);
                    r.select();
                }else{
                    ele.setSelectionRange(ele.value.length,ele.value.length);
                    ele.focus();
                }
            }catch(e){}
            return this;
        },

        offset: function() {

            var docElem, win,
                box = { top: 0, left: 0 },
                doc = ele && ele.ownerDocument;

            if ( !doc ) {
                return { top: 0, left: 0 };
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            //if ( !jQuery.contains( docElem, elem ) ) {
            //    return box;
            //}

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            var core_strundefined = typeof undefined;
            if ( typeof ele.getBoundingClientRect !== core_strundefined ) {
                box = ele.getBoundingClientRect();
            }
            win = doc.defaultView || doc.parentWindow;
            return {
                top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
                left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
            };
        },

        isEmpty: function() {
            return context.isEmpty(ele.value || ele.innerHTML);
        },

        html: function(c) {
            if (c) {
                ele.innerHTML = c;
                return this;
            }

            if (arguments.length) {
                return this;
            }

            return ele.innerHTML;
        },

        empty: function() {
            ele.innerHTML = "";
        },

        remove: function() {
            ele.parentNode.removeChild(ele);
        }        
    };

    return wrap;
};


/**
 *获得一个cguid，带在请求的url上，方便前后端串联日志
 *cguid规范：由时间和4位的随机数组成。格式：小时+分+秒+毫秒+4位的随机
 */
M139.getCGUID = function () {
    function padding (n, m){
        var len = (m||2) - (1+Math.floor(Math.log(n|1)/Math.LN10+10e-16));
        return new Array(len+1).join("0") + n;
    }
    var now = new Date();
    return '' + padding(now.getHours()) + padding(now.getMinutes()) + padding(now.getSeconds()) + padding(now.getMilliseconds(), 3) + padding(Math.ceil(Math.random() * 9999), 4);
};

M139.addSheet = function(cssCode) {

    var styleElement;
    var head = document.getElementsByTagName("head")[0];

    if (document.createStyleSheet) {    //ie
        styleElement = document.createStyleSheet();
    } else {
        styleElement = document.createElement('style');//w3c
        styleElement.setAttribute("type", "text/css");
        head.appendChild(styleElement);
    }

    if (document.getElementsByTagName("style")[0].styleSheet) {
        styleElement.cssText += cssCode;
    } else if (document.getBoxObjectFor) {
        styleElement.innerHTML += cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode))
    }
};

M139.format = function (tpl, opts) {
    var source = tpl.valueOf(),
        data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
        data = data.length == 1 ? 
             
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
            : data;
        return source.replace(/#\{(.+?)\}/g, function (match, key){
            var replacer = data[key];
            // chrome 下 typeof /a/ == 'function'
            if('[object Function]' == toString.call(replacer)){
                replacer = replacer(key);
            }
            return ('undefined' == typeof replacer ? '' : replacer);
        });
    }
    return source;
};

M139.reqJs = function(url, callback) {
    var head = document.getElementsByTagName("head")[0];

    var dataScript = document.createElement("script");
    dataScript.src = url;
    dataScript.charset = "utf-8";
    dataScript.defer = true;
    dataScript.type = "text/javascript";
    head.appendChild(dataScript);

    if (document.all) {
        dataScript.onreadystatechange = function () {
            if (dataScript.readyState == "loaded" || dataScript.readyState == "complete") {
                if (callback) callback();
            }
        }
    } else {
        dataScript.onload = function () {
            if (callback) callback();
        }
    }
};

M139.ie = function (ver) {
    var regIE = /(msie|trident.*rv)\s(\d+\.\d+)/i;
    var ua = navigator.userAgent;

    var matchPatterns = ua.match(regIE);
    if (matchPatterns && matchPatterns.length > 0) {
        var version = parseInt(matchPatterns[2]);
        if(ver){
            return ver === version;
        }

        return true;
    }
    return false;
};

M139.isEmptyObject = function (obj) {
    if (typeof obj !== "object") return false;

    for (var i in obj) {
        return false;
    }
    return true;
};

M139.inArray = function(value, arr) {
    if (arr.indexOf) return arr.indexOf(value);
    for (var d = 0, f = arr.length; d < f; d++)
        if (arr[d] === value) return d;
    return -1
};

M139.event = {

                getEvent: function (e) {
                    return e || window.event;
                },

                getEventTarget: function (e) {
                    e = this.getEvent(e);
                    return e.srcElement || e.target;
                },

                stopEventBubble: function (e) {
                    e = this.getEvent(e);
                    if (window.event) {
                        e.cancelBubble = true;
                    } else {
                        e.stopPropagation();
                    }
                }
            };
return M139;
})();

var userinfo;
var TERMINAL_FETION_ID = 2;
var ACTIVE_FETION_CLIENT;

var umc = {

    init: function(result) {
        var _umc = this;
        userinfo = result.data;
        //window.console && console.log(userinfo);
        var service = userinfo.service || "";
        service = service.split(",");
        if( $.inArray("5",service) ){
            service.push("13");
        }
        //window.console && console.log(service);

        var bgUrl = config.websvr + '/images/chinamobileapps.png';

        (function(bg){
            var link = document.createElement("link");
            link.href = config.websvr + "/css/txz.css?_=20131201";
            link.rel = "stylesheet";
            link.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(link);

            new Image().src = bg; //预加载背景图，避免出白
        })(bgUrl);


        var container = $(config.containerId).el;
        
        var a = document.createElement("a");
        a.innerHTML = "和通行证 ▼";
        a.href = "javascript:void(0)";

        container.style.position = "relative";
        container.appendChild(a);
        var zindex = 70;
    
        $(a).click(function(e){
            //var This = e.srcElement || e.target;
            //window.console && console.log(This);
            e.stopPropagation();
            var boxPanel = $("umcpassportplugin");
            if (boxPanel.el) {
                if(useWhiteBg && config.sourceid && config.sourceid=='3'){
                    container.className='infoSel infoSelon';
                }
                //彩讯下调整位置
                // if (config.sourceid && config.sourceid=='5' && /MSIE 6/.test(navigator.userAgent)){
                //     var offset = $(container).offset();
                //     boxPanel.el.style.top = offset.top + 22 + "px";
                // }
                boxPanel.show();
                return;
            }

            var skinMap = {
                "S3" : "mailNormal",   //139邮箱
                "S5" : "infoName",     //和彩云
                "S6" : "cloudMail"    //和通讯录
               // "S4" : "microBlog"     //移动微博
            };

            //config.sourceid = window.location.hash ? window.location.hash.replace('#', '') : config.sourceid;

            boxPanel = document.createElement("div");
            boxPanel.innerHTML = $.format(template, {
                "skin": skinMap['S'+config.sourceid] ? skinMap['S'+config.sourceid] : 'mailNormal',
                "authid": userinfo.passid,
                "emailNumber": config.emailNumber?'<em class="msg-topredtips">'+config.emailNumber+'</em>':'',

                "phonecmd": userinfo.cryptophone ? "modphone" : "bindphone",
                "phonemethod": userinfo.cryptophone ? "" : "绑定手机",
                "phonevalue": userinfo.cryptophone ? userinfo.cryptophone : "未设置",

                "emailcmd": userinfo.cryptoemail ? "modemail" : "bindemail",
                "emailmethod": userinfo.cryptoemail ? "" : "绑定邮箱",
                "emailvalue": userinfo.cryptoemail ? userinfo.cryptoemail : "未绑定",

                "cryptoguard": userinfo.cryptoguard == "1" ? "修改密保" : "",
                "nocryptoguard": userinfo.cryptoguard == "1" ? '<a href="javascript:void(0)" cmd="modanswer">修改密保</a>' : '<a href="javascript:void(0)" cmd="setanswer">设置密保</a>'
            });

            var offset = $(container).offset();
            //window.console && console.log(offset)

            //改变箭头位置
            if (!isNaN(config.arrowmargin) && config.arrowmargin === 100) {
                config.arrowmargin = 25; //临时修改下默认值
            }

            //靠右边时修正回视图内
            if (document.documentElement.clientWidth - 360 < offset.left) {
                offset.left = document.documentElement.clientWidth - 360;
                if (offset.left < 0) offset.left = 0;

                if (!isNaN(config.arrowmargin) && config.arrowmargin === 25) {
                    config.arrowmargin = 270;
                }
            }

            boxPanel.style.position = "absolute";
            boxPanel.style.left = offset.left + "px";
            boxPanel.style.top = offset.top + 22 + "px";
            boxPanel.style.marginTop = "6px";
            boxPanel.style.zIndex = zindex++;
            boxPanel.id = "umcpassportplugin";

            var timerHidePlunginBox;
            window.UMCPlunginBoxPanelLeave=false;
            window.UMCPlungincontainerLeave=false;
            window.cmpassportHidePluginBox=function(){
                var div = _doc.getElementById("umcpassportplugin");
                if (UMCPlunginBoxPanelLeave && UMCPlungincontainerLeave && div) {
                    div.style.display = "none";
                    if(useWhiteBg && config.sourceid && config.sourceid=='3'){
                        container.className='infoSel';
                    }
                }
            };
              
            if (config.sourceid && config.sourceid=='3' && useWhiteBg){
                container.className='infoSel infoSelon';
            }

            document.body.appendChild(boxPanel);
            boxPanel.onmouseover=function(){
                UMCPlunginBoxPanelLeave=false;
                //window.console && console.log('container in');
                if(timerHidePlunginBox){
                    clearTimeout(timerHidePlunginBox);
                    timerHidePlunginBox=null;
                }
            }
            boxPanel.onmouseout=function(){
                UMCPlunginBoxPanelLeave=true;
                //window.console && console.log('container out');
                timerHidePlunginBox = setTimeout('cmpassportHidePluginBox()',800);
            };
            container.onmouseover=function(){
                UMCPlungincontainerLeave=false;
                //window.console && console.log('link in');
                if(timerHidePlunginBox){
                    clearTimeout(timerHidePlunginBox);
                    timerHidePlunginBox=null;
                }
            }
            container.onmouseout=function(){
                UMCPlungincontainerLeave=true;
                //window.console && console.log('link out');
                timerHidePlunginBox = setTimeout('cmpassportHidePluginBox()',800);
            };            


            //添加dom元素后，补充图标样式
            setTimeout(function(){
                if (/MSIE 6/.test(navigator.userAgent)) {
                    var clz = ["txz_close", "txz_tip", "txz_gray_tip", "txz_pink_tip", "feibar", "mailbar", "caibar", "txbar"];
                    for (var i = clz.length; i--; ) {
                        elements = panel.findCls(clz[i]);
                        if (elements.length > 0) {
                            $(elements[0]).css("backgroundImage", 'url(' + bgUrl + ')');
                        }
                    }
                } else {
                    bgUrl = '{ background-image:url(' + bgUrl + '); }';
                    bgUrl = [
                        '#umcpassportplugin .txz_close',
                        '#umcpassportplugin .txz_tip',
                        '#umcpassportplugin .txz_gray_tip',
                        '#umcpassportplugin .txz_pink_tip',
                        '#umcpassportplugin .feibar',
                        '#umcpassportplugin .mailbar',
                        '#umcpassportplugin .caibar',
                        '#umcpassportplugin .txbar'

                    ].join(',') + bgUrl;
                    $.addSheet(bgUrl);
                }
            }, 0);

            var panel = $(boxPanel);
            var elements;

            if (!isNaN(config.arrowmargin) && config.arrowmargin > 1 && config.arrowmargin < 300) {
                elements = panel.findCls("txz_tip");
                if (elements.length > 0) {
                    $(elements[0]).css("left", config.arrowmargin + "px");
                }
            }

            panel.click(function(e){
                $.event.stopEventBubble(e);
                var target = $.event.getEventTarget(e);
                var cmd = target.getAttribute("cmd");

                if(!cmd){
                    target = target.parentNode;
                    cmd = target.getAttribute("cmd");
                }

                if(cmd && _umc.OPTYPE[cmd]){                
                    _umc.cmdHandler(target,cmd); 
                }else if( cmd === 'openMore' ){//点击的是展开按钮
                    if($(target).hasCls('openMoreUp')){
                        $(target).delCls('openMoreUp').addCls('openMoreDown');
                        $('openMoreBox').addCls('hide');
                    }else{
                        $(target).delCls('openMoreDown').addCls('openMoreUp');
                        $('openMoreBox').delCls('hide');
                    }
                }                         
            });

            /*屏蔽关闭按钮
             panel.find("umcbox_btnclose").click(function(){
                panel.hide();
            });*/

            var footer = panel.find("txz_footer").el;
            //_umc.trimService(service, footer);

            //改变皮肤
            if (config.skin) {
                elements = panel.findCls("txz_umc_passport_sso_plugin_tips");
                if (elements.length > 0) {
                    $(elements[0]).addCls(config.skin);
                }
            }

        });

        var _doc = document;
        var _hideBox = function(){
            var div = _doc.getElementById("umcpassportplugin");
            if (div) {
                div.style.display = "none";
                if(useWhiteBg && config.sourceid && config.sourceid=='3'){
                    container.className='infoSel';
                }
            }
        };

        $(document).click(_hideBox);      


        var frames = window.frames;
        if (frames) {
            for (var i = 0; i < frames.length; i++) {
                try {
                    $(frames[i].document).click(_hideBox);
                } catch (ex) {}
            }
        }

        var time = config["aliveinterval"] || 1;

        var timer = setInterval(function(){
            _umc.keepAlive();
        }, time * 60 * 1000);

        window.unload = function() {
            clearInterval(timer);
        };
    },

    OPTYPE: {
        tosso       : 3,       //单点登录到业务，会给出to
        bindphone   : 6,       //绑定手机号，/umc/cryptoguard/phone/verify/?type=bind
        bindemail   : 4,       //绑定邮箱地址，/umc/cryptoguard/email/
        modemail    : 8,       //更换电邮地址，/umc/cryptoguard/email/verifyold/?email=aa@aa.com
        modphone    : 9,       //更换手机号，/umc/cryptoguard/phone/verify/?type=change
        setanswer   : 13,      //设置密保，/umc/cryptoguard/question/?authid=800011832&type=set
        modanswer   : 14,      //修改密保，/umc/cryptoguard/question/?authid=800011832&type=reset
        modpwd      : 12,      //修改密码，/umc/security/modifypwd/?authid=800011832
        toaccount   : 81       //帐号管理首页，/umc/account/
    },

    cmdHandler: function(target,cmd){    
            var id = target.getAttribute("arg");
            if (config.sourceid && config.sourceid == id) {
                return;
            }   
            
            //点击的是飞信
            if( id == TERMINAL_FETION_ID ){
                //把检测飞信客户端的结果保存起来
                if(undefined === ACTIVE_FETION_CLIENT){
                    ACTIVE_FETION_CLIENT = this.checkBrowserForFetion();
                }

                if(ACTIVE_FETION_CLIENT){
                    this.activeFetionClient();
                    return;
                }
            }
            
            this.ssoForward(this.OPTYPE[cmd], id);
    },

    //普通的链接跳转功能
    ssoForward: function(type, target) {
        var url = config.websvr + (config.cmdpath?config.cmdpath:"") + "?func=" + config.ssomethod
         + (target?"&to="+target:"") + "&optype=" + type
         + "&token=" + config.token
         + "&sourceid=" + (config.sourceid ? config.sourceid : "9")
         + "&complete=UMCPLUGINBOX.ssoForward&ver=100";

        window.open(url);
        //$("umcpassportplugin_form").attr("action", url).el.submit();
        return false;
    },

    keepAlive: function() {
        new Image().src = config.websvr + (config.cmdpath?config.cmdpath:"") + "?func=" + config.livemethod
         + "&token=" + config.token + "&sourceid=" + (config.sourceid ? config.sourceid : "9")
         + "&ver=100&cguid=" + $.getCGUID();
    },

    //将未开放的业务图标隐藏
    /*trimService: function(openArray, footer) {
        var inArray = function(tid) {
            for (var i=openArray.length; i--;) {
                if (openArray[i] == tid) {
                    return true;
                }
            }
            return false;
        };

        if (!footer) return;
        var _eles = footer.getElementsByTagName("A");

        for (var i=0; i<_eles.length; i++) {
            var target = _eles[i].getAttribute("arg");
            if (target && !inArray(target)) {
                _eles[i].style.display  = "none";
            }
        }
    },*/

    //飞信的人说win8上的兼容性不好，排除ie10和ie11
    checkBrowserForFetion: function(){
        var result =  $.ie() && !$.ie(10) && !$.ie(11) && this.checkFetionInstalled();
        return result;
    },

    getUserInfo: function () {
        var userinfo = '';
        try {
            userinfo = $("QuickLaunch").el.GetFetionDatas();
        } catch (e) { }

        return userinfo;
    },
    //获取已登录飞信客户的用户信息
    getUserList: function () {
        var userInfo = this.getUserInfo();
        var userList = [];

        var matchPatterns = userInfo.match(/<FetionData([^>]*)\/>/g);
        var len = matchPatterns && matchPatterns.length;
        if (len && len > 0) {
            for (var i = 0; i < len; i++) {
                var userObj = {};
                try {
                    matchPatterns[i].replace(/(\w+)="([^"]*)"/g, function (str, key, value) {
                        userObj[key] = value;
                    });
                } catch (e) {
                }

                if (!$.isEmptyObject(userObj)) {
                    //防止nickName字段没有值，导致后面出错
                    userObj.nickName = userObj.nickName || userObj.fetionID;                             
                    userList.push(userObj);
                }                        
            }
        }
        return userList;
    },
    //检测是否安装了飞信客户端
    checkFetionInstalled: function(){
        var installed = false;   // 飞信客户端是否安装
        var COM = "Fetion.WebDetect";   // COM 组件名字
        try {
            var axo = new ActiveXObject(COM);
            if (axo){           
                installed = true;
                axo = null;
            }
        } catch (e) { }
        return installed;
    },

    activeFetionClient: function(){
        var userList = this.getUserList();
                    var len = userList.length;
                    var handle;
                    for(var i = 0; i < len; i++){
                        var user = userList[i];
                        if(userinfo && userinfo.passid === user.fetionID){
                            handle = user.handle;
                            break;
                        }
                        //if(userinfo && userinfo.cryptophone === user.mobileNum){
                        //    handle = user.handle;
                        //    break;
                        //}
                    }               
                    if(len > 0 && handle){
                        this.activeFetionPanel(handle);
                    } else {            
                        this.openFetionClient();
                    }
    },
    //唤起已登录帐号的面板
    activeFetionPanel: function(handle){
        var result = false;
        try{
            result = !!$("QuickLaunch").el.ActiveFetion(handle);
        } catch(e){

        }
        return result;
    },
    //启动飞信客户端
    openFetionClient: function(){
        //这里要用timeout，不用的话ie6789都不会启动客户端，不知道为啥。
        var timer = setTimeout(function(){      
            win.location.assign('fetion:newinstance');
            clearTimeout(timer);
        },0);
    }
};

win.UMCPLUGINBOX = umc;

umc.init({"summary":"succeed","code":"S_OK","data":{"uid":"sidfd2e84dbd5929c4a54a76be000ac3992","cryptophone":"186****1220","cryptoguard":0,"service":"2,3,5,6,12,107","passid":"1432686289","nickname":"","cryptoemail":"","ssotoken":"461cdac1_20ab397e-b1fc-4a40-a272-399723204208","actived":"2,3,5"}}, umc);

})(window);

