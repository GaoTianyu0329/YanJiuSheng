<template>
	<view class="content">
		<view v-if="pc!=null">
			<view class="nav_name">已申请招生专业</view>
			<view class="nav">
				<view class="nav_items" v-for="(item,index) in list1" :key="index">
					<scroll-view class="scroll-view-scroller" scroll-x>	
						<view class="scroll-view-item">
							<view class="scell">
								<view class="title">
									id:
								</view>
								<view class="titles">
									{{item.id}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									code:
								</view>
								<view class="titles">
									{{item.code}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									name:
								</view>
								<view class="titles">
									{{item.name}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									type:
								</view>
								<view class="titles">
									{{item.type}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									academy:
								</view>
								<view class="titles">
									{{item.academy}}
								</view>
						</view>
						</view>
						<view class="scroll-view-delete">
						<button type="primary" class="primary" @click="submits(item.id)" >
							取消
						</button>
						</view>
					</scroll-view>
				</view>

			</view>
			<view class="nav_name">未申请招生专业</view>
			<view class="nav">
				<view class="nav_items" v-for="(item,index) in list2" :key="index">
					<scroll-view class="scroll-view-scroller" scroll-x>	
						<view class="scroll-view-item">
							<view class="scell">
								<view class="title">
									id:
								</view>
								<view class="titles">
									{{item.id}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									code:
								</view>
								<view class="titles">
									{{item.code}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									name:
								</view>
								<view class="titles">
									{{item.name}}
								</view>
							</view>
							<view class="scell">
								<view class="title">
									type:
								</view>
								<view class="titles">
									{{item.type}}
								</view>
							</view>
							<view class="scell">
							<view class="title">
								academy:
							</view>
							<view class="titles">
								{{item.academy}}
							</view>
						</view>
						</view>
						<view class="scroll-view-delete">
							<button type="primary" class="primary" @click="submit(item.id)" >
								申请
							</button>
						</view>
					</scroll-view>
				</view>

			</view>
		</view>
		<view v-else-if="pc==null">
			请点击按钮，完善个人信息
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
				list1: [],
				list2: [],
				id: "",
				pc:'',
				bc:'',
				ac:"",
				ic:"",
				tc:"",
				dc:"",
				nc:"",
				npc:"",
				ppc:"",
				nppc:"",
				cpc:"",
				dsc:"",
				msc:"",
				hgdsc:"",
				token:"",
				
			}
		},
		computed:mapState(['token']),
		methods: {

			getData(){
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recurit',
					data:{
						token:this.token
					},
					success: (res) => {
						const resData = res.data;
						if(resData.status == 'success'){
							const result1 = resData.result;
							console.log(result1);
							this.list1 = result1.loma;
							const result2 = resData.result;
							this.list2 = result2.nloma;
							
						}else{
							console.log(resData.reason);
						}
					},
					fail: (res) => {
						console.log(res.errMsg);
						
					}
				});
			},

			change(){
				uni.redirectTo({
					url:'/pages/recruitInfo/recruitInfo'
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
			submits(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recurit',
					data:{
						token:this.token,
						tId:id,
						t:1,
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
					url:'../9recruit/9recruit'
				})
			},
			submit(id) {
				console.log(id);
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recurit',
					data:{
						token:this.token,
						tId:id,
						t:0,
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
					url:'../9recruit/9recruit'
				})
			},
		},

		onLoad() {
			var that = this;
			this.token = this.getStorageData('token');
		    
			uni.request({
		    	method:'POST',
		    	url:'http://112.124.22.241:8080/recurit',
		    	data:{
		    		token:this.token
		    	},
		    	success: (res) => {
		    		const resData = res.data;
		    		if(resData.status == 'success'){
		    			const result1 = resData.result;
		    			console.log(result1);
		    			this.list1 = result1.loma;
		    			const result2 = resData.result;
		    			this.list2 = result2.nloma;
		    			const result = resData.result.aaai;
		    			this.id = result.id;
		    			this.pc = result.pc;
		    			this.bc = result.bc;
		    			this.ac = result.ac;
		    			this.ic = result.ic;
		    			this.tc = result.tc;
		    			this.dc = result.dc;
		    			this.npc = result.npc;
		    			this.nc = result.nc;
		    			this.ppc = result.ppc;
		    			this.nppc = result.nppc;
		    			this.cpc = result.cpc;
		    			this.dsc = result.dsc;
		    			this.msc = result.msc;
		    			this.hgdsc = result.hgdsc;
						if(this.pc != null){
							console.log(this.pc);
						};
		    			
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
</script>

<style>
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
	.titles{
		width:400rpx;
	}

	.nav_name{
		background-color: #DDDDDD;
		text-align:center;
		height:60rpx;
		font-size: 35rpx;
		margin-top: 20rpx;
	}
	
	.scell{
		display: flex;
		margin-top: 8px;
		width: 94%;
		height: 10px;
		margin-left: auto;
		margin-right: auto;
	}
	
	.nav_items{
		display: flex;
		height:200rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
		width: 550rpx;
	}
	
	.nav_item{

		height:200rpx;
		font-size: 25rpx;
		margin-top: 20rpx;
	}
	
	.left_item{
		height:200rpx;
		font-size: 25rpx;

	}
	
	.title{
		width: 200rpx;
	}
	
	.btn {
		display: flex;
		flex: 1;
		flex-direction:row;
		height: 200rpx;
	}
</style>
