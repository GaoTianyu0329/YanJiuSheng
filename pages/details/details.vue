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
			<view class="btn-row">
				<button type="default" class="primary" @tap='change()'>
					修改数据
				</button>
				<button type="default" class="primary" @tap='del()'>
					删除
				</button>
				
			</view>
		</view>
		<view v-if="isChange">
			<view class="text-title">
				<input  class="text-area" placeholder="标题" v-model="n"/>
			</view>
			<view class="text-time">
				<view class="text-area">
					{{time}}
				</view>
				<!-- <input  class="text-area" placeholder="性别" v-model="time"/> -->
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
					
					
				},
				token:''
			}
		},
		computed: mapState([]),
		methods: {
			setTitle(title){
				
				uni.setNavigationBarTitle({
				title: title
				});
			},
			change(){
				
				this.isChange = true;
				this.temp_data.name = this.n;
				this.temp_data.time= this.time;
				this.temp_data.detail = this.d;
				
				console.log(this.toChangeInfo);
			},
			del(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/addOrdeleteachi',
					data:{
						token:this.token,
						i:this.i,
						
						type:1
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const result = resData.result;
							uni.showToast({
								icon:'none',
								title:'删除成功'
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
			},
			
			
			cancel(){
				this.isChange = false;
				this.n = this.temp_data.name;
				this.time= this.temp_data.time;
				this.d = this.temp_data.detail;
				
				
				console.log(this.change);
			},
			submit(){
				if (this.n.length < 1) {
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
				if (this.d.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '描述不能为空'
					});
					return;
				}
				
				
				const newData = {
					token:this.token,
					i:this.i,
					n:this.n,
					
					d:this.d,
					
					
				};
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/achi',
					data:newData,
					method:'POST',
					
					success:(res)=>{
						const resData = res.data;
						if(resData.status == 'success'){
							console.log(resData);
							uni.showToast({
								icon:'none',
								title:'修改成功'
							});
							this.isChange = false;
						}else{
							console.log(resData);
							uni.showToast({
								icon:'none',
								title:'修改失败'
							});
							this.cancel()
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
						uni.showToast({
							icon:'none',
							title:'修改失败'
						});
						this.cancel()
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
		onReady() {
			switch(this.t){
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
		       
				this.t = option.kind;
				this.i = option.i;
				this.n = option.n;
				this.time = option.time;
				this.d = option.d;
				this.token = uni.getStorageSync('token')
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
