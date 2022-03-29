<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ReminderData } from '$lib/interfaces/ReminderData';

	export let reminderData: ReminderData;

	function clickCard() {
		goto(`/reminders/${reminderData.id}`);
	}
</script>

<button
	class="bg-neutral-800 p-4 rounded mt-2 hover:px-6 transition-all cursor-pointer h-16 flex items-center active:px-2 w-full"
	on:click={clickCard}
>
	<div>{reminderData.title}</div>
</button>
