import { onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../misc/firebase';

export type AuthState = 'logged_out' | 'logged_in' | 'logging_in' | 'logging_out';

export const authState = writable<AuthState>(null);
export const userId = writable<string>(null);

onAuthStateChanged(auth, (user) => {
	if (user) {
		authState.set('logged_in');
		userId.set(user.uid);
	} else {
		authState.set('logged_out');
	}
});
