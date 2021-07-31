<template>
  <div class="mutation">
      <button @click="btn">改变文本</button>
      {{text}}
      <div>
        <button @click="addProp">改变名字并为对象添加新属性</button>
        {{$store.state.MutationTest.man}}
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
            return this.$store.state.MutationTest.text;
        },
    },
    methods:{
        btn(){
            this.$store.commit({
                type: 'changeText',
                obj: {
                    text1:'vuex', // payload.obj.text1可以获取到
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