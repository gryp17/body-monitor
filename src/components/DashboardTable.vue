<template>
	<div class="dashboard-table">
		<FormDropdown
			v-model="measurementId"
			:options="measurementOptions"
		/>

		<div v-if="totalPages === 0" class="no-data">
			<h4>Няма данни</h4>
		</div>
		<table v-else class="table">
			<thead class="thead-light">
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
				<tr v-for="entry in pageEntries" :key="entry.id">
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
							@click="deleteMeasurementEntry(entry.id)"
							class="delete-btn"
						>
							<i class="fas fa-times"></i>
						</FormButton>
					</td>
				</tr>
			</tbody>
		</table>

		<Pagination
			v-show="totalPages > 1"
			:total-pages="totalPages"
			:current-page="page"
			@change-page="setPage"
		/>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex';
	import EntryDiff from '@/components/EntryDiff';
	import Pagination from '@/components/Pagination';

	export default {
		components: {
			EntryDiff,
			Pagination
		},
		data() {
			return {
				measurementId: null,
				perPage: 10,
				page: 0
			};
		},
		watch: {
			measurementId() {
				this.page = 0;
			},
			groupedEntries() {
				this.page = 0;
			}
		},
		computed: {
			...mapState('measurements', [
				'measurements'
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
				if (!this.groupedEntries[this.measurementId]) {
					return [];
				}

				//make a deep copy... (no - array spreading doesn't work)
				const measurementEntries = JSON.parse(JSON.stringify(this.groupedEntries[this.measurementId])).reverse();

				const entries = measurementEntries.map((entry, index) => {
					const prevEntry = measurementEntries[index + 1];

					if (prevEntry) {
						const diff = (entry.value - prevEntry.value).toFixed(1);
						entry.diff = this.$options.filters.toFixed(diff, 1);
					}

					return entry;
				});
				return entries;
			},
			pageEntries() {
				return this.entries.slice((this.page) * this.perPage, (this.page + 1) * this.perPage);
			},
			totalPages() {
				return Math.ceil(this.entries.length / this.perPage);
			}
		},
		created() {
			this.measurementId = this.measurements[0].id;
		},
		methods: {
			...mapActions('measurements', [
				'deleteMeasurementEntry'
			]),
			/**
			 * Sets the current page
			 * @param {Number} page
			 */
			setPage(page) {
				this.page = page;
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

		.no-data {
			margin-bottom: 40px;
			text-align: center;
		}

		.form-button.delete-btn {
			padding: 0px 20px;
			color: $red;
			font-size: 24px;
			cursor: pointer;

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
