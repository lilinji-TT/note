![image-20220410215928070](C:\Users\lilinji\AppData\Roaming\Typora\typora-user-images\image-20220410215928070.png)

![image-20220410220022068](C:\Users\lilinji\AppData\Roaming\Typora\typora-user-images\image-20220410220022068.png)

# JS变量声明let和const

- ### 使用var关键字声明的全局作用域变量属于window对象。

- ### 使用let关键字声明的全局作用域变量不属于window对象。

- ### 使用var关键字声明的变量在任何地方都可以修改。

- ### 在相同的作用域或块级作用域中，不能使用let关键字来重置var关键字声明的变量。

- ### 在相同的作用域或块级作用域中，不能使用let关键字来重置let关键字声明的变量。

- ### let关键字在不同作用域，或不用块级作用域中是可以重新声明赋值的。

- ### 在相同的作用域或块级作用域中，不能使用const关键字来重置var和let关键字声明的变量。

- ### 在相同的作用域或块级作用域中，不能使用const关键字来重置const关键字声明的变量

- ### const 关键字在不同作用域，或不同块级作用域中是可以重新声明赋值的:

- ### var关键字定义的变量可以先使用后声明。

- ### let关键字定义的变量需要先声明再使用。

- ### const关键字定义的常量，声明时必须进行初始化，且初始化后不可再修改。