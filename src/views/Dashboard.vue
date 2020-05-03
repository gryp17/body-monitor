<template>
	<div class="dashboard-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			<div v-if="!measurements || measurements.length === 0" class="no-measurements">
				Няма добавени мерки.
			</div>

			{{ entries }}
			<hr />

			<FormButton @click="showAddMeasurementModal">
				Добави мерки
			</FormButton>

			<FormButton v-show="measurements && measurements.length > 0" @click="showAddEntryModal">
				Добави данни
			</FormButton>
		</template>

		<AddMeasurementModal />
		<AddEntryModal />
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import AddMeasurementModal from '@/components/modals/AddMeasurementModal';
	import AddEntryModal from '@/components/modals/AddEntryModal';

	export default {
		components: {
			AddMeasurementModal,
			AddEntryModal
		},
		data() {
			return {
				loading: true
			};
		},
		computed: {
			...mapState('measurements', [
				'units',
				'measurements',
				'entries'
			])
		},
		created() {
			Promise.all([
				this.getMeasurements(),
				this.getMeasurementEntries()
			]).then(() => {
				this.loading = false;
			});
		},
		methods: {
			...mapActions('measurements', [
				'getMeasurements',
				'getMeasurementEntries'
			]),
			...mapActions('modals', [
				'showAddMeasurementModal',
				'showAddEntryModal'
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
