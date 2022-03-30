/// <reference lib="webworker" />

import '../static/polyfill/broadcastchannel';
import { build, files, version } from '$service-worker';
import type { NotificationMessage } from '$lib/interfaces/NotificationMessage';
import { getNotificationChannel, getReminderUpdateChannel } from '$lib/utils/pwa/channel';
import type { ReminderUpdateMessage } from '$lib/interfaces/ReminderUpdateMessage';
import { getReminders, setReminded } from '$lib/utils/pwa/remindersStore';
import dayjs from 'dayjs';
import { postNotification } from '$lib/utils/pwa/notification';
import { updateReminder } from '$lib/utils/reminders/updateReminder';
import { initWorkerFirebase, refreshReminders } from '$lib/utils/pwa/workerFirebaseListeners';

const ctx: ServiceWorkerGlobalScope = self as any;

const worker = self as unknown as ServiceWorkerGlobalScope;
const FILES = `cache${version}`;

// `build` is an array of all the files generated by the bundler,
// `files` is an array of everything in the `static` directory
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);

worker.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(FILES)
			.then((cache) => cache.addAll(to_cache))
			.then(() => {
				worker.skipWaiting();
			})
	);
});

worker.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then(async (keys) => {
			// delete old caches
			for (const key of keys) {
				if (key !== FILES) await caches.delete(key);
			}

			worker.clients.claim();
		})
	);

	initWorkerFirebase();
});

/**
 * Fetch the asset from the network and store it in the cache.
 * Fall back to the cache if the user is offline.
 */
async function fetchAndCache(request: Request) {
	const cache = await caches.open(`offline${version}`);

	try {
		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	} catch (err) {
		const response = await cache.match(request);
		if (response) return response;

		throw err;
	}
}

worker.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

	const url = new URL(event.request.url);

	// don't try to handle e.g. data: URIs
	const isHttp = url.protocol.startsWith('http');
	const isDevServerRequest =
		url.hostname === self.location.hostname && url.port !== self.location.port;
	const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
	const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;

	if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
		event.respondWith(
			(async () => {
				// always serve static files and bundler-generated assets from cache.
				// if your application has other URLs with data that will never change,
				// set this variable to true for them and they will only be fetched once.
				const cachedAsset = isStaticAsset && (await caches.match(event.request));

				return cachedAsset || fetchAndCache(event.request);
			})()
		);
	}
});

// Broadcast notification channel
const notificationChannel = getNotificationChannel();

notificationChannel.onmessage = (event: { data: NotificationMessage }) => {
	const { title, message } = event.data;

	ctx.registration.showNotification(title, { body: message, icon: '/favicon.png' });
};

// Broadcast reminder update channel
const reminderUpdateChannel = getReminderUpdateChannel();

reminderUpdateChannel.onmessage = (event: { data: ReminderUpdateMessage }) => {
	const { type } = event.data;

	if (type === 'pull-reminders') {
		console.info('Pulling reminders from service worker.');
		refreshReminders();
	}
};

function showReminders() {
	const reminders = getReminders();
	const now = dayjs();

	reminders.forEach((reminder) => {
		if (reminder.reminded) return;

		const reminderDatetime = dayjs.unix(reminder.timestamp);

		if (reminderDatetime.isBefore(now)) {
			postNotification(reminder.title, '');
			setReminded(reminder.id);
			updateReminder(reminder.id, { reminded: true });
			console.info('Updated reminder from service worker.');
		}
	});
}

setInterval(showReminders, 10000);
