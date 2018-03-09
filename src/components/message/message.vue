<template>
	<div class="mui-content">
			<div class="header">
				<p @click="goback">
					<img :src="whiteright">
					<span>我的</span>
				</p>
				<p>消息中心</p>
				<p class="circle" @click="ishowright">
					<span></span>
					<span></span>
					<span></span>
				</p>
				
			</div>
			<div class="rightopat" v-if="ishow">
					<p @click="setread">设为已读</p>
					<p @click="confirmdelet">一键清空</p>
			</div>
			<mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false">
				<mt-cell-swipe tag = 'div' class="pad" v-for="(item,index) in message" :key="index" :data-id="item.id" :data-index = "index" ref = 'mtcell' :right="[
					{content: '取消',style: { background: 'lightgray', color: '#fff' }},
				    {content: '删除',style: { background: 'red', color: '#fff' },handler: () =>  deleteMessage(index,item.id)}
				]">
					
						<div class="notes" @click="tomsgdetail(item.id)" :data-id="item.id">
							<div class="noteleft">
								<div class="xiaoxi">
									<img src="../../assets/images/shaodai_logo.jpg">
									<p class="dots" v-if="item.isread == 0"></p>
								</div>
								<div class="notefont">
									<p>系统消息</p>
									<p>[{{item.title}}]点击查看</p>
								</div>
							</div>
							<div class="noteright">
									<p>{{item.created_at.slice(0,10)}}</p>
									<p>{{item.created_at.slice(11,16)}}</p>
							</div>
						</div>
					
				</mt-cell-swipe>
			    <div class="nomore" v-if="!isshow">没有更多数据了</div>
			</mt-loadmore>
	</div>
</template>
<script type="text/javascript">
	import { MessageBox , CellSwipe ,Loadmore } from 'mint-ui'
	import whiteright from '../../assets/images/whiteright.png'
	import  {messages,taskread,msgclear,msgdelet}  from '../../api/index.js'
	import { getStore } from '../../utils/storage.js'
	export default{
		data(){
			return{
				whiteright:whiteright,
				page:1,
				message:[],
				ishow:false,
				id:'',
				isshow:true,
			}
		},
		methods:{
		    deleteMessage(index,id){  
		        this.$messagebox.confirm('', {  
		                  message: '是否确定删除？',    
		                  confirmButtonText: '确定',    
		                  cancelButtonText: '取消'    
		             }).then(action => {    
		                  // console.log(index,id);  
		                  this.deletmsg(index,id)
		                  
		              }).catch(err => {  
		                  //this.$toast('您已取消删除');
		        })  
		    },  
			getmessage(){
				var isshow = this.isshow;
			    if (!isshow) {
			      return false;
			    }
			    var _this = this
			    var message = this.message
				var token = getStore('token')
				var page = this.page
				var params = {
					token:token,
					page:page
				}
				messages(params).then(res => {
		      		if( res.errorCode == 0){
		      			var rlist = res.results.data;
		      			var rlen = rlist.length;
		      			for (var i = 0; i < rlen; i++) {
					        message.push(rlist[i]);
					    }
					    if (res.results.last_page <= page) {
					        _this.isshow = false
					    }
		      			_this.message = message
		      			_this.page = page+1
		      		}else{
		      			// console.log(res)
		      		}
		      	})
			},
			tomsgdetail(id){
				this.$router.push({name: 'messagedetail', params: {id: id}}) 
			},
			ishowright(){
				this.ishow = !this.ishow 
			},
			confirmdelet(){
				var _this = this
				MessageBox.confirm('确定清空消息?','一键清空').then(action => {
  					_this.allclear()
				});
			},
			allclear(){
				var _this = this
				var token = getStore('token')
				var params = {
					token:token,
				}
				msgclear(params).then(res => {
		      		if( res.errorCode == 0){
		      			_this.message = []
		      			_this.ishow = false
		      		}else{
		      			// console.log(res)
		      		}
		      	})
			},
			setread(){
				var _this = this
				var token = getStore('token')
				var params = {
					token:token,
				}
				taskread(params).then(res => {
		      		if( res.errorCode == 0){
		      			var message = _this.message,item
		      			for(item in message){
		      				message[item].isread = 1
		      			}
		      			_this.ishow = false
		      		}else{

		      		}
		      	})
			},
			deletmsg(index,id){
				var token = getStore('token')
				var id = id
				var index = index
				var params = {
					token:token,
					id:id
				}
				msgdelet(params).then(res => {
		      		if( res.errorCode == 0){
		      			this.message.splice(index, 1);
		      		}else{
		      			// console.log(res)
		      		}
		      	})
			},
			goback(){
				this.$router.go(-1);
			},
			loadBottom() {
			  //上啦加载更多数据
			  this.isshow = true
			  this.getmessage()
			  this.$refs.loadmore.onBottomLoaded();
			},
		},
		mounted(){
			this.getmessage()
		},
		
	}
</script>
<style scoped>
    @import '../../assets/css/header.css';
	@import '../../assets/css/message.css';
	/*.header{
		position: relative;
	}*/
	.rightopat{
		position: fixed;
		right: 0.27rem;top: 1rem;
		background: #fff;
		width: 3.07rem;border-radius: 5px;
		box-shadow: 0 3px 4px rgba(0, 0, 0, .2);z-index: 99999;
	}
	.rightopat p{
		width: 100% !important;
		font-size: 16px !important;
		color: #333 !important;
		height: 1.07rem;
		line-height: 1.07rem;
		text-align: center !important;
		margin: 0;
		display:block !important;
		font-weight: normal !important;
	}
	.rightopat p:first-child{
		border-bottom: .5px solid #e6e6e6;
	}
	.nomore{
		height: 0.93rem;
		text-align: center;
		font-size: 12px;
		color: #999;
		background: #f2f2f2;
		line-height: 0.93rem;
    }
    .noteright{
    	display: flex;
    	justify-content: space-between;
    	flex-direction: column;
    	height: 1rem;
    	margin-left: 1rem;
    }
</style>