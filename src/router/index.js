import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Authentication from '@/views/Authentication';

import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			authRequired: true
		}
	},
	{
		path: '/home',
		name: 'explicit-home',
		component: Home,
		meta: {
			authRequired: true
		}
	},
	{
		path: '/auth',
		name: 'auth',
		component: Authentication
	},
	{
		path: '*',
		component: Home,
		meta: {
			authRequired: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		return {
			x: 0,
			y: 0
		};
	}
});

/**
 * Returns the user session
 * @returns {Promise}
 */
function getUserSession() {
	if (store.state.auth.userSession) {
		return Promise.resolve(store.state.auth.userSession);
	}

	return store.dispatch('auth/getUserSession').then((res) => {
		return res.data.user;
	});
}


router.beforeEach((to, from, next) => {
	const forbiddenRoute = {
		name: 'auth'
	};

	if (to.meta.authRequired) {
		getUserSession().then((user) => {
			if (!user) {
				return next(forbiddenRoute);
			}

			next();
		});
	} else {
		next();
	}
});

export default router;
