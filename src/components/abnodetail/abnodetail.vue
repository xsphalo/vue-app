<template>
	<div class="mui-content">
			<div class="header">
				<p @click="goback">
					<img :src="whiteright">
					<span class="nomals">异常订单</span>
				</p>
				<p>订单详情</p>
				<p class="delet" @click="confirmdelet">删除</p>
			</div>
			<div class="detailtop">
				<p class="abnomalde">异常原因：<span>{{abnomals.reason}}</span></p>
			</div>
			<div class="detailitem">
				<div class="details">
					<p class="leter">始发地：</p>
					<p>{{from_site.site}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="details">
					<p class="leter">目的地：</p>
					<p>{{to_site.site}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="details">
					<p>订单编号：</p>
					<p>{{task.orderno}}</p>
				</div>
			</div>
			<div class="detailitem marginbot">
				<div class="details nobtmbor">
					<p>箱子编号：</p>
					<p>{{task.bid}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="passhone">
					<div class="passnumber">
						<p>乘客号码：</p>
						<a :href="'tel:' + passenger.mobile" class="tela">{{passenger.mobile}}</a>
					</div>
					<div class="phones">
						<img :src="phone">
					</div>
				</div>
			</div>
			<div class="detailitem">
				<div class="details">
					<p>乘坐车次：</p>
					<p>{{task.carno}}</p>
				</div>
			</div>
			<div class="detailitem marginbot">
				<div class="details nobtmbor">
					<p>到站时间：</p>
					<p>{{task.arrivetime}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="details">
					<p>发布时间：</p>
					<p>{{task.created_at}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="details  nobtmbor">
					<p>完成时间：</p>
					<p>{{task.receivetime}}</p>
				</div>
			</div>
		</div>
</template>
<script>
	import { MessageBox } from 'mint-ui'
	import whiteright from '../../assets/images/whiteright.png'
	import phone from '../../assets/images/phone.png'
	import  {abnomaldetail,deletes}  from '../../api/index.js'
	import {  getStore } from '../../utils/storage.js'
	export default{
		data(){
			return{
				whiteright:whiteright,
				phone:phone,
				abnomals:{},
				from_site:{site:''},
				to_site:{site:''},
				passenger:{mobile:''},
				task:{},
			}
		},
		methods:{
			_abnomaldetail(){
				var id = this.$route.params.id
				this.id = id
				var token = getStore('token')
				var params={
					id:id,
					token:token
				}
				abnomaldetail(params).then(res => {
			      		if( res.errorCode == 0){
			      			this.abnomals = res.results
			      			this.task = res.results.task
			      			this.from_site = res.results.task.from_site
			      			this.to_site = res.results.task.to_site
			      			if(res.results.passenger.mobile == null){
			      				this.passenger.mobile=''
			      			}else{
			      				this.passenger = res.results.passenger
			      			}
			      		}else{
			      			console.log(res)
			      		}
			    })
			},
			goback(){
				this.$router.go(-1);
			},
			confirmdelet(){
				var _this = this
				MessageBox.confirm('确定删除这条订单?','订单删除').then(action => {
  					_this.deletabno()
				});
			},
			deletabno(){
				var _this = this
				var token = getStore('token')
				var id = this.id
				var params={
					token:token,
					id:id
				}
				delets(params).then(res => {
			      	if( res.errorCode == 0){
			      			_this.goback()
			      	}else{
			      			console.log(res)
			      	}
			    })
			},
			goback(){
				this.$router.go(-1);
			}
			
		},
		mounted(){
			this._abnomaldetail()
		},
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	@import '../../assets/css/orderdetail.css';
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
	.tela{
		display: block;
		color: #333;font-size: 16px;
		height: 1.07rem;width: 6.2rem;line-height: 1.07rem;
	}
	.header p:first-child,
	.header p:last-child{
		width: 2.2rem
	}
</style>