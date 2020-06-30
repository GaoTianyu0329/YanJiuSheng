<template>
	<view class="content">
		<view >
			<view class="text-title">
				<input  class="text-area" placeholder="标题" v-model="n"/>
			</view>
			<view class="text-time">
				<!-- <view class="text-area">
					{{time}}
				</view> -->
				<input  class="text-area" placeholder="时间" v-model="time"/>
			</view>
			<view class="text-box" scroll-y="true">
			    <textarea class="text-area" placeholder="详细信息" v-model="d">
					
				</textarea>
			</view>
			<view class="btn-row">
				
				<button type="primary" class="primary"@tap='submit()' >
					添加
				</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				n:'',
				time:'',
				d:'',
				token:'',
				type:''
			}
		},
		methods: {
			submit(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/addOrdeleteachi',
					data:{
						token:this.token,
						t:this.type,
						n:this.n,
						time:this.time,
						d:this.d,
						type:0
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const result = resData.result;
							uni.showToast({
								icon:'none',
								title:'添加成功'
							})
							uni.navigateBack();
							
						}else{
							console.log(resData.reason);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				})
			}
			
		},
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.type = option.type
		}
	}
</script>

<style>
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
	.text-area{
		margin-top: 16px;
		margin-bottom: auto;
		border-bottom: 1px solid #000000;
	}
	.button.primary {
		width: 280rpx;
		margin: auto;
		background-color: #FFFFFF;
		outline-style: none ;
		border: 1px solid #d60016; 
		border-radius: 8px;
		text-decoration-color: #000;
		color: #d60016;
	}
	.btn-row {
		display: flex;
		flex: 1;
		flex-direction:row;
		margin-top: 32rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}
	.text-box{
		margin-top: 12px;
	}
</style>
