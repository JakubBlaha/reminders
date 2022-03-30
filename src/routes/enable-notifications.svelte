<script>
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button/Button.svelte';

	let error = false;

	async function clickRequestNotifications() {
		try {
			await Notification.requestPermission();
			goto('/permission-granted');
		} catch (e) {
			error = true;
		}
	}
</script>

<div class="flex flex-col h-full space-y-2">
	<div class="mt-8 text-2xl">Please allow the app to send you notifications.</div>

	{#if error}
		<div class="mt-8 text-2xl text-red-500">There was an error retrieving the permission.</div>
	{/if}

	<div class="flex-grow" />

	<!-- <Button>I don't want to.</Button> -->
	<Button on:click={clickRequestNotifications}>Show me the popup.</Button>
</div>
