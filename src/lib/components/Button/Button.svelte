<script lang="ts">
	export let cls: string;
</script>

<button class="bg-white rounded text-neutral-900 px-4 py-2 {cls}" on:click>
	<slot />
</button>
