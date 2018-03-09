// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
Vue.config.productionTip = false
Vue.use(MintUI)
//引入样式重置，基本样式表
import '../static/css/base.css'
//引入mui库
import '../static/css/mui.min.css'
import '../static/js/mui.min.js'

import './assets/css/my-mint.css';//全局修改mint-UI样式
//兼容ie
import 'babel-polyfill'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
