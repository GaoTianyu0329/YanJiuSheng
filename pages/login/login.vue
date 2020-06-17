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
		computed: mapState(['forcedLogin','token']),
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
					teacherId: this.account,
					password: this.password
				};
				uni.request({
					url: 'http://112.124.22.241:8080/login',
					data: {
						u:data.teacherId,
						p:data.password
					},
					method:'POST',
					success:(res) => {
						console.log(res);
						const resData = res.data;
						if(resData.status == 'success'){
							this.storageData("teacherId",data.teacherId);
							this.storageData("pwd",data.password);
							this.storageData("hasLogin",true);
							this.storageData('token',resData.result.token)
							uni.showModal({
								title: '登录成功',
								content: '是否与微信账号关联',
								
								showCancel: true,
								success: (res1) => {
									if (res1.confirm) {
										this.oauth(this.providerList[0].value,data);
										
									}else if(res1.cancel){
										this.toMain(data);
										
									}
								}
							});
							
						}else{
							uni.showToast({
								icon: 'none',
								title: resData.reason,
							});
						}
						// this.storageData('openId',infoRes.userInfo.nickName);
						// const data = {
						// userName: infoRes.userInfo.nickName,
						// teacherId: userData.teacherId,
						// pwd:userData.password,
						// token:''
					},
					fail:(res) =>{
						console.log(res);
						uni.showToast({
							icon: 'none',
							title: res.errMsg,
						});
					}
				});
				
			},
			oauth(value,userData) {
				
				uni.login({
					provider: value,
					success: (res) => {
						
						// const data = {
						// 	userName: 'aaa',
							
						// 	teacherId: userData.teacherId,
						// 	pwd:userData.password	
						// }
						// this.toMain(data);//后端登录完成后改为教师号
						if (res.code) {
						      //发起网络请求
						      uni.request({
						        url: 'http://112.124.22.241:8080/bind',
						        data: {
						          token:this.token,
						        },
								success:(infoRes) => {
									this.storageData('openId',infoRes.userInfo.nickName);
									const data = {
										userName: infoRes.userInfo.nickName,
										
										teacherId: userData.teacherId,
										pwd:userData.password,
										// token:''
									};
									this.toMain(data);//后端登录完成后改为教师号
								}
						      });
						} else {
						  console.log('登录失败！' + res.errMsg)
						}
						console.log(res.code);
					// 	uni.getUserInfo({
					// 		provider: value,
					// 		success: (infoRes) => {
					// 			/**
					// 			 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
					// 			 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
					// 			 */
					// 			// console.log(infoRes.userInfo.nickName)
					// 			this.storageData('userName',infoRes.userInfo.nickName)
					// 			this.storageData('openId',infoRes.userInfo.nickName)
					// 			const data = {
					// 				userName: infoRes.userInfo.nickName,
									
					// 				teacherId: userData.teacherId,
					// 				pwd:userData.password	
					// 			}
					// 			this.toMain(data);//后端登录完成后改为教师号
					// 		},
					// 		fail() {
					// 			uni.showToast({
					// 				icon: 'none',
					// 				title: '登陆失败'
					// 			});
					// 		}
					// 	});
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
			toMain(data) {
				// this.initState();
				
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

			},
			
			
			storageData(key,data){
				uni.setStorage({
					key:key,
					data:data,
					success() {
					// console.log('成功了key:'+key+'data:'+data)
					},
					fail() {
					// console.log('缓存失败了key:'+key+'data:'+data)
					}
				});
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
	
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
		padding: 10px;
	}
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
