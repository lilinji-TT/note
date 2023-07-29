# 深入CSS

## 1.选择器优先级

根据特异度

覆盖 .btn是基础样式，添加.primary可以覆盖

继承：某些属性会自动继承其父元素的计算值，除非显示的指定一个值，和文字相关的都可以继承，和盒模型相关不继承（使用*{box-sizing：inherit} 规避规则） 

## 2.CSS与浏览器的关系

浏览器解析CSS，形成一个dom树，需要找到所有元素的属性以及对应的值。

1. 筛选：选择器匹配，属性有效，符合当前meida等
2. 声明值：一个元素可能有多个声明值
3. cascading：按照来源选出**一个**优先级最高的属性值
4. 层叠值：上一步中角逐出来的
5. defaulting：层叠值为空时，继承或初始值
6. 指定值：经过3 ，4两步之后保证指定值不为空
7. resolving：将一些相对值或者关键字转化为绝对值，相对路径转化为绝对路径
8. 计算值：一般来说，浏览器会在不进行实际布局的情况下，所能得到的最具体的值，比如60%（浏览器拿到css之后就能转化的相对的值）
9. formatting：将一些关键字、百分比转化为绝对值（实际，未知，无法分析的情况）
10. 使用值：进行实际布局使用的值，不会再有相对的值或关键字
11. constraining：将小数像素值转化为整数
12. 实际值：渲染时实际生效的值

## 3.布局（Layout）是什么？

1. 确定内容的大小和位置的算法
2. 依据元素、容器、兄弟节点和内容来计算



盒模型：容器，content、width、height、padding、border、margin

width：指定content box的宽度，height也是；百分数相对于其他属性确定

height：容器有指定高度的时候，百分比才有效；百分数相对于容器的content box高度；auto由内容计算得来

padding：百分数相对于容器宽度；指定四个方向的内边距

border：指定容器边框样式、粗细和颜色

margin：百分数相对于容器宽度；margin：auto（水平居中）；margin collapse 垂直方向上会重叠，取最大

ps：当为border-box时除margin都包含，更符合直觉认为



布局相关技术：

- 常规流（文档流）：
  - 行级
    - IFC（Inline Formatting Context）
    - 只包含行级盒子的容器会创建一个IFC
    - IFC内的排版规则：
      - 盒子在一行内水平摆放
      - 一行放不下的时候，换行展示
      - text-align决定一行内盒子的水平对齐
      - vertical-align决定一个盒子在行内的垂直对齐
      - 避开浮动（float）元素*
  - 块级
    - BFC（Block Formatting Context）
    - 某些容器会创建一个BFC
      - 根元素
      - 浮动、绝对定位、inline-block
      - Flex子项和Grid子项
      - overflow的值不是visible的块盒
      - display：flow-root
    - BFC内的排版规则
      - 盒子从上到下摆放
      - 垂直margin合并
      - BFC内盒子的margin不会与外面的重叠
      - BFC不会和浮动元素重叠
  - 表格布局
  - FlexBox
    - 一种新的排版上下文
    - 它可以控制子级盒子的：
      - 摆放的流向
      - 摆放的顺序
      - 盒子宽度和高度
      - 水平和垂直方向的对齐
      - 是否允许折行
  - Grid
- 浮动
- 绝对定位



行级：适用所有盒模型属性

行级：盒模型中的width和height不适用