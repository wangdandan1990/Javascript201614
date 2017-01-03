/**
 * Created by 39753 on 2017/1/1.
 */
//给类上扩充静态方法（工具方法）--》实例不能使用这些方法；
$.extend({
    tab:function(){
        //这里的this是jQuery;
        var $box=$('.box');
        var $input=$box.children('input');
        var $aDiv=$box.children('div');//find:找的是子子孙孙
        $input.click(function(){
            //当前发生点击事件的元素添加样式，并让他的兄弟元素都移出样式；
            $(this).addClass('on').siblings('input').removeClass('on');
            $aDiv.eq($(this).index()).addClass('show').siblings('div').removeClass('show')
        });
    }
})