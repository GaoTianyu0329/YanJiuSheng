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
					
					<image class="image-arrow" mode="widthFix" src="../../static/img/arrow.png"></image>
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
				kind:'',
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
			setTitle(title){
				
				uni.setNavigationBarTitle({
				title: title
				});
			},
			navigateTo(item){
				var url = 'pages/details/details?';
				url = url + "kind="+this.kind+"&id="+item.id+'&name='+item.name+'&time='+item.time;
				uni.navigateTo({
					url: url
				});
			},
		},
		onReady: () => {
			switch(this.kind){
				case '0':
					this.setTitle('论文维护');
					break;
				case '1':
					this.setTitle('专著维护');
					break;
				case '2':
					this.setTitle('项目维护');
					break;
				case '3':
					this.setTitle('专利维护');
					break;
				case '4':
					this.setTitle('奖励维护');
					break;
			}
		},
		onLoad: function (option) {
			switch(option.kind){
				case '0':
					this.setTitle('论文维护');
					break;
				case '1':
					this.setTitle('专著维护');
					break;
				case '2':
					this.setTitle('项目维护');
					break;
				case '3':
					this.setTitle('专利维护');
					break;
				case '4':
					this.setTitle('奖励维护');
					break;
				
			};
			this.kind = option.kind;
			
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
</style>
