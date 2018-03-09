<template>
	<div class="mui-content">
		<div class="header">
			<p @click="goback">
				<img :src="whiteright">
				<span class="nomals">首页</span>
			</p>
			<p>扫码</p>
			<p class="delet">
        <label class="labels">
          <input type="file" name="file" accept="image/*" capture="camera" style="opacity: 0">
          <span>相册</span>
        </label>
      </p>
		</div>
		<div id="bcid">
		      <!-- <img src="../../assets/images/bian.png">
		      <img src="../../assets/images/bian.png">
		      <img src="../../assets/images/bian.png">
		      <img src="../../assets/images/bian.png"> -->
		      <div class="diandeng" @click='setFlash'>
		       <!-- <img src="../../assets/images/light.png" class="lights"> -->
		       <p>轻触照亮</p>
		      </div>
		</div>
		<div class="tips">
			将二维码放入框中，即可自动扫描
		</div>
	  <div class="scan">
	  </div>
	 </div>
</template>

<script type='text/ecmascript-6'>
import whiteright from '../../assets/images/whiteright.png'
import  {taskscan}  from '../../api/index.js'
import { getStore } from '../../utils/storage.js'
  var scan = null;
  export default {
    data() {
      return {
      	whiteright:whiteright,
        groupId: '',
        cdId: '',
        cdName: '',
        codeUrl: '',
        actions: [],
      }
    },
    created: function () {
      
    },
    mounted: function () {
      this.startRecognize();
      this.startScan();
    },
    methods: {
      //返回上一页
      goIndex() {
        this.closeScan();
        
      },
      goback(){
        if (!window.plus) return;
        scan.close();
        this.$router.go(-1)
      },
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid');
        scan.onmarked = onmarked;
        function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '')
          that.closeScan(result)
        }
      },
      sacaing(result){
          var that = this
          var token = getStore('token')
          var box = result
          var params={
            token:token,
            box:box,
          }
          taskscan(params).then(res => {
                if( res.errorCode == 0){
                  if(res.results == 1){
                    that.$router.go(-1)
                  }else if(res.results == 2){
                    that.$router.push({path:'/checkorder'})
                  }
                }else{
                  alert(res.errorStr)
                  that.$router.go(-1)
                }
          })
        },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
        
      },
      //关闭扫描
      cancelScan() {
        if (!window.plus) return;
        scan.cancel();
        
      },
      //关闭条码识别控件
      closeScan(result) {
        if (!window.plus) return;
        scan.close();
        this.sacaing(result)
        
      },
      //开启闪光灯
      setFlash() {
    	 scan.setFlash(true);
    	},
    //关闭闪光
    	closeFlash() {
    	 scan.setFlash(false);
    	},
    }
  }
</script>
<style  scoped>
@import '../../assets/css/header.css';
  	.scan {
	    height: 100%;
	    background: rgba(0, 0, 0, .5);
	    position: fixed;left: 0;right: 0;bottom: 0;top: 1.2rem;
	}
    #bcid {
	      width: 6rem;
	      height: 6rem;
	      position: relative;
	      text-align: center;
	      color: #fff;
	      margin: 0 auto;
	      background: transparent;
	      z-index: 999;
	      margin-top: 3.75rem;
    }
    #bcid img{
    	width: 0.64rem;
    	height: 0.64rem;
    }
  	#bcid img:first-child{
  		position: absolute;left: -0.2rem;top: -0.2rem;
  		transform:rotate(180deg);
  	}
  	#bcid img:nth-child(2){
  		position: absolute;right: -0.2rem;top: -0.2rem;
  		transform:rotate(-90deg);
  	}
  	#bcid img:nth-child(3){
  		position: absolute;right: -0.2rem;bottom: -0.2rem;
  		/*transform:rotate(90deg);*/
  	}
  	#bcid img:nth-child(4){
  		position: absolute;left: -0.2rem;bottom: -0.2rem;
  		transform:rotate(90deg);
  	}
  	#bcid .diandeng{
  		position: absolute;bottom: 0.12rem;left: 0;width: 100%;text-align: center;
  	}
  	#bcid .diandeng img.lights{
  		width: 0.52rem;
  		height: 0.4rem;
  		position: static;transform: none;
  	}
  	#bcid .diandeng p{
  		font-size: 12px;color: #fff;letter-spacing: 1px;
  	}
  	.tips{
  		width: 5.33rem;
  		height: 0.64rem;
  		line-height: 0.64rem;text-align: center;
  		border-radius: 0.32rem 0.32rem;
  		color: #fff;font-size: 12px;background: rgba(0, 0, 0, 0.5);z-index: 999;
  		margin-top: 0.67rem;
  		margin-left: auto;
  		margin-right: auto;
  	}
    .labels{
      position: relative;
    }
    .labels input{
      position: absolute;right: 0;top: 0;width: 1.2rem;height: .9rem;
    }
</style>