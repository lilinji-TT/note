# **vue**

## **A.vue语法：**

1.插值语法：表现形式{{}}（双大括号表达式）

a.功能：用于解析标签体的内容

b.语法：{{xxxx}}，xxxx会作为js表达式被解析

2.指令：v-（以v-开头）

a.功能：解析标签的属性，标签体的内容，绑定事件

b.例子：v-bind:bref = ‘xxx’中xxx作为js表达式被解析

## B.**数据绑定**

Vue中有2种数据绑定的方式：

​          1.单向绑定(v-bind)：数据只能从data流向页面。

​          2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。

​            备注：

​                1.双向绑定一般都应用在表单类元素上（如：input、select等）

​                2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值，v-bind可以简写成 ‘ : ’。

## C.el和data的2种语法

data与el的2种写法

​          1.el有2种写法

​                  (1).new Vue时候配置el属性。

​                  (2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。

​          2.data有2种写法

​                  (1).对象式）（data：{}）

​                  (2).函数式（data（）{}）

​                  如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。

​          3.一个重要的原则：

​                  由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例。（this会变成GlobalThis）。

![image-20220117233701205](C:\Users\lilinji\AppData\Roaming\Typora\typora-user-images\image-20220117233701205.png)

​				

## D.模型

MVVM模型

​            1. M：模型(Model) ：data中的数据

​            2. V：视图(View) ：模板代码

​            3. VM：视图模型(ViewModel)：Vue实例

​      	发现：

​            1.data中所有的属性，最后都出现在了vm身上。

​            2.vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。



![image-20220117231138526](C:\Users\lilinji\AppData\Roaming\Typora\typora-user-images\image-20220117231138526.png)

## E.数据代理

（数据代理：通过一个对象代理对另一个对象中属性的操作（读/写））

1.Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）

```vue
const vm = new Vue({
			el:'#root',
			data:{
				name:'尚硅谷',
				address:'宏福科技园'
			}
		})
	//可以用vm.$mount(#root)代替el去指定一个容器操作
```

```vue
new Vue({
			el:'#root',
			data:{
				name:'尚硅谷',
				address:'宏福科技园'
			}
		})
```



2.Vue中数据代理的好处：更加方便的操作data中的数据

3.基本原理：通过Object.defineProperty()把data对象中所有属性添加到vm上。

​              		为每一个添加到vm上的属性，都指定一个getter/setter。

​           		   在getter/setter内部去操作（读/写）data中对应的属性。

## F.事件

事件的基本使用：

​              1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；

​              2.事件的回调需要配置在methods对象中，最终会在vm上；

​              3.methods中配置的函数，不要用箭头函数！否则this就不是vm了（上有解释this会变成啥）；

​              4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；

​              5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

Vue中的事件修饰符：

​            1.prevent：阻止默认事件（常用）；

​            2.stop：阻止事件冒泡（常用）；

​            3.once：事件只触发一次（常用）；

​            4.capture：使用事件的捕获模式；

​            5.self：只有event.target是当前操作的元素时才触发事件；

​            6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

1.Vue中常用的按键别名：

​              回车 => enter

​              删除 => delete (捕获“删除”和“退格”键)

​              退出 => esc

​              空格 => space

​              换行 => tab (特殊，必须配合keydown去使用)

​              上 => up

​              下 => down

​              左 => left

​              右 => right



​        2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）



​        3.系统修饰键（用法特殊）：ctrl、alt、shift、meta

​              (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。

​              (2).配合keydown使用：正常触发事件。



​        4.也可以使用keyCode去指定具体的按键（不推荐）



​        5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名