<template>
	<view class="content">
		<view v-if="!toChangeInfo">
			<view class="scell">
				<view class="title">
					教师号
				</view>
				<view class="title">
					{{id}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					论文数
				</view>
				<view class="title">
					{{pc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					专著数
				</view>
				<view class="title">
					{{bc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					获奖数
				</view>
				<view class="title">
					{{ac}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					专利数
				</view>
				<view class="title">
					{{ic}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					总费用
				</view>
				<view class="title">
					{{tc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					可支配费用
				</view>
				<view class="title">
					{{dc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					国家项目数
				</view>
				<view class="title">
					{{nc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					国家立项数
				</view>
				<view class="title">
					{{npc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					省部项目数
				</view>
				<view class="title">
					{{ppc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					省部立项数
				</view>
				<view class="title">
					{{nppc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					横向项目数
				</view>
				<view class="title">
					{{cpc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					招到博士生数
				</view>
				<view class="title">
					{{dsc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					指导硕士生数
				</view>
				<view class="title">
					{{msc}}
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					协助指导博士生数
				</view>
				<view class="title">
					{{hgdsc}}
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
					教师号
				</view>
				<view class="title">
					{{d}}
				</view>
			</view>
			<view class="view-line"/>
			<from >
				<view class="scell">
					<view class="title">
						论文数
					</view>
					<input  class="text-area" placeholder="论文数" v-model="pc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						专著数
					</view>
					<input class="text-area" placeholder="专著数" v-model="bc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						获奖数
					</view>
					<input class="text-area" placeholder="获奖数" v-model="ac"/>
					
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						专利数
					</view>
					<input class="text-area" placeholder="专利数" v-model="ic"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						总经费
					</view>
					<input class="text-area" placeholder="总经费" v-model="tc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						可支配经费
					</view>
					<input class="text-area" placeholder="可支配经费" v-model="dc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						国家项目数
					</view>
					<input class="text-area" placeholder="国家项目数" v-model="nc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						国家立项数
					</view>
					<input class="text-area" placeholder="国家立项数" v-model="npc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						省部项目数
					</view>
					<input class="text-area" placeholder="省部项目数" v-model="ppc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						省部立项数
					</view>
					<input class="text-area" placeholder="省部立项数" v-model="nppc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						横向项目数
					</view>
					<input class="text-area" placeholder="横向项目数" v-model="cpc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						指导博士生数
					</view>
					<input class="text-area" placeholder="指导博士生数" v-model="dsc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						指导硕士生数
					</view>
					<input class="text-area" placeholder="指导硕士生数" v-model="msc"/>
				</view>
				<view class="view-line"/>
				<view class="scell">
					<view class="title">
						协助指导博士生数
					</view>
					<input class="text-area" placeholder="协助指导博士生数" v-model="hgdsc"/>
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
				token:'',
				temp_data:{
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
				}
			}
		},
		methods: {
			...mapMutations(['changeInfo']),
			change(){
				
				this.changeInfo();
				this.temp_data.pc = this.pc;
				this.temp_data.bc = this.bc;
				this.temp_data.ac = this.ac;
				this.temp_data.ic = this.ic;
				this.temp_data.tc = this.tc;
				this.temp_data.dc = this.dc;
				this.temp_data.nc = this.nc;
				this.temp_data.npc = this.npc;
				this.temp_data.ppc = this.ppc;
				this.temp_data.nppc = this.nppc;
				this.temp_data.cpc = this.cpc;
				this.temp_data.dsc = this.dsc;
				this.temp_data.msc = this.msc;
				this.temp_data.hgdsc = this.hgdcs;
				console.log(this.toChangeInfo);
			},
			cancel(){
				this.pc = this.temp_data.pc;
				this.bc = this.temp_data.bc;
				this.ac = this.temp_data.ac;
				this.ic = this.temp_data.ic;
				this.tc = this.temp_data.tc;
				this.dc = this.temp_data.dc;
				this.nc = this.temp_data.nc;
				this.npc = this.temp_data.npc;
				this.ppc = this.temp_data.ppc;
				this.nppc = this.temp_data.nppc;
				this.cpc = this.temp_data.cpc;
				this.dsc = this.temp_data.dsc;
				this.msc = this.temp_data.msc;
				this.hgdsc = this.temp_data.hgdsc;
				this.changeInfo();
				
				console.log(this.change);
			},
			submit(){
				if (this.pc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '论文数量不能为空'
					});
					return;
				}
				if (this.bc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '专著数量不能为空'
					});
					return;
				}
				if (this.ac.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '获奖数量不能为空'
					});
					return;
				}
				if (this.ic.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '专利数量不能为空'
					});
					return;
				}
				if (this.tc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '总经费不能为空'
					});
					return;
				}
				if (this.dc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '可支配费用不能为空'
					});
					return;
				}
				if (this.nc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '国家项目数不能为空'
					});
					return;
				}
				if (this.npc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '国家立项数不能为空'
					});
					return;
				}
				if (this.ppc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '省部项目数不能为空'
					});
					return;
				}
				if (this.nppc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '省部立项数不能为空'
					});
					return;
				}
				if (this.cpc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '横向项目数不能为空'
					});
					return;
				}
				if (this.dsc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '招到博士生数不能为空'
					});
					return;
				}
				if (this.msc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '指导硕士生数不能为空'
					});
					return;
				}
				if (this.hgdsc.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '协助指导博士生数不能为空'
					});
					return;
				}
				
				const newData = {
					token:this.token,
					pc:this.pc,
					bc:this.bc,
					ac:this.ac,
					ic:this.ic,
					tc:this.tc,
					dc:this.dc,
					nc:this.nc,
					npc:this.npc,
					ppc:this.ppc,
					nppc:this.nppc,
					cpc:this.cpc,
					dsc:this.dsc,
					msc:this.msc,
					hgdsc:this.hgdsc,
					
				};
				uni.request({
					method:'POST',
					url:'http://112.124.22.241:8080/recurit',
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
				url:'http://112.124.22.241:8080/recurit',
				data:{
					token:this.token
				},
				success: (res) => {
					console.log(res)
					const resData = res.data;
					
					if(resData.status == 'success'){
						const result = resData.result.aaai;
						console.log(result);
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
						
					}else{
						console.log(resData.reason);
					}
				},
				fail: (res) => {
					console.log(res.errMsg);
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
