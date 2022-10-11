<template>
  <div class="login">
    <div class="menu">
      <img src="../../assets/money.png" alt="" />
      <ul class="menu-tab">
        <li
          v-for="tab in MenuData"
          :key="tab.type"
          :class="tab.cur ? 'cur-tab' : ''"
          @click="changeTab(tab)"
        >
          {{ tab.content }}
        </li>
      </ul>
      <!-- 表单验证 -->
      <div class="menu-body">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          :size="formSize"
          status-icon
        >
          <el-form-item prop="username">
            <label>用户名</label>
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <label>密码</label>
            <el-input v-model="ruleForm.password" show-password />
          </el-form-item>
          <el-form-item prop="repassword" v-if="tabState === 'register'">
            <label>重复密码</label>
            <el-input v-model="ruleForm.repassword" show-password />
          </el-form-item>
          <el-button
            color="rgb(108, 178, 85)"
            class="login-button"
            :disabled="btnState"
            @click="submitForm(ruleFormRef)"
            v-if="tabState === 'login'"
            >登录</el-button
          >
          <el-button
            color="rgb(108, 178, 85)"
            class="login-button"
            :disabled="btnState"
            @click="submitForm(ruleFormRef)"
            v-if="tabState === 'register'"
            >注册</el-button
          >
          <el-button type="default" class="reset-button" @click="clearInput"
            >重置</el-button
          ><el-button type="default" class="reset-button" @click="staticView"
            >浏览静态页面</el-button
          >
        </el-form>
      </div>
    </div>
    <!-- 开屏的弹出提示 -->
    <el-dialog
      v-model="dialogVisible"
      title="欢迎进入蟹堡王后台管理系统🍔"
      width="30%"
    >
      <span
        >由于登陆注册功能借助了本地的json-server, 线上只能浏览静态页面。</span
      >
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import type { FormInstance, FormRules } from "element-plus";
import * as ck from "../../utils/verfifcation.js";
import link from "../../api/link.js";
import apiUrl from "../../api/apiUrl.js";
import { ElNotification } from "element-plus";
import md5 from "js-md5";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
let router = useRouter();
let store = useStore();

// 开屏弹窗提示
let dialogVisible = ref(true);
// 标签切换
const MenuData = reactive([
  { content: "登录", cur: true, type: "login" },
  { content: "注册", cur: false, type: "register" },
]);
let tabState = ref("login");
let changeTab = (tab: any) => {
  MenuData.forEach((item) => {
    item.cur = false;
  });
  tab.cur = true;
  tabState.value = tab.type;
};

// 表单验证
const formSize = ref("default");
// ruleFormRef是表单实例对象 用于提交时验证表单内部数据
const ruleFormRef = ref<FormInstance>();
// 表单item和ruleForm中的某个属性双向绑定
const ruleForm = reactive({
  username: "xj1",
  password: "xj1234",
  repassword: "",
  type: [],
});

// 密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    btnState.value = true;
    callback(new Error("密码不能为空！"));
  } else if (ck.CkPass(value)) {
    btnState.value = true;
    callback(new Error("密码需为6至15位的字母与数字组合"));
  } else {
    callback();
  }
};

// 重复密码验证
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    btnState.value = true;
    callback(new Error("密码不能为空！"));
  } else if (value !== ruleForm.password) {
    btnState.value = true;
    callback(new Error("两次输入不一致！"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "change" },
    { min: 2, max: 8, message: "长度应在2-8个字符之内", trigger: "change" },
  ],
  password: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
  repassword: [{ required: true, validator: validatePass2, trigger: "change" }],
});

// 表单提交验证
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 判断当前是登陆还是注册
      if (tabState.value === "login") {
        console.log("登录");
        link(
          apiUrl.register,
          "GET",
          {},
          {
            name: ruleForm.username,
            pwd: md5(ruleForm.password),
          }
        ).then((value: any) => {
          if (value.data.length) {
            store.commit("SET_STATIC", false);
            console.log("登陆成功");
            router.push("/home");
          } else {
            ElMessage.error("用户不存在或密码错误");
          }
        });
      } else {
        let newUser = {
          name: ruleForm.username,
          pwd: md5(ruleForm.password),
        };
        console.log("login:新用户注册", newUser);

        link(apiUrl.register, "POST", newUser).then((value: any) => {
          ElNotification({
            title: "成功",
            message: "注册成功",
            type: "success",
          });
          MenuData.forEach((item) => {
            item.cur = false;
          });
          MenuData[0].cur = true;
          tabState.value = "login";
          console.log("注册成功！！", value);
        });
      }
      console.log("submit!");
    } else {
      ElNotification({
        title: "失败",
        message: "注册失败",
        type: "error",
      });
      console.log("error submit!", fields);
    }
  });
};
// 按钮状态判断
let btnState = ref(true);
watch(
  ruleForm,
  (newValue, oldValue) => {
    if (tabState.value === "login") {
      if (ruleForm.username && ruleForm.password) {
        btnState.value = false;
      } else {
        btnState.value = true;
      }
    } else {
      if (ruleForm.username && ruleForm.password && ruleForm.repassword) {
        btnState.value = false;
      } else {
        btnState.value = true;
      }
    }
  },
  { immediate: true }
);
// “重置”按钮回调
function clearInput() {
  ruleForm.username = "";
  ruleForm.password = "";
  ruleForm.repassword = "";
}
// 浏览静态页面
function staticView() {
  // store.commit("SET_ROUTE", router.options.routes[1].children);
  router.push("/echarts");
}
onMounted(() => {
  // store.commit("SET_ROUTE", router.options.routes[0].children);
  // console.log("login:", router.options.routes[0].children);
});
</script>

<style lang="scss">
$bg: rgba(94, 112, 87, 0.5);
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login {
  display: flow-root;
  width: 100%;
  height: 100%;
  // background-color: $bg;
  background: url(../../assets/蟹堡王.jpg) no-repeat;
  color: $light_gray;
  text-align: center;
  // border-radius: 10px;
  img {
    position: absolute;
    top: 22%;
    left: 28%;
    width: 150px;
    transform: rotate(-45deg);
  }
  .menu {
    width: 600px;
    height: 400px;
    margin: 0 auto;
    background-color: $bg;
    border-radius: 10px;
    // border: 1px solid black;
  }
  //   标签切换
  .menu-tab {
    width: 200px;
    margin: 0 auto;
    margin-top: 200px;
    padding-top: 20px;
    text-align: center;
    li {
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      //   border: 1px solid black;
      border-radius: 5px;
      cursor: pointer;
    }
    .cur-tab {
      background-color: rgb(109, 146, 98);
    }
  }
  //   登录和注册的表单
  .menu-body {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 30px auto;
    overflow: hidden;
    .login-button {
      width: 20%;
      height: 40px;
      margin-top: 15px;
      box-sizing: border-box;
    }
    .reset-button {
      width: 20%;
      height: 40px;
      margin-top: 15px;
      box-sizing: border-box;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  .el-dialog {
    transform: translateY(50%);
  }
  .el-dialog span {
    font-size: 18px;
  }
}
</style>
