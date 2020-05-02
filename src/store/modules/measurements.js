import Vue from 'vue';
import MeasurementHttpService from '@/services/measurement';

export default {
	namespaced: true,
	state: {
		units: [],
		measurements: []
	},
	mutations: {
		setUnits(state, units) {
			state.units = units;
		},
		setMeasurements(state, measurements) {
			state.measurements = measurements;
		}
	},
	actions: {
		getUnits(context) {
			return MeasurementHttpService.getUnits().then((res) => {
				if (res.data && res.data) {
					context.commit('setUnits', res.data);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getUnits failed - ${error}`
				});
			});
		},
		getMeasurements(context) {
			return MeasurementHttpService.getMeasurements().then((res) => {
				if (res.data && res.data) {
					context.commit('setMeasurements', res.data);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getMeasurements failed - ${error}`
				});
			});
		},
		addMeasurement(context, { name, type }) {
			return MeasurementHttpService.addMeasurement(name, type).then((res) => {
				if (!res.data.error) {
					context.dispatch('getMeasurements');
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addMeasurement failed - ${error}`
				});
			});
		}
	}
};
