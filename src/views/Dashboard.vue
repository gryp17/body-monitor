<template>
	<div class="dashboard-page">
		<LoadingIndicator v-if="loading" />
		<template v-else>
			<!-- TODO: maybe check for entries as well -->
			<div v-if="!measurements || measurements.length === 0" class="no-measurements">
				Няма добавени мерки.
			</div>
			<TabsNav v-else flex>
				<template v-slot:items>
					<li class="nav-item">
						<a
							class="nav-link active"
							id="chart-tab"
							data-toggle="tab"
							href="#chart"
							role="tab"
							aria-controls="chart"
							aria-selected="true"
						>
							Графика
						</a>
					</li>
					<li class="nav-item">
						<a
							class="nav-link"
							id="table-tab"
							data-toggle="tab"
							href="#table"
							role="tab"
							aria-controls="table"
							aria-selected="true"
						>
							Таблица
						</a>
					</li>
				</template>
				<template v-slot:content>
					<div class="tab-pane fade show active" id="chart" role="tabpanel" aria-labelledby="chart-tab">
						<DashboardChart />
					</div>
					<div class="tab-pane fade" id="table" role="tabpanel" aria-labelledby="table-tab">
						table goes here
					</div>
				</template>
			</TabsNav>

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
	import TabsNav from '@/components/TabsNav';
	import DashboardChart from '@/components/DashboardChart';

	export default {
		components: {
			AddMeasurementModal,
			AddEntryModal,
			TabsNav,
			DashboardChart
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
