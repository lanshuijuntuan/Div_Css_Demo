/**
 * Created by zhouhongquan on 2018/1/30.
 */

function compare(a,b) {
    "use strict";
    if(a<b){
        alert("A is less than B");
    }
    else if(a>b){
        alert("A is greater than b");
    }else {
        alert("a is equal to b");
    }
}


function  testDataType() {
    var a=1;
    var b=1.2;
    var c="测试数据类型";
    var d=false;
    var e;
    var f={"name":"张三"};
    var g=new Array();
    var h=function () {
        alert("110");
    }
    var i=null;
    alert("a:"+typeof a);
    alert("b:"+typeof b);
    alert("c:"+typeof c);
    alert("d:"+typeof d);
    alert("e:"+typeof e);
    alert("f:"+typeof f);
    alert("g:"+typeof g);
    alert("h:"+typeof h);
    alert("null:"+typeof null);
}

