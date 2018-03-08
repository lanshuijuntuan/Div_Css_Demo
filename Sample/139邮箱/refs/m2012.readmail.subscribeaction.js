/*外部依赖定义*/
var $ = top.$;
var $Date = top.$Date;

var praClassLength = $('img.praClass',document).length;
console.log("1111:"+praClassLength);


document.domain = window.location.host.replace(/:\w*$/,'').match(/[^.]+\.[^.]+$/)[0];
var contextPath = top.getDomain('dingyuezhongxin') +'/inner/';
var requestPath = window.location.protocol+"//"+location.host+"/subscribe/inner/";

function getSid(){
    return top.$App.getSid();
}

// 统一全部数据信息
var subscribeMailData = {
    "mid": top.$App.getCurrMailMid(),
    "sid": top.$App.getSid(),
    "columnId": $("#pageType", document).attr("cid"),
    "categoryId": $("#recomandid", document).attr("categoryid")
};

top.M2012.History.addBehavior({name: "subscribe_mid_" + subscribeMailData.mid + "_cid_" + subscribeMailData.columnId});

 /**
 * 订阅邮件
 * @type {{}}
 */
var subscribeMail = {
    /**
     * 当前文章idcompose_addressbook_sendself
     */
    currentItemId : null,
    /**
     * 请求地址
     */
    requestUrls:{
        commentCountApi: requestPath + "bis/commentList?sid=" + top.$App.getSid(),  // 获取评论数
        do_favorite : requestPath + "/bis/doFavorite?sid=" + top.$App.getSid(),      //收藏接口
        favorite_status : requestPath + "bis/isFavorite?sid=" + top.$App.getSid(),   //收藏状态
        recommend_article: requestPath + "bis/getSmartRecomList?sid=" + top.$App.getSid(),    //推荐接口
        recommend_magazine: requestPath + "bis/getColumnList?sid=" + top.$App.getSid(),    //推荐接口
        subscribe: requestPath + "bis/subscribe?sid=" + top.$App.getSid(),    //订阅接口
        delSubscribe: requestPath + "bis/delSubscribe?sid=" + top.$App.getSid(),    //退订接口
        columnDetail: requestPath + "bis/columnDetail?sid=" + top.$App.getSid(),  //栏目详情
        recommend_column: requestPath + "bis/getRecommends?sid=" + top.$App.getSid(),//推荐栏目 
        do_praise : requestPath + "/bis/doPraise?sid=" + top.$App.getSid()
    },
    /**
     * 地址
     */
    urls:{
        dimensionalCodeUrl : 'http://subscribe.mail.10086.cn/subscribe/getQRImage.action?c={0}&s=212',
        openplatform : 'http://mpost.mail.10086.cn/zazhi/{0}/' + '{1}' + '/',
        renrenShareUrl : "http://widget.renren.com/dialog/share?resourceUrl={0}&srcUrl={1}&title={2}&description={3}",
        qzoneShareUrl : "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={0}&title={1}&summary={2}&pics={3}",
        tqqShareUrl : "http://share.v.t.qq.com/index.php?c=share&a=index&url={0}&title={1}&pic={2}",
        tsinaShareUrl : "http://v.t.sina.com.cn/share/share.php?url={0}&title={1}&pic={2}"
    },
    /**
     * 创建http请求
     * @return {M139.ExchangeHttpClient}
     */
    createHttpClient : function(){
        var self = this;

        var httpClient = new top.M139.ExchangeHttpClient({
            name: "subscribeReaderHttpClient",
            requestDataType: "Object2JSON",
            responseDataType: "JSON2Object"
        });
        return httpClient;
    },
     /**
      * 重置父iframe高度
      */
    resizeHeight:function(){
         var parentIframe = window.top.document.getElementById("mid_"+subscribeMailData.mid);
         if(parentIframe){
            var height = parentIframe.style.height.replace("px","");
             parentIframe.style.height = (Number(height)+12)+"px";
         }
    },
     htmlTemplate:{
        recommendMainTemplate:[
        '<table> ',
        '<tbody><tr>',
            '<td> ',
                '<table cellspacing="0" cellpadding="0" style=" width:378px; height:251px; margin:0 12px 0 0;padding:0px;font-family:\'微软雅黑\';border:1px solid #e6e6e6; table-layout:fixed;">',
                  '<thead>',
                     '<tr>',
                         '<th style="text-align:left; padding-left:20px; height:38px; background-color:#f7f7f7; border-bottom:1px solid #e6e6e6;overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">为您推荐</th>',
                     '</tr>',
                  '</thead>',
                      '<tbody id="recommendArticle" style="display:block; padding:17px 0;font-size:14px;"></tbody>',
                 '</table>',
            '</td>',
            '<td>',
               '<table cellspacing="0" cellpadding="0" style="width:316px;  height:251px; margin:0px;padding:0px;font-family:\'微软雅黑\'; border:1px solid #e6e6e6; ">',
                     '<thead>',
                         '<tr>',
                             '<th colspan="2" style="text-align:left; padding-left:20px;height:38px; background-color:#f7f7f7; border-bottom:1px solid #e6e6e6; overflow:hidden;text-overflow:ellipsis; white-space:nowrap;">精选杂志</th>',
                         '</tr>',
                      '</thead>',
                      '<tbody id="recommendMagazine" style="display: block; padding: 8px 0 16px 0;"></tbody>',
                 '</table>',
            '</td>',
        '</tr>',
    '</tbody></table>',
    '<div style="margin-top: 10px;" id="subscribeAdContainer"></div>'].join(""),

        recommendArticleTemplate: ['<!--item start-->',
            '<tr cid="$columnId" serialid="$serialId">',
                '<td style="padding:2px 0 2px 12px; height:28px;"><a href="javascript:;" style="display:block;width:350px;height:24px;line-height:24px;text-decoration:none;color:#000;white-space:nowrap;_white-space:normal;text-overflow:ellipsis;overflow:hidden;"><img src="$logourl" width="24" height="24" alt="" style="position:relative;top:-2px;margin:0 12px 0 0;vertical-align:middle;border:none;">@getTitle()</a></td>',
            '</tr>',
        '<!--item end-->'].join(""),

        recommendMagazineTemplate: ['<!--item start-->',
            '<tr cid="$columnId">',
               '<td width="20px"><img src="$columnImageUrl" width="64" height="84" alt="@getTitle()" style="margin:11px 12px 6px 18px; display: block; overflow: hidden;"></td>',
               '<td width="50px;">',
                   '<table style="margin: -5px 0 -16px 0; table-layout:fixed; width:218px;">',
                      '<tbody><tr>',
                          '<td style="text-overflow:ellipsis; white-space:nowrap; overflow:hidden;"><a href="javascript:;" style="text-decoration:none;color:#000;font-size:14px;">@getTitle()</a></td>',
                      '</tr>',
                      '<tr>',
                          '<td valign="top" style="color:#999999; font-size:12px;">@getSummary()</td>',
                      '</tr>',
                      '<tr>',
                          '<td style="color:#cc2829; height:30px;">@getPrice()</td>',
                      '</tr>',
                   '</tbody></table>',
               '</td>',
           '</tr>',
        '<!--item end-->'].join(""),
        //右侧栏目推荐
        rightcolumnsRecommend:[ 
                '<!-- 栏目推荐 -->',
                '<!--item start-->',
                '<div id="recommendColumn" style="border: 1px solid #e4e4e4;border-radius: 4px; background-color: #fff;display:none;">',
                    '<div style="padding: 0 19px;height: 35px;line-height: 35px;font-size: 14px;background-color: #fff; border-bottom: 1px solid #ececec;">',
                        '<h2 style="margin:0;padding:0; font-size:14px;color:#333;">栏目推荐</h2>',
                    '</div>',
                    '<div>',
                        '<div style="padding: 25px 19px 13px 19px;position: relative;overflow: hidden;">',
                            '@getImage()',
                            '<ul style="width: 80px;display: inline-block;line-height: 13px;list-style:none outside none;padding:0;margin:0;">',
                                '<li style="*margin-top:5px;font-size:16px;font-weight:bold;color:#333;padding:0;margin:0;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;line-height:20px;">@getColumnName()</li>',
                                '<li style="margin:0;padding-top:10px;color:#999;font-size:12px;">$subscribeCount位用户</li>',
                                '<li style="/* padding:0; */margin:0;clear: both;padding-top: 4px;">',
                                '@getStar()',
                                '</li>',
                            '</ul>',
                            '<a class="orderColumn" data-columnId="$columnId" style="position: absolute;right: 19px;top: 32px;line-height: 28px;color: #fff;text-align: center; white-space: nowrap;border: 1px solid #00a513;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px; background: #00bd16;background: -moz-gradient(linear, 0 0, 0 100%, from(#00c417), to(#00b615));background: -webkit-gradient(linear, 0 0, 0 100%, from(#00C417), to(#00b615));background: linear-gradient(#00c417 0%,#00b615 100%);" href="javascript:"><span style="display: inline-block;height: 28px;line-height: 28px;padding: 0 14px;text-align: center;vertical-align: top;cursor: pointer;font-size:12px;">订阅</span></a>',
                        '</div>',
                        '<div style="padding: 0 19px 16px 19px;">',
                            '<p style="margin:0;padding:0;font-size:12px;color:#444;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical;display: -moz-box; -moz-line-clamp: 2;-moz-box-orient: vertical;display: -o-box; -o-line-clamp: 2;-o-box-orient: vertical;">@getDescription()</p>',
                        '</div>',
                    '</div>',
                '</div>',
                '<!--item end-->',
            '</div>'].join(""),
        //右侧文章推荐
        rightArticleRecommend: [ 
        '<ul id="rightArticleRecommend" style="margin-top:10px; border: 1px solid #e4e4e4; border-radius: 4px; background-color: #fff; border-bottom:none;list-style:none outside none;padding:0;font-size:12px;display:none;">',
                '<li style="padding: 0 19px;height: 35px;line-height: 35px;font-size: 14px; background-color: #fff; border-bottom: 1px solid #ececec;">',
                    '<h2 style="margin:0;padding:0; font-size:14px;color:#333;">文章推荐</h2>',
                '</li>',
                '<!--item start-->',
                '<li style="padding:0;margin:0;" data-cid="$columnId" data-serialid="$serialId">',
                    '<div style="padding: 16px 19px 10px 19px;font-size: 14px;overflow: hidden;">',
                        '@getImage()',
                        '@getTitle()',
                        // '<h2 style="margin:0;padding:0; font-size:14px;"><a style="text-decoration: none;font-weight:normal;color:#444;cursor:" href="javascript:;" class="articleTitle">@getTitle()</a></h2>',
                    '</div>',
                    '<div style="padding: 0 19px 6px 19px;color: #999;border-bottom: 1px solid #e4e4e4;">',
                        '<span style="padding-right:25px;"><img style="margin-right:3px;vertical-align: middle;overflow: hidden; border: none;" src="http://images.139cm.com/subscribe/images/popular/F3A95CF59EC84C04B554872091EA9475.png"/>阅读(@getReadCount())</span>',
                        '<span>@getColumnName()</span>',
                    '</div>',
                '</li>',
                '<!--item end-->',
             '</ul>'].join("")
     },
     core:{
         subscribe : function (options) {
             var self = this;
             var httpClient = subscribeMail.createHttpClient();

             //options.data = {columnId:options.cid,subComeFrom:502,recommend:'email',sid:getSid(),t:new Date().getTime()};

             httpClient.request({
                 method: "post",
                 url: subscribeMail.requestUrls.subscribe,
                 data: options.data
             }, function (result) {
                 if (top.$App && top.$App.onHttpClientResponse) {
                     top.$App.onHttpClientResponse(httpClient, result);
                 }
                 if(result==null||typeof(result)=="undefined"){
                     top.M139.UI.TipMessage.show('您的操作没有成功，请稍后再试。',{delay : 1000, className : 'msgRed'});
                     return;
                 }
                 if(result.responseData==null || result.responseData.body==null){
                     top.M139.UI.TipMessage.show('您的操作没有成功，请稍后再试。',{delay : 1000, className : 'msgRed'});
                     return;
                 }
                 var resultCode = result.responseData.body.returnCode;
                 if(resultCode===10){     //免费订阅成功
                     top.M139.UI.TipMessage.show('订阅成功',{delay : 1000});
                     if(options.callback){
                         options.callback();
                     }else{
                         console.log('用户未传入订阅回调方法');
                     }
                 }else if(resultCode===11){ //付费订阅成功

                 }else if(resultCode===50){  //WABP订阅成功

                 }else{  //失败
                     top.M139.UI.TipMessage.show('您的操作没有成功，请稍后再试。',{delay : 1000, className : 'msgRed'});
                 }
             });
         },
         /**
         * 退订
         *@param {Object} options 请求的参数
         *@param {Object} options.data 请求数据
         *@param {callback} options.callback 回调
         */
        delSubscribe : function (options) {
            var self = this;
            self.options = options;
            self.$column = options.column;
            self.$type = options.type;

            subscribeMail.toolTips.showUnSubscribeConfirm({column:self.$column,type:options.type,callback:function(){
                var httpClient = subscribeMail.createHttpClient();
                self.data = {comeFrom:503,columnId:self.$column && self.$column.columnId};

                var api = subscribeMail.requestUrls.delSubscribe;
                if(api.indexOf('http://') == 0){//如果以http协议开头的服务请求，则使用当前协议
                    api = window.location.protocol + "//" + api.substring(7);
                }
                
                httpClient.request({
                    method: "post",
                    url: api,
                    data: self.data
                },function (result) {
                    if (top.$App && top.$App.onHttpClientResponse) {
                        top.$App.onHttpClientResponse(httpClient, result);
                    }

                    if(result==null||typeof(result)=="undefined"){
                        top.M139.UI.TipMessage.show('您的操作没有成功，请稍后再试。',{delay : 1000, className : 'msgRed'});
                        return;
                    }
                    var responseData = result.responseData;
                    if(responseData.resultCode == '0'){//执行接口成功
                        var resultCode = responseData.body && responseData.body.returnCode || responseData.resultCode || "";
                        if(resultCode == 20){     //免费退订成功
                            self.$column.sub = 0;
                            top.M139.UI.TipMessage.show('退订成功',{delay : 1000});

                            if(self.options.callback){
                                self.options.callback({columnId:self.$column.columnId});
                            }
                        }else if(resultCode == 21){ //付费退订成功
                            //self.$column.sub = 0;

                            subscribeMail.toolTips.showFeeUnSubscribe({column:self.$column,type:self.$type});
                        }else if(resultCode == 2116){  //失败
                            subscribeMail.toolTips.showMMUnSubscribe({column:self.$column,type:self.$type});
                            //top.M139.UI.TipMessage.show(responseData.description,{delay : 1000, className : 'msgRed'});
                        }
                    }else{
                        top.M139.UI.TipMessage.show('退订失败。',{delay : 1000, className : 'msgRed'});
                        return;
                    }
                });
            }});
        },

        /**
         * 获取栏目详情
         * @return {[type]} [description]
         */
        getColumnDetail: function(options){
            var self = this;
            var data = {"columnId": options.columnId};
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.columnDetail,
                data: data
            }, function (result) {
                var responseData = result.responseData;
                if (responseData && responseData.resultCode == 0) {
                    options.success(responseData.body);
                } else {
                    options.error(responseData);
                }
            });
        }
     },
    toolTips:{
        /**
         * 展示退订确认提示框
         */
        showUnSubscribeConfirm: function(options){
            var self = this;

            var cid = options.column.columnId;
            var feeModel = options.column.feeModel;
            var isMagezine = options.column.isMagazine
            var contentTypeName = "杂志";
            var resultCode = options.resultCode;

            var tipText = isMagezine ? '<p class="red ">退订后不能再阅读杂志的过往期刊与更新内容</p>' : '';

            if(options.column.contentType==2){
                contentTypeName = "服务";
            }

            var html = "<span class=\"norTipsIco\"><i class=\"i_warn\"></i></span>\n" +
                "<dl class=\"norTipsContent\">\n" +
                "<dt class=\"norTipsTitle\">您要退订&nbsp;<a href='javascript:;' id=\"popup_details\">"+options.column.columnName+"</a>&nbsp;"+contentTypeName+"？</dt>\n" + tipText +
                "</dl>\n";

            var htmlCharged = "<span class=\"norTipsIco\"><i class=\"i_warn\"></i></span>\n" +
                "<dl class=\"norTipsContent\">\n" +
                "<dt class=\"norTipsTitle\">您要退订&nbsp;<a href='javascript:;' id=\"popup_details\">"+options.column.columnName+"</a>&nbsp;"+contentTypeName+"？</dt>\n" +
                "<dd class=\"formLine c_666\">该杂志为收费杂志，退订后你需要重新购买才可阅读该杂志</dd>\n" +
                /*"<dd class=\"formLine c_666\" style=\"display:"+display+";\"><input id=\"deleteJournlasId\" type=\"checkbox\">&nbsp;同步删除该杂志下历史期刊</dd>\n" +*/
                "</dl>\n";

            var unsubWabp = "<span class=\"norTipsIco\"><i class=\"i_warn\"></i></span>\n" +
                "<dl class=\"norTipsContent\">\n" +
                "<dt class=\"norTipsTitle\">您要退订&nbsp;<a href='javascript:;' id=\"popup_details\">"+options.column.columnName+"</a>&nbsp;"+contentTypeName+"？</dt>\n" +
                "<dd class=\"formLine c_666\" id=\"formLine c_6661\">不好意思，业务暂不支持在线退订，您可以通过短信完成退订。</dd> " +
                "<dd class=\"formLine c_666\"><span style=\"font-weight:bold;\">短信退订规则</span>：业务到期前一天，系统将会自动发送一条短信，您可以通过回复短信完成退订。</dd>   "+
                "</dl>\n";

            var doolandTips = "<span class=\"norTipsIco\"><i class=\"i_warn\"></i></span>\n" +
                "<dl class=\"norTipsContent\">\n" +
                "<dt class=\"norTipsTitle\">您要退订&nbsp;<a href='javascript:;' id=\"popup_details\">"+options.column.columnName+"</a>&nbsp;"+contentTypeName+"？</dt>\n" +
                "<dd class=\"formLine c_666\" style=\"color:#f00;\">退订后不能再阅读更新的期刊</dd>\n" +
                /*"<dd class=\"formLine c_666\" style=\"display:"+display+";\"><input id=\"deleteJournlasId\" type=\"checkbox\">&nbsp;同步删除该杂志下历史期刊</dd>\n" +*/
                "</dl>\n";

            if(resultCode == 2116){

                html = unsubWabp;
                var myPop = top.$Msg.confirm(html,
                    function(){
                        myPop.close();
                    },{
                        buttons:["确定"],
                        dialogTitle:'退订提醒',
                        isHtml:true
                    }
                );

            }else if(options.column.contentType == 3){
                var myPop = top.$Msg.confirm(doolandTips,
                    function () {
                        if (options.callback) {
                            options.callback();
                        }
                    },
                    function () {
                        myPop.close();
                    }, {
                        buttons: ["确定", "取消"],
                        dialogTitle: '退订提醒',
                        isHtml: true
                    }
                );
            }else{
                var myPop = top.$Msg.confirm(html,
                    function () {
                        if (options.callback) {
                            options.callback();
                        }
                    },
                    function () {
                        myPop.close();
                    }, {
                        buttons: ["确定", "取消"],
                        dialogTitle: '退订提醒',
                        isHtml: true
                    }
                );
                if(options.type=="reader"){
                    myPop.el.style.zIndex=2147483647;
                }
                top.$("#popup_details").click(function (event) {

                    top.$App.show("googSubscription", {cid: cid, comeFrom: '3'});

                    //location.href = 'columndetail.html?sid='+top.sid+'&cid='+cid;
                    myPop.close();
                    return false;
                });
            }
        },

        /**
         * 展示收费退订提示框
         */
        showFeeUnSubscribe: function(options){
            var columnName = options.column.columnName;
            var price = "元/"+ options.column.feeWay;
            if(options.column.subPrice){
                price = options.column.subPrice+price;
            }else{
                price = options.column.subprice+price;
            }
            var html = ["<div>\n",
                "<h4 id=\"SubStr\" style=\"color:#FF0000\">请通过手机短信确认退订！</h4>\n",
                "<p id=\"AlertStr\" style=\"line-height:22px;\">您已申请退订<strong style=\"font-weight:bold;\">《"+columnName+"》，" +
                    "资费："+price+"</strong>。我们将退订短信发送到您的<strong style=\"font-weight:bold;\">手机，" +
                    "请回复 TD </strong>并确认完成退订。</p\n",
                "</div>"].join("");
            var myPop = top.$Msg.confirm(html,
                function(){
                    myPop.close();
                },{
                    buttons:["确定"],
                    dialogTitle:'云邮局',
                    isHtml:true,
                    width:480
                }
            );
            if(options.type=="reader"){
                myPop.el.style.zIndex=2147483647;
            }
            return false;
        },

        /**
         * 展示MM退订提示框
         */
        showMMUnSubscribe: function(options){
            var columnName = options.column.columnName;
            var price = "元/"+ options.column.feeWay;

            var html = "<span class=\"norTipsIco\"><i class=\"i_warn\"></i></span>\n" +
                "<dl class=\"norTipsContent\">\n" +
                "<dd class=\"formLine c_666\" id=\"formLine c_6661\">不好意思，业务暂不支持在线退订，您可以通过短信完成退订。</dd> " +
                "<dd class=\"formLine c_666\"><span style=\"font-weight:bold;\">短信退订规则</span>：业务到期前一天，系统将会自动发送一条短信，您可以通过回复短信完成退订。</dd>   "+
                "</dl>\n";
            var myPop = top.$Msg.confirm(html,
                function(){
                    myPop.close();
                },{
                    buttons:["确定"],
                    dialogTitle:'退订提醒',
                    isHtml:true
                }
            );
            if(options.type=="reader"){
                myPop.el.style.zIndex=2147483647;
            }
            return false;
        }
    },
    share:{
        /**
         * 二维码模板
         */
        templateWeixin : [ '<div id="mpostsharetoweixin" tabindex="0" style="position:absolute; width:440px; height:350px; background:#fff; left: 50%;z-index: 9999; top: 50%; padding-top:50px; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px;margin-top: -175px;margin-left: -220px;">',
            '<div class="ta_c">',
            '<p><a href="javascript:void(0)" class="i_t_close"></a></p>',
            '<p class="fz_18 mb_20">用微信扫描二维码分享至好友/朋友圈</p>',
            '<img src="{0}">',
            '</div>',
            '</div>'].join(""),
        defaultSummary : '好文分享："{0}"。139邮箱云邮局的杂志《{1}》不错， 值得一看~',
        /**
         * 分享弹出框模板
         */
        templateShare:['<div id="mpost_share_tip" style="width:385px; position: absolute; left: -338px; top: -61px;background: #FEFEFE;border: 1px solid #CECECE;padding: 0;color: #666;-moz-box-shadow: 0 0 5px #cecece;-webkit-box-shadow: 0 0 5px #CECECE;box-shadow: 0 0 5px #CECECE;z-index:199;">',
            '<div class="tips-text">',
            '<div class="share-a">',
            '<a href="javascript:void(0)" class="139MailClass" title="分享到139邮箱" style="display: inline-block;font-size: 12px;color: #666;padding: 6px 8px 4px 8px;text-align: center;text-decoration: none;padding-left: 12px!important;"><img style="border-style:none;" src="http://images.139cm.com/subscribe/images/img_rss_yjlb_139.png" width="23" height="23" ><br>邮件分享</a>',
            '<a href="javascript:void(0)" class="qzoneClass" title="分享到腾讯空间" style="display: inline-block;font-size: 12px;color: #666;padding: 6px 8px 4px 8px;text-align: center;text-decoration: none;"><img style="border-style:none;" src="http://images.139cm.com/subscribe/images/img_rss_yjlb_qzone.png" width="23" height="23" ><br>空间分享</a>',
            '<a href="javascript:void(0)" class="tqqClass" title="分享到腾讯微博" style="display: inline-block;font-size: 12px;color: #666;padding: 6px 8px 4px 8px;text-align: center;text-decoration: none;"><img style="border-style:none;" src="http://images.139cm.com/subscribe/images/img_rss_yjlb_weibo.png" width="23" height="23" ><br>腾讯微博</a>',
            '<a href="javascript:void(0)" class="tsinaClass" title="分享到新浪微博" style="display: inline-block;font-size: 12px;color: #666;padding: 6px 8px 4px 8px;text-align: center;text-decoration: none;"><img style="border-style:none;" src="http://images.139cm.com/subscribe/images/img_rss_yjlb_sina.png" width="23" height="23" ><br>新浪微博</a>',
            '<a href="javascript:void(0)" class="tweixinClass" title="分享到微信" style="display: inline-block;font-size: 12px;color: #666;padding: 6px 8px 4px 8px;text-align: center;text-decoration: none;"><img style="border-style:none;" src="http://images.139cm.com/subscribe/images/img_rss_yjlb_weixin.png" width="23" height="23" ><br>微信分享</a>',
            '<a href="javascript:void(0)" class="trenrenClass" title="分享到人人网" style="display: inline-block;font-size: 12px;color: #666;padding: 6px 8px 4px 8px;text-align: center;text-decoration: none;padding-right: 12px!important;"><img style="border-style:none;" src="http://images.139cm.com/subscribe/images/img_rss_yjlb_renren.png" width="23" height="23"><br>人人网</a>',
            '</div>',
            '</div>',
            '<div class="tipsTop diamond" style="left:20px;display: none;"></div>',
            '</div>'].join(""),
        favTipTemplate : ['<div id="favTipDialog" class="tips write-tips" style="z-index:999;border-color: #cecece;padding: 3px 4px;background: #FEFEFE;border: 1px solid #cecece;color: #666;box-shadow: 0 0 5px #cecece;background-color: #ffffcb;">',
            '<div class="tips-text" style="font-size: 13px;">{0}</div>',
            '<div class="tipsTop diamond" style="left: 10px;bottom: -5px;_bottom: -6px;width: 7px;height: 5px;background: url(http://appmail3.mail.10086.cn/m2012/images/global/global_24.png?v=YudRheXq8CA0r0aNQHTCnw%3D%3D) no-repeat;display: inline-block;overflow: hidden;vertical-align: middle;position: absolute;background-position: -66px -424px;"></div>',
            '</div>'].join(""),
        /**
         * 存笔记模板
         */
        saveNoteTemplate:['<div class="saveNoteDiv" itemid="{0}" style="cursor:pointer;left:{1}px;background-color: #fff; border: #ccc solid 1px; position: absolute;  width: 100px;z-index:99;">',
            '<div>',
            '<a name="mnote" class="lnk" style="text-decoration:none; height: 16px; line-height: 16px; padding: 6px 8px; display: block; color: #666; font-size: 12px; white-space: nowrap;">' +
            '<i class="ico ico1" style="margin-right: 3px; background: url(http://images.139cm.com/subscribe/images/popular/note_ico.png) no-repeat; _background: url(http://images.139cm.com/subscribe/images/popular/note_ico_8.png) no-repeat; display: inline-block; vertical-align: top; width: 16px; height: 16px;background-position: -84px 0;"></i>存和笔记' +
            '</a>',
            '</div>',
            '<div>',
            '<a name="evernote" class="lnk" style="text-decoration:none; height: 16px; line-height: 16px; padding: 6px 8px; display: block; color: #666; font-size: 12px; white-space: nowrap;">' +
            '<i class="ico ico2" style="margin-right: 3px; background: url(http://images.139cm.com/subscribe/images/popular/note_ico.png) no-repeat; _background: url(http://images.139cm.com/subscribe/images/popular/note_ico_8.png) no-repeat; display: inline-block; vertical-align: top; width: 16px; height: 16px;background-position: -84px -29px;"></i>存印象笔记' +
            '</a>',
            '</div>',
            '</div>'].join(""),
        /**
         * 加载二维码
         */
        loadDimensionalCode : function(options){
            var self = this;

            var status = $("#jonMark").length;
            if (status > 0) {
                return;
            }
            top.$("body").append('<div class="layer_mask" id="jonMark" style="z-index:9999"></div>');
            var jDimensionalCode = top.$("#mpostsharetoweixin");
            if(jDimensionalCode.size() === 0){
                var itemUrl = self.getDimensionalUrl(options);
                top.$("body").append(top.$TextUtils.format(self.templateWeixin, [itemUrl]));
                top.$("#mpostsharetoweixin").focus();
                
                self.bindDimensionalCodeEvents();
            }
        },
        bindDimensionalCodeEvents : function(){
            var self = this;
            top.$("#mpostsharetoweixin a.i_t_close").click(function(event){
                self.removeDimensionalCode();
            });
            top.$("#jonMark").click(function(event){
                self.removeDimensionalCode();
            });
        },
        removeDimensionalCode : function(){
            top.$("#jonMark").remove();
            top.$("#mpostsharetoweixin").remove();
        },
        getFavTemplate : function(favoriteFlag){
            var self = this;
            var tempStr = '';
            if(favoriteFlag){
                tempStr = '取消成功';
            }else{
                tempStr = '收藏成功&nbsp;<a href="javascript:top.$App.show(\'googSubscription\',{mtype:\'9\'});" name="gotomyfav">查看</a>';
            }
            return top.$TextUtils.format(subscribeMail.share.favTipTemplate, [tempStr]);
        },
        // 显示气泡提示
        showFavTipDialog : function(jDest,data,status){
            if(!jDest){
                return;
            }
            var self = this;
            var jDialog = $("#favTipDialog",document);
            if(jDialog.size() > 0){
                jDialog.remove();
            }
            /*var favoriteFlag = 0;
            if(data!=null&&data.resultCode=="0"){
                favoriteFlag=1
            }*/
            $("body",document).append(self.getFavTemplate(status));
            jDialog = $("#favTipDialog",document);

            var dockElement = jDialog[0];
            top.M139.Dom.dockElement(jDest, dockElement,{direction : "up", margin : 10});
            top.M139.Dom.bindAutoHide({
                action: "click",
                element: dockElement,
                stopEvent: true,
                callback: function(data){
                    $(dockElement,document).hide();
                    M139.Dom.unBindAutoHide({ action: "click", element: dockElement});
                }
            });
            top.$Event.stopEvent();
            $(dockElement,document).show();

            var jGotoMyFav = jDialog.find("a[name='gotomyfav']");
            if(jGotoMyFav.size() > 0){
                jGotoMyFav.click(function(){
                    parent.$MFApp && parent.$MFApp.chooseModule('9');
                    //location.href = "myfav.html?sid="+top.sid;
                });
            }
            setTimeout(function(){
                $(dockElement).hide();
            }, 4000);
        },
        //更新收藏按钮状态
        updateFavStatus:function(options,status){
            if(status){        //收藏
                $(".favClass_"+options.itemId,document).first().attr("src","http://images.139cm.com/subscribe/images/popular/194FB57049454588A11D15AA277FE1FE.png");
                $(".favClass_"+options.itemId,document).attr("status","0");
                $(".favClass_"+options.itemId,document).next("span").html("取消收藏");
            }else{                           //未收藏
                $(".favClass_"+options.itemId,document).first().attr("src","http://images.139cm.com/subscribe/images/popular/1EBF4B1B49B84E8B8AB822FD7747DBCF.png");
                $(".favClass_"+options.itemId,document).attr("status","1");
                $(".favClass_"+options.itemId,document).next("span").html("收藏");
            }
        },
        //点赞按钮状态
        updatePraiseStatus: function(options,status) {
            if(status) {
                $(".praClass_"+options.itemId,document).first().attr("src","http://images.139cm.com/subscribe/images/popular/A0F7B4BE3503425CB161011A21C2F029.png");
                $(".praClass_"+options.itemId,document).attr("status","1");
                $(".praClass_"+options.itemId,document).next("span").html("已点赞");
            }else {
                $(".praClass_"+options.itemId,document).first().attr("src","http://images.139cm.com/subscribe/images/popular/B4AE0568A2944C80B44DBFF3EB19D9BD.png");
                $(".praClass_"+options.itemId,document).attr("status","0");
                $(".praClass_"+options.itemId,document).next("span").html("点赞");
            }
        },
        getCommentCount: function(options){
            var self = this;

            var requestData = {
                "dependId": options.itemId,
                "commentType": options.commentType || "2",  //1:栏目 2:文章类型 3:杂志
                "paging": {
                    "currentPageNum": 1,
                    "perPageCount": 10
                }
            };
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.commentCountApi,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.body!=null&&result.responseData.resultCode=="0"){
                    var commentCount = result.responseData.body.paging.totalCount;
                    if(commentCount > 0){
                        $('.commentClass_' + options.itemId, document).next('span').html("写下你的观点(" + commentCount + ")");
                    }else{
                        $('.commentClass_' + options.itemId, document).next('span').html("写下你的观点");
                    }
                    
                }
            });
        },
        /**
         * 获取用户收藏，点赞状态
         * isFavorite：0 未收藏，1 已经收藏
         * isDoPraise: 0 未点赞, 1 已点赞 
         */
        getUserFavStats:function(options){
            var self = this;
            var requestData = {itemId:options.itemId,favoriteType:options.flag};
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.favorite_status,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.body!=null&&result.responseData.resultCode=="0"){
                    var resBody = result.responseData.body;
                    subscribeMail.share.updateFavStatus(options, resBody.isFavorite);
                    subscribeMail.share.updatePraiseStatus(options, resBody.isDoPraise);
                }else{
                    if(console){console.log("query favorite fail.")}
                }
            });
        },
        /**
         * 用户收藏
         */
        userFav:function(options){
            var self = this;
            if(options.flag){
                top.BH('mpost_mymagazine_deletefav');
            }else{
                top.BH('mpost_mymagazine_addfav');
            }
            var requestData = {dependId:options.itemId,type:options.type,favoriteFlag:options.flag};
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.do_favorite,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.resultCode=="0"){
                    self.showFavTipDialog($(".favClass_"+options.itemId,document),null,options.flag);
                    if(options.flag=="0"){
                        subscribeMail.share.updateFavStatus(options,1);
                    }else{
                        subscribeMail.share.updateFavStatus(options,0);
                    }
                }else{
                    if(console){console.log("user favorite fail.")}
                }
            });
            return false;
        },
        /**
         * [doPraise 用户点赞]
         * @param  {[type]} options [参数对象]
         * @return {[type]}         [description]
         */
        doPraise: function(options) {

            var requestData = {dependId:options.itemId,type:options.type};
            var httpClient = subscribeMail.createHttpClient();

            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.do_praise,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.resultCode=="0"){                   
                    subscribeMail.share.updatePraiseStatus(options,1);
                }else{
                    if(console){console.log("user doPraise fail.")}
                    subscribeMail.share.updatePraiseStatus(options,0);
                }
            });
        },
        removeTips:function(){
            if($("#mpost_share_tip",document).size()){
                $("#mpost_share_tip",document).remove();
            }
            if($("div.saveNoteDiv",document).size()){
                $("div.saveNoteDiv",document).remove();
            }
          
            return false;
        },        
        getSaveParams:function(itemId,type){
            var itemTitle = $("#itemNameId_"+itemId,document).html();
            if(!itemTitle){
                itemTitle=$("#itemcontent_"+itemId,document).find(".title").html().trim();
            }
            if(itemTitle){
                itemTitle = itemTitle.replace(/&nbsp;/g," ");
            }
            var content = $("#item_content_text_"+itemId,document).find("div").html();
            if(type==="mnnote"){
                //content = content.replace(/\\/ig, "\\\\").replace(/(\r)?\n/ig, "\\n").replace(/\"/ig, "\\\"").replace(/\//ig, "\\\/");
            }else if(type==="evernote"){
                content = content.replace(/\\/ig, "\\\\").replace(/(\r)?\n/ig, "").replace(/\"/ig, "\\\"").replace(/\//ig, "\\\/").replace(/\\\"微软雅黑\\\"/ig,"微软雅黑").replace(/zspan\n/,"span");
            }
            return {title:itemTitle,content:content};
        },
        saveMNote:function(options){
            if(options){
                //options.options = "RICHTEXT";
                options.attachmentDirId="";
                //var options = {type:"RICHTEXT",title:itemTitle,content:content};
                top.BH('mpost_item_savetonote');
                top.M139.RichMail.API.call("mnote:createNote", options, function (res) {
                    if(res.responseData && res.responseData["code"]=="S_OK"){
                        top.M139.UI.TipMessage.show("已转存至和笔记 <a href='javascript:top.$App.show(\"note\")'>查看</a>", {delay : 5000});
                    }else{
                        top.M139.UI.TipMessage.show('您的操作没有成功，请稍后再试。',{delay : 1000, className : 'msgRed'});
                    }
                });
            }
        },
        /**
         * 保存到印象笔记
         * @param options
         */
        saveEverNote:function(options){
            if(options){
                top.BH('mpost_item_savetonote');
                top.M139.RichMail.API.call("evernote:createNote", options, function (res) {
                    if(res.responseData && res.responseData["code"]){
                        if(res.responseData["code"] == 'OAUTH_BINDING'){
                            top.$App.showOauthDialog({func:function(){}});
                        }else if(res.responseData["code"] == 'S_OK'){
                            top.M139.UI.TipMessage.show("操作成功，笔记内容已保存到印象笔记", {delay : 2000});
                        }else{
                            top.M139.UI.TipMessage.show('遇到异常，保存失败，请稍后重试',{delay : 2000, className : 'msgRed'});
                        }
                    } else {
                        top.M139.UI.TipMessage.show('遇到异常，保存失败，请稍后重试',{delay : 2000, className : 'msgRed'});
                    }
                });
            }
        },
        /**
         * 绑定笔记事件
         */
        bindNoteEvent:function(){
            $("div.saveNoteDiv",document).click(function(event){
                var target = $(event.target);
                var name = target.attr('name');
                var itemId = $(this).attr("itemid");
                if(name==="mnote"){
                    subscribeMail.share.saveMNote(subscribeMail.share.getSaveParams(itemId,name));
                }else if(name==="evernote"){
                    subscribeMail.share.saveEverNote(subscribeMail.share.getSaveParams(itemId,name));
                }
            });
        },
        /**
         * 绑定邮件中分享事件
         */
        bindMailShareEvent:function(){
            var self = this;

            if($(".newUlClass",document).length>0){
                //评论
                $(".commentClass",document).click(function(){
                    
                    var itemId = $(this).attr("itemid");
                    var thisContainer = $(this).parent().parent();
                    var journalSid = $(this).attr("journalsid");
                    var commentType = $(this).attr("commenttype");
                    var title = "";
               
                    if(commentType == "3"){
                        title = thisContainer.find("span:eq(0) em").html();
                    }else{
                        title = $(".commentTitleClass[param='"+itemId+"']",document).attr("paramtitle");
                    }

                    //subscribeMail.share.removeTips();  //隐藏另外两种弹窗，每次只能展示一种，多种一起展示会出现错位
                    if($('#allComment', thisContainer).size() > 0){
                        $('#allComment', thisContainer).toggle();
                    }else{
                        var itemObj = {
                            "itemId": itemId,
                            "journalSid": journalSid,
                            "commentType": commentType,
                            "title": title
                        };
                        new Comment(itemObj, thisContainer[0]);
                    }
                    frameElement.style.height = $("#contentDiv",document).height()+20+"px";
                    resetIframeHeight();
                    return false;
                });
                //收藏按钮事件
                $(".favClass",document).click(function(){
                    var itemId = $(this).attr("itemid");
                    var status = $(".favClass_"+itemId,document).attr("status");
                    if(status=="0"){
                        subscribeMail.share.userFav({itemId:itemId,type:0,flag:1}); //取消收藏
                    }else{
                        subscribeMail.share.userFav({itemId:itemId,type:0,flag:0}); //收藏
                    }
                    return false;
                });
                //点赞按钮事件
                $('.praClass', document).click(function() {
                    var itemid = $(this).attr('itemid');
                    var status = $(".praClass_"+itemid,document).attr("status");

                    if(status == "0") { //未点赞
                        subscribeMail.share.doPraise({itemId:itemid,type:1});
                    }
                    return;
                });
                //弹出分享框
                $(".shareClass",document).click(function(){
                    var itemId = $(this).attr("itemid");
                    subscribeMail.currentItemId = itemId;
                    if($("#mpost_share_tip",document).length>0){
                        $("#mpost_share_tip",document).remove();
                    }else{
                        subscribeMail.share.removeTips();
                        // $("#allComment", $(this).parent().parent()).hide();
                        var template = subscribeMail.share.templateShare;
                        // if($("#allComment", document)[0].style.display == 'block') {
                        //     template = template.replace('{left}','283').replace('{bottom}','-17');
                        // }else {
                        //     template = template.replace('{left}','226').replace('{bottom}','179')
                        // }
                        $("#itemcontent_" + itemId,document).find('.share').append(template);                        
                        subscribeMail.share.bindShareEvent();
                    }
                    frameElement.style.height = $("#contentDiv",document).height()+20+"px";
                    resetIframeHeight();
                    return false;
                });
                //存笔记
                $(".saveClass",document).click(function(){
                    var newNode = $(this).attr("param");
                    var itemId = $(this).attr("itemid");
                    if(newNode){
                        if($("div.saveNoteDiv",document).length>0){
                            $("div.saveNoteDiv",document).remove();
                        }else{
                            var left = $(this).parent().offset().left-37;
                            var html = top.$TextUtils.format(subscribeMail.share.saveNoteTemplate, [itemId,left]);
                            subscribeMail.share.removeTips();
                            $("#allComment", $(this).parent().parent()).hide();
                            $("#itemcontent_" + itemId,document).append(html);
                            subscribeMail.share.bindNoteEvent();
                        }
                    }else{
                        subscribeMail.share.saveMNote(subscribeMail.share.getSaveParams(itemId,"mnnote"));
                    }
                    frameElement.style.height = $("#contentDiv",document).height()+20+"px";
                    resetIframeHeight();
                    return false;
                });                
            }else{
                subscribeMail.share.bindShareEvent();
            }
        },
        /**
         * 绑定分享组件事件
         */
        bindShareEvent:function(){
            var self = this;

            $(".tqqClass",document).click(function(){
                var itemId = $(this).attr("itemId");
                top.BH('mpost_item_shareqqweibo');
                if(subscribeMail.currentItemId){
                    itemId = subscribeMail.currentItemId;
                }
                self.openShareWindow({url:self.getQQweiboUrl({itemId:itemId})});
            });
            $(".qzoneClass",document).click(function(){
                var itemId = $(this).attr("itemId");
                top.BH('mpost_item_shareqzone');
                if(subscribeMail.currentItemId){
                    itemId = subscribeMail.currentItemId;
                }
                self.openShareWindow({url:self.getQzoneUrl({itemId:itemId})});
            });
            $(".tsinaClass",document).click(function(){
                var itemId = $(this).attr("itemId");
                top.BH('mpost_item_sharesinaweibo');
                if(subscribeMail.currentItemId){
                    itemId = subscribeMail.currentItemId;
                }
                self.openShareWindow({url:self.getSinaweiboUrl({itemId:itemId})});
            });
            $(".trenrenClass",document).click(function(){
                var itemId = $(this).attr("itemId");
                top.BH('mpost_item_sharerenren');
                if(subscribeMail.currentItemId){
                    itemId = subscribeMail.currentItemId;
                }
                self.openShareWindow({url:self.getRenrenUrl({itemId:itemId})});
            });
            $(".tcunheClass",document).click(function(){
                var itemId = $(this).attr("itemId");
                var itemTitle = $("#itemNameId_"+itemId,document).html();
                if(!itemTitle){
                    itemTitle=$("#itemcontent_"+itemId,document).find(".title").html().trim()
                }
                if(itemTitle){
                    itemTitle = itemTitle.replace(/&nbsp;/g," ");
                }
                var content = $("#item_content_text_"+itemId,document).find("div").html();
                content = content.replace(/\\/ig, "\\\\").replace(/(\r)?\n/ig, "\\n").replace(/\"/ig, "\\\"").replace(/\//ig, "\\\/"); // add by tkh转义
                var options = {type:"RICHTEXT",title:itemTitle,content:content};
                top.BH('mpost_item_savetonote');
                top.M139.RichMail.API.call("mnote:createNote", options, function (res) {
                    if(res.responseData && res.responseData["code"]=="S_OK"){
                        top.M139.UI.TipMessage.show("已转存至和笔记 <a href='javascript:top.$App.show(\"note\")'>查看</a>", {delay : 5000});
                    }else{
                        top.M139.UI.TipMessage.show('您的操作没有成功，请稍后再试。',{delay : 1000, className : 'msgRed'});
                    }
                });
            });
            $(".tweixinClass",document).click(function(){
                var itemId = $(this).attr("itemId");
                if(subscribeMail.currentItemId){
                    itemId = subscribeMail.currentItemId;
                }
                var contentObj = $("#itemcontent_" + itemId,document);
                var columnId = contentObj.attr("paramColumnId");
                top.BH('mpost_item_shareweixin');
                self.loadDimensionalCode({columnId:columnId,itemId:itemId});
            });
            //邮件分享事件
            $(".139MailClass",document).click(function(){
                var itemId = $(this).attr("itemid");
                if(subscribeMail.currentItemId){
                    itemId = subscribeMail.currentItemId;
                }
                var columnId = $("#itemcontent_" + itemId,document).attr("paramColumnId");
                var itemTitle =$(".commentTitleClass[param='"+itemId+"']",document).attr("paramtitle");
                var columnName = $(this).attr("columnname");
                if(!columnName){
                    columnName = $("#columnNameId",document).html();
                }
                var title = "139邮箱云邮局："+itemTitle+"_"+columnName;
                var html =new Array();
                var shareUrl = top.$TextUtils.format(subscribeMail.urls['openplatform'],[columnId,itemId]);

                html.push('<a style="text-decoration: none; color: black; font-size: 14px;font-weight:bold;">'+itemTitle+'</a></br>');
                html.push($("#item_content_text_"+itemId,document).find("div").html());
                html.push("<br/><a target='_blank' href='"+shareUrl+"' style='font-size: 12px;font-weight:normal;'>点击查看原文</a>");

                top.$Evocation.create({type:'1', subject : title, content : html.join(""), showZoomIn: true});
                top.BH('mpost_item_sharemail');
            });
            //短信分享
            $(".transmitMobile",document).click(function() {
                var id = $(this).attr('param');
                var columnId = $("#itemcontent_" + id,document).attr("paramColumnId");
                var url = "http://subscribe.mail.10086.cn/subscribe/readAll.do?columnId="+columnId+"&itemId="+id;
                var name = $("#subscribeButtonId",document).prev("span").find("a").html();
                var title = $("#itemNameId_"+id,document).html();
                if(typeof(title)!="undefined" && title.length>15){
                    title = title.substring(0,15)+"...";
                }
                var content = "在139邮箱云邮局看到一本好杂志【"+name+"】【"+title+"】"+url;
                var indexKey = "subscribeMobileText" + Math.random();
                top[indexKey] = content;
                window.top.Links.show("sms","&composeText=" + indexKey);
                top.BH('mpost_submail_share');
            });
        },
        getShareObj:function(options){
            var self = this;

            var shareObj = {
                title : '',
                summary : '',
                resourceUrl : '',
                pics : ''
            };

            var itemId = options.itemId;
            var contentObj = $("#itemcontent_" + itemId,document);
            var summary = $("#itemsummary_" + itemId,document).html();
            var itemTitle = $("#itemNameId_"+itemId,document).html();
            if(!itemTitle){
                itemTitle=$("#itemcontent_"+itemId,document).find(".title").html().trim()
            }
            itemTitle = itemTitle.replace(/\&nbsp;/g," ");
            var columnId = contentObj.attr("paramColumnId");
            var images = contentObj.attr("paramImg");
            var columnName = $("#columnNameId",document).html();
            if(columnName){
                shareObj.title = '139邮箱云邮局：' + itemTitle + '_' + columnName;
            }else{
                shareObj.title = '139邮箱云邮局：' + itemTitle;
            }
            if(summary){
                shareObj.summary = summary;
            }else{
                shareObj.summary = top.$TextUtils.format(self.defaultSummary, [itemTitle, columnName]);
            }
            shareObj.pics = images;
            var resourceUrl = top.$TextUtils.format(subscribeMail.urls['openplatform'],[columnId,itemId]);
            shareObj.resourceUrl =resourceUrl;

            return shareObj;
        },
        openShareWindow:function(options){
            window.open(options.url);
        },
        getDimensionalUrl:function(options){
            var self = this;
            var resourceUrl = top.$TextUtils.format(subscribeMail.urls['openplatform'],[options.columnId,options.itemId]);
            return top.$TextUtils.format(subscribeMail.urls['dimensionalCodeUrl'], [encodeURIComponent(resourceUrl)]);
        },
        getRenrenUrl : function(options){
            var self = this;
            var shareObj = self.getShareObj(options);
            return top.$TextUtils.format(subscribeMail.urls['renrenShareUrl'], [encodeURIComponent(shareObj.resourceUrl), encodeURIComponent(shareObj.resourceUrl), encodeURIComponent(shareObj.title), encodeURIComponent(top.$TextUtils.getTextOverFlow(shareObj.summary, 200, true))]);
        },
        getQzoneUrl : function(options){
            var self = this;
            var shareObj = self.getShareObj(options);
            return top.$TextUtils.format(subscribeMail.urls['qzoneShareUrl'], [encodeURIComponent(shareObj.resourceUrl), encodeURIComponent(shareObj.title), encodeURIComponent(top.$TextUtils.getTextOverFlow(shareObj.summary, 100, true)), shareObj.pics]);
        },
        getQQweiboUrl : function(options){
            var self = this;
            var shareObj = self.getShareObj(options);
            return top.$TextUtils.format(subscribeMail.urls['tqqShareUrl'], [encodeURIComponent(shareObj.resourceUrl), encodeURIComponent(shareObj.title + ' ') + encodeURIComponent(top.$TextUtils.getTextOverFlow(shareObj.summary, 80, true)), shareObj.pics]);
        },
        getSinaweiboUrl : function(options){
            var self = this;
            var shareObj = self.getShareObj(options);
            return top.$TextUtils.format(subscribeMail.urls['tsinaShareUrl'], [encodeURIComponent(shareObj.resourceUrl), encodeURIComponent(shareObj.title + ' ') + encodeURIComponent(top.$TextUtils.getTextOverFlow(shareObj.summary, 80, true)), shareObj.pics]);
        }
    },app:{
        showAppSpan:function(){
            $("#appSpanId",document).show();
            subscribeMail.app.bindAppEvent();
        },
        showDimensional:function(){
            $("#appDivId",document).show();
            $("#appImageId",document).attr("src","http://images.139cm.com/subscribe/images/popular/popular_D1CB8509C5CA465B9B3C08B3D9791498.png");
        },hideDimensional:function(){
            $("#appDivId",document).hide();
            $("#appImageId",document).attr("src","http://images.139cm.com/subscribe/images/popular/popular_4F2200305205456FB0CDCA5186D99869.png");
        },bindAppEvent:function(){
            $("#appSpanId span",document).mouseover(function(){
                subscribeMail.app.showDimensional();
                return false;
            });
            $("#appSpanId span",document).mouseleave(function(){
                subscribeMail.app.hideDimensional();
                top.addBehaviorExt({actionId:105759,moduleId:25});
                return false;
            });
        }
    },
    gotoColumnDetail:function(){
        $("a.readMoreClass",document).removeAttr("href").removeAttr("target");
        $("a.readMoreClass",document).click(function(){
            var columnId = $(this).attr("param");
            if(columnId){
                columnId = columnId.replace(/\,/ig,"");
                top.$App.show('googSubscription', {cid: columnId});
            }
        });
    },
    // //加载邮件日志上报
    // loadLogReport: function(){

    //     var  url = 'http://smsrebuild0.mail.10086.cn/weather/weather?func=user:logBehaviorAction&key=mpost_submail_load&rand=' + Math.random();    
    //     var img = new Image();
    //     img.src = url;
    //     console.log("loadLogReport");
    // },  
    bindReadItem:function(){
        $(".showItemClass",document).click(function(){
            var cid = $(this).attr("cid");
            var itemid = $(this).attr("itemid");
            if(cid && itemid){
                var jsUrl = top.m2012ResourceDomain + "/mpost2014/js/packs/mpostreader.pack.js?v="+top.sid;
                top.M139.core.utilCreateScriptTag({
                    id: "subscribeReaderJs",
                    src: jsUrl,
                    charset: "utf-8"
                }, function(){
                    new top.M2012.Subscribe.Reader.Application({serialId: itemid,cid:cid,resourcePath : requestPath}).run();
                });
            }
        });
    },
    //绑定退订事件
    bindUnSubEvent: function(){
        $(".item", document).on('click', function(e){
            var target = $(e.target);
            // var itemId = target.attr('itemid');
            var columnId = target.attr('cid');
            if(target.attr("id") == "unsub" && columnId){

                e.preventDefault(); 
                subscribeMail.core.getColumnDetail({
                    "columnId": columnId, 
                    "success": function(result){
                        if(result.sub){
                            subscribeMail.core.delSubscribe({"column": result});
                        }else{
                            top.M139.UI.TipMessage.show('已退订过此栏目',{delay : 1000});
                        }
                    },
                    "error": function(result){
                        console.log(result);
                    }
                });
            }
        });
        //底部的“残忍退订”
        $('#usSubBottom',document).on('click',function(e){

            var target = $(e.target);
            var columnId = target.attr('cid');

            e.preventDefault(); 
            subscribeMail.core.getColumnDetail({
                "columnId": columnId, 
                "success": function(result){
                    if(result.sub){
                        subscribeMail.core.delSubscribe({"column": result});
                    }else{
                        top.M139.UI.TipMessage.show('已退订过此栏目',{delay : 1000});
                    }
                },
                "error": function(result){
                    console.log(result);
                }
            });
        });

    },
     /**
      * 邮件底部推荐
      */
     recommend:{
        saveMagazineList: [],  //保存临时杂志列表
        categoryId: subscribeMailData.categoryId,
        renderArticleListFunctions:{
            getTitle : function(){
                var row = this.DataRow;
                return top.$T.Html.encode(row.title);
            }
        },

        renderMagazineFunctions:{
            getTitle: function(){
                var row = this.DataRow;
                return top.$T.Html.encode(row.columnName);
            },

            getSummary: function(){
                var row = this.DataRow;
                var summary = "";
                if(row.longDescription && row.longDescription.length > 30){
                    summary = row.longDescription.slice(0, 30);
                    summary += "...";
                }else{
                    summary = row.longDescription;
                }
                return top.$T.Html.encode(summary);
            },

            getPrice: function(){
                var row = this.DataRow;
                var priceStr;

                if (row.feeModel == "0"){
                    priceStr = "免费";
                }else if (row.feeModel == 91 || row.feeModel == 92){
                    if (row.supportFirstSub == 1) {
                        priceStr = "￥" + row.subprice + "元/" + row.feeWay;
                    } else if (row.supportSecSub == 1) {
                        priceStr = "￥" + row.secPrice + "元/本"; 
                    } else {
                        priceStr = "￥" + row.subprice + "元/" + row.feeWay;
                    }
                } else if( row.feeModel == 93){
                    var payCycle = row.payCycle >0? row.payCycle:"";
                    if (row.supportFirstSub == 1) {
                        priceStr = "￥" + row.subprice + "元/" + payCycle + row.feeWay;
                    } else if (row.supportSecSub == 1) {
                        priceStr = "￥" + row.secPrice + "元/本"; 
                    } else {
                        priceStr = "￥" + row.subprice + "元/" +payCycle+ row.feeWay;
                    }
                } else {
                    priceStr = "￥" + row.subprice + "元/" + row.feeWay;
                }
                
                return top.$T.Html.encode(priceStr);
            }
        },
        renderRArticleFunctions:{

            getImage: function(){
                var row = this.DataRow;
                if(row.thumbnail){
                    return '<img src="'+row.thumbnail+'" width="100" height="72" class="artImage" style="float:left;margin-right:10px;vertical-align: top;overflow: hidden; border: none;cursor:pointer;"/>';
                }else{
                    return '';
                }
            },
            getTitle : function(){
                var row = this.DataRow;
                var artTitle = top.$TextUtils.getTextOverFlow2(top.$T.Html.encode(row.title),60,true);
                if(row.thumbnail){//有图
                  return  '<h2 style="margin: 0px; padding: 0px; font-size: 14px; float: left; width: 140px; display: block; word-break: break-all;"><a style="text-decoration: none; font-weight: normal; color: rgb(68, 68, 68);" href="javascript:;" class="articleTitle">'+ artTitle +'</a></h2>';
                }else{//无图

                  return '<h2 style="margin:0;padding:0; font-size:14px;"><a style="text-decoration: none;font-weight:normal;color:#444;cursor:" href="javascript:;" class="articleTitle">'+ artTitle +'</a></h2>';
                }
               
            },
            getColumnName: function(){
                var row = this.DataRow;
                return top.$T.Html.encode(row.name);
            },

            getReadCount: function(){
                var row = this.DataRow;
                return formatData(row.readCount);
            }
        },
        renderRColumnFunctions: {

            getColumnName: function(){
                var row = this.DataRow;
                return top.$T.Html.encode(row.columnName);
            },

            getDescription: function(){
               var row = this.DataRow;
                return top.$T.Html.encode(row.longDescription); 
            },
            getImage: function(){
                var row = this.DataRow;
                if(row.logoUrl){
                    return '<img src="' + row.logoUrl +'" name="" alt="" width="60" height="60" style="float:left;margin-right:10px;" />';
                }else{
                    return '';
                }
            },
            //栏目星级展示
            getStar: function(){

                var row = this.DataRow;
                var starClass = row.virtualScore/2;
                var fullStar = Math.floor(starClass);
                var nullStar = Math.floor(5-starClass);
                var html = '';
                for(var i = 0; i < fullStar; i++){//满星

                    var html = html + '<em style="display: block; width: 12px;height: 12px;overflow:hidden;vertical-align: -6px;background: url(http://images.139cm.com/subscribe/images/popular/9EC7AC8B324B431E84E113534546AE71.png) 0 0 repeat-x;float: left;"></em>';
                }
                if(starClass.toString().indexOf('.') !== -1){//半颗星

                    var html = html + '<em class="halfStar" style="display:block;float:left; width: 12px;height: 12px;overflow:hidden;vertical-align: -6px;background: url(http://images.139cm.com/subscribe/images/popular/9EC7AC8B324B431E84E113534546AE71.png) 0 -27px no-repeat;"></em>';
                }
                for (var j = 0; j < nullStar; j++){//空星

                    var html = html + '<em style="display: block;float:left; width: 12px;height: 12px;overflow:hidden;vertical-align: -6px;background: url(http://images.139cm.com/subscribe/images/popular/9EC7AC8B324B431E84E113534546AE71.png) 0 -13px no-repeat;"></em>';

                }
                return html;  
            }
        },
        changeLink : function(){  //替换图片链接
            var self = this;

            var intraArea = $('.itemList', document).find("table td a").attr("yunei");
            if(intraArea){
                if(intraArea.indexOf('http') == -1){ //判断是不是域内
                    $('.itemList', document).find("table td a").removeAttr('target');
                }
                $('.itemList', document).find("table td a").attr("href",intraArea);
            } 
        },
        //获取推荐文章
        getRecommends:function(){
            var self = this;
            var requestData = {"columnId": subscribeMailData.columnId,"count":11};
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.recommend_article,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.body!=null&&result.responseData.resultCode=="0"){
                    subscribeMail.recommend.recommendRender(result.responseData.body.list);
                }else{
                    if(console){console.log("query recommendArticle fail.")}
                }
            });
        },
        //获得推荐栏目
        getRecommendColumn: function(){

            var self = this;
            var requestData = {
                "columnId": subscribeMailData.columnId,
                "contentType": 1,
                "size":1,
                "feeModel":0
               };
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.recommend_column,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.body!=null&&result.responseData.resultCode=="0"){
                    subscribeMail.recommend.recommendColumnRender(result.responseData.body.list);
                }else{
                    if(console){console.log("query recommendColumn fail.")}
                }
            });
        },

        //获取推荐杂志
        getRecommendMagazines:function(){
            var self = this;

            var requestData = {
                "contentType": "1",
                "magazine": "1",
                "categoryId": subscribeMail.recommend.categoryId,
                "sortType": 0,
                "paging": {
                    "currentPageNum": 1,
                    "perPageCount": 2
                }};
            var httpClient = subscribeMail.createHttpClient();
            httpClient.request({
                method: "post",
                url: subscribeMail.requestUrls.recommend_magazine,
                data: requestData
            }, function (result) {
                if(result.responseData!=null&&result.responseData.body!=null&&result.responseData.resultCode=="0"){
                    var list = result.responseData.body.readList || [];
                    if(list.length < 1){  //如果该分类下没有栏目则查询全部分类
                        subscribeMail.recommend.categoryId = "";
                        subscribeMail.recommend.getRecommendMagazines();
                    }else if(list.length == 1){
                        subscribeMail.recommend.saveMagazineList = list;

                        subscribeMail.recommend.categoryId = "";
                        subscribeMail.recommend.getRecommendMagazines();
                    }else{
                        if(subscribeMail.recommend.saveMagazineList.length == 1){
                            for(var i = 0; i < list.length; i++){
                                if(subscribeMail.recommend.saveMagazineList[0].columnId != list[i].columnId){
                                    subscribeMail.recommend.saveMagazineList = subscribeMail.recommend.saveMagazineList.concat(list[i]);
                                    break;
                                }
                            }
                        }else{
                            subscribeMail.recommend.saveMagazineList = list;
                        }
                        subscribeMail.recommend.recommendMagazineRender(subscribeMail.recommend.saveMagazineList);
                    }
                }else{
                    if(console){console.log("query recommendMagazine fail.")}
                }
            });
        },
        //获取广告数据
        getAdData: function(){
            top.M139.RichMail.API.call("unified:getUnifiedPositionContent", { positionCodes: "web_144" }, function (response) {
                if(response.responseData.code && response.responseData.code == "S_OK") {
                    var dataContent = top.$T.Html.decode(response.responseData["var"]["web_144"][0].content);
                    dataContent = dataContent.replace("$sid", (subscribeMailData.sid || ""));
                    $("#subscribeAdContainer", document).html(dataContent); 
                }
            });
        },

        bindRecommendArticleEvent: function(){
            $("#recommendArticle",document).click(function(event){
                var target = $(event.target);
                var trTag = target.closest('tr');
                var columnId = trTag.attr("cid");
                var serialId = trTag.attr("serialid");
                if(columnId && serialId){
                    top.$App.show('googSubscription', {"mtype": 27, "cid": columnId, "serialId": serialId});
                }
            });
            $('#rightArticleRecommend',document).on('click','a.articleTitle',function(event){

                var target = $(event.target);
                var liTag = target.closest('li');
                var columnId = liTag.attr("data-cid");
                var serialId = liTag.attr("data-serialid");
                if(columnId && serialId){
                    top.$App.show('googSubscription', {"mtype": 27, "cid": columnId, "serialId": serialId});
                }
            //点击图标
            }).on('click','img.artImage',function(){
                var target = $(event.target);
                var liTag = target.closest('li');
                var columnId = liTag.attr("data-cid");
                var serialId = liTag.attr("data-serialid");
                if(columnId && serialId){
                    top.$App.show('googSubscription', {"mtype": 27, "cid": columnId, "serialId": serialId});
                }
            });
        },
        bindRecommendMagazineEvent: function(){
            $("#recommendMagazine > tr",document).click(function(event){
                // var target = $(event.target);
                var columnId = $(this).attr("cid");
                if(columnId){
                    top.$App.show('googSubscription', {"cid": columnId});
                }
            });
        },
        bindRightColumnRecommendEvent: function(event){

            $('#recommendColumn',document).find('a.orderColumn').click(function(){

                var $this = $(this);
                var columnId = $this.attr('data-columnId');
                top.$App.show('googSubscription', {"cid": columnId});
            });
        },
        recommendRender: function(list){

            var self = this;
            var len = list.length;
            if(len > 0){
                if(len > 6){ 
                //底部的文章推荐
                var bottomList = list.slice(0, 6);
                    var repeater = new top.Repeater(subscribeMail.htmlTemplate.recommendArticleTemplate);
                    repeater.Functions = subscribeMail.recommend.renderArticleListFunctions;
                    var html = repeater.DataBind(bottomList);
                    $("#recommendArticle", document).html(html);
                //右侧的文章推荐
                    var rightList = list.slice(6,11);
                    var repeater = new top.Repeater(subscribeMail.htmlTemplate.rightArticleRecommend);
                    repeater.Functions = subscribeMail.recommend.renderRArticleFunctions;
                    var html = repeater.DataBind(rightList);
                    $("#rightRecommend", document).append(html);
                }
                var mailType = top.$App.getLayout();
                if(!(mailType=="left")){
                   $("#recommendColumn", document).show();
                   $("#rightArticleRecommend", document).show();

                }
                subscribeMail.recommend.bindRecommendArticleEvent();
            }
            setTimeout(function(){
                top.$App.trigger('mailResize',{mid:subscribeMailData.mid});
            },"500");
         },
         recommendMagazineRender: function(magzineList){
            var self = this;

            var len = magzineList.length;

            if(len > 2){  //截取2个
                magzineList = magzineList.slice(0, 2);
            }

            var repeater = new top.Repeater(subscribeMail.htmlTemplate.recommendMagazineTemplate);
            repeater.Functions = subscribeMail.recommend.renderMagazineFunctions;
            var html = repeater.DataBind(magzineList);
            $("#recommendMagazine", document).html(html);
            subscribeMail.recommend.bindRecommendMagazineEvent();

            setTimeout(function(){
                top.$App.trigger('mailResize',{mid : subscribeMailData.mid});
            },"500");
         },
        //右侧栏目推荐
        recommendColumnRender: function(columnInfo){

            var self = this;
            var repeater = new top.Repeater(subscribeMail.htmlTemplate.rightcolumnsRecommend);
            repeater.Functions = subscribeMail.recommend.renderRColumnFunctions;
            var html = repeater.DataBind(columnInfo);
            $("#rightRecommend", document).append(html);
            subscribeMail.recommend.bindRightColumnRecommendEvent();
        }
     }
};

$(document).ready(function(){
    //是否是新模块，
    //旧模板邮件调用m2012.readmail.subscribeaction_old.js
   
    if(!praClassLength || praClassLength < 1) {
        console.log('load reamil subscribeaction_old');
        var script = document.createElement('script');
        script.src = "/mpost2014/js/mpost/mail/m2012.readmail.subscribeaction_old.js";
        script.type = "text/javascript";
        document.body.appendChild(script);
        return false;
    }
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    };

    $.postJSON = function(url, data, callback) {
        return $.post(url, data, callback, 'json');
    };    

    $(".allTextClick", document).attr("href", "javascript:void(0);");
    //点击标题，展开按钮 显示文章详情事件
    $('.item_title_down,.allTextClick',document).off().click(function() {

        var id = $(this).attr('param');
        $(".rightMenuClass.item_title_down",document).css("background","");
        if($(this).hasClass("rightMenuClass")){
            $(this).css("background","none repeat scroll 0 0 #E8F1F9").css("display","block");
        }
        itemExpand(id);
        var $closestItem = $(this).closest('.item');
        var $showItem = $closestItem.find('.allTextClick');
            $closestItem.find(".allTextClick").hide();
            $closestItem.find("span.closeContent a").show();
            $closestItem.find("div.openup_department").show();
        $("#itemNameId_"+id,document).css("color","#999").parent().parent().css("color","#999");
        top.BH('mpost_submail_detail');
        return false;
    });
    //收起全文按钮事件
    $('.closeContent',document).click(function() {
        var id = $(this).attr('param');
        itemClose(id);      
        var $closestItem = $(this).closest('.item');    
        $closestItem.find("span.closeContent a").hide();
        $closestItem.find(".allTextClick").show();
        $closestItem.find("div.openup_department").hide();
        return false;
    });
    var itemExpand = function(id) {

        top.M2012.History.addBehavior({name: 'subscribe_mid_' + subscribeMailData.mid + '_cid_' + subscribeMailData.columnId + '_serialid_' + id});
         
        //获取评论数
        subscribeMail.share.getCommentCount({"itemId": id, "commentType": "2"});
        //获取用户收藏状态
        subscribeMail.share.getUserFavStats({itemId:id,flag:0});
        //替换曝光图片sid
        var images = $('#item_content_text_' + id,document).find('img');
        var imgLen = images.length;

        for(var i=0; i<imgLen; i++) {
            var src = images[i].src
            if(src.indexOf('user:logBehaviorAction') > -1) { //日志上报链接
                images[i].src = src.replace('$sid',top.sid);
            }
        }
       console.log('start itemExpand...')
        if($('#itemcontent_' + id,document).css("display")=="block"){
            $(window.parent.document).find(".toolBar:last").next(".J-readMailArea").scrollTop($("#itemcontent_"+id,document).offset().top + 120);
            return;
        }else{
            $(window.parent.document).find(".toolBar:last").next(".J-readMailArea").scrollTop($("#itemdigest_"+id,document).offset().top + 120);
        }
        $('#itemdigest_' + id,document).hide();
        $(frameElement).attr('scrolling','no');
        $('#itemcontent_' + id,document).show();
        frameElement.style.height = document.body.scrollHeight + 30 + "px";
        $(window.parent.document).find('#articlesFrame').height($("body",document).height()+ 30);
        setTimeout(function(){  //显示评论
            $("span.commentClass[itemid='"+id+"']",document).click();
        },1500);
        var columnId = $("#itemcontent_" + id,document).attr("paramColumnId");
        top.addBehaviorExt({actionId:100877,moduleId:14,thingId:columnId});
        top.$App.trigger('mailResize',{mid:top.$App.getCurrMailMid()});       
    };

    var itemClose = function(id) {
        $(window.parent.document).find(".inboxflOff[style!='display: none;']").find(".inboxfl").scrollTop($("#itemcontent_"+id,document).offset().top+100);
        // $(top.$App.getCurrentTab().element).find("#covMailSummaryList").animate({scrollTop:$("#itemcontent_" + id,document).offset().top-$("#itemdigest_"+ id,document).offset().top - 10},1000);  //定位到当前邮件的位置
        $('#itemcontent_' + id,document).hide();
        $('#itemdigest_' + id,document).show();
        frameElement.style.height = $("#contentDiv",document).height()+20+"px";
        $(window.parent.document).find('#articlesFrame').height($("body",document).height()+ 20);
        top.$App.trigger('mailResize',{mid:top.$App.getCurrMailMid()});
    };

    //绑定分享事件
    subscribeMail.share.bindMailShareEvent();
    //显示app展示提示语
    subscribeMail.app.showAppSpan();
    //绑定跳转到详情页面事件
    subscribeMail.gotoColumnDetail();
    //绑定单篇文章阅读事件
    subscribeMail.bindReadItem();
    
    //加载推荐数据
    $("#recomandid",document).html(subscribeMail.htmlTemplate.recommendMainTemplate);
    $("#recomandid",document).show();
    if($("body",document).attr('data-v') == '1.0.0'){//新版
        $("body",document).append('<div id="rightRecommend" style="position: absolute;top: 8px;left: 725px;right: auto; z-index: 999; width: 290px;background-color: transparent;font-family:\'Microsoft YaHei\';"></div>');
    }
    subscribeMail.recommend.getRecommendColumn();
    subscribeMail.recommend.getRecommends();
    subscribeMail.recommend.getRecommendMagazines();
    subscribeMail.recommend.getAdData();
    //改变推荐的链接
    subscribeMail.recommend.changeLink();
    //绑定退订事件
    subscribeMail.bindUnSubEvent();
    
    frameElement.style.height = $("#contentDiv",document).height()+20+"px";
    $(window.parent.document).find('#articlesFrame').height($("body",document).height()+ 20);

    $(document).click(function(){
        subscribeMail.share.removeTips();
    });

    try{
        $("#subscribeButtonId",document).prev().children("a").removeAttr("href").removeAttr("target");
        $("h3 a",document).removeAttr("href").removeAttr("target");
        $("a[id*='item_content_title']",document).removeAttr("href").removeAttr("target");
    }catch(e){}

    //初始化播放器
    initPlayer();

    //默认打开第一篇文章 多列表有用，单文无用
    $(".item",document).first().find(".item_title_down",document).click();
    
    //单文情况
    var items = document.getElementsByClassName('item');
    if(items.length ==1) { //单文情况
        setTimeout(function(){
            $("span.commentClass",document).click();
        },1500)
        // //替换曝光图片sid
        // var images = $('a',document).find('img');
        // var imgLen = images.length;       
        // for(var i=0; i<imgLen; i++) {
        //     var src = images[i].src
        //     if(src.indexOf('user:logBehaviorAction') > -1) { //日志上报链接
        //         images[i].src = src.replace('$sid',top.sid);
        //     }
        // }
    }    
});

/**
 * 多媒体播放器
 */
function initPlayer(){
    //多媒体邮件中播放器
    var multiType = $('#multiType',document).val();
    //1:音频;2:视频
    if(multiType==2) {
        var height = 300;
        var width =400;
        var jPlayer =$("#playerFrame",document);
        var playerPath =$("#playerSource",document).val(); 
        var playerVideoSource = [
                    {type : "video/mp4", src : "http://images.139cm.com/subscribe/"+playerPath}
                ];
        var mp = new M139.Component.MediaPlayer.Player({
                        type: "video",
                        sources: playerVideoSource,
                        poster: "oceans-clip.png",
                        height: height,
                        width: width,
                        preload: false,
                        autoplay: false,
                        container:  jPlayer[0],
                        basePath: "http://image0.139cm.com/m2012/component/mediaplayer/"
                    });
        jPlayer.show();
    }else if(multiType==1){
        var height = 60;
        var width =340;
        var jPlayer =$("#playerFrame", document);
        var playerPath =$("#playerSource",document).val(); 
        var playerAudioSource = ["http://images.139cm.com/subscribe/"+playerPath];
        var mp = new M139.Component.MediaPlayer.Player({
                        type: "audio",
                        sources: playerAudioSource,
                        height: height,
                        width: width,
                        preload: false,
                        autoplay: false,
                        container:  jPlayer[0],
                        basePath: "http://image0.139cm.com/m2012/component/mediaplayer/"
                    });
        jPlayer.show();
    }
}

function showPop(content,offsetObj){
    if($("#noticePopId",document)){
        $("#noticePopId",document).remove();
    }
    var html = '<div style="background: none repeat scroll 0 0 #E5E5E5;height: 40px;margin: 80px;width: 105px; position: absolute; top:'+(offsetObj.top-125)+'px;left:'+(offsetObj.left-80)+'px;" id="noticePopId">'+
                '<span style="width:105px;background: none repeat scroll 0 0 #FFFFFF;border: 1px solid #CCCCCC;height: 40px;left: -84px;margin: 80px;position: absolute;top: -84px; z-index: 10;">'+
                '<i style="background: url(&quot;http://images.139cm.com/subscribe/images/subscribe.gif&quot;) no-repeat scroll -163px -50px transparent;height: 16px;left: 12px;position: absolute;top: 12px;width: 16px;"></i>'+
                '<em id="popConentId" style="left: 32px;position: absolute;top: 12px;font-size: 12px;">'+content+'</em>'+
                '<i style="background: url(&quot;http://images.139cm.com/subscribe/images/subscribe.gif&quot;) no-repeat scroll -94px -96px transparent;height: 10px;left: 40px;position: absolute;top: 40px;width: 15px;"></i>'+
                '</span>'+
                '</div>';

    $("body",document).append(html);
    $("#noticePopId",document).fadeIn(function(){
        setTimeout(function(){
            $("#noticePopId",document).fadeOut("slow");
        },"1000");
    });
    return false;
}

/**
 * 重新设置iframe高度
 */
function resetIframeHeight(obj){
    top.$App.trigger('mailResize',{mid:top.$App.getCurrMailMid()});    
}

/**
 * 显示订阅提示
 */
function showSubscribeNotice(columnName,price){
    var html =  "<div>\n" +
        "<i></i>\n" +
        "<h4 id=\"SubStr\" style=\"color:#FF0000\">请通过手机短信确认订阅！</h4>\n" +
        "<p id=\"AlertStr\" style=\"line-height:22px;\">您已申请订阅<strong style=\"font-weight:bold;\">《"+columnName+"》，资费："+price+"</strong>。我们已将确认订阅短信发送到您的<strong style=\"font-weight:bold;\">手机，请回复 Y </strong>确认并完成订阅。</p>\n" +
        "\t<p  style=\"line-height:22px;\">订阅成功后根据您的<strong style=\"font-weight:bold;\">投递设置</strong>，我们将发送您所订阅的杂志到<strong style=\"font-weight:bold;\">“我的订阅”</strong>文件夹。请注意查收。</p>\n" +
        "<p id=\"bntView\"  style=\"line-height:22px;\">\n" +
        "\t<a style=\"text-decoration: none;margin: 10px auto;width: 84px;font: bold 14px/33px 'simsun';background-image:url('http://homemail.mail.10086.cn/Template/images/btnAll.gif'); background-position: -400px 0;color: white;text-shadow: 1px 1px;position: relative;display:block;text-align:center;\" href=\"javascript:top.FF.close();\" id=\"closePage\">确定</a>\n" +
        "\t</p>\n" +
        "<p id=\"P1\"  style=\"line-height:22px;\"><span class=\"STYLE1\"><b>温馨提示：</b></span></p>\n" +
        "<p style=\"line-height:22px;\">您可以在<strong style=\"font-weight:bold;\">“订阅管理”</strong> 中管理所有订阅的杂志期刊。</p></p>\n" +
        "</div>";
    //top.$Msg.show(html,"精品订阅",480);
      top.$Msg.showHTML(html,{
                width:480,
                dialogTitle:'云邮局',
                buttons:["确定"]
            }); 
}

/**
 *
 */
function showUnsubscribeNotice(columnName,price){
    var html = "<div>\n" +
        "<i></i>\n" +
        "<h4 id=\"SubStr\" style=\"color:#FF0000\">请通过手机短信确认订阅！</h4>\n" +
        "<p id=\"AlertStr\" style=\"line-height:22px;\">您已申请退订<strong style=\"font-weight:bold;\">《"+columnName+"》，资费："+price+"</strong>。我们将退订短信发送到您的<strong style=\"font-weight:bold;\">手机，请回复 TD </strong>并确认完成退订。</p\n" +
        "\t<p id=\"bntView\"  style=\"line-height:22px;\">\n" +
        "\t<a style=\"text-decoration: none;margin: 10px auto;width: 84px;font: bold 14px/33px 'simsun';background-image:url('http://homemail.mail.10086.cn/Template/images/btnAll.gif'); background-position: -400px 0;color: white;text-shadow: 1px 1px;position: relative;display:block;text-align:center;\" href=\"javascript:top.FF.close();\" id=\"closePage\">确定</a>\n" +
        "\t</p>\n" +
        "</div>";
    //top.FF.show(html,"精品订阅",480);
    top.$Msg.showHTML(html,{
                width:480,
                dialogTitle:'云邮局',
                buttons:["确定"]
            }); 
}

//阅读杂志
function readMagazine(param,columnId,columnName) {
    var journalId = "";
    try{
        if(param){
            journalId=param.split("&")[0].split("=")[1];        
        }
        var jsUrl = top.m2012ResourceDomain + "/mpost2014/js/packs/mpostreader.pack.js?v="+top.sid;
        var cssUrl = top.m2012ResourceDomain + "/mpost2014/css/module/picture.css?v="+top.sid;
        if($("#subscribeReaderCss",top.document).length<1){
            top.$("head").append('<link id="subscribeReaderCss" rel="stylesheet" href="'+cssUrl+'" type="text/css">');
        }
        top.M139.core.utilCreateScriptTag({
            id: "subscribeReaderJs",
            src: jsUrl,
            charset: "utf-8"
        }, function(){
            try{
                $subscribeReaderApp = new top.M2012.Subscribe.Reader.Application({journalId : journalId,resourcePath:requestPath});
                $subscribeReaderApp.run();
            }catch(e){
                top.$App.showUrl(requestPath+'reader/index.action?'+param,columnName);
            }
        });
    }catch(e){
        top.$App.showUrl(requestPath+'reader/index.action?'+param,columnName);
    }
}

//杂志阅读
function readM(columnId,columnName){
    var jsUrl = top.m2012ResourceDomain + "/mpost2014/js/packs/mpostreader.pack.js?v="+top.sid;
    var cssUrl = top.m2012ResourceDomain + "/mpost2014/css/module/picture.css?v="+top.sid;
    if($("#subscribeReaderCss",top.document).length<1){
        top.$("head").append('<link id="subscribeReaderCss" rel="stylesheet" href="'+cssUrl+'" type="text/css">');
    }
    top.M139.core.utilCreateScriptTag({
        id: "subscribeReaderJs",
        src: jsUrl,
        charset: "utf-8"
    }, function(){
        try{
            $subscribeReaderApp = new top.M2012.Subscribe.Reader.Application({columnId : columnId,resourcePath:requestPath});
            $subscribeReaderApp.run();
        }catch(e){
            top.$App.showUrl(requestPath+'reader/index.action?c='+columnId,columnName);
        }
    });
}

//阅读邮件
function readR(){
    top.$App.showMailbox(9);
}

function bingRecommendEvent(){
    /**推荐相关事件绑定**/
    $('.subClass',document).click(function(){
        var param = $(this).attr("param");
        var paramArray = param.split('|');
        var id = paramArray[0];
        var offsetObj = $(this).offset();
        var timestamp = new Date().getTime();
        var url = requestPath+ 'subscribe.action';
        $.post(url,{columnId:id,subComeFrom:502,recommend:'email',sid:getSid(),t:timestamp},function(data){
            if(data.resultCode=="10"){
                $('#noSubscribeClass_'+id,document).hide();
                $('#subscribeClass_'+id,document).show();
                $(".subPic_"+id,document).show();
                offsetObj.left = offsetObj.left-30;
                showPop("订阅成功",offsetObj);
            }else if(data.resultCode=="11"){
                var columnName = paramArray[1];
                var price = paramArray[2];
                showSubscribeNotice(columnName,price);
            }else{
                top.$Msg.alert("订阅失败，请重试！");
            }
        },'json');
    });
    $('.delSubClass').click(function(){
        var param = $(this).attr("param");
        var paramArray = param.split('|');
        var id = paramArray[0];
        var offsetObj = $(this).offset();
        var timestamp = new Date().getTime();
        var url = requestPath+ 'del_subscribe.action';
        $.post(url,{columnId:id,subComeFrom:502,recommend:'email',sid:getSid(),t:timestamp},function(data){
            if(data.resultCode=="20"){
                $('#noSubscribeClass_'+id,document).show();
                $('#subscribeClass_'+id,document).hide();
                $(".subPic_"+id,document).hide();
                offsetObj.left = offsetObj.left-81;
                showPop("退订成功",offsetObj);
            }else if(data.resultCode=="21"){
                var columnName = paramArray[1];
                var price = paramArray[2];
                showUnsubscribeNotice(columnName,price);
            }else{
                top.$Msg.alert('退订失败!');
            }
        },'json');
    });

    $('.showIndex',document).click(function(){
        top.Links.show('dingyuezhongxin');
    });
}


function bingRecommendMail(){
    
    $('.recommendSubClass',document).click(function(){
        var param = $(this).attr("param");
        var paramArray = param.split('|');
        var id = paramArray[0];
        var offsetObj = $(this).offset();
        var timestamp = new Date().getTime();
        var url = requestPath+ 'subscribe.action';
        $.post(url,{columnId:id,subComeFrom:502,recommend:'email',sid:getSid(),t:timestamp},function(data){
            if(data.resultCode=="10"){
                $('#recommendNoSubscribeClass_'+id,document).hide();
                $('#recommendSubscribeClass_'+id,document).show();
                offsetObj.left = offsetObj.left-30;
                showPop("订阅成功",offsetObj);
            }else if(data.resultCode=="11"){
                var columnName = paramArray[1];
                var price = paramArray[2];
                showSubscribeNotice(columnName,price);
            }else{
                top.FF.alert("订阅失败，请重试！");
            }
        },'json');
        top.addBehaviorExt({actionId:104038,moduleId:14,thingId:id,ext1:6});
    });
    $('.recommendDelSubClass',document).click(function(){
        var param = $(this).attr("param");
        var paramArray = param.split('|');
        var id = paramArray[0];
        var offsetObj = $(this).offset();
        var timestamp = new Date().getTime();
        var url = requestPath+ 'del_subscribe.action';
        $.post(url,{columnId:id,subComeFrom:502,recommend:'email',sid:getSid(),t:timestamp},function(data){
            if(data.resultCode=="20"){
                    $('#recommendNoSubscribeClass_'+id,document).show();
                    $('#recommendSubscribeClass_'+id,document).hide();
                    offsetObj.left = offsetObj.left-81;
                    showPop("退订成功",offsetObj);
                }else if(data.resultCode=="21"){
                    var columnName = paramArray[1];
                    var price = paramArray[2];
                    showUnsubscribeNotice(columnName,price);
                }else{
                    top.FF.alert('退订失败!');
                }
        },'json');
        });
}
function bingRecomendRead(){
        /*点击阅读*/
        $(".recommendReadClass",document).click(function(){
            var value = $(this).attr('param');
            var columnID = $(this).attr("columnID");
            var columnName = $(this).attr("columnName");
            if(value == 1){
                readM(columnID,columnName);
            }else{
                readR();
            }
        });
        $(".myRecommendSubscribeId",document).click(function(){
            var id = $(this).attr('param');
            top.addBehaviorExt({actionId:104038,moduleId:25,ext1:id});
            readR();
        });
}
function bingRecomendBehavior(){
        
        $(".recommendFeedBackId",document).click(function(){
            var id = $(this).attr('param');
            top.addBehaviorExt({actionId:104038,moduleId:25,ext1:id});
        });
        $(".recommendCategoryId",document).click(function(){
            var id = $(this).attr('param');
            top.addBehaviorExt({actionId:104038,moduleId:25,ext1:5});
        });
        $(".recommendColumnDetailId",document).click(function(){
            var id = $(this).attr('param');
            top.addBehaviorExt({actionId:104038,moduleId:25,ext1:4});
        });
}
function isColumnSubscribed(){
        var count = 0;
        var id;
        var url = requestPath + 'column_is_subscribed.action';
        $('.recommendSubClass',document).each(function(){
            var param = $(this).attr("param").split("|");
            if(count ==0){
                id =param[0];
                count++;
            }else{
                id = id +"|" + param[0];
            }
        });
        $.post(url,{'columnID':id},function(data){  
                var d = data.result.split("|");
                var columnid = id.split("|");
                for( i=0;i<d.length;i++){
                    if(d[i] == "isSub"){
                    $('#recommendNoSubscribeClass_'+columnid[i],document).hide();
                    $('#recommendSubscribeClass_'+columnid[i],document).show();
                    }
                }
             },'json');
}

function formatData(data){
    var num = Number(data);
    if(num){
        if(num < 10000){
            return num;
        }else if(num >= 10000 && num < 100000000){  //万
            return parseInt(num/10000) + "万";
        }else if(num >= 100000000){
            return parseInt(num/100000000) + "亿";
        }
    }else{
        return data;
    }
}

$(document).ready(function(){ 
     
    $("#mpostappid",document).click(function(){
        top.addBehaviorExt({actionId:104912,moduleId:14,ext1:id});
    });

    var pageType = $('#pageType',document);
    
    if(pageType[0]&&pageType.text()=='magazine'){
        $(".readerLink",document).removeAttr("href");
        $(".readerLink",document).click(function(){
            readMagazine($(this).attr('param'),$(this).attr('columnId'),$(this).attr('columnName'));
        });
        $(".readerLink[name='operate_read']", document).next('a').on("click", function(e){
            var target = $(e.target.parentNode);
            var columnId = target.attr('cid');
            subscribeMail.core.getColumnDetail({
                "columnId": columnId, 
                "success": function(result){
                    if(result.sub){
                        subscribeMail.core.delSubscribe({"column": result});
                    }else{
                        top.M139.UI.TipMessage.show('已退订过此栏目',{delay : 1000});
                    }
                },
                "error": function(result){
                    console.log(result);
                }
            });
        });
    }else if(pageType[0]&&pageType.text()=='mailrecommend'){
        
        isColumnSubscribed();
        bingRecommendMail();
        bingRecomendRead();
        bingRecomendBehavior();
        
        var posturl = requestPath+ 'mail_unsubcribe.action';
        $.post(posturl,{'status':'1','flag':'20001'},function(data){
            if(data.result == "true"){
                $(".unSubscribeMailId",document).html("已退订");
                $(".unSubscribeMailId",document).unbind("click");
            }
        },"json");

        $(".unSubscribeMailId",document).click(function(){
            var id = $(this).attr('param');
            var offsetObj = $(this).offset();
            var url = requestPath +'mail_unsubcribe.action';
            $.post(url,{'status':'0','flag':'20001'},function(data){
                if(data.result == "success"){
                    $(".unSubscribeMailId",document).html("已退订");
                    $(".unSubscribeMailId",document).unbind("click");
                }else if(data == "failed"){
                    top.FF.alert('退订失败!');
                }else{
                    top.FF.alert('错误的请求');
                }
            },'json');
            top.addBehaviorExt({actionId:104038,moduleId:14,ext1:id});
        });
    }else if(pageType[0]&&pageType.text()=='mailoperate'){
        $("a.a2",document).removeAttr("href");
        $(".recommendSubClass",document).removeAttr("href");
        var count = 0;
        var id;
        var url = requestPath + 'column_is_subscribed.action';
        $('.recommendSubClass',document).each(function(){
            var param = $(this).attr("param").split("|");
            if(count ==0){
                id =param[0];
                count++;
            }else{
                id = id +"|" + param[0];
            }
        });
        $.post(url,{'columnID':id},function(data){  
                var d = data.result.split("|");
                var columnid = id.split("|");
                for( i=0;i<d.length;i++){
                    if(d[i] == "isSub"){
                    $('.recommendNoSubscribeClass_'+columnid[i],document).hide();
                    $('.recommendSubscribeClass_'+columnid[i],document).show();
                    }
                }
             },'json');
        $('.recommendSubClass',document).click(function(){
            var param = $(this).attr("param");
            var paramArray = param.split('|');
            var id = paramArray[0];
            var timestamp = new Date().getTime();
            var url = requestPath+ 'subscribe.action';
            $.post(url,{columnId:id,subComeFrom:502,recommend:'email',sid:getSid(),t:timestamp},function(data){
                if(data.resultCode=="10"){
                    $('.recommendNoSubscribeClass_'+id,document).hide();
                    $('.recommendSubscribeClass_'+id,document).show();
                    $("#mpostsubid",document).hide();
                    $("#mpostredid",document).show();
                }else if(data.resultCode=="11"){
                    var columnName = paramArray[1];
                    var price = paramArray[2];
                    showSubscribeNotice(columnName,price);
                }else{
                    top.FF.alert("订阅失败，请重试！");
                }
            },'json');
            top.addBehaviorExt({actionId:104038,moduleId:14,thingId:id,ext1:6});
        });
    $('.recommendDelSubClass',document).click(function(){
        var param = $(this).attr("param");
        var paramArray = param.split('|');
        var id = paramArray[0];
        var timestamp = new Date().getTime();
        var url = requestPath+ 'del_subscribe.action';
        $.post(url,{columnId:id,subComeFrom:502,recommend:'email',sid:getSid(),t:timestamp},function(data){
            if(data.resultCode=="20"){
                    $('.recommendNoSubscribeClass_'+id,document).show();
                    $('.recommendSubscribeClass_'+id,document).hide();
                }else if(data.resultCode=="21"){
                    var columnName = paramArray[1];
                    var price = paramArray[2];
                    showUnsubscribeNotice(columnName,price);
                }else{
                    top.FF.alert('退订失败!');
                }
        },'json');
        });
        bingRecomendRead();
    }
});

function getDateStr(dateParam) {
    var date = null;
    if(typeof dateParam === "string"){
        date = $Date.parse(dateParam);
    }else if(typeof dateParam === "number"){
        date = new Date(Number(dateParam) * 1000);
    }else if(dateParam instanceof Date){
        date = dateParam;
    }else{
        return '';
    }

    var now = new Date();
    var nowObj = {
        times: now.getTime(),
        years: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
        hour: now.getHours(),
        minutes: now.getMinutes()
    };
    var result = '';
    var t = nowObj.times - date.getTime();  //相差毫秒
    if (t < 0) {
        result = $Date.format("yyyy-M-dd(w) hh:mm", date);
    }else if (date.getFullYear() == nowObj.years && date.getMonth() == nowObj.month && date.getDate() == nowObj.date) {
        var minutes = Math.round(t / 1000 / 60);
        if (minutes < 0) { minutes = 0; }
        if (minutes >= 0 && minutes < 60) {
            result = minutes + "分钟前";
        } else {
            result = Math.floor(minutes / 60) + "小时前";
        }
    } else if (date.getFullYear() == nowObj.years) {
        result = $Date.format("M-dd(w) hh:mm", date);
    } else {
        result = $Date.format("yyyy-M-dd(w)", date);
    }
    return result;
};

var Comment = (function(){  //container是原生element，不是jq对象  
    function Comment(itemObj,container){
        var self = this;
        this.commentType = itemObj.commentType;  //判断阅读号类型，2: rss文章，3: 杂志
        this.currentPageNum = 1;
        this.perPageCount = 10;
        if(this.commentType == "3"){  //杂志类型
            this.serialId = itemObj.journalSid;
        }else{
            this.serialId = itemObj.itemId;
        }
        this.postTitle = itemObj.title;
        var options = {
            "success": function(result){
                self.render(result,container);
                self.renderComment(result,container);
                self.initEvents(container);
            }
        };
        this.getCommentData(options);
    }

    Comment.prototype.postCommentApi = function(options){
        var self = this;
        var httpClient = subscribeMail.createHttpClient();
        httpClient.request({
             method: "post",
             url: requestPath + "bis/addComment?sid=" + top.$App.getSid(),
             data: {
                "dependId": self.serialId,
                "commentType": this.commentType || "2",
                "content": options.content,
                "dependTitle": self.postTitle
            }
        }, function (result) {
            var responseData = result && result.responseData;
            if (responseData && responseData.resultCode === "0") {
                options.success(responseData);
            } else {
                top.M139.UI.TipMessage.show(responseData.description,{delay : 1000, className : 'msgRed'});
                options.fail && options.fail(responseData);
            }
        });
    }

    Comment.prototype.getCommentData = function(options){
        var self = this;
        var httpClient = subscribeMail.createHttpClient();
        httpClient.request({
             method: "post",
             url: requestPath + "bis/commentList?sid=" + top.$App.getSid(),
             data: {
                "dependId": self.serialId,
                "commentType": this.commentType || "2",  //文章类型
                "paging": {
                    "currentPageNum": self.currentPageNum,
                    "perPageCount": self.perPageCount
                }
             }
        }, function (result) {
            var responseData = result && result.responseData;
            if (responseData && responseData.resultCode === "0") {
                options.success(responseData);
                subscribeMail.share.getCommentCount({"itemId":self.serialId, "commentType": "2"});
            } else {
                top.M139.UI.TipMessage.show(responseData.description,{delay : 1000, className : 'msgRed'});
                options.fail && options.fail(responseData);
            }
        });
    }

    Comment.prototype.initEvents = function(container){
        var self = this;
        $('#allComment',container).on("click", function(e){
            var target = e.target;
            var targetName = target.getAttribute("name");
            
            if(targetName === "cancle"){  //隐藏评论区
                $('#allComment',container).hide();
                frameElement.style.height = $("#contentDiv",document).height()+20+"px";
                resetIframeHeight();
            }else if(targetName === "replay"){  //发表
                var content = $('#commentContent',container)[0].value;
                if(!content){
                    top.M139.UI.TipMessage.show('请输入内容',{delay : 1000});
                    return;
                }
                var options = {
                    "content": content,
                    "success": function(result){
                        self.currentPageNum = 1;
                        var options = {
                            "success": function(result){
                                $('#allComment', container).remove();
                                self.render(result,container);
                                self.renderComment(result,container);
                                self.initEvents(container);
                            }
                        }
                        self.getCommentData(options);
                    }
                };
                self.postCommentApi(options);
            }else if(targetName === "nextPageComment"){  //下一页
                if($(target).attr("hasnextpage") == "false"){
                    return false;
                }
                self.currentPageNum = self.currentPageNum + 1;
                var options = {
                    "success": function(result){
                        self.renderComment(result,container);
                        var paging = result.body.paging;
                        var nextCount = paging.totalCount - (paging.currentPageNum * paging.perPageCount);
                    }
                }
                self.getCommentData(options);
            }else if(targetName === "prePageComment"){  //上一页
                if($(target).attr("hasprepage") == "false"){
                    return false;
                }
                self.currentPageNum = self.currentPageNum - 1;
                var options = {
                    "success": function(result){
                        self.renderComment(result,container);
                    }
                }
                self.getCommentData(options);
            }
        });
        //控制字数少于255
        $('#commentContent',container).on("keyup", function(){
            var commentValue = $('#commentContent',container)[0].value;
            if(commentValue.length >= 255){
                $('#commentContent',container)[0].value = commentValue.slice(0,255);
                $('#restLength',container).html("0");
            }else{
                $('#restLength',container).html( 255 - commentValue.length);
            }
        });
    }

    Comment.prototype.render = function(result,container){
        var template = [
        '<form method="post">',
            '<div style="  padding: 5px;border: 1px solid #e8e8e8;_zoom: 1;background: #fff;">',
            '<textarea id="commentContent" class="commentArea" maxlength="255" style="  resize: none;width: 100%;height: 70px;font-size: 14px;border: 0;outline: none;line-height: 25px;overflow-x: hidden;overflow-y: auto;" placeholder="发表评论后，需后台审核才可在评论版显示评论"></textarea></div>',
            '<div style="  padding-top: 7px;padding-bottom: 10px;height:30px;">',
             '<span style="  float: right;display: inline;">',
                 '<a href="javascript:void(0);" role="button" hidefocus="true" name="operate_summary" style="  display: inline-block;height: 26px;font-size: 12px;color: #666;vertical-align: middle;font-style: normal;outline: none;text-decoration: none;border: 1px solid #E4E4E4;background: #F8F8F8;  margin-right: 10px;">',
                     '<span name="cancle" style="  display: inline-block;height: 26px;line-height: 28px;text-align: center;padding: 0 10px;cursor: pointer;font-style: normal;overflow: hidden;line-height: 26px;">取 消</span></a>',
                     '<a href="javascript:void(0);" role="button" hidefocus="true" name="operate_addcomment" style="display: inline-block;height: 26px;font-size: 12px;color: #666;vertical-align: middle;font-style: normal;outline: none;text-decoration: none;border: 1px solid #E4E4E4;background: #00B615;"><em name="replay" style="display: inline-block;height: 26px;line-height: 28px;text-align: center;padding: 0 10px;cursor: pointer;font-style: normal;overflow: hidden;line-height: 26px;  color: white;border-color: #00B615;background: #00B615;background: -moz-gradient(linear, 0 0, 0 100%, from(#00C417), to(#00B615));background: -webkit-gradient(linear, 0 0, 0 100%, from(#00C417), to(#00B615));background: linear-gradient(#00C417 0%,#00B615 100%);">发表</em></a></span><span style="  float: left;display: inline;color: #999 !important;">还可以输入 <strong id="restLength" name="leftwords" style="  font-weight: 400;color: #000;font-size: 20px;">255</strong> 个字</span></div></form>','<div style="display: block;" name="commentcontainer"><div style="margin-bottom: 5px;"><ul id="commentBody" name="commentlistcontainer" style="margin:0;padding:0;  border-top: 1px solid #e5e5e5;zoom: 1;"></ul></div><div style="height:40px;"><div name="pager" style="  margin: 0 20px 10px 0;text-align: right;"><div style="  margin-top: 0;  margin-left: 0;  float: right;display: inline;" id="view_0.028466259595006704"><div></div><a rel="selector" href="javascript:;" style="margin-right: 5px;float: left;color: #333;height: 21px;line-height: 21px;display: block;background-position: right -116px;padding-right: 15px;cursor: pointer;text-decoration: none;"><span id="pageInfo" style="  padding-left: 5px;">1/1</span></a><a name="prePageComment" rel="prev" title="上一页" href="javascript:;" style=" background: url(http://images.139cm.com/m2012/images/global/global_24.png) no-repeat;','_background: url(http://images.139cm.com/m2012/images/global/global.png) no-repeat;display: inline-block;  vertical-align: baseline;  width: 28px;height: 20px;overflow: hidden; float: left;  margin-right: 5px;  background-position: -74px -84px;cursor: default;"></a><a name="nextPageComment" rel="next" title="下一页" href="javascript:;" style="  background: url(http://images.139cm.com/m2012/images/global/global_24.png) no-repeat;_background: url(http://images.139cm.com/m2012/images/global/global.png) no-repeat;display: inline-block;  vertical-align: baseline;  width: 28px;height: 20px;overflow: hidden;float: left;background-position: -102px -84px;cursor: default;"></a></div></div></div></div>'].join("");
        var paging = result.body.paging;
        var divTag = document.createElement('div');
        divTag.setAttribute("style", "margin: 30px 0 20px;_zoom: 1;background: #f8f8f8;padding: 20px 20px 0;");
        divTag.setAttribute("id", "allComment");
        divTag.innerHTML = top.$TextUtils.format(template,{
            "totalCount": paging.totalCount,
            "restCount": paging.totalCount - (paging.currentPageNum * paging.perPageCount)
        });
        container.appendChild(divTag);
    }

    Comment.prototype.renderComment = function(result,container){
        var liTemplate = ['<dl style="margin:0;padding:0;  font-size: 14px;color: #444;+float:left;"><dt style="margin:0;padding:0; " ;="">{nickName}<span style="  margin-left: 10px;color: #999;">{date}</span><span style="  margin-left: 10px;color: #999;">{commentState}</span></dt><dd style="margin:0;padding:0; ">{content}</dd></dl>'].join('');
        var list = result.body && result.body.list || [];
        var paging = result.body.paging;
        $('#pageInfo',container).html(paging.currentPageNum + "/" + paging.totalPageNum);
        if(paging.totalCount == 0) {
            $("[name='commentcontainer']",container).css('display','none');
        }
        var restCount = paging.totalCount - (paging.currentPageNum * paging.perPageCount);
        var ulTag = $('#commentBody',container)[0];
        ulTag.innerHTML = "";
        var len = list.length;
        if(len > 0){
            var styleData = "padding: 15px 0;color: #999;margin-bottom: -1px;color: gray;word-break: break-all;border-bottom: 1px dashed #e8e8e8;  border: none!important;list-style: none;width:100%;";
            for(var i = 0; i < len; i++){
                // var date = getDateStr(list[i].createDate);
                var date = top.$Date.format("yyyy-MM-dd hh:mm", new Date(list[i].createDate.replace(/-/g, "/")));
                var commentState = "";
                if(list[i].censorState < 1){
                    commentState = "您的评论正在审核中...";
                }
                var liTag = document.createElement("li");
                if(!+"\v1"){  //IE
                    //use the .cssText hack
                    liTag.style.cssText = styleData;
                } else {
                    //use the correct DOM Method
                    liTag.setAttribute("style", styleData);
                }
                
                liTag.innerHTML = top.$TextUtils.format(liTemplate, {
                    "nickName": list[i].nickName,
                    "commentState": commentState,
                    "content": list[i].content,
                    "date": date
                });
                ulTag.appendChild(liTag);
            }

            var jNextPageComment = $('a[name="nextPageComment"]',container);
            var jPrePageComment = $('a[name="prePageComment"]',container);
            if(restCount > 0){
                jNextPageComment.css("background-position","-102px -61px");
                jNextPageComment.attr("hasnextpage", "true");
            }else{
                jNextPageComment.css("background-position","-102px -84px");
                jNextPageComment.attr("hasnextpage", "false");
            }
            
            if(paging.currentPageNum < 2){
                jPrePageComment.css("background-position","-74px -84px");
                jPrePageComment.attr("hasprepage", "false");
            }else{
                jPrePageComment.css("background-position","-74px -61px");
                jPrePageComment.attr("hasprepage", "true");
            }
        }
        frameElement.style.height = $("#contentDiv",document).height()+20+"px";
        resetIframeHeight();
    }

    return Comment;
})();