import Vue from 'vue';
import vuex from 'vuex'
import 'es6-promise/auto'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        count: 0,
        A: 0,
        B: 0,
        C: 0,
        emplist:[
            {name:'赵',age:30},
            {name:'钱',age:22},
            {name:'孙',age:21},
            {name:'李',age:25},
            {name:'王',age:26},
            {name:'苏',age:23},
            {name:'石',age:50},
        ],
        text:'hello',
        man:{
            name:'Li',
        }
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
        changeText(state,payload){
            console.log(payload.obj.text2);
            state.text = state.text + " " + payload.obj.text1;
        },
        changeMan(state){
            state.man.name = 'Wang';
            state.man.age = 25;
        }
    },
    getters: {
        getEmplist:state=>{
            return state.emplist.filter(emplist=>emplist.age>25);
        },
        getEmplistNum:(state,getters) =>{
            // 获取之前getters过滤出的员工列表，返回列表长度
            return getters.getEmplist.length;
        },
        // getEmplists返回一个函数，该函数可以传入参数age，找到年龄大于age的员工
        getEmplists:state => (age) =>{
            return state.emplist.filter(emplist=>emplist.age>age);
        }
    }
})