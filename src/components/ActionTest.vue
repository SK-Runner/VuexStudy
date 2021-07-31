<template>
  <div class="action-test">
      <div>
          <button @click="add">一秒后number加一</button>
          number:{{number}}
      </div>
      <div>
        <button @click="getInfo">一秒后显示班级信息，再过一秒后显示学生列表</button>
            <p>班级名称：{{this.$store.state.classInfo.name}}</p>
            <p>班级人数：{{this.$store.state.classInfo.studentNum}}</p>
            <p>班级状态：{{this.$store.state.classInfo.status}}</p>
        <ul class="list">
            <li>学生列表</li>
            <li v-for="(item,index) in this.$store.state.studentList" :key="index">姓名：{{item.name}}，年龄：{{item.age}}</li>
        </ul>
      </div>
      
  </div>
</template>

<script>
export default {
    name:'ActionTest',
    data(){
        return {
            classInfo:{},
            studentList:[],
        }
    },
    computed:{
        number(){
            return this.$store.state.number
        }
    },
    methods:{
        add(){
            this.$store.dispatch('addNumber', {
                times: 2000
            });
        },
        // getInfo(){
        //     this.$store.dispatch('getClassInfo').then(res=>{
        //         this.$store.dispatch('getStudentList');
        //     });
        // }
        getInfo(){
            this.$store.dispatch('getInfo')
        }
    }
}
</script>

<style>
.list{
    list-style: none;
}
</style>