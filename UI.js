export const createInput = id => {
	const input = document.createElement("input");
	input.id = id;
	document.body.appendChild(input);
	return input;
};

export const createSelect = id => {
	const select = document.createElement("select");
	select.id = id;
	document.body.appendChild(select);

	const date = new Date();
	for (let i = 0; i < 12; i++) {
		const option = document.createElement("option");
		date.setMonth(i);
		option.text = date.toLocaleString("ru-RU", {
			month: "long",
		});
		option.value = i;
		select.appendChild(option);
	}
	return select;
};

export const createParagraph = id => {
	const p = document.createElement("p");
	p.id = id;
	document.body.appendChild(p);
	return p;
};
