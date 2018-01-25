/**
 * Created by zhouhongquan on 2018/1/25.
 */
addLoadEvent(getNewContent);
function  getHttpObject() {
    if(typeof XMLHttpRequest=="undefined"){
        XMLHttpRequest=function () {
            try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
            catch (e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
            catch (e){}
            try{return new ActiveXObject("Msxml2.XMLHTTP");}
            catch (e){}
            return false;
        }
    }
    return new XMLHttpRequest();

}

function addLoadEvent(func) {
    var oldLoadEvent=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }
    else
    {
        window.onload=function () {
            oldLoadEvent();
            func();
            
        }
    }
}

function getNewContent() {
    debugger;
    var request=getHttpObject();
    if(request){
        request.open("GET","example.txt",true);
        request.onreadystatechange=function () {
            if(request.readyState==4){
                var para=document.createElement("p");
                var txt=document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById("new").appendChild(para);
            }
        };
        request.send(null);
    }
    else
    {
        alert("Sorry,your browser doesn,t support XMLHTTPRequest");
    }
}