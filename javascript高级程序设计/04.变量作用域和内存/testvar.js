/*
 function howManyArgs(){
 alert(arguments.length);
 }
 howManyArgs("string",45);
 howManyArgs();
 howManyArgs(12);
 */

/*
 function doAdd(){
 if(arguments.length==1){
 alert(arguments[0]+10);
 }else if(arguments.length==2){
 alert(arguments[0]+arguments[1]);
 }
 }
 doAdd(10);
 doAdd(30,20);
 */

/* 值类型传递参数
 function addTen(num){
 num+=10;
 return num;
 }
 var count=20;
 var result=addTen(count);
 alert(count);
 alert(result);
 */


/*
 function setName(obj){
 obj.name="Nicholas";
 }
 var person=new Object();
 setName(person);
 alert(person.name);
 */

/*
 function setName(obj){
 obj.name="Nicholas";
 obj=new Object();
 obj.name="Greg";
 }

 var person=new Object();
 setName(person);
 alert(person.name);

 */


/*
 var s="Nicholas";
 var b=true;
 var i=22;
 var u;
 var n=null;
 var o=new Object();

 alert(typeof s);
 alert(typeof b);
 alert(typeof o);
 alert(typeof u);
 alert(typeof n);
 alert(typeof o);

 alert(person instanceof object);
 alert(colors instanceof Array);
 alert(parttern instanceof RegExp);

 */

/*
 var person=new Object();
 person.name="Nicholas";
 person.age=29;

 alert("person.name:"+person.name+"\n\r"+
 "person.age:"+person.age);


 function displayInfo(args){
 var output="";

 if(typeof args.name=="string"){
 output+="Name:"+args.name+"\n";
 }
 alert(output);
 }

 displayInfo({name:"Nicholas",age:29});

 displayInfo({name:"Greg"});

 */


var colors=new Array();

var colors=new Array(20);

var colors=new Array("red","blue","green");



var colors=new Array(3);

var names=new Array("Greg");


var colors=["red","blue","green"];

var names=[];

var values=[1,2];

var options=[,,,,];


var colors=["red","blue","green"];

alert(colors[0]);

colors[2]="black";
colors[3]="brown";









