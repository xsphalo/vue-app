<template>
	<!-- ........底部导航栏............. -->
			<div class="footers">
				<router-link to="/orders">
					<div class="footer-item">
						<!-- <img :src="order_normal"> -->
						<i class="icon-orders"></i>
						<p>订单</p>
					</div>
				</router-link>
				<router-link to="/search">
					<div class="footer-item">
						<!-- <img :src="query_normal"> -->
						<i class="icon-search"></i>
						<p>查询</p>
					</div>
				</router-link>
				<router-link to="/percenter">
					<div class="footer-item">
						<!-- <img :src="me_normal"> -->
						<i class="icon-percenter"></i>
						<p>我的</p>
					</div>
				</router-link>
			</div>
</template>
<script type="text/javascript">
	import order_normal from '../../assets/images/tab_bar/order_normal.png'
	import order_select from '../../assets/images/tab_bar/order_select.png'
	import query_normal from '../../assets/images/tab_bar/query_normal.png'
	import query_select from '../../assets/images/tab_bar/query_select.png'
	import me_normal from '../../assets/images/tab_bar/me_normal.png'
	import me_select from '../../assets/images/tab_bar/me_select.png'
	export default{
		data(){
			return{
				order_normal:order_normal,
				order_select:order_select,
				query_normal:query_normal,
				query_select:query_select,
				me_normal:me_normal,
				me_select:me_select,
				
			}
		},
		methods:{
			
		},
	}
</script>
<style scoped>
	@import '../../assets/css/footer.css';
	.footers .footer-item i{
		width: 0.59rem;
		height: 0.59rem;
		background-size: 0.59rem auto;
	}
	.icon-orders{
		background: url('../../assets/images/tab_bar/order_normal.png') center no-repeat;
	}
	.icon-search{
		background: url('../../assets/images/tab_bar/query_normal.png') center no-repeat;
	}
	.icon-percenter{
		background: url('../../assets/images/tab_bar/me_normal.png') center no-repeat;
	}
	.router-link-active i.icon-orders{
		background: url('../../assets/images/tab_bar/order_select.png') center no-repeat;
		background-size: 0.59rem auto;
	}
	.router-link-active i.icon-search{
		background: url('../../assets/images/tab_bar/query_select.png') center no-repeat;
		background-size: 0.59rem auto;
	}
	.router-link-active i.icon-percenter{
		background: url('../../assets/images/tab_bar/me_select.png') center no-repeat;
		background-size: 0.59rem auto;
	}

	.router-link-active .footer-item p{
		color: #ff9517;
	}
</style>