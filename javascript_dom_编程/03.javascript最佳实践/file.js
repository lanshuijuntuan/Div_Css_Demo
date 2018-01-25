/**
 * Created by zhouhongquan on 2018/1/25.
 */
window.onload = prepareLinks;
function  prepareLinks() {
    if (!document.getElementsByTagName) return false;
    var links=document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        if(links[i].getAttribute("class")=="popup"){
            links[i].onclick=function(){
                popUp(this.getAttribute("href"));
                return false;
            }
        }
    }
}




function countBodyChildren() {
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.nodeType);
}
function popUp(winurl) {
    window.open(winurl,"popup","width=480,height=320");
}

