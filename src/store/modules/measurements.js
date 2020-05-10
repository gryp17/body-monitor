import Vue from 'vue';
import moment from 'moment';
import MeasurementHttpService from '@/services/measurement';

export default {
	namespaced: true,
	state: {
		units: [],
		measurements: [],
		entries: []
	},
	getters: {
		groupedEntries(state) {
			const measurements = {};

			//sort all entries by date before grouping them
			state.entries.sort((a, b) => {
				return moment(a.date) - moment(b.date);
			}).forEach((entry) => {
				if (!measurements[entry.measurement_id]) {
					measurements[entry.measurement_id] = [];
				}

				//format all the values
				entry.value = Vue.options.filters.toFixed(entry.value, 1);

				measurements[entry.measurement_id].push(entry);
			});

			return measurements;
		},
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
		},
		addEntry(state, entry) {
			state.entries.push(entry);
		},
		addEntries(state, entries) {
			state.entries = state.entries.concat(entries);
		},
		deleteEntry(state, id) {
			state.entries = state.entries.filter((entry) => {
				return entry.id !== id;
			});
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
		addMeasurementEntries(context, { date, values }) {
			return MeasurementHttpService.addMeasurementEntries(date, values).then((res) => {
				if (res.data.entries) {
					context.commit('addEntries', res.data.entries);
				}
				return res;
			}).catch((error) => {
				Vue.toasted.global.apiError({
					message: `addMeasurementEntry failed - ${error}`
				});
			});
		},
		deleteMeasurementEntry(context, entryId) {
			return MeasurementHttpService.deleteMeasurementEntry(entryId).then((res) => {
				if (res.data.success) {
					context.commit('deleteEntry', entryId);
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
