<template>
	<div class="authentication-page">
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
					login form
				</div>
				<div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
					signup form
				</div>
			</template>
		</TabsNav>

		<div class="row no-gutters">
			<div class="col">
				1111111
			</div>
			<div class="col">
				222222
			</div>
		</div>

		<input type="text" />
	</div>
</template>

<script>
	import TabsNav from '@/components/TabsNav';

	export default {
		components: {
			TabsNav
		}
	};
</script>
