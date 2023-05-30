

# Node.js

## 一、模块化

**概念**：把一个项目（大文件）拆成独立并互相依赖的多个小模块（文件）。在node中，一个js文件就是一个模块，并且遵循  

​			   commonJs规范.

```js
//如何使模块互相依赖，互相使用
exports//通过exports暴露
module.exports//通过module.exports
exports === module.exports //结果为true

//示例
//第一个文件test.js
//第一种实现方式，通过添加为exports的属性
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

exports.car = car

//或
exports.car = {
  brand: 'Ford',
  model: 'Fiesta'
}

//在另一个文件中引用，使用require('模块名')，
const items = require('./items')

items.car
//或
const car = require('./items').car
```

```js
//示例
//第一个文件test.js
//第二种实现方式，通过module.exports
const car = {
  brand: 'Ford',
  model: 'Fiesta'
}

module.exports = car

//在另一个文件中引用，使用require('模块名')
const car = require('./car')//这是引用文件模块
const fs = require('fs')//这是引用核心模块
```

###### 1.exports和module.exports是有区别的：

前者公开了它指向的对象的属性，后者公开了它指向的对象.

###### 2.在node中模块分为两大类，核心模块和文件模块

##核心模块：使node引擎提供的，模块标识就是模块名字.

##文件模块：我们自己创建的，需要自己写入路径.

## 二、fs文件系统模块

```
const fs = require('fs')

fs.open('文件名')
```

