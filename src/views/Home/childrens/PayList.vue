<template>
  <div>
    <el-table
      :data="tableData.slice(startIndex, endIndex)"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="编号" width="180" />
      <el-table-column prop="item" label="菜品" width="180" />
      <el-table-column prop="num" label="数量" width="180" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column prop="type" label="类型" />
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
    <img src="../../../assets/book.png" alt="" />
  </div>
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

let tableData = reactive<object[]>([
  {
    id: "001",
    item: "蟹黄堡",
    num: 3,
    price: "$3.75",
    type: "堂食",
  },
  {
    id: "002",
    item: "蟹黄堡",
    num: 1,
    price: "$1.25",
    type: "堂食",
  },
  {
    id: "002",
    item: "香炸珊瑚(中号)",
    num: 1,
    price: "$1.25",
    type: "堂食",
  },
  {
    id: "003",
    item: "双层蟹黄堡",
    num: 2,
    price: "$4.00",
    type: "打包",
  },
  {
    id: "003",
    item: "海带奶昔",
    num: 2,
    price: "$4.00",
    type: "打包",
  },
]); // 用于展示的表格数据
let curEdit = {}; // 当前修改后的订单信息
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
// 订单信息编辑
const handleEdit = (index: number, row: any) => {
  console.log("修改订单：", index, row);
  curEditUser.value = row.id;
  store.commit("SET_DIALOG");
};
// 订单删除
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};
// 执行订单查询
const handleSearch = () => {
  if (store.state.HomeModule.viewStatic) {
  } else {
    link(apiUrl.userList, "GET", {}, { owner: search.value }).then(
      (value: any) => {
        tableData.splice(0, tableData.length, value.data[0]);
        console.log("查询结果：", tableData);
      }
    );
  }
};
// 请求订单数据
onMounted(() => {
  if (store.state.HomeModule.viewStatic) {
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
          console.log("收到了修改订单的请求:", value.data);
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
        console.log("收到了修改订单的请求:", value.data);
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
img {
  position: absolute;
  width: 300px;
  bottom: 0;
  right: 0;
}
</style>
