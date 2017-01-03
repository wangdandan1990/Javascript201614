/**
 * Created by 39753 on 2017/1/1.
 */
    //Tab:构造函数的名称
class Tab{
    //这是构造函数
    constructor(){
        this.$box=$('.box');
        this.$boxInner=this.$box.find('.boxInner');
        this.$aDiv=null;
        this.$aImg=null;
        this.$ul=this.$box.find('ul');
        this.$aLi=null;
        this.$left=this.$box.find('.left');
        this.$right=this.$box.find('.right');
        this.data=null;
        this.timer=null;
        this.n=0;
        this.init();
    }
    //以下都是原型方法；
    init(){
        let _this=this;
        //1.获取数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载
        this.lazyImg();
        //4.图片渐隐渐现
        clearInterval(this.timer);
        this.timer=setInterval(function(){
            _this.autoMove()
        },2000);
        //5.焦点自动轮播
        //6.鼠标移入停止移出继续
        //7.点击焦点手动切换
        //8.点击左右按钮进行切换
    }
    getData(){
        let _this=this;
        $.ajax({
            type:'GET',
            url:'data1.txt',
            async:false,
            dataType:'json',
            success:function(val){
                _this.data=val;
            }
        })
    }
    bind(){
        let strDiv='';
        let strLi='';
        for(let i=0; i<this.data.length; i++){
            let cur=this.data[i];
            strDiv+=`<div><img src="" realImg="${cur.imgSrc}" alt=""></div>`;
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        this.$boxInner.html(strDiv);
        this.$ul.html(strLi);
        //jquery中没有DOM映射；所以必须得重新获取；
        this.$aDiv=this.$boxInner.children('div');
        this.$aImg=this.$boxInner.find('img');
        this.$aLi=this.$ul.find('li');
    }
    lazyImg(){
        var _this=this;
        for(let i=0; i<this.$aImg.length; i++){
            let tmpImg=new Image;
            let cur=_this.$aImg[i];//[]把jQuery元素变成了JS；
            tmpImg.src=cur.getAttribute('realImg');
            tmpImg.onload=()=>{
                $(cur).attr('src',tmpImg.src);
                tmpImg=null;
                //fadeIn 必须配合 display:none
                _this.$aDiv.first().fadeIn().css('zIndex',1);
            }
        }
    }
    autoMove(){
        if(this.n>=this.$aDiv.length-1){
            this.n=-1;
        }
        this.n++;
        this.setBanner();
    }
    setBanner(){
        let _this=this;
        for(let i=0; i<this.$aDiv.length; i++){
            if(i===_this.n){
                _this.$aDiv.eq(i).css('zIndex',1).fadeIn().siblings().fadeOut();
            }else{
                _this.$aDiv.eq(i).css('zIndex',0)
            }
        }
        this.bannerTip();
    }
    bannerTip(){
        let _this=this;
        for(let i=0; i<this.$aLi.length; i++){
            this.$aLi[i].className=i==_this.n?'on':null;
        }
    }
}