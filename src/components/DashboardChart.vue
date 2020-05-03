<template>
	<div class="dashboard-chart">
		<FormDropdown
			v-model="measurementId"
			:options="measurementOptions"
		/>

		<PeriodSelector v-model="selectedPeriod" />

		<button @click="prevPage">
			Prev page
		</button>

		<button @click="nextPage">
			Next page
		</button>

		<LineChart :chart-data="chartData" :options="options" />
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import moment from 'moment';
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
				selectedPeriod: 'week',
				minDate: moment(),
				maxDate: moment(),
				page: 0,
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

				console.log(this.minDate.toDate());
				console.log(this.maxDate.toDate());

				this.entries.forEach((entry) => {
					if (entry.measurement_id === parseInt(this.measurementId)) {
						const date = this.$options.filters.date(entry.date, 'YYYY-MM-DD');

						if (moment(entry.date).isBetween(this.minDate, this.maxDate, 'day', '(]')) {
							labels.push(date);
							data.push(entry.value);
						}
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
			this.goToPage(0);
		},
		methods: {
			prevPage() {
				this.goToPage(this.page + 1);
			},
			nextPage() {
				if (this.page !== 0) {
					this.goToPage(this.page - 1);
				}
			},
			goToPage(page) {
				console.log('PAGE --- ', page);
				this.page = page;

				//TODO: this needs to paginate by entries and not by dates because there could be a lot of empty dates

				if (this.selectedPeriod === 'week') {
					this.maxDate = moment().subtract(this.page * 7, 'days');
					this.minDate = this.maxDate.clone().subtract(7, 'days');
				}
			}
		}
	};
</script>
