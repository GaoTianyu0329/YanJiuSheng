-<template>
	<view class="content">
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in list" :key="index">
				<view class="scell">
					<view class="title">
						姓名:
					</view>
					<view class="title">
						{{item.n}}
					</view>
				</view>
				<view class="scell">
					<view class="title">
						学号:
					</view>
					<view class="title">
						{{item.i}}
					</view>
				</view>
				<view class="scell">
					<view class="title">
						所在班级:
					</view>
					<view class="title">
						{{item.a}}
					</view>
				</view>
				<view class="scell">
					<view class="title">
						年龄:
					</view>
					<view class="title">
						{{item.l}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {

		computed: mapState(['token']),
		data() {
			return {
				list: [],
			}
		},
		methods: {
			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/checkstud',
					data:{
						token:this.token
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const re = resData;
							this.list = re.result;
						}else{
							console.log(resData.reason);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			onShow() {
				this.getData();
			    
			},
		}
	}
</script>

<style>
	.title {
			font-size: 20rpx;
			width: 200rpx;
		}
		
	.scell{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 10px;
		margin-left: auto;
		margin-right: auto;
	}

	.nav_name{
		background-color: #DDDDDD;
		text-align:center;
		height:60rpx;
		font-size: 35rpx;
		margin-top: 10rpx;
	}

	.nav_item{
		border:1px solid grey;
		border-radius: 4px;
		height:160rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
	}

</style>