/**
 * Created by 39753 on 2016/12/27.
 */
(function(){
    var zhufengEffect={
        Linear:function(t,b,c,d){
            return c/d*t+b;
        }
    }
    //功能：让谁运动到哪里
    function move(curEle,target,cb){
        //1.为linear公式准备参数
        var begin={},change={};
        for(var attr in target){
            begin[attr]=utils.getCss(curEle,attr);
            change[attr]=target[attr]-begin[attr];
        }
        var duration=1000;
        var time=null;
        //2.开启定时器，不断累加时间，利用公式求出最新位置，并且设置最新位置
        clearInterval(timer);
        var timer=setInterval(function(){
            time+=10;
            //2.1边界判断
            if(time>=duration){
                utils.css(curEle,target);
                clearInterval(timer);
                //等运动结束之后，调用回调函数
                cb && cb.call(curEle);
                return;
            }
            for(var attr in begin){
                //2.2分别求出最新的位置
                var curPos=zhufengEffect.Linear(time,begin[attr],change[attr],duration);
                utils.css(curEle,attr,curPos);
            }
        },10)
    }
    window.animate=move;
})();