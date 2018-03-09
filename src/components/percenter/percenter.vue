<template>
	<div class="mui-content">
			<div class="header">
				<p></p>
				<p>我的</p>
				<p></p>
			</div>
			<div class="conten-top">
				<!-- <div class="topleftpic">
					<img :src="weini">
				</div> -->
				<div class="topright">
					<p>{{center.name}}</p>
					<p>账号：{{center.mobile}}</p>
				</div>
			</div>
			<router-link to="/checkorder">
				<div class="percontent">
					<div class="leftpic">
						<img :src="me_yanshou_icon">
					</div>
					<div class="rightfotns">
						<p>验收订单</p>
						<img :src="grayright">
					</div>
				</div>
		    </router-link>
			<router-link to="/abnomal">
				<div class="percontent">
					<div class="leftpic">
						<img :src="me_yichang_icon">
					</div>
					<div class="rightfotns">
						<p>异常订单</p>
						<img :src="grayright">
					</div>
				</div>
			</router-link>
			<router-link to="/message">
				<div class="percontent">
					<div class="leftpic">
						<img :src="me_xiaoxi_icon">
					</div>
					<div class="rightfotns nobtom">
						<p>消息中心</p>
						<div class="dotsper">
							<p class="dots" v-if="reads"></p>
							<img :src="grayright">
						</div>
					</div>
				</div>
			</router-link>
			<!-- ......................... -->
			
				<div class="percontent martop" @click="changlogin">
					<div class="leftpic">
						<img :src="me_qiehuan_icon">
					</div>
					<div class="rightfotns">
						<p>切换账号</p>
						<img :src="grayright">
					</div>
				</div>
				<div class="percontent" @click="confirmout">
					<div class="leftpic">
						<img :src="me_tuichu_icon">
					</div>
					<div class="rightfotns nobtom">
						<p>退出登录</p>
						<img :src="grayright">
					</div>
				</div>
			
			<!-- ........底部导航栏............. -->
			<Footer></Footer>
		</div>
</template>
<script type="text/javascript">
	import Footer from '../footer/footer'
	import { MessageBox } from 'mint-ui'
	import me_yanshou_icon from '../../assets/images/me_yanshou_icon.png'
	import grayright from '../../assets/images/grayright.png'
	import me_yichang_icon from '../../assets/images/me_yichang_icon.png'
	import me_xiaoxi_icon from '../../assets/images/me_xiaoxi_icon.png'
	import me_qiehuan_icon from '../../assets/images/me_qiehuan_icon.png'
	import me_tuichu_icon from '../../assets/images/me_tuichu_icon.png'
	import  {usermsg , newscheck}  from '../../api/index.js'
	import { getStore ,removeStore} from '../../utils/storage.js'
	export default{
		components:{
			Footer
		},
		data(){
			return{
				me_yanshou_icon:me_yanshou_icon,
				grayright:grayright,
				me_yichang_icon:me_yichang_icon,
				me_xiaoxi_icon:me_xiaoxi_icon,
				me_qiehuan_icon:me_qiehuan_icon,
				me_tuichu_icon:me_tuichu_icon,
				center:{},
				reads:''
			}
		},
		
		methods:{
			getusermsg(){
				var token = getStore('token')
				var params = {
					token:token,
				}
				usermsg(params).then(res => {
		      		if( res.errorCode == 0){
		      			this.center = res.results
		      		}else{
		      			// console.log(res)
		      		}
		      	})
			},
			_newscheck(){
				var token = getStore('token')
				var params = {
					token:token,
				}
				newscheck(params).then(res => {
		      		if( res.errorCode == 0){
		      			console.log(res)
		      			this.reads = res.results
		      		}else{
		      			// console.log(res)
		      		}
		      	})
			},
			tuichu(){
				removeStore('token')
				this.$router.push({name:'login'})
			},
			confirmout(){
				var _this = this
				MessageBox.confirm('确定要退出吗?','退出登录').then(action => {
  					_this.tuichu()
				});
			},
			changlogin(){
				this.$router.push({name:'changelogin'})
			},
		},
		mounted(){
			this.getusermsg()
			this._newscheck()
		},
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	@import '../../assets/css/percenter.css';
	.topright{
		font-size: 16px;
		color: #333;
	}
</style>