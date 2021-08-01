export default {
    namespaced:true,
    state: {
        number: 0,
    },
    //mutations 和 getters 中的 state 对象只能获取当前 module 的 state 状态
    getters: {
        // 带命名空间的模块，getters会将rootGetters作为第四参数，访问根节点 Getters
        getNumber: (state,getters,rootState,rootGetters) => {
            // rootState.全局状态名
            // rootGetters.全局gettes名
            // getter同样可以通过 rootState 获取根节点状态
            console.log(rootState.test);
            return state.number++;
        },
    },
    mutations: {
        changeNumber(state){
            state.number++;
        },
    },
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
        },
        // 在命名空间中注册全局Actions，将函数体放在handler函数中
        rootAction: {
            root:true,
            handler(namespacedContext, payload){
                // 函数体
            }
        }
    }
}