H5的history模式，只会改变地址栏，不会导致刷新页面，这事SPA的常见的路由处理方式，允许应用不重新加载整个页面的情况下更新 URL，从而可以通过JS来控制渲染 。

浏览器对pushState事件不会进行监听，意味着不能直接使用addEventListhener来监听pushState事件，需要手动处理，比如包装原生的pushState方法，扩展来出发自定义事件，比如：

```js
// 对原生的pushState和replaceState进行处理
const _warp = (eventType) => {
    // 拿到原本的方法保存
    const originFunc = history[eventType];
    // _warp返回的新函数做两件事情
    // 1. 保证原生的方法正常使用
    // 2. 触发一个自定义事件，使新的pushState（replaceState）被监听
    return function () {
        // 执行原本的方法拿到执行结果，结果应该是和和原生的一致，
        // 所以传入this，arguments
        const result = originFunc.apply(this, arguments);

        // 下面三行代码，创建一个pushState事件，
        // 然后dispatch出去，就做到了让pushState方法也可被监听，
        // 把arguments挂在事件对象e上，目的就一个，
        // pushState的第一个参数可以记录一些信息，
        // 按钮绑定的回调，我们记录了一个path，
        // 我们以后就拿着这个path去对比，以得到该展示的路由组件
        const e = new Event(eventType);
        e.arguments = arguments;
        window.dispatchEvent(e);

        return result;
    };
};

history.pushState = _warp("pushState");
history.replaceState = _warp("replaceState");
```

### 404

- **服务器配置**：传统的 web 服务器配置是为了响应文件系统中相对应的文件请求。例如，如果浏览器请求 `/about`, 服务器会尝试找到一个名为 `about` 的文件或目录。
- **SPA 路由与服务器路由不匹配**：在 SPA 中，路由是由前端 JavaScript 动态处理的，而不是指向真实的文件或目录。当用户直接访问一个像 `/about` 这样的 URL 时，如果服务器没有相应的配置，就会尝试查找文件系统中的 `/about` 资源。当找不到匹配的资源时，就会返回 404 错误。

### 如何解决呢

1. **重定向所有请求到单一入口文件**：无论请求的 URL 路径是什么，服务器都应该将请求重定向到 SPA 的入口文件（通常是 `index.html`）。然后，由 SPA 的**前端路由器**接管，根据 URL 的路径部分来决定展示哪个页面或组件。
2. **使用路由重写规则**：在服务器上配置适当的重写规则，使得除了实际存在的文件和资源之外，所有的请求都定向到 SPA 的入口文件。

### 总结

在“history”模式下，**pushState**允许浏览器更新地址栏而不重新加载页面，虽然浏览器本身不监听，但是可以通过JS手动处理，SPA框架同常利用这一点来实现无刷新的页面内容更新。



hash模式，对比history模式，路由变化是通过URL的哈希部分，‘#’后面的内容来进行控制的。hash可以被浏览器原生监听到，具体事件是**hashchange**事件。

为什么能监听呢？

1. 哈希通常用于定位页面中的特定部分，也就是锚点
2. 哈希变化时，会尝试定位
3. 这个行为使得支持哈希变化成为了浏览器可监听的事件

对比history模式：
	1. hash模式不依赖H5的History API兼容性更好，特别是旧版本的浏览器中
	2. 对于不需要服务器端特别配置

