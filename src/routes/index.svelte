<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button/Button.svelte';
	import CategoryTitle from '$lib/components/CategoryTitle/CategoryTitle.svelte';
	import ReminderCard from '$lib/components/ReminderCard/ReminderCard.svelte';
	import Logout from '$lib/icons/logout.svelte';
	import type { ReminderUpdateMessage } from '$lib/interfaces/ReminderUpdateMessage';
	import { userId } from '$lib/utils/auth';
	import { dateGroupReminders } from '$lib/utils/misc/dateGroupReminders';
	import { sayRemindersFor } from '$lib/utils/misc/sayRemindersFor';
	import { getReminderUpdateChannel } from '$lib/utils/pwa/channel';
	import { clientReminders } from '$lib/utils/reminders';
	import { getReminders } from '$lib/utils/reminders/getReminders';
	import { typewriter } from '$lib/utils/transitions/typewriter';
	import { fade } from 'svelte/transition';

	$: getReminderGroupsPromise =
		$userId &&
		getReminders().then((reminders) => {
			// Save reminders for the whole client
			$clientReminders = reminders;

			const groups = dateGroupReminders(reminders);

			sayRemindersFor.set(groups[0]?.title || '');

			return groups;
		});

	function clickAdd() {
		goto('/new');
	}

	function clickLogout() {
		goto('/logout');
	}
</script>

<main class="flex flex-col h-full p-4">
	{#await getReminderGroupsPromise then groups}
		{#each groups || [] as group, index}
			<div in:fade class="mt-8 first:-mt-2">
				{#if index !== 0}
					<CategoryTitle title={group.title} />
				{/if}

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

	<div class="flex space-x-2">
		<button
			on:click={clickLogout}
			class="grid w-16 h-16 rotate-180 rounded place-items-center bg-neutral-800 active:scale-95"
		>
			<div class="translate-x-1">
				<Logout />
			</div>
		</button>

		<Button on:click={clickAdd} cls="flex-grow">
			<span class="text-2xl">+</span>
		</Button>

		<a
			class="w-16 px-2 bg-red-500 rounded animate-pulse"
			href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
			target="_blank">z</a
		>
	</div>
</main>
