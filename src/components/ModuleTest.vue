<template>
  <div class="module-test">
      <div>
          <button @click="numberAdd">numberAdd</button>
          <p>{{number}}</p>
      </div>
      <div>
          <button @click="numberChange">一秒后改变数值</button>
          <p>{{number}}</p>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ModuleTest',
    data(){
        return {

        }
    },
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
}
</script>

<style>

</style>