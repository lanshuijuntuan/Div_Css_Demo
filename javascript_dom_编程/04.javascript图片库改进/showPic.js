/**
 * Created by zhouhongquan on 2018/1/25.
 */
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareLinks);
function prepareLinks() {
    debugger;
    if (!document.getElementsByTagName || !document.getElementById) return false;
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    if (links.length > 0) {
        for (var i = 0; i < links.length; i++) {
            links[i].onclick = function () {
                return !showPic(this);

            }
        }
    }

}
function addLoadEvent(func) {
    debugger;
    var oldLoadfun = window.onload;
    if (typeof  window.onload != "function") {
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldLoadfun();
            func();
        }
    }
}
function showPic(pic) {
    debugger;
    if (!document.getElementById("placeholder")) return false;
    var placeholder = document.getElementById("placeholder");
    if (!document.getElementById("description")) return false;
    var description = document.getElementById("description");
    if (placeholder.nodeName.toUpperCase() != "IMG") {
        return false;
    }
    var source = pic.getAttribute("href");
    placeholder.setAttribute("src", source);
    var title = pic.getAttribute("title") == null ? "" : pic.getAttribute("title");
    description.childNodes[0].nodeValue = title;
    return true;
}

function preparePlaceholder() {
    if(!document.getElementById("mainContent")) return false;
    var mainContent=document.getElementById("mainContent");
    var img=document.createElement("img");
    img.src="1.jpg";
    img.id="placeholder";
    img.alt="此为测试图片";
    img.width=600;
    img.height=400;
    var para=document.createElement("p");
    para.id="description";
    para.appendChild(document.createTextNode("请选择图片。"))
    mainContent.appendChild(img);
    mainContent.appendChild(para);
}


