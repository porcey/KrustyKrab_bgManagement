export default {
    state: {
        // 用于控制页面更新组件的弹出与否
        dialogFormVisible:false,
        dialogType:undefined,
        // 是否浏览静态页面
        viewStatic:true,
        // 当前遍历的路由路径
        dynamicRoute:[]
    },
    getters: {
    },
    mutations: {
        SET_DIALOG(state:any,value:any) {
            state.dialogFormVisible = !state.dialogFormVisible
            state.dialogType = value
        },
        SET_ROUTE(state:any,value:any) {
            state.dynamicRoute = value          
        },
        SET_STATIC(state:any, value:boolean) {
            state.viewStatic = value
        }
    },
    actions: {
    },
}