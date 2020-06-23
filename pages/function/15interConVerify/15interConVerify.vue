<template>
	<view class="content">
		<view class="nav_name">已审核</view>
		<view class="nav">
			<view class="nav_items" v-for="(item,index) in list1" :key="index">
				<view class="left_item">
					<view class="scell">
						<view class="title">
							学号:
						</view>
						<view class="titles">
							{{item.id}}
						</view>
					</view>
					<view class="scell">
						<view class="title">
							时间:
						</view>
						<view class="titles">
							{{item.time}}
						</view>
					</view>
					<view class="scell">
						<view class="title">
							状态:
						</view>
						<view class="titles">
							{{item.s}}
						</view>
					</view>
				</view>
				<view class="btn">
					<button type="primary" class="primary" @click="sub(item.id)" >
						取消
					</button>
				</view>
			</view>
		
		</view>
		<view class="nav_name">未审核</view>
		<view class="nav">
			<view class="nav_items" v-for="(item,index) in list2" :key="index">
				<view class="left_item">
					<view class="scell">
						<view class="title">
							学号:
						</view>
						<view class="titles">
							{{item.id}}
						</view>
					</view>
					<view class="scell">
						<view class="title">
							时间:
						</view>
						<view class="titles">
							{{item.time}}
						</view>
					</view>
					<view class="scell">
						<view class="title">
							状态:
						</view>
						<view class="titles">
							{{item.s}}
						</view>
					</view>
				</view>
				<view class="btns">
					<button type="primary" class="primary" @click="submits(item.id)" >
						通过
					</button>
					<button type="primary" class="primary" @click="submit(item.id)" >
						不通过				
					</button>
				</view>
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
		data() {
			return {
				list1: [],
				list2: [],
			}
		},
		computed: mapState(['token']),
		methods: {
			sub(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/abroeval',
					data:{
						token:this.token,
						o:2,
						t:1,
						i:id,
					},
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				})
			},
			submit(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/abroeval',
					data:{
						token:this.token,
						o:1,
						t:1,
						i:id,
					},
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				})
			},
			submits(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/abroeval',
					data:{
						token:this.token,
						o:0,
						t:1,
						i:id,
					},
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				})
			},
			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/abroeval',
					data:{
						token:this.token,
						t:1,
					},
					success: (res) => {
						const resData = res.data;
						console.log(resData);
						if(resData.status == 'success'){
							const result1 = resData.result;
							console.log(result1);
							this.list1 = result1.cl;
							const result2 = resData.result;
							this.list2 = result2.ucl;
							
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
	.primary{
		font-size: 20rpx;
		margin-right: 20rpx;
	}
	
	.titles{
		width:400rpx;
	}

	.nav_name{
		background-color: #DDDDDD;
		text-align:center;
		height:60rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
	}
	
	.scell{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 10px;
		margin-left: auto;
		margin-right: auto;
	}
	
	.nav_items{
		display: flex;
		border:1px solid grey;
		border-radius: 4px;
		height:150rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
		width: 500rpx;
	}
	
	.nav_item{
		border:1px solid grey;
		border-radius: 4px;
		height:200rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
	}
	
	.left_item{
		height:200rpx;
		font-size: 25rpx;

	}
	
	.title{
		width: 130rpx;
	}
	
	.btn {
		display: flex;
		flex: 1;
		flex-direction:column;
		height: 150rpx;

	}
	
	.btns {
		display: flex;
		flex: 1;
		flex-direction:row;
		height: 150rpx;
		margin-right: 20rpx;
	}
</style>
