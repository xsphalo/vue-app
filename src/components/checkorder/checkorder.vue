<template>
	<div class="mui-content">
			<div class="header">
				<p @click="goback">
					<img :src="whiteright">
					<span>我的</span>
				</p>
				<p>验收订单</p>
				<p></p>
			</div>
			<div class="">
				<mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false">
					<div class="listiem martop" v-for="(item,index) in accepteds" :keys="index">
							<div class="listiemtop">
								<div class="ordersmsg">
									<p>订单编号：{{item.orderno}}</p>
									<p>发布时间：{{item.created_at}}</p>
									<p><span>始发地：{{item.from_site.site}}</span><span>目的地：{{item.to_site.site}}</span></p>
								</div>
								<div class="ordertatus">
									<p>已验收</p>
								</div>
							</div>
							<div class="bottombtn">
								<button type="button" class="ordersbtn" :data-id = "item.id" @click = "getsaccpeddetail(item.id)">查看详情</button>
							</div>
					</div>
					<div class="nomore" v-if="!isshow">没有更多数据了</div>
				</mt-loadmore>
			</div>
			
		</div>
</template>
<script type="text/javascript">
    import { Loadmore } from 'mint-ui';
    import whiteright from '../../assets/images/whiteright.png'
	import  { accepted }  from '../../api/index.js'
	import {  getStore } from '../../utils/storage.js'
	export default{
		data(){
			return{
				whiteright:whiteright,
				page:1,
				accepteds:[],
				isshow:true
			}
		},
		methods:{
			_accepted(){
				var isshow = this.isshow;
			    if (!isshow) {
			      return false;
			    }
			    var _this = this
			    var accepteds = this.accepteds
				var token = getStore('token')
				var page = this.page
				var params = {
					token:token,
					page:page,
				}
				accepted(params).then(res => {
			      	if( res.errorCode == 0){
			      		var rlist = res.results.data;
		      			var rlen = rlist.length;
		      			for (var i = 0; i < rlen; i++) {
					        accepteds.push(rlist[i]);
					    }
					    if (res.results.last_page <= page) {
					        _this.isshow = false
					    }
		      			_this.accepteds = accepteds
		      			_this.page = page+1
			      	}else{
			      		console.log(res)
			      	}
			    })
			},
			goback(){
				this.$router.go(-1);
			},
			getsaccpeddetail(id){
				this.$router.push({name: 'orderdetail', params: {id: id}})
			},
			loadBottom() {
			  //上啦加载更多数据
			  this.isshow = true
			  this._accepted()
			  this.$refs.loadmore.onBottomLoaded();
			}
			
		},
		mounted(){
			this._accepted()
		}
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	@import '../../assets/css/order.css';
	.martop{
				margin-top: 0.27rem;
	}
	.ordersbtn{
		padding: 0.1rem 0.2rem;
	}
</style>