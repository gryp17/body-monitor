import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config';
import authModule from '@/store/modules/auth';
import measurementsModule from '@/store/modules/measurements';
import formsModule from '@/store/modules/forms';
import modalsModule from '@/store/modules/modals';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		measurements: measurementsModule,
		forms: formsModule,
		modals: modalsModule
	},
	state: {
		...config
	}
});
