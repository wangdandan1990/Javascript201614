/**
 * Created by 39753 on 2016/12/28.
 */
(function(){
    var zhufengEffect={
        Linear:function(t,b,c,d){
            return c/d*t+b;
        }
    }
    //move：让谁运动到哪里
    function move(curEle,target,cb){
        //1.为公式的参数做准备
        var begin={},change={};
        //b,c的值需要通过target的属性名+utils.getCss();
        for(var attr in target){
            begin[attr]=utils.getCss(curEle,attr);
            change[attr]=target[attr]-begin[attr];
        }
        var duration=1000;
        var time=null;
        //2.开启定时器，不断累加time,利用公式求出最新位置，并设置最新位置
        clearInterval(timer);
        var timer=setInterval(function(){
            time+=10;
            //边界判断
            if(time>=duration){
                utils.css(curEle,target);
                clearInterval(timer);
                /*if(typeof cb==='function'){
                    cb.call(curEle);
                }*/
                cb && cb.call(curEle);
                return;
            }
            //利用公式求出最新位置，并设置最新位置
            for(var attr in change){
                var curPos=zhufengEffect.Linear(time,begin[attr],change[attr],duration);
                utils.css(curEle,attr,curPos);
                //curEle.style[attr]=curPos+'px';
            }
        },10)
    }
    window.animate=move;
})();