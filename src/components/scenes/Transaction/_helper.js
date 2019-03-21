export const copyData = (format, data, onCopy) => () => {
	if (!data) {
		return;
	}
	const formattedData = format(data);
	const textArea = document.createElement('textarea');
	textArea.innerHTML = formattedData;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);
	onCopy();
};

export const formatObject = (entity, level = 0) => {
	let output = '';
	if (typeof entity === 'string' || typeof entity === 'number') {
		output = `${entity}\r\n`;
	} else {
		let indentation = '';
		let count;
		for (count = 0; count < level; count += 1) {
			indentation += '\t';
		}
		Object.keys(entity).forEach(key => {
			const value = entity[key];
			const delimiter = typeof value === 'object' ? '\r\n' : ' ';
			output += `${indentation}${key}:${delimiter}${formatObject(
				value,
				level + 1
			)}`;
		});
	}
	return output;
};
