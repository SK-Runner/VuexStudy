export default {
    state: {
        emplist:[
            {name:'赵',age:30},
            {name:'钱',age:22},
            {name:'孙',age:21},
            {name:'李',age:25},
            {name:'王',age:26},
            {name:'苏',age:23},
            {name:'石',age:50},
        ],
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
    },
    mutations: {

    },
    actions:{

    }
}