const colors = [
	"#F44336",
	"#e91e63",
	"#9c27b0",
	"#673ab7",
	"#ff9800",
	"#ff5722",
	"#795548",
	"#607d8b",
	"#3f51b5",
	"#2196F3",
	"#00bcd4",
	"#009688",
	"#2196F3",
	"#32c787",
	"#00BCD4",
	"#ff5652",
	"#ffc107",
	"#ff85af",
	"#FF9800",
	"#39bbb0",
	"#4CAF50",
	"#ffeb3b",
	"#ffc107"
];

export function getColorHash(name) {
	name = name.substr(0, 6);

	var hash = 0;
	for (var i = 0; i < name.length; i++) {
		hash = 31 * hash + name.charCodeAt(i);
	}
	var index = Math.abs(hash % colors.length);
	return colors[index];
}

export const red = "#FF7955";
export const purple = "#7955FF";
export const white = "#FFFFFF";
export const orange = "#f26f28";
export const blue = "#55CDFF";
export const green = "#55FF79";
export const dark = "#51595E";
export const grey = "#BABCB9";

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function Lighten(col, amt) {
	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}

	var num = parseInt(col, 16);

	var r = (num >> 16) + amt;
	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	var b = ((num >> 8) & 0x00ff) + amt;
	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	var g = (num & 0x0000ff) + amt;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (
		(usePound ? "#" : "") +
		String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6)
	);
}

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
export function darken(col, amt) {
	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}

	var num = parseInt(col, 16);

	var r = (num >> 16) - amt;
	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	var b = ((num >> 8) & 0x00ff) - amt;
	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	var g = (num & 0x0000ff) - amt;
	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (
		(usePound ? "#" : "") +
		String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6)
	);
}
