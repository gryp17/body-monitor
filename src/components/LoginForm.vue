<template>
	<div class="login-form">
		<FormInput
			v-model="email"
			:error="errors.email"
			@keyup.enter="submit"
			@keyup="clearError"
			@focus="clearError"
			type="text"
			name="email"
			floating-label
			placeholder="Имейл"
		></FormInput>

		<FormInput
			v-model="password"
			:error="errors.password"
			@keyup.enter="submit"
			@keyup="clearError"
			@focus="clearError"
			type="password"
			name="password"
			floating-label
			placeholder="Парола"
		></FormInput>

		<FormButton
			:disabled="submitting"
			@click="submit">
			Влез
		</FormButton>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'login';

	export default {
		data() {
			return {
				email: '',
				password: '',
				submitting: false
			};
		},
		computed: {
			...mapState('forms', {
				errors: (state) => state.errors[formName]
			})
		},
		created() {
			this.resetFormErrors(formName);
		},
		methods: {
			...mapActions('auth', [
				'login'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			/**
			 * Submits the form data
			 */
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				const params = {
					email: this.email,
					password: this.password
				};

				this.login(params).then((res) => {
					const data = res.data;

					if (data.id) {
						this.$router.push({
							name: 'dashboard'
						});
					} else if (data.error) {
						this.setFormError({
							...data.error,
							form: formName
						});
					}

					this.submitting = false;
				});
			},
			/**
			 * Clears the form error related to this input
			 * @param {Object} e
			 */
			clearError(e) {
				const field = e.target.name;
				this.clearFormError({
					form: formName,
					field
				});
			}
		}
	};
</script>

<style lang="scss">
	.login-form {
		.form-button {
			display: block;
			margin: auto;
			margin-top: 20px;
		}
	}
</style>
