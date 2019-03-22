import { SETTINGS } from './types';

const setApiKey = apiKey => ({
	type: SETTINGS.SET_API_KEY,
	payload: { apiKey }
});

const setCurrency = currency => ({
	type: SETTINGS.SET_CURRENCY,
	payload: { currency }
});

const toggleNightMode = () => ({
	type: SETTINGS.TOGGLE_NIGHT_MODE
});

const resetSettings = () => ({
	type: SETTINGS.RESET
});

export { resetSettings, setApiKey, setCurrency, toggleNightMode };
