### 用到的技术：
1. less-所以，我们给css文件存成less格式；
2. zepto:就是移动端的jQuery，他的使用方法跟jQuery一样；
3. html5,css3;
4. rem布局
### 工作流程
1. 把文件该引入的都引入；
    - less：把我们写的.less样式，编译成基本的style.css样式；
    - zepto:就是移动端的jQuery;
    - <link rel="stylesheet/less" href="./css/index.less">
    - index.less需要依赖：reset.less; public.less
    - 在index.html页面设置meta:vp
    - 在index.less文件，设置html{fontSize:100px;}针对640px宽度的页面；
    - 在index.js文件，根据不同设备的宽度求出对应的字体大小，并设置给跟子节document.documentElement;
    ```
    htmlFont=winW/desW*100;
    //当宽度不同的时候，要设置的根子节的字体；
    document.documentElement.style.fontSize=htmlFont+'px';
    ```
    注意：如何把rem单位转为px单位；
2. css样式:1)less层级嵌套 2）公共变量@color-white:#fff; 3)公共函数.spriteFn(@x:0,@y:0); 4)模糊 -webkit-filter:blur(10px); 5)&:after{}
3. JS
    - 获取数据
    - 更改拿到的字符串中的特殊字符
    - 把我们需要的数据都放到aryData中；分钟，秒，内容[{},{}]
    - 绑定数据-字符串拼接
    - 音频可以播放，知道，当前音频时间×，和 总音频的时间√；
    - 音频可以暂停，可以播放√
    - 歌词变色；同时，等真正的歌词开始的时候，整个歌词往上移动；
