<template>
	<div class="signup-form">
		<FormInput
			v-model="email"
			:error="errors.email"
			@focus="clearError"
			type="text"
			name="email"
			floating-label
			placeholder="Имейл"
		></FormInput>

		<FormInput
			v-model="password"
			:error="errors.password"
			@focus="clearError"
			type="password"
			name="password"
			floating-label
			placeholder="Парола"
		></FormInput>

		<FormInput
			v-model="repeatPassword"
			:error="errors.repeatPassword"
			@focus="clearError"
			type="password"
			name="repeatPassword"
			floating-label
			placeholder="Повтори паролата"
		></FormInput>

		<FormButton
			:disabled="submitting"
			@click="submit">
			Регистрирай се
		</FormButton>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	const formName = 'signup';

	export default {
		data() {
			return {
				email: '',
				password: '',
				repeatPassword: '',
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
				'signup'
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
					password: this.password,
					repeatPassword: this.repeatPassword
				};

				this.signup(params).then((res) => {
					const data = res.data;

					if (data.user) {
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
	.signup-form {
		.form-button {
			display: block;
			margin: auto;
			margin-top: 20px;
		}
	}
</style>
