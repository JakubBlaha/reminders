<script lang="ts">
	import { browser } from '$app/env';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoaderScreen from '$lib/components/LoaderScreen/LoaderScreen.svelte';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import type { ReminderUpdateMessage } from '$lib/interfaces/ReminderUpdateMessage';
	import { authState } from '$lib/utils/auth';
	import { loadingRoute } from '$lib/utils/misc/loader';
	import { sayRemindersFor } from '$lib/utils/misc/sayRemindersFor';
	import { getReminderUpdateChannel } from '$lib/utils/pwa/channel';
	import { initRemindersListener } from '$lib/utils/reminders';
	import { typewriter } from '$lib/utils/transitions/typewriter';
	import { fade } from 'svelte/transition';
	import '../app.css';

	// Register dayjs plugins
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration.js';
	import relativeTime from 'dayjs/plugin/relativeTime.js';

	dayjs.extend(duration);
	dayjs.extend(relativeTime);

	let innerHeight: number;

	$: if (browser) {
		$authState === 'logged_out' && goto('/login');
	}

	$: if (browser && $authState === 'logged_in') {
		getReminderUpdateChannel().postMessage({ type: 'pull-reminders' } as ReminderUpdateMessage);
		initRemindersListener();
	}

	$: if (browser && $authState !== 'logged_out' && Notification.permission !== 'granted') {
		goto('/enable-notifications');
	}

	let sayRemind = false;

	afterNavigate(({ to }) => {
		if (to.pathname === '/new' || to.pathname.includes('reminders')) {
			sayRemind = true;
		} else {
			sayRemind = false;
		}
	});

	function clickBack() {
		goto('/');
	}
</script>

<svelte:window bind:innerHeight />

<div style="height: {innerHeight}px" class="grid max-w-full place-items-center">
	<a
		class="absolute text-white left-2 top-2"
		href="https://docs.google.com/presentation/d/1S2UEV_FoNWlgme2VCRG4Xpm3AQ1VIr2nkIi06B2krVs/edit?usp=sharing/"
		target="_blank"
	>
		Remindr<span class="px-1 text-white bg-red-500">z</span>
	</a>

	<div
		class="bg-neutral-900 text-white max-w-[500px] max-h-[800px] mx-auto w-full h-full overflow-hidden z-10"
	>
		{#if $authState === null || !browser || $loadingRoute}
			<div class="absolute top-0 bottom-0 left-0 right-0 z-10 h-full bg-neutral-800" out:fade>
				<LoaderScreen />
			</div>
		{/if}

		<!-- Titlebar -->
		<div class="float-right min-w-full pt-4 pl-5 text-4xl whitespace-nowrap">
			{#if $page.url.pathname !== '/' && $page.url.pathname !== '/login'}
				<div on:click={clickBack} class="inline">
					<button class="transition active:-translate-x-12">
						<ChevronLeft />
					</button>
				</div>
			{/if}

			Remind<span class:opacity-0={sayRemind}>
				r<span class="px-2 text-white bg-red-500">z</span>
			</span>

			{#if $sayRemindersFor && $page.url.pathname === '/'}
				{#key $sayRemindersFor}
					<span transition:typewriter={{ message: `for ${$sayRemindersFor}:` }} />
				{/key}
			{/if}
		</div>

		<div class="clear-right" />

		<div class="h-[calc(100%-4rem)] overflow-scroll" in:fade>
			<slot />
		</div>
	</div>
</div>
