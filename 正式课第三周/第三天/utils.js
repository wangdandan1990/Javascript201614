/**
 * Created by 39753 on 2016/12/21.
 */
var utils=(function(){
    var flg='getComputedStyle' in window;
    return {
        //makeArray:类数组转数组
        makeArray:function(args){
            //兼容标准浏览器
            if(flg){
                return Array.prototype.slice.call(args);
            }else{
                var ary=[];
                for(var i=0; i<args.length; i++){
                    ary.push(args[i]);
                }
                return ary;
            }
        },
        //jsonParse:把JSON格式的字符串转成JSON格式的对象
        jsonParse:function(jsonStr){
            return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')');
        },
        //getCss:获取当前元素的某个样式
        getCss:function(curEle,attr){
            var val=null;
            var reg=null;
            //标准浏览器:getComputedStyle兼容IE9+，chrome，Firefox；
            if(flg){
                val=getComputedStyle(curEle,false)[attr];
            }else{//IE678
                if(attr=='opacity'){//待续？
                    val=curEle.currentStyle.filter;//'alpha(opacity:10)'
                    reg=/^alpha\(opacity[=:](\d+)\)$/i;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }else{
                    val=curEle.currentStyle[attr];
                }
            }
            //判断是否为有单位的数字；
            reg=/^[+-]?(\d+(\.\d+)?)(px|pt|rem|em)?$/gi;
            return reg.test(val)?parseFloat(val):val;
        },
        //win：JS盒子模型->获取和设置
        win:function(attr,value){
            //判断是否传参数的3种方式：
            //如果定义了形参，但没有赋值拿到的是基本数据类型中的undefined;
            //如果用typeof来判断，得到的undefined一定要加引号；
            //arguments.length判断传了几个参数
            if(typeof value==='undefined'){
                return document.documentElement[attr]||document.body[attr];
            }
            document.documentElement[attr]=document.body[attr]=value;
        },
        //offset:求当前元素的偏移量
        offset:function(curEle){
            var par=curEle.offsetParent;
            var l=curEle.offsetLeft;
            var t=curEle.offsetTop;
            while(par){
                if(window.navigator.userAgent.indexOf('MSIE 8')===-1){
                    l+=par.clientLeft;
                    t+=par.clientTop;
                }
                l+=par.offsetLeft;
                t+=par.offsetTop;
                par=par.offsetParent;
            }
            return {left:l,top:t}
        },
        //rnd：获取n-m之间的随机整数
        rnd:function(n,m){
            n=Number(n);
            m=Number(m);
            //如果n或m有一个不是数字，返回0-1之间的随机小数，提示传参传错了；
            if(isNaN(n) || isNaN(m)){
                return Math.random();
            }
            //当n大于m的时候，交换位置
            if(n>m){
                var tmp=m;
                m=n;
                n=tmp;
            }
            return Math.round(Math.random()*(m-n)+n)
        },
        //getByClass:限定范围的通过class名来获取元素
        getByClass:function(strClass,context){
            context=context||document;
            if(flg){//标准浏览器
                return this.makeArray(context.getElementsByClassName(strClass))
            }else{//IE6-8
                //1.字符串转数组：先去除首尾空格，中间按空格进行切分
                var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
                //2.获取当前容器下所有的子元素
                var nodeList=context.getElementsByTagName('*');
                //3.逐个校验每个元素的class名；
                var ary=[];
                for(var i=0; i<nodeList.length; i++){
                    var cur=nodeList[i];
                    var bOk=true;
                    for(var j=0; j<aryClass.length; j++){
                        var reg=new RegExp('(^| +)'+aryClass[j]+'( +|$)');
                        if(!reg.test(cur.className)){
                            bOk=false;
                            break;
                        }
                    }
                    if(bOk){
                        ary.push(cur);
                    }
                }
                return ary;
            }
        },
        //hasClass:判断当前元素是否包含某个class名
        hasClass:function(curEle,cName){
            var reg=new RegExp('(^| +)'+cName+'( +|$)');
            return reg.test(curEle.className)
        },
        //setClass:给当前元素添加class名:添加class名的时候一定要加' '
        setClass:function(curEle,strClass){
            //1.字符串转数组
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            //2.遍历数组中的每一个擦class名，如果元素身上没有改class名，进行添加
            for(var i=0; i<aryClass.length; i++){
                var cur=aryClass[i];
                if(!this.hasClass(curEle,cur)){
                    curEle.className+=' '+cur;
                }
            }
        },
        //removeClass:如果元素身上有某个class名，就把该class名替换为空格；
        removeClass:function(curEle,strClass){
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            for(var i=0; i<aryClass.length; i++){
                var reg=new RegExp('(^| +)'+aryClass[i]+'( +|$)','g');
                //如果元素身上有某个class名的时候，替换为空格；
                if(reg.test(curEle.className)){
                    curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'').replace(/\s+/g,' ');
                }
            }
        }


    }
})();