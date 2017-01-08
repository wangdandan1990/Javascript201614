/**
 * Created by 39753 on 2017/1/8.
 */
//事件绑定的
function on(ele,type,fn){
    //浏览器的兼容处理；
    if(ele.addEventListener){//标准浏览器
        ele.addEventListener(type,fn,false);
    }else{
       //当没有数组的时候，创建一个数组；
        if(!ele[type+'onEvent']){//if条件里的语句，只会执行一次；
            ele[type+'onEvent']=[];
            //只给系统事件池，绑定一个run方法；--把run方法，放在这里，是为了解决run被重复绑定的问题；
            ele.attachEvent('on'+type,function(){
                run.call(ele);//解决了run的this问题；
            });
        }
        var a=ele[type+'onEvent'];
        //去重处理；--自定义事件池；
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }
}
//off方法:解除事件绑定
function off(ele,type,fn){
    if(ele.removeEventListener){//标准浏览器-不管
        ele.removeEventListener(type,fn,false);
    }else{//IE浏览器；1：拿数组；2：循环匹配，找到赋值为null；
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
//1)拿到数组 2）顺序调用：1-this问题  2-事件对象；
function run(){
    var e=window.event;
    //关于事件对象详细信息的兼容处理；
    e.target=e.srcElement;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.preventDefault=function(){
        e.returnValue=false;
    }
    e.stopPropagation=function(){
        e.cancelBubble=true;
    }
    //拿到数组
    var a=this[e.type+'onEvent'];
    //顺序调用
    if(a && a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}