export default {
	namespaced: true,
	state: {
		measurementsModalOpened: false
	},
	mutations: {
		setMeasurementsModalOpened(state, opened) {
			state.measurementsModalOpened = opened;
		}
	},
	actions: {
		/**
		 * Shows the measurements modal
		 * @param {Object} context
		 */
		showMeasurementsModal(context) {
			context.commit('setMeasurementsModalOpened', true);
		},
		/**
		 * Hides the measurements modal
		 * @param {Object} context
		 */
		hideMeasurementsModal(context) {
			context.commit('setMeasurementsModalOpened', false);
		}
	}
};
