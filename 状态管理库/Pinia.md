# [Pinia]()

## #介绍：

### Pinia是一个拥有组合式API，基于Vue3.0的Vue专属状态管理库，允许跨组件或页面通信，也就是共享状态。更加的灵活、方便以及利于使用。

## #优点：

- ### Devtools 支持

  - #### 追踪 actions、mutations 的时间线

  - #### 在组件中展示它们所用到的 Store

  - #### 让调试更容易的 Time travel

- ### 热更新

  - #### 不必重载页面即可修改 Store

  - #### 开发时可保持当前的 State

- ### 插件：可通过插件扩展 Pinia 功能

- ### 为 JS 开发者提供适当的 TypeScript 支持以及**自动补全**功能。

- ### 支持服务端渲染

## #核心概念

## Store

### 	-定义一个store

```js
//这里使用官方文档的例子
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

### 	--Store的id是唯一确定的，就像是v-for中的key一样，唯一。

### --Store的名称最好使用use开头这样符合函数风格的约定。

### --第二个参数可以接收两类值：Setup函数或者Option对象。

### Option Store

### 	#和vue的选项式很像，我们可以传入一个带有state、actions、getter是属性的Option对象。

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

### 	#我们可以认为state是store的数据data，getters是store的计算属性computed，而actions当然就是store的methods。

### Setup Store

### 	#另一种写法，就像我们在Vue中写组合式API，可以传入一个函数，这个函数可以定义一些响应式的属性和方法，并且返回一个想要暴露出去的属性和方法的对象。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

### 	#在Setup Store中：

- #### ref()就是state属性

- #### computed()就是getters

- #### function()就是actions

### 	对比Option Store，Setup Store更加的灵活，比如可以在一个store中使用侦听器，并且能自由的使用任何组合式函数。但这不利于SSR

### -使用Store

### 	--我们虽然定义好了store，但是在没有调用之前store实例是没有被创建的，

### --推荐在不同的文件中定于一个store

### --当store被实例化的时候，可以直接去访问其中的state，getters以及actions中定义的所有属性。

### --store是一个被reactive包装的对象，这意味着不需要在getters后面写.value，就像是setup中的props一样，注意：写了也不能进行解构。

```js
<script setup>
const store = useCounterStore()
// ❌ 这将不起作用，因为它破坏了响应性
// 这就和直接解构 `props` 一样
const { name, doubleCount } = store 
name // 将始终是 "Eduardo" 
doubleCount // 将始终是 0 
setTimeout(() => {
  store.increment()
}, 1000)
// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
```

### --为了保持提取属性的响应性，我们可以使用storeToRefs()。这将为每一个响应式属性创建一个引用。当我们只是使用store的状态(state)而不调用action时，这是非常有用的。PS：可以直接从store中结构普action，他们也被绑定到store上

```js
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```

## State

### 在大多数情况下，state都是store的核心。通常先定义代表APP的state。在Pinia中，state被定义为一个返回初始状态的函数。 

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

TIP：使用vue2时，在state中创建的数据和vue实例中的data遵顼这同样的退则，即state的对象必须是清晰的，当我们像其中添加一个新的属性时，我们需要调用Vue.set()。

### 关于TypeScript

### 	在Pinia中不需要做天多的努力就能让state兼容TS。Pinia会自动推断state的类型，但在特定情况下，需要帮助它一下。