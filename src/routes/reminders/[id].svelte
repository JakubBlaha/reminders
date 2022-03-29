<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button/Button.svelte';
	import CategoryTitle from '$lib/components/CategoryTitle/CategoryTitle.svelte';
	import Datepicker from '$lib/components/Datepicker/Datepicker.svelte';
	import type { ReminderData } from '$lib/interfaces/ReminderData';
	import { userId } from '$lib/utils/auth';
	import { getReminder } from '$lib/utils/reminders/getReminder';
	import { updateReminder } from '$lib/utils/reminders/updateReminder';

	const reminderId = $page.params.id;

	let reminderData: ReminderData = {} as ReminderData;

	const getReminderDataPromise = $userId && getReminder(reminderId);

	getReminderDataPromise.then((data) => {
		reminderData = data;
		datepicker.setTimestamp(reminderData.timestamp);
	});

	let datepicker: Datepicker;
	let updateButton: Button;

	let updatingReminder = false;

	async function clickUpdateReminder() {
		updatingReminder = true;

		reminderData.timestamp = datepicker.getTimestamp();

		await updateReminder(reminderId, reminderData);

		updateButton.greenify();
		updatingReminder = false;
	}
</script>

<main class="p-4 flex flex-col h-full">
	<CategoryTitle title="Remind me about:" />

	<input
		class="bg-neutral-800 rounded p-4 mt-2 mb-4 outline-none w-full"
		bind:value={reminderData.title}
	/>

	<CategoryTitle title="at:" />

	<div class="mt-2">
		<Datepicker bind:this={datepicker} />
	</div>

	<div class="flex-grow" />

	<div>
		<Button
			cls="w-full"
			on:click={clickUpdateReminder}
			loading={updatingReminder}
			bind:this={updateButton}
		>
			Update Reminder
		</Button>
	</div>
</main>
