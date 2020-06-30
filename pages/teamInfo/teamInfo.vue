<template>
	<view class="content">
		<view v-if="!toChangeInfo">
			<view class="scell">
				<view class="title">
					责任导师
				</view>
				<view class="titles">
					{{ta}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					团队名称
				</view>
				<view class="titles">
					{{tn}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					培养单位
				</view>
				<view class="titles">
					{{u}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					团队介绍
				</view>
				<view class="titles">
					{{ti}}
				</view>
			</view>
			<view class="view-line"/>
			
			<view class="btn-row">

				<button type="default" class="primary" @tap='change()'>
					修改数据
				</button>

			</view>
		</view>
		<view v-if="toChangeInfo">
			<view class="scell">
				<view class="title">
					责任导师
				</view>
				<view class="title">
					{{ta}}
				</view>
			</view>
			<view class="view-line"/>
			<from >
				<view class="scell">
					<view class="title">
						团队名称
					</view>
					<input  class="text-area" placeholder="团队名称" v-model="tn"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						培养单位
					</view>
					<input class="text-area" placeholder="培养单位" v-model="u"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						团队介绍
					</view>
					<input class="text-area" placeholder="团队介绍" v-model="ti"/>
					
				</view>
				<view class="view-line"/>
				
				
				<view class="btn-row">
					<button type="primary" class="primary" @tap='cancel()'>
						取消
					</button>
					<button type="primary" class="primary" @tap='submit()' >
						提交
					</button>
				</view>
			</from>
			
		</view>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	
	
	export default {
		computed: mapState(['toChangeInfo','token']),
		
		data() {
			return {
				ta: '',
				
				tn:'',
				u:'',
				ti:'',
				token:'',
				temp_data:{
					tn:'',
					u:'',
					ti:'',
				}
			}
		},
		methods: {
			...mapMutations(['changeInfo']),
			change(){
				
				this.changeInfo();
				this.temp_data.ta = this.ta;
				this.temp_data.tn = this.tn;
				this.temp_data.u = this.u;
				this.temp_data.ti = this.ti;

				console.log(this.toChangeInfo);
			},
			cancel(){
				this.ta = this.temp_data.ta;
				this.tn = this.temp_data.tn;
				this.u = this.temp_data.u;
				this.ti = this.temp_data.ti;

				this.changeInfo();
				
				console.log(this.change);
			},
			submit(){
				if (this.tn.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '团队名称不能为空'
					});
					return;
				}
				if (this.u.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '培养单位不能为空'
					});
					return;
				}
				if (this.ti.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '团队介绍不能为空'
					});
					return;
				}
				
				const newData = {
					token:this.token,
					ta:this.ta,
					tn:this.tn,
					u:this.u,
					ti:this.ti,

					
				};
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recuritteam',
					data:newData,
					method:'POST',
					
					success:(res)=>{
						const resData = res.data.result.tai;
						if(resData.ststus == 'success'){
							console.log(resData);
						}else{
							console.log(resData);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
						uni.showToast({
							icon: 'none',
							title: '登录过期请重新登录'
						});
						uni.clearStorageSync();
						uni.navigateTo({
							url: '../login/login'
						});
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
			getStorageData(key){
				var result = "";
				try{
					result = uni.getStorageSync(key);
				}catch(e){
					console.log(e);
				};
				
				return result;
				
			},
		
		},
		onShow(){
			var that = this;
			this.token = this.getStorageData('token');
			
			
			uni.request({
				method:'POST',
				url:'http://112.124.22.241:8080/recuritteam',
				data:{
					token:this.token
				},
				success: (res) => {
					console.log(res)
					const resData = res.data;
					
					if(resData.status == 'success'){
						const result = resData.result.tai;
						console.log(result);
						this.i = result.i;
						this.ta = result.ta;
						this.tn = result.tn;
						this.u = result.u;
						this.ti = result.ti;

						
					}else{
						console.log(resData.reason);
					}
				},
				fail: (res) => {
					console.log(res.errMsg);
					uni.showToast({
						icon: 'none',
						title: '登录过期请重新登录'
					});
					uni.clearStorageSync();
					uni.navigateTo({
						url: '../login/login'
					});
				}
			})
		}
	}
</script>

<style>
	.btn-row {
		display: flex;
		flex: 1;
		flex-direction:row;
		margin-top: 32rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
	}
	
	.scell{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 40px;
		margin-left: auto;
		margin-right: auto;
		/* background-color: #4CD964; */
		
		/* padding: 6rpx,8rpx,6rpx,8rpx; */
	}
	.view-line{
		margin-left:auto; 
		margin-right:auto;
		
		width: 96%;
		height: 1px;
		background-color: #000000;
		
	}
	.title{
		width: 120px;
		margin-top: auto;
		margin-bottom: auto;
	}
	.titles{
		width: 200px;
		margin-top: auto;
		margin-bottom: auto;
	}
	.text-area{
		margin-top: auto;
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

</style>

