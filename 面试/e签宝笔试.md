### 1.伪代码实现new

```js
function myNew(constructor, ...args){
  //首先创建一个对象
  const obj = {}
  //使其指向需要实例化的原型
  obj.__proto__ = constructor.prototype
  //绑定this执行
  const result = constructor.apply(obj, args)
  //返回新对象
  return typeof result === 'object' ? result : obj
}
```



### 2.算法题

### 3.深拷贝

### 4.简单实现发布订阅模式

### 5.vue3的composition api是什么？有什么优势，用法

### 6.简单描述webpack构建流程

### 7.promise输出顺序

### 8.ts中异步函数的关键字

### 9.跨域，解决方案