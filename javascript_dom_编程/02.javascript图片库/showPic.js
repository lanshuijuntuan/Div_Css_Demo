/**
 * Created by zhouhongquan on 2018/1/25.
 */
function showPic(pic) {
    debugger;
    var source = pic.getAttribute("href");
    var title = pic.getAttribute("title");

    var placeholder = document.getElementById("placeholder");
    var description = document.getElementById("description");

    placeholder.setAttribute("src", source);
    description.childNodes[0].nodeValue = title;
}


function countBodyChildren() {
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.nodeType);
}
function popUp(winurl) {
    window.open(winurl,"popup","width=320,height=480");
}

window.onload = countBodyChildren;
window.onunload = countBodyChildren;