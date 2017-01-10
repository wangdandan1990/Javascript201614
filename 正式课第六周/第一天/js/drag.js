/**
 * Created by 39753 on 2017/1/10.
 */
;~function(){
    var oDiv=document.getElementById('div');
    on(oDiv,'mousedown',down);
    function down(e){
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.offsetLeft;
        this.t=this.offsetTop;
        if(this.setCapture){
            this.setCapture();
            on(this,'mousemove',move);
            on(this,'mouseup',up);
        }else{
            this.MOVE=processThis(move,this);
            this.UP=processThis(up,this);
            on(document,'mousemove',this.MOVE);
            on(document,'mouseup',this.UP);
            e.preventDefault();
        }
        //跟初始拖拽无关的代码；-------
        clearTimeout(this.flyTimer);
        clearTimeout(this.dropTimer);
    }
    function move(e){
        this.style.left=e.clientX-this.x+this.l+'px';
        this.style.top=e.clientY-this.y+this.t+'px';
        //跟初始拖拽无关的代码；------
        //在move方法中“计算速度”，而速度取决于两次时间间隔之间的距离；
        //没有坐标值的时候，先创建一个坐标值；
        if(!this.preSpeed){
            this.preSpeed=e.clientX;
        }else{
            //有的话，就用当前坐标-上一次的坐标，求出距离，把距离作为速度；
            this.speedX=e.clientX-this.preSpeed;
            //更新上一次的坐标值；
            this.preSpeed=e.clientX;
        }
    }
    function up(){
        if(this.releaseCapture){
            this.releaseCapture();
            off(this,'mousemove',move);
            off(this,'mouseup',up);
        }else{
            off(document,'mousemove',this.MOVE);
            off(document,'mouseup',this.UP);
        }
        //跟初始拖拽无关的代码；-----
        fly.call(this);
        drop.call(this);
    }
    function fly(){
        clearTimeout(this.flyTimer);
        this.speedX*=.93;
        var l=this.offsetLeft+this.speedX;
        var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
        if(l>=maxL){
            l=maxL;
            this.speedX*=-1;
        }else if(l<=0){
            l=0;
            this.speedX*=-1;
        }
        this.style.left=l+'px';
        if(Math.abs(this.speedX)>=0.5){
            this.flyTimer=setTimeout(processThis(fly,this),10);
        }
    }
    function drop(){
        clearTimeout(this.dropTimer);
        //没有速度的时候，设置一个速度
        if(!this.speedY){
            this.speedY=9.8;
        }
        //有了速度的时候，让速度不断的进行累加，这样，可以实现速度越来越快；
        this.speedY+=9.8;
        this.speedY*=.93;//增加摩擦；
        var t=this.offsetTop+this.speedY;
        //能走的最大距离；
        var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
        //当到达最大距离的时候，进行反弹；
        if(t>=maxT){//落地
            t=maxT;
            this.speedY*=-1;
            this.flag++;
        }else{//弹起后的正常运动
            this.flag=0;
        }
        this.style.top=t+'px';
        //在哪种情况下，可以正常的运动；
        if(this.flag<2){
            this.dropTimer=setTimeout(processThis(drop,this),10);
        }
    }
}();