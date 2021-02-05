export default function formatDate(date: Date | string) {
	const d = new Date(date);
	let day = '' + (d.getDate() + 1);
	let month = '' + (d.getMonth() + 1);
	let year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}
