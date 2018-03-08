M139.namespace("M2012",{ShortcutKey:Backbone.Model.extend({win:null,target:null,currentTab:null,topView:null,KEYCODEMAP:{A:65,C:67,D:68,F:70,N:78,R:82,S:83,V:86,X:88,BACKSPACE:8,ENTER:13,LEFTSLASH:191,LEFTBRACE:219,RIGHTBRACE:221},initialize:function(t){this.win=t.win||top.window,this.currentTab=$App.getCurrentTab(),this.target=t.currEvent.srcElement||t.currEvent.target||{},this.handleEvents(t.currEvent)},handleEvents:function(t){var e=this,s=e.KEYCODEMAP,a=t.ctrlKey,n=t.shiftKey,i=(t.altKey,t.keyCode||t.which);switch(i){case s.ENTER:a&&e.sendMail();break;case s.A:n&&e.replyMail({replyall:!0});break;case s.N:n&&(e.openCompose(t),top.BH("shortcut_openCompose"));break;case s.D:n&&e.deleteMail();break;case s.F:n&&e.forwardMail();break;case s.R:n&&e.replyMail({replyall:!1});break;case s.C:a&&e.saveDraft();break;case s.LEFTSLASH:var p=e.target.tagName&&/input|textarea/i.test(e.target.tagName),l=e.win&&e.win.location.href.indexOf("blank.htm")>-1;if(l||p)return;n?((new M2012.ShortcutKey.HelpDocument).show(),top.BH("shortcut_showhelpdoc")):e.focusOnSearch(),M139.Event.stopEvent(t);break;case s.LEFTBRACE:e.changeMail(-1);break;case s.RIGHTBRACE:e.changeMail(1);break;case s.BACKSPACE:}},focusOnSearch:function(){var t=$("#tb_mailSearch");if(t){if($B.is.firefox){t.focus();var e=t.val();t.val(e.substring(0,e.length-1>=100?100:e.length-1))}else t.focus();top.BH("shortcut_focuson")}},sendMail:function(){if(this.currentTab.name.indexOf("compose")>=0){var t=$(this.currentTab.element).find("iframe")[0].contentWindow.document;$("#topSend",t)[0]&&($("#topSend",t)[0].click(),top.BH("shortcut_sendMail"))}},replyMail:function(t){var e={attach:!1,command:"reply",mids:[],all:t.replyall||!1};this.currentTab.name.indexOf("readmail")>=0&&e.mids.push($App.getCurrMailMid()),e.mids.length>0&&$App.trigger("mailCommand",e),t.replyall?top.BH("shortcut_replyAll"):top.BH("shortcut_replyMail")},openCompose:function(t){this.topView||(this.topView=new M2012.Main.View.TopView),this.topView.onComposeClick&&this.topView.onComposeClick(t)},deleteMail:function(){this.currentTab.name.indexOf("readmail")>=0&&($App.trigger("mailCommand",{command:"move",fid:4}),top.BH("shortcut_delMail"))},forwardMail:function(){var t=this.currentTab.view.model.get("mid");t&&this.currentTab.name.indexOf("readmail")>=0&&($App.trigger("mailCommand",{command:"forward",attach:!1}),top.BH("shortcut_forwardMail"))},saveDraft:function(){if(this.currentTab.name.indexOf("compose")>=0){var t=$(this.currentTab.element).find("iframe")[0].contentWindow.document;$("#topSave",t)[0]&&($("#topSave",t)[0].click(),top.BH("shortcut_saveDraft"))}},changeMail:function(t){if(this.currentTab.name.indexOf("readmail")>=0){var e=this.currentTab.view.$el,s=0>t?"iconPrev":"iconNext";if($(e).find("a."+s).length<=0){var a=0>t?"已到最新一封":"已到最后一封";M139.UI.TipMessage.show(a,{delay:2e3})}else $(e).find("a."+s).click();0>t?top.BH("shortcut_preMail"):top.BH("shortcut_nextMail")}}})}),M139.namespace("M2012.ShortcutKey",{HelpDocument:Backbone.View.extend({el:"body",template:["",'<div class="hotkeysTipsBox">','<div class="hotkeysTipsTitle">','<h2 id="shortcutHelpDocTip" class="fz_14" style="line-height:40px; color:#175fa2;">{tip}</h2>',"</div>",'<div class="hotkeysTipsMain">','<h2 class="fz_14 fw_n">应用程序</h2>',"<ul>",'<li><div class="ta_r hotkeys"><span>/&nbsp;&nbsp;</span>:</div><div class="hotkeysText">聚焦至搜索框</div></li>','<li><div class="ta_r hotkeys"><span>Ctrl</span>&nbsp;&nbsp;+&nbsp;&nbsp;<span>c</span>&nbsp;&nbsp;:</div><div class="hotkeysText">保存草稿</div></li>','<li><div class="ta_r hotkeys"><span>Shift</span>&nbsp;&nbsp;+&nbsp;&nbsp;<span>n</span>&nbsp;&nbsp;:</div><div class="hotkeysText">新建写信</div></li>',"</ul>",'<h2 class="fz_14 fw_n">操作</h2>',"<ul>",'<li><div class="ta_r hotkeys"><span>[</span>&nbsp;&nbsp;:</div><div class="hotkeysText">查看上一封</div></li>','<li><div class="ta_r hotkeys"><span>]</span>&nbsp;&nbsp;:</div><div class="hotkeysText">查看下一封</div></li>','<li><div class="ta_r hotkeys"><span>Shift&nbsp;&nbsp;</span>+&nbsp;&nbsp;<span>r</span>&nbsp;&nbsp;:</div><div class="hotkeysText">回复邮件</div></li>','<li><div class="ta_r hotkeys"><span>Shift&nbsp;&nbsp;</span>+&nbsp;&nbsp;<span>a</span>&nbsp;&nbsp;:</div><div class="hotkeysText">回复全部</div></li>','<li><div class="ta_r hotkeys"><span>Shift&nbsp;&nbsp;</span>+&nbsp;&nbsp;<span>f</span>&nbsp;&nbsp;:</div><div class="hotkeysText">转发邮件</div></li>','<li><div class="ta_r hotkeys"><span>Shift&nbsp;&nbsp;</span>+&nbsp;&nbsp;<span>d</span>&nbsp;&nbsp;:</div><div class="hotkeysText">删除邮件</div></li>','<li><div class="ta_r hotkeys"><span>Ctrl&nbsp;</span>+&nbsp;<span>Enter</span>&nbsp;&nbsp;:</div><div class="hotkeysText">发送邮件</div></li>',"</ul>","</div>","</div>"].join(""),initialize:function(){},show:function(){if(!$("#shortcutHelpDocTip").length){var t=this,e=t.getStatusDate($App.getCustomAttrs("shutShortcutKey"));t.template=$T.Utils.format(t.template,{tip:e.tip});$Msg.showHTML(t.template,{dialogTitle:"快捷键帮助",width:360})}},getStatusDate:function(t){var e=Boolean(t)?'键盘快捷键已禁用<a href="javascript:new M2012.ShortcutKey.HelpDocument().handleShortcut();top.BH(\'shortcut_open\');" class="pl_10 fz_12  fw_n" style="color:#de0202;">启用快捷键</a>':'<span style="color:#01680e;">键盘快捷键已启用</span><a href="javascript:new M2012.ShortcutKey.HelpDocument().handleShortcut();top.BH(\'shortcut_shut\');" class="pl_10 fz_12  fw_n" style="color:#de0202;">禁用快捷键</a>';return{tip:e}},handleShortcut:function(){var t=$App.getCustomAttrs("shutShortcutKey");t=Boolean(t)?"":"1";var e=this.getStatusDate(t);$App.setCustomAttrs("shutShortcutKey",t),$("#shortcutHelpDocTip").html(e.tip)}})});