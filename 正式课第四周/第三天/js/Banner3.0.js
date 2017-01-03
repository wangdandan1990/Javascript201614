/**
 * Created by 39753 on 2016/12/29.
 */
function Banner(opt){
    //处理参数
    if(!opt.el) return;
    //如果没传，就按照默认的来；
    this.defaultOpt={
        interval:2000,
        effect:0,
        url:'json/data1.txt'
    }
    //如果传了，按照传的来；
    for(var attr in opt){
        this.defaultOpt[attr]=opt[attr];
    }
    //获取oBox元素
    this.el=this.defaultOpt.el;//oBox元素
    this.interval=this.defaultOpt.interval;//运动频率
    this.url=this.defaultOpt.url;//地址
    this.effect=this.defaultOpt.effect;//运动效果
    //获取元素
    this.oBoxInner=this.el.getElementsByTagName('div')[0];
    this.aDiv=this.oBoxInner.getElementsByTagName('div');
    this.oUl=this.el.getElementsByTagName('ul')[0];
    this.aLi=this.oUl.getElementsByTagName('li');
    this.oLeft=this.el.getElementsByTagName('a')[0];
    this.oRight=this.el.getElementsByTagName('a')[1];
    this.aImg=this.oBoxInner.getElementsByTagName('img');
    this.data=null;
    this.init();
}
Banner.prototype={
    constructor:'Banner',
    init:function(){
        var _this=this;
        //1.获取并解析数据
        this.getData();
        //2.绑定数据
        this.bind();
        //3.延迟加载图片
        setTimeout(function(){
            _this.lazyImg();
        },1000)
        //4.图片自动轮播
        //5.焦点自动轮播
        //6.鼠标移入停止，移出继续
        //7.点击焦点手动切换
        //8.点击左右按钮手动切换
    },
    getData:function(){
        var _this=this;
        //1.创建元素
        var xml=new XMLHttpRequest();
        //2.打开地址
        xml.open('get',this.url,false)
        //3.响应请求
        xml.onreadystatechange=function(){
            if(xml.readyState==4 && /^2\d{2}$/.test(xml.status)){
                _this.data=utils.jsonParse(xml.responseText);
            }
        }
        //4.发送请求
        xml.send();
    },
    bind:function(){
        var strDiv='';
        var strLi='';
        for(var i=0; i<this.data.length; i++){
            strDiv+='<div><img src="" realImg="'+(this.data[i].imgSrc)+'" alt=""></div>';
            strLi+=i==0?'<li class="on"></li>':'<li></li>';
        }
        strDiv+='<div><img src="" realImg="'+(this.data[0].imgSrc)+'" alt=""></div>';
        //给boxinner填充内容
        this.oBoxInner.innerHTML=strDiv;
        //改变boxinner的宽度
        this.oBoxInner.style.width=this.aDiv[0].offsetWidth*this.aDiv.length+'px';
        //给ul填充li;
        this.oUl.innerHTML=strLi;

    },
    lazyImg:function(){
        var _this=this;
        for(var i=0; i<this.aImg.length; i++){
            (function(index){
                var cur=_this.aImg[index];
                //1.创建临时图片，并赋值正确地址
                var tmpImg=new Image;
                tmpImg.src=cur.getAttribute('realImg');
                //2.校验地址
                tmpImg.onload=function(){
                    //3.把正确地址赋值给src
                    cur.src=this.src;
                    tmpImg=null;
                }
            })(i);
        }
    }
}









