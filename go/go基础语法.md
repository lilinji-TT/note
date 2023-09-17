# Go基础学习

## 1. 基础变量

使用 var关键字 声明变量 

```go
var number int = 1
var str string = "hello world !"
var fNumber_1 float64
var fNumber_2 float32
//可以简写为 := 的方式，只需要专注变量的声明，go会自动推导类型
n := 1
a := "hello world !"
```

在go中，变量有如下几种基础类型

- 整数类型（int）
- 浮点数类型（float）
- 复数类型（complex）
- 布尔类型（boolean）
- 字符串类型（string）