<template>
	<div class="mui-content">
			<div class="header">
				<p></p>
				<p>订单</p>
				<p></p>
			</div>
			<div class="ordertop">
				<div class="topitem" :data-status = 'list.status' @click="getorderall(index,list.status)"  ref="datastatusall" v-for="(list,index) in navlist" :class="{ active:defa == index}">
					<p></p>
					<p>{{list.nav}}</p>
					<p class="lines"></p>
				</div>
			</div>
			<div :style="{'-webkit-overflow-scrolling': scrollMode}">
				
			
			<mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false">
				<div class="orderlsit" v-for="(item,index) in orderslist">
						<div class="listiem">
							<div class="listiemtop">
								<div class="ordersmsg">
									<p>订单编号：{{item.orderno}}</p>
									<p>发布时间：{{item.created_at}}</p>
									<p><span>始发地：{{item.from_site.site}}</span><span>目的地：{{item.to_site.site}}</span></p>
								</div>
								<div class="ordertatus">
									<p v-if="item.status == 1">已审核</p>
									<p v-if="item.status == 2">待交接</p>
									<p v-if="item.status == 3">运送中</p>
									<p v-if="item.status == 4">已完成</p>
								</div>
							</div>
							<div class="bottombtn">
								<button type="button" class="ordersbtn" :data-id="item.id" @click="orderdetail(item.id)">查看详情</button>
							</div>
						</div>
				</div>
			<div class="nomore" v-if="!isshow">没有更多数据了</div>
			</mt-loadmore>
			</div>
			<router-link to="/scan">
				<div class="rightscan">
					<img :src="scan">
				</div>
			</router-link>
			<Footer></Footer>
		</div>
</template>
<script type="text/javascript">
    import { Loadmore} from 'mint-ui';
	import scan from '../../assets/images/scan.png'
	import Footer from '../footer/footer'
	import  {orders}  from '../../api/index.js'
	import { getStore } from '../../utils/storage.js'
	export default{
		components:{
			Footer
		},
		data(){
			return{
				scan:scan,
				page:1,
				token:'',
				status:'',
				page:1,
				orderslist:[],
				isshow:true,
				a:'',
				defa:'',
				navlist:[
				{'nav':'全部',status:''},
				{'nav':'已审核','status':1},
				{'nav':'待交接','status':2},
				{'nav':'运送中','status':3},
				{'nav':'已完成','status':4},
				],
				scrollMode:"touch"
			}
		},
		methods:{
			getorders(){
				var isshow = this.isshow;
			    if (!isshow) {
			      return false;
			    }
			    var _this = this
			    var orderslist = this.orderslist
				var token = getStore('token')
				var status = this.status
				var page = this.page
				var params = {
					token:token,
					page:page,
					status:status
				}
				orders(params).then(res => {
		      		if( res.errorCode == 0){
		      			// console.log(res)
		      			var rlist = res.results.data;
		      			var rlen = rlist.length;
		      			for (var i = 0; i < rlen; i++) {
					        orderslist.push(rlist[i]);
					    }
					    if (res.results.last_page <= page) {
					        _this.isshow = false
					    }
		      			_this.orderslist = orderslist
		      			_this.page = page+1
		      		}else{
		      			// console.log(res)
		      		}
		      	})

			},
			getorderall(index,status){
				this.status = status
				this.defa = index
				this.page = 1
				this.orderslist = []
				this.isshow = true
				this.getorders()
			},
			orderdetail(id){
				this.$router.push({name: 'orderdetail', params: {id: id}})
			},
			loadBottom() {
			  //上啦加载更多数据
			  this.isshow = true
			  this.getorders()
			  this.$refs.loadmore.onBottomLoaded();
			}
		},
		mounted(){
			this.getorders()
		},
		
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	@import '../../assets/css/order.css';
	.ordertop{
		position: fixed;
		top: 1.2rem;
		left: 0;
		width: 100%
	}
	.mui-content{
		padding-top: 1.2rem
	}
	.ordersbtn{
		padding: 0.1rem 0.2rem;
	}
</style>