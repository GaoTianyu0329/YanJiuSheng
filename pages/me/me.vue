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
					<view class="text-row">
						个人信息
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
				<view class="view-line"></view>
				<view class="scell">
					<view class="text-row">
						个人信息
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
				<view class="view-line"></view>
				<view class="scell">
					<view class="text-row">
						个人信息
					</view>
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
				</view>
			</view>
			<view class="btn-row">
					<button type="default" class="primary" @tap="bindLogout">
					注销
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
		computed:mapState(['forcedLogin', 'hasLogin', 'userName','teacherId','openId']),
		
		data() {
			return {
				
			}
		},
		onShow() {
			
			
		},
		methods: {
			...mapMutations(['logout']),
			
			toLogin(){
				uni.navigateTo({
					url: '../login/login'
				});
			},
			bindLogout(){
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
