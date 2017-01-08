/**
 * Created by 39753 on 2017/1/8.
 */
//给某个元素的某个行为，绑定一系列的方法；
//任务：解决IE浏览器下：1）this 2）重复绑定问题 3）顺序问题
function bind(ele,type,fn){
    //1.标准浏览器下，通过addEventListener--type; IE下attachEvent--'on'+type
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器
        var tmp=function(){
            fn.call(ele);//为了解决this问题；
        };
        tmp.name=fn;//fn1, fn2,fn3
        //如果没有数组的话，给元素自定义属性上添加一个数组；注意：1）数组只能被创建一次；
        if(!ele[type+'aEvent']){
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];
        //去重判断，如果重复了，直接阻断程序的执行；
        for(var i=0; i<a.length; i++){
            if(a[i].name==fn) return;
        }
        a.push(tmp);//[tmp,tmp,tmp,tmp]
        //问题1：绑定的是个匿名函数-》无法解除事件绑定；
        ele.attachEvent('on'+type,tmp);
    }
}
//解除某个元素的某个行为下的某个方法:1)拿到公有的数组 2）循环遍历数组，找到要解除的进行解除；--注意：一定要让系统事件池和自定义事件池同步；
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{//IE浏览器
        var a=ele[type+'aEvent'];//拿到数组
        //遍历解除；
        if(a.length){
            for(var i=0; i<a.length; i++){
                //预防数组塌陷的思路1：
                if(a[i].name===fn){
                    ele.detachEvent('on'+type,a[i]);
                    a.splice(i,1);//数组塌陷的问题；--删除的是自定义事件池；
                }
                /*//预防数组塌陷的思路2：
                var  n=a[i];//n存的是地址；
                if(n.name===fn){
                    a.splice(i,1);//
                    ele.detachEvent('on'+type,n);
                }*/
            }
        }
    }
}
/*
* 1.我们把所有要绑定的方法，都绑在自定义事件池；ary.push()
* 2.只给系统事件池绑定一个方法：run方法；-run方法所做的事情，就是拿到自定义事件池中的数组，然后进行顺序调用；
* */
//on绑定

function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{//IE浏览器
        //把每个方法都放进自定义事件池中；
        if(!ele[type+'onEvent']){
            ele[type+'onEvent']=[];
        }
        var a=ele[type+'onEvent'];
        //做自定义事件池去重判断
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
        bind(ele,type,run);
    }

}
//off解绑
function off(ele,type,fn){
    if(ele.removeEventListener){//标准浏览器
        ele.removeEventListener(type,fn,false);
    }else{//1）拿到数组 2）循环遍历，找到匹配的，进行解除
        var a=ele[type+'onEvent'];
        if(a.length){
            for(var i=0; i<a.length; i++){//[fn1,null,null,fn4]
                if(a[i]===fn){
                    //注意：不要删除，而是赋值为null；
                    a[i]=null;
                    break;//提高性能
                }
            }
        }
    }
}
//run方法：1)拿到数组  2）循环调用；
function run(){//只有IE浏览器才会走run方法；--解决了顺序问题
    e=window.event;
    var a=this[e.type+'onEvent'];
    if(a.length){
        for(var i=0; i<a.length; i++){
            //是个函数，才进行调用
            if(typeof a[i]==='function'){
                a[i].call(this);
            }else{//不是函数的话，直接删除；
                a.splice(i,1);
                i--;
            }
        }
    }
}