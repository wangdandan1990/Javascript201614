/**
 * Created by 39753 on 2017/1/7.
 */
//obj.addEventListener(type,fn,setCapture)
//obj.attachEvent(type,fn)
//处理IE浏览器下的三个问题：1）顺序 2）this问题 3）重复绑定问题；
/*bind(ele,'click',fn1);//ele.clickaEvent=[]  ele.mouseoveraEvent=[]
bind(ele,'click',fn2);
bind(ele,'mouseover',fn1)
bind(ele,'keyup',fn1)*/
function bind(ele,type,fn){
    //如果支持addEventListener的话，就调用addEventListener，否则，就走attachEvent
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false)
    }else{
        var tmp=function(){
            fn.call(ele)
        }
        tmp.name=fn;//fn1 fn2 fn3
        if(!ele[type+'aEvent']){
            ele[type+'aEvent']=[];
        }
        var a=ele[type+'aEvent'];//[tmp,tmp,tmp]
        for(var i=0; i<a.length; i++){
            if(a[i].name===fn) return;
        }
        a.push(tmp)//把要绑定的方法，放入自定义事件池；
        ele.attachEvent('on'+type,tmp)//把要绑定的方法，放入系统事件池；
    }
}
function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false)
    }else{//IE浏览器：1）拿到数组 2）遍历数组，看数组中谁的名字等于fn，解除他的事件绑定；
        /*ele.detachEvent('on'+type,ele.tmp)*/
        //1.拿数组
        var a=ele[type+'aEvent'];
        //2.先判断，再遍历
        if(a.length){
            for(var i=0; i<a.length; i++){
                if(a[i].name===fn){
                    ele.detachEvent('on'+type,a[i]);//解除了系统事件绑定；
                    a.splice(i,1);//自定义数组删除，一定放后面，否则会有数组塌陷的问题；
                }
            }
        }
    }
}