<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: mapState(['hasLogin','token','openId']),
		methods:{
			...mapMutations(['init']),
			getStorageData(key){
				var result = "";
				try{
					result = uni.getStorageSync(key);
				}catch(e){
					console.log(e);
				};
				
				return result;
				
			},
			initState(){
				const   teacherId = this.getStorageData("teacherId") || "";
				const openId = this.getStorageData("openId") || "";
				const userName = this.getStorageData("userName") || "";
				const hasLogin = this.getStorageData("hasLogin") || false;
				const pwd = this.getStorageData("pwd");
				const token = this.getStorageData('token');
				const data = {
					teacherId:teacherId,
					openId:openId,
					userName:userName,
					hasLogin:hasLogin,
					pwd:pwd,
					token:token
				}
				this.init(data)
				console.log("init"+token);
			},
			storageData(key,data){
				uni.setStorageSync(key,data)
			},
			
		},
		onLaunch: function() {
			console.log('App Launch');
			const hasLogin = this.getStorageData("hasLogin") || false;
			const openId = this.getStorageData("openId") || "";
			if(!hasLogin){
				uni.login({
					provider:'weixin',
					success: (res) => {
						// console.log(res.code)
						const code = res.code;
						uni.request({
							url: 'http://112.124.22.241:8080/login',
							data: {
								code:code,
							},
							method:'POST',
							success: (loginRes) => {
								const resData = loginRes.data;
								
								this.storageData("hasLogin",true);
								this.storageData('token',resData.result.token);
								this.initState()
							
							},
							fail: (loginRes) => {
								console.log('2')
								console.log(loginRes)
								uni.clearStorageSync()
							}
						})
					},
					fail: (res) => {
						console.log(res.errMsg);
						
					}
				})
			}else{
				const teacherId = this.getStorageData('teacherId')
				const password = this.getStorageData('pwd')
				uni.request({
					url: 'http://112.124.22.241:8080/login',
					data: {
						u:teacherId,
						p:password
					},
					method:'POST',
					success:(res) => {
						
						const resData = res.data;
						if(resData.status == 'success'){
							
							this.storageData("hasLogin",true);
							this.storageData('token',resData.result.token);
							
							this.initState()
							
											
						}else{
							uni.showToast({
								icon: 'none',
								title: resData.reason,
							});
						}
					},
					fail:(res) =>{
						console.log(res);
						uni.showToast({
							icon: 'none',
							title: res.errMsg,
						});
					}
				});
				
			}
			
			
		},
		onShow: function() {
			console.log('App Show');
			
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";

	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #F8F8F8;
		padding: 10px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 100px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 16rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}

	button.primary {
		background-color: #FFFFFF;
		outline-style: none ;
		border: 1px solid #d60016; 
		border-radius: 8px;
		text-decoration-color: #000;
		color: #d60016;
	}
	.view-line{
		margin-left:auto; 
		margin-right:auto;
		
		width: 96%;
		height: 1px;
		background-color: #000000;
		
	}
	.content{
		width: 100%;
	}
	.image-arrow{
		width: 28px;
		margin-right: 8rpx;
		height: 32px;
		margin-top: auto;
		margin-bottom: auto;
		
		/* align-self: center; */
		
	}
	.text-row{
		
		width: 88%;
		margin-right: 12rpx;
		margin-top: auto;
		margin-bottom: auto;
		
		/* align-self: center; */
		
		
	}
	.scell{
		display: flex;
		margin-top: 12rpx;
		width: 92%;
		height: 72px;
		margin-left: auto;
		margin-right: auto;
		/* background-color: #4CD964; */
		
		/* padding: 6rpx,8rpx,6rpx,8rpx; */
	}
	.text-title{
		font-size: 16px;
	}
	.text-time{
		font-size: 10px;
		color: #666666;
	}
</style>
