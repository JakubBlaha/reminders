<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import { userId } from '$lib/utils/auth';
	import { loginWithGoogle } from '$lib/utils/auth/login';
	import { fade } from 'svelte/transition';
</script>

<main class="p-4 flex flex-col h-full">
	<div class="text-2xl font-mono">Please log in with one of the available providers.</div>

	<div class="mt-8 px-8">
		<ul>
			<li class="list-decimal pl-2 font-mono">
				<Button cls="w-full" on:click={loginWithGoogle} disabled={!!$userId}>
					Log In With Google
				</Button>
			</li>
		</ul>
	</div>

	<div class="flex-grow" />

	<div in:fade>
		<Button on:click={() => goto('/')} cls="w-full" disabled={!$userId}>Continue</Button>
	</div>
</main>
