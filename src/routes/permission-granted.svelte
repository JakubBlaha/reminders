<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
</script>

<div class="text-2xl" />

<div class="flex flex-col h-full space-y-2">
	<div class="mt-8 text-2xl">Notification permissions were granted.</div>

	<div class="flex-grow" />

	<Button on:click={() => goto('/')}>Continue</Button>
</div>
