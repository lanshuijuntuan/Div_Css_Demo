/**
 * Created by zhouhongquan on 2018/1/31.
 */
function testObject() {
    var obj=new Object();
    obj.name="张三";
    alert("obj.hasOwnProperty('name'):"+obj.hasOwnProperty("name")+"\n\r"+
        "obj.propertyIsEnumerable('name'):"+obj.propertyIsEnumerable("name")+"\n\r"+
            "obj.tolocalString():"+obj.toLocaleString()+"\n\r"+
            "obj.toString():"+obj.toString()+"\n\r"+
            "obj.valueof():"+obj.valueOf()
    );


}
window.onload=function () {
    testObject();
}