<template>
	<view>
		{{id}},{{name}},{{time}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kind:'',
				id:'',
				name:'',
				time:'',
			}
		},
		methods: {
			setTitle(title){
				uni.setnavi
				uni.setNavigationBarTitle({
				title: title
				});
			}
		},
		onReady() {
			switch(this.kind){
				case '0':
					this.setTitle('论文详情');
					break;
				case '1':
					this.setTitle('专著详情');
					break;
				case '2':
					this.setTitle('项目详情');
					break;
				case '3':
					this.setTitle('专利详情');
					break;
				case '4':
					this.setTitle('奖励详情');
					break;
				
			};
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        switch(option.kind){
		        	case '0':
		        		this.setTitle('论文详情');
		        		break;
		        	case '1':
		        		this.setTitle('专著详情');
		        		break;
		        	case '2':
		        		this.setTitle('项目详情');
		        		break;
		        	case '3':
		        		this.setTitle('专利详情');
		        		break;
		        	case '4':
		        		this.setTitle('奖励详情');
		        		break;
		        	
		        };
				this.kind = option.kind;
				this.id = option.id;
				this.name = option.name;
				this.time = option.time;
		    }
		
	}
</script>

<style>

</style>
