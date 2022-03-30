<script lang="ts">
	import Calendar from '$lib/icons/calendar.svelte';
	import Time from '$lib/icons/time.svelte';
	import ChevronDown from '$lib/icons/ChevronDown.svelte';
	import ChevronLeft from '$lib/icons/ChevronLeft.svelte';
	import ChevronRight from '$lib/icons/ChevronRight.svelte';
	import { formatDatetimeFromISO } from '$lib/utils/misc/formatDatetime';
	import dayjs from 'dayjs';
	import isoWeek from 'dayjs/plugin/isoWeek.js';
	import Toggle from '$lib/components/Toggle/Toggle.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { slide } from 'svelte/transition';

	dayjs.extend(isoWeek);

	export let id = '';
	export let placeholder = 'Select date & time';
	export let value = dayjs();

	export function setTimestamp(ts: number) {
		selectedDate = dayjs.unix(ts);
	}

	export function getTimestamp() {
		return selectedDate.unix();
	}

	let open = false;
	let section: 'date' | 'time' = 'date';

	const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	let selectedDate: dayjs.Dayjs = dayjs();

	$: value = selectedDate;

	function nextMonth() {
		selectedDate = selectedDate.add(1, 'month');
	}

	function previousMonth() {
		selectedDate = selectedDate.subtract(1, 'month');
	}

	function updateValue(..._) {
		selectedDate = selectedDate.hour(hours).minute(minutes);

		if (isPm) {
			selectedDate = selectedDate.add(12, 'hour');
		}

		value = selectedDate;
	}

	$: updateValue(hours, minutes, selectedDate, isPm);

	let hours = 6;
	let minutes = 30;
	let monthDays = [];
	$: inputText = formatDatetimeFromISO(selectedDate);
	let isPm = false;

	$: monthWeekdayOffset = selectedDate.date(1).isoWeekday() - 1;

	interface DayInTable {
		day: number;
		isSelected: boolean;
		isToday: boolean;
		isDisabled: boolean;
	}

	$: {
		const fillBeforeDays = Array(monthWeekdayOffset)
			.fill(0)
			.map((_, i) => ({
				day: selectedDate.subtract(1, 'month').daysInMonth() - monthWeekdayOffset + i + 1,
				isDisabled: true
			}));

		const currentMonthDays = Array(selectedDate.daysInMonth())
			.fill(0)
			.map((_, i) => ({ day: i + 1, isCurrentMonth: true }));

		const fillAfterDays = Array(42 - fillBeforeDays.length - currentMonthDays.length)
			.fill(0)
			.map((_, i) => ({ day: i + 1, isDisabled: true }));

		monthDays = [...fillBeforeDays, ...currentMonthDays, ...fillAfterDays] as DayInTable[];
	}
</script>

<div class="relative">
	<div
		class="flex items-center space-x-2 bg-neutral-800 px-4 rounded"
		on:pointerdown={() => (open = !open)}
	>
		<div class="inline-block">
			<Calendar />
		</div>

		<input
			{id}
			type="text"
			class="w-full p-4 bg-transparent cursor-pointer"
			disabled
			{placeholder}
			bind:value={inputText}
		/>

		<button
			class="bg-color-black text-white w-16 absolute top-0 right-0 h-full rounded-r-md pointer-events-none"
		>
			<div class:rotate-180={open} class="grid place-items-center transition">
				<ChevronDown />
			</div>
		</button>
	</div>
</div>

{#if open}
	<div
		class="my-2 w-full bg-neutral-800 flex flex-col rounded p-4 h-[380px]"
		transition:slide|local
	>
		<div
			class="border-color-black border border-neutral-700 rounded-xl h-12 grid grid-cols-2 overflow-hidden flex-shrink-0 w-56 mx-auto"
		>
			<button
				class="uppercase font-semibold flex items-center justify-center
                    {section === 'date' ? 'bg-neutral-700 text-white' : ''}"
				on:click={() => (section = 'date')}
			>
				<Calendar />
				<span class="ml-2">Date</span>
			</button>

			<button
				class="uppercase font-semibold flex items-center justify-center
                    {section === 'time' ? 'bg-neutral-700 text-white' : ''}"
				on:click={() => (section = 'time')}
			>
				<Time />
				<span class="ml-2">Time</span>
			</button>
		</div>

		{#if section === 'date'}
			<div class="flex mt-4 w-56 mx-auto">
				<div class="flex-grow font-bold">
					{selectedDate.format('MMM')}
					{selectedDate.year()}
				</div>
				<div class="flex space-x-2">
					<button class="btn" on:click={previousMonth}><ChevronLeft /></button>
					<button class="btn" on:click={nextMonth}><ChevronRight /></button>
				</div>
			</div>

			<div class="flex font-semibold mt-6 justify-center">
				{#each days as day}
					<div class="w-8 text-center">{day}</div>
				{/each}
			</div>

			<div
				class="grid grid-cols-7 gap-px bg-neutral-700 border-neutral-700 border mt-3 w-max mx-auto"
			>
				{#each monthDays as day}
					<button
						class="btn flex-grow text-center aspect-1 bg-neutral-800 grid place-items-center text-sm font-medium w-8 h-8
							{day.day === selectedDate.date() && day.isCurrentMonth ? '!bg-red-500 text-white' : ''}
							{day.isDisabled ? 'text-[#747474] bg-neutral-700' : ''}"
						class:font-bold={day.isToday}
						on:click={() => (selectedDate = selectedDate.date(day.day))}
						disabled={day.isDisabled}
					>
						{day.day}
					</button>
				{/each}
			</div>
		{/if}

		{#if section === 'time'}
			<div class="flex flex-col w-56 mx-auto h-full">
				<div class="flex justify-center mt-6">
					<Toggle onInsideLabel="PM" offInsideLabel="AM" bind:state={isPm} />
				</div>

				<div class="flex items-center justify-center space-x-2 mt-4">
					<div class="grid place-items-center border w-24 h-24 text-3xl rounded border-neutral-700">
						{hours}
					</div>

					<div class="text-6xl font-semibold text-white">:</div>

					<div class="grid place-items-center border w-24 h-24 text-3xl rounded border-neutral-700">
						{minutes}
					</div>
				</div>

				<div class="mt-8">
					<label class="font-semibold">
						<div>Hours:</div>
						<input type="range" bind:value={hours} max="12" class="mt-2" />
					</label>

					<label class="font-semibold">
						<div>Minutes:</div>
						<input type="range" bind:value={minutes} max="59" class="mt-2" />
					</label>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>
	input[type='range'] {
		-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
		width: 100%; /* Specific width is required for Firefox. */
		background: transparent; /* Otherwise white in Chrome */
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	input[type='range']:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}

	/* Special styling for WebKit/Blink */
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		border-radius: 999px;
		background-color: rgb(239 68 68);
		cursor: pointer;
		margin-top: -7px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
	}

	/* All the same stuff for Firefox */
	input[type='range']::-moz-range-thumb {
		box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		border: 1px solid #000000;
		height: 36px;
		width: 16px;
		border-radius: 3px;
		background: #ffffff;
		cursor: pointer;
	}

	input[type='range']::-webkit-slider-runnable-track {
		@apply bg-neutral-700;
		width: 100%;
		height: 2px;
		cursor: pointer;
	}
</style>
