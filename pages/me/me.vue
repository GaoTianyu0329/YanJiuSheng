<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="col">
				<view class="user-row">
					<text class="label-row">
						{{userName}}
					</text>
				
				</view>
				<view class="user-row">
				<text class="label-row">
					软件学院
				</text>
				</view>
				<view class="user-row">
					<text class="label-row">
						您好,您已成功登录。
					</text>
				
				</view>
				
			</view>
			<view class="col">
				<view class="scell">
					<view class="text-row" @tap='navigateTo("/pages/pwd/pwd")'>
						密码修改
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
				<view class="view-line"></view>
				<view class="scell" @tap="navigateTo('/pages/userInfo/userInfo')">
					<view class="text-row">
						个人信息
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
			</view>
			<view class="col" >
				<view v-for="(item,index) in list2" :key="index" @click="navigateTo(item.path)">
					<view class="scell" >
						<view class="text-row">
						{{item.title}}
						</view>
						<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
					
					</view>
					<view v-if="index != 4" class="view-line"></view>
				</view>
				
				
				<!-- <view class="scell" @tap='navigateTo("monographMt")'>
					<view class="text-row">
						专著维护
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
				<view class="view-line"></view>
				<view class="scell" @tap='navigateTo("projectMt")'>
					<view class="text-row">
						项目维护
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
				<view class="view-line"></view>
				<view class="scell" @tap='navigateTo("incentiveMt")'>
					<view class="text-row" >
						奖励维护
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
				<view class="view-line"></view>
				<view class="scell" @tap='navigateTo("patentMt")'>
					<view class="text-row">
						专利维护
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view> -->
			</view>
			<view class="btn-row">
					<button type="default" class="primary" @tap="bindLogout">
					解除账号绑定
					</button>
				</view>
			
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="btn-row">
				<button type="default" class="primary" @tap="toLogin">账号登录</button>
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
		computed:mapState(['forcedLogin', 'hasLogin', 'userName','teacherId','openId','token']),
		
		data() {
			return {
				list2: [
					{
						
						title: '申请论文维护',
						path: '/pages/function/4dissertationMt/4dissertationMt'
					},
					{
						
						title: '申请专著维护',
						path: '/pages/function/5monographMt/5monographMt'
					},
					{
						
						title: '申请项目维护',
						path: '/pages/function/6projectMt/6projectMt'
					},
					{
						
						title: '申请专利维护',
						path: '/pages/function/7patentMt/7patentMt'
					},
					{
						
						title: '申请奖励维护',
						path: '/pages/function/8incentiveMt/8incentiveMt'
					},
				],
			}
		},
		onShow() {
			
			
		},
		methods: {
			...mapMutations(['logout']),
			navigateTo(page){
				// var url = '../'+page+'/'+page;
				uni.navigateTo({
					url: page
				});
			},
			
			toLogin(){
				uni.navigateTo({
					url: '../login/login'
				});
			},
			bindLogout(){
				uni.request({
					url: 'http://112.124.22.241:8080/unbind',
					method:'POST',
					data: {
					  token:this.token,
					  
					},
					success:(infoRes) => {
						const responseData = infoRes.data;
						if(responseData.status == 'success'){
							try {
							    uni.clearStorageSync();
								this.logout();
							} catch (e) {
							    // error
								uni.showToast({
									icon: 'none',
									title: '注销失败'
								});
							}
						}else{
							uni.showToast({
								icon: 'none',
								title: responseData.reason,
							});
						}
						
					}
				})
				
				
				
			}
		}
	}
</script>

<style>
	.col{
		margin-top: 20rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
	}
	.user-row{
		display: flex;
		flex: 1;
		flex-direction: row;
		justify-content: center;
		
	}
	.scell{
		display: flex;
		margin-top: 12rpx;
		width: 92%;
		height: 84rpx;
		margin-left: auto;
		margin-right: auto;
		/* background-color: #4CD964; */
		
		/* padding: 6rpx,8rpx,6rpx,8rpx; */
	}
	.text-row{
		
		width: 88%;
		margin-right: 12rpx;
		margin-top: auto;
		margin-bottom: auto;
		
		/* align-self: center; */
		
		
	}
	.image-arrow{
		width: 60rpx;
		margin-right: 8rpx;
		height: 70rpx;
		margin-top: auto;
		margin-bottom: auto;
		
		/* align-self: center; */
		
	}
	
	
	.view-line{
		margin-left:auto; 
		margin-right:auto;
		
		width: 92%;
		height: 1px;
		background-color: #000000;
		
	}
	.label-row{
		
		margin-left: 100rpx;
		margin-right: 100rpx;
	}
</style>
