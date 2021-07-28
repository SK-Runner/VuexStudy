<template>
  <div class="getter">
      <div>
            <p>获取年龄大约{{age}}岁的员工</p>
            <p>一共有{{emplistNum}}位，分别是：</p>
            <p v-for="(item,index) in getEmplists" :key="index">
                姓氏：{{item.name}},
                年龄：{{item.age}}
            </p>
      </div>
  </div>
</template>

<script>
export default {
    name:'GetterTest',
    data(){
        return {
            age:21
        }
    },
    computed:{
        emplist(){
            return this.$store.getters.getEmplist
        },
        emplistNum(){
            return this.$store.getters.getEmplistNum
        },
        getEmplists(){
            return this.$store.getters.getEmplists(this.age)
        }
    }
}
</script>

<style>

</style>