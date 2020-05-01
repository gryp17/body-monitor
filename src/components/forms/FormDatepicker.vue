<template>
	<div class="form-datepicker">
		<FormFloatingLabel :visible="showLabel">
			{{ placeholder }}
		</FormFloatingLabel>
		<Datepicker
			:value="value"
			:name="name"
			:placeholder="placeholder"
			:language="language"
			:disabled-dates="disabledDates"
			:full-month-name="true"
			:monday-first="true"
			:format="format"
			:input-class="['form-control', {'has-error': error}]"
			v-on="{
				...$listeners,
				input: onInput
			}"
			ref="datepicker"
		/>

		<FormInputError>
			{{ error }}
		</FormInputError>
	</div>
</template>

<script>
	import $ from 'jquery';
	import Datepicker from 'vuejs-datepicker';
	import { bg } from 'vuejs-datepicker/dist/locale';
	import FormFloatingLabel from '@/components/forms/FormFloatingLabel';
	import FormInputError from '@/components/forms/FormInputError';

	let input;

	export default {
		components: {
			Datepicker,
			FormFloatingLabel,
			FormInputError
		},
		props: {
			value: Date,
			name: String,
			floatingLabel: Boolean,
			placeholder: String,
			error: String,
			format: {
				type: String,
				default: 'dd MMMM yyyy'
			},
			disabledDates: {
				type: Object,
				//disable all future dates by default
				default: () => {
					return {
						from: new Date()
					};
				}
			}
		},
		data() {
			return {
				focused: false
			};
		},
		computed: {
			language() {
				return bg;
			},
			showLabel() {
				return this.floatingLabel && this.focused && this.value;
			}
		},
		mounted() {
			//need to manually bind/unbind focus and blur because vuejs-datepicker doesn't provide a working focus event...
			input = $(this.$refs.datepicker.$el).find('input');
			input.on('focus', this.onFocus);
			input.on('blur', this.onBlur);
		},
		destroyed() {
			input.off('focus', this.onFocus);
			input.off('blur', this.onBlur);
		},
		methods: {
			/**
			 * Propagates the "input" event back to the parent (needed because of v-model)
			 * @param {Object} e
			*/
			onInput(selectedDate) {
				this.$emit('input', selectedDate);
			},
			/**
			 * Intercepts the focus event and updates the focused parameter
			 * @param {Object} e
			 */
			onFocus(e) {
				this.focused = true;

				//call the passed focus event (if provided)
				if (this.$listeners.focus) {
					this.$listeners.focus(e);
				}
			},
			/**
			 * Intercepts the blur event and updates the focused parameter
			 * @param {Object} e
			 */
			onBlur(e) {
				this.focused = false;

				//call the passed blur event (if provided)
				if (this.$listeners.blur) {
					this.$listeners.blur(e);
				}
			}
		}
	};
</script>

<style lang="scss">
	.form-datepicker {
		position: relative;
		margin-bottom: 16px;

		.form-control {
			padding: 20px 10px;
			border-radius: 0px;
			background-color: $gray;
			border-color: transparent;
			font-size: inherit;

			&.has-error {
				border-color: $red;
			}

			&:focus {
				box-shadow: none;
				border-color: $blue-lighter;
			}
		}
	}
</style>
