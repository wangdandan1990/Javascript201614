/**
 * Created by 39753 on 2017/1/10.
 */
;(function() {
    var oDiv = document.getElementById('div');//可变的，参数
    on(oDiv, 'mousedown', down);
    function down(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.l = this.offsetLeft;
        this.t = this.offsetTop;
        if (this.setCapture) {
            this.setCapture();
            on(this, 'mousemove', move);
            on(this, 'mouseup', up);
        } else {
            this.MOVE = processThis(move, this);
            this.UP = processThis(up, this);
            on(document, 'mousemove', this.MOVE);
            on(document, 'mouseup', this.UP);
            e.preventDefault();
        }
        //跟原始拖拽无关的代码。。。。。。
        clearTimeout(this.flyTimer);
        clearTimeout(this.dropTimer);
    }
    function move(e) {
        //保证move中的this必须是oDiv;
        this.style.left = e.clientX - this.x + this.l + 'px';
        this.style.top = e.clientY - this.y + this.t + 'px';
        //跟原始拖拽无关的代码。。。。。。
        //计算横向速度：
        if (!this.preSpeed) {
            this.preSpeed = e.clientX;
        } else {
            this.speedX = e.clientX - this.preSpeed;
            this.preSpeed = e.clientX;
        }
        ///sdfksdjlfkjsdfl
        //sjldfkjsldkfjsldkf
    }

    function up() {
        if (this.releaseCapture) {
            this.releaseCapture();
            off(this, 'mousemove', move);
            off(this, 'mouseup', up);
        } else {
            off(document, 'mousemove', this.MOVE);
            off(document, 'mouseup', this.UP);
        }
        //跟原始拖拽无关的代码。。。。。。
        fly.call(this);
        drop.call(this);
    }
    function fly(){
        clearTimeout(this.flyTimer);
        this.speedX*=.93;
        var l=this.offsetLeft+this.speedX;
        var maxL=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
        //边界值的判断
        if(l>=maxL){
            l=maxL;
            this.speedX*=-1;
        }else if(l<=0){
            l=0;
            this.speedX*=-1;
        }
        if(Math.abs(this.speedX)>=0.5){
            this.style.left=l+'px';
            this.flyTimer=setTimeout(processThis(fly,this),10);
        }
    }
    function drop(){
        clearTimeout(this.dropTimer);
        if(!this.speedY){
            this.speedY=9.8;
        }
        this.speedY+=9.8;
        this.speedY*=.93;
        var t=this.offsetTop+this.speedY;
        var maxT=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
        if(t>=maxT){//触底
            t=maxT;
            this.speedY*=-1;
            this.flag++;
        }else{//正常运动的效果；
            this.flag=0;
        }
       if(this.flag<2){
           this.style.top=t+'px';
           this.dropTimer=setTimeout(processThis(drop,this),10);
       }
    }
})();