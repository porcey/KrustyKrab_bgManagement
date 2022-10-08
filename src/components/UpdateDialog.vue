<template>
  <el-dialog
    v-model="store.state.HomeModule.dialogFormVisible"
    title="修改用户信息"
  >
    <el-form :model="form">
      <el-form-item label="楼盘名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="门牌号" :label-width="formLabelWidth">
        <el-input v-model="form.num" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源户型" :label-width="formLabelWidth">
        <el-input v-model="form.hometype" autocomplete="off" />
      </el-form-item>
      <el-form-item label="户主姓名" :label-width="formLabelWidth">
        <el-input v-model="form.owner" autocomplete="off" />
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

let store = useStore();

const formLabelWidth = "140px";

const form = reactive({
  title: "",
  num: "",
  hometype: "",
  owner: "",
});

let closeDialog = (value) => {
  if (value) {
    // value为1表示点击了修改
    let newInfo = {
      title: form.title,
      num: form.num,
      hometype: form.hometype,
      owner: form.owner,
    };
    // 剔除未填写的数据段
    for (let i in newInfo) {
      if (newInfo[i] == false) {
        delete newInfo[i];
      }
    }
    bus.emit("userUpdate", reactive(newInfo));
  }
  store.commit("SET_DIALOG");
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
