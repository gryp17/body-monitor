export default {
	namespaced: true,
	state: {
		mainMenuOpened: false
	},
	mutations: {
		setMainMenuOpened(state, opened) {
			state.mainMenuOpened = opened;
		}
	},
	actions: {
		/**
		 * Toggles the main menu
		 * @param {Object} context
		 */
		toggleMainMenu(context) {
			const opened = !context.state.mainMenuOpened;
			context.commit('setMainMenuOpened', opened);
		},
		/**
		 * Hides the main menu
		 * @param {Object} context
		 */
		hideMainMenu(context) {
			context.commit('setMainMenuOpened', false);
		}
	}
};
