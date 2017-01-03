## 常用命令
1. 创建文件夹： mkdir 文件夹的名字
2. 进入文件：cd 文件夹名
3. 创建文件： touch 文件名
4. 进入并创建文件： cd 文件夹名 && touch 文件名
## babel:编译=》把不兼容的ES6编译成兼容的ES5;
## 用babel编译的步骤
1. 把项目变成git可以管理的仓库 git init
   初始化项目 npm init
   就会出项一个package.json的文件：作用保存我所下载的模块；
   “常用文件”：
   .gitignore 忽略上传的文件
   readme.md 告诉用户这个项目如何使用
2. 安装npm install babel-cli babel-preset-es2015 --save-dev到本项目
3. 创建.babelrc文件并配置
4. 设置package.json
5. 运行 npm run build;
### ................................
### ES6复习
### 环境搭建
- npm init -y 项目初始化；
- 创建.gitignore 和 readme.md文件：touch .gitignore README.md
- 初始化package.json文件
- npm install babel-cli babel-preset-es2015 --save-dev
- 在package.json的scripts中配置："dev":"babel src -d dist -w"
- 创建.babelrc文件：touch .babelrc; 在里面配置：
```
{
	"presets":["es2015"]
}
```
### 基本项目目录结构的说明

```
src        es6源代码
dist       es6->es5可运行代码
index.html 加载dist目录下的代码，测试
package.json
```
### 如何开发
```
npm run dev
```
### 箭头函数
- 箭头函数 使用=>对函数定义的简写。支持两种写法：表达式和函数体
	- 表达式
	```
	let  fn3=p=>p
	中间的p代表参数，箭头后面的p，代表返回值；
	let fn3=()=>'无参数输入的箭头函数'
	let fn3=(a,b)=>a+b; 同上;

   ```
   - 函数体(显式写法)
   ```
   let fn3=(a,b)=>{
	    var m=a+b;
	    return m;
}
   ```

-  注意：箭头函数体中this : **共用父级作用域的关键字this**；

### 定义一个类及类的继承

- 创建类，添加公有方法和静态方法；
```
class Father{ //用class创建一个类
	construcotr(name,age){//用constructor创建构造函数
		this.name=name;
		this.age=age;
   }
   getMessage(){//添加公有方法
	   console.log(this.name+'的年龄是'+this.age+'岁了')
   }
   static like(){ //静态方法
	   console.log('我是静态方法')
   }
}
```
- 构造函数的继承
```
class Sun extends Father{//子类继承父类
	constructor(name,age,color){
		super(name,age);//必须写；
		this.color=color;
   }
   getColor(){
	   console.log(this.name+'喜欢的颜色是：'+this.color);
   }
}
```
### 增强的对象字面量
优点：1）写法简化 2）原型继承--类似于“类”；
```
var obj={data:123};
var a=1;
var b='2';
var fn=(n,m)=>console.log(n+m);
var objOther={__proto__:obj,a,b,fn}
```
### 模板字符串
```
var name='tangtang';
var age=2;
var str=`${name}已经${age}岁了`；
```
** 注意：用的是``(键盘左上角1旁边的)而不是普通的单引号‘’**;
###解构赋值
```
var obj={a:1,b:'2',fn(){console.log('我是函数')}};
var {a,b,fn}=obj;//这样就能拿到a,b,fn任何一个属性的值；
var {Alert,ListView,Text]=reuqire('reactNative');//同上；
```
### 默认参数，任意参数，扩展运算符
- 默认参数-减少代码逻辑：``function(a='tangtang',b=123){}``
- 任意参数-不依赖arguments解决常见问：``function(a,...keys)``
- 扩展运算符:
```
var ary=[1,23,21];
var newAry=[...ary,1000,10000];
Math.max(...ary);
```
### let和const
- 新增块级作用域，用let；
- const是常量，不能重复赋值；
- 都没有预解释；

