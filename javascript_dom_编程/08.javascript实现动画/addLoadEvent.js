/**
 * Created by zhouhongquan on 2018/1/26.
 */
function addLoadEvent(func) {
    var oldLoad=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }
    else
    {
        window.onload=function () {
            oldLoad();
            func();
        }
    }
}