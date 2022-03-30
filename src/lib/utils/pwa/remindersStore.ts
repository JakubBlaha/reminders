import type { ReminderData } from '$lib/interfaces/ReminderData';

let store: ReminderData[] = [];

export function setReminders(reminders: ReminderData[]) {
	store = reminders;
}

export function getReminders() {
	return store;
}

export function setReminded(id: string) {
	const reminder = store.find((reminder) => reminder.id === id);
	if (reminder) reminder.reminded = true;
}

export function getReminded() {
	return store.filter((reminder) => reminder.reminded);
}
