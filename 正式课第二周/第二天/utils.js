/**
 * Created by 39753 on 2016/12/14.
 */
var utils={
    /**
     * makeArray:类数组转数组
     * @param arg类数组
     * @returns 数组
     */
    makeArray:function(arg){
        try{
            return Array.prototype.slice.call(arg);
        }catch (e){
            var ary=[];
            for(var i=0; i<arg.length; i++){
                ary.push(arg[i])
            }
            return ary;
        }
    },
    jsonParse:function(str){
        return 'JSON' in window?JSON.parse(str):eval('('+str+')')
    }
}