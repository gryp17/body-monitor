import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		errors: {
			login: {},
			signup: {},
			addMeasurement: {},
			addEntry: {}
		}
	},
	mutations: {
		setFormError(state, { form, field, error }) {
			Vue.set(state.errors[form], field, error);
		},
		resetFormErrors(state, form) {
			Vue.set(state.errors, form, {});
		}
	},
	actions: {
		/**
		 * Clears a single form error
		 * @param {Object} context
		 * @param {Object} data
		 */
		clearFormError(context, { form, field }) {
			context.commit('setFormError', {
				form,
				field,
				error: null
			});
		},
		/**
		 * Sets a form error
		 * @param {Object} context
		 * @param {Object} data
		 */
		setFormError(context, { form, field, error }) {
			context.commit('setFormError', {
				form,
				field,
				error
			});
		},
		/**
		 * Resets all form errors
		 * @param {Object} context
		 * @param {Object} form
		 */
		resetFormErrors(context, form) {
			context.commit('resetFormErrors', form);
		}
	}
};
