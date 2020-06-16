<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<view class="title">
				教师信息维护
			</view>

			
			<view class="teacherFrom">
				<form @submit="formSubmit">
					<view class="TID">
						<view class="word">工号：</view>
						<input class="tid" type="text" v-model="t.tid" :placeholder="teacherId" readonly=readonly>
					</view>
					<view class="TID">
						<view class="word">姓名：</view>
						<input class="tid" type="text" v-model="t.name" readonly=readonly>
					</view>
					<view class="TID">
						<view class="word">性别：</view>
						<input class="tid" type="text" v-model="t.sex">
					</view>
					<view class="TID">
						<view class="word">年龄：</view>
						<input class="tid" type="text" v-model="t.age">
					</view>
					<view class="TID">
						<view class="word">职称：</view>
						<input class="tid" type="text" v-model="t.title">
					</view>
					<view class="TID">
						<view class="word">方向：</view>
						<input class="tid" type="text" v-model="t.tend">
					</view>
					<button class="sub" @click="confirm">提交</button> 
				</form>
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
		computed: mapState(['hasLogin', 'teacherId']),
		data() {
			return {
				t: {
					id:'',
					name:'',
					sex:'',
					age:'',
					title:'',
					tend:'',
				}
			}
		},
		onload() {
			uni.request({
				url: '',
				data: {
					user_id: teacherId
				},
				method:"POST",
				success: (res) => {
					if(res.data.status==200){
						console.log("success");
						var teacherList=res.data.data;
						this.teacherList=teacherList;
					}
				}
			})
			
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
				
			}
		},
		methods: {
			confirm() {
                let data = this.t;
                console.log(JSON.stringify(data))

            },
			// bindTeacher() {
			// 	const data = {
			// 		user_id: this.user_id,
			// 		name: this.name,
			// 		sex: this.sex,
			// 		age: this.age,
			// 		title: this.title,
			// 		tend: this.tend
			// 	};
			// 	const validTeacher = teacherList.user_id === "123456" && teacherList.name === "abc" && teacherList.sex === "男" && teacherList.age === "33" && teacherList.title === "教授" && teacherList.tend === "人工智能";;
			// 	if (validTeacher) {
			// 		this.storageData("user_id",data.user_id);
			// 		this.storageData("name",data.name);
			// 		this.storageData("sex",data.sex);
			// 		this.storageData("age",data.age);
			// 		this.storageData("title",data.title);
			// 		this.storageData("tend",data.tend);
			// 	}
			// }
		}
	}	
</script>

<style>
	.word {
		margin-top: 40rpx;
		font-size: 40rpx;
	}
	.tid {
		margin-top: 40rpx;
		border: 1px solid #DDDDDD;
		border-radius: 4px;
	}
	.TID {
		display: flex;
		height: 80rpx;
	}
	.title {
		font-size: 40rpx;
		background-color: #DDDDDD;
		text-align: center;
		height: 60rpx;
	}
	.sub {
		margin-top: 80rpx;
		height: 100rpx;
		width: 600rpx;
	}
</style>
