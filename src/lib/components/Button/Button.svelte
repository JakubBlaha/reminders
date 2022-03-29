<script lang="ts">
	export let cls: string = '';
	export let disabled: boolean = false;
</script>

<button
	class="bg-white rounded text-neutral-900 px-4 py-2 {cls} disabled:opacity-50"
	{disabled}
	on:click
>
	<slot />
</button>
