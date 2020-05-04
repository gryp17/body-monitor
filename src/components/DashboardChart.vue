<template>
	<div class="dashboard-chart">
		<PeriodSelector v-model="selectedPeriod" />

		<LineChart :chart-data="chartData" :options="chartOptions" />
	</div>
</template>

<script>
	import Vue from 'vue';
	import moment from 'moment';
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
				selectedPeriod: 'week'
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
			minDate() {
				const currentDate = moment();
				return currentDate.subtract(1, this.selectedPeriod);
			},
			groupedMeasurementData() {
				const measurements = {};

				this.entries.forEach((entry) => {
					if (!measurements[entry.measurement_id]) {
						measurements[entry.measurement_id] = [];
					}

					if (moment(entry.date).isBefore(this.minDate)) {
						return;
					}

					measurements[entry.measurement_id].push(entry);
				});

				return measurements;
			},
			chartOptions() {
				return {
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
						}],
						xAxes: [{
							type: 'time',
							distribution: 'series', //linear, series?
							ticks: {
								source: 'data',
								callback(label, index, labels) {
									//TODO: use the 'MMMM' format only when grouping by months
									//return Vue.options.filters.date(label, 'MMMM');
									return Vue.options.filters.date(label, 'YYYY-MM-DD');
								}
							},
							time: {
								displayFormats: {
									day: 'YYYY-MM-DD',
									month: 'MMMM'
								},
								tooltipFormat: 'YYYY-MM-DD'
							}
						}]
					}
				};
			},
			chartData() {
				const chartData = {
					datasets: []
				};

				Object.keys(this.groupedMeasurementData).forEach((measurementId, index) => {
					const entries = this.groupedMeasurementData[measurementId];
					const color = this.measurementColor(index);

					const dataSet = {
						label: `${this.measurementName(measurementId)} (${this.measurementUnit(measurementId)})`,
						backgroundColor: color,
						borderColor: color,
						fill: false,
						data: entries.map((entry) => {
							return {
								x: this.$options.filters.date(entry.date, 'YYYY-MM-DD'),
								y: entry.value
							};
						})
					};

					chartData.datasets.push(dataSet);
				});

				return chartData;
			}
		},
		methods: {
			measurementName(id) {
				if (!this.measurementsMap[id]) {
					return;
				}
				return this.measurementsMap[id].name;
			},
			measurementUnit(id) {
				if (!this.measurementsMap[id]) {
					return;
				}
				return this.measurementsMap[id].unit;
			},
			measurementColor(index) {
				const colors = [
					'#e53935',
					'#1E88E5',
					'#43A047',
					'#8E24AA',
					'#00ACC1',
					'#FFA726',
					'#F06292',
					'#00897B',
					'#CDDC39',
					'#BA68C8'
				];

				return colors[index % colors.length];
			},
			groupByMonth(entries) {
				const grouped = {};

				entries.forEach((entry) => {
					const date = this.$options.filters.date(entry.date, 'YYYY-MM');
					grouped[date] = entry;
				});

				return Object.values(grouped);
			}
		}
	};
</script>
