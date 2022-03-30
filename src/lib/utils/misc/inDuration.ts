import dayjs from 'dayjs';

export function inDuration(ts: number) {
	if (!ts) return '-';

	const datetime = dayjs.unix(ts);
	const now = dayjs();
	const dur = datetime.diff(now);

	// @ts-expect-error
	return dayjs.duration(dur).humanize(true);
}
