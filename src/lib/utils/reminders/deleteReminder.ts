import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../misc/firebase';

export async function deleteReminder(id: string) {
	await deleteDoc(doc(db, `reminders/${id}`));
}
