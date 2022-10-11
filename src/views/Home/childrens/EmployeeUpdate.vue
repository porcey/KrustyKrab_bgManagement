<template>
  <el-table
    :data="tableData.slice(startIndex, endIndex)"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="id" label="编号" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="post" label="职位" width="180" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="margin-top: 30px"
  />
  <!-- 编辑弹出框 -->
  <UpdateDialog />
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import apiUrl from "../../../api/apiUrl";
import link from "../../../api/link";
import UpdateDialog from "../../../components/UpdateDialog.vue";
import { useStore } from "vuex";
import bus from "../../../utils/bus.js";
import axios from "axios";

let store = useStore();

let tableData = reactive<object[]>([]); // 用于展示的表格数据
let curEdit = {}; // 当前修改后的员工信息
let curEditUser = ref(-1);

const currentPage = ref(1); // 当前页码
const pageSize = ref(10); // 页面容量
let search = ref(""); // 搜索项
let startIndex = computed(() => {
  // 用于计算当前页面的开始项在数组中下标
  return (currentPage.value - 1) * pageSize.value;
});
let endIndex = computed(() => {
  return startIndex.value + pageSize.value - 1;
});

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  console.log("pageSize：", pageSize);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
// 员工信息编辑
const handleEdit = (index: number, row: any) => {
  console.log("修改员工：", index, row);
  curEditUser.value = row.id;
  store.commit("SET_DIALOG", "crew");
};
// 员工删除
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};
// 执行员工查询
const handleSearch = () => {
  link(apiUrl.userList, "GET", {}, { owner: search.value }).then(
    (value: any) => {
      tableData.splice(0, tableData.length, value.data[0]);
      console.log("查询结果：", tableData);
    }
  );
};
let testCur = {
  id: 99,
  title: "1",
  num: "2",
  hometype: "3",
  owner: "4",
};
// 请求员工数据
onMounted(() => {
  if (store.state.HomeModule.viewStatic) {
    axios
      .get("./staticData.json")
      .then((value) => {
        // console.log("value.data = ", value.data);
        for (let i of value.data.crew) {
          tableData.push(i);
          // console.log(i);
        }
        // console.log("员工数据请求完成~~", value.data.crew);
      })
      .catch((reason) => {
        console.log("错了：", reason);
      });
  } else {
    link(apiUrl.userList).then((value: any) => {
      for (let i of value.data) {
        tableData.push(i);
      }
    });
  }
  // 监听是否有数据修改
  bus.on("userUpdate", (key: any) => {
    curEdit = key;
    if (store.state.HomeModule.viewStatic) {
      axios
        .patch("./staticData.json" + "/" + curEditUser.value, curEdit, {})
        .then((value) => {
          console.log("收到了修改员工的请求:", value.data);
        })
        .catch((reason) => {
          console.log("错了：", reason);
        });
    } else {
      link(
        apiUrl.userList + "/" + curEditUser.value,
        "PATCH",
        curEdit,
        {}
      ).then((value: any) => {
        console.log("收到了修改员工的请求:", value.data);
      });
    }
    window.location.reload();
  });
});
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
