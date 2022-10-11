<template>
  <el-dialog
    v-model="store.state.HomeModule.dialogFormVisible"
    title="修改信息"
  >
    <!-- 修改员工信息 -->
    <el-form :model="form" v-if="store.state.HomeModule.dialogType === 'crew'">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="职位" :label-width="formLabelWidth">
        <el-input v-model="form.post" autocomplete="off" />
      </el-form-item>
    </el-form>
    <!-- 修改菜品信息 -->
    <el-form :model="form" v-if="store.state.HomeModule.dialogType === 'menu'">
      <el-form-item label="英文名" :label-width="formLabelWidth">
        <el-input v-model="formMenu.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="中文名" :label-width="formLabelWidth">
        <el-input v-model="formMenu.post" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <el-input v-model="formMenu.post" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog(0)">Cancel</el-button>
        <el-button type="primary" @click="closeDialog(1)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import bus from "../utils/bus.js";
import apiUrl from "../api/apiUrl";
import link from "../api/link";

let store = useStore();

const formLabelWidth = "140px";

const form = reactive({
  name: "",
  post: "",
});
const formMenu = reactive({
  nameEn: "",
  nameZn: "",
  price: "",
});

let closeDialog = (value) => {
  if (value) {
    // value为1表示点击了修改
    let newInfo = {
      name: form.name,
      post: form.post,
    };
    // 剔除未填写的数据段
    for (let i in newInfo) {
      if (newInfo[i] == false) {
        delete newInfo[i];
      }
    }
    // bus.emit("userUpdate", reactive(newInfo));
    link(apiUrl.userList, "GET", {}, {}).then((value) => {
      tableData.splice(0, tableData.length, value.data[0]);
      // console.log("删除结果：", tableData);
    });
  }
  store.commit("SET_DIALOG", "");
};
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
