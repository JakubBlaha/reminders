<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { authState } from '$lib/utils/auth';
	import { fade } from 'svelte/transition';
	import '../app.css';

	let innerHeight: number;

	$: if (browser) {
		$authState === 'logged_out' && goto('/login');
	}

	// Transitions
	let canDisplayContent = false;
</script>

<svelte:window bind:innerHeight />

<div class="bg-neutral-900 text-white" style="height: {innerHeight}px">
	{#if $authState === null || !browser}
		<div class="text-4xl font-mono p-4" out:fade on:outroend={() => (canDisplayContent = true)}>
			Loading auth...
		</div>
	{:else if canDisplayContent}
		<div class="h-full" in:fade>
			<slot />
		</div>
	{/if}
</div>
