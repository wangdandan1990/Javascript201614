### 2:事件库的封装
- addEventListener：标准浏览器下
    1. 可以按照绑定的先后顺序，顺序调用；
    2. this指向当前绑定这个元素
    3. 不会出现重复绑定情况
- removeEventListener
- attachEvent：IE 浏览器下
    1. 顺序问题
    2. this指向了window，而不是当前这个元素
    3. 有重复绑定的问题；
- detachEvent
