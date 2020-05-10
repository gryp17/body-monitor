<template>
	<div class="add-entry-modal">

		<BaseModal :visible="visible" @hidden="hideAddEntryModal">
			<template v-slot:header>
				<h5 class="modal-title">
					Добави запис
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</template>
			<template v-slot:body>

				<div class="form-wrapper">

					<div class="datepicker-wrapper">
						<i class="far fa-calendar-alt"></i>
						<FormDatepicker
							v-model="date"
							:error="errors.date"
							@focus="clearError"
							name="date"
							floating-label
							placeholder="Дата"
						/>
					</div>

					<hr />

					<FormInput
						v-for="measurement in measurements"
						:key="measurement.id"
						v-model="values[measurement.id]"
						:name="measurement.id + ''"
						:placeholder="fieldPlaceholder(measurement)"
						:error="errors[measurement.id]"
						@focus="clearError"
						type="text"
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
	import { mapState, mapGetters, mapActions } from 'vuex';
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
				values: {},
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
			...mapGetters('measurements', [
				'measurementsMap'
			]),
			valueFieldPlaceholder() {
				if (!this.measurements || this.measurements.length === 0 || !this.measurementId) {
					return 'Стойност';
				}

				const unit = this.measurementsMap[this.measurementId].unit;

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
				'addMeasurementEntries'
			]),
			/**
			 * Builds the measurement placeholder
			 * @param {Object} measurement
			 * @returns {String}
			 */
			fieldPlaceholder(measurement) {
				const unit = this.measurementsMap[measurement.id].unit;
				return `${measurement.name} (${unit})`;
			},
			/**
			 * Submits the form data
			 */
			submit() {
				if (this.submitting) {
					return;
				}

				this.submitting = true;

				const params = {
					date: this.$options.filters.date(this.date, 'YYYY-MM-DD HH:mm:ss'),
					values: this.values
				};

				this.addMeasurementEntries(params).then((res) => {
					const data = res.data;

					if (data.entries) {
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
		$max-width: 450px;

		.modal-dialog {
			max-width: $max-width;
			text-align: left;
		}

		.modal-body {
			padding-top: 30px;
		}

		.form-wrapper {
			.datepicker-wrapper {
				display: flex;

				svg {
					margin: 10px 10px 0px 0px;
					font-size: 23px;
				}

				.form-datepicker {
					flex: 1;
					margin-bottom: 0px;
				}
			}

			.form-button {
				display: block;
				margin: auto;
			}
		}

		@include media-breakpoint-down(xs) {
			.modal-dialog {
				max-width: 100%;
			}
		}
	}
</style>
