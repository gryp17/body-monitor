
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
	}
};
