import dayjs from 'dayjs';

export function timeFromTimestamp(ts: number) {
	return dayjs.unix(ts).format('hh:mm A');
}
