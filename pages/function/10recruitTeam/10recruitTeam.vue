<template>
	<view class="content">
		<view v-if="ta!=null">
			<view class="nav_name">招生团队信息</view>
			<view class="nav_item">
				<view class="scell">
						<view class="title">
							团队名称:
						</view>
						<view class="titles">
							{{tn}}
						</view>

				</view>
				<view class="scell">
						<view class="title">
							责任导师:
						</view>
						<view class="titles">
							{{ta}}
						</view>
				</view>
				<view class="scell">
						<view class="title">
							培养单位:
						</view>
						<view class="titles">
							{{u}}
						</view>
				</view>
				<view class="scell">
						<view class="title">
							团队介绍:
						</view>
						<view class="titles">
							{{ti}}
						</view>

				</view>
			</view>
			<view class="nav_name">团队成员</view>
			<view class="nav">
				<view class="nav_items" v-for="(item,index) in datalist" :key="index">
					<scroll-view class="scroll-view-scroller" scroll-x>
						<view class="scroll-view-item">
							<view class="scells">
								<view class="title">
									教师号:
								</view>
								<view class="titles">
									{{item.id}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									姓名:
								</view>
								<view class="titles">
									{{item.name}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									荣誉:
								</view>
								<view class="titles">
									{{item.award}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									性别:
								</view>
								<view class="titles">
									{{item.gender}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									年龄:
								</view>
								<view class="titles">
									{{item.age}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									职称:
								</view>
								<view class="titles">
									{{item.rank}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									方向:
								</view>
								<view class="titles">
									{{item.dirction}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									教育背景:
								</view>
								<view class="titles">
									{{item.eduback}}
								</view>
							</view>
							<view class="scells">
								<view class="title">
									学院:
								</view>
								<view class="titles">
									{{item.unit}}
								</view>
							</view>
						</view>
						<view class="scroll-view-delete">
						<button type="primary" class="primary" @click="sub(item.id)" >
							移除
						</button>
						</view>
					</scroll-view>
				</view>
			
			</view>
			<view class="nav_name">添加成员</view>
			<view class="search">
				<view class="word">请输入教师号：</view>
				<input class="tid" type="text" v-model="id">
				<button class="sub" @click="search(id)">提交</button> 
			</view>
		</view>
		<view v-if="ta==null">
			请点击按钮，完善团队信息
			<view class="btn-row">
			
				<button type="default" class="primary" @tap='change()'>
					完善信息
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
				ta:"",
				ti:"",
				tn:"",
				u:"",
				datalist:[],

			}
		},
		computed: mapState(['token']),
<<<<<<< HEAD
		methods: {       
			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recuritteam',
					data:{
						token:this.token
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const re = resData.result.tai;
							const ree = resData.result.tml;
							this.datalist = ree;
							console.log(ree);
							this.ta = re.ta;
							this.ti = re.ti;
							this.tn = re.tn;
							this.u = re.u;
							console.log(re);
							
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
				});
=======
		methods: {
			getStorageData(key){
				var result = "";
				try{
					result = uni.getStorageSync(key);
				}catch(e){
					console.log(e);
				};
				
				return result;
				
			},
			change(){
				uni.redirectTo({
					url:'/pages/teamInfo/teamInfo'
				})
>>>>>>> 81c0cc1da238b76b98905502210c0928db3c7d5a
			},
			sub(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recuritteam',
					data:{
						token:this.token,
						personId:id,
						type:0,
					},
					
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
				});
				uni.redirectTo({
					url:'../10recruitTeam/10recruitTeam'
				})
			},
			search(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recuritteam',
					data:{
						token:this.token,
						personId:id,
						type:1,
					},
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
				});
				uni.redirectTo({
					url:'../10recruitTeam/10recruitTeam'
				})
			},
			
		},
		onLoad() {
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
						const re = resData.result.tai;
						this.ta = re.ta;
						this.ti = re.ti;
						this.tn = re.tn;
						this.u = re.u;
						const ree = resData.result.tml;
						this.datalist = ree;
						console.log(ree);
						if(this.ta!=null){
							console.log(this.ta);
						};
					}
					else{
						console.log(resData.reason);
					}
				},
				fail: (res) => {
					console.log(res.errMsg);
				}
			});
		},
	}
</script>

<style>
	.scroll-view-scroller {
		border:1px solid grey;
		border-radius: 4px;
		width: 420px; //处于demo考虑 ,scroll-view宽度设为固定值，实际项目中请自行计算
	}
	.scroll-view-item {
	  width: 480px; // 300(scroller的宽度) + 100(delete按钮的宽度)
	  height: 100px;
	  position: relative;
	}
	.scroll-view-delete {
	  width: 50px; //按钮的宽度
	  position: absolute;
	  right: 0;
	  top: 0;
	  bottom: 0;
	  text-align: center;
	  line-height: 100px;
	}
	
	.sub{
		height: 50rpx;
		margin-top: 40rpx;
		font-size: 25rpx;
		margin-left: 20rpx;
	}
	.word {
		height: 50rpx;
		margin-top: 40rpx;
		font-size: 30rpx;
	}
	.tid {
		height: 50rpx;
		margin-top: 40rpx;
		border: 1px solid #DDDDDD;
		border-radius: 4px;

	}
	.search {
		display: flex;

	}
	.nav_name{
		background-color: #DDDDDD;
		text-align:center;
		height:60rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
	}
	
	.title{
		width: 150rpx;
		height:80rpx;
	}
	.titles{
		width: 300rpx;
		height:80rpx;
	}
	
	.nav_item{

		height:300rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
	}
	.scell{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 30px;
		margin-left: auto;
		margin-right: auto;
	}
	.left_item{
		height:200rpx;
		font-size: 25rpx;
	
	}
	.btn {
		display: flex;
		flex: 1;
		flex-direction:row;
		height: 350rpx;
	}
	.primary{
		line-height:175rpx;

	}
	.nav_items{
		display: flex;
		height:350rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
		width: 500rpx;
	}
	.scells{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 10px;
		margin-left: auto;
		margin-right: auto;
	}

</style>
