
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
	 * @param {String} username
	 * @param {String} email
	 * @param {String} password
	 * @param {String} repeatPassword
	 * @param {Object} birthday
	 * @param {String} gender
	 * @param {String} captcha
	 * @returns {Promise}
	 */
	signup(username, email, password, repeatPassword, birthday, gender, captcha) {
		return API.post('/User/signup', {
			username,
			email,
			password,
			repeat_password: repeatPassword,
			birthday,
			gender,
			captcha
		});
	},
	/**
	 * Sends a password reset request for the specified email
	 * @param {String} email
	 * @returns {Promise}
	 */
	sendPasswordResetRequest(email) {
		return API.post('/PasswordReset/sendPasswordResetRequest', {
			email
		});
	},
	/**
	 * Checks if the userId/hash combination is valid (not expired)
	 * @param {Number} userId
	 * @param {String} hash
	 * @returns {Promise}
	 */
	checkPasswordResetHash(userId, hash) {
		return API.post('/PasswordReset/checkPasswordResetHash', {
			user_id: userId,
			hash
		});
	},
	/**
	 * Updates the user password
	 * @param {Number} userId
	 * @param {String} hash
	 * @param {String} password
	 * @param {String} repeatPassword
	 * @returns {Promise}
	 */
	updatePassword(userId, hash, password, repeatPassword) {
		return API.post('/User/updatePassword', {
			user_id: userId,
			hash,
			password,
			repeat_password: repeatPassword
		});
	},
	/**
	 * Activates the user account
	 * @param {Number} userId
	 * @param {String} hash
	 * @returns {Promise}
	 */
	activateUser(userId, hash) {
		return API.post('/UserActivation/activateUser', {
			user_id: userId,
			hash
		});
	},
	/**
	 * Sends an user activation email
	 * @param {String} email
	 * @returns {Promise}
	 */
	resendActivation(email) {
		return API.post('/User/resendUserActivation', {
			email
		});
	},
	/**
	 * Returns the user data for the specified id
	 * @param {Number} userId
	 * @returns {Promise}
	 */
	getUser(userId) {
		return API.get(`/User/getUser?id=${userId}`);
	},
	/**
	 * Updates the user data
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	updateUser(formData) {
		return API.post('/User/updateUser', formData);
	},
	/**
	 * Fetches users that match the passed keyword
	 * @param {String} keyword
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	search(keyword, limit, offset) {
		return API.get(`/User/search?keyword=${keyword}&limit=${limit}&offset=${offset}`);
	},
	/**
	 * Submits an user report
	 * @param {Number} userId
	 * @param {String} report
	 * @returns {Promise}
	 */
	reportUser(userId, report) {
		return API.post('/UserReport/reportUser', {
			user_id: userId,
			report
		});
	}
};
