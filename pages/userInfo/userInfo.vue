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
					教师号
				</view>
				<view class="title">
					{{teacherId}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					性别
				</view>
				<view class="title">
					{{gender}}
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
					职称
				</view>
				<view class="title">
					{{rank}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					研究方向
				</view>
				<view class="title">
					{{direction}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					教育背景
				</view>
				<view class="title">
					{{eduback}}
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
					姓名
				</view>
				<view class="title">
					{{name}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					教师号
				</view>
				<view class="title">
					{{teacherId}}
				</view>
			</view>
			<view class="view-line"/>
			<from >
				<view class="scell">
					<view class="title">
						性别
					</view>
					<input  class="text-area" placeholder="性别" v-model="gender"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						年龄
					</view>
					<input class="text-area" type="number" placeholder="年龄" v-model="age"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						职称
					</view>
					<input class="text-area" placeholder="职称" v-model="rank"/>
					
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						研究方向
					</view>
					<input class="text-area" placeholder="研究方向" v-model="direction"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						教育背景
					</view>
					<input class="text-area" placeholder="教育背景" v-model="eduback"/>
				</view>
				<view class="view-line"/>
				
				
				<view class="btn-row">
					<button type="primary" class="primary" @tap='cancel()'>
						取消
					</button>
					<button type="primary" class="primary"@tap='submit()' >
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
		computed: mapState(['toChangeInfo']),
		
		data() {
			return {
				teacherId: "",
				name:"",
				
				gender:'',//性别
				age:'',//年龄
				rank:"", //职称
				direction:"",//研究方向
				eduback:"",//教育背景
				award:"",//获奖信息
				token:'',
				temp_data:{
					gender:'',//性别
					age:'',//年龄
					rank:"", //职称
					direction:"",//研究方向
					eduback:"",//教育背景
					award:'',
				}
				
				
			}
		},
		methods: {
			...mapMutations(['changeInfo']),
			change(){
				
				this.changeInfo();
				this.temp_data.gender = this.gender;
				this.temp_data.age = this.age;
				this.temp_data.rank = this.rank;
				this.temp_data.direction = this.direction;
				this.temp_data.eduback = this.eduback;
				this.temp_data.award = this.award;
				console.log(this.toChangeInfo);
			},
			cancel(){
				this.gender = this.temp_data.gender;
				this.age = this.temp_data.age;
				this.rank = this.temp_data.rank;
				this.direction = this.temp_data.direction;
				this.eduback = this.temp_data.eduback;
				this.award = this.temp_data.award;
				this.changeInfo();
				
				console.log(this.change);
			},
			submit(){
				if (this.gender.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '性别不能为空'
					});
					return;
				}
				if (this.gender != '男'&& this.gender != '女') {
					uni.showToast({
						icon: 'none',
						title: '性别输入错误'
					});
					return;
				}
				if (this.age.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '年龄不能为空'
					});
					return;
				}
				if (this.rank.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '职称不能为空'
					});
					return;
				}
				if (this.direction.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '研究方向不能为空'
					});
					return;
				}
				if (this.eduback.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '教育背景不能为空'
					});
					return;
				}
				const newData = {
					token:this.token,
					gender:this.gender,
					age:this.age,
					rank:this.rank,
					direction:this.direction,
					eduback:this.eduback,
					
				};
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/tinfo',
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
							this.changeInfo();
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
							icon: 'none',
							title: '登录过期请重新登录'
						});
						uni.clearStorageSync();
						uni.navigateTo({
							url: '../login/login'
						});
						this.cancel()
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
		onShow(){
			var that = this;
			this.token = this.getStorageData('token');
			
			
			uni.request({
				method:'POST',
				url:'http://112.124.22.241:8080/tinfo',
				data:{
					token:this.token
				},
				success: (res) => {
					console.log(res)
					const resData = res.data;
					
					if(resData.status == 'success'){
						const result = resData.result;
						this.name = result.name;
						this.teacherId = result.id;
						this.age = result.age;
						this.gender = result.gender;
						this.rank = result.rank;
						this.direction = result.dirction;
						this.eduback = result.eduback;
						this.award = result.award;
						
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
					uni.reLaunch({
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
