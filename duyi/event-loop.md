# 事件循环

进程独立，互不影响；线程属于进程，线程运行代码，主线程结束，整个程序结束 线程可以有多个任务

浏览器： 

开辟多个进程：1. 浏览器进程 2.网络进程 3.渲染进程



1. 浏览器进程：负责展示浏览器，用户交互，子进程管理

2. 网络进程：负责网络资源加载
3. 渲染进程：启动后，开启一个渲染主线程，主线程负责执行HTML、CSS、JS代码。一个标签页代表一个进程。

渲染主线程干了什么？（事件循环发生）

- 解析
- 计算
- 布局
- 处理图层
- 执行
- ......

主线程进入无限循环

一次循环检查一次队列中是否有任务，有任务就取出第一个任务执行，执行完进入下一次循环；没有就进入休眠状态



**主线程不能被阻塞**

```
面试题：如何理解JS的异步

JS是一门单线程的语言，这是因为他运行在浏览器的渲染主线程中，而渲染主线程只有一个。而渲染主线程承担着许多的任务，比如渲染页面、执行JS都在其中执行。

如果使用同步的方式，就极有可能 导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程浪费时间；另一方面导致页面无法及时更新，给用户造成卡死的现象。

所以浏览器才用了异步的方式来避免。具体做法就是当某些任务发生时，比如计时器、网络请求、事件监听。主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续的代码。当其他线程任务完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾进行排队等待，等待主线程调度执行。

这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。
```



JS为何会阻碍渲染？

渲染和JS执行都在渲染主进程中



任务优先级？

任务没有优先级

消息队列是有优先级的

微任务队列优先级中的任务最高

```
面试题：阐述一下JS的事件循环

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。
在Chroma源码中，他会开启一个不会结束的for循环，每次循环从消息队列中取出第一个任务执行。而其他线程只需要在合适的时候将任务加入到队列末尾即可。
过去把消息队列简单分为宏队列和微队列，这种说法目前已经无法满足复杂的浏览器环境，取而代之的是一种更多灵活多变的处理方式。
根据W3C的官方的解释，每一个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列，不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务，但浏览器必须有一个微队列，微任务队列一定具有最高的优先级，必须是优先调度执行。

面试题：JS中的计时器能做到精确计时吗？为什么？

不行，因为：

1. 计算机硬件中没有原子钟，无法做到精确计时
2. 操作系统的计时函数本身就有少量偏差，由于JS的计时器最终调用的是操作系统的函数，也就携带了这些偏差
3. 按照W3C的标准，浏览器实现计时器时，如果套嵌超过5层，则会带有4ms的最少时间，这样在计时时间少于4ms时又带来了偏差
4. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差。
```

单线程是异步产生原因

事件循环是异步的实现方式