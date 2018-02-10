/**
 * Created by zhouhongquan on 2018/2/7.
 */

/**
 sayHi();
 function sayHi(){
  alert("Hi！");
}
 **/


/*

 sayHi();
 var sayHi=function(){
 alert("Hi！");
 }

 */


/***
 if(1>2){
  function sayHi(){
    alert(1);
  }
}
 else{
   function sayHi(){
    alert(2);
  }
}
 sayHi();
 ****/

/**

 var sayHi;

 if(1>2){
  sayHi=function(){
    alert(1);
  }
}
 else{
  sayHi=function(){
    alert(2);
  }
}
 sayHi();

 */


function createComparisonFunction(propertyName){
    return function(object1,object2){
        var value1=object1[propertyName];
        var value2=object2[propertyName];
        if(value1<value2){
            return -1;
        }else if(value1>value2){
            return 1;
        }else {
            return 0;
        }
    }
}


/**
 function factorial(num){
  if(num<=1){
    return 1;
  }else{
    return num*arguments.callee(num-1);
  }
}
 //alert(factorial(5));


 var anotherFactorial=factorial;
 //alert(anotherFactorial(4));
 factorial=null;
 alert(anotherFactorial(4));
 ***/



/*

 var compareNames=createComparisonFunction("name");

 var result=compareNames({name:"Nicholas"},{name:"Greg"});

 alert(result);

 compareNames=null;



 function createFunctions(){
 var result=new Array();

 for(var i=0;i<10;i++){
 result[i]=function(){
 return i;
 }
 }
 return result;
 }
 var array=createFunctions();
 for(var i=0;i<array.length;i++){
 alert(array[i]());
 }
 */

/*
 function createFunctions(){
 var result=new Array();

 for(var i=0;i<10;i++){
 result[i]=function(num){
 return num;
 }(i);
 }
 return result;
 }
 var array=createFunctions();
 for(var i=0;i<array.length;i++){
 alert(array[i]);
 }
 */

/***
 var name="The Window";

 var object={
  name:"My Object",

  getNameFunc:function(){
    var that=this;
    return function(){
      return that.name;
    };
  }
};

 alert(object.getNameFunc()());

 */


var name="The Window";

var object={
    name:"My Object",
    getName:function(){
        return this.name;
    }
};

alert(object.getName());

alert((object.getName)());

alert((object.getName=object.getName)());



