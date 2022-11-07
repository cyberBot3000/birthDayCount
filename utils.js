export const isValidDay = (day, month) => {
	let max = new Date(new Date().getFullYear(), month + 1, 0).getDate();
	if (isNaN(day) || day > max) {
		return false;
	}
	return true;
};

export const isSameYear = (day, month) => {
	let now = new Date();
	if (month === now.getMonth()) {
		return day >= now.getDate();
	} else {
		return month > now.getMonth();
	}
};

export const hideElement = htmlElem => {
	htmlElem.style.visibility = "hidden";
};

export const showElement = htmlElem => {
	htmlElem.style.visibility = "visible";
};
