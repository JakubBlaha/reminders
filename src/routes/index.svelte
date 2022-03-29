<script>
	import { browser } from '$app/env';
	import CategoryTitle from '$lib/components/CategoryTitle/CategoryTitle.svelte';
	import ReminderCard from '$lib/components/ReminderCard/ReminderCard.svelte';
	import { userId } from '$lib/utils/auth';
	import { dateGroupReminders } from '$lib/utils/misc/dateGroupReminders';
	import { getReminders } from '$lib/utils/reminders/getReminders';
	import { fade } from 'svelte/transition';

	$: getReminderGroupsPromise =
		$userId && getReminders().then((reminders) => dateGroupReminders(reminders));
</script>

<main class="p-4">
	{#await getReminderGroupsPromise then groups}
		{#each groups || [] as group}
			<div in:fade>
				<CategoryTitle title={group.title} />

				{#each group.reminders as reminder}
					<ReminderCard reminderData={reminder} />
				{/each}
			</div>
		{/each}
	{/await}
</main>
