# TS Vs JS

我们先来说TS

- JS的超集
- 强类型，支持静态和动态类型
- 可以在编译期间发现并纠正错误
- 不允许改变变量的类型

接着就是JS

- 一种脚本语言，用于创建动态网页
- 动态弱类型语言
- 只能在运行时发现错误
- 变量可以被赋值成不同的类型

## 1. TS带来了什么？

带来了类型安全、支持JS特性，工具链

## 2. TS基础类型

1. boolean、number、string
2. 枚举enum
3. any、unkonwn (小any)、void
4. never ()
5. 数组类型 []
6. 元组类型 tuple

## 3. TS函数类型

定义：TS定义函数类型是要定义输入参数的类型以及输出类型

输入参数：参数支持可选参数和默认参数

输出参数：输出可自动判断、没有返回值时就是默认为void类型

函数重载：名称相同但是参数不同，可以通过重载支持多种类型

## 4. interface 接口

定义：接口为了定义对象类型

特点：

- 可选属性 ？
- 只读属性：readonly
- 可以描述函数类型
- 可以描述自定义属性

总结：接口非常灵活 duck typing

## 5. 类 Class

定义：写法和JS差不多，增加了一些定义

特点：

- 增加了public、private、protect修饰符
- 抽象类：
  - 只能被继承、不能被实例化
  - 作为基类，抽象方法必须被子类实现
- interface约束类，使用implements关键字

## 6. 高级类型

1. 联合类型 ｜
2. 交叉类型  &
3. 类型断言（这个类型一定是我指定的类型，TS就不会去检查）
4. 类型别名（type VS interface）
   1. 定义：给类型起个别名
   2. 相同点：
      1. 都可以定义对象和函数
      2. 都允许被继承
   3. 差异点：
      1. interface是TS用来定义对象，type是用来定义别名方便使用
      2. type可以定义基本类型，interface不行
      3. interface可以合并重复声明，type不行

## 7. 泛型， 什么时候需要？

不确定参数

使用：

泛型的语法就是在<>中写类型参数（类似于函数传参），一般用T表示（也有P、C等等）

使用时有两种方式指定类型：

1. 定义要使用的类型
2. 通过TS类型推断，自动推导类型

泛型的作用是临时占位，之后通过传来的类型进行推导



## 8. 基础操作符

typeof：获取类型

keyof：获取所有键

in：遍历枚举类型

T[K]：索引访问

extends：泛型约束

## 9. 声明文件

- declare：三方库需要类型声明文件
- .d.ts：声明文件定义
- @types：三方库TS类型包
- tsconfig.json：定义TS的配置

## 10. 泛型约束后端接口类型

```TS
import axios from 'axios'

interface API {
	'/book/detail': {
			id: number
	},
	'/book/comment': {
			id: number,
			comment: string
	}
}

function request<T extends keyof API>(url: T, obj:API[T]){
  return axios.post(url, obj)
}

request('/book/comment',{
  	id: 1,
  	comment: 'very good!'
})
```

