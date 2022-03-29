import type { ReminderData } from '$lib/interfaces/ReminderData';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/utils/misc/firebase';

export async function createReminder(data: ReminderData) {
	await addDoc(collection(db, 'reminders'), data);
}
