<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row">
				<text class="title">旧密码：</text>
				<m-input type="text" focus clearable v-model="oldPwd" placeholder="请输入旧密码"></m-input>
			</view>
			<view class="view-line"/>
			<view class="input-row">
				<text class="title">新密码：</text>
				<m-input type="text" focus clearable v-model="newPwd" placeholder="请输入新密码"></m-input>
			</view>
			<view class="view-line"/>
			<view class="input-row">
				<text class="title">确认密码：</text>
				<m-input type="text" focus clearable v-model="newPwd2" placeholder="请确认密码"></m-input>
			</view>
		</view>

		<view class="btn-row">
			<button type="primary" class="primary" @tap="findPassword">提交</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				oldPwd:'',
				newPwd:'',
				newPwd2:''
			}
		},
		methods: {
			findPassword() {
				/**
				 * 仅做示例
				 */
				if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法',
					});
					return;
				}
				uni.showToast({
					icon: 'none',
					title: '已发送重置邮件至注册邮箱，请注意查收。',
					duration: 3000
				});
			}
		}
	}
</script>

<style>

</style>
