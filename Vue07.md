# Vue07

（1）使用监视属性watch与计算属性computed都能实现，但计算属性computed使用更为方便

```vue
   		    new Vue({
				el:'#root',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:19,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:21,sex:'男'},
						{id:'004',name:'温兆伦',age:22,sex:'男'}
					],
					filPerons:[]
				},
				watch:{
					keyWord:{
						immediate:true,
						handler(val){
							this.filPerons = this.persons.filter((p)=>{
								return p.name.indexOf(val) !== -1
							})
						}
					}
				}
```

```vue
		    new Vue({
				el:'#root',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:19,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:21,sex:'男'},
						{id:'004',name:'温兆伦',age:22,sex:'男'}
					]
				},
				computed:{
					filPerons(){
						return this.persons.filter((p)=>{
							return p.name.indexOf(this.keyWord) !== -1
						})
					}
				}
			}) 
```

（2）**filter方法功能是负责过滤不符合条件的数组的元素**，使用时会调用一个**回调函数**，这个函数会**携带一个参数作为当前迭代的项**，回调函数返回**true的项会保留**，**false的项会过滤**（filter可以传的参数有元素，索引值index及数组本身self）；**indexof**是查询是否存在元素，存在返回其在数组中的索引值index（下标），不存在返回-1。

（3）**this指向的总结：**

一，直接调用的普通函数，this是一定指向window的，不管函数放在哪里，因为没有谁是去调用，只是window调用的，而window调用函数是可以省略的，直接调用（多次通过bind改变this指向，函数中的this都只由第一次绑定的bind决定）。

二，通过对象调用的函数，谁调用this就指向谁。

三，通过new的方式调用的函数，this绑定在了该实例对象上，指向实例对象。

四，箭头函数内部没有this，this指向上一级函数的this。

（4）**数据劫持：**

在vue实例中的_data就是data(data赋值给 _data)，但是不能通过vm实例直接访问data（vm.data=undfine），可以通过访问 _data去访问data里的属性。 _data做了数据劫持来实现响应式的操作，数据双向绑定，不能直接看到data数据（数据代理）。

```js
//源码
function initData(vm) {
     //data赋值
  vm._data = typeof data === 'function' ? getData(data, vm) : data || {}
  if (!isReserved(key)) {
    // 数据代理，用户可直接通过vm实例返回data数据
    proxy(vm, "_data", key);//数据代理（劫持）
  }
}

function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  // 首字符是$, _的字符串
  return c === 0x24 || c === 0x5F
}
```

```js
//源码
function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);//数据代理，使vm可以直接访问到data的数据
}
```

vm.$data.也可以访问data里的数据

```js
Object.defineProperty(Vue.prototype,'$data', 
dataDef dataDef.get=function(){return this._data };
```

