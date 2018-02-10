/**
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


 */
/*
 var colors=["red","blue","green"];
 alert(colors.toString());
 alert(colors.valueOf());
 alert(colors);

 */


/*

 var person1 = {
 toLocaleString: function () {
 return  "Nikolas";
 },
 toString: function () {
 return  "Nikolas";
 }
 };


 var person2={
 toLocaleString:function(){
 return "Grigorios";
 },

 toString:function(){
 return "Greg";
 }
 };

 var people=[person1,person2];
 alert(people);
 alert(people.toString());
 alert(people.toLocaleString());

 ***/

/*

 var colors=["red","green","blue"];
 alert(colors.join(","));
 alert(colors.join("||"));


 */

/**栈方法

 var colors=new Array();
 var count=colors.push("red","green");
 alert(count);

 count=colors.push("black");
 alert(count);


 var item=colors.pop();
 alert(item);
 alert(colors.length);

 **/


/***
 var colors=new Array();
 var count=colors.push("red","green");
 alert(count);


 count=colors.push("black");
 alert(count);


 var item=colors.shift();
 alert(item);
 alert(colors.length);

 ****/

/*

 var colors=new Array();
 var count=colors.unshift("red","green");
 for(var i=0;i<count;i++){
 alert(colors[i]);
 }

 count=colors.unshift("black");


 for(var i=0;i<count;i++){
 alert(colors[i]);
 }

 alert(count);

 var item=colors.pop();
 alert(item);
 alert(colors.length);

 **/

/**

 var values=[1,2,3,4,5];
 values.reverse();
 alert(values);

 var values=[0,1,5,10,15];

 values.sort();

 alert(values);


 ***/


/***
 function compare(value1,value2){
  if(value1<value2){
    return 1;
  }else if(value1>value2){
    return -1;
  }else{
    return 0;
  }
}

 var values=[0,1,5,10,15];
 values.sort(compare);
 alert(values);
 ***/


/* concat方法
 var colors=["red","green","blue"];
 var colors2=colors.concat("yellow",["black","brown"]);


 alert(colors);
 alert(colors2);
 */


/****

 var colors=["red","green","blue","yellow","purple"];
 var colors2=colors.slice(1);
 var colors3=colors.slice(1,4);
 alert(colors2);
 alert(colors3);
 alert(colors.slice(-3,-1));

 ****/

/*
 var colors=["red","blue","green"];
 var removed=colors.splice(0,1);
 alert(colors);
 alert(removed);


 removed=colors.splice(1,0,"yellow","orange");
 alert(colors);
 alert(removed);


 removed=colors.splice(1,1,"red","purple");
 alert(colors);
 alert(removed);

 */

/*

 var numbers=[1,2,3,4,5,4,3,2,1];

 alert(numbers.indexOf(4));
 alert(numbers.lastIndexOf(4));

 alert(numbers.indexOf(4,4));
 alert(numbers.lastIndexOf(4,4));


 var person={name:"Nicholas"};
 var people=[{name:"Nicholas"}];
 var morePeople=[person];

 alert(people.indexOf(person));
 alert(morePeople.indexOf(person));

 */


/*
 var numbers=[1,2,3,4,5,4,3,2,1];

 var everyResult=numbers.every(function(item,index,array){
 return (item>2);
 });


 alert(everyResult);


 var someResult=numbers.some(function(item,index,array){
 return (item>2);
 });

 alert(someResult);


 var filterResult=numbers.filter(function(item,index,array){
 return (item>2);
 });

 alert(filterResult);



 var mapResult=numbers.map(function(item,index,array){
 return item*2;
 });

 alert(mapResult);
 */


/***
 var numbers=[1,2,3,4,5,4,3,2,1];

 numbers.forEach(function(item,index,array){
  item=item+10;
});

 alert(numbers);

 ***/

/***

 var values=[1,2,3,4,5];


 var sum=values.reduce(function(prev,cur,index,array){
  return prev+cur;
});
 alert(sum);

 ***/

/***

 var values=[1,2,3,4,5];
 var sum=values.reduceRight(function(prev,cur,index,array){
  return prev+cur;
});
 alert(sum);


 ***/


var now=new Date();

var someDate=new Date(Date.parse("May 25,2004"));

var y2k=new Date(Date.UTC(2000,0));


var allPives=new Date(Date.UTC(2005,4,5,17,55,55));

var start=Date.now();

