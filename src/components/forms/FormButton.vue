<template>
	<button
		:class="['form-button', {outline, transparent}, className]"
		:type="type"
		v-on="{
			...$listeners
		}"
	>
		<slot>Click me</slot>
	</button>
</template>

<script>
	export default {
		props: {
			className: String,
			type: {
				type: String,
				default: 'button'
			},
			outline: {
				type: Boolean,
				default: false
			},
			transparent: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style scoped lang="scss">
	.form-button {
		padding: 6px 20px;
		border: solid 1px transparent;
		background-color: $red;
		color: $white;
		transition: all 0.4s ease-in-out;
		font-size: 16px;

		&:hover, &:active, &:focus, &.active {
			background-color: darken($red, 15%);
		}

		&:disabled {
			background-color: lighten($red, 15%);
			cursor: not-allowed;

			&:hover {
				background-color: lighten($red, 15%);
			}
		}

		&.outline {
			background-color: $white;
			color: $red;
			border: solid 1px $red;

			&:hover, &:active, &:focus, &.active {
				background-color: $red;
				color: $white;
			}
		}

		&.transparent {
			padding: 0px 10px;
			background-color: transparent;
			color: $blue;

			&:hover, &:active, &:focus, &.active {
				background-color: transparent;
				color: $red;
			}
		}

		> svg {
			margin-right: 3px;
		}
	}
</style>
