<script lang="ts">
	export let value: string = '';
	export let placeholder: string = 'Cooking potatoes...';
</script>

<input
	type="text"
	class="bg-neutral-800 w-full h-14 rounded px-4 outline-none placeholder-neutral-400"
	bind:value
	{placeholder}
/>
