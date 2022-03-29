import type { ReminderData } from '$lib/interfaces/ReminderData';
import type { DateGroupData } from '$lib/interfaces/DateGroupData';
import dayjs from 'dayjs';

export function dateGroupReminders(reminders: ReminderData[]) {
	const groups: DateGroupData[] = [];

	const today = dayjs().startOf('day');

	for (const reminder of reminders) {
		const reminderDay = dayjs.unix(reminder.timestamp).startOf('day');

		let groupTitle: string;

		if (today.toISOString() === reminderDay.toISOString()) {
			groupTitle = 'Today';
		} else if (today.add(1, 'day').toISOString() === reminderDay.toISOString()) {
			groupTitle = 'Tomorrow';
		} else {
			groupTitle = reminderDay.format('dddd, MMMM D');
		}

		// const groupTitle = .format('MMM DD, YYYY');

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
