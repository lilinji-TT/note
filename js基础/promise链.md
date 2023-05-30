# Promise 链

### 首先要明确一点能够实现Promise链式操作的关键在于.then()方法会返回一个全新的promise对象，并且会保存之前的状态。

```js
const printNum = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(num)
      // resolve结束
      resolve()
    }, 1000)
  })
}

//先设置成一个fullfilled的状态，不然后续不会执行.then()里的回调函数
let promise = Promise.resolve()
//以下的.then()都会依赖前一个promise的完成在执行，从而实现每隔一秒打印一个数字
promise
      .then(() => printNum(1))
      .then(() => printNum(2))
      .then(() => printNum(3))
      .then(() => printNum(4))
      .then(() => printNum(5))
```

```js
// 第一题，使用promise实现每隔一秒打印一个数字 1 2 3 4 5
const printNum = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(num)
      // resolve结束
      resolve()
    }, 1000)
  })
}
// 定义一个常量，并初始化
let promise = Promise.resolve()
for (let i = 1; i <= 5; i++) {
  // 链式调用，如果直接promise.then是不行的，直接promise.then()会导致几乎同时执行，每一个都是独立的promise对象，没有依赖关系。
  promise = promise.then(() => printNum(i))
}
```

### 解释一下第二个代码中为什么解释说不能promise.then(() => printNum(i))，这是因为.then()每次都会返回一个新的promise对象，这些对象都是独立存在的，没有一个先后依赖关系

```js
//就像这样
promise.then(() => printNum(1))
promise.then(() => printNum(2))
promise.then(() => printNum(3))
promise.then(() => printNum(4))
promise.then(() => printNum(5))

//1 2 3 4 5，不会每隔一秒就输出
```

### 再解释一下为什么promise = promise.then(() => printNum(i))可以达到每隔一秒就输出呢？

### 关门，上代码！

```js
/*
在上面的第一个代码中，promise.then()执行完以后，返回一个新的promise对象，紧接着调用这个新的promise上的.then()以此类推，有一个等待的关系，下一个的执行时机取决于上一个promise的完成，而下面这种写法，有着异曲同工之妙。
*/
promise = promise.then(() => printNum(1))
promise = promise.then(() => printNum(2))
promise = promise.then(() => printNum(3))
promise = promise.then(() => printNum(4))
promise = promise.then(() => printNum(5))
```

