<template>
	<view class="content">
		<view class="nav_name">已审核</view>
		<view class="nav">
			<view class="nav_items" v-for="(item,index) in list1" :key="index">
				<scroll-view class="scroll-view-scroller" scroll-x>	
					<view class="scroll-view-item">
						<view class="scell">
							<view class="title">
								学号:
							</view>
							<view class="titles">
								{{item.i}}
							</view>
						</view>
						<view class="scell">
							<view class="title">
								姓名:
							</view>
							<view class="titles">
								{{item.name}}
							</view>
						</view>
						<view class="scell">
							<view class="title">
								计划:
							</view>
							<view class="titles">
								{{item.plan}}
							</view>
						</view>
					</view>
					<view class="scroll-view-delete">
						<button type="primary" class="primary" @click="sub(item.i)" >
							取消
						</button>
					</view>
				</scroll-view>
			</view>
		
		</view>
		<view class="nav_name">未审核</view>
		<view class="nav">
			<view class="nav_items" v-for="(item,index) in list2" :key="index">
				<scroll-view class="scroll-view-scroller" scroll-x>
					<view class="scroll-view-item">
						<view class="scell">
							<view class="title">
								学号:
							</view>
							<view class="titles">
								{{item.i}}
							</view>
						</view>
						<view class="scell">
							<view class="title">
								姓名:
							</view>
							<view class="titles">
								{{item.name}}
							</view>
						</view>
						<view class="scell">
							<view class="title">
								计划:
							</view>
							<view class="titles">
								{{item.plan}}
							</view>
						</view>
					</view>
					<view class="scroll-view-delete">
						<button type="primary" class="primarys" @click="submits(item.i)" >
							通过
						</button>
						<button type="primary" class="primarys" @click="submit(item.i)" >
							不通过				
						</button>
					</view>
				</scroll-view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				list1: [],
				list2: [],
			}
		},
		computed: mapState(['token']),
		methods: {
			sub(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/tranplan',
					data:{
						token:this.token,
						i:id,
						o:2,
					},
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						uni.showToast({
							icon: 'none',
							title: '登录过期请重新登录'
						});
						uni.clearStorageSync();
						uni.navigateTo({
							url: '../../login/login'
						});
					}
				});
				uni.redirectTo({
					url:'../3studentPlan/3studentPlan'
				})
			},
			submit(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/tranplan',
					data:{
						token:this.token,
						i:id,
						o:1,
					},
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
				uni.redirectTo({
					url:'../3studentPlan/3studentPlan'
				})
			},
			submits(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/tranplan',
					data:{
						token:this.token,
						i:id,
						o:0,
					},
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
				uni.redirectTo({
					url:'../3studentPlan/3studentPlan'
				})
			},
			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/tranplan',
					data:{
						token:this.token
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const result1 = resData.result;
							this.list1 = result1.cl;
							const result2 = resData.result;
							this.list2 = result2.ucl;
							
							
						}else{
							console.log(resData.reason);
						}
						console.log(this.list2);
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			onShow() {
				this.getData();
			    
			},
		}
	}
</script>

<style>
	.primarys{
		font-size: 20rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		outline-style: none ;
		border: 1px solid #d60016; 
		border-radius: 8px;
		text-decoration-color: #000;
		color: #d60016;
	}
	.scroll-view-scroller {
		border:1px solid grey;
		border-radius: 4px;
		width: 500px; //处于demo考虑 ,scroll-view宽度设为固定值，实际项目中请自行计算
	}
	.scroll-view-item {
	  width: 640px; // 300(scroller的宽度) + 100(delete按钮的宽度)
	  height: 150px;
	  position: relative;
	}
	.scroll-view-delete {
		display: flex;
	  width: 100px; //按钮的宽度
	  position: absolute;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  text-align: center;
	  line-height: 100px;
	}
	.primary{
		font-size: 40rpx;
		margin-right: 20rpx;
	}
	
	.titles{
		width:400rpx;
	}

	.nav_name{
		background-color: #DDDDDD;
		text-align:center;
		height:60rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
	}
	
	.scell{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 10px;
		margin-left: auto;
		margin-right: auto;
	}
	
	.nav_items{
		display: flex;

		height:150rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
		width: 500rpx;
	}
	
	.nav_item{
		height:200rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
	}
	
	.left_item{
		height:200rpx;
		font-size: 25rpx;

	}
	
	.title{
		width: 130rpx;
	}
	
	.btn {
		display: flex;
		flex: 1;
		flex-direction:column;
		height: 100rpx;

	}
	
	.btns {
		display: flex;
		flex: 1;
		flex-direction:row;
		height: 100rpx;
		margin-right: 20rpx;
	}
</style>
