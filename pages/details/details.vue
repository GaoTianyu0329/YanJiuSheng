<template>
	<view>
		{{id}},{{name}},{{time}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				name:'',
				time:'',
			}
		},
		methods: {
			
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        this.id = option.id;
				this.name = option.name;
				this.time = option.time;
		    }
		
	}
</script>

<style>

</style>
