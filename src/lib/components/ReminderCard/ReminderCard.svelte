<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ReminderData } from '$lib/interfaces/ReminderData';

	export let reminderData: ReminderData;

	function clickCard() {
		goto(`/reminders/${reminderData.id}`);
	}
</script>

<div class="bg-neutral-800 p-4 rounded mt-2" on:click={clickCard}>
	<div>{reminderData.title}</div>
</div>
