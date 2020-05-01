import Vue from 'vue';
import UserHttpService from '@/services/user';

export default {
	namespaced: true,
	state: {
		userSession: null
	},
	getters: {
		isLoggedIn(state) {
			return !!state.userSession;
		}
	},
	mutations: {
		setUserSession(state, userSession) {
			state.userSession = userSession;
		}
	},
	actions: {
		/**
		 * Fetches the user session/login status of the current user
		 * @param {Object} context
		 * @returns {Promise}
		 */
		getUserSession(context) {
			return UserHttpService.getSession().then((res) => {
				if (res.data && res.data.user) {
					context.commit('setUserSession', res.data.user);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUserSession failed - ${error}`
				});
			});
		},
		/**
		 * Logs in the user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		login(context, { email, password }) {
			return UserHttpService.login(email, password).then((res) => {
				if (res.data && res.data.ID) {
					context.commit('setUserSession', res.data);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `login failed - ${error}`
				});
			});
		},
		/**
		 * Logs out the user
		 * @param {Object} context
		 * @returns {Promise}
		 */
		logout(context) {
			return UserHttpService.logout().then((res) => {
				context.commit('setUserSession', null);
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `logout failed - ${error}`
				});
			});
		},
		/**
		 * Signs up the user
		 * @param {Object} context
		 * @param {Object} data
		 * @returns {Promise}
		 */
		signup(context, { email, password, repeatPassword }) {
			return UserHttpService.signup(email, password, repeatPassword).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `signup failed - ${error}`
				});
			});
		}
	}
};
