<template>
	<view class="content">
		
			<view class="text-title">
				{{pt}}
			</view>
			<view class="text-time">
				{{time}}
			</view>
			<view class="view-line"/>
			<view class="text-box" scroll-y="true">
			    <text class="flex flex-direction" >
					{{pc}}
				</text>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					状态:
				</view>
				<view v-if="status == '0'">
					<view class="title">
						未申请审核
					</view>
				</view>
				<view v-if="status == '1'">
					<view class="title">
						未审核
					</view>
				</view>
				<view v-if="status == '2'">
					<view class="title">
						未通过
					</view>
				</view>
				<view v-if="status == '3'">
					<view class="title">
						已通过
					</view>
				</view>
				
				
			</view>
			<view v-if="status == '0'">
				<view class="btn-row">
				<button type="default" class="primary" disabled="true" @tap='change()'>
					未申请审核
				</button>
				</view>
			</view>
			<view v-if="status == '1'">
				<view class="btn-row">
					<button type="primary" class="primary" @tap='submit("1")'>
						不通过
					</button>
					<button type="primary" class="primary" @tap='submit("0")' >
						通过
					</button>
				</view>
			</view>
			<view v-if="status == '2'">
				<view class="btn-row">
				<button type="default" class="primary" @tap='submit("1")'>
					未通过
				</button>
				</view>
			</view>
			<view v-if="status == '3'">
				<view class="btn-row">
				<button type="default" class="primary"  @tap='submit("0")'>
					已通过
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
				type:'',
				i:'',
				pt:'',
				time:'',
				pc:'',
				isChange:false,
				openId:'',
				status:'',
				token:''
			}
		},
		computed: mapState([]),
		methods: {
			submit(o){
				uni.request({
					url: 'http://112.124.22.241:8080/gradeval',
					data: {
						token:this.token,
						t:this.type,
						i:this.i,
						o:o
						
					},
					method:'POST',
					success: (res) => {
						const resData = res.data
						if(resData.status == 'success'){
							const result = resData.result
							uni.showToast({
								icon: 'none',
								title: '审核成功',
							});
							if(o == '1'){
								this.status = '2'
							}else if(o=='0'){
								this.status = '3'
							}
							
						}else{
							console.log(resData.reason)
							uni.showToast({
								icon: 'none',
								title: resData.reason,
							});
						}
					},
					fail: (res) => {
						console.log(res.errMsg)
						uni.showToast({
							icon: 'none',
							title: res.errMsg,
						});
					}
				})
			},
			
			getPersonName(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/achi',
					data:{
						pid:this.personId,
					},
				})
			},
			getDetailData(tokrn,kind,id){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/achi',
					data:{
						token:token,
						t:kind,
						i:id
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const data = resData.result.list
							this.n = data.n
							this.t = data.t
							this.d = data.d
							
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						
					}
				})
			}
					
		},
		
		onLoad: function(option) {
			this.token = uni.getStorageSync('token')
			this.type = option.type
			this.i = option.i
			this.pt = option.pt
			this.pc = option.pc
			this.a = option.a
			this.time = option.time
			this.status = option.status
			
			
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
