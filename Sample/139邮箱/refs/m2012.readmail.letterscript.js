var LetterMessage={
    letterExistError: "通讯录已存在邮箱/手机相同的联系人",
    letterSaveSuccess:"保存成功!"
}

var mailData = top.$App.getMailDataByMid(letterInfo.omid);

var $ = jQuery = top.$;

/* 读信页面跳转处理特殊业务[没有重构的] */
/*
var jumpToKey = {
    partid:top.$User.getPartid(),
    source:'jumpto',
    mid:top.$App.getCurrMailMid()
}
*/

/* $class */
function $class(clzName, tagName){
    /**
    * 判断是否包含样式
    * pattern = .xx.yy
    */
    function IsClass(className, pattern) {
        var _reg = new RegExp('^(?=[\\s\\S]*(?:^|\\s)' + pattern + '(?:\\s|$))');
        return _reg.test(className);
    }

    var tags = [];
    if (document.getElementsByClassName) {
        tags = document.getElementsByClassName(clzName);
        for(var m=tags.length; m--;){
            tags[m].tagName != tagName && tags.splice(m,1) ;
        }
    } else {
        var temp = document.getElementsByTagName(tagName);
        for(var m=temp.length; m--;){
            if (temp[m].className && IsClass(temp[m].className, clzName)) {
                tags.push(temp[m]);
            }
        }
    }
    return tags;
}

/** addrFeed */
function addrFeed(lnks){
    $.each(lnks,function(n){
        var func = $(this).attr("rev");
        var beh = $(this).attr("rel");
        $(this).attr('href','javascript:;');
        $(this).click(function(){
            var url = ''; 
            switch(func) {
                case "PersonalCommunication":
                    top.Links.showUrl(top.getDomain("webmail") + '/userconfig/Personal/Communication.aspx?sid=' + top.$App.getSid() + '&behavior=' + beh, '个人资料');
                    break; 
                case "PersonalBaseData":
                    top.$App.show('account');
                    break;
                case "SetPrivate":
                    top.$App.show('account');
                    break;
                case "UpdateContact":
                    top.$App.show('updateContact', 'behavior=' + beh);
                    break;
                }
        });
    })
}

/** letterContentBottomLoad */
function letterContentBottomLoad() { //todo 通讯录
   
    var Links = top.Links || {};
    var Contacts = top.Contacts || {};
	var $$ = function(id){return document.getElementById(id);}
    
    //flash杂志
    if (document.getElementById("mail139command")) {
        var div = document.getElementById("mail139command");
        var url = div && div.getAttribute("rel");
        var testReg = '' || /^http:\/\/www\.dooland\.com\/magazine/i;
        if (url && testReg.test(url)) {
            parent.location.href = url;
        }
    }
    //共享通讯录
    if (/这是[\s\S]+?的通讯录/.test(subject)) {
        var fromNumber = document.getElementById("FromNumber");
        var fromUIN = document.getElementById("FromUIN");
        var btnShareInput = document.getElementById("btnshareinput");
        if (fromNumber && fromUIN && btnShareInput) {
            btnShareInput.href = "javascript:;";
            btnShareInput.onclick = function() {
                top.Links.show("shareAddrInput", "&ShareFromNumber=" + fromNumber.value + "&ShareFromUIN=" + fromUIN.value + "&email=" + escape(from), true);
                return false;
            }
        }
    } else if(document.getElementById("questionnaire")){//问卷调查
        top.M139.UI.TipMessage.show("正在加载...",{delay:3000});
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        var sid = top.sid;
        var surveyId = $($$('questionnaire')).attr('class');
        var email = top.$User.getDefaultSender();
        var qHtml = '<iframe id="question" name="question" src="'+window.location.origin+'/m2015/html/questionnaire.html?sid='+ 
        sid + '&surveyId=' + surveyId + '&email=' + email +
        '" scrolling="no" frameborder="0" style="width:100%;"></iframe>';
        $($$('questionnaire')).html(qHtml);
        setTimeout(function() {
            window.frameElement.style.height=$($$('pageLoading')).outerHeight(true)+"px";
        },500);
    } else if(document.getElementById("myVoting")){//投票调查
        top.M139.UI.TipMessage.show("正在加载...",{delay:3000});
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        var sid = top.sid,
            surveyId = $('#myVoting',document).attr('class'),
            email = top.$User.getDefaultSender(),
            phone = top.$User.getShortUid(),
            name = top.$App.getConfig("NewUserInfo") && top.$App.getConfig("NewUserInfo").AddrFirstName || '';
        var url = window.location.origin + '/m2015/html/vote/myvoting.html?sid=' + sid + '&surveyId=' + surveyId + '&email=' + email + '&phone=' + phone + '&name=' + encodeURIComponent(name);
        var qHtml = '<iframe id="question" name="question" src="'+url+
        '" scrolling="no" frameborder="0" style="width:100%;"></iframe>';
        $('#myVoting',document).html(qHtml);
        setTimeout(function() {
            window.frameElement.style.height=$('#pageLoading',document).outerHeight(true)+"px";
        },500);
    } else if (/您能把通讯录共享给我吗/.test(subject)) {
        var btnShareAddr = document.getElementById("btnshareaddr");
        var fromNumber = document.getElementById("FromNumber");
        if (btnShareAddr && fromNumber) {
            btnShareAddr.href = "javascript:;";
            btnShareAddr.onclick = function() {
                top.Links.show("shareAddr", "&email=" + fromNumber.value, true);
                return false;
            }
        }
    } else if (/的电子名片/.test(subject)) {//通讯录 电子名片
        var btnSaveBusiness = document.getElementById("btnsavebusiness");
        var businessCardInfo = document.getElementById("businesscardinfo");
        if (btnSaveBusiness && businessCardInfo && businessCardInfo.value.length > 0) {
            btnSaveBusiness.href = "javascript:;";
            btnSaveBusiness.style.display = "inline-block";
            btnSaveBusiness.onclick = function() {
                setTimeout(function() {
                    var data = top.M2012.Contacts.getModel().get("data");
                    var text = businessCardInfo.value;
                    var obj = top.$Xml.xml2object(text, { ContactDetail: { type: "simple"} });
                    var info = new top.ContactsInfo(obj);
                    var searchText = info.name + "," + info.emails + "," + info.mobiles + "," + info.faxes;
                    var contacts = data.contacts;
                    if (contacts && contacts.length>0){
                        for (var i = 0, len = contacts.length; i < len; i++) {
                            if (contacts[i].search(searchText)) {
                                top.$Msg.alert(LetterMessage.letterExistError); //已存在
                                return false;
                            }
                        }
                    }
                    top.Contacts.addContactDetails(info, function(result) {
                        if (result.success) {
                            top.$Msg.alert(LetterMessage.letterSaveSuccess);
                        } else {
                            top.$Msg.alert(result.msg);
                        }
                    });
                }, 0);
                return false;
            }
        }
    } else if (document.getElementById("onlinemeeting")) {//电话会议
        $('#videoTips',document).hide();
        var html = [ 
            '<a id="saveInvoice" title="进入会议大厅" href="javascript:top.$App.show(\'meeting\');" class="icoG" style="text-decoration: none;',
            'display: block;width:112px;margin:20px auto;height: 28px;font-size: 14px;overflow: hidden;zoom: 1;',
            'line-height: 28px;color: #fff;text-align: center;white-space: nowrap;border: 1px solid #00a513;',
            'border-radius: 4px;background: #00bd16;background: -moz-gradient(linear, 0 0, 0 100%, from(#00c417), to(#00b615));',
            'background: -webkit-gradient(linear, 0 0, 0 100%, from(#00C417), to(#00b615));background: linear-gradient(#00c417 0%,#00b615 100%);">',
            '<span class="p_relative" style="display:block;height: 28px;line-height: 28px;padding: 0 14px;text-align: center;',
            'padding: 0 14px;vertical-align: top;cursor: pointer;">进入会议大厅</span>',
            '</a>'].join("");
        $($$('onlinemeeting')).append(html);
    } else if (document.getElementById("aPostcard139")) {//明信片
        document.getElementById("aPostcard139").onclick = function() {
            top.Links.show("postcard", "&to=" + escape(from));
			//top.BH("读信_明信片发送");
            return false;
        }
    } else if (document.getElementById("139CommandQuickShare")) {//文件快递
        $("a[id='139CommandQuickShare']", document).click(function() {
            top.Links.show("diskDev", "&from=cabinet&toFileList=true");
            return false;
        });
    } else if (document.getElementById("addr_whoaddme")) {//通讯录 谁加了我
        $("#addr_whoaddme", document).click(function() {
            top.$App.show('addrWhoAddMe')
            return false;
        });
        $("#addr_whoaddme_set", document).click(function() {
            top.$App.show('account');
            return false;
        });
        $("#addr_whoaddme_agree", document).click(function() {
            top.$App.show('addrWhoWantAddMe', "&relationId=" + $("#addr_whoaddme_relationId", document).val())
            return false;
        });
        $("#addr_whoaddme_refuse", document).click(function() {
            top.$App.show('addrWhoWantAddMe', "&relationId=" + $("#addr_whoaddme_relationId", document).val());
            return false;
        });
        $("#addr_whoaddme_sendemail", document).click(function() {
            top.CM.show({ receiver: $("#addr_whoaddme_email", document).val() });
            return false;
        });
        $("#addr_whoaddme_sms", document).click(function() {
            top.Links.show("sms", "&mobile=" + $("#addr_whoaddme_mobile", document).val());
            return false;
        });
    } else if(document.getElementById('video')){//视频邮件video
        var v=document.getElementsByTagName("video");
        v[0].setAttribute('autoplay','autoplay');
        if(document.documentMode && document.documentMode<9){
            var len = v.length;
            var width = $(v[0]).width();
            var height = $(v[0]).height()||460;
            for(var i = 0;i < len;i ++){
                var url = v[i].getAttribute('src');
                url="/m2015/flash/player.swf?movie="+url;
                var flashEleStr = "<!--[if lt IE 9]><object class='video' classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" \
                codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" \
                width='"+ width +"' height='"+ height +"'><param name=\"movie\" value='"+ url +"' />\
                <param name=\"wmode\" value=\"transparent\">\
                <param name=\"quality\" value=\"high\" />\
                <param name=\"AutoStart\" value=\"-1\" /> \
                <param name=\"allowFullScreen\" value=\"true\" /> \
                <embed src='"+ url +"' quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\"\
                type=\"application/x-shockwave-flash\" width=\"440\" height=\"330\" allowfullscreen=\"true\" \
                AutoStart=\"true\"></embed></object><![endif]-->";  
                $(v[i]).after(flashEleStr);
                $(v[i]).hide();
            }
        }
    } else if (document.getElementById("139command_flash")) {//贺卡
    
        var container = document.getElementById("139command_flash");
        var flashUrl = container.getAttribute("rel");
        if (flashUrl) {
            flashUrl = flashUrl.replace(/images\.baina\.com/i, "images.139cm.com");
        }
        var isAllowHost = top.SiteConfig.flashDomainReg && top.SiteConfig.flashDomainReg.test(flashUrl);
        isAllowHost = isAllowHost || /^http:\/\/fun\.n20svrg\.139\.com\//i.test(flashUrl); 
        if (isAllowHost) {
            var flashEleStr = "";
            if (document.all) {
                flashEleStr = "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" \
                codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" \
                width=\"440\" height=\"330\"><param name=\"movie\" value=\"_Card_\" />\
                <param name=\"wmode\" value=\"transparent\">\
                <param name=\"quality\" value=\"high\" />\
                <embed src=\"_Card_\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\"\
                type=\"application/x-shockwave-flash\" width=\"440\" height=\"330\"></embed></object>";
            } else {
                flashEleStr="<embed width=\"440\" height=\"330\" src=\"_Card_\" quality=\"high\" wmode=\"opaque\" allownetworking=\"internal\" allowscriptaccess=\"never\" type=\"application/x-shockwave-flash\"></embed>";
            }

            container.innerHTML = flashEleStr.replace(/_Card_/g, flashUrl);

			try {
                document.getElementById("139command_greetingcard1").onclick = function() {
                    top.Links.show("greetingcard", "&email=" + window.from);
					top.BH("读信_贺卡回复发送");
                    return false;
                }
                document.getElementById("139command_greetingcard2").onclick = function() {
                    top.Links.show("greetingcard");
					top.BH("读信_贺卡回复发送");
                    return false;
                }
                document.getElementById("139command_greetingcard3").style.display = "none";
            } catch (e) { }
        }
    }else if(document.getElementById("139mailtobirthRemind")||document.getElementById("birthRemind2")){ //添加我的生日提醒
        if (top.SiteConfig.birthMail) {//开放新的生日邮件
            top.$App.set('birth', top.window.BirthRemind);
            var _self = top.$App.get('birth');

            //如果是新版
            var isNew = $('[id=sendCard]', document).eq(0).attr('mail');
            if (isNew && isNew.indexOf('@') > -1) {
                top.addBehaviorExt({ actionId: 104208, thingId: 1 });                
                $('[id=sendCard]', document).click(function () {
                    var option = {
                        AddrName: $(this).attr('AddrName') || '',
                        BirDay: $(this).attr('BirDay') || '',
                        email: $(this).attr('mail') || '',
                        MobilePhone: $(this).attr('MobilePhone') || '',
                        fullGroupName: $(this).attr('groupname') || ''
                    }
                    option.BirDay = '2013-' + option.BirDay.replace(/月/, '-').replace(/日/, '');

                    option.fullGroupName = option.fullGroupName === "未分组" ? option.MobilePhone : option.fullGroupName;
                    top.addBehaviorExt({ actionId: 101081, thingId: 1 });
                    _self.birdthMan = [option];
                    var param = '&birthday=1&singleBirthDay=1&senddate=true&materialId=' + top.BirthRemind.cardIds[parseInt(11 * Math.random() + 1)];
                    top.Links.show('greetingcard', param);
                }).css('cursor', 'pointer').removeAttr('href');

                $('#id_setbirthday', document).removeAttr("target").attr('href', "javascript:;").click(function () {
                    top.addBehaviorExt({ actionId: 104891, thingId: 1 });
                    top.$App.show('account_userInfo');
                });

                $('#btnShowMore', document).click(function () {
                    top.addBehaviorExt({ actionId: 104191, thingId: 1 });
                    $(this).parents('table').eq(0).find('tr').show();
                    $(this).parents('tr').eq(0).hide();
                    $(top.window).resize();
                    return false;
                }).css('cursor', 'pointer').removeAttr('href');
                return;
            } 

            //更多好友
            $(document.getElementById("moreFriend")).click(function () {
                $(document.getElementById("birthInfo")).find('tr').show();
                $(this).hide();
                $(top.window).resize();
            });

            //发送贺卡
            
            var cardIds= [694,693,692,691,690,694,693,692,691,690,691,690];
            var param = '&birthday=1&singleBirthDay=1&senddate=true&materialId=' + cardIds[parseInt(11 * Math.random() + 1)];
            var pEL = null, AddrName, BirDay, mail, gName, MobilePhone;
            $(document.getElementById("sendCard")).attr('href', "javascript:").click(function () {
                _self.birdthMan = [];
                $(document.getElementById("birthInfo")).find("tr:visible input:checked").each(function (i, input) {
                    tdInfo = $($(input).parent().parent().children()[3]);
                    pEL = $(tdInfo.children()[0]);
                    BirDay = $(tdInfo.children()[1]).text();
                    AddrName = pEL.text();
                    mail = pEL.attr("mail");
                    MobilePhone = pEL.attr("mobilephone");
                    gName = pEL.attr('groupname') === '未分组' ? MobilePhone : pEL.attr('groupname');
                    _self.birdthMan.push({ AddrName: AddrName, BirDay: _self.formateTime(BirDay), email: mail, MobilePhone: MobilePhone, fullGroupName: gName });
                });
                if (_self.birdthMan.length > 0) {
                    top.Links.show('greetingcard', param);
                } else {
                    top.FF.alert("请选择要过生日的好友!");
                }
                return false;
            });
		}else{
			var sendCard = $('#sendCard',document);
			sendCard.removeAttr("target").attr('href',"javascript:;").click(function(){
			    top.$App.jumpTo('15',jumpToKey); //暂时跳转处理
			});
		}
	}else if(document.getElementById("quickHeadImg")){//添加上传头像
	    
        var guidSMail = $("#guidSMail",document);
		var tipsName =  $("#tipsName",document);
		var name  = top.$User.getAliasName() || top.$User.getLoginName();
		tipsName.html('HI，'+name);
		guidSMail.removeAttr("target").attr('href',"javascript:;").click(function(){
		    /*top.$App.jumpTo('15',jumpToKey); //暂时跳转处理*/
		    top.$App.show('account');
		});
	}else if(document.getElementById("139olympic")){//olympic
        $("#139light1,#139light2",document).removeAttr('target').attr('href',"javascript:;").click(function(){
	        top.$Msg.alert('该活动已经结束，感谢您的支持！');
	    });
	}else if(document.getElementById("139jiayoly")){//中国加油
        $("#139jiay1,#139jiay2",document).removeAttr('target').attr('href',"javascript:;").click(function(){
	        top.$Msg.alert('该活动已经结束，感谢您的支持！');
	    });
            
	}else if(document.getElementById('mysubscribe')){ //精品订阅
	      top.$App.showMailbox(9);
	      //top.MB.subscribeTab('mySubscribe');
	}else if(document.getElementById("checkin_go")){//签到记录
	      var div = document.getElementsByTagName("div")[0];
		  var p = document.getElementsByTagName("p")[0];
		  p.style.display="none";
		  div.style.display="block";
		  var toCheckUI  = function(){
		      top.BH({ actionId: 102149, thingId: 2, pageId: 10544, moduleId: 13 });
		      //... 签到展开
		      top.$PUtils.showCheck(2000);
		  };
	     document.getElementById("checkin_go").onclick = function(){
			toCheckUI();
		    return false;
		}
		document.getElementById("checkin_login").href="javascript:void(0);";
		document.getElementById("checkin_login").onclick = function(){
		   toCheckUI();
		   return false;
		};
	}else if(document.getElementById("packageExpire")){
        $("[name=deadLine]",document).change(function(){
            var month=this.value;
            $("#price",document).html(month*5+".00元");
    

         });

        $("#139Command_LinksShow",document).click(function(e){

            var month=$("[name=packetDeadline]:checked",document).val();

           
        });
        document.getElementById("packageExpire").onclick=function(e){
            
        }
    } 
	else if(document.getElementById("btnVipUpdate")){// 用户升级VIP 
		$("#btnVipUpdate",document).click(function(e){
            top.$App.showOrderinfo();
        }); 
		
		if(document.getElementById("btnMailUpdate")){// 用户升级容量 btnMailUpdate
			$("#btnMailUpdate",document).click(function(e){ 
				if( $('#btnMailUpdate').attr('click') ){
					return false;
				}
				var mailCapacity = top.$App.getConfig('mailCapacity').totalSize;
				var totalSize = top.$T.Utils.getFileSizeText(mailCapacity*1024);
				var mealCode = totalSize == '2G' ? 2 : 3;
				var msg4g = '邮箱容量已为你为您免费升级至4G!<br/>感谢使用！';
				var msg5g = '邮箱容量已为你为您免费升级至5G!<br/>感谢使用！';
				var msgMax = '<b>您的邮箱容量已经不能自动扩容！</b><br/><p style="color:#777">建议您升级套餐进行扩容，或者清理不用的邮件以释放更多空间。</p>';
				var msgContent = totalSize == '2G' ? msg4g: msg5g; 
				var params = {
					mailSizeMealCode : mealCode
				};
				
				var conOptions = {
					icon: "warn",
					isHtml: true,
					buttons: ["升级套餐","取消"],
					dialogTitle: '系统提示',
					onClose: function() { 
					}
				}; 
				$('#btnMailUpdate').attr('click','true');
				top.M139.RichMail.API.call("user:updateMailSize", params, function(result){
					$('#btnMailUpdate').removeAttr('click');
					var data = result.responseData;
					var resultcode = data['var'].resultcode;
					if(data.code == "S_OK"){ 
						if( resultcode == 0){
							top.$Msg.alert(msgContent,{isHtml:true});
						}
						else{
							if( mealCode == '3'){
								top.$Msg.confirm(msgMax,function(){ 
									top.$App.showOrderinfo()
								}, function(){ 
									console.log('cancel');
								},conOptions);
							}
							else{
								top.$Msg.alert(data.summary,{isHtml:true});
							} 
						}  
					}  else { 
						top.$Msg.alert('系统繁忙，请稍后重试！');
					}
				});
			}); 
		}
    }  
    else if(document.getElementById("139Command_MiuiLottery_rewardNumber")){// PC客户端，kindle中奖邮件
        $("#139Command_MiuiLottery_rewardNumber", document).show(); // 显示web版
        $("#139Command_MiuiLottery_noReward", document).remove();   // 隐藏wap版
        $("#139Command_MiuiLottery_PCReward", document).remove();//隐藏PC客户端邮件
        // 加上一个pc客户端的隐藏
        top.$(window.parent).trigger('resize');
    }
    else if (document.getElementById("m139Remmond_kindleSendWebMail")) { // kindle运营活动邮件  本次需求不用管139Command_MiuiLottery 不要加到邮件模板里面
        var miuiLottery = $("#m139Remmond_kindleSendWebMail", document),
            lotteryDetail = $("#139Command_goLotteryDetail", document),
            lotteryTip = $("#139Command_MiuiLottery_tip", document),
            numInput = lotteryTip.find("input"),
            sendTip = lotteryTip.find(".c_tips");
        // 点击领取显示弹框
         $("#139Command_MiuiLottery, #139Command_MiuiLottery_top", document).on("click", function(){
            top.M139.RichMail.API.call("together:getLotteryCode", {mailAddress : top.$User.getDefaultSender()|| top.$PUtils.mobileMail}, function(result){
                result = result.responseData;
                if (result.code === "S_OK") {
                    lotteryTip.show();
                    numInput.val(top.$User.getShortUid());
                }
                else{
                    var errorTip = result.summary || "领取失败...";
                    top.M139.UI.TipMessage.show(errorTip, { delay: 2000, className: 'msgRed'});
                }
            });
            top.BH("miuiLottery_mail_getBtn");
        });
        lotteryTip.find("a:first").on("click", function () {
            lotteryTip.hide();
        });
        // 点击发送PE下载短信
        lotteryTip.find(".send").on("click", function(){
            var num = numInput.val().replace(/^\s+|\s+$/g,""),
                ismobile = /^1[3458]\d{9}$/.test(num);
            if (!ismobile) {
                sendTip.html("手机号码输入错误，请重新输入");
            }
            else{
                top.M139.RichMail.API.call("login:sendWapPush", {userNumber: num, smsType: "1"} , function(res){
                    var resCode = res.responseData.code;
                    if (resCode == "S_OK") {
                       sendTip.html("短信发送成功");
                    }
                    else if (resCode == "PML404010001") {
                        sendTip.html("发送频率超过限制，请稍后再试");
                    }
                    else{
                        sendTip.html("短信发送失败，请稍候再试...");
                    }
                });
            }
            return false;
        });
		
        lotteryDetail.parent().attr({
            "href" : "http://mail.10086.cn/kindleActivity/concertActivity.html?mobile="+top.$User.getShortUid(),
            "target" : "_blank"
        });
        sendTip.html("");
        lotteryTip.hide();
        return false;
    }


    //wapmail运营短地址兼容
    if (document.getElementById("operationlinkId_0")) {
        ShortLinkModel.handleShortLink();
    }

    
    if (document.getElementById("139Command_CustomLinks")) {
        $("a[id='139Command_CustomLinks']", document).click(function() {
            var title = this.getAttribute('title'),
                href = this.getAttribute('href'),
                params = this.getAttribute('params') || "";
            var testStr = top.$Url.getHost(href).split(':')[0];
            if (testStr.slice(-9) == ".10086.cn") {
                if (href.indexOf('sid=') < 0) {
                    href += href.indexOf('?') > 0 ? '&' : '?';
                    href += "sid=" + top.sid;
                }
                if(params){
                    href += params;
                }
                top.$App.showUrl(href, title);
                return false;
            }
        });


    }

    if (document.getElementById("139Command_LinksShow")) {
        $("a[id='139Command_LinksShow'][rel]", document).click(function() {
            var command = this.getAttribute("rel");

            //写信页跳转
            if (command == "compose") {
                var params = this.getAttribute("params");
                params = params.split("&");
                var option = {}
                var oValue,oKey
                for (var i = 0; i < params.length; i++) {
                    if (params[i]) {
                        oKey = params[i].split("=")[0];
                        oValue = params[i].split("=")[1];
                    }
                    option[oKey] = oValue;
                }                
                //option = { receiver: '13923797879@139.com', subject: '主题', content: '内容', letterPaperId: '0090', timeset:'2013-01-04 10:00:00' }
                top.$App.show("compose", null, { inputData: option });
                return false;
            }


            //通信录跳转
            if (command == "addrvipgroup")   { top.appView.show(command); return false; }
            if (command == "addrWhoAddMe")   { top.appView.show(command); return false; }
            if (command == "addrinputhome")  { top.appView.show(command); return false; }
            if (command == "addroutput")     { top.appView.show(command); return false; }
            if (command == "addrMyVCard")    { top.appView.show(command); return false; }
            if (command == "addrbaseData")   { top.appView.show(command); return false; }

            //设置页跳转
            if (command == "account_accountSafe") { top.appView.show(command); return false; }
            if (command == "account_secSafe")     { top.appView.show(command); return false; }
            if (command == "account_areaSign")    { top.appView.show(command); return false; }
            if (command == "account_userInfo")    { top.appView.show(command); return false; }
            
            //任务邮件
            if (command == "searchTaskmail") {
                top.appView.searchTaskmail();
                return false;
            }
			
			//我的账单
            if (command == "billdeliver") {
                top.$App.showMailbox(8);
                return false;
            } else if (command == "mysubscribe") {
                top.$App.showMailbox(9);
                return false;
            }

            var params = this.getAttribute("params");

			//账单生活
			if (command === "billLifeNew") {
                top.$App.show(command, params);
                return false;
            }

            //收件箱
            if (command === "mailbox") {
                top.$App.showMailbox(1);
                return false;
            }

            //未读邮件
            if (command === "unreadmail") {
                top.$App.trigger("mailCommand", { command: "viewUnread", fid: 0 })
                return false;
            }

            //邮箱营业厅--首页
            if (command === "mailhallindex") {
                top.$Evocation.goMailhallUrl({oct : 'main',oac : 'index'});
                return false;
            }
            //邮箱营业厅--流量叠加包"main","flowaddlist"
            if (command === "mailhallflowaddlist") {
                top.$Evocation.goMailhallUrl({oct : 'main',oac : 'flowaddlist'});
                return false;
            }
            //邮箱营业厅--手机流量套餐
            if (command === "mailhallliuliang") {
                top.$Evocation.goMailhallUrl({oct : 'liuliang',oac : 'index'});
                return false;
            }
            //邮箱营业厅--4g套餐
            if (command === "mailhall4g") {
                top.$Evocation.goMailhallUrl({oct : 'upgrade',oac : 'get4g'});
                return false;
            }
            //邮箱营业厅--话费充值
            if (command === "mailhallpay") {
                top.$Evocation.goMailhallUrl({oct : 'ipos',oac : 'iposorder'});
                return false;
            }
            if (command == "mpostColumn") {
                var queryObj = top.$Url.getQueryObj("?" + params);
                top.$App.show("mpostOnlineService", null, {
                    title: queryObj.title || "云邮局", key: queryObj.columnId,
                    inputData: {
                        columnId: queryObj.columnId,
                        columnName: queryObj.title || "云邮局",
                        urlParams: {
                            oct: queryObj.oct, oac: queryObj.oac
                        }
                    }
                });
                return false;
                
            }
            if (command == "mpostSubscribe") {
                var queryObj = top.$Url.getQueryObj("?" + params);
                top.$App.show("googSubscription", queryObj);
                return false;

            }
            if(command.toLowerCase() == "smartlife"){
                top.$App.show('smartLife');
                return false;
            }
			
            //运营快速唤起功能
            if (command == "quick_launch") {                
                top.$Evocation.create(params);
                if(params.indexOf('silv=1')>-1){
                    var This = ShortLinkModel;
                    url = this.href;
                    if (url && This.isShortUrl(url)) {
                        if (This.isShortUrlForOpen(url)) {
                            link.href = url.replace("$sid", top.sid).replace("$v", 4).replace("usernumber",top.$App.getConfig("UserData")["UID"].replace(/^(86)/,""));
                            //链接中的u=userNumber需要替换成用户真实的手机号
                        } else {
                            var aid = This.queryString("aid", url);
                            var u = This.queryString("u", url);
                            var m  =This.queryString("m", url);
                            This.lookupLongUrl(aid,u,m,params,'evocation');
                        }
                    }
                }
                return false;
            }

            if (params) {
                if (params.indexOf("&") != 0) {
                  params = "&" + params;
                }
                
            }
			
			//特殊参数处理,跳到指定页面id位置
			var paramsMap = {
				'antivirus':{anchor:"antivirusArea"},
				'spam':{anchor:"spamMailArea"},
				'tagsuser':{anchor:"customerTags"}
			};
			
			if(paramsMap[command]){params = paramsMap[command]}
			
			var linksShow = false;
			if(top.Links && top.Links.map && (top.Links.map[command] || top.Links.old[command])){
				linksShow = true
			}	
            if (/^[-a-z_0-9]+$/i.test(command)) {
                if(top.LinksConfig[command]){
					top.$App.show(command, params);
					return false;
				}				
                if(linksShow){
					top.Links.show(command, params);
					return false;
				}else{
                    top.$App.show(command, params);
                    return false;
                }			
            }
        });
    }
    // 批量添加日历活动
    if(document.getElementById("calendar_addActivity")){
        $("div[id^='calendar_activityBtn_']", document).each(function(){
            $(this).show();
            // 不知道为啥用ie发信背景颜色样式被过滤掉了，这里单独处理下
            $(this).find("a[rel='addCalendarCommend']").css("background","#00BE16");
        });
        top.$(window.parent).trigger('resize');
        $("div[id^='calendar_activityBtn_']", document).find("a[rel='addCalendarCommend']").click(function(e) {
            var self = this,
                params = $(this).parent().find("input[type='hidden']").val(),
                successEle = $(this).parent().find("div"),
                hadAdd = $(this).attr("hadAdd"),
                recentlyDate = [];
            params = top.M139.JSON.tryEval(params);
            // 得到活动最近日期值
            $.each(params["extInfos"], function(i, n){
                recentlyDate.push(new Date(n["dateFlag"]).getTime());
            });
            recentlyDate.sort();
            if(params["recEmail"])params["recEmail"] = top.$User.getDefaultSender()|| top.$PUtils.mobileMail;
            if (hadAdd) {
                top.M139.UI.TipMessage.show("该活动已添加", {delay: 2000, className: 'msgRed'});
                return;
            }
            top.M139.RichMail.API.call("calendar:batchAddCalendar", params, function(data){
                data = data.responseData;
                if (data && data["code"] == "S_OK"){
                    successEle.show();
                    successEle.find("a[id^='to_calendar_see_']").attr("href","javascript:top.$App.show('calendar_showView','&calId=10&type=month&date="+top.$Date.format("yyyy-MM-dd",new Date(recentlyDate[0]))+"');");
                    $(self).attr("hadAdd", 1);
                    top.$(window.parent).trigger('resize');
                    $(self).hide();
                }
                else{
                    var errorTip = data["summary"] || "活动添加失败";
                    top.M139.UI.TipMessage.show(errorTip , {delay: 2000, className: 'msgRed'});
                }
            });
            top.BH("readmail_aInsertCalendar");
        });
    }
    // 和笔记脚本交互
    if(document.getElementById("note_saveCommand")){
        var MailNoteCommand = {
            callApi: top.M139.RichMail.API.call,
            // 暂时把视图层的东东收留在这里，虽然这样写很变态,不要打我~~~~
            sTextTemplate : '<i title="保存到笔记" style="background:url(http://appmail.mail.10086.cn/'+top.getRootPath()+'/images/global/animationIco.png) no-repeat;_background-image:url(http://appmail.mail.10086.cn/'+top.getRootPath()+'/images/global/animationIcoIE6.png);display:inline-block;margin-top: -2px;background-position:-32px 0;width:12px;height:12px;margin-right:5px;vertical-align: -2px;"></i>保存到笔记',
            saveTemplate : ['',
                '<div id="note_saveTip" style="right:-20px;width:102px;z-index:1001;top:22px;_height:62px;padding:0;position:absolute;background: #FEFEFE;border:1px solid #cecece;color:#666;-moz-box-shadow:0 0 5px #cecece;-webkit-box-shadow:0 0 5px #cecece;box-shadow:0 0 5px #cecece;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-webkit-animation:menus .2s ease-out;-moz-animation:menus .2s ease-out;animation:menus .2s ease-out;">',
                        '<a href="javascript:void(0);" style="position:absolute;right:0px;top:0px;cursor:pointer;z-index:999;">',
                            '<i name="mailNote_closeSaveTip" style="background:url(http://appmail.mail.10086.cn/'+top.getRootPath()+'/images/global/global_24.png) no-repeat; _background:url(http://appmail.mail.10086.cn'+top.getRootPath()+'/images/global/global.png) no-repeat; width:16px; height:16px; display:inline-block; overflow:hidden;position:absolute;right:5px;top:5px;vertical-align:middle;-webkit-animation:fadeOut .2s ease-out;-moz-animation:fadeOut .2s ease-out;animation:fadeOut .2s ease-out;background-position:-51px -302px;"></i>',
                        '</a>',
                        '<div>',
                            '<div style="height:43px !important;padding:10px 20px 5px 10px; background-color:#fafafa;-moz-border-radius:3px 3px 0 0;-webkit-border-radius:3px 3px 0 0;border-radius:3px 3px 0 0;min-height: 38px;">',
                                '<div style="overflow:hidden;zoom:1;">',
                                     '<ul style="background-color: #fff;   list-style: none outside none;border: #ccc solid 1px;position: absolute;width: 100px;top:0px;right:0px;border:none;top: 0px;right: 0px;margin: 0;padding: 0;">',
                                        '<li>',
                                            '<a rel="mailNote_saveMnote" href="javascript:void(0);" title="保存到“和笔记”" style="height: 16px; line-height: 16px; padding: 6px 8px; display: block; color: #666; font-size: 12px; white-space: nowrap;cursor: pointer;text-decoration: none;" >',
                                                '<i style="margin-right: 3px; background: url(http://appmail.mail.10086.cn/'+top.getRootPath()+'/images/global/note_ico.png) no-repeat; _background: url(http://appmail.mail.10086.cn'+top.getRootPath()+'/images/global/note_ico_8.png) no-repeat; display: inline-block; vertical-align: top; width: 16px; height: 16px;background-position: -84px 0;"></i>',
                                                '存和笔记',
                                            '</a>',
                                        '</li>',
                                        '<li>',
                                            '<a rel="mailNote_saveEvernote" href="javascript:void(0);" title="保存到“印象笔记”" style="height: 16px; line-height: 16px; padding: 6px 8px; display: block; color: #666; font-size: 12px; white-space: nowrap;cursor: pointer;text-decoration: none;">',
                                                '<i style="margin-right: 3px; background: url(http://appmail.mail.10086.cn'+top.getRootPath()+'/images/global/note_ico.png) no-repeat; _background: url(http://appmail.mail.10086.cn'+top.getRootPath()+'/images/global/note_ico_8.png) no-repeat; display: inline-block; vertical-align: top; width: 16px; height: 16px;background-position: -84px -29px;"></i>',
                                                '存印象笔记',
                                            '</a>',
                                        '</li>',
                                    '</ul>',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<div style="left: 3px;background:url(http://appmail.mail.10086.cn'+top.getRootPath()+'/images/global/global_24.png) no-repeat;_background:url(http://appmail.mail.10086.cn'+top.getRootPath()+'/images/global/global.png) no-repeat;display:inline-block;overflow:hidden;vertical-align:middle;position:absolute; top:-12px; background-position:-51px -341px; width:15px; height:12px;border-color:#cecece;"></div>',
                    '</div>',
            ''].join(""),
            render : function () {
                var self = this;
                $("a[rel='mailNote_saveText']", document).append(self.sTextTemplate);
                $("#note_saveCommand", document).css("position","relative");
                self.initBindEvent();
            },
            initBindEvent : function () {
                var self = this;
                $("a[rel='mailNote_saveText']", document).click(function(){
                    var tParent = $(this).parent();
                    $("#note_saveTip", document).remove();
                    tParent.css("position","relative");
                    tParent.append(self.saveTemplate);
                    self.bindSaveEvent();
                }); 
            },
            bindSaveEvent : function () {
                var self = this;
                // top.$D.bindAutoHide({
                //     action: "click",
                //     element: $('#note_saveTip', document)[0],
                //     stopEvent: true,
                //     callback: function () {
                //        $("#note_saveTip", document).remove();
                //     }
                // });
                $("#note_saveTip i[name='mailNote_closeSaveTip']", document).click(function(){
                    $("#note_saveTip", document).remove();
                });
                 // 存和笔记
                $("#note_saveTip a[rel='mailNote_saveMnote']", document).click(function(){
                    try{
                        var nextEle = $("#note_saveTip", document).parent().next(),
                            title = nextEle.find("h3").find("a[rel='note_title']").text(),
                            nextEle = nextEle.next(),
                            content = nextEle.html(), 
                            data = {};
                        data = self.getSaveData(title, content);
                        self.savemNote(data);
                        $("#note_saveTip", document).remove();
                    }
                    catch(e){
                        top.M139.UI.TipMessage.show("保存和笔记失败", {delay : 2000});
                    }
                   
                });
                // 存印象笔记
                $("#note_saveTip a[rel='mailNote_saveEvernote']", document).click(function(){
                    try{
                        var nextEle = $("#note_saveTip", document).parent().next(),
                            title = nextEle.find("h3").find("a[rel='note_title']").text(),
                            nextEle = nextEle.next(),
                            content = nextEle.html(),
                            data = {};
                        data = self.getSaveData(title, content);
                        self.savenEvernote(data);
                        $("#note_saveTip", document).remove();
                    }
                    catch(e){
                        top.M139.UI.TipMessage.show("保存印象笔记失败", {delay : 2000});
                    }
                });
            },
            getSaveData : function (title, contents) {
                var data = {"title":"", "content": "", "attachmentDirId": ""};
                data["title"] = title;
                data["content"] = contents;
                return data;
            },
            savemNote : function (options) {
                var self = this;
                self.callApi("mnote:createNote", options, function (res) {
                    var res = res.responseData;
                    if (res && res["code"] == "S_OK") {
                        top.M139.UI.TipMessage.show("成功保存到和笔记", {delay : 2000});
                    }
                    else {
                        top.M139.UI.TipMessage.show("保存笔记失败", {delay : 2000});
                    }
                });
            },
            savenEvernote : function (options) {
                var self = this;
                self.callApi("evernote:createNote", options, function(res) {
                    var res = res.responseData;
                    if (res && res["code"] == "S_OK") {
                        top.M139.UI.TipMessage.show("成功保存到印象笔记", {delay : 2000});
                    }
                    else if (res["code"] == 'OAUTH_BINDING' || res["code"] == 'TOKEN_EXPIRED') {
                        top.$App.showOauthDialog({func:function(){}});
                    }
                    else {
                        top.M139.UI.TipMessage.show("保存印象笔记失败", {delay : 2000});
                    }
                });
            }
        };
        MailNoteCommand.render();
    }

    if(document.getElementById('createEmailGroupTemplate')){
        var table = document.getElementById('createEmailGroupTemplate');
        var accountList = top._.pluck(top.$User.getAccountList(), "name");
        // 如果是自己发给自己的模板, 就认为自己是群主
        var isCreator = ($.inArray(top.$Email.getEmail(mailData["from"]), accountList) != -1);
        var text = isCreator ? "解散群组" : "退出群组";
        var template = [
            '<div class="norTips" style="padding:40px 40px;">',
                '<span class="norTipsIco"><i class="MB_Icon i_warn"></i></span>',
                '<dl class="norTipsContent">',
                    '<dt class="norTipsTitle MB_MessageBox_Title" style="display:none"></dt>',
                    '<dd class="norTipsLine ">{msg}<br><span class="gray">{tip}</span></dd>',
                '</dl>',
            '</div>'
        ].join("");
        $(table).find("a").text(text).css("cursor","pointer").click(function(){
            var id = $(this).attr("id");
            var uin = $(this).attr("name");
            if (!isCreator){
                // 群成员退出时处理
                var param = {
                    type : "quit",
                    users : [{
                        address : top.$User.getDefaultSender(),
                        type : 1
                    }],
                    groupId : id,
                    uin : uin
                };

                top.$Msg.showHTML(top.$T.format(template,{
                    msg : "您是否确定退出群组？",
                    tip : "退出后，不能发邮件到该群及接收该群的邮件"
                }), function(){
                    callInterface("corp:setMailGroupUser", param, function(){
                        top.M139.UI.TipMessage.show("您已成功退出群组", {
                            delay: 2000
                        });
                    },function(){
                        top.M139.UI.TipMessage.show("操作异常,请稍后重试", {
                            delay: 2000,
                            className : "msgRed"
                        });
                    });
                },{
                    dialogTitle : ["退出群组"],
			        width : "420px",
                    buttons : ["确定", "取消"]
                });
            }else{
                // 群主退出时处理
                var param = {
                    type : "delete",
                    groupId : id,
                    uin : uin
                };

                top.$Msg.showHTML(top.$T.format(template,{
                    msg : "您是否确定解散群组？",
                    tip : "解散后，所有成员不能向该群组发邮件"
                }), function(){
                    callInterface("corp:setMailGroup", param, function(){
                        top.M139.UI.TipMessage.show("您已成功解散群组", {
                            delay: 2000
                        });
                    },function(){
                        top.M139.UI.TipMessage.show("操作异常,请稍后重试", {
                            delay: 2000,
                            className : "msgRed"
                        });
                    });
                },{
                    dialogTitle : ["解散群组"],
				    width : "420px",
                    buttons : ["确定", "取消"]
                });
            }
        }).closest("td").show();
    }

    function callInterface(interfaceName, param, fnSuccess, fnError){
        top.M139.RichMail.API.call(interfaceName,param, function (result) {
            if (result && result.responseData){
                var code = result.responseData.code;
                if (code == "S_OK"){
                    /**
                    top.M139.UI.TipMessage.show("您已成功退出群组", {
                        delay: 2000
                    });*/
                    fnSuccess && fnSuccess();
                }else if (code == "S_EXISTS"){
                    /**
                    top.M139.UI.TipMessage.show("您已成功退出群组", {
                        delay: 2000
                    });*/
                    fnSuccess && fnSuccess();
                }else{
                    /**
                    top.M139.UI.TipMessage.show("操作异常,请稍后重试", {
                        delay: 2000,
                        className : "msgRed"
                    });*/
                    fnError && fnError();
                }
            }else{
                fnError && fnError();
            }
        });
    }

    // at联系人脚本交互
     var accounts    = top.$User.getAccountListArray().join(',').toLowerCase().split(','),
        atId        = "atInserted-",
        atAccountId = "";
    for (var i = 0; i < accounts.length; i++) {
        atId = "atInserted-" + top.$Email.getAccount(accounts[i]);
        if (document.getElementById(atId)) {
            var atRemindCommand = {
                callApi: top.M139.RichMail.API.call,
                el : document.getElementById(atId),
                remindData : {},
                inviteStatus : null,                      // 邀请状态
                remindTip : ['<span id="atRemindUntreated" style="z-index: 9999;  opacity: 1; display:inline-block; height: 26px;font-family: Microsoft YaHei;cursor: pointer;line-height: 26px;padding: 0 10px 0 10px;color: #444;text-shadow: none;background: #fff;font-size: 14px;text-align: center;border-radius: 4px;box-shadow: 0 0 5px rgba(0,0,0,0.4);box-shadow: 0 0 2px rgba(0,0,0,0.4);border: 1px solid #e4e4e4;margin-left: 10px;" class="msg msg-watch">', 
                    '<img src="http://appmail.mail.10086.cn/m2015/images/global/pic-kalendar.png" style="margin-top: 6px;margin-right: 7px;vertical-align: -1px;">', 
                    '有提醒你的事项',
                    '</span>'].join(""),
                inviteTip : ['',
                '<div id="atRemindInviteTip" class="tips contactTips" style="position:absolute;top:{top}px;left:{left}px;z-index:9999;width:348px;display:block;  color: #666; border: #ccc solid 1px; background: #fefefe;-moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; -moz-box-shadow: 0 0 5px rgba(0,0,0,.1); -webkit-box-shadow: 0 0 5px rgba(0,0,0,.1);box-shadow: 0 0 5px rgba(0,0,0,.1);padding: 0;  border-color: #cecece; font:12px/1.5 \'Microsoft YaHei\',Verdana,\'Simsun\';">',
                    '<div class="e-remind" style="line-height: 14px; padding: 13px 24px; color: #444; font-size: 14px; border-bottom: 1px solid #e4e4e4;">发件人提醒你 </div>',
                    '<div class="e-remindBox" style="height: 90px;overflow:auto;  padding: 0 24px;">',
                        '<h4 class="e-remindTime" style="padding:0;margin: 0;line-height: 30px;margin-top: 7px;font-size: 14px;font-weight: normal;">{remindDate}</h4>',
                        '<p class="e-remindText" style="line-height: 22px;  font-size: 14px;font-weight: normal;padding:0;margin: 0;word-break:break-all;">{remindContent}</p>',
                    '</div>',
                    '<div id="atRemindBotBtn" style="height: 26px;  padding: 6px;border-top: #e4e4e4 solid 1px; -moz-border-radius: 0 0 3px 3px;  -webkit-border-radius: 0 0 3px 3px;  border-radius: 0 0 3px 3px;  position: relative;  line-height: 30px;background: #f7f7f7; display:none;">',
                        '<span class="bibBtn" style="display: inline; float: right;  text-align: right;">',
                            '<a id="acceptInviteBtn" class="icoG" href="javascript:" style="position: relative;margin-left: 6px;vertical-align: top;zoom: 1;  height: 24px;line-height: 24px;color: #fff;text-align: center;white-space: nowrap; border: 1px solid #00a513;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;background: #00bd16;text-decoration: none;background: -moz-gradient(linear, 0 0, 0 100%, from(#00c417), to(#00b615));background: -webkit-gradient(linear, 0 0, 0 100%, from(#00C417), to(#00b615));background: linear-gradient(#00c417 0%,#00b615 100%);display: inline-block;  padding: 0;font-size: 14px;  overflow: hidden;  cursor: pointer;">',
                                '<span style="display: inline-block;  padding: 0 14px;text-align: center;vertical-align: top;cursor: pointer;">到点短信提醒我</span>',
                            '</a>',
                            '<a id="refuseInviteBtn" class="icoTb" href="javascript:" style="position: relative;margin-left: 6px;vertical-align: top;zoom: 1;  height: 24px;line-height: 24px;color: #444;text-align: center;white-space: nowrap; border: 1px solid #ccc;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;background: #e8e8e8;text-decoration: none;background: -moz-gradient(linear, 0 0, 0 100%, from(#fafafa), to(#e8e8e8));background: -webkit-gradient(linear, 0 0, 0 100%, from(#fafafa), to(#e8e8e8));background: linear-gradient(#fafafa 0%,#e8e8e8 100%);display: inline-block;  padding: 0;font-size: 14px;  overflow: hidden;  cursor: pointer;">',
                                '<span style="display: inline-block;  padding: 0 14px;text-align: center;vertical-align: top;cursor: pointer;">我知道了<i class="r-line"></i></span>',
                            '</a>',
                        '</span>',
                    '</div>',
                    '<div class="tipsTop"    style="top: -12px;  position: absolute;display: inline-block;background: url(../../m2015/images/global/global_v3_24.png) no-repeat 0 0;_background: url(../../m2015/images/global/global_v3.png) no-repeat 0 0;vertical-align: middle;overflow: hidden;width: 15px;height: 12px;background-position: -51px -341px; display:none;"></div>',
                    '<div class="tipsBottom" style="top: 170px;  position: absolute;display: inline-block;background: url(../../m2015/images/global/global_v3_24.png) no-repeat 0 0;_background: url(../../m2015/images/global/global_v3.png) no-repeat 0 0;vertical-align: middle;overflow: hidden;width: 15px;height: 12px;background-position: -67px -341px; display:none;"></div>',
                    '<a href="javascript:" class="delmailTipsClose" style="display:none;"><i class="i_u_close"></i></a>',
                '</div>'].join(""),

                initialize : function () {
                    var self = this;
                    if (self.getValueByKey("seqNo")) {
                        self.getRemindData(function (res) {
                            var inviteInfo = res["inviteInfo"],
                                address    = self.getValueByKey("address");
                            inviteInfo = $.grep(inviteInfo, function (n, i) { // 取参与人的日历提醒数据
                                return $.inArray(n["recEmail"], accounts) > -1;
                            });
                            if (!inviteInfo || $.isEmptyObject(inviteInfo)) {
                                console.log("m2012.readmail.letterscript.js 没有匹配到邀请人信息");
                                return;
                            }
                            var inviteEmail  = inviteInfo[0]["recEmail"],
                                enable       = inviteInfo[0]["enable"],
                                status       = inviteInfo[0]["status"];         // 1:接受，2:拒绝，0未处理
                            self.inviteStatus = ["untreated", "accept", "refuse"][status];
                            self.render(enable);
                        }, function () {
                            // top.M139.UI.TipMessage.show("获取日历提醒数据失败", {delay : 2000});
                        });
                    }
                },
                render : function (enable) {
                    var self = this;
                    switch(self.inviteStatus){
                        case "untreated":
                            $(self.el).find("#kalendarhIcon").hide();
                            $(self.el).append(self.remindTip);
                            $("#atRemindUntreated", document).off().on("click", function (e) {
                                var target = e.srcElement || e.target;
                                self.hideStatusTip();
                                self.showSetStatusTip($(target).closest("#atRemindUntreated")[0]);
                                top.BH("compose_atremind_deal");
                                top.M139.Event.stopEvent(e);
                            });
                        break;
                        case "accept":
                            //if (enable == 1) { // 1表示接收了提醒  atRemindUntreated
                            $(self.el).find("#atRemindUntreated").hide();
                            $(self.el).find("#kalendarhIcon").show();
                            $(self.el).off().on("click", function (e) {
                                var target = e.srcElement || e.target;
                                self.hideStatusTip();
                                self.showSetStatusTip($(target).closest(".atwho-inserted")[0]);
                                top.M139.Event.stopEvent(e);
                            });
                            //}
                        break;
                        case "refuse":
                            $(self.el).find("#kalendarhIcon").hide();
                        break;
                    }
                    $(self.el).find(".remindName").css({cursor : "pointer"});
                },
                // 得到元素在当前可视区域中的象限位置
                getQuadrant: function (elem, win) {
                    var pos;
                    win = win || window;
                    if ("left" in elem) { //是坐标点
                        pos = elem;
                    } else { //是dom元素
                        pos = $(elem).offset();  // scrollTop
                    }
                    var l = pos.left - $(elem).scrollLeft();
                    var t = pos.top - $(elem).scrollTop();
                    var w = (win.document.body.clientWidth / 2);
                    var h = (win.document.body.clientHeight / 2);
                    var center = { left: w, top: h };
                    if (l <= center.left && t <= center.top) {
                        return 2;//"UpLeft"左上，第二象限
                    } else if (l >= center.left && t <= center.top) {
                        return 1;//"UpRight"右上，第一象限
                    } else if (l <= center.left && t >= center.top) {
                        return 3;//"LeftDown"左下，第三象限
                    } else if (l >= center.left && t >= center.top) {
                        return 4;// "RightDown" 右下，第四象限
                    }
                },
                // 显示设置邀请状态提示框
                showSetStatusTip : function (dock) {
                    var self      = this,
                        html      = "",
                        offset    = $(dock).offset(),
                        quadrant  = self.getQuadrant(dock, window),
                        direction = ["RightUp", "LeftUp", "LeftDown", "RightDown"][quadrant - 1],
                    modStyle     = {                                                       // 需要给根据at联系人位置改变的样式
                        "RightUp"   : {classVal : "tipsTop",    pointerLeft : "310px", changeTop : offset.top + 35,  changeLeft : offset.left - 340 + $(dock).width()},
                        "LeftUp"    : {classVal : "tipsTop",    pointerLeft : "20px",  changeTop : offset.top + 35,  changeLeft : offset.left},
                        "LeftDown"  : {classVal : "tipsBottom", pointerLeft : "20px",  changeTop : offset.top - 182, changeLeft : offset.left},
                        "RightDown" : {classVal : "tipsBottom", pointerLeft : "310px", changeTop : offset.top - 182, changeLeft : offset.left - 340 + $(dock).width()}
                    };
                    
                    html = top.$T.Utils.format(self.inviteTip, {
                        remindDate    : self.getValueByKey("remind")["day"],
                        remindContent : self.getValueByKey("remind")["content"],
                        left : offset.left,
                        top : offset.top + 35
                    });
                    $(document.body).append(html);
                    top.BH("compose_atremind_showdeal");
                    // 根据坐标位置改变小三角的样式
                    var currMod = modStyle[direction];
                    $("#atRemindInviteTip", document).css({
                        left : currMod["changeLeft"], top : currMod["changeTop"]
                    }).find("."+currMod["classVal"]).show().css({left : currMod["pointerLeft"]});

                    setTimeout(function () {
                        // 点击其他区域自自动消失
                        top.$D.bindAutoHide({
                            action: "click",
                            element: $("#atRemindInviteTip", document)[0],
                            stopEvent: true,
                            callback: function () {
                               self.hideStatusTip();
                            }
                        });
                        $("#acceptInviteBtn", document).off().on("click", function () {
                            self.updateInviteStatus({type: 0, enable : 1}, function () {
                                self.hideStatusTip();
                                if (self.inviteStatus == "untreated"){
                                    self.initialize();
                                }
                                top.BH("compose_atremind_accept");
                            });
                        });
                        $("#refuseInviteBtn", document).off().on("click", function () {
                            self.updateInviteStatus({type: 0, enable : 0}, function () {
                                self.hideStatusTip();
                                if (self.inviteStatus == "untreated"){
                                    self.initialize();
                                }
                                top.BH("compose_atremind_accept1");
                            });
                        });
                        if(self.inviteStatus == "untreated" || self.inviteStatus == "accept"){
                            $("#atRemindBotBtn", document).show();
                        }
                        // 修改当前读信的尺寸
                        var currMid = top.$App.getCurrentTab().view.model.get("mid"),
                            $inviteTip = $("#atRemindInviteTip", document),
                            inviteTipH = $inviteTip.offset().top + $inviteTip.height(),
                            inviteTipW = $inviteTip.offset().left + $inviteTip.width(),
                            $conIfr    = $("iframe[id='mid_" + currMid + "']", top.document),
                            docBody    = $conIfr[0].contentWindow.document.body;
                        if (inviteTipH > $(docBody).height()) {
                            var newHeight = Math.max(inviteTipH, $(docBody).height(), docBody.scrollTop, docBody.offsetHeight) + 15;
                            $conIfr.attr({height : newHeight}).height(newHeight);
                        }
                    }, 100);
                },

                hideStatusTip : function () {
                    $("#atRemindInviteTip", document).remove();
                },
                // 从隐藏域中得到seqNo
                getValueByKey : function (key) {
                    var self = this,
                        remindVal = $(self.el).find("input[type='hidden']").val();
                    if ($.isEmptyObject(self.remindData) && remindVal) {
                        self.remindData = top.M139.JSON.tryEval(remindVal);
                    }
                    return self.remindData[key] || "";
                },
                getRemindData : function (callback, errback) {         // 得到定时提醒的id
                    var self = this,
                        option = {
                            "comeFrom" : 0,
                            "seqNo" : self.getValueByKey("seqNo"),
                            "type" : 0,
                        };
                    self.callApi("calendar:getCalendar", option, function (res) {
                        var res = res.responseData;
                        if (res["code"] && res["code"] == "S_OK") {
                            res = res["var"];
                            var tmp = {
                                "seqNo"  :res["seqNo"],
                                "remind":{"day": res["dateDescript"], "content": res["title"]}
                                };
                            self.remindData = $.extend(self.remindData, tmp);
                            callback && callback(res);
                        }else {
                            errback && errback(res["var"]);
                        }
                    });
                },
                // 更新邀请状态
                updateInviteStatus : function (opt, callback, errback) {
                    var self = this,
                        option = {
                        "comeFrom" : 0,
                        "actionType" : opt.type,
                        "seqNos" : self.getValueByKey("seqNo"),
                        "enable" : opt.enable,
                        "refuseResion" : ""
                    };
                    self.callApi("calendar:updateInviteStatus", option, function (res) {
                        var res = res.responseData;
                        if (res["code"] && res["code"] == "S_OK") {
                            if (opt.enable == 1) {
                                top.M139.UI.TipMessage.show("已为你设置提醒", {delay : 2000});
                            }
                            callback && callback();
                        }else {
                            if (opt.enable == 1) {
                                top.M139.UI.TipMessage.show("设置提醒失败", {delay : 2000});
                            }
                            errback && errback();
                        }
                    });
                },
                end : function () {
                    
                }
            }
            atAccountId = atId;
            atRemindCommand.initialize();
            break;
        }
    }
    // 其它以atInserted开头的清掉样式
    $("span[id^='atInserted-']", document).each(function (i, n) {
        if (n.id != atAccountId) {
            $(n, document).html("&nbsp;" + $(n, document).text() + "&nbsp;");
        }
        $(n, document).show();
    });

	//欢迎信的相关的内容  
	if($$("welcome_alias")){
		//成功打开欢迎信
		top.BH("欢迎信成功打开");
		
		var welcome_alias = $$("welcome_alias");
		welcome_alias.href="#";
		welcome_alias.removeAttribute("target");
		welcome_alias.onclick = function(){
			top.BH("欢迎信邮箱别名");
			//top.Links.show("accountManage");
		    top.$App.show('account');
		}
		
		var welcome_mailnotify = $$("welcome_mailnotify");
		welcome_mailnotify.href="#";
		welcome_mailnotify.removeAttribute("target");
		welcome_mailnotify.onclick = function(){
			top.BH("欢迎信短信通知");
			//top.Links.show("mailnotify");
		    top.$App.show('notice');
		}

		var welcome_sms = $$("welcome_sms");
		welcome_sms.href="#";
		welcome_sms.removeAttribute("target");
		welcome_sms.onclick = function(){
			top.BH("欢迎信发短信");
			top.Links.show("sms");
		}

		var welcome_message = $$("welcome_message")
		welcome_message.href="#";
		welcome_message.removeAttribute("target");
		welcome_message.onclick = function(){
			top.BH("欢迎信套餐信息");
			//top.Links.show("orderinfo");
		    top.$App.show('mobile');
		}
		
		$$("welcome_phoneFeixin").onclick = function(){
			top.BH("欢迎信下载手机版飞信");
		}

		$$("welcome_pcFeixin").onclick = function(){
			top.BH("欢迎信下载PC版飞信");
		}

		$$("welcome_foxmail").onclick = function(){
			top.BH("欢迎信foxmail发139邮件");
		}

		$$("welcome_collection").onclick = function(){
			top.BH("欢迎信代收邮件");
		}

		$$("welcome_mailList").onclick = function(){
			top.BH("欢迎信导入导出邮件");
		}

		$$("welcome_phoneToMail").onclick = function(){
			top.BH("欢迎信手机登陆139邮箱");
		}

		$$("welcome_more").onclick = function(){
			top.BH("欢迎信更多");
		}
	}

    var lnks = $class("139Command_ContactFeed", "A");
    addrFeed(lnks);

    fixImgSid();

    /* IPAD 读信页问题*/
    var ua = navigator.userAgent.toLowerCase();
    var isIpad = ua.match(/ipad/i) == "ipad";
    if (isIpad) {
        requestByScript("JTouch", top.getRootPath()+"/js/richmail/readmail/JTouch.js", function () {
            ipadProblem();
        });
         
    }

    // 接受会议邀请日历活动添加
    if (document.getElementById("meetingInviteOp")) {
        requestByScript("m2012.calendar.meeting.inviteactivity", top.getRootPath()+"/js/packs/calendar/m2012.calendar.prod_meeting_inviteactivity.html.pack.js?sid=" + top.$App.getSid(), function () {
            meetingInviteObj.work();
        },"utf-8");
    }
    // 会议邀请邮件
    if (document.getElementById("meetingInviteNew")) {
        requestByScript("M139.Calendar.Prod.MeetingInviteMail",
            top.getRootPath()+"/js/packs/calendar/m139.calendar.prod_meeting_invite_mail.html.pack.js?sid=" + top.$App.getSid(),
            function () {
            },
            "utf-8"
        );
    }

    // 活动邀请邮件
    if (document.getElementById("activityInviteMail")) {
        requestByScript("M139.Calendar.Prod.ActivityInviteMail",
            top.getRootPath()+"/js/packs/calendar/m139.calendar.prod_activity_invite_mail.html.pack.js?sid=" + top.$App.getSid(),
            function () {
            },
            "utf-8"
        );
    }

    // 日历共享邮件
    if (document.getElementById("calenderShareMail")) {
        requestByScript("M139.Calendar.Prod.CalenderShareMail",
            top.getRootPath()+"/js/packs/calendar/m139.calendar.prod_calender_share_mail.html.pack.js?sid=" + top.$App.getSid(),
            function () {
            },
            "utf-8"
        );
    }

    // 活动邀请和日历共享反馈邮件
    if (document.getElementById("calenderFeedbackMail")) {
        requestByScript("M139.Calendar.Prod.CalenderFeedbackMail",
            top.getRootPath()+"/js/packs/calendar/m139.calendar.prod_calender_feedback_mail.html.pack.js?sid=" + top.$App.getSid(),
            function () {
            },
            "utf-8"
        );
    }

    // 活动分享邮件
    if (document.getElementById("activityShareMail")) {
        requestByScript("M139.Calendar.Prod.ActivityShareMail",
            top.getRootPath()+"/js/packs/calendar/m139.calendar.prod_activity_share_mail.html.pack.js?sid=" + top.$App.getSid(),
            function () {
            },
            "utf-8"
        );
    }

    // 提醒邮件
    if (document.getElementById("remindMail")) {
        requestByScript("M139.Calendar.Prod.RemindMail",
            top.getRootPath()+"/js/packs/calendar/m139.calendar.prod_remind_mail.html.pack.js?sid=" + top.$App.getSid(),
            function () {
            },
            "utf-8"
        );
    }


    // 阅读话费账单时，增加自动设置提醒
    if ( letterInfo && letterInfo.headers && letterInfo.headers.billFlag == "1" && document.getElementById("billRemindBtn") ) {
        requestByScript("m2012.calendar.bill.remind", top.getRootPath()+"/js/packs/calendar/m2012.calendar.prod_bill_remind.html.pack.js?sid=" + top.$App.getSid(), function () {
            billRemindObj.work();
        },"utf-8");
        //引导用户设置帐单邮件短信提醒
        requestByScript("m2012.calendar.bill.smsremind",
                top.getRootPath()+"/js/prod/billmail/billNotifySetting.js?sid=" + top.$App.getSid(),
            function () {},
            "utf-8"
        );

        //引导用户设置帐单邮件短信提醒
        requestByScript("m2012.calendar.bill.forwardSetting",
                  top.getRootPath()+"/js/prod/billmail/billMailForwardSetting.js?sid=" + top.$App.getSid(),
             function () {},
             "utf-8"
        );

    }

    //运营类邮件处理
//    if ( letterInfo && letterInfo.account == "10086 <10086@139.com>" ) {
//    if ( mailData && mailData.mailFlag == 5 && ( top._.indexOf([1,2,68], mailData.logoType) > -1) ) {
    if ( (top._.indexOf([66,68], mailData.logoType) > -1) || (top._.indexOf([0,1,2], mailData.logoType) > -1 && letterInfo.headers && letterInfo.headers.billFlag == "1") ) {

        //letterInfo.flag.destroySelf 为1时表示保留邮件,为0或者不存在该字段时表示定时销毁邮件
        if( letterInfo.flag && !letterInfo.flag.destroySelf && parseInt(letterInfo.headers.keepDay, 10)){
            //自销毁运营邮件，提示用户手动保存
            requestByScript("m2012.calendar.bill.autoDestroyMail",
                    top.getRootPath()+"/js/prod/autodestroymail/autoDestroyMail.js?sid=" + top.$App.getSid(),
                function () {},
                "utf-8"
            );
        }

    }
    // 邀请加入群邮件群组
    if (document.getElementById("groupMailInviteOp")) {
        top.BH('gom_load_list_success');
        requestByScript("m2012.groupmail.joinGroupMail", top.getRootPath()+"/js/service/groupmail_v2/common/m2012.groupmail.joingroupmail.js?sid=" + top.$App.getSid(), function () {

        },"utf-8");
    }
    // 新版群邮件上线后, 系统会通告用户, 查看该邮件时加载
    if (document.getElementById("groupMail_linkToDisk")) {
        requestByScript("m2012_groupMail_linkToDisk",
            top.getRootPath()+"/js/service/groupmail_v2/groupmail_prod/m2012.groupmail.linkToDisk.js?sid=" + top.$App.getSid(),
            function () { },
            "utf-8"
        );
    }
    // PC客户端签到有奖，我也来添砖加瓦
    if(document.getElementById("139PCSign")) {
        document.getElementById("139PCSign").setAttribute('href', 'javascript:;');
        document.getElementById("139PCSign").removeAttribute('target');
        document.getElementById("139PCSign").onclick = function (e) {
            e.preventDefault();
            top.BH("clickGoSign");
            top.$App.show('pcLottery');
        };
        document.getElementById("139PCSignDownload").onclick = function () {
            top.BH("clickMailPcClient");
        };
    }
    if (document.getElementById("christmasGreet")) {
        /*requestByScript("M2012.ChristmasRead.View",
            
            function () {*/
             document.getElementById('huanfu').style.display="block";
             document.getElementById('huanfu').href = "javascript:";
             document.getElementById('huanfu').target = "";
             document.getElementById('huanfu').onclick = function() {
                top.BH("christmas_readmail_changeskin");
                top.$App.changeSkin("skin_christmas");
                top.$Cookie.set({
                    name: "SkinPath2",
                    value: "skin_christmas",
                    domain: "mail." + document.domain
                });
                top.$App.show("changeSkin");
                
            };
            top.$App.setUserCustomInfoNew({isHaveChristmasSkin:'1'})           
            document.getElementById('greeting').href = "javascript:";
            document.getElementById('greeting').target = "";
            document.getElementById('greeting').onclick = function() {
                top.BH("christmas_readmail_send");
                top.$App.jumpTo('greetingcard');
            };

         /*   },
            "utf-8"
        );*/
    }
	//邮箱容量升级邮件模版点击
	if(document.getElementById('LoadmailTemplate')){
		$("#gotoUpMailsize",document).click(function(){			
			top.$App.show("mobile");//升级邮箱套餐
		});	
	}
	if(document.getElementById('LoadmailTemplate')){
		$("#quickClearMailSize",document).click(function(){
			top.$App.show("clearFileTool");//文件整理工具
			top.BH("startUseClearfileTool");
		});
	}
	
    if (document.getElementById('_task_cal_mail')) {
        $(document.getElementById('_task_cal_mail')).find('a').attr('href', 'javascript:top.BH("rightbottomtip_handle_task");top.appView.searchTaskmail();');
    }
    if(window.letterInfo){
        if(letterInfo.headers && letterInfo.headers.billFlag == "1"){
            //账单邮件运营相关需求
            requestByScript("m2012_calendar_sharelabel",
                top.getRootPath()+"/js/prod/billmail/billmailscript.js?sid=" + top.$App.getSid(),
                function () {},
                "utf-8"
            );
        }
    }
    // 新版添加别名后，系统会下发邮件
    if(document.getElementById('createAliasSuccessModule')){
        var link = document.getElementById('goToSet');
        $(link).css("cursor","pointer");
        $(link).unbind("click").click(function(){
            top.$App.show("account");
        });
    }

    //权益中心靓号邮箱订购成功后的邮件模板处理
    if(document.getElementById('jumpToAccountSetting')){
        document.getElementById('jumpToAccountSetting').onclick=function(){
            top.$App.show('account_accountSet');
        }
    }
    
    //权益中心靓号邮箱订购成功后邮件模板处理
    if(document.getElementById('renewalsSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(pretty-number).html?sid=" + top.$App.getSid() + "&function=renewals";
        var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var vipFaceTc = $(gotoSms).next();
		$(vipFaceTc).css("cursor","pointer");
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }

    //权益中心小和玛主题包订购成功后的邮件模板处理
    if(document.getElementById('goToHemaTheme')){
        document.getElementById('goToHemaTheme').onclick=function(){
            var url = top.$App.getVipMailCenterUrl("html/detailsPage(hema-theme).html");
            window.open(url, "_blank");
        }
    }

    //权益中心vip皮肤订购成功后的邮件模板处理
    if(document.getElementById('skinorderSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid() + "&function=vipSkinBuyRenew";
        var respectEnjoy = document.getElementById('respectEnjoy');
        $(respectEnjoy).css("cursor", "pointer");
        $(respectEnjoy).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink2,
            "target": '_blank'
        });
        var gochangeSkin = document.getElementById('gochangeSkin');
        $(gochangeSkin).css("cursor","pointer");
        $(gochangeSkin).click(function(){
            top.$App.show('changeSkin');
            top.$App.trigger("userAttrChange");//同步更新infoset接口数据
        });
        var vipFaceTc = $(respectEnjoy).next();
		$(vipFaceTc).css("cursor","pointer");
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });

    }
    //纯净版邮箱的模板
    if(document.getElementById('cleanMailSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
        var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(clean-mail).html?sid=" + top.$App.getSid() + "&function=cleanMailBuyRenew";
        var newlink4 = gotoUrl + "html/detailsPage(clean-mail).html?sid=" + top.$App.getSid();
        var respectEnjoy = document.getElementById('respectEnjoy');
        $(respectEnjoy).css("cursor", "pointer");
        $(respectEnjoy).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
        var goVipcenter = $(respectEnjoy).next();
        $(goVipcenter).css("cursor", "pointer");
        $(goVipcenter).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var gochangeSkin = document.getElementById('gochangeSkin');
        $(gochangeSkin).css("cursor","pointer");
        $(gochangeSkin).click(function(){
            top.$App.show('changeSkin');
            top.$App.trigger("userAttrChange");//同步更新infoset接口数据
        });

    }
    //权益中心自写短信100邮件模板处理
    if(document.getElementById('sms100_Sucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
		var newlink3 = gotoUrl + "html/detailsPage(100).html?sid=" + top.$App.getSid() + "&function=order100_btnRenew";
        var newlink4 = gotoUrl + "html/detailsPage(100).html?sid=" + top.$App.getSid();
        var gotoSendSms = document.getElementById('sendSms');
        $(gotoSendSms).css("cursor","pointer");
        $(gotoSendSms).click(function(){
            top.$App.trigger("userAttrChange");//同步更新infoset接口数据
            top.$App.show("sms");
        });
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
        var gotoVipCenter = $(gotoSenddetail).next();
		$(gotoVipCenter).css("cursor","pointer");
        $(gotoVipCenter).attr({
            "href": newlink1,
            "target": '_blank'
        });

    }
	//权益中心自写短信200邮件模板处理
    if(document.getElementById('sms200_Sucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(200).html?sid=" + top.$App.getSid() + "&function=order200_btnRenew";
        var newlink4 = gotoUrl + "html/detailsPage(200).html?sid=" + top.$App.getSid();
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var gotoSendSms = document.getElementById('sendSms');
        $(gotoSendSms).click(function(){
            top.$App.trigger("userAttrChange");//同步更新infoset接口数据
            top.$App.show("sms");
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
        var gotoVipCenter = $(gotoSenddetail).next();
		$(gotoVipCenter).css("cursor","pointer");
        $(gotoVipCenter).attr({
            "href": newlink1,
            "target": '_blank'
        });

    }
	//权益中心误删除邮件模板处理
    if(document.getElementById('misDeleteSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl(); 
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(recovery).html?sid=" + top.$App.getSid() + "&function=mistakenDeleteRenew";
        var newlink4 = gotoUrl + "html/detailsPage(recovery).html?sid=" + top.$App.getSid();
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
		$(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
        var goVipFace = $(gotoSenddetail).next();
	    $(goVipFace).css("cursor","pointer");
        $(goVipFace).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
	//权益中心禁止转发邮件模板处理,按次
    if(document.getElementById('forward_1_Lock_Sucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl(); 
        var newlink1 = top.$App.getVipMailCenterUrl() + "html/function.html?sid=" + top.$App.getSid();
		var newlink2 = top.$App.getVipMailCenterUrl() + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var goVipFace = $(gotoSenddetail).next();
		$(goVipFace).css("cursor","pointer");
        $(goVipFace).attr({
            "href": newlink1,
            "target": '_blank'
        });
		
    }
	//权益中心禁止转发邮件模板处理,按月
    if(document.getElementById('forward_2_Lock_Sucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl(); 
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
		var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(norelay).html?sid=" + top.$App.getSid()+ "&function=buyForwardlock2Renew";
        var newlink4 = gotoUrl + "html/detailsPage(norelay).html?sid=" + top.$App.getSid();
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');        
		$(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
		var goVipFace = $(gotoSenddetail).next();
		$(goVipFace).css("cursor","pointer");
        $(goVipFace).attr({
            "href": newlink1,
            "target": '_blank'
        });

    }
	//权益中心vip名片邮件模板处理
    if(document.getElementById('vipCardSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl(); 
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(vipCard).html?sid=" + top.$App.getSid() + "&function=vip_cardRenew";
        var newlink4 = gotoUrl + "html/detailsPage(vipCard).html?sid=" + top.$App.getSid();
        var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var gotoSenddetail = document.getElementById('changevipCard');//立即去体验
		$(gotoSenddetail).click(function(){
			top.$App.trigger("userAttrChange");//同步更新infoset接口数据
            top.$App.show("account")
		});
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
        var vipFaceTc = $(gotoSms).next();
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心邮箱伴侣邮件模板处理
    if(document.getElementById('orderPartinerSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(partner).html?sid=" + top.$App.getSid() + "&function=orderPartinerRenew";
        var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');        
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var vipFaceTc = $(gotoSms).next();
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心139商务助手邮件模板处理
    if(document.getElementById('businessSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();        
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(business).html?sid=" + top.$App.getSid() + "&function=orderBusinessRenew";
        var newlink4 = gotoUrl + "html/detailsPage(business).html?sid=" + top.$App.getSid();
		var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');        
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink4,
            "target": '_blank'
        });
		var vipFaceTc = $(gotoSms).next();
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心5G邮箱容量包邮件模板处理
    if(document.getElementById('capacity5gSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();        
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(capacity5g).html?sid=" + top.$App.getSid();
		var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');        
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
		var vipFaceTc = $(gotoSms).next();
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心20G邮箱容量包邮件模板处理
    if(document.getElementById('capacity20gSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();        
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(capacity20g).html?sid=" + top.$App.getSid();
		var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');        
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var vipFaceTc = $(gotoSms).next();
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
             "target": '_parent'
        });
    }
    //权益中心小和玛主题包邮件模板处理
    if(document.getElementById('hemaThemeSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();        
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
        var newlink3 = gotoUrl + "html/detailsPage(hema-theme).html?sid=" + top.$App.getSid();
		var gotoSms = document.getElementById('respectEnjoy');
        $(gotoSms).css("cursor", "pointer");
        $(gotoSms).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');        
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
		var vipFaceTc = $(gotoSms).next();
        $(vipFaceTc).css("cursor", "pointer");
        $(vipFaceTc).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心自写彩信50条邮件模板处理
    if(document.getElementById('mms50_Sucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(vipSkin).html?sid=" + top.$App.getSid();
		var newlink3 = gotoUrl + "html/detailsPage(50).html?sid=" + top.$App.getSid() + "&function=order50_btnRenew";
        var gotoSendSms = document.getElementById('sendMms');
        $(gotoSendSms).css("cursor","pointer");
        $(gotoSendSms).click(function(){
            top.$App.trigger("userAttrChange");//同步更新infoset接口数据
            top.$App.show("mms");
        });
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var gotoVipCenter = $(gotoSenddetail).next();
		$(gotoVipCenter).css("cursor","pointer");
        $(gotoVipCenter).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心邮箱尊享权益包邮件模板处理
    if(document.getElementById('emailEnjoySucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(honor).html?sid=" + top.$App.getSid();
		var newlink3 = gotoUrl + "html/detailsPage(honor).html?sid=" + top.$App.getSid() + "&function=emailEnjoyRenew";
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink2,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var gotoVipCenter = $(gotoSenddetail).next();
		$(gotoVipCenter).css("cursor","pointer");
        $(gotoVipCenter).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心邮箱精品权益包邮件模板处理
    if(document.getElementById('qualityGoodsSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(young).html?sid=" + top.$App.getSid();
		var newlink3 = gotoUrl + "html/detailsPage(young).html?sid=" + top.$App.getSid() + "&function=qualityGoodsRenew";
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink2,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var gotoVipCenter = $(gotoSenddetail).next();
		$(gotoVipCenter).css("cursor","pointer");
        $(gotoVipCenter).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //权益中心邮箱装扮权益包邮件模板处理
    if(document.getElementById('dressUpSucess')){
        var gotoUrl = top.$App.getVipMailCenterUrl();
        var newlink1 = gotoUrl + "html/function.html?sid=" + top.$App.getSid();
	    var newlink2 = gotoUrl + "html/detailsPage(skin).html?sid=" + top.$App.getSid();
		var newlink3 = gotoUrl + "html/detailsPage(skin).html?sid=" + top.$App.getSid() + "&function=dressUpRenew";
        var gotoSenddetail = document.getElementById('respectEnjoy');
        $(gotoSenddetail).css("cursor","pointer");
        $(gotoSenddetail).attr({
            "href": newlink1,
            "target": '_blank'
        });
        var promptlyOrder = document.getElementById('promptlyOrder');
        $(promptlyOrder).css("cursor", "pointer");
        $(promptlyOrder).attr({
            "href": newlink2,
            "target": '_blank'
        });
        var promptlyRenewal = document.getElementById('promptlyRenewal');
        $(promptlyRenewal).css("cursor", "pointer");
        $(promptlyRenewal).attr({
            "href": newlink3,
            "target": '_blank'
        });
        var gotoVipCenter = $(gotoSenddetail).next();
		$(gotoVipCenter).css("cursor","pointer");
        $(gotoVipCenter).attr({
            "href": newlink1,
            "target": '_blank'
        });
    }
    //免费体验邮件模板
    if(document.getElementById('freeExperience')){
        var freeExperience = document.getElementById('freeExperience');
        $(freeExperience).css("cursor", "pointer");
        $(freeExperience).on('click',function(){
            var isChinaMobileUser = top.$User.isChinaMobileUser(); //判断用户是否是移动用户
            var newlink = top.$App.getVipMailCenterUrl() + "html/function.html?sid=" + top.$App.getSid();
            var bottomTip = '<a style="font-size:14px;cursor:pointer;" id="respectEnjoy">了解更多VIP权益</a>';
            var textContent = "";
            //已经点击免费领取按钮
            $(freeExperience).click(function(){
                return false;
            })
            if(!isChinaMobileUser){
                top.$Msg.alert("当前业务仅支持中国移动号码使用！");
                return false;
            }
            var contentId = $(freeExperience)[0].className;
            var serviceId = "";
            var noBuy = true;
            switch(contentId){
                case "10014": //纯净邮箱
                serviceId = "300";
                textContent = '您已成功领取 “纯净邮箱” 免费权益, 有效期10天, 可回到139邮箱体验。';
                break;

                case "10005": //VIP皮肤
                serviceId = "260";
                textContent = '您已成功领取 “VIP皮肤” 免费权益, 有效期10天, 可回到139邮箱体验。';
                break;
                            
                case "10006": //VIP名片
                serviceId = "270";
                textContent = '您已成功领取 “VIP名片” 免费权益, 有效期10天, 可回到139邮箱体验。';
                break;

                case "10003": //自写短信100条
                serviceId = "243";
                textContent = '您已成功领取 “自写短信100条” 免费权益, 有效期30天, 可回到139邮箱体验。';
                break;

                case "10004": //自写短信200条
                serviceId = "245";
                textContent = '您已成功领取 “自写短信200条” 免费权益, 有效期30天, 可回到139邮箱体验。';
                break;

                case "10016": //商务助手
                serviceId = "245";
                textContent = '您已成功领取 “139邮箱商务助手” 免费权益,有效期30天,可回到139邮箱体验。';
                break;

                case "10007": //误删除恢复
                serviceId = "232";
                textContent = '您已成功领取 “误删除恢复” 免费权益,有效期30天,可回到139邮箱体验。';
                break;

                case "10012": //禁止转发
                serviceId = "282";
                textContent = '您已成功领取 “禁止转发” 免费权益, 有效期30天, 可回到139邮箱体验。';
                break;
            }
            var userData = top.$App.getConfig("UserData") ||{};
            var userMainData = userData.orderInfoList;
            for(var i in userMainData){
                var userServiceId = userMainData[i].serviceId; 
                var orderstatus = userMainData[i].orderStatus;
                if(userServiceId == serviceId && (orderstatus=="0" || orderstatus=="4")){ //判断权益是否已经订购
                    noBuy = false;
                    top.$Msg.alert('您已订购此权益,无需重复领取',{bottomTip:bottomTip,isHtml:true});
                    $("#respectEnjoy").click(function(){
                        window.open(newlink); 
                    });
                    break;
                }
            }
            if(!noBuy){return false;}
            var options = {
                fromId: "2",
                contentId: contentId,
                monthTime: "1",
                version: "1.0"
            };
            top.M139.HttpRouter.addRouter("setting",["user:orderFreeProduct"]);
            top.M139.RichMail.API.call("user:orderFreeProduct", options, function (res) {
                if(res && res.responseData){
                    var code = res.responseData.code;
                    switch(code){
                        case "S_OK": //领取成功
                        top.$Msg.alert(textContent,{ icon:'ok',bottomTip:bottomTip,isHtml:true});
                        openVipCenter();
                        break;

                        case "PML10406035": //已经领取
                        top.$Msg.alert('您已领取过此权益,无需重复领取',{bottomTip:bottomTip,isHtml:true});
                        openVipCenter();
                        break;

                        case "PML10406029": //未开放
                        top.$Msg.alert('未开放免费领取，不允许免费订购',{bottomTip:bottomTip,isHtml:true});
                        openVipCenter();
                        break;
                            
                        case "S_ERROR": //领取失败
                        top.$Msg.alert('您领取权益失败,请稍后再试',{bottomTip:bottomTip,isHtml:true});
                        openVipCenter();
                        break;
                    }
                }
            });
            function openVipCenter(){
                $("#respectEnjoy").click(function(){
                    window.open(newlink); 
                });
            }
        });
    }
     /*
     * 处理用户之间丰富个人信息
    */
    if( document.getElementById("setNameMailTpl") ) {
        top.BH("user_rich_send_email")
        var mailtpl = document.getElementById("setNameMailTpl");
        var foxtpl = document.getElementById("setNameFoxMailTpl");

        mailtpl.style.display = "block";
        foxtpl.style.display = "none";

        //给设置姓名绑定点击事件，拥有与弹出框

        var template = ['<div class="boxIframeText">',
                        '<div class="norTips" style="padding:40px 20px 40px 40px;">',
                                '<span class="norTipsIco"><i class="MB_Icon i-sender-name"></i></span>',
                                '<dl class="norTipsContent" style="overflow:inherit;">',
                                    '<dt class="norTipsTitle MB_MessageBox_Title"></dt>',
                                    '<dd class="norTipsLine">设置发件人姓名，让对方更容易从大量邮件中找到你。</dd>',
                                    '<dd class="norTipsLine" style="padding:10px 0 0;"><label class="label">发件人姓名：</label><input class="iText" maxlength="16" style="width:130px;height:24px;line-height:24px;" type="text" id="senderName" value="{defaultSendName}"></dd>',
                                    '<dd class="pt_10" id="composeTruenameTip" style="display:none;"><div class="tips write-tips EmptyTips" style="left: 183px;"><div class="tips-text EmptyTipsContent" style="color:red;">保存并发送时，发件人姓名不能为空</div><div class="tipsTop diamond"></div></div></dd>',
                        '</div>',
                    '</div>'].join("");
        var otherModifyName = document.getElementById("otherModifyName").getAttribute("otherModifyName");
        var options  = {"defaultSendName": otherModifyName}
        var _template = top.M139.Text.Utils.format(template,options);
        var oBtn = mailtpl.getElementsByTagName('a')[1];

        function bindFunction(elem,type, callback) {
            if( window.addEventListener ) {
                elem.addEventListener(type, callback, false);
            } else if( window.attachEvent ) {
                elem.attachEvent("on"+type, callback); 
            }
        }

        bindFunction(oBtn, 'click', function() {
            self.dialog = top.$Msg.showHTML(
                _template,
                function(e){
                	e.cancel = true;
                    top.BH("user_rich_reademail_save");
                    var trueName = $('#senderName').val();
                    top.M2012.Contacts.getModel().modifyUserInfo({AddrFirstName : trueName}, function (result) {
                        if(result.ResultCode && result.ResultCode == '0'){
                            top.$App.trigger("userAttrChange", {
                                trueName: trueName,
                                callback: function () {
                                    top.BH("user_rich_senduser_save")
                                }
                            });
                            top.M139.UI.TipMessage.show("修改成功", { delay: 2000 });
                            self.dialog.close({"setSensName":"setSensName","defaultName":trueName});
                        }
                        // else if(result.ResultCode == '24577'){
                        //     self.$tip.text("发件人姓名有误，请重新输入。");
                        // }else{
                        //     self.$tip.text("发件人姓名更新失败");
                        // }
                    });
                },
                function(e){
                	self.dialog.close();
                },
                {   
                    onClose:function(e){
                    },
                    width:370,
                    buttons:['保存','取消'],
                    dialogTitle:'设置发件人姓名提示'
                }
            );

        })
    };
    
}

function requestByScript(scriptId, dataHref, callback, charset, retry)
{
    var isReady = false;
    if (callback)
    {
        if (typeof (callback) == "string")
        {
            charset = callback;
            callback = null;
        }
    }
    var head = document.getElementsByTagName("head")[0];
    var objScript = document.getElementById(scriptId);
    //是否移出脚本DOM(非IE9时处理)
    var isRemoveScriptDom=!document.all && true || false,
    browserVersion=["msie 9.0","chrome","firefox"],
    i=0,bvLenght=browserVersion.length-1
    currVersion=window.navigator.userAgent.toLowerCase()||"";
    //IE9、chrome、firefox时处理
    while(i<=bvLenght){
        isRemoveScriptDom=currVersion.indexOf(browserVersion[i])>-1 && true || false;
        if (isRemoveScriptDom) {
            break;
        }
        i++;
    }
    browserVersion=null;

    try {
        if (objScript && isRemoveScriptDom) {
            objScript.src = "";
            objScript.parentNode.removeChild(objScript);
            objScript = null;
        }
    } 
    catch (e) {}        
    if (objScript != null)
    {
        if (dataHref.indexOf("?") == -1) dataHref += "?";
        dataHref += "&" + Math.random();
        objScript.src = dataHref;
        var dataScript = objScript;
    } else
    {
        var dataScript = document.createElement("script");
        dataScript.id = scriptId;
        if (charset)
        {
            dataScript.charset = charset;
        } else
        {
            dataScript.charset = "GB2312";
        }
        dataScript.src = dataHref;
        dataScript.defer = true;
        dataScript.type = "text/javascript";
        head.appendChild(dataScript);
    }
    if (document.all)
    {
        dataScript.onreadystatechange = function()
        {
            if (dataScript.readyState == "loaded" || dataScript.readyState == "complete")
            {
                isReady = true;
                if (callback) callback();
            }
        }
    } else
    {
        dataScript.onload = function()
        {
            isReady = true;
            if (callback) callback();
        }
    }

    if (retry)
    {
        setTimeout(function()
        {
            if (retry.times > 0 && !isReady)
            {
                retry.times--;
                if (dataHref.indexOf("?") == -1) dataHref += "?";
                dataHref += "&" + Math.random();
                Utils.requestByScript(scriptId, dataHref, callback, charset, retry);
            }
        }, retry.timeout);
    }
}

/* IPAD 读信页问题*/
function ipadProblem() {
    var div1 = top.$("#toolbar_" + top.ipadLetterMid).next()[0]; 
    var div2 = document.body;
    var Touches = JTouch(div2);
    Touches.on('swipe', function (evt, data) {
        //轻拂
        switch (data['direction']) {
            case 'left':
                div1.scrollLeft += 5;
                div2.scrollLeft += 5;
                break;
            case 'right':
                div1.scrollLeft -= 5;
                div2.scrollLeft -= 5;
                break;
            case 'up':
                div1.scrollTop += 5;
                div2.scrollTop += 5;
                break;
            case 'down':
                div1.scrollTop -= 5;
                div2.scrollTop -= 5;
                break;
        };
    })


};

/** fixImgSid */
function fixImgSid(){
    var imgs = document.getElementsByTagName("IMG");
    if (imgs.length == 0) return;

    for(var i=imgs.length; i--;) {
        var _src = imgs[i].getAttribute("mail139command_src");
        if (_src && _src.indexOf("$sid$")>-1) {
            imgs[i].src = _src.replace(/\$sid\$/, top.sid);
        }
    }
}


var isTest = location.host.indexOf("10086rd") > -1;

//wap短地址处理
var ShortLinkModel = {
    queryString: function (param, url) {
        return top.M139.Text.Url.queryString(param, url);
    },
    //判断是否运营短地址
    isShortUrl: function (url) {
        return !!this.queryString("aid", url);
    },
    //是否第三方短地址,aid是下划线开头或者有nomail参数
    isShortUrlForOpen: function (url) {
        return /^_/.test(this.queryString("aid", url)) || this.queryString("nomail", url) == "1";
    },
    //处理运营短地址
    handleShortLink: function () {
        var This = this;
        var links = parent.jQuery("a[id*='operationlinkId']",document);//运营短地址
        links.each(function () {
            var link = this;
            var url = link && link.href;
            var params = $(link).attr('params');
            if (link && This.isShortUrl(url)) {
                if (This.isShortUrlForOpen(url)) {
                    link.href = url.replace("$sid", top.sid).replace("$v", 4).replace("usernumber",top.$App.getConfig("UserData")["UID"].replace(/^(86)/,""));
					//链接中的u=userNumber需要替换成用户真实的手机号
                } else {
                    link.href = "javascript:;";
                    link.onclick = (function (url) {
                        return function () {
							var aid = This.queryString("aid", url);
							var u = This.queryString("u", url);
							var m  =This.queryString("m", url);
                            This.lookupLongUrl(aid,u,m,params);
                            return false;
                        };
                    })(url);
                }
            }
        });
    },
    //查询长地址
    lookupLongUrl: function (aid,u,m,parms) {
        var This = this;
        var url = "/mw2/together/s?func=operation:address&v=4&sid=" + top.sid + "&aid=" + aid;
		if(u){
			url = url + "&u=" + u;
		}
		if(m){
			url = url + "&m=" + m;
		}
        top.$RM.call(url, null,function (e) {
            if (isTest) {
                var url = "http://html5.mail.10086.cn/?id=sms";
                This.gotoUrl(url);
            } else if (e && e.responseData) {
                var url = e.responseData["var"].url;
                This.gotoUrl(url, parms);
            }
        });
    },
    makeObject:function(params){
        var attr = params.replace(/^&/, '').split('&'),
            i=0,o, k, v,obj;
        for (; i < attr.length; i++) {
            o = attr[i].split('=');
            k = o[0];
            v = o[1];
            obj[k] = v;
        }
        return obj;
    },

    gotoUrl: function (url, params) {
        var id = this.queryString("id", url);
        if (id) {
            if (id == "disk") {
                id = "diskDev";
            }
            if (id == "bill") {
                top.MB.show(8);
            } else if (id == "compose") {
                var option = this.makeObject(params) || null;
                top.CM.show(option);
            } else if (id == "password") {
                top.$App.show("account", params);
            } else {
                var item = top.LinksConfig[id];
                if (item) {
                    top.Links.show(id, params);
                } else {
                    this.showNoUrl();
                }
            }
        } else {
            this.showNoUrl();
        }
    },
    showNoUrl: function () {
        top.$Msg.alert("抱歉，当前版本没有该业务");
    }
};

try {
    letterContentBottomLoad();
} catch (e) {
    if (window.console) {
        //console.log(e);
    }
}