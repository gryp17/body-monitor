<template>
	<div class="base-modal">
		<div ref="modal" class="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<slot name="header">
						</slot>
					</div>
					<div class="modal-body">
						<slot name="body">
						</slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	export default {
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				modal: null,
			};
		},
		mounted() {
			this.modal = $(this.$refs.modal);

			this.modal.modal({
				show: this.visible
			});

			this.modal.on('hidden.bs.modal', () => {
				this.$emit('hidden');
			});
		},
		watch: {
			/**
			 * Watches the visible status and opens/closes the modal
			 * @param {Boolean} status
			 */
			visible(status) {
				if (status) {
					this.openModal();
				} else {
					this.closeModal();
				}
			}
		},
		methods: {
			/**
			 * Opens the bootstrap modal
			 */
			openModal() {
				this.modal.modal('show');
			},
			/**
			 * Closes the bootstrap modal
			 */
			closeModal() {
				this.modal.modal('hide');
			}
		}
	};
</script>

<style scoped lang="scss">
	.base-modal {
		.modal {
			padding-right: 0px !important;

			.modal-content {

				.modal-header {
					border-bottom: solid 2px $blue;
					background-color: $blue;
					color: $white;

					.close {
						color: $white;
						opacity: 1;
						line-height: 30px;
					}
				}
			}

			@include media-breakpoint-down(xs) {
				.modal-content {
					border-radius: 0px;
				}

				.modal-header {
					border-radius: 0px;
				}

				.modal-dialog {
					margin: 0px;
				}
			}
		}
	}
</style>
