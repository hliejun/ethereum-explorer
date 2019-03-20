import { SETTINGS } from './types';

/* API Key */

const setApiKey = apiKey => ({
	type: SETTINGS.SET_API_KEY,
	payload: { apiKey }
});

/* Currency */

const setCurrency = currency => ({
	type: SETTINGS.SET_CURRENCY,
	payload: { currency }
});

/* Night Mode */

const toggleNightMode = () => ({
	type: SETTINGS.TOGGLE_NIGHT_MODE
});

/* Reset Settings */

const resetSettings = () => ({
	type: SETTINGS.RESET
});

export { resetSettings, setApiKey, setCurrency, toggleNightMode };
