## 标题
```
//我是注释
var name='zfpx'
alert(name)
```
## 无序列表
- sldfkjsd
- lskdjflskdf
- sldfkjsldf
## 有序列表
1. 收到了疯狂世界地方
2. 老师的看法就乐山大佛
 [我是连接](http://www.baidu.com)
## .....................
## jquery
## jquery元素获取
- 基本选择器 # . element 层级选择
- 过滤器 :first :last :eq :even :odd :lt :gt
- 过滤的方法: $('div').first()  last()
## jqery取值赋值合体
- css()
- attr() 操作属性
- html() 操作内容的
## jQuery和JS的关系及转换
- 他们两个可以共存，但不能混淆
- jQuery转JS: get(index) [index]
- JS转jquery：$(原生的元素)
## jQuery中DOM动态操作
- 创建元素$('<div>')
- 克隆 $('<div>').clone();
- appendTo 和 append() 区别：操作的主体不同
类似的：insertBefore() before()....
- 元素的删除 remove();
## 运动和动画
- show/hide() toggle()
- fadeIn/fadeOut() fadeToggle()
- slideDown/slideUp() slideToggle()
- animate({},1000,cb)
## 事件
- jQuery中的事件都没有on，也没有=;
- 事件绑定 on  解除绑定off  只绑定一次one
jquery事件封装的原理是DOM2级事件
## 数据获取
- $.ajax
```
$.ajax({
    type:'GET',
    url:'www.baidu.com',
    dataType:'json'//返回的数据类型,
    async:false//是否异步
    cache:false//是否缓存
    data:form.serialize(),//表单序列化
    success:function(val){//成功之后返回数据
    }
})
```
- form.serialize() 表单序列化，用于前端向后台传参
## 插件封装 extend({})
- $.fn.extend({}) 给原型上扩充方法--实例使用
- $.extend({}) 给类上扩充静态方法；--类自身使用，因为这是类的私有属性；


