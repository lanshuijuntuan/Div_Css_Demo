/**
 * Created by zhouhongquan on 2018/2/2.
 */
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