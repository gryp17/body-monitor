<template>
	<div class="form-dropdown form-group">
		<label v-if="label">
			{{ label }}
		</label>

		<div class="form-dropdown-wrapper">
			<select
				:value="value"
				:name="name"
				:class="{'has-error': error}"
				v-on="{
					...$listeners,
					input: onInput
				}"
			>
				<option
					v-for="(optionLabel, key) in options"
					:key="key"
					:value="key"
				>
					{{ optionLabel }}
				</option>
			</select>
		</div>

		<FormInputError>
			{{ error }}
		</FormInputError>
	</div>
</template>

<script>
	import FormInputError from '@/components/forms/FormInputError';

	export default {
		components: {
			FormInputError
		},
		props: {
			label: String,
			options: Object,
			value: [String, Number],
			name: String,
			error: String
		},
		methods: {
			/**
			 * Propagates the "input" event back to the parent (needed because of v-model)
			 * @param {Object} e
			*/
			onInput(e) {
				this.$emit('input', e.target.value);
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-dropdown {
		display: block;

		.form-dropdown-wrapper {
			position: relative;

			&:after {
				position: absolute;
				content: '';
				width: 14px;
				height: 14px;
				padding: 0 0 2px;
				background: url('../../assets/img/arrow.png');
				background-size: 100%;
				transform: rotate(90deg);
				filter: brightness(30%);
				right: 10px;
				top: 14px;
				pointer-events: none;
			}

			select {
				display: block;
				width: 100%;
				padding: 10px 30px 9px 5px;
				border-radius: 2px;
				border: 1px solid $gray;
				color: $text-color;
				background-color: $gray-lighter;
				appearance: none;
				outline: none;

				&.has-error {
					border-color: $red;
				}
			}
		}
	}
</style>
