/**
 * Created by zhouhongquan on 2018/1/26.
 */
addLoadEvent(function () {
    styleHeaderSiblings("h1","intro");
});
function  getNextElement(node) {
    if(node.nodeType==1){
        return node;
    }
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}

function  styleHeaderSiblings(tag,theclass) {
    if(!document.getElementsByTagName) return false;
    var headers=document.getElementsByTagName(tag);
    var ele;
    for(var i=0;i<headers.length;i++){
        elem=getNextElement(headers[i].nextSibling);
        addClass(elem,theclass);
    }

}

function  addClass(element,value) {
    if(!element.className){
        element.className=value;
    }else{
        newClassName=element.className;
        newClassName+=" ";
        newClassName+=value;
        element.className=newClassName;
    }
}