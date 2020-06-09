<template>
	<view class="content">
		<view class="logo-row">
			<image class="logo-img" src="../../static/img/sdulogo.jpg"></image>
		</view>
		
			<view class="m-input-row">
				
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="教师号"></m-input>
			</view>
			<view class="m-input-row">
				
				<m-input class="m-input" color="#000000" type="password" displayable v-model="password" placeholder="密码"></m-input>
			</view>
		
			
		
		<view class="btn-row">
			<button type="default" class="primary" @tap="bindLogin">登录</button>
		</view>
		
		<!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
				<!-- #ifdef MP-WEIXIN -->
				<!-- <button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button> -->
				<!-- #endif -->
			 <!-- </view> -->
		 <!-- </view> -->
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '教师号不能为空'
					});
					return;
				}
				if (this.password.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					account: this.account,
					password: this.password
				};
				const validUser = service.getUsers().some(function(user) {
					return data.account === "123456" && data.password === "123456";
				});
				if (validUser) {
					uni.showModal({
						title: '登录成功',
						content: '是否与微信账号关联',
						
						showCancel: true,
						success: (res) => {
							if (res.confirm) {
								this.oauth(this.providerList[0].value);
								
							}
						}
					});
					// this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确',
					});
				}
			},
			oauth(value) {
				console.log(value)
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								console.log(infoRes.userInfo.nickName)
								this.toMain(infoRes.userInfo.nickName,'2017xxxxxxxx');//后端登录完成后改为教师号
								
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName,'2017xxxx');//后端登录完成后改为教师号
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userName,teacherId) {
				
				const data = {
					userName: userName,
					teacherId: teacherId
					
				}
				this.login(data);
				// this.login(userName,teacherId);
				
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.m-input-row {
		display: flex;
		flex-direction: row;
		margin-top: 12rpx;
		margin-bottom: 12rpx;
		margin-right: 50rpx;
		margin-left: 50rpx;
		
	}
	.logo-row{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}
	.logo-img{
		width: 100%;
		height: 400rpx;
		
	}
	
	.m-input {
		padding-top: 12rpx;
		padding-bottom: 12rpx;
		
		height: 60rpx;
		outline-style: none ;
		width: 600rpx;
		border-bottom: 1px solid #ccc;
		
		;
		
	}
</style>
