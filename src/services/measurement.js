
import API from './API';

export default {
	getUnits() {
		return API.get('/Measurement/getUnits');
	},
	getMeasurements() {
		return API.get('/Measurement/getMeasurements');
	},
	addMeasurement(name, type) {
		return API.post('/Measurement/addMeasurement', {
			name,
			type
		});
	},
	addMeasurementEntries(date, values) {
		return API.post('/Measurement/addMeasurementEntries', {
			date,
			values
		});
	},
	deleteMeasurementEntry(entryId) {
		return API.post('/Measurement/deleteMeasurementEntry', {
			entryId
		});
	},
	getMeasurementEntries() {
		return API.get('/Measurement/getMeasurementEntries');
	}
};
