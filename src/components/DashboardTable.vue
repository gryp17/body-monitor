<template>
	<div class="dashboard-table">
		<FormDropdown
			v-model="measurementId"
			:options="measurementOptions"
		/>

		<table class="table">
			<thead>
				<tr>
					<th scope="col">
						Дата
					</th>
					<th scope="col">
						Стойност
					</th>
					<th scope="col">
						Разлика
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="entry in entries" :key="entry.id">
					<td>
						{{ entry.date | date('YYYY-MM-DD') }}
					</td>
					<td>
						{{ entry.value }}
						{{ measurementUnit }}
					</td>
					<td>
						dif
						{{ measurementUnit }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';

	export default {
		data() {
			return {
				measurementId: null
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
			measurementOptions() {
				const options = {};
				this.measurements.forEach((measurement) => {
					options[measurement.id] = measurement.name;
				});
				return options;
			},
			measurementUnit() {
				if (!this.measurementId) {
					return;
				}
				return this.measurementsMap[this.measurementId].unit;
			},
			entries() {
				const entries = [...this.groupedEntries[this.measurementId]].reverse();
				return entries;
			}
		},
		created() {
			this.measurementId = this.measurements[0].id;
			//this.goToPage(1);
		}
	};
</script>

<style lang="scss">
	.dashboard-table {
		.form-dropdown {
			margin: 40px auto;
			width: 40%;
		}

		@include media-breakpoint-down(sm) {
			.form-dropdown {
				width: 100%;
			}
		}
	}
</style>
