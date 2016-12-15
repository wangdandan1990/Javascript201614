/**
 * Created by 39753 on 2016/12/15.
 */
var utils={
    // makeArray:把类数组转为数组
    makeArray:function(arg){
        try{
            return Array.prototype.slice.call(arg);
        }catch (e){
            var ary=[];
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i]);
            }
            return ary;
        }
    },
    //jsonParse:把JSON格式的字符串转成JSON格式的对象
    jsonParse:function(jsonStr){
        return 'JSON' in window?JSON.parse(jsonStr):eval('('+jsonStr+')')
    }
}