/**
 * Created by 39753 on 2017/1/8.
 */
function bind(ele,type,fn){
    if(ele.addEventListener){//标准浏览器下
        ele.addEventListener(type,fn,false);
    }else{
        var tmp=function(){
            fn.call(ele);//解决this问题
        };
        tmp.name=fn;
        //没有数组先创建一个数组
        if(!ele[type+'aEvent']){
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];
        //如果自己事件池重复了 ，就阻断程序的执行；--解决重复绑定的问题；
        for(var i=0; i<a.length; i++){
            if(a[i].name===fn) return;
        }
        a.push(tmp);//把要绑定的匿名函数，放在自己事件池；
        ele.attachEvent('on'+type,tmp);//把要绑定的匿名函数，放在系统事件池；
    }
}
//unbind解除事件绑定：1）拿到数组 2）遍历解除
function unbind(ele,type,fn){{}
    if(ele.removeEventListener){//标准浏览器
        ele.removeEventListener(type,fn,false)
    }else{
        //1）拿到数组
        var a=ele[type+'aEvent'];
        //2）遍历解除
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i].name==fn){
                    //为了预防数组塌陷的问题；先解除系统事件，再解除自定义事件
                    ele.detachEvent('on'+type,a[i]);//解除系统事件
                    a.splice(i,1);//解除自定义事件
                }
            }
        }
    }
}
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{//IE为了解决顺序问题，把所有方法绑定自己事件池，然后给系统绑定一个run方法；
        if(!ele[type+'onEvent']){
            ele[type+'onEvent']=[];
        }
        var a=ele[type+'onEvent'];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);//已经把所有要绑定的方法，都放入自己事件池；
        bind(ele,type,run)
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        //1.拿到数组
        var a=ele[type+'onEvent'];
        //2.遍历解除，记得不要删除，而是赋值为null;
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]==fn){
                    a[i]=null;
                    break;
                }
            }
        }

    }
}
//1）拿到数组 2）顺序调用：注意this问题；
function run(){
    var e=window.event;
    //对事件对象及详细信息做兼容处理；
    e.target=e.srcElement;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.preventDefault=function(){
        e.returnValue=false;
    };
    e.stopPropagation=function(){
        e.cancelBubble=true;
    };
    var a=this[e.type+'onEvent'];//数组就拿到了
    //遍历数组，顺序调用；
    for(var i=0; i<a.length; i++){
        if(typeof a[i]==='function'){
            a[i].call(this,e);
        }else{
            a.splice(i,1);
            i--;
        }
    }
}
