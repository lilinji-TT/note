# css

## CSS盒模型

#### 盒模型都是由四个部分组成的，分别是margin，border，padding和content

#### 标准盒模型和IE盒模型的区别在于设置width和height时，所对应的范围不同：

- #### 标准盒模型的width和height属性的范围只包含了content

- #### IE盒模型的width和height属性的范围包含了border，padding和content

#### 可以通过修改元素的box-sizing属性来改变元素的盒模型：

- #### box-sizing：content-box 表示标准盒模型（默认值）

- #### box-sizing：border-box 表示IE盒模型（怪异盒模型）

## CSS级别顺序

```css
!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性
```

## CSS哪些属性不会被继承

1. #### display：指定元素如何显示，如block、inline、none等

2. #### float：指定元素的浮动方式，如left、right

3. #### clear：指定元素旁边不允许浮动的元素，如left、right、both、none

4. #### position：指定元素的定位方式，如realtive、absolute、fixed

5. #### z-index：指定元素的堆叠顺序

6. #### overflow：指定元素内容溢出的处理方式，如visible、hidden、scroll、auto

7. #### columns：指定多列布局的列数、宽度等属性

## BFC

- #### 设置浮动

- #### overflow设置为auto、scroll、hidden

- #### position设置为absolute、fixed

### 常见的BFC应用

- #### 解决浮动元素令父元素高度坍塌

- #### 解决非浮动元素被浮动元素覆盖的问题

- #### 解决外边距垂直方向重合的问题

## CSS水平垂直居中

#### 绝对相对定位结合margin

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /*绝对相对定位结合margin*/
        body {
            position: relative;
            height: 100vh;
            /* 容器高度 */
            background-color: #f0d3d3;
        }

        .parent {
            background-color: #eeacac;
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto ;
        }
    </style>
</head>

<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /*绝对相对定位结合transform*/
        body {
            position: relative;
            height: 100vh;
            /* 容器高度 */
            background-color: #f0d3d3;
        }

        .parent {
            background-color: #eeacac;
            width: 100px;
            height: 100px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    </style>
</head>

<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /*flex居中*/
        body {
            display: flex;
            height: 100vh;
            justify-content: center;
            align-items: center;
        }
        .parent {
            background-color: #eeacac;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>

</html>
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /*grid布局居中*/
        body {
            height: 100vh;
            /* 容器高度 */
            display: grid;
            place-items: center;
        }

        .parent {
            background-color: #eeacac;
            width: 100px;
            height: 100px;
        }
    </style>
</head>

<body>
    <div class="parent">
        <div class="child"></div>
    </div>
</body>

</html>
```

