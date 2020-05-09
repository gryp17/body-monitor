<template>
	<div class="authentication-page">
		<h4>
			Body Monitor
		</h4>

		<TabsNav flex>
			<template v-slot:items>
				<li class="nav-item">
					<a
						class="nav-link active"
						id="login-tab"
						data-toggle="tab"
						href="#login"
						role="tab"
						aria-controls="login"
						aria-selected="true"
					>
						Влез
					</a>
				</li>
				<li class="nav-item">
					<a
						class="nav-link"
						id="signup-tab"
						data-toggle="tab"
						href="#signup"
						role="tab"
						aria-controls="signup"
						aria-selected="true"
					>
						Регистрирай се
					</a>
				</li>
			</template>
			<template v-slot:content>
				<div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
					<LoginForm />
				</div>
				<div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
					<SignupForm />
				</div>
			</template>
		</TabsNav>
	</div>
</template>

<script>
	import TabsNav from '@/components/TabsNav';
	import LoginForm from '@/components/LoginForm';
	import SignupForm from '@/components/SignupForm';

	export default {
		components: {
			TabsNav,
			LoginForm,
			SignupForm
		}
	};
</script>

<style lang="scss">
	.authentication-page {
		margin: auto;
		width: 60%;

		h4 {
			margin: 20px;
			text-align: center;
		}

		.tab-content {
			padding: 15px 0px;
		}

		@include media-breakpoint-down(sm) {
			width: auto;
		}
	}
</style>
