import Vue from 'vue';
import MeasurementHttpService from '@/services/measurement';

export default {
	namespaced: true,
	state: {
		units: [],
		measurements: [],
		entries: []
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
		},
		setEntries(state, entries) {
			state.entries = entries;
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
				if (!res.data.error) {
					context.dispatch('getMeasurementEntries');
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addMeasurementEntry failed - ${error}`
				});
			});
		},
		getMeasurementEntries(context) {
			return MeasurementHttpService.getMeasurementEntries().then((res) => {
				if (res.data && res.data) {
					context.commit('setEntries', res.data);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `getMeasurementEntries failed - ${error}`
				});
			});
		}
	}
};
