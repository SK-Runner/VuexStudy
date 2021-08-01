# vuex-study

> 学习vuex，持续更新，还请大佬指教

```
初始化项目，git操作
1、关联远程仓库：
git remote add origin git仓库链接
2、创建分支dev：
git checkout -b dev
3、提交到dev分支：
git push --set-upstream origin dev
```

## 一、Vuex 概述

### 1、Vuex 的安装

```
npm install vuex --save
或
yarn add vuex
```

​		安装后需要在项目中需要显示引用vuex

```
import vuex from 'vuex'

Vue.use(vuex)
```

​		vuex依赖ES6中promise对象，所以需要安装es6-promise

```
npm install es6-promise --save
或
yarn add es6-promise

在引入vuex的文件中引入es6-promise

import vuex from 'vuex'
import 'es6-promise/auto'
```



### 2、Vuex 简述

​	Vuex 是**专为**vue应用程序开发的**状态管理模式**。

#### 特点：

​		**集中性**（集中管理所有组件状态）

​		**规则性**（以一定规则改变状态）

#### 状态管理模式解释：

​		传统的状态管理模式采用**单向数据流**理念，实际开发应用单向数据流理念带来的问题：

​		1、多视图依赖同一状态：嵌套组件传参方式繁琐，兄弟组件之间无法传递状态。

​		2、不同视图需要变更同一状态：父子组件直接引用或通过事件变更状态，模式脆弱且代码可维护性差。

​		为了解决以上问题，Vuex 将组件的共享状态抽取出来，用**全局单例模式管理**，使组件树成为整体视图，达到状态管理共享的目的。

![](https://my-pictures-warehouse.oss-cn-beijing.aliyuncs.com/img/%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81.png)

## 二、Vuex 核心

### 1、store 仓库

​		Vuex 应用的核心是 store 仓库，store 作为仓库包含着应用中大部分的状态（state）。Vuex和单纯的全局对象区别：

​	（1）Vuex 的状态存储是响应式的。

​	（2）不能直接修改 store 中的状态，唯一修改状态的途径就是mutation（提交）。

##### 案例：搭建环境到实现简单的 count++

​		为了避免子组件频繁导入Vuex，可以将目录 store 作为 Vuex 的唯一对外接口。这样只需要在根组件中导入 store 暴露的实例即可，并且子组件可以通过 this.$store.state 访问状态。

​		第一步：创建目录 store，管理所有状态。

```javascript
// @/store/index.js 文件中配置Vuex，暴露单例对象
import Vue from 'vue';
import vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        changeCount(state){
            state.count++;
        }
    }
})
```

​		第二步：项目入口文件中导入 Store 对象	

```javascript
// main.js 文件中：
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
```

​		第三步：组件中使用共享状态（count）

```javascript
// 组件中的methods中：
methods:{
    changeCount(){
      // 只能通过 commit 改变状态
      this.$store.commit('changeCount');
      // 使用状态
      this.count = this.$store.state.count;
    }
  }
```

### 2、Vuex 的核心概念

#### State 单一状态树

​		Vuex的状态存储是响应式的，从 store 实例中读取状态最简单的方式是计算属性。一个组件需要获取多个状态时，重复声明计算属性会导致重复和代码冗余，因此使用 mapState 辅助函数可以帮助生成计算属性。

​		mapState() 辅助函数的几种用法：

​		组件中使用辅助函数之前需要导入mapState

```javascript
import { mapState } from 'vuex'
```

​		参数为对象时：

```javascript
  computed: mapState({
    // 箭头函数简单返回
    A:state => state.A,
    // 字符串参数 B 相当于 state.B，只需要保证字符串内容与状态名相同。
    B:'B',
    // 在普通函数中使用关键字this
    C(state){
      console.log('在普通函数中使用关键字this：',this.text);
      return state.C
    }
  }),
```

​		参数为数组时：

```javascript
  // 只需要保证字符串数组值与状态名同步
  computed: mapState(['A','B','C']),
```

​		与局部计算属性混合使用：

```javascript
  computed: {
    // 需要使用对象扩展运算符，因为mapState返回的是一个对象
    ...mapState({
      // 箭头函数简单返回
      A:state => state.A,
      // 字符串参数 B 相当于 state.B，只需要保证字符串内容与状态名相同。
      B:'B',
      // 在普通函数中使用关键字this
      C(state){
        console.log('在普通函数中使用关键字this：',this.text);
        return state.C;
      }
    }),
    // 组件其他计算属性
    name(){
      return 'SK';
    },
    age(){
      return '18';
    }
  },
```



### 2、Getter

​		如果我们需要对共享状态进行进一步处理，如对列表进行过滤，可以在 Store 对象中定义 getters 对象（相当于仓库状态的计算属性）。

​		案例一：筛选列表中年龄大于25岁员工（ 通过属性访问getters）

```javascript
// store/index.js中
state: {
    emplist:[
        {name:'赵',age:30},
        {name:'钱',age:22},
        {name:'孙',age:21},
        {name:'李',age:25},
        {name:'王',age:26},
        {name:'苏',age:23},
        {name:'石',age:50},
    ]
},
// store 实例中添加 getters 对象
getters: {
    getEmplist:state=>{
    	return state.emplist.filter(emplist=>emplist.age>25);
    }
}
```

```javascript
// 组件中
computed:{
    emplist(){
        // 引用 getters 中方法
        return this.$store.getters.getEmplist
    }
}
```

​		案例二、获取年龄为25岁以上员工的人数（使用第二参数 getters）

```javascript
// getters中方法可以接受getters为第二参数
getEmplistNum:(state,getters) =>{
	return getters.getEmplist.length;
}
```

​		案例三、选择年龄，找到超过该年龄的所有员工（通过方法访问 getters ）

```javascript
// getEmplists返回一个函数，该函数可以传入参数age，找到年龄大于age的员工
getEmplists:state => (age) =>{
	return state.emplist.filter(emplist=>emplist.age>age);
}
```

​		最后可以使用 ...mapGetters 将 getters 混入computed

### 3、Mutation

​		mutations 类似于事件，这里的“事件名”被称为**事件类型**，“方法体”被称为**回调函数**。

​		每个 mutation 都会接受 state 作为第一个参数。store.commit（）第一个参数为 mutations 的 type（名称），第二个参数为 mutation 的 **载荷**（payload）。

​		**注意**：在Mutations中的事务都是同步的。

```javascript
// 组件中调用 commit()，第二个参数对应 payload
this.$store.commit('changeText','Vuex')
```

```javascript
// 在store实例的mutations中，mutation的 payload 参数大多情况下应该是个对象
changeText(state,payload){
	state.text = state.text + " " + payload;
}
```

​		store.commit()的对象风格提交方式：

```javascript
// commit的参数为一个对象，对象中除type属性外，只能指定一个基本数据类型属性，
this.$store.commit({
	type: 'changeText',
	text: 'Vuex'
})

this.$store.commit({
    type: 'changeText',
    text1:'a', //payload.text可以获取到
    text2:'b', //payload.text2获取不到
    text3:'c', //payload.text3获取不到
    text4:'d', //payload.text4获取不到
})

// 如果第二个属性是引用类型，则可以通过payload获取它所有属性
this.$store.commit({
    type: 'changeText',
    obj: {
        text1:'vuex', // payload.obj.text1可以获取到
        text2:'a', // payload.obj.text2可以获取到
        text2:'b', // payload.obj.text3可以获取到
        text2:'c', // payload.obj.text4可以获取到
    }
})
```

```javascript
// payload 可以直接获取到传递的参数，
changeText(state,payload){
	state.text = state.text + " " + payload.text;
}
```

​		Mutations 需要遵守 Vue 的相应规则，注意以下情况(vuex 3.x 之前版本适用，4.x 后全部为响应式)：

​		（1）提前在 store 中初始化对象所需属性，临时添加，该属性不可响应式。

​		（2）Mutation时，为对象上添加新属性的方法：

​				Vue.set(对象名，"新属性名"，属性值)

​				新对象替换旧对象：state.obj = { ...state.obj , newProp : 123 }

​		最后可以使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。

### 4、Action

​		Actions 可以包含任意异步操作，**它并不是直接变更状态**，而是通过提交 mutation 变更状态。

​		Actions 中的函数接受一个与 store 实例具有相同方法和属性的 context 对象。可以通过 context.commit() 提交 mutation，context.state 或 context.getters 获取 state 或 getter。

#### 		为什么 context 对象不是实例本身？

​		普通用法：

```javascript
// 定义 action 函数，参数为 context对象
actions:{
    addNumber(context){
        setTimeout(() => {
            context.commit('addNumber');
        }, 1000);
    }
}


// 解构赋值写法
actions:{
    addNumber({commit}){
        setTimeout(() => {
            commit('addNumber');
        }, 1000);
    }
}
```

```javascript
// 触发Actions
this.$store.dispatch('addNumber');
```

​		使用荷载：

```javascript
// actions 使用荷载 payload 
actions:{
    addNumber({commit},payload){
        setTimeout(() => {
        	commit('addNumber');
        }, payload.times);
    }
}
```

```javascript
// 荷载方式分发
this.$store.dispatch({
    type: 'addNumber',
    times: 2000
});

// 对象方式分发
this.$store.dispatch('addNumber', {
    times: 2000
});
```

​		**组合 Actions**

​		案例：利用组合 Actions，实现1s后获取班级信息，展示班级信息 1s 后获取学生列表并展示。

```javascript
// 在组件时分发 action（getClassInfo返回了一个promise对象）
getInfo(){
    this.$store.dispatch('getClassInfo').then(res=>{
		this.$store.dispatch('getStudentList');
    });
}
```

```javascript
// 在actions中定义
getClassInfo({commit}){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            commit('getClassInfo');
            resolve();
        }, 1000);
    })
},
getStudentList({commit}){
    setTimeout(() => {
        commit('getStudentList');
    }, 1000);
},
```

​		使用 async / await 方式代替 Promise对象

```javascript
async getClassInfo({commit}){
	return new Promise((resolve,reject)=>{
		setTimeout(() => {
			commit('getClassInfo');
			resolve();
		}, 1000);
	})
},

async getStudentList({commit}){
	setTimeout(() => {
		commit('getStudentList');
	}, 1000);
},
async getInfo({dispatch,commit}){
	// 执行完getClassInfo后再执行getStudentList
	await dispatch('getClassInfo');
	await dispatch('getStudentList');
}
```



### 5、Module

​		应用所有状态集中到同一 store 对象时，整个程序会变得复杂臃肿，因此允许将 store 整体分割为模块（module），每个模块拥有自己的 state、mutations、getters等，也可以嵌套自己的子模块。

​		使用 Module

```javascript
// 定义 module
export default {
    state: {},
    getters: {},
    mutations: {},
    actions:{}
}
```

#### 		模块局部状态

​		模块内部的 mutation 和 getter ，接收的第一个参数是**模块的局部状态对象** **state**。

```javascript
//mutations 和 getters 中的 state 对象只能获取当前 module 的 state 状态
getters: {
	getNumber: state => state.number++,
},
mutations: {
	changeNumber(state){
		state.number++;
	},
},
```

​		模块内部的action，局部状态 context 对象除了拥有 state 和 commit 获取和改变局部状态之外，还拥有 **rootState** 属性获取**根节点状态**。

```javascript
actions:{
	asyncChangeNumber(context){
        setTimeout(() => {
            context.commit('changeNumber')
            // rootState 可以获取根节点状态
            console.log(context.rootState.count);
        }, 1000);
    }
}
```

​		模块内部的 getter，根节点状态 **rootState** 会作为第三个参数暴露出来。

```javascript
getters: {
	getNumber: (state,getters,rootState) => {
    	// getter同样可以通过 rootState 获取根节点状态
		console.log(rootState.test);
		return state.number++;
	},
},
```

#### 命名空间

​		引入模块 module 出现的问题是：默认情况下，模块内部的 actions、mutations 以及 getters 是注册在全局命名空间的，例如 commit("changeNumber") 可以对所有 module 中函数名为 changeNumber 的 Mutations做出相应。

​		如果希望模块拥有更高的封装度和复用性，可以添加 **namespaced : true** 的方式，使其成为带命名空间的模块。

​		当你启用命名空间时，访问该模块内状态、调用 Mutations 等方法的方式都要改变。

```javascript
computed:{
	number(){
	    //['模块名/方法名']
		return this.$store.getters['ModuleTest/getNumber'];
	}
},
methods:{
	numberAdd(){
		//('模块名/方法名')
		this.$store.commit('ModuleTest/changeNumber');
	},
	numberChange(){
		//('模块名/方法名')
		this.$store.dispatch('ModuleTest/asyncChangeNumber')
	}
}
```

##### Getters 变更：带命名空间的模块访问全局内容

```javascript
    getters: {
        // 带命名空间的模块，getters会将rootGetters作为第四参数
        getNumber: (state,getters,rootState,rootGetters) => {
            // rootState.全局状态名
            // rootGetters.全局gettes名
        },
    },
```

##### Actions变更：带命名空间的模块访问全局内容、声明全局 Action

```javascript
//访问全局内容
actions:{
    asyncChangeNumber(context){
        setTimeout(() => {
            context.commit('changeNumber')
            // rootState 可以获取根节点状态
            console.log(context.rootState.count);
            // 访问根节点 Mutations 和 Actions
            // context.commit('根Mutations函数名',payload,{root:true});
            // context.diapatch('根Actions函数名',payload,{root:true});
        }, 1000);
    }
}

actions:{
    // 在命名空间中注册全局Actions，将函数体放在handler函数中
    rootAction: {
        root:true,
            handler(namespacedContext, payload){
            // 函数体
        }
    }
}
```



#####  带命名空间的绑定函数

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```







