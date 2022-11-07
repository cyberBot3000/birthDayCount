import {
	getFullDate,
	getSerializedDate,
	getShortDate,
} from "./birthDateLib.js";
import { createInput, createSelect, createParagraph } from "./UI.js";
import { isValidDay, isSameYear, showElement, hideElement } from "./utils.js";

const INPUT_ID = "myInput";
const SELECT_ID = "mySelect";
const P_ID = "P_ID";
const SUB_TEXT_ID = "SUBTEXT";

const dayInput = createInput(INPUT_ID);
const monthINput = createSelect(SELECT_ID);
const mainParagraph = createParagraph(P_ID);
const subParagraph = createParagraph(SUB_TEXT_ID);
hideElement(subParagraph);

let intervalID = null;
dayInput.addEventListener("blur", () => {
	if (!intervalID) {
		updateCounter(getActualDateDifference());
		intervalID = setInterval(() => {
			updateCounter(getActualDateDifference());
		}, 1000);
	}
});
mainParagraph.addEventListener("mouseenter", () => showElement(subParagraph));
mainParagraph.addEventListener("mouseleave", () => hideElement(subParagraph));

function updateCounter(dateDifference) {
	if (!dateDifference) {
		mainParagraph.innerText = "ошибка";
		subParagraph.innerText = "ошибка";
		return;
	}
	const mainParagraph = document.getElementById(P_ID);
	const subParagraph = document.getElementById(SUB_TEXT_ID);
	let serializedDate = getSerializedDate(dateDifference, new Date());
	mainParagraph.innerText = getShortDate(serializedDate);
	subParagraph.innerText = getFullDate(serializedDate);
}

function getActualDateDifference() {
	const now = new Date();
	const birthdate = getBirthDate();
	if (birthdate == null) {
		//mark error
		return null;
	}
	const dateDiff = birthdate - now;
	return dateDiff;
}

function getBirthDate() {
	const day = +dayInput.value;
	const month = +monthINput.value;

	if (!isValidDay(day, month)) {
		return null;
	}

	let now = new Date();
	const year = isSameYear(day, month)
		? now.getFullYear()
		: now.getFullYear() + 1;
	const birthdate = new Date(year, month, day, 23, 59);
	return birthdate;
}

document.getElementById;
