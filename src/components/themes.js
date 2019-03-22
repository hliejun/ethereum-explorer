const defaultTheme = {
	'--inverted-background': '#607d8b',
	'--inverted-background-rgb': '96, 125, 139',
	'--inverted-secondary-text': '#cfd8dc',
	'--inverted-text': '#eceff1',
	'--primary-active': '#4b626d',
	'--primary-active-rgb': '75, 98, 109',
	'--primary-background': '#eceff1',
	'--primary-highlight': '#5c6bc0',
	'--primary-text': '#263238',
	'--secondary-active': '#4150a8',
	'--secondary-background': '#ffffff',
	'--secondary-hover': '#a6aedc',
	'--secondary-text': '#607d8b',
	'--secondary-text-rgb': '96, 125, 139'
};

const themes = {
	dark: {
		'--inverted-background': '#cfd8dc',
		'--inverted-background-rgb': '207, 216, 220',
		'--inverted-secondary-text': '#607d8b',
		'--inverted-text': '#263238',
		'--primary-active': '#b2c0c6',
		'--primary-active-rgb': '178, 192, 198',
		'--primary-background': '#263238',
		'--primary-highlight': '#4db6ac',
		'--primary-text': '#90a4ae',
		'--secondary-active': '#3c948b',
		'--secondary-background': '#37474f',
		'--secondary-hover': '#95d4ce',
		'--secondary-text': '#78909c',
		'--secondary-text-rgb': '120, 144, 156'
	},
	light: defaultTheme
};

const setTheme = name => {
	const theme = themes[name] || defaultTheme;
	const html = document.getElementsByTagName('html')[0];
	if (html) {
		Object.keys(theme).forEach(property => {
			html.style.setProperty(property, theme[property]);
		});
	}
};

export default setTheme;