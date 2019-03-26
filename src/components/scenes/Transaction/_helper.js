export const copyData = (format, data, onCopy) => () => {
	// Don't copy if no data is available
	if (!data) {
		return;
	}
	// Format and embed data
	const formattedData = format(data);
	const textArea = document.createElement('textarea');
	textArea.onfocus = event => {
		event.preventDefault();
	};
	textArea.innerHTML = formattedData;
	// Copy data
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	// Cleanup
	document.body.removeChild(textArea);
	onCopy();
};

export const formatObject = (entity, level = 0) => {
	let output = '';
	if (typeof entity === 'string' || typeof entity === 'number') {
		// Base case: string with line break
		output = `${entity}\r\n`;
	} else {
		// Set indent level
		let indentation = '';
		let count;
		for (count = 0; count < level; count += 1) {
			indentation += '\t';
		}
		// Recursively parse every key-value pair in object
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
