<script lang="ts">
	import { browser } from '$app/env';
	import { afterNavigate, goto } from '$app/navigation';
	import LoaderScreen from '$lib/components/LoaderScreen/LoaderScreen.svelte';
	import { authState } from '$lib/utils/auth';
	import { loadingRoute } from '$lib/utils/misc/loader';
	import { fade } from 'svelte/transition';
	import '../app.css';

	let innerHeight: number;

	$: if (browser) {
		$authState === 'logged_out' && goto('/login');
	}
</script>

<svelte:window bind:innerHeight />

<div class="bg-neutral-900 text-white" style="height: {innerHeight}px">
	{#if $authState === null || !browser || $loadingRoute}
		<div class="h-full absolute top-0 bottom-0 left-0 right-0 bg-neutral-800 z-10" out:fade>
			<LoaderScreen />
		</div>
	{/if}

	<div class="h-full" in:fade>
		<slot />
	</div>
</div>
