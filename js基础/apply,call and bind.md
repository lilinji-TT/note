# apply

## 首先明确一点，this的概念

### this是执行上下文的一个关键字，指向当前执行的Function的对象，这一点非常重要。

### 在非严格模式下，this默认指向window。严格模式下未明确指明为null或undefined。

## apply

### apply允许我们临时改变this的指向，并且可以传入一个参数数组，fn().apply(this || null || undefined,args)

### 代码演示

```js
//浏览器环境
var name = 'lisi'
function fn(){
	console.log(this.name) // lisi
}

fn() // lisi
fn.apply(null, ['zhangsan'])//lisi
const obj = {
    name: 'zhangsan'
}
fn.apply(obj)//zhangsan
```

### 手写实现

```js
Function.prototype.myApply = function (context, ...args){
    if (typeof this !== 'function') {
        throw new TypeError(
          'Function.prototype.myApply can only be called on functions'
        )
  	}
    context = context || window //node中为global全局对象
	let key = Symbol('__this')
    context[key] = this
    let res = context[key](...args)
    delete context[key]
    return res
}
const obj = {
    name: 'lisi'
}
var name = 'lisi123'
function fn() {
    console.log(this?.name || 'zhangsan')
}
fn()
fn.myApply(obj)//lisi
```

