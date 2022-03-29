<script lang="ts">
	import { browser } from '$app/env';
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoaderScreen from '$lib/components/LoaderScreen/LoaderScreen.svelte';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import { authState } from '$lib/utils/auth';
	import { loadingRoute } from '$lib/utils/misc/loader';
	import { sayRemindersFor } from '$lib/utils/misc/sayRemindersFor';
	import { typewriter } from '$lib/utils/transitions/typewriter';
	import { fade, slide } from 'svelte/transition';
	import '../app.css';

	let innerHeight: number;

	$: if (browser) {
		$authState === 'logged_out' && goto('/login');
	}

	let sayRemind = false;

	afterNavigate(({ to }) => {
		if (to.pathname !== '/') {
			sayRemindersFor.set(null);
		}

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

<div style="height: {innerHeight}px" class="grid place-items-center max-w-full">
	<div class="absolute left-2 top-2 text-white">
		Remindr<span class="text-white bg-red-500 px-1">z</span>
	</div>

	<div
		class="bg-neutral-900 text-white max-w-[500px] max-h-[800px] mx-auto w-full h-full overflow-hidden z-10"
	>
		{#if $authState === null || !browser || $loadingRoute}
			<div class="h-full absolute top-0 bottom-0 left-0 right-0 bg-neutral-800 z-10" out:fade>
				<LoaderScreen />
			</div>
		{/if}

		<!-- Titlebar -->
		<div class="text-4xl pt-4 pl-5 whitespace-nowrap float-right min-w-full">
			{#if $page.url.pathname !== '/'}
				<div on:click={clickBack} class="inline">
					<button class="transition active:-translate-x-12">
						<ChevronLeft />
					</button>
				</div>
			{/if}

			Remind<span class:opacity-0={sayRemind}>
				r<span class="text-white bg-red-500 px-2">z</span>
			</span>

			{#if $sayRemindersFor}
				<span transition:typewriter={{ message: `for ${$sayRemindersFor}:` }} />
			{/if}
		</div>

		<div class="clear-right" />

		<div class="h-[calc(100%-4rem)] overflow-scroll" in:fade>
			<slot />
		</div>
	</div>
</div>
