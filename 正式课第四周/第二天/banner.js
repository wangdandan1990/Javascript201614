/**
 * Created by 39753 on 2016/12/28.
 */
(function(){
    //获取元素
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var oBtnLeft=oBox.getElementsByTagName('a')[0];
    var oBtnRight=oBox.getElementsByTagName('a')[1];
    var n=0;//决定让第几张图片显示
    var timer=null;
    //给boxInner中再追加一张跟第一张图片一模一样的，同时，需要改变boxInner的宽度
    oBoxInner.innerHTML+='<div><img src="img/banner1.jpg" alt=""></div>';
    oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';
    //1.让图片自动轮播
    clearInterval(timer);
    timer=setInterval(autoMove,2000);
    function autoMove(){
        if(n>=aDiv.length-1){
            n=0;
            //瞬间拉回为0
            utils.css(oBoxInner,{left:-n*1000})
        }
        n++;
        //一千一千的改变oBoxInner的left值；
       // utils.css(oBoxInner,{left:-n*1000})
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            }
        })
        //焦点
        bannerTip();
    }
    //2.让焦点自动轮播
    function bannerTip(){
        //思路1：利用%的思想；
        /*for(var i=0; i<aLi.length; i++){
            aLi[i].className='';
        }
        aLi[n%4].className='on';*/
        /*for(var i=0; i<aLi.length; i++){
            aLi[i].className=i==n%4?'on':null;
        }*/
        //学校的笨思路；
        var tmp=n>=aLi.length?0:n;
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i===tmp?'on':null;
        }
    }
    //3.鼠标移入停止，移出继续
    oBox.onmouseover=function(){
        clearInterval(timer);
        oBtnLeft.style.display=oBtnRight.style.display='block';
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000);
        oBtnLeft.style.display=oBtnRight.style.display='none';
    }
    //4.点击焦点切换页面
    handleChange();
    function handleChange(){
       for(var i=0; i<aLi.length; i++){
           aLi[i].index=i;
           aLi[i].onclick=function(){
               n=this.index;
               //页面
               animate({
                   id:oBoxInner,
                   target:{
                       left:-n*1000
                   }
               })
               //焦点
               bannerTip();
           }
       }
    }
    //5.点击左右按钮切换页面
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aLi.length;
            utils.css(oBoxInner,'left',-n*1000);
        }
        n--;
        //页面
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            }
        })
        //焦点
        bannerTip();
    }
})();