# vite基础

## 1. 为什么需要构建工具？

核心资源：JS TS JSX CSS... PNG JPEG

模块化：ESM，CommonJS，UMD

资源编译：高级语法的编译

产物质量：代码体积，代码性能

开发效率：热更新

### 前端构建工具的意义

模块化方案

语法转译：高级语法转译，比如Sass、TS；资源加载

产物质量：产物压缩、无用代码删除、语法降级

开发效率

## 2.什么是vite？

No-bundel开发服务，源文件无需打包

生产环境基于Rollup的Bunder



核心特征

高性能：dev启动和热更新速度非常快

简单易用，开发者体验好



当下问题：
bundle带来的性能开销

JS的性能瓶颈



基于原生ESM（在script标签中将type属性设置为module，支持ES写法比如import）

无需打包项目源代码

天然的按需加载

可以利用文件级的浏览器缓存

#### Esbuild基于GoLang开发：



