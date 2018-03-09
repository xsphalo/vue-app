<template>
	<div class="mui-content">
			<div class="header">
				<p></p>
				<p>登录</p>
				<p></p>
			</div>
			<div class="logincontent">
				<img :src="prologo"/>
				<div class="fromipt">
					<input type="number" name="" id="" value="" placeholder="请输入账号" v-model="mobile" ref="mobile"/>
					<input type="password" name="" id="" value="" placeholder="请输入密码"  v-model="password" ref="password"/>
					<button type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn" data-loading-text="登录中" @click="login">立即登录</button>

				</div>

			</div>
			<div class="btmtip" v-if="ishow">
				<p>账号或密码错误</p>
			</div>
	</div>
	
</template>
<script>
	import {Toast } from 'mint-ui'
	import mui from '../../../static/js/mui.min.js'
    import prologo from '../../assets/images/logo.png'
    import  {userLogin}  from '../../api/index.js'
    import { setStore, getStore, removeStore } from '../../utils/storage.js'
	export default{
		components:{},
		data(){
			return{
				prologo:prologo,
				mobile:'',
				password:'',
				ishow:false,
			}
		},
		computed:{
		},
		methods:{
			login(){
				this.rememberaccout()
				if (!this.mobile || !this.password) {
					Toast({
					  message: '账号或密码不能为空',
					  position: 'bottom',
					  duration: 5000
					});
			        return false
		      	}
		      	mui(document.body).on('tap', '.mui-btn', function(e) {
				    mui(this).button('loading');
				    setTimeout(function() {
				        mui(this).button('reset');
				        Toast({
						  message: '未响应',
						  position: 'bottom',
						});
				    }.bind(this), 1000);
				});
		      	var _this = this
		      	var params = {
		      		mobile : this.mobile,
		      		password : this.password,
		      	}
		      	userLogin(params).then(res => {
		      		if( res.errorCode==0){
		      			setStore('token', res.results)
		      			Toast({
						  message: '登录成功',
						  iconClass: 'icon icon-success',
						  duration: 800
						});
						setTimeout(function(){
							_this.$router.push({
				              name: 'orders'
				        })},1000)
		      			
		      		}else{
		      			console.log(res)
		      		}
		      	})
			},
			rememberaccout () {
		      if (this.mobile.replace(/(^s*)|(s*$)/g,'').length ) {
		        setStore('mobile', this.mobile)
		      }
		    },
		    getmobile(){
		    	this.mobile = getStore('mobile')
		    },
		},
		mounted(){
			this.getmobile()
		},
	}
</script>
<style scoped>
	@import '../../assets/css/login.css';
	@import '../../assets/css/header.css';
</style>