/**
 * Created by 39753 on 2017/1/8.
 */
function bind(ele,type,fn){
    //1.做浏览器的兼容处理
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器
        var tmp=function(){
            fn.call(ele)//this问题
        };
        tmp.name=fn;
        //如果数组不存在的话，就创建一个数组
        if(!ele[type+'aEvent']){
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];
        //去重的处理；--重复绑定的问题
        for(var i=0; i<a.length; i++){
            if(a[i].name===fn) return;
        }
        a.push(tmp);// 放到自己事件池
        ele.attachEvent('on'+type,tmp);//系统事件池
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    }else{//在绑定的时候，我们同时，绑定在自己事件池和系统事件池：1）拿到数组 2）遍历比对
        var a=ele[type+'aEvent'];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(a[i].name===fn){
                    ele.detachEvent('on'+type,a[i]);//解除系统事件绑定；
                    a.splice(i,1);//解除自己事件池的绑定
                }
            }
        }
    }
}
//顺序问题的思路：把所有要绑定的方法，都放入自己事件池，然后给系统事件池添加1个run方法，run的作用：把自己事件池的方法进行顺序调用；
function on(ele,type,fn){
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{//IE浏览器
        if(!ele[type+'onEvent']){
            ele[type+'onEvent']=[];
        }
        var a=ele[type+'onEvent'];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);//把要绑定的方法都放入自己事件池；
        bind(ele,type,run);
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        //1.拿到数组 2.遍历匹配，匹配到了以后赋值为null；
        var a=ele[type+'onEvent'];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}
//1)拿到数组 2）顺序调用：（this，事件对象的问题）
function run(){
    var e=window.event;
    var a=this[e.type+'onEvent'];
    if(a && a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1)
                i--;
            }
        }
    }
}