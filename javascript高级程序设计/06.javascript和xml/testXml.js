/**
 * Created by zhouhongquan on 2018/2/9.
 */
/* 1.创建xml文档
var xmldom=document.implementation.createDocument("","root",null);
alert(xmldom.documentElement.tagName);
var child=xmldom.createElement("child");
xmldom.documentElement.appendChild(child);
alert(xmldom.toString());
*/

/* 2.检查浏览器是否支持Xml2.0
var hasXmlDom=document.implementation.hasFeature("XML","2.0");
alert(hasXmlDom);
*/

/* 3.字符串转xml
 var parser=new DOMParser();
 var xmlDom=parser.parseFromString("<root><child/></root>","text/xml");
 alert(xmldom.documentElement.tagName);
 alert(xmldom.documentElement.firstChild.tagName);

 var anotherChild=xmldom.createElement("child");
 xmldom.documentElement.appendChild(anotherChild);
 var children=xmldom.getElementsByTagName("child");
 alert(children.length);
 */

/* 4.DOMParser错误处理
 var parser=new DOMParser(),
 xmldom,
 errors;
 try{
 xmldom=parser.parseFromString("<root>","text/xml");
 errors=xmldom.getElementsByTagName("parsererror");
 if(errors.length>0){
 throw new Error("Parsing error!");
 }
 }catch(ex){
 alert("Parsing error!");
 }


 */


/* 5.xml文档序列化
 var serializer=new XMLSerializer();
 var xml=serializer.serializeToString(xmldom);
 alert(xml);
 */




