<template>
	<view>
		教师信息维护
	</view>
<!-- 	<view class="teacher_info">
		<view class="tid">
			<text class="id">工号：</text>
			<input class="inputid" type="text" v-model="t.id" readonly="readonly">
		</view>
		
		<view class="tname">
			<text class="name">姓名：</text>
			<input class="inputname" type="text" v-model="t.name" readonly="readonly">
		</view>

		<view class="tsex">
			<text class="name">性别：</text>
			<input class="inputname" type="text" v-model="t.sex">
		</view>
		
		<view class="tage">
			<text class="name">年龄：</text>
			<input class="inputname" type="text" v-model="t.age">
		</view>
		
		<view class="ttitle">
			<text class="name">职务：</text>
			<input class="inputname" type="text" v-model="t.title">
		</view>
		
		<view class="ttend">
			<text class="name">研究方向：</text>
			<input class="inputname" type="text" v-model="t.tend">
		</view>

		
	</view> -->
</template>

<script>
	export default {
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
				method:"POST",
				success: (res) => {
					if(res.data.status==200){
						console.log("success");
						var teacherList=res.data.data;
						this.teacherList=teacherList;
					}
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
