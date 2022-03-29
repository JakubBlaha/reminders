import type { ReminderData } from '$lib/interfaces/ReminderData';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../misc/firebase';

export async function updateReminder(id: string, data: Partial<ReminderData>) {
	await updateDoc(doc(db, `reminders/${id}`), data);
}
