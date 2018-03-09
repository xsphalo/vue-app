<template>
	<div class="mui-content">
		<div class="header">
			<p @click="goback">
				<img :src="whiteright">
				<span class="nomals">消息中心</span>
			</p>
			<p>消息详情</p>
			<p class="delet" @click="confirmdelet">删除</p>
		</div>
		<div class="titleconten titles">
			<span>[</span>{{msgdetail.title}}<span>]</span>
		</div>
		<div class="titleconten" v-html='msgdetail.content'></div>
	</div>
</template>
<script type="text/javascript">
    import { MessageBox } from 'mint-ui'
	import whiteright from '../../assets/images/whiteright.png'
	import  {messagedetail,msgdelet}  from '../../api/index.js'
	import {  getStore } from '../../utils/storage.js'
	export default{
		data(){
			return{
				whiteright:whiteright,
				msgdetail:{},
			}
		},
		methods:{
			goback(){
				this.$router.go(-1)
			},
			
			getmessagedetail(){
				var id = this.$route.params.id
				this.id = id
				var token = getStore('token')
				var params={
					id:id,
					token:token
				}
				messagedetail(params).then(res => {
			      		if( res.errorCode == 0){
			      			var str = res.results.content;
			      			res.results.content=str.replace(/[^\d](((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8})/g,"<a href='tel:$1'>$1</a>");
			      			// console.log(str)
			      			this.msgdetail = res.results
			      		}else{

			      		}
			    })
			},
			confirmdelet(){
				var _this = this
				MessageBox.confirm('确定删除本条消息?','消息删除').then(action => {
  					_this.deletabno()
				})
			},
			deletabno(){
				var _this = this
				var token = getStore('token')
				var id = this.id
				var params={
					token:token,
					id:id
				}
				msgdelet(params).then(res => {
			      	if( res.errorCode == 0){
			      		_this.goback()
			      	}else{
			      		
			      	}
			    })
			},
		},
		mounted(){
			this.getmessagedetail()
		},
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	html{
		background: #fff;
	}
	.mui-content{
		background: #fff;
		height: 17.79rem;
	}
	.abnomalde span{
				color: #ff2c2c;
	}
	.header p .nomals{
				letter-spacing: normal;
	}
	.header p.delet{
				font-size: 16px;
	}
	.mui-popup-button{
				color: #666;
	}
	.mui-popup-button-bold{
				color: #ff9517;
	}
	.titleconten{
		padding: 0.4rem 0.27rem;
		font-size: 14px;
		color: #333;
		line-height: 0.56rem;
		letter-spacing: 1px;
	}
	div.titles{
		font-size: 16px;
		color: #333;
		padding-bottom: 0;
	}
	.header p:first-child,
	.header p:last-child{
		width: 2.2rem
	}
</style>