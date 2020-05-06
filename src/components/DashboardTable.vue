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
					<th scope="col">
						Изтрий
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
						<EntryDiff :diff="entry.diff" :unit="measurementUnit" />
					</td>
					<td>
						<FormButton
							transparent
							@click="deleteEntry(entry.id)"
							class="delete-btn"
						>
							<i class="fas fa-times"></i>
						</FormButton>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	import EntryDiff from '@/components/EntryDiff';

	export default {
		components: {
			EntryDiff
		},
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
				const measurementEntries = [...this.groupedEntries[this.measurementId]].reverse();
				const entries = measurementEntries.map((entry, index) => {
					const prevEntry = measurementEntries[index + 1];

					if (prevEntry) {
						const diff = (entry.value - prevEntry.value);
						entry.diff = this.$options.filters.toFixed(diff, 1);
					}

					return entry;
				});
				return entries;
			}
		},
		created() {
			this.measurementId = this.measurements[0].id;
			//this.goToPage(1);
		},
		methods: {
			deleteEntry(id) {
				//TODO: implement
				console.log('DELETE ', id);
			}
		}
	};
</script>

<style lang="scss">
	.dashboard-table {
		.form-dropdown {
			margin: 40px auto;
			width: 40%;
		}

		.form-button.delete-btn {
			padding: 0px 20px;
			color: $red;
			font-size: 24px;

			&:hover, &:active, &:focus {
				color: darken($red, 15%);
			}
		}

		table {
			td, th {
				&:last-child {
					width: 100px;
					text-align :center;
				}
			}

			td {
				&:last-child {
					padding: 0px;
					vertical-align: middle;
				}
			}
		}

		@include media-breakpoint-down(sm) {
			.form-dropdown {
				width: 100%;
			}
		}

		@include media-breakpoint-down(xs) {
			table {
				td, th {
					&:last-child {
						display: none;
					}
				}
			}
		}
	}
</style>
