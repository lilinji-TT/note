# vue05

## A. 条件渲染

### 1.v-show

​	a.写法：**v-show=”表达式“**（1 === 1，bool值）；

​	b.适用于切换频率较高的场景；

​	c.特点：**不展示的dom元素不是被移除**了，只是**调用样式display使值其为 ‘none’** ；

### 2.v-if

​	a.写法：	

​				（**1）v-if=”表达式“；**

​				**（2）v-else-if=”表达式“；**

​				**（3）v-else=”表达式“**（一般不写条件）；

​	b.适用于切换频率较低的场景，频率高效率不如v-show高；

​	c.特点：**不展示的dom元素直接被移除**，在浏览器里不会显示；

​	**PS**：**v-if**可以和**v-else-if，v-else**配合使用，但是不能被隔开；

```vue
			<div v-if="n === 1">Angular</div>
			<div v-else-if="n === 2">React</div>
			<!-- <div>隔开if结构</div> -->
			<div v-else-if="n === 3">Vue</div>
			<div v-else>哈哈</div>
			
			
			<!-- v-if与template的配合使用,但是v-show不行 -->
			<template v-if="n === 1">
				<h2>1</h2>
				<h2>2</h2>
				<h2>3</h2>
			</template>
```



## B.列表渲染

## 1.v-for

a.用于展示渲染列表数据

b.语法：v-for = "(item,index) in xxx" :key="yyy(唯一标识)"

c.可遍历：数组，对象，字符串（少），指定次数（少）

- ```vue
  	 <div id="root">
         
          <h2>遍历数组</h2>
          <ul>
              <li v-for="(p,index) of persons" :key="index">
                  {{p.name}}-{{p.age}}
              </li>
          </ul>
  
        
          <h2>遍历对象</h2>
          <ul>
              <li v-for="(value,k) of car" :key="k">
                  {{k}}-{{value}}
              </li>
          </ul>
  
          <h2>遍历字符串（用得少）</h2>
          <ul>
              <li v-for="(char,index) of str" :key="index">
                  {{char}}-{{index}}
              </li>
          </ul>
  
        
          <h2>遍历指定次数（用得少）</h2>
          <ul>
              <li v-for="(number,index) of 5" :key="index">
                  {{index}}-{{number}}
              </li>
          </ul>
      </div>
  
      <script type="text/javascript">
          Vue.config.productionTip = false
  
          new Vue({
              el:'#root',
              data:{
                  persons:[
                      {id:'001',name:'张三',age:18},
                      {id:'002',name:'李四',age:19},
                      {id:'003',name:'王五',age:20}
                  ],
                  car:{
                      name:'奥迪A8',
                      price:'70万',
                      color:'黑色'
                  },
              	str:'hello'
              }
          })
      </script>
  ```

