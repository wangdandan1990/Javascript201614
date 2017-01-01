/**
 * Created by 39753 on 2017/1/1.
 */
var fn=(a,b)=>console.log(a+b)
fn(3,4)
var obj={name:'zhufeng',dec:'元旦不放假'};
var a=1;
var s='啦啦';
var fn1=()=>5;
var objOther={__proto__:obj,a,s,fn1};
alert(objOther.fn1())