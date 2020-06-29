<template>
	<view class="container999" >
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		
		<view class='nav'>
			<!-- #ifdef H5 -->
				<view style="height: 44px;width: 100%;">边距盒子</view>
			<!-- #endif -->
			
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" scroll-with-animation :scroll-into-view="toView">
				<view :id="'top'+listIndex" style="width: 100%;height: 110upx;"></view>
				
					<view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index" @tap=navigateTo(item)>
					<view class="content">
						<text class="title"> 论文题目：{{item.pt}}</text>
						<text class="title"> id：{{item.i}}</text>
						<text class="title"> 申请时间：{{item.t}}</text>
						<text class="title" v-if="item.status == '0'">未审核</text>
						<text class="title" v-if="item.status == '1'">已申请未处理</text>
						<text class="title" v-if="item.status == '2'">未通过审核</text>
						<text class="title" v-if="item.status == '3'">已通过审核 </text>
					</view>
						<view style="color: #000000;margin-top: auto;margin-bottom: auto;margin-right: 12px;font-size: 14px;">详情></view>
					</view>
				
				<view class='noCard' v-if="listItem.length===0">
					暂无信息
				</view>
				<view style="width: 100%;height: 100upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	const util = require('../../../util/util.js');
	import refresh from '../../../components/refresh.vue';
	import navTab from '../../../components/navTab.vue';
	import tabBar4 from '../../../components/tabBar4.vue';
	export default {
		components: {refresh,navTab,tabBar4},
		
		data() {
			return {
				currentPage:'index',
				toView:'',//回到顶部id
				tabTitle:['未审核列表','已审核列表'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages:[1,1,1,1], //第几个swiper的第几页
				list: [[1, 2, 3, 4, 5, 6],['a', 'b', 'c', 'd', 'e', 'f'],[],['2233','4234','13144','324244']] //数据格式
			}
		
		},
		methods: {
			navigateTo(item){
				var url = '../../PageAudit/PageAudit?';
				url = url + "type=2"+"&i="+item.i+"&time="+item.t+"&pt="+item.pt+"&pc="+item.pc+"&a="+item.a+"&status="+item.status;
				console.log(url)
				uni.navigateTo({
					url: url
				});
			},
			// tab事件
			toTop(){
				this.toView = ''
				setTimeout(()=>{
					this.toView = 'top' + this.currentTab
				},10)
			},
			changeTab(index){
				this.currentTab = index;
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest() {
				return new Promise((resolve, reject) => {
					this.pages[this.currentTab]++
					var that = this
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
						})
						let newData = ['新数据1','新数据2','新数据3']
						resolve(newData)
					}, 1000)
				})
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
			console.log(`加载${this.currentTab}`)//currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
			uni.showLoading({
				title: '加载中',
				mask:true
			})
				this.isRequest().then((res)=>{
					let tempList = this.list
					tempList[this.currentTab] = tempList[this.currentTab].concat(res)
					console.log(tempList)
					this.list = tempList
					this.$forceUpdate() //二维数组，开启强制渲染
				})
			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh(){
					setTimeout(() => {
						uni.showToast({
							icon: 'success',
							title: '刷新成功'
						})
						this.$refs.refresh.endAfter() //刷新结束调用
					}, 1000)
			},
			getData(){
				const token = uni.getStorageSync('token')
				uni.request({
					url: 'http://112.124.22.241:8080/gradeval',
					data: {
						token:token,
						t:'2'
					},
					method:'POST',
					success: (res) => {
						const resData = res.data
						if(resData.status == 'success'){
							const result = resData.result
							this.list[0] = result.cl
							this.list[1] = result.ucl
							this.$forceUpdate() //二维数组，开启强制渲染
							
						}else{
							console.log(resData.reason)
						}
					},
					fail: (res) => {
						console.log(res.errMsg)
					}
				})
			}
		},
		onShow() {
			this.getData()
		}
	}
</script>

<style lang="scss">
.container999 {
	  width: 100vw;
	  font-size: 28upx;
	  min-height: 100vh;
	  overflow: hidden;
	  color: #6B8082;
	  position: relative;
	  background-color: #f6f6f6;
	}
	.content {
		background-color: #FFFFFF;
		width: 60%;
		flex: 1;
		flex-direction: column;
		color: #000000;
	}
	
	.card {
		width: 90%;
		height: 104px;
		background-color: white;
		margin: 4px auto 4px auto;
		background: #FFFFFF;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.10);
		border-radius: 5px;
		// position: relative;
		display: flex;
		
		
	}
	
	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000000;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}
	
	
	.nav {
		position: fixed;
		left: 0;
		top: 0;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #d60016;
		z-index: 996;
	}
	
	.searchInput999 {
		width: 90%;
		margin: 0 auto;
		background: white;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56upx;
	}
	
	.search999 {
		width: 32upx;
		height: 32upx;
	}
	
	.searchBox999 {
		width: 56upx;
		height: 56upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.input999 {
		color: #999;
		width: 80%;
	}
	text.title{
		margin-top: 2px;
		width: 80%;
		margin-left: 12px;
	}
</style>
