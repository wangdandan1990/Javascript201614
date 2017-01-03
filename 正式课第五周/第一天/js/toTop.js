/**
 * Created by 39753 on 2017/1/3.
 */
let $btn=$('#btn');
let getComputedDisplay=()=>{
    //当滚动距离大于一屏的时候，显示按钮，否则隐藏
    //$(window).height():可视区的高度
    if($(window).scrollTop()>=$(window).height()){
        $btn.show();
    }else{
        $btn.hide();
    }
}
//绑定事件
$(window).on('scroll',getComputedDisplay);
$btn.click(()=>{
    //1求target
    let target=$(window).scrollTop();
    let duration=1000;
    let interval=30;
    let step=target/duration*interval;
    //思路2：
    let timer=null;
    $btn.hide();
    $(window).off('scroll',getComputedDisplay);
    timer=setInterval(()=>{
        let cur=$(window).scrollTop();
        if(cur-step<=0){
            $(window).scrollTop(0);
            clearInterval(timer);
            $(window).on('scroll',getComputedDisplay);
        }
        cur-=step;
        $(window).scrollTop(cur);
    },interval)
    //思路1：animate
    /*$btn.hide();
    //解除事件绑定
    $(window).off('scroll',getComputedDisplay);
    //利用animate动画，实现回到顶部
    $('body,html').animate({
        scrollTop:0
    },2000,function(){
        //绑定事件
        $(window).on('scroll',getComputedDisplay);
    })*/
})