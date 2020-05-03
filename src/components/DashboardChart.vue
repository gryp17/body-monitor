<template>
	<div class="dashboard-chart">
		<FormDropdown
			v-model="measurementId"
			:options="measurementOptions"
		/>

		<PeriodSelector v-model="selectedPeriod" />

		<FormButton :disabled="totalPages === 0 || page === totalPages" @click="prevPage">
			Prev page
		</FormButton>

		<FormButton :disabled="totalPages === 0 || page === 1" @click="nextPage">
			Next page
		</FormButton>

		<LineChart :chart-data="chartData" :options="options" />
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import LineChart from '@/components/LineChart';
	import PeriodSelector from '@/components/PeriodSelector';

	export default {
		components: {
			LineChart,
			PeriodSelector
		},
		data() {
			return {
				measurementId: null,
				selectedPeriod: 'days',
				page: 1,
				options: {
					maintainAspectRatio: false,
					spanGaps: false,
					elements: {
						line: {
							tension: 0.000001
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			};
		},
		watch: {
			measurementId() {
				this.selectedPeriod = 'days';
				this.goToPage(1);
			},
			selectedPeriod() {
				this.goToPage(1);
			}
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
			perPage() {
				return this.selectedPeriod === 'days' ? 7 : 12;
			},
			selectedMeasurementData() {
				if (!this.measurementId) {
					return [];
				}

				const filtered = this.entries.filter((entry) => {
					return entry.measurement_id === parseInt(this.measurementId);
				});

				if (this.selectedPeriod === 'months') {
					return this.groupByMonth(filtered);
				}

				return filtered;
			},
			totalPages() {
				return Math.ceil(this.selectedMeasurementData.length / this.perPage);
			},
			chartData() {
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

				const filteredData = [...this.selectedMeasurementData];

				filteredData
					.reverse()
					.slice((this.page - 1) * this.perPage, this.page * this.perPage)
					.reverse()
					.forEach((entry) => {
						const format = this.selectedPeriod === 'days' ? 'YYYY-MM-DD' : 'MMMM - YYYY';
						const date = this.$options.filters.date(entry.date, format);
						labels.push(date);
						data.push(entry.value);
					});

				chartData.labels = labels;
				chartData.datasets[0].data = data;
				chartData.datasets[0].label = `${this.measurementName} (${this.measurementUnit})`;

				return chartData;
			}
		},
		created() {
			this.measurementId = this.measurements[0].id;
			this.goToPage(1);
		},
		methods: {
			groupByMonth(entries) {
				const grouped = {};

				entries.forEach((entry) => {
					const date = this.$options.filters.date(entry.date, 'YYYY-MM');
					grouped[date] = entry;
				});

				return Object.values(grouped);
			},
			prevPage() {
				this.goToPage(this.page + 1);
			},
			nextPage() {
				this.goToPage(this.page - 1);
			},
			goToPage(page) {
				this.page = page;
			}
		}
	};
</script>
