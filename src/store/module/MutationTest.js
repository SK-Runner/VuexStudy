export default {
    state: {
        text:'hello',
        man:{
            name:'Li',
        },
    },
    getters: {},
    mutations: {
        changeText(state,payload){
            console.log(payload.obj.text1);
            state.text = state.text + " " + payload.obj.text1;
        },
        changeMan(state){
            state.man.name = 'Wang';
            state.man.age = 25;
        },
    },
    actions:{

    }
}