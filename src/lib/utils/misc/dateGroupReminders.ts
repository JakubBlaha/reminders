import type { ReminderData } from '$lib/interfaces/ReminderData';
import type { DateGroupData } from '$lib/interfaces/DateGroupData';
import dayjs from 'dayjs';

export function dateGroupReminders(reminders: ReminderData[]) {
	const groups: DateGroupData[] = [];

	for (const reminder of reminders) {
		const groupTitle = dayjs(reminder.timestamp).format('MMM DD, YYYY');

		const group = groups.find((group) => group.title === groupTitle);

		if (group) {
			group.reminders.push(reminder);
		} else {
			groups.push({
				title: groupTitle,
				reminders: [reminder]
			});
		}
	}

	return groups;
}
