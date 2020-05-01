import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config';
import authModule from '@/store/modules/auth';
import formsModule from '@/store/modules/forms';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		auth: authModule,
		forms: formsModule
	},
	state: {
		...config
	}
});
