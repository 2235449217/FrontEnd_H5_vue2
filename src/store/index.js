import Vue from 'vue';
import Vuex from 'vuex';
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth';
import {
	login,
	getInfo,
	logout
} from '@/api/login';
Vue.use(Vuex);
/*
移动端不涉及权限问题
所以本次没针对Vuex做工程化处理
后续有兴趣的可以看看smpe怎么做的
*/
export default new Vuex.Store({
	//自定义一些变量，用来保存数据
	state: {
		token: getToken(),
		user: {},
		roles: [],
	},
	/* 用于缓存state中的数据以及发生改变，相当于computed属性，
	Getter 还会将 store.getters 对象暴露出去，你可以以属性的形式访问这些值 */
	getters: { user: state => state.user.user, },
	mutations: {
		//写法与getters相类似
		//组件想要对于vuex 中的数据进行的处理
		//组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
		 //内部操作必须在此刻完成(同步)
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USER: (state, user) => {
			state.user = user;
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles;
		}
	},
	actions: {
		// 登录
		Login({ commit }, userInfo) {
			const rememberMe = userInfo.rememberMe;
			return new Promise((resolve, reject) => {
				login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid).then(res => {
					setToken(res.data.token, rememberMe);
					commit('SET_TOKEN', res.data.token);
					setUserInfo(res.data.user, commit);
					// 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
					commit('SET_LOAD_MENUS', true);
					resolve();
				}).catch(error => {
					reject(error);
				});
			});
		},
		// 获取用户信息
		GetInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getInfo().then(res => {
					setUserInfo(res.data, commit);
					resolve(res.data);
				}).catch(error => {
					reject(error);
				});
			});
		},
		// 登出
		LogOut({ commit }) {
			return new Promise((resolve, reject) => {
				logout().then(res => {
					logOut(commit);
					resolve(res);
					resolve();
				}).catch(error => {
					logOut(commit);
					reject(error);
				});
			});
		},
	}
});

export const logOut = commit => {
	commit('SET_TOKEN', '');
	commit('SET_ROLES', []);
	removeToken();
};

export const setUserInfo = (res, commit) => {
	// 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
	if (res.roles.length === 0) {
		commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT']);
	} else {
		commit('SET_ROLES', res.roles);
	}
	commit('SET_USER', res.user);
};
