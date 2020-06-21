<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="nav_name">信息维护</view>
				<view class="nav">
					<view class="nav_item" v-for="(item,index) in navs1" :key="index" @click="navItemClick(item.path)">
						<view class="nav_pic">
							<image class="np" :src="item.pic"></image>
						</view>
						<view class="ni">{{item.title}}</view>
					</view>
				</view>
			<view class="nav_name">成果维护</view>
				<view class="nav">
					<view class="nav_item" v-for="(item,index) in navs2" :key="index" @click="navItemClick(item.path)">
						<view class="nav_pic">
							<image class="np" :src="item.pic"></image>
						</view>
						<view class="ni">{{item.title}}</view>
					</view>
				</view>
			<view class="nav_name">资格申请</view>
				<view class="nav">
					<view class="nav_item" v-for="(item,index) in navs3" :key="index" @click="navItemClick(item.path)">
						<view class="nav_pic">
							<image class="np" :src="item.pic"></image>
						</view>
						<view class="ni">{{item.title}}</view>
					</view>
				</view>
			<view class="nav_name">毕业审核</view>
				<view class="nav">
					<view class="nav_item" v-for="(item,index) in navs4" :key="index" @click="navItemClick(item.path)">
						<view class="nav_pic">
							<image class="np" :src="item.pic"></image>
						</view>
						<view class="ni">{{item.title}}</view>
					</view>
				</view>
			<view class="nav_name">出国审核</view>
				<view class="nav">
					<view class="nav_item" v-for="(item,index) in navs5" :key="index" @click="navItemClick(item.path)">
						<view class="nav_pic">
							<image class="np" :src="item.pic"></image>
						</view>
						<view class="ni">{{item.title}}</view>
					</view>
				</view>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>这是 uni-app 带登录模板的示例App首页。</view>
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName','studentId']),
		data() {
			return {
				navs1: [
					{
						pic: '../../static/img/function/ia_100000011.png',
						title: '教师信息维护',
						path: '/pages/userInfo/userInfo'
					},
					{
						pic: '../../static/img/function/ia_100000012.png',
						title: '学生信息查看',
						path: '/pages/function/2studentInfo/2studentInfo'
					},
					{
						pic: '../../static/img/function/ia_100000013.png',
						title: '学生培养计划',
						path: '/pages/function/3studentPlan/3studentPlan'
					},
				],
				navs2: [
					{
						pic: '../../static/img/function/ia_100000014.png',
						title: '申请论文维护',
						path: '/pages/function/4dissertationMt/4dissertationMt'
					},
					{
						pic: '../../static/img/function/ia_100000015.png',
						title: '申请专著维护',
						path: '/pages/function/5monographMt/5monographMt'
					},
					{
						pic: '../../static/img/function/ia_100000016.png',
						title: '申请项目维护',
						path: '/pages/function/6projectMt/6projectMt'
					},
					{
						pic: '../../static/img/function/ia_100000017.png',
						title: '申请专利维护',
						path: '/pages/function/7patentMt/7patentMt'
					},
					{
						pic: '../../static/img/function/ia_100000018.png',
						title: '申请奖励维护',
						path: '/pages/function/8incentiveMt/8incentiveMt'
					},
				],
				
				navs3: [
					{
						pic: '../../static/img/function/ia_100000019.png',
						title: '招生资格申请',
						path: '/pages/function/9recruit/9recruit'
					},
					{
						pic: '../../static/img/function/ia_100000020.png',
						title: '招生团队申请',
						path: '/pages/function/10recruitTeam/10recruitTeam'
					},
				],
				navs4: [
					{
						pic: '../../static/img/function/ia_100000021.png',
						title: '毕业申请审核',
						path: '/pages/function/11guaAppVerify/11guaAppVerify'
					},
					{
						pic: '../../static/img/function/ia_100000022.png',
						title: '外审论文审核',
						path: '/pages/function/12exReviewDissVerify/12exReviewDissVerify'
					},
					{
						pic: '../../static/img/function/ia_100000023.png',
						title: '毕业论文审核',
						path: '/pages/function/13guaDissVerify/13guaDissVerify'
					},
				],
				navs5: [
					{
						pic: '../../static/img/function/ia_100000024.png',
						title: '公派申请审核',
						path: '/pages/function/14sponGovVerify/14sponGovVerify'
					},
					{
						pic: '../../static/img/function/ia_100000025.png',
						title: '国际会议审核',
						path: '/pages/function/15interConVerify/15interConVerify'
					},
					{
						pic: '../../static/img/function/ia_100000026.png',
						title: '出国申请审核',
						path: '/pages/function/16abroadAppVerify/16abroadAppVerify'
					},
					{
						pic: '../../static/img/function/ia_100000027.png',
						title: '归国变更审核',
						path: '/pages/function/17returnChaVerify/17returnChaVerify'
					},
				],
			}
		},
		onReady() {
			
			if (!this.hasLogin) {
				console.log(this.hasLogin)
				uni.navigateTo({
					url: '../login/login'
				});
	
			}
		},
		methods: {
			navItemClick(url) {
				uni.navigateTo({
					url
				});
			},
		}
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.title {
		color: #8f8f94;
		margin-top: 25px;
	}
	.ul {
		font-size: 15px;
		color: #8f8f94;
		margin-top: 25px;
	}
	.ul>view {
		line-height: 25px;
	}
	.nav{
		display: flex;
	}
	.ni{
		font-size: 23rpx;
	}
	.np{
		width: 120rpx;
		height: 120rpx;

	}
	.nav_item{
		width: 20%;
	}
	.nav_name{
		background-color: #DDDDDD;
	}
</style>