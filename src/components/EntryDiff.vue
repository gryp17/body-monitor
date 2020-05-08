<template>
	<div :class="['entry-diff', diffType]">
		<span v-if="showArrow">
			<i class="fas fa-caret-down"></i>
		</span>
		{{ absoluteDiff }}
		{{ unit }}
	</div>
</template>

<script>
	export default {
		props: {
			diff: {
				type: Number,
				default: 0
			},
			unit: String
		},
		computed: {
			diffType() {
				if (this.diff === 0) {
					return;
				}

				return this.diff > 0 ? 'positive' : 'negative';
			},
			absoluteDiff() {
				return Math.abs(this.diff);
			},
			showArrow() {
				return this.absoluteDiff !== 0;
			}
		}
	};
</script>

<style lang="scss">
	.entry-diff {
		display: flex;
		align-items: center;

		svg {
			margin-right: 5px;
			font-size: 24px;
			vertical-align: top;
		}

		&.positive {
			color: $red;

			svg {
				transform: rotate(180deg);
			}
		}

		&.negative {
			color: $green;
		}
	}
</style>
