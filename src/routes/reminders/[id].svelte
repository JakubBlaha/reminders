<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import Button from '$lib/components/Button/Button.svelte';
	import CategoryTitle from '$lib/components/CategoryTitle/CategoryTitle.svelte';
	import Datepicker from '$lib/components/Datepicker/Datepicker.svelte';
	import type { ReminderData } from '$lib/interfaces/ReminderData';
	import { userId } from '$lib/utils/auth';
	import { loadingRoute } from '$lib/utils/misc/loader';
	import { deleteReminder } from '$lib/utils/reminders/deleteReminder';
	import { getReminder } from '$lib/utils/reminders/getReminder';
	import { updateReminder } from '$lib/utils/reminders/updateReminder';

	const reminderId = $page.params.id;

	loadingRoute.set(true);

	let reminderData: ReminderData = {} as ReminderData;

	$: if ($userId) {
		fetchReminderData();
	}

	async function fetchReminderData() {
		getReminder(reminderId).then(async (data) => {
			reminderData = data;
			datepicker.setTimestamp(reminderData.timestamp);
			loadingRoute.set(false);
		});
	}

	let datepicker: Datepicker;
	let updateButton: Button;

	let updatingReminder = false;

	async function clickUpdate() {
		updatingReminder = true;
		deleteClickConfirms = false;

		reminderData.timestamp = datepicker.getTimestamp();
		reminderData.reminded = false;

		await updateReminder(reminderId, reminderData);

		updateButton.greenify();
		updatingReminder = false;
	}

	let deletingReminder = false;
	let deleteClickConfirms = false;
	let tempDeleteDisable = false;

	async function clickDelete() {
		if (!deleteClickConfirms) {
			deleteClickConfirms = true;
			tempDeleteDisable = true;

			setTimeout(() => (tempDeleteDisable = false), 500);

			return;
		}

		deletingReminder = true;

		await deleteReminder(reminderId);

		deletingReminder = false;

		goto('/');
	}
</script>

<main class="flex flex-col h-full p-4 overflow-scroll">
	<CategoryTitle title="me to:" />

	<input
		class="w-full p-4 mt-2 mb-4 rounded outline-none bg-neutral-800"
		bind:value={reminderData.title}
	/>

	<CategoryTitle title="at:" />

	<div class="mt-2">
		<Datepicker bind:this={datepicker} />
	</div>

	<div class="flex-grow" />

	<div class="flex space-x-2">
		<Button
			cls="w-full !bg-neutral-800 !text-red-500"
			on:click={clickDelete}
			loading={deletingReminder}
			disabled={updatingReminder || tempDeleteDisable}
		>
			{deleteClickConfirms ? 'Confirm Deletion' : 'Delete'}
		</Button>

		<Button
			cls="w-full"
			on:click={clickUpdate}
			loading={updatingReminder}
			bind:this={updateButton}
			disabled={deletingReminder}
		>
			Update
		</Button>
	</div>
</main>
