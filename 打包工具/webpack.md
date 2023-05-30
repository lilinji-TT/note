# WebPack篇

## 基本概念

### 本质上，**webpack** 是一个现代 JavaScript 应用程序的*静态模块打包工具*。当 webpack 处理应用程序时，它会在内部构建一个 [依赖图(dependency graph)](https://v4.webpack.docschina.org/concepts/dependency-graph/)，此依赖图会映射项目所需的每个模块，并生成一个或多个 *bundle*。

## 核心概念

- ### 入口（entry）：入口起点指示webpack应该使用那个模块，来构建内部的依赖图的开始。默认值是./src/index.js，通过在 [webpack configuration](https://v4.webpack.docschina.org/configuration) 中配置 **entry** 属性，来指定一个（或多个）不同的入口起点。

- ### 输出（output）：告诉webpack将打包的bundle，以及如何命名这些文件。主要输出文件的默认值是./dist/main.js,其他生成文件默认放置在./dist文件夹中。

- ### loader:让为webpack能够去处理其他类型的文件，并将其转换为有效的模块，以供应用程序使用。以及被添加到依赖图中。*loader 能够 `import` 导入任何类型的模块（例如 `.css` 文件）*

- ### 插件（plugin）：用于执行范围更广的任务。包括：打包优化，资源管理。注入环境变量。

- ### 模式（mode）：通过选择development，production或者none之中的一个来设置mode参数，可以启用webpack内置在对应环境中的优化。默认值为production。

- ### 浏览器兼容性：webpack 支持所有符合 [ES5 标准](https://kangax.github.io/compat-table/es5/) 的浏览器（不支持 IE8 及以下版本）。webpack 的 `import()` 和 `require.ensure()` 需要 `Promise`。想要支持旧版本浏览器，在使用这些表达式之前，还需要 [提前加载 polyfill](https://v4.webpack.docschina.org/guides/shimming/)。

# 入口起点(entry points)

### 单个入口(简写)语法

用法：entry: string | Array<string>

```js
module.exports = {
  entry: './path/to/my/entry/file.js'
};

//以下简写
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```

当我们传入一个数组时，会创建一个多主入口。在我们想要依次注入多个依赖文件，并且将他们的依赖导向到一个chunk时，这就会很有用。

### 