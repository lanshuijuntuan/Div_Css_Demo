/**
 * Created by zhouhongquan on 2018/1/26.
 */
addLoadEvent(prepareSlideshow)
function prepareSlideshow() {
    if(!document.createElement||!document.createTextNode
        ||!document.getElementById||!document.getElementsByTagName)
        return false;

    var slideshow=document.createElement("div");
    slideshow.setAttribute("id","slideshow");

    var preview=document.createElement("img");
    preview.setAttribute("src","1.jpg");
    preview.setAttribute("alt","building blocks of web design");
    preview.setAttribute("id","preview");

    slideshow.appendChild(preview);
    var list=document.getElementById("linklist");
    insertAfter(slideshow,list)



    var  links=list.getElementsByTagName("a");

    links[0].onmouseover=function () {
        moveElement("preview",-100,0,10);
    }
    links[1].onmouseover=function () {
        moveElement("preview",-200,0,10);
    }
    links[2].onmouseover=function () {
        moveElement("preview",-300,0,10);
    }
}