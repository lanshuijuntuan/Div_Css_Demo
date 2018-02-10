/**
 * Created by zhouhongquan on 2018/2/6.
 */

/** 传统方法创建对象
 var person=new Object();
 person.name="Nicholas";
 person.age=29;
 person.job="Software Engineer";
 person.sayName=function(){
  alert(this.name);
}

 alert(person.name);
 alert(person.age);
 alert(person.job);
 person.sayName();

 */

/**
 var person={
  name:"张三",
  age:39,
  job:"Software Engineer",
  sayName:function(){
    alert(this.name);
  }
};
 alert(person.name);
 alert(person.age);
 alert(person.job);
 person.sayName();
 **/


var person={};
Object.defineProperty(person,"name",{
    writable:false,
    value:Nicholas,
});
alert(person.name);
person.name="Greg";
alert(person.name);