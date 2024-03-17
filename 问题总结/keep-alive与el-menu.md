# keep-alive与el-menu的冲突导致菜单抖动

## 定位问题代码：

```vue
//main.vue
<router-view />

//App.vue
<keep-alive>
	<router-view v-if="$router.meta.keepAlive" />
</keep-alive>

<router-view v-if="$router.meta.keepAlive" />
  
//所以最后整体结构大体如下
<keep-alive>
  <router-view v-if="$router.meta.keepAlive">
      <router-view></router-view>
  </router-view>
</keep-alive>

<router-view v-if="$router.meta.keepAlive">
   <router-view></router-view>
</router-view>
```

## 问题描述：

在上面的代码中我们在侧边栏 点击子菜单的时候，当点击到缓存的组件路由时，或者从缓存组件切换到同级组件时，会出现一个抖动的问题，缓存有效，但是渲染有问题，将上面的代码位置进行交换则没有出现抖动的问题，并且缓存依旧有效。

## 初步猜测：

由于最外层的keep-alive组件通过定义的路由元信息meta，设置了字段keepAlive来控制缓存，在缓存时将菜单状态保留了，切换的时候状态冲突导致触发重新渲染使得菜单抖动

## 原因分析过程：

1.先简单理解vue中keep-alive缓存的原理机制：

keep-alive是一个抽象组件，不会被渲染成一个dom节点，也不会出现在组件的父组件链中，被其包裹的组件实例可以通过某些条件决定是否需要缓存。

include：匹配的缓存，可以填写字符串用逗号分隔，正则表达式，字符数组，组件name，exclude同理

exclude：匹配的不缓存

max：最多缓存几个

也可以配合v-if结合路由匹配

作用就是用于保留组件状态或者避免重新渲染。

场景：例如填写表单后，想要去其他页面查看一些信息，不缓存切回来以后所有的状态都被重置，造成体验不好



原理：

- `<keep-alive>` 内部使用了 Vue 的 `render` 函数来控制和管理子组件的渲染。
- 它使用一个名为 `cache` 的 JavaScript 对象来存储非活动组件实例。
- 当渲染一个组件时，`<keep-alive>` 会首先检查 `cache` 是否已经有这个组件实例。如果有，它将直接使用缓存的实例；如果没有，它将创建一个新的实例并将其添加到 `cache` 中。

## 结果：

当切换回缓存路由组件时，之前活动的组件被销毁，所以切回去后会重新走一遍生命周期，也就是重新渲染。

