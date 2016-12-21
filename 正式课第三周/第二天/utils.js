/**
 * Created by 39753 on 2016/12/21.
 */
var utils=(function(){
    return {
        //makeArray:类数组转数组
        makeArray:function(args){
            //兼容标准浏览器
            if('getComputedStyle' in window){
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
            if('getComputedStyle' in window){
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
        }
    }
})();