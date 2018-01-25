/**
 * Created by zhouhongquan on 2018/1/25.
 */
addLoadEvent(BuildDivTest);
function  addLoadEvent(func) {
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

function insertText(text) {
    debugger;
   var str="<p>";
    str+=text;
    str+="</p>";
    document.write(str);
}

function InsertInnerText() {
  var body=document.getElementsByTagName("body")[0];
    body.innerHTML="<p>这是使用innerHTML插入数据</p>";
}

function BuildDivTest() {
    debugger;
    if(!document.getElementById("testdiv")) return false;
    var testdiv=document.getElementById("testdiv");
    var para=document.createElement("p");
    var txt1=document.createTextNode("这是使用");
    var em=document.createElement("em");
    var txt2=document.createTextNode("Dom方法");
    em.appendChild(txt2);
    var txt3=document.createTextNode("创建的。");
    para.appendChild(txt1);
    para.appendChild(em);
    para.appendChild(txt3);
    testdiv.appendChild(para);
}