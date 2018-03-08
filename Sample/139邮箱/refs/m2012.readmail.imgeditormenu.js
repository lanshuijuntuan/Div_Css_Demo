/**
 * @图片编辑菜单
 * @2014-7-9 modifid by wn
 * 
 */
(function(){
var MENU_HEIGHT = 157,
    MENU_WIDTH = 25; 

/**
 * [ImgMenu description]
 * Menu constructor 
 * every iframe keep an instance 
 */

function EditorMenu( global ,  outter , container ){
    this.store = {};
    var that = this;
    this.is_active = false ;
    var c_doc = global.document;
    this.inner_window = global ;
    this.container = container;
    this.container_window = outter ;
    var current_context = that.current_context = c_doc.body ;

    var imgs = current_context.getElementsByTagName("IMG");

    for(var i = 0 ; i < imgs.length ; ++ i ){
        if( imgs[i].id ){
            imgs[i].setAttribute("data-mark" , "older" );
        }else{
            imgs[i].setAttribute("data-mark" , "empty" );
        }
    }

    $(that.current_context).mousemove(function( e ) {
            var cur = e.target || e.srcElement ;
            if(cur.tagName !=="IMG"){
                return;
            }

            if ($(cur).attr("name") && $(cur).attr("name").indexOf("hideEditorBar") != -1){ // 如果是电子签名中的图片也不处理(包括个性图像和二维码图片)
                return;
            }

            var src = $(cur).attr("src");
            //过滤表情 ， 过滤签名域
            if(!src || /m2012\/images\/face/.test(src)  ){return}
            var domain = window.location.host.match(/[^.]+\.[^.]+$/)[0];
            var postcardDisplay = src.indexOf(domain) == -1 ? 'none' : ''; //外域不显示发送明信片
            var ecodesrc = encodeURIComponent(encodeURIComponent(src));
             // <a href="javascript:top.Links.show(\'postcard\', \'&diskimage=' + ecodesrc + '\')" behavior="读信页-制作明信片" class="menubarbg menubarrcolr" style="display:' + postcardDisplay + ';" title="制作明信片"></a>\ 
            if(!that.is_active){
                that.show( cur , that.container );
            }
        }).mouseout(function( e ) {
            var cur = e.target;
            if( cur.tagName === "IMG"){
                that.is_active = false;
                that._handleHide( that.container );
            }
        });

    that.tool_wrapper = outter.document.createElement("DIV");
    // 支持canvas的浏览器才显示编辑图片的图标
    var isSupportCanvas = !!document.createElement('canvas').getContext;
    var tDiv = that.tool_wrapper;
        tDiv.className = "insertImgBox" ;
        tDiv.style.cssText ="position:absolute;top:0px;left:0px;display:inline;";
        tDiv.innerHTML = '<div contenteditable="false" class="insertImgBox_ctrl">\
                                        <a  class="aBig" title="放大"><i data-action="zoom" data-scale = "10" class="i-big"></i></a>\
                                        <div class="lineBoxWrap" ><span class="lineBox"><div onselectstart="return false;" style="height:50%;position:relative;-moz-user-select:none;"><a data-action="scale" onselectstart="return false;" ondragstart="return false;" style="-moz-user-select:none;"></a></div></span></div>\
                                        <a  class="aSmall" title="缩小"><i data-action="zoom" data-scale = "-10" class="i-small"></i></a>\
                                        <span class="lineImg"></span>\
                                        <a class="aBs"><i title="最佳尺寸" data-action="zoom" data-size="350" class="i-allScroll"></i></a>\
                                        <span class="lineImg"></span>\
                                        <a class="aBs"><i title="删除图片" data-action="del" class="i-del"></i></a>'
                                      + (isSupportCanvas ? '<span class="lineImg"></span>\
                                        <a class="aBs" style=""><i title="编辑图片" data-action="edit" class="i-edit"></i></a>' : '')
                                      + '</div>';
        this.slider_btn = tDiv.getElementsByTagName("DIV")[2] ;
    var slider_btnWrapper = tDiv.getElementsByTagName("DIV")[1] ;
        $(tDiv).click( function( e ){
            var cur = e.target || e.srcElement,
                    action = cur.getAttribute("data-action");
                    if( action !== "del" && !checkImgExisted( that ) ){
                        return;
                    }
                    if(that.events[action]){
                        that.events[action].apply(cur , [ e , that ]);
                    }
                if( action === "zoom"  ){
                    if(cur.getAttribute("data-size")){
                        var size = parseInt( cur.getAttribute("data-size") , 10 );
                        var c_name = cur.className ;
                        var best_size = that.store[ that.curImg.id ].best;
                        var inner_tpl = '<i title="原始尺寸" data-action="zoom" data-size="'+ that.o_width + '" class="i-scale" ></i>';
                        if( c_name === "i-allScroll" ){
                           cur.parentNode.innerHTML = inner_tpl ;
                           that.store[that.curImg.id].b_status = inner_tpl;
                        }else{
                            inner_tpl = '<i title="最佳尺寸" data-action="zoom" data-size="' + that.store[ that.curImg.id ].best + '" class="i-allScroll"></i>';
                            cur.parentNode.innerHTML = inner_tpl;
                            that.store[that.curImg.id].b_status = inner_tpl;
                        }
                    }
                }                
            });
            tDiv.onmousemove = function(){
                that.is_active = true;
            };
            tDiv.onmouseleave = function(){
                that.is_active = false;
                that._handleHide();
                cancelMove();
            };
            function cancelMove(){
                $(slider_btnWrapper).unbind("mousemove");
                $(slider_btnWrapper).unbind("mouseup");
            }
            $(slider_btnWrapper).on("mousedown" , function(){
                if(!checkImgExisted( that )){
                    return;
                }
                $(slider_btnWrapper).on("mousemove" , function( e ){
                    var offset = $(slider_btnWrapper).offset();
                    var h = $(slider_btnWrapper).height();
                    var y = e.pageY ;
                    var dy = y - offset.top;
                    e._per =  ( h - dy )/(h/2) ;
                    ImgEditorMenu.events["zoom"].apply( slider_btnWrapper , [ e , that ] );
                });
                $(slider_btnWrapper).on( "mouseup" , function(){
                    cancelMove();
                }); 
            });
}


ImgEditorMenu = {};

EditorMenu.prototype = ImgEditorMenu;

function handleImg( img , win){
    var store = win.__EditorMenu.store;
    var b_width = $(win.document.body).width();
    store[img.id] = {};
    store[img.id].width = $(img).width();
    store[img.id].height = $(img).height(); 
    store[img.id].b_status = '<i title="原始尺寸" data-action="zoom" data-size="'+ store[img.id].width + '" class="i-scale" ></i>';                        
    if( $(img).width() > b_width*0.8 ){ //产品要求修改为0.8
        store[img.id].best = b_width;
        if((img.getAttribute("data-mark") != "older" ) && (img.name != "hideEditorBar")){
            $(img).css({
                width : b_width
            });
        }

        var oldHeight = $(img).height();
        var oldWidth = $(img).width();
        if (ImgEditorMenu.param && ImgEditorMenu.param.isAdjustWidth){
            var maxWidth = b_width * 0.8; // 图片最大宽度
            // 从手机上传图片后插入到正文,需要根据屏幕宽度自动调整
            if( $(img).width() > maxWidth){
                var ratio = maxWidth/oldWidth;   // 计算缩放比例
                $(img).css({
                    width : maxWidth,
                    height : oldHeight * ratio
                });
                //设置class用于的大小
                if(ImgEditorMenu.param.isAdjustWidth.newWidthClass){
                    $(img).addClass("newWidthClass");
                    bindImgEvent();
                }
            }
        }
    }else{
        store[img.id].best = store[img.id].width;
    } 
  
}
function bindImgEvent(){
    var currentWindow = $App.getCurrentTab().element;
    var currentIframeDoc = $(currentWindow).find("iframe")[0].contentWindow.document;
    var editDoc = $(currentIframeDoc).find("iframe")[1].contentWindow.document;
    var tipTemplate = ['<div id="loadImgTip" contenteditable="false" class="photo-edit removeContent" style="position: fixed;top:0px;left: 0px;font:12px/1.5 '+"'Helvetica','PingFang SC','HanHei SC','STHeitiSC-Light','Microsoft YaHei','SimSun','Arial',sans-serif"+';">',
        '<a href="javascript:;" class="close-txt" style="cursor:pointer;text-decoration:none;">×</a>',
        '<div class="photo-edit-txt">图片尺寸过大，已为您智能缩小显示，图片质量不变&nbsp;&nbsp;<a href="javascript:;"  style="cursor:pointer;text-decoration:none;" class="oldWidth">显示原始大小</a></div>',
        '</div>'].join("");
    if($("#loadImgTip",editDoc).length>0){
        return;
    }
    $("body",editDoc).append(tipTemplate);
    $("#loadImgTip",editDoc).click(function(e){
        var el = e.target;
        if(el.className ==  "oldWidth"){
            top.BH("imgKeepSize");
            $("img[class=newWidthClass]",editDoc).css({width:"",height:""});
            $(this).remove();
        }
        if(el.className == "close-txt"){
            top.BH("closeImgTip");
            $(this).remove();
        }
    })
}
function checkImgExisted( curMenu ){
    if( !curMenu.current_context._obj.editorWindow.document.getElementById(curMenu.curImg.id)){
        curMenu.events.del.apply( curMenu , [ curMenu , curMenu ] );
        return false;
    }    
    return true;
}

/**
 * [initImg 初始化图片，判断图片是否加载完成，然后保存其原始大小]
 * @param  {[type]} img [description]
 * @param  {[type]} win [目标文档window对象，图片加载完成后，滚到到图片的高度]
 * @return {[type]}     [description]
 */
function initImg( img , win ){
    var marker = img.getAttribute("data-mark") ;
    if( img.id && ( marker !== "older" ) ){return;}
    var hasLoaded;
    if( img.complete !== undefined ){
        hasLoaded = img.complete;//判断图片是否加载完成
    }else{
        hasLoaded = img.readyState === "complete" ;
    }
    img.id = "img_" + Math.random();
    if( !hasLoaded ){
        img.onload = function(){
            /**
             * [onload IE7 BUG ]
             * fixed
             * @type {[type]}
             */
            img.onload = null;
            setTimeout(function(){
                handleImg( img , win );
            },0);                   
        };
    }else{
        handleImg( img , win );                         
    }
    if(!$.browser.webkit){
        img.contentEditable = false;
    }

}

/**
 * [mouseEvent 入口函数.]
 * @param  {[type]} obj           [description]
 * @return {[type]}               [description]
 */
ImgEditorMenu.mouseEvent = function( obj, param){
    var cur_tab = $App.getCurrentTab();
    var orignName = cur_tab.orignName;
    ImgEditorMenu.param = param; // 保存外部传递过来的参数,新增

    if( !orignName || orignName !== "compose" ){
        return;
    }    
    var ff = document.getElementById(cur_tab.name) || document.getElementById('compose_preload');
    if (ff){
        var e_content = $(ff.contentWindow.document.getElementById("htmlEdiorContainer") )
            .find(".eidt-content");
        if(e_content.length==0){return ;}
        var head = $(ff.contentWindow.document).find('head');
        if(head.find('style#imgEditorMenuStyle').length == 0){
            head.append(this.getImageToolbarStyle());
            ImgEditorMenu.init( obj[0]._obj.editorWindow , ff.contentWindow , e_content[0] );
        }

        var that = this;
        var imgs = obj.find("IMG");
        var last_img = imgs[imgs.length - 1 ];

        for(var i = 0 ; i < imgs.length ; ++i ){
            initImg( imgs[i] ,  obj[0]._obj.editorWindow );
        }
    }
};

ImgEditorMenu.init = function( inner , outter , con ){
    inner.__EditorMenu = new EditorMenu( inner , outter , con );
};
ImgEditorMenu._handleHide = function(){
    var that = this ;
    var timer = this.timer ;
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(function(){
        if(!that.is_active){
            that.hide();
        }
    } , 300 );
};
ImgEditorMenu.show = function( img , context ){
    this.o_width = this.store[img.id] ? this.store[img.id].width : 10;
    this.o_height = this.store[img.id] ? this.store[img.id].height: 10 ;
    this.curImg = img ;
    this.$img = $(img) ;
    var limit_max = $(this.container).height() - MENU_HEIGHT;
    this.container.appendChild(this.tool_wrapper);
    $(this.tool_wrapper).attr("imgsrc",$(img).attr("src"));
    var orgin_btn = this.tool_wrapper.getElementsByTagName("A")[3];

    if(img.id && this.store[img.id].b_status){
        // 容错, IE下直接粘贴图片后, 点击图片工具栏按钮会报错
        orgin_btn.innerHTML = this.store[img.id].b_status ;
    }

    $(this.tool_wrapper).show();
    var offset = $(img).offset();
    var offsetTop = $(this.inner_window.document).scrollTop();
    var t = offset.top - offsetTop;
    if( t < 0 ){
        t = 0;
    }
    if( t > limit_max ){
        t = limit_max;
    }

    $(this.tool_wrapper).css({
        left : offset.left ,
        top : t
    });  
    this.is_active = true;
    this.repaint();
};
ImgEditorMenu.hide = function(){
    var p = this.tool_wrapper.parentNode ;
    try{
       p.removeChild( this.tool_wrapper );
    }catch(e){}
};
ImgEditorMenu.repaint = function(){
    var $img = this.$img;
    this.slider_btn.style.height = (100 - $img.height()/this.o_height * 50) + "%";
};
ImgEditorMenu.events = {
    zoom : function( e , em ){
        var scale = this.getAttribute("data-scale")  ;
        var width = em.$img.width();
        var height = em.$img.height();
        var size = this.getAttribute("data-size") ;
        if( scale ){
            var percent = ( 100 + parseInt( scale , 10 ) )/100 ; 
                height =  height * percent ;
                width = width * percent ;                
        }
        if( size ){
            width = parseInt(size , 10);
            height = "auto";
        }
        if( e._per ){
            height =  em.o_height * e._per ;
            width = em.o_width * e._per ;             
        }
        if( height/em.o_height >= 2 ){
            height = em.o_height * 2;
            width = em.o_width * 2;
        }
        if( height/em.o_height <= 0.1 ){
            height = em.o_height * 0.1 ;
            width = em.o_width * 0.1 ;
        }
        em.$img.css({
            width : width , 
            height : height
        });
        em.repaint();
    },
    del : function( e , em ){
        var p = em.curImg.parentNode;
        try{
            p.removeChild( em.curImg );
        }catch(e){}
        setTimeout(function(){
            em.store[ em.curImg.id ] = null;
            em.curImg = null;
            em.hide();
        },0);

    },
    edit : function(e, em){
        top.BH && top.BH("compose_toolbar_editPicOperate");
        if (!em || !em.curImg) {
            console.warn && console.warn("the picture is not exist");
            return;
        }

        var img = em.curImg;
        var fileName = top.$Url.queryString("fileName", img.src);
        var callback = function(src){ // 回调
           img.src = src;
        };

        var param = {
            img : img, // 试试直接传image对象
            doc : top.document,
            onComplete :function(base64Str){
                // 点击完成按钮后的回调函数
                // 1. 调用上传接口获取fileId,fileName
                // 2. 将fileId,fileName拼接到下载地址
                // 3. 将对应图片的src替换成下载地址
                var data = {
                    composeId : ImgEditorMenu.param.composeId,
                    filename : fileName || "picture",
                    content: base64Str.substring(22,base64Str.length),
                    filesize : "",
                    type : "internal"
                };

                M139.RichMail.API.call("attach:uploadPicBase64", data, function(response) {
                    if (response && response.responseData && (response.responseData["code"] === "S_OK")){
                        var obj = response.responseData["var"];
                        callback && callback(getDownloadUrl(obj));
                        return;
                    }

                    // return value exception
                    console.warn && console.warn("the returnObj is error!!");
                });

                function getDownloadUrl(obj){
                    var url = "/RmWeb/view.do?func=attach:getAttach&sid="+ImgEditorMenu.param.sid+"&fileId="+obj.fileId + "&fileName=" + encodeURIComponent(obj.fileName);
                    url = top.getProtocol() + location.host + url;
                    return url;
                }
            }
        };

        // load first
        if (_.isUndefined(M2012.ReadMail) || _.isUndefined(M2012.ReadMail.Component)
            || _.isUndefined(M2012.ReadMail.Component.ImageEditor)){
            M139.core.utilCreateScriptTag({
                id: "imageditor",
                src: top.getRootPath() + "/js/richmail/readmail/m2012.readmail.component.imageeditor.js",
                charset: "utf-8"
            }, function () {
                window.$canvasEditor = new M2012.ReadMail.Component.ImageEditor(param);
            });
            return;
        }

        // has load situation
        window.$canvasEditor && window.$canvasEditor.render(param);
    }
};
//加载样式
ImgEditorMenu.getImageToolbarStyle = function(){
    var styleHTML = '<style id="imgEditorMenuStyle" type="text/css">\
.insertImgBox{position:relative;}\
.insertImgBox_ctrl{position:absolute;left:0;top:0;z-index:11;width:25px;padding:2px 0 5px;*padding-top:7px;overflow:hidden;_zoom:1;\
    filter:progid:DXImageTransform.Microsoft.gradient(enabled="true",startColorstr="#7f000000", endColorstr="#7f000000");\
    background-color:rgba(0,0,0,.5);\
}\
:root .insertImgBox_ctrl{filter:none;}\
.insertImgBox_ctrl a{float:left;width:25px;height:25px;text-align:center;line-height:25px;}\
.i-big,.i-small,.i-allScroll,.i-scale,.i-del,.i-edit{background-image:url(../images/global/wIc.png);_background-image:url(../images/global/wIcIE6.png);display:inline-block;cursor:pointer;overflow:hidden;}\
.i-big,.i-small{width:14px;height:14px;}\
.i-big{background-position:-1px -1px;}\
.i-edit{background-position:-89px 0;width:11px;height:11px;}\
.aBig:hover .i-big{background-position:-19px -1px;}\
.i-small{background-position:-37px -1px;}\
.aSmall:hover .i-small{background-position:-55px -1px;}\
.aSmall{margin-top:3px;}\
.aBs .i-allScroll{margin:4px 0 0 -2px;}\
.i-allScroll{width:16px;height:16px;background-position:-1px -19px;}\
.aBs:hover{background-color:black;opacity:1;filter:none;}\
.i-del{background-position:-42px -19px;width:14px;height:14px;}\
.i-scale{background-position:-22px -72px;width:16px;height:10px;}\
.aBs .i-scale{*margin-top:8px;}\
.aBs .i-del{margin-top:5px;}\
.lineBoxWrap{position:relative;*top:-4px;float: left;padding:0 5px;margin-left:7px;display:inline;cursor: pointer;*zoom:1;}\
.lineBox{width:2px;height:50px;background-color:#999;font-size:0;float:left;cursor:pointer;}\
.lineBox a{width:9px;height:4px;padding:0;font-size:0;overflow:hidden;background-color:white;display:inline-block;position:absolute;left:-4px;bottom:-3px;\
    -webkit-border-radius:2px;\
    -moz-border-radius:2px;\
    border-radius:2px;\
}\
.lineBox a:hover,.lineBoxWrap:hover .lineBox a{background-color:#27CAED;}\
.lineImg{opacity:.2;filter:alpha(opacity=20);border-top:1px solid white;width:25px;height:0;font-size:0;overflow:hidden;float:left;}\
</style>';
    return styleHTML;
}
})();
