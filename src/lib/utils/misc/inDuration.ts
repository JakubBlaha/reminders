import dayjs from 'dayjs';

export function inDuration(ts: number) {
	const datetime = dayjs.unix(ts);
	const now = dayjs();
	const dur = datetime.diff(now);

	return dayjs.duration(dur).humanize(true);
}
