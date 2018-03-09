import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Abnodetail from '@/components/abnodetail/abnodetail'
import Abnomal from '@/components/abnomal/abnomal'
import Checkorder from '@/components/checkorder/checkorder'
import Message from '@/components/message/message'
import Messagedetail from '@/components/messagedetail/messagedetail'
import Orderdetail from '@/components/orderdetail/orderdetail'
import Orders from '@/components/orders/orders'
import Percenter from '@/components/percenter/percenter'
import Search from '@/components/search/search'
import Searchml from '@/components/searchml/searchml'
import Scan from '@/components/scan/scan'
import Tasksearchdetail from '@/components/tasksearchdetail/tasksearchdetail'
import Changelogin from '@/components/changelogin/changelogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      // redirect:'/orders',
    },
    {
      path: '/abnodetail',
      name: 'abnodetail',
      component: Abnodetail
    },
    {
      path: '/abnomal',
      name: 'abnomal',
      component: Abnomal,
      children: [  
        { path: "/abnomal/abnodetail/:id", component: Abnodetail }  
      ] 
    },
    {
      path: '/checkorder',
      name: 'checkorder',
      component: Checkorder,
      children: [  
        { path: "/orders/orderdetail/:id", component: Orderdetail }  
      ] 
    },
    {
      path: '/message',
      name: 'message',
      component: Message,
      children: [  
        { path: "/message/messagedetail/:id", component: Messagedetail }  
      ] 
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: Orderdetail,
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      children: [  
        { path: "/orders/orderdetail/:id", component: Orderdetail }  
      ] 
    },
    {
      path: '/percenter',
      name: 'percenter',
      component: Percenter,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [  
        { path: "/search/tasksearchdetail/:id", component: Tasksearchdetail }  
      ] 
    },
    {
      path: '/searchml',
      name: 'searchml',
      component: Searchml,
    },
    {
      path: '/scan',
      name: 'scan',
      component: Scan,
    },
    {
      path: '/messagedetail',
      name: 'messagedetail',
      component: Messagedetail,
    },
    {
      path: '/tasksearchdetail',
      name: 'tasksearchdetail',
      component: Tasksearchdetail,
    },
    {
      path: '/changelogin',
      name: 'changelogin',
      component: Changelogin,
    },
    {
      path: '*',
      redirect:'/login'
    },
  ]
})
