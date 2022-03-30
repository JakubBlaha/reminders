import type { ReminderData } from './ReminderData';

export interface ReminderUpdateMessage {
	type: 'push-reminders';
	reminders: ReminderData[];
}
