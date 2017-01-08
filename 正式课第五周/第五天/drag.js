/**
 * Created by 39753 on 2017/1/8.
 */
(function(){
    var oDiv=document.getElementById('div');
    on(oDiv,'mousedown',down)
    //改变fn中的this指向；--
    function processThis(fn,context){
        return function (e){
            fn.call(context,e);
        }
    }
    //当鼠标按下的时候，现存初始值
    function down(e){
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.offsetLeft;
        this.t=this.offsetTop;
        if(this.setCapture){
            this.setCapture();
            on(this,'mousemove',move);
            on(this,'mouseup',up);
        }else{//标准浏览器
            //这两个函数，都是匿名函数，作用是用来改变“可变的函数”中的"this"指向
            this.MOVE=processThis(move,this);
            this.UP=processThis(up,this);
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
            //阻止默认事件：
            e.preventDefault();
        }
    }
    function move(e){
        this.style.left=e.clientX-this.x+this.l+'px';
        this.style.top=e.clientY-this.y+this.t+'px';
    }
    function up(){
        if(this.releaseCapture){
            this.releaseCapture();
            off(this,'mousemove',move);
            off(this,'mouseup',up);
        }else{//标准浏览器
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
    }
})();