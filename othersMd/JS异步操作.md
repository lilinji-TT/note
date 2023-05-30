# JS异步操作

![image-20220414163521156](C:\Users\lilinji\AppData\Roaming\Typora\typora-user-images\image-20220414163521156.png)

### resolve()中可以放置一个参数用于向下一个then传递一个值，then中的函数也可以返回一个值给then。但是，如果then中返回的是一个Promise对象，那么下一个then将相当于对 的promise进行操作。

![image-20220415202310893](C:\Users\lilinji\AppData\Roaming\Typora\typora-user-images\image-20220415202310893.png)