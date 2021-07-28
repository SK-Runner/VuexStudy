<template>
  <div class="hello">
    <ul>
      <li>
        <button @click="changeA">点击A加1</button>
        {{A}}
      </li>
      <li>
        <button @click="changeB">点击B加2</button>
        {{B}}
      </li>
      <li>
        <button @click="changeC">点击C加3</button>
        {{C}}
      </li>
    </ul>
    <div>
      <button @click="toGetterTest">跳转到Vuex Getter测试</button>
    </div>
    <div>
      <button @click="toMutationTest">跳转到Vuex Mutation测试</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      count: this.$store.state.count,
      text:"Hello Vuex",
    }
  },
  // computed: mapState({
  //   // 箭头函数简单返回
  //   A:state => state.A,
  //   // 字符串参数 B 相当于 state.B，只需要保证字符串内容与状态名相同。
  //   B:'B',
  //   // 在普通函数中使用关键字this
  //   C(state){
  //     console.log('在普通函数中使用关键字this：',this.text);
  //     return state.C
  //   }
  // }),
  // 只需要保证字符串数组值与状态名同步
  // computed: mapState(['A','B','C']),
  computed: {
    // mapState与局部计算属性混合使用
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
  methods:{
    changeCount(){
      // 只能通过 commit 改变状态
      this.$store.commit('changeCount');
      // 使用状态
      this.count = this.$store.state.count;
    },
    changeA(){
      this.$store.commit('changeA');
    },
    changeB(){
      this.$store.commit('changeB');
    },
    changeC(){
      this.$store.commit('changeC');
    },
    toGetterTest(){
      this.$router.push('/GetterTest');
    },
    toMutationTest(){
      this.$router.push('/MutationTest');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
