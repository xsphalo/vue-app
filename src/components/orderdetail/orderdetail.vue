<template>
	<div class="mui-content">
			<div class="header">
				<p @click="goback">
					<img :src="whiteright">
					<span>我的</span>
				</p>
				<p>订单详情</p>
				<p></p>
			</div>
			<div class="detailtop">
				<p v-if="orderdetail.status == 1">当前状态：<span>已审核</span></p>
				<p v-if="orderdetail.status == 2">当前状态：<span>待交接</span></p>
				<p v-if="orderdetail.status == 3">当前状态：<span>运送中</span></p>
				<p v-if="orderdetail.status == 4">当前状态：<span>已完成</span></p>
				<p v-if="orderdetail.status == 1">订单在审核中</p>
				<p v-if="orderdetail.status == 2">货物待交接中</p>
				<p v-if="orderdetail.status == 3">货物正在运送途中</p>
				<p v-if="orderdetail.status == 4">货物运送已完成</p>
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
					<p>{{orderdetail.orderno}}</p>
				</div>
			</div>
			<div class="detailitem marginbot">
				<div class="details nobtmbor">
					<p>箱子编号：</p>
					<p>{{orderdetail.bid}}</p>
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
					<p>{{orderdetail.carno}}</p>
				</div>
			</div>
			<div class="detailitem marginbot">
				<div class="details nobtmbor">
					<p>到站时间：</p>
					<p>{{orderdetail.arrivetime}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="details">
					<p>发布时间：</p>
					<p>{{orderdetail.created_at}}</p>
				</div>
			</div>
			<div class="detailitem">
				<div class="details  nobtmbor">
					<p>完成时间：</p>
					<p>{{orderdetail.receivetime}}</p>
				</div>
			</div>
		</div>
</template>
<script>
	import whiteright from '../../assets/images/whiteright.png'
	import phone from '../../assets/images/phone.png'
	import  {orderdetail}  from '../../api/index.js'
	import {  getStore } from '../../utils/storage.js'
	export default{
		data(){
			return{
				whiteright:whiteright,
				phone:phone,
				orderdetail:{},
				from_site:{site:''},
				to_site:{site:''},
				passenger:{mobile:''}
			}
		},
		methods:{
			_orderdetail(){
				var id = this.$route.params.id
				console.log(id)
				var token = getStore('token')
				var params={
					id:id,
					token:token
				}
				orderdetail(params).then(res => {
			      		if( res.errorCode == 0){
			      			this.orderdetail = res.results
			      			this.from_site = res.results.from_site
			      			this.to_site = res.results.to_site
			      			if(res.results.passenger.mobile == null){
			      				this.passenger.mobile=''
			      			}else{
			      				this.passenger = res.results.passenger
			      			}
			      			
			      		}else{
			      		}
			    })
			},
			goback(){
				this.$router.go(-1);
			}
			
		},
		mounted(){
			this._orderdetail()
		},
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	@import '../../assets/css/orderdetail.css';
	.tela{
		display: block;
		color: #333;font-size: 16px;
		height: 1.07rem;width: 6.2rem;line-height: 1.07rem;
	}
</style>