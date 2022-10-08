export default {
    state: {
        // 用于控制页面更新组件的弹出与否
        dialogFormVisible:false
    },
    getters: {
    },
    mutations: {
        SET_DIALOG(state:any) {
            state.dialogFormVisible = !state.dialogFormVisible
        }
    },
    actions: {
    },
}