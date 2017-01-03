/**
 * Created by 39753 on 2017/1/1.
 */
//给实例添加公有的属性和方法；
$.fn.extend({
    tab:function(){
        //this：指向当前实例；
        var $box=this;
        var $input=$box.children('input');
        var $aDiv=$box.children('div');//find:找的是子子孙孙
        $input.click(function(){
            //当前发生点击事件的元素添加样式，并让他的兄弟元素都移出样式；
            $(this).addClass('on').siblings('input').removeClass('on');
            $aDiv.eq($(this).index()).addClass('show').siblings('div').removeClass('show')
        });
    }
})