
import API from './API';

export default {
	/**
	 * Fetches the measurement units
	 * @returns {Promise}
	 */
	getUnits() {
		return API.get('/Measurement/getUnits');
	},
	/**
	 * Fetches the user measurements
	 * @returns {Promise}
	 */
	getMeasurements() {
		return API.get('/Measurement/getMeasurements');
	},
	/**
	 * Adds new measurement
	 * @param {String} name
	 * @param {Number} type
	 * @returns {Promise}
	 */
	addMeasurement(name, type) {
		return API.post('/Measurement/addMeasurement', {
			name,
			type
		});
	},
	/**
	 * Adds new measurement entries
	 * @param {String} date
	 * @param {Object} values
	 * @returns {Promise}
	 */
	addMeasurementEntries(date, values) {
		return API.post('/Measurement/addMeasurementEntries', {
			date,
			values
		});
	},
	/**
	 * Deletes a measurement entry
	 * @param {Number} entryId
	 * @returns {Promise}
	 */
	deleteMeasurementEntry(entryId) {
		return API.post('/Measurement/deleteMeasurementEntry', {
			entryId
		});
	},
	/**
	 * Fetches all user measurement entries
	 * @returns {Promise}
	 */
	getMeasurementEntries() {
		return API.get('/Measurement/getMeasurementEntries');
	}
};
