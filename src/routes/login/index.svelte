<script>
	import Button from '$lib/components/Button/Button.svelte';
	import { loginWithGoogle } from '$lib/utils/auth/login';
</script>

<main class="p-4">
	<div class="text-2xl font-mono">Please log in with one of the available providers.</div>

	<div class="mt-8 px-8">
		<ul>
			<li class="list-decimal pl-2 font-mono">
				<Button cls="w-full" on:click={loginWithGoogle}>Log In With Google</Button>
			</li>
		</ul>
	</div>
</main>
