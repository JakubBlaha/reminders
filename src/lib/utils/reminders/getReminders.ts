import { get } from 'svelte/store';
import { userId } from '$lib/utils/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '$lib/utils/misc/firebase';
import type { ReminderData } from '$lib/interfaces/ReminderData';

export async function getReminders() {
	const uid = get(userId);

	const q = query(
		collection(db, 'reminders'),
		where('creatorId', '==', uid),
		orderBy('timestamp', 'asc')
	);
	const snap = await getDocs(q);

	return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ReminderData[];
}
