<template>
	<div class="mui-content">
			<div class="header">
				<p @click="tosearchml">
					<img :src="position">
					<span v-if="site =='' ||site == null||site == undefined">获取站点</span>
					<span v-if="site !==''">{{site}}</span>
				</p>
				<p>查询</p>
				<p @click="toscan"><img :src="erwei"></p>
			</div>
			<div class="timesearch">
				<div class="ymd" @click="open('pickerdate')">
					<input type="text" ref='dates' disabled>
					<p class="jian"></p>
				</div>
				<div class="ymd times" @click="open('pickertime1')">
					<input type="text" v-model="start" ref='start' disabled> 
					<p class="jian"></p>
				</div>
				<div class="middlefont">至</div>
				<div class="ymd timend" @click="open('pickertime2')">
					<input type="text" v-model="end" ref='end' disabled>
					<p class="jian"></p>
				</div>
				<div class="optionsfont" @click="resetbut">重置</div>
				<div class="optionsfont" @click="searching">查询</div>
			</div>
			<mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false">
				<div class="ortderssear" v-for="(item,index) in tasksers">
					<div class="searleft">
						<p>订单编号：{{item.orderno}}</p>
						<p>发布时间：{{item.created_at}}</p>
						<p>始发地：{{item.from_site.site}}</p>
						<p>目的地：{{item.to_site.site}}</p>
						<p>车次号：123</p>
					</div>
					<div class="searright">
						<p>{{item.arrivetime.slice(0,10)}}</p>
						<p>{{item.arrivetime.slice(11,16)}}</p>
						<p>到站</p>
						<button type="button" class="ordersbtn" @click="todetail(item.id)" :data-id="item.id">查看详情</button>
					</div>
				</div>
				<div class="nomore" v-if="!isshow">没有更多数据了</div>
			</mt-loadmore>
			<mt-datetime-picker
		      ref="pickerdate"
		      type="date"
		      v-model="date"
		      @confirm="handleConfirmdate">
		    </mt-datetime-picker>
		    <mt-datetime-picker
		      ref="pickertime1"
		      type="time"
		      v-model="start"
		      @confirm="handleConfirmtime1">
		    </mt-datetime-picker>
		    <mt-datetime-picker
		      ref="pickertime2"
		      type="time"
		      v-model="end"
		      @confirm="handleConfirmtime2">
		    </mt-datetime-picker>
			<!-- ........底部导航栏.............-->
			<Footer></Footer>
		</div>
</template>
<script type="text/javascript">
    import { Loadmore } from 'mint-ui';
    import mui from '../../../static/js/mui.min.js'
    // import muipicker from '../../../static/js/mui.picker.min.js'
	import Footer from '../footer/footer'
	import position from '../../assets/images/position.png'
	import erwei from '../../assets/images/erwei.png'
	import  {tasksearch}  from '../../api/index.js'
	import { getStore } from '../../utils/storage.js'
	const resetvalue = {
		date:'',
		start:'',
		end:''
	}
	export default{
		components:{
			Footer
		},
		data(){
			return{
				position:position,
				erwei:erwei,
				date:'',
				start:'',
				end:'',
				toid:'',
				tasksers:[],
				page:1,
				isshow:true,
				site:"",
				
			}
		},
		computed:{
			
		},
		methods: {
	      open(picker) {
	        this.$refs[picker].open();
	      },
	      handleConfirmdate(value){
	      	
	      	var d = new Date(value);
	      	var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	      	// this.date = datetime;
	      	this.$refs.dates.value = datetime
	      },
	      handleConfirmtime1(value){
	      	if(value instanceof Object) value = value.toLocaleString()
	      	// this.start = value;
	        this.$refs.start.value = value
	      },
	      handleConfirmtime2(value){
	      	if(value instanceof Object) value = value.toLocaleString()
	      	// this.end = value;
	      	this.$refs.end.value = value
	      },
	      resetbut(){
	      	this.$refs.dates.value = ''
	      	this.$refs.start.value = ''
	      	this.$refs.end.value = ''
	      },

	      tosearchml(){
	      	this.$router.push({name:'searchml'})
	      },
	      toscan(){
	      	this.$router.push({name:'scan'})
	      },
	      gettasksearch(){
	      	    var isshow = this.isshow;
				if (!isshow) {
				    return false;
				}
	      	    var _this = this
	      	    var tasksers = this.tasksers
				var token = getStore('token')
				var page = this.page
				var toid = this.toid
				var date= this.$refs.dates.value
				var start = this.$refs.start.value
				var end = this.$refs.end.value
				var params={
					token:token,
					page:page,
					toid:toid,
					date:date,
					start:start,
					end:end
				}
				tasksearch(params).then(res => {
		      		if( res.errorCode == 0){
		      			var rlist = res.results.data;
		      			var rlen = rlist.length;
		      			for (var i = 0; i < rlen; i++) {
					        tasksers.push(rlist[i]);
					    }
					    if (res.results.last_page <= page) {
					        _this.isshow = false
					    }
		      			_this.tasksers = tasksers
		      			_this.page = page+1
		      		}else{
		      			// console.log(res)
		      		}
		      	})
	      },
	      searching(){
				this.page = 1
				this.isshow = true
				this.tasksers = []
				// this.date = this.$refs.dates.value
				this.start = this.$refs.start.value
				this.end = this.$refs.end.value
				this.toid = this.toid
				this.gettasksearch()
	      },
	      todetail(id){
	      	this.$router.push({name:'tasksearchdetail', params: {id: id}})
	      },
	      loadBottom() {
			  //上啦加载更多数据
			  this.isshow =true
			  this.gettasksearch()
			  this.$refs.loadmore.onBottomLoaded();
			},
			getsite(){
                this.site = getStore('site')
                this.toid = getStore('id')
			},

	    },
	    mounted(){
	    	this.gettasksearch()
	    	this.getsite()
	    },
	   
	}
</script>
<style scoped>
	@import '../../assets/css/header.css';
	@import '../../assets/css/search.css';
	.timesearch{
		position: fixed;
		top: 1.2rem;
		left: 0;
		width: 100%;
	}
	.mui-content{
		padding-top: 1.3rem;
	}
	.ordersbtn{
		padding: 0.1rem 0.2rem;
	}
</style>