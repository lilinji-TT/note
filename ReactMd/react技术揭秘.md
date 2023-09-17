# 浅谈fiber

### React 15架构

- Reconciler 协调器 ----负责找出变化的组件
- Renderer 渲染器 ---- 负责将变化的组件渲染到页面上

### Reconciler 协调器

- 调用函数组件或者是class组件的rener方法，将返回的JSX转化为虚拟DOM 
- 将虚拟DOM和上次更新时的虚拟DOM对比
- 通过diff找出本次更新中变化的虚拟DOM
- 通知Renderer将变化的虚拟DOM渲染到页面上



### Renderer 渲染器 --->> ReactDOM

- 每次发生更新的时候将收到Reconciler的通知将变化的组件渲染



### React 15架构的缺点

在Reconciler中，mount的组件回去调用mountComponent，update的组件会调用updateComponent。这两个方法都会递归更新子组件

递归更新的缺点

一旦开始，中途就无法中断，当层级很深的时候，递归时间超过了16ms，用户交互就会卡顿

解决办法就是使用可中断的异步更新代替同步更新



### React 16架构

三层：

- Scheduler 调度器 ---- 调度任务的优先级，高优先任务优先进入Reconciler
- Reconciler 协调器 ---- 负责找出变化的组件
- Renderer 渲染器 ---- 负责将变化的组件渲染到页面上

新增了调度器Scheduler



#### Scheduler 调度器

以浏览器是否有剩余时间来作为任务中断的标准，当有剩余时间时浏览器通知我们。

requestCallback

- 兼容性
- 触发频率不稳定，受很多因素影响。比如但我们浏览器切换tab后，之前tab注册的request Callback出发的频率会变得很低

基于以上原因React并没有使用，而是实现功能更完备的requestCallback polyfill，这就是Scheduler，除了在空闲时触发回调的功能以外，Scheduler还提供了多种调度优先级供任务设置。

PS：Scheduer是独立于React的库



### Reconciler 协调器

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

 更新工作从递归更新变成了可以中断的循环过程。每次循环都会调用hshouldYield判断当前是否剩余时间。

16中Reconciler和Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记，类似

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

全部的标记见[这里](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js)

整个Scheduler 与Reconciler的工作都在内存中。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer

你可以在[这里](https://zh-hans.reactjs.org/docs/codebase-overview.html#fiber-reconciler)看到`React`官方对React16新**Reconciler**的解释



### Renderer渲染器

Renderer根据ReconcilerweixuniDOM打的标记，**同步**执行对应的DOM操作

 

### 整个更新流程：

![更新流程](https://react.iamkasong.com/img/process.png)

红框部分随时可能由以下原因被中断：

- 有其他高优先级任务需要先更新
- 当前帧没有剩余时间

由于红框的部分都在内存中进行，不会更新页面上的DOM，所以即使反复中断，用户也不会看见更新不完全的DOM

> 实际上，由于**Scheduler**和**Reconciler**都是平台无关的，所以`React`为他们单独发了一个包[react-Reconciler (opens new window)](https://www.npmjs.com/package/react-reconciler)。你可以用这个包自己实现一个`ReactDOM`，具体见**参考资料**



### Fiber架构

代数效应是函数式编程中的一个概念，用于将副作用从函数调用中分离，使得函数纯粹

在react中，最明显的代数效应就是Hooks

重构的一大目的就是将老的**同步更新**架构变成**异步可中断的更新**

**异步可中断更新**可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或者有其他更高优先级任务插队），当可以继续执行时恢复之前的执行的中间状态

浏览器原生支持类似的实现， **Generator**

有一些缺陷使得React团队放弃了 

- 类似**aync**，**Generator**也是传染性的，使用了**Generator**则上下文的其他函数也需要作出改变。这样的心智负担比较重。
- **Generator**执行的**中间状态**是上下文关联的

考虑如下例子：

```js
function* doWork(A, B, C) {
  var x = doExpensiveWorkA(A);
  yield;
  var y = x + doExpensiveWorkB(B);
  yield;
  var z = y + doExpensiveWorkC(C);
  return z;
}
```

每当浏览器有空闲时间都会依次执行其中一个`doExpensiveWork`，当时间用尽则会中断，当再次恢复时会从中断位置继续执行。

只考虑“单一优先级任务的中断与继续”情况下`Generator`可以很好的实现`异步可中断更新`。

但是当我们考虑“高优先级任务插队”的情况，如果此时已经完成`doExpensiveWorkA`与`doExpensiveWorkB`计算出`x`与`y`。

此时`B`组件接收到一个`高优更新`，由于`Generator`执行的`中间状态`是上下文关联的，所以计算`y`时无法复用之前已经计算出的`x`，需要重新计算。

如果通过`全局变量`保存之前执行的`中间状态`，又会引入新的复杂度。

> 更详细的解释可以参考[这个issue(opens new window)](https://github.com/facebook/react/issues/7942#issuecomment-254987818)

基于这些原因，`React`没有采用`Generator`实现`协调器`。



### React Fiber

一套状态更新机制，支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态

每个任务更新单元为React Element对应的Fiber节点



### 实现原理

Fiber包含三层含义：

1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。
2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。
3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

Fiber结构

```js
function FiberNode (
tag: WorkTag,
 pendingProps: mixed,
 key: null | string,
 mode: TypeOfMode
) {
	// 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

### 作为架构来说

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

举个例子，如下的组件结构：

```react
function App() {
  return (
    <div>
      i am
      <span>KaSong</span>
    </div>
  )
}
```

对应的Fiber树的结构：

![Fiber架构](https://react.iamkasong.com/img/fiber.png)

> 这里需要提一下，为什么父级指针叫做`return`而不是`parent`或者`father`呢？因为作为一个工作单元，`return`指节点执行完`completeWork`（本章后面会介绍）后会返回的下一个节点。子`Fiber节点`及其兄弟节点完成工作后会返回其父级节点，所以用`return`指代父级节点。

### 作为静态的数据结构

作为一种静态的数据结构，保存了组件相关的信息：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

### 作为动态的工作单元

作为动态的工作单元，`Fiber`中如下参数保存了本次更新相关的信息，我们会在后续的更新流程中使用到具体属性时再详细介绍

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;
```

如下两个字段保存调度优先级相关的信息，会在讲解`Scheduler`时介绍。

```js
// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```

注意

在2020年5月，调度优先级策略经历了比较大的重构。以`expirationTime`属性为代表的优先级模型被`lane`取代。详见[这个PR(opens new window)](https://github.com/facebook/react/pull/18796)

如果你的源码中`fiber.expirationTime`仍存在，请参照[调试源码](https://react.iamkasong.com/preparation/source.html)章节获取最新代码。



### 双缓存Fiber树

- 屏幕上显示的内容对应的Fiber树成为currentFiber树
- 正在内存中构建的Fiber称为workProgress树

两棵树通过alternate属性连接

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```

React应用的根结点通过使current指针在不同的Fiber树的rootFiber间切换完成currentFiber树指向的切换

就是workInProgress Fiber树构建完成以后交给Renderer渲染在页面上后，应用根结点的current指针指向workInProgress Fiber树，此时workInProgress Fiber树就变成了currentFiber树

每次状态更新都会产生新的workInProgress Fiber树，通过current和workInProgress的替换，完成DOM更新

### mount时

考虑如下例子：

```js
function App() {
  const [num, add] = useState(0);
  return (
    <p onClick={() => add(num + 1)}>{num}</p>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

1. 首次执行ReactDOM.render会创建fiberRootNode（源码中叫fiberRoot）和rootFiber。其中fiberRootNode是整个应用的节点，rootFiber是<App />所在组件树的根节点。

之所以区分，是因为在应用中我们可以多次调用ReactDOM.render渲染不同的组件树，他们会拥有不同的rootFiber。但是整个应用的根结点只有一个，那就是fiberRootNode。

fiberRootNode的current会指向当前页面上已经渲染的内容对应的Fiber树上，即currentFiber树

![rootFiber](https://react.iamkasong.com/img/rootfiber.png)

```js
fiberRootNode.current = rootFiber;
```

由于是首屏渲染，页面中还没有挂载任何DOM，所以fiberRootNode.current指向的rootFilber没有任何子Fiber节点（即当前currentFiber树为空）

2. 接下来进入render阶段，根据组件返回的JSX在内存中依次创建的Fiber节点并连接在一起构建Fiber树，别称为workInProgress Fiber树

在构建workInProgress Fiber树会尝试复用current Fiber树中已有的Fiber节点内的属性，在首屏渲染时只有rootFiber存在对应的current fiber（即rootFiber.alternate）

![workInProgressFiber](https://react.iamkasong.com/img/workInProgressFiber.png)

3. 图中右侧是已构建完的workInProgress Fiber树在commit阶段渲染到页面

此时DOM更新为右侧树对应的样子。fiberRootNode指针指向workInProgress Fiber树使其变为currentFiber树

![workInProgressFiberFinish](https://react.iamkasong.com/img/wipTreeFinish.png)

### 

### update时

1. 修改状态会开启一次新的render阶段并且构建一棵新的workInProgressFiber树

![wipTreeUpdate](https://react.iamkasong.com/img/wipTreeUpdate.png)

和mount时一样，workInProgress的创建可以复用currentFiber树对应的节点数据 （如何复用的过程就是Diff算法）

2. workInProgress Fiber树在render完成构建后进入commit阶段渲染到页面上。渲染完毕以后，workInProgress Fiber变为current Fiber树

![currentTreeUpdate](https://react.iamkasong.com/img/currentTreeUpdate.png)

### 阶段总结：

- `Reconciler`工作的阶段被称为`render`阶段。因为在该阶段会调用组件的`render`方法。
- `Renderer`工作的阶段被称为`commit`阶段。就像你完成一个需求的编码后执行`git commit`提交代码。`commit`阶段会把`render`阶段提交的信息渲染在页面上。
- `render`与`commit`阶段统称为`work`，即`React`在工作中。相对应的，如果任务正在`Scheduler`内调度，就不属于`work`。



### “递” 阶段

从rootFiber开始向下深度优先遍历。为遍历到的每个Fiber节点调用**begin Work**方法，该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber连接起来，当遍历到叶子节点（即没有子组件的组件）时就会进入 “归” 阶段

### “归” 阶段

在 “归” 阶段会调用**completeWork**处理Fiber节点

当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling  !== bull），会进入其兄弟Fiber的 “递”  阶段

如果不存在兄弟FIber，会进入父级Fiber的 “归” 阶段

“递” 和 “归” 阶段会交错执行知道 “归” 到rootFiber。至此，render阶段的工作就结束了。



例子

![Fiber架构](https://react.iamkasong.com/img/fiber.png)

render阶段依次执行

```sh
1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork
```



### beginWork

根据传入的当前Fiber节点，创建子Fiber节点

```js
function beginWork(
	current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
		//...
 }
```

- Current: 当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
- workInProgress: 当前组件对应的Fiber节点
- renderLanes：优先级相关

从双缓存机制来看，除了rootFiber以外，组件mount时，由于是首次渲染，是不存在当前组件对应的Fiber节点在上一次更新时的Fiber节点，即mount时current === null

组件update时，已经mount过了，所以current === null

所以我们可以通过判断**current === null ？**来区分组件是处于mount还是update

基于此原因，**beginWork**的工作可以分为两个部分：

- update时：如果cureent存在，在满足一定条件时可以复用current节点，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child
- mount时：除了fiberRootNode以外，current === null。会根据fiber.tag不同，创建不同类型的字Fiber节点

