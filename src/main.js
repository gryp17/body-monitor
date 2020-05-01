import Vue from 'vue';
import Toasted from 'vue-toasted';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Toasted, {
	position: 'bottom-right',
	duration: 5000,
	keepOnHover: true,
	iconPack: 'fontawesome'
});

//register custom toast type
Vue.toasted.register('apiError', (payload) => {
	return payload.message || 'Error...';
}, {
	type: 'error',
	icon: {
		name: 'fa-exclamation-triangle'
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
