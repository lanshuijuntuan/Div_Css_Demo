/**
 * Created by zhouhongquan on 2018/2/9.
 */
/* 1.ie7以下的XMLHttpRequest
 function createXHR(){
 if(typeof arguments.callee.activeXString!="string"){
 var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
 i,len;
 for(i=0,len=versions.length;i<len;i++){
 try{
 new ActiveXObject(version[i]);
 arguments.callee.activeXString=versions[i];
 break;
 }catch(ex){

 }
 }
 }
 return new ActiveXObject(arguments.callee.activeXString);
 }
 */


/* 2.ie7以上的浏览器创建XMLHttpRequest

 function createXHR(){
 if(typeof XMLHttpRequest!="undefined"){
 return new XMLHttpRequest();
 }else if(typeof ActiveXObject!="undefined"){
 if(typeof arguments.callee.activeXString!="string"){
 var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
 i,len;

 for(i=0,len=versions.length;i<len;i++){
 try{
 new ActiveXObject(version[i]);
 arguments.callee.activeXString=versions[i];
 arguments.callee.activeXString=versions[i];
 break;
 }catch(ex){

 }
 }
 }
 return new ActiveXObject(arguments.callee.activeXString);
 }else{
 throw new Error("No XHR object available.");
 }
 }

 var xhr=createXHR();
 alert(xhr);
 */

/* 3.发送请求，同步方式接收数据

 xhr.open("get","example.txt",false);
 xhr.send(null);

 if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
 alert(xhr.responseText);
 }else{
 alert("Request was unsuccessful:"+xhr.status);
 }
 */

/* 4.异步请求数据

 var xhr=createXHR();

 xhr.onreadystatechange=function(){
 if(xhr.readyState==4){
 if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
 alert(xhr.responseText);
 }else{
 alert("Request was unsuccessful:"+xhr.status);
 }
 }
 };
 xhr.open("get","example.txt",true);
 xhr.send(null);


 */