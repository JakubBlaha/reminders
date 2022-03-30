<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ReminderData } from '$lib/interfaces/ReminderData';
	import { inDuration } from '$lib/utils/misc/inDuration';
	import { timeFromTimestamp } from '$lib/utils/misc/timeFromTimestamp';

	export let reminderData: ReminderData;

	function clickCard() {
		goto(`/reminders/${reminderData.id}`);
	}

	let inDurationString = inDuration(reminderData.timestamp);

	setInterval(() => {
		inDurationString = inDuration(reminderData.timestamp);
	}, 5000);
</script>

<button
	class="flex items-center w-full h-16 p-4 mt-2 transition-all rounded cursor-pointer bg-neutral-800 hover:pl-6 active:pl-2 overflow-hidden"
	on:click={clickCard}
>
	<div class="whitespace-nowrap {reminderData.reminded && 'line-through opacity-30'}">
		{reminderData.title}
	</div>
	<div class="flex-grow" />
	<div class="text-neutral-500 whitespace-nowrap ml-2">
		{inDurationString}, {timeFromTimestamp(reminderData.timestamp)}
	</div>
</button>
