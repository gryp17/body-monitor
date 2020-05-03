<template>
	<div class="dashboard-chart">
		<FormDropdown
			v-model="measurementId"
			:options="measurementOptions"
		/>

		<LineChart :chart-data="chartData" :options="options" />
	</div>
</template>

<script>
	import LineChart from '@/components/LineChart';
	import { mapState, mapGetters } from 'vuex';

	export default {
		components: {
			LineChart
		},
		data() {
			return {
				measurementId: null,
				options: {
					maintainAspectRatio: false,
					spanGaps: false,
					elements: {
						line: {
							tension: 0.000001
						}
					}
				}
			};
		},
		computed: {
			...mapState('measurements', [
				'measurements',
				'entries'
			]),
			...mapGetters('measurements', [
				'measurementsMap'
			]),
			measurementOptions() {
				const options = {};
				this.measurements.forEach((measurement) => {
					options[measurement.id] = measurement.name;
				});

				return options;
			},
			measurementName() {
				if (!this.measurementsMap[this.measurementId]) {
					return;
				}
				return this.measurementsMap[this.measurementId].name;
			},
			measurementUnit() {
				if (!this.measurementsMap[this.measurementId]) {
					return;
				}
				return this.measurementsMap[this.measurementId].unit;
			},
			chartData() {
				if (!this.measurementId) {
					return {};
				}

				const chartData = {
					labels: [],
					datasets: [{
						label: 'Dataset label',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: [],
						fill: false
					}]
				};

				const labels = [];
				const data = [];

				this.entries.forEach((entry) => {
					if (entry.measurement_id === parseInt(this.measurementId)) {
						const date = this.$options.filters.date(entry.date, 'YYYY-MM-DD');
						labels.push(date);
						data.push(entry.value);
					}
				});

				chartData.labels = labels;
				chartData.datasets[0].data = data;
				chartData.datasets[0].label = `${this.measurementName} (${this.measurementUnit})`;

				return chartData;
			}
		},
		created() {
			this.measurementId = this.measurements[0].id;
		}
	};
</script>
