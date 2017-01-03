/**
 * Created by 39753 on 2016/12/29.
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
    var n=0;//全局的n决定了让第几张图片显示
    var timer=null;
    //给oBoxInner多添加第一张图片
    oBoxInner.innerHTML+='<div><img src="img/banner1.jpg" alt=""></div>';
    oBoxInner.style.width=aDiv[0].offsetWidth*aDiv.length+'px';
    //1.图片自动轮播
    clearInterval(timer);
    timer=setInterval(autoMove,2000);//这里的时间一定要大于运动库中的时间；
    function autoMove(){
        if(n>=aDiv.length-1){
            n=0;
            utils.css(oBoxInner,'left',-n*1000);
        }
        n++;
        /*utils.css(oBoxInner,'left',-n*1000);*/
        //图片根据n的变化，进行轮播
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            },
            effect:3
        })
        bannerTip();//焦点自动轮播
    }
    //2.焦点自动轮播
    function bannerTip(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=n%4==i?'on':null;
        }
    }
    //3.鼠标移入停止，移出继续
    oBox.onmouseover=function(){
        //停止运动
        clearInterval(timer);
        //左右按钮显示
        oBtnLeft.style.display=oBtnRight.style.display='block';
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,2000);
        //左右按钮隐藏
        oBtnLeft.style.display=oBtnRight.style.display='none';
    }
    //4.点击焦点手动切换
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            (function(index){
                aLi[i].onclick=function(){
                    n=index;
                    //图片根据n的变化，进行轮播
                    animate({
                        id:oBoxInner,
                        target:{
                            left:-n*1000
                        },
                        effect:3
                    });
                    bannerTip();//焦点自动轮播
                }
            })(i);
        }
    }
    //5.点击左右按钮进行切换
    oBtnRight.onclick=autoMove;
    oBtnLeft.onclick=function(){
        if(n<=0){
            n=aDiv.length-1;
            utils.css(oBoxInner,'left',-n*1000);
        }
        n--;
        //图片根据n的变化，进行轮播
        animate({
            id:oBoxInner,
            target:{
                left:-n*1000
            },
            effect:3
        });
        bannerTip();//焦点自动轮播
    }

})();