<template>
	<div class="dashboard-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			<div v-if="!measurements || measurements.length === 0" class="no-measurements">
				Няма добавени мерки.
			</div>

			{{ units }}
			<hr />

			<FormButton @click="showMeasurementsModal">
				Добави мерки
			</FormButton>

			<FormButton>
				Добави данни
			</FormButton>
		</template>

		<MeasurementsModal />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import MeasurementsModal from '@/components/modals/MeasurementsModal';

	export default {
		components: {
			MeasurementsModal
		},
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
			]),
			...mapActions('modals', [
				'showMeasurementsModal'
			])
		}
	};
</script>

<style scoped lang="scss">
	.dashboard-page {
		.no-measurements {
			text-align: center;
			font-size: 20px;
			font-weight: bold;
		}
	}
</style>
