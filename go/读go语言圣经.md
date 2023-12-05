# 读Golang有感

## 1.变量

- 导出的变量开头需要大写

- 简短变量声明的左边的变量可能并不是都是刚刚声明的，若是已经在相同的词法域声明过了，那么简短变量声明语句对这些已经声明过的变量就只有赋值的行为。

- 简短变量声明语句中必须有一个新的变量声明

  ```go
  f, err := os.Open(infile)
  //...
  f, err := os.Create(outfile) // complie error: no new variables
  ```

​	使用普通的=赋值是被允许的



生命周期：程序运行期间变量有效的时间段

垃圾回收的基本思路：从每一个根对象遍历查看是否可以找到该变量，无法访问，则不可达，则是“垃圾”。所以一个变量的生命周期取决于是否可达。



将指向短生命周期对象的指针保存到具有长生命周期的对象中，特别是保存到全局变量时，会阻止对短生命周期对象的垃圾回收（从而影响程序的性能）。





### 切片（Slice）

类似数组但是没有固定长度

可以访问数组子序列或者全部元素

底层引用数组对象

指针、长度和容量组成

指针指向第一个slice元素的**对应底层数组元素**的地址，但不一定对应数组的第一个元素

内置函数len返回长度，cap返回容量，长度不能超过容量

多个slice之间可以共享底层的数据，引用的数组部分可能会重叠

s[i:j] 创建一个新的slice，i开始到j-1

切片操作超出容量上限将导致一个panic异常

复制一个slice只是对底层数组创建一个新别名

slice之间不能比较，不可使用==判断

对于非bytes类型必须自己展开对比，bytes类型使用标准库提供的高度优化的bytes.Equal函数来判断两个字节型slice是否相等（[]byte）

```go
func equal(x, y []string) bool {
    if len(x) != len(y) {
        return false
    }
    for i := range x {
        if x[i] != y[i] {
            return false
        }
    }
    return true
}
```

为什么不支持 == ？

1.slice元素是简洁间接引用的，slice甚至可以包含自身（当slice声明为[]interface{}时，slice的元素可以是自身）

2.slice的元素是间接引用的，slice的元素是间接引用的，因为底层数组的元素可能会被修改。对于map key的场景不适用

3.一个零值的slice等于nil。一个nil值的slice并没有底层数组。一个nil值的slice的长度和容量都是0，但是也有非nil值的slice的长度和容量也是0的，例如[]int{}或make([]int, 3)[3:]。



测试一个slice是否是空的，使用len(s) == 0来判断，而不应该用s == nil来判断。





### Map

一个**无序的**key/value对的集合

key唯一，其中所有的key都是不同的

map类型可以写为mao[K]V，K和V分别对应key和value

map中所有的key都有相同的类型，value也是，但是key、value可以不同类型

key必须是支持==比较运算符的数据类型

**map可以通过测试key是否相等来判断是否已经存在**，不建议使用浮点数做key类型

对于V的value类型没有任何限制

可以使用make创建一个map，当然slice也可以使用make创建

```go
ages := make(map[string]int) // mapping from strings to ints
```

