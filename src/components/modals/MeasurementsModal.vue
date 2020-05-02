<template>
	<div class="measurements-modal">

		<BaseModal :visible="visible" @hidden="hideMeasurementsModal">
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
						type="text"
						floating-label
						placeholder="Име (тегло, обиколка...)"
					/>
					<FormDropdown
						v-model="type"
						:options="types"
					/>
					<FormButton>
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

	//const formName = 'signup';

	export default {
		components: {
			BaseModal
		},
		data() {
			return {
				name: '',
				type: 'aa',
				types: {
					aa: 'Избери',
					bb: 'test',
					cc: 'bla'
				},
				submitting: false
			};
		},
		computed: {
			...mapState('modals', {
				visible: 'measurementsModalOpened'
			})
		},
		watch: {
			/**
			 * Watches the visible status and resets the data/state/errors
			 */
			visible(value) {
				this.resetState();
				//this.resetFormErrors(formName);
			}
		},
		methods: {
			...mapActions('modals', [
				'hideMeasurementsModal'
			]),
			...mapActions('forms', [
				'setFormError',
				'clearFormError',
				'resetFormErrors'
			]),
			submit() {

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
	.measurements-modal {
		$max-width: 600px;

		.modal-dialog {
			max-width: $max-width;
			text-align: left;
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
