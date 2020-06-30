<template>
	<view class="content">
		<scroll-view>
			<view v-for="(item,index) in dataList":key='index' @tap=navigateTo(item)>
				<view class="scell" >
					<view class="text-row" >
						<view class="text-title">
							{{item.n}}
						</view>
						
						<view class="text-time">
							{{item.time}}
						</view>
					</view>
					
					<image class="image-arrow" mode="widthFix" src="../../../static/img/arrow.png"></image>
				</view>
				<view  class="view-line"></view>
				
			</view>
			<view class="btn-row">
					
					<button type="primary" class="primary"@tap='toAdd()' >
						添加
					</button>
				</view>
		</scroll-view>
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
				triggered: false,
				dataList: []
			}
		},
		computed: mapState(['token']),
		methods: {
			navigateTo(item){
				var url = '../../details/details?';
				url = url + "kind=4&i="+item.i+'&n='+item.n+'&time='+item.time+'&d='+item.d,+'&personId='+item.personId;
				uni.navigateTo({
					url: url
				});
			},
			toAdd(){
				var url = '../../achievements/achievements?type=0';
				uni.navigateTo({
					url: url
				});
			},
			
			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/achi',
					data:{
						token:this.token,
						t:5,
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const result = resData.result;
							this.dataList = result.list;
							
						}else{
							console.log(resData.reason);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			
		},
		 onShow() {
		    this._freshing = false;
			this.getData();
		    
		},
		
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
</style>
