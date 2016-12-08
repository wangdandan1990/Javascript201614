/**
 * Created by 39753 on 2016/12/8.
 */
var header={//本模块之间的相互调用:this.xxxx
    tab:function(){
        var aDiv=utils.getByClass('.box');
        this.logo();
    },
    logo:function(){

    },
    silder:function(){
        main.slider();//不同模块之间的相互调用：模块名.属性名；
    }
};