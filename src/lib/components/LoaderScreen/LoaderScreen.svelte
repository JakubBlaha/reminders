<script>
	import { browser } from '$app/env';
	import { fade } from 'svelte/transition';

	let counter = 0;

	setInterval(() => counter++, 50);
</script>

{#if browser}
	<div class="h-full flex flex-col items-center justify-center max-w-full px-8" in:fade>
		<div class="text-4xl break-words max-w-full">Loading{'.'.repeat(counter)}</div>
	</div>
{/if}
