
import API from './API';

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} email
	 * @param {String} password
	 * @returns {Promise}
	 */
	login(email, password, rememberMe) {
		return API.post('/User/login', {
			email,
			password
		});
	},
	/**
	 * Returns the current user session
	 * @returns {Promise}
	 */
	getSession() {
		return API.get('/User/isLoggedIn');
	},
	/**
	 * Logs out the user
	 * @returns {Promise}
	 */
	logout() {
		return API.get('/User/logout');
	},
	/**
	 * Signs up the user
	 * @param {String} email
	 * @param {String} password
	 * @param {String} repeatPassword
	 * @returns {Promise}
	 */
	signup(email, password, repeatPassword) {
		return API.post('/User/signup', {
			email,
			password,
			repeatPassword
		});
	}
};
