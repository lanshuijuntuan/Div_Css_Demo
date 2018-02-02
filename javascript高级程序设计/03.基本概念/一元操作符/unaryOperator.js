/**
 * Created by zhouhongquan on 2018/2/1.
 */
function testOperator(){
    debugger;
    var age=29;
    age++;


    var num1=2;
    var num2=20;
    var num3=num1--+num2;
    var num4=num1+num2;


    var s1="2";
    var s2="z";
    var b=false;
    var f=1.1;
    var o={
        valueof:function () {
            return -1;
        }
    };
    s1++;
    s2++;

    b++;
    f--;
    o--;
}

function testBitOperator() {
    debugger;
    var num=-18;
    alert(num.toString(2));


    var num1=25;
    var num2=-num1;
    alert(num2);

    var num1=25;
    var num2=-num1-1;
    alert(num2);


    var result=25&3;
    alert(result);

    var result1=25|3;
    alert(result1);

    var result2=25^3;

    alert(result2);


    var oldvalue=2;
    var newvalue=oldvalue<<5;

    alert(newvalue);


    oldvalue=256;
    newvalue=oldvalue>>3;

    alert(newvalue);

    oldvalue=64;
    newvalue=oldvalue>>>5;

    alert(newvalue);


    oldvalue=-64;
    newvalue=oldvalue>>>5;

    alert(newvalue);

}

window.onload=function () {
    testOperator();
    testBitOperator();
}
