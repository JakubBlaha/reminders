import type { ReminderData } from '$lib/interfaces/ReminderData';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { writable } from 'svelte/store';
import { auth, db } from '../misc/firebase';

export const clientReminders = writable<ReminderData[]>(null);

let reminderUpdateListener: () => void;

export function initRemindersListener() {
	const uid = auth.currentUser?.uid;

	if (!uid) {
		console.error('User not logged in. Cannot init listeners.');
		return;
	}

	// Unregister old listener
	if (reminderUpdateListener) {
		reminderUpdateListener();
	}

	const q = query(
		collection(db, 'reminders'),
		where('creatorId', '==', uid),
		orderBy('timestamp', 'asc')
	);

	reminderUpdateListener = onSnapshot(q, (snap) => {
		const reminders = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ReminderData[];
		clientReminders.set(reminders);
	});
}

onAuthStateChanged(auth, (user) => {
	if (!user) {
		console.info('[Client]: User logged out. Removing listeners.');
		reminderUpdateListener?.();
	}
});
