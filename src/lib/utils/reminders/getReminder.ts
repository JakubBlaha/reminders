import type { ReminderData } from '$lib/interfaces/ReminderData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../misc/firebase';

export async function getReminder(id: string) {
	const snap = await getDoc(doc(db, `reminders/${id}`));
	return snap.data() as ReminderData;
}
