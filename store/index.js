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
		teacherId: ""
	},
	mutations: {
		login(state, data) {
			state.userName = data.userName || '新用户';
			state.hasLogin = true;
			
			state.teacherId = data.teacherId;
			
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
			state.teacherId = "";
			
		}
	}
})

export default store
