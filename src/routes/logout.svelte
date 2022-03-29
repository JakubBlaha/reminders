<script>
	import Button from '$lib/components/Button/Button.svelte';
	import { userId } from '$lib/utils/auth';
	import { auth } from '$lib/utils/misc/firebase';
	import { signOut } from 'firebase/auth';

	function clickLogout() {
		userId.set(null);
		signOut(auth);
	}
</script>

<div class="flex flex-col justify-end h-full">
	<Button cls="w-full" on:click={clickLogout}>I wanna log out!</Button>
</div>
