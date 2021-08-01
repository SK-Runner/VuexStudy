import Vue from 'vue';
import vuex from 'vuex'
import 'es6-promise/auto'
import GetterTest from './module/GetterTest'
import MutationTest from './module/MutationTest'
import ModuleTest from './module/ModuleTest'

Vue.use(vuex)

export default new vuex.Store({
    modules:{
        GetterTest,
        MutationTest,
        ModuleTest
    },
    state: {
        count: 0,
        A: 0,
        B: 0,
        C: 0,
        number:0,
        classInfo:{
            name: '',
            studentNum: '',
            status: ''
        },
        studentList: [],
        test:'你好'
    },
    mutations: {
        changeCount(state){
            state.count++;
        },
        changeA(state){
            state.A++;
        },
        changeB(state){
            state.B += 2;
        },
        changeC(state){
            state.C += 3;
        },
        changeNumber(state){
            console.log('你好');
            state.number++;
        },
        getClassInfo(state){
            state.classInfo = {
                name: '一班',
                studentNum: 4,//班级人数
                status: '开班'
            };
        },
        getStudentList(state){
            state.studentList = [
                { name:'王明', age:21 },
                { name:'赵宏', age:22 },
                { name:'李刚', age:23 },
                { name:'何友', age:24 },
            ];
        }
    },
    getters: {
        // getEmplist:state=>{
        //     return state.emplist.filter(emplist=>emplist.age>25);
        // },
        // getEmplistNum:(state,getters) =>{
        //     // 获取之前getters过滤出的员工列表，返回列表长度
        //     return getters.getEmplist.length;
        // },
        // // getEmplists返回一个函数，该函数可以传入参数age，找到年龄大于age的员工
        // getEmplists:state => (age) =>{
        //     return state.emplist.filter(emplist=>emplist.age>age);
        // }
    },
    actions:{
        addNumber({commit},payload){
            setTimeout(() => {
                commit('addNumber');
            }, payload.times);
        },

        // 只使用promise对象进行组合action
        // getClassInfo({commit}){
        //     return new Promise((resolve,reject)=>{
        //         setTimeout(() => {
        //             commit('getClassInfo');
        //             resolve();
        //         }, 1000);
        //     })
        // },
        // getStudentList({commit}){
        //     setTimeout(() => {
        //         commit('getStudentList');
        //     }, 1000);
        // },

        // 使用 async / await 组合 action
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
    }
})