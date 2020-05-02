export default {
	namespaced: true,
	state: {
		addMeasurementModalOpened: false,
		addEntryModalOpened: false
	},
	mutations: {
		setAddMeasurementModalOpened(state, opened) {
			state.addMeasurementModalOpened = opened;
		},
		setAddEntryModalOpened(state, opened) {
			state.addEntryModalOpened = opened;
		}
	},
	actions: {
		/**
		 * Shows the measurements modal
		 * @param {Object} context
		 */
		showAddMeasurementModal(context) {
			context.commit('setAddMeasurementModalOpened', true);
		},
		/**
		 * Hides the measurements modal
		 * @param {Object} context
		 */
		hideAddMeasurementModal(context) {
			context.commit('setAddMeasurementModalOpened', false);
		},
		/**
		 * Shows the add entry modal
		 * @param {Object} context
		 */
		showAddEntryModal(context) {
			context.commit('setAddEntryModalOpened', true);
		},
		/**
		 * Hides the add entry modal
		 * @param {Object} context
		 */
		hideAddEntryModal(context) {
			context.commit('setAddEntryModalOpened', false);
		}
	}
};
