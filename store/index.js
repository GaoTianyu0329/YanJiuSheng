import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		teacherId: "",
		openId: "",
		pwd:"",
		token:"",
		toChangeInfo:false
	},
	mutations: {
		init(state,data){
			console.log(data);
			state.openId = data.openId;
			state.userName = data.userName;
			state.hasLogin = data.hasLogin;
			state.teacherId = data.teacherId;
			state.pwd = data.pwd;
			// state.token = data.token;
		},
		login(state, data) {
			// console.log(data)
			state.userName = data.userName || '新用户';
			state.hasLogin = true;
			
			state.teacherId = data.teacherId || '';
			state.pwd = data.pwd || '';
			// state.token = data.token;
			
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			state.teacherId = "";
			state.pwd = '';
			// state.token = '';
		},
		changeInfo(state){
			state.toChangeInfo = !state.toChangeInfo;
		}
	}
})

export default store
