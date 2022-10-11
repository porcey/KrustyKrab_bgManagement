<template>
  <div>
    <el-table
      :data="tableData.slice(startIndex, endIndex)"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column prop="nameEn" label="英文名" width="220" />
      <el-table-column prop="nameZn" label="中文名" width="220" />
      <el-table-column prop="price" label="价格" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import apiUrl from "../../../api/apiUrl";
import link from "../../../api/link";
import UpdateDialog from "../../../components/UpdateDialog.vue";
import { useStore } from "vuex";
import bus from "../../../utils/bus.js";
import axios from "axios";

let store = useStore();

let tableData = reactive<object[]>([]); // 用于展示的表格数据
let curEdit = {}; // 当前修改后的菜品信息
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
// 菜品信息编辑
const handleEdit = (index: number, row: any) => {
  console.log("修改菜品：", index, row);
  curEditUser.value = row.id;
  store.commit("SET_DIALOG", "menu");
};
// 菜品删除
const handleDelete = (index: number, row: any) => {
  link(apiUrl.userList, "GET", {}, { owner: search.value }).then(
    (value: any) => {
      tableData.splice(0, tableData.length, value.data[0]);
      console.log("删除结果：", tableData);
    }
  );
};
// 执行菜品查询
const handleSearch = () => {
  link(apiUrl.userList, "GET", {}, { owner: search.value }).then(
    (value: any) => {
      tableData.splice(0, tableData.length, value.data[0]);
      console.log("查询结果：", tableData);
    }
  );
};
// 请求菜单数据
onMounted(() => {
  if (store.state.HomeModule.viewStatic) {
    axios
      .get("./staticData.json")
      .then((value) => {
        // console.log("value.data = ", value.data);
        for (let i of value.data.menu) {
          tableData.push(i);
          // console.log(i);
        }
        // console.log("菜品数据请求完成", tableData);
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
          console.log("收到了修改菜品的请求:", value.data);
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
        console.log("收到了修改菜品的请求:", value.data);
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
