<template>
  <div class="mutation">
      <button @click="btn">改变文本</button>
      {{text}}
      <div>
        <p>mutation执行时在obj中添加age属性，不会是响应式的</p>
        <button @click="addProp">改变名字并为对象添加新属性</button>
        {{this.$store.state.man}}
      </div>

  </div>
</template>

<script>
export default {
    name: 'MutationTest',
    data(){
        return {

        }
    },
    computed: {
        text(){
            return this.$store.state.text;
        },
    },
    methods:{
        btn(){
            this.$store.commit({
                type: 'changeText',
                obj: {
                    text1:'vuex', // payload.obj.text1可以获取到
                    text2:'a', // payload.obj.text2可以获取到
                    text2:'b', // payload.obj.text3可以获取到
                    text2:'c', // payload.obj.text4可以获取到
                }
            })

        },
        addProp(){
            this.$store.commit('changeMan');
        }
    }
}
</script>

<style>

</style>