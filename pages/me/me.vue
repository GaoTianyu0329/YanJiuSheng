<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				您好 {{userName}},{{teacherId}}，您已成功登录。
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

</style>
