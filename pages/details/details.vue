<template>
	<view class="content">
		<view v-if="!isChange">
			<view class="text-title">
				{{name}}
			</view>
			<view class="text-time">
				{{time}}
			</view>
			<view class="text-box" scroll-y="true">
			    <text class="flex flex-direction">
				aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
				</text>
			</view>
		</view>
		<view v-if="isChange">
			
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
				kind:'',
				id:'',
				name:'',
				time:'',
				isChange:false
			}
		},
		computed: mapState(['token']),
		methods: {
			setTitle(title){
				
				uni.setNavigationBarTitle({
				title: title
				});
			}
		},
		onReady() {
			switch(this.kind){
				case '0':
					this.setTitle('论文详情');
					break;
				case '1':
					this.setTitle('专著详情');
					break;
				case '2':
					this.setTitle('项目详情');
					break;
				case '3':
					this.setTitle('专利详情');
					break;
				case '4':
					this.setTitle('奖励详情');
					break;
				
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        // switch(option.kind){
		        // 	case '0':
		        // 		this.setTitle('论文详情');
		        // 		break;
		        // 	case '1':
		        // 		this.setTitle('专著详情');
		        // 		break;
		        // 	case '2':
		        // 		this.setTitle('项目详情');
		        // 		break;
		        // 	case '3':
		        // 		this.setTitle('专利详情');
		        // 		break;
		        // 	case '4':
		        // 		this.setTitle('奖励详情');
		        // 		break;
		        	
		        // };
				this.kind = option.kind;
				this.id = option.id;
				this.name = option.name;
				this.time = option.time;
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
