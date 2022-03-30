import { getNotificationChannel } from './channel';
import type { NotificationMessage } from '$lib/interfaces/NotificationMessage';

export function postNotification(title: string, message: string) {
	const channel = getNotificationChannel();
	channel.postMessage({
		title,
		message
	} as NotificationMessage);
}
