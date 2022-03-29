import { onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';
import { auth } from '../misc/firebase';

export type AuthState = 'logged_out' | 'logged_in' | 'logging_in' | 'logging_out';

export const authState = writable<AuthState>(null);

onAuthStateChanged(auth, (user) => {
	if (user) {
		authState.set('logged_in');
	} else {
		authState.set('logged_out');
	}
});
