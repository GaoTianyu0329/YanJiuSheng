<template>
	<view class="content">
		<scroll-view >
			<view v-for="(item,index) in dataList":key='index' @tap=navigateTo(item)>
				<view class="scell" >
					<view class="text-row" >
						<view class="text-title">
							{{item.name}}
						</view>
						<view class="text-time">
							{{item.time}}
						</view>
					</view>
					
					<image class="image-arrow" mode="widthFix" src="../../../static/img/arrow.png"></image>
				</view>
				<view v-if="index != (dataList.length-1)" class="view-line"></view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					{id: "1", name: '1关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "2", name: '2关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "3", name: '3关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "1", name: '1关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "2", name: '2关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "3", name: '3关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "1", name: '1关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "2", name: '2关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "3", name: '3关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "1", name: '1关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "2", name: '2关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "3", name: '3关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "1", name: '1关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "2", name: '2关于XXXXXXXXXX',time:'2017-03-11'},
					{id: "3", name: '3关于XXXXXXXXXX',time:'2017-03-11'},
					]
			}
		},
		methods: {
			navigateTo(item){
				var url = '../../details/details?';
				url = url + "kind=1&id="+item.id+'&name='+item.name+'&time='+item.time;
				uni.navigateTo({
					url: url
				});
			},
			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/',
					data:{
						token:this.token,
						opration:1,
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							console.log(resData.result);
						}else{
							console.log(resData.reason);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
			},
			
		}
	}
</script>

<style>

</style>
