# vue-i18n

## 1.安装：

### 1.1

```vue 
//终端
npm install vue-i18n
```

### 1.2 引入

```vue
import Vue from 'vue'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
```

### 1.3 注册实例

```vue
const i18n=new VueI18n({
	locale:'zh',//设置页面默认语言
	messages:{
		en:{
			login:'login'
		},
		zh:{
			login:'登录'
		}
	}
})

new Vue({
	router,
	store,
	i18n,
	render:h=>h(App)
}).$mount('#app')
```

```vue
import Vue from 'vue'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
//组件
export default new VueI18n({
    silentTranslationWarn: true,
    locale: 'en',
    fallbackLocale: 'dev',
    messages: {

        'zh': require('@/assets/lang/zh.js'),

        'en': require('@/assets/lang/en.js'),

        'jp': require('@/assets/lang/jp.js')

    }
})
------------------------------------------------------------------------------------------------------------

//在assets中创建语言库lang，在创建en.js
export const lang={
	login:'login',
	register:'register'
}
```

## 2.使用：

```vue
//在模板中
{{$t('example')}}
{{$t('lang.login')}}
//在js中
$t('example')
$t('lang.login')
//修改默认语言
this.$i18n.locale = 'zh'//要切换的语言
```

