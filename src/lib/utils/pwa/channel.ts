export function getNotificationChannel() {
	return new BroadcastChannel('notification');
}

export function getReminderUpdateChannel() {
	return new BroadcastChannel('reminder-update');
}
