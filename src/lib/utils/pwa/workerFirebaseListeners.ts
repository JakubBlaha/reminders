import type { ReminderData } from '$lib/interfaces/ReminderData';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../misc/firebase';
import { setReminders } from './remindersStore';

let reminderUpdateListener: () => void;

function init() {
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
		setReminders(reminders);

		console.info('Reminders updated by a snapshot listener.');
	});
}

export function kill() {
	reminderUpdateListener?.();
}

export function initWorkerFirebase() {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			init();
		} else {
			console.info('[SW]: User logged out. Removing all reminders.');
			kill();
		}
	});
}

export function refreshReminders() {
	init();
}
