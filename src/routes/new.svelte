<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Button/Button.svelte';
	import CategoryTitle from '$lib/components/CategoryTitle/CategoryTitle.svelte';
	import Datepicker from '$lib/components/Datepicker/Datepicker.svelte';
	import TextInput from '$lib/components/TextInput/TextInput.svelte';
	import { userId } from '$lib/utils/auth';
	import { createReminder } from '$lib/utils/reminders/createReminder';
	import type { Dayjs } from 'dayjs';

	let title: string;
	let datetime: Dayjs;

	$: disableCreate = !title || !datetime;

	let creating = false;

	async function clickCreateReminder() {
		creating = true;

		await createReminder({
			title,
			timestamp: datetime.unix(),
			creatorId: $userId,
			reminded: false
		});
		goto('/');
	}
</script>

<main class="flex flex-col h-full p-4">
	<CategoryTitle title="me to:" />

	<div class="mt-4">
		<TextInput bind:value={title} />
	</div>

	<div class="mt-4">
		<CategoryTitle title="At this time:" />
	</div>

	<div class="mt-4">
		<Datepicker bind:value={datetime} />
	</div>

	<div class="flex-grow" />

	<div class="w-full">
		<Button cls="w-full" disabled={disableCreate} on:click={clickCreateReminder} loading={creating}>
			Create Reminder
		</Button>
	</div>
</main>
