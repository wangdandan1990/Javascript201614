### 关于DOM2级事件在IE浏览器下的问题：
1. this问题；
2. 重复绑定问题；
3. 顺序问题；
on:
[null,null,fn3,fn4,fn5,fn6,fn7]
function fn3(){
    off(oDiv,'click',fn1);//把fn1删掉了；
    off(oDiv,'click',fn2);//把fn2删掉了；
}
off:假设off方法中，如果找到要解除的，直接删除
fn1(); ary[0]
fn2(); ary[1]
fn3(); ary[2]
fn4(); ary[3] //fn4