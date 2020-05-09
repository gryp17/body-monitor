<template>
	<div class="main-menu">
		<button @click="toggleMainMenu" class="btn btn-light btn-hamburger">
			<i class="fas fa-bars"></i>
		</button>

		<Header />

		<div ref="sections" class="sections">
			<FormButton
				transparent
				@click="showAddEntryModal"
				class="option"
			>
				<i class="fas fa-pencil-alt"></i>
				Добави запис
			</FormButton>

			<FormButton
				transparent
				@click="showAddMeasurementModal"
				class="option"
			>
				<i class="fas fa-weight"></i>
				Добави мерки
			</FormButton>

			<FormButton
				transparent
				@click="onLogout"
				class="option"
			>
				<i class="fas fa-sign-out-alt"></i>
				Излез
			</FormButton>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import $ from 'jquery';

	import Header from '@/components/Header';

	const SLIDE_DURATION = 300;

	export default {
		components: {
			Header
		},
		data() {
			return {
				sections: [
					'test',
					'aaa',
					'bbb'
				]
			};
		},
		computed: {
			...mapState('ui', [
				'mainMenuOpened'
			])
		},
		methods: {
			...mapActions('ui', [
				'toggleMainMenu',
				'hideMainMenu'
			]),
			...mapActions('modals', [
				'showAddMeasurementModal',
				'showAddEntryModal'
			]),
			...mapActions('auth', [
				'logout'
			]),
			onLogout() {
				this.logout().then(() => {
					this.$router.push({
						name: 'auth'
					});
				});
			}
		},
		watch: {
			/**
			 * Watches the mainMenuOpened value and triggers the correct animation
			 */
			mainMenuOpened(value) {
				if (value) {
					$(this.$refs.sections).slideDown(SLIDE_DURATION);
				} else {
					$(this.$refs.sections).slideUp(SLIDE_DURATION);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.main-menu {
		position: relative;
		min-height: 70px;

		.header {
			line-height: 70px;
			margin-bottom: 0px;
		}

		.sections {
			display: flex;
			justify-content: space-evenly;
			margin: 10px auto 30px auto;
			max-width: 550px;

			.option {
				font-weight: bold;
				font-size: 17px;
			}
		}

		.btn-hamburger {
			position: absolute;
			right: 10px;
			top: 10px;
			display: none;
			padding: 3px 15px 5px 15px;
			outline: none;
			font-size: 28px;
			background-color: $white;
			border-color: $gray;

			&:hover, &:active, &:focus {
				background-color: $gray-lighter;
			}
		}

		@include media-breakpoint-up(sm) {
			.sections {
				display: flex !important;
			}
		}

		@include media-breakpoint-down(xs) {
			display: block;
			margin-bottom: 10px;

			.sections {
				display: none;
				flex-direction: column;
				margin: 0px;
				padding-bottom: 10px;

				.option {
					display: block;
					padding: 5px;
				}
			}

			.btn-hamburger {
				display: block;
			}
		}
	}
</style>
