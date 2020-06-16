<template>
	<view class="content">
		<view v-if="!toChangeInfo">
			<view class="scell">
				<view class="title">
					姓名
				</view>
				<view class="title">
					高天宇
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					教师号
				</view>
				<view class="title">
					123456
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					性别
				</view>
				<view class="title">
					男
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					年龄
				</view>
				<view class="title">
					25
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					职称
				</view>
				<view class="title">
					教授
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					研究方向
				</view>
				<view class="title">
					大数据
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					教育背景
				</view>
				<view class="title">
					山东大学
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
					高天宇
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					教师号
				</view>
				<view class="title">
					123456
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					性别
				</view>
				<view class="title">
					男
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					年龄
				</view>
				<view class="title">
					25
				</view>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					职称
				</view>
				<input class="text-area" placeholder="职称" value="教授"/>
				
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					研究方向
				</view>
				<input class="text-area" placeholder="研究方向" value="大数据"/>
			</view>
			<view class="view-line"/>
			<view class="scell">
				<view class="title">
					教育背景
				</view>
				<input class="text-area" placeholder="教育背景" value="山东大学"/>
			</view>
			<view class="view-line"/>
			
			
			<view class="btn-row">
				<button type="default" class="primary" @tap='cancel()'>
					取消
				</button>
				<button type="default" class="primary">
					提交
				</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	
	export default {
		computed: mapState(['toChangeInfo']),
		
		data() {
			return {
				teacherId: "",
				name:"",
				gender:"",//性别
				age:"",//年龄
				rank:"", //职称
				direction:"",//研究方向
				eduback:"",//教育背景
				
				
			}
		},
		methods: {
			...mapMutations(['changeInfo']),
			change(){
				
				this.changeInfo();
				// this.$router.go(0);
				console.log(this.toChangeInfo);
			},
			cancel(){
				
				this.changeInfo();
				// this.$router.go(0);
				console.log(this.change);
			}
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
