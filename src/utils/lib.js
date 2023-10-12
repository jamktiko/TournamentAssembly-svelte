export function calcId(arr) {
	console.log(arr);
	if (arr.length != 0) return Math.max(...arr.map((obj) => obj.id)) + 1;
	return 0;
}
