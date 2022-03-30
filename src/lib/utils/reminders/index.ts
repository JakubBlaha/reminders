import type { ReminderData } from '$lib/interfaces/ReminderData';
import { writable } from 'svelte/store';

export const clientReminders = writable<ReminderData[]>([]);
