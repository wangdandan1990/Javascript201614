/**
 * Created by 39753 on 2016/12/29.
 */
function Banner(opt){
    //对元素的处理
    this.el=opt.el;
    this.interval=opt.interval||2000;
    this.effect=opt.effect||0;
    if(this.el.charAt(0)==='#'){//'#box'
        this.oBox=document.getElementById(this.el.substring(1));
    }else if(this.el.charAt(0)==='.'){//''
        this.oBox=utils.getByClass(this.el.substring(1))[0];
    }
    this.oBoxInner=this.oBox.getElementsByTagName('div')[0];
    this.aDiv=this.oBoxInner.getElementsByTagName('div');
    this.oUl=this.oBox.getElementsByTagName('ul')[0];
    this.aLi=this.oUl.getElementsByTagName('li');
    this.oBtnLeft=this.oBox.getElementsByTagName('a')[0];
    this.oBtnRight=this.oBox.getElementsByTagName('a')[1];
    this.n=0;//全局的n决定了让第几张图片显示
    this.timer=null;
    return this.init();
}
Banner.prototype={
    constructor:'Banner',
    init:function(){
        //保存正确的this；
        var _this=this;
        //1.图片自动轮播
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove()
        },this.interval)
        //2.焦点自动轮播
        //3.鼠标移入停止，移出继续
        this.overout();
        //4.点击焦点手动切换
        this.handleChange();
        //5.点击左右按钮进行切换
        this.leftRight();
        return this;
    },
    autoMove:function autoMove(){
        if(this.n>=this.aDiv.length-1){
            this.n=0;
            utils.css(this.oBoxInner,'left',-this.n*1000);
        }
        this.n++;
        /*utils.css(oBoxInner,'left',-n*1000);*/
        //图片根据n的变化，进行轮播
        animate({
            id:this.oBoxInner,
            target:{
                left:-this.n*1000
            },
            effect:this.effect
        })
        this.bannerTip();//焦点自动轮播
    },
    bannerTip:function bannerTip(){
        for(var i=0; i<this.aLi.length; i++){
            this.aLi[i].className=this.n%4==i?'on':null;
        }
    },
    overout:function(){
        var _this=this;
        this.oBox.onmouseover=function(){
            //停止运动
            clearInterval(_this.timer);
            //左右按钮显示
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display='block';
        };
        this.oBox.onmouseout=function(){
            _this.timer=setInterval(function(){
                _this.autoMove();
            },_this.interval);
            //左右按钮隐藏
            _this.oBtnLeft.style.display=_this.oBtnRight.style.display='none';
        }
    },
    handleChange:function handleChange(){
        var _this=this;
        for(var i=0; i<this.aLi.length; i++){
            (function(index){
                _this.aLi[i].onclick=function(){
                    _this.n=index;
                    //图片根据n的变化，进行轮播
                    animate({
                        id:_this.oBoxInner,
                        target:{
                            left:-_this.n*1000
                        },
                        effect:3
                    });
                    _this.bannerTip();//焦点自动轮播
                }
            })(i);
        }
    },
    leftRight:function(){
        var _this=this;
        _this.oBtnRight.onclick=function(){
            _this.autoMove();
        };
        _this.oBtnLeft.onclick=function(){
            if(_this.n<=0){
                _this.n=_this.aDiv.length-1;
                utils.css(_this.oBoxInner,'left',-_this.n*1000);
            }
            _this.n--;
            //图片根据n的变化，进行轮播
            animate({
                id:_this.oBoxInner,
                target:{
                    left:-_this.n*1000
                },
                effect:3
            });
            _this.bannerTip();//焦点自动轮播
        }
    }
}