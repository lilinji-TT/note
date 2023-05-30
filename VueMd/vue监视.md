# vue监视

## 监视属性：

1.配置对象watch，用法代码实例。

```vue
		//常规写法1
		//计算属性也是属性，同样可以监视，用法与实例一致
		new vue({

			data:{

			example:"123"，

			numbers:{
				a:1,
				b:2
				}
			},

			computed：{
				info(){
					return "nihao !";
				}
			},

			watch:{
				
				//example为监视的属性的名称，即为data中的example
				example:{
					immediate:true,//初始化时可以立即执行handler函数一次，默认为false
					//当数据被修改时调用handler函数
					//newvalue为变化后的值，oldvalue为旧值
					handler(newvalue,oldvalue){
					console.log("example被修改",newvalue,oldvalue);
					}
				},
				//简写
				example(newvalue,oldvalue){
					console.log("example被修改",newvalue,oldvalue);
				}
				//计算属性
				info:{
					handler(newvalue,oldvalue){
					console.log("info被修改",newvalue,oldvalue);
					}
				},
				//监视多级结构中的某个属性的变化
				'numbers.a':{
						handler(newvalue,oldvalue){
                            console.log("numbers.a被修改",newvalue,oldvalue);
                        }
				},
				//监视多级结构中的所有属性的变化，需配置deep:true,
				numbers:{
						deep:true,
						handler(newvalue,oldvalue){
                            console.log("numbers里的属性被修改",newvalue,oldvalue);
                        }
				},
			}
		})

		//写法2
		const vm=new vue({

			data:{
			 name:"123",
			}
		})

		vm.$watch('name',{

			immediate:true,//初始化时可以立即执行handler函数一次，默认为false
			handler(newvalue,oldvalue){
					console.log("name被修改",newvalue,oldvalue);
			}
		}),

		//简写无法修改watch默认的配置
		vm.$watch('name',funcation(newvalue,oldvalue){
			console.log("name被修改",newvalue,oldvalue);
		})

		//这种方式较为灵活，可以根据后续用户的需求选择监视
```

2.一些注意点：

​	#1.监视的属性必须是存在的，

​	#2.监视的属性发生变化时，handler函数会自动调用，进行设置好的操作，

​    #3.监视watch可以在创建vue实例时加入配置，也可以使用vm.$watch来配置监视，

​	#4.vue默认是可以监视到多级结构中的属性，但watch不是默认监视，需要配置deep为true，

​	#5.同样可以简写（代码块中展示）。

3.watch与computed的比较：

#1.computed可以实现的，watch也可以实现

#2.watch可以实现异步操作，但是computed不可以实现

#3.被vue管理的函数写成普通函数this是指向vue，但不被vue管理的函数，写成箭头函数，此时this指向vue（this会找它所指向的存在，没有找到就继续往外找，找到就停止）

