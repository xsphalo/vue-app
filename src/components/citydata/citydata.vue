<template>
    <transition name="slide">
    <div class="xin-widget-citys animated">
        <div class="xin-widget-citys-content">
            <!-- <div class="xin-widget-citys-header bdb searchipt">
                <div class="xin-widget-citys-iptbox">
                    <input type="text" placeholder="城市中文名或拼音" v-model="input">
                </div>
                <a href="javascript:void(0)" @click="hide">取消</a>
            </div> -->
            <div class="searchipt">
                    <img :src="plus">
                    <input type="text" name="city" value="" placeholder="请输入站点名字" v-model="input" >
            </div>
            <!-- <a href="javascript:void(0)" @click="hide">取消</a> -->
            <div class="searchisty">
                        <p>历史站点</p>
                        <div class="histrylist">
                            <p v-for="(item,index) in histrylists" @click="_chooseOne(item)">{{item.site}}</p>
                        </div>
                    </div>
            <div class="xin-widget-citys-list" v-if="input == ''">
                <dl>
                    <template v-for="(item, index) in letterList">
                        <template>
                            <dt v-if="isNaN(index)">{{index}}</dt>
                        </template>
                        <template v-for="(item2, key) in item">
                            <dd class="bdb" @click="_chooseOne(item2)">{{item2.site}}</dd>
                        </template>
                    </template>
                </dl>
            </div>
            <div class="xin-widget-citys-searchlist" v-if="input !== ''">
                <ul v-if="searchList.length!==0">
                    <li class="bdb searchres" v-for="item in searchList" @click="_chooseOne(item)">{{item.site}}</li>
                </ul>
                <div v-else class="nomatch">没有查到相关车站</div>
            </div>
        </div>
        <div class="xin-widget-citys-letnav" v-if="isShow && input == '' && !simple" @touchmove="_touchLetters">
            <ol>
                <template v-for="(item, index) in letterList">
                    <li  @click="_chooseLetter" data-type="letter">{{index}}</li>
                </template>
            </ol>
        </div>
    </div>
    </transition>
</template>

<script>
import plus from '../../assets/images/plus.png'
import { setStore,getStore } from '../../utils/storage.js'
    export default {
        props: {
            isShow: {
                type: Boolean,
                default: false,
                required: false
            },
            simple: {
                type: Boolean,
                default: false
            },
            localCity: {
                type: Object
            },
            cityData: {
                type: Array
            },
            onChoose: {
                type: Function
            },
            initCity: {
                type: Function,
                default: null
            },
            // isleft:{
            //     type:Boolean,
            //     default:true
            // },
            /**
             * call back when click cancel button
             */
            // close: {
            //     type: Function
            // },
            
        },
        data: function(){
            return {
                plus:plus,
                input: '',
                list: '',
                targetLetter: '',
                searchList: [], //搜索结果
                hotList: [],
                letterList: [],
                result: '',
                defaultTrigger: true,
                histrylists:[]
            }
        },
        watch: {
            cityData: function(){
                if(this.cityData && this.cityData.length > 0){
                    this._formatCityList(this.cityData);
                }
            },
            input: function() {
                this._search();
            },
            targetLetter: function() {
                this._scrollView();
            }
        },
        activate: function(done) {
            var _this = this;

            done();
            if(this.cityData && this.cityData.length > 0){
                this._formatCityList(this.cityData);
            }
        },
        methods: {
            show: function() {
                // this.isShow = true;
            },
            hide: function() {
                // this.isShow = false;
                this.input = '';
                this.searchList = [];
                // this.close && this.close()
            },
            _chooseDefault: function() {
                let _this = this;
                let arr = this.list.filter(function(item) {
                    return _this.localCity.id == item.id
                })
                if(arr.length > 0){
                    _this._chooseOne(arr[0]);
                }else{
                    _this._chooseOne(this.list[0]);
                }
            },
            /**
             * 点击字母
             */
            _chooseLetter: function(e) {
               
                    this.targetLetter = e.target.innerText;
                
            },
            /**
             * slide letters list
             */
            _touchLetters: function(e) {
                e.preventDefault();

                let ol = document.querySelector('.xin-widget-citys-letnav ol'),
                    liNum = document.querySelectorAll('.xin-widget-citys-letnav li').length,
                    olHei = ol.clientHeight, //ol height
                    liHei = Math.round(olHei / liNum), //li height
                    olTop = ol.offsetTop + ol.offsetParent.offsetTop,
                    olBot = olTop + olHei,
                    touchY = e.touches[0].pageY,
                    $wrapper = document.querySelector('.xin-widget-citys')

                switch (e.type) {
                    case 'touchstart':
                        if (touchY < olTop) {
                            // 回顶
                            $wrapper.scrollTop = 0;
                        } else if (touchY > olBot) {
                            // 到底
                            $wrapper.scrollTop = 10000;
                        }
                        break;
                    case 'touchmove':
                        if (touchY < olBot && touchY > olTop) {
                            let olTouchY = touchY - olTop,
                                targetIndex = Math.ceil(olTouchY / liHei),
                                target = document.querySelectorAll('.xin-widget-citys-letnav li')[targetIndex - 1]

                            // if(target.getAttribute('data-type') == 'starCity'){
                            //     this.targetLetter = '热门城市';
                            // }else{
                                this.targetLetter = target.innerText;
                            // }
                        }else if(touchY <= olTop){
                            // 回顶
                            $wrapper.scrollTop = 0;
                        }else{
                            // 到底
                            $wrapper.scrollTop = 10000;
                        }
                        break;
                }
            },
            /**
             * 滚动可视区 - Triggered by '_chooseLetter'
             */
            _scrollView: function() {
                let dtList = document.querySelectorAll('.xin-widget-citys-list dt'),
                    _this = this,
                    _dtList = Array.prototype.slice.call(dtList)

                if (_dtList){
                    _dtList.forEach((value, index, array) => {
                        if(value.innerText === _this.targetLetter) {
                            let wrapper = document.querySelector('.xin-widget-citys')
                            let scrollTop = document.querySelector('.xin-widget-citys-list').offsetTop + value.offsetTop

                            wrapper.scrollTop = scrollTop

                            // setTimeout(function() {
                            //     // 解决ios下 元素滚动的bug  现象是触发scroll时会导致部分滚动元素消失到二次元
                            //     wrapper.style.width = (100 + (Math.round(Math.random() * 1000)) / 1000) + '%';
                            // }, 0);
                            return false;
                        }
                    })
                }
            },
            /**
             * search city
             */
            _search: function() {
                var reg = new RegExp(this.input == '' ? 'xxyy' :
                    this.input, 'ig');

                var _arr = [];
                for(var i in this.letterList){
                    for(var j = 0; j < this.letterList[i].length; j++){
                        if(
                            reg.test(this.letterList[i][j][
                                'site'
                            ])
                        ){
                            _arr.push(this.letterList[i][j]);
                        }
                    }
                }
                this.searchList = _arr;
            },
            /**
             * format data of city
             * @param  {[Array]} arr [cityList]
             */
            _formatCityList: function(arr) {
                var letterArr = {};
                if(this.simple){
                    for (var i = 0; i < arr.length; i++) {
                        letterArr[i] = [];
                        letterArr[i].push(arr[i]);
                    }
                }else{
                    for (var i = 0; i < arr.length; i++) {
                        letterArr[arr[i]['initial']] = arr[i]['cityInfo'];
                    }
                }
                this.letterList = letterArr;
            },
            _chooseOne: function(obj) {
                this.onChoose && this.onChoose(JSON.parse(JSON.stringify(obj)));
                // this.hide();
            },
        },
        mounted(){
          var histry = JSON.parse(getStore('histry'))
          if(!histry){
            return false
          }
          // debugger
          if(histry.length>9){
            histry.shift()
            setStore('histry',histry)
          }
          this.histrylists = histry
          // console.log(histry)
        },
    }
</script>
<style  scoped>
@import '../../assets/css/searchml.css';
    *{
        font-weight: 300!important;
    }
    ::-webkit-scrollbar{
        display: none;
    }
    .xin-widget-citys{
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out;

        position: fixed;
        top: 1.2rem;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 10000;
        font-size: 0.14rem;
        color: #333;
        overflow-y: scroll;
      
        box-shadow: 0 .01rem .06rem rgba(0, 0, 0, .2);
    }
    .xin-widget-citys-content{
            width: 100%;
            height: auto;
            background: #fff;
           box-shadow: 0 .01rem .06rem rgba(0, 0, 0, .2);
            border-radius: 0.03rem;
    }
    .xin-widget-citys-header{
        height: 0.38rem;
        display: -webkit-box;
        background: #fafafa
    }
    .xin-widget-citys-iptbox{
         -webkit-box-flex: 1.0;
                    height: 100%;
                    padding: 0 0.12rem;
    }
    input{
                        width: 100%;
                        height: 100%;
                        line-height: 0.38rem;
                        display: block;
                        border: none;
                        font-size: 0.14rem;
                        background: none;
                        box-sizing: border-box;
                    }
                    input::-webkit-input-placeholder{
                        color: #cdcdcd;
                        text-align: left;
                    }
                
                a{
                    width: 0.5rem;
                    height: 100%;
                    line-height: 0.38rem;
                    text-align: center;
                    color: #999999;
                    display: block;
                }
           
            .xin-widget-citys-local{
                height: 0.5rem;
                line-height: 0.5rem;
                text-indent: 0.16rem;
            }
            .xin-widget-citys-list{
                position: relative;}
                
                    dt{
                        height: .8rem;
                        line-height: .8rem;
                        font-size: 16px;
                        color: #333;
                        background: #f2f2f2;
                        text-indent: 0.16rem; }
                        em{
                            position: relative;
                            top: 0.01rem;
                            margin-right: 0.06rem;
                        }
                   
                    dd{
                        padding: 0 0.16rem;
                        height: 1.07rem;
                        line-height: 1.07rem;
                        border-top: .5px solid #e6e6e6;
                        font-size: 14px;
                    }
                
                    dt + dd{
                        border-top: 0;
                    }
       
        .xin-widget-citys-searchlist{
            position: absolute;
            top: 0;
            width: 100%;
            bottom: 0;
            z-index: 10001;
            background: #fff;
            overflow: auto;}
            li{
                margin: 0 0.16rem;
                height: 0.64rem;
                line-height: 0.64rem;
            }
            .nomatch{
                height: 0.66rem;
                line-height: 0.66rem;
                text-align: center;
                font-size: 16px;
                color: #999;
                margin-top: 0.8rem;
            }
       
        /***** 1px border *****/
        .bdt, .bdb, .bdtb, .bdl, .bdr, .bdlr{
            position: relative;
        }
        .bdl:before, .bdr:after, .bdlr:before, .bdlr:after,.bdt:before, .bdb:after, .bdtb:before, .bdtb:after{
            background-size: 100% 100%;
            position: absolute;
            content: '';
            z-index: 10
        }
        .bdl:before, .bdr:after, .bdlr:before, .bdlr:after{
            top: 0;
            width: 1px;
            height: 100%;
        }
        .bdt:before, .bdb:after, .bdtb:before, .bdtb:after{
            left: 0;
            height: 1px;
            width: 100%;
        }
       
    .xin-widget-citys-letnav{
        position: fixed;
        right: 0.42rem;
        bottom: 0;
        width: 0.5rem;
        /*top: 0.48rem;*/
        padding-right: 0.26rem;
        z-index: 10002;
        display: -webkit-box;
        -webkit-box-align: center;}
        section{
            -webkit-box-flex: 1.0;
        }
        ol{
            text-align: right;
            padding-bottom: 0.48rem;
             margin-top: -0.4rem;}
            li{
                padding:0.03rem 0.02rem;
                color: #ff9517;
                font-size: 12px;
                width: 100%;
                line-height: 100%;
                box-sizing: border-box;
                text-align: center;
                margin-bottom: 0.64rem；
            }
     
    .citySlide-transition{
        transform: translateX(0) translateZ(0);
       -webkit-transform: translateX(0) translateZ(0);
     }
    .slide-enter, .slide-leave-active{
       transform: translateX(100%) translateZ(0);
        -webkit-transform: translateX(100%) translateZ(0);
 }
    .slide-enter, .slide-leave-active{
        transform: translateX(100%)!important;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0;
    }
    .searchipt{
        position: fixed;
        top: 0.2rem;
        right: 0.53rem;
        z-index: 99999;
    }
    .searchres{
        font-size: 16px;color: #333;height: 1.07rem;line-height: 1.07rem;text-align: left;padding-left: 0.53rem;border-bottom: .5px solid #e6e6e6;margin: 0;
    }
</style>
