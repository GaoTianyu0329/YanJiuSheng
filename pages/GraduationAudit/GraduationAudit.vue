<template>
	<view class="content">
		<view v-if="!toChangeInfo">
			<view class="scell">
				<view class="title">
					姓名
				</view>
				<view class="title">
					{{name}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					学号
				</view>
				<view class="title">
					{{id}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					班级
				</view>
				<view class="title">
					{{a}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					年龄
				</view>
				<view class="title">
					{{age}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					状态
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
			<view class="view-line"/>
			
			
			
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
				<button type="default" class="primary" disabled="true" @tap='change()'>
					未通过
				</button>
				</view>
			</view>
			<view v-if="status == '3'">
				<view class="btn-row">
				<button type="default" class="primary" disabled="true" @tap='change()'>
					已通过
				</button>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				id:'',
				token:'',
				a:'',
				name:'',
				age:'',
				status:'',
				teacherId:''
			}
		},
		methods: {
			submit(o){
				uni.request({
					url: 'http://112.124.22.241:8080/gradeval',
					data: {
						token:this.token,
						t:this.type,
						i:this.id,
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
		onLoad: function(option) {
			this.token = uni.getStorageSync('token')
			this.type = option.type
			this.id = option.i
			this.name = option.n
			this.a = option.a
			this.age = option.l
			this.status = option.status
			
			
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


