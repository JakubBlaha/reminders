<script lang="ts">
	import Loader from '$lib/icons/Loader.svelte';

	export let cls: string = '';
	export let disabled: boolean = false;
	export let loading = false;

	let green = false;

	export function greenify() {
		green = true;

		setTimeout(() => (green = false), 1000);
	}
</script>

<button
	class="bg-white rounded px-4 {cls} disabled:opacity-50 active:scale-95 transition h-16 text-neutral-900"
	class:!bg-green-600={green}
	disabled={disabled || loading}
	on:click
>
	{#if loading}
		<Loader />
	{:else}
		<div class="py-2" class:!text-white={green}>
			<slot />
		</div>
	{/if}
</button>
