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
				'measurementsMap',
				'groupedEntries'
			]),
			minDate() {
				const currentDate = moment();
				return currentDate.subtract(1, this.selectedPeriod);
			},
			groupedMeasurementData() {
				const measurements = { ...this.groupedEntries };

				Object.keys(measurements).forEach((measurementId) => {
					//filter the entries by the min date
					const entries = measurements[measurementId].filter((entry) => {
						return moment(entry.date).isAfter(this.minDate); //isBefore
					});

					//group the entries by month if necessary
					measurements[measurementId] = this.selectedPeriod === 'year' ? this.groupByMonth(entries) : entries;
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
								callback: this.mapLabels
							},
							time: {
								displayFormats: {
									day: 'YYYY-MM-DD',
									week: 'YYYY-MM-DD',
									month: 'YYYY-MM-DD',
									quarter: 'YYYY-MM-DD',
									year: 'YYYY-MM-DD'
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
						pointBackgroundColor: color,
						pointBorderWidth: 5,
						pointHoverBorderWidth: 5,
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
			mapLabels(label, index, labels) {
				const formats = {
					week: 'D MMMM (dd)',
					month: 'D MMMM',
					year: 'MMMM (YYYY)'
				};

				return Vue.options.filters.date(label, formats[this.selectedPeriod]);
			},
			/**
			 * Groups/filters the entries by year-month taking the latest entry for each month
			 * @param {Array} entries
			 * @returns {Array}
			 */
			groupByMonth(entries) {
				const grouped = {};

				entries.forEach((entry) => {
					const date = this.$options.filters.date(entry.date, 'YYYY-MM');

					grouped[date] = {
						...entry,
						//change the day to the last day of the month in order not to confuse chartjs when grouping by month
						date: moment(entry.date).endOf('month').format('YYYY-MM-DD')
					};
				});

				return Object.values(grouped);
			}
		}
	};
</script>
