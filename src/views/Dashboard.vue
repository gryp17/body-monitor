<template>
	<div class="dashboard-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			content

			{{ units }}
			<hr />
			{{ measurements }}
		</template>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';


	export default {
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('measurements', [
				'units',
				'measurements'
			])
		},
		created() {
			this.getMeasurements().then(() => {
				this.loading = false;
			});
		},
		methods: {
			...mapActions('measurements', [
				'getMeasurements'
			])
		}
	};
</script>

<style scoped lang="scss">

</style>
