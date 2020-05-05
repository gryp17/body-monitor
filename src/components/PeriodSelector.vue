<template>
	<div class="period-selector">
		<div class="btn-group btn-group-toggle" data-toggle="buttons">
			<label
				v-for="(label, period) in periods"
				:key="period"
				:class="['btn btn-secondary', {active: period === value}]"
				@click="onSelect(period)"
			>
				<input type="radio" name="period-option" :checked="period === value">
				{{ label }}
			</label>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			value: String
		},
		data() {
			return {
				periods: {
					year: 'Година',
					month: 'Месец',
					week: 'Седмица'
				}
			};
		},
		methods: {
			onSelect(period) {
				this.$emit('input', period);
			}
		}
	};
</script>

<style lang="scss">
	.period-selector {
		margin: auto;
		margin-bottom: 40px;
		width: 60%;

		.btn-group {
			display: flex;

			.btn {
				margin-left: 0px;
				box-shadow: none;

				&:nth-child(2) {
					margin: 0px 1px;
				}
			}
		}

		@include media-breakpoint-down(sm) {
			width: 100%;
		}
	}
</style>
