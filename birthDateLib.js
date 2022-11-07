export const getShortDate = serializedDate => {
	let now = new Date();
	let dateParts = serializedDate;
	let output = "";
	if (dateParts.months == 0 && dateParts.days == 0) {
		output = "поздравляем!";
	} else if (dateParts.months == 0 && dateParts.days == 1) {
		output = "День рождения завтра!";
	} else if (dateParts.months == 0 && dateParts.days == 7) {
		output = "День рождения через неделю!";
	} else if (
		dateParts.months == 0 &&
		new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + dateParts.days
		).getMonth() != now.getMonth()
	) {
		output = "День рождения в следующем месяце!";
	} else if (dateParts.months == 0) {
		output = `День рождения через ${dateParts.days} ${daysLocaleFormat(
			dateParts.days
		)}`;
	} else if (dateParts.months == 6) {
		output = "День рождения через полгода";
	} else if (dateParts.months == 11) {
		output = "День рождения через год";
	} else {
		output = `День рождения через ${dateParts.months} ${monthsLocaleFormat(
			dateParts.months
		)}`;
	}
	return output;
};

export const getFullDate = serializedDate => {
	let output = [];
	if (serializedDate.months != 0) {
		output.push(
			`${serializedDate.months} ${monthsLocaleFormat(serializedDate.months)},`
		);
	}
	if (serializedDate.months != 0) {
		output.push(
			`${serializedDate.days} ${daysLocaleFormat(serializedDate.days)},`
		);
	}
	if (serializedDate.months != 0) {
		output.push(
			`${serializedDate.hours} ${hoursLocaleFormat(serializedDate.hours)},`
		);
	}
	if (serializedDate.months != 0) {
		output.push(
			`${serializedDate.minutes} ${minutesLocaleFormat(
				serializedDate.minutes
			)},`
		);
	}
	if (serializedDate.months != 0) {
		output.push(
			`${serializedDate.seconds} ${secondsLocaleFormat(
				serializedDate.seconds
			)},`
		);
	}
	return output.join(", ");
};

export const getSerializedDate = (dateVal, startFrom) => {
	let [monthsTotal, daysLeft] = daysToMonths(startFrom, daysTotal(dateVal));
	return {
		months: Math.trunc(monthsTotal),
		days: Math.trunc(daysLeft),
		hours: Math.trunc(daysTotal(dateVal) % 24),
		minutes: Math.trunc(minutesTotal(dateVal) % 60),
		seconds: Math.trunc(secondsTotal(dateVal) % 60),
		miliseconds: Math.trunc(dateVal % 100),
	};
};

function daysTotal(dateVal) {
	return dateVal / (1000 * 60 * 60 * 24);
}
function hoursTotal(dateVal) {
	return dateVal / (1000 * 60 * 60);
}
function minutesTotal(dateVal) {
	return dateVal / (1000 * 60);
}
function secondsTotal(dateVal) {
	return dateVal / 1000;
}

function getMonthsArr(fullYear) {
	let daysInMonths = [];
	for (let i = 0; i < 12; i++) {
		daysInMonths.push(new Date(fullYear, i + 1, 0).getDate());
	}
	return daysInMonths;
}

function daysToMonths(startFrom, days) {
	let currYear = startFrom.getFullYear();
	let daysInMonths = getMonthsArr(currYear);
	let daysRelative = days;
	let fullMonths = 0;
	let daysLeft = 0;

	let currMonth = startFrom.getMonth();

	daysInMonths[currMonth] -= startFrom.getDate();

	if (daysRelative > daysInMonths[currMonth]) {
		daysRelative -= daysInMonths[currMonth];
		daysLeft += daysInMonths[currMonth];
		currMonth++;
	}

	while (daysRelative > daysInMonths[currMonth]) {
		daysRelative -= daysInMonths[currMonth];
		currMonth++;
		fullMonths++;
		if (currMonth == 12) {
			currYear++;
			daysInMonths = getMonthsArr(currYear);
			currMonth = 0;
		}
	}
	daysLeft += daysRelative;

	return [fullMonths, daysLeft];
}

function hoursLocaleFormat(value) {
	return setFormatByGroups(value, "час", "часа", "часов");
}

function minutesLocaleFormat(value) {
	return setFormatByGroups(value, "минута", "минуты", "минут");
}
function secondsLocaleFormat(value) {
	return setFormatByGroups(value, "секунда", "секунды", "секунд");
}

function daysLocaleFormat(value) {
	return setFormatByGroups(value, "день", "дня", "дней");
}

function monthsLocaleFormat(value) {
	return setFormatByGroups(value, "месяц", "месяца", "месяцев");
}

function setFormatByGroups(value, group1, group2, groupDefault) {
	let g1Arr = []; // 1 21 31 41 51 ...
	let g2Arr = []; // 2 3 4 22 23 24 ...
	for (let i = 0; i < 100; i++) {
		if (i % 10 == 1) {
			continue;
		}
		g2Arr.push(i * 10 + 2, i * 10 + 3, i * 10 + 4);
		g1Arr.push(i * 10 + 1);
	}
	if (g1Arr.includes(value)) {
		return group1;
	}
	if (g2Arr.includes(value)) {
		return group2;
	}
	return groupDefault;
}
