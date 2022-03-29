import { auth } from '$lib/utils/misc/firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { authState } from '.';

export function loginWithGoogle() {
	authState.set('logging_in');

	const provider = new GoogleAuthProvider();

	signInWithRedirect(auth, provider);
}
