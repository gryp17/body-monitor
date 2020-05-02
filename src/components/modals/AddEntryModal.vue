<template>
	<div class="add-entry-modal">

		<BaseModal :visible="visible" @hidden="hideAddEntryModal">
			<template v-slot:header>
				<h5 class="modal-title">
					Добави данни
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<div class="form-wrapper">

					<FormDropdown
						v-model="measurementId"
						:options="measurementOptions"
						:error="errors.measurementId"
						@focus="clearError"
						name="measurementId"
					/>

					<FormDatepicker
						v-model="date"
						:error="errors.date"
						@focus="clearError"
						name="date"
						floating-label
						placeholder="Дата"
					/>

					<FormInput
						v-model="value"
						:placeholder="valueFieldPlaceholder"
						:error="errors.value"
						@focus="clearError"
						type="text"
						name="value"
						floating-label
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
	import { mapState, mapActions } from 'vuex';
	import BaseModal from '@/components/modals/BaseModal';

	const formName = 'addEntry';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {
				measurementId: null,
				date: new Date(),
				value: '',
				submitting: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'addEntryModalOpened'
			}),
			...mapState('forms', {
				errors: (state) => state.errors[formName]
			}),
			...mapState('measurements', [
				'measurements'
			]),
			measurementOptions() {
				const options = {};
				this.measurements.forEach((measurement) => {
					options[measurement.id] = measurement.name;
				});

				return options;
			},
			valueFieldPlaceholder() {
				//TODO: fix this
				if (!this.measurements || this.measurements.length === 0 || !this.measurementId) {
					return 'Стойност';
				}

				const unit = this.measurements.find((measurement) => {
					return measurement.id === this.measurementId;
				}).unit_id;

				return `Стойност (${unit})`;
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
				'hideAddEntryModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			...mapActions('measurements', [
				'addMeasurementEntry'
			]),
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				const params = {
					measurementId: this.measurementId,
					date: this.$options.filters.date(this.date, 'YYYY-MM-DD HH:mm:ss'),
					value: this.value
				};

				this.addMeasurementEntry(params).then((res) => {
					const data = res.data;

					if (data.success) {
						this.hideAddEntryModal();
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
				this.measurementId = this.measurements[0].id;
			}
		}
	};
</script>

<style lang="scss">
	.add-entry-modal {
		$max-width: 650px;

		.modal-dialog {
			max-width: $max-width;
			text-align: left;
		}

		.modal-body {
			padding-top: 30px;
		}

		.form-wrapper {
			display: flex;

			.form-input, .form-dropdown, .form-datepicker {
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

				.form-input, .form-dropdown, .form-datepicker {
					margin-right: 0px;
				}
			}
		}
	}
</style>
