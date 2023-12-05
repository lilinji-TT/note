# Nest.js

安装脚手架，创建项目

```shell
npm install -g @nestjs/cli

nest new 项目名
```

创建项目的命令后加上 -p 指定包管理器

```shell
nest new demo -p npm // npm pnpm yarn
```



常见装饰器

```js
@Controller // 只能是被注入

@Injectable // 既可以被注入也可以注入，也就是provider，injector

@Module // 声明模块
```



#### 接受响应配置@Response配置后不会主动发送响应信息，必须手动send，可以配置passthrough为true



Nest实现原理

通过装饰器给class或者对象添加元数据，初始化时取出元数据，进行依赖分析，创建对应的实例对象

核心就是Reflect metadata 的 Api （处于草案阶段）需要使用reflect-metadata的 ployfill 包

### 核心原理：通过装饰器给class或者对象添加metadata，并且开启TS的emitDecoratorMetadata来自动添加类型相关的metadata，然后运行时通过这些元数据来实现依赖扫描，对象创建等等功能。



```js
// 记录一下几个API的用法

// Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey?)

/*
  metadataKey (元数据键):
  
  这是你想要设置的元数据的键。它可以是任何值，但通常是一个字符串或符号。
  metadataValue (元数据值):

  这是与元数据键关联的值。它可以是任何JavaScript类型的值。
  target (目标对象):

  这是你想要定义元数据的对象。它可以是一个类的构造函数（对于静态成员）或类的原型对象（对于实例	成员）。
  propertyKey (属性键) (可选):

  这是你想要定义元数据的对象的属性的名称。如果你想要定义元数据在类级别而不是属性级别，你可以省	略这个参数。
*/

import "reflect-metadata";

class MyExampleClass {
  myMethod() {}
}

// 定义元数据
Reflect.defineMetadata('custom:metadata', 'some value', MyExampleClass, 'myMethod');

// 后面你可以通过 Reflect.getMetadata 来获取这个元数据
const metadataValue = Reflect.getMetadata('custom:metadata', MyExampleClass, 'myMethod');
console.log(metadataValue);  // 输出 'some value'

```





module之间可以相互imports，provider之间可以相互注入，两者都会形成循环依赖。

使用forwardRef包裹可以解决

原理是nest会先创建Module、Provider，之后再把引用转发到对方，也就是forwardref