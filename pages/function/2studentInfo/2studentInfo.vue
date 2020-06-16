<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				学生信息查看
			</view>
			
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['hasLogin', 'teacherId']),
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.title {
			font-size: 40rpx;
			background-color: #DDDDDD;
			text-align: center;
			height: 60rpx;
		}
</style>
