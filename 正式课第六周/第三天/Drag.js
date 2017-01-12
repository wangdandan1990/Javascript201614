/**
 * Created by 39753 on 2017/1/12.
 */
//只有自定义属性；没有系统属性
function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
    if(!this[type]){
        this[type]=[];
    }
    var a=this[type];
    //去重
    for(var i=0; i<a.length; i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
};
EventEmitter.prototype.fire=function(type,e){
    //1.拿到数组
    var a=this[type];
    //2.遍历数组：顺序调用
    if(a && a.length){
        for(var i=0; i<a.length; i++){
            a[i].call(this,e);
        }
    }
};
//小技巧：构造函数中，所有的this都指向实例；
function Drag(opt){
    if(!opt.ele) return;
    this.ele=opt.ele;
    this.x=this.y=null;
    this.l=this.t=null;
    this.DOWN=processThis(this.down,this);
    this.MOVE=processThis(this.move,this);
    this.UP=processThis(this.up,this);
    on(this.ele,'mousedown',this.DOWN);

}
// 让Drag类继承EventEmitter类； 为了让子类可以使用父类的属性和方法；
Drag.prototype=new EventEmitter();//通过把Drag这个类的原型，做为EventEmitter的实例；
Drag.prototype.constructor=Drag;//更改constructor指向；
Drag.prototype.down=function(e){
    this.x=e.clientX;
    this.y=e.clientY;
    this.l=this.ele.offsetLeft;
    this.t=this.ele.offsetTop;
    //解决IE下失去焦点的问题--焦点捕获
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.MOVE);
        on(this.ele,'mouseup',this.UP);
    }else{
        on(document,'mousemove',this.MOVE);
        on(document,'mouseup',this.UP);
        //标准浏览器下，注意阻止默认事件；
        e.preventDefault();
    }
    //向外面暴露一个自定义行为'selfDown';
    this.fire('selfDown',e);//监听者：监听系统事件mousedown什么时候触发；
};
Drag.prototype.move=function(e){
    this.ele.style.left=e.clientX-this.x+this.l+'px';
    this.ele.style.top=e.clientY-this.y+this.t+'px';
    this.fire('selfMove',e)
};
Drag.prototype.up=function(e){
    //解除绑定
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.MOVE);
        off(this.ele,'mouseup',this.UP);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,'mouseup',this.UP);
    }
    this.fire('selfMove',e)
};
