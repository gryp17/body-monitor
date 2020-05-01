import axios from 'axios';
import config from '@/config';
import errorsMap from '@/filters/errorsMap';

const API = axios.create({
	baseURL: config.API_URL,
	withCredentials: true
});

//intercept all responses
API.interceptors.response.use((res) => {
	if (res.data && res.data.error) {
		//trigger an exception if there is an API error
		if (typeof res.data.error !== 'object') {
			return Promise.reject(res.data.error);
		}

		//translate the error code into an actual error message
		if (res.data.error.error_code) {
			res.data.error.error = errorsMap(res.data.error.error_code);
		}
	}

	return res;
});

export default API;
