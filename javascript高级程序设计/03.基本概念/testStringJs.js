/**
 * Created by zhouhongquan on 2018/2/1.
 */
function  testStr() {
    //ECMAScript字符串是不可变的，
    var lang="Java";
    lang=lang+"Script";
    alert(lang);

    //字符串转换 1.使用toString()方法
    var age=11;
    var ageAsString=age.toString();
    var found=true;
    var foundAsString=found.toString();
    //2.带参数的toString()方法
    var num=10;
    alert(num.toString());
    alert(num.toString(2));
    alert(num.toString(8));
    alert(num.toString(10));
    alert(num.toString(16));

    //3.使用转型函数String()，这个函数能够将任何类型的值转换为字符串
    var value1=10;
    var value2=true;
    var value3=null;
    var value4;

    alert(String(value1));
    alert(String(value2));
    alert(String(value3));
    alert(String(value4));
}
window.onload=function () {
    testStr();
}
