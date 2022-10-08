<template>
  <el-table
    :data="tableData.slice(startIndex, endIndex)"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="id" label="编号" width="180" />
    <el-table-column prop="title" label="楼盘名称" width="180" />
    <el-table-column prop="num" label="门牌号" width="180" />
    <el-table-column prop="hometype" label="房源户型" width="180" />
    <el-table-column prop="owner" label="户主姓名" />
    <el-table-column>
      <template #header>
        <el-input
          size="small"
          placeholder="请输入住户姓名"
          v-model="search"
          @blur="handleSearch"
        ></el-input>
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
  />
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import apiUrl from "../../../api/apiUrl";
import link from "../../../api/link";
let tableData = reactive<object[]>([]);
let userData = reactive<object[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
let search = ref("");
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
// 执行住户查询
const handleSearch = () => {
  link(apiUrl.userList, "GET", {}, { owner: search.value }).then(
    (value: any) => {
      tableData.splice(0, tableData.length, value.data[0]);
      console.log("查询结果：", tableData);
    }
  );
};
// 请求用户数据
onMounted(() => {
  link(apiUrl.userList).then((value: any) => {
    for (let i of value.data) {
      tableData.push(i);
      userData.push(i);
    }
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
