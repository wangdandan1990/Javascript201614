/**
 * Created by 39753 on 2016/12/27.
 */
(function(){
    var zhufengEffect={
        Linear:function(t,b,c,d){
            return c/d*t+b;
        }
    };
    //move:让当前元素移动到哪里 {left:xxx,top:xxx,marginLeft:xxx}
    function move(curEle,target){
        //1.为linear公式的参数做准备
        var begin={},change={};
        //1.1通过for...in循环，求出begin值
        for(var attr in target){
            begin[attr]=utils.getCss(curEle,attr);
            change[attr]=target[attr]-begin[attr];
        }
        var duration=1000;
        var time=0;
        //2.开启定时器，不断累加时间，利用linear公式，求出最新的位置，并且设置最新的位置；
        clearInterval(timer);
        var timer=setInterval(function(){
            //2.1累加时间，并做边界判断
            time+=10;
            if(time>=duration){
                //2.2让物体直接等于目标值
                utils.css(curEle,target);
                //2.3关闭定时器
                clearInterval(timer);
                //2.4阻断程序执行；
                return;
            }
            //利用公式分别求出最新位置，并分别设置最新位置；
            for(var attr in target){
                //求新位置
                var curPos=zhufengEffect.Linear(time,begin[attr],change[attr],duration);
                //设置新位置
                utils.css(curEle,attr,curPos);
            }
        },10)

    }
    window.animate=move;
})();