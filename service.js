// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const post = function(url,data){
	uni.request({
		method:'POST',
		url:url,
		data:data,
		success: (res) => {
			return res.data;
		},
		fail: (res) => {
			console.log();
		}
	})
}
export default {
	getUsers,
	addUser
}
