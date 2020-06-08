<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				您好 {{userName}}，您已成功登录。
			</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="btn-row">
				<button type="primary" class="primary" @tap="toLogin">账号登录</button>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed:mapState(['forcedLogin', 'hasLogin', 'userName','studentId']),
		data() {
			return {
				
			}
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style>

</style>
