<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import CategoryTitle from '$lib/components/CategoryTitle/CategoryTitle.svelte';
	import ReminderCard from '$lib/components/ReminderCard/ReminderCard.svelte';
	import { userId } from '$lib/utils/auth';
	import { dateGroupReminders } from '$lib/utils/misc/dateGroupReminders';
	import { getReminders } from '$lib/utils/reminders/getReminders';
	import { typewriter } from '$lib/utils/transitions/typewriter';
	import { fade } from 'svelte/transition';

	$: getReminderGroupsPromise =
		$userId && getReminders().then((reminders) => dateGroupReminders(reminders));

	function clickAdd() {
		goto('/new');
	}
</script>

<main class="p-4 h-full flex flex-col">
	{#await getReminderGroupsPromise then groups}
		{#each groups || [] as group}
			<div in:fade class="mt-8">
				<CategoryTitle title={group.title} />

				{#each group.reminders as reminder}
					<ReminderCard reminderData={reminder} />
				{/each}
			</div>
		{/each}

		{#if !groups?.length}
			<div class="text-2xl text-neutral-400" in:typewriter={{ speed: 3 }}>
				You don't have any reminders yet.
			</div>
		{/if}
	{/await}

	<div class="flex-grow" />

	<Button on:click={clickAdd}>
		<span class="text-2xl">+</span>
	</Button>
</main>
