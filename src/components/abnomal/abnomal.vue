<template>
	<div class="mui-content">
			<div class="header">
				<p @click="goback">
					<img :src="whiteright">
					<span>我的</span>
				</p>
				<p>异常订单</p>
				<p></p>
			</div>
			<div class="abnomals">
				<mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false">
					<div class="abnoitems" v-for="(item,index) in abnomalist" :keys="index">
						<div class="abnoleft">
							<p><span>始发地：{{item.task.from_site.site}}</span><span>目的地：{{item.task.to_site.site}}</span></p>
							<p>订单编号：{{item.task.orderno}}</p>
							<p>发布时间：{{item.task.created_at}}</p>
						</div>
						<div class="abnoright">
							<p>{{item.types.title}}</p>
							<button type="button" class="ordersbtn" :data-id="item.id" @click="abnomaldetail(item.id)">查看详情</button>
						</div>
					</div>

				<div class="nomore" v-if="!isshow" style="color:#999;font-size: 12px;text-align: center">没有更多数据了</div>
				</mt-loadmore>
			</div>
		</div>
</template>
<script type="text/javascript">
    import { Loadmore } from 'mint-ui';
	import whiteright from '../../assets/images/whiteright.png'
	import  {abnomaler}  from '../../api/index.js'
	import { getStore } from '../../utils/storage.js'
	export default{
		data(){
			return{
				whiteright:whiteright,
				page:1,
				abnomalist:[],
				isshow:true,
			}
		},
		methods:{
			getabnomal(){
				var isshow = this.isshow;
			    if (!isshow) {
			      return false;
			    }
			    var _this = this
			    var abnomalist = this.abnomalist
				var token = getStore('token')
				var page = this.page
				var params={
					token:token,
					page:page
				}
				abnomaler(params).then(res => {
		      		if( res.errorCode == 0){
		      			var rlist = res.results.data;
		      			var rlen = rlist.length;
		      			for (var i = 0; i < rlen; i++) {
					        abnomalist.push(rlist[i]);
					    }
					    if (res.results.last_page <= page) {
					        _this.isshow = false
					    }
		      			_this.abnomalist = abnomalist
		      			_this.page = page+1
		      		}else{
		      			console.log(res)
		      		}
		      	})
			},
			abnomaldetail(id){
				this.$router.push({name: 'abnodetail', params: {id: id}}) 
			},
			loadBottom() {
			  //上啦加载更多数据
			  this.isshow = true
			  this.getabnomal()
			  this.$refs.loadmore.onBottomLoaded();
			},
			goback(){
				this.$router.go(-1)
			},
		},
		mounted(){
			this.getabnomal()
		},
	}
</script>
<style scoped>
		@import '../../assets/css/header.css';
		@import '../../assets/css/abnomal.css';
		.ordersbtn{
		padding: 0.1rem 0.2rem;
	}
</style>