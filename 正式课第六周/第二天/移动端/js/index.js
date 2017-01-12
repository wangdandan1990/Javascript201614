/**
 * Created by 39753 on 2017/1/11.
 */
/*对rem的设置处理*/
~function(){
    //默认640px宽度的设计稿，对应的跟子节大小为100px; 100px==1rem;
    //100px/640px=?/$(window).width(); 100
    var winW=$(window).width(),//document.documentElement;
        desW=640,
        htmlFont=null;
    htmlFont=winW/desW*100;
    window.htmlFont=htmlFont;
    //当宽度不同的时候，要设置的根子节的字体；
    document.documentElement.style.fontSize=htmlFont+'px';
}();
/*给中间main设置高度*///--rem 和 px单位之间的转换；
~function(){
    var $header=$('.header'),
        $footer=$('.footer'),
        $main=$('.main'),
        $winH=$(window).height();//可视区的高度；
    //中间模块的高度，是通过可视区的高度-头部的高度-footer的高度；
    //如何把rem单位的值，转为px的值；在640px，100px：1rem；
    //?/htmlFont=.8rem;
    $main.css('height',$winH-$header.height()-$footer.height() -.8*htmlFont)
}();
/*用JS获取数据，并展示数据*/
var musicUtils=(function(){
    var $callbacks= $.Callbacks(),
        $lyric=$('.lyric'),
        oAudio=$('audio')[0],
        $current=$('.current'),
        $duration=$('.duration'),
        $btn=$('.btn'),
        $play=$('.play'),
        $pause=$('.pause'),
        $timeProgress=$('.timeProgress'),
        timer=null;
    //日期格式化：秒转换为00:00；
    function formatDate(s){
        var m=Math.floor(s/60);
        s=Math.floor(s%60);
        m>=0 && m<10?m='0'+m:null;
        s>=0 && s<10?s='0'+s:null;
        return m+':'+s;
    }
    //通过字符串拼接绑定数据；
    $callbacks.add(function(data){
        var str='';
        for(var i=0; i<data.length; i++){
            str+='<p data-minute="'+data[i].minute+'" data-second="'+data[i].second+'">'+data[i].content+'</p>';

        }
        $lyric.html(str);
    });
    //开始播放音频，并且，拿到音频的当前时间和总时间；
    $callbacks.add(function(){
        //资源播放事件发生的时候，开始播放音频；
        $(oAudio).on('canplay',function(){
            //事件中的this都是原生的；
            this.play();
            //播放的时候，显示暂停按钮；同时，隐藏播放按钮；
            $pause.show().prev().hide();
            //console.log(this.currentTime)
            //填写了总时间；
            $duration.html(formatDate(this.duration));
            //给按钮添加移动端的点击事件；//移动端，用tap来代替点击事件；
            $btn.on('tap',function(){
                //如果暂停了就让其播放，否则就暂停，同时注意对应的按钮；
                if(oAudio.paused){
                    oAudio.play();
                    $pause.show().prev().hide();
                }else{
                    oAudio.pause();
                    $pause.hide().prev().show();
                }
            })
        })
    });
    //1）动态获取当前时间，并设置；2）让文字变色，等到了歌词的地方，让歌词往上移；3）歌词进度条
    $callbacks.add(function(){
        timer=setInterval(function(){
            var currentTime=formatDate(oAudio.currentTime),
                minute=currentTime.split(':')[0],
                second=currentTime.split(':')[1];
            //设置当前时间
            $current.html(currentTime)
            //设置进度条
            $timeProgress.css('width',oAudio.currentTime/oAudio.duration*100+'%');
            //设置文字变色：通过属性进行过滤；
            var $tar=$lyric.find('p').filter('[data-minute="'+minute+'"]').filter('[data-second="'+second+'"]');
            $tar.addClass('on').siblings('p').removeClass('on');
            //当前歌词所对应的索引；
            var n=$tar.index();
            //播放完毕的时候，想干什么事；
            if(oAudio.ended){
                clearInterval(timer);//关闭定时器；
                console.log('播放完毕');
                $pause.hide().prev().show();//显示播放按钮；
                return;
            }
            if(n>=3){
                $lyric.animate({top:(n-2)*-.84+'rem'},1000);
            }
        },1000);
    })
    return {
        init:function(){
            $.ajax({
                url:'lyric.json',
                type:'GET',
                dataType:'json',
                cache:false,
                success:function(result){
                    result=result.lyric||'';
                    //1.把result中有特殊含义的字符替换为对应的内容；
                    result=result.replace(/&#(\d{2});/g,function($0,$1){
                        var val=$0;
                        switch (Number($1)){//注意：switch是严格比较
                            case 32:
                                val=' ';
                                break;
                            case 40:
                                val='(';
                                break;
                            case 41:
                                val=')';
                                break;
                            case 45:
                                val='-';
                                break;
                        }
                        return val;
                    })
                    //2.获取我们想要的数据:分钟数，秒数，内容；
                    var reg=/\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#\d+;)/g;
                    var aryData=[];//aryData中保存了所有我们想要的数据；
                    result.replace(reg,function(){
                        aryData.push({
                            minute:arguments[1],
                            second:arguments[2],
                            content:arguments[3]
                        })
                    });
                    $callbacks.fire(aryData);
                }
            })
        },
    }
})();
musicUtils.init();