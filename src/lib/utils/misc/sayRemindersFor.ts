import { writable } from 'svelte/store';

export const sayRemindersFor = writable<string>(null);
