# Vue08		

-  ***若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。***

-  ***若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。***
-  ***若：<input type="checkbox"/>***

- ​             	 ***1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）***

- ​              	***2.配置input的value属性:***

- ​                  ***(1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）***

- ​                  ***(2)v-model的初始值是数组，那么收集的的就是value组成的数组***

- ​         		 ***备注：v-model的三个修饰符：***

- ​                 	 ***lazy：失去焦点再收集数据***

- ​                 	 ***number：输入字符串转为有效的数字***

- ​                	  ***trim：输入首尾空格过滤***


 