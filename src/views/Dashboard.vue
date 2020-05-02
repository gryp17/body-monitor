<template>
	<div class="dashboard-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			content
		</template>
	</div>
</template>

<script>
	//import { mapState, mapActions } from 'vuex';


	export default {
		data() {
			return {
				loading: true
			};
		},
		created() {
			setTimeout(() => {
				this.loading = false;
			}, 3000);
		}
	};
</script>

<style scoped lang="scss">

</style>
