<template>
	<div :class="['tabs-nav', {flex: flex}]">
		<ul class="nav nav-tabs nav-fill" role="tablist">
			<slot name="items"></slot>
		</ul>

		<div class="tab-content">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			flex: {
				type: Boolean,
				default: false
			}
		}
	};
</script>

<style scoped lang="scss">
	.tabs-nav {
		.nav-item {
			.nav-link {
				color: $text-color;

				&.active {
					color: $blue;
				}
			}
		}

		&.flex {
			.nav-item {
				flex: 1;
			}
		}
	}
</style>
