import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {Wallet, Files, RefreshRight, User, PieChart} from '@element-plus/icons-vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/index.vue'),
    children:[
      {
        path:"/echarts",
        name:"echarts",
        component: () => import('../views/Home/childrens/EchartsView.vue'),
        meta:{title:"数据展示",icon:PieChart}
      },
      {
        path:"/pay",
        name:"pay",
        component: () => import('../views/Home/childrens/PayList.vue'),
        meta:{title:"订单管理",icon:Wallet}
      },
      {
        path:"/menu",
        name:"menu",
        component: () => import('../views/Home/childrens/MenuList.vue'),
        meta:{title:"菜单管理",icon:Wallet}
      },
      {
        path:"/Employeeupdate",
            name:"Employeeupdate",
            component:() => import('../views/Home/childrens/EmployeeUpdate.vue'),
            meta:{title:"员工列表",icon:RefreshRight}
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue')
  },
  // 页面重定向
  {
    path:"/",
    redirect:"/login"
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
