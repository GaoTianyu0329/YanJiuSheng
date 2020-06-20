<template>
	<view class="content">
		<view v-if="!isChange">
			<view class="text-title">
				{{n}}
			</view>
			<view class="text-time">
				{{time}}
			</view>
			<view class="text-box" scroll-y="true">
			    <text class="flex flex-direction" >
					{{d}}
				</text>
			</view>
			<!-- <view class="btn-row">
				<button type="default" class="primary" @tap='change()'>
					修改数据
				</button>
				
			</view> -->
		</view>
		<view v-if="isChange">
			<view class="text-title">
				<input  class="text-area" placeholder="性别" v-model="n"/>
			</view>
			<view class="text-time">
				<input  class="text-area" placeholder="性别" v-model="time"/>
			</view>
			<view class="text-box" scroll-y="true">
			    <textarea class="text-area" v-model="d">
					
				</textarea>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap='cancel()'>
					取消
				</button>
				<button type="primary" class="primary"@tap='submit()' >
					提交
				</button>
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
				t:'',
				i:'',
				n:'',
				time:'',
				d:'',
				isChange:false,
				openId:'',
				temp_data:{
					n:'',
					time:'',
					d:'',
					
					
				}
			}
		},
		computed: mapState(['token']),
		methods: {
			setTitle(title){
				
				uni.setNavigationBarTitle({
				title: title
				});
			},
			change(){
				
				this.isChange = true;
				this.temp_data.name = this.name;
				this.temp_data.time= this.time;
				this.temp_data.detail = this.detail;
				
				console.log(this.toChangeInfo);
			},
			cancel(){
				this.isChange = false;
				this.name = this.temp_data.name;
				this.time= this.temp_data.time;
				this.detail = this.temp_data.detail;
				
				
				console.log(this.change);
			},
			submit(){
				if (this.name.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '标题不能为空'
					});
					return;
				}
				
				if (this.time.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '时间不能为空'
					});
					return;
				}
				if (this.detail.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '描述不能为空'
					});
					return;
				}
				
				
				const newData = {
					name:this.name,
					time:this.time,
					detail:this.detail,
					
					
				};
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/tinfo',
					data:newData,
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
				const isSuccess = true;
				if(isSuccess){
					this.changeInfo();
					uni.showToast({
						icon:'none',
						title:'修改成功'
					});
				}
				
			},
			getPersonName(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/achi',
					data:{
						pid:this.personId,
					},
				})
			}
					
		},
		onReady() {
			switch(this.d){
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
				this.d = option.kind;
				this.i = option.i;
				this.n = option.n;
				this.time = option.time;
				this.d = option.d;
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
	
</style>
