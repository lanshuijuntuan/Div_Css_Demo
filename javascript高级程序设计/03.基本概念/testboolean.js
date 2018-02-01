/**
 * Created by zhouhongquan on 2018/1/30.
 */
function testBoolean() {
    alert("true" + Boolean(true));
    alert("false:" + Boolean(false));
    alert("sdfsdf:" + Boolean("sdfsdf"));
    alert(" :" + Boolean(""));
    alert("145:" + Boolean(145));
    alert("10/0:" + Boolean(10 / 0));
    alert("0:" + Boolean(0));
    alert("null:" + Boolean(null));
    alert("undefined:" + Boolean(undefined));
}
function testNumber() {
    var octalNum1 = 070;
    var octalNum2 = 079;
    var octalNum3 = 08;

    alert("070:" + octalNum1 + "\n\r" +
        "079:" + octalNum2 + "\n\r" +
        "08:" + octalNum3
    );

}
function testfloat() {
    var a = 0.1;
    var b = 0.2;
    c = 3.45e7;
    d = 0.00000000000000000000003;
    alert("0.1+0.2:" + (a + b) + "\n\r"
        + "3.45e7:" + c + "\n\r"
        + "0.00000000000000000000003:" + d);
}

function testNumberConvert() {
    var num1 = Number("Hello world!");
    var num2 = Number("");
    var num3 = Number("000011");
    var num4 = Number(true);
    var num5 = Number(00011);
    alert("Number('Hello world!'):" + num1 + "\n\r" +
        "Number(''):" + num2 + "\n\r" +
        "Number('000011'):" + num3 + "\n\r" +
        "Number(true):" + num4 + "\n\r" +
        "Number(00011):" + num5
    );
}

function testParseIntConvert() {
    var num1 = parseInt("1234blue");
    var num2 = parseInt("");
    var num3 = parseInt("0xA");
    var num4 = parseInt(22.5);
    var num5 = parseInt("070");
    var num6 = parseInt("70");
    var num7 = parseInt("0xf");
    alert("parseInt('1234blue'):" + num1 + "\n\r" +
        "parseInt(''):" + num2 + "\n\r" +
        "parseInt('0xA'):" + num3 + "\n\r" +
        "parseInt(22.5):" + num4 + "\n\r" +
        "parseInt('070'):" + num5 + "\n\r" +
        "parseInt('70'):" + num6 + "\n\r" +
        "parseInt('0xf'):" + num7
    );

}


function testParseIntConvert2() {
    var num1 = parseInt("0xAF", 16);
    var num2 = parseInt("AF", 16);
    var num3 = parseInt("AF");

    var num4 = parseInt("10", 2);
    var num5 = parseInt("10", 8);
    var num6 = parseInt("10", 10);
    var num7 = parseInt("10", 16);
    alert("parseInt('0xAF',16):" + num1 + "\n\r" +
        "parseInt('AF',16):" + num2 + "\n\r" +
        "parseInt('AF'):" + num3 + "\n\r" +
        "parseInt('10',2):" + num4 + "\n\r" +
        "parseInt('10',8):" + num5 + "\n\r" +
        "parseInt('10',10):" + num6 + "\n\r" +
        "parseInt('10',16):" + num7
    );
}

function testParseFloat(){
    var num1=parseFloat("1234blue");
    var num2=parseFloat("0xA");
    var num3=parseFloat("22.5");
    var num4=parseFloat("22.34.5");
    var num5=parseFloat("0908.5");
    var num6=parseFloat("3.125e7");
}



window.onload = function () {
    // testBoolean();
    testNumber();
    testfloat();
    testNumberConvert();
    testParseIntConvert();
    testParseIntConvert2();
}