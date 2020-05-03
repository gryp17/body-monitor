<template>
	<div class="add-measurement-modal">

		<BaseModal :visible="visible" @hidden="hideAddMeasurementModal">
			<template v-slot:header>
				<h5 class="modal-title">
					Добави мерки
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<div class="form-wrapper">
					<FormInput
						v-model="name"
						:error="errors.name"
						@focus="clearError"
						type="text"
						name="name"
						floating-label
						placeholder="Име (тегло, обиколка...)"
					/>
					<FormDropdown
						v-model="type"
						:options="unitTypes"
						:error="errors.type"
						@focus="clearError"
						name="type"
					/>
					<FormButton
						:disabled="submitting"
						@click="submit">
						Добави
					</FormButton>
				</div>

			</template>
		</BaseModal>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	const formName = 'addMeasurement';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {
				name: '',
				type: 0,
				submitting: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'addMeasurementModalOpened'
			}),
			...mapState('forms', {
				errors: (state) => state.errors[formName]
			}),
			...mapGetters('measurements', [
				'unitsMap'
			]),
			unitTypes() {
				const types = {
					0: 'Мерна единица',
					...this.unitsMap
				};

				return types;
			}
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible(value) {
				this.resetState();
				this.resetFormErrors(formName);
			}
		},
		methods: {
			...mapActions('modals', [
				'hideAddMeasurementModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('measurements', [
				'addMeasurement'
			]),
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				const params = {
					name: this.name,
					type: this.type
				};

				this.addMeasurement(params).then((res) => {
					const data = res.data;

					if (data.success) {
						this.hideAddMeasurementModal();
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
			},
			/**
			 * Resets the data/state back to it's default/initial value
			 */
			resetState() {
				Object.assign(this.$data, this.$options.data.call(this));
			}
		}
	};
</script>

<style lang="scss">
	.add-measurement-modal {
		$max-width: 600px;

		.modal-dialog {
			max-width: $max-width;
			text-align: left;
		}

		.modal-body {
			padding-top: 30px;
		}

		.form-wrapper {
			display: flex;

			.form-input, .form-dropdown {
				flex: 1;
				margin-right: 5px;
			}

			.form-button {
				margin-bottom: 16px;
			}
		}

		@include media-breakpoint-down(sm) {
			.form-wrapper {
				flex-direction: column;

				.form-input, .form-dropdown {
					margin-right: 0px;
				}
			}
		}
	}
</style>
