<script lang="ts">
	export let value: string = '';
	export let placeholder: string = 'Cook potatoes...';
</script>

<input
	type="text"
	class="w-full px-4 rounded outline-none bg-neutral-800 h-14 placeholder-neutral-400"
	bind:value
	{placeholder}
/>
