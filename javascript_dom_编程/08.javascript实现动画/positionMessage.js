/**
 * Created by zhouhongquan on 2018/1/26.
 */
addLoadEvent(positionMessage);
function  positionMessage() {
    if(!document.getElementById) return false;
    if(!document.getElementById("message")) return false;
    var elem=document.getElementById("message");
    elem.style.position="absolute";
    elem.style.left="50px";
    elem.style.top="100px";
    moveElement("message",100,200,25);
    if(!document.getElementById("message2")) return false;
    var elem2=document.getElementById("message2");
    elem2.style.position="absolute";
    elem2.style.left="300px";
    elem2.style.top="25px";
    moveElement("message2",100,200,25);
}