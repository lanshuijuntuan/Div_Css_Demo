
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-indexeddb-indexeddbblob-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,i,s,a;for(var f in b)if(b.hasOwnProperty(f)){if(e=[],n=b[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function i(e){var n=C.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?C.className.baseVal=n:C.className=n)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function a(e,n){if("object"==typeof e)for(var t in e)x(e,t)&&a(t,e[t]);else{e=e.toLowerCase();var r=e.split("."),o=Modernizr[r[0]];if(2==r.length&&(o=o[r[1]]),"undefined"!=typeof o)return Modernizr;n="function"==typeof n?n():n,1==r.length?Modernizr[r[0]]=n:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=n),i([(n&&0!=n?"":"no-")+r.join("-")]),Modernizr._trigger(e,n)}return Modernizr}function f(e,n){return!!~(""+e).indexOf(n)}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function u(e,n){return function(){return e.apply(n,arguments)}}function d(e,n,t){var o;for(var i in e)if(e[i]in n)return t===!1?e[i]:(o=n[e[i]],r(o,"function")?u(o,t||n):o);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=n.body;return e||(e=l(w?"svg":"body"),e.fake=!0),e}function h(e,t,r,o){var i,s,a,f,u="modernizr",d=l("div"),c=p();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=o?o[r]:u+(r+1),d.appendChild(a);return i=l("style"),i.type="text/css",i.id="s"+u,(c.fake?c:d).appendChild(i),c.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=C.style.overflow,C.style.overflow="hidden",C.appendChild(c)),s=t(d,e),c.fake?(c.parentNode.removeChild(c),C.style.overflow=f,C.offsetHeight):d.parentNode.removeChild(d),!!s}function y(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(c(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+c(n[o])+":"+r+")");return i=i.join(" or "),h("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function m(e,n,o,i){function a(){d&&(delete z.style,delete z.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=y(e,o);if(!r(u,"undefined"))return u}for(var d,c,p,h,m,v=["modernizr","tspan","samp"];!z.style&&v.length;)d=!0,z.modElem=l(v.shift()),z.style=z.modElem.style;for(p=e.length,c=0;p>c;c++)if(h=e[c],m=z.style[h],f(h,"-")&&(h=s(h)),z.style[h]!==t){if(i||r(o,"undefined"))return a(),"pfx"==n?h:!0;try{z.style[h]=o}catch(g){}if(z.style[h]!=m)return a(),"pfx"==n?h:!0}return a(),!1}function v(e,n,t,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+T.join(s+" ")+s).split(" ");return r(n,"string")||r(n,"undefined")?m(a,n,o,i):(a=(e+" "+E.join(s+" ")+s).split(" "),d(a,n,t))}var g=[],b=[],_={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){b.push({name:e,fn:n,options:t})},addAsyncTest:function(e){b.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=_,Modernizr=new Modernizr;var x,C=n.documentElement,w="svg"===C.nodeName.toLowerCase();!function(){var e={}.hasOwnProperty;x=r(e,"undefined")||r(e.call,"undefined")?function(e,n){return n in e&&r(e.constructor.prototype[n],"undefined")}:function(n,t){return e.call(n,t)}}(),_._l={},_.on=function(e,n){this._l[e]||(this._l[e]=[]),this._l[e].push(n),Modernizr.hasOwnProperty(e)&&setTimeout(function(){Modernizr._trigger(e,Modernizr[e])},0)},_._trigger=function(e,n){if(this._l[e]){var t=this._l[e];setTimeout(function(){var e,r;for(e=0;e<t.length;e++)(r=t[e])(n)},0),delete this._l[e]}},Modernizr._q.push(function(){_.addTest=a});var S="Moz O ms Webkit",T=_._config.usePrefixes?S.split(" "):[];_._cssomPrefixes=T;var j=function(n){var r,o=prefixes.length,i=e.CSSRule;if("undefined"==typeof i)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+n;for(var s=0;o>s;s++){var a=prefixes[s],f=a.toUpperCase()+"_"+r;if(f in i)return"@-"+a.toLowerCase()+"-"+n}return!1};_.atRule=j;var E=_._config.usePrefixes?S.toLowerCase().split(" "):[];_._domPrefixes=E;var P={elem:l("modernizr")};Modernizr._q.push(function(){delete P.elem});var z={style:P.elem.style};Modernizr._q.unshift(function(){delete z.style}),_.testAllProps=v;var N,O=_.prefixed=function(e,n,t){return 0===e.indexOf("@")?j(e):(-1!=e.indexOf("-")&&(e=s(e)),n?v(e,n,t):v(e,"pfx"))};try{N=O("indexedDB",e)}catch(L){}Modernizr.addTest("indexeddb",!!N),N&&Modernizr.addTest("indexeddb.deletedatabase","deleteDatabase"in N),Modernizr.addAsyncTest(function(){var n,t,r,o="detect-blob-support",i=!1;try{n=O("indexedDB",e)}catch(s){}if(!Modernizr.indexeddb||!Modernizr.indexeddb.deletedatabase)return!1;try{n.deleteDatabase(o).onsuccess=function(){t=n.open(o,1),t.onupgradeneeded=function(){t.result.createObjectStore("store")},t.onsuccess=function(){r=t.result;try{r.transaction("store","readwrite").objectStore("store").put(new Blob,"key"),i=!0}catch(e){i=!1}finally{a("indexeddbblob",i),r.close(),n.deleteDatabase(o)}}}}catch(s){a("indexeddbblob",!1)}}),o(),i(g),delete _.addTest,delete _.addAsyncTest;for(var k=0;k<Modernizr._q.length;k++)Modernizr._q[k]();e.Modernizr=Modernizr}(window,document);


// base info
var endCode = 'WEBBAR';
var version = 'version=6.0.0.0630';
var os = 'os=win';
var appExits = 0;
var chuLeiBanBenType = 'type=7' // 春蕾版本兼容参数
//var serverRoot = process.env === 'build' ? 'nav.fetiononline.com' : '192.168.143.25:8080'
//var baseURL = 'http://nav.fetiononline.com/register/v1/'
var epid = ''
var appType = '5' // 渠道编码
var loginType = '4'
var sourceId = '100000';
var authValue = "";
//12.15添加webImToken
var webImToken = '';
var isJumpWebStatus = 0  //1 app不存在   2 app存在
var newWin = null;
var authTokenUrl = window.location.protocol+"//webbar.fetiononline.com/webbar/token/verify";
var testAuthTokenUrl =  window.location.protocol+"//10.10.24.197:8186/webbar/token/verify";

var uid = uid;
var passid = passid;
var tokenIsSure = 0;
var getBrowserVersion = getBrowserVersion(); //是否支持webim
var authorizationCredential = '' // http业务使用的，有效期为7天，过期需要重新认证获取
var uuid = function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
var getEpid = function () {
    if (epid) {
        return epid
    }
    epid = endCode + version + 'uuid=' + uuid() + ';' + os + chuLeiBanBenType
    return epid
};
//启动app服务 12.15修改
//window.location.href = 'rcscm://startService';
//更改a标签的href 12.15更改  token验证之后才更改a标签
//document.getElementById('fetion').setAttribute('href','javascript:void(0)');

/*ceshi*/
/*
$.ajax({
  data:JSON.stringify({
    "epid":1,
    "sourceId":1,
    "appType":1,
    "authValue":1
  }),
  contentType:"application/json;charset=utf-8",
  type:'post',
  url:'http://10.10.24.197:8186/webbar/token/verify',
  success:function (data) {

    if(data.resultCode==200){
      /!*location.href='http://localhost:5601/app/kibana#/management/kibana/index?_g=()'+'&arr='+JSON.stringify(data.functions)*!/
    }

  },
  error:function (data) {

  }
})
*/


//139调用此方法传递token
function getAndVerifyToken(token) {
  
    //try{
    authValue = token;
    var sendObj = {
        "epid": getEpid(),
        "sourceId": sourceId,
        "appType": appType,
        "authValue": authValue
    }

    var sendObjStringify = JSON.stringify(sendObj);
    var xmlhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
    }
    else {
        // IE6, IE5 浏览器执行代码

        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           
            if (JSON.parse(xmlhttp.responseText).respCode == 200) {

                top.BH("welcome_fetion_load");
                //token验证成功之后更改a标签的href 12.15添加a标签
                document.getElementById('fetion').setAttribute("target","_self");
                document.getElementById('fetion').setAttribute('href','javascript:void(0)');
                document.getElementById('fetion').onclick=fetionClick;

                tokenIsSure = 1;
                //添加红点气泡标签
                // start //
                function prependChild(o, s) {
                    if (s.hasChildNodes()) {
                        s.insertBefore(o, s.firstChild);
                    } else {
                        s.appendChild(o);
                    }
                }

                function addElementI(objId) {
                    var eleA = document.getElementById(objId);

                    //添加 i
                    var eleI = document.createElement("i");

                    //设置 i 属性，如 class
                    eleI.setAttribute("class", "i_icoFetion");
                    eleI.style.display = 'block';
                    eleI.style.background = '#f00';
                    eleI.style.borderRadius = '50%';
                    eleI.style.width = '9px';
                    eleI.style.height = '9px';
                    eleI.style.top = '12px';
                    eleI.style.right = '19px';
                    eleI.style.position = 'absolute';
                    //i.innerHTML = "js 动态添加i";
                    prependChild(eleI, eleA);
                }

                //调用：
                //12.15更改 暂时不加红点
                //addElementI("fetion");
                //  end  //
            }

        }
    }
    if($.support.cors){
    xmlhttp.open("POST", authTokenUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    //xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xmlhttp.send(sendObjStringify);
    }
    /*}catch (err){
      console.log('ajaxError',err)
    }*/
}

//a标签绑定此方法
function fetionClick(e) {
    var target=e.target || e.srcElement;
    if(target.className=="i_set"){return;}

    if (tokenIsSure == 1) {
        startApp()
    } else {
        window.open('http://feixin.10086.cn/rcs/', '_blank')
    }
}

function giveMeWebImToken() {

}

function jumpWebImOrHome(getBrowserVersion) {
    if (getBrowserVersion) {
        //12.15号更改
        // start //
        //giveMeWebImToken(); //方法给这变量赋值 webImToken
        //window.open('http://hfx.fetiononline.com?astoken = '+ webImToken)  //为了防止拿webImToken是异步执行的，所以做了1000毫秒延迟跳转，如果是同步的就不需要延迟了，直接跳转就行。

        function jumpWebIm() {
            //newWin.location.href = 'http://hfx.fetiononline.com/?astoken=' + webImToken + '#/login', '_blank'

            M139.RichMail.API.call("umc:getArtifact", {}, function (response) {
              var respData = response.responseData;
              if(respData["code"]=="S_OK"){
                
                var token=respData["var"]["artifact"];
                newWin.location.href ='http://hfx.fetiononline.com/?astoken='+token+'#/login';


                /*top.LinkConfig["fetion"]={
                  url:window.location.protocol+'//hfx.fetiononline.com/?astoken='+token+'#/login',
                  title:"和飞信"
                }
                top.$App.show("fetion");*/
              }
            })
        }
        setTimeout(function () {
            jumpWebIm()
        },50)




    } else {
        newWin.location.href='http://feixin.10086.cn/rcs/'
        //window.open('http://feixin.10086.cn/rcs/', '_blank')
    }
}

//jsonp回调
function getAppServerStatusCb(data) {
    console.log(11)
    console.log(data.status);
    if (data.statusCode != 200) {
        isJumpWebStatus == 1
    } else {
        appExits = 1;
        isJumpWebStatus = 2
    }
}

// 12.15轮询是否需要跳转页面 调用startApp的时候开始执行

function probeStatusReturn() {
    
    var clearTimeout = setTimeout(function () {

        if (isJumpWebStatus == 1) { //app不存在
            //newWin = window.open();
            
            jumpWebImOrHome(getBrowserVersion)
            clearTimeout = null;
            return
        } else if (isJumpWebStatus == 2) {//app存在
            clearTimeout = null;
            if(newWin){
              newWin.close();
            }
            return
        }
        else {
            probeStatusReturn()
        }
        
    }, 200)
}

function startApp() {
    newWin =window.open();

    jumpWebImOrHome(getBrowserVersion)

    return ;

    /*
    //12.15开始轮询是否需要跳转页面
    probeStatusReturn()
    //通过jsonp方式访问服务启动app
    var url = "http://127.0.0.1:10086/newinstance?callback=getAppServerStatusCb";
    var script = document.createElement('script');
    script.setAttribute('src', url);
    //chrome 用来判断app是否存在
    script.onerror = function (err) {
        console.log(err)
        //jumpWebImOrHome(getBrowserVersion)
        isJumpWebStatus = 1
    }
    //ie8 用来判断app是否存在
    script.onreadystatechange = function () {
        console.log(12)
        console.log(this.readyState)
        if (!this.readyState     //这是FF的判断语句，因为ff下没有readyState这人值，IE的readyState肯定有值
            || this.readyState == 'loading' || this.readyState == 'complete'   // 这是IE的判断语句
        ) {
            setTimeout(function () {
                if (!appExits) {
                    isJumpWebStatus == 1
                }
            }, 1500)
        }

    }
    try {
        document.getElementsByTagName('head')[0].appendChild(script);
    } catch (err) {
        consoel.log(err)
    }*/

}

function getBrowserVersion() {
    // 判断浏览器版本号
    // console.log(Modernizr)
    if (Modernizr.indexeddb) {
        console.log('支持indexdb')
        // supported
    } else {
        console.log('不支持indexdb')
        // not-supported
    }

    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    var p = navigator.platform;  // 硬件平台
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] :
                        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 0;

    //以下进行测试
    /*
    if (Sys.ie) {
        document.write('IE: ' + Sys.ie);
        alert(Sys.ie.split(".")[0])
    }
    if (Sys.firefox) {
        document.write('Firefox: ' + Sys.firefox);
        alert(Sys.firefox.split(".")[0])
    }
    if (Sys.chrome){
        document.write('Chrome: ' + Sys.chrome);
        alert(Sys.chrome.split(".")[0])
    }
    if (Sys.opera){
        document.write('Opera: ' + Sys.opera);
        alert(Sys.opera.split(".")[0])
    }
    if (Sys.safari){
        document.write('Safari: ' + Sys.safari);
        alert(Sys.safari.split(".")[0])
    }
    if (Sys.edge) {
      document.write('Edge: ' + Sys.edge);
      alert(Sys.edge.split(".")[0])
    }
    /!**/

    // var url = urlHelper.decodeQueryString(window.location.href);
    var url = window.location.hash;
    console.log(url);

    var ipad = ua.match(/(ipad).*os\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iphone\sos)\s([\d_]+)/),
        isAndroid = ua.match(/(android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
    if (!isMobile || url.indexOf("?") == -1) {
        // 浏览器版本判断
        if (!Modernizr.indexeddb ||
            (Sys.ie && Sys.ie.split(".")[0] < 11) ||
            (Sys.firefox && Sys.firefox.split(".")[0] < 54) ||
            (Sys.chrome && Sys.chrome.split(".")[0] < 49) ||
            (Sys.opera && Sys.opera.split(".")[0] < 12) ||
            (Sys.safari && Sys.safari.split(".")[0] < 10) ||
            (Sys.edge && Sys.edge.split(".")[0] < 15)) {
            return false;
        } else if (p.indexOf("Win") === -1 && p.indexOf("Mac") === -1 && p.indexOf("Linux") === -1) {
            return false;
        } else {
            return true;
        }
    }
}

