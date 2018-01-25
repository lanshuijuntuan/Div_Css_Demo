/**
 * Created by zhouhongquan on 2018/1/25.
 */
function showVar() {
    var a="123";
    alert(a);
    a=1;
    alert(a);
    a=["1","2","3","4"];
    alert(a.length);
    var lennon=new Object();
    lennon.name="张三";
    lennon.age=18;
    lennon.living=false;
    alert("lennon.age:"+lennon.age+"\n"
    +"lennon.name:"+lennon.name+"\n"
    +"lennon.living:"+lennon.living);
    lennon={name:"李四",age:18,living:false};
    alert("lennon.age:"+lennon.age+"\n"
        +"lennon.name:"+lennon.name+"\n"
        +"lennon.living:"+lennon.living);

    alert("1+4 :"+(1+4));
    alert("1+4*5 :"+(1+4*5));
    alert("(1+4)*5 :"+(1+4)*5);
    var a=1;
    alert("a:"+a);
    alert("a++:"+a++);
    alert("a:"+a);

    var year=2010;
    var message="this year is ";
    message+=year;
    alert("message:"+message);


    var my_mood="happy";
    var your_mood="sad";
    // if(my_mood=your_mood){
    //     alert("my_mood=your_mood:"+true);
    // }
    // else{
    //     alert("my_mood=your_mood:"+false);
    // }

    if(my_mood==your_mood){
        alert("my_mood==your_mood:"+true);
    }
    else
    {
        alert("my_mood==your_mood:"+false);
    }

    if(my_mood===your_mood){
        alert("my_mood===your_mood:"+true);
    }
    else
    {
        alert("my_mood===your_mood:"+false);
    }

    a="1";
    b=1;
    if(a==b){
        alert("'1'==1：+"+true);
    }
    else
    {
        alert("'1'==1：+"+false);
    }
    a=false;
    b="";
    if(a==b){
        alert("''==false:"+true);
    }
    else
    {
        alert("''==false:"+false);
    }
    var i=1;
    var  sum=0;
    while (i<101){
        sum=sum+i;
        i++;
    }
    alert(sum);

    function square(num) {
        total= num*num;
        return total;
    }
    var total=50;
    var number=square(20);
    alert(total);
    var num=7.561;
    var num=Math.round(7.561);
    alert("Math.round(7.561):"+num);

    var current_date=new Date();
    alert("current_date.getYear:"+current_date.getYear());
    alert("current_date.getDay:"+current_date.getDay());






}
