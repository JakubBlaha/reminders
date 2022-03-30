<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ReminderData } from '$lib/interfaces/ReminderData';
	import { timeFromTimestamp } from '$lib/utils/misc/timeFromTimestamp';

	export let reminderData: ReminderData;

	function clickCard() {
		goto(`/reminders/${reminderData.id}`);
	}
</script>

<button
	class="flex items-center w-full h-16 p-4 mt-2 transition-all rounded cursor-pointer bg-neutral-800 hover:pl-6 active:pl-2"
	on:click={clickCard}
>
	<div class={reminderData.reminded && 'line-through opacity-30'}>{reminderData.title}</div>
	<div class="flex-grow" />
	<div class="text-neutral-500">{timeFromTimestamp(reminderData.timestamp)}</div>
</button>
