# Vue

## 虚拟DOM中key的作用：

​	1.key是vue中虚拟DOM对象的标识，当数据发生变化时，Vue会根据新数据生成一个新的虚拟DOM，然后Vue会对比新的虚拟DOM与	旧的虚拟DOM，规则如下；

​	2.对比规则：

​						（1）旧的虚拟DOM中找与新的虚拟DOM相同的key：

​											①.若虚拟DOM中内容没变, 直接复用之前的真实DOM！

​                        					②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

​							(2).旧虚拟DOM中未找到与新虚拟DOM相同的key：

​                     					   ①.创建新的真实DOM，随后渲染到到页面。

3.用Vue自带的index可能会引发的问题：

​						 （1）如果对数据进行一个逆序的添加，逆序的删除等破坏顺序的操作：会产生不必要的真实DOM的更新 ==> 在页面渲染								   的效果没有问题，但是会造成资源的浪费，效率低。

​						 （2）如果结构中还有输入类的DOM元素（例如input）：会产生错误的DOM更新 ==> 界面效果会有问题。

4.key的使用环境：

​						 （1）在使用时最好使用每条数据的唯一标识作为虚拟DOM中的key，例如id,学号,手机尾号,身份证号等唯一确定的值。

​		                 （2）如果没有对每条数据进行逆序的操作，仅用于渲染列表用于展示，使用index是没有问题的。

