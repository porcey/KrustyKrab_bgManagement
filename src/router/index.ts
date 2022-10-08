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
        meta:{title:"缴费管理",icon:Wallet}
      },
      {
        path:"/User",
        name:"User",
        component: () => import('../views/Home/childrens/UserInfo.vue'),
        meta:{title:"住户信息",icon:Files},
        children: [
          {
            path:"/userlist",
            name:"userlist",
            component:() => import('../views/Home/childrens/UserList.vue'),
            meta:{title:"住户列表",icon:User}
          },
          {
            path:"/userupdate",
            name:"userupdate",
            component:() => import('../views/Home/childrens/UserUpdate.vue'),
            meta:{title:"住户信息更新",icon:RefreshRight}
          },
        ]
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
