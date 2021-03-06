<template>
	<div id="app">
		<div v-if="appIsReady" class="main-wrapper container">
			<router-view class="view-wrapper"/>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapActions } from 'vuex';

	import errorsMap from '@/filters/errorsMap';
	import date from '@/filters/date';
	import toFixed from '@/filters/toFixed';
	import FormButton from '@/components/forms/FormButton';
	import FormInput from '@/components/forms/FormInput';
	import FormDropdown from '@/components/forms/FormDropdown';
	import FormDatepicker from '@/components/forms/FormDatepicker';
	import LoadingIndicator from '@/components/LoadingIndicator';

	Vue.filter('errorsMap', errorsMap);
	Vue.filter('date', date);
	Vue.filter('toFixed', toFixed);
	Vue.component('FormButton', FormButton);
	Vue.component('FormInput', FormInput);
	Vue.component('FormDropdown', FormDropdown);
	Vue.component('FormDatepicker', FormDatepicker);
	Vue.component('LoadingIndicator', LoadingIndicator);

	export default {
		data() {
			return {
				appIsReady: false
			};
		},
		created() {
			Promise.all([
				this.getUserSession(),
				this.getUnits()
			]).then(() => {
				this.appIsReady = true;
			}).catch(() => {
				this.$toasted.global.apiError({
					message: 'Failed to initialize the application'
				});
			});
		},
		methods: {
			...mapActions('auth', [
				'getUserSession'
			]),
			...mapActions('measurements', [
				'getUnits'
			])
		}
	};
</script>

<style lang="scss">
	@import '~bootstrap/scss/bootstrap';

	body {
		background: $background;
		background-size: cover;
		color: $text-color;
		font-family: $font-family;
		font-size: $font-size;

		&.modal-open {
			padding-right: 0px !important;
		}

		:focus {
			outline:none;
		}

		::-moz-focus-inner {
			border: 0;
		}

		button:focus {
			outline: none;
		}

		label {
			font-weight: normal;
		}

		.toasted {
			&.toasted-primary {
				padding: 15px;
			}

			> svg:first-child {
				margin-right: 10px;
			}
		}
	}

	#app {
		.main-wrapper {
			margin-top: 15px;
			margin-bottom: 15px;
			padding: 0px;
			background-color: $white;
			border-radius: 5px;
			box-shadow: 0px 0px 11px 3px $gray-darker;

			.view-wrapper {
				padding: 10px;
			}

			@include media-breakpoint-down(xs) {
				margin-top: 0px;
				border-radius: 0px;
			}
		}
	}
</style>
