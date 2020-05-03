import Vue from 'vue';
import MeasurementHttpService from '@/services/measurement';

export default {
	namespaced: true,
	state: {
		units: [],
		measurements: []
	},
	getters: {
		measurementsMap(state) {
			const map = {};

			state.measurements.forEach((measurement) => {
				map[measurement.id] = measurement;
			});

			return map;
		},
		unitsMap(state) {
			const map = {};

			state.units.forEach((unit) => {
				map[unit.id] = unit.name;
			});

			return map;
		}
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
		},
		addMeasurementEntry(context, { measurementId, date, value }) {
			return MeasurementHttpService.addMeasurementEntry(measurementId, date, value).then((res) => {
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addMeasurementEntry failed - ${error}`
				});
			});
		}
	}
};
